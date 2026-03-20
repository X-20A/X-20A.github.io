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

export type FleetFixture = {
    main_fleet_ships: ShipFixture[];
    escort_fleet_ships?: ShipFixture[];
}

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