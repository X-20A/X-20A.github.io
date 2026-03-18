import { CalcFnNoCondition } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_1_3: CalcFnNoCondition = (
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
            if (AO + AV >= 1) {
                return 'A';
            }
            if (CVs >= 1) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'A':
            if (AO >= 1) {
                return 'D';
            }
            if (DE >= 4) {
                return 'D';
            }
            if (AV >= 1) {
                return [
                    { node: 'D', rate: 0.8 },
                    { node: 'E', rate: 0.2 },
                ];
            }
            if (Ds >= 4) {
                return [
                    { node: 'D', rate: 0.8 },
                    { node: 'E', rate: 0.2 },
                ];
            }
            if (Ss >= 1) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'F':
            if (CVH >= 1) {
                return 'H';
            }
            if (SBB_count >= 1) {
                return 'H';
            }
            if (CAV >= 1 && DD >= 2) {
                return 'J';
            }
            if (DD >= 4) {
                return 'J';
            }
            if (CLE >= 1 && Ds >= 4) {
                return 'J';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return [
                    { node: 'H', rate: 0.4 },
                    { node: 'J', rate: 0.6 },
                ];
            }
            return [
                { node: 'H', rate: 0.6 },
                { node: 'J', rate: 0.4 },
            ];
        case 'H':
            if (AO >= 1) {
                return 'G';
            }
            if (AV + CAV >= 1) {
                return 'J';
            }
            if (CLE >= 1 && DD >= 2) {
                return 'J';
            }
            if (DD >= 2) {
                return [
                    { node: 'G', rate: 0.4 },
                    { node: 'I', rate: 0.2 },
                    { node: 'J', rate: 0.4 },
                ];
            }
            return [
                { node: 'I', rate: 0.6 },
                { node: 'J', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}