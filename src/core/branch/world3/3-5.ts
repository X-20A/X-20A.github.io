import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_3_5: CalcFnNoCondition = (
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
            if (
                Ss >= 3 ||
                BBs >= 2 ||
                BBs + CAs >= 3 ||
                CVs + CLT >= 1
            ) {
                return 'B';
            }
            if (DD >= 5) {
                return 'F';
            }
            if (DD === 4) {
                return [
                    { node: 'B', rate: 0.25 },
                    { node: 'F', rate: 0.75 },
                ];
            }
            if (DD <= 3) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            break; // DDより例外なし
        case 'B':
            if (Ss >= 4 || CVs >= 4 || BBCVs >= 5) {
                return 'A';
            }
            if (
                CLT >= 2 ||
                CVs >= 2 ||
                BBs >= 3 ||
                BBCVs + CAs >= 5
            ) {
                return 'D';
            }
            if (CVs === 0 && CL === 1 && DD >= 2) {
                return 'E';
            }
            return 'C';
        case 'F':
            if (BBCVs + LHA >= 1 || CL + CLT >= 4 || CAs >= 2) {
                return 'E';
            }
            if (CAs === 1) {
                return [
                    { node: 'E', rate: 0.25 },
                    { node: 'G', rate: 0.75 },
                ];
            }
            if (CAs === 0) {
                if (CL === 3) {
                    return [
                        { node: 'E', rate: 0.15 },
                        { node: 'G', rate: 0.85 },
                    ];
                }
                if (CL <= 2) {
                    return 'G';
                }
            }
            break; // CAsより例外なし
        case 'G':
            if (seek.c4 < 23) {
                return 'I';
            }
            if (seek.c4 < 28 && seek.c4 >= 23) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek.c4 >= 28) {
                return 'K';
            }
            break; // 索敵より例外なし
        case 'H':
            if (BBCVs >= 4) {
                return 'J';
            }
            if (BBCVs >= 2 && LHA >= 1) {
                return 'J';
            }
            if (seek.c4 < 35) {
                return 'J';
            }
            if (seek.c4 < 40 && seek.c4 >= 35) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek.c4 >= 40) {
                return 'K';
            }
            break; // f_seekより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}