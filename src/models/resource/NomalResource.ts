import { type AdoptFleet, calc_total_drum_count, calc_total_valid_craft_count } from "@/models/fleet/AdoptFleet";
import type { AreaId, ItemIconKey } from "@/types";
import type { NodeResource, ResourceData } from "@/types/resource";
import { derive_resource_icon_suite, type ResourceIconSuite } from "./ResourceIconSuite";
import { calc_formated_craft_names } from "@/logic/resource";

/**
 * 資源種別
 */
export const enum ResourceType {
    fuel = 0,
    ammo = 1,
    steel = 2,
    imo = 3,
}

/**
 * ドラム缶・大発系による獲得資源増加の係数のデフォルト値
 */
const DEFAULT_ADD_COEFFICIENT = {
    [ResourceType.fuel]: { drum: 2, craft: 3 },
    [ResourceType.ammo]: { drum: 2, craft: 3 },
    [ResourceType.steel]: { drum: 2, craft: 3 },
    [ResourceType.imo]: { drum: 1.5, craft: 2 },
};

/**
 * 資源マスデータ
 */
const RESOURCE_DATA: ResourceData = {
    '1-2': {
        B: { type: ResourceType.ammo, base: [10, 20] }
    },
    '1-3': {
        D: { type: ResourceType.fuel, base: [10, 20] },
        G: { type: ResourceType.fuel, base: [10, 30] }
    },
    '1-4': {
        C: { type: ResourceType.steel, base: [10, 20] },
        E: { type: ResourceType.ammo, base: [10, 20] },
        G: { type: ResourceType.imo, base: [10, 20] }
    },
    '1-6': {
        G: { type: ResourceType.ammo, base: 20, max: 40, coefficient: { drum: 0, craft: 5 } },
        M: { type: ResourceType.fuel, base: 40, max: 80, coefficient: { drum: 0, craft: 10 } }
    },
    '2-1': {
        B: { type: ResourceType.steel, base: [10, 30] },
        E: { memo: '高速建造材:1' }
    },
    '2-2': {
        A: { type: ResourceType.imo, base: [10, 20] },
        F: { type: ResourceType.imo, base: [15, 35] },
        J: { memo: '高速建造材:1' }
    },
    '2-3': {
        D: { type: ResourceType.fuel, base: [15, 45] },
        G: { type: ResourceType.ammo, base: [15, 45] },
        H: { type: ResourceType.ammo, base: [35, 40] },
        I: { type: ResourceType.fuel, base: [15, 45] }
    },
    '2-4': {
        A: { memo: [
            '高速建造材:1',
            '((上陸用舟艇+特型内火艇)4以上で+2個の確率が発生する？)',
            ]
         },
        D: { type: ResourceType.fuel, base: [25, 60] },
        G: { memo: '開発資材:1' },
        N: { type: ResourceType.ammo, base: [20, 60] }
    },
    '2-5': {
        M: { type: ResourceType.fuel, base: 70, coefficient: { drum: 0, craft: 0 } },
        N: { type: ResourceType.steel, base: [50, 60], coefficient: { drum: 0, craft: 0 } }
    },
    '3-1': {
        A: { type: ResourceType.ammo, base: [35, 140] }
    },
    '3-2': {
        B: { type: ResourceType.ammo, base: [50, 150] },
        I: { memo: '家具箱(小):1' }
    },
    '3-3': {
        D: { memo: '家具箱(中):1' },
        H: { memo: '家具箱(大):1' }
    },
    '3-4': {
        E: { type: ResourceType.imo, base: [25, 150] },
        K: { memo: '家具箱(大):1' },
        O: { memo: '家具箱(中):1' }
    },
    '3-5': {
        J: { type: ResourceType.ammo, base: 50, coefficient: { drum: 10, craft: 0 } }
    },
    '4-1': {
        B: { type: ResourceType.fuel, base: [40, 120] }
    },
    '4-2': {
        J: { type: ResourceType.imo, base: [40, 60] },
        K: { type: ResourceType.steel, base: [20, 80] }
    },
    '4-3': {
        B: { type: ResourceType.fuel, base: [30, 90] },
        J: { type: ResourceType.imo, base: [50, 100] }
    },
    '4-4': {
        C: { type: ResourceType.fuel, base: [60, 150] },
        J: { type: ResourceType.steel, base: [40, 70] }
    },
    '5-1': {
        C: { type: ResourceType.steel, base: [25, 50] },
        H: { type: ResourceType.ammo, base: [45, 70], coefficient: { drum: 0, craft: 0 } }
    },
    '5-2': {
        G: { type: ResourceType.ammo, base: [20, 50] },
        J: { type: ResourceType.imo, base: [40, 80] }
    },
    '5-3': {
        F: { type: ResourceType.ammo, base: [60, 80] },
        H: { type: ResourceType.steel, base: [50, 80] }
    },
    '5-4': {
        I: { type: ResourceType.ammo, base: 60, max: 180, coefficient: { drum: 10, craft: 15 } }
    },
    '5-5': {
        E: { type: ResourceType.fuel, base: 40, max: 180, coefficient: { drum: 15, craft: 10 } }
    },
    '7-1': {
        E: { type: ResourceType.fuel, base: [10, 20] },
        I: { type: ResourceType.fuel, base: [30, 50] }
    },
    '7-2': {
        K: { type: ResourceType.fuel, base: [25, 40] }
    },
    '7-3': {
        H: { type: ResourceType.fuel, base: [30, 50] },
        O: { type: ResourceType.imo, base: [40, 50], coefficient: { drum: 2, craft: 3 } }
    },
    // 7-4-Oは特殊処理
} as const;

/**
 * NomalResource型
 */
export type NomalResource = {
    fleet_total_drum: number;
    fleet_total_craft: number;
    icon_suite: ResourceIconSuite;
    type?: ResourceType;
    base?: number | number[];
    max?: number;
    add?: number;
    memo?: string | string[];
    actual_drum_coefficient?: number;
    actual_craft_coefficient?: number;
    DEFAULT_ADD_COEFFICIENT: typeof DEFAULT_ADD_COEFFICIENT;
    /**
     * 整形済みクラフト名リスト（HTML）
     */
    formattedCraftNames: string;
};

/**
 * NomalResourceオブジェクトを生成
 * @param node_resource ノード資源データ
 * @param fleet 艦隊情報
 * @param respurce_icons 資源アイコン
 * @param drum ドラム缶アイコン
 * @param craft 大発系アイコン
 * @returns NomalResourceオブジェクト
 */
const derive_nomal_resource_Object = (
    node_resource: NodeResource,
    fleet: AdoptFleet,
    respurce_icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craftNames: ReadonlyArray<string>,
): NomalResource => {
    const fleet_total_drum = calc_total_drum_count(fleet);
    const fleet_total_craft = calc_total_valid_craft_count(fleet);
    const icon_suite = derive_resource_icon_suite(respurce_icons, drum, craft);

    let actual_drum_coefficient: number | undefined = undefined;
    let actual_craft_coefficient: number | undefined = undefined;
    let add: number | undefined = undefined;

    if (node_resource.base && node_resource.type !== undefined) {
        actual_drum_coefficient = node_resource.coefficient
            ? node_resource.coefficient.drum
            : DEFAULT_ADD_COEFFICIENT[node_resource.type].drum;

        actual_craft_coefficient = node_resource.coefficient
            ? node_resource.coefficient.craft
            : DEFAULT_ADD_COEFFICIENT[node_resource.type].craft;

        add = actual_drum_coefficient * fleet_total_drum + actual_craft_coefficient * fleet_total_craft;
    }

    const formattedCraftNames = calc_formated_craft_names(craftNames);

    const resource: NomalResource = {
        fleet_total_drum,
        fleet_total_craft,
        icon_suite,
        type: node_resource.type,
        memo: node_resource.memo,
        base: node_resource.base,
        max: node_resource.max,
        add,
        actual_drum_coefficient,
        actual_craft_coefficient,
        DEFAULT_ADD_COEFFICIENT,
        formattedCraftNames,
    };

    return resource;
}

/**
 * NomalResourceオブジェクトを生成します。
 * @param area_id 海域ID
 * @param node ノード名
 * @param fleet 艦隊情報
 * @param resource_icons アイコン情報
 * @param drum ドラム缶アイコン
 * @param craft 大発系アイコン
 * @returns NomalResourceオブジェクトまたはnull
 */
export function derive_normal_resource(
    area_id: AreaId,
    node: string,
    fleet: AdoptFleet,
    resource_icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craftNames: ReadonlyArray<string>,
): NomalResource | null {
    if (
        !RESOURCE_DATA[area_id] ||
        !RESOURCE_DATA[area_id][node]
    ) return null;

    return derive_nomal_resource_Object(
        RESOURCE_DATA[area_id][node],
        fleet,
        resource_icons,
        drum,
        craft,
        craftNames,
    );
}