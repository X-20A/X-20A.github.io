import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { count_Yamato_class, include_ship_names } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_57_7(
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
            switch (phase) {
                case 1:
                case 2:
                    return '1';
                case 3:
                    if (is_fleet_carrier(fleet_type)) {
                        return '2';
                    }
                    return '1';
                case 4:
                case 5:
                case 6:
                case 7:
                    if (!is_fleet_combined(fleet_type)) {
                        return '1';
                    }
                    if (is_fleet_surface(fleet_type) && BBs > 3) {
                        return '1';
                    }
                    if (is_fleet_transport(fleet_type)) {
                        return '3';
                    }
                    return '2';
            }
            break;
        case '1':
            if (!is_fleet_combined(fleet_type)) {
                return 'A';
            }
            return 'C'; // fleet_type !== 通常艦隊
        case 'A':
            if (CVH > 0) {
                return 'A1';
            }
            if (CL === 0) {
                return 'A1';
            }
            if (Ds < 2) {
                return 'A1';
            }
            if (Ds < 4 && is_fleet_speed_slow(speed)) {
                return 'A1';
            }
            return 'A2';
        case 'A1':
            if (CL > 0 && DD > 3) {
                return 'A2';
            }
            if (BBs > 1) {
                return 'A2';
            }
            return 'B';
        case 'A3':
            if (!is_fleet_combined(fleet_type)) {
                return 'A4';
            }
            return 'A5'; // fleet_type !== 通常艦隊
        case 'B':
            if (seek[3] >= 88) {
                return 'B2';
            }
            return 'B1';
        case 'C2':
            if (phase >= 5
                && include_ship_names(fleet, ['明石改', '秋津洲改', '速吸改', '神威改母', '山汐丸改', '宗谷'])
                && is_fleet_speed_fast_or_more(speed)
            ) {
                return 'L';
            }
            if (phase >= 5 && CVH < 3) {
                return 'D';
            }
            return 'C3';
        case 'D':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'F';
            }
            if (BBs + CVH > 5) {
                return 'E';
            }
            if (DD > 3) {
                return 'F';
            }
            return 'E';
        case 'F':
            if (phase >= 2) {
                return 'G';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'G';
            }
            return 'H';
        case 'K':
            if (Ss > 0) {
                return 'M';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'M';
            }
            return 'N';
        case 'L':
            if (BBCVs > 6) {
                return 'N';
            }
            if (BBCVs > 5 && is_fleet_speed_slow(speed)) {
                return 'N';
            }
            if (Ds < 4 && is_fleet_speed_slow(speed)) {
                return 'T';
            }
            if (phase === 7) {
                if (is_fleet_speed_fastest(speed)) {
                    return 'X';
                }
                if (DD > 7 && is_fleet_speed_fast_or_more(speed)) {
                    return 'X';
                }
                if (
                    count_Yamato_class(fleet) < 2
                    && is_fleet_speed_faster_or_more(speed)
                ) {
                    return 'V';
                }
                if (count_Yamato_class(fleet) < 2
                    && BBs + CVH < 5
                    && CVH < 3
                    && CL + DD > 4
                    && is_fleet_speed_fast_or_more(speed)
                ) {
                    return 'V';
                }
                return 'U';
            }
            if (phase >= 6 && BBs + CV < 5 && CL > 1) {
                return 'U';
            }
            return 'T';
        case 'N':
            if (sim_fleet.route.includes('K')) {
                return 'O';
            }
            if (sim_fleet.route.includes('Q')) {
                return 'O';
            }
            if (sim_fleet.route.includes('L')) {
                return 'T';
            }
            break; // どれかは経由するので例外なし
        case 'O':
            if (phase < 4) {
                return 'P';
            }
            if (is_fleet_carrier(fleet_type) || is_fleet_surface(fleet_type)) {
                return 'P';
            }
            return 'R'; // fleet_type === Ft.f4 // 通常艦隊がくるかは分からない
        case 'Q':
            if (BBV + CVL + CAs > 3) {
                return 'N';
            }
            return 'O';
        case 'U':
            if (BBs > 4) {
                return 'V';
            }
            return 'X';
        case 'X':
            if (phase < 6) {
                return 'W';
            }
            if (include_ship_names(fleet, ['明石改', '秋津洲改', '速吸改', '神威改母', '山汐丸改', '宗谷'])) {
                return 'Y';
            }
            return 'Z';
        case 'A2':
            return option.A2 === 'B'
                ? 'B'
                : 'A3';
        case 'B2':
            return option.B2 === 'B3'
                ? 'B3'
                : 'B4';
        case 'C':
            return option.C === 'A3'
                ? 'A3'
                : 'C1';
        case 'J':
            return option.J === 'K'
                ? 'K'
                : 'L';
    }

    omission_of_conditions(node, sim_fleet);
}