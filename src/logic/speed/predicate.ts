import { Sp } from "../../core/branch";

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