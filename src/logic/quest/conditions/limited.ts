import { QuestCompositionCondition } from ".";
import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../models/fleet/AdoptFleet";
import { BaseShipName } from "../../../types/baseShipName";

export const calc_2412B5: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
        ['玉波', '涼波', '藤波', '早波', '浜波'],
        base_ship_names,
    ) >= 3;
};

const VALENTINE_BASE_SHIP_NAMES: BaseShipName[] =
    ['大井', '球磨', '鹿島', '神威', '大泊', '神風', '高波', '涼波', '藤波', '早波', '浜波'] as const;

export const calc_2602B1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return includes_base_ship(flagship.base_name, VALENTINE_BASE_SHIP_NAMES) &&
        count_ships_by_base_names(VALENTINE_BASE_SHIP_NAMES, base_ship_names) >= 3;
};