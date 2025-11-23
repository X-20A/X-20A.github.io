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

/**
 * 入力テキストからデータを抽出して返す
 * @param text 
 * @returns 
 */
export function extract_data_from_text(
    text: string,
    current_data: RowData,
): RowData {
    const lines = text.split('\n');

    // TODO: 抽出とマージを分離する
    const result: RowData = {
        row_name: current_data.row_name,
        multiplier: current_data.multiplier,
        fuel: current_data.fuel,
        ammo: current_data.ammo,
        steel: current_data.steel,
        baux: current_data.baux,
        bucket: current_data.bucket,
        damecon: current_data.damecon,
        underway_replenishment: current_data.underway_replenishment,
    };

    const patterns = [
        {
            regex: /(?:燃料|Fuel):\s*(\S+)/i,
            setter: (val: string) => result.fuel = parse_abnormal_value(val)
        },
        {
            regex: /(?:弾薬|Ammo):\s*(\S+)/i,
            setter: (val: string) => result.ammo = parse_abnormal_value(val)
        },
        {
            regex: /(?:鋼材|Steel):\s*(\S+)/i,
            setter: (val: string) => result.steel = parse_abnormal_value(val)
        },
        {
            regex: /(?:ボーキ|Bauxite):\s*(\S+)/i,
            setter: (val: string) => result.baux = parse_abnormal_value(val)
        },
        {
            regex: /(?:バケツ|Buckets):\s*(\S+)/i,
            setter: (val: string) => result.bucket = parse_abnormal_value(val)
        },
        {
            regex: /(?:ダメコン|Repair Teams):\s*(\S+)/i,
            setter: (val: string) => result.damecon = parse_abnormal_value(val)
        },
        {
            regex: /(?:洋上補給|Underway Replenishment):\s*(\S+)/i,
            setter: (val: string) => result.underway_replenishment = parse_abnormal_value(val)
        },
    ] as const;

    let matchFound = false;

    for (const line of lines) {
        for (const pattern of patterns) {
            const match = line.match(pattern.regex);
            if (match) {
                pattern.setter(match[1]);
                matchFound = true;
            }
        }
    }

    if (!matchFound) {
        throw new Error("テキストからリソースデータを抽出できませんでした");
    }

    return result;
}