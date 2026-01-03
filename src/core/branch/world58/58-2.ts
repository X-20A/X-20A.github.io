import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined } from "../../../models/fleet/predicate";
import { count_carriers, count_ship } from "../../../models/fleet/AdoptFleet";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_58_2: CalcFnWithCondition = (
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
        difficulty: difficulty_string,
    } = option;
    const phase = Number(phase_string);
    const difficulty = Number(difficulty_string);

    switch (node) {
        case null:
            if (phase === 1) {
                return '1';
            }
            if (phase === 2) {
                if (is_fleet_combined(fleet_type)) {
                    return '2';
                }
                return '1';
            }
            if (phase === 3) {
                if (is_fleet_combined(fleet_type)) {
                    return '2';
                }
                if (BBs > 0) {
                    return '1';
                }
                if (count_carriers(fleet) > 0) {
                    return '1';
                }
                if (difficulty === 4 && Ss < 3) {
                    return '1';
                }
                if (difficulty === 3 && Ss < 2) {
                    return '1';
                }
                if (difficulty < 3 && Ss === 0) {
                    return '1';
                }
                return '3';
            }
            break; // phaseより例外なし
        case 'C':
            if (route.includes('1')) {
                if (is_fleet_speed_slow(speed)) {
                    return 'F';
                }
                if (CVH > 0) {
                    return 'F';
                }
                return 'D';
            }
            if (route.includes('3')) {
                return 'I';
            }
            break; // 1, 3以外からは来られない
        case 'D':
            if (!is_fleet_combined(fleet_type)) {
                if (seek.c4 >= 98) {
                    return 'D2';
                }
                return 'D1';
            }
            return 'N';
        case 'E':
            if (CVH > 0) {
                return 'F';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'G';
            }
            if (BBs > 1) {
                return 'F';
            }
            if (CL > 0 && Ds > 1) {
                return 'G';
            }
            return 'F';
        case 'H':
            if (route.includes('1')) {
                if (seek.c4 < 80) {
                    return 'K';
                }
                if (is_fleet_speed_slow(speed)) {
                    return 'J';
                }
                if (BBs > 1) {
                    return 'J';
                }
                if (count_ship(fleet, 'あきつ丸') + CVL > 1) {
                    return 'J';
                }
                return 'I';
            }
            if (route.includes('3')) {
                return 'V';
            }
            break;
        case 'I':
            if (Ss > 0) {
                return 'U';
            }
            return 'D3';
        case 'J':
            if (!is_fleet_combined(fleet_type)) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'N';
            }
            if (BBs > 2) {
                return 'N';
            }
            if (CVs > 2) {
                return 'N';
            }
            if (CL > 1 && DD > 4) {
                return 'P';
            }
            return 'N';
            break;
        case 'L':
            if (is_fleet_carrier(fleet_type)) {
                return 'M';
            }
            return 'D'; // fleet_type === Ft.f3
        case 'N':
            if (CVH > 0) {
                return 'O';
            }
            if (CVL > 2) {
                return 'O';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'P';
            }
            if (CL > 1 && DD > 2) {
                return 'P';
            }
            return 'O';
        case 'P':
            if (seek.c2 >= 62) {
                return 'R';
            }
            return 'Q';
        case 'T':
            if (CAs > 1) {
                return 'C';
            }
            if (CL > 1) {
                return 'C';
            }
            return 'U';
        case 'U':
            if (CAs > 0) {
                return 'H';
            }
            if (CL > 1) {
                return 'H';
            }
            if (difficulty === 1) {
                return 'V';
            }
            if (AV > 0) {
                return 'H';
            }
            if (AS > 0) {
                return 'V';
            }
            return 'H';
        case 'V':
            if (CAs + AV > 1) {
                return 'W';
            }
            if (difficulty === 4 && Ss > 3) {
                return 'X';
            }
            if (difficulty === 3 && Ss > 2) {
                return 'X';
            }
            if (difficulty === 2 && Ss > 1) {
                return 'X';
            }
            if (difficulty === 1) {
                return 'X';
            }
            return 'W';
        case 'B':
            return option.B;
    }

    omission_of_conditions(node, sim_fleet);
}