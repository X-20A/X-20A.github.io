import type { PreSailNull } from '../../types/brand';
import type { SimFleet } from '../../models/fleet/SimFleet';
import type { AreaId, BranchResponse } from '../../types';
import { calc_1_1, calc_1_2, calc_1_3, calc_1_4, calc_1_5, calc_1_6 } from './world1/';
import { calc_2_1, calc_2_2, calc_2_3, calc_2_4, calc_2_5 } from './world2';
import { calc_3_1, calc_3_2, calc_3_3, calc_3_4, calc_3_5 } from './world3';
import { calc_4_1, calc_4_2, calc_4_3, calc_4_4, calc_4_5 } from './world4';
import { calc_5_1, calc_5_2, calc_5_3, calc_5_4, calc_5_5 } from './world5';
import { calc_6_1, calc_6_2, calc_6_3, calc_6_4, calc_6_5 } from './world6';
import { calc_7_1, calc_7_2, calc_7_3, calc_7_4, calc_7_5 } from './world7';
import { calc_57_7 } from './world57/57-7';
import { calc_58_1, calc_58_2, calc_58_3, calc_58_4 } from './world58';
import { calc_59_1, calc_59_2, calc_59_3, calc_59_4, calc_59_5 } from './world59';
import { calc_60_1, calc_60_2, calc_60_3, calc_60_4, calc_60_5, calc_60_6 } from './world60';
import { calc_61_1, calc_61_2, calc_61_3, calc_61_4, calc_61_5 } from './world61';

/** optionを使用しない分岐関数 */
export type CalcFnNoCondition = (
    node: string | PreSailNull,
    sim_fleet: SimFleet,
) => BranchResponse

/** optionを使用する分岐関数 */
export type CalcFnWithCondition = (
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
) => BranchResponse

/**
 * 分岐関数の登録エントリ
 * option を必要とするかどうかを明示的に持たせる
 */
type CalcEntry =
    | { requires_option: false; fn: CalcFnNoCondition }
    | { requires_option: true; fn: CalcFnWithCondition }

const CALC_TABLE: Record<AreaId, CalcEntry> = {
    '1-1': { requires_option: false, fn: calc_1_1 },
    '1-2': { requires_option: false, fn: calc_1_2 },
    '1-3': { requires_option: false, fn: calc_1_3 },
    '1-4': { requires_option: false, fn: calc_1_4 },
    '1-5': { requires_option: false, fn: calc_1_5 },
    '1-6': { requires_option: false, fn: calc_1_6 },

    '2-1': { requires_option: false, fn: calc_2_1 },
    '2-2': { requires_option: false, fn: calc_2_2 },
    '2-3': { requires_option: false, fn: calc_2_3 },
    '2-4': { requires_option: false, fn: calc_2_4 },
    '2-5': { requires_option: false, fn: calc_2_5 },

    '3-1': { requires_option: false, fn: calc_3_1 },
    '3-2': { requires_option: false, fn: calc_3_2 },
    '3-3': { requires_option: false, fn: calc_3_3 },
    '3-4': { requires_option: false, fn: calc_3_4 },
    '3-5': { requires_option: false, fn: calc_3_5 },

    '4-1': { requires_option: false, fn: calc_4_1 },
    '4-2': { requires_option: false, fn: calc_4_2 },
    '4-3': { requires_option: false, fn: calc_4_3 },
    '4-4': { requires_option: false, fn: calc_4_4 },
    '4-5': { requires_option: true, fn: calc_4_5 },

    '5-1': { requires_option: false, fn: calc_5_1 },
    '5-2': { requires_option: false, fn: calc_5_2 },
    '5-3': { requires_option: true, fn: calc_5_3 },
    '5-4': { requires_option: false, fn: calc_5_4 },
    '5-5': { requires_option: true, fn: calc_5_5 },

    '6-1': { requires_option: false, fn: calc_6_1 },
    '6-2': { requires_option: false, fn: calc_6_2 },
    '6-3': { requires_option: true, fn: calc_6_3 },
    '6-4': { requires_option: false, fn: calc_6_4 },
    '6-5': { requires_option: false, fn: calc_6_5 },

    '7-1': { requires_option: false, fn: calc_7_1 },
    '7-2': { requires_option: false, fn: calc_7_2 },
    '7-3': { requires_option: true, fn: calc_7_3 },
    '7-4': { requires_option: true, fn: calc_7_4 },
    '7-5': { requires_option: true, fn: calc_7_5 },

    '57-7': { requires_option: true, fn: calc_57_7 },

    '58-1': { requires_option: true, fn: calc_58_1 },
    '58-2': { requires_option: true, fn: calc_58_2 },
    '58-3': { requires_option: true, fn: calc_58_3 },
    '58-4': { requires_option: true, fn: calc_58_4 },

    '59-1': { requires_option: true, fn: calc_59_1 },
    '59-2': { requires_option: true, fn: calc_59_2 },
    '59-3': { requires_option: true, fn: calc_59_3 },
    '59-4': { requires_option: true, fn: calc_59_4 },
    '59-5': { requires_option: true, fn: calc_59_5 },

    '60-1': { requires_option: true, fn: calc_60_1 },
    '60-2': { requires_option: true, fn: calc_60_2 },
    '60-3': { requires_option: true, fn: calc_60_3 },
    '60-4': { requires_option: true, fn: calc_60_4 },
    '60-5': { requires_option: true, fn: calc_60_5 },
    '60-6': { requires_option: true, fn: calc_60_6 },

    '61-1': { requires_option: true, fn: calc_61_1 },
    '61-2': { requires_option: true, fn: calc_61_2 },
    '61-3': { requires_option: true, fn: calc_61_3 },
    '61-4': { requires_option: true, fn: calc_61_4 },
    '61-5': { requires_option: true, fn: calc_61_5 },

    // @expansion
} as const;

/**
 * 艦隊・マップ・ノード情報から次Nodeを判定して返す
 * @param node 現在ノード名またはnull
 * @param SimFleet ルート情報などを持つスキャナー
 * @param fleet 艦隊情報
 * @param area_id エリアID
 * @param option オプション設定
 * @returns 次ノード名または分岐配列
 */
export function calc_next_node(
    area_id: AreaId,
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse {
    const entry = CALC_TABLE[area_id];

    return entry.requires_option
        ? entry.fn(node, sim_fleet, option)
        : entry.fn(node, sim_fleet);
}