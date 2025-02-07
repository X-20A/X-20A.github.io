import CacheFleet from "./CacheFleet";
import {
    SpeedId,
    FleetSpeedName,
    FleetTypeId,
    FleetTypeName,
    Fleet,
    Seek,
} from "./types";
import Composition from "./Composition";
import {
    convertFleetSpeedIdToName,
    convertFleetTypeIdToName,
} from "@/utils/convertUtil";
import Big from 'big.js';

/**
 * 実際に表示やシミュレートで使う艦隊    
 * フィールド or メソッド で持つ判断は今のところ、頻繁に使うかどうかくらい
 */
export default class AdoptFleet implements Fleet {
    /**
     * branchでは原則として使わない    
     * 必要ならフィールドなりメソッドなりで対応する
     */
    public readonly fleets: CacheFleet[];

    /** 艦種 */
    public readonly composition: Composition;

    /** 艦名配列 */
    public readonly ship_names: string[];
    
    /** 艦隊種別ID */
    public readonly fleet_type_id: FleetTypeId;

    /** 艦隊種別(文字列) */
    public readonly fleet_type: FleetTypeName;

    /** 総艦数 */
    public readonly fleet_length: number;

    /** 艦隊速度ID */
    public readonly speed_id: SpeedId;

    /** 艦隊速度(文字列) */
    public readonly speed: FleetSpeedName;

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

    constructor(fleets: CacheFleet[], fleet_type_id: FleetTypeId) {
        this.fleets = fleets;
        this.fleet_type_id = fleet_type_id;
        this.fleet_type = convertFleetTypeIdToName(fleet_type_id);

        if (fleet_type_id > 0) { // 連合艦隊
            this.composition = new Composition(fleets);
            this.ship_names = fleets[0].ship_names.concat(fleets[1].ship_names);
            this.fleet_length = fleets[0].ships.length + fleets[1].ships.length;
            if (fleets[0].speed_id === 3 && fleets[1].speed_id === 3) {
                this.speed_id = 3;
                this.speed = "最速艦隊";
            } else if (fleets[0].speed_id === 2 && fleets[1].speed_id === 2) {
                this.speed_id = 2;
                this.speed = "高速+艦隊";
            } else if (fleets[0].speed_id === 1 && fleets[1].speed_id === 1) {
                this.speed_id = 1;
                this.speed = "高速艦隊";
            } else {
                this.speed_id = 0;
                this.speed = "低速艦隊";
            }

            switch (fleet_type_id) {
                case 1:
                    this.fleet_type = "空母機動部隊";
                    break;
                case 2:
                    this.fleet_type = "水上打撃部隊";
                    break;
                case 3:
                    this.fleet_type = "輸送護衛部隊";
                    break;
            }

            // mapを使うと as が必要になる
            this.seek = [
                new Big(fleets[0].seek[0]).plus(fleets[1].seek[0]).toNumber(),
                new Big(fleets[0].seek[1]).plus(fleets[1].seek[1]).toNumber(),
                new Big(fleets[0].seek[2]).plus(fleets[1].seek[2]).toNumber(),
                new Big(fleets[0].seek[3]).plus(fleets[1].seek[3]).toNumber(),
            ];
            this.save_seek = this.seek;

            this.drum_carrier_count = fleets[0].drum_carrier_count + fleets[1].drum_carrier_count;
            this.radar_carrier_count = fleets[0].radar_carrier_count + fleets[1].radar_carrier_count;
            this.craft_carrier_count = fleets[0].craft_carrier_count + fleets[1].craft_carrier_count;
        } else {
            const fleet = fleets[0];

            this.composition = new Composition([fleet]);
            this.ship_names = fleet.ship_names;
            this.fleet_length = fleet.ships.length;
            this.speed_id = fleet.speed_id;
            this.speed = convertFleetSpeedIdToName(this.speed_id);
            this.seek = fleet.seek;
            this.save_seek = this.seek;
            this.drum_carrier_count = fleet.drum_carrier_count;
            this.radar_carrier_count = fleet.radar_carrier_count;
            this.craft_carrier_count = fleet.craft_carrier_count;
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
     * 高速+以上の艦隊ならtrueを返す
     * @returns 
     */
    public isFaster(): boolean {
        return this.speed_id >= 2;
    }
    /**
     * 低速戦艦の数を返す。実際の速度とは無関係にステータスが低速な戦艦、及び航戦
     * @returns 低速戦艦の数
     */
    public countSBB(): number {
        let count = 0;
        count += this.fleets[0].ships
            .filter(item => ['戦艦','航戦'].includes(item.type) && item.speed_group >= 4)
            .length;
        if (this.fleets[1]) {
            count += this.fleets[1].ships
                .filter(item => ['戦艦', '航戦'].includes(item.type) && item.speed_group >= 4)
                .length;
        }
        return count;
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
        return this.fleets[0].ships[0].type === '軽巡';
    }
    /**
     * 連合艦隊ならtrueを返す
     * @returns 
     */
    public isUnion(): boolean {
        return this.fleets.length === 2;
    }
    /**
     * 艦隊構成艦に含まれる艦名がtarget_name(部分一致)の艦をカウントして返す    
     * '夕張'とすると、夕張/改/改二/改二特 が対象。熊野とかは注意。無いと思うけど
     * @param target_name - 判定する艦の名前(部分一致)
     * @returns - 該当する艦の隻数
     */
    public countShip(target_name: string): number {
        return this.ship_names.filter(ship_name => ship_name.includes(target_name)).length
    }
    /**
     * 艦隊内の大鷹型の数を返す
     * @returns 
     */
    public countTaiyo(): number {
        const taiyos = ['春日丸', '大鷹', '八幡丸', '雲鷹', '神鷹'];
        return this.ship_names.filter(ship_name => taiyos.some(name => ship_name.startsWith(name))).length;
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
                if (['正空','装空','軽空'].includes(ship.type) || ship.name.includes('あきつ丸')) {
                    if (!ship.has_arctic_gear) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
    /**
     * 大和型をカウントして返す
     * @returns 
     */
    public countYamatoClass() {
        return this.countShip('大和') + this.countShip('武蔵');
    }
    /**
     * 索敵無視の為に索敵値を退避フィールドと切替
     */
    public switchSeek(): void {
        if (this.seek.every(item => item === 999)) {
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
