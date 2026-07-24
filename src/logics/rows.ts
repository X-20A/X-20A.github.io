import { INITIAL_ROW_DATA, RowData } from "../types";

/**
 * 行の複製・消去・貼り付け。すべて副作用を持たず、新しい配列を返す。
 *
 * 行はシートをまたいで運ばれるため、参照を共有しないよう必ず複製する
 */

function clone_row(row: RowData): RowData {
    return { ...row };
}

function empty_row(): RowData {
    return { ...INITIAL_ROW_DATA };
}

/**
 * 指定した行を、シート上の並び順で複製して返す
 */
export function copy_rows(
    row_datas: RowData[],
    indexes: number[],
): RowData[] {
    return [...indexes]
        .sort((a, b) => a - b)
        .filter(index => row_datas[index] !== undefined)
        .map(index => clone_row(row_datas[index]));
}

/**
 * 指定した行を空にする。行自体は詰めない
 */
export function clear_rows(
    row_datas: RowData[],
    indexes: number[],
): RowData[] {
    if (indexes.length === 0) return row_datas;

    const target = new Set(indexes);
    return row_datas.map(
        (row, index) => target.has(index) ? empty_row() : clone_row(row),
    );
}

/**
 * start_index を先頭に上書きする。
 * 末尾を超える分はシートを伸ばして受け止める
 */
export function paste_overwrite(
    row_datas: RowData[],
    clipboard: RowData[],
    start_index: number,
): RowData[] {
    if (clipboard.length === 0) return row_datas;

    const required = start_index + clipboard.length;
    const result = row_datas.map(clone_row);

    while (result.length < required) result.push(empty_row());

    clipboard.forEach((row, offset) => {
        result[start_index + offset] = clone_row(row);
    });

    return result;
}

/**
 * after_index の直後に挿入する。既存の行は下へずれる
 */
export function paste_insert(
    row_datas: RowData[],
    clipboard: RowData[],
    after_index: number,
): RowData[] {
    if (clipboard.length === 0) return row_datas;

    const result = row_datas.map(clone_row);
    // 範囲外を指されても末尾に落として受け止める
    const at = Math.max(0, Math.min(result.length, after_index + 1));

    result.splice(at, 0, ...clipboard.map(clone_row));
    return result;
}

/**
 * 貼り付け後に、貼り付けた行を選択状態にするための添字
 */
export function calc_pasted_indexes(
    start_index: number,
    count: number,
): number[] {
    return Array.from({ length: count }, (_, i) => start_index + i);
}

/**
 * 行が初期状態(未入力)か。何かしら入力されていれば false。
 * count(multiplier) の既定値は 1 のため、INITIAL_ROW_DATA との一致で判定する
 */
export function is_row_empty(row: RowData): boolean {
    return (Object.keys(INITIAL_ROW_DATA) as (keyof RowData)[])
        .every(key => row[key] === INITIAL_ROW_DATA[key]);
}

/**
 * 何かしら入力されている行の添字を、並び順で返す
 */
export function filled_row_indexes(row_datas: RowData[]): number[] {
    const result: number[] = [];

    row_datas.forEach((row, index) => {
        if (!is_row_empty(row)) result.push(index);
    });

    return result;
}
