import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";
import { is_fleet_speed_fast_or_more, is_fleet_speed_slow } from "../../../logic/speed/predicate";

export function calc_60_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        fleet_length: f_length,
        fleet_type: f_type,
        is_union: isUnion,
        speed,
        is_faster: isFaster,
        seek,
        drum_carrier_count: drum,
        radar_carrier_count: radar,
        // radar5_carrier_count: radar5,
        craft_carrier_count: craft,
        arBulge_carrier_count: arBulge,
        SBB_count,
        yamato_class_count: yamato,
        matsu_count: matsu,
        daigo_count: daigo,
        reigo_count: reigo,
    } = fleet;

    const track = sim_fleet.route;

    const {
        phase,
        is_third,
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
            if (phase === '1') {
                return '1';
            }
            if ((!isUnion && f_length === 7) || is_third === '1') {
                return '2';
            }
            if (BB > 0) {
                return '2';
            }
            if (BBV > 2) {
                return '2';
            }
            if (CVH > 0) {
                return '1';
            }
            if (CVL > 1) {
                return '2';
            }
            return '1';
        case '2':
            if (isFaster) {
                return 'F';
            }
            if (CLE > 0 && Ds > 2 && BBCVs < 3) {
                return 'F';
            }
            return 'B1';
        case 'B':
            if (CLE > 0 && Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'B2';
            }
            if (CLE > 0 && Ds > 1 && BBCVs === 0) {
                return 'B2';
            }
            return 'B1';
        case 'B1':
            if (track.includes('1')) {
                return 'B2';
            }
            if (BBCVs > 3) {
                return 'B2';
            }
            return 'F'; // track.includes('2')
        case 'B2':
            if (is_fleet_speed_slow(speed)) {
                if (DE > 1) {
                    return 'C1';
                }
                if (BBs + CAs + CLT > 0) {
                    return 'C';
                }
                return 'C1';
            }
            // f_speed !== Sp.s1
            if (BBCVs > 1) {
                return 'C1';
            }
            if (Ds > 2) {
                return 'C1';
            }
            if (Ds === 2 && BBCVs === 1) {
                return 'C1';
            }
            if (Ds === 2 && f_length < 6) {
                return 'C1';
            }
            if (CL + Ds > 2 && f_length === 5) {
                return 'C1';
            }
            if (f_length < 5) {
                return 'C1';
            }
            return 'C';
        case 'C':
            if (Number(phase) < 3) {
                return 'G';
            }
            if (BBs === 0 && CVs < 2 && CLE > 0 && Ds > 2 && is_fleet_speed_fast_or_more(speed)) {
                return 'I';
            }
            return 'G';
        case 'C1':
            if (Number(phase) < 3) {
                return 'C2';
            }
            if (Ss > 0) {
                return 'C2';
            }
            if (DE > 1) {
                return 'C2';
            }
            return 'K';
        case 'D':
            if (f_length === 6) {
                return 'D1';
            }
            if (Ss > 0) {
                return 'D1';
            }
            if (BBCVs + CAs > 2) {
                return 'D1';
            }
            if (Ds < 2) {
                return 'D1';
            }
            if (DE > 2) {
                return 'D3';
            }
            if (CL + CVL === 1 && Ds === 3 && f_length === 4) {
                return 'D3';
            }
            if (CL === 1 && Ds === 4 && is_fleet_speed_fast_or_more(speed)) {
                return 'D3';
            }
            if (CVs === 1 && DD === 2 && DE === 2) {
                return 'D3';
            }
            return 'D2';
        case 'G':
            if (isFaster) {
                return 'M';
            }
            if (CL > 0 && Ds > 1 && BBs < 2) {
                return 'M';
            }
            if (CL > 0 && Ds > 1 && is_fleet_speed_fast_or_more(speed)) {
                return 'M';
            }
            return 'K';
        case 'K':
            if (CA > 1 && CL > 0 && DD > 1) {
                return 'M';
            }
            return 'L';
        case 'M':
            if (seek[3] >= 62) {
                return 'O';
            }
            return 'N';
        case 'A':
            if (option.A === 'B') {
                return 'B';
            }
            return 'D';
    }

    omission_of_conditions(node, sim_fleet);
}