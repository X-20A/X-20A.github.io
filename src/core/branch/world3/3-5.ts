import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_3_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
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
            if (
                Ss > 2 ||
                BBs > 1 ||
                BBs + CAs > 2 ||
                CVs + CLT > 0
            ) {
                return 'B';
            }
            if (DD > 4) {
                return 'F';
            }
            if (DD === 4) {
                return [
                    { node: 'B', rate: 0.25 },
                    { node: 'F', rate: 0.75 },
                ];
            }
            if (DD < 4) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            break; // DDより例外なし
        case 'B':
            if (Ss > 3 || CVs > 3 || BBCVs > 4) {
                return 'A';
            }
            if (
                CLT > 1 ||
                CVs > 1 ||
                BBs > 2 ||
                BBCVs + CAs > 4
            ) {
                return 'D';
            }
             if (CVs === 0 && CL === 1 && DD > 1) {
                return 'E';
            }
            return 'C';
        case 'F':
            if (BBCVs + LHA > 0 || CL + CLT > 3 || CAs > 1) {
                return 'E';
            }
            if (CAs === 1) {
                return [
                    { node: 'E', rate: 0.25 },
                    { node: 'G', rate: 0.75 },
                ];
            }
            if (CAs === 0) {
                if (CL === 3) {
                    return [
                        { node: 'E', rate: 0.15 },
                        { node: 'G', rate: 0.85 },
                    ];
                }
                if (CL < 3) {
                    return 'G';
                }
            }
            break; // CAsより例外なし
        case 'G':
            if (seek[3] < 23) {
                return 'I';
            }
            if (seek[3] < 28 && seek[3] >= 23) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek[3] >= 28) {
                return 'K';
            }
            break; // 索敵より例外なし
        case 'H':
            if (BBCVs > 3) {
                return 'J';
            }
            if (BBCVs > 1 && LHA > 0) {
                return 'J';
            }
            if (seek[3] < 35) {
                return 'J';
            }
            if (seek[3] < 40 && seek[3] >= 35) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek[3] >= 40) {
                return 'K';
            }
            break; // f_seekより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}