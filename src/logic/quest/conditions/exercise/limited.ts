import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { BaseShipName } from "../../../../types/baseShipName";
import { QuestCompositionCondition } from "../sortie";

const SANJUUNIKU_BASE_NAMES: BaseShipName[] =
    ['玉波', '涼波', '藤波', '早波', '浜波'] as const;

export const calc_2409C1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(SANJUUNIKU_BASE_NAMES, base_ship_names) >= 3
};

