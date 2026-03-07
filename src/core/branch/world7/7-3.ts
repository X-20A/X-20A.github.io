import { includes_base_ship } from "../../../models/fleet/AdoptFleet";
import { is_fleet_speed_fast_or_more, is_fleet_speed_faster_or_more, is_fleet_speed_fastest, is_fleet_speed_slow } from "../../../logic/speed/predicate";
import { destructuring_assignment_helper, omission_of_conditions } from "../util";
import { CalcFnNoCondition, CalcFnWithCondition } from "..";

const calc_phase_1: CalcFnNoCondition = (
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
        case 'A':
            if (ships_length === 1) {
                return 'C';
            }
            if (CA === 0 || CVs > 0 || Ds === 0 || ships_length > 4) {
                return 'B';
            }
            if (
                includes_base_ship('羽黒', base_ship_names) &&
                includes_base_ship('神風', base_ship_names)
            ) {
                return 'C';
            }
            if (ships_length === 4) {
                if (CA > 1 || Ds < 2) {
                    return 'B';
                }
                if (CA + CL + Ds === ships_length) {
                    return 'C';
                }
                return 'B';
            }
            if (ships_length < 4) {
                if (CA + CL + Ds === ships_length) {
                    return 'C';
                }
                return 'B';
            }
            break; // ships_lengthより例外なし
        case 'C':
            if (BBCVs > 0 || Ds === 0 || ships_length > 4) {
                return 'D';
            }
            if (
                includes_base_ship('羽黒', base_ship_names) &&
                includes_base_ship('神風', base_ship_names)
            ) {
                if (CAs > 2) {
                    return 'D';
                }
                if (
                    includes_base_ship('足柄', base_ship_names) ||
                    includes_base_ship('妙高', base_ship_names)
                ) {
                    return 'E';
                }
                if (Ds < 2) {
                    return 'D';
                }
                return 'E';
            }
            if (ships_length === 4) {
                if (includes_base_ship('羽黒', base_ship_names) && Ds === 3) {
                    return 'E';
                }
                if (includes_base_ship('神風', base_ship_names) && Ds === 4) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length === 3) {
                if (CAs > 1 || Ds < 2) {
                    return 'D';
                }
                if (CA + Ds === ships_length) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length < 3) {
                return 'E';
            }
            break; // ships_lengthより例外なし
        case 'D':
            if (BBCVs > 0 || ships_length === 6 || CAs > 3 || CAV > 1) {
                return 'F';
            }
            return 'E';
    }

    omission_of_conditions(node, sim_fleet);
}

const calc_phase_2: CalcFnNoCondition = (
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
        case 'A':
            if (ships_length === 1) {
                return 'C';
            }
            if (CVs > 0) {
                return 'B';
            }
            if (AO === 1 && Ds > 2) {
                return 'C';
            }
            if (
                CA === 0 ||
                Ds === 0 ||
                (BBs > 0 && !includes_base_ship('羽黒', base_ship_names))
            ) {
                return 'B';
            }
            if (
                includes_base_ship('羽黒', base_ship_names) &&
                includes_base_ship('神風', base_ship_names)
            ) {
                return 'C';
            }
            if (ships_length > 4) {
                if (
                    !includes_base_ship('羽黒', base_ship_names) &&
                    is_fleet_speed_slow(speed)
                ) {
                    return 'B';
                }
                if (Ds < 3) {
                    return 'B';
                }
                return 'C';
            }
            if (ships_length === 4) {
                if (CA > 1 || Ds < 2) {
                    return 'B';
                }
                if (CA + CL + Ds === ships_length) {
                    return 'C';
                }
                return 'B';
            }
            if (ships_length < 4) {
                if (CA + CL + Ds === ships_length) {
                    return 'C';
                }
                return 'B';
            }
            break; // ships_lengthより例外なし
        case 'C':
            if (BBCVs > 0 || Ds === 0) {
                return 'D';
            }
            if (is_fleet_speed_fastest(speed)) {
                return 'I';
            }
            if (ships_length > 4) {
                if (is_fleet_speed_faster_or_more(speed) && CL + DD > 3) {
                    return 'I';
                }
                if (ships_length === 6) {
                    return 'D';
                }
                if (
                    includes_base_ship('羽黒', base_ship_names) &&
                    includes_base_ship('神風', base_ship_names)
                ) {
                    if (Ds < 2) {
                        return 'D';
                    }
                    if (CL > 0 || includes_base_ship('足柄', base_ship_names)) {
                        return 'I';
                    }
                    return 'D';
                }
                if (is_fleet_speed_fast_or_more(speed) && CA === 1 && CL === 1 && DD === 3) {
                    return 'I';
                }
                return 'D';
            }
            if (ships_length === 4) {
                if (
                    includes_base_ship('羽黒', base_ship_names) &&
                    includes_base_ship('神風', base_ship_names)
                ) {
                    if (CAs > 2) {
                        return 'D';
                    }
                    if (
                        includes_base_ship('足柄', base_ship_names) ||
                        includes_base_ship('妙高', base_ship_names)
                    ) {
                        return 'E';
                    }
                    if (Ds < 2) {
                        return 'D';
                    }
                    return 'E';
                }
                if (includes_base_ship('羽黒', base_ship_names) && Ds === 3) {
                    return 'E';
                }
                if (includes_base_ship('神風', base_ship_names) && Ds === 4) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length < 4) {
                if (CAs > 1 || Ds < 2) {
                    return 'D';
                }
                if (CA + Ds === ships_length) {
                    return 'E';
                }
                return 'D';
            }
            if (ships_length < 3) {
                return 'E';
            }
            break; // ships_lengthより例外なし
        case 'D':
            if (BBs > 2 || CVs > 2 || CAV > 2) {
                return 'F';
            }
            return 'G';
        case 'G':
            if (CA === 0 && Ds > 1 && (AO > 0 || AV > 1)) {
                return 'H';
            }
            if (Ss > 0) {
                return 'I';
            }
            if (BBCVs > 0) {
                return 'J';
            }
            if (
                includes_base_ship('羽黒', base_ship_names) &&
                includes_base_ship('神風', base_ship_names)
            ) {
                if (ships_length < 5) {
                    return 'P';
                }
                if (DD < 3) {
                    return 'J';
                }
                if (is_fleet_speed_faster_or_more(speed)) {
                    return 'P';
                }
                if (CAs > 2 || is_fleet_speed_slow(speed)) {
                    return 'J';
                }
                if (includes_base_ship('足柄', base_ship_names)) {
                    return 'P';
                }
                return 'K';
            }
            if (Ds < 3 || CAs > 2) {
                return 'J';
            }
            return 'I';
        case 'I':
            if (BBCVs > 0 || CAs > 2 || Ds === 0) {
                return 'J';
            }
            if (
                includes_base_ship('羽黒', base_ship_names) &&
                includes_base_ship('神風', base_ship_names)
            ) {
                if (Ds > 2) {
                    if (is_fleet_speed_faster_or_more(speed)) {
                        return 'J';
                    }
                    return 'M';
                }
                if (Ds === 2) {
                    if (is_fleet_speed_fastest(speed)) {
                        return 'M';
                    }
                    return 'L';
                }
                if (Ds === 1) { // Dsより例外なし
                    return 'L';
                }
            }
            if (is_fleet_speed_fastest(speed) && DD > 2) {
                return 'J';
            }
            if (
                (
                    includes_base_ship('羽黒', base_ship_names) ||
                    includes_base_ship('神風', base_ship_names)
                ) &&
                includes_base_ship('足柄', base_ship_names) &&
                Ds > 2
            ) {
                return 'M';
            }
            return 'L';
        case 'J':
            if (BBCVs > 0 || is_fleet_speed_slow(speed) || CAs > 3) {
                return 'M';
            }
            if (DD > 2) {
                if (
                    (
                        includes_base_ship('羽黒', base_ship_names) &&
                        includes_base_ship('足柄', base_ship_names)
                    ) ||
                    (
                        includes_base_ship('羽黒', base_ship_names) &&
                        includes_base_ship('神風', base_ship_names)
                    )
                ) {
                    return 'P';
                } else {
                    return 'M';
                }
            }
            if (DD === 2) {
                if (
                    includes_base_ship('羽黒', base_ship_names) &&
                    includes_base_ship('神風', base_ship_names) &&
                    includes_base_ship('足柄', base_ship_names)
                ) {
                    return 'P';
                } else {
                    return 'M';
                }
            }
            if (DD === 1) {
                return 'M';
            }
            return 'M'; // wikiに記載なし
        case 'M':
            if (CVH > 0 || BBCVs > 1 || Ss > 3) {
                return 'N';
            }
            if (SBB_count > 0 || AO > 0 || AV > 1) {
                return 'O';
            }
            return 'P';
    }

    omission_of_conditions(node, sim_fleet);
}

export const calc_7_3: CalcFnWithCondition = (
    node,
    sim_fleet,
    option,
) => {
    const {
        phase: phase_string,
    } = option;
    const phase = Number(phase_string);

    return phase === 1
        ? calc_phase_1(node, sim_fleet)
        : calc_phase_2(node, sim_fleet);
}