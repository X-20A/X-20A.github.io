import { is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_ships_by_base_names } from "../../../models/fleet/AdoptFleet";
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
            if (CVs + count_ships_by_base_names(['あきつ丸'], base_ship_names) >= 2) {
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
            if (BBs + CVH >= 3) {
                return 'A1';
            }
            if (difficulty === 4 && CVH >= 1) {
                return 'A1';
            }
            return 'B';
        case 'C1':
            if (seek.c4 >= 66) {
                return 'C2';
            }
            return 'D';
        case 'E':
            if (phase >= 3 && AV + AS + AO + LHA >= 2) {
                return 'J';
            }
            if (BBCVs >= 2) {
                return 'F';
            }
            if (DE === 0 && is_fleet_speed_slow(speed)) {
                return 'F';
            }
            if (difficulty === 4 && BBCVs === 0 && DD >= 4) {
                return 'G';
            }
            if (difficulty <= 3 && DD >= 3) {
                return 'G';
            }
            return 'F';
        case 'G':
            if (phase <= 2) {
                return 'H';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (difficulty === 4 && CLE + CLT >= 1 && DD >= 3) {
                return 'H';
            }
            if (difficulty <= 3 && DD >= 3) {
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
            if (seek.c4 >= 73) {
                return 'I';
            }
            return 'D';
        case 'N':
            if (BBs + CVH === 0 && Ds >= 4) {
                return 'O';
            }
            return 'H';
        case 'O':
            if (CVH >= 1) {
                return 'O1';
            }
            if (Ds === 7) {
                return 'O1';
            }
            if (Ds === 6) {
                return 'O2';
            }
            if (CLE + CLT === 1 && Ds === 5) {
                return 'O2';
            }
            if (CL === 1 && DD === 4 && AV >= 1 && AV + CAs === 2) {
                return 'O2';
            }
            if (CL === 1 && DD === 4 && AO + LHA >= 1 && AO + LHA + AV + CVL === 2) {
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
            if (CAs >= 2) {
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
            if (Ds === 7) {
                return 'V2';
            }
            if (Ds === 6 && ships_length === 6) {
                return 'V2';
            }
            return 'U';
        case 'R':
            if (seek.c4 >= 72) {
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