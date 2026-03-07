import { QuestCompositionCondition, NO_CONDITIONS } from ".";
import { ST } from "../../../data/ship";
import { count_ships_by_base_names, extract_flagship, includes_base_ship, is_flagship_CL } from "../../../models/fleet/AdoptFleet";

export const calc_Bm1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return (
        includes_base_ship('妙高', base_ship_names) &&
        includes_base_ship('那智', base_ship_names) &&
        includes_base_ship('羽黒', base_ship_names)
    );
};

export const calc_Bm2: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bm3: QuestCompositionCondition = (fleet) => {
    const { CL, DD } = fleet.composition;
    return (
        is_flagship_CL(fleet) &&
        (
            (CL === 1 && DD === 5) ||
            (CL === 2 && DD === 4) ||
            (CL === 3 && DD === 3)
        )
    );
};

export const calc_Bm4: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const { CL } = fleet.composition;
    return (
        count_ships_by_base_names(
            ['大和', '武蔵', '長門', '陸奥', '伊勢', '日向', '扶桑', '山城'],
            base_ship_names,
        ) >= 3 &&
        CL >= 1
    );
};

export const calc_Bm5: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bm6: QuestCompositionCondition = (fleet) => {
    const { CVs, DD } = fleet.composition;
    return (
        CVs >= 2 &&
        DD >= 2
    );
};

export const calc_Bm7: QuestCompositionCondition = (fleet) => {
    const { CA, CL, DD } = fleet.composition;
    return (
        extract_flagship(fleet).type === ST.DD &&
        CA === 1 &&
        CL === 1 &&
        DD === 4
    );
};

export const calc_Bm8: QuestCompositionCondition = (fleet) => {
    const { CVL, CL, CT, CLT, Ds } = fleet.composition;
    return (
        CVL + CL + CT + CLT >= 1 &&
        Ds >= 3
    );
};