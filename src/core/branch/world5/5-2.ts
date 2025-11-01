import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { isInclude } from "../../../models/fleet/AdoptFleet";

export function calc_5_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
        is_faster: isFaster,
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
            if (BBCVs > 4 || BBs > 3 || CVH > 2) {
                return [
                    { node: 'A', rate: 0.5 },
                    { node: 'B', rate: 0.5 },
                ];
            }
            if (Ss === 1) {
                return [
                    { node: 'A', rate: 0.35 },
                    { node: 'B', rate: 0.65 },
                ];
            }
            if (Ss === 2) {
                return [
                    { node: 'A', rate: 0.4 },
                    { node: 'B', rate: 0.6 },
                ];
            }
            if (Ss === 3) {
                return [
                    { node: 'A', rate: 0.55 },
                    { node: 'B', rate: 0.45 },
                ];
            }
            if (Ss >= 4) {
                return [
                    { node: 'A', rate: 0.7 },
                    { node: 'B', rate: 0.3 },
                ];
            }
            return 'B';
        case 'C':
            if (CVs === 2 && CAs === 2 && DD === 2) {
                return 'D';
            }
            if (isInclude(fleet, '夕張') && CVL + CAs + DD + AO === 5) {
                return 'D';
            }
            if (isInclude(fleet, '祥鳳') && CAs + CLE + DD + AO === 5) {
                return 'D';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'E';
            }
            if (isInclude(fleet, '翔鶴') && isInclude(fleet, '瑞鶴') && DD > 1) {
                return 'D';
            }
            if (BBs + CVH > 0) {
                return 'E';
            }
            if (CVL === 2 && DD > 1) {
                return 'D';
            }
            if (CVL === 1 && CAs > 0 && DD > 1) {
                return 'D';
            }
            return 'E';
        case 'D':
            if (
                (isInclude(fleet, '祥鳳') && DD === 3)
                && (((CA === 1 && (CL === 1 || AO === 1))
                    || AO === 2))
            ) return 'G';
            if (isInclude(fleet, '夕張') && DD >= 2) {
                if (DD === 3
                    || (AO === 1 && (DD === 2 || CA === 2))
                    || (AO === 2 && (DD === 1 || CA === 2))
                    || (isInclude(fleet, '祥鳳') && (CA === 2 || AO === 2))
                ) {
                    return 'G';
                }
                return 'F';
            }
            return 'F';
        case 'F':
            if (seek[1] < 63) {
                return 'H';
            }
            if (seek[1] < 70 && seek[1] >= 63) {
                if (BBs + CVH > 4) {
                    return [
                        { node: 'H', rate: 0.5 },
                        { node: 'I', rate: 0.5 },
                    ];
                }
                if (BBs > 2 || CVs > 2) {
                    return [
                        { node: 'H', rate: 0.333 },
                        { node: 'I', rate: 0.333 },
                        { node: 'O', rate: 0.334 },
                    ];
                }
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (BBs + CVH > 4) {
                return 'I';
            }
            if (BBs > 2 || CVs > 2) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'O', rate: 0.3 },
                ];
            }
            if (seek[1] >= 70) {
                return 'O';
            }
            break; // LoSより例外なし
        case 'G':
            if (isInclude(fleet, '祥鳳') && isInclude(fleet, '夕張')) {
                return [
                    { node: 'J', rate: 0.55 },
                    { node: 'L', rate: 0.45 },
                ];
            }
            return [
                { node: 'J', rate: 0.85 },
                { node: 'L', rate: 0.15 },
            ];
        case 'L':
            if (!isInclude(fleet, '祥鳳') && !isInclude(fleet, '夕張')) {
                if (is_fleet_speed_faster_or_more(speed)) {
                    return [
                        { node: 'K', rate: 0.5 },
                        { node: 'N', rate: 0.5 },
                    ];
                }
                if (seek[1] < 60) {
                    return [
                        { node: 'M', rate: 0.5 },
                        { node: 'N', rate: 0.5 },
                    ];
                }
                if (seek[1] < 62 && seek[1] >= 60) {
                    return [
                        { node: 'K', rate: 0.333 },
                        { node: 'M', rate: 0.333 },
                        { node: 'N', rate: 0.334 },
                    ];
                }
                if (seek[1] >= 62) {
                    return [
                        { node: 'K', rate: 0.5 },
                        { node: 'N', rate: 0.5 },
                    ];
                } // LoSより例外なし
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'K';
            }
            if (seek[1] < 60) {
                return 'M';
            }
            if (seek[1] < 62 && seek[1] >= 60) {
                return [
                    { node: 'K', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (seek[1] >= 62) {
                return 'K';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}