import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_2_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

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
        case 'B':
            if (DD === 6) {
                return 'G';
            }
            if (CLE === 1 && DD > 3 && (CAs === 1 || DD === 5 || DE === 1)) {
                // 条件式への変換が難しい。合ってると思うけど
                return 'G';
            }
            if (Ds < 3) {
                if (CVs > 2) {
                    return 'C';
                }
                if (BBs + CVH > 2) {
                    return 'C';
                }
                if (BBs + CVH === 2) {
                    return [
                        { node: 'C', rate: 0.8 },
                        { node: 'G', rate: 0.2 },
                    ];
                }
                if (CVH > 0) {
                    return [
                        { node: 'C', rate: 0.6 },
                        { node: 'G', rate: 0.4 },
                    ];
                }
                if (Ss > 0) {
                    return [
                        { node: 'C', rate: 0.6 },
                        { node: 'G', rate: 0.4 },
                    ];
                }
                return [ // 保険
                    { node: 'C', rate: 0.4 },
                    { node: 'G', rate: 0.6 },
                ];
            }
            return [
                { node: 'C', rate: 0.4 },
                { node: 'G', rate: 0.6 },
            ];
        case 'C':
            if (AS + AO > 0) {
                return 'G';
            }
            return [
                { node: 'F', rate: 0.5 },
                { node: 'G', rate: 0.5 },
            ];
        case 'F':
            if (CVL > 0 && Ds > 1) {
                return [
                    { node: 'A', rate: 0.075 },
                    { node: 'J', rate: 0.925 },
                ];
            }
            if (CVL > 0) {
                return [
                    { node: 'A', rate: 0.175 },
                    { node: 'J', rate: 0.825 },
                ];
            }
            if (DD > 1) {
                return [
                    { node: 'A', rate: 0.25 },
                    { node: 'J', rate: 0.75 },
                ];
            }
            if (DD < 2) {
                return 'A';
            }
            break; // DDより例外なし
        case 'H':
            if (CLE > 0 && DD > 3 && (CAs === 1 || CLE === 2 || DD === 5)) {
                // 条件式変換が難しい
                return 'L';
            }
            return 'I';
        case 'I':
            if (CVL > 0 && CL > 0) {
                return [
                    { node: 'E', rate: 0.075 },
                    { node: 'K', rate: 0.925 },
                ];
            }
            if (CVL > 0) {
                return [
                    { node: 'E', rate: 0.175 },
                    { node: 'K', rate: 0.825 },
                ];
            }
            if (CL > 0) {
                return [
                    { node: 'E', rate: 0.25 },
                    { node: 'K', rate: 0.75 },
                ];
            }
            return [
                { node: 'E', rate: 0.7 },
                { node: 'K', rate: 0.3 },
            ];
        case 'J':
            if (BBCVs > 3) {
                return 'L';
            }
            if (BBCVs === 3 || CVH === 2) {
                return 'M';
            }
            if (CVH === 0) {
                return 'L';
            }
            return [
                { node: 'L', rate: 0.35 },
                { node: 'M', rate: 0.65 },
            ];
        case 'K':
            if (AS + AO > 1) {
                return 'N';
            }
            if (AV + AS + AO > 0) {
                if (Ds > 1) {
                    return [
                        { node: 'L', rate: 0.7 },
                        { node: 'N', rate: 0.3 },
                    ];
                }
                if (Ds === 1) {
                    return [
                        { node: 'L', rate: 0.4 },
                        { node: 'N', rate: 0.4 },
                        { node: 'O', rate: 0.2 },
                    ];
                }
                if (Ds === 0) { // Dsより例外なし
                    return [
                        { node: 'L', rate: 0.25 },
                        { node: 'N', rate: 0.35 },
                        { node: 'O', rate: 0.4 },
                    ];
                }
            }
            if (DE > 1) {
                return [
                    { node: 'L', rate: 0.65 },
                    { node: 'N', rate: 0.35 },
                ];
            }
            if (Ds > 1) {
                return 'L';
            }
            if (Ds === 1) {
                return [
                    { node: 'L', rate: 0.65 },
                    { node: 'O', rate: 0.35 },
                ];
            }
            if (CAV > 0) {
                if (BB > 0) {
                    return [
                        { node: 'L', rate: 0.35 },
                        { node: 'O', rate: 0.65 },
                    ];
                }
                return [
                    { node: 'L', rate: 0.65 },
                    { node: 'O', rate: 0.35 },
                ];
            }
            if (BB > 0) {
                return [
                    { node: 'L', rate: 0.225 },
                    { node: 'O', rate: 0.775 },
                ];
            }
            return [
                { node: 'L', rate: 0.35 },
                { node: 'O', rate: 0.65 },
            ];
        case 'L':
            if (BBCVs === 4) {
                return 'M';
            }
            if (CL > 0 && DD > 1) {
                return 'P';
            }
            if (BBs + CVH < 3) {
                return 'P';
            }
            return [
                { node: 'M', rate: 0.6 },
                { node: 'P', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}