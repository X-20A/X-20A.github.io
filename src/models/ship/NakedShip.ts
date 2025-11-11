import
type { NA as National, SG as SpeedGroup, ST as ShipType }
    from '../../data/ship';
import { ShipAsw, ShipHp, ShipLuck, ShipLv } from "../../types/brand";
import { ShipId } from "../../types/shipId";
import { ShipName } from "../../types/shipName";
import SHIP_DATAS from '../../data/ship';

/**
 * レベルに応じて変動するステータスを返す
 * @param min_param 
 * @param max_param 
 * @param lv 
 * @returns 
 */
const calc_status_by_lv = (
    min_param: number,
    max_param: number,
    lv: number,
): number => {
    return Math.floor(
        ((max_param - min_param) * (lv / 99)) + min_param
    );
}

export type NakedShip = {
    readonly id: ShipId;
    readonly name: ShipName;
    readonly lv: number;
    readonly type: ShipType;
    readonly national: National;
    readonly speed_group: SpeedGroup;
    readonly natural_seek: number,
    readonly hp: number;
    readonly asw: number;
    readonly luck: number;
};

/**
 * すっぽんぽんの艦娘を生成して返す
 * @param lv 
 * @param ship_id 
 * @param hp 
 * @param asw 
 * @param luck 
 * @returns 
 */
export function derive_naked_ship(
    lv: ShipLv,
    ship_id: number,
    hp?: ShipHp,
    asw?: ShipAsw,
    luck?: ShipLuck,
): NakedShip {
    const id = ship_id as ShipId;
    const data = SHIP_DATAS[id];

    if (!data) {
        throw new Error(`id: ${ship_id}の艦は未対応です`);
    }

    const ship: NakedShip = {
        id,
        name: data.name,
        lv,
        type: data.type,
        national: data.na,
        speed_group: data.sg,
        natural_seek: calc_status_by_lv(data.seek, data.seek2, lv),
        hp: hp ?? 0,
        asw: asw ?? 0,
        luck: luck ?? 0,
    };

    return ship;
}

/**
 * 艦名の前方一致
 * @param match_name 
 * @param search_name 
 * @returns 
 */
export function startsWith_ship_name(
    match_name: ShipName,
    search_name: ShipName,
): boolean {
    return search_name.startsWith(match_name);
}

/**
 * 艦名配列の各要素に対して前方一致
 * @param match_names 
 * @param search_name 
 * @returns 
 */
export function some_startsWith_ship_name(
    match_names: ShipName[],
    search_name: ShipName,
): boolean {
    return match_names.some(item => startsWith_ship_name(item, search_name));
}