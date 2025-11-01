import type { Seek } from '../../types';
import { SG, ST as ShipType } from '../../data/ship';
import { calc_fleet_speed } from '../../logic/speed/fleet';
import { calc_fleet_seek } from '../../logic/seek/fleet';
import { FleetUnit } from '../../models/fleet/FleetUnit';
import { EquippedShip } from '../ship/EquippedShip';
import { includes_ship_id } from '../ship/NakedShip';
import { ShipId } from '../../types/shipId';
import { Sp as Speed } from '../../logic/speed/predicate';

/**
 * 大和型ID配列    
 * 大和    
 * 武蔵
 */
const YAMATO_CLASS_IDS: ShipId[] =
    [
        131, 136, 911, 916,
        143, 148, 546,
    ] as const;

/**
 * 松型駆逐艦ID配列    
 * 松    
 * 竹    
 * 梅    
 * 桃    
 * 杉    
 * 榧
 */
const MATSU_CLASS_IDS: ShipId[] =
    [
        641, 702,
        642, 706,
        643, 716,
        644, 708,
        992, 997,
        994, 736,
    ] as const;

/** これ以上は低速 */
const SLOW_THRESHOLD = SG.SlowA;

type PreInfo = {
    /** ドラム缶 装備艦数 */
    readonly drum_carrier_count: number;
    /** 電探系 装備艦数 */
    readonly radar_carrier_count: number;
    /** 索敵値5以上の電探 装備艦数 */
    readonly radar5_carrier_count: number;
    /** 大発系 装備艦数 */
    readonly craft_carrier_count: number;
    /** 北方迷彩(＋北方装備)装備艦数 */
    readonly arBulge_carrier_count: number;
    /** 低速戦艦(素速度)艦数 */
    readonly SBB_count: number;
    /** 総ドラム缶装備数 */
    readonly total_drum_count: number;
    /** 総大発系装備数 */
    readonly total_valid_craft_count: number;
    /** 大和型艦数 */
    readonly yamato_class_count: number;
    /** 松型駆逐艦数 */
    readonly matsu_count: number;
}
const INITIAL: PreInfo = {
    drum_carrier_count: 0,
    radar_carrier_count: 0,
    radar5_carrier_count: 0,
    craft_carrier_count: 0,
    arBulge_carrier_count: 0,
    SBB_count: 0,
    total_drum_count: 0,
    total_valid_craft_count: 0,
    yamato_class_count: 0,
    matsu_count: 0,
} as const;

const calc_pre_info = (
    ships: EquippedShip[],
): PreInfo => {
    return ships.reduce((acc, ship) => {
        const {
            drum_count,
            has_radar,
            has_radar5,
            has_craft,
            has_arBulge,
            valid_craft_count,
            // has_arctic_gear,
        } = ship;

        if (drum_count > 0) acc.drum_carrier_count++;
        if (has_radar) acc.radar_carrier_count++;
        if (has_radar5) acc.radar5_carrier_count++;
        if (has_craft) acc.craft_carrier_count++;
        if (has_arBulge) acc.arBulge_carrier_count++;
        if (
            ship.type === ShipType.BB
            && ship.speed_group >= SLOW_THRESHOLD
        ) acc.SBB_count++;
        if (includes_ship_id(YAMATO_CLASS_IDS, ship.id)) acc.yamato_class_count++;
        if (includes_ship_id(MATSU_CLASS_IDS, ship.id)) acc.matsu_count++;

        acc.total_drum_count += drum_count;
        acc.total_valid_craft_count += valid_craft_count;
        return acc;
    }, { ...INITIAL });
}

export type FleetComponent = {
    /** 構成艦 */
    readonly units: FleetUnit[];
    /** 艦隊速度 */
    readonly speed: Speed;
    /** 艦隊索敵値 */
    readonly seek: Seek;
} & PreInfo

export function derive_fleet_component(
    units: FleetUnit[],
    command_lv?: number,
): FleetComponent {
    const ships = units.map(unit => unit.ship);

    const speed = calc_fleet_speed(ships);
    const seek = calc_fleet_seek(ships, command_lv);

    const component: FleetComponent = {
        units,
        speed,
        seek,
        ...calc_pre_info(ships),
    };

    return component;
}
