import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_1_5: CalcFnNoCondition = (
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
        case 'D':
            if (ships_length === 1) {
                return 'E';
            }
            if (ships_length > 4) {
                if (Ss > 0) {
                    return 'F';
                }
                return [
                    { node: 'E', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (DE === ships_length) {
                return 'E';
            }
            if (AO > 0) {
                return 'E';
            }
            return 'F';
        case 'E':
            if (ships_length > 4) {
                return 'C';
            }
            if (ships_length === DE) {
                return 'J';
            }
            return 'C';
        case 'C':
            if (ships_length === DE) {
                return 'J';
            }
            if (CL === 1 && DE === 4 && ships_length === 5) {
                return 'J';
            }
            if (ships_length < 5 && AO > 0) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            return 'B';
        case 'F':
            if (BB + CVH + Ss > 0) {
                return 'I';
            }
            if (CVL > 1) {
                return 'I';
            }
            if (CL > 2) {
                return 'I';
            }
            return 'G';
        case 'G':
            if (ships_length > 4) {
                return 'H';
            }
            return 'J';
    }

    omission_of_conditions(node, sim_fleet);
}