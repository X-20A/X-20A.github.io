import { CalcFnNoCondition } from "..";
import { is_fleet_speed_fast_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";

export const calc_4_3: CalcFnNoCondition = (
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
        case '1': // nullがヤな感じ 多分こういうことだろうという
            if (CVH >= 1) {
                return 'C';
            }
            if (
                Ds >= 4 &&
                (
                    is_fleet_speed_fast_or_more(speed) ||
                    BBs + CVL === 0
                )
            ) {
                return 'D';
            }
            if (Ds >= 3 && CL >= 1) {
                return 'D';
            }
            if (Ds >= 2 && CL + AO >= 1) {
                return 'A';
            }
            return [
                { node: 'A', rate: 0.5 },
                { node: 'C', rate: 0.5 },
            ];
        case 'A':
            if (AV + AO + BBV >= 1) {
                return 'B';
            }
            if (CA >= 2 && Ds >= 2) {
                return 'D';
            }
            if (CVL >= 1) {
                return 'B';
            }
            return [
                { node: 'B', rate: 0.5 },
                { node: 'D', rate: 0.5 },
            ];
        case 'B':
            if (Ds <= 1 || BBs + CVL >= 3) {
                return 'E';
            }
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'G';
            }
            return [
                { node: 'E', rate: 0.65 },
                { node: 'G', rate: 0.35 },
            ];
        case 'C':
            if (BBCVs >= 4) {
                return 'F';
            }
            if (Ss === 0 && CL === 1 && Ds >= 2) {
                return 'D';
            }
            return [
                { node: 'D', rate: 0.2 },
                { node: 'F', rate: 0.8 },
            ];
        case 'F':
            if (Ss >= 1 || DD === 0 || CVs === 0) {
                return 'K';
            }
            if (
                is_fleet_speed_fast_or_more(speed) &&
                BBCVs <= 2 &&
                DD >= 2
            ) {
                return 'H';
            }
            return [
                { node: 'H', rate: 0.3 },
                { node: 'K', rate: 0.7 },
            ];
        case 'G':
            if (CVL === 0) {
                return 'J';
            }
            return [
                { node: 'H', rate: 0.65 },
                { node: 'I', rate: 0.35 },
            ];
        case 'H':
            if (CVs === 2) {
                return [
                    { node: 'I', rate: 0.1 },
                    { node: 'N', rate: 0.9 },
                ];
            }
            if (CVs === 0 && CA === 2) {
                return [
                    { node: 'I', rate: 0.2 },
                    { node: 'N', rate: 0.8 },
                ];
            }
            return [
                { node: 'I', rate: 0.3 },
                { node: 'N', rate: 0.7 },
            ];
        case 'K':
            if (
                Ss >= 1 ||
                (CVs >= 3 || CVs === 0) ||
                Ds <= 1
            ) {
                return 'L';
            }
            if (CVH === 1 && AV + CVL === 1) {
                return [
                    { node: 'L', rate: 0.55 },
                    { node: 'N', rate: 0.45 },
                ];
            }
            if (CVs === 2) {
                return [
                    { node: 'L', rate: 0.675 },
                    { node: 'N', rate: 0.325 },
                ];
            }
            if (CVs === 1) {
                return [
                    { node: 'L', rate: 0.85 },
                    { node: 'N', rate: 0.15 },
                ];
            }
            break; // CVsより例外なし
        case 'L':
            if (CL + Ds === 0 || BBCVs >= 5 || CVs === 0) {
                return 'M';
            }
            if (CA >= 2) {
                return 'N';
            }
            if (Ss >= 1) {
                return [
                    { node: 'M', rate: 0.5 },
                    { node: 'N', rate: 0.5 },
                ];
            }
            if (BBCVs <= 2) {
                return 'N';
            }
            return [
                { node: 'M', rate: 0.5 },
                { node: 'N', rate: 0.5 },
            ];
    }

    omission_of_conditions(node, sim_fleet);
}