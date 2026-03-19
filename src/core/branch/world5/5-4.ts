import { CalcFnNoCondition } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_5_4: CalcFnNoCondition = (
    node,
    sim_fleet,
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
            if (CVs >= 1) {
                return 'B';
            }
            if (BBs >= 3 || CAs >= 5) {
                return 'A';
            }
            if (
                drum_carrier_count + craft_carrier_count >= 5 ||
                DD >= 4
            ) {
                return 'B';
            }
            if (CL === 1 && DD >= 3) {
                return 'B';
            }
            return 'A';
        case 'A':
            if (Ss >= 1 || BBs >= 5 || DD >= 2 || CAs >= 3) {
                return 'D';
            }
            return 'F';
        case 'B':
            if (CVs + Ss >= 1) {
                return 'C';
            }
            if (BBs >= 1 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (BBV + SBB_count >= 2) {
                return 'D';
            }
            if (
                is_fleet_speed_faster_or_more(speed) ||
                (CL === 1 && DD >= 3) ||
                DD >= 4
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
            if (Ss >= 1 || SBB_count >= 2 || BBs >= 3) {
                return 'F';
            }
            if (DD >= 2) {
                return 'E';
            }
            return 'F';
        case 'G':
            if (Ss >= 1 || BBs >= 4) {
                return 'K';
            }
            if (CVH <= 2) {
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
            if ((seek.c2 < 60 && seek.c2 >= 56) || BBs + CVH >= 5) {
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
                if (Ss >= 1) {
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