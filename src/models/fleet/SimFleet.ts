import Big from 'big.js';
import CustomError from '@/errors/CustomError';
import { brandPreSailNull, type PreSailNull } from '@/types/brand';
import { type AdoptFleet, derive_adopt_fleet } from './AdoptFleet';
import { type CommandEvacuation, is_evacuation_node } from '../../core/CommandEvacuation';
import { derive_fleet_component } from './FleetComponent';

/**
 * 走査子の状態を表す型
 */
export type SimFleet = {
    readonly adopt_fleet: AdoptFleet;
    readonly route: (string | PreSailNull)[];
    readonly current_node: string | PreSailNull;
    readonly rate: Big;
    readonly progress_count: number;
}

/**
 * SimFleetあたりの許容する進行の回数(無限ループ防止)
 */
export const MAX_PROGRESS_COUNT = 30;

/**
 * 新規のSimFleetを返す
 * @returns 新規SimFleet
 */
export function derive_default_sim_fleet(
    fleet: AdoptFleet,
): SimFleet {
    return {
        adopt_fleet: fleet,
        route: [brandPreSailNull()],
        current_node: brandPreSailNull(),
        rate: new Big(1),
        progress_count: 0,
    };
}

/**
 * SimFleetのコピーを返す
 * @param sim_fleet コピー元
 * @returns SimFleetのコピー
 */
export function clone_sim_fleet(
    sim_fleet: SimFleet,
): SimFleet {
    return {
        adopt_fleet: sim_fleet.adopt_fleet,
        route: [...sim_fleet.route],
        current_node: sim_fleet.current_node,
        rate: new Big(sim_fleet.rate),
        progress_count: sim_fleet.progress_count,
    };
}

/**
 * nextNode に進む
 * @param sim_fleet 進行元SimFleet
 * @param next_node 進行するnode
 * @param rate 乗算する確率
 * @returns 進行後のSimFleet
 * @throws CustomError 無限ループ検知時
 */
export function progress_sim_fleet(
    sim_fleet: SimFleet,
    next_node: string,
    rate: number
): SimFleet {
    const new_route = [...sim_fleet.route, next_node];
    const new_rate = sim_fleet.rate.times(rate);
    const new_progress_count = sim_fleet.progress_count + 1;
    if (new_progress_count >= MAX_PROGRESS_COUNT) {
        console.group('Debug');
        console.log('経路: ', new_route);
        console.groupEnd();
        throw new CustomError('あー！無限ループ！');
    }
    return {
        ...sim_fleet,
        route: new_route,
        current_node: next_node,
        rate: new_rate,
        progress_count: new_progress_count,
    };
}

/**
 * CommandEvacuationによって任意艦が退避した後のSimFleetを返す
 * @param sim_fleet 
 * @param command_evacuations 
 * @param current_node 
 * @returns 
 */
export function calc_evacuated_fleet(
    sim_fleet: SimFleet,
    command_evacuations: CommandEvacuation[],
    current_node: string,
): SimFleet {
    if (!is_evacuation_node(command_evacuations, current_node)) return sim_fleet;

    // 対象ノードの退避艦を取得
    const evacuation =
        command_evacuations.find(evacuation => evacuation.node === current_node);
    if (!evacuation) return sim_fleet;

    // AdoptFleetの各FleetComponentから該当indexの艦を除外し、createFleetComponentで再生成
    const new_fleet_components = sim_fleet.adopt_fleet.fleets.map((fleet_component, fleet_index) => {
        const omit_unique_ids = evacuation.evacuation_ship_unique_ids[fleet_index] || [];
        const new_ships =
            fleet_component.units.filter((unit) => !omit_unique_ids.includes(unit.unit_index));

        return derive_fleet_component(new_ships);
    });

    // AdoptFleet再生成
    const new_adopt_fleet = derive_adopt_fleet(
        new_fleet_components,
        sim_fleet.adopt_fleet.fleet_type
    );

    // SimFleetを新しいAdoptFleetで返す
    return {
        ...sim_fleet,
        adopt_fleet: new_adopt_fleet,
    };
}