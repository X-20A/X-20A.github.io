import { derive_adopt_fleet } from "@/models/fleet/AdoptFleet";
import { derive_FleetComponents_from_DeckBuilder } from "@/logic/deckBuilder";
import type DeckBuilder from '@/types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderItem,
    DeckBuilderShip
} from '@/types/DeckBuilder';
import type { AreaId } from "@/types";
import SHIP_DATAS from "@/data/ship";
import EQUIP_DATAS from "@/data/equip";
import type { Ft } from "@/core/branch";

const ship_ids = Object.keys(SHIP_DATAS).map(key => Number.parseInt(key));
const item_ids = Object.keys(EQUIP_DATAS).map(key => Number.parseInt(key));

export const getSimSet = () => {
    const deck = generateRandomDeck();
    const fleet_components = derive_FleetComponents_from_DeckBuilder(
        deck,
    );
    const fleet_type_id = deck?.f1?.t as Ft;
    const adoptFleet = derive_adopt_fleet(fleet_components, fleet_type_id);

    const areaIds: AreaId[] = [
        '1-1', '1-2', '1-3', '1-4', '1-5', '1-6',
        '2-1', '2-2', '2-3', '2-4', '2-5',
        '3-1', '3-2', '3-3', '3-4', '3-5',
        '4-1', '4-2', '4-3', '4-4', '4-5',
        '5-1', '5-2', '5-3', '5-4', '5-5',
        '6-1', '6-2', '6-3', '6-4', '6-5',
        '7-1', '7-2', '7-3', '7-4', '7-5',
        '57-7',
        '58-1', /*'58-2',*/ '58-3', '58-4', // 58-2はトライアングルがあるので除外
        '59-1', '59-2', '59-3', '59-4', '59-5',
        '60-1', '60-2', '60-3', '60-4', '60-5', '60-6',
        '61-1', //'61-2', '61-3', '61-4', '61-5',
    ]; // @expansion

    type MapKey = `${number}-${number}`; // '4-5' などのキー
    type PhaseKey = 'phase' | 'difficulty' | 'tag' | 'is_third' |string; // 特定のキーを定義しつつ汎用性も持たせる
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
        '59-5': { 'phase': ['1', '2', '3'], 'G': ['H','I'], 'O2': ['P','Q'], 'W': ['X','Z'] },
        '60-1': { 'phase': ['1', '2', '3'], 'is_third': ['0', '1'], 'A': ['B', 'D'] },
        '60-2': { 'phase': ['1', '2', '3'], 'B': ['C', 'D'], 'E': ['F', 'F1'], 'N': ['O', 'P'] },
        '60-3': { 'phase': ['1', '2', '3', '4', '5'], 'difficulty': ['1', '2', '3', '4'], 'A': ['B', 'C'], 'C': ['D', 'E'], 'H': ['H1', 'I'], 'M': ['M1', 'M2'], 'S': ['S1', 'S2'] },
        '60-4': { 'phase': ['1', '2', '3'], 'A': ['B', 'D'], 'F': ['F1', 'G'], 'G': ['G1', 'H'] },
        '60-5': { 'phase': ['1', '2', '3'], 'difficulty': ['1', '2', '3', '4'], 'B': ['B1', 'B2'], 'D': ['D1', 'D2'] },
        '60-6': { 'phase': ['1', '2', '3'], 'difficulty': ['1', '2', '3', '4'], 'G': ['H', 'J'], 'K': ['J3', 'L'], 'R': ['S', 'T'] },
        '61-1': { 'phase': ['1', '2', '3'], 'A': ['B', 'F'], 'F': ['G', 'J'], 'L': ['M', 'P'], },
        //'61-2': {},
        //'61-3': {},
        //'61-4': {},
        //'61-5': {},
    }; // @expansion

    return {
        adoptFleet: adoptFleet,
        areaIds: areaIds,
        options: options,
        deck: deck,
    }
};

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

const generateRandomFleetDeck = (ship_length: number): DeckBuilderFleet => {
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

export const convertACSimURL = (deck: DeckBuilder) => {

}