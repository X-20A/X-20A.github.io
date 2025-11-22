import { INITIAL_ROW_DATA, RowData } from "../types";

export function sort_row_datas(
    rows: RowData[],
): RowData[] {
    return [...rows].sort((a, b) => {
        const is_a_empty = JSON.stringify(a) === JSON.stringify(INITIAL_ROW_DATA);
        const is_b_empty = JSON.stringify(b) === JSON.stringify(INITIAL_ROW_DATA);
        return (is_a_empty === is_b_empty) ? 0 : is_a_empty ? 1 : -1;
    });
}