import Big from "big.js";
import { derive_sim_executer, start_sim } from "../../core/SimExecutor";
import { NODE_DATAS, NT } from "../../data/map";
import { QUEST_ICON_PERIOD_MAP, QuestData, QuestIconType, QuestPeriod, TargetNodeInfo } from "../../data/quest";
import { AdoptFleet } from "../../models/fleet/AdoptFleet";
import { AreaId, NORMAL_AREA_ID_LIST, NormalAreaId, OptionsType, SimResult } from "../../types";
import { CompositionCondition, QuestCompositionCondition } from "./conditions";
import { is_fleet_combined, is_fleet_striking } from "../../models/fleet/predicate";

type AreaSimResult = {
    area_id: NormalAreaId,
    reach_rate: Big,
}

export const NORMAL_AREA_ID_SET: ReadonlySet<NormalAreaId> =
    new Set<NormalAreaId>(NORMAL_AREA_ID_LIST);

export function has_normal_area_id(
    area_id: AreaId,
): area_id is NormalAreaId {
    return NORMAL_AREA_ID_SET.has(area_id as NormalAreaId);
}

const is_normal_area_id = (
    info: TargetNodeInfo,
): info is NormalAreaId => {
    return typeof info === 'string' &&
        has_normal_area_id(info);
}

/**
 * 海域のボスNodeを返す
 * @param area_id 
 * @returns 
 */
const extract_boss_node = (
    area_id: NormalAreaId,
): string => {
    const nodes = NODE_DATAS[area_id];
    const boss_node = Object.entries(nodes).find(node => node[1][2] === NT.bo);
    if (
        !boss_node
    ) throw new Error(`${area_id} にボスNodeを見つけられませんでした`);

    return boss_node[0];
}

/**
 * 到達すべきNodeを返す
 * @param info 
 * @returns 
 */
const calc_target_node = (
    info: TargetNodeInfo,
): string => {
    return is_normal_area_id(info)
        ? extract_boss_node(info)
        : info.specific_node;
}

/**
 * オプションに必要な調整を施して返す
 * @param options 
 * @returns 
 */
const adjust_option = (
    options: OptionsType,
): OptionsType => {
    return {
        ...options,
        '7-3': {
            ...options['7-3'],
            phase: '2',
        },
    };
}

/**
 * シミュ結果から目標Nodeへの到達率を合算して返す
 * @param sim_results 
 * @param target_node 
 * @returns 
 */
const calc_reach_target_rate = (
    sim_results: SimResult[],
    target_node: string,
): Big => {
    return sim_results.reduce((total, current) => {
        return current.route.includes(target_node)
            ? total.plus(current.rate)
            : total;
    }, new Big(0));
}

type EvalueteReachParam = {
    area_id: NormalAreaId,
    target_node: string,
}

const filter_reach_target_data = (
    reach_params: EvalueteReachParam[],
    fleet: AdoptFleet,
    options: OptionsType,
): AreaSimResult[] => {
    const adjusted_options = adjust_option(options);
    const result: AreaSimResult[] = reach_params.map(reach_param => {
        const sim_executer = derive_sim_executer(
            fleet,
            reach_param.area_id,
            adjusted_options,
            [],
        )
        const sim_result = start_sim(sim_executer);
        const reach_rate =
            calc_reach_target_rate(sim_result, reach_param.target_node).times(100);
        const area_sim_result: AreaSimResult = {
            area_id: reach_param.area_id,
            reach_rate,
        };

        return area_sim_result;
    });
    
    return result;
}

const evaluate_condition = (
    condition: QuestCompositionCondition,
    fleet: AdoptFleet,
): CompositionCondition => {
    const codititon_state = condition(fleet);
    if (codititon_state === 'No_conditions') return 'No_conditions';
    if (
        is_fleet_combined(fleet.fleet_type) ||
        is_fleet_striking(fleet.fleet_type, fleet.fleets[0].units.length)
    ) return false;
    return codititon_state;
}

export type ViewQuestData = {
    name: string,
    icon: QuestIconType,
    zekamashi_id: string,
    composition_condition_state: CompositionCondition,
    area_sim_results: AreaSimResult[],
}

export function calc_view_quest_data(
    quest_datas: QuestData[],
    fleet: AdoptFleet,
    options: OptionsType,
): ViewQuestData[] {
    const view_quest_datas: ViewQuestData[] = quest_datas.map(quest_data => {
        const composition_condition_state =
            evaluate_condition(quest_data.condition, fleet);
         const evaluate_reach_params: EvalueteReachParam[] = quest_data.target_areas.map(target_area => {
            const target_node = calc_target_node(target_area);
            const area_id = is_normal_area_id(target_area)
                ? target_area
                : target_area.area;

            return {
                area_id,
                target_node,
            }
        });

         const area_sim_results: AreaSimResult[] = filter_reach_target_data(
            evaluate_reach_params,
            fleet,
            options,
         );

        const view_quest_data: ViewQuestData = {
            name: quest_data.name,
            icon: quest_data.icon,
            zekamashi_id: quest_data.zekamashi_id,
            composition_condition_state,
            area_sim_results,
        };

        return view_quest_data;
    });

    return view_quest_datas;
}

export function filter_by_period(
    view_quest_datas: readonly ViewQuestData[],
    period: QuestPeriod,
): ViewQuestData[] {
    return view_quest_datas.filter(data =>
        QUEST_ICON_PERIOD_MAP[data.icon] === period,
    );
}

export function filter_both_area(
    view_quest_datas: readonly ViewQuestData[],
    area_id: NormalAreaId,
): readonly ViewQuestData[] {
    return view_quest_datas.filter(data =>
        data.area_sim_results.some(result => result.area_id === area_id),
    );
}