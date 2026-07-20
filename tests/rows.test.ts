import { describe, expect, it } from "vitest";
import {
    calc_pasted_indexes, clear_rows, copy_rows, paste_insert, paste_overwrite,
} from "../src/logics/rows";
import { INITIAL_ROW_DATA, RowData } from "../src/types";

function row(name: string, fuel: number = 0): RowData {
    return { ...INITIAL_ROW_DATA, row_name: name, fuel };
}

function names(rows: RowData[]): string[] {
    return rows.map(r => r.row_name);
}

function make_rows(): RowData[] {
    return [row('A', 100), row('B', 200), row('C', 300), row('D', 400)];
}

describe('copy_rows', () => {
    it('指定した行を複製する', () => {
        expect(names(copy_rows(make_rows(), [0, 2]))).toEqual(['A', 'C']);
    });

    it('選択順ではなくシート上の並び順で返す', () => {
        expect(names(copy_rows(make_rows(), [3, 0, 2]))).toEqual(['A', 'C', 'D']);
    });

    it('元の行と参照を共有しない', () => {
        const rows = make_rows();
        const copied = copy_rows(rows, [0]);

        copied[0].fuel = 999;
        expect(rows[0].fuel).toBe(100);
    });

    it('存在しない添字を無視する', () => {
        expect(names(copy_rows(make_rows(), [1, 99]))).toEqual(['B']);
    });

    it('選択が空なら空配列を返す', () => {
        expect(copy_rows(make_rows(), [])).toEqual([]);
    });
});

describe('clear_rows', () => {
    it('指定した行を空にする', () => {
        expect(names(clear_rows(make_rows(), [1]))).toEqual(['A', '', 'C', 'D']);
    });

    it('行を詰めない', () => {
        expect(clear_rows(make_rows(), [1])).toHaveLength(4);
    });

    it('複数行を空にする', () => {
        expect(names(clear_rows(make_rows(), [0, 3]))).toEqual(['', 'B', 'C', '']);
    });

    it('選択が空なら元の配列をそのまま返す', () => {
        const rows = make_rows();
        expect(clear_rows(rows, [])).toBe(rows);
    });

    it('入力を破壊しない', () => {
        const rows = make_rows();
        const snapshot = structuredClone(rows);

        clear_rows(rows, [0, 1]);
        expect(rows).toEqual(snapshot);
    });
});

describe('paste_overwrite', () => {
    it('指定位置から上書きする', () => {
        const result = paste_overwrite(make_rows(), [row('X'), row('Y')], 1);
        expect(names(result)).toEqual(['A', 'X', 'Y', 'D']);
    });

    it('末尾を超える分はシートを伸ばす', () => {
        const result = paste_overwrite(make_rows(), [row('X'), row('Y')], 3);
        expect(names(result)).toEqual(['A', 'B', 'C', 'X', 'Y']);
    });

    it('シートより遠い位置を指されても間を空行で埋める', () => {
        const result = paste_overwrite(make_rows(), [row('X')], 6);

        expect(result).toHaveLength(7);
        expect(names(result)).toEqual(['A', 'B', 'C', 'D', '', '', 'X']);
    });

    it('クリップボードが空なら元の配列をそのまま返す', () => {
        const rows = make_rows();
        expect(paste_overwrite(rows, [], 0)).toBe(rows);
    });

    it('クリップボードと参照を共有しない', () => {
        const clipboard = [row('X')];
        const result = paste_overwrite(make_rows(), clipboard, 0);

        result[0].fuel = 999;
        expect(clipboard[0].fuel).toBe(0);
    });

    it('入力を破壊しない', () => {
        const rows = make_rows();
        const snapshot = structuredClone(rows);

        paste_overwrite(rows, [row('X')], 1);
        expect(rows).toEqual(snapshot);
    });
});

describe('paste_insert', () => {
    it('指定行の直後に挿入する', () => {
        const result = paste_insert(make_rows(), [row('X')], 1);
        expect(names(result)).toEqual(['A', 'B', 'X', 'C', 'D']);
    });

    it('既存の行を消さない', () => {
        expect(paste_insert(make_rows(), [row('X'), row('Y')], 0)).toHaveLength(6);
    });

    it('末尾の直後に挿入できる', () => {
        const result = paste_insert(make_rows(), [row('X')], 3);
        expect(names(result)).toEqual(['A', 'B', 'C', 'D', 'X']);
    });

    it('範囲外を指されても末尾に落とす', () => {
        const result = paste_insert(make_rows(), [row('X')], 99);
        expect(names(result)).toEqual(['A', 'B', 'C', 'D', 'X']);
    });

    it('クリップボードが空なら元の配列をそのまま返す', () => {
        const rows = make_rows();
        expect(paste_insert(rows, [], 0)).toBe(rows);
    });
});

describe('copy と paste の往復', () => {
    it('コピーした行を別シートへ貼り付けても内容が保たれる', () => {
        const source = make_rows();
        const clipboard = copy_rows(source, [1, 3]);

        // 別シート(空)へ貼り付ける
        const target = [row(''), row('')];
        const result = paste_overwrite(target, clipboard, 0);

        expect(names(result)).toEqual(['B', 'D']);
        expect(result[0].fuel).toBe(200);
        expect(result[1].fuel).toBe(400);
    });

    it('カット相当(コピーしてから消去)で元の行が空になる', () => {
        const source = make_rows();
        const clipboard = copy_rows(source, [0]);
        const after_cut = clear_rows(source, [0]);

        expect(names(clipboard)).toEqual(['A']);
        expect(names(after_cut)).toEqual(['', 'B', 'C', 'D']);
    });
});

describe('calc_pasted_indexes', () => {
    it('貼り付けた行の添字を返す', () => {
        expect(calc_pasted_indexes(2, 3)).toEqual([2, 3, 4]);
    });

    it('0件なら空配列', () => {
        expect(calc_pasted_indexes(2, 0)).toEqual([]);
    });
});
