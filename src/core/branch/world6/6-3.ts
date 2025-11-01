import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_6_3(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
    option: Record<string, string>,
): BranchResponse[] | string {
    const {
        adopt_fleet: fleet,
    } = sim_fleet;

    const {
        seek,
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
        case 'A':
            return option.A === 'B'
                ? 'B'
                : 'C';
        case 'E':
            if (AV < 2) {
                if (CL < 2 && DD > 2) {
                    return 'G';
                }
                if (CL < 3) {
                    return [
                        { node: 'F', rate: 0.6 },
                        { node: 'G', rate: 0.4 },
                    ];
                }
                return 'F';
            }
            return 'F';
        case 'H':
            if (seek[2] < 36) {
                return 'I';
            }
            if (seek[2] < 38 && seek[2] >= 36) {
                return [
                    { node: 'I', rate: 0.5 },
                    { node: 'J', rate: 0.5 },
                ];
            }
            if (seek[2] >= 38) {
                return 'J';
            }
            break; // LoSより例外なし
    }

    omission_of_conditions(node, sim_fleet);
}