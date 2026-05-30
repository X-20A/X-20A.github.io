import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_5_6: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
        fleet, ship_names, base_ship_names, fleet_type, ships_length, speed, seek, route,
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
            if (phase === 1) {
                return '1';
            }
            if (AV + LHA >= 1) {
                return '1';
            }
            if (BBs >= 2 && is_fleet_speed_slow(speed)) {
                return '1';
            }
            return '2';
        case '1':
            if (CVH >= 1) {
                return 'A1';
            }
            if (Ds <= 1) {
                return 'A1';
            }
            if (AV + LHA >= 3) {
                return 'A';
            }
            if (Ds === 2) {
                if (BBs >= 2) {
                    return 'A1';
                }
                return 'A2';
            }
            if (Ds === 3) {
                return 'A2';
            }
            if (Ds >= 4) {
                return 'A';
            }
            return omission_of_conditions(node, sim_fleet);
        case 'A':
            if (BBs >= 1 && CVL >= 1) {
                return 'B';
            }
            if (CAs >= 1 && is_fleet_speed_slow(speed)) {
                return 'B';
            }
            return 'C2';
        case 'A2':
            if (is_fleet_speed_slow(speed)) {
                return 'B';
            }
            if (CVH >= 1) {
                return 'B';
            }
            if (CAs >= 2) {
                return 'B';
            }
            if (Ds <= 1) {
                return 'B';
            }
            return 'C';
        case 'B':
            if (CVH >= 1) {
                return 'C1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'C';
            }
            if (Ds <= 2) {
                return 'C1';
            }
            if (BBs === 2 && Ds === 4) {
                return 'C2';
            }
            if (BBs + CVL >= 2) {
                return 'C1';
            }
            return 'C';
        case 'C1':
            if (route.includes('A')) {
                return 'C2';
            }
            return 'C';
        case 'E':
            if (seek.c4 >= 57) {
                return 'G';
            }
            return 'F';
        case 'J':
            return 'K';
        case 'K':
            if (is_fleet_speed_slow(speed)) {
                return 'K2';
            }
            if (BBCVs >= 3) {
                return 'K2';
            }
            return 'L';
        case 'L':
            if (seek.c4 >= 80) {
                return 'N';
            }
            return 'M';
        case 'Q': {
            if (phase < 3) {
                return 'Q2';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'W';
            }
            if (CL >= 1 && Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'W';
            }
            if (CVH >= 3) {
                return 'Q2';
            }
            if (BBs >= 2 && CL === 0) {
                return 'Q2';
            }
            if (Ds <= 1) {
                return 'Q2';
            }
            return 'U';
        }
        case 'Q1':
            return 'T';
        case 'Q2':
            if (route.includes('P')) {
                return 'T';
            }
            if (route.includes('Q')) {
                return 'V';
            }
            break; // どちらかは経由する
        case 'V':
            if (CVH >= 3) {
                return 'W';
            }
            if (BBCVs >= 4) {
                return 'W';
            }
            if (Ds <= 1) {
                return 'W';
            }
            return 'X';
        case 'X':
            if (seek.c4 >= 80) {
                return 'Z';
            }
            return 'Y';
        case 'I':
            return option.I;
        case 'O':
            return option.O;
    }

    omission_of_conditions(node, sim_fleet);
}
