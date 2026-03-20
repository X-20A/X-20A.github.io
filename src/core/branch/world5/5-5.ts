import { CalcFnWithCondition } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_5_5: CalcFnWithCondition = (
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

    switch (node) {
        case null:
            return '1';
        case '1':
            if (DD >= 4) {
                return 'A';
            }
            if (drum_carrier_count >= 4) {
                return 'A';
            }
            if (craft_carrier_count >= 4) {
                return 'A';
            }
            return 'B';
        case 'B':
            if (CVH >= 3) {
                return 'K';
            }
            if (BBs + CLT >= 4) {
                return 'K';
            }
            if (CLT >= 3) {
                return 'K';
            }
            if (DD <= 1) {
                return 'K';
            }
            return 'F';
        case 'E':
            if (is_fleet_speed_fastest(speed)) {
                return 'H';
            }
            if ((DD >= 2 && is_fleet_speed_faster_or_more(speed))) {
                return 'H';
            }
            return 'G';
        case 'F':
            return option.F;
        case 'H':
            if (is_fleet_speed_fastest(speed)) {
                return 'N';
            }
            if (BBCVs >= 4) {
                return 'P';
            }
            if (DD <= 1) {
                return 'L';
            }
            return 'N';
        case 'I':
            if (BBCVs === 3 && DD >= 2) {
                return 'L';
            }
            return 'M';
        case 'M':
            if (route.includes('N')) {
                return 'O';
            }
            if (BBCVs >= 4) {
                return 'L';
            }
            if (DD <= 1) {
                return 'L';
            }
            return 'O';
        case 'N':
            if (route.includes('M')) {
                return 'O';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'O';
            }
            if (AO >= 1) {
                return 'O';
            }
            if (CVH >= 1) {
                return 'M';
            }
            if (BBs + CVL >= 3) {
                return 'M';
            }
            if (DD <= 1) {
                return 'M';
            }
            return 'O';
        case 'O':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'S';
            }
            if (seek.c2 < 63) {
                return 'R';
            }
            if ((seek.c2 < 66 && seek.c2 >= 63) || Ss >= 1) {
                return [
                    { node: 'S', rate: 0.5 },
                    { node: 'R', rate: 0.5 },
                ];
            }
            if (seek.c2 >= 66) {
                return 'S';
            }
            break; // LoSより例外なし
        case 'P':
            if (is_fleet_speed_fastest(speed)) {
                return 'S';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                if (Ss >= 1) {
                    return [
                        { node: 'Q', rate: 0.5 },
                        { node: 'S', rate: 0.5 },
                    ];
                }
                if (BBCVs <= 5) {
                    return 'S';
                }
                return [
                    { node: 'Q', rate: 0.5 },
                    { node: 'S', rate: 0.5 },
                ];
            }
            if (seek.c2 < 73) {
                return 'Q';
            }
            if ((seek.c2 < 80 && seek.c2 >= 73) || Ss >= 1 || BBCVs >= 5) {
                return [
                    { node: 'S', rate: 0.666 },
                    { node: 'Q', rate: 0.334 },
                ];
            }
            if (seek.c2 >= 80) {
                return 'S';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}