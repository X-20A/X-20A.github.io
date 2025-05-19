import { type Seek } from "../models/types";
import { ST as ShipType } from "@/data/ship";
import Const from "../constants/const";
import { Ft as FleetType, Sp as Speed } from "../core/branch";
import { CacheFleet, createCacheFleet } from "./CacheFleet";
import { Composition, createComposition } from "@/models/Composition";

/**
 * AdoptFleetのプロパティ型
 */
export interface AdoptFleet {
    fleets: CacheFleet[];
    composition: Composition;
    ship_names: string[];
    fleet_type: FleetType;
    isUnion: boolean;
    fleet_length: number;
    isFaster: boolean;
    speed: Speed;
    seek: Seek;
    save_seek: Seek;
    drum_carrier_count: number;
    radar_carrier_count: number;
    craft_carrier_count: number;
    arBulge_carrier_count: number;
    SBB_count: number;
    yamato_class_count: number;
    matsu_count: number;
    daigo_count: number;
    reigo_count: number;
}

/** 第五艦隊ID配列 */
const DAIGO_IDS: ReadonlyArray<ReadonlyArray<number>> = [
    [16, 233, 407],
    [63, 192, 266],
    [64, 193, 267],
    [114, 290, 200],
    [100, 216, 547],
    [101, 146, 217],
    [49, 253, 464, 470],
    [18, 226, 567],
    [631, 700],
    [15, 231, 665],
    [41, 241, 419],
    [38, 238, 326],
    [40, 240],
];

/** 礼号作戦ID配列 */
const REIGO_IDS: ReadonlyArray<ReadonlyArray<number>> = [
    [64, 267, 193],
    [183, 321],
    [49, 253, 464, 470],
    [410, 325, 955, 960],
    [425, 344, 578],
    [994, 736],
    [992, 997],
];

/**
 * AdoptFleetオブジェクトを生成する
 * @param fleets - CacheFleet配列
 * @param fleet_type_id - 艦隊種別ID
 * @param seek - 艦隊索敵値(省略可)
 * @param save_seek - 艦隊索敵値(退避, 省略可)
 * @returns AdoptFleetオブジェクト
 */
export function createAdoptFleet(
    fleets: CacheFleet[],
    fleet_type_id: FleetType,
    seek?: Seek,
    save_seek?: Seek
): AdoptFleet {
    // CacheFleetのバージョンが古い場合は再生成
    if (!fleets[0].version || fleets[0].version < Const.FLEET_VERSION) {
        fleets = fleets.map(fleet => createCacheFleet(fleet.ships));
    }

    const isUnion = fleet_type_id > 0;
    const ships = fleets[1] ? fleets[0].ships.concat(fleets[1].ships) : fleets[0].ships;

    let daigo_count = 0;
    let reigo_count = 0;
    const daigo_dup: number[] = [];
    const reigo_dup: number[] = [];

    ships.forEach(ship => {
        for (const daigo_ship_ids of DAIGO_IDS) {
            if (!daigo_dup.includes(ship.id) && daigo_ship_ids.includes(ship.id)) {
                daigo_dup.push(...daigo_ship_ids);
                daigo_count++;
                break;
            }
        }
        for (const reigo_ship_ids of REIGO_IDS) {
            if (!reigo_dup.includes(ship.id) && reigo_ship_ids.includes(ship.id)) {
                reigo_dup.push(...reigo_ship_ids);
                reigo_count++;
                break;
            }
        }
    });

    let composition: Composition;
    let ship_names: string[];
    let fleet_length: number;
    let speed: Speed;
    let isFaster: boolean;
    let fleet_seek: Seek;
    let fleet_save_seek: Seek;
    let drum_carrier_count: number;
    let radar_carrier_count: number;
    let craft_carrier_count: number;
    let arBulge_carrier_count: number;
    let SBB_count: number;
    let yamato_class_count: number;
    let matsu_count: number;

    if (isUnion) {
        const main = fleets[0];
        const escort = fleets[1];

        composition = createComposition(fleets);
        ship_names = main.ship_names.concat(escort.ship_names);
        fleet_length = main.ships.length + escort.ships.length;
        if (main.speed === 4 && escort.speed === 4) {
            speed = 4;
        } else if (main.speed >= 3 && escort.speed >= 3) {
            speed = 3;
        } else if (main.speed >= 2 && escort.speed >= 2) {
            speed = 2;
        } else {
            speed = 1;
        }
        isFaster = speed >= 3;

        const total_seek = [
            main.seek[0] + escort.seek[0],
            main.seek[1] + escort.seek[1],
            main.seek[2] + escort.seek[2],
            main.seek[3] + escort.seek[3],
        ];

        fleet_seek = seek ?? [
            Math.floor(total_seek[0] * 100) / 100,
            Math.floor(total_seek[1] * 100) / 100,
            Math.floor(total_seek[2] * 100) / 100,
            Math.floor(total_seek[3] * 100) / 100,
        ];
        fleet_save_seek = save_seek ?? fleet_seek;

        drum_carrier_count = main.drum_carrier_count + escort.drum_carrier_count;
        radar_carrier_count = main.radar_carrier_count + escort.radar_carrier_count;
        craft_carrier_count = main.craft_carrier_count + escort.craft_carrier_count;
        arBulge_carrier_count = main.arBulge_carrier_count + escort.arBulge_carrier_count;
        SBB_count = main.SBB_count + escort.SBB_count;
        yamato_class_count = main.yamato_class_count + escort.yamato_class_count;
        matsu_count = main.matsu_count + escort.matsu_count;
    } else {
        const fleet = fleets[0];

        composition = createComposition([fleet]);
        ship_names = fleet.ship_names;
        fleet_length = fleet.ships.length;
        speed = fleet.speed;
        isFaster = speed >= 3;

        fleet_seek = seek ?? [
            Math.floor(fleet.seek[0] * 100) / 100,
            Math.floor(fleet.seek[1] * 100) / 100,
            Math.floor(fleet.seek[2] * 100) / 100,
            Math.floor(fleet.seek[3] * 100) / 100,
        ];
        fleet_save_seek = save_seek ?? fleet_seek;

        drum_carrier_count = fleet.drum_carrier_count;
        radar_carrier_count = fleet.radar_carrier_count;
        craft_carrier_count = fleet.craft_carrier_count;
        arBulge_carrier_count = fleet.arBulge_carrier_count;
        SBB_count = fleet.SBB_count;
        yamato_class_count = fleet.yamato_class_count;
        matsu_count = fleet.matsu_count;
    }

    return {
        fleets,
        composition,
        ship_names,
        fleet_type: fleet_type_id,
        isUnion,
        fleet_length,
        isFaster,
        speed,
        seek: fleet_seek,
        save_seek: fleet_save_seek,
        drum_carrier_count,
        radar_carrier_count,
        craft_carrier_count,
        arBulge_carrier_count,
        SBB_count,
        yamato_class_count,
        matsu_count,
        daigo_count,
        reigo_count,
    };
}

/**
 * 主力艦隊の艦名配列を返す
 * @param fleet AdoptFleet
 */
export function getMainFleetNames(fleet: AdoptFleet): string[] {
    return fleet.fleets[0].ship_names;
}

/**
 * 随伴艦隊の艦名配列を返す
 * @param fleet AdoptFleet
 */
export function getEscortFleetNames(fleet: AdoptFleet): string[] {
    return fleet.fleets[1]?.ship_names ?? [];
}

/**
 * 主力艦隊の艦数を返す
 * @param fleet AdoptFleet
 */
export function getMainFleetLength(fleet: AdoptFleet): number {
    return fleet.fleets[0].ships.length;
}

/**
 * 随伴艦隊の艦数を返す
 * @param fleet AdoptFleet
 */
export function getEscortFleetLength(fleet: AdoptFleet): number {
    return fleet.fleets[1]?.ships.length ?? 0;
}

/**
 * 艦隊構成艦にtarget_nameが含まれるか判定(部分一致)
 * @param fleet AdoptFleet
 * @param target_name 判定する艦の名前(部分一致)
 * @returns 艦が在籍していればtrue
 */
export function isInclude(fleet: AdoptFleet, target_name: string | string[]): boolean {
    if (Array.isArray(target_name)) {
        return target_name.some(
            name => fleet.ship_names.some(ship_name => ship_name.includes(name))
        );
    } else {
        return fleet.ship_names.some(ship_name => ship_name.includes(target_name));
    }
}

/**
 * 旗艦が軽巡であるか判定
 * @param fleet AdoptFleet
 */
export function isFCL(fleet: AdoptFleet): boolean {
    return fleet.fleets[0].ships[0].type === ShipType.CL;
}

/**
 * 艦隊構成艦に含まれる艦名がtarget_name(部分一致)の艦をカウント
 * @param fleet AdoptFleet
 * @param target_name 判定する艦の名前(部分一致)
 * @returns 該当する艦の隻数
 */
export function countShip(fleet: AdoptFleet, target_name: string | string[]): number {
    if (Array.isArray(target_name)) {
        return fleet.ship_names.filter(ship_name =>
            target_name.some(target => ship_name.includes(target))
        ).length;
    } else {
        return fleet.ship_names.filter(ship_name => ship_name.includes(target_name)).length;
    }
}

/**
 * 艦隊内の大鷹型の数を返す
 * @param fleet AdoptFleet
 */
export function countTaiyo(fleet: AdoptFleet): number {
    const taiyos = ['春日丸', '大鷹', '八幡丸', '雲鷹', '神鷹'];
    return fleet.ship_names.filter(ship_name =>
        taiyos.some(name => ship_name.startsWith(name))
    ).length;
}

/**
 * 空母系+あきつ丸の数を返す
 * @param fleet AdoptFleet
 */
export function countAktmrPlusCVs(fleet: AdoptFleet): number {
    const composition = fleet.composition;
    return countShip(fleet, 'あきつ丸')
        + composition.CV
        + composition.CVB
        + composition.CVL;
}

/**
 * 寒冷地装備＆甲板要員を装備していない、空母系orあきつ丸の数を返す
 * @param fleet AdoptFleet
 */
export function countNotEquipArctic(fleet: AdoptFleet): number {
    let count = 0;
    for (const f of fleet.fleets) {
        for (const ship of f.ships) {
            if ([ShipType.CV, ShipType.CVB, ShipType.CVL].includes(ship.type) || ship.name.includes('あきつ丸')) {
                if (!ship.has_arctic_gear) {
                    count++;
                }
            }
        }
    }
    return count;
}

/**
 * 索敵無視の為に索敵値を退避フィールドと切替
 * @param fleet AdoptFleet
 * @returns 新しいAdoptFleet
 */
export function switchSeek(fleet: AdoptFleet): AdoptFleet {
    if (fleet.seek.every(value => value === 999)) {
        return createAdoptFleet(
            fleet.fleets,
            fleet.fleet_type,
            fleet.save_seek,
            fleet.save_seek
        );
    } else {
        return createAdoptFleet(
            fleet.fleets,
            fleet.fleet_type,
            [999, 999, 999, 999],
            fleet.seek
        );
    }
}

/**
 * 艦隊内のドラム缶の総数を返す
 * @param fleet AdoptFleet
 */
export function getTotalDrumCount(fleet: AdoptFleet): number {
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
export function getTotalValidCraftCount(fleet: AdoptFleet): number {
    if (fleet.fleets.length === 2) {
        return fleet.fleets[0].total_valid_craft_count
            + fleet.fleets[1].total_valid_craft_count;
    } else {
        return fleet.fleets[0].total_valid_craft_count;
    }
}
