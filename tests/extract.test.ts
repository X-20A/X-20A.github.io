// extract_data_from_text.test.ts
import { describe, it, expect } from 'vitest';
import { INITIAL_ROW_DATA, RowData } from '../src/types';
import { extract_data_from_text, extract_report } from '../src/logics/extract';

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

        const expected: RowData = {
            row_name: "",
            url: "",
            multiplier: 1,
            rate: 2.5,
            fuel: 85286.579,
            ammo: 84482.052,
            steel: 42943.833,
            baux: 15982.5,
            bucket: 178.746,
            damecon: 6.258,
            underway_replenishment: 12.345
        };

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
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

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
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

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
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

        const expected: RowData = {
            row_name: "",
            url: "",
            multiplier: 1,
            rate: 0,
            fuel: 0,
            ammo: 999999,
            steel: -999999,
            baux: 0,
            bucket: 0,
            damecon: 6.258,
            underway_replenishment: 0
        };

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
        expect(result).toEqual(expected);
    });

    it('部分的なデータがあれば抽出できる', () => {
        const text = `
燃料: 100
弾薬: 200
鋼材: 300
ボーキ: 400
    `;

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
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

        expect(() => extract_data_from_text(text, INITIAL_ROW_DATA)).toThrow(
            'テキストからリソースデータを抽出できませんでした'
        );
    });

    it('空のテキストでエラーをスローする', () => {
        expect(() => extract_data_from_text('', INITIAL_ROW_DATA)).toThrow(
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

        const result = extract_data_from_text(text, INITIAL_ROW_DATA);
        expect(result.fuel).toBe(100);
        expect(result.ammo).toBe(200);
        expect(result.steel).toBe(300);
        expect(result.baux).toBe(400);
        expect(result.bucket).toBe(500);
        expect(result.damecon).toBe(600);
        expect(result.underway_replenishment).toBe(700);
    });
});

/** kc3kai 出撃シミュの実出力(タブ区切り)を固定データとして回帰させる */
describe('実サンプルからの抽出', () => {
    const JP_FLAGSHIP = `旗艦撃沈率: 7.4% (撤退率: 25.6%, 旗艦撃沈以外: 67%)
旗艦撃沈あたり
燃料:\t20073.243
弾薬:\t7583.81
鋼材:\t19451.408
ボーキ:\t9292.141
バケツ:\t83.684
ダメコン: 0.137`;

    const EN_FLAGSHIP = `Flagship Sunk Rate: 7.4% (Retreat: 25.6%, Flagship Not Sunk: 67%)
Avg Resource Per Flagship Sunk
Fuel:\t20073.243
Ammo:\t7583.81
Steel:\t19451.408
Bauxite:\t9292.141
Buckets:\t83.684
Repair Teams: 0.137`;

    const JP_S = `S率: 0.4% (撤退率: 25.6%, S以外: 74%)
S勝利あたり
燃料:\t411501.472
弾薬:\t155468.111
鋼材:\t398753.861
ボーキ:\t190488.889
バケツ:\t1715.528
ダメコン: 2.806`;

    const EN_S = `S Rate: 0.4% (Retreat: 25.6%, non-S: 74%)
Avg Resource Per S
Fuel:\t411501.472
Ammo:\t155468.111
Steel:\t398753.861
Bauxite:\t190488.889
Buckets:\t1715.528
Repair Teams: 2.806`;

    it('日本語・旗艦撃沈', () => {
        const r = extract_data_from_text(JP_FLAGSHIP, INITIAL_ROW_DATA);
        expect(r.rate).toBe(7.4);
        expect(r.fuel).toBe(20073.243);
        expect(r.ammo).toBe(7583.81);
        expect(r.steel).toBe(19451.408);
        expect(r.baux).toBe(9292.141);
        expect(r.bucket).toBe(83.684);
        expect(r.damecon).toBe(0.137);
    });

    it('英語・Flagship Sunk（英語ラベルでも rate を拾う）', () => {
        const r = extract_data_from_text(EN_FLAGSHIP, INITIAL_ROW_DATA);
        // 英語ラベルの rate 取りこぼしが最大の回帰リスク
        expect(r.rate).toBe(7.4);
        expect(r.fuel).toBe(20073.243);
        expect(r.damecon).toBe(0.137);
    });

    it('日本語・S率', () => {
        const r = extract_data_from_text(JP_S, INITIAL_ROW_DATA);
        expect(r.rate).toBe(0.4);
        expect(r.fuel).toBe(411501.472);
        expect(r.bucket).toBe(1715.528);
    });

    it('英語・S Rate', () => {
        const r = extract_data_from_text(EN_S, INITIAL_ROW_DATA);
        expect(r.rate).toBe(0.4);
        expect(r.fuel).toBe(411501.472);
    });

    it('撤退率 / Retreat を rate に取り込まない', () => {
        expect(extract_data_from_text(JP_FLAGSHIP, INITIAL_ROW_DATA).rate).toBe(7.4);
        expect(extract_data_from_text(EN_FLAGSHIP, INITIAL_ROW_DATA).rate).toBe(7.4);
    });

    it('洋上補給が無くても未取得に含めない（誤検知しない）', () => {
        const report = extract_report(JP_FLAGSHIP, INITIAL_ROW_DATA);
        expect(report.missed).toEqual([]);
    });
});

describe('extract_report', () => {
    it('1件も読み取れなければ matched が空', () => {
        const report = extract_report('ただの雑談テキスト', INITIAL_ROW_DATA);
        expect(report.matched).toEqual([]);
    });

    it('rate だけ欠けると missed に率が入る', () => {
        const text = `燃料: 100\n弾薬: 200\n鋼材: 300\nボーキ: 400\nバケツ: 5\nダメコン: 1`;
        const report = extract_report(text, INITIAL_ROW_DATA);
        expect(report.missed).toContain('撃沈率');
    });
});