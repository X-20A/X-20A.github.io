import { CalcFnNoCondition } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_3_2: CalcFnNoCondition = (
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
            if (BBCVs >= 1) {
                return 'C';
            }
            if (CL === 1 && DD >= 4) {
                return 'C';
            }
            if (DD === 6) {
                return 'C';
            }
            return 'A';
        case 'C':
            if (DD <= 3) {
                return 'A';
            }
            if (BBs + CVH >= 2) {
                return 'A';
            }
            if (Ss >= 1) {
                return [
                    { node: 'A', rate: 0.5 },
                    { node: 'G', rate: 0.5 },
                ];
            }
            if (
                is_fleet_speed_slow(speed) ||
                radar_carrier_count === 0 ||
                CL + DD + AO <= 5
            ) {
                return 'G';
            }
            if (is_fleet_speed_fastest(speed) && radar_carrier_count >= 4) {
                return 'E';
            }
            if (is_fleet_speed_faster_or_more(speed) || AO >= 1) {
                return [
                    { node: 'E', rate: 0.4 },
                    { node: 'G', rate: 0.6 },
                ];
            }
            return 'G';
        case 'E':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            return [
                { node: 'D', rate: 0.2 },
                { node: 'F', rate: 0.8 },
            ];
        case 'G':
            if (Ss >= 1 || CVH >= 1 || BBs + CVL === 2) {
                return 'J';
            }
            if (
                is_fleet_speed_slow(speed) ||
                radar_carrier_count === 0 ||
                CL + DD + AO <= 5
            ) {
                return 'H';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            if (AO >= 1) {
                return [
                    { node: 'F', rate: 0.55 },
                    { node: 'H', rate: 0.45 },
                ];
            }
            return [
                { node: 'F', rate: 0.35 },
                { node: 'H', rate: 0.65 },
            ];
        case 'H':
            if (CL + DD + AO === 6) {
                return 'F';
            }
            return 'I';
    }

    omission_of_conditions(node, sim_fleet);
}