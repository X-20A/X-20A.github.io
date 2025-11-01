import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_5_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
        is_faster: isFaster,
        seek,
        drum_carrier_count: drum,
        craft_carrier_count: craft,
        SBB_count,
    } = fleet;

    const {
        BB,
        BBV,
        CV,
        // CVB, // 単体で要求されることが無い
        CVL,
        CA,
        CAV,
        CL,
        CLT,
        CT,
        DD,
        DE,
        // SS, // 単体で要求されることが無い
        // SSV, // 単体で要求されることが無い
        AV,
        AO,
        LHA,
        AS,
        // AR, // 使う機会が無い
        BBs,
        CVH,
        CVs,
        BBCVs,
        CAs,
        CLE,
        Ds,
        Ss,
    } = fleet.composition;

    switch (node) {
        case null:
            return '1';
        case '1':
            if (CVs > 0) {
                return 'B';
            }
            if (BBs > 2 || CAs > 4) {
                return 'A';
            }
            if (drum + craft > 4 || DD > 3) {
                return 'B';
            }
            if (CL === 1 && DD > 2) {
                return 'B';
            }
            return 'A';
        case 'A':
            if (Ss > 0 || BBs > 4 || DD > 1 || CAs > 2) {
                return 'D';
            }
            return 'F';
        case 'B':
            if (CVs + Ss > 0) {
                return 'C';
            }
            if (BBs > 0 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (BBV + SBB_count > 1) {
                return 'D';
            }
            if (isFaster || (CL === 1 && DD > 2) || DD > 3) {
                return 'E';
            }
            if (DD === 0) {
                return 'D';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'D':
            if (Ss > 0 || SBB_count > 1 || BBs > 2) {
                return 'F';
            }
            if (DD > 1) {
                return 'E';
            }
            return 'F';
        case 'G':
            if (Ss > 0 || BBs > 3) {
                return 'K';
            }
            if (CVH < 3) {
                return 'L';
            }
            return [
                { node: 'K', rate: 0.3 },
                { node: 'L', rate: 0.7 },
            ];
        case 'L':
            if (isFaster) {
                return 'P';
            }
            if (seek[1] < 56) {
                return 'N';
            }
            if ((seek[1] < 60 && seek[1] >= 56) || BBs + CVH > 4) {
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (seek[1] >= 60) {
                return 'P';
            }
            break; // LoSより例外なし
        case 'M':
            if (isFaster) {
                return 'P';
            }
            if (seek[1] < 41) {
                return 'O';
            }
            if ((seek[1] < 45 && seek[1] >= 41)) {
                return [
                    { node: 'O', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (seek[1] >= 45) {
                if (Ss > 0) {
                    return [
                        { node: 'O', rate: 0.334 },
                        { node: 'P', rate: 0.666 },
                    ];
                }
                return 'P';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}