/**
 * 存在チェック & 数値型、ないし文字列型の数字ならtrue    
 * 全角はfalse
 * @param value なんでもどうぞ
 * @returns 
 */
export function isNumber(value: any): boolean {
	return !Number.isNaN(parseInt(value));
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