import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import LZString from 'lz-string';
import {
    createSimExecutor,
    startSim,
} from '@/core/SimExecutor';
import { getSimSet } from './setup';
import Const from '@/constants/const';
import type { AreaId, OptionsType } from '@/models/types';
import { createFleetComponentsFromDeckBuilder } from '@/logic/deckBuilder';
import { createAdoptFleet, getEscortFleetNames, getMainFleetNames } from '@/core/AdoptFleet';
import { getParam } from '@/logic/url';
import { nomal_mock_datas, astray_mock_datas } from './routeExpects';
import { NODE_DATAS, NT as NodeType } from '@/data/map';
import SHIP_DATAS from '@/data/ship';
import EQUIP_DATAS from '@/data/equip';
import type { Ft } from '@/core/branch';
import type { CommandEvacuation } from '@/core/CommandEvacuation';

describe('Simテスト', () => {
    it(`rand-test: ランダムに生成した艦隊をSimクラスに渡してクラス内でエラーが発生しないこと、
        SimResult.rateが 1 と等しいことを確認`, async () => {
        let limit = 0;
        while (limit < 1000) {
            const simSet = getSimSet();

            const adoptFleet = simSet.adoptFleet;
            const areaIds = simSet.areaIds;
            const selectableOptions = simSet.options;
            const defaultOptions = Const.OPTIONS;

            // 各シミュレーション実行用関数
            const runSim = async (
                areaId: AreaId,
                options: OptionsType,
                command_evacuations: CommandEvacuation[] = [],
            ) => {
                const executor = createSimExecutor(adoptFleet, areaId, options, command_evacuations);
                const result = await startSim(executor, adoptFleet, command_evacuations);
                // console.log(result);
                const totalRate = result.reduce(
                    (sum, item) => sum.plus(item.rate),
                    new Big(0)
                );
                expect(totalRate.toNumber()).toBe(1);
            };

            // 配列の配列から全組み合わせを生成するヘルパー関数 デカルト積っていうらしいよ
            const cartesian = <T>(arrays: T[][]): T[][] => {
                return arrays.reduce<T[][]>(
                    (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
                    [[]]
                );
            };

            let debug_area_id: AreaId = '1-1';
            let debug_option: Record<string, string> | undefined;

            try {
                for (const area_id of areaIds) { // area_idは任意に再設定できるように
                    // area_id = '60-1';
                    debug_area_id = area_id;
                    // console.log('テスト海域: ', area_id);
                    // if (adoptFleet.fleet_type_id > 0 && Number(area_id.split('-')[0]) > 7) continue; // 連合艦隊なら通常海域除外
                    if (selectableOptions[area_id]) {
                        // 該当海域に選択肢がある場合、キーごとに全組み合わせを生成する
                        const area_option = selectableOptions[area_id];
                        const keys = Object.keys(area_option);
                        // 各キーに対して、{ key, value }の形で配列を作成
                        const optionsPerKey = keys.map(key =>
                            area_option[key].map(value => ({ key, value }))
                        );
                        // キーごとの全組み合わせを生成
                        const combinations = cartesian(optionsPerKey);

                        // 各組み合わせごとにシミュレーションを実行
                        for (const combination of combinations) {
                            // defaultOptionsをコピーして更新
                            const updatedOptions = { ...defaultOptions };
                            if (!updatedOptions[area_id]) {
                                updatedOptions[area_id] = {};
                            }
                            for (const { key, value } of combination) {
                                updatedOptions[area_id]![key] = value;
                            }
                            debug_option = updatedOptions[area_id];
                            // console.log('option: ', updatedOptions[area_id]);
                            await runSim(area_id, updatedOptions);

                            // throw new Error('エラー時処理テスト');
                        }
                    } else {
                        // 選択肢がなければデフォルトで実行
                        await runSim(area_id, defaultOptions);
                    }
                }
            } catch (error) {
                console.error('Error occurred:', error);
                console.log('area: ', debug_area_id);
                console.log('option: ', debug_option);
                console.log(getMainFleetNames(adoptFleet));
                if (adoptFleet.fleet_type > 0) console.log(getEscortFleetNames(adoptFleet));
                console.log(adoptFleet.fleet_type);
                console.log(JSON.stringify(simSet.deck));
                throw error;
            }

            limit++;
        }
    }, 30000);

    it('route-test: モック艦隊をSimにかけて、正しいルートを返すことを確認', async () => {
        const mock_datas = nomal_mock_datas.concat(astray_mock_datas);

        for (const mock_data of mock_datas) {
            // 海域
            const area_id = mock_data.area;

            // 艦隊

            const debug_deck =
                mock_data.deck.replaceAll('https://x-20a.github.io', 'http://localhost:5173/compass/');

            const compressed_deck = getParam('pdz', mock_data.deck)!;
            const deck_string = LZString.decompressFromEncodedURIComponent(compressed_deck);
            const deck = JSON.parse(deck_string);
            const fleet_components = createFleetComponentsFromDeckBuilder(
                deck,
                SHIP_DATAS,
                EQUIP_DATAS,
            );
            const fleet_type_id = deck!.f1!.t as Ft;
            const adoptFleet = createAdoptFleet(
                fleet_components,
                fleet_type_id,
                [999, 999, 999, 999],
            );

            const expected_routes = mock_data.routes;
            for (const expected_route of expected_routes) {
                // option
                const mock_option = mock_data.option;
                const nodes = expected_route.split('-');
                for (const [index, node] of nodes.entries()) { // nodeデータから能動分岐自動セット
                    if (NODE_DATAS[area_id][node][2] === NodeType.ac) {
                        mock_option[node] = nodes[index + 1];
                    }
                }
                const options = Const.OPTIONS;
                options[area_id] = { ...options[area_id], ...mock_option };

                const command_evacuations: CommandEvacuation[] = []; // 退避設定はなし
                
                const executor = createSimExecutor(adoptFleet, area_id, options, command_evacuations);
                const result = startSim(executor, adoptFleet, command_evacuations);
                const actual_route = result[0].route.join('-');

                if (expected_route !== actual_route) {
                    console.log(`海域: ${area_id}`);
                    console.log('option: ', options);
                    console.log(`期待: ${expected_route}`);
                    console.log(`実際: ${actual_route}`);
                    console.log(
                        'deck: ',
                        debug_deck,
                    );
                }

                expect(expected_route).toBe(actual_route);
            }
        }
    });
});
