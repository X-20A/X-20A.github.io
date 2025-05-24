import { AdoptFleet, getTotalDrumCount, getTotalValidCraftCount } from "@/core/AdoptFleet";
import { AreaId, ItemIconKey } from "../types";
import { createResourceIconSuite, ResourceIconSuite } from "./ResourceIconSuite";
import { Composition } from "../Composition";
import { formatCraftNames } from "@/logic/resource";

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
    formattedCraftNames: string;
}



/**
 * SyonanResourceを生成する
 * @param fleet 艦隊情報
 * @param icons アイコンセット
 * @param drum ドラム缶アイコン
 * @param craft 大発アイコン
 * @param craftNames クラフト名配列
 * @returns SyonanResourceオブジェクト
 */
function createSyonanResourceObject(
    fleet: AdoptFleet,
    icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craftNames: ReadonlyArray<string> = [],
): SyonanResource {
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
    };

    const IMO_COMPOSITION_COEFFICIENT = {
        BBV: 10,
        CVL: 4,
        AV: 5,
        AS: 5,
        LHA: 7,
        AO: 16,
    };

    const composition = fleet.composition;
    const fleet_total_drum = getTotalDrumCount(fleet);
    const fleet_total_craft = getTotalValidCraftCount(fleet);
    const icon_suite = createResourceIconSuite(icons, drum, craft);

    const add_fuel =
        fleet_total_drum * FUEL_EQUIP_COEFFICIENT.drum
        + fleet_total_craft * FUEL_EQUIP_COEFFICIENT.craft
        + composition.BBV * FUEL_COMPOSITION_COEFFICIENT.BBV
        + composition.CVL * FUEL_COMPOSITION_COEFFICIENT.CVL
        + composition.AV * FUEL_COMPOSITION_COEFFICIENT.AV
        + composition.AS * FUEL_COMPOSITION_COEFFICIENT.AS
        + composition.LHA * FUEL_COMPOSITION_COEFFICIENT.LHA
        + composition.AO * FUEL_COMPOSITION_COEFFICIENT.AO;

    const add_imo =
        fleet_total_drum * IMO_EQUIP_COEFFICIENT.drum
        + fleet_total_craft * IMO_EQUIP_COEFFICIENT.craft
        + composition.BBV * IMO_COMPOSITION_COEFFICIENT.BBV
        + composition.CVL * IMO_COMPOSITION_COEFFICIENT.CVL
        + composition.AV * IMO_COMPOSITION_COEFFICIENT.AV
        + composition.AS * IMO_COMPOSITION_COEFFICIENT.AS
        + composition.LHA * IMO_COMPOSITION_COEFFICIENT.LHA
        + composition.AO * IMO_COMPOSITION_COEFFICIENT.AO;

    const formattedCraftNames = formatCraftNames(craftNames);

    return {
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
        formattedCraftNames,
    };
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
export function createSyonanResource(
    area_id: AreaId,
    node: string,
    fleet: AdoptFleet,
    icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string,
    craftNames: ReadonlyArray<string>,
): SyonanResource | null {
    if (area_id !== "7-4") return null;
    if (node !== "O") return null;
    return createSyonanResourceObject(fleet, icons, drum, craft, craftNames);
}