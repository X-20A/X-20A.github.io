import {
    object, string, number, array, literal, pipe, brand,
    variant, boolean, nullable, optional, record, integer, minValue,
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
    // 旧データには存在しないため optional。増やすときは必ずこの形にする
    restore_parent_id: optional(nullable(node_id)),
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

/**
 * 書き出しファイルの形式。
 * format で種類を見分け、format_version で後方互換を判断する
 */
export const WORKSPACE_FORMAT = 'cost-workspace';
export const SHEET_FORMAT = 'cost-sheet';
export const FORMAT_VERSION = 1;

export const WorkspaceExportSchema = object({
    format: literal(WORKSPACE_FORMAT),
    format_version: pipe(number(), integer(), minValue(1)),
    exported_at: string(),
    workspace: WorkspaceSchema,
    sheets: array(SheetSchema),
});

export const SheetExportSchema = object({
    format: literal(SHEET_FORMAT),
    format_version: pipe(number(), integer(), minValue(1)),
    exported_at: string(),
    name: string(),
    row_datas: array(object(rowDataSchema)),
});

/** 読み込み時はどちらの形式か分からないため、まず種類だけ見る */
export const AnyExportSchema = variant('format', [
    WorkspaceExportSchema,
    SheetExportSchema,
]);

export type ValidatedWorkspaceExport = InferOutput<typeof WorkspaceExportSchema>;
export type ValidatedSheetExport = InferOutput<typeof SheetExportSchema>;
export type ValidatedWorkspace = InferOutput<typeof WorkspaceSchema>;
export type ValidatedSheet = InferOutput<typeof SheetSchema>;
export type ValidatedSaveData = InferOutput<typeof SaveDataSchema>;
