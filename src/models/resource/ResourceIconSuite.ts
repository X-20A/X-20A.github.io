import type { ItemIconKey } from "../../types";

/**
 * リソースアイコンセットの型定義
 */
export type ResourceIconSuite = {
    fuel: string;
    ammo: string;
    steel: string;
    imo: string;
    drum: string;
    craft: string;
};

/**
 * アイコン情報からResourceIconSuiteを生成する
 * @param icons fuel, ammo, steel, imoのアイコンセット
 * @param drum ドラム缶アイコン
 * @param craft 開発資材アイコン
 * @returns ResourceIconSuite
 */
export function derive_resource_icon_suite(
    icons: Record<ItemIconKey, string>,
    drum: string,
    craft: string
): ResourceIconSuite {
    const suite: ResourceIconSuite = {
        fuel: icons.fuel,
        ammo: icons.ammo,
        steel: icons.steel,
        imo: icons.imo,
        drum,
        craft
    };

    return suite;
}