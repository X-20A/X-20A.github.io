import { count_carriers } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_combined, is_fleet_transport } from "../../../models/fleet/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { CalcFnWithCondition } from "..";

export const calc_59_2: CalcFnWithCondition = (
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

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                return 'A';
            }
            return 'F';
        case 'A':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'A2';
            }
            if (DD >= 4) {
                return 'A2';
            }
            if (DD >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'A2';
            }
            return 'A1';
        case 'C':
            if (seek.c4 >= 60) {
                return 'E';
            }
            return 'D';
        case 'G':
            if (is_fleet_transport(fleet_type)) {
                return 'I';
            }
            if (count_carriers(fleet) >= 5) {
                return 'H';
            }
            if (BBs >= 4) {
                return 'H';
            }
            if (CVH >= 3) {
                return 'H';
            }
            if (Ds <= 2) {
                return 'H';
            }
            if (DD === 3) {
                if (is_fleet_speed_slow(speed)) {
                    return 'H';
                }
                if (LHA >= 1) {
                    return 'I';
                }
                if (AV >= 2) {
                    return 'I';
                }
                return 'K';
            }
            if (DD >= 4) {
                if (LHA >= 1) {
                    return 'I';
                }
                if (AV >= 2) {
                    return 'I';
                }
                if (BBs === 3 && CVs === 1 && CLE === 2) {
                    return 'I';
                }
                if (is_fleet_speed_fast_or_more(speed)) {
                    return 'K';
                }
                if (CVH <= 1 && CLE >= 2) {
                    return 'K';
                }
                return 'H';
            }
            return 'H';
        case 'I':
            if (CVH >= 2) {
                return 'J';
            }
            if (Ds <= 3) {
                return 'J';
            }
            if (CLE <= 1 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (Ds + LHA <= 5 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (BBs <= 1) {
                return 'L';
            }
            if (count_carriers(fleet) <= 1) {
                return 'L';
            }
            return 'J';
        case 'R':
            if (seek.c2 >= 68) {
                return 'W';
            }
            return 'V';
        case 'S':
            if (seek.c2 >= 59) {
                return 'U';
            }
            return 'T';
        case 'L':
            return option.L;
        case 'N':
            return option.N;
        case 'P':
            return option.P;
    }

    omission_of_conditions(node, sim_fleet);
}