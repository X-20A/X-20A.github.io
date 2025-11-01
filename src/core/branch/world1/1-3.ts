import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";

export function calc_1_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
        SBB_count,
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
            if (AO + AV > 0) {
                return 'A';
            }
            if (CVs > 0) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'A':
            if (AO > 0) {
                return 'D';
            }
            if (DE > 3) {
                return 'D';
            }
            if (AV > 0 || Ds > 3) {
                return [
                    { node: 'D', rate: 0.8 },
                    { node: 'E', rate: 0.2 },
                ];
            }
            if (Ss > 0) {
                return 'E';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'E', rate: 0.5 },
            ];
        case 'F':
            if (CVH > 0) {
                return 'H';
            }
            if (SBB_count > 0) {
                return 'H';
            }
            if (CAV > 0 && DD > 1) {
                return 'J';
            }
            if (DD > 3) {
                return 'J';
            }
            if (CLE > 0 && Ds > 3) {
                return 'J';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return [
                    { node: 'H', rate: 0.4 },
                    { node: 'J', rate: 0.6 },
                ];
            }
            return [
                { node: 'H', rate: 0.6 },
                { node: 'J', rate: 0.4 },
            ];
        case 'H':
            if (AO > 0) {
                return 'G';
            }
            if (AV + CAV > 0) {
                return 'J';
            }
            if (CLE > 0 && DD > 1) {
                return 'J';
            }
            if (DD > 1) {
                return [
                    { node: 'G', rate: 0.4 },
                    { node: 'I', rate: 0.2 },
                    { node: 'J', rate: 0.4 },
                ];
            }
            return [
                { node: 'I', rate: 0.6 },
                { node: 'J', rate: 0.4 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}