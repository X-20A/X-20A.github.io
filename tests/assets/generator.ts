import SHIP_DATAS from "@/data/ship";
import { derive_naked_ship, NakedShip } from "@/models/ship/NakedShip";
import { brandShipLv } from "@/types/brand";
import { ShipName } from "@/types/shipName";

const DEFAULT_LV = brandShipLv(99);

export function derive_naked_ship_from_name(
    name: ShipName,
    lv = DEFAULT_LV,
): NakedShip {
    const data = Object.entries(SHIP_DATAS)
        .find(([, data]) => data.name === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    const id = Number(data[0]);
    return derive_naked_ship(DEFAULT_LV, id);
}