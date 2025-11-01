import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_6_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
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
            if (CL + DD > 3) {
                return 'B';
            }
            if (BBV + CAV + AV + LHA < 2 && Ss < 5) {
                if (BBCVs > 4) {
                    return 'B';
                }
                if (BBCVs > 3) {
                    return [
                        { node: 'B', rate: 0.65 },
                        { node: 'C', rate: 0.35 },
                    ];
                }
                return 'C';
            }
            return 'C';
        case 'B':
            if (CL + DD > 4) {
                return 'D';
            }
            if (CVs < 3 && BBs === 0) {
                return [
                    { node: 'C', rate: 0.7 },
                    { node: 'D', rate: 0.3 },
                ];
            }
            return 'C';
        case 'C':
            if (Ss === 6 || BBCVs > 4 || BBCVs + CAs === 6 || BBCVs + Ss === 6) {
                return 'A';
            }
            if (BBCVs < 3) {
                return 'E';
            }
            return 'D';
        case 'D':
            if (DD < 3 || BBCVs > 0 || CL + DD < 5) {
                return 'F';
            }
            return 'H';
        case 'E':
            if (BBs > 1 || CVs > 1 || DD < 2) {
                return 'F';
            }
            if (seek[2] < 43) {
                return 'I';
            }
            if (seek[2] < 50 && seek[2] >= 43) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (seek[2] >= 50) {
                return 'J';
            }
            break; // LoSより例外なし
        case 'H':
            if (seek[2] < 32) {
                return 'G';
            }
            return 'K';
        case 'I':
            if (Ss > 3) {
                return 'G';
            }
            if (seek[2] < 35) {
                return 'G';
            }
            if (seek[2] < 40 && seek[2] >= 35) {
                return [
                    { node: 'G', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (seek[2] >= 40) {
                return 'K';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}