import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_4_4(
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
        case '1':
            if (Ds > 1) {
                return 'A';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'B':
            if (BBCVs > 3) {
                return 'A';
            }
            if (CA > 0) {
                return [
                    { node: 'D', rate: 0.7 },
                    { node: 'F', rate: 0.3 },
                ];
            }
            return 'D';
        case 'E':
            if (BBs + CVH > 3) {
                return 'G';
            }
            if (CAs + CL > 0 && Ds > 1) {
                return 'I';
            }
            if (DE > 2) {
                return 'C';
            }
            if (DE > 1 && AO + AS > 0) {
                return 'C';
            }
            if (Ds > 1) {
                if (BBCVs > 3) {
                    return [
                        { node: 'G', rate: 0.8 },
                        { node: 'I', rate: 0.2 },
                    ];
                }
                if (BBCVs < 4) {
                    return [
                        { node: 'G', rate: 0.35 },
                        { node: 'I', rate: 0.65 },
                    ];
                } // BBCVsより例外なし
            }
            if (Ss > 3) {
                return 'G';
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'I', rate: 0.5 },
            ];
        case 'F':
            if (BBCVs > 2) {
                return 'H';
            }
            return 'I';
        case 'G': {
            return [
                { node: 'C', rate: 0.25 },
                { node: 'J', rate: 0.25 },
                { node: 'I', rate: 0.5 },
            ];
        }
        case 'I':
            if (Ds > 1) {
                if (CVH === 2 || CAs === 2 || (CVH === 0 && CL > 0)) {
                    return 'K';
                }
                return [
                    { node: 'H', rate: 0.25 },
                    { node: 'K', rate: 0.75 },
                ];
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}