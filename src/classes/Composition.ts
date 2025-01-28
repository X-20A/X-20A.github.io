import CacheFleet from "./CacheFleet";

export default class Composition {
    public BB: number = 0; // 戦艦
    public BBV: number = 0; // 航空戦艦&改装航空戦艦
    public CV: number = 0; // 正規空母
    public CVB: number = 0; // 装甲空母
    public CVL: number = 0; // 軽空母
    public CA: number = 0; // 重巡
    public CAV: number = 0; // 航巡
    public CL: number = 0; // 軽巡
    public CLT: number = 0; // 雷巡
    public CT: number = 0; // 練習巡洋艦
    public DD: number = 0; // 駆逐艦
    public DE: number = 0; // 海防艦
    public SS: number = 0; // 潜水艦
    public SSV: number = 0; // 潜水空母
    public AV: number = 0; // 水母
    public AO: number = 0; // 補給艦
    public LHA: number = 0; // 揚陸艦
    public AS: number = 0; // 潜水母艦
    public AR: number = 0; // 工作艦

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