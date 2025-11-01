import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_4_5(
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
        seek,
    } = fleet;

    const track = sim_fleet.route;

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
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'D';
        case 'C':
            return option.C === 'D'
                ? 'D'
                : 'F';
        case 'E':
            if (isFaster || AO > 0 || BBCVs > 2) {
                return 'M';
            }
            if (CL > 0 && Ds > 1) {
                return 'M';
            }
            return 'K';
        case 'G':
            if (CL > 0 && Ds > 1) {
                return 'H';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'H', rate: 0.5 },
            ];
        case 'H':
            if (isFaster && BBCVs < 5) {
                return 'T';
            }
            if (CL === 1 && Ds > 2) {
                return 'T';
            }
            if (!track.includes('D') && CL === 1 && Ds > 1) {
                return 'T';
            }
            return 'K';
        case 'I':
            return option.I === 'G'
                ? 'G'
                : 'J';
        case 'K':
            if (track.includes('E')) {
                return 'M';
            }
            if (BBs + CVH > 3) {
                return 'M';
            }
            if (BBCVs > 4) {
                return 'M';
            }
            if (AO > 0) {
                return 'M';
            }
            if (seek[1] < 63) {
                return 'L';
            }
            if (seek[1] < 70 && seek[1] >= 63) {
                if (Ss > 0) {
                    return [
                        { node: 'L', rate: 0.333 },
                        { node: 'M', rate: 0.333 },
                        { node: 'T', rate: 0.334 },
                    ];
                }
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'T', rate: 0.5 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'T', rate: 0.5 },
                ];
            }
            if (seek[1] >= 70) {
                return 'T';
            }
            break; // LoSより例外なし
        case 'M':
            if (is_fleet_speed_fastest(speed)) {
                return 'N';
            }
            if (DD < 2) {
                return 'R';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'N';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'R';
            }
            if (BBs + CVH < 2) {
                return 'N';
            }
            return 'R';
        case 'O':
            if (BBCVs > 4) {
                return 'N';
            }
            return [
                { node: 'N', rate: 0.5 },
                { node: 'T', rate: 0.5 },
            ];
        case 'Q':
            if (seek[1] < 55) {
                return 'P';
            }
            if (seek[1] < 59 && seek[1] >= 55) {
                if (BBCVs > 4) {
                    return [
                        { node: 'O', rate: 0.5 },
                        { node: 'P', rate: 0.5 },
                    ];
                }
                if (DD === 0) {
                    return [
                        { node: 'O', rate: 0.5 },
                        { node: 'P', rate: 0.5 },
                    ];
                }
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'P', rate: 0.5 },
                ];
            }
            if (BBCVs > 4 || DD === 0) {
                return 'O';
            }
            return 'N'; // f_seek[1] >= 59
        case 'R':
            if (isFaster) {
                return 'N';
            }
            if (is_fleet_speed_fast_or_more(speed) && CL + CAV > 0 && DD > 1) {
                return 'N';
            }
            return 'S';
    }

    omission_of_conditions(node, sim_fleet);
}