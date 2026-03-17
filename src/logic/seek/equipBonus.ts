import {
    ConditionSpec,
    EquipContext,
    EquipBonusSeek,
} from '../../types/equipBonus';
import { EquipId } from '../../types/equipId';
import { ShipName } from '../../types/shipName';
import { BaseShipName } from '../../types/baseShipName';
import { NA, ST } from '../../data/ship';
import { Equip, includes_equip_id } from '../../models/Equip';
import { includes_ship_name, includes_ship_type } from '../../models/ship/predicate';
import { includes_base_ship } from '../../models/fleet/AdoptFleet';
import EQUIP_BONUS_DATAS from '../../data/equipBonus';

/** 指定条件がコンテキストに対して満たされているか判定する (単純実装) */
const condition_satisfied = (
    cond: ConditionSpec,
    ctx: EquipContext,
    evaluated_equip_ids: EquipId[],
): boolean => {
    switch (cond.type) {
        case 'name_in':
            return includes_ship_name(cond.names, ctx.ship_name);
        case 'base_name_in':
            return includes_base_ship(ctx.base_name, cond.base_names);
        case 'national_is':
            return ctx.national === cond.national;
        case 'ship_type_in':
            return includes_ship_type(cond.types, ctx.ship_type);
        case 'require_improvement_lv':
            return ctx.equip.improvement >= cond.lv;
        case 'equip_id_not_duplicated':
            return !includes_equip_id(evaluated_equip_ids, ctx.equip.id);
        default:
            return false;
    }
};

/** 1装備に対してルールを適用して得られるボーナスを計算する */
const extract_bonus_from_data = (
    ctx: EquipContext,
    evaluated_equip_ids: EquipId[],
): number => {
    let bonus = 0;
    for (const data of EQUIP_BONUS_DATAS) {
        if (data.equip_name !== ctx.equip.name) continue;

        const rules = data.rules ?? [];
        for (const rule of rules) {
            const conditions = rule.conditions ?? [];
            const matched = conditions.every(
                condition => condition_satisfied(condition, ctx, evaluated_equip_ids)
            );
            if (!matched) continue;

            bonus += rule.seek;
        }
        evaluated_equip_ids.push(ctx.equip.id);
    }
    return bonus;
};

/** ルールセットを与え、艦と装備群から合計装備ボーナスを算出する */
export const calc_equip_bonus = (
    ship_name: ShipName,
    base_name: BaseShipName,
    ship_type: ST,
    national: NA,
    equips: Equip[],
): EquipBonusSeek => {
    const evaluated_equip_ids: EquipId[] = [];
    let total = 0;

    for (const equip of equips) {
        const ctx: EquipContext = {
            ship_name,
            base_name,
            ship_type,
            national,
            equip,
        };

        total += extract_bonus_from_data(ctx, evaluated_equip_ids);
    }

    return total as EquipBonusSeek;
};

export default calc_equip_bonus;
