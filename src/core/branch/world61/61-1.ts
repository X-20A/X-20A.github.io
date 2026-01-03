import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_61_1: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
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
            if (BBs <= 1 && CL >= 1 && Ds >= 2) {
                return 'E';
            }
            return 'C';
        case 'G':
            if (is_fleet_speed_fast_or_more(speed)) {
                if (BBs >= 3) {
                    return 'H';
                }
                if (Ds <= 1) {
                    return 'H';
                }
                if (CL >= 1) {
                    return 'I';
                }
                if (CVH === 0) {
                    return 'I';
                }
                if (CVs <= 1) {
                    return 'I';
                }
                return 'H';
            }
            if (is_fleet_speed_slow(speed)) {
                if (BBs <= 2 && CL >= 1 && Ds >= 3) {
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
            if (CL + CT >= 1 && Ds >= 2) {
                return 'L';
            }
            if (Ds >= 2 && is_fleet_speed_fast_or_more(speed)) {
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
            if (Ds === 5 && ships_length <= 6) {
                return 'Q';
            }
            if (Ds === 4 && ships_length <= 5) {
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
            if (CVL >= 2) {
                return 'N';
            }
            if (Ds >= 4) {
                return 'O';
            }
            if (CL >= 1 && Ds === 3) {
                return 'O';
            }
            if (CL >= 1 && Ds === 2 && is_fleet_speed_fast_or_more(speed)) {
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
            if (CAs >= 3) {
                return 'Q';
            }
            if (Ds === 0) {
                return 'Q';
            }
            if (CVs === 2) {
                return 'R';
            }
            if (CAs === 2) {
                return 'R';
            }
            if (CL >= 1 && Ds >= 5 && Ss === 0) {
                return 'S';
            }
            if (CL >= 1 && Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'S';
            }
            return 'R';
        case 'Q':
            if (BBs >= 3 && is_fleet_speed_slow(speed)) {
                return 'R';
            }
            if (CVs >= 2) {
                return 'R';
            }
            return 'S';
        case 'T':
            if (DD === 7 && seek.c4 >= 70) {
                return 'V';
            }
            if (DD <= 6 && seek.c4 >= 82) {
                return 'V';
            }
            return 'U';
        case 'A':
            return option.A;
        case 'F':
            return option.F;
        case 'L':
            return option.L;
    }

    omission_of_conditions(node, sim_fleet);
}