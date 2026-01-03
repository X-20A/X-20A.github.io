import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_6_2: CalcFnNoCondition = (
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
            if (CL + DD > 3) {
                return 'B';
            }
            if (BBV + CAV + AV + LHA < 2 && Ss < 5) {
                if (BBCVs > 4) {
                    return 'B';
                }
                if (BBCVs > 3) {
                    return [
                        { node: 'B', rate: 0.65 },
                        { node: 'C', rate: 0.35 },
                    ];
                }
                return 'C';
            }
            return 'C';
        case 'B':
            if (CL + DD > 4) {
                return 'D';
            }
            if (CVs < 3 && BBs === 0) {
                return [
                    { node: 'C', rate: 0.7 },
                    { node: 'D', rate: 0.3 },
                ];
            }
            return 'C';
        case 'C':
            if (
                Ss === 6 ||
                BBCVs > 4 ||
                BBCVs + CAs === 6 ||
                BBCVs + Ss === 6
            ) {
                return 'A';
            }
            if (BBCVs < 3) {
                return 'E';
            }
            return 'D';
        case 'D':
            if (DD < 3 || BBCVs > 0 || CL + DD < 5) {
                return 'F';
            }
            return 'H';
        case 'E':
            if (BBs > 1 || CVs > 1 || DD < 2) {
                return 'F';
            }
            if (seek.c3 < 43) {
                return 'I';
            }
            if (seek.c3 < 50 && seek.c3 >= 43) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (seek.c3 >= 50) {
                return 'J';
            }
            break; // LoSより例外なし
        case 'H':
            if (seek.c3 < 32) {
                return 'G';
            }
            return 'K';
        case 'I':
            if (Ss > 3) {
                return 'G';
            }
            if (seek.c3 < 35) {
                return 'G';
            }
            if (seek.c3 < 40 && seek.c3 >= 35) {
                return [
                    { node: 'G', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek.c3 >= 40) {
                return 'K';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}