import type Ship from '@/models/Ship';
import type { Seek } from '@/models/types';
import Const from '../constants/const';
import { ST as ShipType } from '@/data/ship';
import { Sp as Speed } from '@/core/Sim';
import { calcFleetSpeed } from '../logic/speed/fleet';
import { calcFleetSeek } from '../logic/seek/fleet';

/**
 * ストレージに保存する艦隊
 * こちらで処理する場合、再読み込み時に新しいフィールドが計算されないので注意
 */
export default class CacheFleet {
    /** 艦隊フィールドのバージョン */
    public readonly version: number;
	/** 構成艦 */
	public readonly ships: Ship[];

    public readonly ship_names: string[];

	/** 艦隊速度 */
	public readonly speed: Speed;

	/** 艦隊索敵値 */
	public readonly seek: Seek;

	/** ドラム缶 装備艦数 */
	public readonly drum_carrier_count: number;

	/** 電探系 装備艦数 */
	public readonly radar_carrier_count: number;

	/** 索敵値5以上の電探 装備艦数 */
	public readonly radar5_carrier_count: number;

	/** 大発系 装備艦数 */
	public readonly craft_carrier_count: number;

    /** 北方迷彩(＋北方装備)装備艦数 */
    public readonly arBulge_carrier_count: number;

    /** 低速戦艦(素速度)艦数 */
    public readonly SBB_count: number;

	/** 総ドラム缶装備数 */
	public readonly total_drum_count: number;

	/** 総大発系装備数 */
	public readonly total_valid_craft_count: number;

    /** 大和型艦数 */
    public readonly yamato_class_count: number;

    /** 松型駆逐艦数 */
    public readonly matsu_count: number;

    /**
     * 大和型ID配列    
     * 大和    
     * 武蔵
     */
    private readonly YAMATO_CLASS_IDS: Readonly<number[]> =
        [
            131, 136, 911, 916,
            143, 148, 546,
        ];

    /**
     * 泊地修理艦ID配列
     * 明石改, 朝日改, 秋津洲改
     */
    private readonly HAKUCHI_IDS: Readonly<number[]> = [187, 958, 450];

    /**
     * 松型駆逐艦ID配列    
     * 松    
     * 竹    
     * 梅    
     * 桃    
     * 杉    
     * 榧
     */
    private readonly MATSU_CLASS_IDS: Readonly<number[]> =
        [
            641, 702,
            642, 706,
            643, 716,
            644, 708,
            992, 997,
            994, 736,
        ];

	constructor(
		ships: Ship[],
		command_lv?: number,
	) {
        this.version = Const.FLEET_VERSION;
		this.ships = ships;
        this.ship_names = ships.map(item => item.name);
		this.speed = calcFleetSpeed(ships);
		this.seek = calcFleetSeek(ships, command_lv);
		
        let drum_carrier_count = 0;
        let radar_carrier_count = 0;
        let radar5_carrier_count = 0;
        let craft_carrier_count = 0;
        let arBulge_carrier_count = 0;
        let total_drum_count = 0;
        let total_valid_craft_count = 0;
        let SBB_count = 0;
        let yamato_class_count = 0;
        let hakuchi_count = 0;
        let matsu_count = 0;

        this.ships.forEach(ship => {
            if (ship.drum_count > 0) drum_carrier_count++;
            if (ship.has_radar) radar_carrier_count++;
            if (ship.has_radar5) radar5_carrier_count++;
            if (ship.has_craft) craft_carrier_count++;
            if (ship.has_arBulge) arBulge_carrier_count++;
            if (ship.type === ShipType.BB && ship.speed_group >= 5) SBB_count++;
            if (this.YAMATO_CLASS_IDS.includes(ship.id)) yamato_class_count++;
            if (this.HAKUCHI_IDS.includes(ship.id)) hakuchi_count++;
            if (this.MATSU_CLASS_IDS.includes(ship.id)) matsu_count++;
            total_drum_count += ship.drum_count;
            total_valid_craft_count += ship.valid_craft_count;
        });

        this.drum_carrier_count = drum_carrier_count;
        this.radar_carrier_count = radar_carrier_count;
        this.radar5_carrier_count = radar5_carrier_count;
        this.craft_carrier_count = craft_carrier_count;
        this.arBulge_carrier_count = arBulge_carrier_count;
        this.total_drum_count = total_drum_count;
        this.total_valid_craft_count = total_valid_craft_count;
        this.SBB_count = SBB_count;
        this.yamato_class_count = yamato_class_count;
        this.matsu_count = matsu_count;
	}
}
