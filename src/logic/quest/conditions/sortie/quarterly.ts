import { QuestCompositionCondition, NO_CONDITIONS } from ".";
import { count_ships_by_base_names, extract_flagship } from "../../../../models/fleet/AdoptFleet";
import { includes_ship_name, includes_ship_names } from "../../../../models/ship/predicate";
import { ShipName } from "../../../../types/shipName";

export const calc_Bq1: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bq2: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bq3: QuestCompositionCondition = (fleet) => {
    const { BBV, AO } = fleet.composition;
    return (
        BBV + AO >= 2
    );
};

export const calc_Bq4: QuestCompositionCondition = (fleet) => {
    const { AV, CL } = fleet.composition;
    return (
        AV >= 1 &&
        CL >= 2
    );
};

export const calc_Bq5: QuestCompositionCondition = (fleet) => {
    const { CL } = fleet.composition;
    return (
        CL >= 1
    );
};

const NAGANAMI_PAIR_NAMES: ShipName[] = [
    '高波改', '高波改二',
    '沖波改', '沖波改二',
    '朝霜改', '朝霜改二',
] as const;

export const calc_Bq6: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '長波改二') &&
        includes_ship_names(NAGANAMI_PAIR_NAMES, ship_names)
    );
};

export const calc_Bq7: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
            ['鳥海', '青葉', '衣笠', '加古', '古鷹', '天龍', '夕張'],
            base_ship_names,
        ) >= 4;
};

export const calc_Bq8: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bq9: QuestCompositionCondition = (fleet) => {
    const { CV, CVB, CVL } = fleet.composition;
    return (
        CV + CVB + CVL >= 1
    );
};

export const calc_Bq10: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bq11: QuestCompositionCondition = (fleet) => {
    const { CVL, CL, CT, CLT, Ds } = fleet.composition;
    return (
        CVL + CL + CT + CLT >= 1 &&
        Ds >= 3
    );
};

export const calc_Bq12: QuestCompositionCondition =
    () => NO_CONDITIONS;

const YUBARI_KAI_NI_SERIES: ShipName[] = [
    '夕張改二', '夕張改二丁', '夕張改二特',
] as const;

export const calc_Bq13: QuestCompositionCondition = (fleet) => {
    const {
        ship_names,
        base_ship_names,
    } = fleet;
    const flagship_name = extract_flagship(fleet).name;
    return (
        includes_ship_name(YUBARI_KAI_NI_SERIES, flagship_name) &&
        (
            count_ships_by_base_names(
                ['睦月', '如月', '弥生', '卯月', '菊月', '望月'],
                base_ship_names,
            ) >= 2 ||
            includes_ship_name(ship_names, '由良改二')
        )
    );
};