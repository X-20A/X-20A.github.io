import { CalcFnNoCondition } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_5_4: CalcFnNoCondition = (
    node,
    sim_fleet,
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
            if (CVs > 0) {
                return 'B';
            }
            if (BBs > 2 || CAs > 4) {
                return 'A';
            }
            if (
                drum_carrier_count + craft_carrier_count > 4 ||
                DD > 3
            ) {
                return 'B';
            }
            if (CL === 1 && DD > 2) {
                return 'B';
            }
            return 'A';
        case 'A':
            if (Ss > 0 || BBs > 4 || DD > 1 || CAs > 2) {
                return 'D';
            }
            return 'F';
        case 'B':
            if (CVs + Ss > 0) {
                return 'C';
            }
            if (BBs > 0 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (BBV + SBB_count > 1) {
                return 'D';
            }
            if (
                is_fleet_speed_faster_or_more(speed) ||
                (CL === 1 && DD > 2) ||
                DD > 3
            ) {
                return 'E';
            }
            if (DD === 0) {
                return 'D';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'D':
            if (Ss > 0 || SBB_count > 1 || BBs > 2) {
                return 'F';
            }
            if (DD > 1) {
                return 'E';
            }
            return 'F';
        case 'G':
            if (Ss > 0 || BBs > 3) {
                return 'K';
            }
            if (CVH < 3) {
                return 'L';
            }
            return [
                { node: 'K', rate: 0.3 },
                { node: 'L', rate: 0.7 },
            ];
        case 'L':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (seek.c2 < 56) {
                return 'N';
            }
            if ((seek.c2 < 60 && seek.c2 >= 56) || BBs + CVH > 4) {
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (seek.c2 >= 60) {
                return 'P';
            }
            break; // LoSより例外なし
        case 'M':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (seek.c2 < 41) {
                return 'O';
            }
            if ((seek.c2 < 45 && seek.c2 >= 41)) {
                return [
                    { node: 'O', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (seek.c2 >= 45) {
                if (Ss > 0) {
                    return [
                        { node: 'O', rate: 0.334 },
                        { node: 'P', rate: 0.666 },
                    ];
                }
                return 'P';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}