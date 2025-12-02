import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_61_2(
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
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            return '2' // is_fleet_combined(fleet_type)
        case '2':
            if (is_fleet_transport(fleet_type)) {
                if (BBV === 2) {
                    return 'N';
                }
                return 'K';
            }
            // 空母機動部隊, 水上打撃部隊
            // 通常艦隊は出撃地点で除かれる
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'K';
            }
            if (BBCVs >= 5) {
                return 'N';
            }
            if (BBs + CVH >= 4) {
                return 'N';
            }
            if (BBs >= 3) {
                return 'N';
            }
            if (CVH >= 3) {
                return 'N';
            }
            if (Ds >= 5) {
                return 'K';
            }
            if (Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'K';
            }
            if (CL >= 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'K';
            }
            return 'N';
        case 'B':
            if (seek.c4 >= 85) {
                return 'D';
            }
            return 'C';
        case 'D':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'K';
            }
            if (BBs >= 2) {
                return 'K';
            }
            if (CVH >= 1) {
                return 'K';
            }
            if (AV >= 2) {
                return 'K';
            }
            if (Ss >= 1) {
                return 'K';
            }
            return 'E';
        case 'F':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'I';
            }
            if (BBCVs >= 4) {
                return 'G';
            }
            if (Ds <= 2) {
                return 'G';
            }
            if (Ds >= 5) {
                return 'I';
            }
            if (seek.c4 >= 88) {
                return 'I';
            }
            return 'G';
        case 'G':
            if (seek.c4 >= 85) {
                return 'I';
            }
            return 'H';
        case 'K':
            if(!is_fleet_combined(fleet_type)) {
                if (is_fleet_speed_fast_or_more(speed)) {
                    if (CL >= 1) {
                        return 'L';
                    }
                    if (Ds >= 2) {
                        return 'L';
                    }
                    return 'E';
                }
                // 低速
                if (
                    BBs <= 1 &&
                    CVH === 0 &&
                    AV <= 1 &&
                    Ss === 0
                ) {
                    return 'L';
                }
                return 'E';
            }
            if (is_fleet_surface(fleet_type)) {
                return 'L';
            }
            if (is_fleet_transport(fleet_type)) {
                if (phase >= 2 && BBV === 0) {
                    return 'P';
                }
                return 'O';
            }
            // 空母機動部隊
            if (phase <= 2) {
                return 'O';
            }
            if (CVH >= 2) {
                return 'O';
            }
            if (Ds <= 3) {
                return 'O';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (
                BBs <= 1 &&
                CVs <= 2 &&
                CAs <= 2 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'P';
            }
            return 'O';
        case 'L':
            if (!is_fleet_combined(fleet_type)) {
                return 'M';
            }
            return 'O'; // 聯合艦隊
        case 'T':
            if (is_fleet_transport(fleet_type) && seek.c2 >= 35) {
                return 'V';
            }
            if (
                (is_fleet_carrier(fleet_type) || is_fleet_surface(fleet_type)) &&
                seek.c2 >= 68
            ) {
                return 'V';
            }
            return 'U';
        case 'V':
            if (phase <= 2) {
                return 'W';
            }
            if (is_fleet_carrier(fleet_type)) {
                if (Ds >= 5) {
                    return 'Y';
                }
                if (BBs >= 3) {
                    return 'W';
                }
                if (CVs >= 3) {
                    return 'W';
                }
                if (AV + AO + LHA >= 2) {
                    return 'W';
                }
                return 'Y';
            }
            if (is_fleet_surface(fleet_type)) {
                if (BBs >= 3) {
                    return 'W';
                }
                if (CVs >= 3) {
                    return 'W';
                }
                if (Ds >= 5) {
                    return 'Y';
                }
                if (AV + AO + LHA >= 2) {
                    return 'W';
                }
                return 'W';
            }
            if (is_fleet_transport(fleet_type)) {
                if (AV + AO + LHA >= 2) {
                    return 'W';
                }
                return 'Y';
            }
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'F';
    }

    omission_of_conditions(node, sim_fleet);
}