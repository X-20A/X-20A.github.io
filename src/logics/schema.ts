import {
    object, string, number, array, literal, pipe, brand,
    variant, boolean, nullable, record, integer, minValue,
    type InferOutput,
} from 'valibot';

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

export const RowDataSchema = object(rowDataSchema);

const domain = pipe(string(), brand("Domain"));
const node_id = pipe(string(), brand("NodeId"));

/**
 * 旧データ形式(単一計画)のスキーマ。
 * マイグレーションと共有URLの復元でのみ使用する
 * @deprecated WorkspaceSchema / SheetSchema に分割済み
 */
export const SaveDataSchema = object({
    project_name: string(),
    row_datas: array(object(rowDataSchema)),
    approved_domains: array(domain),
});

const base_node = {
    id: node_id,
    /** null はルート直下。TRASH_ID はゴミ箱の中 */
    parent_id: nullable(node_id),
    order: number(),
    name: string(),
};

export const FolderNodeSchema = object({
    ...base_node,
    type: literal('folder'),
    is_expanded: boolean(),
});

export const SheetNodeSchema = object({
    ...base_node,
    type: literal('sheet'),
});

export const TreeNodeSchema = variant('type', [
    FolderNodeSchema,
    SheetNodeSchema,
]);

// ツリーと全体設定。シート本体は含まない
export const WorkspaceSchema = object({
    schema_version: pipe(number(), integer(), minValue(1)),
    nodes: record(node_id, TreeNodeSchema),
    approved_domains: array(domain),
    active_sheet_id: nullable(node_id),
});

// シート本体
export const SheetSchema = object({
    id: node_id,
    row_datas: array(object(rowDataSchema)),
    updated_at: number(),
});

export type ValidatedWorkspace = InferOutput<typeof WorkspaceSchema>;
export type ValidatedSheet = InferOutput<typeof SheetSchema>;
export type ValidatedSaveData = InferOutput<typeof SaveDataSchema>;
