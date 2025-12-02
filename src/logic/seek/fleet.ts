import type { FleetSeek } from '../../types';
import type { EquippedShip } from '../../models/ship/EquippedShip';

/**
 * 艦隊単位の索敵値を返す(連合艦隊は別)
 * @param ships 
 * @param command_lv 
 * @returns 
 */
export function calc_fleet_seek(ships: EquippedShip[], command_lv = 120): FleetSeek {
    const fleet_length_mod = 2 * (6 - ships.length);
    const command_mod = Math.ceil(command_lv * 0.4);
    
    let total_status_seek = 0;
    let total_equip_seek = 0;

    for (const ship of ships) {
        total_status_seek += ship.status_seek;
        total_equip_seek += ship.equip_seek;
    }

    const base_seek = total_status_seek + fleet_length_mod - command_mod;
    const fleet_seek: FleetSeek = {
        c1: base_seek + total_equip_seek * 1,
        c2: base_seek + total_equip_seek * 2,
        c3: base_seek + total_equip_seek * 3,
        c4: base_seek + total_equip_seek * 4,
    };

    return fleet_seek;
}

/**
 * seekオブジェクトの各プロパティを小数点以下2桁に丸める
 * @param seek 
 * @returns 
 */
export function round_seek(
    seek: FleetSeek,
): FleetSeek {
    return {
        c1: Math.floor(seek.c1 * 100) / 100,
        c2: Math.floor(seek.c2 * 100) / 100,
        c3: Math.floor(seek.c3 * 100) / 100,
        c4: Math.floor(seek.c4 * 100) / 100,
    };
}