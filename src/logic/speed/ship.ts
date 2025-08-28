import { SG as SpeedGroup } from '@/data/ship';
import { Sp as Speed } from '@/core/branch';
import type { Equip } from '@/models/Equip';

type PreInfo = {
    /** 改良型艦本式タービン 装備フラグ */
    readonly has_turbine: boolean,
    /** 強化型艦本式缶 装備数 */
    readonly nomal_kan_count: number,
    /** 新型高温高圧缶 装備数 */
    readonly new_kan_count: number,
    /** 新型高温高圧缶☆7↑ 装備数 */
    readonly power_kan_count: number,
}
const INITIAL: PreInfo = {
    has_turbine: false,
    nomal_kan_count: 0,
    new_kan_count: 0,
    power_kan_count: 0,
} as const;

const calc_pre_info = (
    equips: Equip[],
): PreInfo => {
    return equips.reduce((acc, item) => {
        if (item.id === 33) {
            return { ...acc, has_turbine: true };
        } else if (item.id === 34) {
            return { ...acc, nomal_kan_count: acc.nomal_kan_count + 1 };
        } else if (item.id === 87) {
            return {
                ...acc,
                new_kan_count: acc.new_kan_count + 1,
                power_kan_count: acc.power_kan_count + (item.improvement >= 7 ? 1 : 0)
            };
        }
        return acc;
    }, { ...INITIAL });
}

/**
 * 装備と速力グループから速度IDを判定して返す
 * @param equips 
 * @param speed_group 
 * @returns 
 */
export function calc_ship_speed(
    equips: Equip[],
    speed_group: SpeedGroup,
): Speed {
    const {
        has_turbine,
        nomal_kan_count,
        new_kan_count,
        power_kan_count
    } = calc_pre_info(equips);

    const total_kan_count = nomal_kan_count + new_kan_count;

    switch (speed_group) {
        case SpeedGroup.FastA:
            if (
                (has_turbine && new_kan_count)
                || (has_turbine && total_kan_count >= 2)
                || (new_kan_count >= 2)
            ) return Speed.fastest;

            if (
                (has_turbine && total_kan_count)
                || power_kan_count
            ) return Speed.faster;

            return Speed.fast;
        case SpeedGroup.FastB1:
            if (has_turbine && new_kan_count && total_kan_count >= 2) {
                return Speed.fastest;
            }
            if (has_turbine && total_kan_count) {
                return Speed.faster;
            }

            return Speed.fast;
        case SpeedGroup.FastB2:
            if (has_turbine && (new_kan_count >= 2 || total_kan_count >= 3)) {
                return Speed.fastest;
            }
            if (has_turbine && total_kan_count) {
                return Speed.faster;
            }

            return Speed.fast;
        case SpeedGroup.FastC:
            if (has_turbine && total_kan_count) {
                return Speed.faster;
            }

            return Speed.fast;
        case SpeedGroup.SlowA:
            if (has_turbine && new_kan_count && total_kan_count >= 3) {
                return Speed.fastest;
            }
            if (has_turbine && power_kan_count >= 2) {
                return Speed.fastest;
            }
            if (has_turbine && new_kan_count && total_kan_count >= 2) {
                return Speed.faster;
            }
            if (has_turbine && power_kan_count) {
                return Speed.faster;
            }
            if (has_turbine && total_kan_count) {
                return Speed.fast;
            }

            return Speed.slow;
        case SpeedGroup.SlowB:
            if (has_turbine && (new_kan_count >= 2 || total_kan_count >= 3)) {
                return Speed.faster;
            }
            if (has_turbine && total_kan_count) {
                return Speed.fast;
            }

            return Speed.slow;
        case SpeedGroup.SlowB2:
            if (has_turbine && (new_kan_count >= 2 || total_kan_count >= 3)) {
                return Speed.faster;
            }
            if (has_turbine) {
                return Speed.fast;
            }

            return Speed.slow;
        case SpeedGroup.SlowC:
            if (has_turbine && total_kan_count) {
                return Speed.fast;
            }

            return Speed.slow;
        case SpeedGroup.SlowD:
            if (
                (has_turbine && new_kan_count)
                || (has_turbine && nomal_kan_count >= 3)
            ) {
                return Speed.faster;
            }
            if (new_kan_count || (has_turbine && total_kan_count)) {
                return Speed.fast;
            }

            return Speed.slow;
        case SpeedGroup.SlowE:
            if (has_turbine && new_kan_count && nomal_kan_count >= 2) {
                return Speed.fastest;
            }
            if (has_turbine && new_kan_count >= 2) {
                return Speed.fastest;
            }
            if (has_turbine && new_kan_count) {
                return Speed.faster;
            }
            if (has_turbine && total_kan_count) {
                return Speed.fast;
            }
            if (new_kan_count) {
                return Speed.fast;
            }

            return Speed.slow;
    }
}