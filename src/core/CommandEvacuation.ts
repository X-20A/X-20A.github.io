import { NT } from "@/data/map";
import type { AreaId, EdgeDatas, NodeDatas } from "@/types";

/**
 * 艦隊退避コマンド
 */
export type CommandEvacuation = {
    readonly node: string;
    readonly evacuation_ship_unique_ids: {
        [fleet_index: number]: number[],
    };
}

/**
 * CommandEvacuation配列を新規作成する
 * @param items 初期値（省略可）
 * @returns 新しいCommandEvacuation配列
 */
export function derive_command_evacuation(
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
export function add_command_evacuation(
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
export function remove_command_evacuation(
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
export function clear_command_evacuation(): CommandEvacuation[] {
    return [];
}

/**
 * Nodeが戦闘系であるか判定して返す
 * @param area 
 * @param node 
 * @param node_datas 
 * @returns 
 */
export function is_battle_node(
    area: AreaId | null,
    node: string | null,
    node_datas: NodeDatas,
): boolean {
    if (!area) return false;
    if (!node) return false;

    const BATTLE_NODE_TYPES = [
        NT.ab,
        NT.ad,
        NT.en,
        NT.su,
        NT.ni,
        NT.as,
    ];
    return BATTLE_NODE_TYPES.includes(node_datas[area][node][2]);
}

export function is_last_stop_node(
    area_id: AreaId,
    node: string,
    edge_datas: EdgeDatas,
): boolean {
    return edge_datas[area_id].every(edge_data => edge_data[0] !== node);
}

/** 現在のNodeに司令退避が設定されているか判定して返す */
export function is_evacuation_node(
    command_vacuations: CommandEvacuation[],
    current_node: string
): boolean {
    return command_vacuations
        .some(command_vacuation => command_vacuation.node === current_node);
}