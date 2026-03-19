import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_3_1: CalcFnNoCondition = (
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
        case 'C':
            if (Ds <= 1) {
                return 'D';
            }
            if (BBV + CL + AV + AO >= 3) {
                if (BBCVs >= 3) {
                    return [
                        { node: 'B', rate: 0.5 },
                        { node: 'D', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (AV + AO >= 1 && Ds >= 3) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (Ss >= 3) {
                return [
                    { node: 'D', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (BBCVs >= 3) {
                return 'D';
            }
            return 'F';
        case 'D':
            if (BBCVs >= 5 || Ss === 6) {
                return 'E';
            }
            if (AS === 1 && Ss === 5) {
                return 'G';
            }
            return 'F';
    }

    omission_of_conditions(node, sim_fleet);
}