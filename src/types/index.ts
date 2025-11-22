export type ResourceKey =
    | 'fuel'
    | 'ammo'
    | 'steel'
    | 'baux'
    | 'bucket'
    | 'damecon'
    | 'underway_replenishment'

export type DataComponent = {
    name: string,
    fuel: number,
    ammo: number,
    steel: number,
    baux: number,
    bucket: number,
    damecon: number,
    underway_replenishment: number,
}
export type SumData = Omit<DataComponent, "name">
export const DEFAULT_SUM_DATA: SumData = {
    fuel: 0,
    ammo: 0,
    steel: 0,
    baux: 0,
    bucket: 0,
    damecon: 0,
    underway_replenishment: 0,
} as const;

export type SaveData = {
    name: string,
    datas: DataComponent[],
}
export const DEFAULT_SAVE_DATA: SaveData = {
    name: '計画名が空だよ',
    datas: [],
} as const;