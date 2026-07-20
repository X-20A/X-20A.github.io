import { describe, expect, it } from "vitest";
import {
    calc_selection, can_show_diff, clamp_selection, EMPTY_SELECTION,
    sorted_selection, type SelectionState,
} from "../src/logics/selection";

const NONE = { ctrl: false, shift: false };
const CTRL = { ctrl: true, shift: false };
const SHIFT = { ctrl: false, shift: true };

function state(selection: number[], anchor_index: number | null = null): SelectionState {
    return { selection, anchor_index };
}

describe('calc_selection', () => {
    describe('修飾なしのクリック', () => {
        it('単独選択にする', () => {
            expect(calc_selection(EMPTY_SELECTION, 3, NONE))
                .toEqual({ selection: [3], anchor_index: 3 });
        });

        it('既存の選択を置き換える', () => {
            expect(calc_selection(state([1, 2, 5], 1), 7, NONE))
                .toEqual({ selection: [7], anchor_index: 7 });
        });

        it('単独で選ばれている行をもう一度押すと解除する', () => {
            expect(calc_selection(state([4], 4), 4, NONE))
                .toEqual({ selection: [], anchor_index: null });
        });

        it('複数選択中に選択済みの行を押しても解除ではなく単独選択にする', () => {
            expect(calc_selection(state([2, 4], 2), 4, NONE))
                .toEqual({ selection: [4], anchor_index: 4 });
        });
    });

    describe('Ctrl + クリック', () => {
        it('選択に追加する', () => {
            expect(calc_selection(state([1], 1), 3, CTRL))
                .toEqual({ selection: [1, 3], anchor_index: 3 });
        });

        it('選択済みなら解除する', () => {
            expect(calc_selection(state([1, 3], 1), 3, CTRL))
                .toEqual({ selection: [1], anchor_index: 3 });
        });

        it('2行を超えて選択できる', () => {
            let s: SelectionState = EMPTY_SELECTION;
            for (const i of [0, 1, 2, 3, 4]) s = calc_selection(s, i, CTRL);

            expect(s.selection).toEqual([0, 1, 2, 3, 4]);
        });
    });

    describe('Shift + クリック', () => {
        it('起点から対象までを範囲選択する', () => {
            expect(calc_selection(state([2], 2), 5, SHIFT).selection)
                .toEqual([2, 3, 4, 5]);
        });

        it('起点より上でも範囲選択する', () => {
            expect(calc_selection(state([5], 5), 2, SHIFT).selection)
                .toEqual([2, 3, 4, 5]);
        });

        it('起点を動かさない', () => {
            expect(calc_selection(state([2], 2), 5, SHIFT).anchor_index).toBe(2);
        });

        it('範囲を広げ直せる', () => {
            const first = calc_selection(state([2], 2), 5, SHIFT);
            expect(calc_selection(first, 3, SHIFT).selection).toEqual([2, 3]);
        });

        it('起点と同じ行なら1行だけ選ぶ', () => {
            expect(calc_selection(state([2], 2), 2, SHIFT).selection).toEqual([2]);
        });

        it('起点がなければ単独選択として扱う', () => {
            expect(calc_selection(EMPTY_SELECTION, 4, SHIFT))
                .toEqual({ selection: [4], anchor_index: 4 });
        });
    });

    it('入力を破壊しない', () => {
        const original = state([1, 2], 1);
        const snapshot = structuredClone(original);

        calc_selection(original, 5, CTRL);

        expect(original).toEqual(snapshot);
    });
});

describe('clamp_selection', () => {
    it('行数を超えた選択を落とす', () => {
        expect(clamp_selection(state([1, 5, 9], 5), 6).selection).toEqual([1, 5]);
    });

    it('範囲外になった起点を null にする', () => {
        expect(clamp_selection(state([1], 9), 6).anchor_index).toBeNull();
    });

    it('範囲内の起点は残す', () => {
        expect(clamp_selection(state([1], 2), 6).anchor_index).toBe(2);
    });
});

describe('sorted_selection', () => {
    it('選択順ではなく行の並び順で返す', () => {
        expect(sorted_selection(state([5, 1, 3]))).toEqual([1, 3, 5]);
    });

    it('入力を破壊しない', () => {
        const s = state([5, 1, 3]);
        sorted_selection(s);

        expect(s.selection).toEqual([5, 1, 3]);
    });
});

describe('can_show_diff', () => {
    it('2行選択のときだけ真', () => {
        expect(can_show_diff(state([1, 2]))).toBe(true);
        expect(can_show_diff(state([1]))).toBe(false);
        expect(can_show_diff(state([1, 2, 3]))).toBe(false);
        expect(can_show_diff(state([]))).toBe(false);
    });
});
