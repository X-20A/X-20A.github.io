import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_2_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
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
            if (Ss + AS === f_length) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'C':
            return [
                { node: 'D', rate: 0.6 },
                { node: 'F', rate: 0.4 },
            ];
        case 'D':
            if (AV + AO > 0 && Ds > 1) {
                return 'G';
            }
            if (Ss > 1 && AS > 0) {
                return 'G';
            }
            if (Ss === f_length) {
                return [
                    { node: 'F', rate: 0.35 },
                    { node: 'G', rate: 0.65 },
                ];
            }
            if (Ss > 0 && BBCVs > 0) {
                return [
                    { node: 'F', rate: 0.65 },
                    { node: 'G', rate: 0.35 },
                ];
            }
            if (Ds > 3) {
                return [
                    { node: 'F', rate: 0.25 },
                    { node: 'G', rate: 0.75 },
                ];
            }
            if (Ds === 3) {
                return [
                    { node: 'F', rate: 0.35 },
                    { node: 'G', rate: 0.65 },
                ];
            }
            if (Ds === 2) {
                return [
                    { node: 'F', rate: 0.5 },
                    { node: 'G', rate: 0.5 },
                ];
            }
            return [
                { node: 'F', rate: 0.65 },
                { node: 'G', rate: 0.35 },
            ];
        case 'F':
            if (CVs + CL + AV > 0) {
                return [
                    { node: 'G', rate: 0.1 },
                    { node: 'J', rate: 0.9 },
                ];
            }
            if (Ss > 1 && AS > 0) {
                return [
                    { node: 'G', rate: 0.8 },
                    { node: 'J', rate: 0.2 },
                ];
            }
            return [
                { node: 'G', rate: 0.25 },
                { node: 'H', rate: 0.35 },
                { node: 'J', rate: 0.40 },
            ];
        case 'G':
            if (Ss > 1 && AS > 0) {
                return [
                    { node: 'I', rate: 0.6 },
                    { node: 'K', rate: 0.4 },
                ];
            }
            if (Ss === f_length) {
                return [
                    { node: 'I', rate: 0.55 },
                    { node: 'K', rate: 0.45 },
                ];
            }
            if (CL + Ds < 2) {
                return 'K';
            }
            if (AV + AO > 0 && Ds > 1) {
                return [
                    { node: 'I', rate: 0.65 },
                    { node: 'K', rate: 0.35 },
                ];
            }
            if (Ds > 2) {
                return [
                    { node: 'I', rate: 0.45 },
                    { node: 'K', rate: 0.55 },
                ];
            }
            if (Ds > 0) {
                return [
                    { node: 'I', rate: 0.35 },
                    { node: 'K', rate: 0.65 },
                ];
            }
            if (Ds === 0) {
                return 'K';
            }
            break; // Dsより例外なし
        case 'J':
            if (CL > 0 && DD > 3) {
                return 'N';
            }
            if (CL === 1 && CA === 5) {
                return 'N';
            }
            if (Ss === f_length) {
                return [
                    { node: 'M', rate: 0.1 },
                    { node: 'N', rate: 0.9 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'L', rate: 0.45 },
                    { node: 'M', rate: 0.1 },
                    { node: 'N', rate: 0.45 },
                ];
            }
            if (BBCVs > 5) {
                return 'L';
            }
            if (BBCVs === 5) {
                return [
                    { node: 'L', rate: 0.85 },
                    { node: 'N', rate: 0.15 },
                ];
            }
            if (BBCVs === 4) {
                return [
                    { node: 'L', rate: 0.25 },
                    { node: 'N', rate: 0.75 },
                ];
            }
            if (BBCVs === 3) {
                return [
                    { node: 'L', rate: 0.2 },
                    { node: 'N', rate: 0.8 },
                ];
            }
            if (BBCVs < 3) {
                return [
                    { node: 'L', rate: 0.1 },
                    { node: 'N', rate: 0.9 },
                ];
            }
            break; // BBCVsより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}