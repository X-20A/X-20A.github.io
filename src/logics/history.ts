/**
 * Undo / Redo の履歴。
 *
 * スコープはアクティブなシート内の編集のみ。ツリー操作は対象外で、
 * ゴミ箱と「直前の移動を戻す」で補う
 */

export type History<T> = {
    entries: T[],
    /** entries 内の現在位置 */
    index: number,
}

export const HISTORY_LIMIT = 50;

export function create_history<T>(initial: T): History<T> {
    return { entries: [initial], index: 0 };
}

export function current<T>(history: History<T>): T {
    return history.entries[history.index];
}

export function can_undo<T>(history: History<T>): boolean {
    return history.index > 0;
}

export function can_redo<T>(history: History<T>): boolean {
    return history.index < history.entries.length - 1;
}

/**
 * 新しい状態を積む。
 *
 * @param coalesce 直前の履歴を置き換える。連続したセル入力を1件にまとめるため
 * @param limit 保持する履歴の上限。超えた分は古い方から捨てる
 */
export function commit<T>(
    history: History<T>,
    value: T,
    coalesce: boolean = false,
    limit: number = HISTORY_LIMIT,
): History<T> {
    // Undo した後に編集したら、やり直せる先は消える
    const entries = history.entries.slice(0, history.index + 1);

    // 最初の1件は基準点なので、置き換えると戻り先がなくなる
    if (coalesce && history.index > 0) {
        entries[history.index] = value;
        return { entries, index: history.index };
    }

    entries.push(value);

    const overflow = Math.max(0, entries.length - limit);
    return {
        entries: entries.slice(overflow),
        index: entries.length - 1 - overflow,
    };
}

export function undo<T>(history: History<T>): History<T> {
    return can_undo(history)
        ? { ...history, index: history.index - 1 }
        : history;
}

export function redo<T>(history: History<T>): History<T> {
    return can_redo(history)
        ? { ...history, index: history.index + 1 }
        : history;
}
