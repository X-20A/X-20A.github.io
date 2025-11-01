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
import { calc_61_1, calc_61_2 } from './world61';

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

// NOTE: 能動分岐のハードコーディングをやめてマップデータとオプションから
// 自動で進行するようにできるかもしれない
// ただ、三択の能動分岐とかでてきたときに困るかも

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
    switch (area_id) {
        case '1-1':
            return calc_1_1(node, sim_fleet);
        case '1-2':
            return calc_1_2(node, sim_fleet);
        case '1-3':
            return calc_1_3(node, sim_fleet);
        case '1-4':
            return calc_1_4(node, sim_fleet);
        case '1-5':
            return calc_1_5(node, sim_fleet);
        case '1-6':
            return calc_1_6(node, sim_fleet);
        case '2-1':
            return calc_2_1(node, sim_fleet);
        case '2-2':
            return calc_2_2(node, sim_fleet);
        case '2-3':
            return calc_2_3(node, sim_fleet);
        case '2-4':
            return calc_2_4(node, sim_fleet);
        case '2-5':
            return calc_2_5(node, sim_fleet);
        case '3-1':
            return calc_3_1(node, sim_fleet);
        case '3-2':
            return calc_3_2(node, sim_fleet);
        case '3-3':
            return calc_3_3(node, sim_fleet);
        case '3-4':
            return calc_3_4(node, sim_fleet);
        case '3-5':
            return calc_3_5(node, sim_fleet);
        case '4-1':
            return calc_4_1(node, sim_fleet);
        case '4-2':
            return calc_4_2(node, sim_fleet);
        case '4-3':
            return calc_4_3(node, sim_fleet);
        case '4-4':
            return calc_4_4(node, sim_fleet);
        case '4-5':
            return calc_4_5(node, sim_fleet, option);
        case '5-1':
            return calc_5_1(node, sim_fleet);
        case '5-2':
            return calc_5_2(node, sim_fleet);
        case '5-3':
            return calc_5_3(node, sim_fleet, option);
        case '5-4':
            return calc_5_4(node, sim_fleet);
        case '5-5':
            return calc_5_5(node, sim_fleet, option);
        case '6-1':
            return calc_6_1(node, sim_fleet);
        case '6-2':
            return calc_6_2(node, sim_fleet);
        case '6-3':
            return calc_6_3(node, sim_fleet, option);
        case '6-4':
            return calc_6_4(node, sim_fleet);
        case '6-5':
            return calc_6_5(node, sim_fleet);
        case '7-1':
            return calc_7_1(node, sim_fleet);
        case '7-2':
            return calc_7_2(node, sim_fleet);
        case '7-3':
            return calc_7_3(node, sim_fleet, option);
        case '7-4':
            return calc_7_4(node, sim_fleet, option);
        case '7-5':
            return calc_7_5(node, sim_fleet, option);
        case '57-7':
            return calc_57_7(node, sim_fleet, option);
        case '58-1':
            return calc_58_1(node, sim_fleet, option);
        case '58-2':
            return calc_58_2(node, sim_fleet, option);
        case '58-3':
            return calc_58_3(node, sim_fleet, option);
        case '58-4':
            return calc_58_4(node, sim_fleet, option);
        case '59-1':
            return calc_59_1(node, sim_fleet, option);
        case '59-2':
            return calc_59_2(node, sim_fleet, option);
        case '59-3':
            return calc_59_3(node, sim_fleet, option);
        case '59-4':
            return calc_59_4(node, sim_fleet, option);
        case '59-5':
            return calc_59_5(node, sim_fleet, option);
        case '60-1':
            return calc_60_1(node, sim_fleet, option);
        case '60-2':
            return calc_60_2(node, sim_fleet, option);
        case '60-3':
            return calc_60_3(node, sim_fleet, option);
        case '60-4':
            return calc_60_4(node, sim_fleet, option);
        case '60-5':
            return calc_60_5(node, sim_fleet, option);
        case '60-6':
            return calc_60_6(node, sim_fleet, option);
        case '61-1':
            return calc_61_1(node, sim_fleet, option);
        case '61-2':
            return calc_61_2(node, sim_fleet, option);
        // case '':
            // return calc_6_(node, sim_fleet, option);
    } // @expansion
}
