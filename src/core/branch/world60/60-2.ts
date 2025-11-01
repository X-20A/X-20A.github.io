import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_transport } from "../../../models/fleet/predicate";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { countShip } from "../../../models/fleet/AdoptFleet";

export function calc_60_2(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_type: f_type,
        is_union: isUnion,
        speed,
        seek,
        daigo_count: daigo,
    } = fleet;

    const track = sim_fleet.route;

    const {
        phase,
    } = option;

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
            if (option.phase === '1') {
                return '1';
            }
            if (!isUnion) {
                return '1';
            }
            // isUnion
            return '2';
        case '2':
            if (is_fleet_transport(f_type)) {
                return 'L';
            }
            if (CL > 1 && Ds > 3) {
                return 'L';
            }
            if (CL > 1 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'L';
            }
            return 'H';
        case 'A':
            if (BBCVs > 3) {
                return 'A1';
            }
            if (CL > 0 && Ds > 1) {
                return 'A2';
            }
            if (BBs > 1) {
                return 'A1';
            }
            if (CVH > 0) {
                return 'A1';
            }
            if (Ds < 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'A1';
            }
            return 'A2';
        case 'C':
            if (countShip(fleet, '大泊') > 0) {
                return 'H';
            }
            if (CL > 0 && Ds > 1) {
                return 'H';
            }
            if (Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'H';
            }
            return 'G';
        case 'F':
            if (track.includes('D')) {
                return 'F2';
            }
            if (CVH > 0) {
                return 'F2';
            }
            return 'R';
        case 'H':
            if (track.includes('1')) {
                return 'I';
            }
            if (option.difficulty === '4' && daigo > 4) {
                return 'L';
            }
            if (option.difficulty === '3' && daigo > 2) {
                return 'L';
            }
            if (option.difficulty === '2' && daigo > 1) {
                return 'L';
            }
            if (option.difficulty === '1') {
                return 'L';
            }
            return 'M';
        case 'I':
            if (seek[3] >= 82) {
                return 'K';
            }
            return 'J';
        case 'M':
            if (BBs > 2) {
                return 'D';
            }
            if (BB > 1 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (CVH > 0 && is_fleet_speed_slow(speed)) {
                return 'D';
            }
            if (countShip(fleet, '大泊') + CA > 1 && CLE > 1 && Ds > 2) {
                return 'N';
            }
            return 'D';
        case 'P':
            if (is_fleet_transport(f_type)) {
                return 'R';
            }
            if (BB + CVH === 0 && BBV + CVL < 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'R';
            }
            return 'F';
        case 'Q':
            if (Number(phase) < 3) {
                return 'S';
            }
            if (BBs > 0 && CVH > 0) {
                return 'S';
            }
            if (CVs > 1) {
                return 'S';
            }
            if (countShip(fleet, '大泊') > 0) {
                return 'V';
            }
            if (CL < 3 && is_fleet_speed_slow(speed)) {
                return 'S';
            }
            if (Ds > 5) {
                return 'V';
            }
            if (daigo > 7) {
                return 'V';
            }
            if (countShip(fleet, ['那智', '足柄']) + CLE === 5) {
                return 'V';
            }
            if (
                countShip(fleet, ['那智', '足柄']) === 2
                && countShip(fleet, ['阿武隈', '多摩', '木曾']) === 2
                && countShip(fleet, ['霞', '不知火', '薄雲', '曙', '初霜', '初春', '若葉'])
                + (fleet.ship_names.find(ship_name => ['潮', '潮改', '潮改二'].includes(ship_name)) ? 1 : 0)
                > 1
                && DD === 5
            ) {
                return 'V';
            }
            return 'S';
        case 'V1':
            if (seek[1] >= 68) {
                return 'W';
            }
            return 'V2';
        case 'B':
            if (option.B === 'C') {
                return 'C';
            }
            return 'D';
        case 'E':
            if (option.E === 'F') {
                return 'F';
            }
            return 'F1';
        case 'N':
            if (option.N === 'O') {
                return 'O';
            }
            return 'P';
    }

    omission_of_conditions(node, sim_fleet);
}