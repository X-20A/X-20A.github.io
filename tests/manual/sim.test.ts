import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import {
    derive_sim_executer,
    start_sim,
} from '../../src/core/SimExecutor';
import Const from '../../src/constants/const';
import type { AreaId, OptionsType, SimResult } from '../../src/types';
import { calc_escort_fleet_ship_names, calc_main_fleet_ship_names, MAX_SEEK } from '../../src/models/fleet/AdoptFleet';
import { TEST_FLEET_DATAS } from '../expects/route';
import { EDGE_DATAS, NODE_DATAS, NT as NodeType } from '../../src/data/map';
import type { CommandEvacuation } from '../../src/core/CommandEvacuation';
import { generate_sim_set } from './setup';
import { DisallowToSortie } from '../../src/errors/CustomError';
import { build_fleet_from_fixture } from '../generator/fixture';
import { is_fleet_combined } from '../../src/models/fleet/predicate';

/** rand-testで生成するランダム艦隊の数 */
const RAND_TEST_ITERATIONS = 1000;

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

/** 配列の配列から全組み合わせ(デカルト積)を生成する */
const cartesian = <T>(arrays: T[][]): T[][] => {
    return arrays.reduce<T[][]>(
        (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
        [[]]
    );
};

/**
 * 海域の選択肢から、試すべきOptionsTypeの一覧を生成する
 * @param area_id 対象海域
 * @param area_option 海域の選択肢(キーごとの取り得る値)。無ければbaseのみ返す
 * @param base ベースとなるオプション(通常はデフォルト)
 */
const build_option_sets = (
    area_id: AreaId,
    area_option: Record<string, string[]> | undefined,
    base: OptionsType,
): OptionsType[] => {
    // 選択肢が無ければデフォルトのまま1回だけ実行する
    if (!area_option) return [base];

    // 各キーを { key, value } の配列にし、全キーの組み合わせを作る
    const optionsPerKey = Object.keys(area_option).map(key =>
        area_option[key].map(value => ({ key, value }))
    );

    return cartesian(optionsPerKey).map(combination => {
        const area_options = { ...base[area_id] };
        for (const { key, value } of combination) {
            area_options[key] = value;
        }
        return { ...base, [area_id]: area_options };
    });
};

/**
 * SimResultの健全性を検証する
 * - 確率(rate)の合計が1であること
 * - ルートがワープしていないこと
 */
const assert_sim_result = (
    result: SimResult[],
    area_id: AreaId,
): void => {
    const total_rate = result.reduce(
        (sum, item) => sum.plus(item.rate),
        new Big(0)
    );
    expect(Number(total_rate), '確率指定ミスを検知').toBe(1);
    expect(is_route_not_warp(result[0].route, area_id), 'ルートワープ検知').toBe(true);
};

/** テスト失敗時に原因を追うためのデバッグ文字列を組み立てる */
const build_failure_context = (
    ctx: {
        area_id: AreaId,
        options: OptionsType,
        simSet: ReturnType<typeof generate_sim_set>,
    },
): string => {
    const { area_id, options, simSet } = ctx;
    const { adoptFleet, deck } = simSet;

    const lines = [
        `area: ${area_id}`,
        `option: ${JSON.stringify(options[area_id])}`,
        `main: ${calc_main_fleet_ship_names(adoptFleet)}`,
    ];
    if (is_fleet_combined(adoptFleet.fleet_type)) {
        lines.push(`escort: ${calc_escort_fleet_ship_names(adoptFleet)}`);
    }
    lines.push(`fleet_type: ${adoptFleet.fleet_type}`);
    lines.push(`deck: ${JSON.stringify(deck)}`);
    return lines.join('\n');
};

describe('Simテスト', () => {
    it(`rand-test:
        ランダムに生成した艦隊をSimクラスに渡してクラス内でエラーが発生しないこと、
        SimResult.rateが 1 と等しいこと、
        ルートがワープしないこと
        を確認`, () => {
        for (let i = 0; i < RAND_TEST_ITERATIONS; i++) {
            const simSet = generate_sim_set();
            const {
                adoptFleet,
                areaIds,
                options: selectableOptions,
            } = simSet;

            for (const area_id of areaIds) {
                // 海域の選択肢を全組み合わせ展開(選択肢が無ければデフォルト1件)
                const option_sets = build_option_sets(
                    area_id,
                    selectableOptions[area_id],
                    Const.DEFAULT_OPTIONS,
                );

                // 組み合わせ単位で実行。ある組み合わせがDisallowToSortie(出撃不可)でも
                // 残りの組み合わせ(別phase等)は継続して検証する。
                for (const options of option_sets) {
                    try {
                        const executor = derive_sim_executer(adoptFleet, area_id, options, []);
                        assert_sim_result(start_sim(executor), area_id);
                    } catch (error) {
                        if (error instanceof DisallowToSortie) continue;

                        console.error(build_failure_context({ area_id, options, simSet }));
                        throw error;
                    }
                }
            }
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
