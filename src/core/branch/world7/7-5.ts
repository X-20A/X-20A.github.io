import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_7_5: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
            fleet, fleet_type, ships_length, speed, seek, route,
            arBulge_carrier_count, SBB_count,
            BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
            AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
        } = destructuring_assignment_helper(sim_fleet);

    switch (node) {
        case null:
            return '1';
        case 'B':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'D';
            }
            if (
                CVH >= 2 ||
                SBB_count >= 2 ||
                Ss >= 1 ||
                CL === 0 ||
                Ds <= 1
            ) {
                return 'C';
            }
            if (Ds >= 3) {
                return 'D';
            }
            if (CVH >= 1 || CVL >= 2 || BBs >= 3 || CAs >= 3) {
                return 'C';
            }
            return 'D';
        case 'D':
            if (is_fleet_speed_fastest(speed)) {
                return 'F';
            }
            if (CVH >= 2) {
                return 'E';
            }
            if (CVL >= 3) {
                return 'E';
            }
            if (BBs + CVH + CAs >= 3) {
                return 'E';
            }
            if (CL + DD === 0) {
                return 'E';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            if (Ds >= 3) {
                return 'F';
            }
            if (BBs <= 1) {
                return 'F';
            }
            if (Ds <= 1) {
                return 'E';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'E';
            }
            return 'F';
        case 'F':
            return option.F;
        case 'H':
            return option.H;
        case 'I':
            if (seek.c4 < 53) {
                return 'L';
            }
            if (seek.c4 < 59 && seek.c4 >= 53) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (seek.c4 >= 59) {
                return 'M';
            }
            break; // LoSより例外なし
        case 'J':
            if (
                (CVL === 1 && CAs === 2 && CL === 1 && Ds === 2) ||
                is_fleet_speed_faster_or_more(speed)
            ) {
                return 'O';
            }
            if (
                CVH >= 1 ||
                CVL >= 3 ||
                SBB_count >= 2 ||
                BBs + CAs >= 3 ||
                Ds <= 1
            ) {
                return 'N';
            }
            if (Ds >= 3 || is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'O':
            return option.O;
        case 'P': // 🤧
            if (seek.c4 < 58) {
                return 'S';
            }
            if (seek.c4 < 63 && seek.c4 >= 58) {
                if (is_fleet_speed_fastest(speed)) {
                    return [
                        { node: 'S', rate: 0.333 },
                        { node: 'T', rate: 0.667 },
                    ];
                }
                if (
                    CV >= 1 ||
                    BBs + CVL >= 2 ||
                    BBs + CAs >= 3 ||
                    CL === 0
                ) {
                    return [
                        { node: 'R', rate: 0.667 },
                        { node: 'S', rate: 0.333 },
                    ];
                }
                return [
                    { node: 'S', rate: 0.333 },
                    { node: 'T', rate: 0.667 },
                ];
            } else if (seek.c4 >= 63) {
                if (is_fleet_speed_fastest(speed)) {
                    return 'T';
                }
                if (
                    CV >= 1 ||
                    BBs + CVL >= 2 ||
                    BBs + CAs >= 3 ||
                    CL === 0
                ) {
                    return 'R';
                }
                return 'T';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}