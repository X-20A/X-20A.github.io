import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_2_3: CalcFnNoCondition = (
    node,
    sim_fleet,
) => {
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
        case '1':
            if (Ss + AS === ships_length) {
                return 'C';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'C':
            return [
                { node: 'D', rate: 0.6 },
                { node: 'F', rate: 0.4 },
            ];
        case 'D':
            if (AV + AO > 0 && Ds > 1) {
                return 'G';
            }
            if (Ss > 1 && AS > 0) {
                return 'G';
            }
            if (Ss === ships_length) {
                return [
                    { node: 'F', rate: 0.35 },
                    { node: 'G', rate: 0.65 },
                ];
            }
            if (Ss > 0 && BBCVs > 0) {
                return [
                    { node: 'F', rate: 0.65 },
                    { node: 'G', rate: 0.35 },
                ];
            }
            if (Ds > 3) {
                return [
                    { node: 'F', rate: 0.25 },
                    { node: 'G', rate: 0.75 },
                ];
            }
            if (Ds === 3) {
                return [
                    { node: 'F', rate: 0.35 },
                    { node: 'G', rate: 0.65 },
                ];
            }
            if (Ds === 2) {
                return [
                    { node: 'F', rate: 0.5 },
                    { node: 'G', rate: 0.5 },
                ];
            }
            return [
                { node: 'F', rate: 0.65 },
                { node: 'G', rate: 0.35 },
            ];
        case 'F':
            if (CVs + CL + AV > 0) {
                return [
                    { node: 'G', rate: 0.1 },
                    { node: 'J', rate: 0.9 },
                ];
            }
            if (Ss > 1 && AS > 0) {
                return [
                    { node: 'G', rate: 0.8 },
                    { node: 'J', rate: 0.2 },
                ];
            }
            return [
                { node: 'G', rate: 0.25 },
                { node: 'H', rate: 0.35 },
                { node: 'J', rate: 0.40 },
            ];
        case 'G':
            if (Ss > 1 && AS > 0) {
                return [
                    { node: 'I', rate: 0.6 },
                    { node: 'K', rate: 0.4 },
                ];
            }
            if (Ss === ships_length) {
                return [
                    { node: 'I', rate: 0.55 },
                    { node: 'K', rate: 0.45 },
                ];
            }
            if (CL + Ds < 2) {
                return 'K';
            }
            if (AV + AO > 0 && Ds > 1) {
                return [
                    { node: 'I', rate: 0.65 },
                    { node: 'K', rate: 0.35 },
                ];
            }
            if (Ds > 2) {
                return [
                    { node: 'I', rate: 0.45 },
                    { node: 'K', rate: 0.55 },
                ];
            }
            if (Ds > 0) {
                return [
                    { node: 'I', rate: 0.35 },
                    { node: 'K', rate: 0.65 },
                ];
            }
            if (Ds === 0) {
                return 'K';
            }
            break; // Dsより例外なし
        case 'J':
            if (CL > 0 && DD > 3) {
                return 'N';
            }
            if (CL === 1 && CA === 5) {
                return 'N';
            }
            if (Ss === ships_length) {
                return [
                    { node: 'M', rate: 0.1 },
                    { node: 'N', rate: 0.9 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'L', rate: 0.45 },
                    { node: 'M', rate: 0.1 },
                    { node: 'N', rate: 0.45 },
                ];
            }
            if (BBCVs > 5) {
                return 'L';
            }
            if (BBCVs === 5) {
                return [
                    { node: 'L', rate: 0.85 },
                    { node: 'N', rate: 0.15 },
                ];
            }
            if (BBCVs === 4) {
                return [
                    { node: 'L', rate: 0.25 },
                    { node: 'N', rate: 0.75 },
                ];
            }
            if (BBCVs === 3) {
                return [
                    { node: 'L', rate: 0.2 },
                    { node: 'N', rate: 0.8 },
                ];
            }
            if (BBCVs < 3) {
                return [
                    { node: 'L', rate: 0.1 },
                    { node: 'N', rate: 0.9 },
                ];
            }
            break; // BBCVsより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}