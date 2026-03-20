import { CalcFnNoCondition } from "..";
import { is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_2_5: CalcFnNoCondition = (
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
            if (Ss >= 4) {
                return 'B';
            }
            if (Ss >= 1 && BBs <= 3 && (CVs >= 1 || AV >= 2)) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'C', rate: 0.5 },
                ];
            }
            if (CVs >= 1 || AV >= 2) {
                return 'C';
            }
            if (drum_carrier_count >= 2 || Ds >= 4) {
                return 'B';
            }
            if (CL >= 1 && Ds >= 3) {
                return 'B';
            }
            if (BBs >= 1) {
                return 'C';
            }
            if (CL + CLT >= 1 && CAV >= 2) {
                return 'C';
            }
            if (CL + CLT >= 1 && CAV >= 1 && CAV + CL + CLT >= 5) {
                return 'C';
            }
            if (ships_length === 6) {
                return [
                    { node: 'B', rate: 0.8 },
                    { node: 'C', rate: 0.2 },
                ];
            }
            return [
                { node: 'B', rate: 0.05 },
                { node: 'C', rate: 0.95 },
            ];
        case 'B':
            if (Ss >= 3) {
                return 'A';
            }
            return 'F';
        case 'C':
            if (CVs >= 3 || BBs >= 3) {
                return 'D';
            }
            if (CL >= 1 && DD >= 2) {
                return 'E';
            }
            if (CAV >= 2 && DD >= 2) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.3 },
                { node: 'E', rate: 0.7 },
            ];
        case 'E':
            if (BBs >= 1) {
                return 'G';
            }
            if (CL >= 1 && Ds >= 4) {
                return 'I';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'G';
            }
            if (CVH + CAs >= 2) {
                return 'G';
            }
            if (CL >= 1 && DD >= 3) {
                return 'I';
            }
            return 'G';
        case 'F':
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (DD >= 3) {
                return 'E';
            }
            if (CL >= 1 && DD >= 2) {
                return 'E';
            }
            return [
                { node: 'E', rate: 0.35 },
                { node: 'J', rate: 0.65 },
            ];
        case 'G':
            if (BBCVs <= 1 && Ds >= 4) {
                return 'I';
            }
            if (BBCVs === 0 && CL >= 1 && DD >= 3) {
                return 'I';
            }
            if (seek.c1 < 37) {
                return 'K';
            }
            if (seek.c1 < 41 && seek.c1 >= 37) {
                return [
                    { node: 'K', rate: 0.5 },
                    { node: 'L', rate: 0.5 },
                ];
            }
            return 'L'; // f_seek.c1 >= 41
        case 'I':
            if (seek.c1 < 31) {
                return 'H';
            }
            if (seek.c1 < 34 && seek.c1 >= 31) {
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            return 'O'; // f_seek.c1 >= 34
        case 'J':
            if (seek.c1 < 42) {
                return 'H';
            }
            if (seek.c1 < 49 && seek.c1 >= 42) {
                if (BBCVs >= 4) {
                    return [
                        { node: 'H', rate: 0.333 },
                        { node: 'M', rate: 0.333 },
                        { node: 'O', rate: 0.334 },
                    ];
                }
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (BBCVs >= 4) {
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (seek.c1 >= 49) {
                return 'O';
            }
            break; // 索敵値より例外なし
        case 'L':
            if (CL >= 1 && DD >= 2) {
                return 'O';
            }
            if (BBCVs === 0) {
                return [
                    { node: 'N', rate: 0.4 },
                    { node: 'O', rate: 0.6 },
                ];
            }
            return [
                { node: 'N', rate: 0.6 },
                { node: 'O', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}