import { CalcFnNoCondition } from "..";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_3_3: CalcFnNoCondition = (
    node,
    sim_fleet,
) => {
    const {
        fleet, ship_names, base_ship_names, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    switch (node) {
        case null:
            return '1';
        case 'A':
            if (CVH >= 1 || BBs + CVL >= 4) {
                return 'C';
            }
            if (BBs + CVL === 1 && CL === 1 && DD === 4) {
                return 'C';
            }
            return 'B';
        case 'B':
            if (Ss >= 1) {
                return [
                    { node: 'D', rate: 0.5 },
                    { node: 'F', rate: 0.5 },
                ];
            }
            if (BBs + CVL <= 1) {
                return 'F';
            }
            if (BBs + CVL <= 2 && DD >= 2) {
                return 'F';
            }
            return [
                { node: 'D', rate: 0.5 },
                { node: 'F', rate: 0.5 },
            ];
        case 'C':
            if (Ds <= 1 || CVH >= 2 || BBCVs >= 3) {
                return 'E';
            }
            if (BBCVs === 2) {
                return 'G';
            }
            if (BBCVs === 1 && CL === 1 && DD === 4) {
                return 'G';
            }
            return 'E';
        case 'F':
            if (DD <= 1 || BBs >= 3) {
                return 'G';
            }
            if (Ss >= 1) {
                return [
                    { node: 'H', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (CL + CAV + AV >= 1) {
                return 'J';
            }
            return [
                { node: 'H', rate: 0.5 },
                { node: 'J', rate: 0.5 },
            ];
        case 'G':
            if (Ss >= 1) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBCVs <= 3) {
                return 'M';
            }
            if (BBCVs === 4) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBCVs === 5) {
                return [
                    { node: 'I', rate: 0.65 },
                    { node: 'M', rate: 0.35 },
                ];
            }
            if (BBCVs >= 6) {
                return [
                    { node: 'I', rate: 0.85 },
                    { node: 'M', rate: 0.15 },
                ];
            }
            break; // BBCVsより例外なし
        case 'J':
            if (DD >= 5) {
                return 'M';
            }
            if (CL === 1 && DD >= 4) {
                return 'M';
            }
            return 'K';
        case 'K':
            if (Ss >= 1) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            if (BBs + CVL <= 1) {
                return 'M';
            }
            if (BBs + CVL === 2) {
                return [
                    { node: 'L', rate: 0.25 },
                    { node: 'M', rate: 0.75 },
                ];
            }
            if (BBs + CVL === 3) {
                return [
                    { node: 'L', rate: 0.5 },
                    { node: 'M', rate: 0.5 },
                ];
            }
            break; // Aで BBs + CVL >= 4 はCへ行く
    }

    omission_of_conditions(node, sim_fleet);
}