import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_Daigo_ships, count_ship, count_ship_exact } from "../../../models/fleet/AdoptFleet";

export function calc_60_2(
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
            if (option.phase === '1') {
                return '1';
            }
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            // is_fleet_combined(fleet_type)
            return '2';
        case '2':
            if (is_fleet_transport(fleet_type)) {
                return 'L';
            }
            if (CL > 1 && Ds > 3) {
                return 'L';
            }
            if (CL > 1 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'H';
        case 'A':
            if (BBCVs > 3) {
                return 'A1';
            }
            if (CL > 0 && Ds > 1) {
                return 'A2';
            }
            if (BBs > 1) {
                return 'A1';
            }
            if (CVH > 0) {
                return 'A1';
            }
            if (Ds < 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'A1';
            }
            return 'A2';
        case 'C':
            if (count_ship(fleet, '大泊') > 0) {
                return 'H';
            }
            if (CL > 0 && Ds > 1) {
                return 'H';
            }
            if (Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'H';
            }
            return 'G';
        case 'F':
            if (route.includes('D')) {
                return 'F2';
            }
            if (CVH > 0) {
                return 'F2';
            }
            return 'R';
        case 'H':
            if (route.includes('1')) {
                return 'I';
            }
            if (option.difficulty === '4' && count_Daigo_ships(fleet) > 4) {
                return 'L';
            }
            if (option.difficulty === '3' && count_Daigo_ships(fleet) > 2) {
                return 'L';
            }
            if (option.difficulty === '2' && count_Daigo_ships(fleet) > 1) {
                return 'L';
            }
            if (option.difficulty === '1') {
                return 'L';
            }
            return 'M';
        case 'I':
            if (seek[3] >= 82) {
                return 'K';
            }
            return 'J';
        case 'M':
            if (BBs > 2) {
                return 'D';
            }
            if (BB > 1 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (CVH > 0 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (count_ship(fleet, '大泊') + CA > 1 && CLE > 1 && Ds > 2) {
                return 'N';
            }
            return 'D';
        case 'P':
            if (is_fleet_transport(fleet_type)) {
                return 'R';
            }
            if (BB + CVH === 0 && BBV + CVL < 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'R';
            }
            return 'F';
        case 'Q':
            if (phase < 3) {
                return 'S';
            }
            if (BBs > 0 && CVH > 0) {
                return 'S';
            }
            if (CVs > 1) {
                return 'S';
            }
            if (count_ship(fleet, '大泊') > 0) {
                return 'V';
            }
            if (CL < 3 && is_fleet_speed_slow(speed)) {
                return 'S';
            }
            if (Ds > 5) {
                return 'V';
            }
            if (count_Daigo_ships(fleet) > 7) {
                return 'V';
            }
            if (count_ship(fleet, ['那智', '足柄']) + CLE === 5) {
                return 'V';
            }
            if (
                count_ship(fleet, ['那智', '足柄']) === 2
                && count_ship(fleet, ['阿武隈', '多摩', '木曾']) === 2
                && count_ship(fleet, ['霞', '不知火', '薄雲', '曙', '初霜', '初春', '若葉'])
                + count_ship_exact(fleet, ['潮', '潮改', '潮改二'])
                > 1
                && DD === 5
            ) {
                return 'V';
            }
            return 'S';
        case 'V1':
            if (seek[1] >= 68) {
                return 'W';
            }
            return 'V2';
        case 'B':
            if (option.B === 'C') {
                return 'C';
            }
            return 'D';
        case 'E':
            if (option.E === 'F') {
                return 'F';
            }
            return 'F1';
        case 'N':
            if (option.N === 'O') {
                return 'O';
            }
            return 'P';
    }

    omission_of_conditions(node, sim_fleet);
}