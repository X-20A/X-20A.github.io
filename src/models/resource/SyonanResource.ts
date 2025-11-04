import { type AdoptFleet, count_total_drum, count_total_valid_craft } from "../../models/fleet/AdoptFleet";
import type { AreaId, ItemIconKey } from "../../types";
import { derive_resource_icon_suite, type ResourceIconSuite } from "./ResourceIconSuite";
import type { Composition } from "../Composition";
import { calc_formated_craft_names } from "../../logic/resource";

/**
 * SyonanResourceのプロパティ定義
 */
export type SyonanResource = {
    composition: Composition;
    fleet_total_drum: number;
    fleet_total_craft: number;
    icon_suite: ResourceIconSuite;
    add_fuel: number;
    add_imo: number;
    BASE_FUEL: number;
    BASE_IMO: number;
    MAX_FUEL: number;
    MAX_IMO: number;
    FUEL_EQUIP_COEFFICIENT: { drum: number; craft: number };
    IMO_EQUIP_COEFFICIENT: { drum: number; craft: number };
    FUEL_COMPOSITION_COEFFICIENT: Record<string, number>;
    IMO_COMPOSITION_COEFFICIENT: Record<string, number>;
    /**
     * 整形済みクラフト名リスト（HTML）
     */
    formatted_craft_names: string;
}

const BASE_FUEL = 40;
const BASE_IMO = 20;
const MAX_FUEL = 200;
const MAX_IMO = 120;

const FUEL_EQUIP_COEFFICIENT = { drum: 8, craft: 7 };
const IMO_EQUIP_COEFFICIENT = { drum: 6, craft: 10 };

const FUEL_COMPOSITION_COEFFICIENT = {
    BBV: 10,
    CVL: 7,
    AV: 6,
    AS: 5,
    LHA: 8,
    AO: 22,
} as const;

const IMO_COMPOSITION_COEFFICIENT = {
    BBV: 10,
    CVL: 4,
    AV: 5,
    AS: 5,
    LHA: 7,
    AO: 16,
} as const;

/**
 * SyonanResourceを生成する
 * @param fleet 艦隊情報
 * @param icons アイコンセット
 * @param drum ドラム缶アイコン
 * @param craft 大発アイコン
 * @param craft_names クラフト名配列
 * @returns SyonanResourceオブジェクト
 */
const derive_Syonan_resource_Object = (
    fleet: AdoptFleet,
    icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craft_names: ReadonlyArray<string> = [],
): SyonanResource => {
    const { composition } = fleet;
    const fleet_total_drum = count_total_drum(fleet);
    const fleet_total_craft = count_total_valid_craft(fleet);
    const icon_suite = derive_resource_icon_suite(icons, drum, craft);

    const add_fuel =
        + fleet_total_drum * FUEL_EQUIP_COEFFICIENT.drum
        + fleet_total_craft * FUEL_EQUIP_COEFFICIENT.craft
        + composition.BBV * FUEL_COMPOSITION_COEFFICIENT.BBV
        + composition.CVL * FUEL_COMPOSITION_COEFFICIENT.CVL
        + composition.AV * FUEL_COMPOSITION_COEFFICIENT.AV
        + composition.AS * FUEL_COMPOSITION_COEFFICIENT.AS
        + composition.LHA * FUEL_COMPOSITION_COEFFICIENT.LHA
        + composition.AO * FUEL_COMPOSITION_COEFFICIENT.AO;

    const add_imo =
        + fleet_total_drum * IMO_EQUIP_COEFFICIENT.drum
        + fleet_total_craft * IMO_EQUIP_COEFFICIENT.craft
        + composition.BBV * IMO_COMPOSITION_COEFFICIENT.BBV
        + composition.CVL * IMO_COMPOSITION_COEFFICIENT.CVL
        + composition.AV * IMO_COMPOSITION_COEFFICIENT.AV
        + composition.AS * IMO_COMPOSITION_COEFFICIENT.AS
        + composition.LHA * IMO_COMPOSITION_COEFFICIENT.LHA
        + composition.AO * IMO_COMPOSITION_COEFFICIENT.AO;

    const formatted_craft_names = calc_formated_craft_names(craft_names);

    const resouce: SyonanResource = {
        composition,
        fleet_total_drum,
        fleet_total_craft,
        icon_suite,
        add_fuel,
        add_imo,
        BASE_FUEL,
        BASE_IMO,
        MAX_FUEL,
        MAX_IMO,
        FUEL_EQUIP_COEFFICIENT,
        IMO_EQUIP_COEFFICIENT,
        FUEL_COMPOSITION_COEFFICIENT,
        IMO_COMPOSITION_COEFFICIENT,
        formatted_craft_names,
    };

    return resouce;
}

/**
 * SyonanResourceを条件付きで生成する
 * @param area_id エリアID
 * @param node ノード
 * @param fleet 艦隊情報
 * @param icons アイコンセット
 * @param drum ドラム缶アイコン
 * @param craft 大発アイコン
 * @returns SyonanResourceまたはnull
 */
export function derive_Syonan_resource(
    area_id: AreaId,
    node: string,
    fleet: AdoptFleet,
    icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craftNames: ReadonlyArray<string>,
): SyonanResource | null {
    if (
        area_id !== '7-4' ||
        node !== 'O'
    ) return null;

    return derive_Syonan_resource_Object(
        fleet,
        icons,
        drum,
        craft,
        craftNames,
    );
}