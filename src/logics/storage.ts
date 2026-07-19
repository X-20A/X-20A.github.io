import { NodeId, Sheet, Workspace } from "../types";

/**
 * IndexedDB の薄いラッパ。
 * バリデーションは行わず、読み出した値は unknown として返す。
 * 検証は呼び出し側(ストア / マイグレーション)の責務とする
 */

const DB_NAME = 'cost-manager';
const DB_VERSION = 1;

const WORKSPACE_STORE = 'workspace';
const SHEETS_STORE = 'sheets';

/** workspace ストアは単一レコードのため固定キーで引く */
const WORKSPACE_KEY = 'current';

let db_promise: Promise<IDBDatabase> | null = null;

function open_db(): Promise<IDBDatabase> {
    if (db_promise) return db_promise;

    db_promise = new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = () => {
            const db = request.result;

            if (!db.objectStoreNames.contains(WORKSPACE_STORE)) {
                db.createObjectStore(WORKSPACE_STORE);
            }
            if (!db.objectStoreNames.contains(SHEETS_STORE)) {
                db.createObjectStore(SHEETS_STORE, { keyPath: 'id' });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });

    // 失敗したPromiseをキャッシュし続けるとリトライできなくなる
    db_promise.catch(() => { db_promise = null; });

    return db_promise;
}

async function run<T>(
    store_name: string,
    mode: IDBTransactionMode,
    operation: (store: IDBObjectStore) => IDBRequest,
): Promise<T> {
    const db = await open_db();

    return new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(store_name, mode);
        const request = operation(transaction.objectStore(store_name));

        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject(request.error);
        transaction.onabort = () => reject(transaction.error);
    });
}

export async function load_workspace(): Promise<unknown | null> {
    const result = await run<unknown>(
        WORKSPACE_STORE, 'readonly',
        store => store.get(WORKSPACE_KEY),
    );
    return result ?? null;
}

export async function save_workspace(workspace: Workspace): Promise<void> {
    await run(
        WORKSPACE_STORE, 'readwrite',
        store => store.put(workspace, WORKSPACE_KEY),
    );
}

export async function load_sheet(id: NodeId): Promise<unknown | null> {
    const result = await run<unknown>(
        SHEETS_STORE, 'readonly',
        store => store.get(id),
    );
    return result ?? null;
}

export async function save_sheet(sheet: Sheet): Promise<void> {
    await run(
        SHEETS_STORE, 'readwrite',
        store => store.put(sheet),
    );
}

/**
 * シート本体を物理削除する。
 * ツリー上の削除はゴミ箱への移動であり、これを呼ぶのはゴミ箱を空にするときだけ
 */
export async function delete_sheet(id: NodeId): Promise<void> {
    await run(
        SHEETS_STORE, 'readwrite',
        store => store.delete(id),
    );
}

export async function load_all_sheet_ids(): Promise<NodeId[]> {
    return await run<NodeId[]>(
        SHEETS_STORE, 'readonly',
        store => store.getAllKeys(),
    );
}

/** テスト用。接続キャッシュを破棄する */
export function reset_connection(): void {
    db_promise = null;
}
