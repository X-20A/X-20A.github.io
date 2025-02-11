import AdoptFleet from "@/classes/AdoptFleet";
import { createCacheFleetsFromDeckBuilder } from "@/utils/deckBuilderUtil";
import type DeckBuilder from '@/classes/types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderItem,
    DeckBuilderShip
} from '@/classes/types/DeckBuilder';
import type { AreaId, FleetTypeId } from "@/classes/types";
import ship_datas from "@/data/ship";
import LZString from 'lz-string';
import equip_datas from "@/data/equip";



/**
 * テストする艦隊    
 * 制空シミュのデッキビルダー or 羅針盤シミュエクスポート をそのまま貼っ付ける
 */
const ac_export = `
https://x-20a.github.io/compass/?pdz=N4IgbgpgTgzglgewHYgFwBYA0IAWBHAGzDQEYAmABmwDMS1QkBDAWwjREBpvEwMyDAotJGwAXNFRAw6qUHAAmaAGwBOOdiJoFAdmwQAHozSCoAVwjY4giMxj0QcCVNmoAzHLLYo1EQF9TZazLTOriDuXqaOfg6OFJrBHqgUnt64AA5o6CTYjDAA7gEZIASGAMYA1qQAHEkwvpI2DnLlCirEqEpauvpGJjbmln52dWhkcvkh8UlwNfZpjk2xoTbhtf5O6jFjCUk4qU5YIFm5qCTpKsVlGAnYMEvTqC5zqq3l7XqoBsamvVbLAyvHc2M5BMpoNUOo9hsJjdQY51M95uMtjtHPCDqRHEFCqU0uoqugIgEFHtHgpRDpXu9umYLN8pL8HMNRnFLjYQSt0OV4WMAKxQgkYdRBSFIvKZHKkMgPM5obm8q7c-myxzNNRzcmdD49Gn9fmOEhcuLoYH8sjqZQIyphfkkbnrOIkUTMLJoXGmfHLBzoUluZnYJ3fV02BUe0gkc08ibaE3gn2kRLYbYu1Hiu6nbEXKpyRUUc0ktUdN5dT7an7Z2N3Y0h1Dc0SAvlVjFC30gf0uibu27OCHMyPR7txkV3fJo1MFaVOIFJahTKc3KcdxJAA
`;

export const getSimSet = () => {
    // めんどいので決めつけていく
    /*
    if (ac_export.includes('https://x-20a.github.io/compass/?pdz=')) {
        const compressed = ac_export.split('https://x-20a.github.io/compass/?pdz=')[1];
        ac_export = LZString.decompressFromEncodedURIComponent(compressed);
    }
    const deck = JSON.parse(ac_export) as DeckBuilder;
    const cache_fleets = createCacheFleetsFromDeckBuilder(deck);
    const fleet_type_id = deck!.f1!.t as FleetTypeId;
    const adoptFleet = new AdoptFleet(cache_fleets, fleet_type_id);*/

    const deck = generateRandomDeck();
    const cache_fleets = createCacheFleetsFromDeckBuilder(deck);
    const fleet_type_id = deck?.f1?.t as FleetTypeId;
    const adoptFleet = new AdoptFleet(cache_fleets, fleet_type_id);

    const areaIds: AreaId[] = [
        '1-1', '1-2', '1-3', '1-4', '1-5', '1-6',
        '2-1', '2-2', '2-3', '2-4', '2-5',
        '3-1', '3-2', '3-3', '3-4', '3-5',
        '4-1', '4-2', '4-3', '4-4', '4-5',
        '5-1', '5-2', '5-3', '5-4', '5-5',
        '6-1', '6-2', '6-3', '6-4', '6-5',
        '7-1', '7-2', '7-3', '7-4', '7-5',
        '57-7',
        '58-1', '58-2', '58-3', '58-4',
        '59-1', '59-2', '59-3', '59-4', '59-5'
    ];

    type MapKey = `${number}-${number}`; // '4-5' などのキー
    type PhaseKey = 'phase' | 'difficulty' | 'tag' | string; // 特定のキーを定義しつつ汎用性も持たせる
    type RouteMap = Record<PhaseKey, string[]>; // 各キーに対して行き先の配列を持つ
    type Options = Record<MapKey, RouteMap>; // マップキーと対応するルート情報

    const options: Options = {
        '4-5': { 'A': ['B','D'], 'C': ['D','F'], 'I': ['G','J'] },
        '5-3': { 'O': ['K','Q'] },
        '5-5': { 'F': ['D','J'] },
        '6-3': { 'A': ['B','C'] },
        '7-3': { 'phase': ['1','2'] },
        '7-4': { 'F': ['H','J'] },
        '7-5': { 'F': ['G','J'], 'H': ['I','K'], 'O': ['P','Q'] },
        '57-7': { 'phase': ['1','2','3','4','5','6','7'], 'A2': ['A3','B'], 'B2': ['B3','B4'], 'C': ['A3','C1'], 'J': ['K','L'] },
        '58-1': { 'phase': ['1', '2', '3'], 'A': ['B','D'], 'I': ['D','N1'], 'F': ['G','H'] },
        '58-2': { 'phase': ['1', '2', '3'], 'difficulty': ['1', '2', '3', '4'], 'B': ['C','E'] },
        '58-3': { 'phase': ['1', '2', '3'], 'difficulty': ['1', '2', '3', '4'], 'M': ['P','N'] },
        '58-4': { 'phase': ['1', '2', '3'], 'difficulty': ['1', '2', '3', '4'], 'tag': ['0', '1'], 'B': ['C','D'] },
        '59-1': { 'phase': ['1', '2', '3'], 'C': ['C1','C2'], 'E': ['F','G'] },
        '59-2': { 'L': ['M','N'], 'N': ['O','P'], 'P': ['Q','R'] },
        '59-3': { 'phase': ['1', '2', '3'], 'C': ['C1','C2'] },
        '59-4': { 'phase': ['1', '2'], 'A2': ['B','C'], 'D': ['E','F'] },
        '59-5': { 'phase': ['1', '2', '3'], 'G': ['H','I'], 'O2': ['P','Q'], 'W': ['X','Z'] }
    };

    return {
        adoptFleet: adoptFleet,
        areaIds: areaIds,
        options: options,
    }
};

const ship_ids = ship_datas.map(item => item.id);
const item_ids = equip_datas.map(item => item.id);

const generateRandomDeck = () => {
    const deck = {} as DeckBuilder;

    const fleet_type = Math.floor(Math.random() * 4); // 0 1 2 3
    if (fleet_type === 0) {
        deck.f1 = generateRandomFleetDeck(Math.floor(Math.random() * 7) + 1);
        deck.f1.t = fleet_type;
    } else {
        deck.f1 = generateRandomFleetDeck(Math.floor(Math.random() * 6) + 1);
        deck.f2 = generateRandomFleetDeck(Math.floor(Math.random() * 6) + 1);
        deck.f1.t = fleet_type;
    }

    return deck;
};

const generateRandomFleetDeck = (ship_length: number) => {
    const fleet = {} as DeckBuilderFleet;
    for (let i = 1; i <= ship_length; i++) {
        const random_ship_index = Math.floor(Math.random() * ship_ids.length);
        const ship_id = ship_ids[random_ship_index];
        const ship_lv = Math.floor(Math.random() * 180) + 1;

        const ship = {
            id: ship_id,
            lv: ship_lv,
        } as DeckBuilderShip;

        const item_length = Math.floor(Math.random() * 6) + 1;
        ship.items = {};
        for (let j = 1; j <= item_length; j++) {
            const random_item_index = Math.floor(Math.random() * item_ids.length);
            const item_id = item_ids[random_item_index];
            const implovement = Math.floor(Math.random() * 10) + 1;

            const item = {
                id: item_id,
                rf: implovement,
            } as DeckBuilderItem;

            const key = j === 6 ? 'ix' : j;

            ship.items[`i${key}` as 'i1' | 'i2' | 'i3' | 'i4' | 'i5' | 'ix'] = item;
        }

        fleet[`s${i}` as 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7'] = ship;
    }
    return fleet;
}