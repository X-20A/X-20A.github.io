import Equip from '@/models/Equip';
import { EquipInDeck } from '@/models/types';
import
    ship_datas,
    { NA as National, SG as SpeedGroup, ST as ShipType }
from '@/data/ship';
import { EquipType} from '@/data/equip';
import { Sp as Speed } from '@/core/Sim';
import { calcShipSeek } from '../logic/seek/ship';
import { calcBonus } from '../logic/seek/equipBonus';
import { calcShipSpeed } from '../logic/speed/ship';
import { calcEquipSeek } from '../logic/seek/equip';

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

    /**
     * ルート分岐に関わる大発群    
     * 68 : 大発動艇,    
     * 166: 大発動艇(八九式中戦車&陸戦隊),    
     * 167: 特二式内火艇,     
     * 193: 特大発動艇,    
     * 409: 武装大発,    
     * 436: 大発動艇(II号戦車/北アフリカ仕様),    
     * 449: 特大発動艇+一式砲戦車,    
     * 525: 特四式内火艇,    
     * 526: 特四式内火艇改    
     * https://x.gd/AjX5F > ルート分岐での大発動艇について
     */
    private readonly ROUTING_CRAFTS: Readonly<number[]> =
        [68, 166, 167, 193, 409, 436, 449, 525, 526];

    /**
     * 資源獲得量増加に寄与する大発群    
     * 68 : 大発動艇,    
     * 166: 大発動艇(八九式中戦車&陸戦隊),    
     * 167: 特二式内火艇,     
     * 193: 特大発動艇,    
     * 408: 装甲艇(AB艇),    
     * 409: 武装大発,    
     * 436: 大発動艇(II号戦車/北アフリカ仕様),    
     * 449: 特大発動艇+一式砲戦車,    
     * 525: 特四式内火艇,    
     * 526: 特四式内火艇改    
     * https://x.gd/0CJOt > 燃料稼ぎ
     */
    private readonly RESOURCE_CRAFTS: Readonly<number[]> =
        [68, 166, 167, 193, 408, 409, 436, 449, 525, 526];
	
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
                data.name,
                index,
                equip_in_deck.is_ex,
            )
        );

		this.speed_group = data.sg;
		this.speed = calcShipSpeed(equips, data.sg);
        // 制空シミュからのデッキビルダーには実 HP, 対潜値も載ってる
        // なければ0 スクショくらいでしか使わないし、
        // ちゃんと出そうとすると装備から計算しないといけないのでサボる
		this.hp = hp ?? 0;
		this.asw = asw ?? 0;
        this.luck = luck ?? 0;
        this.equip_in_decks = equip_in_decks;

        const bonus_seek = calcBonus(data.name, data.type, data.na, equips);
		this.status_seek = calcShipSeek(data, bonus_seek, lv);
        this.equip_seek = calcEquipSeek(equips);

        let drum_count = 0;
        let has_radar = false;
        let has_radar5 = false;
        let has_craft = false;
        let has_arBulge = false;
        let valid_craft_count = 0;
        let has_arctic_gear = false;

        equips.forEach(equip => {
            if (equip.id === 75) drum_count++;
            if (equip.id === 268) has_arBulge = true;
            if (equip.id === 402) has_arctic_gear = true;
            if (this.ROUTING_CRAFTS.includes(equip.id)) has_craft = true;
            if (this.RESOURCE_CRAFTS.includes(equip.id)) valid_craft_count++;
            if ([EquipType.RadarS, EquipType.RadarL].includes(equip.type)) {
                has_radar = true;
                if (equip.seek >= 5) has_radar5 = true;
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
}