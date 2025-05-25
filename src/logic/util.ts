/**
 * 存在チェック & 数値型、ないし文字列型の数字ならtrue    
 * 全角はfalse
 * @param value なんでもどうぞ
 * @returns 
 */
export function isExistsAndNumber(value: unknown): boolean {
    if (typeof value === 'number') {
        return true;
    }
    if (typeof value === 'string') {
        // 全角数字をチェック
        if (/[０-９]/.test(value)) {
            return false;
        }
        // 文字列が数値に変換可能かチェック
        return !Number.isNaN(Number(value)) && !Number.isNaN(Number.parseFloat(value));
    }
    return false;
}

/**
 * 指定したDateオブジェクトまたは現在時刻を「HHmm」形式（例: 0930, 1745）の文字列で返す    
 * 時・分が1桁の場合は先頭に0を付与する
 * @param date 日付オブジェクト
 * @returns フォーマット済み時刻文字列
 */
export function getZeroFilledTime(date: Date): string {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // 二桁の形式に変換
    const filled_hours = hours < 10 ? '0' + hours : hours;
    const filled_minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${filled_hours}${filled_minutes}`;
}

/**
 * 指定した文字列をHTMLエスケープし、無害化した新しい文字列を返す
 * @param input エスケープ対象の文字列
 * @returns エスケープ済み文字列
 */
export function sanitizeText(input: string): string {
    const escape_map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };
    return input.replace(/[&<>"']/g, (char: string) => escape_map[char]);
}