import { ST as ShipType } from "../../data/ship";
import { ShipId } from "../../types/shipId";
import { ShipName } from "../../types/shipName";

/**
 * 艦IDが含まれるか判定して返す
 * @param match_ids 
 * @param search_id 
 * @returns 
 */
export function includes_ship_id(
    match_ids: ShipId[],
    search_id: ShipId
): boolean {
    return match_ids.includes(search_id);
}

export function includes_ship_type(
    match_types: ShipType[],
    search_type: ShipType,
): boolean {
    return match_types.includes(search_type);
}

const CVs_TYPES: ShipType[] = [
    ShipType.CV,
    ShipType.CVB,
    ShipType.CVL,
] as const;

export function is_CVs(
    search_type: ShipType,
): boolean {
    return includes_ship_type(CVs_TYPES, search_type);
}

/**
 * 艦名が含まれるか判定して返す
 * @param match_names 
 * @param search_name 
 * @returns 
 */
export function includes_ship_name(
    match_names: ShipName[],
    search_name: ShipName,
): boolean {
    return match_names.includes(search_name);
}