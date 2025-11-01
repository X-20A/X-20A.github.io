import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_60_4(
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
        matsu_count: matsu,
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
            return '1';
        case 'B':
            if (Number(phase) < 3) {
                return 'C';
            }
            if (Ss > 0 && AS === 0) {
                return 'S';
            }
            if (isFaster) {
                return 'C';
            }
            if (Ss > 0 && Ds < 6) {
                return 'S';
            }
            if (BBs + CVH > 3 && is_fleet_speed_slow(speed)) {
                return 'S';
            }
            if (CVH > 2) {
                return 'S';
            }
            if (Ds > 3) {
                return 'T';
            }
            if (Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            return 'S';
        case 'C':
            if (CL === 0) {
                return 'U';
            } if (is_fleet_speed_slow(speed)) {
                return 'U';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                if (yamato > 0) {
                    return 'U';
                }
                if (Ds > 5) {
                    return 'W';
                }
                return 'U';
            }
            // isFaster
            if (yamato > 1) {
                return 'U';
            }
            if (Ds > 4) {
                return 'W';
            }
            if (matsu > 0 && Ds === 4) {
                return 'W';
            }
            return 'U';
        case 'D':
            if (!isUnion) {
                if (is_fleet_speed_slow(speed)) {
                    return 'E';
                }
                if (BBs + CVH > 2) {
                    return 'E';
                }
                if (CVH > 2) {
                    return 'E';
                }
                if (Ss > 0) {
                    return 'E';
                }
                if (Ds < 2) {
                    return 'E';
                }
                return 'F';
            } // isUnion
            return 'S';
        case 'G1':
            if (Number(phase) > 1 && CL + CT > 0 && Ds > 1 && BBs + CVH < 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'I';
            }
            return 'G2';
        case 'I':
            if (seek[3] < 70) {
                return 'K';
            } if (yamato > 0) {
                return 'J';
            }
            if (CVH > 1) {
                return 'J';
            }
            if (CVH === 1 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (Ds < 2) {
                return 'J';
            }
            return 'L';
        case 'M':
            if (yamato > 0) {
                return 'N';
            }
            if (CL + Ds > 4 && Ds > 1) {
                return 'O';
            }
            if (CL > 0 && Ds > 1 && BBs + CVH < 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'P':
            if (seek[3] >= 77) {
                return 'R';
            }
            return 'Q';
        case 'T':
            if (isFaster) {
                return 'U';
            }
            if (Ds > 5 && BBs + CVH < 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'U';
            }
            return 'C';
        case 'U':
            return 'W';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'D';
        case 'F':
            return option.F === 'F1'
                ? 'F1'
                : 'G';
        case 'G':
            return option.G === 'G1'
                ? 'G1'
                : 'H';
    }

    omission_of_conditions(node, sim_fleet);
}