import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_7_1: CalcFnNoCondition = (
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
            if (Ss > 0) {
                if (BBCVs > 0 || ships_length > 4) {
                    return [
                        { node: 'B', rate: 0.5 },
                        { node: 'D', rate: 0.5 },
                    ];
                }
                if (ships_length < 5) {
                    return [
                        { node: 'B', rate: 0.333 },
                        { node: 'D', rate: 0.333 },
                        { node: 'F', rate: 0.334 },
                    ];
                } // ships_lengthより例外なし
            }
            if (BBCVs > 0 || ships_length > 5) {
                return 'B';
            }
            if (ships_length === 5 || AO > 0) {
                return 'D';
            }
            if (ships_length < 5) {
                return 'F';
            }
            break; // ships_lengthより例外なし
        case 'B':
            if (BBs + CVH > 0 || CVL > 1 || CAs > 2) {
                return 'A';
            }
            if (DD + DE > 1) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'D':
            if (CL === 1 && DD === 4) {
                return 'E';
            }
            if (DD > 0 && DE > 2) {
                return 'E';
            }
            if (AO > 0 && DE > 2) {
                return 'E';
            }
            if (Ds === 5) {
                return 'E';
            }
            if (Ds === 4) {
                if (CT + AO > 0) {
                    return 'E';
                }
                if (AV > 0) {
                    return [
                        { node: 'C', rate: 0.5 },
                        { node: 'E', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'C', rate: 0.5 },
                    { node: 'E', rate: 0.5 },
                ];
            }
            return [
                { node: 'C', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'H':
            if (CL > 0 && DD > 3) {
                return 'K';
            }
            if (DD > 0 && DE > 2) {
                return 'K';
            }
            if (AO > 0) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (BBCVs > 1) {
                return 'J';
            }
            if (BBCVs === 1) {
                return [
                    { node: 'I', rate: 0.333 },
                    { node: 'J', rate: 0.333 },
                    { node: 'K', rate: 0.334 },
                ];
            }
            return [
                { node: 'I', rate: 0.225 },
                { node: 'J', rate: 0.075 },
                { node: 'K', rate: 0.7 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}