import { DataComponent, DEFAULT_SUM_DATA, SumData } from "../types";

export function calc_sum_data(
    datas: DataComponent[],
): SumData {
    return datas.reduce((total, current) => {
        const fuel = total.fuel + current.fuel;
        const ammo = total.ammo + current.ammo;
        const steel = total.steel + current.steel;
        const baux = total.baux + current.baux;
        const bucket = total.bucket + current.bucket;
        const damecon = total.bucket + current.damecon;
        const underway_replenishment =
            total.underway_replenishment + current.underway_replenishment;

        return {
            fuel,
            ammo,
            steel,
            baux,
            bucket,
            damecon,
            underway_replenishment,
        }
    }, { ...DEFAULT_SUM_DATA });
}