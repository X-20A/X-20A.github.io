import { describe, expect, it } from "vitest";
import {
    build_tree, calc_drop_index, can_move, collect_descendant_ids, empty_trash, get_children,
    insert_node, insert_node_after, is_descendant, is_in_trash, list_active_sheets, move_node,
    remove_node, rename_node, restore_node, set_folder_expanded, trash_node,
    type NodeMap,
} from "../src/logics/tree";
import { NodeId, TRASH_ID, create_folder_node, create_sheet_node } from "../src/types";

const id = (value: string) => value as NodeId;

/**
 * root
 *  ├ events (folder)
 *  │   ├ e1 (sheet)
 *  │   └ spring (folder)
 *  │       └ e2 (sheet)
 *  └ memo (sheet)
 */
function make_nodes(): NodeMap {
    return {
        [id('events')]: create_folder_node(id('events'), 'イベント', null, 0),
        [id('memo')]: create_sheet_node(id('memo'), 'メモ', null, 1),
        [id('e1')]: create_sheet_node(id('e1'), 'E-1', id('events'), 0),
        [id('spring')]: create_folder_node(id('spring'), '春', id('events'), 1),
        [id('e2')]: create_sheet_node(id('e2'), 'E-2', id('spring'), 0),
    };
}

describe('get_children', () => {
    it('同じ親のノードを order 順に返す', () => {
        const names = get_children(make_nodes(), null).map(n => n.name);
        expect(names).toEqual(['イベント', 'メモ']);
    });

    it('order が入れ替わっていても並べ直す', () => {
        const nodes = make_nodes();
        nodes[id('events')] = { ...nodes[id('events')], order: 9 };

        const names = get_children(nodes, null).map(n => n.name);
        expect(names).toEqual(['メモ', 'イベント']);
    });

    it('子を持たない親には空配列を返す', () => {
        expect(get_children(make_nodes(), id('memo'))).toEqual([]);
    });
});

describe('build_tree', () => {
    it('ネストした構造を depth 付きで組み立てる', () => {
        const tree = build_tree(make_nodes());

        expect(tree).toHaveLength(2);
        expect(tree[0].node.name).toBe('イベント');
        expect(tree[0].depth).toBe(0);

        const events_children = tree[0].children;
        expect(events_children.map(c => c.node.name)).toEqual(['E-1', '春']);
        expect(events_children[0].depth).toBe(1);

        expect(events_children[1].children[0].node.name).toBe('E-2');
        expect(events_children[1].children[0].depth).toBe(2);
    });

    it('シートは子を持たない', () => {
        const tree = build_tree(make_nodes());
        expect(tree[1].children).toEqual([]);
    });

    it('ゴミ箱の中身はルートから辿れない', () => {
        const nodes = move_node(make_nodes(), id('memo'), TRASH_ID);
        const names = build_tree(nodes).map(t => t.node.name);

        expect(names).toEqual(['イベント']);
    });
});

describe('is_descendant', () => {
    it('直接の子を子孫と判定する', () => {
        expect(is_descendant(make_nodes(), id('events'), id('e1'))).toBe(true);
    });

    it('孫を子孫と判定する', () => {
        expect(is_descendant(make_nodes(), id('events'), id('e2'))).toBe(true);
    });

    it('無関係なノードを子孫と判定しない', () => {
        expect(is_descendant(make_nodes(), id('events'), id('memo'))).toBe(false);
    });

    it('自分自身は子孫ではない', () => {
        expect(is_descendant(make_nodes(), id('events'), id('events'))).toBe(false);
    });

    it('親子関係が循環していても停止する', () => {
        const nodes: NodeMap = {
            [id('a')]: create_folder_node(id('a'), 'A', id('b'), 0),
            [id('b')]: create_folder_node(id('b'), 'B', id('a'), 0),
        };

        expect(() => is_descendant(nodes, id('x'), id('a'))).not.toThrow();
        expect(is_descendant(nodes, id('x'), id('a'))).toBe(false);
    });
});

describe('can_move', () => {
    it('フォルダを自身の子孫へは移動できない', () => {
        expect(can_move(make_nodes(), id('events'), id('spring'))).toBe(false);
    });

    it('フォルダを自身の中へは移動できない', () => {
        expect(can_move(make_nodes(), id('events'), id('events'))).toBe(false);
    });

    it('シートの中へは移動できない', () => {
        expect(can_move(make_nodes(), id('e1'), id('memo'))).toBe(false);
    });

    it('ルートへは常に移動できる', () => {
        expect(can_move(make_nodes(), id('e2'), null)).toBe(true);
    });

    it('ゴミ箱へは常に移動できる', () => {
        expect(can_move(make_nodes(), id('events'), TRASH_ID)).toBe(true);
    });

    it('子孫でないフォルダへは移動できる', () => {
        expect(can_move(make_nodes(), id('memo'), id('spring'))).toBe(true);
    });

    it('存在しないノードは移動できない', () => {
        expect(can_move(make_nodes(), id('unknown'), null)).toBe(false);
    });
});

describe('move_node', () => {
    it('別のフォルダへ移動する', () => {
        const nodes = move_node(make_nodes(), id('memo'), id('spring'));

        expect(nodes[id('memo')].parent_id).toBe(id('spring'));
        expect(get_children(nodes, id('spring')).map(n => n.name))
            .toEqual(['E-2', 'メモ']);
    });

    it('指定した位置に挿入する', () => {
        const nodes = move_node(make_nodes(), id('memo'), id('events'), 0);

        expect(get_children(nodes, id('events')).map(n => n.name))
            .toEqual(['メモ', 'E-1', '春']);
    });

    it('移動元の兄弟の order を詰め直す', () => {
        const nodes = move_node(make_nodes(), id('e1'), null);
        const events_children = get_children(nodes, id('events'));

        expect(events_children.map(n => n.order)).toEqual([0]);
    });

    it('同じ親の中で並べ替える', () => {
        const nodes = move_node(make_nodes(), id('spring'), id('events'), 0);

        expect(get_children(nodes, id('events')).map(n => n.name))
            .toEqual(['春', 'E-1']);
    });

    it('範囲外の index を丸める', () => {
        const nodes = move_node(make_nodes(), id('memo'), id('events'), 99);

        expect(get_children(nodes, id('events')).map(n => n.name))
            .toEqual(['E-1', '春', 'メモ']);
    });

    it('移動できない場合は元の nodes をそのまま返す', () => {
        const original = make_nodes();
        expect(move_node(original, id('events'), id('spring'))).toBe(original);
    });

    it('入力を破壊しない', () => {
        const original = make_nodes();
        const snapshot = structuredClone(original);

        move_node(original, id('memo'), id('spring'));

        expect(original).toEqual(snapshot);
    });

    it('order を発散させない', () => {
        let nodes = make_nodes();
        for (let i = 0; i < 20; i++) {
            nodes = move_node(nodes, id('memo'), id('events'), 0);
            nodes = move_node(nodes, id('memo'), null, 0);
        }

        const orders = Object.values(nodes).map(n => n.order);
        expect(Math.max(...orders)).toBeLessThan(5);
    });
});

describe('calc_drop_index', () => {
    it('別の親から持ってきた場合、対象の前後に入る', () => {
        const nodes = make_nodes();

        expect(calc_drop_index(nodes, id('memo'), id('e1'), 'before')).toBe(0);
        expect(calc_drop_index(nodes, id('memo'), id('e1'), 'after')).toBe(1);
        expect(calc_drop_index(nodes, id('memo'), id('spring'), 'after')).toBe(2);
    });

    it('同じ親の中では移動対象を除いた位置を返す', () => {
        const nodes = make_nodes();

        // events の子は [e1, spring]。e1 を spring の後ろへ落とすと、
        // e1 を除いた [spring] に対する index 1 になる
        expect(calc_drop_index(nodes, id('e1'), id('spring'), 'after')).toBe(1);
        expect(calc_drop_index(nodes, id('e1'), id('spring'), 'before')).toBe(0);
    });

    it('計算した index で move_node すると意図した並びになる', () => {
        const nodes = make_nodes();
        const index = calc_drop_index(nodes, id('e1'), id('spring'), 'after');
        const moved = move_node(nodes, id('e1'), id('events'), index);

        expect(get_children(moved, id('events')).map(n => n.name))
            .toEqual(['春', 'E-1']);
    });

    it('存在しない対象には 0 を返す', () => {
        expect(calc_drop_index(make_nodes(), id('memo'), id('unknown'), 'before'))
            .toBe(0);
    });
});

describe('insert_node', () => {
    it('末尾に追加する', () => {
        const nodes = insert_node(
            make_nodes(),
            create_sheet_node(id('new'), '新規', id('events')),
        );

        expect(get_children(nodes, id('events')).map(n => n.name))
            .toEqual(['E-1', '春', '新規']);
    });
});

describe('insert_node_after', () => {
    it('対象の直後(同じ親)へ挿入する', () => {
        const nodes = insert_node_after(
            make_nodes(),
            create_sheet_node(id('copy'), 'E-1のコピー', null),
            id('e1'),
        );

        // events の子は [E-1, 春]。E-1 の直後へ入る
        expect(get_children(nodes, id('events')).map(n => n.name))
            .toEqual(['E-1', 'E-1のコピー', '春']);
        // 親は対象に合わせる(引数の parent_id は上書きされる)
        expect(nodes[id('copy')].parent_id).toBe(id('events'));
    });

    it('末尾の対象の直後にも入る', () => {
        const nodes = insert_node_after(
            make_nodes(),
            create_sheet_node(id('copy'), 'メモのコピー', null),
            id('memo'),
        );

        expect(get_children(nodes, null).map(n => n.name))
            .toEqual(['イベント', 'メモ', 'メモのコピー']);
    });

    it('兄弟の order を 0 から振り直す', () => {
        const nodes = insert_node_after(
            make_nodes(),
            create_sheet_node(id('copy'), 'コピー', null),
            id('e1'),
        );

        expect(get_children(nodes, id('events')).map(n => n.order))
            .toEqual([0, 1, 2]);
    });

    it('対象が見つからなければ末尾へ追加する', () => {
        const nodes = insert_node_after(
            make_nodes(),
            create_sheet_node(id('copy'), '孤児', null),
            id('unknown'),
        );

        expect(get_children(nodes, null).map(n => n.name))
            .toEqual(['イベント', 'メモ', '孤児']);
    });
});

describe('ゴミ箱', () => {
    it('ゴミ箱直下のノードを判定する', () => {
        const nodes = move_node(make_nodes(), id('memo'), TRASH_ID);
        expect(is_in_trash(nodes, id('memo'))).toBe(true);
    });

    it('ゴミ箱にあるフォルダの子孫も中にあると判定する', () => {
        const nodes = move_node(make_nodes(), id('events'), TRASH_ID);

        expect(is_in_trash(nodes, id('e1'))).toBe(true);
        expect(is_in_trash(nodes, id('e2'))).toBe(true);
    });

    it('ゴミ箱外のノードは中にないと判定する', () => {
        expect(is_in_trash(make_nodes(), id('e1'))).toBe(false);
    });

    it('ゴミ箱を空にすると中身のシートIDを返す', () => {
        const nodes = move_node(make_nodes(), id('events'), TRASH_ID);
        const result = empty_trash(nodes);

        expect(result.removed_sheet_ids.sort()).toEqual([id('e1'), id('e2')]);
        expect(result.nodes[id('events')]).toBeUndefined();
        expect(result.nodes[id('spring')]).toBeUndefined();
        // ゴミ箱の外は残る
        expect(result.nodes[id('memo')]).toBeDefined();
    });

    it('空のゴミ箱を空にしても何も起きない', () => {
        const result = empty_trash(make_nodes());
        expect(result.removed_sheet_ids).toEqual([]);
    });
});

describe('ゴミ箱からの復元', () => {
    it('元のフォルダへ戻す', () => {
        let nodes = trash_node(make_nodes(), id('e1'));
        expect(is_in_trash(nodes, id('e1'))).toBe(true);

        nodes = restore_node(nodes, id('e1'));
        expect(nodes[id('e1')].parent_id).toBe(id('events'));
        expect(is_in_trash(nodes, id('e1'))).toBe(false);
    });

    it('ルート直下にあったものはルートへ戻す', () => {
        let nodes = trash_node(make_nodes(), id('memo'));
        nodes = restore_node(nodes, id('memo'));

        expect(nodes[id('memo')].parent_id).toBeNull();
    });

    it('復元後は控えを消す', () => {
        let nodes = trash_node(make_nodes(), id('e1'));
        nodes = restore_node(nodes, id('e1'));

        expect(nodes[id('e1')].restore_parent_id).toBeNull();
    });

    it('元の親が消えていればルートへ戻す', () => {
        let nodes = trash_node(make_nodes(), id('e1'));
        nodes = remove_node(nodes, id('events')).nodes;
        nodes = restore_node(nodes, id('e1'));

        expect(nodes[id('e1')].parent_id).toBeNull();
    });

    it('元の親がゴミ箱にあればルートへ戻す', () => {
        let nodes = trash_node(make_nodes(), id('e1'));
        nodes = trash_node(nodes, id('events'));
        nodes = restore_node(nodes, id('e1'));

        expect(nodes[id('e1')].parent_id).toBeNull();
        expect(is_in_trash(nodes, id('e1'))).toBe(false);
    });

    it('控えのない旧データはルートへ戻す', () => {
        const nodes = move_node(make_nodes(), id('memo'), TRASH_ID);
        expect(nodes[id('memo')].restore_parent_id).toBeUndefined();

        expect(restore_node(nodes, id('memo'))[id('memo')].parent_id).toBeNull();
    });

    it('フォルダを戻すと子孫も一緒に出る', () => {
        let nodes = trash_node(make_nodes(), id('events'));
        expect(is_in_trash(nodes, id('e2'))).toBe(true);

        nodes = restore_node(nodes, id('events'));
        expect(is_in_trash(nodes, id('e2'))).toBe(false);
        expect(nodes[id('e2')].parent_id).toBe(id('spring'));
    });

    it('存在しないノードは何もしない', () => {
        const original = make_nodes();
        expect(restore_node(original, id('unknown'))).toBe(original);
    });
});

describe('collect_descendant_ids', () => {
    it('自身を含めた子孫をすべて返す', () => {
        const ids = collect_descendant_ids(make_nodes(), id('events'));
        expect(ids.sort()).toEqual([id('e1'), id('e2'), id('events'), id('spring')]);
    });

    it('シートは自身のみを返す', () => {
        expect(collect_descendant_ids(make_nodes(), id('memo'))).toEqual([id('memo')]);
    });
});

describe('remove_node', () => {
    it('子孫ごと削除しシートIDを返す', () => {
        const result = remove_node(make_nodes(), id('events'));

        expect(result.removed_sheet_ids.sort()).toEqual([id('e1'), id('e2')]);
        expect(Object.keys(result.nodes)).toEqual([id('memo')]);
    });

    it('残った兄弟の order を詰め直す', () => {
        const result = remove_node(make_nodes(), id('events'));
        expect(result.nodes[id('memo')].order).toBe(0);
    });
});

describe('list_active_sheets', () => {
    it('ゴミ箱にないシートだけを返す', () => {
        const nodes = move_node(make_nodes(), id('spring'), TRASH_ID);
        const names = list_active_sheets(nodes).map(n => n.name);

        expect(names.sort()).toEqual(['E-1', 'メモ']);
    });

    it('フォルダを含めない', () => {
        const types = list_active_sheets(make_nodes()).map(n => n.type);
        expect(types.every(t => t === 'sheet')).toBe(true);
    });
});

describe('rename_node', () => {
    it('名前を変更する', () => {
        const nodes = rename_node(make_nodes(), id('memo'), '買い物メモ');
        expect(nodes[id('memo')].name).toBe('買い物メモ');
    });

    it('存在しないノードは何もしない', () => {
        const original = make_nodes();
        expect(rename_node(original, id('unknown'), 'x')).toBe(original);
    });
});

describe('set_folder_expanded', () => {
    it('開閉状態を変更する', () => {
        const nodes = set_folder_expanded(make_nodes(), id('events'), false);
        const node = nodes[id('events')];

        expect(node.type === 'folder' && node.is_expanded).toBe(false);
    });

    it('シートには適用しない', () => {
        const original = make_nodes();
        expect(set_folder_expanded(original, id('memo'), false)).toBe(original);
    });
});
