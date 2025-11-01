import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";

export function calc_2_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
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
            if (BBCVs > 3) {
                return 'G';
            }
            if (DE > 1) {
                return 'F';
            }
            if (BBCVs === 3) {
                return [
                    { node: 'G', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (BBCVs === 2) {
                return [
                    { node: 'G', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (BBCVs === 1) {
                return [
                    { node: 'G', rate: 0.3 },
                    { node: 'K', rate: 0.7 },
                ];
            }
            if (Ds > 2 && AS > 0) {
                return 'F';
            }
            if (Ds > 1) {
                if (CL > 0 && is_fleet_speed_fast_or_more(speed)) {
                    return 'K';
                }
                return [
                    { node: 'F', rate: 0.3 },
                    { node: 'K', rate: 0.7 },
                ];
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
        case 'G':
            if (CVs > 0 || DD === 0) {
                return 'H';
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
        case 'H':
            if (BBCVs > 3) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (CVs + CAV + AV > 0) {
                return 'K';
            }
             if (Ss > 0) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (Ds > 1) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (Ds === 1) {
                return [
                    { node: 'I', rate: 0.333 },
                    { node: 'J', rate: 0.333 },
                    { node: 'K', rate: 0.334 },
                ];
            }
            return [
                { node: 'I', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}