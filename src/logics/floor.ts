import { DiffData, SumData } from "../types";

export function floor_sum_data(
    sum_data: SumData,
    precision: number = 1
): SumData {
    const factor = 1 / precision;

    const floored_sum_data: SumData = {
        fuel: Math.floor(sum_data.fuel * factor) / factor,
        ammo: Math.floor(sum_data.ammo * factor) / factor,
        steel: Math.floor(sum_data.steel * factor) / factor,
        baux: Math.floor(sum_data.baux * factor) / factor,
        bucket: Math.floor(sum_data.bucket * factor) / factor,
        damecon: Math.floor(sum_data.damecon * factor) / factor,
        underway_replenishment: Math.floor(sum_data.underway_replenishment * factor) / factor,
    };

    return floored_sum_data;
}

export function floor_diff_data(
    sum_data: DiffData,
    precision: number = 1
): DiffData {
    const factor = 1 / precision;

    const floored_diff_data: DiffData = {
        rate: Math.floor(sum_data.rate * factor) / factor,
        fuel: Math.floor(sum_data.fuel * factor) / factor,
        ammo: Math.floor(sum_data.ammo * factor) / factor,
        steel: Math.floor(sum_data.steel * factor) / factor,
        baux: Math.floor(sum_data.baux * factor) / factor,
        bucket: Math.floor(sum_data.bucket * factor) / factor,
        damecon: Math.floor(sum_data.damecon * factor) / factor,
        underway_replenishment: Math.floor(sum_data.underway_replenishment * factor) / factor,
    };

    return floored_diff_data;
}