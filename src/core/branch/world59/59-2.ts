import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { countAktmrPlusCVs } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_transport } from "../../../models/fleet/predicate";

export function calc_59_2(
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

    switch (node) {
        case null:
            if (!isUnion) {
                return 'A';
            }
            return 'F';
        case 'A':
            if (isFaster) {
                return 'A2';
            }
            if (DD > 3) {
                return 'A2';
            }
            if (DD > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'A2';
            }
            return 'A1';
        case 'C':
            if (seek[3] >= 60) {
                return 'E';
            }
            return 'D';
        case 'G':
            if (is_fleet_transport(f_type)) {
                return 'I';
            }
            if (countAktmrPlusCVs(fleet) > 4) {
                return 'H';
            }
            if (BBs > 3) {
                return 'H';
            }
            if (CVH > 2) {
                return 'H';
            }
            if (Ds < 3) {
                return 'H';
            }
            if (DD === 3) {
                if (is_fleet_speed_slow(speed)) {
                    return 'H';
                }
                if (LHA > 0) {
                    return 'I';
                }
                if (AV > 1) {
                    return 'I';
                }
                return 'K';
            }
            if (DD > 3) {
                if (LHA > 0) {
                    return 'I';
                }
                if (AV > 1) {
                    return 'I';
                }
                if (BBs === 3 && CVs === 1 && CLE === 2) {
                    return 'I';
                }
                if (is_fleet_speed_fast_or_more(speed)) {
                    return 'K';
                }
                if (CVH < 2 && CLE > 1) {
                    return 'K';
                }
                return 'H';
            }
            return 'H';
        case 'I':
            if (CVH > 1) {
                return 'J';
            }
            if (Ds < 4) {
                return 'J';
            }
            if (CLE < 2 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (Ds + LHA < 6 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (BBs < 2) {
                return 'L';
            }
            if (countAktmrPlusCVs(fleet) < 2) {
                return 'L';
            }
            return 'J';
        case 'R':
            if (seek[1] >= 68) {
                return 'W';
            }
            return 'V';
        case 'S':
            if (seek[1] >= 59) {
                return 'U';
            }
            return 'T';
        case 'L':
            return option.L === 'M'
                ? 'M'
                : 'N';
        case 'N':
            return option.N === 'O'
                ? 'O'
                : 'P';
        case 'P':
            return option.P === 'Q'
                ? 'Q'
                : 'R';
    }

    omission_of_conditions(node, sim_fleet);
}