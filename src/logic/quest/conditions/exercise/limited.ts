import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { BaseShipName } from "../../../../types/baseShipName";
import { QuestCompositionCondition } from "../sortie";

export const calc_2603C1: QuestCompositionCondition = (fleet) => {
    const { DD, DE } = fleet.composition;
    return DE >= 3 ||
        DD >= 4;
};

const VALENTINE_BASE_NAMES: BaseShipName[] =
    [
        'Thonburi', 'Helena', 'Mogador', 'Gotland', 'Perth',
        'Commandant Teste', '曙', '朧', '南海' // ぜかましコメより南海ok
    ] as const;

export const calc_2602C1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    const flagship = extract_flagship(fleet);
    return includes_base_ship(flagship.base_name, VALENTINE_BASE_NAMES) &&
        count_ships_by_base_names(VALENTINE_BASE_NAMES, base_ship_names) >= 3;
};

const SANJUUNIKU_BASE_NAMES: BaseShipName[] =
    ['玉波', '涼波', '藤波', '早波', '浜波'] as const;

export const calc_2409C1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(SANJUUNIKU_BASE_NAMES, base_ship_names) >= 3
};

