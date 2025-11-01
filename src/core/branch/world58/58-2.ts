import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier } from "../../../models/fleet/predicate";
import { countAktmrPlusCVs, countShip } from "../../../models/fleet/AdoptFleet";

export function calc_58_2(
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
    } = fleet;

    const track = sim_fleet.route;

    const {
        phase,
        difficulty,
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
            if (phase === '2') {
                if (isUnion) {
                    return '2';
                }
                return '1';
            }
            if (phase === '3') {
                if (isUnion) {
                    return '2';
                }
                if (BBs > 0) {
                    return '1';
                }
                if (countAktmrPlusCVs(fleet) > 0) {
                    return '1';
                }
                if (difficulty === '4' && Ss < 3) {
                    return '1';
                }
                if (difficulty === '3' && Ss < 2) {
                    return '1';
                }
                if (Number(difficulty) < 3 && Ss === 0) {
                    return '1';
                }
                return '3';
            }
            break; // phaseより例外なし
        case 'C':
            if (track.includes('1')) {
                if (is_fleet_speed_slow(speed)) {
                    return 'F';
                }
                if (CVH > 0) {
                    return 'F';
                }
                return 'D';
            }
            if (track.includes('3')) {
                return 'I';
            }
            break; // 1, 3以外からは来られない
        case 'D':
            if (!isUnion) {
                if (seek[3] >= 98) {
                    return 'D2';
                }
                return 'D1';
            }
            return 'N';
        case 'E':
            if (CVH > 0) {
                return 'F';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'G';
            }
            if (BBs > 1) {
                return 'F';
            }
            if (CL > 0 && Ds > 1) {
                return 'G';
            }
            return 'F';
        case 'H':
            if (track.includes('1')) {
                if (seek[3] < 80) {
                    return 'K';
                }
                if (is_fleet_speed_slow(speed)) {
                    return 'J';
                }
                if (BBs > 1) {
                    return 'J';
                }
                if (countShip(fleet, 'あきつ丸') + CVL > 1) {
                    return 'J';
                }
                return 'I';
            }
            if (track.includes('3')) {
                return 'V';
            }
            break;
        case 'I':
            if (Ss > 0) {
                return 'U';
            }
            return 'D3';
        case 'J':
            if (!isUnion) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'N';
            }
            if (BBs > 2) {
                return 'N';
            }
            if (CVs > 2) {
                return 'N';
            }
            if (CL > 1 && DD > 4) {
                return 'P';
            }
            return 'N';
            break;
        case 'L':
            if (is_fleet_carrier(f_type)) {
                return 'M';
            }
            return 'D'; // f_type === Ft.f3
        case 'N':
            if (CVH > 0) {
                return 'O';
            }
            if (CVL > 2) {
                return 'O';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'P';
            }
            if (CL > 1 && DD > 2) {
                return 'P';
            }
            return 'O';
        case 'P':
            if (seek[1] >= 62) {
                return 'R';
            }
            return 'Q';
        case 'T':
            if (CAs > 1) {
                return 'C';
            }
            if (CL > 1) {
                return 'C';
            }
            return 'U';
        case 'U':
            if (CAs > 0) {
                return 'H';
            }
            if (CL > 1) {
                return 'H';
            }
            if (difficulty === '1') {
                return 'V';
            }
            if (AV > 0) {
                return 'H';
            }
            if (AS > 0) {
                return 'V';
            }
            return 'H';
        case 'V':
            if (CAs + AV > 1) {
                return 'W';
            }
            if (difficulty === '4' && Ss > 3) {
                return 'X';
            }
            if (difficulty === '3' && Ss > 2) {
                return 'X';
            }
            if (difficulty === '2' && Ss > 1) {
                return 'X';
            }
            if (difficulty === '1') {
                return 'X';
            }
            return 'W';
        case 'B':
            return option.B === 'C'
                ? 'C'
                : 'E';
    }

    omission_of_conditions(node, sim_fleet);
}