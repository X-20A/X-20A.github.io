import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";

export function calc_1_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        speed,
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
            if (Ds === 4 && f_length < 6) {
                return 'A';
            }
            if (f_length > 5) {
                return [
                    { node: 'A', rate: 0.4 },
                    { node: 'B', rate: 0.6 },
                ];
            }
            if (f_length === 5) {
                return [
                    { node: 'A', rate: 0.5 },
                    { node: 'B', rate: 0.5 },
                ];
            }
            if (f_length === 4) {
                return [
                    { node: 'A', rate: 0.6 },
                    { node: 'B', rate: 0.4 },
                ];
            }
            return [ // f_length < 4
                { node: 'A', rate: 0.7 },
                { node: 'B', rate: 0.3 },
            ];
        case 'A':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'E';
            }
            if (Ds < 4) {
                return 'D';
            }
            if (Ds === 6) {
                return 'E';
            }
            if (CLE === 1 && Ds === 5) {
                return 'E';
            }
            if (CL === 1 && DD > 3) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.35 },
                { node: 'E', rate: 0.65 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
} 