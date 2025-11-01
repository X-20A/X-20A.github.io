import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_7_1(
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
            if (Ss > 0) {
                if (BBCVs > 0 || f_length > 4) {
                    return [
                        { node: 'B', rate: 0.5 },
                        { node: 'D', rate: 0.5 },
                    ];
                }
                if (f_length < 5) {
                    return [
                        { node: 'B', rate: 0.333 },
                        { node: 'D', rate: 0.333 },
                        { node: 'F', rate: 0.334 },
                    ];
                } // f_lengthより例外なし
            }
            if (BBCVs > 0 || f_length > 5) {
                return 'B';
            }
            if (f_length === 5 || AO > 0) {
                return 'D';
            }
            if (f_length < 5) {
                return 'F';
            }
            break; // f_lengthより例外なし
        case 'B':
            if (BBs + CVH > 0 || CVL > 1 || CAs > 2) {
                return 'A';
            }
            if (DD + DE > 1) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'D':
            if (CL === 1 && DD === 4) {
                return 'E';
            }
            if (DD > 0 && DE > 2) {
                return 'E';
            }
            if (AO > 0 && DE > 2) {
                return 'E';
            }
            if (Ds === 5) {
                return 'E';
            }
            if (Ds === 4) {
                if (CT + AO > 0) {
                    return 'E';
                }
                if (AV > 0) {
                    return [
                        { node: 'C', rate: 0.5 },
                        { node: 'E', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'C', rate: 0.5 },
                    { node: 'E', rate: 0.5 },
                ];
            }
            return [
                { node: 'C', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'H':
            if (CL > 0 && DD > 3) {
                return 'K';
            }
            if (DD > 0 && DE > 2) {
                return 'K';
            }
            if (AO > 0) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (BBCVs > 1) {
                return 'J';
            }
            if (BBCVs === 1) {
                return [
                    { node: 'I', rate: 0.333 },
                    { node: 'J', rate: 0.333 },
                    { node: 'K', rate: 0.334 },
                ];
            }
            return [
                { node: 'I', rate: 0.225 },
                { node: 'J', rate: 0.075 },
                { node: 'K', rate: 0.7 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}