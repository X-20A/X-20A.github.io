import { DisallowToSortie } from "../../../errors/CustomError";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_carriers, count_ships_by_names } from "../../../models/fleet/AdoptFleet";
import { is_fleet_carrier, is_fleet_combined, is_fleet_surface } from "../../../models/fleet/predicate";
import { CalcFnWithCondition } from "..";
import { includes_ship_names } from "../../../models/ship/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_62_2: CalcFnWithCondition = (
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
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                if (phase <= 1) {
                    if (ships_length !== 6) {
                        throw new DisallowToSortie('出撃地点2解放前は通常艦隊のみ出撃できます');
                    }
                    return '1';
                }
                if (ships_length === 6 && Ds === 6) {
                    return '2';
                }
                if (ships_length === 5 && Ds === 5) {
                    return '2';
                }
                if (ships_length === 4 && Ds >= 3) {
                    return '2';
                }
                if (includes_ship_names(['明石改', '朝日改', '秋津洲改'], ship_names) && Ds >= 3) {
                    return '2';
                }
                if (AO + LHA === 1 && Ds >= 3) {
                    return '2';
                }
                if (Ds <= 1) {
                    return '1';
                }
                if (ships_length <= 6 && AO + LHA === 0) {
                    return '1';
                }
                if (BBs + count_carriers(fleet) >= 1) {
                    return '1';
                }
                return '2';
            }
            if (phase <= 2) {
                throw new DisallowToSortie('出撃地点3が未開放のため出撃できません');
            }
            if (phase >= 4 && is_fleet_carrier(fleet_type)) {
                return '4';
            }
            return '3';
        case '3':
            if (count_carriers(fleet) <= 2 && CLs >= 2 && Ds >= 3) {
                return 'Q';
            }
            return 'E';
        case 'A3':
            if (route.includes('A2')) {
                if (BBs + count_carriers(fleet) >= 1 && Ds >= 3) {
                    return 'B2';
                }
                return 'C';
            }
            if (BBs <= 2 && CVH <= 1 && Ds >= 2) {
                return 'B1';
            }
            return 'B';
        case 'B1':
            if (Ds >= 4) {
                return 'F';
            }
            if (Ds === 3 && BBs + CVH === 0) {
                return 'F';
            }
            return 'B2';
        case 'B2':
            if (phase <= 1) {
                if (Ds >= 4) {
                    return 'D';
                }
                if (Ds === 3 && ships_length <= 5 && is_fleet_speed_fast_or_more(speed)) {
                    return 'D';
                }
                return 'C';
            }
            if (route.includes('A2')) {
                if (ships_length <= 5) {
                    return 'C';
                }
                if (Ds <= 3) {
                    return 'C';
                }
                if (CLE >= 1) {
                    return 'D';
                }
                return 'E';
            }
            if (CLE >= 1 && Ds >= 3) {
                return 'F';
            }
            return 'E';
        case 'C':
            if (seek.c4 >= 68) {
                return 'C2';
            }
            return 'C1';
        case 'G':
            if (is_fleet_combined(fleet_type)) {
                return 'G1';
            }
            if (CVH >= 1) {
                return 'H';
            }
            if (BBs + CVL >= 2) {
                return 'H';
            }
            return 'G1';
        case 'G1':
            if (phase >= 3 && !is_fleet_combined(fleet_type)) {
                if (BBs + CVs === 0 && AV <= 1 && CLs <= 1 && Ds >= 5) {
                    return 'K';
                }
                return 'G2';
            }
            if (BBs + CVH >= 5) {
                return 'G2';
            }
            return 'K';
        case 'I':
            if (CAs >= 1) {
                return 'B1';
            }
            if (Ds >= 4) {
                return 'J';
            }
            if (Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            return 'B1';
        case 'J':
            if (Ds === 7) {
                return 'K';
            }
            if (Ds === 6 && ships_length === 6) {
                return 'K';
            }
            if (Ds === 5 && ships_length === 5) {
                return 'K';
            }
            if (Ds === 4 && ships_length === 4) {
                return 'K';
            }
            if (
                count_ships_by_names(['明石改', '朝日改', '秋津洲改'], ship_names) === 1
                && Ds >= 5
                && count_ships_by_names(['明石改', '朝日改', '秋津洲改'], ship_names) + AO + LHA + Ds === ships_length
            ) {
                return 'K';
            }
            return 'G1';
        case 'K':
            if (count_ships_by_names(['明石改', '朝日改', '秋津洲改'], ship_names) >= 1) {
                return 'R';
            }
            return 'L';
        case 'R':
            return 'L';
        case 'L':
            if (is_fleet_combined(fleet_type)) {
                return 'S';
            }
            return 'M';
        case 'O':
            if (seek.c4 >= 77) {
                return 'P';
            }
            return 'N';
        case 'Q':
            if (is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (is_fleet_carrier(fleet_type)) {
                return 'G';
            }
            if (is_fleet_surface(fleet_type)) {
                if (CL >= 2 && Ds >= 4) {
                    return 'G';
                }
                return 'D';
            }
            break;
        case 'T':
            if (route.includes('3')) {
                if (seek.c2 >= 70) {
                    return 'V';
                }
                return 'U';
            }
            if (route.includes('4')) {
                return 'W';
            }
            return 'W';
        case 'W':
            if (CVH <= 1 && CL >= 2 && DD >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'X1';
            }
            return 'W2';
        case 'W2':
            if (BBs <= 2 && CVs <= 4 && CVH <= 2 && Ds >= 3) {
                return 'X1';
            }
            return 'X2';
        case 'X1':
            return 'X';
        case 'A1':
            return option.A1;
    }

    omission_of_conditions(node, sim_fleet);
}