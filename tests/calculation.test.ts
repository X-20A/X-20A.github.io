import { describe, expect, it } from "vitest";
import { calc_total_data, calc_diff_data } from "../src/logics/calculation";
import { INITIAL_ROW_DATA, RowData } from "../src/types";

const row = (over: Partial<RowData>): RowData => ({ ...INITIAL_ROW_DATA, ...over });

describe('calc_total_data', () => {
    it('multiplier を掛けて合計する', () => {
        const total = calc_total_data([
            row({ fuel: 100, multiplier: 2 }),
            row({ fuel: 50, multiplier: 1 }),
        ]);
        expect(total.fuel).toBe(250);
    });

    it('文字列の multiplier でも数値として扱う', () => {
        // v-model の取りこぼしで multiplier が文字列になっていても壊れない
        const total = calc_total_data([
            row({ fuel: 100, multiplier: '3' as unknown as number }),
        ]);
        expect(total.fuel).toBe(300);
    });

    it('空欄・非有限値を 0 として扱い NaN を伝播させない', () => {
        const total = calc_total_data([
            row({ fuel: '' as unknown as number, multiplier: 2 }),
            row({ fuel: 100, multiplier: '' as unknown as number }),
        ]);
        expect(Number.isNaN(total.fuel)).toBe(false);
        expect(total.fuel).toBe(0);
    });
});

describe('calc_diff_data', () => {
    it('下の行 − 上の行 を計算する', () => {
        const diff = calc_diff_data(
            row({ fuel: 100, rate: 5, multiplier: 1 }),
            row({ fuel: 250, rate: 8, multiplier: 1 }),
        );
        expect(diff.fuel).toBe(150);
        expect(diff.rate).toBe(3);
    });

    it('文字列の rate でも数値差分になる', () => {
        const diff = calc_diff_data(
            row({ rate: '4' as unknown as number }),
            row({ rate: '7.4' as unknown as number }),
        );
        expect(diff.rate).toBeCloseTo(3.4);
    });
});
