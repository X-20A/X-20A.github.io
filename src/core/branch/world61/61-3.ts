import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined } from "../../../models/fleet/predicate";
import { count_Yamato_class } from "../../../models/fleet/AdoptFleet";

export function calc_61_3(
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
            if (!is_fleet_combined(fleet_type)) {
                return '1';
            }
            if (is_fleet_combined(fleet_type)) {
                if (phase === 1) {
                    return '2';
                }
                if (phase === 3 && is_fleet_carrier(fleet_type)) {
                    return '3';
                }
                return '2';
            }
        case '3':
            if (CVH >= 3) {
                return 'R';
            }
            if (Ds <= 2 && CA <= 1) {
                return 'R';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'N';
            }
            if (CL >= 2) {
                return 'N';
            }
            if (Ds >= 6) {
                return 'N';
            }
            return 'R';
        case 'C':
            if (phase === 1) {
                return 'C1';
            }
            if (CL + AV === 0) {
                return 'C1';
            }
            if (Ds <= 1) {
                return 'C1';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'T';
            }
            if (BBs <= 1 && Ds >= 3) {
                return 'T';
            }
            return 'C1';
        case 'C1':
            if (phase === 1) {
                return 'C2';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'P';
            }
            if (AV >= 1) {
                return 'P';
            }
            if (BBCVs >= 4) {
                return 'C2'
            }
            if (BBs + CVH >= 3) {
                return 'C2'
            }
            return 'P';
        case 'G':
            if (
                BBs <= 2 &&
                CVH <= 1 &&
                CL >= 2 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'G2';
            }
            return 'G1';
        case 'G1':
            if (is_fleet_combined(fleet_type)) {
                return 'G2';
            }
            if (Ds >= 3) {
                return 'W';
            }
            return 'U';
        case 'H':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'I';
            }
            if (
                CL >= 2 &&
                Ds >= 4 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'J';
            }
            if (CVs <= 1 && Ds >= 4) {
                return 'J';
            }
            return 'I';
        case 'I':
            if (is_fleet_speed_faster_or_more(speed)) {
                return 'K';
            }
            return 'J';
        case 'K':
            return 'M';
        case 'N':
            if (phase <= 2) {
                return 'O';
            }
            if (CVs >= 3) {
                return 'V';
            }
            if (CL >= 2) {
                return 'V';
            }
            return 'X';
        case 'O':
            if (phase <= 2) {
                return 'D';
            }
            if (count_Yamato_class(fleet) >= 2) {
                return 'Y';
            }
            if (Ss >= 1) {
                return 'Y';
            }
            if (CVH >= 3) {
                return 'Y';
            }
            if (Ds <= 2 && is_fleet_speed_slow(speed)) {
                return 'Y';
            }
            if (Ds <= 1) {
                return 'Y';
            }
            return 'Z';
        case 'R':
            if (CVs <= 2) {
                return 'R2';
            }
            return 'R1';
        case 'R2':
            return 'R3';
        case 'T':
            if (is_fleet_speed_slow(speed)) {
                return 'G1';
            }
            if (BBCVs >= 3) {
                return 'G1';
            }
            if (CL === 0) {
                return 'G1';
            }
            return 'W';
        case 'X':
            if (
                count_Yamato_class(fleet) === 0 &&
                CL >= 2 &&
                Ds >= 4 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'Z';
            }
            return 'O';
        case 'Y':
            return 'Z';
        case 'A1':
            return option.A1 === 'A2'
                ? 'A2'
                : 'B';
        case 'F':
            return option.F === 'G'
                ? 'G'
                : 'H';
    }

    omission_of_conditions(node, sim_fleet);
}