import { RowData, INITIAL_SUM_DATA, SumData } from "../types";

export function calc_sum_data(
    datas: RowData[],
): SumData {
    return datas.reduce((total, current) => {
        const fuel = total.fuel + current.fuel * current.multiplier;
        const ammo = total.ammo + current.ammo * current.multiplier;
        const steel = total.steel + current.steel * current.multiplier;
        const baux = total.baux + current.baux * current.multiplier;
        const bucket = total.bucket + current.bucket * current.multiplier;
        const damecon = total.damecon + current.damecon * current.multiplier;
        const underway_replenishment =
            total.underway_replenishment
            + current.underway_replenishment * current.multiplier;

        const sum_data: SumData = {
            fuel,
            ammo,
            steel,
            baux,
            bucket,
            damecon,
            underway_replenishment,
        };

        return sum_data;
    }, { ...INITIAL_SUM_DATA });
}