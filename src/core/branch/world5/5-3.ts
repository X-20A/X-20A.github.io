import { CalcFnWithCondition } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_5_3: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
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
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'D';
            }
            if (BBCVs >= 3 || (BBCVs === 2 && is_fleet_speed_slow(speed))) {
                return 'C';
            }
            if (Ss >= 1) {
                return [
                    { node: 'C', rate: 0.4 },
                    { node: 'D', rate: 0.6 },
                ];
            }
            return 'D';
        case 'B':
            return [
                { node: 'A', rate: 0.65 },
                { node: 'F', rate: 0.35 },
            ];
        case 'E':
            if (Ss >= 1 || (BBCVs >= 1 && DD <= 1)) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'Q', rate: 0.5 },
                ];
            }
            if (CL >= 1 || CAs >= 4 || DD >= 4) {
                return 'Q';
            }
            return [
                { node: 'B', rate: 0.5 },
                { node: 'Q', rate: 0.5 },
            ];
        case 'G':
            if (BBV + CVH + Ss >= 1) {
                return 'J';
            }
            if (DD === 0 || CVL >= 2) {
                return 'I';
            }
            if (CVL === 1) {
                return 'J';
            }
            if (DD === 1) {
                return 'I';
            }
            if (SBB_count >= 2) {
                return 'J';
            }
            return 'I';
        case 'I':
            if (CVL >= 1 || BBs >= 3) {
                return 'J';
            }
            if (DD >= 3 || (CL >= 1 && DD >= 2)) {
                return 'O';
            }
            if (BBs >= 2) {
                return 'J';
            }
            if (DD >= 2) {
                return 'O';
            }
            if (CL >= 1 && CAs >= 4 && CAs + CL + DD === 6) {
                return 'O';
            } return [
                { node: 'J', rate: 0.5 },
                { node: 'O', rate: 0.5 },
            ];
        case 'J':
            if (Ss >= 1) {
                return [
                    { node: 'L', rate: 0.333 },
                    { node: 'M', rate: 0.333 },
                    { node: 'N', rate: 0.334 },
                ];
            }
            if (BBCVs >= 4 || CVH >= 1 || CVL >= 2) {
                return 'M';
            }
            if (CVL === 1) {
                if (SBB_count >= 2) {
                    return 'N';
                }
                if (BBV >= 1) {
                    return [
                        { node: 'L', rate: 0.5 },
                        { node: 'N', rate: 0.5 },
                    ];
                }
                if (DD >= 3 || (CL >= 1 && DD >= 2) || (CAs === 3 && DD === 2)) {
                    return 'L';
                }
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'N', rate: 0.5 },
                ];
            }
            return [
                { node: 'L', rate: 0.5 },
                { node: 'N', rate: 0.5 },
            ];
        case 'O':
            return option.O;
        case 'K':
            if (DD >= 4 || (DD === 3 && CL === 1)) {
                return 'H';
            }
            if (DD === 2 && (
                is_fleet_speed_faster_or_more(speed)
                || BBV + AO + AS >= 1
                || drum_carrier_count >= 2
                || craft_carrier_count >= 2
            )) {
                return 'H';
            }
            return 'E';
    }

    omission_of_conditions(node, sim_fleet);
}