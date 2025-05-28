import { edge_datas } from "@/data/map";
import CustomError from "@/errors/CustomError";
import type { AdoptFleet } from "./AdoptFleet";
import {
    type SimFleet,
    createDefaultSimFleet,
    cloneSimFleet,
    progressSimFleet,
    getEvacuatedFleet,
} from "./SimFleet";
import { calcNextNode } from "./branch";
import type { SimResult, AreaId, OptionsType, EdgeData } from "@/models/types";
import type { CommandEvacuation } from "./CommandEvacuation";

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
 * 1つのSimFleetを終点まで進める
 * @param evacuated_sim_fleet 進行中のSimFleet
 * @param executor シミュ状態
 * @param area_routes マップ経路データ
 * @param clone_count SimFleetが分裂した回数
 * @param sim_fleets SimFleetスタック
 * @param command_evacuations 退避艦情報
 * @param results 結果配列
 * @returns { clone_count: number, sim_fleets: SimFleet[], results: SimResult[] }
 */
function advanceSimFleet(
    sim_fleet: SimFleet,
    executor: SimExecutor,
    area_routes: EdgeData[],
    clone_count: number,
    sim_fleets: SimFleet[],
    command_evacuations: CommandEvacuation[],
    results: SimResult[]
): { clone_count: number, sim_fleets: SimFleet[], results: SimResult[] } {
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
            const branched_sim_fleets = branched_nodes.slice(1).map(({ node, rate }) =>
                progressSimFleet(cloneSimFleet(evacuated_sim_fleet), node, rate)
            );
            const new_sim_fleets = [...sim_fleets, ...branched_sim_fleets.reverse()];
            const new_clone_count = clone_count + branched_sim_fleets.length;
            if (clone_count >= MAX_CLONE_COUNT) { // ひとまず副作用許容
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
                new_sim_fleets,
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
        const new_result: SimResult = {
            route: evacuated_sim_fleet.route.filter(item => item !== null),
            rate: evacuated_sim_fleet.rate,
        };
        return { clone_count, sim_fleets, results: [...results, new_result] };
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
    let sim_fleets: SimFleet[] = [createDefaultSimFleet(adopt_fleet)];
    let results: SimResult[] = [];
    const area_routes = edge_datas[executor.area_id];
    let clone_count = executor.clone_count;
    while (sim_fleets.length > 0) {
        const sim_fleet = sim_fleets.pop()!;
        const advance_result = advanceSimFleet(
            sim_fleet,
            executor,
            area_routes,
            clone_count,
            sim_fleets,
            command_evacuations,
            results
        );
        clone_count = advance_result.clone_count;
        sim_fleets = advance_result.sim_fleets;
        results = advance_result.results;
    }
    return results;
}