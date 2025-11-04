import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";

export function calc_4_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
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
        case '1':
            switch (Ds) {
                case 0:
                    return [
                        { node: 'A', rate: 0.1 },
                        { node: 'B', rate: 0.9 },
                    ];
                case 1:
                    return [
                        { node: 'A', rate: 0.2 },
                        { node: 'B', rate: 0.8 },
                    ];
                case 2:
                    if (CVH > 1) {
                        return [
                            { node: 'A', rate: 0.55 },
                            { node: 'B', rate: 0.45 },
                        ];
                    }
                    if (CVs > 1) {
                        return [
                            { node: 'A', rate: 0.6 },
                            { node: 'B', rate: 0.4 },
                        ];
                    }
                    if (CVs === 1) {
                        return [
                            { node: 'A', rate: 0.65 },
                            { node: 'B', rate: 0.35 },
                        ];
                    }
                    if (CVs === 0) {
                        return [
                            { node: 'A', rate: 0.725 },
                            { node: 'B', rate: 0.275 },
                        ];
                    } // CVsより例外なし
                    break;
                case 3:
                    if (CVs > 1) {
                        return [
                            { node: 'A', rate: 0.725 },
                            { node: 'B', rate: 0.275 },
                        ];
                    }
                    if (CVs < 2) {
                        return [
                            { node: 'A', rate: 0.775 },
                            { node: 'B', rate: 0.225 },
                        ];
                    } // CVsより例外なし
                    break;
                case 4:
                    return [
                        { node: 'A', rate: 0.85 },
                        { node: 'B', rate: 0.15 },
                    ];
            } // 5以上は連合の条件漏れを防ぐために外に出す
            return [
                { node: 'A', rate: 0.9 },
                { node: 'B', rate: 0.1 },
            ];
        case 'A':
            if (Ds < 2) {
                return 'E';
            }
            if (Ss > 0) {
                return [
                    { node: 'C', rate: 0.5 },
                    { node: 'E', rate: 0.5 },
                ];
            }
            if (Ds > 3) {
                return 'C';
            }
            if (CL > 0 && Ds > 2) {
                return 'C';
            }
            if (Ds === 3) {
                return [
                    { node: 'C', rate: 0.85 },
                    { node: 'E', rate: 0.15 },
                ];
            }
            if (CL > 0 && Ds === 2) {
                return [
                    { node: 'C', rate: 0.85 },
                    { node: 'E', rate: 0.15 },
                ];
            }
            return [
                { node: 'C', rate: 0.55 },
                { node: 'E', rate: 0.45 },
            ];
        case 'C':
            if (Ds < 2 || BBCVs > 3) {
                return 'G';
            }
            if (BBCVs === 3) {
                if (CL === 0) {
                    return [
                        { node: 'G', rate: 0.85 },
                        { node: 'L', rate: 0.15 },
                    ];
                }
                return [
                    { node: 'G', rate: 0.65 },
                    { node: 'L', rate: 0.35 },
                ];
            }
            if (CL > 0 || Ds > 3) {
                return 'L';
            }
            return [
                { node: 'G', rate: 0.65 },
                { node: 'L', rate: 0.35 },
            ];
        case 'D':
            if (BBCVs === 6) {
                return 'H';
            }
            if (BBCVs < 3) {
                if (Ds > 1) {
                    return 'C';
                }
                return [
                    { node: 'C', rate: 0.4 },
                    { node: 'H', rate: 0.6 },
                ];
            }
            if (Ds < 2) {
                return [
                    { node: 'C', rate: 0.15 },
                    { node: 'H', rate: 0.85 },
                ];
            }
            if (BBs === 4) {
                return [
                    { node: 'C', rate: 0.3 },
                    { node: 'H', rate: 0.7 },
                ];
            }
            return [
                { node: 'C', rate: 0.5 },
                { node: 'H', rate: 0.5 },
            ];
        case 'G':
            if (Ds > 2) {
                return 'L';
            }
            if (Ds === 2) {
                if (CL + CAV + AV > 0) {
                    return 'L';
                }
                if (BBs === 4) {
                    return 'L';
                }
                return [
                    { node: 'F', rate: 0.35 },
                    { node: 'L', rate: 0.65 },
                ];
            }
            if (Ss > 0) {
                return [
                    { node: 'F', rate: 0.5 },
                    { node: 'I', rate: 0.25 },
                    { node: 'L', rate: 0.25 },
                ];
            }
            if (BBCVs > 4) {
                return [
                    { node: 'F', rate: 0.25 },
                    { node: 'I', rate: 0.5 },
                    { node: 'L', rate: 0.25 },
                ];
            }
            if (BBCVs < 2) {
                return [
                    { node: 'F', rate: 0.15 },
                    { node: 'L', rate: 0.85 },
                ];
            }
            return [
                { node: 'F', rate: 0.4 },
                { node: 'L', rate: 0.6 },
            ];
        case 'H':
            if (DD > 1) {
                return 'G';
            }
            if (Ds > 1) {
                return [
                    { node: 'G', rate: 0.8 },
                    { node: 'K', rate: 0.2 },
                ];
            }
            if (BBCVs > 4) {
                return [
                    { node: 'G', rate: 0.2 },
                    { node: 'K', rate: 0.8 },
                ];
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}