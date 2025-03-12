import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import LZString from 'lz-string';
import Sim from '@/classes/Sim';
import { getSimSet } from './setup';
import Const from '@/classes/const';
import type { AreaId, FleetTypeId, OptionsType } from '@/classes/types';
import { createCacheFleetsFromDeckBuilder } from '@/utils/deckBuilderUtil';
import AdoptFleet from '@/classes/AdoptFleet';
import { getParam } from '@/utils/util';
import { nomal_mock_datas, astray_mock_datas } from './mock';
import { node_datas } from '@/data/map';

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
            const runSim = async (areaId: AreaId, options: OptionsType) => {
                const sim = new Sim(adoptFleet, areaId, options);
                const result = await sim.start();
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
                for (var area_id of areaIds) { // area_idは任意に再設定できるように
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
                console.log(adoptFleet.getMainFleetNames());
                if (adoptFleet.fleet_type_id > 0) console.log(adoptFleet.getEscortFleetNames());
                console.log(adoptFleet.fleet_type);
                console.log(JSON.stringify(simSet.deck));
                throw error;
            }

            limit++;
        }
    }, 30000);

    it('mock-test: モック艦隊をSimにかけて、正しいルートを返すことを確認', async () => {
        const mock_datas = nomal_mock_datas.concat(astray_mock_datas);

        for (const mock_data of mock_datas) {
            // 海域
            const area_id = mock_data.area;

            // 艦隊
            const compressed_deck = getParam('pdz', mock_data.deck)!;
            const deck_string = LZString.decompressFromEncodedURIComponent(compressed_deck);
            const deck = JSON.parse(deck_string);
            const cache_fleets = createCacheFleetsFromDeckBuilder(deck);
            const fleet_type_id = deck!.f1!.t as FleetTypeId;
            const adoptFleet = new AdoptFleet(cache_fleets, fleet_type_id);
            adoptFleet.seek = [999, 999, 999, 999]; // 索敵パス

            const expected_routes = mock_data.routes;
            for (const expected_route of expected_routes) {
                // option
                const mock_option = mock_data.option;
                const nodes = expected_route.split('-');
                for (const [index, node] of nodes.entries()) { // nodeデータから能動分岐自動セット
                    if (node_datas[area_id][node][2] === 'ac') {
                        mock_option[node] = nodes[index + 1];
                    }
                }
                const options = Const.OPTIONS;
                options[area_id] = { ...options[area_id], ...mock_option };
                
                const sim = new Sim(adoptFleet, area_id, options);
                const result = sim.start();
                const actual_route = result[0].route.join('-');

                if (expected_route !== actual_route) {
                    console.log(`海域: ${area_id}`);
                    console.log(expected_route);
                    console.log(actual_route);
                }

                expect(expected_route).toBe(actual_route);
            }
        }
    });
});
