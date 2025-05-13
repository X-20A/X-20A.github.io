import Ship from "../Ship";
import { Sp as Speed } from "../Sim";

/**
 * 艦隊速度を判定し、速度IDを返す
 * @returns 
 */
export function calcFleetSpeed(ships: Ship[]): Speed {
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