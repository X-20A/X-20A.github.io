import { QuestCompositionCondition, NO_CONDITIONS } from ".";
import { count_ships_by_names } from "../../../models/fleet/AdoptFleet";
import { includes_ship_name, includes_ship_names } from "../../../models/ship/predicate";
import { ShipName } from "../../../types/shipName";

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

const CHOKAI_SERIES: ShipName[] = [
    '鳥海', '鳥海改', '鳥海改二',
] as const;
const AOBA_SERIES: ShipName[] = [
    '青葉', '青葉改',
] as const;
const KINUGASA_SERIES: ShipName[] = [
    '衣笠', '衣笠改', '衣笠改二',
] as const;
const KAKO_SERIES: ShipName[] = [
    '加古', '加古改', '加古改二',
] as const;
const HURUTAKA_SERIES: ShipName[] = [
    '古鷹', '古鷹改', '古鷹改二',
] as const;
const TENRYU_SERIES: ShipName[] = [
    '天龍', '天龍改', '天龍改二',
] as const;
const YUBARI_SERIES: ShipName[] = [
    '夕張', '夕張改', '夕張改二', '夕張改二丁', '夕張改二特',
] as const;

export const calc_Bq7: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        count_ships_by_names(CHOKAI_SERIES, ship_names)
        + count_ships_by_names(AOBA_SERIES, ship_names)
        + count_ships_by_names(KINUGASA_SERIES, ship_names)
        + count_ships_by_names(KAKO_SERIES, ship_names)
        + count_ships_by_names(HURUTAKA_SERIES, ship_names)
        + count_ships_by_names(TENRYU_SERIES, ship_names)
        + count_ships_by_names(YUBARI_SERIES, ship_names) >= 4
    );
};

export const calc_Bq8: QuestCompositionCondition =
    () => NO_CONDITIONS;

export const calc_Bq9: QuestCompositionCondition = (fleet) => {
    const { BBV } = fleet.composition;
    return (
        BBV >= 1
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
const MUTSUKI_SERIES: ShipName[] = [
    '睦月', '睦月改', '睦月改二',
] as const;
const KISARAGI_SERIES: ShipName[] = [
    '如月', '如月改', '如月改二',
] as const;
const YAYOI_SERIES: ShipName[] = [
    '弥生', '弥生改',
] as const;
const UZUKI_SERIES: ShipName[] = [
    '卯月', '卯月改',
] as const;
const KIKUZUKI: ShipName[] = [
    '菊月', '菊月改',
] as const;
const MOCHIZUKI: ShipName[] = [
    '望月', '望月改',
] as const;

export const calc_Bq13: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    const flagship_name = fleet.fleets[0].units[0].ship.name;
    return (
        includes_ship_name(YUBARI_KAI_NI_SERIES, flagship_name) &&
        (
            (
                count_ships_by_names(MUTSUKI_SERIES, ship_names)
                + count_ships_by_names(KISARAGI_SERIES, ship_names)
                + count_ships_by_names(YAYOI_SERIES, ship_names)
                + count_ships_by_names(UZUKI_SERIES, ship_names)
                + count_ships_by_names(KIKUZUKI, ship_names)
                + count_ships_by_names(MOCHIZUKI, ship_names) >= 2
            ) ||
            includes_ship_name(ship_names, '由良改二')
        )
    );
};