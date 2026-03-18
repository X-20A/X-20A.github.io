import { NA, ST } from "../data/ship";
import { Equip } from "../models/Equip";
import { Brand, Improvement } from ".";
import { BaseShipName } from "./baseShipName";
import { EquipName } from "./equipName";
import { ShipName } from "./shipName";

export type EquipBonusSeek = Brand<number, 'EquipBonusSeek'>;

export type EquipContext = {
    ship_name: ShipName,
    base_name: BaseShipName,
    ship_type: ST,
    national: NA,
    equip: Equip,
}

export type ConditionSpec = Partial<{
    name_in: ShipName[];
    base_name_in: BaseShipName[];
    national_is: NA;
    ship_type_in: ST[];
    require_improvement_lv: Improvement;
    is_one_time: true,
}>;

type EquipBonusData = {
    rules: {
        conditions?: ConditionSpec,
        seek: number,
    }[],
}

export type EquipBonusDatas = Partial<Record<EquipName, EquipBonusData>>
