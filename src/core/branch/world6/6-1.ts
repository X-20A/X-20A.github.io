import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_6_1(
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
            if (BBCVs + CAs > 2 || BBs > 1) {
                return 'B';
            }
            if (Ss > 2 && Ss === ships_length) {
                return 'A';
            }
            if (AS === 1 && Ss > 2 && AS + Ss === ships_length) {
                return 'A';
            }
            if (AS === 1 && Ss === 3 && DD === 2) {
                return 'A';
            }
            if (AS === 1 && Ss === 4 && CL + DD === 1) {
                return 'A';
            }
            if (CL + DD === 0) {
                return 'B';
            }
            return 'C';
        case 'A':
            if (AS > 0) {
                return 'F';
            }
            return 'D';
        case 'G':
            if (Ss < 3 || BBCVs + CAs === 2 || seek[3] < 12) {
                return 'I';
            }
            if (AS > 0 && seek[3] >= 16) {
                return 'H';
            }
            if (AS === 0 && seek[3] >= 16) {
                return [
                    { node: 'H', rate: 0.85 },
                    { node: 'I', rate: 0.15 },
                ];
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'I', rate: 0.5 },
            ];
        case 'H':
            if (seek[3] < 20) {
                return 'E';
            }
            if (AS > 0) {
                if (seek[3] < 25 && seek[3] >= 20) {
                    return [
                        { node: 'E', rate: 0.5 },
                        { node: 'K', rate: 0.5 },
                    ];
                }
                if (seek[3] >= 25) {
                    return 'K';
                } // LoSより例外なし
            }
            if (seek[3] < 25 && seek[3] >= 20) {
                return [
                    { node: 'E', rate: 0.333 },
                    { node: 'J', rate: 0.333 },
                    { node: 'K', rate: 0.334 },
                ];
            }
            if (seek[3] < 36 && seek[3] >= 25) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek[3] >= 36) {
                return 'K';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}