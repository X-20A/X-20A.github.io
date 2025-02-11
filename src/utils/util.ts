/**
 * 存在チェック & 数値型、ないし文字列型の数字ならtrue    
 * 全角はfalse
 * @param value なんでもどうぞ
 * @returns 
 */
export function isNumber(value: unknown): boolean {
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

export function generateFormatedTime() {
    const now = new Date();
    let hours: number | string = now.getHours();
    let minutes: number | string = now.getMinutes();
    // 二桁の形式に変換
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}${minutes}`;
}

/**
 * html文字列を無害化して返す
 * @param input 
 * @returns 
 */
export function sanitizeText(input: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
    };

    return input.replace(/[&<>"']/g, (char) => map[char]);
}

export function getParam(name: string, url = location.href): string | null {
    const params = new URLSearchParams(new URL(url).search);
    return params.get(name);
}

export function deleteParam(): void {
    const url = new URL(window.location.href);
    url.search = "";
    history.replaceState(null, "", url.toString());
}
