import {
    ConditionSpec,
    EquipContext,
    EquipBonusSeek,
} from '../../types/equipBonus';
import { EquipId } from '../../types/equipId';
import { Equip, includes_equip_id } from '../../models/Equip';
import { includes_ship_name, includes_ship_type } from '../../models/ship/predicate';
import { includes_base_ship } from '../../models/fleet/AdoptFleet';
import EQUIP_BONUS_DATAS from '../../data/equipBonus';
import { ShipName } from '../../types/shipName';
import { BaseShipName } from '../../types/baseShipName';
import { NA, ST } from '../../data/ship';

const checker_fns: {
    [K in keyof ConditionSpec]: (val: Required<ConditionSpec>[K], ctx: EquipContext, ids: EquipId[]) => boolean
} = {
    name_in: (names, ctx) => includes_ship_name(names, ctx.ship_name),
    base_name_in: (base_names, ctx) => includes_base_ship(ctx.base_name, base_names),
    national_is: (national, ctx) => ctx.national === national,
    ship_type_in: (types, ctx) => includes_ship_type(types, ctx.ship_type),
    require_improvement_lv: (lv, ctx) => ctx.equip.improvement >= lv,
    is_one_time: (active, ctx, ids) => !active || !includes_equip_id(ids, ctx.equip.id),
};

/** 全ての条件が満たされているか判定 */
const condition_satisfied = (
    spec: ConditionSpec,
    ctx: EquipContext,
    evaluated_equip_ids: EquipId[],
): boolean => {
    const keys = Object.keys(spec) as (keyof ConditionSpec)[];

    return keys.every((key) => {
        const value = spec[key];
        const checker_fn = checker_fns[key];

        if (value === undefined || !checker_fn) return true;

        return (checker_fn as (v: typeof value, c: EquipContext, i: EquipId[]) => boolean)(
            value,
            ctx,
            evaluated_equip_ids
        );
    });
};

const extract_bonus_from_data = (
    ctx: EquipContext,
    evaluated_equip_ids: EquipId[],
): number => {
    const data = EQUIP_BONUS_DATAS[ctx.equip.name];
    if (!data) return 0;

    let bonus = 0;
    for (const rule of data.rules) {
        const matched =
            !rule.conditions || condition_satisfied(rule.conditions, ctx, evaluated_equip_ids);
        
        if (matched) bonus += rule.seek;
    }

    evaluated_equip_ids.push(ctx.equip.id);
    return bonus;
};

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
        total += extract_bonus_from_data({
            ship_name, base_name, ship_type, national, equip
        }, evaluated_equip_ids);
    }

    return total as EquipBonusSeek;
};

export default calc_equip_bonus;
