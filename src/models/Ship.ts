import { EquipInDeck } from '@/models/types';
import
    { NA as National, SG as SpeedGroup, ST as ShipType, ShipDatas, }
from '@/data/ship';
import { EquipDatas, EquipType } from '@/data/equip';
import { calcShipSeek } from '../logic/seek/ship';
import { calcBonus } from '../logic/seek/equipBonus';
import { calcShipSpeed } from '../logic/speed/ship';
import { calcEquipSeek } from '../logic/seek/equip';
import { createEquip } from './Equip';
import { Sp as Speed } from '@/core/branch';
import { createUniqueId, UniqueId } from './types/brand';

/**
 * Ship型: 艦船の情報を表現する型
 */
export type Ship = {
    readonly id: number;
    readonly unique_id: UniqueId;
    readonly name: string;
    readonly lv: number;
    readonly type: ShipType;
    readonly status_seek: number;
    readonly equip_seek: number;
    readonly national: National;
    readonly speed_group: SpeedGroup;
    readonly speed: Speed;
    readonly hp: number;
    readonly asw: number;
    readonly luck: number;
    readonly equip_in_decks: EquipInDeck[];
    readonly drum_count: number;
    readonly has_radar: boolean;
    readonly has_radar5: boolean;
    readonly has_craft: boolean;
    readonly has_arBulge: boolean;
    readonly valid_craft_count: number;
    readonly has_arctic_gear: boolean;
};

/**
 * ルート分岐に関わる大発群
 */
const ROUTING_CRAFTS: Readonly<number[]> =
    [68, 166, 167, 193, 409, 436, 449, 525, 526];

/**
 * 資源獲得量増加に寄与する大発群
 */
const RESOURCE_CRAFTS: Readonly<number[]> =
    [68, 166, 167, 193, 408, 409, 436, 449, 525, 526];

/**
 * Shipオブジェクトを生成するファクトリ関数
 * @param fleet_index 艦隊番号
 * @param ship_index 艦番号
 * @param ship_id 艦船ID
 * @param lv レベル
 * @param equip_in_decks 装備情報
 * @param hp HP(任意)
 * @param asw 対潜値(任意)
 * @param luck 運(任意)
 * @returns Shipオブジェクト
 * @throws 未対応艦の場合はエラー
 */
export function createShip(
    fleet_index: number,
    ship_index: number,
    ship_id: number,
    lv: number,
    equip_in_decks: EquipInDeck[],
    ship_datas: ShipDatas,
    equip_datas: EquipDatas,
    hp?: number,
    asw?: number,
    luck?: number,
): Ship {
    const data = ship_datas[ship_id];

    if (!data) {
        throw new Error(`第${fleet_index}艦隊の${ship_index}番艦は未対応です`);
    }

    const equips = equip_in_decks.map((equip_in_deck, index) =>
        createEquip(
            equip_in_deck.id,
            equip_in_deck.improvement,
            data.name,
            index,
            equip_in_deck.is_ex,
            equip_datas,
        )
    );

    const speed_group = data.sg;
    const speed = calcShipSpeed(equips, data.sg);

    const _hp = hp ?? 0;
    const _asw = asw ?? 0;
    const _luck = luck ?? 0;

    const bonus_seek = calcBonus(data.name, data.type, data.na, equips);
    const status_seek = calcShipSeek(data, bonus_seek, lv);
    const equip_seek = calcEquipSeek(equips);

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
        if (ROUTING_CRAFTS.includes(equip.id)) has_craft = true;
        if (RESOURCE_CRAFTS.includes(equip.id)) valid_craft_count++;
        if ([EquipType.RadarS, EquipType.RadarL].includes(equip.type)) {
            has_radar = true;
            if (equip.seek >= 5) has_radar5 = true;
        }
    });

    return {
        id: ship_id,
        unique_id: createUniqueId(ship_index),
        name: data.name,
        lv,
        type: data.type,
        national: data.na,
        speed_group,
        speed,
        hp: _hp,
        asw: _asw,
        luck: _luck,
        equip_in_decks,
        status_seek,
        equip_seek,
        drum_count,
        has_radar,
        has_radar5,
        has_craft,
        has_arBulge,
        valid_craft_count,
        has_arctic_gear,
    };
}