import CustomError from "../errors/CustomError";
import {
    object,
    number,
    optional,
    string,
    record,
    union,
    literal,
    parse,
    safeParse
} from "valibot";
import type DeckBuilder from "../types/DeckBuilder";
import type { OptionsType, SelectedType, AreaId } from "../types";

/**
 * DeckBuilderItem型のvalibotスキーマ定義
 */
const deck_builder_item_schema = object({
    id: number(),
    rf: optional(number()),
    mas: optional(number()),
});

/**
 * DeckBuilderShip型のvalibotスキーマ定義
 */
const deck_builder_ship_schema = object({
    id: number(),
    lv: number(),
    luck: number(),
    hp: optional(number()),
    fp: optional(number()),
    tp: optional(number()),
    aa: optional(number()),
    ar: optional(number()),
    asw: optional(number()),
    ev: optional(number()),
    los: optional(number()),
    exa: optional(union([literal(true), literal(false)])),
    items: record(string(), deck_builder_item_schema),
});

/**
 * DeckBuilderFleet型のvalibotスキーマ定義
 */
const deck_builder_fleet_schema = object({
    name: optional(string()),
    t: optional(number()),
    s1: optional(deck_builder_ship_schema),
    s2: optional(deck_builder_ship_schema),
    s3: optional(deck_builder_ship_schema),
    s4: optional(deck_builder_ship_schema),
    s5: optional(deck_builder_ship_schema),
    s6: optional(deck_builder_ship_schema),
    s7: optional(deck_builder_ship_schema),
});

/**
 * DeckBuilder型のvalibotスキーマ定義
 */
export const deck_builder_schema = object({
    version: number(),
    hqlv: optional(number()),
    lang: optional(union([
        literal('jp'),
        literal('en'),
        literal('kr'),
        literal('scn'),
        literal('tcn'),
    ])),
    theme: optional(union([
        literal('dark'),
        literal('dark-ex'),
        literal('light'),
        literal('light-ex'),
        literal('white'),
        literal('74lc'),
        literal('74mc'),
        literal('74sb'),
        literal('official'),
    ])),
    f1: optional(deck_builder_fleet_schema),
    f2: optional(deck_builder_fleet_schema),
    f3: optional(deck_builder_fleet_schema),
    f4: optional(deck_builder_fleet_schema),
});

/**
 * 文字列がDeckBuilderとして有効か検証する関数
 * @param input 入力文字列
 * @returns DeckBuilderとして有効な場合true、無効な場合false
 */
export function is_valid_DeckBuilder_String(input: string): boolean {
    try {
        const parsed = JSON.parse(input);
        parse(deck_builder_schema, parsed);
        return true;
    } catch {
        return false;
    }
}

/**
 * 任意の値を再帰的に走査し、number型であるべき値がstringの場合は数値変換する（副作用なし）
 * @param value 任意の値
 * @returns number型に変換された値
 */
const recursively_convert_String_to_Number = (
    value: unknown,
): unknown => {
    if (Array.isArray(value)) {
        return value.map(recursively_convert_String_to_Number);
    }
    if (value !== null && typeof value === "object") {
        const result: Record<string, unknown> = {};
        for (const [key, val] of Object.entries(value)) {
            // DeckBuilderのスキーマでnumber型であるべきプロパティ名
            const number_keys = [
                "id", "rf", "mas", "lv", "luck", "hp", "fp", "tp", "aa", "ar", "asw", "ev", "los", "t", "version", "hqlv"
            ];
            if (number_keys.includes(key) && typeof val === "string" && /^-?\d+(\.\d+)?$/.test(val)) {
                result[key] = Number(val);
            } else {
                result[key] = recursively_convert_String_to_Number(val);
            }
        }
        return result;
    }
    return value;
}

/**
 * 文字列をDeckBuilderとしてパースし、失敗時はエラーを投げる関数
 * @param input 入力文字列
 * @returns DeckBuilderオブジェクト
 * @throws パースまたはバリデーション失敗時
 */
export function parse_DeckBuilder_String(input: string): DeckBuilder {
    try {
        const json = JSON.parse(input);
        const normalized = recursively_convert_String_to_Number(json);
        return parse(deck_builder_schema, normalized) as DeckBuilder;
    } catch (e) {
        console.error(e);
        throw new CustomError('デッキビルダーの形式に誤りがあります');
    }
}

/**
 * SelectedTypeのvalibotバリデーションスキーマ
 */
export const selected_type_schema = union([
    literal(1),
    literal(2),
    literal(3),
    literal(4),
    literal(5),
    literal(6),
    literal(7),
]);

/**
 * 入力値をSelectedTypeとしてパースする関数
 * @param input 入力値
 * @returns SelectedType
 * @throws 入力値がSelectedType型でない場合
 */
export function parseSelectedType(input: number): SelectedType {
    try {
        return parse(selected_type_schema, input) as SelectedType;
    } catch (e) {
        console.error(e);
        throw new CustomError('艦隊形式IDの入力に誤りがあります');
    }
}

/**
 * AreaId型のvalibotバリデーションスキーマ
 */
export const area_id_schema = union([
    literal('1-1'), literal('1-2'), literal('1-3'), literal('1-4'), literal('1-5'), literal('1-6'),
    literal('2-1'), literal('2-2'), literal('2-3'), literal('2-4'), literal('2-5'),
    literal('3-1'), literal('3-2'), literal('3-3'), literal('3-4'), literal('3-5'),
    literal('4-1'), literal('4-2'), literal('4-3'), literal('4-4'), literal('4-5'),
    literal('5-1'), literal('5-2'), literal('5-3'), literal('5-4'), literal('5-5'),
    literal('6-1'), literal('6-2'), literal('6-3'), literal('6-4'), literal('6-5'),
    literal('7-1'), literal('7-2'), literal('7-3'), literal('7-4'), literal('7-5'),
    literal('57-7'),
    literal('58-1'), literal('58-2'), literal('58-3'), literal('58-4'),
    literal('59-1'), literal('59-2'), literal('59-3'), literal('59-4'), literal('59-5'),
    literal('60-1'), literal('60-2'), literal('60-3'), literal('60-4'), literal('60-5'), literal('60-6'),
    literal('61-1'), literal('61-2'), literal('61-3'), literal('61-4'), //literal('61-5'),
]); // @expansion

/**
 * AreaId値を検証・パースする関数
 * @param input AreaId候補の文字列
 * @returns AreaId型の値
 * @throws 入力値がAreaId型でない場合
 */
export function parseAreaId(input: string): AreaId {
    try {
        return parse(area_id_schema, input) as AreaId;
    } catch (e) {
        console.error(e);
        throw new CustomError('AreaIdの入力に誤りがあります');
    }
}

/**
 * 任意の値をOptionsTypeとしてパースし、失敗時はundefinedを返す
 * Partial<Record<AreaId, Record<string, string>>> 型の安全な検証
 * @param input - 任意の値
 * @returns OptionsType | undefined
 */
export function parseOptionsType(input: unknown): OptionsType | undefined {
    const schema = optional(record(area_id_schema, record(string(), string())));
    if (typeof input !== 'object' || input === null) return undefined;
    const result = safeParse(schema, input);
    if (result.success) {
        return result.output as OptionsType;
    } else {
        console.error(result.issues);
        return undefined;
    }
}