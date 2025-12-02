import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_6_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
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
            return '1';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'C';
        case 'E':
            if (AV < 2) {
                if (CL < 2 && DD > 2) {
                    return 'G';
                }
                if (CL < 3) {
                    return [
                        { node: 'F', rate: 0.6 },
                        { node: 'G', rate: 0.4 },
                    ];
                }
                return 'F';
            }
            return 'F';
        case 'H':
            if (seek.c3 < 36) {
                return 'I';
            }
            if (seek.c3 < 38 && seek.c3 >= 36) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (seek.c3 >= 38) {
                return 'J';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}