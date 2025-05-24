import type { OptionsType } from '@/models/types'

/**
 * 定数系    
 * ※横断的なもののみ
 */
export default class Const {

    static readonly VALID_CRAFT_NAMES: ReadonlyArray<string> =
        [
            '大発動艇',
            '大発動艇(八九式中戦車&陸戦隊)',
            '特二式内火艇',
            '特大発動艇',
            '装甲艇(AB艇)',
            '武装大発',
            '大発動艇(II号戦車/北アフリカ仕様)',
            '特大発動艇+一式砲戦車',
            '特四式内火艇',
            '特四式内火艇改',
        ];

    /**
     * getterからコピーを取得できる
     */
    private static readonly _OPTIONS = {
        '4-5': { 'A': 'D', 'C': 'F', 'I': 'J' },
        '5-3': { 'O': 'K' },
        '5-5': { 'F': 'D' },
        '6-3': { 'A': 'B' },
        '7-3': { 'phase': '1' },
        '7-4': { 'F': 'H' },
        '7-5': { 'F': 'G', 'H': 'I', 'O': 'P' },
        '57-7': { 'phase': '1', 'A2': 'A3', 'B2': 'B3', 'C': 'A3', 'J': 'K' },
        '58-1': { 'phase': '1', 'A': 'D', 'I': 'N1', 'F': 'G' },
        '58-2': { 'phase': '1', 'difficulty': '4', 'B': 'E' },
        '58-3': { 'phase': '1', 'difficulty': '4', 'M': 'P' },
        '58-4': { 'phase': '1', 'difficulty': '4', 'tag': '0', 'B': 'D' },
        '59-1': { 'phase': '1', 'C': 'C1', 'E': 'F' },
        '59-2': { 'L': 'M', 'N': 'O', 'P': 'Q' },
        '59-3': { 'phase': '1', 'C': 'C1' },
        '59-4': { 'phase': '1', 'A2': 'B', 'D': 'E' },
        '59-5': { 'phase': '1', 'G': 'H', 'O2': 'P', 'W': 'Z' },
        '60-1': { 'phase': '1', 'is_third': '0', 'A': 'B' },
        '60-2': { 'phase': '1', 'B': 'C', 'E': 'F', 'N': 'O' },
        '60-3': { 'phase': '1', 'difficulty': '4', 'A': 'B', 'C': 'D', 'H': 'H1', 'M': 'M1', 'S': 'S1' },
        '60-4': { 'phase': '1', 'A': 'B', 'F': 'F1', 'G': 'G1' },
        '60-5': { 'phase': '1', 'difficulty': '4', 'B': 'B1', 'D': 'D1' },
        '60-6': { 'phase': '1', 'difficulty': '4', 'G': 'J', 'K': 'J3', 'R': 'S' },
    } as OptionsType;  // @expansion

    /**
     * オプションの初期値
     */
    static get OPTIONS() {
        return structuredClone(Const._OPTIONS);
    }
}