import { Domain } from "../logics/url";

export type Brand<T, B> = T & { __brand: B };

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

export type DiffData = Omit<
    RowData,
    "row_name" | "url" | "multiplier"
>
export const INITIAL_DIFF_DATA: DiffData = {
    rate: 0,
    fuel: 0,
    ammo: 0,
    steel: 0,
    baux: 0,
    bucket: 0,
    damecon: 0,
    underway_replenishment: 0,
} as const;

/**
 * 旧データ形式(単一計画)。
 * localStorage からのマイグレーション経路でのみ使用する。新規に参照しないこと
 * @deprecated Workspace / Sheet に分割済み
 */
export type SaveData = {
    project_name: string,
    row_datas: RowData[],
    approved_domains: Domain[],
}
export const SORTIE_SIM_DOMAIN = 'kc3kai.github.io' as Domain;
/** 新規シートの初期行数 */
export const DEFAULT_ROW_COUNT = 80;

export const INITIAL_SAVE_DATA: SaveData = {
    project_name: '',
    row_datas: Array(DEFAULT_ROW_COUNT).fill(null).map(() => ({ ...INITIAL_ROW_DATA })),
    approved_domains: [SORTIE_SIM_DOMAIN],
} as const;

export type NodeId = Brand<string, "NodeId">;

/** ゴミ箱。実体のないノードとして扱い、parent_id の値としてのみ現れる */
export const TRASH_ID = '__trash__' as NodeId;

type BaseNode = {
    id: NodeId,
    /** null はルート直下。TRASH_ID はゴミ箱の中 */
    parent_id: NodeId | null,
    /** 同一 parent_id 内での並び順 */
    order: number,
    name: string,
    /**
     * ゴミ箱へ移す直前の親。復元先として使う。
     * 旧データには存在しないため省略可能
     */
    restore_parent_id?: NodeId | null,
}
export type FolderNode = BaseNode & {
    type: 'folder',
    is_expanded: boolean,
}
export type SheetNode = BaseNode & {
    type: 'sheet',
}
/** DOM の Node と衝突するため TreeNode と命名している */
export type TreeNode = FolderNode | SheetNode;

export const SCHEMA_VERSION = 1;

/**
 * ツリーと全体設定。シート本体は含めない。
 * サイドバーの描画に必要なのは階層と名前だけであり、
 * 本体まで抱えると起動時に全シートを読むことになる
 */
export type Workspace = {
    schema_version: number,
    nodes: Record<NodeId, TreeNode>,
    approved_domains: Domain[],
    active_sheet_id: NodeId | null,
}

/** シート本体。ツリーとは別レコードとして遅延ロードする */
export type Sheet = {
    id: NodeId,
    row_datas: RowData[],
    updated_at: number,
}

export function create_node_id(): NodeId {
    return crypto.randomUUID() as NodeId;
}

export function create_empty_rows(count: number = DEFAULT_ROW_COUNT): RowData[] {
    return Array(count).fill(null).map(() => ({ ...INITIAL_ROW_DATA }));
}

export function create_sheet(id: NodeId, row_datas?: RowData[]): Sheet {
    return {
        id,
        row_datas: row_datas ?? create_empty_rows(),
        updated_at: Date.now(),
    };
}

export function create_sheet_node(
    id: NodeId,
    name: string,
    parent_id: NodeId | null = null,
    order: number = 0,
): SheetNode {
    return { id, parent_id, order, name, type: 'sheet' };
}

export function create_folder_node(
    id: NodeId,
    name: string,
    parent_id: NodeId | null = null,
    order: number = 0,
): FolderNode {
    return { id, parent_id, order, name, type: 'folder', is_expanded: true };
}

export function create_empty_workspace(): Workspace {
    return {
        schema_version: SCHEMA_VERSION,
        nodes: {},
        approved_domains: [SORTIE_SIM_DOMAIN],
        active_sheet_id: null,
    };
}