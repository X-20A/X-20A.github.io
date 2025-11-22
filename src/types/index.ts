export type ResourceKey =
    | 'fuel'
    | 'ammo'
    | 'steel'
    | 'baux'
    | 'bucket'
    | 'damecon'
    | 'underway_replenishment'

export type DataComponent = {
    row_name: string,
    fuel: number,
    ammo: number,
    steel: number,
    baux: number,
    bucket: number,
    damecon: number,
    underway_replenishment: number,
}
export const INITIAL_DATA_COMPONENT: DataComponent = {
    row_name: '',
    fuel: 0,
    ammo: 0,
    steel: 0,
    baux: 0,
    bucket: 0,
    damecon: 0,
    underway_replenishment: 0,
} as const;

export type SumData = Omit<DataComponent, "row_name">
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
    datas: DataComponent[],
}
export const INITIAL_SAVE_DATA: SaveData = {
    project_name: '',
    datas: Array(80).fill(null).map(() => ({ ...INITIAL_DATA_COMPONENT })),
} as const;