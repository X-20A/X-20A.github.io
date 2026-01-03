import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_4_5: CalcFnWithCondition = (
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

    switch (node) {
        case null:
            return '1';
        case '1':
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'A':
            return option.A;
        case 'C':
            return option.C;
        case 'E':
            if (
                is_fleet_speed_faster_or_more(speed) ||
                AO > 0 ||
                BBCVs > 2
            ) {
                return 'M';
            }
            if (CL > 0 && Ds > 1) {
                return 'M';
            }
            return 'K';
        case 'G':
            if (CL > 0 && Ds > 1) {
                return 'H';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'H', rate: 0.5 },
            ];
        case 'H':
            if (is_fleet_speed_faster_or_more(speed) && BBCVs < 5) {
                return 'T';
            }
            if (CL === 1 && Ds > 2) {
                return 'T';
            }
            if (!route.includes('D') && CL === 1 && Ds > 1) {
                return 'T';
            }
            return 'K';
        case 'I':
            return option.I;
        case 'K':
            if (route.includes('E')) {
                return 'M';
            }
            if (BBs + CVH > 3) {
                return 'M';
            }
            if (BBCVs > 4) {
                return 'M';
            }
            if (AO > 0) {
                return 'M';
            }
            if (seek.c2 < 63) {
                return 'L';
            }
            if (seek.c2 < 70 && seek.c2 >= 63) {
                if (Ss > 0) {
                    return [
                        { node: 'L', rate: 0.333 },
                        { node: 'M', rate: 0.333 },
                        { node: 'T', rate: 0.334 },
                    ];
                }
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'T', rate: 0.5 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'T', rate: 0.5 },
                ];
            }
            if (seek.c2 >= 70) {
                return 'T';
            }
            break; // LoSより例外なし
        case 'M':
            if (is_fleet_speed_fastest(speed)) {
                return 'N';
            }
            if (DD < 2) {
                return 'R';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'N';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'R';
            }
            if (BBs + CVH < 2) {
                return 'N';
            }
            return 'R';
        case 'O':
            if (BBCVs > 4) {
                return 'N';
            }
            return [
                { node: 'N', rate: 0.5 },
                { node: 'T', rate: 0.5 },
            ];
        case 'Q':
            if (seek.c2 < 55) {
                return 'P';
            }
            if (seek.c2 < 59 && seek.c2 >= 55) {
                if (BBCVs > 4) {
                    return [
                        { node: 'O', rate: 0.5 },
                        { node: 'P', rate: 0.5 },
                    ];
                }
                if (DD === 0) {
                    return [
                        { node: 'O', rate: 0.5 },
                        { node: 'P', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (BBCVs > 4 || DD === 0) {
                return 'O';
            }
            return 'N'; // f_seek.c2 >= 59
        case 'R':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'N';
            }
            if (
                is_fleet_speed_fast_or_more(speed) &&
                CL + CAV > 0 &&
                DD > 1
            ) {
                return 'N';
            }
            return 'S';
    }

    omission_of_conditions(node, sim_fleet);
}