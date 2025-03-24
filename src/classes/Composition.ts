import { ST as ShipType } from "@/data/ship";
import type CacheFleet from "./CacheFleet";

export default class Composition {
    public BB = 0; // 戦艦
    public BBV = 0; // 航空戦艦&改装航空戦艦
    public CV = 0; // 正規空母
    public CVB = 0; // 装甲空母
    public CVL = 0; // 軽空母
    public CA = 0; // 重巡
    public CAV = 0; // 航巡
    public CL = 0; // 軽巡
    public CLT = 0; // 雷巡
    public CT = 0; // 練習巡洋艦
    public DD = 0; // 駆逐艦
    public DE = 0; // 海防艦
    public SS = 0; // 潜水艦
    public SSV = 0; // 潜水空母
    public AV = 0; // 水母
    public AO = 0; // 補給艦
    public LHA = 0; // 揚陸艦
    public AS = 0; // 潜水母艦
    public AR = 0; // 工作艦

    constructor(fleets: CacheFleet[]) {
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