import { derive_adopt_fleet } from "../../src/models/fleet/AdoptFleet";
import { derive_FleetComponents_from_DeckBuilder } from "../../src/logic/deckBuilder";
import type DeckBuilder from '../../src/types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderItem,
    DeckBuilderShip
} from '../../src/types/DeckBuilder';
import type { AreaId } from "../../src/types";
import SHIP_DATAS from "../../src/data/ship";
import EQUIP_DATAS from "../../src/data/equip";
import { NODE_DATAS, EDGE_DATAS, NT } from "../../src/data/map";
import { OPTION_DATA } from "../../src/data/options";
import { Ft } from "../../src/models/fleet/predicate";

const ship_ids = Object.keys(SHIP_DATAS).map(key => Number.parseInt(key));
const item_ids = Object.keys(EQUIP_DATAS).map(key => Number.parseInt(key));

const AREA_IDS = Object.keys(NODE_DATAS) as AreaId[];

/** テスト都合で除外する海域 */
const EXCLUDE_AREA_IDS: AreaId[] = [
    '58-2', // トライアングルがあるので除外
    '62-2', // 条件改定待ち
];

/** 海域ごとの、テストで試すべき選択肢(キーごとの取り得る値) */
type SelectableOptions = Partial<Record<AreaId, Record<string, string[]>>>;

/** 海域ごとの option を本番データから導出 */
const derive_selectable_options = (): SelectableOptions => {
    const result: SelectableOptions = {};

    for (const area_id of AREA_IDS) {
        const route_map: Record<string, string[]> = {};

        // メタ選択肢(phase / difficulty / tag など)
        const meta = OPTION_DATA[area_id];
        if (meta) {
            for (const key of Object.keys(meta)) {
                route_map[key] = meta[key].options.map(option => option.value);
            }
        }

        // 能動分岐(NT.ac)の行き先を出力辺から導出
        const nodes = NODE_DATAS[area_id];
        const edges = EDGE_DATAS[area_id];
        for (const node of Object.keys(nodes)) {
            if (nodes[node][2] !== NT.ac) continue;
            const destinations = edges
                .filter(edge => edge[0] === node)
                .map(edge => edge[1]);
            if (destinations.length > 0) route_map[node] = destinations;
        }

        if (Object.keys(route_map).length > 0) result[area_id] = route_map;
    }

    return result;
};

// 導出結果はイテレーションに依らず不変なのでモジュールロード時に一度だけ計算する
const filtered_area_ids = AREA_IDS.filter(id => !EXCLUDE_AREA_IDS.includes(id));
const selectable_options = derive_selectable_options();

export const generate_sim_set = () => {
    const deck = generate_random_deck();
    const fleet_components = derive_FleetComponents_from_DeckBuilder(
        deck,
    );
    const fleet_type_id = deck?.f1?.t as Ft;
    const adopt_fleet = derive_adopt_fleet(fleet_components, fleet_type_id);

    return {
        adopt_fleet,
        area_ids: filtered_area_ids,
        options: selectable_options,
        deck,
    }
};

const generate_random_deck = () => {
    const deck = {} as DeckBuilder;

    const fleet_type = Math.floor(Math.random() * 4); // 0 1 2 3
    if (fleet_type === 0) {
        deck.f1 = generate_random_fleet_deck(Math.floor(Math.random() * 7) + 1);
        deck.f1.t = fleet_type;
    } else {
        deck.f1 = generate_random_fleet_deck(Math.floor(Math.random() * 6) + 1);
        deck.f2 = generate_random_fleet_deck(Math.floor(Math.random() * 6) + 1);
        deck.f1.t = fleet_type;
    }

    return deck;
};

const generate_random_fleet_deck = (ship_length: number): DeckBuilderFleet => {
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