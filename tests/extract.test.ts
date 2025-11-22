// extract_data_from_text.test.ts
import { describe, it, expect } from 'vitest';
import { extract_data_from_text } from '../src/logics/extract';
import { DataComponent } from '../src/types';

describe('extract_data_from_text', () => {
    it('通常のテキストからデータを正しく抽出する', () => {
        const text = `
旗艦撃沈率: 2.5% (撤退率: 67.7%, 旗艦撃沈以外: 29.8%)
旗艦撃沈あたり
燃料: 85286.579
弾薬: 84482.052
鋼材: 42943.833
ボーキ: 15982.5
バケツ: 178.746
ダメコン: 6.258
洋上補給: 12.345
    `;

        const expected: DataComponent = {
            row_name: "",
            fuel: 85286.579,
            ammo: 84482.052,
            steel: 42943.833,
            baux: 15982.5,
            bucket: 178.746,
            damecon: 6.258,
            underway_replenishment: 12.345
        };

        const result = extract_data_from_text(text);
        expect(result).toEqual(expected);
    });

    it('コロンと値の間に空白がない場合も抽出できる', () => {
        const text = `
燃料:85286.579
弾薬:84482.052
鋼材:42943.833
ボーキ:15982.5
バケツ:178.746
ダメコン:6.258
洋上補給:12.345
    `;

        const result = extract_data_from_text(text);
        expect(result.fuel).toBe(85286.579);
        expect(result.ammo).toBe(84482.052);
    });

    it('タブ区切りのテキストからも抽出できる', () => {
        const text = `
燃料:	85286.579
弾薬:	84482.052
鋼材:	42943.833
ボーキ:	15982.5
バケツ:	178.746
ダメコン:	6.258
洋上補給:	12.345
    `;

        const result = extract_data_from_text(text);
        expect(result.fuel).toBe(85286.579);
        expect(result.ammo).toBe(84482.052);
    });

    it('異常値を含むテキストを正しく処理する', () => {
        const text = `
燃料: nan
弾薬: infinite
鋼材: -infinity
ボーキ: undefined
バケツ: null
ダメコン: 6.258
洋上補給: abc
    `;

        const expected: DataComponent = {
            row_name: "",
            fuel: 0,
            ammo: 99999,
            steel: -99999,
            baux: 0,
            bucket: 0,
            damecon: 6.258,
            underway_replenishment: 0
        };

        const result = extract_data_from_text(text);
        expect(result).toEqual(expected);
    });

    it('部分的なデータがあれば抽出できる', () => {
        const text = `
燃料: 100
弾薬: 200
鋼材: 300
ボーキ: 400
    `;

        const result = extract_data_from_text(text);
        expect(result.fuel).toBe(100);
        expect(result.ammo).toBe(200);
        expect(result.steel).toBe(300);
        expect(result.baux).toBe(400);
        expect(result.bucket).toBe(0); // 指定がない項目はデフォルト値
        expect(result.damecon).toBe(0);
        expect(result.underway_replenishment).toBe(0);
    });

    it('データが見つからない場合はエラーをスローする', () => {
        const text = `このテキストにはリソースデータが含まれていません`;

        expect(() => extract_data_from_text(text)).toThrow(
            'テキストからリソースデータを抽出できませんでした'
        );
    });

    it('空のテキストでエラーをスローする', () => {
        expect(() => extract_data_from_text('')).toThrow(
            'テキストからリソースデータを抽出できませんでした'
        );
    });

    it('複数行にまたがるデータを正しく抽出する', () => {
        const text = `
その他の情報...
燃料: 100
続く情報...
弾薬: 200
鋼材: 300
ボーキ: 400
バケツ: 500
ダメコン: 600
洋上補給: 700
最終行
    `;

        const result = extract_data_from_text(text);
        expect(result.fuel).toBe(100);
        expect(result.ammo).toBe(200);
        expect(result.steel).toBe(300);
        expect(result.baux).toBe(400);
        expect(result.bucket).toBe(500);
        expect(result.damecon).toBe(600);
        expect(result.underway_replenishment).toBe(700);
    });
});