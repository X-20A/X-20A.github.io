import type Ship from '@/classes/Ship';
import type { Fleet, SpeedId, Seek } from '@/classes/types';
import Const from './const';
import { ST as ShipType } from '@/data/ship';

/**
 * ストレージに保存する艦隊
 * こちらで処理する場合、再読み込み時に新しいフィールドが計算されないので注意
 */
export default class CacheFleet implements Fleet {
    /** 艦隊フィールドのバージョン */
    public readonly version: number;
	/** 構成艦 */
	public readonly ships: Ship[];

    public readonly ship_names: string[];

	/** 艦隊速度 */
	public readonly speed_id: SpeedId;

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

    /** 泊地修理艦数 */
    public readonly hakuchi_count: number;

    /** 第五艦隊所属艦数 */
    public readonly daigo_count: number;

	constructor(
		ships: Ship[],
		command_lv?: number,
	) {
        this.version = Const.FLEET_VERSION;
		this.ships = ships;
        this.ship_names = ships.map(item => item.name);
		this.speed_id = this.calcFleetSpeed(ships);
		this.seek = this.calcSeek(ships, command_lv);
		
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
        let daigo_count = 0;

        this.ships.forEach(ship => {
            if (ship.drum_count > 0) drum_carrier_count++;
            if (ship.has_radar) radar_carrier_count++;
            if (ship.has_radar5) radar5_carrier_count++;
            if (ship.has_craft) craft_carrier_count++;
            if (ship.has_arBulge) arBulge_carrier_count++;
            if (ship.type === ShipType.BB && ship.speed_group >= 5) SBB_count++;
            if (Const.YAMATO_CLASS_IDS.includes(ship.id)) yamato_class_count++;
            if (Const.HAKUCHI_IDS.includes(ship.id)) hakuchi_count++;
            if (Const.DAIGO_IDS.includes(ship.id)) daigo_count++;

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
        this.hakuchi_count = hakuchi_count;
        this.daigo_count = daigo_count;
	}

    private calcSeek(ships: Ship[], command_lv = 120): Seek {
        const fleet_length_mod = 2 * (6 - ships.length);
        const command_mod = Math.ceil(command_lv * 0.4);
        
        let total_status_seek = 0;
        let total_equip_seek = 0;

        for (const ship of ships) {
            total_status_seek += ship.status_seek;
            total_equip_seek += ship.equip_seek;
        }

        const base_seek = total_status_seek + fleet_length_mod - command_mod;
        const fleet_seek: number[] = [];

        for (let i = 1; i < 5; i++) {
            fleet_seek[i - 1] = base_seek + total_equip_seek * i;
        }

        return fleet_seek as Seek;
    }

    /**
     * 艦隊速度を判定し、速度IDを返す
     * @returns 
     */
	private calcFleetSpeed(ships: Ship[]): SpeedId {
		let speed_id = 0 as SpeedId;
		if (ships.every(ship => ship.speed === 3)) {
			speed_id = 3;
		} else if (ships.every(ship => ship.speed >= 2)) {
			speed_id = 2
		} else if (ships.every(ship => ship.speed >= 1)) {
			speed_id = 1;
		}

		return speed_id;
	}
}
