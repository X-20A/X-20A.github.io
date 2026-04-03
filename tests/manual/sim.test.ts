import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import {
    derive_sim_executer,
    start_sim,
} from '../../src/core/SimExecutor';
import Const from '../../src/constants/const';
import type { AreaId, OptionsType } from '../../src/types';
import { calc_escort_fleet_ship_names, calc_main_fleet_ship_names, MAX_SEEK } from '../../src/models/fleet/AdoptFleet';
import { TEST_FLEET_DATAS } from '../expects/route';
import { EDGE_DATAS, NODE_DATAS, NT as NodeType } from '../../src/data/map';
import type { CommandEvacuation } from '../../src/core/CommandEvacuation';
import { generate_sim_set } from './setup';
import { DisallowToSortie } from '../../src/errors/CustomError';
import { build_fleet_from_fixture } from '../generator/fixture';

const is_route_not_warp = (
    route: string[],
    area_id: AreaId,
): boolean => {
    const edges = EDGE_DATAS[area_id];
    return route.every((node, index) => {
        if (index === route.length - 1) return true;

        const start = node;
        const target = route[index + 1];
        return edges.find(edge =>
            edge[0] === start &&
            edge[1] === target
        );
    });
}

describe('Simテスト', () => {
    it(`rand-test:
        ランダムに生成した艦隊をSimクラスに渡してクラス内でエラーが発生しないこと、
        SimResult.rateが 1 と等しいこと、
        ルートがワープしないこと
        を確認`, async () => {
        let limit = 0;
        while (limit < 1000) {
            const simSet = generate_sim_set();

            const adoptFleet = simSet.adoptFleet;
            const areaIds = simSet.areaIds;
            const selectableOptions = simSet.options;
            const defaultOptions = Const.DEFAULT_OPTIONS;

            // 各シミュレーション実行用関数
            const run_sim = async (
                area_id: AreaId,
                options: OptionsType,
                command_evacuations: CommandEvacuation[] = [],
            ) => {
                const executor = derive_sim_executer(adoptFleet, area_id, options, command_evacuations);
                const result = await start_sim(executor);
                // console.log(result);
                const total_rate = result.reduce(
                    (sum, item) => sum.plus(item.rate),
                    new Big(0)
                );
                if (
                    Number(total_rate) !== 1
                ) throw new Error('確率指定ミスを検知');
                if (
                    !is_route_not_warp(result[0].route, area_id)
                ) throw new Error('ルートワープ検知');
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

            // TODO: きたな～い！
            for (const area_id of areaIds) { // area_idは任意に再設定できるように
                try {
                    // area_id = '60-1';
                    debug_area_id = area_id;
                    // console.log('テスト海域: ', area_id);
                    // if (adoptFleet.fleet_type_id > 0 && Number(area_id.split('-')[0]) > 7) continue; // 連合艦隊なら通常海域除外
                    if (!selectableOptions[area_id]) {
                        // 選択肢がなければデフォルトで実行
                        await run_sim(area_id, defaultOptions);
                        continue;
                    }

                    // 該当海域にオプションがある場合、キーごとに全組み合わせを生成する
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
                        await run_sim(area_id, updatedOptions);

                        // throw new Error('エラー時処理テスト');
                    }
                } catch (error) {
                    if (error instanceof DisallowToSortie) continue;
                    
                    console.error('Error occurred:', error);
                    console.log('area: ', debug_area_id);
                    console.log('option: ', debug_option);
                    console.log(calc_main_fleet_ship_names(adoptFleet));
                    if (adoptFleet.fleet_type > 0) console.log(calc_escort_fleet_ship_names(adoptFleet));
                    console.log(adoptFleet.fleet_type);
                    console.log(JSON.stringify(simSet.deck));
                    throw error;
                }
            }

            limit++;
        }
    }, 30000);

    it('route-test: モック艦隊をSimにかけて、正しいルートを返すことを確認', async () => {
        for (const fleet_data of TEST_FLEET_DATAS) {
            // 海域
            const area_id = fleet_data.area;
            const adopt_fleet = {
                ...build_fleet_from_fixture(fleet_data.fleet),
                seek: MAX_SEEK,
            };

            const expected_routes = fleet_data.routes;
            for (const expected_route of expected_routes) {
                // option
                const option = fleet_data.option;
                const nodes = expected_route.split('-');
                for (const [index, node] of nodes.entries()) { // nodeデータから能動分岐自動セット
                    if (NODE_DATAS[area_id][node][2] === NodeType.ac) {
                        option[node] = nodes[index + 1];
                    }
                }
                const options = Const.DEFAULT_OPTIONS;
                options[area_id] = { ...options[area_id], ...option };

                const command_evacuations: CommandEvacuation[] = []; // 退避設定はなし

                const executor = derive_sim_executer(adopt_fleet, area_id, options, command_evacuations);
                const result = start_sim(executor);
                const actual_route = result[0].route.join('-');

                if (expected_route !== actual_route) {
                    console.log(`海域: ${area_id}`);
                    console.log('option: ', options);
                    console.log('期待ルート群: ', expected_routes);
                    console.log(`非合致期待: ${expected_route}`);
                    console.log(`実際: ${actual_route}`);
                    console.log('艦名: ', adopt_fleet.ship_names);
                }

                expect(expected_route).toBe(actual_route);
            }
        }
    });
});
