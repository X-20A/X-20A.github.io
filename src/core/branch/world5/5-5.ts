import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest } from "../../../logic/speed/predicate";

export function calc_5_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    switch (node) {
        case null:
            return '1';
        case '1':
            if (DD > 3) {
                return 'A';
            }
            if (drum_carrier_count > 3) {
                return 'A';
            }
            if (craft_carrier_count > 3) {
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
            if (route.includes('N')) {
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
            if (route.includes('M')) {
                return 'O';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
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
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'S';
            }
            if (seek.c2 < 63) {
                return 'R';
            }
            if ((seek.c2 < 66 && seek.c2 >= 63) || Ss > 0) {
                return [
                    { node: 'S', rate: 0.5 },
                    { node: 'R', rate: 0.5 },
                ];
            }
            if (seek.c2 >= 66) {
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
            if (seek.c2 < 73) {
                return 'Q';
            }
            if ((seek.c2 < 80 && seek.c2 >= 73) || Ss > 0 || BBCVs > 4) {
                return [
                    { node: 'S', rate: 0.666 },
                    { node: 'Q', rate: 0.334 },
                ];
            }
            if (seek.c2 >= 80) {
                return 'S';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}