import { object, string, number, array, union, url, literal, pipe, brand } from 'valibot';
import { Domain } from './url';

// 行データのスキーマ定義
const rowDataSchema = {
    row_name: string(),
    url: string(),
    multiplier: number(),
    rate: number(),
    fuel: number(),
    ammo: number(),
    steel: number(),
    baux: number(),
    bucket: number(),
    damecon: number(),
    underway_replenishment: number(),
};

const domain = pipe(string(), brand("Domain"));

// 保存データのスキーマ定義
export const SaveDataSchema = object({
    project_name: string(),
    row_datas: array(object(rowDataSchema)),
    approved_domains: array(domain),
});