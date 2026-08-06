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
import { FLEET_RULES, validate_adopt_fleet, type FleetRule } from "./validate";

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

/**
 * 編成条件を満たす艦隊を引き当てるまでの最大試行回数
 * 実測の合格率は最も厳しい輸送護衛部隊でも約0.17%(平均約590試行)なので、
 * この回数に達するのは編成条件か生成器のどちらかが壊れている場合に限られる
 */
const MAX_GENERATE_ATTEMPTS = 10000;

export const generate_sim_set = () => {
    // 艦隊種別は引き直しの外で決める
    // 中で決めると、合格率の低い連合艦隊ばかりが捨てられて通常艦隊に偏る
    const fleet_type = Math.floor(Math.random() * 4) as Ft; // 0 1 2 3

    for (let attempt = 0; attempt < MAX_GENERATE_ATTEMPTS; attempt++) {
        const deck = generate_random_deck(fleet_type);
        const fleet_components = derive_FleetComponents_from_DeckBuilder(
            deck,
        );
        const fleet_type_id = deck?.f1?.t as Ft;
        const adopt_fleet = derive_adopt_fleet(fleet_components, fleet_type_id);

        // 編成条件を満たさない艦隊は本番では作れないので捨てて引き直す
        if (validate_adopt_fleet(adopt_fleet).length > 0) continue;

        return {
            adopt_fleet,
            area_ids: filtered_area_ids,
            options: selectable_options,
            deck,
        }
    }

    throw new Error(
        `艦隊種別${fleet_type}で編成条件を満たす艦隊を`
        + `${MAX_GENERATE_ATTEMPTS}回の試行で生成できなかった`
    );
};

const generate_random_deck = (fleet_type: Ft) => {
    const deck = {} as DeckBuilder;

    const [main_rule, escort_rule] = FLEET_RULES[fleet_type];

    deck.f1 = generate_random_fleet_deck(random_ships_length(main_rule));
    if (escort_rule) {
        deck.f2 = generate_random_fleet_deck(random_ships_length(escort_rule));
    }
    deck.f1.t = fleet_type;

    return deck;
};

/**
 * 編成条件の隻数範囲から隻数を抽選する
 * 隻数まで完全ランダムにすると連合艦隊の合格率が0.04〜0.56%まで落ちるので、
 * ここだけは条件に従わせて引き直しの回数を抑える
 */
const random_ships_length = (rule: FleetRule): number => {
    const width = rule.max_ships - rule.min_ships + 1;
    return rule.min_ships + Math.floor(Math.random() * width);
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