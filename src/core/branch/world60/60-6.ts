import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";
import { is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_Reigo_ships, count_ship, count_Yamato_class } from "../../../models/fleet/AdoptFleet";

export function calc_60_6(
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
        difficulty: difficulty_string,
    } = option;
    const phase = Number(phase_string);
    const difficulty = Number(difficulty_string);

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            } else { // is_fleet_combined(fleet_type)
                if (phase !== 1 && BBs > 2) {
                    return '3';
                }
                if (phase !== 1 && BBs + CVH > 3) {
                    return '3';
                }
                if (is_fleet_transport(fleet_type)) {
                    return '2';
                }
                if (BBCVs > 2) {
                    return '2';
                }
                return '1';
            }
            break;
        case 'A':
            if (is_fleet_combined(fleet_type)) {
                return 'C';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'B';
            }
            if (Ds > 2) {
                return 'B';
            }
            return 'C';
        case 'D':
            if (is_fleet_combined(fleet_type)) {
                if (route.includes('1')) {
                    if (difficulty === 4 && count_Reigo_ships(fleet) < 5) {
                        return 'E';
                    }
                    if (difficulty === 3 && count_Reigo_ships(fleet) < 3) {
                        return 'E';
                    }
                    if (difficulty === 2 && count_Reigo_ships(fleet) < 2) {
                        return 'E';
                    }
                    if (Ds > 5 && BBs + CVH < 3) {
                        return 'F';
                    }
                    return 'E';
                }
                // route.includes('2')
                return 'C2'
            }
            // !is_fleet_combined(fleet_type)
            if (Ds > 2) {
                return 'F';
            }
            return 'E';
        case 'C2':
            if (route.includes('1')) {
                return 'D';
            }
            // route.includes('2')
            return 'I';
        case 'E':
            if (route.includes('1')) {
                return 'F';
            } else { // route.includes('2')
                if (is_fleet_speed_faster_or_more(speed)) {
                    return 'C2';
                }
                return 'D';
            }
            break;
        case 'H':
            if (seek.c2 < 65) {
                return 'E';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'C2';
            }
            return 'E';
        case 'J':
            if (is_fleet_transport(fleet_type)) {
                return 'J3';
            }
            if (count_Yamato_class(fleet) > 0) {
                return 'J1';
            }
            if (AV + AO + LHA > 2) {
                return 'J3';
            }
            if (phase < 3) {
                return 'J2';
            }
            if (count_Reigo_ships(fleet) > 3 && Ds > 3 && BBs + CVH < 4) {
                return 'J1';
            }
            return 'J2';
        case 'J1':
            if (phase < 3) {
                return 'J2';
            }
            if (is_fleet_speed_fastest(speed)) {
                return 'R';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J2';
            }
            if (count_Yamato_class(fleet) > 0) {
                return 'J2';
            }
            if (count_ship(fleet, ['榧', '杉']) > 0) {
                return 'P';
            }
            if (count_ship(fleet, ['足柄', '大淀', '霞', '朝霜', '清霜']) > 4) {
                return 'P';
            }
            if (Ds > 3 && BBs + CVH < 3) {
                return 'P';
            }
            return 'J2';
        case 'J2':
            if (phase !== 1 && is_fleet_speed_faster_or_more(speed)) {
                return 'P';
            }
            if (LHA > 0) {
                return 'J3';
            }
            if (AV > 1) {
                return 'J3';
            }
            if (phase === 1) {
                return 'K';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            if (BBs > 3) {
                return 'K';
            }
            if (CAs === 1 && CL > 1 && Ds > 5 && CVH === 0) {
                return 'P';
            }
            if (CAs > 1 && Ds > 4 && CVH < 3 && count_Yamato_class(fleet) === 0) {
                return 'P';
            }
            return 'K';
        case 'J3':
            if (count_Yamato_class(fleet) > 0) {
                return 'J4';
            }
            if (BBs > 3) {
                return 'J4';
            }
            if (CVH > 2) {
                return 'J4';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'M';
            }
            if (CL > 1) {
                return 'M';
            }
            return 'J4';
        case 'N':
            if (count_ship(fleet, ['明石改', '朝日改', '秋津洲改', '速吸改', '山汐丸改', '神威改母', '宗谷', 'しまね丸改']) > 0) {
                return 'O1';
            }
            return 'O';
        case 'O1':
            return 'O';
        case 'S':
            if (is_fleet_speed_fastest(speed)) {
                return 'X';
            }
            if (BBs + CVH > 3) {
                return 'W';
            }
            if (Ss > 0 && AS === 0) {
                return 'W';
            }
            if (count_Yamato_class(fleet) > 0 && CL < 2) {
                return 'W';
            }
            if (difficulty === 4 && count_Reigo_ships(fleet) > 5 && Ds > 5) {
                return 'X';
            }
            if ([3, 2].includes(difficulty) && count_Reigo_ships(fleet) > 3 && Ds > 3) {
                return 'X';
            }
            if (difficulty === 1 && count_Reigo_ships(fleet) > 0 && Ds > 2) {
                return 'X';
            }
            return 'W';
        case 'T':
            return 'V';
        case 'X':
            return 'Z';
        case 'G':
            return option.G === 'H'
                ? 'H'
                : 'J';
        case 'K':
            return option.K === 'J3'
                ? 'J3'
                : 'L';
        case 'R':
            return option.R === 'S'
                ? 'S'
                : 'T';
    }

    omission_of_conditions(node, sim_fleet);
}