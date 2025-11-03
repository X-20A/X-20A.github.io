import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined } from "../../../models/fleet/predicate";

export function calc_61_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
        seek,
        fleet_type,
        yamato_class_count,
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
            if (CVH <= 2 && CL >= 2 && Ds >= 3) {
                return 'N';
            }
            if (CVs <= 3 && Ds >= 3) {
                return 'N';
            }
            return 'R';
        case 'C':
            if (phase === 1) {
                return 'C1';
            }
            if (Ds <= 1) {
                return 'C1';
            }
            return 'T';
        case 'C1':
            if (phase >= 2 && CVH >= 1) {
                return 'P';
            }
            return 'C2';
        case 'G':
            if (CVH <= 1 && CL >= 2 && is_fleet_speed_fast_or_more(speed)) {
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
            if (CL >= 2 && Ds >= 5 && is_fleet_speed_fast_or_more(speed)) {
                return 'J';
            }
            return 'I';
        case 'I':
            return 'J';
        case 'K':
            return 'M';
        case 'N':
            if (phase <= 2) {
                return 'O';
            }
            if (CL >= 2) {
                return 'V';
            }
            return 'X';
        case 'O':
            if (phase <= 2) {
                return 'D';
            }
            if (yamato_class_count >= 2) {
                return 'Y';
            }
            if (Ds <= 2) {
                return 'Y';
            }
            return 'Z';
        case 'R':
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
            if (yamato_class_count === 0 && CL >= 2 && Ds >= 4 &&is_fleet_speed_fast_or_more(speed)) {
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