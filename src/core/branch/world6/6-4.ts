import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_flagship_CL, include_ship_names } from "../../../models/fleet/AdoptFleet";

export function calc_6_4(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        speed,
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
            if (LHA + CVs > 0) {
                return '2';
            }
            if (!include_ship_names(fleet, '長門改二') && !include_ship_names(fleet, '陸奥改二') && BBs === 2) {
                return '2';
            }
            if (CAV > 2) {
                return '2';
            } 
            if (is_fleet_speed_fast_or_more(speed) &&
                ((is_flagship_CL(fleet) && DD === 3)
                    || DD > 3)) {
                return '1';
            }
            if (DD > 1) {
                return '1';
            }
            return '2';
        case '1':
            if (is_fleet_speed_fast_or_more(speed) &&
                ((is_flagship_CL(fleet) && DD === 3)
                    || DD > 3)) {
                return 'B';
            }
            if (DD > 1) {
                return 'A';
            }
            break; // これ以外は既に2へ行ってるので例外なし。でもちょっとヤだね
        case 'A':
            if (include_ship_names(fleet, '秋津洲') &&
                (CAV === 1
                    || CL > 0
                    || DD > 2)) {
                return 'D';
            }
            if (BBs > 0 || is_fleet_speed_slow(speed)) {
                return 'E';
            }
            if (is_flagship_CL(fleet) || DD > 2) {
                return 'D';
            }
            return 'E';
        case 'E':
            if (include_ship_names(fleet, '秋津洲') || include_ship_names(fleet, '如月')) {
                return 'D';
            }
            if (CAs < 2 && CL > 0 && is_fleet_speed_fast_or_more(speed)) {
                return 'D';
            }
            return 'G';
            break;
        case 'J':
            if (CL === 0 || DD < 2) {
                return 'L';
            }
            if (LHA > 0) {
                return 'N';
            }
            if (CVs === 2 && is_fleet_speed_slow(speed)) {
                return 'L';
            }
            if (CVs === 2 && BBs > 0) {
                return 'L';
            }
            return 'I';
        case 'K':
            if (BBs === 2 || BBs + CAs > 2) {
                return 'H';
            }
            if (DD > 1) {
                return 'J';
            }
            return 'H';
    }

    omission_of_conditions(node, sim_fleet);
}