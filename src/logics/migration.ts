import { parse } from "valibot";
import { SaveDataSchema } from "./schema";
import {
    NodeId, Sheet, Workspace,
    create_empty_workspace, create_node_id, create_sheet, create_sheet_node,
} from "../types";
import { load_workspace, save_sheet, save_workspace } from "./storage";

/** 旧形式(単一計画)が入っている localStorage キー */
export const LEGACY_STORAGE_KEY = 'cost-manager';
/** 移行後、旧データの退避先 */
export const LEGACY_BACKUP_KEY = 'cost-manager:backup';
/** 検証に失敗したデータの退避先プレフィックス */
export const CORRUPTED_KEY_PREFIX = 'cost-manager:corrupted:';

export const UNTITLED_SHEET_NAME = '無題のシート';

/**
 * 旧 SaveData をワークスペース1件 + シート1枚に変換する。
 *
 * 副作用を持たない。IO を伴う移行処理は run_legacy_migration が担う
 * @throws ValiError 旧データがスキーマに適合しない場合
 */
export function migrate_legacy_save_data(
    raw: unknown,
): { workspace: Workspace, sheet: Sheet } {
    const legacy = parse(SaveDataSchema, raw);

    const sheet_id: NodeId = create_node_id();
    const name = legacy.project_name.trim() || UNTITLED_SHEET_NAME;

    const workspace: Workspace = {
        ...create_empty_workspace(),
        // 承認済みドメインはシートからワークスペースへ昇格する
        approved_domains: legacy.approved_domains,
        nodes: {
            [sheet_id]: create_sheet_node(sheet_id, name, null, 0),
        },
        active_sheet_id: sheet_id,
    };

    return {
        workspace,
        sheet: create_sheet(sheet_id, legacy.row_datas),
    };
}

/**
 * 壊れたデータを削除せずタイムスタンプ付きで退避する
 * @returns 退避先のキー
 */
export function stash_corrupted_data(raw: string): string {
    const key = `${CORRUPTED_KEY_PREFIX}${Date.now()}`;
    localStorage.setItem(key, raw);
    return key;
}

export type MigrationOutcome =
    /** 移行済み、または移行対象が存在しない */
    | { status: 'not_needed' }
    | { status: 'migrated', workspace: Workspace, sheet: Sheet }
    /** 旧データが壊れていた。backup_key に退避済み */
    | { status: 'corrupted', backup_key: string };

/**
 * localStorage の旧データを IndexedDB のワークスペースへ移行する。
 * 起動時に一度だけ呼ぶ
 */
export async function run_legacy_migration(): Promise<MigrationOutcome> {
    // 既にワークスペースがあるなら移行済み
    if (await load_workspace() !== null) return { status: 'not_needed' };

    const raw = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (raw === null) return { status: 'not_needed' };

    let migrated: { workspace: Workspace, sheet: Sheet };
    try {
        migrated = migrate_legacy_save_data(JSON.parse(raw));
    } catch (error) {
        console.error('旧データの移行に失敗しました:', error);
        return { status: 'corrupted', backup_key: stash_corrupted_data(raw) };
    }

    // IndexedDB への書き込みが終わるまで旧キーは触らない
    await save_sheet(migrated.sheet);
    await save_workspace(migrated.workspace);

    // 移行元は削除せずバックアップとして残す。
    // 既にバックアップがある場合は上書きしない
    if (localStorage.getItem(LEGACY_BACKUP_KEY) === null) {
        localStorage.setItem(LEGACY_BACKUP_KEY, raw);
    }
    localStorage.removeItem(LEGACY_STORAGE_KEY);

    return { status: 'migrated', ...migrated };
}
