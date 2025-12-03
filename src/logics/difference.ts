import { DiffData, RowData } from "../types";

/**
 * 2つの RowData 配列を合計し、それらの差分 (left - right) を計算して返す。
 *
 * @param above_data - 減算の左側となる RowData 配列
 * @param below_data - 減算の右側となる RowData 配列
 * @returns SumData - 左側合計から右側合計を引いた結果
 */
export function calc_diff_data(
    above_data: RowData,
    below_data: RowData,
): DiffData {
    const diff_data: DiffData = {
        rate: below_data.rate - above_data.rate,
        fuel: below_data.fuel - above_data.fuel,
        ammo: below_data.ammo - above_data.ammo,
        steel: below_data.steel - above_data.steel,
        baux: below_data.baux - above_data.baux,
        bucket: below_data.bucket - above_data.bucket,
        damecon: below_data.damecon - above_data.damecon,
        underway_replenishment:
            below_data.underway_replenishment - above_data.underway_replenishment,
    };

    return diff_data;
}