import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_4_1(
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
                { node: 'C', rate: 0.5 },
            ];
        case 'C':
            if (BBCVs > 4) {
                return 'E';
            }
            if (BBCVs === 4) {
                return [
                    { node: 'E', rate: 0.7 },
                    { node: 'F', rate: 0.3 },
                ];
            }
            if (BBCVs === 3) {
                return [
                    { node: 'E', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (BBCVs < 3) {
                return 'F';
            }
            break; // BBCVsより例外なし
        case 'D':
            if (BBCVs > 4) {
                return 'H';
            }
            if (Ss < 0) {
                return [
                    { node: 'G', rate: 0.3 },
                    { node: 'H', rate: 0.7 },
                ];
            }
            if (BBCVs === 4 || Ds < 2) {
                return 'G';
            }
            if (BBCVs === 0 || Ds > 3) {
                return 'H';
            }
            if (Ds === 3 || CL === 0) {
                return 'G';
            }
            if (CAs > 0 && CAs + CLE === 3) {
                return 'H';
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'H', rate: 0.5 },
            ];
        case 'F':
            if (BBCVs > 0 || Ds < 4) {
                return 'D';
            }
            if (CLE > 0 || CAs === 0) {
                return 'H';
            }
            return 'D';
        case 'H':
            if (Ss === 1) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (Ss > 1) {
                return 'I';
            }
            if (BBCVs > 4) {
                return 'I';
            }
            if (BBCVs < 2) {
                return 'J';
            }
            return [
                { node: 'I', rate: 0.5 },
                { node: 'J', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}