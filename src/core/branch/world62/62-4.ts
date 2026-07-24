import { DisallowToSortie } from "../../../errors/CustomError";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_carriers, count_ships_by_base_names, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { is_fleet_carrier, is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";
import { CalcFnWithCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_62_4: CalcFnWithCondition = (
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
            if (phase === 2) {
                return '2';
            }
            if (is_fleet_transport(fleet_type)) {
                return '2';
            }
            if (AO + LHA + AV >= 2) {
                return '2';
            }
            if (AO + LHA + AV + AS >= 3) {
                return '2';
            }
            return '3';
        case '1':
            if (BBs + count_carriers(fleet) >= 1) {
                return 'E';
            }
            if (CAs >= 2 && Ds >= 4) {
                return 'A';
            }
            if (CAs === 2 && Ds === 3) {
                return 'A';
            }
            return 'E';
        case 'A':
            if (CAs + CLs + Ds === ships_length && is_fleet_speed_fast_or_more(speed)) {
                return 'C';
            }
            return 'B';
        case 'E1':
            if (!is_fleet_combined(fleet_type)) {
                if (phase >= 2 && Ds <= 3 && Ss === 0) {
                    return 'K';
                }
                return 'E2';
            }
            return 'K';
        case 'F':
            if (is_fleet_carrier(fleet_type)) {
                return 'H';
            }
            if (is_fleet_surface(fleet_type)) {
                return 'H';
            }
            if (BBV + CVL + count_ships_by_base_names(['あきつ丸'], base_ship_names) >= 1 && CAs === 2 && is_fleet_speed_slow(speed)) {
                return 'G';
            }
            return 'E1';
        case 'H':
            return 'J';
        case 'J':
            if (route.includes('2')) {
                return 'K';
            }
            if (route.includes('3')) {
                return 'P';
            }
            break;
        case 'L':
            if (seek.c2 >= 50) {
                return 'N';
            }
            return 'M';
        case 'O':
            if (BBs >= 3) {
                return 'J';
            }
            if (CVH >= 2) {
                return 'J';
            }
            if (CVL >= 3) {
                return 'J';
            }
            if (CL >= 2) {
                return 'P';
            }
            if (Ds >= 4) {
                return 'P';
            }
            return 'J';
        case 'P1':
            if (phase <= 2) {
                return 'Q';
            }
            if (BBs >= 4) {
                return 'Q';
            }
            return 'T';
        case 'Q':
            return 'R';
        case 'T1':
            if (seek.c2 < 80) {
                return 'P2';
            }
            if (count_Yamato_class(fleet) >= 2 && is_fleet_speed_slow(speed)) {
                return 'U';
            }
            if (is_fleet_carrier(fleet_type)) {
                return 'U';
            }
            if (CL >= 2 && Ds >= 4) {
                return 'V';
            }
            if (Ds >= 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'V';
            }
            if (CVH === 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'V';
            }
            return 'U';
        case 'T2':
            if (route.includes('U')) {
                return 'Y';
            }
            if (CVH >= 4) {
                return 'U';
            }
            if (count_Yamato_class(fleet) >= 2 && CL >= 1 && Ds <= 3) {
                return 'U';
            }
            if (is_fleet_carrier(fleet_type) && is_fleet_speed_fast_or_more(speed)) {
                return 'Y';
            }
            return 'U';
        case 'U':
            if (phase <= 2) {
                return 'V';
            }
            if (count_Yamato_class(fleet) >= 1) {
                if (!route.includes('T2')) {
                    return 'T2';
                }
                return 'Y1';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'Y1';
            }
            if (BBs >= 3) {
                return 'Y1';
            }
            if (CVH >= 3) {
                return 'Y1';
            }
            if (CAs === 2 && Ds >= 3) {
                return 'Y';
            }
            if (CL >= 2 && Ds >= 3) {
                return 'Y';
            }
            if (Ds >= 4) {
                return 'Y';
            }
            return 'Y1';
        case 'V':
            if (count_Yamato_class(fleet) >= 1) {
                return 'W';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            if (CL >= 2) {
                return 'X';
            }
            if (Ds >= 6) {
                return 'X';
            }
            return 'W';
        case 'Y':
            if (seek.c2 >= 85) {
                return 'Z';
            }
            return 'Y2';
        case 'P':
            return option.P;
        case 'T':
            return option.T;
    }

    omission_of_conditions(node, sim_fleet);
}
