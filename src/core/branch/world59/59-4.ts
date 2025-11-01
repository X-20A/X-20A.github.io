import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more } from "../../../logic/speed/predicate";

export function calc_59_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        is_union: isUnion,
        speed,
        seek,
        yamato_class_count: yamato,
    } = fleet;

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
    } = option;

    switch (node) {
        case null:
            if (!isUnion) {
                return '1';
            }
            return '2';
        case '1':
            if (Ss > 0) {
                return 'A1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                if (BBs > 2) {
                    return 'A1';
                }
                if (Ds > 1) {
                    return 'A';
                }
                if (f_length < 5) {
                    return 'A';
                } else {
                    return 'A1';
                }
            }
            // f_speed === Sp.s1
            if (CVs > 1) {
                return 'A1';
            }
            if (BBs > 0) {
                return 'A1';
            }
            if (CLE > 0 && Ds > 1) {
                return 'A';
            }
            if (f_length < 5) {
                return 'A';
            }
            return 'A1';
        case 'C':
            if (BBs + CVH > 2) {
                return 'I';
            }
            if (CVH > 1) {
                return 'I';
            }
            if (CVs > 2) {
                return 'I';
            }
            if (Ds < 2) {
                return 'I';
            }
            if (Number(phase) > 1 && BBs === 0) {
                return 'M';
            }
            if (Number(phase) > 1 && f_length < 7 && BBs === 1 && CL > 0) {
                return 'M';
            }
            return 'L';
        case 'F':
            if (true) {
                return 'F1';
            }
            return 'F2';
        case 'G':
            if (true) {
                return 'H';
            }
            return 'K';
        case 'I':
            if (CVH > 1) {
                return 'J';
            }
            if (CLE === 0 && Ds < 3) {
                return 'J';
            }
            if (true) {
                return 'L';
            }
            return 'J';
        case 'J':
            if (true) {
                return 'L';
            }
            return 'K';
        case 'M':
            if (CVH > 0) {
                return 'N';
            }
            if (CVL > 1) {
                return 'N';
            }
            if (Ds > 3) {
                return 'O';
            }
            if (CLE > 0 && Ds === 3) {
                return 'O';
            }
            if (CLE > 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'Q':
            if (seek[3] >= 72) {
                return 'S';
            }
            return 'R';
        case 'T':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'T2';
            }
            if (Ss > 0 && AS === 0) {
                return 'T1';
            }
            if (BBs > 3) {
                return 'T1';
            }
            if (CVs > 3) {
                return 'T1';
            }
            if (CVH > 2) {
                return 'T1';
            }
            if (CLE + Ds < 4) {
                return 'T1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'T2';
            }
            if (BBs < 3 && CLE > 1 && Ds > 3) {
                return 'T2';
            }
            return 'T1';
        case 'W':
            if (seek[1] < 80) {
                return 'X';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'Z';
            }
            if (yamato > 0) {
                return 'X';
            }
            if (BBs > 3) {
                return 'X';
            }
            if (BBs > 2 && CVs > 2) {
                return 'X';
            }
            return 'Z';
        case 'X':
            if (seek[1] < 73) {
                return 'K';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'Z';
            }
            if (yamato > 1) {
                return 'Y';
            }
            if (BBs > 4) {
                return 'Y';
            }
            return 'Z';
        case 'A2':
            if (option.A2 === 'B') {
                return 'B';
            }
            return 'C';
        case 'D':
            if (option.D === 'E') {
                return 'E';
            }
            return 'F';
    }

    omission_of_conditions(node, sim_fleet);
}