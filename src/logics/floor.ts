import { SumData } from "../types";

export function floor_sum_data(
    sum_data: SumData,
): SumData {
    const floored_sum_data: SumData = {
        fuel: Math.floor(sum_data.fuel),
        ammo: Math.floor(sum_data.ammo),
        steel: Math.floor(sum_data.steel),
        baux: Math.floor(sum_data.baux),
        bucket: Math.floor(sum_data.bucket),
        damecon: Math.floor(sum_data.damecon),
        underway_replenishment: Math.floor(sum_data.underway_replenishment),
    };

    return floored_sum_data;
}