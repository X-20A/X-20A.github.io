import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { countAktmrPlusCVs, countShip } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier } from "../../../models/fleet/predicate";

export function calc_59_5(
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
        is_faster: isFaster,
        seek,
        yamato_class_count: yamato,
    } = fleet;

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
            if (!isUnion) {
                return '1';
            }
            if (phase === '1' && isUnion) {
                return '2';
            }
            if (Number(phase) > 1) {
                if (BBs + CVH > 2) {
                    return '3';
                }
                if (CVH > 1) {
                    return '3';
                }
                return '2';
            }
            break; // phaseより例外なし
        case '1':
            if (is_fleet_speed_fastest(speed)) {
                return 'A';
            }
            if (BBCVs > 1) {
                return 'A1';
            }
            if (isFaster) {
                return 'A';
            }
            if (BBs + CVH > 0) {
                return 'A1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'A';
            }
            return 'A1';
        case '2':
            if (isFaster) {
                return 'E';
            }
            if (Ss > 0 && AS === 0) {
                return 'D';
            }
            if (BBs + CVH > 1) {
                return 'D';
            }
            if (Ds < 4) {
                return 'D';
            }
            return 'E';
        case 'A1':
            if (Ss > 0) {
                return 'A2';
            }
            if (BBCVs > 2) {
                return 'A2';
            }
            if (BBs > 1) {
                return 'A2';
            }
            return 'A';
        case 'C':
            if (seek[3] >= 70) {
                return 'C2';
            }
            return 'C1';
        case 'E':
            if (isFaster) {
                return 'G';
            }
            if (Ds > 5) {
                return 'G';
            }
            if (Ds > 4 && CA > 1 && CVH === 0 && CVL < 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'G';
            }
            return 'F';
        case 'J':
            if (true) {
                return 'L';
            }
            return 'K';
        case 'M2':
            if (isFaster) {
                return 'N';
            }
            if (is_fleet_carrier(f_type)) {
                return 'N';
            }
            return 'M3';
        case 'O':
            if (isFaster) {
                return 'O2';
            }
            if (yamato > 0) {
                return 'O1';
            }
            if (CVs > 3) {
                return 'O1';
            }
            if (CVH > 2) {
                return 'O1';
            }
            if (Ds < 4) {
                return 'O1';
            }
            return 'O2';
        case 'Q':
            if (BBs > 3) {
                return 'R1';
            }
            if (isFaster) {
                return 'R';
            }
            if (yamato > 1) {
                return 'R1';
            }
            if (yamato === 1 && is_fleet_speed_slow(speed)) {
                return 'R1';
            }
            if (BBs > 2) {
                return 'R1';
            }
            return 'R';
        case 'R1':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'R';
            }
            if (yamato + countShip(fleet, 'Iowa') > 1) {
                return 'R2';
            }
            if (BB > 1) {
                return 'R2';
            }
            return 'R';
        case 'S':
            if (yamato > 1) {
                return 'S2';
            }
            if (CVH > 0) {
                return 'S2';
            }
            if (Ds < 3) {
                return 'S2';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                if (CA > 1 && CVL < 2) {
                    return 'T';
                }
                return 'S1';
            }
            if (is_fleet_speed_slow(speed)) {
                if (CLE > 2) {
                    return 'S1';
                }
                return 'S2';
            }
            break; // 速度より例外なし
        case 'S2':
            if (BBs === 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            return 'S1';
        case 'T':
            if (seek[1] >= 65) {
                return 'V';
            }
            return 'U';
        case 'Z':
            if (seek[1] < 83) {
                return 'Z1';
            }
            if (countAktmrPlusCVs(fleet) > 2) {
                return 'Y';
            }
            if (CAs > 3) {
                return 'Y';
            }
            if (BBs > 3) {
                return 'Z1';
            }
            if (Number(phase) < 3) {
                if (isFaster) {
                    return 'Y';
                }
                if (BBs > 2) {
                    return 'Z1';
                }
                return 'Y';
            }
            if (Number(phase) === 3) {
                if (isFaster) {
                    return 'ZZ';
                }
                if (BBs > 2) {
                    return 'Z1';
                }
                if (yamato === 0) {
                    return 'ZZ';
                }
                if (yamato === 1 && BBs < 3 && CAs > 1 && CLE > 1 && Ds > 3) {
                    return 'ZZ';
                }
                return 'Z1';
            }
            break;
        case 'Z1':
            if (true) {
                return 'ZZ';
            }
            return 'Z2';
        case 'G':
            if (option.G === 'H') {
                return 'H';
            }
            return 'I';
        case 'O2':
            if (option.O2 === 'P') {
                return 'P';
            }
            return 'Q';
        case 'W':
            if (option.W === 'Z') {
                return 'Z';
            }
            return 'X';
    }

    omission_of_conditions(node, sim_fleet);
}