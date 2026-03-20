import { CalcFnWithCondition } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_59_1: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
        fleet, ship_names, base_ship_names, fleet_type, ships_length, speed, seek, route,
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
            if (phase === 1) {
                return '1';
            }
            if (CVH >= 1) {
                return '1';
            }
            if (BBs + CVL >= 4) {
                return '1';
            }
            if (BBs >= 3) {
                return '1';
            }
            if (AO >= 1) {
                return '1';
            }
            if (CL + AV >= 3) {
                return '1';
            }
            if (BBs >= 1 && CL >= 1 && AV >= 1) {
                return '1';
            }
            return '2';
        case '2':
            if (LHA >= 1) {
                return 'I';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'J';
            }
            if (Ss >= 1) {
                return 'I';
            }
            if (CVL >= 2) {
                return 'I';
            }
            if (CAs >= 3) {
                return 'I';
            }
            if (Ds <= 1) {
                return 'I';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            if (BBs >= 2) {
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
            if (AO >= 1) {
                return 'D';
            }
            if (Ds === 1) {
                if (Ss >= 1) {
                    return 'C1';
                }
                if (BBCVs >= 3) {
                    return 'C1';
                }
                return 'D';
            }
            if (Ds >= 2) {
                if (Ss >= 1 && is_fleet_speed_slow(speed)) {
                    return 'C1';
                }
                if (CVs >= 3 && CLE === 0) {
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
                if (BBCVs <= 1 && CLE === 0) {
                    return 'D';
                }
                return 'B';
            }
            break;
        case 'C1':
            if (BBs + CVH + Ss >= 2) {
                return 'D';
            }
            if (CVs >= 3) {
                return 'D';
            }
            if (Ss >= 1 && Ds <= 4) {
                return 'D';
            }
            if (Ds <= 1) {
                return 'D';
            }
            return 'E';
        case 'C2':
            if (
                BBs <= 1 &&
                CVH === 0 &&
                CVL <= 1 &&
                Ds >= 2 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'L';
            }
            return 'C1';
        case 'G':
            if (route.includes('1')) {
                return 'H';
            }
            if (phase <= 2) {
                return 'K';
            }
            if (BBCVs >= 2) {
                return 'K';
            }
            if (Ds >= 5) {
                return 'L';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            if (Ds === 4) {
                return 'L';
            }
            if (Ds === 3 && CL >= 1 && BBCVs === 0) {
                return 'L';
            }
            return 'K';
        case 'C':
            return option.C;
        case 'E':
            return option.E;
    }

    omission_of_conditions(node, sim_fleet);
}