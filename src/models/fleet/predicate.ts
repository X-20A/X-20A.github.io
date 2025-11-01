/**
 * 艦隊種別ID    
 * デッキビルダーに合わせて0オリジン
 */
export const enum Ft { // 遊撃部隊は隻数から判定する
    /** 通常艦隊 */
    single = 0,
    /** 空母機動部隊 */
    carrier = 1,
    /** 水上打撃部隊 */
    surface = 2,
    /** 輸送護衛部隊 */
    transport = 3,
}

export function is_fleet_combined(
    fleet_type: Ft,
): boolean {
    return fleet_type !== Ft.single;
}

export function is_fleet_surface(
    fleet_type: Ft,
): boolean {
    return fleet_type === Ft.surface;
}

export function is_fleet_carrier(
    fleet_type: Ft,
): boolean {
    return fleet_type === Ft.carrier;
}

export function is_fleet_transport(
    fleet_type: Ft,
): boolean {
    return fleet_type === Ft.transport;
}

export function is_fleet_normal(
    fleet_type: Ft,
    ships_length: number,
): boolean {
    return !is_fleet_combined(fleet_type) && ships_length <= 6;
}

export function is_fleet_striking(
    fleet_type: Ft,
    ships_length: number,
): boolean {
    return !is_fleet_combined(fleet_type) && ships_length === 7;
}