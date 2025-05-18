import type { Ship } from '@/models/Ship';
import type { Seek } from '@/models/types';
import Const from '../constants/const';
import { SG, ST as ShipType } from '@/data/ship';
import { Sp as Speed } from '@/core/branch';
import { calcFleetSpeed } from '../logic/speed/fleet';
import { calcFleetSeek } from '../logic/seek/fleet';

/**
 * 大和型ID配列    
 * 大和    
 * 武蔵
 */
const YAMATO_CLASS_IDS: Readonly<number[]> =
    [
        131, 136, 911, 916,
        143, 148, 546,
    ];

/**
 * 松型駆逐艦ID配列    
 * 松    
 * 竹    
 * 梅    
 * 桃    
 * 杉    
 * 榧
 */
const MATSU_CLASS_IDS: Readonly<number[]> =
    [
        641, 702,
        642, 706,
        643, 716,
        644, 708,
        992, 997,
        994, 736,
    ];


/** これ以上は低速 */
const SLOW_THRESHOLD = SG.SlowA;

/**
 * ストレージに保存する艦隊
 * こちらで処理する場合、再読み込み時に新しいフィールドが計算されないので注意
 */
export type CacheFleet = Readonly<{
    /** 艦隊フィールドのバージョン */
    version: number;
	/** 構成艦 */
	ships: Ship[];
    ship_names: string[];
	/** 艦隊速度 */
	speed: Speed;
	/** 艦隊索敵値 */
	seek: Seek;
	/** ドラム缶 装備艦数 */
	drum_carrier_count: number;
	/** 電探系 装備艦数 */
	radar_carrier_count: number;
	/** 索敵値5以上の電探 装備艦数 */
	radar5_carrier_count: number;
	/** 大発系 装備艦数 */
	craft_carrier_count: number;
    /** 北方迷彩(＋北方装備)装備艦数 */
    arBulge_carrier_count: number;
    /** 低速戦艦(素速度)艦数 */
    SBB_count: number;
	/** 総ドラム缶装備数 */
	total_drum_count: number;
	/** 総大発系装備数 */
	total_valid_craft_count: number;
    /** 大和型艦数 */
    yamato_class_count: number;
    /** 松型駆逐艦数 */
    matsu_count: number;
}>;
    
export function createCacheFleet(ships: Ship[], command_lv?: number): CacheFleet {
    const ship_names = ships.map(s => s.name);
    const speed = calcFleetSpeed(ships);
    const seek = calcFleetSeek(ships, command_lv);

    const summary = ships.reduce((acc, ship) => {
        if (ship.drum_count > 0) acc.drum_carrier_count++;
        if (ship.has_radar) acc.radar_carrier_count++;
        if (ship.has_radar5) acc.radar5_carrier_count++;
        if (ship.has_craft) acc.craft_carrier_count++;
        if (ship.has_arBulge) acc.arBulge_carrier_count++;
        if (
            ship.type === ShipType.BB
            && ship.speed_group < SLOW_THRESHOLD
        ) acc.SBB_count++;
        if (YAMATO_CLASS_IDS.includes(ship.id)) acc.yamato_class_count++;
        if (MATSU_CLASS_IDS.includes(ship.id)) acc.matsu_count++;

        acc.total_drum_count += ship.drum_count;
        acc.total_valid_craft_count += ship.valid_craft_count;
        return acc;
    }, {
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
    });

    return {
        version: Const.FLEET_VERSION,
        ships,
        ship_names,
        speed,
        seek,
        ...summary
    };
}
