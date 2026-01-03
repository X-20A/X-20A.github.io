import { CalcFnNoCondition } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_1_2: CalcFnNoCondition = (
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
            if (Ds === 4 && ships_length < 6) {
                return 'A';
            }
            if (ships_length > 5) {
                return [
                    { node: 'A', rate: 0.4 },
                    { node: 'B', rate: 0.6 },
                ];
            }
            if (ships_length === 5) {
                return [
                    { node: 'A', rate: 0.5 },
                    { node: 'B', rate: 0.5 },
                ];
            }
            if (ships_length === 4) {
                return [
                    { node: 'A', rate: 0.6 },
                    { node: 'B', rate: 0.4 },
                ];
            }
            return [ // ships_length < 4
                { node: 'A', rate: 0.7 },
                { node: 'B', rate: 0.3 },
            ];
        case 'A':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'E';
            }
            if (Ds < 4) {
                return 'D';
            }
            if (Ds === 6) {
                return 'E';
            }
            if (CLE === 1 && Ds === 5) {
                return 'E';
            }
            if (CL === 1 && DD > 3) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.35 },
                { node: 'E', rate: 0.65 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
} 