import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_carriers, count_not_equip_arctic_carriers } from "../../../models/fleet/AdoptFleet";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_58_1: CalcFnWithCondition = (
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
            if (phase === 1) {
                return '1';
            }
            if (count_carriers(fleet) === 0 && Ds > 3) {
                return '2';
            }
            if (
                count_carriers(fleet) > 0 &&
                count_not_equip_arctic_carriers(fleet) > 0
            ) {
                return '2';
            }
            if (AO + LHA > 0 && Ds > 2) {
                return '2';
            }
            if (AV > 1 && Ds > 2) {
                return '2';
            }
            if (phase === 3 && count_carriers(fleet) > 0) {
                return '3';
            }
            if (count_carriers(fleet) > 2) {
                return '1';
            }
            if (BBs > 0) {
                return '1';
            }
            if (Ss > 0 && AS === 0) {
                return '2';
            }
            if (AS > 1) {
                return '2';
            }
            if (phase === 3 && CA > 1 && Ds > 1 && CLE > 0) {
                return '3';
            }
            if (count_carriers(fleet) > 0 && Ds > 2) {
                return '2';
            }
            return '1';
        case '2':
            if (AV > 0) {
                return 'I';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'N';
            }
            if (AO + LHA === 2 && AO + LHA + Ds === 6) {
                return 'N';
            }
            if (
                AO + LHA === 1 &&
                AO + LHA + Ds === ships_length &&
                ships_length < 6
            ) {
                return 'N';
            }
            return 'I';
        case 'B':
            if (phase < 3) {
                return 'C';
            }
            if (
                CL > 0 &&
                DD > 2 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'W';
            }
            return 'C';
        case 'D':
            if (route.includes('1')) {
                return 'E';
            }
            if (route.includes('2')) {
                if (CVs > 2) {
                    return 'J';
                }
                if (DD < 2) {
                    return 'J';
                }
                if (is_fleet_speed_slow(speed)) {
                    return 'J';
                }
                return 'K';
            }
            break;
        case 'K':
            if (seek.c4 >= 68) {
                return 'M';
            }
            return 'L';
        case 'R':
            if (
                BBs < 3 &&
                CL + AV > 0 &&
                DD > 1 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'R2';
            }
            return 'R1';
        case 'R2':
            if (DD > 4) {
                return 'T';
            }
            if (
                CL > 0 &&
                DD > 3 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'T';
            }
            return 'S';
        case 'S':
            if (seek.c4 >= 80) {
                return 'T';
            }
            return 'U';
        case 'W':
            if (CA > 1 && DD > 1) {
                return 'R2';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'R';
            }
            if (BBs > 0 && CVH > 1 && CL === 0) {
                return 'R';
            }
            if (DD > 2) {
                return 'R2';
            }
            if (DD < 2) {
                return 'R';
            }
            if (CL === 0) {
                return 'R';
            }
            if (CVH > 2) {
                return 'R2';
            }
            if (CVH < 2) {
                return 'R2';
            }
            if (BBs === 0) {
                return 'R2';
            }
            if (seek.c4 >= 100) {
                return 'R2';
            }
            return 'R';
        case 'A':
            return option.A;
        case 'I':
            return option.I;
        case 'F':
            return option.F;
    }

    omission_of_conditions(node, sim_fleet);
}