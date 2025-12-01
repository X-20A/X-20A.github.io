import { DiffData, RowData } from "../types";

/**
 * 2つの RowData 配列を合計し、それらの差分 (left - right) を計算して返す。
 *
 * @param left_data - 減算の左側となる RowData 配列
 * @param right_data - 減算の右側となる RowData 配列
 * @returns SumData - 左側合計から右側合計を引いた結果
 */
export function calc_diff_data(
    left_data: RowData,
    right_data: RowData,
): DiffData {
    const diff_data: DiffData = {
        rate: right_data.rate - left_data.rate,
        fuel: left_data.fuel - right_data.fuel,
        ammo: left_data.ammo - right_data.ammo,
        steel: left_data.steel - right_data.steel,
        baux: left_data.baux - right_data.baux,
        bucket: left_data.bucket - right_data.bucket,
        damecon: left_data.damecon - right_data.damecon,
        underway_replenishment:
            left_data.underway_replenishment - right_data.underway_replenishment,
    };

    return diff_data;
}