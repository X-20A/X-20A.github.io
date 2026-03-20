import { is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_Reigo_ships, count_ships_by_base_names, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { includes_ship_names } from "../../../models/ship/predicate";

export const calc_60_6: CalcFnWithCondition = (
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
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            } else { // is_fleet_combined(fleet_type)
                if (phase >= 2 && BBs >= 3) {
                    return '3';
                }
                if (phase >= 2 && BBs + CVH >= 4) {
                    return '3';
                }
                if (is_fleet_transport(fleet_type)) {
                    return '2';
                }
                if (BBCVs >= 3) {
                    return '2';
                }
                return '1';
            }
            break;
        case 'A':
            if (is_fleet_combined(fleet_type)) {
                return 'C';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'B';
            }
            if (Ds >= 3) {
                return 'B';
            }
            return 'C';
        case 'D':
            if (is_fleet_combined(fleet_type)) {
                if (route.includes('1')) {
                    if (difficulty === 4 && count_Reigo_ships(fleet) <= 4) {
                        return 'E';
                    }
                    if (difficulty === 3 && count_Reigo_ships(fleet) <= 2) {
                        return 'E';
                    }
                    if (difficulty === 2 && count_Reigo_ships(fleet) <= 1) {
                        return 'E';
                    }
                    if (Ds >= 6 && BBs + CVH <= 2) {
                        return 'F';
                    }
                    return 'E';
                }
                // route.includes('2')
                return 'C2'
            }
            // !is_fleet_combined(fleet_type)
            if (Ds >= 3) {
                return 'F';
            }
            return 'E';
        case 'C2':
            if (route.includes('1')) {
                return 'D';
            }
            // route.includes('2')
            return 'I';
        case 'E':
            if (route.includes('1')) {
                return 'F';
            } else { // route.includes('2')
                if (is_fleet_speed_faster_or_more(speed)) {
                    return 'C2';
                }
                return 'D';
            }
            break;
        case 'H':
            if (seek.c2 < 65) {
                return 'E';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'C2';
            }
            return 'E';
        case 'J':
            if (is_fleet_transport(fleet_type)) {
                return 'J3';
            }
            if (count_Yamato_class(fleet) >= 1) {
                return 'J1';
            }
            if (AV + AO + LHA >= 3) {
                return 'J3';
            }
            if (phase <= 2) {
                return 'J2';
            }
            if (
                count_Reigo_ships(fleet) >= 4 &&
                Ds >= 4 &&
                BBs + CVH <= 3
            ) {
                return 'J1';
            }
            return 'J2';
        case 'J1':
            if (phase <= 2) {
                return 'J2';
            }
            if (is_fleet_speed_fastest(speed)) {
                return 'R';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J2';
            }
            if (count_Yamato_class(fleet) >= 1) {
                return 'J2';
            }
            if (count_ships_by_base_names(['榧', '杉'], base_ship_names) >= 1) {
                return 'P';
            }
            if (
                count_ships_by_base_names(
                    ['足柄', '大淀', '霞', '朝霜', '清霜'],
                    base_ship_names,
                ) >= 5) {
                return 'P';
            }
            if (Ds >= 4 && BBs + CVH <= 2) {
                return 'P';
            }
            return 'J2';
        case 'J2':
            if (phase !== 1 && is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (LHA >= 1) {
                return 'J3';
            }
            if (AV >= 2) {
                return 'J3';
            }
            if (phase === 1) {
                return 'K';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            if (BBs >= 4) {
                return 'K';
            }
            if (CAs === 1 && CL >= 2 && Ds >= 6 && CVH === 0) {
                return 'P';
            }
            if (
                CAs >= 2 &&
                Ds >= 5 &&
                CVH <= 2 &&
                count_Yamato_class(fleet) === 0
            ) {
                return 'P';
            }
            return 'K';
        case 'J3':
            if (count_Yamato_class(fleet) >= 1) {
                return 'J4';
            }
            if (BBs >= 4) {
                return 'J4';
            }
            if (CVH >= 3) {
                return 'J4';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'M';
            }
            if (CL >= 2) {
                return 'M';
            }
            return 'J4';
        case 'N':
            if (
                includes_ship_names(
                    ['明石改', '朝日改', '秋津洲改', '速吸改', '山汐丸改', '神威改母', '宗谷', 'しまね丸改'],
                    ship_names,
                )
            ) {
                return 'O1';
            }
            return 'O';
        case 'O1':
            return 'O';
        case 'S':
            if (is_fleet_speed_fastest(speed)) {
                return 'X';
            }
            if (BBs + CVH >= 4) {
                return 'W';
            }
            if (Ss >= 1 && AS === 0) {
                return 'W';
            }
            if (count_Yamato_class(fleet) >= 1 && CL <= 1) {
                return 'W';
            }
            if (
                difficulty === 4 &&
                count_Reigo_ships(fleet) >= 6 &&
                Ds >= 6
            ) {
                return 'X';
            }
            if ([3, 2].includes(difficulty) && count_Reigo_ships(fleet) >= 4 && Ds >= 4) {
                return 'X';
            }
            if (
                difficulty === 1 &&
                count_Reigo_ships(fleet) >= 1 &&
                Ds >= 3
            ) {
                return 'X';
            }
            return 'W';
        case 'T':
            return 'V';
        case 'X':
            return 'Z';
        case 'G':
            return option.G;
        case 'K':
            return option.K;
        case 'R':
            return option.R;
    }

    omission_of_conditions(node, sim_fleet);
}