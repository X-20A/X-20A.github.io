import { CalcFnNoCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_7_2: CalcFnNoCondition = (
    node,
    sim_fleet,
) => {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    switch (node) {
        case null:
            return '1';
        case '1':
            if (Ds < 2 || Ss > 0) {
                return 'A';
            }
            if (ships_length > 5) {
                if (CVH > 1 || BBs + CVH > 3 || CLE > 2) {
                    return 'A';
                }
                return 'B';
            }
            if (ships_length === 5) {
                if (CVH > 2) {
                    return 'A';
                }
                if (BBs + CVH > 0 || CLE > 1 || DE < 3) {
                    return 'B';
                }
                return 'C';
            }
            if (ships_length < 5) {
                if (BBs + CVH > 0 || Ds < 3) {
                    return 'B';
                }
                return 'C';
            }
            break; // ships_lengthより例外なし
        case 'C':
            if (AO + Ss > 0) {
                return 'D';
            }
            if (ships_length > 5) {
                if (BBs + CVH > 0) {
                    return 'D';
                }
                if (Ds > 3) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length === 5) {
                if (BBs + CVH > 1) {
                    return 'D';
                }
                if (Ds > 3 || DE > 2) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length < 5) {
                if (BBs + CVH > 1) {
                    return 'D';
                }
                if (Ds > 2 || DE > 1) {
                    return 'E';
                }
                return 'D';
            }
            break; // ships_lengthより例外なし
        case 'D':
            if (is_fleet_speed_faster_or_more(speed)) {
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
            if (ships_length < 6 || Ds > 4 || (DD > 0 && DE > 2)) {
                return 'G';
            }
            if (seek.c4 < 46) {
                return 'F';
            }
            return 'G';
        case 'I':
            if (AO > 0 || (AV > 0 && Ds > 2)) {
                return 'J';
            }
            if (seek.c4 < 63) {
                return 'L';
            }
            if (seek.c4 < 69 && seek.c4 >= 63) {
                return [
                    { node: 'J', rate: 0.333 },
                    { node: 'L', rate: 0.333 },
                    { node: 'M', rate: 0.334 },
                ];
            }
            if (seek.c4 >= 69) {
                return 'M';
            } // LoSより例外なし
            break;
    }

    omission_of_conditions(node, sim_fleet);
}