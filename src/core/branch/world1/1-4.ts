import { omission_of_conditions } from "..";
import { SimFleet } from "../../../models/fleet/SimFleet";
import { BranchResponse } from "../../../types";
import { PreSailNull } from "../../../types/brand";

export function calc_1_4(
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
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'B':
            if (CVs > 2 || BBs > 2 || Ds === 0) {
                return 'D';
            }
            if (Ds > 2) {
                return 'C';
            }
            if (CL > 0) {
                return [
                    { node: 'C', rate: 0.8 },
                    { node: 'D', rate: 0.2 },
                ];
            }
            return [
                { node: 'C', rate: 0.6 },
                { node: 'D', rate: 0.4 },
            ];
        case 'D':
            if (AS > 0) {
                return 'E';
            }
            if (AV > 0) {
                return 'G';
            }
            return [
                { node: 'E', rate: 0.5 },
                { node: 'G', rate: 0.5 },
            ];
        case 'F':
            if (Ds > 3) {
                return 'E';
            }
            if (Ds > 1) {
                if (AV + AS + AO > 0 || BBV === 2) {
                    return 'E';
                }
                if (Ds === 3) {
                    return [
                        { node: 'E', rate: 0.8 },
                        { node: 'H', rate: 0.2 },
                    ];
                }
                return [ // Ds === 2
                    { node: 'E', rate: 0.6 },
                    { node: 'H', rate: 0.4 },
                ]; // Dsより例外なし
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'I', rate: 0.5 },
            ];
        case 'J':
            if (CL > 0 && AV > 0 && Ds > 1) {
                return 'L';
            }
            if (DD > 3) {
                return 'L';
            }
            if (DD > 1) {
                return [
                    { node: 'K', rate: 0.25 },
                    { node: 'L', rate: 0.75 },
                ];
            }
            return [
                { node: 'K', rate: 0.35 },
                { node: 'L', rate: 0.65 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}