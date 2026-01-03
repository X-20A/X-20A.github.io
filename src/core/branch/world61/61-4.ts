import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";
import { DisallowToSortie } from "../../../errors/CustomError";
import { count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_61_4: CalcFnWithCondition = (
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
            if (!is_fleet_combined(fleet_type)) {
                if (phase <= 3) {
                    throw new DisallowToSortie('出撃地点4解放前は通常艦隊は出撃できません');
                }
                // phase === 4
                return '4';
            }
            // 連合艦隊
            if (phase === 1) {
                return '1';
            }
            if (phase === 2) {
                return '2';
            }
            if (phase >= 3) {
                if (AV >= 2 && Ds >= 4) {
                    return '1';
                }
                if (CL + CT >= 2 && Ds >= 5) {
                    return '1';
                }
                if (is_fleet_transport(fleet_type)) {
                    return '1';
                }
                if (is_fleet_surface(fleet_type)) {
                    return '2';
                }
                return '3' // 空母機動部隊
            }
        case '1':
            if (BBV >= 2) {
                return 'B1';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'A';
            }
            if (BBs >= 3) {
                return 'A';
            }
            if (CVH >= 1) {
                return 'A';
            }
            if (Ds <= 3) {
                return 'A';
            }
            if (Ds >= 6) {
                return 'A';
            }
            return 'B1';
        case '2':
            if (is_fleet_speed_fastest(speed)) {
                return 'F2';
            }
            if (is_fleet_speed_faster_or_more(speed) && CL >= 2) {
                return 'F';
            }
            if (CL >= 2 && Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'F';
            }
            return 'J';
        case '3':
            if (is_fleet_speed_fastest(speed) && CL >= 2) {
                return 'Q';
            }
            if (is_fleet_speed_fastest(speed) && DD >= 4) {
                return 'Q';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'O';
            }
            if (count_Yamato_class(fleet) >= 1) {
                return 'O';
            }
            if (CL >= 2) {
                return 'G'
            }
            if (Ds >= 4) {
                return 'G';
            }
            return 'O';
        case 'A':
            if (is_fleet_transport(fleet_type)) {
                return 'B';
            }
            if (BBs <= 2 && CVH === 0 && CVL <= 2 && Ds >= 4) {
                return 'B';
            }
            return 'B1';
        case 'B':
            if (route.includes('1')) {
                return 'H';
            }
            // route.includes('4')
            return 'U';
        case 'B1':
            if (route.includes('1')) {
                if (BBs + CVH >= 3) {
                    return 'B2';
                }
                if (Ds <= 3) {
                    return 'B2';
                }
                if (Ds >= 6) {
                    return 'B2';
                }
                if (CVH >= 1 && AV >= 2) {
                    return 'B2';
                }
                return 'C';
            }
            // route.includes('4')
            return 'V';
        case 'D':
            if (CVH >= 2) {
                return 'D1';
            }
            if (CVs >= 4) {
                return 'D1';
            }
            if (Ss >= 1) {
                return 'D1';
            }
            if (BBs <= 1) {
                return 'D2';
            }
            if (CL >= 2 && Ds >= 5 && is_fleet_speed_fast_or_more(speed)) {
                return 'D2';
            }
            return 'D1';
        case 'F':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F2';
            }
            if (phase >= 2 && BBs + CVH >= 5) {
                return 'K';
            }
            if (Ss >= 1) {
                return 'F1';
            }
            if (CVH <= 1) {
                return 'F2';
            }
            if (Ds <= 3) {
                return 'F1';
            }
            if (BBs + CVH <= 3) {
                return 'F2';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'F2';
            }
            return 'F1';
        case 'F2':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'G';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'F3';
            }
            if (BBs >= 3) {
                return 'F3';
            }
            if (CVs >= 4) {
                return 'F3';
            }
            if (CVH >= 3) {
                return 'F3';
            }
            return 'G';
        case 'G':
            if (route.includes('2')) {
                if (count_Yamato_class(fleet) >= 2) {
                    return 'L';
                }
                if (seek.c2 >= 80) {
                    return 'N';
                }
                return 'L';
            }
            // route.includes('3')
            return 'R';
        case 'H':
            if (seek.c2 >= 45) {
                return 'I';
            }
            return 'B3';
        case 'L':
            if (seek.c2 >= 75) {
                return 'N';
            }
            return 'M';
        case 'O':
            if (count_Yamato_class(fleet) >= 2) {
                return 'P';
            }
            if (CAs >= 2 && Ds === 2) {
                return 'P';
            }
            return 'Q';
        case 'Q':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'S';
            }
            return 'R';
        case 'R':
            if (count_Yamato_class(fleet) >= 2) {
                return 'R1';
            }
            if (CVH >= 3) {
                return 'R1';
            }
            return 'R2';
        case 'S':
            if (seek.c2 >= 80) {
                return 'T';
            }
            return 'M';
        case 'U':
            if (BBs + CVH >= 1) {
                return 'B1';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'X';
            }
            if (CL + CT >= 1 && Ds >= 3) {
                return 'V';
            }
            return 'B1';
        case 'V':
            if (count_Yamato_class(fleet) >= 1) {
                return 'W';
            }
            if (CVH >= 1) {
                return 'W';
            }
            if (CVL >= 3) {
                return 'W';
            }
            if (CAs >= 2) {
                return 'W';
            }
            if (Ss >= 1) {
                return 'W';
            }
            if (CL + CT === 0) {
                return 'W';
            }
            if (Ds <= 1) {
                return 'W';
            }
            return 'X';
        case 'X':
            if (seek.c4 >= 117) {
                return 'Z';
            }
            return 'Y';
        case 'C':
            return option.C;
    }

    omission_of_conditions(node, sim_fleet);
}