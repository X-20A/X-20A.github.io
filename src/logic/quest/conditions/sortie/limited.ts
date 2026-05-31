import { QuestCompositionCondition } from ".";
import { ST } from "../../../../data/ship";
import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { BaseShipName } from "../../../../types/baseShipName";

export const calc_2412B5: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(
        ['玉波', '涼波', '藤波', '早波', '浜波'],
        base_ship_names,
    ) >= 3;
};

export const calc_2605Bw1: QuestCompositionCondition = (fleet) => {
    if (fleet.ships_length <= 1) return false;
    
    const flagship = extract_flagship(fleet);
    const second_ship = fleet.fleets[0].units[1].ship;
    return (
        (flagship.type === ST.DE && second_ship.type === ST.DE) ||
        (flagship.type === ST.AV && second_ship.type === ST.AV)
    ) && fleet.composition.DD >= 2;
};

export const calc_2605Bw2: QuestCompositionCondition = (fleet) => {
    const flagship = extract_flagship(fleet);
    return flagship.type === ST.CVL && fleet.composition.DD >= 2;
};

const YUUGUMO_BASE_NAMES: BaseShipName[] = [
    '夕雲', '巻雲', '風雲', '長波', '巻波', '高波', '玉波', '涼波', '藤波', '早波',
    '浜波', '沖波', '岸波', '朝霜', '早霜', '秋霜', '清霜',
] as const;

export const calc_2605Bm1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names, composition } = fleet;
    const { BB, CAs } = composition;
    return (
        BB >= 1 &&
        CAs >= 2 && 
        base_ship_names.filter(
            name => includes_base_ship(name, YUUGUMO_BASE_NAMES)
        ).length >= 2
    );
};