export type RowData = {
    row_name: string,
    url: string,
    multiplier: number,
    rate: number,
    fuel: number,
    ammo: number,
    steel: number,
    baux: number,
    bucket: number,
    damecon: number,
    underway_replenishment: number,
}
export const INITIAL_ROW_DATA: RowData = {
    row_name: '',
    url: '',
    multiplier: 1,
    rate: 0,
    fuel: 0,
    ammo: 0,
    steel: 0,
    baux: 0,
    bucket: 0,
    damecon: 0,
    underway_replenishment: 0,
} as const;

export type SumData = Omit<
    RowData,
    "row_name" | "url" | "multiplier" | "rate"
>
export const INITIAL_SUM_DATA: SumData = {
    fuel: 0,
    ammo: 0,
    steel: 0,
    baux: 0,
    bucket: 0,
    damecon: 0,
    underway_replenishment: 0,
} as const;

export type SaveData = {
    project_name: string,
    row_datas: RowData[],
}
export const INITIAL_SAVE_DATA: SaveData = {
    project_name: '',
    row_datas: Array(80).fill(null).map(() => ({ ...INITIAL_ROW_DATA })),
} as const;