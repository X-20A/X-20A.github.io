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
            if (BBs >= 2 && Ds === 2) {
                return 'A1';
            }
            if (AV + LHA >= 3) {
                return 'A';
            }
            if (DE >= 3) {
                return 'A';
            }
            if (Ds >= 4) {
                return 'A';
            }
            return 'A2';
        case 'A':
            if (BBs + CVL >= 1) {
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
            if (BBs >= 1 && BBs + CVL >= 2 && Ds <= 2) {
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
            if (BBV === 2 && Ds === 4) {
                return 'C2';
            }
            if (Ss >= 1) {
                return  'C1';
            }
            if (CVH >= 1) {
                return 'C1';
            }
            if (ships_length <= 5) {
                return 'C';
            }
            if (BBs + CVL >= 2) {
                return 'C1';
            }
            if (BBs + CVL === 0) {
                return 'C';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'C';
            }
            if (Ds === 3) {
                return 'C';
            }
            return 'C1';
        case 'C1':
            if (route.includes('A')) {
                return 'C2';
            }
            return 'C';
        case 'E':
            if (BBs === 0 && seek.c4 >= 58) {
                return 'G';
            }
            if (BBs >= 1 && seek.c4 >= 65) {
                return 'G';
            }
            return 'F';
        case 'J':
            if (Ds >= 2) {
                return 'K';
            }
            return 'K1';
        case 'K':
            if (BBCVs <= 2 && CL >= 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'K2';
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
            if (Ds >= 2) {
                return 'T';
            }
            return 'Q2';
        case 'Q2':
            if (route.includes('P')) {
                return 'T';
            }
            if (route.includes('Q')) {
                return 'V';
            }
            break; // どちらかは経由する
        case 'V':
            if (BBCVs >= 4) {
                return 'W';
            }
            if (CVH >= 3) {
                return 'W';
            }
            if (Ds <= 1) {
                return 'W';
            }
            return 'X';
        case 'X':
            if (seek.c4 >= 88) {
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
