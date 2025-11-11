import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";
import CustomError from "../../../errors/CustomError";
import { count_Yamato_class } from "../../../models/fleet/AdoptFleet";

export function calc_61_4(
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

    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                if (phase === 1) {
                    return '1';
                }
                if (phase === 2) {
                    throw new CustomError('phase2では通常艦隊は出撃できません');
                }
                if (phase === 3) {
                    return '1';
                }
                if (phase === 4) {
                    return '4';
                }
            }
            // 連合艦隊
            if (phase === 1) {
                return '1';
            }
            if (phase === 2) {
                return '2';
            }
            if (phase >= 3) {
                if (AV >= 2 && Ds >= 4) {
                    return '1';
                }
                if (CL >= 2 && Ds >= 5) {
                    return '1';
                }
                if (is_fleet_transport(fleet_type)) {
                    return '1';
                }
                if (is_fleet_surface(fleet_type)) {
                    return '2';
                }
                return '3' // 空母機動部隊
            }
        case '1':
            if (is_fleet_transport(fleet_type)) {
                return 'A';
            }
            if (CVH >= 1) {
                return 'A';
            }
            if (Ds <= 3) {
                return 'A';
            }
            if (BBs + CVL <= 1) {
                return 'A';
            }
            if (Ds >= 6) {
                return 'A';
            }
            return 'B1';
        case '2':
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (CL === 1) {
                return 'J';
            }
            if (Ds <= 3) {
                return 'J';
            }
            return 'F';
        case '3':
            if (count_Yamato_class(fleet) >= 1) {
                return 'O';
            }
            if (BBs + CVH >= 5) {
                return'O';
            }
            if (Ds <= 3) {
                return 'O';
            }
            return 'G';
        case 'A':
            if (is_fleet_transport(fleet_type)) {
                return 'B';
            }
            if (CVH >= 1) {
                return 'B1';
            }
            if (Ds <= 3) {
                return 'B1';
            }
            return 'B';
        case 'B':
            if (route.includes('1')) {
                return 'H';
            }
            // route.includes('4')
            return 'U';
        case 'B1':
            if (route.includes('1')) {
                if (BBs + CVH >= 3) {
                    return 'B2';
                }
                if (Ds <= 3) {
                    return 'B2';
                }
                if (Ds >= 6) {
                    return 'B2';
                }
                return 'C';
            }
            // route.includes('4')
            return 'V';
        case 'D':
            if (CVH >= 2) {
                return 'D1';
            }
            if (CL <= 1) {
                return 'D1';
            }
            if (BBs <= 1) {
                return 'D2';
            }
            if (Ds >= 4) {
                return 'D2';
            }
            return 'D1';
        case 'F':
            if (phase >= 2 && CVH >= 3) {
                return 'K';
            }
            if (Ds <= 3) {
                return 'F1';
            }
            return 'F2';
        case 'F2':
            if (is_fleet_speed_slow(speed)) {
                return 'F3';
            }
            if (CVs >= 4) {
                return 'F3';
            }
            if (CVH >= 3) {
                return 'F3';
            }
            return 'G';
        case 'G':
            if (route.includes('2')) {
                if (count_Yamato_class(fleet) >= 2) {
                    return 'L';
                }
                return 'N';
            }
            // route.includes('3')
            return 'R';
        case 'H':
            if (seek[1] >= 45) {
                return 'I';
            }
            return 'B3';
        case 'L':
            return 'N'
        case 'O':
            if (count_Yamato_class(fleet) >= 2) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'P';
            }
            if (CAs >= 2) {
                return 'Q';
            }
            return 'P';
        case 'Q':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'S';
            }
            return 'R';
        case 'R':
            if (CVH >= 3) {
                return 'R1';
            }
            if (count_Yamato_class(fleet) >= 2) {
                return 'R1';
            }
            return 'R2';
        case 'S':
            return 'T';
        case 'U':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'X';
            }
            if (CL === 0) {
                return 'B1';
            }
            return 'V';
        case 'V':
            if (CA >= 2) {
                return 'W';
            }
            if (CL === 0) {
                return 'W';
            }
            return 'X';
        case 'X':
            if (seek[1] >= 110) {
                return 'Z';
            }
            return 'Y';
        case 'C':
            return option.C === 'D'
                ? 'D'
                : 'F';
    }

    omission_of_conditions(node, sim_fleet);
}