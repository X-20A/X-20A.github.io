import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { countAktmrPlusCVs, isInclude } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_surface, is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_58_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_type: f_type,
        is_union: isUnion,
        speed,
        seek,
        yamato_class_count: yamato,
    } = fleet;

    const track = sim_fleet.route;

    const {
        phase,
        difficulty,
        tag,
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
            if (phase === '1') {
                return '1';
            }
            if (Number(phase) > 1) {
                if (!isUnion) {
                    return '1';
                }
                if (is_fleet_transport(f_type)) {
                    return '2';
                }
                if (is_fleet_surface(f_type)) {
                    if (BBV + CAV === 2 && CL === 1 && BBV + CL + Ds + AO + AS + LHA === 12) {
                        return '2';
                    }
                    if (((BBV + CAV === 1) || (BBV + CAV === 2)) && CLE === 2 && BBV + CAV + CLE + Ds + AO + AS + LHA === 12) {
                        return '2';
                    }
                    if (Number(phase) < 3) {
                        return '1';
                    }
                    if (option.phase === '3') {
                        return '3';
                    }
                }
                if (is_fleet_carrier(f_type)) {
                    return '1';
                }
            }
            break;
        case '1':
            if (Number(phase) < 2 && Ss > 0) {
                return 'A1';
            }
            if (CVH > 3) {
                return 'A';
            }
            if (yamato > 1 && is_fleet_speed_slow(speed)) {
                return 'A';
            }
            if (Number(phase) > 1 && tag === '1') {
                return 'P';
            }
            if (AS + Ss > 0) {
                return 'A1';
            }
            if (isUnion) {
                return 'A1';
            }
            if (difficulty === '1') {
                return 'A1';
            }
            return 'A'; // Number(difficulty) > 1
        case '3':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            if (Ds > 4) {
                return 'T';
            }
            if (CVs > 2) {
                return 'F';
            }
            if (yamato === 1) {
                return 'F';
            }
            return 'T';
        case 'A':
            if (!isUnion) {
                return 'A1';
            }
            if (CVH > 3) {
                return 'A1';
            }
            if (Ds > 3) {
                return 'B';
            }
            return 'A1';
        case 'A1':
            if (!isUnion) {
                return 'A2';
            }
            return 'B';
        case 'C':
            if (AV > 1) {
                return 'C2';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'C1';
            }
            if (CVs > 3) {
                return 'C2';
            }
            if (CAs > 2) {
                return 'C2';
            }
            return 'C1';
        case 'D':
            if (BB > 0) {
                return 'D2';
            }
             if (CLE > 2) {
                return 'D1';
            }
            if (CVL > 0 && Ds > 3) {
                return 'D1';
            }
            if (CVL === 0 && BBV === 0 && CLE > 1 && is_fleet_speed_slow(speed)) {
                return 'D1';
            }
            if (CVL === 0 && CLE === 2 && Ds > 3) {
                return 'D1';
            }
            return 'D2';
        case 'E':
            if (yamato === 2 && DD < 5) {
                return 'F';
            }
            if (yamato === 1 && DD < 4) {
                return 'F';
            }
            if (yamato === 0 && DD < 3) {
                return 'F';
            }
            if (BBCVs < 5) {
                return 'F1';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'F';
            }
            if (BBCVs === 5) {
                return 'F1';
            }
            if (CL > 1) {
                return 'F1';
            }
            return 'F';
        case 'F':
            if (!isUnion) {
                return 'J1';
            }
            if (is_fleet_transport(f_type)) {
                return 'J1';
            }
            if (track.includes('P')) {
                return 'J1';
            }
            if (track.includes('1')) {
                return 'F1';
            }
            if (track.includes('2')) {
                return 'J1';
            }
            if (track.includes('3')) {
                return 'U';
            }
            break; // 出撃地点網羅により例外なし
        case 'F1':
            return 'G';
        case 'H':
            if (is_fleet_speed_slow(speed)) {
                return 'I';
            }
            return 'J';
        case 'I1':
            if (DD > 7) {
                return 'I3';
            }
            return 'I2';
        case 'J':
            if (phase === '1') {
                return 'J1';
            }
            if (BBs + countAktmrPlusCVs(fleet) > 0) {
                return 'F';
            }
            if (difficulty === '4' && Ss > 3 && CAs < 2) {
                return 'J1';
            }
            if (Number(difficulty) < 4 && Ss > 2) {
                return 'J1';
            }
            return 'F';
        case 'J1':
            if (isUnion) {
                return 'J2';
            }
            if (BBs + countAktmrPlusCVs(fleet) > 0) {
                return 'Q';
            }
            if (CL === 1 && DD === 2 && AS === 1 && Ss === 3) {
                return 'R';
            }
            if (difficulty === '1' && CL > 0 && DD > 2) {
                return 'R';
            }
            if (AS === 0) {
                return 'Q';
            }
            if (CAs + CLE + CLT > 0) {
                return 'Q';
            }
            if (AV > 1) {
                return 'Q';
            }
            if (DD > 2) {
                return 'Q';
            }
            if (Ss > 3) {
                return 'R';
            }
            if (AV === 0) {
                return 'R';
            }
            return 'Q';
        case 'J2':
            if (track.includes('2')) {
                if (DD > 7) {
                    return 'M';
                } else {
                    return 'L';
                }
            } // track.includes('3')
            if (CVs > 2) {
                return 'L';
            }
            return 'V';
        case 'L':
            return 'M';
        case 'M':
            if (seek[1] >= 52) {
                return 'O';
            }
            return 'N';
        case 'U':
            if (BBs < 4 && CVH === 0 && CVL < 2 && CL > 1 && Ds > 3) {
                return 'V';
            }
            if (yamato < 2 && CVH < 2 && DD > 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'V';
            }
            if (yamato < 2 && CL > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'V';
            }
            return 'J2';
        case 'V':
            if (isInclude(fleet, ['明石改', '朝日改', '秋津洲改'])) {
                return 'W';
            }
            return 'X';
        case 'X':
            if (seek[1] >= 84) {
                return 'Z';
            }
            return 'Y';
        case 'B':
            if (option.B === 'C') {
                return 'C';
            }
            return 'D';
    }

    omission_of_conditions(node, sim_fleet);
}