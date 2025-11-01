import { SimFleet } from "../../../models/fleet/SimFleet";
import { PreSailNull } from "../../../types/brand";
import { BranchResponse } from "../../../types";
import { omission_of_conditions } from "..";

export function calc_1_1(
    node: string | PreSailNull,
    sim_fleet: SimFleet,
): BranchResponse[] | string {
    const fleet = sim_fleet.adopt_fleet;
    const {
        fleet_length: f_length,
    } = fleet;

    switch (node) {
        case null:
            return '1';
        case 'A':
            if (f_length === 1) {
                return [
                    { node: 'B', rate: 0.2 },
                    { node: 'C', rate: 0.8 },
                ];
            }
            if (f_length === 2) {
                return [
                    { node: 'B', rate: 0.25 },
                    { node: 'C', rate: 0.75 },
                ];
            }
            if (f_length === 3) {
                return [
                    { node: 'B', rate: 0.3 },
                    { node: 'C', rate: 0.7 },
                ];
            }
            if (f_length === 4) {
                return [
                    { node: 'B', rate: 0.35 },
                    { node: 'C', rate: 0.65 },
                ];
            }
            if (f_length === 5) {
                return [
                    { node: 'B', rate: 0.4 },
                    { node: 'C', rate: 0.6 },
                ];
            }
            if (f_length >= 6) { // f_lengthより例外なし
                return [
                    { node: 'B', rate: 0.55 },
                    { node: 'C', rate: 0.45 },
                ];
            }
    }

    omission_of_conditions(node, sim_fleet);
}