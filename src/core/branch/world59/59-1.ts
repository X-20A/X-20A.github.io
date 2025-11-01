import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_59_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
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
    } = option;

    switch (node) {
        case null:
            if (phase === '1') {
                return '1';
            }
            if (CVH > 0) {
                return '1';
            }
            if (BBs + CVL > 3) {
                return '1';
            }
            if (BBs > 2) {
                return '1';
            }
            if (AO > 0) {
                return '1';
            }
            if (CL + AV > 2) {
                return '1';
            }
            if (BBs > 0 && CL > 0 && AV > 0) {
                return '1';
            }
            return '2';
        case '2':
            if (LHA > 0) {
                return 'I';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'J';
            }
            if (Ss > 0) {
                return 'I';
            }
            if (CVL > 1) {
                return 'I';
            }
            if (CAs > 2) {
                return 'I';
            }
            if (Ds < 2) {
                return 'I';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            if (BBs > 1) {
                return 'I';
            }
            if (CLE === 0) {
                return 'I';
            }
            return 'J';
        case 'A':
            if (Ds === 0) {
                return 'B';
            }
            if (AO > 0) {
                return 'D';
            }
            if (Ds === 1) {
                if (Ss > 0) {
                    return 'C1';
                }
                if (BBCVs > 2) {
                    return 'C1';
                }
                return 'D';
            }
            if (Ds > 1) {
                if (Ss > 0 && is_fleet_speed_slow(speed)) {
                    return 'C1';
                }
                if (CVs > 2 && CLE === 0) {
                    return 'B';
                }
                if (BBCVs === 4) {
                    return 'B';
                }
                if (BBCVs === 3) {
                    return 'D';
                }
                if (BBCVs === 2 && CLE + AV === 0) {
                    return 'D';
                }
                if (BBCVs < 2 && CLE === 0) {
                    return 'D';
                }
                return 'B';
            }
            break;
        case 'C1':
            if (BBs + CVH + Ss > 1) {
                return 'D';
            }
            if (CVs > 2) {
                return 'D';
            }
            if (Ss > 0 && Ds < 5) {
                return 'D';
            }
            if (Ds < 2) {
                return 'D';
            }
            return 'E';
        case 'C2':
            if (BBs < 2 && CVH === 0 && CVL < 2 && Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'C1';
        case 'G':
            if (track.includes('1')) {
                return 'H';
            }
            if (Number(phase) < 3) {
                return 'K';
            }
            if (BBCVs > 1) {
                return 'K';
            }
            if (Ds > 4) {
                return 'L';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            if (Ds === 4) {
                return 'L';
            }
            if (Ds === 3 && CL > 0 && BBCVs === 0) {
                return 'L';
            }
            return 'K';
        case 'C':
            return option.C === 'C1'
                ? 'C1'
                : 'C2';
        case 'E':
            return option.E === 'F'
                ? 'F'
                : 'G';
    }

    omission_of_conditions(node, sim_fleet);
}