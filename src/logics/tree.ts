import { NodeId, TreeNode, TRASH_ID } from "../types";

/**
 * ツリー操作。すべて副作用を持たず、新しい nodes を返す。
 *
 * ノードは parent_id を持つフラットな Record として保持している。
 * ネストが無制限であるため、children の再帰配列だと移動のたびに木を
 * 走査することになる
 */

export type NodeMap = Record<NodeId, TreeNode>;

/** 描画用のネスト構造。保存はしない */
export type TreeItem = {
    node: TreeNode,
    children: TreeItem[],
    depth: number,
}

/**
 * 同じ親を持つノードを order 順に返す
 */
export function get_children(
    nodes: NodeMap,
    parent_id: NodeId | null,
): TreeNode[] {
    return Object.values(nodes)
        .filter(node => node.parent_id === parent_id)
        .sort((a, b) => a.order - b.order);
}

/**
 * 描画用のネスト構造を組み立てる
 * @param parent_id 起点。既定はルート(ゴミ箱の中身は含まれない)
 */
export function build_tree(
    nodes: NodeMap,
    parent_id: NodeId | null = null,
    depth: number = 0,
): TreeItem[] {
    return get_children(nodes, parent_id).map(node => ({
        node,
        children: node.type === 'folder'
            ? build_tree(nodes, node.id, depth + 1)
            : [],
        depth,
    }));
}

/**
 * ancestor_id から親子関係を辿って node_id に到達できるか
 */
export function is_descendant(
    nodes: NodeMap,
    ancestor_id: NodeId,
    node_id: NodeId,
): boolean {
    let current = nodes[node_id];

    // 循環した nodes を渡された場合に無限ループしないよう上限を設ける
    let guard = Object.keys(nodes).length + 1;

    while (current && current.parent_id !== null && guard-- > 0) {
        if (current.parent_id === ancestor_id) return true;
        current = nodes[current.parent_id];
    }
    return false;
}

/**
 * 移動が許されるか判定する。
 * フォルダを自身や自身の子孫へ移動することはできない
 */
export function can_move(
    nodes: NodeMap,
    node_id: NodeId,
    target_parent_id: NodeId | null,
): boolean {
    if (!nodes[node_id]) return false;
    if (target_parent_id === null || target_parent_id === TRASH_ID) return true;

    if (target_parent_id === node_id) return false;

    const target_parent = nodes[target_parent_id];
    if (!target_parent) return false;
    // シートの中には入れられない
    if (target_parent.type !== 'folder') return false;

    return !is_descendant(nodes, node_id, target_parent_id);
}

/**
 * 兄弟の order を 0 から振り直す。
 * 移動を繰り返しても order が発散しないようにするため
 */
function reindex(nodes: NodeMap, parent_id: NodeId | null): NodeMap {
    const result = { ...nodes };

    get_children(nodes, parent_id).forEach((node, index) => {
        result[node.id] = { ...node, order: index };
    });

    return result;
}

/**
 * ノードを移動する。移動できない場合は nodes をそのまま返す
 * @param target_index 移動先の兄弟間での位置。省略時は末尾
 */
export function move_node(
    nodes: NodeMap,
    node_id: NodeId,
    target_parent_id: NodeId | null,
    target_index?: number,
): NodeMap {
    if (!can_move(nodes, node_id, target_parent_id)) return nodes;

    const node = nodes[node_id];
    const siblings = get_children(nodes, target_parent_id)
        .filter(sibling => sibling.id !== node_id);

    const index = target_index === undefined
        ? siblings.length
        : Math.max(0, Math.min(siblings.length, target_index));

    siblings.splice(index, 0, { ...node, parent_id: target_parent_id });

    const result: NodeMap = { ...nodes };
    siblings.forEach((sibling, i) => {
        result[sibling.id] = { ...sibling, parent_id: target_parent_id, order: i };
    });

    // 移動元の親も詰め直す
    return node.parent_id === target_parent_id
        ? result
        : reindex(result, node.parent_id);
}

export type DropPosition = 'before' | 'after';

/**
 * 対象ノードの前後に落としたときの挿入位置を返す。
 *
 * move_node は移動対象を兄弟から除いてから挿入するため、
 * order をそのまま渡すと同じ親の中で1つずれる
 */
export function calc_drop_index(
    nodes: NodeMap,
    dragged_id: NodeId,
    target_id: NodeId,
    position: DropPosition,
): number {
    const target = nodes[target_id];
    if (!target) return 0;

    const siblings = get_children(nodes, target.parent_id)
        .filter(node => node.id !== dragged_id);

    const index = siblings.findIndex(node => node.id === target_id);
    if (index === -1) return siblings.length;

    return position === 'before' ? index : index + 1;
}

/**
 * ノードを追加する。末尾に置く
 */
export function insert_node(nodes: NodeMap, node: TreeNode): NodeMap {
    const siblings = get_children(nodes, node.parent_id);

    return {
        ...nodes,
        [node.id]: { ...node, order: siblings.length },
    };
}

/**
 * ゴミ箱へ移す。
 * フォルダの子孫は親がゴミ箱にあることで暗黙にゴミ箱扱いになるため、
 * 個別に移動する必要はない
 */
export function trash_node(nodes: NodeMap, node_id: NodeId): NodeMap {
    return move_node(nodes, node_id, TRASH_ID);
}

/**
 * ゴミ箱の中にあるか。祖先のいずれかがゴミ箱にあれば真
 */
export function is_in_trash(nodes: NodeMap, node_id: NodeId): boolean {
    const node = nodes[node_id];
    if (!node) return false;
    if (node.parent_id === TRASH_ID) return true;

    return is_descendant(nodes, TRASH_ID, node_id);
}

/**
 * 自身を含めた子孫の ID をすべて返す
 */
export function collect_descendant_ids(
    nodes: NodeMap,
    node_id: NodeId,
): NodeId[] {
    const result: NodeId[] = [node_id];

    for (const child of get_children(nodes, node_id)) {
        result.push(...collect_descendant_ids(nodes, child.id));
    }
    return result;
}

/**
 * ノードとその子孫を物理削除する。ゴミ箱を空にするときに使う
 * @returns 削除後の nodes と、削除されたシートの ID
 */
export function remove_node(
    nodes: NodeMap,
    node_id: NodeId,
): { nodes: NodeMap, removed_sheet_ids: NodeId[] } {
    const target_ids = collect_descendant_ids(nodes, node_id);
    const removed_sheet_ids = target_ids.filter(
        id => nodes[id]?.type === 'sheet'
    );

    const result: NodeMap = { ...nodes };
    const parent_id = nodes[node_id]?.parent_id ?? null;
    for (const id of target_ids) delete result[id];

    return { nodes: reindex(result, parent_id), removed_sheet_ids };
}

/**
 * ゴミ箱の中身をすべて物理削除する
 */
export function empty_trash(
    nodes: NodeMap,
): { nodes: NodeMap, removed_sheet_ids: NodeId[] } {
    let result = nodes;
    const removed_sheet_ids: NodeId[] = [];

    for (const child of get_children(nodes, TRASH_ID)) {
        const removed = remove_node(result, child.id);
        result = removed.nodes;
        removed_sheet_ids.push(...removed.removed_sheet_ids);
    }

    return { nodes: result, removed_sheet_ids };
}

/**
 * ゴミ箱にないシートノードを order 順に返す
 */
export function list_active_sheets(nodes: NodeMap): TreeNode[] {
    return Object.values(nodes)
        .filter(node => node.type === 'sheet' && !is_in_trash(nodes, node.id))
        .sort((a, b) => a.order - b.order);
}

export function rename_node(
    nodes: NodeMap,
    node_id: NodeId,
    name: string,
): NodeMap {
    const node = nodes[node_id];
    if (!node) return nodes;

    return { ...nodes, [node_id]: { ...node, name } };
}

export function set_folder_expanded(
    nodes: NodeMap,
    node_id: NodeId,
    is_expanded: boolean,
): NodeMap {
    const node = nodes[node_id];
    if (!node || node.type !== 'folder') return nodes;

    return { ...nodes, [node_id]: { ...node, is_expanded } };
}
