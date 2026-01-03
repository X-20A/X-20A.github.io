import { count_carriers, count_ship, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined } from "../../../models/fleet/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { CalcFnWithCondition } from "..";

export const calc_59_5: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            if (phase === 1 && is_fleet_combined(fleet_type)) {
                return '2';
            }
            if (phase > 1) {
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
            if (is_fleet_speed_faster_or_more(speed)) {
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
            if (is_fleet_speed_faster_or_more(speed)) {
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
            if (seek.c4 >= 70) {
                return 'C2';
            }
            return 'C1';
        case 'E':
            if (is_fleet_speed_faster_or_more(speed)) {
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
            return 'L';
        case 'M2':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'N';
            }
            if (is_fleet_carrier(fleet_type)) {
                return 'N';
            }
            return 'M3';
        case 'O':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'O2';
            }
            if (count_Yamato_class(fleet) > 0) {
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
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'R';
            }
            if (count_Yamato_class(fleet) > 1) {
                return 'R1';
            }
            if (count_Yamato_class(fleet) === 1 && is_fleet_speed_slow(speed)) {
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
            if (count_Yamato_class(fleet) + count_ship(fleet, 'Iowa') > 1) {
                return 'R2';
            }
            if (BB > 1) {
                return 'R2';
            }
            return 'R';
        case 'S':
            if (count_Yamato_class(fleet) > 1) {
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
            if (seek.c2 >= 65) {
                return 'V';
            }
            return 'U';
        case 'Z':
            if (seek.c2 < 83) {
                return 'Z1';
            }
            if (count_carriers(fleet) > 2) {
                return 'Y';
            }
            if (CAs > 3) {
                return 'Y';
            }
            if (BBs > 3) {
                return 'Z1';
            }
            if (phase < 3) {
                if (is_fleet_speed_faster_or_more(speed)) {
                    return 'Y';
                }
                if (BBs > 2) {
                    return 'Z1';
                }
                return 'Y';
            }
            if (phase === 3) {
                if (is_fleet_speed_faster_or_more(speed)) {
                    return 'ZZ';
                }
                if (BBs > 2) {
                    return 'Z1';
                }
                if (count_Yamato_class(fleet) === 0) {
                    return 'ZZ';
                }
                if (count_Yamato_class(fleet) === 1 && BBs < 3 && CAs > 1 && CLE > 1 && Ds > 3) {
                    return 'ZZ';
                }
                return 'Z1';
            }
            break;
        case 'Z1':
            return 'ZZ';
        case 'G':
            return option.G;
        case 'O2':
            return option.O2;
        case 'W':
            return option.W;
    }

    omission_of_conditions(node, sim_fleet);
}