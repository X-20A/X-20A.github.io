import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_normal, is_fleet_striking, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";
import { countAktmrPlusCVs } from "../../../models/fleet/AdoptFleet";

export function calc_59_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        fleet_type: f_type,
        is_union: isUnion,
        speed,
        seek,
        yamato_class_count: yamato,
    } = fleet;

    const track = sim_fleet.route;

    const {
        phase,
    } = option;

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
            if (is_fleet_normal(f_type, f_length)) {
                return '1';
            }
            if (is_fleet_striking(f_type, f_length)) {
                return '2';
            }
            if (is_fleet_transport(f_type)) {
                return '1';
            }
            if (phase === '1' && (is_fleet_surface(f_type) || is_fleet_carrier(f_type))) {
                return '1';
            }
            if (Number(phase) > 1 && (is_fleet_surface(f_type) || is_fleet_carrier(f_type))) {
                return '3';
            }
            break; // 艦隊種別より例外なし
        case '1':
            if (!isUnion) {
                return 'A';
            }
            return 'L';
        case '2':
            if (CVH < 3 && Ds > 2) {
                return 'H';
            }
            return 'G';
        case 'B':
            if (CVs > 3) {
                return 'B2';
            }
            if (CVH > 2) {
                return 'B2';
            }
            if (AV > 1) {
                return 'B2';
            }
            if (LHA > 0) {
                return 'B2';
            }
            if (BBs < 3 && Ds > 2) {
                return 'C';
            }
            return 'B1';
        case 'B1':
            if (!isUnion) {
                return 'C';
            }
            if (is_fleet_transport(f_type)) {
                return 'P';
            }
            if (is_fleet_surface(f_type)) {
                return 'N';
            }
            if (is_fleet_carrier(f_type)) {
                if (countAktmrPlusCVs(fleet) > 3) {
                    return 'N';
                }
                if (CVH > 1) {
                    return 'N';
                }
                if (Ds < 2 && BBs > 3) {
                    return 'N';
                }
                return 'P';
            }
            return 'P'; // 保険
        case 'C3':
            if (seek[3] < 103) {
                return 'E';
            }
            if (BBs + CVH > 3) {
                return 'D';
            }
            if (Ds < 2) {
                return 'D';
            }
            return 'F';
        case 'H':
            if (Ds > 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'H2';
            }
            if (CVH > 1) {
                return 'B2';
            }
            return 'H1';
        case 'I':
            if (seek[3] >= 82) {
                return 'K';
            }
            return 'J';
        case 'N':
            if (is_fleet_surface(f_type)) {
                return 'O';
            }
            if (is_fleet_carrier(f_type)) {
                if (is_fleet_speed_slow(speed)) {
                    return 'O';
                }
                return 'P';
            }
            return 'P'; // 通常艦隊が来られないこともなさそう。保険
        case 'P':
            if (track.includes('1')) {
                return 'Q';
            }
            if (track.includes('3')) {
                if (yamato > 1) {
                    return 'T';
                }
                if (CVH > 2) {
                    return 'T';
                }
                if (Ss > 0 && AS === 0) {
                    return 'T';
                }
                if (is_fleet_surface(f_type) && is_fleet_speed_slow(speed)) {
                    return 'T';
                }
                return 'U';
            }
            break; // 2からは来られないので例外なし
        case 'Q':
            if (seek[1] >= 53) {
                return 'S';
            }
            return 'R';
        case 'V':
            if (LHA > 0 && is_fleet_speed_slow(speed)) {
                return 'V1';
            }
            if (AV > 1 && is_fleet_speed_slow(speed)) {
                return 'V1';
            }
            if (BBs > 3 && is_fleet_speed_slow(speed)) {
                return 'V1';
            }
            if (BBs > 4) {
                return 'V1';
            }
            if (BBCVs > 5) {
                return 'V2';
            }
            if (BBs + CVH > 4) {
                return 'V2';
            }
            if (CVH > 2) {
                return 'V2';
            }
            if (Ss > 0 && AS === 0) {
                return 'V2';
            }
            if (yamato > 1 && is_fleet_speed_slow(speed)) {
                return 'V2';
            }
            if (Number(phase) < 3) {
                return 'V3';
            }
            if (Ds < 4) {
                return 'V3';
            }
            if (CL > 1 && CA > 1) {
                return 'X';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'X';
            }
            return 'V3';
        case 'V3':
            if (seek[1] >= 72) {
                return 'X';
            }
            return 'W';
        case 'C':
            if (option.C === 'C1') {
                return 'C1';
            }
            return 'C2';
    }

    omission_of_conditions(node, sim_fleet);
}