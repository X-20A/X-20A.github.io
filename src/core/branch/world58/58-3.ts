import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_carriers } from "../../../models/fleet/AdoptFleet";
import { is_fleet_combined } from "../../../models/fleet/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_58_3: CalcFnWithCondition = (
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
            if (is_fleet_combined(fleet_type)) {
                return '1';
            } else {
                if (phase === 1) {
                    return '2';
                } else { // phase >= 2
                    if (AO >= 1) {
                        return '3';
                    }
                    if (
                        CL >= 1 &&
                        DD >= 3 &&
                        is_fleet_speed_fast_or_more(speed)
                    ) {
                        return '3';
                    }
                    if (count_carriers(fleet) >= 1) {
                        return '2';
                    }
                    if (BBs >= 1) {
                        return '2';
                    }
                    if (AO + LHA + AV >= 2) {
                        return '2';
                    }
                    if (phase <= 2) {
                        return '3';
                    } // option.phase === '3'else 
                    if (difficulty === 4 && AS >= 1 && Ss >= 3) {
                        return '4';
                    }
                    if (difficulty === 3 && Ss >= 3) {
                        return '4';
                    }
                    if (difficulty === 2 && Ss >= 2) {
                        return '4';
                    }
                    if (difficulty === 1 && Ss >= 1) {
                        return '4';
                    }
                    if (difficulty === 1 && Ds >= 3) {
                        return '4';
                    }
                    return '2';
                }
            }
            break;
        case 'B':
            if (BBCVs >= 6) {
                return 'C';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'D';
            }
            if (CL >= 2 && Ds >= 4) {
                return 'D';
            }
            return 'C';
        case 'D':
            if (BBCVs >= 7) {
                return 'E';
            }
            if (BBs >= 4) {
                return 'E';
            }
            if (CVH >= 3) {
                return 'E';
            }
            return 'F';
        case 'F':
            if (seek.c2 >= 65) {
                return 'O';
            }
            return 'G';
        case 'H':
            if (CL >= 1 && DD >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            return 'I';
        case 'I':
            if (BBCVs >= 5) {
                return 'L';
            }
            if (Ds <= 1) {
                return 'L';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'M';
            }
            if (BBs >= 2) {
                return 'L';
            }
            if (Ds >= 2) {
                return 'L';
            }
            return 'M'; // Dsよりデッドコード 条件通りではある
        case 'J':
            return 'N';
        case 'L':
            return 'M';
        case 'O':
            if (seek.c2 < 75) {
                return 'O1';
            }
            if (BBs <= 2) {
                return 'O3';
            }
            if (CL >= 2) {
                return 'O3';
            }
            return 'O2';
        case 'P':
            if (seek.c4 >= 98) {
                return 'R';
            }
            return 'Q';
        case 'R':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'U';
            }
            return 'S';
        case 'S':
            if (is_fleet_speed_slow(speed)) {
                return 'T';
            }
            return 'U';
        case 'W':
            if (AV + LHA >= 1) {
                return 'X';
            }
            if (difficulty === 4 && AS >= 1 && Ss >= 4) {
                return 'Y';
            }
            if (difficulty === 4 && DD >= 2) {
                return 'Y';
            }
            if (difficulty <= 3) {
                return 'Y';
            } return 'X';
        case 'Y':
            if (CAs + CLE + CLT + AV + LHA >= 3) {
                return 'Y1';
            }
            if (CAs + AV === 2) {
                return 'Y1';
            }
            if (DD >= 1) {
                return 'Y2';
            }
            if (Ss >= 5) {
                return 'Y2';
            }
            if (CAs + CLE + CLT + AV + LHA === 2) {
                return 'Y1';
            }
            if (Ss <= 3) {
                return 'Y1';
            }
            return 'Y2';
        case 'M':
            return option.M;
    }

    omission_of_conditions(node, sim_fleet);
}