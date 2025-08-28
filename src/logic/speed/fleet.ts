import type { EquippedShip } from "../../models/ship/EquippedShip";
import type { Sp as Speed } from "@/core/branch";

/**
 * 艦隊速度を判定し、速度IDを返す
 * @returns 
 */
export function calc_fleet_speed(ships: EquippedShip[]): Speed {
    let speed_id = 1 as Speed;
    if (ships.every(ship => ship.speed === 4)) {
        speed_id = 4;
    } else if (ships.every(ship => ship.speed >= 3)) {
        speed_id = 3;
    } else if (ships.every(ship => ship.speed >= 2)) {
        speed_id = 2;
    }

    return speed_id;
}