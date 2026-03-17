import { NA, ST } from "../data/ship";
import { Equip } from "../models/Equip";
import { Brand, Improvement } from ".";
import { BaseShipName } from "./baseShipName";
import { EquipName } from "./equipName";
import { ShipName } from "./shipName";

/** 装備ボーナスのブランド型 */
export type EquipBonusSeek = Brand<number, 'EquipBonusSeek'>;

/** ルールを適用する際の評価対象コンテキスト */
export type EquipContext = {
    ship_name: ShipName,
    base_name: BaseShipName,
    ship_type: ST,
    national: NA,
    equip: Equip,
}

/** 単純な条件仕様 (データ駆動形式) */
export type ConditionSpec =
    | { type: 'name_in'; names: ShipName[] }
    | { type: 'base_name_in'; base_names: BaseShipName[] }
    | { type: 'national_is'; national: NA }
    | { type: 'ship_type_in'; types: ST[] }
    | { type: 'require_improvement_lv'; lv: Improvement }
    | { type: 'equip_id_not_duplicated' }

/** 装備ボーナスルール */
export type EquipBonusData = {
    equip_name: EquipName,
    rules: ({
        conditions?: ConditionSpec[],
        seek: number,
    })[],
}
