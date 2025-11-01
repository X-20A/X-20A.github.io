import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_3_1(
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
        case 'C':
            if (Ds < 2) {
                return 'D';
            }
            if (BBV + CL + AV + AO > 2) {
                if (BBCVs > 2) {
                    return [
                        { node: 'B', rate: 0.5 },
                        { node: 'D', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (AV + AO > 0 && Ds > 2) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (Ss > 2) {
                return [
                    { node: 'D', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (BBCVs > 2) {
                return 'D';
            }
            return 'F';
        case 'D':
            if (BBCVs > 4 || Ss === 6) {
                return 'E';
            }
            if (AS === 1 && Ss === 5) {
                return 'G';
            }
            return 'F';
    }

    omission_of_conditions(node, sim_fleet);
}