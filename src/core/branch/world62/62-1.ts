import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_62_1: CalcFnWithCondition = (
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
        difficulty: difficulty_string,
    } = option;
    const phase = Number(phase_string);
    const difficulty = Number(difficulty_string);

    switch (node) {
        case null:
            if (phase <= 3) {
                return '1';
            }
            if (phase >= 4) {
                if (ships_length === 7) {
                    return '2';
                }
                if (Ds === 6) {
                    return '2';
                }
                return '1';
            }
        case 'A':
            if (CVs >= 2) {
                return 'A2';
            }
            if (phase <= 1) {
                if (ships_length === 6) {
                    return 'A2';
                }
                if (ships_length === 5) {
                    return 'A1';
                }
                if (BBs + CVH >= 1) {
                    return 'A1';
                }
                return 'B';
            }
            if (difficulty === 4 && CVH >= 1) {
                return 'A1';
            }
            return 'B';
        case 'C1':
            if (seek.c4 >= 65) {
                return 'C2';
            }
            return 'D';
        case 'E':
            if (phase >= 3 && AV + AS + AO + LHA >= 2) {
                return 'J';
            }
            if (DE === 0 && is_fleet_speed_slow(speed)) {
                return 'F';
            }
            if (BBs + CVs === 0 && DD >= 4) {
                return 'G';
            }
            if (difficulty === 4) {
                return 'F';
            }
            if (Ss >= 1) {
                return 'F';
            }
            if (BBs >= 1) {
                return 'F';
            }
            if (DD <= 2) {
                return 'F';
            }
            return 'G';
        case 'G':
            if (phase <= 2) {
                return 'H';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (difficulty === 4 && CL >= 1 && DD === 3) {
                return 'H';
            }
            if (difficulty <= 3) {
                return 'H'
            }
            return 'J';
        case 'H':
            if (route.includes('2')) {
                return 'O';
            }
            if (phase === 1) {
                return 'D';
            }
            if (seek.c4 >= 75) {
                return 'I';
            }
            return 'D';
        case 'N':
            if (BBs + CVH === 0 && DD >= 4) {
                return 'O';
            }
            return 'H';
        case 'O':
            if (CVH >= 1) {
                return 'O1';
            }
            if (DD >= 6) {
                return 'O2';
            }
            if (CLE + CLT === 1 && DD === 5) {
                return 'O2';
            }
            if (CLE + CLT === 1 && DD === 4 && ships_length === 7 && is_fleet_speed_fast_or_more(speed)) {
                return 'O2';
            }
            if (CLE + CLT === 1 && DD === 4 && ships_length === 7 && AV + LHA >= 1) {
                return 'O2';
            }
            return 'O1';
        case 'O1':
            if (route.includes('P')) {
                return 'Q';
            }
            if (route.includes('N')) {
                return 'O2';
            }
            break;
        case 'P':
            if (BBs + CVs >= 1) {
                return 'O1';
            }
            return 'Q';
        case 'Q':
            if (BBs + CVs + CAs >= 1) {
                return 'Q1';
            }
            if (CLE + CLT >= 2) {
                return 'Q1';
            }
            return 'Q2';
        case 'Q2':
            if (DD >= 7) {
                return 'V2';
            }
            if (DD === 6 && ships_length === 6) {
                return 'V2';
            }
            return 'U';
        case 'R':
            if (seek.c4 >= 75) {
                return 'T';
            }
            return 'S';
        case 'V':
            if (seek.c4 >= 80) {
                return 'X';
            }
            return 'W';
        case 'B':
            return option.B;
        case 'C':
            return option.C;
        case 'M':
            return option.M;
    }

    omission_of_conditions(node, sim_fleet);
}