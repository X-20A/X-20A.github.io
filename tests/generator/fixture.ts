import EQUIP_DATAS from "../../src/data/equip";
import SHIP_DATAS from "../../src/data/ship";
import { derive_equip, Equip } from "../../src/models/Equip";
import { derive_equipped_ship, EquippedShip } from "../../src/models/ship/EquippedShip";
import { derive_naked_ship } from "../../src/models/ship/NakedShip";
import { Improvement } from "../../src/types";
import { ShipLv } from "../../src/types/brand";
import { EquipId } from "../../src/types/equipId";
import { EquipName } from "../../src/types/equipName";
import { ShipName } from "../../src/types/shipName";
import { AdoptFleet, derive_adopt_fleet } from "../../src/models/fleet/AdoptFleet";
import { derive_fleet_component } from "../../src/models/fleet/FleetComponent";
import { derive_fleet_unit } from "../../src/models/fleet/FleetUnit";
import { Ft } from "../../src/models/fleet/predicate";

export function find_equip_id_from_name(
    name: EquipName,
): number {
    const data = Object.entries(EQUIP_DATAS)
        .find(([, data]) => data.name === name);
    if (!data) throw new Error(`指定された名前の装備は存在しません: ${name}`);

    return Number(data[0]) as EquipId;
}

/**
 * 艦名から艦娘IDを返す
 * @param name 
 * @returns 
 */
export function find_ship_id_from_name(
    name: ShipName,
): number {
    const data = Object.entries(SHIP_DATAS)
        .find(([, data]) => data.name === name);
    if (!data) throw new Error(`指定された名前の艦は存在しません: ${name}`);

    return Number(data[0]);
}

export type EquipFixture = {
    name: EquipName,
    improvement_lv?: Improvement,
}

export type ShipFixture = {
    name: ShipName;
    lv?: number,
    equips?: EquipFixture[];
    ex_equip?: EquipFixture;
}

export type SingleFleetFixture = {
    main_fleet_ships: ShipFixture[];
    escort_fleet_ships?: never;
    fleet_type?: never;
}
export type CombinedFleetFixture = {
    main_fleet_ships: ShipFixture[];
    escort_fleet_ships: ShipFixture[];
    fleet_type: Ft;
}

export type FleetFixture = SingleFleetFixture | CombinedFleetFixture

const is_combined_fleet_fixture = (
    fleet_fixture: FleetFixture,
): fleet_fixture is CombinedFleetFixture => 'fleet_type' in fleet_fixture;

export function build_equip_from_fixture(
    equip_fixture: EquipFixture,
): Equip {
    return derive_equip(
        find_equip_id_from_name(equip_fixture.name),
        (equip_fixture.improvement_lv ?? 0) as Improvement,
        false,
    );
}

/**
 * 艦Fixtureから EquippedShip を構築する
 * @param ship_fixture 
 * @returns 
 */
export function build_ship_from_fixture(
    ship_fixture: ShipFixture,
): EquippedShip {
    const equips = ship_fixture.equips
        ? ship_fixture.equips.map(equip_fixture => build_equip_from_fixture(equip_fixture))
        : [];
    const naked_ship = derive_naked_ship(
        (ship_fixture.lv ?? 99) as ShipLv,
        find_ship_id_from_name(ship_fixture.name),
    )
    return derive_equipped_ship(
        naked_ship,
        equips,
    );
};

const build_single_fleet = (
    fleet_fixture: SingleFleetFixture,
): AdoptFleet => {
    const main_ships =
        fleet_fixture.main_fleet_ships.map(build_ship_from_fixture);
    const main_units =
        main_ships.map((ship, index) => derive_fleet_unit(index, ship));
    const main_component = derive_fleet_component(main_units);

    return derive_adopt_fleet([main_component], Ft.single);
}

const build_combined_fleet = (
    fleet_fixture: CombinedFleetFixture,
): AdoptFleet => {
    const main_ships =
        fleet_fixture.main_fleet_ships.map(build_ship_from_fixture);
    const escort_ships =
        fleet_fixture.escort_fleet_ships.map(build_ship_from_fixture);

    const main_units =
        main_ships.map((ship, index) => derive_fleet_unit(index, ship));
    const escort_units =
        escort_ships.map((ship, index) => derive_fleet_unit(index, ship));

    const main_component = derive_fleet_component(main_units);
    const escort_component = derive_fleet_component(escort_units);

    return derive_adopt_fleet(
        [main_component, escort_component],
        fleet_fixture.fleet_type,
    );
}

/**
 * FleetFixtureから AdoptFleet を構築する
 * @param fleet_fixture 
 * @returns 
 */
export function build_fleet_from_fixture(
    fleet_fixture: FleetFixture,
): AdoptFleet {
    return is_combined_fleet_fixture(fleet_fixture)
        ? build_combined_fleet(fleet_fixture)
        : build_single_fleet(fleet_fixture);
}