import { describe, expect, it } from "vitest";
import { migrate_legacy_save_data, UNTITLED_SHEET_NAME } from "../src/logics/migration";
import { INITIAL_ROW_DATA, SCHEMA_VERSION, SheetNode } from "../src/types";

function make_legacy(overrides: Record<string, unknown> = {}) {
    return {
        project_name: '2025秋イベ',
        row_datas: [
            { ...INITIAL_ROW_DATA, row_name: 'E-1 道中', fuel: 1200, ammo: 900 },
            { ...INITIAL_ROW_DATA, row_name: 'E-1 ボス', fuel: 3400, bucket: 12 },
        ],
        approved_domains: ['kc3kai.github.io', 'example.com'],
        ...overrides,
    };
}

describe('migrate_legacy_save_data', () => {
    it('旧データをワークスペース1件とシート1枚に変換する', () => {
        const { workspace, sheet } = migrate_legacy_save_data(make_legacy());

        const node_ids = Object.keys(workspace.nodes);
        expect(node_ids).toHaveLength(1);

        const node = workspace.nodes[node_ids[0] as keyof typeof workspace.nodes];
        expect(node.type).toBe('sheet');
        expect(node.name).toBe('2025秋イベ');
        // ルート直下に置かれる
        expect(node.parent_id).toBeNull();
        expect(node.order).toBe(0);

        // シート本体とツリーノードは同じ ID を共有する
        expect(sheet.id).toBe(node.id);
        expect(workspace.active_sheet_id).toBe(node.id);
        expect(workspace.schema_version).toBe(SCHEMA_VERSION);
    });

    it('行データを件数と内容ごと保持する', () => {
        const legacy = make_legacy();
        const { sheet } = migrate_legacy_save_data(legacy);

        expect(sheet.row_datas).toHaveLength(2);
        expect(sheet.row_datas).toEqual(legacy.row_datas);
    });

    it('承認済みドメインをワークスペースへ昇格させる', () => {
        const { workspace, sheet } = migrate_legacy_save_data(make_legacy());

        expect(workspace.approved_domains).toEqual([
            'kc3kai.github.io',
            'example.com',
        ]);
        // シート側には残さない
        expect(sheet).not.toHaveProperty('approved_domains');
    });

    it('計画名が空なら既定名を割り当てる', () => {
        const { workspace } = migrate_legacy_save_data(
            make_legacy({ project_name: '' }),
        );

        const node = Object.values(workspace.nodes)[0] as SheetNode;
        expect(node.name).toBe(UNTITLED_SHEET_NAME);
    });

    it('計画名が空白のみでも既定名を割り当てる', () => {
        const { workspace } = migrate_legacy_save_data(
            make_legacy({ project_name: '   ' }),
        );

        const node = Object.values(workspace.nodes)[0] as SheetNode;
        expect(node.name).toBe(UNTITLED_SHEET_NAME);
    });

    it('行データが空でも変換できる', () => {
        const { sheet } = migrate_legacy_save_data(
            make_legacy({ row_datas: [] }),
        );

        expect(sheet.row_datas).toEqual([]);
    });

    it('承認済みドメインが空でも変換できる', () => {
        const { workspace } = migrate_legacy_save_data(
            make_legacy({ approved_domains: [] }),
        );

        expect(workspace.approved_domains).toEqual([]);
    });

    it('呼び出しごとに異なる ID を採番する', () => {
        const a = migrate_legacy_save_data(make_legacy());
        const b = migrate_legacy_save_data(make_legacy());

        expect(a.sheet.id).not.toBe(b.sheet.id);
    });

    it('入力を破壊しない', () => {
        const legacy = make_legacy();
        const snapshot = structuredClone(legacy);

        migrate_legacy_save_data(legacy);

        expect(legacy).toEqual(snapshot);
    });

    describe('不正なデータ', () => {
        it('必須フィールドが欠けていれば例外を投げる', () => {
            expect(() => migrate_legacy_save_data(
                { project_name: 'x', row_datas: [] },
            )).toThrow();
        });

        it('行データの型が違えば例外を投げる', () => {
            expect(() => migrate_legacy_save_data(
                make_legacy({ row_datas: [{ ...INITIAL_ROW_DATA, fuel: '1200' }] }),
            )).toThrow();
        });

        it('行データにフィールドが欠けていれば例外を投げる', () => {
            const { fuel: _fuel, ...incomplete } = INITIAL_ROW_DATA;
            expect(() => migrate_legacy_save_data(
                make_legacy({ row_datas: [incomplete] }),
            )).toThrow();
        });

        it('null や文字列を渡せば例外を投げる', () => {
            expect(() => migrate_legacy_save_data(null)).toThrow();
            expect(() => migrate_legacy_save_data('cost')).toThrow();
            expect(() => migrate_legacy_save_data(undefined)).toThrow();
        });
    });
});
