import { edge_datas } from "@/data/map";
import CustomError from "@/errors/CustomError";
import type { AdoptFleet } from "./AdoptFleet";
import {
    SimFleet,
    createDefaultSimFleet,
    cloneSimFleet,
    progressSimFleet,
    getEvacuatedFleet,
} from "./SimFleet";
import { calcNextNode } from "./branch";
import type { SimResult, AreaId, OptionsType, EdgeData } from "@/models/types";
import { CommandEvacuation } from "./CommandEvacuation";

/**
 * シミュ制御オブジェクト
 */
export type SimExecutor = {
    readonly adopt_fleet: AdoptFleet;
    readonly area_id: AreaId;
    readonly option: Record<string, string>;
    readonly command_evacuations: CommandEvacuation[],
    readonly clone_count: number;
}

/**
 * SimFleetの分裂の最大許容数(無限ループ防止)
 */
export const MAX_CLONE_COUNT = 15;

/**
 * SimControllerStateを生成
 * @param adopt_fleet 艦隊
 * @param area_id 海域ID
 * @param options OptionsType
 * @param command_evacuations 退避艦情報
 * @returns SimControllerState
 */
export function createSimExecutor(
    adopt_fleet: AdoptFleet,
    area_id: AreaId,
    options: OptionsType,
    command_evacuations: CommandEvacuation[],
): SimExecutor {
    return {
        adopt_fleet: adopt_fleet,
        area_id,
        option: options[area_id]!,
        clone_count: 0,
        command_evacuations,
    };
}

/**
 * 1つのSimFleetを終点まで進める（イミュータブル/再帰）
 * @param evacuated_sim_fleet 進行中のSimFleet
 * @param executor シミュ状態
 * @param area_routes マップ経路データ
 * @param clone_count クローン数
 * @param sim_fleets SimFleetスタック
 * @param command_evacuations 退避艦情報
 * @param results 結果配列
 * @returns clone_count（更新後）
 */
function advanceSimFleet(
    sim_fleet: SimFleet,
    executor: SimExecutor,
    area_routes: EdgeData[],
    clone_count: number,
    sim_fleets: SimFleet[],
    command_evacuations: CommandEvacuation[],
    results: SimResult[]
): number {
    // 退避適用
    const evacuated_sim_fleet = getEvacuatedFleet(
        sim_fleet,
        command_evacuations,
        sim_fleet.current_node
    );

    const next_node =
        area_routes.filter((item: EdgeData) => item[0] === evacuated_sim_fleet.current_node);
    if (next_node.length >= 2 || evacuated_sim_fleet.current_node === null) {
        // 分岐
        const branched_nodes = calcNextNode(
            executor.area_id,
            evacuated_sim_fleet.current_node,
            evacuated_sim_fleet,
            executor.option,
        );
        if (!Array.isArray(branched_nodes)) { // 確率分岐でない
            const updated_sim_fleet = progressSimFleet(evacuated_sim_fleet, branched_nodes, 1);
            return advanceSimFleet(
                updated_sim_fleet,
                executor,
                area_routes,
                clone_count,
                sim_fleets,
                command_evacuations,
                results,
            );
        } else { // 確率分岐ならSimFleet分裂
            const branched = branched_nodes.slice(1).map(({ node, rate }) => {
                const branched_sim_fleet
                    = progressSimFleet(cloneSimFleet(evacuated_sim_fleet), node, rate);
                sim_fleets.push(branched_sim_fleet);
                return 1;
            });
            const new_clone_count = clone_count + branched.length;
            if (clone_count >= MAX_CLONE_COUNT) {
                console.group('Debug');
                console.log('経路: ', evacuated_sim_fleet.route);
                console.groupEnd();
                throw new CustomError('あー！無限ループ！');
            }
            const updated_sim_fleet = progressSimFleet(
                    evacuated_sim_fleet,
                    branched_nodes[0].node,
                    branched_nodes[0].rate,
                );
            return advanceSimFleet(
                updated_sim_fleet,
                executor,
                area_routes,
                new_clone_count,
                sim_fleets,
                command_evacuations,
                results,
            );
        }
    } else if (next_node.length === 1) {
        // 一本道
        const updated_sim_fleet = progressSimFleet(evacuated_sim_fleet, next_node[0][1], 1);
        return advanceSimFleet(
            updated_sim_fleet,
            executor,
            area_routes,
            clone_count,
            sim_fleets,
            command_evacuations,
            results,
        );
    } else {
        // 終点
        results.push({
            route: evacuated_sim_fleet.route.filter(item => item !== null),
            rate: evacuated_sim_fleet.rate,
        });
        return clone_count;
    }
}

/**
 * シミュレーション開始
 */
export function startSim(
    executor: SimExecutor,
    adopt_fleet: AdoptFleet,
    command_evacuations: CommandEvacuation[],
): SimResult[] {
    const sim_fleets: SimFleet[] = [createDefaultSimFleet(adopt_fleet)];
    const results: SimResult[] = [];
    const area_routes = edge_datas[executor.area_id];
    let clone_count = executor.clone_count;
    while (sim_fleets.length > 0) {
        const sim_fleet = sim_fleets.pop()!;

        clone_count = advanceSimFleet(
            sim_fleet,
            executor,
            area_routes,
            clone_count,
            sim_fleets,
            command_evacuations,
            results
        );
    }
    return results;
}