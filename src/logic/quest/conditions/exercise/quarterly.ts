import { count_ships_by_base_names, extract_flagship } from "../../../../models/fleet/AdoptFleet";
import { is_CVs } from "../../../../models/ship/predicate";
import { BaseShipName } from "../../../../types/baseShipName";
import { QuestCompositionCondition } from "../sortie";

export const calc_Cq1: QuestCompositionCondition = (fleet) => {
    const { CVs, DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return is_CVs(flagship.type) &&
        CVs >= 2 &&
        DD >= 2;
};

const JUUHAKKU_BASE_NAMES: BaseShipName[] =
    ['霞', '霰', '陽炎', '不知火'] as const;

export const calc_Cq2: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
        JUUHAKKU_BASE_NAMES,
        base_ship_names,
    ) >= 4;
};

const JUUKYUUKU_BASE_NAMES: BaseShipName[] =
    ['磯波', '浦波', '綾波', '敷波'] as const;

export const calc_Cq3: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
        JUUKYUUKU_BASE_NAMES,
        base_ship_names,
    ) >= 4;
};

export const calc_Cq4: QuestCompositionCondition = (fleet) => {
    const { Ds, CL } = fleet.composition;
    return Ds >= 4 ||
        Ds === 3 && CL >= 1;
};