import { count_ship, count_Taiyo_class, include_ship_names } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_faster_or_more } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { CalcFnWithCondition } from "..";

export const calc_7_4: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
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
            if (BB + CVH + Ss > 0 || CAs > 1 || CLE + CLT > 1) {
                return 'C';
            }
            if (
                include_ship_names(fleet, 'あきつ丸') &&
                DE >= 2 &&
                (DD > 0 || DE > 3)
            ) {
                return 'A';
            }
            if (BBV + CVL + count_ship(fleet, 'あきつ丸') > 2) {
                return 'C';
            }
            if (Ds > 2 || DE > 1) {
                return 'A';
            }
            return 'C';
        case 'C':
            if (
                BB + CVH + Ss > 0 ||
                CVL + count_ship(fleet, 'あきつ丸') > 2
            ) {
                return 'D';
            }
            if (
                Ds > 3 ||
                (CT > 0 && Ds > 2) ||
                DE > 2 ||
                (is_fleet_speed_faster_or_more(speed) && DD > 1)
            ) {
                return 'E';
            }
            return 'D';
        case 'E':
            if (
                AO + LHA > 0 && DE > 3 &&
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
                        CT > 0 &&
                        DE > 2 &&
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
                        CT > 0 &&
                        DE > 2 &&
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
                (SBB_count > 0 && CVH > 0)
                || (BBs - SBB_count > 1)
                || (BBV > 1)
                || (CVL + count_ship(fleet, 'あきつ丸') > 1)
                || (BBs - SBB_count + BBV + CVL + count_ship(fleet, 'あきつ丸') > 2)
                || (Ds < 2);
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