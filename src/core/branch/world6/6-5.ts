import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_6_5: CalcFnNoCondition = (
    node,
    sim_fleet,
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
            if (CL === 0 || CVs + CLT >= 1 || BBs >= 4) {
                return '1';
            }
            return '2';
        case 'B':
            if (BBs === 3 || DD <= 1) {
                return 'C';
            }
            return 'F';
        case 'C':
            if (
                DD === 0 ||
                CLT >= 2 ||
                BBCVs >= 4 ||
                BBCVs + CAs >= 5
            ) {
                return 'E';
            }
            return 'D';
        case 'E':
            if (CVs >= 1 && CL >= 1 && DD >= 1) {
                return 'H';
            }
            return 'I';
        case 'G':
            if (seek.c3 < 50) {
                return 'K';
            }
            return 'M';
        case 'I':
            if (CL === 0) {
                return 'H';
            }
            if (DD >= 2) {
                return 'J';
            }
            if (
                BBs === 0 &&
                CVs + CAs <= 4 &&
                CVs <= 2 &&
                CAs <= 4
            ) {
                return 'J';
            }
            return 'H';
        case 'J':
            if (seek.c3 < 35) {
                return 'L';
            }
            return 'M';
    }

    omission_of_conditions(node, sim_fleet);
}