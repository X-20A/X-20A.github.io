import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";

export function calc_7_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
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
            return '1';
        case '1':
            if (Ds < 2 || Ss > 0) {
                return 'A';
            }
            if (f_length > 5) {
                if (CVH > 1 || BBs + CVH > 3 || CLE > 2) {
                    return 'A';
                }
                return 'B';
            }
            if (f_length === 5) {
                if (CVH > 2) {
                    return 'A';
                }
                if (BBs + CVH > 0 || CLE > 1 || DE < 3) {
                    return 'B';
                }
                return 'C';
            }
            if (f_length < 5) {
                if (BBs + CVH > 0 || Ds < 3) {
                    return 'B';
                }
                return 'C';
            }
            break; // f_lengthより例外なし
        case 'C':
            if (AO + Ss > 0) {
                return 'D';
            }
            if (f_length > 5) {
                if (BBs + CVH > 0) {
                    return 'D';
                }
                if (Ds > 3) {
                    return 'E';
                }
                return 'D';
            }
            if (f_length === 5) {
                if (BBs + CVH > 1) {
                    return 'D';
                }
                if (Ds > 3 || DE > 2) {
                    return 'E';
                }
                return 'D';
            }
            if (f_length < 5) {
                if (BBs + CVH > 1) {
                    return 'D';
                }
                if (Ds > 2 || DE > 1) {
                    return 'E';
                }
                return 'D';
            }
            break; // f_lengthより例外なし
        case 'D':
            if (isFaster) {
                return 'I';
            }
            if (BBCVs > 3) {
                return 'H';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'I';
            }
            if (BBCVs === 3) {
                return 'H';
            }
            if (BBCVs === 2) {
                return [
                    { node: 'H', rate: 0.35 },
                    { node: 'I', rate: 0.65 },
                ];
            }
            if (BBCVs < 2) {
                return 'I';
            } // BBCVsより例外なし
            break;
        case 'E':
            if (f_length < 6 || Ds > 4 || (DD > 0 && DE > 2)) {
                return 'G';
            }
            if (seek[3] < 46) {
                return 'F';
            }
            return 'G';
        case 'I':
            if (AO > 0 || (AV > 0 && Ds > 2)) {
                return 'J';
            }
            if (seek[3] < 63) {
                return 'L';
            }
            if (seek[3] < 69 && seek[3] >= 63) {
                return [
                    { node: 'J', rate: 0.333 },
                    { node: 'L', rate: 0.333 },
                    { node: 'M', rate: 0.334 },
                ];
            }
            if (seek[3] >= 69) {
                return 'M';
            } // LoSより例外なし
            break;
    }

    omission_of_conditions(node, sim_fleet);
}