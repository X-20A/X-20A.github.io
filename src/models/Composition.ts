import { CacheFleet } from "@/core/CacheFleet";
import { ST as ShipType } from "@/data/ship";

export default class Composition {
    public readonly BB: number;
    public readonly BBV: number;
    public readonly CV: number;
    public readonly CVB: number;
    public readonly CVL: number;
    public readonly CA: number;
    public readonly CAV: number;
    public readonly CL: number;
    public readonly CLT: number;
    public readonly CT: number;
    public readonly DD: number;
    public readonly DE: number;
    public readonly SS: number;
    public readonly SSV: number;
    public readonly AV: number;
    public readonly AO: number;
    public readonly LHA: number;
    public readonly AS: number;
    public readonly AR: number;

    constructor(fleets: CacheFleet[]) {
        this.BB = 0;
        this.BBV = 0;
        this.CV = 0;
        this.CVB = 0;
        this.CVL = 0;
        this.CA = 0;
        this.CAV = 0;
        this.CL = 0;
        this.CLT = 0;
        this.CT = 0;
        this.DD = 0;
        this.DE = 0;
        this.SS = 0;
        this.SSV = 0;
        this.AV = 0;
        this.AO = 0;
        this.LHA = 0;
        this.AS = 0;
        this.AR = 0;

        for (const fleet of fleets) {
            for (const ship of fleet.ships) {
                switch (ship.type) {
                    case ShipType.BB:
                        this.BB++;
                        break;
                    case ShipType.BBV:
                        this.BBV++;
                        break;
                    case ShipType.CV:
                        this.CV++;
                        break;
                    case ShipType.CVB:
                        this.CVB++;
                        break;
                    case ShipType.CVL:
                        this.CVL++;
                        break;
                    case ShipType.CA:
                        this.CA++;
                        break;
                    case ShipType.CAV:
                        this.CAV++;
                        break;
                    case ShipType.CL:
                        this.CL++;
                        break;
                    case ShipType.CLT:
                        this.CLT++;
                        break;
                    case ShipType.CT:
                        this.CT++;
                        break;
                    case ShipType.DD:
                        this.DD++;
                        break;
                    case ShipType.DE:
                        this.DE++;
                        break;
                    case ShipType.SS:
                        this.SS++;
                        break;
                    case ShipType.SSV:
                        this.SSV++;
                        break;
                    case ShipType.AV:
                        this.AV++;
                        break;
                    case ShipType.AO:
                        this.AO++;
                        break;
                    case ShipType.LHA:
                        this.LHA++;
                        break;
                    case ShipType.AS:
                        this.AS++;
                        break;
                    case ShipType.AR:
                        this.AR++;
                        break;
                }
            }
        }
    }
}