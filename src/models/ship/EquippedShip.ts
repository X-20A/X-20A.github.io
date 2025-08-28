import
    type { NA as National, SG as SpeedGroup, ST as ShipType }
from '@/data/ship';
import { EquipType } from '@/data/equip';
import { calc_equip_bonus } from '../../logic/seek/equipBonus';
import { calc_ship_speed } from '../../logic/speed/ship';
import { calc_equip_seek } from '../../logic/seek/equip';
import { Equip } from '../Equip';
import type { Sp as Speed } from '@/core/branch';
import { ShipId } from '@/types/shipId';
import { ShipName } from '@/types/shipName';
import { NakedShip } from './NakedShip';

type PreInfo = {
    readonly drum_count: number;
    readonly has_radar: boolean;
    readonly has_radar5: boolean;
    readonly has_craft: boolean;
    readonly has_arBulge: boolean;
    readonly valid_craft_count: number;
    readonly has_arctic_gear: boolean;
}
const INITIAL: PreInfo = {
    drum_count: 0,
    has_radar: false,
    has_radar5: false,
    has_craft: false,
    has_arBulge: false,
    valid_craft_count: 0,
    has_arctic_gear: false,
} as const;

const calc_pre_info = (
    equips: Equip[],
): PreInfo => {
    return equips.reduce((acc, equip) => {
        if (equip.id === 75) acc.drum_count++;
        if (equip.id === 268) acc.has_arBulge = true;
        if (equip.id === 402) acc.has_arctic_gear = true;
        if (ROUTING_CRAFTS.includes(equip.id)) acc.has_craft = true;
        if (RESOURCE_CRAFTS.includes(equip.id)) acc.valid_craft_count++;
        if ([EquipType.RadarS, EquipType.RadarL].includes(equip.type)) {
            acc.has_radar = true;
            if (equip.seek >= 5) acc.has_radar5 = true;
        }
        return acc;
    }, { ...INITIAL });
}

/**
 * Ship型: 艦船の情報を表現する型
 */
export type EquippedShip = {
    readonly id: ShipId;
    readonly name: ShipName;
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
    readonly equips: Equip[];
} & PreInfo

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
 * @param lv レベル
 * @param ship_id 艦船ID
 * @param equips 装備
 * @param hp HP(任意)
 * @param asw 対潜値(任意)
 * @param luck 運(任意)
 * @returns Shipオブジェクト
 * @throws 未対応艦の場合はエラー
 */
export function derive_equipped_ship(
    naked_ship: NakedShip,
    equips: Equip[],
): EquippedShip {
    const speed_group = naked_ship.speed_group;
    const speed = calc_ship_speed(equips, speed_group);

    const bonus_seek = calc_equip_bonus(
        naked_ship.name,
        naked_ship.type,
        naked_ship.national,
        equips,
    );
    const status_seek = Math.sqrt(naked_ship.natural_seek + bonus_seek);
    const equip_seek = calc_equip_seek(equips);

    const ship: EquippedShip = {
        id: naked_ship.id,
        name: naked_ship.name,
        lv: naked_ship.lv,
        type: naked_ship.type,
        national: naked_ship.national,
        speed_group,
        speed,
        hp: naked_ship.hp,
        asw: naked_ship.asw,
        luck: naked_ship.luck,
        equips,
        status_seek,
        equip_seek,
        ...calc_pre_info(equips),
    };

    return ship;
}