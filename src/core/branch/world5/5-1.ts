import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest } from "../../../logic/speed/predicate";

export function calc_5_1(
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
        case '1':
            if (BBCVs > 4) {
                return 'A';
            }
            if (BBCVs < 3 && DD > 1) {
                return 'B';
            }
            if (CAs > 3 && CL > 0) {
                return 'B';
            }
            if (CAs > 1 && CL === 1) {
                return 'B';
            }
            if (BBs === 3 && CL === 1 && DD === 2) {
                return [
                    { node: 'A', rate: 0.25 },
                    { node: 'B', rate: 0.75 },
                ];
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'B':
            if (CVH > 0 || CVL > 1) {
                return 'E';
            }
            if (BBs < 3) {
                return 'C';
            }
            if (CL === 1) {
                return 'E';
            }
            if (DD > 1) {
                return 'C';
            }
            return [
                { node: 'C', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'F':
            if (CL + DD === 0 || BBs + CVL > 3) {
                return 'H';
            }
            if (BBs + CVL === 3) {
                return [
                    { node: 'G', rate: 0.333 },
                    { node: 'H', rate: 0.333 },
                    { node: 'J', rate: 0.334 },
                ];
            }
            if (is_fleet_speed_fastest(speed)) {
                return 'J';
            }
            if (CL > 0) {
                if (DD > 1) {
                    return 'J';
                }
                return 'G';
            }
            if (DD > 3) {
                return 'J';
            }
            if (DD === 3) {
                return [
                    { node: 'G', rate: 0.3 },
                    { node: 'J', rate: 0.7 },
                ];
            }
            if (DD === 2) {
                return [
                    { node: 'G', rate: 0.7 },
                    { node: 'J', rate: 0.3 },
                ];
            }
            if (DD === 1) {
                return 'G';
            }
            break; // 軽巡か駆逐のどちらかに引っかかるので例外なし
        case 'G':
            if (BBCVs > 4) {
                return 'I';
            }
            if (CVs > 0 && BBCVs > 2) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'J';
            }
            if (CAs > 3) {
                if (BBCVs + CLT === 0) {
                    return 'J';
                }
                return [
                    { node: 'I', rate: 0.3 },
                    { node: 'J', rate: 0.7 },
                ];
            }
            if (CVH > 0) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'J', rate: 0.3 },
                ];
            }
            if (DD > 3) {
                return 'J';
            }
            if (CAs > 1 && DD > 1) {
                return 'J';
            }
            if (CL > 0 && DD > 1) {
                return 'J';
            }
            if (BBs === 3 && CL === 1 && CAs === 2) {
                return [
                    { node: 'I', rate: 0.15 },
                    { node: 'J', rate: 0.85 },
                ];
            }
            return [
                { node: 'I', rate: 0.7 },
                { node: 'J', rate: 0.3 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}