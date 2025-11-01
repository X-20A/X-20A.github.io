import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_1_5(
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
            return 'A';
        case 'D':
            if (f_length === 1) {
                return 'E';
            }
            if (f_length > 4) {
                if (Ss > 0) {
                    return 'F';
                }
                return [
                    { node: 'E', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (DE === f_length) {
                return 'E';
            }
            if (AO > 0) {
                return 'E';
            }
            return 'F';
        case 'E':
            if (f_length > 4) {
                return 'C';
            }
            if (f_length === DE) {
                return 'J';
            }
            return 'C';
        case 'C':
            if (f_length === DE) {
                return 'J';
            }
            if (CL === 1 && DE === 4 && f_length === 5) {
                return 'J';
            }
            if (f_length < 5 && AO > 0) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            return 'B';
        case 'F':
            if (BB + CVH + Ss > 0) {
                return 'I';
            }
            if (CVL > 1) {
                return 'I';
            }
            if (CL > 2) {
                return 'I';
            }
            return 'G';
        case 'G':
            if (f_length > 4) {
                return 'H';
            }
            return 'J';
    }

    omission_of_conditions(node, sim_fleet);
}