import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { countShip } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_60_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        is_union: isUnion,
        speed,
        is_faster: isFaster,
        seek,
        yamato_class_count: yamato,
        reigo_count: reigo,
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

    const {
        phase,
        difficulty,
    } = option;

    switch (node) {
        case null:
            if (phase === '1') {
                return '1';
            }
            if (!isUnion) {
                return '1';
            } // isUnion
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
            if (seek[3] >= 92) {
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
            if (seek[3] >= 102) {
                return 'F2';
            }
            return 'F1';
        case 'I':
            if (Ss === 0 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            return 'J1';
        case 'J':
            if (seek[3] >= 91) {
                return 'K';
            }
            return 'K2';
        case 'M':
            if (Number(phase) < 3) {
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
            if (phase === '3' && Ds < 6) {
                return 'U2';
            }
            if (phase === '3' && LHA + AV + AO > 0) {
                return 'U2';
            }
            if (yamato > 0) {
                return 'O';
            }
            if (Ss > 0 && AS === 0) {
                return 'O';
            }
            if (CVH > 0) {
                return 'O';
            }
            if (difficulty === '4' && reigo > 4 && Ds > 5) {
                return 'P';
            }
            if (difficulty === '3' && reigo > 4 && Ds > 3) {
                return 'P';
            }
            if (difficulty === '2' && reigo > 3 && Ds > 3) {
                return 'P';
            }
            if (difficulty === '1' && reigo > 2 && Ds > 3) {
                return 'P';
            }
            return 'O';
        case 'P':
            if (isFaster) {
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
            if (yamato > 0) {
                return 'Q';
            }
            if (BBs > 3) {
                return 'Q';
            }
            if (CVH > 1) {
                return 'Q';
            }
            if (phase !== '3') {
                return 'R';
            }
            if (BBs === 3) {
                return 'Q';
            }
            if (LHA + AV + AO > 2) {
                return 'Q';
            }
            if (Ds < 4 && countShip(fleet, ['杉', '榧']) === 0) {
                return 'Q';
            }
            if (difficulty === '4' && reigo < 5) {
                return 'Q';
            }
            if (reigo > 4 && Ds > 3) {
                return 'R';
            }
            if (reigo > 1 && Ds > 5) {
                return 'R';
            }
            if (AV + AO + LHA === 0 && Ds > 5) {
                return 'R';
            }
            return 'Y';
        case 'R':
            if (phase !== '3') {
                if (seek[1] >= 74) {
                    return 'T';
                }
                return 'S';
            }
            if (seek[1] < 74) {
                return 'S';
            }
            if (track.includes('U') || track.includes('U1')) {
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
            if (Number(difficulty) > 2 && reigo > 4) {
                return 'U2';
            }
            if (difficulty === '2' && reigo > 3) {
                return 'U2';
            }
            if (difficulty === '1' && reigo > 2) {
                return 'U2';
            }
            if (yamato > 0) {
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
            if (reigo > 3) {
                return 'U3';
            }
            if (yamato === 0) {
                return 'U3';
            }
            return 'Y';
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