import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_4_4: CalcFnNoCondition = (
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
            if (Ds > 1) {
                return 'A';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'B', rate: 0.5 },
            ];
        case 'B':
            if (BBCVs > 3) {
                return 'A';
            }
            if (CA > 0) {
                return [
                    { node: 'D', rate: 0.7 },
                    { node: 'F', rate: 0.3 },
                ];
            }
            return 'D';
        case 'E':
            if (BBs + CVH > 3) {
                return 'G';
            }
            if (CAs + CL > 0 && Ds > 1) {
                return 'I';
            }
            if (DE > 2) {
                return 'C';
            }
            if (DE > 1 && AO + AS > 0) {
                return 'C';
            }
            if (Ds > 1) {
                if (BBCVs > 3) {
                    return [
                        { node: 'G', rate: 0.8 },
                        { node: 'I', rate: 0.2 },
                    ];
                }
                if (BBCVs < 4) {
                    return [
                        { node: 'G', rate: 0.35 },
                        { node: 'I', rate: 0.65 },
                    ];
                } // BBCVsより例外なし
            }
            if (Ss > 3) {
                return 'G';
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'I', rate: 0.5 },
            ];
        case 'F':
            if (BBCVs > 2) {
                return 'H';
            }
            return 'I';
        case 'G': {
            return [
                { node: 'C', rate: 0.25 },
                { node: 'J', rate: 0.25 },
                { node: 'I', rate: 0.5 },
            ];
        }
        case 'I':
            if (Ds > 1) {
                if (
                    CVH === 2 ||
                    CAs === 2 ||
                    (CVH === 0 && CL > 0)
                ) {
                    return 'K';
                }
                return [
                    { node: 'H', rate: 0.25 },
                    { node: 'K', rate: 0.75 },
                ];
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}