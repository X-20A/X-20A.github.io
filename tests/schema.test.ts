import { describe, expect, it } from "vitest";
import { parse } from "valibot";
import { RowDataSchema, SheetSchema } from "../src/logics/schema";

/**
 * count / rate セルが文字列で保存された旧シートを、corrupted 化させず数値へ
 * 復元できること(自己修復)を担保する。ここが崩れると既存ユーザーのデータが
 * ロード時に空へ差し替わる
 */
describe('RowDataSchema の数値自己修復', () => {
    it('文字列の数値を number へ復元する', () => {
        const parsed = parse(RowDataSchema, {
            row_name: '',
            url: '',
            multiplier: '3',
            rate: '7.4',
            fuel: '20073.243',
            ammo: 0,
            steel: 0,
            baux: 0,
            bucket: 0,
            damecon: 0,
            underway_replenishment: 0,
        });

        expect(parsed.multiplier).toBe(3);
        expect(parsed.rate).toBe(7.4);
        expect(parsed.fuel).toBe(20073.243);
    });

    it('空文字・パース不能・非有限値を 0 に倒す', () => {
        const parsed = parse(RowDataSchema, {
            row_name: '',
            url: '',
            multiplier: '',
            rate: 'abc',
            fuel: 'Infinity',
            ammo: 0,
            steel: 0,
            baux: 0,
            bucket: 0,
            damecon: 0,
            underway_replenishment: 0,
        });

        expect(parsed.multiplier).toBe(0);
        expect(parsed.rate).toBe(0);
        expect(parsed.fuel).toBe(0);
    });

    it('通常の number はそのまま通る', () => {
        const parsed = parse(RowDataSchema, {
            row_name: 'x',
            url: '',
            multiplier: 2,
            rate: 5,
            fuel: 100,
            ammo: 0,
            steel: 0,
            baux: 0,
            bucket: 0,
            damecon: 0,
            underway_replenishment: 0,
        });

        expect(parsed.multiplier).toBe(2);
        expect(parsed.fuel).toBe(100);
    });
});

describe('SheetSchema が文字列混じりの行を復元する', () => {
    it('文字列 multiplier を含むシートがロードできる', () => {
        const parsed = parse(SheetSchema, {
            id: 'sheet-1',
            updated_at: 0,
            row_datas: [
                {
                    row_name: '', url: '', multiplier: '3', rate: '0',
                    fuel: '10', ammo: 0, steel: 0, baux: 0, bucket: 0,
                    damecon: 0, underway_replenishment: 0,
                },
            ],
        });

        expect(parsed.row_datas[0].multiplier).toBe(3);
        expect(parsed.row_datas[0].fuel).toBe(10);
    });
});
