import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";

export function calc_2_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        speed,
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
        case 'C':
            if (CVs > 2 || BBV > 1) {
                return 'B';
            }
            if (AO > 0 && Ss === 0) {
                return 'B';
            }
            if (BBV > 0) {
                if (AV + AS > 0) {
                    return [
                        { node: 'B', rate: 0.7 },
                        { node: 'E', rate: 0.3 },
                    ];
                }
                return [
                    { node: 'B', rate: 0.7 },
                    { node: 'D', rate: 0.3 },
                ];
            }
            if (AV + AS > 0) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'E':
            if (BBCVs > 4) {
                return 'F';
            }
            if (f_length > 5) {
                if (BBCVs > 0) {
                    return 'D';
                }
                if (Ds === 6) {
                    return 'H';
                }
                if (CL === 1 && Ds === 5) {
                    return 'H';
                }
                if (is_fleet_speed_fast_or_more(speed) && CL === 1 && DD === 4) {
                    return 'H';
                }
                return 'D';
            }
            // f_length <= 5
            if (Ds === 5) {
                return 'H';
            }
            if (CL === 1 && Ds === 4) {
                return 'H';
            }
            if (is_fleet_speed_fast_or_more(speed) && CL === 1 && DD === 3) {
                return 'H';
            }
            return [
                { node: 'D', rate: 0.6 },
                { node: 'F', rate: 0.4 },
            ];
        case 'F':
            if (BBCVs > 4) {
                return 'G';
            }
            if (DD > 2) {
                return 'H';
            }
            if (CL > 0 && DD > 1) {
                return 'H';
            }
            return [
                { node: 'G', rate: 0.6 },
                { node: 'H', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}