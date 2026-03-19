import { count_ships_by_base_names, count_Taiyo_class, includes_base_ship } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_faster_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { CalcFnWithCondition } from "..";

export const calc_7_4: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
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
        case '1':
            if (BB + CVH + Ss >= 1 || CAs >= 2 || CLE + CLT >= 2) {
                return 'C';
            }
            if (
                includes_base_ship('あきつ丸', base_ship_names) &&
                DE >= 2 &&
                (DD >= 1 || DE >= 4)
            ) {
                return 'A';
            }
            if (
                BBV
                + CVL
                + count_ships_by_base_names(['あきつ丸'], fleet.base_ship_names)
                >= 3
            ) {
                return 'C';
            }
            if (Ds >= 3 || DE >= 2) {
                return 'A';
            }
            return 'C';
        case 'C':
            if (
                BB + CVH + Ss >= 1 ||
                CVL + count_ships_by_base_names(['あきつ丸'], fleet.base_ship_names) >= 3
            ) {
                return 'D';
            }
            if (
                Ds >= 4 ||
                (CT >= 1 && Ds >= 3) ||
                DE >= 3 ||
                (is_fleet_speed_faster_or_more(speed) && DD >= 2)
            ) {
                return 'E';
            }
            return 'D';
        case 'E':
            if (
                AO + LHA >= 1 && DE >= 4 &&
                count_Taiyo_class(fleet) + AO + LHA + DD + DE === 6
            ) {
                return 'G';
            }
            return 'J';
        case 'F':
            return option.F;
        case 'G': // 索敵で分岐するようだが不明 とりあえず素通りで実装
            return 'L';
        case 'J': // ややこひ～
            if (route.includes('D')) {
                return 'K';
            }
            if (route.includes('E')) {
                if (seek.c4 < 33) {
                    return 'K';
                }
                if (seek.c4 < 37 && seek.c4 >= 33) {
                    if (
                        CT >= 1 &&
                        DE >= 3 &&
                        count_Taiyo_class(fleet) + CT + Ds === 5 &&
                        ships_length === 5
                    ) {
                        return [
                            { node: 'K', rate: 0.5 },
                            { node: 'P', rate: 0.5 },
                        ];
                    }
                    return [
                        { node: 'K', rate: 0.5 },
                        { node: 'L', rate: 0.5 },
                    ];
                }
                if (seek.c4 >= 37) {
                    if (
                        CT >= 1 &&
                        DE >= 3 &&
                        count_Taiyo_class(fleet) + CT + Ds === 5 &&
                        ships_length === 5
                    ) {
                        return 'P';
                    }
                    return 'L';
                } // LoSより例外なし
            } // DかEどっちかは通る
            break;
        case 'K': // KtoPは見つかってないらしい 全てMへ
            return 'M';
        case 'M': { // 🤮
            const flag =
                (SBB_count >= 1 && CVH >= 1)
                || (BBs - SBB_count >= 2)
                || (BBV >= 2)
                || (CVL + count_ships_by_base_names(['あきつ丸'], fleet.base_ship_names) >= 2)
                || (BBs - SBB_count + BBV + CVL + count_ships_by_base_names(['あきつ丸'], base_ship_names) >= 3)
                || (Ds <= 1);
            if (seek.c4 < 45) {
                return 'N';
            }
            if (flag && seek.c4 < 47 && seek.c4 >= 45) {
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (flag && seek.c4 >= 47) {
                return 'O';
            }
            return 'P';
        }
    }

    omission_of_conditions(node, sim_fleet);
}