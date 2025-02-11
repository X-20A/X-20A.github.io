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
                    case "戦艦":
                        this.BB++;
                        break;
                    case "航戦":
                        this.BBV++;
                        break;
                    case "正空":
                        this.CV++;
                        break;
                    case "装空":
                        this.CVB++;
                        break;
                    case "軽空":
                        this.CVL++;
                        break;
                    case "重巡":
                        this.CA++;
                        break;
                    case "航巡":
                        this.CAV++;
                        break;
                    case "軽巡":
                        this.CL++;
                        break;
                    case "雷巡":
                        this.CLT++;
                        break;
                    case "練巡":
                        this.CT++;
                        break;
                    case "駆逐":
                        this.DD++;
                        break;
                    case "海防":
                        this.DE++;
                        break;
                    case "潜水":
                        this.SS++;
                        break;
                    case "潜空":
                        this.SSV++;
                        break;
                    case "水母":
                        this.AV++;
                        break;
                    case "補給":
                        this.AO++;
                        break;
                    case "揚陸":
                        this.LHA++;
                        break;
                    case "潜母":
                        this.AS++;
                        break;
                    case "工作":
                        this.AR++;
                        break;
                }
            }
        }
    }
}