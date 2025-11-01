import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { countShip, countTaiyo, isInclude } from "../../../models/fleet/AdoptFleet";

export function calc_7_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        is_faster: isFaster,
        seek,
        SBB_count,
    } = fleet;

    const track = sim_fleet.route;

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
            if (BB + CVH + Ss > 0 || CAs > 1 || CLE + CLT > 1) {
                return 'C';
            }
            if (isInclude(fleet, 'あきつ丸') && DE >= 2 && (DD > 0 || DE > 3)) {
                return 'A';
            }
            if (BBV + CVL + countShip(fleet, 'あきつ丸') > 2) {
                return 'C';
            }
            if (Ds > 2 || DE > 1) {
                return 'A';
            }
            return 'C';
        case 'C':
            if (BB + CVH + Ss > 0 || CVL + countShip(fleet, 'あきつ丸') > 2) {
                return 'D';
            }
            if (Ds > 3 || (CT > 0 && Ds > 2) || DE > 2 || (isFaster && DD > 1)) {
                return 'E';
            }
            return 'D';
        case 'E':
            if (AO + LHA > 0 && DE > 3 && countTaiyo(fleet) + AO + LHA + DD + DE === 6) {
                return 'G';
            }
            return 'J';
        case 'F':
            return option.F === 'H'
                ? 'H'
                : 'J';
        case 'G': // 索敵で分岐するようだが不明 とりあえず素通りで実装
            return 'L';
        case 'J': // ややこひ～
            if (track.includes('D')) {
                return 'K';
            }
            if (track.includes('E')) {
                if (seek[3] < 33) {
                    return 'K';
                }
                if (seek[3] < 37 && seek[3] >= 33) {
                    if (CT > 0 && DE > 2 && countTaiyo(fleet) + CT + Ds === 5 && f_length === 5) {
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
                if (seek[3] >= 37) {
                    if (CT > 0 && DE > 2 && countTaiyo(fleet) + CT + Ds === 5 && f_length === 5) {
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
                || (CVL + countShip(fleet, 'あきつ丸') > 1)
                || (BBs - SBB_count + BBV + CVL + countShip(fleet, 'あきつ丸') > 2)
                || (Ds < 2);
            if (seek[3] < 45) {
                return 'N';
            }
            if (flag && seek[3] < 47 && seek[3] >= 45) {
                return [
                    { node: 'N', rate: 0.5 },
                    { node: 'O', rate: 0.5 },
                ];
            }
            if (flag && seek[3] >= 47) {
                return 'O';
            }
            return 'P';
        }
    }

    omission_of_conditions(node, sim_fleet);
}