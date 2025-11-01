import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest } from "../../../logic/speed/predicate";

export function calc_5_5(
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
        drum_carrier_count: drum,
        craft_carrier_count: craft,
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
            if (DD > 3) {
                return 'A';
            }
            if (drum > 3) {
                return 'A';
            }
            if (craft > 3) {
                return 'A';
            }
            return 'B';
        case 'B':
            if (CVH > 2) {
                return 'K';
            }
            if (BBs + CLT > 3) {
                return 'K';
            }
            if (CLT > 2) {
                return 'K';
            }
            if (DD < 2) {
                return 'K';
            }
            return 'F';
        case 'E':
            if (is_fleet_speed_fastest(speed)) {
                return 'H';
            }
            if ((DD > 1 && is_fleet_speed_faster_or_more(speed))) {
                return 'H';
            }
            return 'G';
        case 'F':
            return option.F === 'D'
                ? 'D'
                : 'J';
        case 'H':
            if (is_fleet_speed_fastest(speed)) {
                return 'N';
            }
            if (BBCVs > 3) {
                return 'P';
            }
            if (DD < 2) {
                return 'L';
            }
            return 'N';
        case 'I':
            if (BBCVs === 3 && DD > 1) {
                return 'L';
            }
            return 'M';
        case 'M':
            if (track.includes('N')) {
                return 'O';
            }
            if (BBCVs > 3) {
                return 'L';
            }
            if (DD < 2) {
                return 'L';
            }
            return 'O';
        case 'N':
            if (track.includes('M')) {
                return 'O';
            }
            if (isFaster) {
                return 'O';
            }
            if (AO > 0) {
                return 'O';
            }
            if (CVH > 0) {
                return 'M';
            }
            if (BBs + CVL > 2) {
                return 'M';
            }
            if (DD < 2) {
                return 'M';
            }
            return 'O';
        case 'O':
            if (isFaster) {
                return 'S';
            }
            if (seek[1] < 63) {
                return 'R';
            }
            if ((seek[1] < 66 && seek[1] >= 63) || Ss > 0) {
                return [
                    { node: 'S', rate: 0.5 },
                    { node: 'R', rate: 0.5 },
                ];
            }
            if (seek[1] >= 66) {
                return 'S';
            }
            break; // LoSより例外なし
        case 'P':
            if (is_fleet_speed_fastest(speed)) {
                return 'S';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                if (Ss > 0) {
                    return [
                        { node: 'Q', rate: 0.5 },
                        { node: 'S', rate: 0.5 },
                    ];
                }
                if (BBCVs < 6) {
                    return 'S';
                }
                return [
                    { node: 'Q', rate: 0.5 },
                    { node: 'S', rate: 0.5 },
                ];
            }
            if (seek[1] < 73) {
                return 'Q';
            }
            if ((seek[1] < 80 && seek[1] >= 73) || Ss > 0 || BBCVs > 4) {
                return [
                    { node: 'S', rate: 0.666 },
                    { node: 'Q', rate: 0.334 },
                ];
            }
            if (seek[1] >= 80) {
                return 'S';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}