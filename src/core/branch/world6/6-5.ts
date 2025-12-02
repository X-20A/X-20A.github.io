import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_6_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    switch (node) {
        case null:
            if (CL === 0 || CVs + CLT > 0 || BBs > 3) {
                return '1';
            }
            return '2';
        case 'B':
            if (BBs === 3 || DD < 2) {
                return 'C';
            }
            return 'F';
        case 'C':
            if (
                DD === 0 ||
                CLT > 1 ||
                BBCVs > 3 ||
                BBCVs + CAs > 4
            ) {
                return 'E';
            }
            return 'D';
        case 'E':
            if (CVs > 0 && CL > 0 && DD > 0) {
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
            if (DD > 1) {
                return 'J';
            }
            if (
                BBs === 0 &&
                CVs + CAs < 5 &&
                CVs < 3 &&
                CAs < 5
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