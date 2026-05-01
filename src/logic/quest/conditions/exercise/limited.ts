import { count_ships_by_base_names, extract_flagship, includes_base_ship } from "../../../../models/fleet/AdoptFleet";
import { BaseShipName } from "../../../../types/baseShipName";
import { QuestCompositionCondition } from "../sortie";

const SANJUUNIKU_BASE_NAMES: BaseShipName[] =
    ['玉波', '涼波', '藤波', '早波', '浜波'] as const;

export const calc_2409C1: QuestCompositionCondition = (fleet) => {
    const { base_ship_names } = fleet;
    return count_ships_by_base_names(SANJUUNIKU_BASE_NAMES, base_ship_names) >= 3
};

const ANNIVERSARY_BASE_SHIP_NAMES: BaseShipName[] =
    ['Thonburi', '南海', '大泊', '瑞穂', '杉', '朧', '曙', '漣', '潮', '吹雪'] as const;

export const calc_2604Cw1: QuestCompositionCondition = (fleet) => {
    if (fleet.ships_length <= 1) return false;

    const flagship = extract_flagship(fleet);
    const second_ship = fleet.fleets[0].units[1].ship;
    return includes_base_ship(flagship.base_name, ANNIVERSARY_BASE_SHIP_NAMES)
        && includes_base_ship(second_ship.base_name, ANNIVERSARY_BASE_SHIP_NAMES);
}