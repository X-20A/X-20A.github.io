import { OptionsType } from '@/classes/types'

export default class Const {
    /**
     * 大発動艇,    
	 * 大発動艇(八九式中戦車&陸戦隊),    
	 * 特に式内火艇, 特大発動艇, 装甲艇(AB艇),    
	 * 武装大発, 大発動艇(II号戦車/北アフリカ仕様),    
	 * 特大発動艇+一式砲戦車,    
	 * 特四式内火艇,    
	 * 特四式内火艇改
     */
    public static readonly VALID_CRAFTS =
        Object.freeze([68, 166, 167, 193, 408, 409, 436, 449, 525, 526]);

    /**
     * X-20AリポジトリのAPIエンドポイント
     * raw.githubusercontent.comでも変わらず
     */
    // public static readonly CDN = 'https://cdn.jsdelivr.net/gh/X-20A/X-20A.github.io@main';

    /**
     * オプションの初期値
     */
    public static readonly OPTIONS: OptionsType = {
        '4-5': { 'A': 'D', 'C': 'F', 'I': 'J' },
        '5-3': { 'O': 'K' },
        '5-5': { 'F': 'D' },
        '6-3': { 'A': 'B' },
        '7-3': { 'phase': '1' },
        '7-4': { 'F': 'H' },
        '7-5': { 'F': 'G', 'H': 'I', 'O': 'P' },
        '57-7': { 'phase': '1', 'A2': 'A3', 'B': 'B1', 'B2': 'B3', 'C': 'A3', 'J': 'K' },
        '58-1': { 'phase': '1', 'A': 'D', 'I': 'N1', 'F': 'G' },
        '58-2': { 'phase': '1', 'difficulty': '4', 'B': 'E' },
        '58-3': { 'phase': '1', 'difficulty': '4', 'M': 'P' },
        '58-4': { 'phase': '1', 'difficulty': '4', 'tag': '0', 'B': 'D' },
        '59-1': { 'phase': '1', 'C': 'C1', 'E': 'F' },
        '59-2': { 'L': 'M', 'N': 'O', 'P': 'Q' },
        '59-3': { 'phase': '1', 'C': 'C1' },
        '59-4': { 'phase': '1', 'A2': 'B', 'D': 'E' },
        '59-5': { 'phase': '1', 'G': 'H', 'O2': 'P', 'W': 'Z' }
    };
}