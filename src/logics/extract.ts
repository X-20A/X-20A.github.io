import { optional } from "valibot";
import { RowData } from "../types";

/**
 * 数値以外の値を数値にして返す
 * @param value
 * @returns
 */
export function parse_abnormal_value(value: string): number {
    const trimmed = value.trim().toLowerCase();

    if (trimmed === 'nan' || trimmed === 'undefined' || trimmed === 'null') {
        return 0;
    }

    if (trimmed === 'infinite' || trimmed === 'infinity' || trimmed === '+infinity') {
        return 999999;
    }

    if (trimmed === '-infinite' || trimmed === '-infinity') {
        return -999999;
    }

    // 数値のみの文字列かどうかをチェック
    // 先頭に符号（+-）があり、その後数字、そして小数点と数字が続くパターン
    const numericRegex = /^[-+]?(\d+(\.\d*)?|\.\d+)$/;

    if (!numericRegex.test(trimmed)) {
        return 0;
    }

    const num = parseFloat(trimmed);
    return isNaN(num) ? 0 : num;
}

/** 取り込み対象の資源フィールド定義。ラベルは日英を並べる */
type ResourceField = {
    key: 'fuel' | 'ammo' | 'steel' | 'baux' | 'bucket' | 'damecon' | 'underway_replenishment',
    /** 通知に出す代表ラベル */
    label: string,
    /** シミュ出力に現れる日英ラベル */
    aliases: string[],
    /**
     * 未取得の通知に含めない項目。
     * 洋上補給はシミュ出力に無いことが多く、既定で警告を出すと誤検知になる
     */
    optional?: boolean,
};

const RESOURCE_FIELDS: ResourceField[] = [
    { key: 'fuel', label: '燃料', aliases: ['燃料', 'Fuel'] },
    { key: 'ammo', label: '弾薬', aliases: ['弾薬', 'Ammo'] },
    { key: 'steel', label: '鋼材', aliases: ['鋼材', 'Steel'] },
    { key: 'baux', label: 'ボーキ', aliases: ['ボーキ', 'Bauxite'] },
    { key: 'bucket', label: 'バケツ', aliases: ['バケツ', 'Buckets', 'Bucket'] },
    {
        key: 'damecon',
        label: 'ダメコン',
        aliases: ['ダメコン', 'Repair Teams'],
        optional: true,
    },
    {
        key: 'underway_replenishment',
        label: '洋上補給',
        aliases: ['洋上補給', 'Underway Replenishment'],
        optional: true,
    },
];

/** ラベル群から「ラベル: 値」を拾う正規表現を作る。区切りは全角/半角コロン・タブ・空白を許容 */
function build_resource_regex(aliases: string[]): RegExp {
    return new RegExp(`(?:${aliases.join('|')})\\s*[:：]\\s*(\\S+)`, 'i');
}

const RATE_LABEL = '撃沈率';

/**
 * 条件率の行から百分率を1つ取り出す。
 *
 * 率の行には百分率が2つある（例: `旗艦撃沈率: 7.4% (撤退率: 25.6%, ...)`）。
 * 括弧より前だけを対象にすることで、撤退率(Retreat) や S以外(non-S) を構造的に
 * 除外する。日本語「〈条件〉率」・英語「〈condition〉 Rate」のどちらも1つの規則で拾える。
 */
function extract_rate(line: string): number | null {
    const head = line.split('(')[0];
    const match = head.match(/(?:率|Rate)\s*[:：]\s*([\d.]+)\s*%/i);
    if (!match) return null;

    const value = parseFloat(match[1]);
    return isNaN(value) ? null : value;
}

export type ExtractReport = {
    /** 抽出結果を反映した行データ */
    row_data: RowData,
    /** 読み取れた項目の代表ラベル */
    matched: string[],
    /** 期待されるのに読み取れなかった項目（任意項目・URL は含めない） */
    missed: string[],
};

/**
 * 入力テキストからデータを抽出し、何が取れて何が取れなかったかを添えて返す。
 * 例外は投げない。呼び出し側が matched / missed を見て UX を決める
 */
export function extract_report(text: string, row_data: RowData): ExtractReport {
    const lines = text.split('\n');
    const result: RowData = { ...row_data };
    const matched = new Set<string>();

    // 率（先に見つかった行を採用する）
    for (const line of lines) {
        const rate = extract_rate(line);
        if (rate !== null) {
            result.rate = rate;
            matched.add(RATE_LABEL);
            break;
        }
    }

    // URL
    for (const line of lines) {
        const match = line.match(/(https?:\/\/[^\s]+)/);
        if (match) {
            result.url = match[1];
            matched.add('URL');
            break;
        }
    }

    // 資源
    for (const field of RESOURCE_FIELDS) {
        const regex = build_resource_regex(field.aliases);
        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                result[field.key] = parse_abnormal_value(match[1]);
                matched.add(field.label);
                break;
            }
        }
    }

    const missed: string[] = [];
    if (!matched.has(RATE_LABEL)) missed.push(RATE_LABEL);
    for (const field of RESOURCE_FIELDS) {
        if (!field.optional && !matched.has(field.label)) missed.push(field.label);
    }

    return { row_data: result, matched: [...matched], missed };
}

/**
 * 入力テキストからデータを抽出して返す。
 * 1件も読み取れなかった場合は例外を投げる
 * @throws Error テキストからリソースデータを抽出できなかった場合
 */
export function extract_data_from_text(
    text: string,
    row_data: RowData,
): RowData {
    const report = extract_report(text, row_data);

    if (report.matched.length === 0) {
        throw new Error("テキストからリソースデータを抽出できませんでした");
    }

    return report.row_data;
}
