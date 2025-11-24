import { object, string, number, array, union, url, literal } from 'valibot';

// 行データのスキーマ定義
const rowDataSchema = {
    row_name: string(),
    url: string(),
    multiplier: number(),
    fuel: number(),
    ammo: number(),
    steel: number(),
    baux: number(),
    bucket: number(),
    damecon: number(),
    underway_replenishment: number(),
};

// 保存データのスキーマ定義
export const SaveDataSchema = object({
    project_name: string(),
    row_datas: array(object(rowDataSchema)),
});