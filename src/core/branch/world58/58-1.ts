import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { countAktmrPlusCVs, countNotEquipArctic } from "../../../models/fleet/AdoptFleet";

export function calc_58_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        speed,
        is_faster: isFaster,
        seek,
    } = fleet;

    const track = sim_fleet.route;

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
            if (option.phase === 'A') {
                return '1';
            }
            if (countAktmrPlusCVs(fleet) === 0 && Ds > 3) {
                return '2';
            }
            if (countAktmrPlusCVs(fleet) > 0 && countNotEquipArctic(fleet) > 0) {
                return '2';
            }
            if (AO + LHA > 0 && Ds > 2) {
                return '2';
            }
            if (AV > 1 && Ds > 2) {
                return '2';
            }
            if (option.phase === '3' && countAktmrPlusCVs(fleet) > 0) {
                return '3';
            }
            if (countAktmrPlusCVs(fleet) > 2) {
                return '1';
            }
            if (BBs > 0) {
                return '1';
            }
            if (Ss > 0 && AS === 0) {
                return '2';
            }
            if (AS > 1) {
                return '2';
            }
            if (option.phase === '3' && CA > 1 && Ds > 1 && CLE > 0) {
                return '3';
            }
            if (countAktmrPlusCVs(fleet) > 0 && Ds > 2) {
                return '2';
            }
            return '1';
        case '2':
            if (AV > 0) {
                return 'I';
            }
            if (isFaster) {
                return 'N';
            }
            if (AO + LHA === 2 && AO + LHA + Ds === 6) {
                return 'N';
            }
            if (AO + LHA === 1 && AO + LHA + Ds === f_length && f_length < 6) {
                return 'N';
            }
            return 'I';
        case 'B':
            if (Number(option.phase) < 3) {
                return 'C';
            }
            if (CL > 0 && DD > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'W';
            }
            return 'C';
        case 'D':
            if (track.includes('1')) {
                return 'E';
            }
            if (track.includes('2')) {
                if (CVs > 2) {
                    return 'J';
                }
                if (DD < 2) {
                    return 'J';
                }
                if (is_fleet_speed_slow(speed)) {
                    return 'J';
                }
                return 'K';
            }
            break;
        case 'K':
            if (seek[3] >= 68) {
                return 'M';
            }
            return 'L';
        case 'R':
            if (BBs < 3 && CL + AV > 0 && DD > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'R2';
            }
            return 'R1';
        case 'R2':
            if (DD > 4) {
                return 'T';
            }
            if (CL > 0 && DD > 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            return 'S';
        case 'S':
            if (seek[3] >= 80) {
                return 'T';
            }
            return 'U';
        case 'W':
            if (CA > 1 && DD > 1) {
                return 'R2';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'R';
            }
            if (BBs > 0 && CVH > 1 && CL === 0) {
                return 'R';
            }
            if (DD > 2) {
                return 'R2';
            }
            if (DD < 2) {
                return 'R';
            }
            if (CL === 0) {
                return 'R';
            }
            if (CVH > 2) {
                return 'R2';
            }
            if (CVH < 2) {
                return 'R2';
            }
            if (BBs === 0) {
                return 'R2';
            }
            if (seek[3] >= 100) {
                return 'R2';
            }
            return 'R';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'D';
        case 'I':
            return option.I === 'D'
                ? 'D'
                : 'N1';
        case 'F':
            return option.F === 'G'
                ? 'G'
                : 'H';
    }

    omission_of_conditions(node, sim_fleet);
}