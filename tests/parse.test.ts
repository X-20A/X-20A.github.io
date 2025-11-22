import { describe, expect, it } from "vitest";
import { parse_abnormal_value } from "../src/logics/extract";

describe('parse_abnormal_value', () => {
    it('正常な数値をパースする', () => {
        expect(parse_abnormal_value('123')).toBe(123);
        expect(parse_abnormal_value('45.67')).toBe(45.67);
        expect(parse_abnormal_value('-89.1')).toBe(-89.1);
    });

    it('NaN/Undefined/Null を 0 に変換する', () => {
        expect(parse_abnormal_value('nan')).toBe(0);
        expect(parse_abnormal_value('NaN')).toBe(0);
        expect(parse_abnormal_value('undefined')).toBe(0);
        expect(parse_abnormal_value('null')).toBe(0);
        expect(parse_abnormal_value('Null')).toBe(0);
    });

    it('無限大を適切な値に変換する', () => {
        expect(parse_abnormal_value('infinite')).toBe(99999);
        expect(parse_abnormal_value('infinity')).toBe(99999);
        expect(parse_abnormal_value('+infinity')).toBe(99999);
        expect(parse_abnormal_value('-infinite')).toBe(-99999);
        expect(parse_abnormal_value('-infinity')).toBe(-99999);
    });

    it('パース不能な文字列を 0 に変換する', () => {
        expect(parse_abnormal_value('abc')).toBe(0);
        expect(parse_abnormal_value('123abc')).toBe(0);
        expect(parse_abnormal_value('')).toBe(0);
    });

    it('前後の空白をトリムする', () => {
        expect(parse_abnormal_value('  123  ')).toBe(123);
        expect(parse_abnormal_value('  INFINITY  ')).toBe(99999);
    });
});