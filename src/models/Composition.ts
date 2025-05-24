import { FleetComponent } from "@/core/FleetComponent";
import { ST as ShipType } from "@/data/ship";

/**
 * 艦種ごとの数を持つCompositionオブジェクト型
 */
export type Composition = {
    BB: number;
    BBV: number;
    CV: number;
    CVB: number;
    CVL: number;
    CA: number;
    CAV: number;
    CL: number;
    CLT: number;
    CT: number;
    DD: number;
    DE: number;
    SS: number;
    SSV: number;
    AV: number;
    AO: number;
    LHA: number;
    AS: number;
    AR: number;
};

/**
 * 艦隊構成情報オブジェクトを生成
 * @param fleets 艦隊配列
 * @returns 艦種ごとの数を持つCompositionオブジェクト
 */
export function createComposition(fleets: FleetComponent[]): Composition {
    const initial: Composition = {
        BB: 0,
        BBV: 0,
        CV: 0,
        CVB: 0,
        CVL: 0,
        CA: 0,
        CAV: 0,
        CL: 0,
        CLT: 0,
        CT: 0,
        DD: 0,
        DE: 0,
        SS: 0,
        SSV: 0,
        AV: 0,
        AO: 0,
        LHA: 0,
        AS: 0,
        AR: 0,
    };

    return fleets.reduce((acc, fleet) => {
        for (const ship of fleet.ships) {
            switch (ship.type) {
                case ShipType.BB:
                    acc.BB++;
                    break;
                case ShipType.BBV:
                    acc.BBV++;
                    break;
                case ShipType.CV:
                    acc.CV++;
                    break;
                case ShipType.CVB:
                    acc.CVB++;
                    break;
                case ShipType.CVL:
                    acc.CVL++;
                    break;
                case ShipType.CA:
                    acc.CA++;
                    break;
                case ShipType.CAV:
                    acc.CAV++;
                    break;
                case ShipType.CL:
                    acc.CL++;
                    break;
                case ShipType.CLT:
                    acc.CLT++;
                    break;
                case ShipType.CT:
                    acc.CT++;
                    break;
                case ShipType.DD:
                    acc.DD++;
                    break;
                case ShipType.DE:
                    acc.DE++;
                    break;
                case ShipType.SS:
                    acc.SS++;
                    break;
                case ShipType.SSV:
                    acc.SSV++;
                    break;
                case ShipType.AV:
                    acc.AV++;
                    break;
                case ShipType.AO:
                    acc.AO++;
                    break;
                case ShipType.LHA:
                    acc.LHA++;
                    break;
                case ShipType.AS:
                    acc.AS++;
                    break;
                case ShipType.AR:
                    acc.AR++;
                    break;
            }
        }
        return acc;
    }, { ...initial });
}