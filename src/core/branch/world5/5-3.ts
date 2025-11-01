import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_5_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
        is_faster: isFaster,
        drum_carrier_count: drum,
        craft_carrier_count: craft,
        SBB_count,
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
            if (isFaster) {
                return 'D';
            }
            if (BBCVs > 2 || (BBCVs === 2 && is_fleet_speed_slow(speed))) {
                return 'C';
            }
            if (Ss > 0) {
                return [
                    { node: 'C', rate: 0.4 },
                    { node: 'D', rate: 0.6 },
                ];
            }
            return 'D';
        case 'B':
            return [
                { node: 'A', rate: 0.65 },
                { node: 'F', rate: 0.35 },
            ];
        case 'E':
            if (Ss > 0 || (BBCVs > 0 && DD < 2)) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'Q', rate: 0.5 },
                ];
            }
            if (CL > 0 || CAs > 3 || DD > 3) {
                return 'Q';
            }
            return [
                { node: 'B', rate: 0.5 },
                { node: 'Q', rate: 0.5 },
            ];
        case 'G':
            if (BBV + CVH + Ss > 0) {
                return 'J';
            }
            if (DD === 0 || CVL > 1) {
                return 'I';
            }
            if (CVL === 1) {
                return 'J';
            }
            if (DD === 1) {
                return 'I';
            }
            if (SBB_count > 1) {
                return 'J';
            }
            return 'I';
        case 'I':
            if (CVL > 0 || BBs > 2) {
                return 'J';
            }
            if (DD > 2 || (CL > 0 && DD > 1)) {
                return 'O';
            }
            if (BBs > 1) {
                return 'J';
            }
            if (DD > 1) {
                return 'O';
            }
            if (CL > 0 && CAs > 3 && CAs + CL + DD === 6) {
                return 'O';
            } return [
                { node: 'J', rate: 0.5 },
                { node: 'O', rate: 0.5 },
            ];
        case 'J':
            if (Ss > 0) {
                return [
                    { node: 'L', rate: 0.333 },
                    { node: 'M', rate: 0.333 },
                    { node: 'N', rate: 0.334 },
                ];
            }
            if (BBCVs > 3 || CVH > 0 || CVL > 1) {
                return 'M';
            }
            if (CVL === 1) {
                if (SBB_count > 1) {
                    return 'N';
                }
                if (BBV > 0) {
                    return [
                        { node: 'L', rate: 0.5 },
                        { node: 'N', rate: 0.5 },
                    ];
                }
                if (DD > 2 || (CL > 0 && DD > 1) || (CAs === 3 && DD === 2)) {
                    return 'L';
                }
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'N', rate: 0.5 },
                ];
            }
            return [
                { node: 'L', rate: 0.5 },
                { node: 'N', rate: 0.5 },
            ];
        case 'O':
            return option.O === 'K'
                ? 'K'
                : 'P';
        case 'K':
            if (DD > 3 || (DD === 3 && CL === 1)) {
                return 'H';
            }
            if (DD === 2 && (
                isFaster
                || BBV + AO + AS > 0
                || drum > 1
                || craft > 1
            )) {
                return 'H';
            }
            return 'E';
    }

    omission_of_conditions(node, sim_fleet);
}