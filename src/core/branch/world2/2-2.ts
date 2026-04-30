import { CalcFnNoCondition } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_2_2: CalcFnNoCondition = (
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
        case 'C':
            if (CVs >= 3) {
                return 'B';
            }
            if (AO >= 1 && Ss === 0) {
                return 'B';
            }
            if (BBV >= 2) {
                return 'B';
            }
            // 明らかに処理方式と噛み合ってない 同じようなのが出てくるようなら何か考える
            if (BBV === 1) {
                if (CLE >= 1 && Ds >= 4) {
                    if (AV + AS >= 1) {
                        return [
                            { node: 'B', rate: 0.7 },
                            { node: 'E', rate: 0.3 },
                        ];
                    }
                    return [
                        { node: 'B', rate: 0.7 },
                        { node: 'E', rate: 0.18 },
                        { node: 'D', rate: 0.12 },
                    ];
                } else {
                    if (AV + AS >= 1) {
                        return [
                            { node: 'B', rate: 0.7 },
                            { node: 'E', rate: 0.3 },
                        ];
                    }
                    return [
                        { node: 'B', rate: 0.7 },
                        { node: 'D', rate: 0.3 },
                    ];
                }
            }
            if (BBV === 0) {
                if (CLE >= 1 && Ds >= 4) {
                    if (AV + AS >= 1) {
                        return 'E';
                    }
                    return [
                        { node: 'E', rate: 0.8 },
                        { node: 'D', rate: 0.2 },
                    ];
                } else {
                    if (AV + AS >= 1) {
                        return 'E';
                    }
                    return [
                        { node: 'E', rate: 0.5 },
                        { node: 'D', rate: 0.5 },
                    ];
                }
            } // BBVより例外なし
        case 'E':
            if (BBCVs >= 4) {
                return 'G';
            }
            if (DE >= 2) {
                return 'F';
            }
            if (BBCVs === 3) {
                return [
                    { node: 'G', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (BBCVs === 2) {
                return [
                    { node: 'G', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (BBCVs === 1) {
                if (Ds >= 2) {
                    return [
                        { node: 'G', rate: 0.3 },
                        { node: 'K', rate: 0.7 },
                    ];
                }
                return [
                    { node: 'G', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (Ds >= 3 && AS === 1) {
                return 'F';
            }
            if (Ds >= 2 && CL >= 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'K';
            }
            if (Ds >= 2) {
                return [
                    { node: 'F', rate: 0.3 },
                    { node: 'K', rate: 0.7 },
                ];
            }
            return [
                { node: 'G', rate: 0.5 },
                { node: 'K', rate: 0.5 },
            ];
        case 'G':
            if (CVs >= 1) {
                return 'H';
            }
            if (DD === 0) {
                return 'H';
            }
            if (BBs >= 3) {
                return [
                    { node: 'H', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (BBs <= 2) {
                return [
                    { node: 'H', rate: 0.3 },
                    { node: 'K', rate: 0.7 },
                ];
            } // BBsより例外なし
        case 'H':
            if (BBCVs >= 4) {
                return [
                    { node: 'I', rate: 0.6 },
                    { node: 'K', rate: 0.4 },
                ];
            }
            if (CVs + AV + CAV >= 1) {
                return 'K';
            }
            if (Ss >= 1) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (Ds === 0) {
                return [
                    { node: 'I', rate: 0.7 },
                    { node: 'K', rate: 0.3 },
                ];
            }
            if (Ds === 1) {
                return [
                    { node: 'I', rate: 0.35 },
                    { node: 'J', rate: 0.15 },
                    { node: 'K', rate: 0.5 },
                ];
            }
            if (Ds >= 2) {
                return [
                    { node: 'J', rate: 0.5 },
                    { node: 'K', rate: 0.5 },
                ];
            } // Dsより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}