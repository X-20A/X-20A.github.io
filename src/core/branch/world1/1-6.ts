import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_1_6(
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
            if (BBV + CVL + CA > 0) {
                return 'C';
            }
            if (CAV > 1) {
                return 'C';
            }
            if (Ds < 4) {
                return 'C';
            }
            return 'A';
        case 'G':
            if (CL === 1 && Ds === 5) {
                return 'F';
            }
            return [
                { node: 'F', rate: 0.75 },
                { node: 'K', rate: 0.25 },
            ];
        case 'M':
            if (BBV + CA + CVL > 2) {
                return 'L';
            }
            if (BBV + CAs > 2) {
                return 'L';
            }
            if (Ds < 3) {
                return 'L';
            }
            if (seek[2] < 28) {
                return 'L';
            }
            if (seek[2] < 30 && seek[2] >= 28) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'L', rate: 0.5 },
                ];
            }
            return 'J'; // f_seek[2] >= 30
    }

    omission_of_conditions(node, sim_fleet);
}