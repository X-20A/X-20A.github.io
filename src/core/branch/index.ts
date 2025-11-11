import type { PreSailNull } from '../../types/brand';
import type { SimFleet } from '../../models/fleet/SimFleet';
import type { AreaId, BranchResponse } from '../../types';
import CustomError from '../../errors/CustomError';
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
import { calc_61_1, calc_61_2, calc_61_3, calc_61_4 } from './world61';

// NOTE: 能動分岐のハードコーディングをやめてマップデータとオプションから
// 自動で進行するようにできるかもしれない
// ただ、三択の能動分岐とかでてきたときに困るかも

type BranchConditionFn = (
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
) => BranchResponse[] | string;

/**
 * option を使わない calc_* を option 付きの形に揃えるだけのラッパー
 * 参照透過性を保つため
 */
const wrap_no_option = (
    fn: (node: string | PreSailNull, sim_fleet: SimFleet) => BranchResponse[] | string,
): BranchConditionFn => {
    return (node, sim_fleet) => fn(node, sim_fleet);
}

const CALC_TABLE = {
    '1-1': wrap_no_option(calc_1_1),
    '1-2': wrap_no_option(calc_1_2),
    '1-3': wrap_no_option(calc_1_3),
    '1-4': wrap_no_option(calc_1_4),
    '1-5': wrap_no_option(calc_1_5),
    '1-6': wrap_no_option(calc_1_6),
    '2-1': wrap_no_option(calc_2_1),
    '2-2': wrap_no_option(calc_2_2),
    '2-3': wrap_no_option(calc_2_3),
    '2-4': wrap_no_option(calc_2_4),
    '2-5': wrap_no_option(calc_2_5),
    '3-1': wrap_no_option(calc_3_1),
    '3-2': wrap_no_option(calc_3_2),
    '3-3': wrap_no_option(calc_3_3),
    '3-4': wrap_no_option(calc_3_4),
    '3-5': wrap_no_option(calc_3_5),
    '4-1': wrap_no_option(calc_4_1),
    '4-2': wrap_no_option(calc_4_2),
    '4-3': wrap_no_option(calc_4_3),
    '4-4': wrap_no_option(calc_4_4),
    '4-5': calc_4_5,
    '5-1': wrap_no_option(calc_5_1),
    '5-2': wrap_no_option(calc_5_2),
    '5-3': calc_5_3,
    '5-4': wrap_no_option(calc_5_4),
    '5-5': calc_5_5,
    '6-1': wrap_no_option(calc_6_1),
    '6-2': wrap_no_option(calc_6_2),
    '6-3': calc_6_3,
    '6-4': wrap_no_option(calc_6_4),
    '6-5': wrap_no_option(calc_6_5),
    '7-1': wrap_no_option(calc_7_1),
    '7-2': wrap_no_option(calc_7_2),
    '7-3': calc_7_3,
    '7-4': calc_7_4,
    '7-5': calc_7_5,
    '57-7': calc_57_7,
    '58-1': calc_58_1,
    '58-2': calc_58_2,
    '58-3': calc_58_3,
    '58-4': calc_58_4,
    '59-1': calc_59_1,
    '59-2': calc_59_2,
    '59-3': calc_59_3,
    '59-4': calc_59_4,
    '59-5': calc_59_5,
    '60-1': calc_60_1,
    '60-2': calc_60_2,
    '60-3': calc_60_3,
    '60-4': calc_60_4,
    '60-5': calc_60_5,
    '60-6': calc_60_6,
    '61-1': calc_61_1,
    '61-2': calc_61_2,
    '61-3': calc_61_3,
    '61-4': calc_61_4,
    // '61-5': calc_61_5,
    // @expansion
} satisfies Record<AreaId, BranchConditionFn>;

/**
 * 分割代入支援
 * @param fleet 
 * @returns 
 */
export function destructuring_assignment_helper(
    fleet: SimFleet,
) {
    const {
        adopt_fleet,
        route,
    } = fleet;
    const {
        composition,
        fleet_type,
        ships_length,
        speed,
        seek,
        drum_carrier_count,
        craft_carrier_count,
        radar_carrier_count,
        arBulge_carrier_count,
        SBB_count,
    } = adopt_fleet;

    return {
        route,
        fleet: adopt_fleet,
        fleet_type,
        ships_length,
        speed,
        seek,
        drum_carrier_count,
        craft_carrier_count,
        radar_carrier_count,
        arBulge_carrier_count,
        SBB_count,
        ...composition,
    };
}

/**
 * 条件が漏れたときのエラースロー
 * @param node 
 * @param sim_fleet 
 */
export function omission_of_conditions(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): never {
    console.log('node: ', node);
    console.log('route: ', sim_fleet.route);
    throw new CustomError('条件漏れ');
}

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
): BranchResponse[] | string {
    return CALC_TABLE[area_id](node, sim_fleet, option);
}