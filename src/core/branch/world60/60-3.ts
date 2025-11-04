import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { count_Daigo_ships, count_ship, include_ship_names } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_60_3(
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
            if (phase < 3) {
                return '1';
            }
            if (phase > 2) {
                if (is_fleet_combined(fleet_type)) {
                    return '3';
                }
                if (count_Daigo_ships(fleet) > 3) {
                    return '1';
                }
                return '2';
            }
            break;
        case 'B':
            if (count_ship(fleet, '大泊') > 0) {
                return 'B2';
            }
            if (CVs > 0) {
                return 'B1';
            }
            if (BBs > 0 && is_fleet_speed_slow(speed)) {
                return 'B1';
            }
            if (CL > 0 && Ds > 2) {
                return 'B2';
            }
            return 'B1';
        case 'B2':
            if (seek[3] >= 72) {
                return 'B4';
            }
            return 'B3';
        case 'D':
            if (CVs > 0) {
                return 'D1';
            }
            if (BBs > 0 && is_fleet_speed_slow(speed)) {
                return 'D1';
            }
            if (CL === 0) {
                return 'D1';
            }
            if (difficulty === 4 && count_Daigo_ships(fleet) > 5) {
                return 'D3';
            }
            if (difficulty === 3 && count_Daigo_ships(fleet) > 3) {
                return 'D3';
            }
            if (difficulty === 2 && count_Daigo_ships(fleet) > 2) {
                return 'D3';
            }
            if (difficulty === 1) {
                return 'D3';
            }
            return 'D1';
        case 'D1':
            if (seek[3] >= 70) {
                return 'D3';
            }
            return 'D2';
        case 'E':
            if (seek[3] < 76) {
                return 'E1';
            }
            if (phase === 1) {
                return 'E2';
            }
            if (CVH > 0) {
                return 'E2';
            }
            if (include_ship_names(fleet, '大泊') && BBs + CVL < 3 && Ds > 1) {
                return 'F';
            }
            if (BBs > 2) {
                return 'B';
            }
            if (BBs > 1 && is_fleet_speed_slow(speed)) {
                return 'B';
            }
            if (CL === 0) {
                return 'E2';
            }
            if (Ds < 3) {
                return 'E2';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'F';
            }
            if (
                difficulty === 4 &&
                count_Daigo_ships(fleet) > 4
                && ships_length - arBulge_carrier_count < 5
            ) {
                return 'F';
            }
            if (difficulty === 3 && ships_length - arBulge_carrier_count < 7) {
                return 'F';
            }
            if (difficulty < 3) {
                return 'F';
            }
            return 'E2';
        case 'F1':
            if (seek[3] < 79) {
                return 'F2';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'G';
            }
            if (BBs > 1 && !include_ship_names(fleet, '大泊')) {
                return 'F3';
            }
            if (BBs === 1 && !include_ship_names(fleet, '大泊') && is_fleet_speed_slow(speed)) {
                return 'F3';
            }
            if (difficulty === 4 && count_Daigo_ships(fleet) > 5 && Ds > 3) {
                return 'G';
            }
            if (difficulty === 3 && count_Daigo_ships(fleet) > 3) {
                return 'G';
            }
            if (difficulty === 2 && count_Daigo_ships(fleet) > 1) {
                return 'G';
            }
            if (difficulty === 1) {
                return 'G';
            }
            return 'F3';
        case 'F3':
            if (route.includes('1')) {
                return 'G';
            }
            // route.includes('3')
            return 'U';
        case 'H1':
            if (seek[3] >= 67) {
                return 'H3';
            }
            return 'H2';
        case 'I':
            if (Ss === ships_length) {
                return 'I2';
            } if (is_fleet_speed_slow(speed)) {
                return 'I1';
            }
            if (ships_length - arBulge_carrier_count > 5) {
                return 'I2';
            }
            // ships_length - arBulge < 6
            return 'J';
        case 'K':
            if (route.includes('2')) {
                if (seek[3] >= 75) {
                    return 'K2';
                }
                return 'K1';
            }
            // route.includes('3')
            return 'L';
        case 'L':
            if (phase < 4) {
                return 'M';
            }
            if (is_fleet_transport(fleet_type)) {
                return 'N';
            }
            return 'M';
        case 'M2':
            if (BBCVs > 5) {
                return 'P';
            }
            if (CL < 3 && is_fleet_speed_slow(speed)) {
                return 'P';
            }
            if (BBs > 3) {
                return 'Q';
            }
            if (CVH > 2) {
                return 'Q';
            }
            if (LHA > 0) {
                return 'Q';
            }
            return 'S';
        case 'P':
            if (BBCVs > 5) {
                return 'Q';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'O1';
            }
            if (BBs > 2) {
                return 'Q';
            }
            if (CVH > 2) {
                return 'Q';
            }
            return 'O1';
        case 'Q':
            if (route.includes('P')) {
                return 'O2';
            }
            if (BBs > 3) {
                return 'S';
            }
            if (CVH > 2) {
                return 'S';
            }
            if (CVH > 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'S';
            }
            return 'O2';
        case 'T':
            if (
                CAs > 1 && CL > 1 && Ds > 3 &&
                ships_length - arBulge_carrier_count < 11
            ) {
                return 'U';
            }
            return 'F3';
        case 'V':
            if (seek[1] < 76) {
                return 'W';
            }
            if (phase === 5 && count_ship(fleet, ['明石改', '朝日改', '秋津洲改', '速吸改', '山汐丸改', '神威改母', '宗谷', 'しまね丸改']) > 0) {
                return 'S3';
            }
            return 'X';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'C';
        case 'C':
            return option.C === 'D'
                ? 'D'
                : 'E';
        case 'H':
            return option.H === 'H1'
                ? 'H1'
                : 'I';
        case 'M':
            return option.M === 'M1'
                ? 'M1'
                : 'M2';
        case 'S':
            return option.S === 'S1'
                ? 'S1'
                : 'S2';
    }

    omission_of_conditions(node, sim_fleet);
}