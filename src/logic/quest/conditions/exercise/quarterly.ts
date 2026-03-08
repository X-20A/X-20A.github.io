import { extract_flagship } from "../../../../models/fleet/AdoptFleet";
import { is_CVs } from "../../../../models/ship/predicate";
import { QuestCompositionCondition } from "../sortie";

export const calc_Cq1: QuestCompositionCondition = (fleet) => {
    const { CVs, DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return is_CVs(flagship.type) &&
        CVs >= 2 &&
        DD >= 2;
};