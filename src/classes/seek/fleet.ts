import { Seek } from '@/classes/types';
import Ship from '../Ship';

export function calcFleetSeek(ships: Ship[], command_lv = 120): Seek {
    const fleet_length_mod = 2 * (6 - ships.length);
    const command_mod = Math.ceil(command_lv * 0.4);
    
    let total_status_seek = 0;
    let total_equip_seek = 0;

    for (const ship of ships) {
        total_status_seek += ship.status_seek;
        total_equip_seek += ship.equip_seek;
    }

    const base_seek = total_status_seek + fleet_length_mod - command_mod;
    const fleet_seek: number[] = [];

    for (let i = 1; i < 5; i++) {
        fleet_seek[i - 1] = base_seek + total_equip_seek * i;
    }

    return fleet_seek as Seek;
}