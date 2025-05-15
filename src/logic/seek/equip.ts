import { EquipType } from "@/data/equip";
import Equip from "@/models/Equip";

/**
 * 装備係数、改修を考慮した装備の索敵値を返す
 * @param equips 
 * @returns 
 */
export function calcEquipSeek(equips: Equip[]): number {
    let total = 0;
    for (let i = 0; i < equips.length; i++) {
        const equip = equips[i];
        if (equip.seek === 0) continue;

        const equip_coefficient = getEquipCoefficient(equip);
        const improvement_coefficient = getImprovementCoefficient(equip);

        total += (Math.sqrt(equip.implovement) * improvement_coefficient + equip.seek) * equip_coefficient;
    }
    return total;
}

/**
 * 装備の装備係数を返す
 * @param equip 
 * @returns 
 */
function getEquipCoefficient(equip: Equip): number {
    let equip_conefficient = 0.6;
    switch (equip.type) {
        case EquipType.TorpBomber: // 艦攻
            equip_conefficient = 0.8;
            break;
        case EquipType.CarrierScout: // 艦偵
            equip_conefficient = 1;
            break;
        case EquipType.SeaPlaneBomber: // 水爆
            equip_conefficient = 1.1;
            break;
        case EquipType.SeaPlane: // 水偵
            equip_conefficient = 1.2;
            break;
    }
    return equip_conefficient;
}

/**
 * 装備の改修係数を返す
 * @param equip 
 * @returns 
 */
function getImprovementCoefficient(equip: Equip): number {
    let implovment_coefficient = 0;
    switch (equip.type) { // 改修係数
        case EquipType.SeaPlaneBomber: // 水爆
            implovment_coefficient = 1.15;
            break;
        case EquipType.CarrierScout: // 艦偵
        case EquipType.FlyingBoat: // 大型飛行艇
        case EquipType.SeaPlane: // 水偵
            implovment_coefficient = 1.2;
            break;
        case EquipType.RadarS: // 小型電探
            implovment_coefficient = 1.25;
            break;
        case EquipType.RadarL: // 大型電探
            implovment_coefficient = 1.4;
            break;
    }
    return implovment_coefficient;
}