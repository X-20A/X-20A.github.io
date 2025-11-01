import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_3_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        is_faster: isFaster,
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
            if (CL + Ds === 0 || BBCVs > 2) {
                return 'A';
            }
            if (BBCVs === 2 || Ss > 0) {
                return [
                    { node: 'A', rate: 0.35 },
                    { node: 'B', rate: 0.65 },
                ];
            }
            if (BBCVs === 1) {
                return 'B';
            }
            if (BBCVs === 0) {
                if (DD < 3) {
                    return [
                        { node: 'B', rate: 0.65 },
                        { node: 'D', rate: 0.35 },
                    ];
                } else {
                    return 'D';
                }
            }
            break; // BBCVsより例外なし
        case 'C':
            if (CVH > 2 || CL + Ds === 0 || BBCVs > 4) {
                return 'B';
            }
            if (BBCVs === 2) {
                return 'F';
            }
            if (AV + AO > 0) {
                return 'E';
            }
            if (AS > 0) {
                return [
                    { node: 'E', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            return 'F';
        case 'F':
            if (BBCVs + CAs > 4) {
                return 'G';
            }
            if (BBs + CVH < 3 && CL > 0 && Ds > 1) {
                if (isFaster) {
                    return 'J';
                }
                return [
                    { node: 'G', rate: 0.1 },
                    { node: 'J', rate: 0.45 },
                    { node: 'M', rate: 0.45 },
                ];
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'M', rate: 0.5 },
            ];
        case 'H':
            if (DD < 3 || CL + DD < 4 || CVH > 0 || BBs + CVL > 1) {
                return 'G';
            }
            if (CL + DD > 4) {
                return 'L';
            }
            if (CL === 0) {
                return 'G';
            }
            return [
                { node: 'G', rate: 0.35 },
                { node: 'L', rate: 0.65 },
            ];
        case 'L':
            if (CAs + CL + DD === 6) {
                return 'J';
            }
            if (BBs + CVL === 0) {
                return 'N';
            }
            return [
                { node: 'N', rate: 0.5 },
                { node: 'O', rate: 0.5 },
            ];
        case 'M':
            if (CL > 0 && DD > 0) {
                return 'P';
            }
            return [
                { node: 'K', rate: 0.5 },
                { node: 'P', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}