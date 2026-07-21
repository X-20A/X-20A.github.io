import { DisallowToSortie } from "../../../errors/CustomError";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined } from "../../../models/fleet/predicate";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_62_3: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
        fleet, ship_names, base_ship_names, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CLs, CT, DD, DE,
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
            if (phase <= 1) {
                if (is_fleet_combined(fleet_type)) {
                    throw new DisallowToSortie('出撃地点2解放前は通常艦隊のみ出撃できます');
                }
                return '1';
            }
            if (is_fleet_combined(fleet_type)) {
                return '2';
            }
            if (phase >= 4) {
                if (difficulty === 4 && ships_length === 7 && Ss >= 4) {
                    return '3';
                }
                if (difficulty === 4 && ships_length === 7 && AS >= 1 && Ss >= 3) {
                    return '3';
                }
                if (difficulty === 3 && ships_length === 7 && Ss >= 3) {
                    return '3';
                }
                if (difficulty === 3 && ships_length === 7 && AS >= 1 && Ss >= 2) {
                    return '3';
                }
                if (difficulty === 2 && ships_length === 7 && Ss >= 2) {
                    return '3';
                }
                if (difficulty === 1 && ships_length === 7 && Ss >= 1) {
                    return '3';
                }
                if (difficulty === 1 && ships_length === 7 && DD >= 5) {
                    return '3';
                }
                return '1';
            }
            return '1';
        case '3':
            if (BBCVs >= 1) {
                return 'N';
            }
            return 'R';
        case 'A':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'A2';
            }
            if (CVH === 0 && CLs >= 1 && Ds >= 3) {
                return 'A2';
            }
            return 'A1';
        case 'A2':
            if (is_fleet_combined(fleet_type)) {
                return 'G';
            }
            if (phase >= 2 && is_fleet_speed_faster_or_more(speed) && DD >= 4) {
                return 'G';
            }
            if (AV >= 2) {
                return 'D';
            }
            if (CLE >= 2) {
                return 'D';
            }
            if (Ds >= 5) {
                return 'B';
            }
            if (Ss >= 1) {
                return 'D';
            }
            return 'B';
        case 'B1':
            if (CVH >= 1) {
                return 'C1';
            }
            if (AV >= 1) {
                return 'C1';
            }
            return 'B2';
        case 'C':
            if (CVH >= 1) {
                return 'B1';
            }
            if (phase >= 3 && is_fleet_speed_faster_or_more(speed)) {
                return 'C2';
            }
            if (phase >= 3 && CL >= 1 && Ds >= 5 && is_fleet_speed_fast_or_more(speed)) {
                return 'C2';
            }
            if (Ds >= 5) {
                return 'C1';
            }
            return 'B1';
        case 'C2':
            if (Ds >= 3) {
                return 'P';
            }
            return 'G';
        case 'D1':
            if (route.includes('E')) {
                return 'E1';
            }
            return 'D2';
        case 'E':
            if (BBs >= 2) {
                return 'D1';
            }
            if (CVH >= 1) {
                return 'D1';
            }
            return 'E1';
        case 'G':
            if (is_fleet_combined(fleet_type)) {
                return 'H';
            }
            return 'P';
        case 'I':
            if (BBs <= 2 && CVH <= 2 && CL >= 2 && DD >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'J';
        case 'J':
            if (CLE === 2 && Ds >= 4) {
                return 'L';
            }
            if (Ds >= 4) {
                return 'L1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'L1';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            break;
        case 'L':
            return 'O';
        case 'M':
            if (phase >= 5 && BBs <= 3 && CVH <= 2 && CLE >= 2) {
                return 'Y1';
            }
            return 'N';
        case 'N':
            if (!is_fleet_combined(fleet_type)) {
                return 'R';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'R';
            }
            if (CVs <= 2) {
                return 'R';
            }
            return 'Y1';
        case 'P':
            if (seek.c4 >= 80) {
                return 'Q';
            }
            return 'L2';
        case 'R':
            if (AS + Ss >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            return 'S';
        case 'T':
            if (BBCVs >= 1) {
                return 'U';
            }
            if (difficulty === 4 && AS + Ss >= 5) {
                return 'V';
            }
            if (difficulty === 3 && Ss >= 4) {
                return 'V';
            }
            if (difficulty === 2 && Ss >= 4) {
                return 'V';
            }
            if (difficulty === 1 && Ss >= 2) {
                return 'V';
            }
            if (difficulty === 1 && DD >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'V';
            }
            return 'U';
        case 'U':
            if (route.includes('R')) {
                return 'V';
            }
            if (CAs >= 2 && Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'Y';
            }
            return 'Y2';
        case 'V':
            if (difficulty === 4 && Ss >= 5) {
                return 'X';
            }
            if (difficulty === 4 && Ss >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            if (difficulty === 3 && Ss >= 4) {
                return 'X';
            }
            if (difficulty === 3 && Ss >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            if (difficulty === 2 && Ss >= 3) {
                return 'X';
            }
            if (difficulty === 2 && Ss >= 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            if (difficulty === 1 && Ss >= 3) {
                return 'X';
            }
            if (difficulty === 1 && Ss >= 2 && DD >= 2) {
                return 'X';
            }
            if (difficulty === 1 && Ss >= 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            return 'W';
        case 'Y':
            return 'Z';
        case 'Y2':
            if (Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'Y';
            }
            if (BBs + CVH >= 7) {
                return 'Y3';
            }
            if (CVs >= 5) {
                return 'Y3';
            }
            return 'Y';
        case 'B':
            return option.B;
        case 'D':
            return option.D;
        case 'H':
            return option.H;
    }

    omission_of_conditions(node, sim_fleet);
}
