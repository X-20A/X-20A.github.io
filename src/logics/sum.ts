import { DataComponent, INITIAL_SUM_DATA, SumData } from "../types";

export function calc_sum_data(
    datas: DataComponent[],
): SumData {
    return datas.reduce((total, current) => {
        const fuel = total.fuel + current.fuel;
        const ammo = total.ammo + current.ammo;
        const steel = total.steel + current.steel;
        const baux = total.baux + current.baux;
        const bucket = total.bucket + current.bucket;
        const damecon = total.damecon + current.damecon;
        const underway_replenishment =
            total.underway_replenishment + current.underway_replenishment;

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