import { describe, expect, it } from "vitest";
import {
    build_import_folder_name, build_sheet_export, build_sheet_import,
    build_workspace_export, is_meaningful_row, merge_workspace_import,
    parse_import, remap_import_ids, rows_to_csv,
} from "../src/logics/exchange";
import {
    INITIAL_ROW_DATA, NodeId, RowData, Sheet, SORTIE_SIM_DOMAIN, Workspace,
    SCHEMA_VERSION, create_folder_node, create_sheet_node,
} from "../src/types";
import { get_children, type NodeMap } from "../src/logics/tree";

const id = (value: string) => value as NodeId;

function row(name: string, fuel: number = 0): RowData {
    return { ...INITIAL_ROW_DATA, row_name: name, fuel };
}

function make_workspace(): Workspace {
    return {
        schema_version: SCHEMA_VERSION,
        nodes: {
            [id('f1')]: create_folder_node(id('f1'), 'イベント', null, 0),
            [id('s1')]: create_sheet_node(id('s1'), 'E-1', id('f1'), 0),
            [id('s2')]: create_sheet_node(id('s2'), 'メモ', null, 1),
        },
        approved_domains: [SORTIE_SIM_DOMAIN],
        active_sheet_id: id('s1'),
    };
}

function make_sheets(): Sheet[] {
    return [
        { id: id('s1'), row_datas: [row('道中', 120)], updated_at: 0 },
        { id: id('s2'), row_datas: [row('買い物')], updated_at: 0 },
    ];
}

describe('書き出しと読み込みの往復', () => {
    it('ワークスペースを書き出して読み込める', () => {
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const parsed = parse_import(JSON.parse(JSON.stringify(exported)));

        expect(parsed.kind).toBe('workspace');
        if (parsed.kind !== 'workspace') throw new Error('unreachable');

        expect(Object.keys(parsed.data.workspace.nodes)).toHaveLength(3);
        expect(parsed.data.sheets).toHaveLength(2);
    });

    it('シート単体を書き出して読み込める', () => {
        const exported = build_sheet_export('E-1', [row('道中', 120)]);
        const parsed = parse_import(JSON.parse(JSON.stringify(exported)));

        expect(parsed.kind).toBe('sheet');
        if (parsed.kind !== 'sheet') throw new Error('unreachable');

        expect(parsed.data.name).toBe('E-1');
        expect(parsed.data.row_datas[0].fuel).toBe(120);
    });

    it('形式が違うファイルは例外を投げる', () => {
        expect(() => parse_import({ format: 'unknown', format_version: 1 })).toThrow();
        expect(() => parse_import({ hello: 'world' })).toThrow();
        expect(() => parse_import(null)).toThrow();
    });

    it('旧共有URL形式(SaveData)は受け付けない', () => {
        expect(() => parse_import({
            project_name: 'x', row_datas: [], approved_domains: [],
        })).toThrow();
    });
});

describe('remap_import_ids', () => {
    it('すべてのノード ID を振り直す', () => {
        const { nodes } = remap_import_ids(
            make_workspace().nodes as NodeMap, make_sheets(),
        );

        const ids = Object.keys(nodes);
        expect(ids).toHaveLength(3);
        expect(ids).not.toContain('f1');
        expect(ids).not.toContain('s1');
    });

    it('親子関係を保つ', () => {
        const { nodes } = remap_import_ids(
            make_workspace().nodes as NodeMap, make_sheets(),
        );

        const folder = Object.values(nodes).find(n => n.name === 'イベント')!;
        const child = Object.values(nodes).find(n => n.name === 'E-1')!;

        expect(child.parent_id).toBe(folder.id);
    });

    it('シート本体の ID をノードに追随させる', () => {
        const { nodes, sheets } = remap_import_ids(
            make_workspace().nodes as NodeMap, make_sheets(),
        );

        const node = Object.values(nodes).find(n => n.name === 'E-1')!;
        expect(sheets.some(s => s.id === node.id)).toBe(true);
    });

    it('毎回異なる ID を採番する', () => {
        const a = remap_import_ids(make_workspace().nodes as NodeMap, make_sheets());
        const b = remap_import_ids(make_workspace().nodes as NodeMap, make_sheets());

        expect(Object.keys(a.nodes)).not.toEqual(Object.keys(b.nodes));
    });

    it('対応するノードのないシートを落とす', () => {
        const orphan: Sheet = { id: id('ghost'), row_datas: [], updated_at: 0 };
        const { sheets } = remap_import_ids(
            make_workspace().nodes as NodeMap,
            [...make_sheets(), orphan],
        );

        expect(sheets).toHaveLength(2);
    });
});

describe('merge_workspace_import', () => {
    const existing: NodeMap = {
        [id('keep')]: create_sheet_node(id('keep'), '既存シート', null, 0),
    };

    it('既存のノードを壊さない', () => {
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const { nodes } = merge_workspace_import(existing, exported);

        expect(nodes[id('keep')]).toBeDefined();
        expect(nodes[id('keep')].name).toBe('既存シート');
    });

    it('取り込んだツリーをフォルダの下にまとめる', () => {
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const { nodes, folder_id } = merge_workspace_import(existing, exported, '取込');

        const under_folder = get_children(nodes, folder_id).map(n => n.name);
        // 取り込み元でルート直下だったものがフォルダ直下に来る
        expect(under_folder.sort()).toEqual(['イベント', 'メモ']);
    });

    it('取り込んだ階層を保つ', () => {
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const { nodes, folder_id } = merge_workspace_import(existing, exported, '取込');

        const folder = get_children(nodes, folder_id)
            .find(n => n.name === 'イベント')!;
        expect(get_children(nodes, folder.id).map(n => n.name)).toEqual(['E-1']);
    });

    it('保存すべきシート本体を返す', () => {
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const { sheets } = merge_workspace_import(existing, exported, '取込');

        expect(sheets).toHaveLength(2);
        expect(sheets[0].row_datas[0].row_name).toBe('道中');
    });

    it('既存ノードと ID が衝突しない', () => {
        const same_ids: NodeMap = {
            [id('f1')]: create_folder_node(id('f1'), '既存フォルダ', null, 0),
            [id('s1')]: create_sheet_node(id('s1'), '既存シート', null, 1),
        };
        const exported = build_workspace_export(make_workspace(), make_sheets());
        const { nodes } = merge_workspace_import(same_ids, exported, '取込');

        expect(nodes[id('f1')].name).toBe('既存フォルダ');
        expect(nodes[id('s1')].name).toBe('既存シート');
        // 既存2 + フォルダ1 + 取り込み3
        expect(Object.keys(nodes)).toHaveLength(6);
    });
});

describe('build_sheet_import', () => {
    const existing: NodeMap = {
        [id('keep')]: create_sheet_node(id('keep'), '既存', null, 0),
    };

    it('ルート直下に追加する', () => {
        const exported = build_sheet_export('E-2', [row('ボス', 300)]);
        const { nodes, sheet_id } = build_sheet_import(existing, exported);

        expect(nodes[sheet_id].parent_id).toBeNull();
        expect(nodes[sheet_id].name).toBe('E-2');
    });

    it('行データを保つ', () => {
        const exported = build_sheet_export('E-2', [row('ボス', 300)]);
        const { sheet } = build_sheet_import(existing, exported);

        expect(sheet.row_datas[0].fuel).toBe(300);
    });

    it('名前が空なら既定名を割り当てる', () => {
        const exported = build_sheet_export('   ', []);
        const { nodes, sheet_id } = build_sheet_import(existing, exported);

        expect(nodes[sheet_id].name).toBe('無題のシート');
    });
});

describe('rows_to_csv', () => {
    it('見出し行を先頭に置く', () => {
        const csv = rows_to_csv([row('A', 100)]);
        expect(csv.split('\r\n')[0]).toBe('name,url,count,rate,燃料,弾薬,鋼材,ボーキ,バケツ,ダメコン,洋上補給');
    });

    it('値を列順に並べる', () => {
        const csv = rows_to_csv([row('A', 100)]);
        expect(csv.split('\r\n')[1]).toBe('A,,1,0,100,0,0,0,0,0,0');
    });

    it('空行を既定で除く', () => {
        const csv = rows_to_csv([row('A', 100), row(''), row('B', 200)]);
        expect(csv.split('\r\n')).toHaveLength(3);
    });

    it('空行を含めることもできる', () => {
        const csv = rows_to_csv([row('A'), row('')], false);
        expect(csv.split('\r\n')).toHaveLength(3);
    });

    it('カンマを含む値を引用する', () => {
        const csv = rows_to_csv([row('A,B')]);
        expect(csv.split('\r\n')[1].startsWith('"A,B"')).toBe(true);
    });

    it('引用符を二重にする', () => {
        const csv = rows_to_csv([row('say "hi"')]);
        expect(csv.split('\r\n')[1].startsWith('"say ""hi"""')).toBe(true);
    });

    it('データがなければ見出しだけ返す', () => {
        expect(rows_to_csv([])).toBe('name,url,count,rate,燃料,弾薬,鋼材,ボーキ,バケツ,ダメコン,洋上補給');
    });
});

describe('is_meaningful_row', () => {
    it('名前があれば真', () => {
        expect(is_meaningful_row(row('A'))).toBe(true);
    });

    it('数値が入っていれば真', () => {
        expect(is_meaningful_row(row('', 100))).toBe(true);
    });

    it('URL があれば真', () => {
        expect(is_meaningful_row({ ...INITIAL_ROW_DATA, url: 'https://x' })).toBe(true);
    });

    it('すべて初期値なら偽', () => {
        expect(is_meaningful_row({ ...INITIAL_ROW_DATA })).toBe(false);
    });

    it('空白だけの名前は空とみなす', () => {
        expect(is_meaningful_row(row('   '))).toBe(false);
    });
});

describe('build_import_folder_name', () => {
    it('日時を含む名前を作る', () => {
        const name = build_import_folder_name(new Date(2026, 6, 20, 9, 5));
        expect(name).toBe('インポート 2026-07-20 09:05');
    });
});
