import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_7_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
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
                CVH > 1 ||
                SBB_count > 1 ||
                Ss > 0 ||
                CL === 0 ||
                Ds < 2
            ) {
                return 'C';
            }
            if (Ds > 2) {
                return 'D';
            }
            if (CVH > 0 || CVL > 1 || BBs > 2 || CAs > 2) {
                return 'C';
            }
            return 'D';
        case 'D':
            if (is_fleet_speed_fastest(speed)) {
                return 'F';
            }
            if (CVH > 1) {
                return 'E';
            }
            if (CVL > 2) {
                return 'E';
            }
            if (BBs + CVH + CAs > 2) {
                return 'E';
            }
            if (CL + DD === 0) {
                return 'E';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            if (Ds > 2) {
                return 'F';
            }
            if (BBs < 2) {
                return 'F';
            }
            if (Ds < 2) {
                return 'E';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'E';
            }
            return 'F';
        case 'F':
            return option.F === 'G'
                ? 'G'
                : 'J';
        case 'H':
            return option.H === 'I'
                ? 'I'
                : 'K';
        case 'I':
            if (seek[3] < 53) {
                return 'L';
            }
            if (seek[3] < 59 && seek[3] >= 53) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (seek[3] >= 59) {
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
                CVH > 0 ||
                CVL > 2 ||
                SBB_count > 1 ||
                BBs + CAs > 2 ||
                Ds < 2
            ) {
                return 'N';
            }
            if (Ds > 2 || is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'O':
            return option.O === 'P'
                ? 'P'
                : 'Q';
        case 'P': // 🤧
            if (seek[3] < 58) {
                return 'S';
            }
            if (seek[3] < 63 && seek[3] >= 58) {
                if (is_fleet_speed_fastest(speed)) {
                    return [
                        { node: 'S', rate: 0.333 },
                        { node: 'T', rate: 0.667 },
                    ];
                }
                if (
                    CV > 0 ||
                    BBs + CVL > 1 ||
                    BBs + CAs > 2 ||
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
            } else if (seek[3] >= 63) {
                if (is_fleet_speed_fastest(speed)) {
                    return 'T';
                }
                if (
                    CV > 0 ||
                    BBs + CVL > 1 ||
                    BBs + CAs > 2 ||
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