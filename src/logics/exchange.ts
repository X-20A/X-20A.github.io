import { parse } from "valibot";
import {
    NodeId, RowData, Sheet, TreeNode, Workspace,
    create_node_id, create_sheet, create_folder_node, create_sheet_node,
} from "../types";
import {
    AnyExportSchema, FORMAT_VERSION, SHEET_FORMAT, WORKSPACE_FORMAT,
} from "./schema";
import { insert_node, type NodeMap } from "./tree";

/**
 * ファイルへの書き出しと読み込み。
 *
 * 共有URLが TinyURL への外部通信に依存しているのに対し、こちらは
 * 手元にデータを退避する手段として用意する
 */

export type WorkspaceExport = {
    format: typeof WORKSPACE_FORMAT,
    format_version: number,
    exported_at: string,
    workspace: Workspace,
    sheets: Sheet[],
}

export type SheetExport = {
    format: typeof SHEET_FORMAT,
    format_version: number,
    exported_at: string,
    name: string,
    row_datas: RowData[],
}

export function build_workspace_export(
    workspace: Workspace,
    sheets: Sheet[],
): WorkspaceExport {
    return {
        format: WORKSPACE_FORMAT,
        format_version: FORMAT_VERSION,
        exported_at: new Date().toISOString(),
        workspace,
        sheets,
    };
}

export function build_sheet_export(
    name: string,
    row_datas: RowData[],
): SheetExport {
    return {
        format: SHEET_FORMAT,
        format_version: FORMAT_VERSION,
        exported_at: new Date().toISOString(),
        name,
        row_datas,
    };
}

export type ParsedImport =
    | { kind: 'workspace', data: WorkspaceExport }
    | { kind: 'sheet', data: SheetExport };

/**
 * 読み込んだ JSON を検証して種類を判別する。
 *
 * 形は valibot が検証済み。ブランドは名目的な差でしかないため、
 * ここでのみキャストする
 * @throws ValiError 形式が適合しない場合
 */
export function parse_import(raw: unknown): ParsedImport {
    const parsed = parse(AnyExportSchema, raw);

    return parsed.format === WORKSPACE_FORMAT
        ? { kind: 'workspace', data: parsed as unknown as WorkspaceExport }
        : { kind: 'sheet', data: parsed as unknown as SheetExport };
}

/**
 * 取り込むノードとシートの ID を振り直す。
 *
 * インポートは既存を置き換えず追加するため、ID が衝突すると
 * 既存のシートを上書きしてしまう
 */
export function remap_import_ids(
    nodes: NodeMap,
    sheets: Sheet[],
): { nodes: NodeMap, sheets: Sheet[] } {
    const id_map = new Map<NodeId, NodeId>();
    const map_id = (id: NodeId): NodeId => {
        const existing = id_map.get(id);
        if (existing) return existing;

        const fresh = create_node_id();
        id_map.set(id, fresh);
        return fresh;
    };

    // 先に全ノードの新しい ID を確定させてから parent_id を張り替える
    for (const id of Object.keys(nodes) as NodeId[]) map_id(id);

    const remapped_nodes: NodeMap = {};
    for (const node of Object.values(nodes)) {
        const id = map_id(node.id);
        // 親が取り込み対象に含まれない場合はルート扱いにする
        const parent_id = node.parent_id !== null && id_map.has(node.parent_id)
            ? id_map.get(node.parent_id)!
            : null;

        remapped_nodes[id] = { ...node, id, parent_id } as TreeNode;
    }

    const remapped_sheets = sheets
        .filter(sheet => id_map.has(sheet.id))
        .map(sheet => ({ ...sheet, id: id_map.get(sheet.id)! }));

    return { nodes: remapped_nodes, sheets: remapped_sheets };
}

export function build_import_folder_name(now: Date = new Date()): string {
    const pad = (value: number) => String(value).padStart(2, '0');

    return `インポート ${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
        + ` ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

/**
 * 取り込んだツリーを、既存ツリーのルート直下に作ったフォルダへぶら下げる。
 * 既存のシートを一切壊さないため
 *
 * @returns 統合後のノードと、保存すべきシート本体
 */
export function merge_workspace_import(
    current_nodes: NodeMap,
    imported: WorkspaceExport,
    folder_name: string = build_import_folder_name(),
): { nodes: NodeMap, sheets: Sheet[], folder_id: NodeId } {
    const { nodes: remapped, sheets } = remap_import_ids(
        imported.workspace.nodes as NodeMap,
        imported.sheets as unknown as Sheet[],
    );

    const folder_id = create_node_id();
    let nodes = insert_node(
        current_nodes,
        create_folder_node(folder_id, folder_name),
    );

    // ルート直下だった取り込みノードだけをフォルダの下へ移す
    for (const node of Object.values(remapped)) {
        nodes = {
            ...nodes,
            [node.id]: node.parent_id === null
                ? { ...node, parent_id: folder_id }
                : node,
        };
    }

    return { nodes, sheets, folder_id };
}

/**
 * 単一シートの取り込み。ルート直下に追加する
 */
export function build_sheet_import(
    current_nodes: NodeMap,
    imported: SheetExport,
): { nodes: NodeMap, sheet: Sheet, sheet_id: NodeId } {
    const sheet_id = create_node_id();
    const name = imported.name.trim() || '無題のシート';

    return {
        nodes: insert_node(current_nodes, create_sheet_node(sheet_id, name)),
        sheet: create_sheet(sheet_id, imported.row_datas as RowData[]),
        sheet_id,
    };
}

/** 表の列順。CSV / TSV の見出しと値の並びを揃えるために一箇所で持つ */
const COLUMNS: { key: keyof RowData, label: string }[] = [
    { key: 'row_name', label: 'name' },
    { key: 'url', label: 'url' },
    { key: 'multiplier', label: 'count' },
    { key: 'rate', label: 'rate' },
    { key: 'fuel', label: '燃料' },
    { key: 'ammo', label: '弾薬' },
    { key: 'steel', label: '鋼材' },
    { key: 'baux', label: 'ボーキ' },
    { key: 'bucket', label: 'バケツ' },
    { key: 'damecon', label: 'ダメコン' },
    { key: 'underway_replenishment', label: '洋上補給' },
];

function escape_csv(value: string): string {
    // 区切り・引用符・改行を含む場合だけ引用する
    return /[",\r\n]/.test(value)
        ? `"${value.replace(/"/g, '""')}"`
        : value;
}

/**
 * @param skip_empty 空行を書き出さない。既定の80行がそのまま出るのを避ける
 */
export function rows_to_csv(
    row_datas: RowData[],
    skip_empty: boolean = true,
): string {
    const target = skip_empty ? row_datas.filter(is_meaningful_row) : row_datas;

    const lines = [COLUMNS.map(c => escape_csv(c.label)).join(',')];
    for (const row of target) {
        lines.push(
            COLUMNS.map(c => escape_csv(String(row[c.key]))).join(','),
        );
    }
    return lines.join('\r\n');
}

/** 値が入っていない行か。名前も URL も数値もすべて初期値なら空とみなす */
export function is_meaningful_row(row: RowData): boolean {
    if (row.row_name.trim() !== '' || row.url.trim() !== '') return true;

    return row.rate !== 0
        || row.fuel !== 0
        || row.ammo !== 0
        || row.steel !== 0
        || row.baux !== 0
        || row.bucket !== 0
        || row.damecon !== 0
        || row.underway_replenishment !== 0;
}
