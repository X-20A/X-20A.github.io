import type Ship from '@/classes/Ship';
import type { Fleet, SpeedId, Seek } from '@/classes/types';
import Big from 'big.js';


export default class CacheFleet implements Fleet {
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

	/** 総ドラム缶装備数 */
	public readonly total_drum_count: number;

	/** 総大発系装備数 */
	public readonly total_valid_craft_count: number;

	constructor(
		ships: Ship[],
		command_lv?: number,
	) {

		this.ships = ships;
        this.ship_names = ships.map(item => item.name);
		this.speed_id = this.calcFleetSpeed(ships);
		this.seek = this.calcSeek(ships, command_lv);
		this.drum_carrier_count = this.ships.filter(item => item.drum_count > 0).length;
		this.radar_carrier_count = this.ships.filter(item => item.has_radar).length;
		this.radar5_carrier_count = this.ships.filter(item => item.has_radar5).length;
		this.craft_carrier_count = this.ships.filter(item => item.has_craft).length;
        this.arBulge_carrier_count = this.ships.filter(item => item.has_arBulge).length;
		this.total_drum_count = this.ships.reduce((total, item) => {
			return total + item.drum_count;
		}, 0);
		this.total_valid_craft_count = this.ships.reduce((total, item) => {
			return total + item.valid_craft_count;
		}, 0)
	}

    private calcSeek(ships: Ship[], command_lv = 120): Seek {
        const fleet_length_mod = new Big(2).times(new Big(6).minus(ships.length));
        const command_mod = new Big(command_lv).times(0.4);
        const total_status_seek = ships.reduce((total, ship) => total.plus(ship.status_seek), new Big(0));
        const total_equip_seek = ships.reduce((total, ship) => total.plus(ship.equip_seek), new Big(0));

        const base_seek = total_status_seek.plus(fleet_length_mod).minus(command_mod);
        const fleet_seek = [] as Big[];

        for (let i = 1; i < 5; i++) {
            fleet_seek[i - 1] = base_seek.plus(total_equip_seek.times(i));
        }

        return fleet_seek.map(item => item.toNumber()) as Seek;
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
