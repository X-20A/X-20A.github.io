import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_2_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        speed,
        seek,
        drum_carrier_count: drum,
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

    switch (node) {
        case null:
            return '1';
        case '1':
            if (Ss > 3) {
                return 'B';
            }
            if (Ss > 0 && BBs < 4 && (CVs > 0 || AV > 1)) {
                return [
                    { node: 'B', rate: 0.5 },
                    { node: 'C', rate: 0.5 },
                ];
            }
            if (CVs > 0 || AV > 1) {
                return 'C';
            }
            if (drum > 1 || Ds > 3) {
                return 'B';
            }
            if (CL > 0 && Ds > 2) {
                return 'B';
            }
            if (BBs > 0) {
                return 'C';
            }
            if (CL + CLT > 0 && CAV > 1) {
                return 'C';
            }
            if (CL + CLT > 0 && CAV > 0 && CAV + CL + CLT > 4) {
                return 'C';
            }
            if (f_length === 6) {
                return [
                    { node: 'B', rate: 0.8 },
                    { node: 'C', rate: 0.2 },
                ];
            }
            return [
                { node: 'B', rate: 0.05 },
                { node: 'C', rate: 0.95 },
            ];
        case 'B':
            if (Ss > 2) {
                return 'A';
            }
            return 'F';
        case 'C':
            if (CVs > 2 || BBs > 2) {
                return 'D';
            }
            if (CL > 0 && DD > 1) {
                return 'E';
            }
            if (CAV > 1 && DD > 1) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.3 },
                { node: 'E', rate: 0.7 },
            ];
        case 'E':
            if (BBs > 0) {
                return 'G';
            }
            if (CL > 0 && Ds > 3) {
                return 'I';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'G';
            }
            if (CVH + CAs > 1) {
                return 'G';
            }
             if (CL > 0 && DD > 2) {
                return 'I';
            }
            return 'G';
        case 'F':
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (DD > 2) {
                return 'E';
            }
            if (CL > 0 && DD > 1) {
                return 'E';
            }
            return [
                { node: 'E', rate: 0.35 },
                { node: 'J', rate: 0.65 },
            ];
        case 'G':
            if (BBCVs < 2 && Ds > 3) {
                return 'I';
            }
            if (BBCVs === 0 && CL > 0 && DD > 2) {
                return 'I';
            }
            if (seek[0] < 37) {
                return 'K';
            }
            if (seek[0] < 41 && seek[0] >= 37) {
                return [
                    { node: 'K', rate: 0.5 },
                    { node: 'L', rate: 0.5 },
                ];
            }
            return 'L'; // f_seek[0] >= 41
        case 'I':
            if (seek[0] < 31) {
                return 'H';
            }
            if (seek[0] < 34 && seek[0] >= 31) {
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            return 'O'; // f_seek[0] >= 31
        case 'J':
            if (seek[0] < 42) {
                return 'H';
            }
            if (seek[0] < 49 && seek[0] >= 42) {
                if (BBCVs > 3) {
                    return [
                        { node: 'H', rate: 0.333 },
                        { node: 'M', rate: 0.333 },
                        { node: 'O', rate: 0.334 },
                    ];
                }
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (BBCVs > 3) {
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (seek[0] >= 49) {
                return 'O';
            }
            break; // 索敵値より例外なし
        case 'L':
            if (CL > 0 && DD > 1) {
                return 'O';
            }
            if (BBCVs === 0) {
                return [
                    { node: 'N', rate: 0.4 },
                    { node: 'O', rate: 0.6 },
                ];
            }
            return [
                { node: 'N', rate: 0.6 },
                { node: 'O', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}