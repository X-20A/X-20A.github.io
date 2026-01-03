import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined } from "../../../models/fleet/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_60_1: CalcFnWithCondition = (
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
        is_third: is_third_string,
    } = option;
    const phase = Number(phase_string);
    const is_third = Number(is_third_string);

    switch (node) {
        case null:
            if (phase === 1) {
                return '1';
            }
            if ((!is_fleet_combined(fleet_type) && ships_length === 7) || is_third === 1) {
                return '2';
            }
            if (BB > 0) {
                return '2';
            }
            if (BBV > 2) {
                return '2';
            }
            if (CVH > 0) {
                return '1';
            }
            if (CVL > 1) {
                return '2';
            }
            return '1';
        case '2':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            if (CLE > 0 && Ds > 2 && BBCVs < 3) {
                return 'F';
            }
            return 'B1';
        case 'B':
            if (CLE > 0 && Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'B2';
            }
            if (CLE > 0 && Ds > 1 && BBCVs === 0) {
                return 'B2';
            }
            return 'B1';
        case 'B1':
            if (route.includes('1')) {
                return 'B2';
            }
            if (BBCVs > 3) {
                return 'B2';
            }
            return 'F'; // route.includes('2')
        case 'B2':
            if (is_fleet_speed_slow(speed)) {
                if (DE > 1) {
                    return 'C1';
                }
                if (BBs + CAs + CLT > 0) {
                    return 'C';
                }
                return 'C1';
            }
            // f_speed !== Sp.s1
            if (BBCVs > 1) {
                return 'C1';
            }
            if (Ds > 2) {
                return 'C1';
            }
            if (Ds === 2 && BBCVs === 1) {
                return 'C1';
            }
            if (Ds === 2 && ships_length < 6) {
                return 'C1';
            }
            if (CL + Ds > 2 && ships_length === 5) {
                return 'C1';
            }
            if (ships_length < 5) {
                return 'C1';
            }
            return 'C';
        case 'C':
            if (phase < 3) {
                return 'G';
            }
            if (BBs === 0 && CVs < 2 && CLE > 0 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'I';
            }
            return 'G';
        case 'C1':
            if (phase < 3) {
                return 'C2';
            }
            if (Ss > 0) {
                return 'C2';
            }
            if (DE > 1) {
                return 'C2';
            }
            return 'K';
        case 'D':
            if (ships_length === 6) {
                return 'D1';
            }
            if (Ss > 0) {
                return 'D1';
            }
            if (BBCVs + CAs > 2) {
                return 'D1';
            }
            if (Ds < 2) {
                return 'D1';
            }
            if (DE > 2) {
                return 'D3';
            }
            if (CL + CVL === 1 && Ds === 3 && ships_length === 4) {
                return 'D3';
            }
            if (CL === 1 && Ds === 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'D3';
            }
            if (CVs === 1 && DD === 2 && DE === 2) {
                return 'D3';
            }
            return 'D2';
        case 'G':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'M';
            }
            if (CL > 0 && Ds > 1 && BBs < 2) {
                return 'M';
            }
            if (CL > 0 && Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'M';
            }
            return 'K';
        case 'K':
            if (CA > 1 && CL > 0 && DD > 1) {
                return 'M';
            }
            return 'L';
        case 'M':
            if (seek.c4 >= 62) {
                return 'O';
            }
            return 'N';
        case 'A':
            return option.A;
    }

    omission_of_conditions(node, sim_fleet);
}