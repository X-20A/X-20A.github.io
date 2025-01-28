import Ship from '@/classes/Ship';
import { Fleet, FleetTypeId, SpeedId, Seek } from '@/classes/types';
import Decimal from 'decimal.js';
import Composition from '@/classes/Composition';


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

	/** 寒冷地装備＆甲板要員 装備艦数 */
	public readonly arctic_gear_carrier_count: number;

	/** 総ドラム缶装備数 */
	public readonly total_drum_count: number;

	/** 総大発系装備数 */
	public readonly total_valid_craft_count: number;

	constructor(
		ships: Ship[],
		command_lv: number,
	) {

		this.ships = ships;
        this.ship_names = ships.map(item => item.name);
		this.speed_id = this.calcFleetSpeed();
		this.seek = this.calcSeek(command_lv);
		this.drum_carrier_count = this.ships.filter(item => item.drum_count > 0).length;
		this.radar_carrier_count = this.ships.filter(item => item.has_radar).length;
		this.radar5_carrier_count = this.ships.filter(item => item.has_radar5).length;
		this.craft_carrier_count = this.ships.filter(item => item.has_craft).length;
		this.arctic_gear_carrier_count = this.ships.filter(item => item.has_arctic_gear).length;
		this.total_drum_count = this.ships.reduce((total, item) => {
			return total + item.drum_count;
		}, 0);
		this.total_valid_craft_count = this.ships.reduce((total, item) => {
			return total + item.valid_craft_count;
		}, 0)
	}

	private calcSeek(command_lv: number): Seek {
		const fleet_length_mod = new Decimal(2 * (6 - this.ships.length));
		const command_mod = new Decimal(command_lv).times(0.4);
		const total_status_seek = this.ships.reduce((total, ship) => total.plus(ship.status_seek), new Decimal(0));
		const total_equip_seek = this.ships.reduce((total, ship) => total.plus(ship.equip_seek), new Decimal(0));

		const base_seek = total_status_seek.plus(fleet_length_mod).minus(command_mod);
		const fleet_seek = [] as Decimal[];

		for (let i = 1; i < 5; i++) {
			const pre_seek = base_seek.plus(total_equip_seek.times(i));
			fleet_seek[i - 1] = pre_seek.lt(0)
				? pre_seek.negated().toDecimalPlaces(2, Decimal.ROUND_UP).negated()
				: pre_seek.toDecimalPlaces(2, Decimal.ROUND_DOWN);
		}

		return fleet_seek.map(item => item.toNumber()) as Seek;
	}

	private calcFleetSpeed(): SpeedId {
		let speed_id = 0 as SpeedId;
		if (this.ships.every(ship => ship.speed === 3)) {
			speed_id = 3;
		} else if (this.ships.every(ship => ship.speed >= 2)) {
			speed_id = 2
		} else if (this.ships.every(ship => ship.speed >= 1)) {
			speed_id = 1;
		}

		return speed_id;
	}
}
