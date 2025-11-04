import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_3_3(
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
        case 'A':
            if (CVH > 0 || BBs + CVL > 3) {
                return 'C';
            }
            if (BBs + CVL === 1 && CL === 1 && DD === 4) {
                return 'C';
            }
            return 'B';
        case 'B':
            if (Ss > 0) {
                return [
                    { node: 'D', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (BBs + CVL < 2) {
                return 'F';
            }
            if (BBs + CVL < 3 && DD > 1) {
                return 'F';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'F', rate: 0.5 },
            ];
        case 'C':
            if (Ds < 2 || CVH > 1 || BBCVs > 2) {
                return 'E';
            }
            if (BBCVs === 2) {
                return 'G';
            }
            if (BBCVs === 1 && CL === 1 && DD === 4) {
                return 'G';
            }
            return 'E';
        case 'F':
            if (DD < 2 || BBs > 2) {
                return 'G';
            }
            if (Ss > 0) {
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (CL + CAV + AV > 0) {
                return 'J';
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'J', rate: 0.5 },
            ];
        case 'G':
            if (Ss > 0) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBCVs < 4) {
                return 'M';
            }
            if (BBCVs === 4) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBCVs === 5) {
                return [
                    { node: 'I', rate: 0.65 },
                    { node: 'M', rate: 0.35 },
                ];
            }
            if (BBCVs > 5) {
                return [
                    { node: 'I', rate: 0.85 },
                    { node: 'M', rate: 0.15 },
                ];
            }
            break; // BBCVsより例外なし
        case 'J':
            if (DD > 4) {
                return 'M';
            }
            if (CL === 1 && DD > 3) {
                return 'M';
            }
            return 'K';
        case 'K':
            if (Ss > 0) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBs + CVL < 2) {
                return 'M';
            }
            if (BBs + CVL === 2) {
                return [
                    { node: 'L', rate: 0.25 },
                    { node: 'M', rate: 0.75 },
                ];
            }
            if (BBs + CVL === 3) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            break; // Aで BBs + CVL >= 4 はCへ行く
    }

    omission_of_conditions(node, sim_fleet);
}