import { ST as ShipType } from "../../data/ship";
import type { FleetComponent } from "./FleetComponent";
import { type Composition, derive_composition } from "../../models/Composition";
import { FleetSeek } from "../../types";
import { extract_ships_from_fleet_unit } from "./FleetUnit";
import { ShipName } from "../../types/shipName";
import { Ft as FleetType } from "./predicate";
import { Sp as Speed } from "../../logic/speed/predicate";
import { round_seek } from "../../logic/seek/fleet";
import { EquippedShip } from "../ship/EquippedShip";
import { BaseShipName } from "../../types/baseShipName";

/**
 * FleetComponentsからSelectedTypeによって抽出、構成されたシミュに使用される艦隊のデフォルト構造
 */
export type AdoptFleet = {
    readonly fleets: FleetComponent[],
    /** 艦隊の構成艦名の配列(含随伴艦隊) */
    readonly ship_names: ShipName[],
    readonly base_ship_names: BaseShipName[],
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
        base_ship_names: all_ships.map(ship => ship.base_name),
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
 * 配列にベース艦が含まれるか判定して返す
 * @param target_base_name 
 * @param search_base_name 
 * @returns 
 */
export function includes_base_ship(
    target_base_name: BaseShipName,
    search_base_name: BaseShipName[],
): boolean {
    return search_base_name.includes(target_base_name);
}

/**
 * target_base_namesに合致するベース艦の数を返す
 * @param target_base_names 
 * @param search_names 
 * @returns 
 */
export function count_ships_by_base_names(
    target_base_names: BaseShipName[],
    search_names: BaseShipName[],
): number {
    return target_base_names
        .filter(name => includes_base_ship(name, search_names))
        .length;
}

const TAIYO_CLASS_BASE_NAMES: BaseShipName[] =
    ['春日丸', '八幡丸', '神鷹'] as const;
/**
 * 艦隊内の大鷹型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Taiyo_class(
    fleet: AdoptFleet,
): number {
    return count_ships_by_base_names(
        TAIYO_CLASS_BASE_NAMES,
        fleet.base_ship_names,
    );
}

const YAMATO_CLASS_BASE_NAMES: BaseShipName[] =
    ['大和', '武蔵'] as const;

/**
 * 艦隊内の大和型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Yamato_class(
    fleet: AdoptFleet,
): number {
    return count_ships_by_base_names(
        YAMATO_CLASS_BASE_NAMES,
        fleet.base_ship_names,
    );
}

const MATSU_CLASS_BASE_NAMES: BaseShipName[] =
    ['松', '竹', '梅', '桃', '杉', '榧'] as const;

/**
 * 艦隊内の松型の数を返す
 * @param fleet AdoptFleet
 */
export function count_Matsu_class(fleet: AdoptFleet): number {
    return count_ships_by_base_names(
        MATSU_CLASS_BASE_NAMES,
        fleet.base_ship_names,
    );
}

/** 礼号作戦ID配列 */
const REIGO_BASE_NAMES: BaseShipName[] = 
    ['足柄', '大淀', '霞', '朝霜', '清霜', '榧', '杉'] as const;

/** 礼号作戦参加艦の数を返す */
export function count_Reigo_ships(fleet: AdoptFleet): number {
    return count_ships_by_base_names(
        REIGO_BASE_NAMES,
        fleet.base_ship_names,
    );
}

const DAIGO_BASE_NAMES: BaseShipName[] =
    ['那智', '木曾', '阿武隈', '多摩', '曙', '潮', '初春', '不知火'] as const;

/** 第五艦隊構成艦の数を返す */
export function count_Daigo_ships(
    fleet: AdoptFleet,
): number {
    return count_ships_by_base_names(
        DAIGO_BASE_NAMES,
        fleet.base_ship_names,
    );
}

/**
 * 空母系+あきつ丸の数を返す
 * @param fleet AdoptFleet
 */
export function count_carriers(fleet: AdoptFleet): number {
    const { CV, CVB, CVL } = fleet.composition;
    return count_ships_by_base_names(['あきつ丸'], fleet.base_ship_names)
        + CV
        + CVB
        + CVL;
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