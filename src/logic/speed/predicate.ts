/** 艦隊速度ID */
export const enum Sp {
    /** 低速 */
    slow = 1,
    /** 高速 */
    fast = 2,
    /** 高速+ */
    faster = 3,
    /** 最速 */
    fastest = 4,
}

/**
 * 低速艦隊であるか判定して返す
 * @param speed_group 
 * @returns 
 */
export function is_fleet_speed_slow(
    speed_group: Sp,
): boolean {
    return speed_group === Sp.slow;
}

/**
 * 高速艦隊以上であるか判定して返す
 * @param speed_group 
 * @returns 
 */
export function is_fleet_speed_fast_or_more(
    speed_group: Sp,
): boolean {
    return speed_group >= Sp.fast;
}

/**
 * 高速+艦隊以上であるか判定して返す
 * @param speed_group 
 * @returns 
 */
export function is_fleet_speed_faster_or_more(
    speed_group: Sp,
): boolean {
    return speed_group >= Sp.faster;
}

/**
 * 最速艦隊であるか判定して返す
 * @param speed_group 
 * @returns 
 */
export function is_fleet_speed_fastest(
    speed_group: Sp,
): boolean {
    return speed_group === Sp.fastest;
}