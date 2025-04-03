import CacheFleet from "./CacheFleet";
import {
    type Fleet,
    type Seek,
} from "./types";
import { ST as ShipType } from "@/data/ship";
import Composition from "./Composition";
import Const from "./const";
import { Ft as FleetType, Sp as Speed } from "./Sim";

/**
 * 実際に表示やシミュレートで使う艦隊    
 * 艦隊情報は取込時にしか操作されない(索敵無視機能以外、完全に静的)
 * 参照海域が少ない & 今後も使わなそうなのはメソッドでもつ
 */
export default class AdoptFleet implements Fleet {
    /**
     * branchでは原則として使わない    
     * 必要ならフィールドなりメソッドなりで対応する
     */
    public readonly fleets: CacheFleet[];

    /** 艦種 */
    public readonly composition: Composition;

    /** 艦名配列 含随伴 */
    public readonly ship_names: string[];
    
    /** 艦隊種別ID */
    public readonly fleet_type: FleetType;

    /** 連合艦隊であるか */
    public readonly isUnion: boolean;

    /** 総艦数 */
    public readonly fleet_length: number;

    /** 高速+以上の艦隊であるか */
    public readonly isFaster: boolean;

    /** 艦隊速度 */
    public readonly speed: Speed;

    /** 艦隊索敵値 */
    public seek: Seek;

    /** 艦隊索敵値(退避) */
    private save_seek: Seek;

    /** ドラム缶 装備艦数 */
    public readonly drum_carrier_count: number;

    /** 電探系 装備艦数 */
    public readonly radar_carrier_count: number;

    /** 大発系 装備艦数 */
    public readonly craft_carrier_count: number;

    /** 北方迷彩(＋北方装備)装備艦数 */
    public readonly arBulge_carrier_count: number;

    /** 低速戦艦(素速度)艦数 */
    public readonly SBB_count: number;

    /** 大和型艦数 */
    public readonly yamato_class_count: number;

    /** 泊地修理艦数 */
    public readonly hakuchi_count: number;

    /** 松型駆逐艦数 */
    public readonly matsu_count: number;

    /** 第五艦隊所属艦数 */
    public readonly daigo_count: number;

    /** 礼号作戦参加艦数 */
    public readonly reigo_count: number;

    constructor(fleets: CacheFleet[], fleet_type_id: FleetType) {
        // CacheFleetのバージョンが古い場合は再生成
        if (!fleets[0].version || fleets[0].version < Const.FLEET_VERSION) {
            // console.log('rebuild');
            fleets = fleets.map(fleet => new CacheFleet(fleet.ships));
        }

        this.fleets = fleets;
        this.fleet_type = fleet_type_id;
        this.isUnion = fleet_type_id > 0;

        const ships = fleets[1] ? fleets[0].ships.concat(fleets[1].ships) : fleets[0].ships;

        let daigo_count = 0;
        let reigo_count = 0;

        // 同じ艦は1回だけカウント 連合艦隊時の判定のためにこのタイミングでやらざるを得ない
        const daigo_dup = [] as number[];
        const reigo_dup = [] as number[];

        ships.forEach(ship => {
            for (const daigo_ship_ids of Const.DAIGO_IDS) {
                if (!daigo_dup.includes(ship.id) && daigo_ship_ids.includes(ship.id)) {
                    daigo_dup.push(...daigo_ship_ids);
                    daigo_count++;
                    break;
                }
            }
            for (const reigo_ship_ids of Const.REIGO_IDS) {
                if (!reigo_dup.includes(ship.id) && reigo_ship_ids.includes(ship.id)) {
                    reigo_dup.push(...reigo_ship_ids);
                    reigo_count++;
                    break;
                }
            }
        });

        this.daigo_count = daigo_count;
        this.reigo_count = reigo_count;
        

        if (fleet_type_id > 0) { // 連合艦隊
            /** 主力艦隊 */
            const main = fleets[0];
            /** 随伴艦隊 */
            const escort = fleets[1];

            this.composition = new Composition(fleets);
            this.ship_names = main.ship_names.concat(escort.ship_names);
            this.fleet_length = main.ships.length + escort.ships.length;
            if (main.speed === 4 && escort.speed === 4) {
                this.speed = 4;
            } else if (main.speed >= 3 && escort.speed >= 3) {
                this.speed = 3;
            } else if (main.speed >= 2 && escort.speed >= 2) {
                this.speed = 2;
            } else {
                this.speed = 1;
            }

            this.isFaster = this.speed >= 3;

            // mapを使うと as が必要になる
            const total_seek = [
                main.seek[0] + escort.seek[0],
                main.seek[1] + escort.seek[1],
                main.seek[2] + escort.seek[2],
                main.seek[3] + escort.seek[3],
            ];

            this.seek = [
                Math.floor(total_seek[0] * 100) / 100,
                Math.floor(total_seek[1] * 100) / 100,
                Math.floor(total_seek[2] * 100) / 100,
                Math.floor(total_seek[3] * 100) / 100,
            ];

            this.save_seek = this.seek;

            this.drum_carrier_count = main.drum_carrier_count + escort.drum_carrier_count;
            this.radar_carrier_count = main.radar_carrier_count + escort.radar_carrier_count;
            this.craft_carrier_count = main.craft_carrier_count + escort.craft_carrier_count;
            this.arBulge_carrier_count = main.arBulge_carrier_count + escort.arBulge_carrier_count;
            this.SBB_count = main.SBB_count + escort.SBB_count;
            this.yamato_class_count = main.yamato_class_count + escort.yamato_class_count;
            this.hakuchi_count = main.hakuchi_count + escort.hakuchi_count;
            this.matsu_count = main.matsu_count + escort.matsu_count;
        } else {
            const fleet = fleets[0];

            this.composition = new Composition([fleet]);
            this.ship_names = fleet.ship_names;
            this.fleet_length = fleet.ships.length;
            this.speed = fleet.speed;
            this.isFaster = this.speed >= 3;

            this.seek = [
                Math.floor(fleet.seek[0] * 100) / 100,
                Math.floor(fleet.seek[1] * 100) / 100,
                Math.floor(fleet.seek[2] * 100) / 100,
                Math.floor(fleet.seek[3] * 100) / 100,
            ];

            this.save_seek = this.seek;
            this.drum_carrier_count = fleet.drum_carrier_count;
            this.radar_carrier_count = fleet.radar_carrier_count;
            this.craft_carrier_count = fleet.craft_carrier_count;
            this.arBulge_carrier_count = fleet.arBulge_carrier_count;
            this.SBB_count = fleet.SBB_count;
            this.yamato_class_count = fleet.yamato_class_count;
            this.hakuchi_count = fleet.hakuchi_count;
            this.matsu_count = fleet.matsu_count;
        }
    }

    // components > template 部で使ってるので消さないように
    public getMainFleetNames(): string[] {
        return this.fleets[0].ship_names;
    }
    public getEscortFleetNames(): string[] {
        return this.fleets[1].ship_names;
    }
    public getMainFleetLength(): number {
        return this.fleets[0].ships.length;
    }
    public getEscortFleetLength(): number {
        return this.fleets[1].ships.length;
    }
    /**
     * 艦隊構成艦にtarget_nameが含まれるか判定(部分一致)して返す(配列もいいぞ)    
     * '夕張'とすると、夕張/改/改二/改二特 が対象。熊野とかは注意。無いと思うけど
     * @param target_name - 判定する艦の名前(部分一致)
     * @returns - 艦が在籍していればtrue
     */
    public isInclude(target_name: string | string[]): boolean {
        if (Array.isArray(target_name)) {
            // いづれかに部分一致すればtrueを返す
            return target_name.some(
                name => this.ship_names.some(ship_name => ship_name.includes(name))
            );
        } else {
            return this.ship_names.some(ship_name => ship_name.includes(target_name));
        }
    }
    /**
     * 旗艦が軽巡であるか判定して返す
     * @returns
     */
    public isFCL(): boolean {
        return this.fleets[0].ships[0].type === ShipType.CL;
    }
    /**
     * 艦隊構成艦に含まれる艦名がtarget_name(部分一致)の艦をカウントして返す(配列もいいぞ)    
     * '夕張'とすると、夕張/改/改二/改二特 が対象。熊野とかは注意。無いと思うけど
     * @param target_name - 判定する艦の名前(部分一致)
     * @returns - 該当する艦の隻数
     */
    public countShip(target_name: string | string[]): number {
        if (Array.isArray(target_name)) {
            return this.ship_names.filter(ship_name =>
                target_name.some(target => ship_name.includes(target))
            ).length;
        } else {
            return this.ship_names
                .filter(ship_name => ship_name.includes(target_name))
                .length;
        }
    }
    /**
     * 艦隊内の大鷹型の数を返す
     * @returns 
     */
    public countTaiyo(): number {
        const taiyos = ['春日丸', '大鷹', '八幡丸', '雲鷹', '神鷹'];
        return this.ship_names
            .filter(ship_name => taiyos.some(name => ship_name.startsWith(name)))
            .length;
    }
    /**
     * 空母系+あきつ丸の数を返す
     * @returns 
     */
    public countAktmrPlusCVs(): number {
        const composition = this.composition;
        return this.countShip('あきつ丸')
            + composition.CV
            + composition.CVB
            + composition.CVL
        ;
    }
    /**
     * 寒冷地装備＆甲板要員を装備していない、空母系orあきつ丸の数を返す    
     * 伊勢改二、日向改二も対象になったことがあったみたい。必要になったら拡張する
     */
    public countNotEquipArctic(): number {
        // 滅多に呼ばれないのでやや強引に
        let count = 0;
        for (const fleet of this.fleets) {
            for (const ship of fleet.ships) {
                if ([ShipType.CV, ShipType.CVB, ShipType.CVL].includes(ship.type) || ship.name.includes('あきつ丸')) {
                    if (!ship.has_arctic_gear) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    /**
     * 索敵無視の為に索敵値を退避フィールドと切替
     */
    public switchSeek(): void {
        if (this.seek.every(value => value === 999)) {
            this.seek = this.save_seek;
        } else {
            this.save_seek = this.seek;
            this.seek = [999, 999, 999, 999];
        }
    }
    /**
     * 艦隊内のドラム缶の総数を返す
     * @returns 
     */
    public getTotalDrumCount(): number {
        if (this.fleets.length === 2) {
            return this.fleets[0].total_drum_count
                + this.fleets[1].total_drum_count;
        } else {
            return this.fleets[0].total_drum_count
        }
    }
    /**
     * 資源マスでの獲得資源増加に有効な艦隊内の大発の総数を返す
     * @returns 
     */
    public getTotalValidCraftCount(): number {
        if (this.fleets.length === 2) {
            return this.fleets[0].total_valid_craft_count
                + this.fleets[1].total_valid_craft_count
        } else {
            return this.fleets[0].total_valid_craft_count;
        }
    }

    /**
     * 索敵値5以上の電探を装備した艦の数を返す
     * 57-7 から 25/02/06 現在使われてない
     * @returns 
     */
    /*
    public getRadar5CarrierCount(): number {
        if (this.fleets.length === 2) {
            return this.fleets[0].radar5_carrier_count
                + this.fleets[1].radar5_carrier_count;
        } else {
            return this.fleets[0].radar5_carrier_count;
        }
    }*/
}
