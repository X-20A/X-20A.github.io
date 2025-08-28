import type { EquipType } from "@/data/equip";
import type { Improvement } from "@/types";
import CustomError from "@/errors/CustomError";
import EQUIP_DATAS from "@/data/equip";
import { EquipId } from "@/types/equipId";

/**
 * 装備オブジェクトの型定義
 */
export type Equip = {
    /** 装備ID */
    readonly id: EquipId;
    /** 改修値 */
    readonly improvement: Improvement;
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
export function derive_equip(
    id: number,
    implovement: Improvement,
    is_ex: boolean,
): Equip {
    const equip_id = id as EquipId;
    const data = EQUIP_DATAS[equip_id];

    if (!data) {
        throw new CustomError(`id: ${id}の装備は未対応です`);
    }

    const equip: Equip = {
        id: equip_id,
        improvement: implovement,
        type: data[1],
        seek: data[0],
        is_ex
    };

    return equip;
}