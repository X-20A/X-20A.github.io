import { EquippedShip } from "../ship/EquippedShip"

export type FleetUnit = {
    unit_index: UnitIndex,
    ship: EquippedShip,
}

export type UnitIndex = 0|1|2|3|4|5|6

export function derive_fleet_unit(
    unit_index: number,
    ship: EquippedShip,
): FleetUnit {
    const unit: FleetUnit = {
        unit_index: unit_index as UnitIndex,
        ship,
    };

    return unit;
}

export function extract_ships_from_fleet_unit(
    units: FleetUnit[],
): EquippedShip[] {
    return units.map(unit => unit.ship);
}