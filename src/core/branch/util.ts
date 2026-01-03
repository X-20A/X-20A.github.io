import { OmissionOfConditions } from "../../errors/CustomError";
import { SimFleet } from "../../models/fleet/SimFleet";
import { PreSailNull } from "../../types/brand";

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
    throw new OmissionOfConditions('条件漏れ');
}