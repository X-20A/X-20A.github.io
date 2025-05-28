import type { EquipDatas, EquipType } from "@/data/equip";
import type { Improvement } from "../models/types";
import CustomError from "@/errors/CustomError";

/**
 * 装備オブジェクトの型定義
 */
export type Equip = {
    /** 装備ID */
    readonly id: number;
    /** 改修値 */
    readonly implovement: Improvement;
    /** 種別ID */
    readonly type: EquipType;
    /** 索敵値 */
    readonly seek: number;
    /** 増設に設定された装備であるか */
    readonly is_ex: boolean;
}

/**
 * 装備オブジェクトを生成する
 * @param id 装備ID
 * @param implovement 改修値
 * @param ship_name 艦名
 * @param slot_index スロット番号
 * @param is_ex 増設かどうか
 * @returns Equipオブジェクト
 * @throws CustomError 未対応装備の場合
 */
export function createEquip(
    id: number,
    implovement: Improvement,
    ship_name: string,
    slot_index: number,
    is_ex: boolean,
    equip_datas: EquipDatas,
): Equip {
    const data = equip_datas[id];

    if (!data) {
        throw new CustomError(`${ship_name}の${slot_index + 1}番目の装備は未対応です`);
    }

    return {
        id,
        implovement,
        type: data[1],
        seek: data[0],
        is_ex
    };
}