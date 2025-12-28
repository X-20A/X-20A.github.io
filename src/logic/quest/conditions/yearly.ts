import { QuestCompositionCondition } from ".";
import { NA, ST } from "../../../data/ship";
import { count_ships_by_names, extract_flagship } from "../../../models/fleet/AdoptFleet";
import { includes_ship_name, includes_ship_names, includes_ship_type, is_CVs } from "../../../models/ship/predicate";
import { ShipName } from "../../../types/shipName";

// wikiがID順でなく月順なので倣う

export const calc_By13: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '朧改') &&
        includes_ship_name(ship_names, '漣改') &&
        includes_ship_names(ship_names, ['曙改', '曙改二']) &&
        includes_ship_names(ship_names, ['潮改', '潮改二'])
    );
};

export const calc_By1: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '綾波改二') &&
        includes_ship_name(ship_names, '敷波改二')
    );
};

export const calc_By2: QuestCompositionCondition = (fleet) => {
    const { DE } = fleet.composition;
    return (
        DE >= 3
    );
};

export const calc_By3: QuestCompositionCondition = (fleet) => {
    const { DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return (
        includes_ship_name(['明石', '明石改'], flagship.name) &&
        DD >= 3
    );
};

export const calc_By4: QuestCompositionCondition = (fleet) => {
    const { CA, DD } = fleet.composition;
    return (
        CA >= 3 &&
        DD >= 1
    );
};

export const calc_By11: QuestCompositionCondition = (fleet) => {
    const { CVs } = fleet.composition;
    const EN_ships_count = fleet.fleets[0].units.filter(unit => {
        const { national } = unit.ship;
        return national === NA.UK ||
            national === NA.USA;
    }).length;
    return (
        EN_ships_count >= 3 &&
        CVs === 0
    );
};

export const calc_By12: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '磯波改二') &&
        includes_ship_name(ship_names, '浦波改二') &&
        includes_ship_name(ship_names, '綾波改二') &&
        includes_ship_name(ship_names, '敷波改二')
    );
};

const UKURU_CLASS_NAMES: ShipName[] = [
    '鵜来', '鵜来改',
    '稲木', '稲木改', '稲木改二',
] as const;

export const calc_By14: QuestCompositionCondition = (fleet) => {
    const { DE } = fleet.composition;
    const flagship = extract_flagship(fleet);
    const ships_length = fleet.fleets[0].units.length;
    return (
        includes_ship_name(UKURU_CLASS_NAMES, flagship.name) &&
        ships_length <= 4 &&
        ships_length === DE
    );
};

export const calc_By6: QuestCompositionCondition = (fleet) => {
    const { Ds } = fleet.composition;
    const flagship = extract_flagship(fleet);
    const escort_Ds_count = Ds - (flagship.type === ST.DD ? 1 : 0);
    return (
        includes_ship_type([ST.CA, ST.DD], flagship.type) &&
        escort_Ds_count >= 3
    );
};

export const calc_By7: QuestCompositionCondition = (fleet) => {
    const { Ds } = fleet.composition;
    const flagship = extract_flagship(fleet);
    const escort_Ds_count = Ds - (flagship.type === ST.DD ? 1 : 0);
    return (
        includes_ship_type([ST.CL, ST.CT, ST.DD], flagship.type) &&
        escort_Ds_count >= 3
    );
};

export const calc_By8: QuestCompositionCondition = (fleet) => {
    const { CAs } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return (
        is_CVs(flagship.type) &&
        CAs >= 2
    );
};

export const calc_By9: QuestCompositionCondition = (fleet) => {
    const { CVL } = fleet.composition;
    return (
        CVL >= 2
    );
};

export const calc_By10: QuestCompositionCondition = (fleet) => {
    const flagship = extract_flagship(fleet);
    return (
        is_CVs(flagship.type)
    );
};

const HAGURO_SERIES: ShipName[] = [
    '羽黒', '羽黒改', '羽黒改二',
] as const;
const ASHIGARA_SERIES: ShipName[] = [
    '足柄', '足柄改', '足柄改二',
] as const;
const MYOKO_SERIES: ShipName[] = [
    '妙高', '妙高改', '妙高改二',
] as const;
const TAKAO_SERIES: ShipName[] = [
    '高雄', '高雄改',
] as const;
const KAMIKAZE_SERIES: ShipName[] = [
    '神風', '神風改',
] as const;

export const calc_By5: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        count_ships_by_names(HAGURO_SERIES, ship_names)
        + count_ships_by_names(ASHIGARA_SERIES, ship_names)
        + count_ships_by_names(MYOKO_SERIES, ship_names)
        + count_ships_by_names(TAKAO_SERIES, ship_names)
        + count_ships_by_names(KAMIKAZE_SERIES, ship_names) >= 2
    );
};

const HIEI_SERIES: ShipName[] = [
    '比叡', '比叡改', '比叡改二', '比叡改二丙',
] as const;
const KIRISHIMA_SERIES: ShipName[] = [
    '霧島', '霧島改', '霧島改二', '霧島改二丙',
] as const;

export const calc_By15: QuestCompositionCondition = (fleet) => {
    const { DD } = fleet.composition;
    const { ship_names } = fleet;
    return (
        includes_ship_names(HIEI_SERIES, ship_names) &&
        includes_ship_names(KIRISHIMA_SERIES, ship_names) &&
        DD >= 2
    );
};