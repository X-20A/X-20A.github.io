import { QuestCompositionCondition } from ".";
import { count_ships_by_base_names } from "../../../models/fleet/AdoptFleet";

export const calc_2412B5: QuestCompositionCondition = (fleet) => {
    const { base_ship_names: base_ship_names } = fleet;
    return count_ships_by_base_names(
        ['玉波', '涼波', '藤波', '早波', '浜波'],
        base_ship_names,
    ) >= 3;
};
