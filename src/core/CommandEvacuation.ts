/**
 * 艦隊退避コマンド
 */
export interface CommandEvacuation {
    node: string;
    evacuation_ship_nums: number[][];
}

/**
 * CommandEvacuation配列を新規作成する
 * @param items 初期値（省略可）
 * @returns 新しいCommandEvacuation配列
 */
export function createCommandEvacuation(
    items: CommandEvacuation[] = [],
): CommandEvacuation[] {
    return [...items];
}

/**
 * CommandEvacuationを追加する
 * @param list 既存のCommandEvacuation配列
 * @param item 追加するCommandEvacuation
 * @returns 新しいCommandEvacuation配列
 */
export function addCommandEvacuation(
    list: CommandEvacuation[],
    item: CommandEvacuation
): CommandEvacuation[] {
    return [...list, item];
}

/**
 * 指定したnodeのCommandEvacuationを1つだけ削除する
 * @param list 既存のCommandEvacuation配列
 * @param node 削除対象のnode
 * @returns 新しいCommandEvacuation配列
 */
export function removeCommandEvacuation(
    list: CommandEvacuation[],
    node: string
): CommandEvacuation[] {
    const idx = list.findIndex(evac => evac.node === node);
    if (idx === -1) return list;
    return [...list.slice(0, idx), ...list.slice(idx + 1)];
}

/**
 * CommandEvacuation配列を空にする
 * @returns 空のCommandEvacuation配列
 */
export function clearCommandEvacuation(): CommandEvacuation[] {
    return [];
}
