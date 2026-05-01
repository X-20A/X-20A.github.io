import { QuestCompositionCondition } from ".";
import { NA, ST } from "../../../../data/ship";
import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { includes_ship_name, includes_ship_names, includes_ship_type, is_CVs } from "../../../../models/ship/predicate";
import { BaseShipName } from "../../../../types/baseShipName";

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

const TOKU_1_BASE_NAMES: BaseShipName[] =
    ['白雪', '初雪', '深雪', '叢雲', '薄雲', '白雲', '磯波', '浦波'] as const;

export const calc_By16: QuestCompositionCondition = (fleet) => {
    if (fleet.ships_length <= 1) return false;

    const flagship = extract_flagship(fleet);
    const second_ship = fleet.fleets[0].units[1].ship;
    return (includes_ship_name(['吹雪改三', '吹雪改三護(六式)'], flagship.name))
        && includes_base_ship(second_ship.base_name, TOKU_1_BASE_NAMES);
}

export const calc_By3: QuestCompositionCondition = (fleet) => {
    const { DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return (
        flagship.base_name === '明石' &&
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

export const calc_By14: QuestCompositionCondition = (fleet) => {
    const { DE } = fleet.composition;
    const flagship = extract_flagship(fleet);
    const ships_length = fleet.fleets[0].units.length;
    return (
        includes_base_ship(flagship.base_name, ['鵜来', '稲木']) &&
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

export const calc_By5: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
            ['羽黒', '足柄', '妙高', '高雄', '神風'],
            base_ship_names,
        ) >= 2;
};

export const calc_By15: QuestCompositionCondition = (fleet) => {
    const { DD } = fleet.composition;
    const { base_ship_names } = fleet;
    return (
        includes_base_ship('比叡', base_ship_names) &&
        includes_base_ship('霧島', base_ship_names) &&
        DD >= 2
    );
};