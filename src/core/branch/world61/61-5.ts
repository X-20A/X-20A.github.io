import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";
import CustomError from "../../../errors/CustomError";
import { AdoptFleet, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { EquippedShip } from "../../../models/ship/EquippedShip";
import { includes_ship_name, includes_ship_type, is_CVs } from "../../../models/ship/predicate";
import { ST as ShipType } from "../../../data/ship";
import { ShipName } from "../../../types/shipName";

const TARGET_SHIP_NAMES: ShipName[] = [
    '伊勢改二', '日向改二',
    'あきつ丸改',
    '熊野丸', '熊野丸改',
    '山汐丸', '山汐丸改',
    'しまね丸', 'しまね丸改',
] as const;

const is_target_carrier = (
    ship: EquippedShip,
): boolean => {
    const {
        type,
        name,
    } = ship;
    return (
        is_CVs(type) ||
        includes_ship_name(TARGET_SHIP_NAMES, name)
    );
}

/**
 * 全ての対象艦が寒甲を所持しているか判定して返す
 * @param fleet 
 * @returns 
 */
const every_carriers_has_rench = (
    fleet: AdoptFleet,
): boolean => {
    return fleet.fleets.every(component => {
        const { units } = component;
        return units.every(unit => {
            const { ship } = unit;
            return !is_target_carrier(ship) ||
                ship.has_arctic_gear;
        })
    })
}

export function calc_61_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
        
    }

    omission_of_conditions(node, sim_fleet);
}