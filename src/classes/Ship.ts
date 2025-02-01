import Equip from '@/classes/Equip';
import { National, SpeedId } from '@/classes/types';
import { ShipType, ShipData, SpeedGroup, EquipInDeck } from '@/classes/types';
import ship_datas from '@/data/ship';
import Decimal from 'decimal.js';
import { useModalStore } from '@/stores';
import Const from './const';

const store = useModalStore();

export default class Ship {
	public readonly id: number;
	public readonly name: string;
    public readonly lv: number;
	public readonly type: ShipType;
	public readonly status_seek: Decimal;
	public readonly equip_seek: Decimal;
	public readonly national: National;
	public readonly speed_group: SpeedGroup;
	public readonly speed: SpeedId;
	public readonly hp: number;
	public readonly asw: number;
    public readonly luck: number;
    public readonly equip_in_decks: EquipInDeck[];
	public readonly drum_count: number;
	public readonly has_radar: boolean;
	public readonly has_radar5: boolean;
	public readonly has_craft: boolean;
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
		const ship_data = ship_datas.find(item => item.id === ship_id);

		if (!ship_data) {
			const message = `第${fleet_index}艦隊の${ship_index}番艦は未対応です`;
			store.SHOW_ERROR(message);
			throw new Error(message);
		}

		this.id = ship_id;
		this.name = ship_data.name;
        this.lv = lv;
		this.type = ship_data.type;
		this.national = ship_data.na;

		const equips = equip_in_decks
			.map((equip_in_deck, index) =>
                new Equip(
                    equip_in_deck.id,
                    equip_in_deck.improvement,
                    this.name,
                    index,
                    equip_in_deck.is_ex,
                )
            );

		this.speed_group = ship_data.sg;
		this.speed = this.calcSpeed(equips);
		this.hp = hp ? hp : ship_data.hp;
		this.asw = asw ? asw : ship_data.asw;
        this.luck = luck ? luck : 0;
        this.equip_in_decks = equip_in_decks;
		this.status_seek = this.calcStatusSeek(ship_data, equips, lv);
		this.equip_seek = this.calcEquipSeek(equips);
		this.drum_count = equips.filter(item => item.id === 75).length;
		this.has_radar = equips.some(item => [5812,5813].includes(item.type));
		this.has_radar5 = equips.some(item => ([5812, 5813].includes(item.type) && item.seek >= 5));
		// 特大発動艇＋戦車第11連隊及びM4A1のみ除外 M4A1はtype:84524で含まれない
		this.has_craft = equips.some(item => ([81424, 84724].includes(item.type) && item.id !== 230));
		this.valid_craft_count = equips.filter(item => Const.VALID_CRAFTS.includes(item.id)).length;
		this.has_arctic_gear = equips.some(item => item.id === 402);
	}

    private calcStatusSeek(
        ship_data: ShipData,
        equips: Equip[],
        lv: number
    ): Decimal {
        // 現在のレベルにおける素索敵値を計算
        const status_seek = new Decimal(
            ((ship_data.max_seek - ship_data.seek) * lv) / 99 + ship_data.seek
        ).floor();

        // 装備ボーナスを計算
        const bonus_seek = new Decimal(this.getSeekBonus(equips));

        // 素索敵値 + ボーナス値の平方根を計算
        return bonus_seek.plus(status_seek).sqrt();
    }

	private calcEquipSeek(equips: Equip[]) {
		let total = new Decimal(0);
		for (let i = 0;i < equips.length;i++) {
			const equip = equips[i];

			if (equip.seek === 0) continue;

			const coefficients = this.getSeekCoefficients(equip);
			const equip_conefficient = coefficients[0];
			const implovment_coefficient = coefficients[1];

			total = new Decimal(equip.implovement)
				.sqrt()
				.times(implovment_coefficient)
				.plus(equip.seek)
				.times(equip_conefficient)
                .plus(total);

		}
		return total;
	}

	private getSeekCoefficients(equip: Equip): number[] {
		let coefficients = [] as number[];

		switch (equip.type) {
			// 装備係数
			case 356: // 艦戦
			case 357: // 艦爆
			case 53645: // 水戦
			case 173341: // 大型飛行艇
			case 31626: // 対潜哨戒機
			case 31525: // 回転翼機
			case 34425: // S51J & S51J改
			case 34057: // 噴式戦闘爆撃機
			case 111: // 小口径主砲
			case 112: // 中口径主砲
			case 5812: // 小型電探
			case 5813: // 大型電探
			case 244251: // 潜水電探
			case 2332: // 潜水魚雷
			case 71014: // ソナー
			case 71040: // 大型ソナー
			case 81829: // 探照灯
			case 81842: // 大型探照灯
			case 132335: // 航空要員
			case 162739: // 見張員
			case 122234: // 司令部
			case 2422: // 甲標的
			case 84724: // AB艇
				coefficients[0] = 0.6;
				break;
			case 358: // 艦攻
                coefficients[0] = 0.8;
				break;
			case 579: // 艦偵
                coefficients[0] = 1;
				break;
			case 54311: // 水爆
                coefficients[0] = 1.1;
				break;
			case 5710: // 水偵
                coefficients[0] = 1.2;
				break;
		}

		switch (equip.type) {
			// 改修係数
			case 31525: // 回転翼機
			case 34425: // S51J & S51J改
			case 162739: // 見張員
                coefficients[1] = 0;
				break;
			case 54311: // 水爆
                coefficients[1] = 1.15;
				break;
			case 579: // 艦偵
			case 173341: // 大型飛行艇
			case 5710: // 水偵
                coefficients[1] = 1.2;
				break;
			case 5812: // 小型電探
                coefficients[1] = 1.25;
				break;
			case 5813: // 大型電探
                coefficients[1] = 1.4;
				break;
			default:
                coefficients[1] = 0;
				break;
		}
		return coefficients;
	}

	private getSeekBonus(equips: Equip[]): number {
		let total_bonus = 0;
		const disable_ids: number[] = []; // 重複不可のがきたらこれに追加
		for (let i = 0;i < equips.length;i++) {
			const equip = equips[i];
			switch (equip.id) {
				case 315: // SG初期
					if (['丹陽', '雪風改二'].includes(this.name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (this.national === 1) { // USA
						total_bonus += 4;
					}
					break;
				case 456: // SG後期
					if (['丹陽', '雪風改二'].includes(this.name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (this.national === 1) { // USA
						total_bonus += 4;
					} else if (this.national === 3) { // UK
						total_bonus += 2;
					}
					break;
				case 278: // SK
					if (this.national === 1) { // USA
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 279: // SK+SG
					if (this.national === 1) { // USA
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					} else if (this.national === 3) { // UK
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 517: { // 清霜逆探
					if (this.name === '清霜改二丁') {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (['朝霜改二', '清霜改二', '初霜改二', '潮改二', 'Верный', '霞改二', '時雨改三', '雪風改二'].includes(this.name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					} else if (this.national === 0 && this.type === '駆逐') {
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
					if (akizuki.some(item => this.name.startsWith(item)) || mogami.includes(this.name)) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					}
					break;
				}
				case 118: { // 紫雲
					if (this.name.includes('大淀')) {
						total_bonus += 2;
						if (equip.implovement === 10) { // 改修maxで更に+1
							total_bonus += 1;
						}
					}
					break;
				}
				case 414: { // SOC seagull
					if (this.national === 1) { // USA
						if (['軽巡', '重巡'].includes(this.type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 2;
								// 改修でさらにボーナス
								if (equip.implovement > 3) {
									total_bonus += 1;
								}
								disable_ids.push(equip.id);
							}
						} else if (['戦艦'].includes(this.type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 1;
								disable_ids.push(equip.id);
							}
						}
					}
					break;
				}
				case 115: // Ar196改
					if (['Bismarck', 'Prinz Eugen'].some(item => this.name.startsWith(item))) {
						total_bonus += 2;
					}
					break;
				case 371: // Fairey Seafox改
					if (this.name.includes('Gotland')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 6;
							disable_ids.push(equip.id);
						}
					} else if (this.name.includes('Nelson')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 5;
							disable_ids.push(equip.id);
						}
					} else if (this.name.includes('Commandant Teste')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						}
					} else if (['Warspite', 'Richelieu', 'Jean Bart'].some(item => this.name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 370: // Swordfish Mk.II改(水偵型)
					if (this.name.includes('Warspite')) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (['Nelson', 'Sheffield', 'Gotland'].some(item => this.name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					} else if (['Commandant Teste', '瑞穂', '神威'].some(item => this.name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 194: { // Laté 298B
					if (['Commandant Teste', 'Richelieu', 'Jean Bart', '瑞穂', '神威'].some(item => this.name.startsWith(item))) {
						total_bonus += 2;
						disable_ids.push(equip.id);
					}
					break;
				}
				case 415: // SO3C Seamew改
					if (this.national === 1) { // USA
						if (['軽巡', '重巡'].includes(this.type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 2;
								disable_ids.push(equip.id);
							}
						} else if (['戦艦'].includes(this.type)) {
							if (!disable_ids.includes(equip.id)) {
								total_bonus += 1;
								disable_ids.push(equip.id);
							}
						}
					}
					break;
				case 369: // Swordfish Mk.III改(水上機型/熟練)
					if (this.name === 'Gotland andra') {
						if (disable_ids.filter(item => item === equip.id).length === 0) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						} else if (disable_ids.filter(item => item === equip.id).length === 1) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					} else if (['Gotland', 'Commandant Teste'].some(item => this.name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (['瑞穂', '神威'].some(item => this.name.startsWith(item))) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 2;
							disable_ids.push(equip.id);
						}
					}
					break;
				case 368: // Swordfish Mk.III改(水上機型)
					if (this.name === 'Gotland andra') {
						if (disable_ids.filter(item => item === equip.id).length === 0) {
							total_bonus += 4;
							disable_ids.push(equip.id);
						} else if (disable_ids.filter(item => item === equip.id).length < 5) {
							total_bonus += 3;
							disable_ids.push(equip.id);
						}
					} else if (this.name.includes('Gotland')) {
						total_bonus += 3;
					} else if (['Commandant Teste', '瑞穂', '神威'].some(item => this.name.startsWith(item))) {
						total_bonus += 2;
					}
					break;
				case 367: // Swordfish(水上機型)
					if (['Gotland', 'Commandant Teste', '瑞穂', '神威'].some(item => this.name.startsWith(item))) {
						total_bonus += 1;
					}
					break;
				case 408: // 装甲艇(AB艇)
					if (this.name.includes('神州丸')) {
						total_bonus += 2;
					} else if (this.name.includes('あきつ丸') || this.type === '駆逐') { // 本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
						total_bonus += 1;
					}
					break;
				case 409: // 武装大発
					if (this.name.includes('神州丸')) {
						total_bonus += 2;
					} else if (this.name.includes('あきつ丸')) {
						total_bonus += 1;
					}
					break;
				case 412: // 水雷見張員
					if (this.national === 0) {
						if (this.type === '駆逐') {
							total_bonus += 1;
						} else if (this.type === '軽巡') {
							total_bonus += 3;
						} else if (['重巡', '航巡'].includes(this.type)) {
							total_bonus += 1;
						}
					}
					break;
				case 129: // 見張員
					if (this.national === 0) {
						if (this.type === '駆逐') {
							total_bonus += 1;
						} else if (this.type === '軽巡') {
							total_bonus += 3;
						} else if (['重巡', '航巡'].includes(this.type)) {
							total_bonus += 3;
						}
					}
					break;
				case 521: { // 紫雲(熟練)
					if (this.name === '大淀改') {
						if (equip.implovement > 0) { // 改修1以上で+5
							total_bonus += 5;
						}
						if (equip.implovement > 3) { // ☆4以上で更に+1
							total_bonus += 1;
						}
					} else if (this.name === '三隈改二特') {
						if (equip.implovement > 0) { // 改修1以上で+4
							total_bonus += 4;
						}
					}
					break;
				}
				case 522: // 零式小型水上機
					if (['潜水', '潜空'].includes(this.type)) {
						total_bonus += 3;
					}
					break;
				case 523: // 零式小型水上機(熟練)
					if (['潜水', '潜空'].includes(this.type)) {
						total_bonus += 4;
					}
					break;
				case 527: // Type281 レーダー
					if (this.national === 3) { // UK(大型)組
						total_bonus += 2;
					}
					break;
				case 273: { // 彩雲(偵四) ☆2のときのみ
					if (equip.implovement === 2) {
						if (!disable_ids.includes(equip.id)) {
							total_bonus += 1;
							disable_ids.push(equip.id);
						}
					}
					break;
				}
				case 510: // Walrus
					if (['Nelson', 'Rodney'].includes(this.name)) {

					} else if (['Warspite', 'Sheffield'].includes(this.name)) {

					} else if (['能代改二', '矢矧改二', '矢矧改二乙'].includes(this.name)) {

					}
					break;
			}
		}

		return total_bonus;
	}

	private calcSpeed(equips: Equip[]): SpeedId {
		let turbine = equips.filter(item => item.id === 33).length; // タービン
		let kan = equips.filter(item => item.id === 34).length; // 強化缶
		let new_kan = equips.filter(item => item.id === 87).length; // 新型缶
		let power_kan = equips.filter(item => item.id === 87 && item.implovement >= 7).length; // 新型缶☆7↑

		let kan_total = kan + new_kan;

		let speed: SpeedId;
		switch (this.speed_group) {
			case 0: // 高速A
				speed = 1;
				if (turbine && new_kan || power_kan > 1) {
					speed = 3;
				} else if (turbine && kan_total || power_kan) {
					speed = 2;
				}
				break;
			case 1: // 高速B1
				speed = 1;
				if (turbine && new_kan && kan_total > 1) {
					speed = 3;
				} else if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case 2:// 高速B2
				speed = 1;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 3;
				} else if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case 3: // 高速C
				speed = 1;
				if (turbine && kan_total) {
					speed = 2;
				}
				break;
			case 4: // 低速A群
				speed = 0;
				if (turbine && new_kan && kan_total > 2) {
					speed = 3;
				} else if (turbine && power_kan > 1) {
					speed = 3;
				} else if (turbine && new_kan && kan_total > 1) {
					speed = 2;
				} else if (turbine && power_kan) {
					speed = 2;
				} else if (turbine && kan_total) {
					speed = 1;
				}
				break;
			case 5: // 低速B
				speed = 0;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 2;
				} else if (turbine && kan_total) {
					speed = 1;
				}
				break;
			case 6: // 低速C
				speed = 0;
				if (turbine && kan_total) {
					speed = 1;
				}
				break;
			case 7: // 低速D
				speed = 0;
				if (turbine && new_kan) {
					speed = 2;
				} else if (new_kan || turbine && kan_total) {
					speed = 1;
				}
				break;
			case 8: // 低速E
				speed = 0;
				if (turbine && new_kan && kan_total > 1) {
					speed = 3;
				} else if (turbine && new_kan) {
					speed = 2;
				} else if (turbine && kan_total) {
					speed = 1;
				} else if (new_kan) {
					speed = 1;
				}
				break;
			case 9: // サミュ/改&夕張改二特
				speed = 0;
				if (turbine && (new_kan > 1 || kan_total > 2)) {
					speed = 2;
				} else if (turbine) {
					speed = 1;
				}
				break;
		}
		return speed;
	}
}