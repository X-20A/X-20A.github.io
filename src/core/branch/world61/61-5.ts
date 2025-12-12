import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { destructuring_assignment_helper, omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { is_fleet_carrier, is_fleet_combined, is_fleet_striking, is_fleet_surface } from "../../../models/fleet/predicate";
import { AdoptFleet, count_Yamato_class } from "../../../models/fleet/AdoptFleet";
import { EquippedShip } from "../../../models/ship/EquippedShip";
import { includes_ship_name, is_CVs } from "../../../models/ship/predicate";
import { ShipName } from "../../../types/shipName";

const TARGET_SHIP_NAMES: ShipName[] = [
    '伊勢改二', '日向改二',
    'あきつ丸改',
    '熊野丸', '熊野丸改',
    '山汐丸', '山汐丸改',
    'しまね丸', 'しまね丸改',
] as const;

const is_target_carrier = (
    ship: EquippedShip,
): boolean => {
    const {
        type,
        name,
    } = ship;
    return (
        is_CVs(type) ||
        includes_ship_name(TARGET_SHIP_NAMES, name)
    );
}

/**
 * 全ての対象艦が寒甲を所持しているか判定して返す
 * @param fleet 
 * @returns 
 */
const every_carriers_has_rench = (
    fleet: AdoptFleet,
): boolean => {
    return fleet.fleets.every(component => {
        const { units } = component;
        return units.every(unit => {
            const { ship } = unit;
            return !is_target_carrier(ship) ||
                ship.has_arctic_gear;
        })
    })
}

export function calc_61_5(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        fleet, fleet_type, ships_length, speed, seek, route,
        drum_carrier_count, craft_carrier_count, radar_carrier_count,
        arBulge_carrier_count, SBB_count,
        BB, BBV, CV, CVL, CA, CAV, CL, CLT, CT, DD, DE,
        AV, AO, LHA, AS, BBs, CVH, CVs, BBCVs, CAs, CLE, Ds, Ss,
    } = destructuring_assignment_helper(sim_fleet);

    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    switch (node) {
        case null:
            if (!is_fleet_combined(fleet_type)) {
                if (
                    phase >= 2 &&
                    is_fleet_striking(fleet_type, ships_length) &&
                    every_carriers_has_rench(fleet)
                ) {
                    return '2';
                }
                return '1';
            }
            // 連合艦隊
            if (phase === 6 && is_fleet_carrier(fleet_type)) {
                return '3';
            }
            return '1';
        case '1':
            if (!is_fleet_combined(fleet_type)) {
                return 'A';
            }
            if (count_Yamato_class(fleet) >= 1) {
                return 'A';
            }
            if (BBCVs >= 6) {
                return 'A';
            }
            if (BBs + CVH >= 5) {
                return 'A';
            }
            return 'A1';
        case '2':
            if (Ds <= 2) {
                return 'C';
            }
            if (is_fleet_speed_slow(speed)) {
                return 'J';
            }
            if (Ds === 3) {
                return 'C';
            }
            if (BBs + CVH >= 3) {
                return 'C';
            }
            return 'J';
        case '3':
            if (count_Yamato_class(fleet) >= 1) {
                return 'B2';
            }
            if (Ss >= 1) {
                return 'B2';
            }
            if (BBs + CVH >= 5) {
                return 'B2';
            }
            if (CVL >= 3) {
                return 'B2';
            }
            if (CL >= 2 && Ds >= 4) {
                return 'X1';
            }
            if (Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                return 'X1';
            }
            return 'B2';
        case 'A':
            if (!is_fleet_combined(fleet_type)) {
                return 'B';
            }
            if (count_Yamato_class(fleet) >= 2) {
                return 'B';
            }
            if (BBCVs >= 7) {
                return 'B';
            }
            if (BBs + CVH >= 6) {
                return 'B';
            }
            if (phase >= 4 && BBs + CVH <= 4) {
                return 'E'
            }
            return 'A1';
        case 'B':
            if (!is_fleet_combined(fleet_type)) {
                if (CL >= 2 && Ds >= 3 && is_fleet_speed_fast_or_more(speed)) {
                    return 'C';
                }
                return 'B1';
            }
            if (is_fleet_carrier(fleet_type)) {
                return 'B1';
            }
            // 水上打撃部隊
            return 'A1'; // 輸送護衛部隊はデータなし
        case 'B1':
            if (!is_fleet_combined(fleet_type)) {
                return 'C';
            }
            return 'B2';
        case 'B2':
            if (phase <= 4) {
                return 'F';
            }
            if (is_fleet_surface(fleet_type)) {
                return 'F';
            }
            if (count_Yamato_class(fleet) >= 2 && is_fleet_speed_slow(speed)) {
                return 'F';
            }
            return 'X1';
        case 'C':
            if (CVH >= 2) {
                return 'C1';
            }
            if (Ds <= 1) {
                return 'C1';
            }
            if (BBs >= 3) {
                return 'C2';
            }
            if (
                phase >= 3 &&
                Ds >= 3 &&
                is_fleet_speed_fast_or_more(speed)
            ) {
                return 'R';
            }
            if (CL >= 1) {
                return 'C2';
            }
            if (route.includes('2')) {
                return 'C2';
            }
            return 'C1';
        case 'C2':
            if (phase <= 2) {
                return 'D';
            }
            if (BBCVs >= 5) {
                return 'S';
            }
            if (Ds === 0) {
                return 'S';
            }
            return 'D';
        case 'D':
            if (seek.c4 >= 112) {
                return 'U';
            }
            return 'T';
        case 'E':
            if (CL === 1 && Ds <= 3) {
                return 'G';
            }
            return 'I';
        case 'F':
            if (route.includes('3')) {
                return 'X1';
            }
            if (BBs <= 2 && CAs >= 2 && Ds >= 4) {
                return 'H';
            }
            return 'G';
        case 'G':
            if (route.includes('E')) {
                return 'I';
            }
            return 'H';
        case 'I':
            if (phase <= 3) {
                return 'Q';
            }
            if (AV >= 1 && is_fleet_speed_slow(speed)) {
                return 'Q';
            }
            if (BBs >= 5) {
                return 'V';
            }
            if (BBs >= 4 && is_fleet_speed_slow(speed)) {
                return 'V';
            }
            if (CVH >= 1) {
                return 'V';
            }
            return 'W';
        case 'J':
            if (is_fleet_speed_slow(speed)) {
                return 'K';
            }
            // 処理の都合で高速+から
            if (is_fleet_speed_faster_or_more(speed)) {
                if (Ds >= 6) {
                    return 'N';
                }
                return 'M';
            }
            // 高速艦隊
            if (BBs + CVH >= 1) {
                return 'K';
            }
            return 'M';
        case 'K':
            if (is_fleet_speed_fast_or_more(speed)) {
                return 'M';
            }
            if (CL + CT >= 1) {
                return 'M';
            }
            if (DE >= 2) {
                return 'M';
            }
            return 'L';
        case 'N':
            if (seek.c4 >= 108) {
                return 'P';
            }
            return 'O';
        case 'R':
            if (count_Yamato_class(fleet) >= 1) {
                return 'S';
            }
            if (BBs >= 2) {
                return 'S';
            }
            if (CL === 0) {
                return 'S';
            }
            return 'D';
        case 'W':
            if (seek.c2 >= 85) {
                return 'X';
            }
            return 'T';
        case 'Z':
            if (is_fleet_surface(fleet_type)) {
                return 'ZZ';
            }
            if (
                count_Yamato_class(fleet) >= 2 &&
                is_fleet_speed_slow(speed)
            ) {
                return 'Z2';
            }
            if (
                count_Yamato_class(fleet) >= 2 &&
                Ds === 2
            ) {
                return 'Z2';
            }
            return 'ZZ';
        case 'A2':
            return option.A2 === 'B2'
                ? 'B2'
                : 'E';
    }

    omission_of_conditions(node, sim_fleet);
}