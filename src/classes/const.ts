import type { OptionsType } from '@/classes/types'

/**
 * オブジェクト内部まで再帰的にフリーズして返す
 * @param obj 
 * @returns 
 */
const deepFreeze = <T>(obj: T): T => {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    Object.freeze(obj);  // オブジェクト自体を凍結

    // オブジェクトの各プロパティも再帰的に凍結
    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === 'object') {
            deepFreeze(value);  // 再帰的に凍結
        }
    }
    return obj;
};
const Const = {
    /**
     * 68 : 大発動艇,    
	 * 166: 大発動艇(八九式中戦車&陸戦隊),    
	 * 167: 特大発動艇,     
     * 193: 特大発動艇,    
     * 408: 装甲艇(AB艇),    
	 * 409: 武装大発,    
     * 436: 大発動艇(II号戦車/北アフリカ仕様),    
	 * 449: 特大発動艇+一式砲戦車,    
	 * 525: 特四式内火艇,    
	 * 526: 特四式内火艇改
     */
    VALID_CRAFTS: Object.freeze([68, 166, 167, 193, 408, 409, 436, 449, 525, 526]),

    /**
     * オプションの初期値
     */
    OPTIONS: deepFreeze({
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
        '59-5': { 'phase': '1', 'G': 'H', 'O2': 'P', 'W': 'Z' }
    }) as OptionsType,
} as const;

export default Const;