export function is_special_resource_node(
    areaId: string,
    node: string,
): boolean {
    return areaId === '7-4' && node === 'O';
}

/**
 * 文字列配列を「 | 」区切りで展開し、指定位置で<br>改行する。
 * @param {string[]} names - クラフト名の配列
 * @param {number} [breakIndex=6] - 改行するインデックス（デフォルト: 6）
 * @returns {string} 整形済みクラフト名リスト（HTML）
 */
export function calc_formated_craft_names(
    names: ReadonlyArray<string>,
    breakIndex = 6
): string {
    if (!Array.isArray(names)) return '';
    const first = names.slice(0, breakIndex).join(' | ');
    const rest = names.slice(breakIndex).join(' | ');
    return rest ? `${first} |<br>${rest}` : first;
}