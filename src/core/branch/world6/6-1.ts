import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_6_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        seek,
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
            if (BBCVs + CAs > 2 || BBs > 1) {
                return 'B';
            }
            if (Ss > 2 && Ss === f_length) {
                return 'A';
            }
            if (AS === 1 && Ss > 2 && AS + Ss === f_length) {
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