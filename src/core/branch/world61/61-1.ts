import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_61_1(
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
            return '1';
        case 'B':
            if (is_fleet_speed_slow(speed)) {
                return 'C';
            }
            if (Ds >= 3) {
                return 'E';
            }
            if (CL >= 1 && DD >= 2) {
                return 'E';
            }
            return 'C';
        case 'G':
            if (BBs >= 3) {
                return 'H';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                if (Ds >= 3) {
                    return 'I';
                }
                if (CL >= 1 && Ds >= 2) {
                    return 'I';
                }
                if (BB + CVs <= 1 && Ds >= 2) {
                    return 'I';
                }
                return 'H';
            }
            if (is_fleet_speed_slow(speed)) {
                if (CL >= 1 && Ds >= 3) {
                    return 'I';
                }
                return 'H';
            }
            break; // 速度より例外なし
        case 'J':
            if (BBs >= 3) {
                return 'K';
            }
            if (phase === 3 && DD === 7) {
                return 'K';
            }
            if (CL >= 1 && DD >= 2) {
                return 'L';
            }
            if (DD >= 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'K';
        case 'K':
            if (phase <= 2) {
                return 'L';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'Q';
            }
            if (Ds >= 6) {
                return 'Q';
            }
            return 'L';
        case 'M':
            if (phase === 1) {
                return 'N';
            }
            if (BBs >= 2) {
                return 'N';
            }
            if (CVH >= 1) {
                return 'N';
            }
            if (CL + Ds >= 4) {
                return 'O';
            }
            return 'N';
        case 'P':
            if (BBs >= 3) {
                return 'Q';
            }
            if (CVH >= 2) {
                return 'Q';
            }
            if (CVs >= 3) {
                return 'Q';
            }
            if (CVs === 2) {
                return 'R';
            }
            if (CL >= 1 && Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'S';
            }
            return 'R';
        case 'Q':
            if (BBs >= 3) {
                return 'S';
            }
            if (Ds >= 6) {
                return 'S';
            }
            return 'R';
        case 'T':
            if (DD === 7 && seek[3] >= 75) {
                return 'V';
            }
            if (DD <= 6 && seek[3] >= 85) {
                return 'V';
            }
            return 'U';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'F';
        case 'F':
            return option.F === 'G'
                ? 'G'
                : 'J';
        case 'L':
            return option.L === 'M'
                ? 'M'
                : 'P';
    }

    omission_of_conditions(node, sim_fleet);
}