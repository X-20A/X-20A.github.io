import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_transport } from "../../../models/fleet/predicate";
import { is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { countShip } from "../../../models/fleet/AdoptFleet";

export function calc_60_6(
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
            if (!isUnion) {
                return '1';
            } else { // isUnion
                if (phase !== '1' && BBs > 2) {
                    return '3';
                }
                if (phase !== '1' && BBs + CVH > 3) {
                    return '3';
                }
                if (is_fleet_transport(f_type)) {
                    return '2';
                }
                if (BBCVs > 2) {
                    return '2';
                }
                return '1';
            }
            break;
        case 'A':
            if (isUnion) {
                return 'C';
            }
            if (isFaster) {
                return 'B';
            }
            if (Ds > 2) {
                return 'B';
            }
            return 'C';
        case 'D':
            if (isUnion) {
                if (track.includes('1')) {
                    if (difficulty === '4' && reigo < 5) {
                        return 'E';
                    }
                    if (difficulty === '3' && reigo < 3) {
                        return 'E';
                    }
                    if (difficulty === '2' && reigo < 2) {
                        return 'E';
                    }
                    if (Ds > 5 && BBs + CVH < 3) {
                        return 'F';
                    }
                    return 'E';
                }
                // track.includes('2')
                return 'C2'
            }
            // !isUnion
            if (Ds > 2) {
                return 'F';
            }
            return 'E';
        case 'C2':
            if (track.includes('1')) {
                return 'D';
            }
            // track.includes('2')
            return 'I';
        case 'E':
            if (track.includes('1')) {
                return 'F';
            } else { // track.includes('2')
                if (isFaster) {
                    return 'C2';
                }
                return 'D';
            }
            break;
        case 'H':
            if (seek[1] < 65) {
                return 'E';
            }
            if (isFaster) {
                return 'C2';
            }
            return 'E';
        case 'J':
            if (is_fleet_transport(f_type)) {
                return 'J3';
            }
            if (yamato > 0) {
                return 'J1';
            }
            if (AV + AO + LHA > 2) {
                return 'J3';
            }
            if (Number(phase) < 3) {
                return 'J2';
            }
            if (reigo > 3 && Ds > 3 && BBs + CVH < 4) {
                return 'J1';
            }
            return 'J2';
        case 'J1':
            if (Number(phase) < 3) {
                return 'J2';
            }
            if (is_fleet_speed_fastest(speed)) {
                return 'R';
            }
            if (isFaster) {
                return 'P';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J2';
            }
            if (yamato > 0) {
                return 'J2';
            }
            if (countShip(fleet, ['榧', '杉']) > 0) {
                return 'P';
            }
            if (countShip(fleet, ['足柄', '大淀', '霞', '朝霜', '清霜']) > 4) {
                return 'P';
            }
            if (Ds > 3 && BBs + CVH < 3) {
                return 'P';
            }
            return 'J2';
        case 'J2':
            if (phase !== '1' && isFaster) {
                return 'P';
            }
            if (LHA > 0) {
                return 'J3';
            }
            if (AV > 1) {
                return 'J3';
            }
            if (phase === '1') {
                return 'K';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            if (BBs > 3) {
                return 'K';
            }
            if (CAs === 1 && CL > 1 && Ds > 5 && CVH === 0) {
                return 'P';
            }
            if (CAs > 1 && Ds > 4 && CVH < 3 && yamato === 0) {
                return 'P';
            }
            return 'K';
        case 'J3':
            if (yamato > 0) {
                return 'J4';
            }
            if (BBs > 3) {
                return 'J4';
            }
            if (CVH > 2) {
                return 'J4';
            }
            if (is_fleet_transport(f_type)) {
                return 'M';
            }
            if (CL > 1) {
                return 'M';
            }
            return 'J4';
        case 'N':
            if (countShip(fleet, ['明石改', '朝日改', '秋津洲改', '速吸改', '山汐丸改', '神威改母', '宗谷', 'しまね丸改']) > 0) {
                return 'O1';
            }
            return 'O';
        case 'O1':
            return 'O';
        case 'S':
            if (is_fleet_speed_fastest(speed)) {
                return 'X';
            }
            if (BBs + CVH > 3) {
                return 'W';
            }
            if (Ss > 0 && AS === 0) {
                return 'W';
            }
            if (yamato > 0 && CL < 2) {
                return 'W';
            }
            if (difficulty === '4' && reigo > 5 && Ds > 5) {
                return 'X';
            }
            if (['3', '2'].includes(difficulty) && reigo > 3 && Ds > 3) {
                return 'X';
            }
            if (difficulty === '1' && reigo > 0 && Ds > 2) {
                return 'X';
            }
            return 'W';
        case 'T':
            return 'V';
        case 'X':
            return 'Z';
        case 'G':
            return option.G === 'H'
                ? 'H'
                : 'J';
        case 'K':
            return option.K === 'J3'
                ? 'J3'
                : 'L';
        case 'R':
            return option.R === 'S'
                ? 'S'
                : 'T';
    }

    omission_of_conditions(node, sim_fleet);
}