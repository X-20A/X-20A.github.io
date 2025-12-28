import { ST as ShipType } from "../../data/ship";
import type { FleetComponent } from "./FleetComponent";
import { type Composition, derive_composition } from "../../models/Composition";
import { FleetSeek } from "../../types";
import { extract_ships_from_fleet_unit } from "./FleetUnit";
import { ShipName } from "../../types/shipName";
import { Ft as FleetType } from "./predicate";
import { Sp as Speed } from "../../logic/speed/predicate";
import { round_seek } from "../../logic/seek/fleet";
import { includes_ship_name } from "../ship/predicate";
import { EquippedShip } from "../ship/EquippedShip";

/**
 * FleetComponentsからSelectedTypeによって抽出、構成されたシミュに使用される艦隊のデフォルト構造
 */
export type AdoptFleet = {
    readonly fleets: FleetComponent[],
    /** 艦隊の構成艦名の配列(含随伴艦隊) */
    readonly ship_names: ShipName[],
    readonly composition: Composition,
    readonly fleet_type: FleetType,
    readonly ships_length: number,
    readonly speed: Speed,
    readonly seek: FleetSeek,
    readonly save_seek: FleetSeek,
    readonly drum_carrier_count: number;
    readonly radar_carrier_count: number;
    readonly craft_carrier_count: number;
    readonly arBulge_carrier_count: number;
    readonly SBB_count: number;
}

/**
 * AdoptFleetオブジェクトを生成する
 * @param fleets - FleetComponent配列
 * @param fleet_type_id - 艦隊種別ID
 * @param seek - 艦隊索敵値(省略可)
 * @param save_seek - 艦隊索敵値(退避, 省略可)
 * @returns AdoptFleetオブジェクト
 */
export function derive_adopt_fleet(
    fleets: FleetComponent[],
    fleet_type_id: FleetType,
    seek?: FleetSeek,
    save_seek?: FleetSeek
): AdoptFleet {
    const is_combined = fleet_type_id > 0;
    const all_ships = fleets[1]
        ? extract_ships_from_fleet_unit(fleets[0].units)
            .concat(extract_ships_from_fleet_unit(fleets[1].units))
        : extract_ships_from_fleet_unit(fleets[0].units);

    let speed: Speed;
    let fleet_seek: FleetSeek;
    let fleet_save_seek: FleetSeek;
    let drum_carrier_count: number;
    let radar_carrier_count: number;
    let craft_carrier_count: number;
    let arBulge_carrier_count: number;
    let SBB_count: number;

    if (is_combined) {
        const main = fleets[0];
        const escort = fleets[1];

        if (main.speed === 4 && escort.speed === 4) {
            speed = 4;
        } else if (main.speed >= 3 && escort.speed >= 3) {
            speed = 3;
        } else if (main.speed >= 2 && escort.speed >= 2) {
            speed = 2;
        } else {
            speed = 1;
        }

        const total_seek: FleetSeek = {
            c1: main.seek.c1 + escort.seek.c1,
            c2: main.seek.c2 + escort.seek.c2,
            c3: main.seek.c3 + escort.seek.c3,
            c4: main.seek.c4 + escort.seek.c4,
        };

        fleet_seek = seek ?? round_seek(total_seek);
        fleet_save_seek = save_seek ?? fleet_seek;

        drum_carrier_count = main.drum_carrier_count + escort.drum_carrier_count;
        radar_carrier_count = main.radar_carrier_count + escort.radar_carrier_count;
        craft_carrier_count = main.craft_carrier_count + escort.craft_carrier_count;
        arBulge_carrier_count = main.arBulge_carrier_count + escort.arBulge_carrier_count;
        SBB_count = main.SBB_count + escort.SBB_count;
    } else {
        const fleet = fleets[0];

        speed = fleet.speed;

        fleet_seek = seek ?? round_seek(fleet.seek);
        fleet_save_seek = save_seek ?? fleet_seek;

        drum_carrier_count = fleet.drum_carrier_count;
        radar_carrier_count = fleet.radar_carrier_count;
        craft_carrier_count = fleet.craft_carrier_count;
        arBulge_carrier_count = fleet.arBulge_carrier_count;
        SBB_count = fleet.SBB_count;
    }

    const fleet: AdoptFleet = {
        fleets,
        ship_names: all_ships.map(ship => ship.name),
        composition: derive_composition(all_ships),
        fleet_type: fleet_type_id,
        ships_length: all_ships.length,
        speed,
        seek: fleet_seek,
        save_seek: fleet_save_seek,
        drum_carrier_count,
        radar_carrier_count,
        craft_carrier_count,
        arBulge_carrier_count,
        SBB_count,
    };

    return fleet;
}

/**
 * 主力艦隊の艦名配列を返す
 * @param fleet AdoptFleet
 */
export function calc_main_fleet_ship_names(fleet: AdoptFleet): ShipName[] {
    const ships = extract_ships_from_fleet_unit(fleet.fleets[0].units);
    return ships.map(ship => ship.name);
}

/**
 * 随伴艦隊の艦名配列を返す
 * @param fleet AdoptFleet
 */
export function calc_escort_fleet_ship_names(fleet: AdoptFleet): ShipName[] {
    const escort_fleet = fleet.fleets[1];
    if (!escort_fleet) return [];

    const ships = extract_ships_from_fleet_unit(fleet.fleets[1].units);
    return ships.map(ship => ship.name);
}

/**
 * 主力艦隊の艦数を返す
 * @param fleet AdoptFleet
 */
export function get_main_fleet_ships_length(fleet: AdoptFleet): number {
    return fleet.fleets[0].units.length;
}

/**
 * 随伴艦隊の艦数を返す
 * @param fleet AdoptFleet
 */
export function get_escort_fleet_ships_length(fleet: AdoptFleet): number {
    return fleet.fleets[1]?.units.length ?? 0;
}

/**
 * 艦隊構成艦にtarget_nameが含まれるか判定(部分一致)
 * @param fleet AdoptFleet
 * @param target_name 判定する艦の名前(部分一致)
 * @returns 艦が在籍していればtrue
 */
export function include_ship_names(fleet: AdoptFleet, target_name: string | string[]): boolean {
    if (Array.isArray(target_name)) {
        return target_name.some(
            name => fleet.ship_names.some(ship_name => ship_name.includes(name))
        );
    } else {
        return fleet.ship_names.some(ship_name => ship_name.includes(target_name));
    }
}

/**
 * 旗艦を返す
 * @param fleet 
 * @returns 
 */
export function extract_flagship(
    fleet: AdoptFleet,
): EquippedShip {
    return fleet.fleets[0].units[0].ship;
}

/**
 * 旗艦が軽巡であるか判定
 * @param fleet AdoptFleet
 */
export function is_flagship_CL(fleet: AdoptFleet): boolean {
    return extract_flagship(fleet).type === ShipType.CL;
}

/**
 * 艦隊構成艦に含まれる艦名がtarget_name(部分一致)の艦をカウント
 * @param fleet AdoptFleet
 * @param target_name 判定する艦の名前(部分一致)
 * @returns 該当する艦の隻数
 */
export function count_ship(
    fleet: AdoptFleet,
    target_name: ShipName | ShipName[],
): number {
    if (Array.isArray(target_name)) {
        return fleet.ship_names.filter(ship_name =>
            target_name.some(target => ship_name.includes(target))
        ).length;
    } else {
        return fleet.ship_names
            .filter(ship_name => ship_name.includes(target_name))
            .length;
    }
}

/**
 * 艦隊構成艦に含まれる艦名が target_name (完全一致) の艦をカウント
 * @param fleet AdoptFleet
 * @param target_name 判定する艦の名前(完全一致)
 * @returns 該当する艦の隻数
 */
export function count_ship_exact(
    fleet: AdoptFleet,
    target_name: ShipName | ShipName[],
): number {
    if (Array.isArray(target_name)) {
        return fleet.ship_names.filter(ship_name =>
            target_name.includes(ship_name)
        ).length;
    } else {
        return fleet.ship_names
            .filter(
                ship_name => ship_name === target_name
            ).length;
    }
}

const TAIYO_CLASS_NAMES: ShipName[] =
    ['春日丸', '大鷹', '八幡丸', '雲鷹', '神鷹'] as const;
/**
 * 艦隊内の大鷹型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Taiyo_class(fleet: AdoptFleet): number {
    return fleet.ship_names.filter(ship_name =>
        TAIYO_CLASS_NAMES.some(name => ship_name.startsWith(name))
    ).length;
}

const YAMATO_CLASS_NAMES: ShipName[] =
    [
        '大和', '大和改', '大和改二', '大和改二重',
        '武蔵', '武蔵改', '武蔵改二',
    ] as const;

export function count_ships_by_names(
    target_names: ShipName[],
    search_names: ShipName[],
): number {
    return search_names.filter(ship_name =>
        includes_ship_name(target_names, ship_name)
    ).length;
}

/**
 * 艦隊内の大和型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Yamato_class(fleet: AdoptFleet): number {
    return count_ships_by_names(YAMATO_CLASS_NAMES, fleet.ship_names);
}

const MATSU_CLASS_NAMES: ShipName[] =
    [
        '松', '松改',
        '竹', '竹改',
        '梅', '梅改',
        '桃', '桃改',
        '杉', '杉改',
        '榧', '榧改',
    ] as const;
/**
 * 艦隊内の松型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Matsu_class(fleet: AdoptFleet): number {
    return fleet.ship_names.filter(ship_name =>
        MATSU_CLASS_NAMES.some(name => ship_name === name)
    ).length;
}

/** 作戦参加艦のグループ型 */
type OperationShipGroups = ReadonlyArray<readonly ShipName[]>;

/**
 * 艦隊内の作戦参加艦の数を返す（同名艦グループは1隻のみカウント）
 * @param fleet 艦隊
 * @param ship_groups 作戦参加艦のグループ配列
 */
const count_operation_ships = (
    fleet: AdoptFleet,
    ship_groups: OperationShipGroups,
): number => {
    const counted_groups = new Set<number>();

    return fleet.ship_names.filter(ship_name => {
        const group_index = ship_groups.findIndex(names =>
            names.includes(ship_name)
        );

        if (group_index === -1 || counted_groups.has(group_index)) {
            return false;
        }

        counted_groups.add(group_index);
        return true;
    }).length;
}

/** 礼号作戦ID配列 */
const REIGO_PARTICIPATED_SHIP_NAMES: OperationShipGroups = [
    ['足柄', '足柄改', '足柄改二'],
    ['大淀', '大淀改'],
    ['霞', '霞改', '霞改二', '霞改二乙'],
    ['朝霜', '朝霜改', '朝霜改二'],
    ['清霜', '清霜改', '清霜改二', '清霜改二丁'],
    ['榧', '榧改'],
    ['杉', '杉改'],
] as const;

/** 礼号作戦参加艦の数を返す */
export function count_Reigo_ships(fleet: AdoptFleet): number {
    return count_operation_ships(fleet, REIGO_PARTICIPATED_SHIP_NAMES);
}

/** 第五艦隊構成艦配列 */
const DAIGO_CONSTITUENT_SHIP_NAMES: OperationShipGroups = [
    ['那智', '那智改', '那智改二'],
    ['木曾', '木曾改', '木曾改二'],
    ['阿武隈', '阿武隈改', '阿武隈改二'],
    ['多摩', '多摩改', '多摩改二'],
    ['曙', '曙改', '曙改二'],
    ['潮', '潮改', '潮改二'],
    ['初春', '初春改', '初春改二'],
    ['不知火', '不知火改', '不知火改二'],
] as const;

/** 第五艦隊構成艦の数を返す */
export function count_Daigo_ships(fleet: AdoptFleet): number {
    return count_operation_ships(fleet, DAIGO_CONSTITUENT_SHIP_NAMES);
}

/**
 * 空母系+あきつ丸の数を返す
 * @param fleet AdoptFleet
 */
export function count_carriers(fleet: AdoptFleet): number {
    const composition = fleet.composition;
    return count_ship(fleet, 'あきつ丸')
        + composition.CV
        + composition.CVB
        + composition.CVL;
}

/**
 * 寒冷地装備＆甲板要員を装備していない、空母系orあきつ丸の数を返す
 * @param fleet AdoptFleet
 */
export function count_not_equip_arctic_carriers(fleet: AdoptFleet): number {
    let count = 0;
    for (const f of fleet.fleets) {
        for (const unit of f.units) {
            const { ship } = unit;
            if (
                [ShipType.CV, ShipType.CVB, ShipType.CVL].includes(ship.type) ||
                ship.name.includes('あきつ丸')
            ) {
                if (!ship.has_arctic_gear) count++;
            }
        }
    }
    return count;
}

export const MAX_SEEK: FleetSeek = {
    c1: 999,
    c2: 999,
    c3: 999,
    c4: 999,
} as const;

/**
 * 索敵無視の為に索敵値を退避フィールドと切替
 * @param fleet AdoptFleet
 * @returns
 */
export function switch_seek(fleet: AdoptFleet): AdoptFleet {
    if (Object.values(fleet.seek).every(value => value === 999)) {
        return derive_adopt_fleet(
            fleet.fleets,
            fleet.fleet_type,
            fleet.save_seek,
            fleet.save_seek
        );
    } else {
        return derive_adopt_fleet(
            fleet.fleets,
            fleet.fleet_type,
            MAX_SEEK,
            fleet.seek
        );
    }
}

/**
 * 艦隊内のドラム缶の総数を返す
 * @param fleet AdoptFleet
 */
export function count_total_drum(fleet: AdoptFleet): number {
    if (fleet.fleets.length === 2) {
        return fleet.fleets[0].total_drum_count
            + fleet.fleets[1].total_drum_count;
    } else {
        return fleet.fleets[0].total_drum_count;
    }
}

/**
 * 資源マスでの獲得資源増加に有効な艦隊内の大発の総数を返す
 * @param fleet AdoptFleet
 */
export function count_total_valid_craft(fleet: AdoptFleet): number {
    if (fleet.fleets.length === 2) {
        return fleet.fleets[0].total_valid_craft_count
            + fleet.fleets[1].total_valid_craft_count;
    } else {
        return fleet.fleets[0].total_valid_craft_count;
    }
}
