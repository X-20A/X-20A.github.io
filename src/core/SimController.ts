import { edge_datas } from "@/data/map";
import CustomError from "@/errors/CustomError";
import type { AdoptFleet } from "./AdoptFleet";
import {
    Scanner,
    createDefaultScanner,
    cloneScanner,
    progressScanner,
} from "./Scanner";
import { calcNextNode } from "./branch";
import type { SimResult, AreaId, OptionsType } from "@/models/types";

/**
 * シミュコントローラの状態
 */
export interface SimControllerState {
    fleet: AdoptFleet;
    area_id: AreaId;
    option: Record<string, string>;
    clone_count: number;
}

/**
 * Scannerの分裂の最大許容数(無限ループ防止)
 */
export const MAX_CLONE_COUNT = 15;

/**
 * SimControllerStateを生成
 * @param fleet 艦隊
 * @param area_id 海域ID
 * @param options OptionsType
 * @returns SimControllerState
 */
export function createSimControllerState(
    fleet: AdoptFleet,
    area_id: AreaId,
    options: OptionsType
): SimControllerState {
    return {
        fleet,
        area_id,
        option: options[area_id]!,
        clone_count: 0,
    };
}

/**
 * 1つのScannerを終点まで進める（イミュータブル/再帰）
 * @param scanner 進行中のScanner
 * @param state シミュ状態
 * @param area_routes マップ経路データ
 * @param clone_count クローン数
 * @param scanners Scannerスタック
 * @param results 結果配列
 * @returns clone_count（更新後）
 */
function processScanner(
    scanner: Scanner,
    state: SimControllerState,
    area_routes: any,
    clone_count: number,
    scanners: Scanner[],
    results: SimResult[]
): number {
    if (scanner.is_fin) return clone_count;

    // 退避設定

    const next_node = area_routes.filter((item: any) => item[0] === scanner.currentNode);
    if (next_node.length >= 2 || scanner.currentNode === null) {
        // 分岐
        const branched_nodes = calcNextNode(
            state.area_id,
            scanner.currentNode,
            scanner,
            state.fleet,
            state.option
        );
        if (!Array.isArray(branched_nodes)) { // 確率分岐でない
            const updatedScanner = progressScanner(scanner, branched_nodes, 1);
            return processScanner(updatedScanner, state, area_routes, clone_count, scanners, results);
        } else { // 確率分岐ならScanner分裂
            branched_nodes.slice(1).forEach(({ node, rate }) => {
                const branchedScanner = progressScanner(cloneScanner(scanner), node, rate);
                scanners.push(branchedScanner);
                clone_count++;
                if (clone_count >= MAX_CLONE_COUNT) {
                    console.group('Debug');
                    console.log('経路: ', scanner.route);
                    console.groupEnd();
                    throw new CustomError('あー！無限ループ！');
                }
            });
            const updatedScanner = progressScanner(scanner, branched_nodes[0].node, branched_nodes[0].rate);
            return processScanner(updatedScanner, state, area_routes, clone_count, scanners, results);
        }
    } else if (next_node.length === 1) {
        // 一本道
        const updatedScanner = progressScanner(scanner, next_node[0][1], 1);
        return processScanner(updatedScanner, state, area_routes, clone_count, scanners, results);
    } else {
        // 終点
        results.push({
            route: scanner.route.filter((item) => item !== null),
            rate: scanner.rate,
        });
        scanner.is_fin = true;
        return clone_count;
    }
}

/**
 * シミュレーション開始
 */
export function startSim(state: SimControllerState): SimResult[] {
    const scanners: Scanner[] = [createDefaultScanner()];
    const results: SimResult[] = [];
    const area_routes = edge_datas[state.area_id];
    let clone_count = state.clone_count;
    while (scanners.length > 0) {
        const scanner = scanners.pop()!;
        clone_count = processScanner(scanner, state, area_routes, clone_count, scanners, results);
    }
    return results;
}