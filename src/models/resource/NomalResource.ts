import AdoptFleet from "@/core/AdoptFleet";
import { AreaId, ItemIconKey } from "../types";
import { NodeResource, ResourceData } from "../types/resource";
import ResourceIconSuite from "./ResourceIconSuite";

export const enum ResourceType {
    fuel = "fuel",
    ammo = "ammo",
    steel = "steel",
    imo = "imo",
}

/**
 * 7-4-O以外の資源マス
 */
export default class NomalResource {
    /** 艦隊の総ドラム缶数 */
    public readonly fleet_total_drum: number;
    /** 艦隊の総大発系数 */
    public readonly fleet_total_craft: number;
    /** アイコン情報 */
    public readonly icon_suite: ResourceIconSuite;

    /** 獲得資源種別 */
    public readonly type?: ResourceType;

    /** 最低獲得資源 */
    public readonly base?: number | number[];

    /** 上限獲得資源 */
    public readonly max?: number;

    /** 追加獲得資源 */
    public readonly add?: number;

    /** メモ */
    public readonly memo?: string | string[];

    public readonly actual_drum_coefficient?: number;

    public readonly actual_craft_coefficient?: number;

    /** ドラム缶・大発系による獲得資源増加の係数のデフォルト値 */
    public readonly DEFAULT_ADD_COEFFICIENT = {
        [ResourceType.fuel]: {
            drum: 2,
            craft: 3,
        },
        [ResourceType.ammo]: {
            drum: 2,
            craft: 3,
        },
        [ResourceType.steel]: {
            drum: 2,
            craft: 3,
        },
        [ResourceType.imo]: {
            drum: 1.5,
            craft: 2,
        },
    };

    // 資源マスデータ
    static RESOURCE_DATA: ResourceData = {
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
    };

    /**
     * NomalResourceのインスタンスを生成します。
     * @param node_resource ノード資源データ
     * @param fleet 艦隊情報
     * @param icons アイコン情報
     */
    private constructor(
        node_resource: NodeResource,
        fleet: AdoptFleet,
        icons: Record<ItemIconKey, string>,
        drum: string,
        craft: string,
    ) {
        this.fleet_total_drum = fleet.getTotalDrumCount();
        this.fleet_total_craft = fleet.getTotalValidCraftCount();
        this.icon_suite = new ResourceIconSuite(icons, drum, craft);

        this.type = node_resource.type;
        this.memo = node_resource.memo;
        this.base = node_resource.base;
        this.max = node_resource.max;

        if (node_resource.base && node_resource.type) {
            this.actual_drum_coefficient = node_resource.coefficient
                ? node_resource.coefficient.drum
                : this.DEFAULT_ADD_COEFFICIENT[node_resource.type].drum;

            this.actual_craft_coefficient = node_resource.coefficient
                ? node_resource.coefficient.craft
                : this.DEFAULT_ADD_COEFFICIENT[node_resource.type].craft;

            this.add = this.actual_drum_coefficient * this.fleet_total_drum + this.actual_craft_coefficient * this.fleet_total_craft;
        }
    }

    /**
     * NomalResourceインスタンスを生成します。
     * @param area_id 海域ID
     * @param node ノード名
     * @param fleet 艦隊情報
     * @param icons アイコン情報
     * @returns NomalResourceインスタンスまたはnull
     */
    static createNomalResource(
        area_id: AreaId,
        node: string,
        fleet: AdoptFleet,
        icons: Record<ItemIconKey, string>,
        drum: string,
        craft: string,
    ): NomalResource | null {
        if (!NomalResource.RESOURCE_DATA[area_id]) return null;
        if (!NomalResource.RESOURCE_DATA[area_id][node]) return null;

        return new NomalResource(
            NomalResource.RESOURCE_DATA[area_id][node],
            fleet,
            icons,
            drum,
            craft,
        );
    }
}