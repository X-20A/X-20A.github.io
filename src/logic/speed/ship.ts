import { SG as SpeedGroup } from '@/data/ship';
import Equip from '@/models/Equip';
import { Sp as Speed } from '@/core/Sim';

/**
 * 装備と速力グループから速度IDを判定して返す
 * @param equips 
 * @param speed_group 
 * @returns 
 */
export function calcShipSpeed(equips: Equip[], speed_group: SpeedGroup): Speed {
    let turbine = 0; // タービン
    let kan = 0; // 強化缶
    let new_kan = 0; // 新型缶
    let power_kan = 0; // 新型缶☆7↑

    equips.forEach(item => {
        if (item.id === 33) turbine++;
        if (item.id === 34) kan++;
        if (item.id === 87) {
            new_kan++;
            if (item.implovement >= 7) power_kan++;
        }
    });

    const kan_total = kan + new_kan;

    let speed: Speed;
    switch (speed_group) {
        case SpeedGroup.HighA:
            speed = 2;
            if (turbine && new_kan || power_kan > 1) {
                speed = 4;
            } else if (turbine && kan_total || power_kan) {
                speed = 3;
            }
            break;
        case SpeedGroup.HighB1:
            speed = 2;
            if (turbine && new_kan && kan_total > 1) {
                speed = 4;
            } else if (turbine && kan_total) {
                speed = 3;
            }
            break;
        case SpeedGroup.HighB2:
            speed = 2;
            if (turbine && (new_kan > 1 || kan_total > 2)) {
                speed = 4;
            } else if (turbine && kan_total) {
                speed = 3;
            }
            break;
        case SpeedGroup.HighC:
            speed = 2;
            if (turbine && kan_total) {
                speed = 3;
            }
            break;
        case SpeedGroup.LowA:
            speed = 1;
            if (turbine && new_kan && kan_total > 2) {
                speed = 4;
            } else if (turbine && power_kan > 1) {
                speed = 4;
            } else if (turbine && new_kan && kan_total > 1) {
                speed = 3;
            } else if (turbine && power_kan) {
                speed = 3;
            } else if (turbine && kan_total) {
                speed = 2;
            }
            break;
        case SpeedGroup.LowB:
            speed = 1;
            if (turbine && (new_kan > 1 || kan_total > 2)) {
                speed = 3;
            } else if (turbine && kan_total) {
                speed = 2;
            }
            break;
        case SpeedGroup.LowC:
            speed = 1;
            if (turbine && kan_total) {
                speed = 2;
            }
            break;
        case SpeedGroup.LowD:
            speed = 1;
            if (turbine && new_kan) {
                speed = 3;
            } else if (new_kan || turbine && kan_total) {
                speed = 2;
            }
            break;
        case SpeedGroup.LowE:
            speed = 1;
            if (turbine && new_kan && kan_total > 1) {
                speed = 4;
            } else if (turbine && new_kan) {
                speed = 3;
            } else if (turbine && kan_total) {
                speed = 2;
            } else if (new_kan) {
                speed = 2;
            }
            break;
        case SpeedGroup.LowB2:
            speed = 1;
            if (turbine && (new_kan > 1 || kan_total > 2)) {
                speed = 3;
            } else if (turbine) {
                speed = 2;
            }
            break;
    }
    return speed;
}