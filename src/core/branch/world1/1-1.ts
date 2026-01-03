import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_1_1: CalcFnNoCondition = (
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
        case 'A':
            if (ships_length === 1) {
                return [
                    { node: 'B', rate: 0.2 },
                    { node: 'C', rate: 0.8 },
                ];
            }
            if (ships_length === 2) {
                return [
                    { node: 'B', rate: 0.25 },
                    { node: 'C', rate: 0.75 },
                ];
            }
            if (ships_length === 3) {
                return [
                    { node: 'B', rate: 0.3 },
                    { node: 'C', rate: 0.7 },
                ];
            }
            if (ships_length === 4) {
                return [
                    { node: 'B', rate: 0.35 },
                    { node: 'C', rate: 0.65 },
                ];
            }
            if (ships_length === 5) {
                return [
                    { node: 'B', rate: 0.4 },
                    { node: 'C', rate: 0.6 },
                ];
            }
            if (ships_length >= 6) { // ships_lengthより例外なし
                return [
                    { node: 'B', rate: 0.55 },
                    { node: 'C', rate: 0.45 },
                ];
            }
    }

    omission_of_conditions(node, sim_fleet);
}