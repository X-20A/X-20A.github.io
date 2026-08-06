import { ST as ShipType } from "../../src/data/ship";
import type { AdoptFleet } from "../../src/models/fleet/AdoptFleet";
import type { FleetComponent } from "../../src/models/fleet/FleetComponent";
import { extract_ships_from_fleet_unit } from "../../src/models/fleet/FleetUnit";
import { EquippedShip } from "../../src/models/ship/EquippedShip";
import { Ft as FleetType } from "../../src/models/fleet/predicate";
import { Sp as Speed } from "../../src/logic/speed/predicate";
import { BaseShipName } from "../../src/types/baseShipName";

/*
 * 連合艦隊の編成条件
 * https://wikiwiki.jp/kancolle/連合艦隊
 *
 * 表の「その他 0〜n隻」の行は、必須枠の下限と艦隊上限6隻から自動的に満たされるので
 * ルールとしては持たせていない。
 */

/** 1艦隊の最大隻数 */
const MAX_FLEET_SHIPS = 6;

/** 遊撃部隊を含む通常艦隊の最大隻数 */
const MAX_SINGLE_FLEET_SHIPS = 7;

/** 護衛空母のベース艦名(大鷹型 + Casablanca級) */
const ESCORT_CARRIER_BASE_NAMES: BaseShipName[] =
    ['春日丸', '八幡丸', '神鷹', 'Gambier Bay'] as const;

type ShipMatcher = (ship: EquippedShip) => boolean;

/** 艦種枠ごとの隻数条件 */
type SlotRule = {
    readonly label: string;
    readonly match: ShipMatcher;
    /** 下限(省略時0) */
    readonly min?: number;
    /** 上限(省略時は艦隊上限) */
    readonly max?: number;
};

/** 1艦隊分の編成条件 */
export type FleetRule = {
    readonly label: string;
    readonly min_ships: number;
    readonly max_ships: number;
    readonly slots: readonly SlotRule[];
    /** 編成可能艦種のホワイトリスト(省略時は制限無し) */
    readonly allowed?: { readonly label: string, readonly match: ShipMatcher };
    /** 旗艦条件(省略時は制限無し) */
    readonly flagship?: { readonly label: string, readonly match: ShipMatcher };
};

const of_type = (...types: ShipType[]): ShipMatcher =>
    ship => types.includes(ship.type);

/** 軽巡級 */
const is_CLs = of_type(ShipType.CL, ShipType.CLT);
/** 軽巡 + 練巡 */
const is_CLE = of_type(ShipType.CL, ShipType.CT);
/** 重巡級 */
const is_CAs = of_type(ShipType.CA, ShipType.CAV);
/** 戦艦 + 航戦 */
const is_BBs = of_type(ShipType.BB, ShipType.BBV);
/** 正規空母 + 装甲空母 */
const is_CVH = of_type(ShipType.CV, ShipType.CVB);
/** 空母系 */
const is_CVs = of_type(ShipType.CV, ShipType.CVB, ShipType.CVL);
/** 駆逐 + 海防 */
const is_Ds = of_type(ShipType.DD, ShipType.DE);
/** 潜水 + 潜空 */
const is_Ss = of_type(ShipType.SS, ShipType.SSV);

/** 低速でも第2艦隊に編成できる戦艦のベース艦名 */
const SLOW_ESCORT_BB_BASE_NAMES: BaseShipName[] = ['Гангут'] as const;

/** 第2艦隊に編成できる戦艦級(高速以上、または例外艦) 速度は装備込みで判定する */
const is_fast_BBs: ShipMatcher =
    ship => is_BBs(ship)
        && (
            ship.speed >= Speed.fast
            || SLOW_ESCORT_BB_BASE_NAMES.includes(ship.base_name)
        );

/** 第2艦隊に編成できない低速の戦艦級 */
const is_slow_BBs: ShipMatcher =
    ship => is_BBs(ship) && !is_fast_BBs(ship);

/** 護衛空母 */
const is_escort_CV: ShipMatcher =
    ship => ship.type === ShipType.CVL
        && ESCORT_CARRIER_BASE_NAMES.includes(ship.base_name);

const NOT_SS = { label: '潜水艦以外', match: (ship: EquippedShip) => !is_Ss(ship) };

/** 水上打撃部隊 第1艦隊(水上部隊) */
const SURFACE_MAIN: FleetRule = {
    label: '水上打撃部隊 第1艦隊',
    min_ships: 2,
    max_ships: MAX_FLEET_SHIPS,
    slots: [
        { label: '軽巡・雷巡', match: is_CLs, min: 2 },
        { label: '重巡・航巡', match: is_CAs, max: 4 },
        { label: '戦艦・航戦', match: is_BBs, max: 4 },
        { label: '正規空母', match: is_CVH, max: 1 },
        { label: '軽空母', match: of_type(ShipType.CVL), max: 2 },
        { label: '潜水艦', match: is_Ss, max: 4 },
    ],
    flagship: NOT_SS,
};

/** 空母機動部隊 第1艦隊(機動部隊) */
const CARRIER_MAIN: FleetRule = {
    label: '空母機動部隊 第1艦隊',
    min_ships: 2,
    max_ships: MAX_FLEET_SHIPS,
    slots: [
        { label: '空母系', match: is_CVs, min: 2, max: 4 },
        { label: '戦艦・航戦', match: is_BBs, max: 2 },
        { label: '潜水艦', match: is_Ss, max: 4 },
    ],
    flagship: NOT_SS,
};

/** 第2艦隊(水雷戦隊) 水上打撃部隊・空母機動部隊で共通 */
const STRIKE_ESCORT: FleetRule = {
    label: '第2艦隊(水雷戦隊)',
    min_ships: 3,
    max_ships: MAX_FLEET_SHIPS,
    slots: [
        { label: '軽巡', match: of_type(ShipType.CL), min: 1, max: 1 },
        { label: '駆逐', match: of_type(ShipType.DD), min: 2, max: 5 },
        { label: '重巡・航巡', match: is_CAs, max: 2 },
        { label: '水母', match: of_type(ShipType.AV), max: 1 },
        { label: '軽空母', match: of_type(ShipType.CVL), max: 1 },
        { label: '高速戦艦級', match: is_fast_BBs, max: 2 },
        { label: '低速戦艦級', match: is_slow_BBs, max: 0 },
        { label: '潜水艦', match: is_Ss, max: 3 },
    ],
    flagship: NOT_SS,
};

/** 輸送護衛部隊 第1艦隊(輸送部隊) */
const TRANSPORT_MAIN: FleetRule = {
    label: '輸送護衛部隊 第1艦隊',
    min_ships: 4,
    max_ships: MAX_FLEET_SHIPS,
    slots: [
        { label: '駆逐・海防', match: is_Ds, min: 4, max: 6 },
        { label: '軽巡・練巡', match: is_CLE, max: 2 },
        { label: '航巡', match: of_type(ShipType.CAV), max: 2 },
        { label: '航戦', match: of_type(ShipType.BBV), max: 2 },
        { label: '水母', match: of_type(ShipType.AV), max: 2 },
        { label: '揚陸', match: of_type(ShipType.LHA), max: 2 },
        { label: '潜水母艦', match: of_type(ShipType.AS), max: 2 },
        { label: '補給', match: of_type(ShipType.AO), max: 2 },
        { label: '護衛空母', match: is_escort_CV, max: 1 },
        { label: '工作艦', match: of_type(ShipType.AR), max: 1 },
    ],
    allowed: {
        label: '駆逐・海防・軽巡・練巡・航巡・航戦・水母・揚陸・潜水母艦・補給・護衛空母・工作艦',
        match: ship => is_Ds(ship)
            || is_CLE(ship)
            || of_type(
                ShipType.CAV,
                ShipType.BBV,
                ShipType.AV,
                ShipType.LHA,
                ShipType.AS,
                ShipType.AO,
                ShipType.AR,
            )(ship)
            || is_escort_CV(ship),
    },
};

/** 輸送護衛部隊 第2艦隊(警戒部隊) */
const TRANSPORT_ESCORT: FleetRule = {
    label: '輸送護衛部隊 第2艦隊',
    min_ships: 4,
    max_ships: MAX_FLEET_SHIPS,
    slots: [
        { label: '軽巡・練巡', match: is_CLE, min: 1, max: 2 },
        { label: '駆逐・海防', match: is_Ds, min: 3, max: 5 },
        { label: '重巡・航巡', match: is_CAs, max: 2 },
    ],
    flagship: { label: '軽巡・練巡', match: is_CLE },
};

/** 通常艦隊(遊撃部隊含む) 艦種条件は無い */
const SINGLE: FleetRule = {
    label: '通常艦隊',
    min_ships: 1,
    max_ships: MAX_SINGLE_FLEET_SHIPS,
    slots: [],
};

/** 艦隊種別ごとの編成条件 */
export const FLEET_RULES: Readonly<Record<FleetType, readonly FleetRule[]>> = {
    [FleetType.single]: [SINGLE],
    [FleetType.carrier]: [CARRIER_MAIN, STRIKE_ESCORT],
    [FleetType.surface]: [SURFACE_MAIN, STRIKE_ESCORT],
    [FleetType.transport]: [TRANSPORT_MAIN, TRANSPORT_ESCORT],
} as const;

const validate_fleet_component = (
    component: FleetComponent,
    rule: FleetRule,
): string[] => {
    const violations: string[] = [];
    const ships = extract_ships_from_fleet_unit(component.units);

    const push_range = (
        label: string,
        count: number,
        min: number,
        max: number,
    ) => {
        if (count < min) {
            violations.push(`${rule.label}: ${label}が${min}隻必要(${count}隻)`);
        }
        if (count > max) {
            violations.push(`${rule.label}: ${label}は${max}隻まで(${count}隻)`);
        }
    };

    push_range('艦数', ships.length, rule.min_ships, rule.max_ships);

    for (const slot of rule.slots) {
        push_range(
            slot.label,
            ships.filter(slot.match).length,
            slot.min ?? 0,
            slot.max ?? rule.max_ships,
        );
    }

    if (rule.allowed) {
        const invalids = ships.filter(ship => !rule.allowed!.match(ship));
        if (invalids.length > 0) {
            violations.push(
                `${rule.label}: 編成不可艦種`
                + `(${invalids.map(ship => ship.name).join(', ')})`
                + ` 編成可能なのは${rule.allowed.label}`
            );
        }
    }

    const flagship = ships[0];
    if (rule.flagship && flagship && !rule.flagship.match(flagship)) {
        violations.push(
            `${rule.label}: 旗艦は${rule.flagship.label}であること`
            + `(${flagship.name})`
        );
    }

    return violations;
};

/**
 * AdoptFleetが編成条件を満たすか検証し、違反内容の配列を返す
 * @param fleet AdoptFleet
 * @returns 違反内容の配列(空配列なら編成条件を満たしている)
 */
export function validate_adopt_fleet(fleet: AdoptFleet): string[] {
    const rules = FLEET_RULES[fleet.fleet_type];
    if (!rules) return [`未知の艦隊種別(${fleet.fleet_type})`];

    if (fleet.fleets.length !== rules.length) {
        return [
            `艦隊数が不正: ${rules.length}個必要(${fleet.fleets.length}個)`
        ];
    }

    return rules.flatMap(
        (rule, index) => validate_fleet_component(fleet.fleets[index], rule)
    );
}

/**
 * AdoptFleetが編成条件を満たすか判定して返す
 * @param fleet AdoptFleet
 */
export function is_valid_adopt_fleet(fleet: AdoptFleet): boolean {
    return validate_adopt_fleet(fleet).length === 0;
}
