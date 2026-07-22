import { DisallowToSortie } from "../../../errors/CustomError";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_carriers, count_France_ships, count_ships_by_base_names, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { is_fleet_carrier, is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_62_5: CalcFnWithCondition = (
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
            if (phase <= 1) {
                if (is_fleet_combined(fleet_type)) {
                    throw new DisallowToSortie('出撃地点2解放前は通常艦隊のみ出撃できます');
                }
                return '1';
            }
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            if (is_fleet_transport(fleet_type)) {
                return '2';
            }
            if (phase === 2) {
                return '2';
            }
            if (phase <= 4) {
                if (BBs <= 4 && CVH <= 2 && count_carriers(fleet) <= 3 && AO + LHA + AV + AS <= 2 && CLE >= 2) {
                    return '3';
                }
                return '2';
            }
            if (BBs <= 4 && CVH <= 2 && count_carriers(fleet) <= 3 && AO + LHA + AV + AS <= 2 && CLE >= 2) {
                return '3';
            }
            if (BBs >= 5) {
                return '4';
            }
            if (count_Yamato_class(fleet) >= 1) {
                return '4';
            }
            if (CVH >= 3) {
                return '4';
            }
            if (CAs >= 3) {
                return '4';
            }
            if (count_France_ships(fleet) >= 3) {
                return '4';
            }
            if (count_ships_by_base_names(['Algerie'], base_ship_names) >= 1) {
                return '4';
            }
            return '2';
        case '1':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'A';
            }
            if (Ds <= 1) {
                return 'A1';
            }
            if (CL >= 2) {
                return 'A';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'A';
            }
            return 'A1';
        case '2':
            if (phase <= 1) {
                if (is_fleet_transport(fleet_type)) {
                    return 'H';
                }
                return 'A3';
            }
            if (BBs >= 4) {
                return 'A3';
            }
            if (CAs >= 2) {
                return 'K';
            }
            return 'H';
        case '4':
            if (Ss >= 1) {
                return 'M2';
            }
            if (count_Yamato_class(fleet) >= 1 && is_fleet_carrier(fleet_type)) {
                return 'M2';
            }
            if (Ds >= 4) {
                if (CL >= 2) {
                    return 'U';
                }
                if (count_ships_by_base_names(['Gotland', 'Visby'], base_ship_names) >= 1) {
                    return 'U';
                }
                return 'T';
            }
            if (
                count_ships_by_base_names(['Algerie'], base_ship_names) >= 1
                && is_fleet_speed_fast_or_more(speed)
            ) {
                return 'T';
            }
            return 'M2';
        case 'A2':
            if (seek.c4 < 82) {
                return 'A3';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'B1';
            }
            return 'B';
        case 'A3':
            if (phase <= 1) {
                return 'C1';
            }
            if (!is_fleet_combined(fleet_type)) {
                return 'C1';
            }
            return 'I';
            break;
        case 'D':
            if (CVs >= 2) {
                return 'E';
            }
            return 'E1';
        case 'E1':
            if (phase <= 1) {
                return 'E2';
            }
            if (seek.c4 < 82) {
                return 'F';
            }
            if (ships_length >= 6) {
                return 'G';
            }
            return 'E2';
        case 'H':
            if (phase <= 2) {
                return 'I';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'I';
            }
            if (option.Force_de_Raid !== '1') {
                return 'I';
            }
            return 'K';
        case 'K':
            if (Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'K2';
            }
            return 'K1';
        case 'L':
            if (phase >= 4 && BBs >= 3) {
                return 'Q';
            }
            return 'L2';
        case 'M':
            if (CVH <= 1 && Ds >= 4) {
                return 'M1';
            }
            return 'M2';
        case 'M1':
            if (count_Yamato_class(fleet) === 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'M2':
            if (route.includes('3')) {
                return 'M1';
            }
            if (route.includes('4')) {
                if (is_fleet_speed_slow(speed)) {
                    return 'T';
                }
                return 'U';
            }
            break;
        case 'P1':
            if (count_Yamato_class(fleet) === 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'P3';
            }
            return 'P2';
        case 'Q':
            return 'S';
        case 'V':
            if (count_Yamato_class(fleet) >= 1 && BBs >= 4) {
                return 'W';
            }
            if (Ss >= 1) {
                return 'X';
            }
            if (count_ships_by_base_names(['Gotland', 'Visby'], base_ship_names) >= 1) {
                return 'X';
            }
            return 'W';
        case 'Y1':
            return 'Z';
        case 'Z':
            return 'ZZ';
        case 'Z1':
            return 'ZZ';
        case 'C':
            return option.C;
        case 'K3':
            return option.K3;
        case 'O':
            return option.O;
    }

    omission_of_conditions(node, sim_fleet);
}
