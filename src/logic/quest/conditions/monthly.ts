import { QuestCompositionCondition, NO_CONDITIONS } from ".";
import { ST } from "../../../data/ship";
import { count_ships_by_names, count_Yamato_class, extract_flagship, is_flagship_CL } from "../../../models/fleet/AdoptFleet";
import { includes_ship_names } from "../../../models/ship/predicate";
import { ShipName } from "../../../types/shipName";

const MYOKO_SERIES: ShipName[] = [
    '妙高', '妙高改', '妙高改二',
] as const;
const NATI_SERIES: ShipName[] = [
    '那智', '那智改', '那智改二',
] as const;
const HAGURO_SERIES: ShipName[] = [
    '羽黒', '羽黒改', '羽黒改二',
] as const;

export const calc_Bm1: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_names(MYOKO_SERIES, ship_names) &&
        includes_ship_names(NATI_SERIES, ship_names) &&
        includes_ship_names(HAGURO_SERIES, ship_names)
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

const NAGATO_SERIES: ShipName[] = [
    '長門', '長門改', '長門改二',
] as const;
const MUTSU_SERIES: ShipName[] = [
    '陸奥', '陸奥改', '陸奥改二',
] as const;
const ISE_SERIES: ShipName[] = [
    '伊勢', '伊勢改', '伊勢改二',
] as const;
const HYUGA_SERIES: ShipName[] = [
    '日向', '日向改', '日向改二',
] as const;
const HUSO_SERIES: ShipName[] = [
    '扶桑', '扶桑改', '扶桑改二',
] as const;
const YAMASHIRO_SERIES: ShipName[] = [
    '山城', '山城改', '山城改二',
] as const;

export const calc_Bm4: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    const { CL } = fleet.composition;
    return (
        count_Yamato_class(fleet)
        + count_ships_by_names(NAGATO_SERIES, ship_names)
        + count_ships_by_names(MUTSU_SERIES, ship_names)
        + count_ships_by_names(ISE_SERIES, ship_names)
        + count_ships_by_names(HYUGA_SERIES, ship_names)
        + count_ships_by_names(HUSO_SERIES, ship_names)
        + count_ships_by_names(YAMASHIRO_SERIES, ship_names) >= 3 &&
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