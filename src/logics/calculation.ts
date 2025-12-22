import { RowData, INITIAL_SUM_DATA, SumData, DiffData } from "../types";

const calc_product_data = (
    data: RowData,
    multiplier: number,
): SumData => {
    const new_data: SumData = {
        fuel: data.fuel * multiplier,
        ammo: data.ammo * multiplier,
        steel: data.steel * multiplier,
        baux: data.baux * multiplier,
        bucket: data.bucket * multiplier,
        damecon: data.damecon * multiplier,
        underway_replenishment: data.underway_replenishment * multiplier,
    };

    return new_data;
}

const calc_sum_data = (
    a: SumData,
    b: SumData,
): SumData => {
    const sum_data: SumData = {
        fuel: a.fuel + b.fuel,
        ammo: a.ammo + b.ammo,
        steel: a.steel + b.steel,
        baux: a.baux + b.baux,
        bucket: a.bucket + b.bucket,
        damecon: a.damecon + b.damecon,
        underway_replenishment: a.underway_replenishment + b.underway_replenishment,
    };

    return sum_data;
}

export function calc_total_data(
    datas: RowData[],
): SumData {
    return datas.reduce((total, current) => {
        const producted_data = calc_product_data(current, current.multiplier);

        return calc_sum_data(total, producted_data);
    }, { ...INITIAL_SUM_DATA });
}

/**
 * 2つの RowData にそれぞれの multiplier を適用し、それらの差分 (below - above) を計算して返す。
 * @param above_data
 * @param below_data
 * @returns
 */export function calc_diff_data(
    above_data: RowData,
    below_data: RowData,
): DiffData {
    const producted_above_data: DiffData = {
        ...calc_product_data(above_data, above_data.multiplier),
        rate: above_data.rate,
    };
    const producted_below_data: DiffData = {
        ...calc_product_data(below_data, below_data.multiplier),
        rate: below_data.rate,
    }
    const diff_data: DiffData = {
        rate: producted_below_data.rate - producted_above_data.rate,
        fuel: producted_below_data.fuel - producted_above_data.fuel,
        ammo: producted_below_data.ammo - producted_above_data.ammo,
        steel: producted_below_data.steel - producted_above_data.steel,
        baux: producted_below_data.baux - producted_above_data.baux,
        bucket: producted_below_data.bucket - producted_above_data.bucket,
        damecon: producted_below_data.damecon - producted_above_data.damecon,
        underway_replenishment:
            producted_below_data.underway_replenishment - producted_above_data.underway_replenishment,
    };

    return diff_data;
}