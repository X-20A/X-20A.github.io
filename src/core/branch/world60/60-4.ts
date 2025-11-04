import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { count_Matsu_class, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { is_fleet_combined } from "../../../models/fleet/predicate";

export function calc_60_4(
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

    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
            return '1';
        case 'B':
            if (phase < 3) {
                return 'C';
            }
            if (Ss > 0 && AS === 0) {
                return 'S';
            }
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'C';
            }
            if (Ss > 0 && Ds < 6) {
                return 'S';
            }
            if (BBs + CVH > 3 && is_fleet_speed_slow(speed)) {
                return 'S';
            }
            if (CVH > 2) {
                return 'S';
            }
            if (Ds > 3) {
                return 'T';
            }
            if (Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            return 'S';
        case 'C':
            if (CL === 0) {
                return 'U';
            } if (is_fleet_speed_slow(speed)) {
                return 'U';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                if (count_Yamato_class(fleet) > 0) {
                    return 'U';
                }
                if (Ds > 5) {
                    return 'W';
                }
                return 'U';
            }
            // isFaster
            if (count_Yamato_class(fleet) > 1) {
                return 'U';
            }
            if (Ds > 4) {
                return 'W';
            }
            if (count_Matsu_class(fleet) > 0 && Ds === 4) {
                return 'W';
            }
            return 'U';
        case 'D':
            if (!is_fleet_combined(fleet_type)) {
                if (is_fleet_speed_slow(speed)) {
                    return 'E';
                }
                if (BBs + CVH > 2) {
                    return 'E';
                }
                if (CVH > 2) {
                    return 'E';
                }
                if (Ss > 0) {
                    return 'E';
                }
                if (Ds < 2) {
                    return 'E';
                }
                return 'F';
            } // is_fleet_combined(fleet_type)
            return 'S';
        case 'G1':
            if (phase > 1 && CL + CT > 0 && Ds > 1 && BBs + CVH < 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'I';
            }
            return 'G2';
        case 'I':
            if (seek[3] < 70) {
                return 'K';
            } if (count_Yamato_class(fleet) > 0) {
                return 'J';
            }
            if (CVH > 1) {
                return 'J';
            }
            if (CVH === 1 && is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (Ds < 2) {
                return 'J';
            }
            return 'L';
        case 'M':
            if (count_Yamato_class(fleet) > 0) {
                return 'N';
            }
            if (CL + Ds > 4 && Ds > 1) {
                return 'O';
            }
            if (CL > 0 && Ds > 1 && BBs + CVH < 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'O';
            }
            return 'N';
        case 'P':
            if (seek[3] >= 77) {
                return 'R';
            }
            return 'Q';
        case 'T':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'U';
            }
            if (Ds > 5 && BBs + CVH < 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'U';
            }
            return 'C';
        case 'U':
            return 'W';
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'D';
        case 'F':
            return option.F === 'F1'
                ? 'F1'
                : 'G';
        case 'G':
            return option.G === 'G1'
                ? 'G1'
                : 'H';
    }

    omission_of_conditions(node, sim_fleet);
}