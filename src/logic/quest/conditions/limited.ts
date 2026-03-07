import { QuestCompositionCondition } from ".";
import { count_ships_by_names } from "../../../models/fleet/AdoptFleet";
import { ShipName } from "../../../types/shipName";

const TAMANAMI_SERIES: ShipName[] = [
    '玉波', '玉波改',
] as const;

const SUZUNAMI_SERIES: ShipName[] = [
    '涼波', '涼波改',
] as const;

const FUJINAMI_SERIES: ShipName[] = [
    '藤波', '藤波改', '藤波改二',
] as const;

const HAYANAMI_SERIES: ShipName[] = [
    '早波', '早波改', '早波改二',
] as const;

const HAMANAMI_SERIES: ShipName[] = [
    '浜波', '浜波改', '浜波改二',
] as const;

export const calc_2412B5: QuestCompositionCondition = (fleet) => {
    const { ship_names } = fleet;
    return (
        count_ships_by_names(TAMANAMI_SERIES, ship_names)
        + count_ships_by_names(SUZUNAMI_SERIES, ship_names)
        + count_ships_by_names(FUJINAMI_SERIES, ship_names)
        + count_ships_by_names(HAYANAMI_SERIES, ship_names)
        + count_ships_by_names(HAMANAMI_SERIES, ship_names)
    ) >= 3;
};
