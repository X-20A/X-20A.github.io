import
type { NA as National, SG as SpeedGroup, ST as ShipType }
    from '../../data/ship';
import { ShipAsw, ShipHp, ShipLuck, ShipLv } from "../../types/brand";
import { ShipId } from "../../types/shipId";
import { ShipName } from "../../types/shipName";
import SHIP_DATAS from '../../data/ship';
import { NotYetSupportedShip } from '../../errors/CustomError';
import { BaseShipName } from '../../types/baseShipName';

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
    readonly base_name: BaseShipName;
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
        throw new NotYetSupportedShip(`id: ${ship_id}の艦は未対応です`);
    }
    const base_ship_data = SHIP_DATAS[data.base];
    if (!base_ship_data) {
        throw new NotYetSupportedShip(`id: ${data.base}の基本艦は未対応です`);
    }

    const ship: NakedShip = {
        id,
        name: data.name,
        base_name: base_ship_data.name as BaseShipName,        lv,
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