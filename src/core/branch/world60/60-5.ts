import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { count_Reigo_ships, count_ship, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined } from "../../../models/fleet/predicate";

export function calc_60_5(
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
            if (phase === 1) {
                return '1';
            }
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            } // is_fleet_combined(fleet_type)
            return '2';
        case '1':
            if (AO + LHA + AV + AS > 2) {
                return 'A';
            }
            if (AO + LHA > 1) {
                return 'A';
            }
            if (CVH === 0 && BBs + CVL > 2 && is_fleet_speed_slow(speed)) {
                return 'A';
            }
            return 'C';
        case 'D1':
            if (seek.c4 >= 92) {
                return 'D2';
            }
            return 'E';
        case 'E':
            if (BBCVs > 3) {
                return 'E1';
            }
            if (BBs + CVH > 2 && is_fleet_speed_slow(speed)) {
                return 'E1';
            }
            if (Ds < 2) {
                return 'E1';
            }
            if (Ss > 0) {
                return 'E1';
            }
            return 'E2';
        case 'F':
            if (seek.c4 >= 102) {
                return 'F2';
            }
            return 'F1';
        case 'I':
            if (Ss === 0 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            return 'J1';
        case 'J':
            if (seek.c4 >= 91) {
                return 'K';
            }
            return 'J2';
        case 'M':
            if (phase < 3) {
                return 'N';
            }
            if (BBs > 3) {
                return 'U1';
            }
            if (BBs === 3 && is_fleet_speed_slow(speed)) {
                return 'U1';
            }
            if (AV + AO + LHA === 0 && Ds > 5) {
                return 'N';
            }
            if (CVH > 0) {
                return 'U1';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'U1';
            }
            return 'U';
        case 'N':
            if (phase === 3 && Ds < 6) {
                return 'U2';
            }
            if (phase === 3 && LHA + AV + AO > 0) {
                return 'U2';
            }
            if (count_Yamato_class(fleet) > 0) {
                return 'O';
            }
            if (Ss > 0 && AS === 0) {
                return 'O';
            }
            if (CVH > 0) {
                return 'O';
            }
            if (difficulty === 4 && count_Reigo_ships(fleet) > 4 && Ds > 5) {
                return 'P';
            }
            if (difficulty === 3 && count_Reigo_ships(fleet) > 4 && Ds > 3) {
                return 'P';
            }
            if (difficulty === 2 && count_Reigo_ships(fleet) > 3 && Ds > 3) {
                return 'P';
            }
            if (difficulty === 1 && count_Reigo_ships(fleet) > 2 && Ds > 3) {
                return 'P';
            }
            return 'O';
        case 'P':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'P2';
            }
            if (BBs > 2) {
                return 'P1';
            }
            if (CVH > 0) {
                return 'P1';
            }
            if (CVL > 2) {
                return 'P1';
            }
            if (Ds < 4) {
                return 'P1';
            }
            if (Ss > 0 && AS === 0) {
                return 'P1';
            }
            return 'P2';
        case 'P2':
            if (count_Yamato_class(fleet) > 0) {
                return 'Q';
            }
            if (BBs > 3) {
                return 'Q';
            }
            if (CVH > 1) {
                return 'Q';
            }
            if (phase !== 3) {
                return 'R';
            }
            if (BBs === 3) {
                return 'Q';
            }
            if (LHA + AV + AO > 2) {
                return 'Q';
            }
            if (Ds < 4 && count_ship(fleet, ['杉', '榧']) === 0) {
                return 'Q';
            }
            if (difficulty === 4 && count_Reigo_ships(fleet) < 5) {
                return 'Q';
            }
            if (count_Reigo_ships(fleet) > 4 && Ds > 3) {
                return 'R';
            }
            if (count_Reigo_ships(fleet) > 1 && Ds > 5) {
                return 'R';
            }
            if (AV + AO + LHA === 0 && Ds > 5) {
                return 'R';
            }
            return 'Y';
        case 'R':
            if (phase !== 3) {
                if (seek.c2 >= 74) {
                    return 'T';
                }
                return 'S';
            }
            if (seek.c2 < 74) {
                return 'S';
            }
            if (route.includes('U') || route.includes('U1')) {
                return 'Z';
            }
            if (Ds < 6) {
                return 'Z';
            }
            return 'T';
        case 'U1':
            if (Ss > 0 && AS === 0) {
                return 'N';
            }
            if (difficulty > 2 && count_Reigo_ships(fleet) > 4) {
                return 'U2';
            }
            if (difficulty === 2 && count_Reigo_ships(fleet) > 3) {
                return 'U2';
            }
            if (difficulty === 1 && count_Reigo_ships(fleet) > 2) {
                return 'U2';
            }
            if (count_Yamato_class(fleet) > 0) {
                return 'N';
            }
            if (CVH > 0) {
                return 'N';
            }
            return 'U2';
        case 'U2':
            if (CVH > 1) {
                return 'V';
            }
            if (count_Reigo_ships(fleet) > 3) {
                return 'U3';
            }
            if (count_Yamato_class(fleet) === 0) {
                return 'U3';
            }
            return 'V';
        case 'V':
            return 'U3';
        case 'B':
            return option.B === 'B1'
                ? 'B1'
                : 'B2';
        case 'D':
            return option.D === 'D1'
                ? 'D1'
                : 'E';
    }

    omission_of_conditions(node, sim_fleet);
}