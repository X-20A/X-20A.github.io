import { describe, expect, it } from "vitest";
import { build_fleet_from_fixture, type ShipFixture } from "../generator/fixture";
import { is_valid_adopt_fleet, validate_adopt_fleet } from "./validate";
import { Ft } from "../../src/models/fleet/predicate";
import type { AdoptFleet } from "../../src/models/fleet/AdoptFleet";
import type { ShipName } from "../../src/types/shipName";

/** 艦種ごとの代表艦(同値クラスの代表値) */
const REP = {
    /** 駆逐 */
    DD: '雪風',
    /** 海防 */
    DE: '占守',
    /** 軽巡 */
    CL: '阿賀野',
    /** 雷巡 */
    CLT: '北上改二',
    /** 練巡 */
    CT: '香取',
    /** 重巡 */
    CA: '那智',
    /** 航巡 */
    CAV: '最上改',
    /** 軽空母(護衛空母でない) */
    CVL: '龍驤',
    /** 護衛空母 */
    CVE: '大鷹',
    /** 正規空母 */
    CV: '赤城',
    /** 装甲空母 */
    CVB: '大鳳',
    /** 高速戦艦 */
    BB_FAST: '金剛',
    /** 低速戦艦 */
    BB_SLOW: '扶桑',
    /** 低速でも第2艦隊に編成できる戦艦 */
    BB_EXCEPTION: 'Гангут',
    /** 航空戦艦(低速) */
    BBV: '伊勢改',
    /** 潜水 */
    SS: '伊168',
    /** 潜水空母 */
    SSV: '伊401',
    /** 水母 */
    AV: '千歳',
    /** 補給 */
    AO: '速吸',
    /** 揚陸 */
    LHA: 'あきつ丸',
    /** 潜水母艦 */
    AS: '大鯨',
    /** 工作 */
    AR: '明石',
} as const satisfies Record<string, ShipName>;

/** 低速艦を高速にする装備 */
const BOOST_SPEED: ShipFixture['equips'] =
    [{ name: '改良型艦本式タービン' }, { name: '強化型艦本式缶' }];

const ships = (...names: ShipName[]): ShipFixture[] =>
    names.map(name => ({ name }));

/**
 * 同じ艦を count 隻並べる
 * バリデータは艦種と速度しか見ないので、隻数の境界を作るのに同一艦を並べて構わない
 */
const repeat = (name: ShipName, count: number): ShipFixture[] =>
    Array.from({ length: count }, () => ({ name }));

const single = (main: ShipFixture[]): AdoptFleet =>
    build_fleet_from_fixture({ main_fleet_ships: main });

const combined = (
    fleet_type: Ft,
    main: ShipFixture[],
    escort: ShipFixture[],
): AdoptFleet => build_fleet_from_fixture({
    main_fleet_ships: main,
    escort_fleet_ships: escort,
    fleet_type,
});

/** 条件を満たす第2艦隊(水雷戦隊) 第1艦隊側の検証で固定値として使う */
const VALID_STRIKE_ESCORT =
    ships('大淀', '雪風', '時雨', '夕立', '綾波', '電');

/** 条件を満たす水上打撃部隊 第1艦隊 */
const VALID_SURFACE_MAIN =
    ships('阿賀野', '由良', '金剛', '榛名', '那智', '赤城');

/** 条件を満たす空母機動部隊 第1艦隊 */
const VALID_CARRIER_MAIN =
    ships('赤城', '加賀', '金剛', '那智', '阿賀野', '島風');

/** 条件を満たす輸送護衛部隊 第1艦隊 */
const VALID_TRANSPORT_MAIN =
    ships('雪風', '時雨', '夕立', '綾波', '阿賀野', '大鷹');

/** 条件を満たす輸送護衛部隊 第2艦隊(警戒部隊) */
const VALID_TRANSPORT_ESCORT =
    ships('大淀', '電', '島風', '占守', '国後');

const surface_main = (main: ShipFixture[]): AdoptFleet =>
    combined(Ft.surface, main, VALID_STRIKE_ESCORT);

const carrier_main = (main: ShipFixture[]): AdoptFleet =>
    combined(Ft.carrier, main, VALID_STRIKE_ESCORT);

const strike_escort = (escort: ShipFixture[]): AdoptFleet =>
    combined(Ft.surface, VALID_SURFACE_MAIN, escort);

const transport_main = (main: ShipFixture[]): AdoptFleet =>
    combined(Ft.transport, main, VALID_TRANSPORT_ESCORT);

const transport_escort = (escort: ShipFixture[]): AdoptFleet =>
    combined(Ft.transport, VALID_TRANSPORT_MAIN, escort);

const expect_valid = (fleet: AdoptFleet): void => {
    expect(validate_adopt_fleet(fleet)).toEqual([]);
    expect(is_valid_adopt_fleet(fleet)).toBe(true);
};

/** expected を含む違反が返る */
const expect_violation = (fleet: AdoptFleet, expected: string): void => {
    const violations = validate_adopt_fleet(fleet);
    expect(
        violations.some(violation => violation.includes(expected)),
        `期待した違反「${expected}」が出ていない: ${JSON.stringify(violations)}`,
    ).toBe(true);
    expect(is_valid_adopt_fleet(fleet)).toBe(false);
};

/** 隻数条件の境界 */
type ShipsBoundary = {
    /** 検証する枠のラベル(艦隊全体の隻数なら '艦数') */
    readonly slot: string;
    readonly min?: number;
    readonly max?: number;
    /** 対象を count 隻含む艦隊を組み立てる */
    readonly build: (count: number) => AdoptFleet;
};

/**
 * 下限-1 / 下限 / 上限 / 上限+1 の4点を検証する
 * 下限-1・上限+1 は目的の違反以外(艦数超過など)が同時に出ても構わないので包含判定
 */
const assert_boundaries = (
    fleet_label: string,
    boundaries: ShipsBoundary[],
): void => {
    for (const { slot, min, max, build } of boundaries) {
        if (min !== undefined) {
            if (min > 0) {
                expect_violation(
                    build(min - 1),
                    `${fleet_label}: ${slot}が${min}隻必要(${min - 1}隻)`,
                );
            }
            expect_valid(build(min));
        }
        if (max !== undefined) {
            expect_valid(build(max));
            expect_violation(
                build(max + 1),
                `${fleet_label}: ${slot}は${max}隻まで(${max + 1}隻)`,
            );
        }
    }
};

/**
 * 同値分割の検証
 * accepted の代表艦はすべて通り、rejected の代表艦はすべて同じ違反になる
 */
const assert_partitions = (params: {
    readonly build: (name: ShipName) => AdoptFleet,
    readonly accepted: readonly ShipName[],
    readonly rejected: readonly ShipName[],
    /** rejected 側で期待する違反 艦名を埋め込む場合は関数で渡す */
    readonly violation: string | ((name: ShipName) => string),
}): void => {
    const { build, accepted, rejected, violation } = params;
    for (const name of accepted) expect_valid(build(name));
    for (const name of rejected) {
        expect_violation(
            build(name),
            typeof violation === 'string' ? violation : violation(name),
        );
    }
};

describe('編成条件バリデータ', () => {
    describe('正常値', () => {
        it('validate-test: 条件を満たす各艦隊種別の編成が通る', () => {
            expect_valid(single(VALID_SURFACE_MAIN));
            expect_valid(combined(Ft.surface, VALID_SURFACE_MAIN, VALID_STRIKE_ESCORT));
            expect_valid(combined(Ft.carrier, VALID_CARRIER_MAIN, VALID_STRIKE_ESCORT));
            expect_valid(combined(Ft.transport, VALID_TRANSPORT_MAIN, VALID_TRANSPORT_ESCORT));
        });

        it('validate-test: 遊撃部隊(7隻)の通常艦隊が通る', () => {
            expect_valid(
                single(ships('雪風', '時雨', '夕立', '綾波', '電', '島風', '阿賀野')),
            );
        });

        it('validate-test: 連合艦隊なのに艦隊が1つしか無い場合を弾く', () => {
            const broken: AdoptFleet = {
                ...single(VALID_SURFACE_MAIN),
                fleet_type: Ft.surface,
            };
            expect_violation(broken, '艦隊数が不正: 2個必要(1個)');
        });
    });

    describe('境界値', () => {
        it('validate-test: 通常艦隊の隻数境界', () => {
            assert_boundaries('通常艦隊', [
                {
                    slot: '艦数',
                    min: 1,
                    max: 7,
                    build: count => single(repeat(REP.DD, count)),
                },
            ]);
        });

        it('validate-test: 水上打撃部隊 第1艦隊の隻数境界', () => {
            assert_boundaries('水上打撃部隊 第1艦隊', [
                {
                    slot: '艦数',
                    min: 2,
                    max: 6,
                    build: count => surface_main(
                        count >= 2
                            ? [...repeat(REP.CL, 2), ...repeat(REP.DD, count - 2)]
                            : repeat(REP.CL, count),
                    ),
                },
                {
                    slot: '軽巡・雷巡',
                    min: 2,
                    build: count => surface_main(
                        [...repeat(REP.CL, count), ...repeat(REP.DD, 2)],
                    ),
                },
                {
                    slot: '重巡・航巡',
                    max: 4,
                    build: count => surface_main(
                        [...repeat(REP.CL, 2), ...repeat(REP.CA, count)],
                    ),
                },
                {
                    slot: '戦艦・航戦',
                    max: 4,
                    build: count => surface_main(
                        [...repeat(REP.CL, 2), ...repeat(REP.BB_FAST, count)],
                    ),
                },
                {
                    slot: '正規空母',
                    max: 1,
                    build: count => surface_main(
                        [...repeat(REP.CL, 2), ...repeat(REP.CV, count)],
                    ),
                },
                {
                    slot: '軽空母',
                    max: 2,
                    build: count => surface_main(
                        [...repeat(REP.CL, 2), ...repeat(REP.CVL, count)],
                    ),
                },
                {
                    slot: '潜水艦',
                    max: 4,
                    build: count => surface_main(
                        [...repeat(REP.CL, 2), ...repeat(REP.SS, count)],
                    ),
                },
            ]);
        });

        it('validate-test: 空母機動部隊 第1艦隊の隻数境界', () => {
            assert_boundaries('空母機動部隊 第1艦隊', [
                {
                    slot: '艦数',
                    min: 2,
                    max: 6,
                    build: count => carrier_main(
                        count >= 2
                            ? [...repeat(REP.CV, 2), ...repeat(REP.DD, count - 2)]
                            : repeat(REP.CV, count),
                    ),
                },
                {
                    slot: '空母系',
                    min: 2,
                    max: 4,
                    build: count => carrier_main(
                        [...repeat(REP.CV, count), ...repeat(REP.DD, 2)],
                    ),
                },
                {
                    slot: '戦艦・航戦',
                    max: 2,
                    build: count => carrier_main(
                        [...repeat(REP.CV, 2), ...repeat(REP.BB_FAST, count)],
                    ),
                },
                {
                    slot: '潜水艦',
                    max: 4,
                    build: count => carrier_main(
                        [...repeat(REP.CV, 2), ...repeat(REP.SS, count)],
                    ),
                },
            ]);
        });

        it('validate-test: 第2艦隊(水雷戦隊)の隻数境界', () => {
            assert_boundaries('第2艦隊(水雷戦隊)', [
                {
                    slot: '艦数',
                    min: 3,
                    max: 6,
                    build: count => strike_escort(
                        count >= 1
                            ? [...repeat(REP.CL, 1), ...repeat(REP.DD, count - 1)]
                            : [],
                    ),
                },
                {
                    slot: '軽巡',
                    min: 1,
                    max: 1,
                    build: count => strike_escort(
                        [...repeat(REP.CL, count), ...repeat(REP.DD, 2)],
                    ),
                },
                {
                    slot: '駆逐',
                    min: 2,
                    max: 5,
                    build: count => strike_escort(
                        [...repeat(REP.CL, 1), ...repeat(REP.DD, count)],
                    ),
                },
                {
                    slot: '重巡・航巡',
                    max: 2,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.CA, count)],
                    ),
                },
                {
                    slot: '水母',
                    max: 1,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.AV, count)],
                    ),
                },
                {
                    slot: '軽空母',
                    max: 1,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.CVL, count)],
                    ),
                },
                {
                    slot: '高速戦艦級',
                    max: 2,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.BB_FAST, count)],
                    ),
                },
                {
                    slot: '低速戦艦級',
                    max: 0,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.BB_SLOW, count)],
                    ),
                },
                {
                    slot: '潜水艦',
                    max: 3,
                    build: count => strike_escort(
                        [...ships(REP.CL, REP.DD, REP.DD), ...repeat(REP.SS, count)],
                    ),
                },
            ]);
        });

        it('validate-test: 輸送護衛部隊 第1艦隊の隻数境界', () => {
            /** 駆逐4隻を土台に、対象艦を count 隻足す */
            const with_destroyers = (name: ShipName) =>
                (count: number) => transport_main(
                    [...repeat(REP.DD, 4), ...repeat(name, count)],
                );

            assert_boundaries('輸送護衛部隊 第1艦隊', [
                {
                    slot: '艦数',
                    min: 4,
                    max: 6,
                    build: count => transport_main(repeat(REP.DD, count)),
                },
                {
                    slot: '駆逐・海防',
                    min: 4,
                    max: 6,
                    build: count => transport_main(repeat(REP.DD, count)),
                },
                { slot: '軽巡・練巡', max: 2, build: with_destroyers(REP.CL) },
                { slot: '航巡', max: 2, build: with_destroyers(REP.CAV) },
                { slot: '航戦', max: 2, build: with_destroyers(REP.BBV) },
                { slot: '水母', max: 2, build: with_destroyers(REP.AV) },
                { slot: '揚陸', max: 2, build: with_destroyers(REP.LHA) },
                { slot: '潜水母艦', max: 2, build: with_destroyers(REP.AS) },
                { slot: '補給', max: 2, build: with_destroyers(REP.AO) },
                { slot: '護衛空母', max: 1, build: with_destroyers(REP.CVE) },
                { slot: '工作艦', max: 1, build: with_destroyers(REP.AR) },
            ]);
        });

        it('validate-test: 輸送護衛部隊 第2艦隊の隻数境界', () => {
            assert_boundaries('輸送護衛部隊 第2艦隊', [
                {
                    slot: '艦数',
                    min: 4,
                    max: 6,
                    build: count => transport_escort(
                        count >= 1
                            ? [...repeat(REP.CL, 1), ...repeat(REP.DD, count - 1)]
                            : [],
                    ),
                },
                {
                    slot: '軽巡・練巡',
                    min: 1,
                    max: 2,
                    build: count => transport_escort(
                        [...repeat(REP.CL, count), ...repeat(REP.DD, 3)],
                    ),
                },
                {
                    slot: '駆逐・海防',
                    min: 3,
                    max: 5,
                    build: count => transport_escort(
                        [...repeat(REP.CL, 1), ...repeat(REP.DD, count)],
                    ),
                },
                {
                    slot: '重巡・航巡',
                    max: 2,
                    build: count => transport_escort(
                        [...ships(REP.CL), ...repeat(REP.DD, 3), ...repeat(REP.CA, count)],
                    ),
                },
            ]);
        });
    });

    describe('同値分割', () => {
        it('validate-test: 艦隊種別ごとに別の編成条件が適用される', () => {
            // 同じ第1艦隊(軽巡2隻)でも、艦隊種別によって通ったり弾かれたりする
            const main = repeat(REP.CL, 2);

            expect_valid(surface_main(main));
            expect_violation(
                carrier_main(main),
                '空母機動部隊 第1艦隊: 空母系が2隻必要(0隻)',
            );
            expect_violation(
                transport_main(main),
                '輸送護衛部隊 第1艦隊: 駆逐・海防が4隻必要(0隻)',
            );
        });

        it('validate-test: 水上打撃部隊 第1艦隊の軽巡・雷巡枠に数える', () => {
            assert_partitions({
                // 軽巡・雷巡枠に数えるなら2隻揃って通り、数えないなら1隻不足で弾かれる
                build: name => surface_main([...ships(REP.CL), { name }]),
                accepted: [REP.CL, REP.CLT],
                rejected: [REP.CT, REP.DD, REP.DE, REP.CA, REP.CAV],
                violation: '水上打撃部隊 第1艦隊: 軽巡・雷巡が2隻必要(1隻)',
            });
        });

        it('validate-test: 水上打撃部隊 第1艦隊の正規空母枠と軽空母枠の区別', () => {
            assert_partitions({
                // 正規空母枠(上限1)に数えるなら2隻目で弾かれ、軽空母枠なら通る
                build: name => surface_main([...repeat(REP.CL, 2), ...ships(REP.CV), { name }]),
                accepted: [REP.CVL, REP.CVE],
                rejected: [REP.CV, REP.CVB],
                violation: '水上打撃部隊 第1艦隊: 正規空母は1隻まで(2隻)',
            });
        });

        it('validate-test: 空母機動部隊 第1艦隊の空母系に数える艦種', () => {
            assert_partitions({
                build: name => carrier_main([...ships(REP.CV), { name }, ...repeat(REP.DD, 2)]),
                accepted: [REP.CV, REP.CVB, REP.CVL, REP.CVE],
                rejected: [REP.AV, REP.LHA, REP.BBV, REP.CAV],
                violation: '空母機動部隊 第1艦隊: 空母系が2隻必要(1隻)',
            });
        });

        it('validate-test: 第2艦隊(水雷戦隊)の軽巡枠に数える艦種', () => {
            assert_partitions({
                // 軽巡枠は軽巡のみ 雷巡・練巡は数えない
                build: name => strike_escort([{ name }, ...repeat(REP.DD, 2)]),
                accepted: [REP.CL],
                rejected: [REP.CLT, REP.CT, REP.CA, REP.DD],
                violation: '第2艦隊(水雷戦隊): 軽巡が1隻必要(0隻)',
            });
        });

        it('validate-test: 第2艦隊(水雷戦隊)の駆逐枠に海防艦を数えない', () => {
            assert_partitions({
                build: name => strike_escort([...ships(REP.CL, REP.DD), { name }]),
                accepted: [REP.DD],
                rejected: [REP.DE, REP.CLT, REP.AV],
                violation: '第2艦隊(水雷戦隊): 駆逐が2隻必要(1隻)',
            });
        });

        it('validate-test: 第2艦隊(水雷戦隊)に編成できる戦艦の速度クラス', () => {
            const with_BB = (fixture: ShipFixture) =>
                strike_escort([...ships(REP.CL, REP.DD, REP.DD), fixture]);

            // 高速クラス: 素で高速
            expect_valid(with_BB({ name: REP.BB_FAST }));
            expect_valid(with_BB({ name: '大和改二' }));
            // 高速クラス: 装備で高速化したもの
            expect_valid(with_BB({ name: REP.BB_SLOW, equips: BOOST_SPEED }));
            expect_valid(with_BB({ name: '大和', equips: BOOST_SPEED }));
            expect_valid(with_BB({ name: REP.BBV, equips: BOOST_SPEED }));

            // 例外クラス: 低速のまま編成できる
            for (const name of ['Гангут', 'Октябрьская революция', 'Гангут два'] as const) {
                expect_valid(with_BB({ name }));
            }

            // 低速クラス
            for (const name of [REP.BB_SLOW, REP.BBV, '大和'] as const) {
                expect_violation(
                    with_BB({ name }),
                    '第2艦隊(水雷戦隊): 低速戦艦級は0隻まで(1隻)',
                );
            }
        });

        it('validate-test: 輸送護衛部隊 第1艦隊に編成できる艦種', () => {
            assert_partitions({
                build: name => transport_main([...repeat(REP.DD, 4), { name }]),
                accepted: [
                    REP.DD, REP.DE, REP.CL, REP.CT, REP.CAV, REP.BBV,
                    REP.AV, REP.LHA, REP.AS, REP.AO, REP.AR, REP.CVE,
                ],
                rejected: [
                    REP.BB_FAST, REP.BB_SLOW, REP.CV, REP.CVB, REP.CVL,
                    REP.CA, REP.CLT, REP.SS, REP.SSV,
                ],
                violation: name => `輸送護衛部隊 第1艦隊: 編成不可艦種(${name})`,
            });
        });

        it('validate-test: 輸送護衛部隊 第1艦隊の軽空母は護衛空母のみ編成できる', () => {
            assert_partitions({
                build: name => transport_main([...repeat(REP.DD, 4), { name }]),
                accepted: ['大鷹', '雲鷹', '神鷹', 'Gambier Bay'],
                rejected: ['龍驤', '祥鳳', '千歳航'],
                violation: name => `輸送護衛部隊 第1艦隊: 編成不可艦種(${name})`,
            });
        });

        it('validate-test: 連合艦隊の旗艦に置けない艦種', () => {
            // 第1艦隊
            assert_partitions({
                build: name => surface_main([{ name }, ...repeat(REP.CL, 2)]),
                accepted: [REP.CL, REP.DD, REP.CA, REP.CV, REP.BB_FAST, REP.AV],
                rejected: [REP.SS, REP.SSV],
                violation: name =>
                    `水上打撃部隊 第1艦隊: 旗艦は潜水艦以外であること(${name})`,
            });

            // 第2艦隊
            assert_partitions({
                build: name => strike_escort([{ name }, ...ships(REP.CL, REP.DD, REP.DD)]),
                accepted: [REP.DD, REP.CA, REP.AV],
                rejected: [REP.SS, REP.SSV],
                violation: name =>
                    `第2艦隊(水雷戦隊): 旗艦は潜水艦以外であること(${name})`,
            });
        });

        it('validate-test: 通常艦隊は旗艦の艦種を問わない', () => {
            assert_partitions({
                build: name => single([{ name }, ...repeat(REP.DD, 2)]),
                accepted: [REP.SS, REP.SSV, REP.DD, REP.CL, REP.CV, REP.AR],
                rejected: [],
                violation: '',
            });
        });

        it('validate-test: 輸送護衛部隊 第2艦隊の旗艦になれる艦種', () => {
            assert_partitions({
                build: name => transport_escort([{ name }, ...repeat(REP.DD, 3)]),
                accepted: [REP.CL, REP.CT],
                rejected: [REP.DD, REP.DE, REP.CA, REP.CAV],
                violation: name =>
                    `輸送護衛部隊 第2艦隊: 旗艦は軽巡・練巡であること(${name})`,
            });
        });

        it('validate-test: 輸送護衛部隊の駆逐・海防枠に数える艦種', () => {
            assert_partitions({
                build: name => transport_main([...repeat(REP.DD, 3), { name }]),
                accepted: [REP.DD, REP.DE],
                rejected: [REP.CL, REP.CT, REP.CAV, REP.AV],
                violation: '輸送護衛部隊 第1艦隊: 駆逐・海防が4隻必要(3隻)',
            });
        });
    });
});
