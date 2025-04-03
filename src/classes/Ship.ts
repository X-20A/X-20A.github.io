import Equip from '@/classes/Equip';
import { ShipData, EquipInDeck } from '@/classes/types';
import
    ship_datas,
    { NA as National, SG as SpeedGroup, ST as ShipType }
from '@/data/ship';
import Const from './const';
import { EquipType} from '@/data/equip';
import { Sp as Speed } from './Sim';

type Brand<T, B> = T & { __brand: B };
/** 装備ボーナスのブランド型 */
type EquipBonusSeek = Brand<number, "EquipBonusSeek">;

export default class Ship {
	public readonly id: number;
	public readonly name: string;
    public readonly lv: number;
	public readonly type: ShipType;
    public readonly status_seek: number;
    public readonly equip_seek: number;
	public readonly national: National;
	public readonly speed_group: SpeedGroup;
	public readonly speed: Speed;
	public readonly hp: number;
	public readonly asw: number;
    public readonly luck: number;
    public readonly equip_in_decks: EquipInDeck[];
	public readonly drum_count: number;
	public readonly has_radar: boolean;
	public readonly has_radar5: boolean;
	public readonly has_craft: boolean;
    public readonly has_arBulge: boolean;
	public readonly valid_craft_count: number;
	public readonly has_arctic_gear: boolean;
	
	constructor(
		fleet_index: number,
		ship_index: number,
		ship_id: number,
		lv: number,
		equip_in_decks: EquipInDeck[],
		hp?: number,
		asw?: number,
        luck?: number,
	) {
		const data = ship_datas[ship_id];

		if (!data) {
            throw new Error(`第${fleet_index}艦隊の${ship_index}番艦は未対応です`);
		}

		this.id = ship_id;
		this.name = data.name;
        this.lv = lv;
		this.type = data.type;
		this.national = data.na;

		const equips = equip_in_decks.map((equip_in_deck, index) =>
            new Equip(
                equip_in_deck.id,
                equip_in_deck.improvement,
                this.name,
                index,
                equip_in_deck.is_ex,
            )
        );

		this.speed_group = data.sg;
		this.speed = this.calcSpeed(equips, this.speed_group);
        // 制空シミュからのデッキビルダーには実 HP, 対潜値も載ってる
        // なければ0 スクショくらいでしか使わないし、
        // ちゃんと出そうとすると装備から計算しないといけないのでサボる
		this.hp = hp ? hp : 0;
		this.asw = asw ? asw : 0;
        this.luck = luck ? luck : 0;
        this.equip_in_decks = equip_in_decks;

        const bonus_seek =
            this.getSeekBonus(this.name, this.type, this.national, equips);
		this.status_seek = this.calcStatusSeek(data, bonus_seek, lv);
		this.equip_seek = this.calcEquipSeek(equips);

        let drum_count = 0;
        let has_radar = false;
        let has_radar5 = false;
        let has_craft = false;
        let has_arBulge = false;
        let valid_craft_count = 0;
        let has_arctic_gear = false;

        equips.forEach(item => {
            if (item.id === 75) drum_count++;
            if (item.id === 268) has_arBulge = true;
            if (item.id === 402) has_arctic_gear = true;
            if (Const.ROUTING_CRAFTS.includes(item.id)) has_craft = true;
            if (Const.RESOURCE_CRAFTS.includes(item.id)) valid_craft_count++;
            if ([EquipType.RadarS, EquipType.RadarL].includes(item.type)) {
                has_radar = true;
                if (item.seek >= 5) has_radar5 = true;
            }
        });

        this.drum_count = drum_count;
        this.has_radar = has_radar;
        this.has_radar5 = has_radar5;
        this.has_craft = has_craft;
        this.has_arBulge = has_arBulge;
        this.valid_craft_count = valid_craft_count;
        this.has_arctic_gear = has_arctic_gear;
	}

    private calcStatusSeek(
        ship_data: ShipData,
        bonus_seek: EquipBonusSeek,
        lv: number
    ): number {
        // 現在のレベルにおける素索敵値を計算
        const max_seek = ship_data.seek2;
        const min_seek = ship_data.seek;
        const status_seek = Math.floor(((max_seek - min_seek) * (lv / 99)) + min_seek);

        // 素索敵値 + ボーナス値の平方根を計算
        return Math.sqrt(status_seek + bonus_seek);
    }

    private calcEquipSeek(equips: Equip[]): number {
        let total = 0;
        for (let i = 0; i < equips.length; i++) {
            const equip = equips[i];
            if (equip.seek === 0) continue;

            const coefficients = this.getSeekCoefficients(equip);
            const equip_coefficient = coefficients[0];
            const improvement_coefficient = coefficients[1];

            total += (Math.sqrt(equip.implovement) * improvement_coefficient + equip.seek) * equip_coefficient;
        }
        return total;
    }

	private getSeekCoefficients(equip: Equip): number[] {
		const coefficients = [] as number[];

        let equip_conefficient = 0.6;
        switch (equip.type) { // 装備係数
			case EquipType.TorpBomber: // 艦攻
                equip_conefficient = 0.8;
				break;
            case EquipType.CarrierScout: // 艦偵
                equip_conefficient = 1;
				break;
            case EquipType.SeaPlaneBomber: // 水爆
                equip_conefficient = 1.1;
				break;
            case EquipType.SeaPlane: // 水偵
                equip_conefficient = 1.2;
				break;
		}
        coefficients[0] = equip_conefficient;

        let implovment_coefficient = 0;
        switch (equip.type) { // 改修係数
            case EquipType.SeaPlaneBomber: // 水爆
                implovment_coefficient = 1.15;
				break;
            case EquipType.CarrierScout: // 艦偵
            case EquipType.FlyingBoat: // 大型飛行艇
            case EquipType.SeaPlane: // 水偵
                implovment_coefficient = 1.2;
				break;
            case EquipType.RadarS: // 小型電探
                implovment_coefficient = 1.25;
				break;
			case EquipType.RadarL: // 大型電探
                implovment_coefficient = 1.4;
				break;
		}
        coefficients[1] = implovment_coefficient;

		return coefficients;
	}

    /**
     * 装備ボーナス計算
     * @param equips 
     * @returns 
     */
	private getSeekBonus(
        ship_name: string,
        ship_type: ShipType,
        national: National,
        equips: Equip[]
    ): EquipBonusSeek {
		let total_bonus = 0;
		const disable_ids: number[] = []; // 重複不可のがきたらこれに追加
		for (let i = 0;i < equips.length;i++) {
			const equip = equips[i];
			switch (equip.id) {
				case 315: // SG初期
                    if (['丹陽', '雪風改二'].includes(ship_name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (national === National.USA) {
						total_bonus += 4;
					}
					break;
				case 456: // SG後期
                    if (['丹陽', '雪風改二'].includes(ship_name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (national === National.USA) {
						total_bonus += 4;
                    } else if (national === National.UK) {
						total_bonus += 2;
					}
					break;
				case 278: // SK
                    if (national === National.USA) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 279: // SK+SG
                    if (national === National.USA) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
                    } else if (national === National.UK) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 517: { // 清霜逆探
                    if (ship_name === '清霜改二丁') {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (['朝霜改二', '清霜改二', '初霜改二', '潮改二', 'Верный', '霞改二', '時雨改三', '雪風改二'].includes(ship_name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
                    } else if (national === National.Japan && ship_type === ShipType.DD) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				}
				case 30: // 21号対空電探
				case 410: { // 21号対空電探改二
					const akizuki = ['秋月', '照月', '初月', '涼月', '冬月'];
					const mogami = ['最上改', '最上改二', '最上改二特'];
                    if (akizuki.some(item => ship_name.startsWith(item)) || mogami.includes(ship_name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					}
					break;
				}
				case 118: { // 紫雲
                    if (ship_name.includes('大淀')) {
						total_bonus += 2;
						if (equip.implovement === 10) { // 改修maxで更に+1
							total_bonus += 1;
						}
					}
					break;
				}
				case 414: { // SOC seagull
                    if (national === National.USA) {
                        if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 2;
								// 改修でさらにボーナス
								if (equip.implovement > 3) {
									total_bonus += 1;
								}
								disable_ids.push(equip.id);
							}
                        } else if (ship_type === ShipType.BB) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 1;
								disable_ids.push(equip.id);
							}
						}
					}
					break;
				}
				case 115: // Ar196改
                    if (['Bismarck', 'Prinz Eugen'].some(item => ship_name.startsWith(item))) {
						total_bonus += 2;
					}
					break;
				case 371: // Fairey Seafox改
                    if (ship_name.includes('Gotland')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 6;
							disable_ids.push(equip.id);
						}
                    } else if (ship_name.includes('Nelson')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 5;
							disable_ids.push(equip.id);
						}
                    } else if (ship_name.includes('Commandant Teste')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						}
                    } else if (['Warspite', 'Richelieu', 'Jean Bart'].some(item => ship_name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 370: // Swordfish Mk.II改(水偵型)
                    if (ship_name.includes('Warspite')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (['Nelson', 'Sheffield', 'Gotland'].some(item => ship_name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
                    } else if (['Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 194: { // Laté 298B
                    if (['Commandant Teste', 'Richelieu', 'Jean Bart', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
						total_bonus += 2;
						disable_ids.push(equip.id);
					}
					break;
				}
				case 415: // SO3C Seamew改
                    if (national === National.USA) {
                        if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 2;
								disable_ids.push(equip.id);
							}
                        } else if (ship_type === ShipType.BB) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 1;
								disable_ids.push(equip.id);
							}
						}
					}
					break;
				case 369: // Swordfish Mk.III改(水上機型/熟練)
                    if (ship_name === 'Gotland andra') {
						if (disable_ids.filter(item => item === equip.id).length === 0) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						} else if (disable_ids.filter(item => item === equip.id).length === 1) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
                    } else if (['Gotland', 'Commandant Teste'].some(item => ship_name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (['瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 368: // Swordfish Mk.III改(水上機型)
                    if (ship_name === 'Gotland andra') {
						if (disable_ids.filter(item => item === equip.id).length === 0) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						} else if (disable_ids.filter(item => item === equip.id).length < 5) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
                    } else if (ship_name.includes('Gotland')) {
						total_bonus += 3;
                    } else if (['Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
						total_bonus += 2;
					}
					break;
				case 367: // Swordfish(水上機型)
                    if (['Gotland', 'Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
						total_bonus += 1;
					}
					break;
				case 408: // 装甲艇(AB艇)
                    if (ship_name.includes('神州丸')) {
						total_bonus += 2;
                    } else if (ship_name.includes('あきつ丸') || ship_type === ShipType.DD) { // 本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
						total_bonus += 1;
					}
					break;
				case 409: // 武装大発
                    if (ship_name.includes('神州丸')) {
						total_bonus += 2;
                    } else if (ship_name.includes('あきつ丸')) {
						total_bonus += 1;
					}
					break;
				case 412: // 水雷見張員
                    if (national === National.Japan) {
                        if (ship_type === ShipType.DD) {
							total_bonus += 1;
                        } else if ([ShipType.CL, ShipType.CT, ShipType.CLT].includes(ship_type)) {
							total_bonus += 3;
                        } else if ([ShipType.CA, ShipType.CAV].includes(ship_type)) {
							total_bonus += 1;
						}
					}
					break;
				case 129: // 見張員
                    if (national === National.Japan) {
                        if (ship_type === ShipType.DD) {
							total_bonus += 1;
                        } else if ([ShipType.CL, ShipType.CT, ShipType.CLT].includes(ship_type)) {
							total_bonus += 3;
                        } else if ([ShipType.CA, ShipType.CAV].includes(ship_type)) {
							total_bonus += 3;
						}
					}
					break;
				case 521: { // 紫雲(熟練)
                    if (ship_name === '大淀改') {
						if (equip.implovement > 0) { // 改修1以上で+5
							total_bonus += 5;
						}
						if (equip.implovement > 3) { // ☆4以上で更に+1
							total_bonus += 1;
						}
                    } else if (ship_name === '三隈改二特') {
						if (equip.implovement > 0) { // 改修1以上で+4
							total_bonus += 4;
						}
					}
					break;
				}
				case 522: // 零式小型水上機
                    if ([ShipType.SS, ShipType.SSV].includes(ship_type)) {
						total_bonus += 3;
					}
					break;
				case 523: // 零式小型水上機(熟練)
                    if ([ShipType.SS, ShipType.SSV].includes(ship_type)) {
						total_bonus += 4;
					}
					break;
				case 527: // Type281 レーダー
                    if (national === National.UK) {
						total_bonus += 2;
					}
					break;
				case 273: { // 彩雲(偵四)
                    if (equip.implovement === 2) { // ☆2のときのみ
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				}
				case 510: // Walrus
                    if (['Nelson', 'Rodney'].includes(ship_name)) { // 含同改
                        total_bonus += 5;
                    } else if (['Warspite', 'Sheffield'].includes(ship_name)) { // 含同改
                        total_bonus += 2;
                    }
					break;
                case 545: // 天山一二型甲改二(村田隊/電探装備)
                    if (['翔鶴改二', '翔鶴改二甲'].includes(ship_name)) {
                        total_bonus += 2;
                    } else if (['瑞鶴改二','瑞鶴改二甲','加賀改二護','大鳳改','赤城改二戊','加賀改二戊'].includes(ship_name)) {
                        total_bonus += 1;
                    }
                    break;
			}
		}

		return total_bonus as EquipBonusSeek;
	}

	private calcSpeed(equips: Equip[], speed_group: SpeedGroup): Speed {
		let turbine = 0; // タービン
        let kan = 0; // 強化缶
        let new_kan = 0; // 新型缶
        let power_kan = 0; // 新型缶☆7↑

        equips.forEach(item => {
            if (item.id === 33) turbine++;
            if (item.id === 34) kan++;
            if (item.id === 87) {
                new_kan++;
                if (item.implovement >= 7) power_kan++;
            }
        });

        const kan_total = kan + new_kan;

		let speed: Speed;
		switch (speed_group) {
			case SpeedGroup.HighA:
				speed = 2;
				if (turbine && new_kan || power_kan > 1) {
					speed = 4;
				} else if (turbine && kan_total || power_kan) {
					speed = 3;
				}
				break;
			case SpeedGroup.HighB1:
				speed = 2;
				if (turbine && new_kan && kan_total > 1) {
					speed = 4;
				} else if (turbine && kan_total) {
					speed = 3;
				}
				break;
			case SpeedGroup.HighB2:
				speed = 2;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 4;
				} else if (turbine && kan_total) {
					speed = 3;
				}
				break;
			case SpeedGroup.HighC:
				speed = 2;
				if (turbine && kan_total) {
					speed = 3;
				}
				break;
			case SpeedGroup.LowA:
				speed = 1;
				if (turbine && new_kan && kan_total > 2) {
					speed = 4;
				} else if (turbine && power_kan > 1) {
					speed = 4;
				} else if (turbine && new_kan && kan_total > 1) {
					speed = 3;
				} else if (turbine && power_kan) {
					speed = 3;
				} else if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case SpeedGroup.LowB:
				speed = 1;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 3;
				} else if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case SpeedGroup.LowC:
				speed = 1;
				if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case SpeedGroup.LowD:
				speed = 1;
				if (turbine && new_kan) {
					speed = 3;
				} else if (new_kan || turbine && kan_total) {
					speed = 2;
				}
				break;
			case SpeedGroup.LowE:
				speed = 1;
				if (turbine && new_kan && kan_total > 1) {
					speed = 4;
				} else if (turbine && new_kan) {
					speed = 3;
				} else if (turbine && kan_total) {
					speed = 2;
				} else if (new_kan) {
					speed = 2;
				}
				break;
			case SpeedGroup.LowB2:
				speed = 1;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 3;
				} else if (turbine) {
					speed = 2;
				}
				break;
		}
		return speed;
	}
}