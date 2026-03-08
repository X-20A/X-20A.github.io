import { ST } from "../../../../data/ship";
import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { includes_ship_name, includes_ship_type } from "../../../../models/ship/predicate";
import { BaseShipName } from "../../../../types/baseShipName";
import { ShipName } from "../../../../types/shipName";
import { QuestCompositionCondition } from "../sortie";

export const calc_Cy3: QuestCompositionCondition = (fleet) => {
    const { CLE, DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return includes_ship_type([ST.CL, ST.CT], flagship.type) &&
        CLE >= 3 &&
        DD >= 2
};

const DAINANA_BASE_NAMES: BaseShipName[] =
    ['朧', '曙', '漣', '潮'] as const;

export const calc_Cy4: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(DAINANA_BASE_NAMES, base_ship_names) >= 4;
};

const JUUICHIKU_BASE_NAMES: BaseShipName[] =
    ['吹雪', '白雪', '初雪', '深雪'] as const;

export const calc_Cy10: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(JUUICHIKU_BASE_NAMES, base_ship_names) >= 4;
};

const SHIRATSUYU_BASE_NAMES: BaseShipName[] =
    ['村雨', '夕立', '五月雨', '白露', '時雨'] as const;

export const calc_Cy12: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return flagship.base_name === '春雨' &&
        count_ships_by_base_names(SHIRATSUYU_BASE_NAMES, base_ship_names) >= 3;
};

export const calc_Cy8: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '磯波改二') &&
        includes_ship_name(ship_names, '浦波改二') &&
        includes_ship_name(ship_names, '綾波改二') &&
        includes_ship_name(ship_names, '敷波改二')
    );
};

export const calc_Cy5: QuestCompositionCondition = (fleet) => {
    const { CAs, DD } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return includes_ship_type([ST.CA, ST.CAV], flagship.type) &&
        CAs >= 4 &&
        DD === 2;
};

const YAMATO_CLASS_BASE_NAMES: BaseShipName[] =
    ['大和', '武蔵'] as const;

export const calc_Cy9: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const { CL, DD } = fleet.composition;
    return count_ships_by_base_names(YAMATO_CLASS_BASE_NAMES, base_ship_names) >= 2 &&
        CL >= 1 &&
        DD >= 2;
};

const AKIZUKI_CLASS_BASE_NAMES: BaseShipName[] =
    ['秋月', '照月', '初月', '涼月', '冬月'] as const;

export const calc_Cy13: QuestCompositionCondition = (fleet) => {
    const { DD, BBV } = fleet.composition;
    const flagship = extract_flagship(fleet);
    return includes_base_ship(flagship.base_name, AKIZUKI_CLASS_BASE_NAMES) &&
        DD >= 2 &&
        BBV >= 2;
};

const GAMBY_ESCORT_BASE_NAMES: BaseShipName[] =
    ['Fletcher', 'Johnston', 'Samuel B.Roberts'] as const;

export const calc_Cy6: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return flagship.name === 'Gambier Bay Mk.II' &&
        count_ships_by_base_names(GAMBY_ESCORT_BASE_NAMES, base_ship_names) >= 2;
};

const JUUROKKU_BASE_NAMES: BaseShipName[] =
    ['天津風', '雪風', '時津風', '初風'] as const;

export const calc_Cy11: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(JUUROKKU_BASE_NAMES, base_ship_names) >= 2;
};

const FRENCH_BASE_NAMES: BaseShipName[] =
    ['Richelieu', 'Jean Bart', 'Commandant Teste', 'Gloire', 'Mogador'] as const;

export const calc_Cy14: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return includes_base_ship(flagship.base_name, FRENCH_BASE_NAMES) &&
        count_ships_by_base_names(FRENCH_BASE_NAMES, base_ship_names) >= 3;
};

const DAISAN_SENTAI_BASE_NAMES: BaseShipName[] =
    ['比叡', '霧島'] as const;

export const calc_Cy15: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const { CL, DD } = fleet.composition;
    return count_ships_by_base_names(DAISAN_SENTAI_BASE_NAMES, base_ship_names) >= 2 &&
        CL >= 1 &&
        DD >= 2;
};

const ENGLISH_BASE_NAMES: BaseShipName[] =
    ['Warspite', '金剛', 'Ark Royal', 'Nelson', 'Jervis', 'Janus', 'Javelin'] as const;

export const calc_Cy1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(ENGLISH_BASE_NAMES, base_ship_names) >= 4;
};

export const calc_Cy2: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        includes_ship_name(ship_names, '夕雲改二') &&
        includes_ship_name(ship_names, '巻雲改二') &&
        includes_ship_name(ship_names, '風雲改二') &&
        includes_ship_name(ship_names, '秋雲改二')
    );
};

export const calc_Cy7: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    if (ship_names.length <= 1) return false;

    const combination: ShipName[] = [ship_names[0], ship_names[1]];
    return combination.includes('黒潮改二') &&
        combination.includes('親潮改二');
};

export const calc_Cy16: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return includes_base_ship(flagship.base_name, ['早霜', '秋霜', '清霜']) &&
        count_ships_by_base_names(['早霜', '秋霜', '清霜', '朝霜'], base_ship_names) >= 2;
};