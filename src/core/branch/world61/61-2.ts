import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_61_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_type,
        speed,
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

    const {
        phase,
    } = option;

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            return '2' // is_fleet_combined(fleet_type)
        case '2':
            if (is_fleet_transport(fleet_type)) {
                return 'K';
            }
            if (BBs + CVH >= 4) {
                return 'N';
            }
            if (CVH >= 3) {
                return 'N';
            }
            if (DD <= 4 && is_fleet_speed_slow(speed)) {
                return 'N';
            }
            return 'K';
        case 'B':
            return 'D';
        case 'D':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'K';
            }
            if (BBs >= 2) {
                return 'K';
            }
            if (CVH >= 1) {
                return 'K';
            }
            return 'E';
        case 'F':
            return 'I';
        case 'G':
            return 'I';
        case 'K':
            if (!is_fleet_combined(fleet_type)) {
                if (is_fleet_speed_fast_or_more(speed)) {
                    return 'L';
                }
                return 'E'; // 低速
            }
            // 連合艦隊
            if (phase === '1') {
                return 'O';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'P';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (is_fleet_surface(fleet_type)) {
                return 'L';
            }
            if (BBs <= 1 && CVH <= 1 && CVs <= 2 && Ds >= 4 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'P';
            }
            return 'O';
        case 'L':
            if (!is_fleet_combined(fleet_type)) {
                return 'M';
            }
            return 'O'; // 聯合艦隊
        case 'T':
            if (is_fleet_transport(fleet_type) && seek[1] >= 36) {
                return 'V';
            }
            if (
                (is_fleet_carrier(fleet_type) || is_fleet_surface(fleet_type)) &&
                seek[1] >= 76
            ) {
                return 'V';
            }
            return 'U';
        case 'V':
            if (Number(phase) <= 2) {
                return 'W';
            }
            if (AV >= 2) {
                return 'W';
            }
            if (CVs >= 3 && Ds <= 4) {
                return 'W';
            }
            return 'Y';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'F';
    }

    omission_of_conditions(node, sim_fleet);
}