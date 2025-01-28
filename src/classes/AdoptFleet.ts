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
import { convertFleetSpeedIdToName, convertFleetTypeIdToName } from "@/utils/convertUtil";

/**
 * 実際に表示やシミュレートで使う艦隊
 */
export default class AdoptFleet implements Fleet {
    /**
     * branchでは原則として使わない    
     * 必要ならフィールドなりメソッドなりで対応する
     */
    public readonly fleets: CacheFleet[];
    public readonly composition: Composition;
    public readonly ship_names: string[];
    public readonly fleet_type_id: FleetTypeId;
    public readonly fleet_type: FleetTypeName;
    public readonly fleet_length: number;
    public readonly speed_id: SpeedId;
    public readonly speed: FleetSpeedName;
    public readonly seek: Seek;
    /** ドラム缶 装備艦数 */
    public readonly drum_carrier_count: number;

    /** 電探系 装備艦数 */
    public readonly radar_carrier_count: number;

    /** 索敵値5以上の電探 装備艦数 */
    public readonly radar5_carrier_count: number;

    /** 大発系 装備艦数 */
    public readonly craft_carrier_count: number;

    /** 寒冷地装備＆甲板要員 装備艦数 */
    public readonly arctic_gear_carrier_count: number;

    /** 総ドラム缶装備数 */
    public readonly total_drum_count: number;

    /** 総大発系装備数 */
    public readonly total_valid_craft_count: number;

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
                fleets[0].seek[0] + fleets[1].seek[0],
                fleets[0].seek[1] + fleets[1].seek[1],
                fleets[0].seek[2] + fleets[1].seek[2],
                fleets[0].seek[3] + fleets[1].seek[3],
            ];

            this.drum_carrier_count = fleets[0].drum_carrier_count + fleets[1].drum_carrier_count;
            this.radar_carrier_count = fleets[0].radar_carrier_count + fleets[1].radar_carrier_count;
            this.radar5_carrier_count = fleets[0].radar5_carrier_count + fleets[1].radar5_carrier_count;
            this.craft_carrier_count = fleets[0].craft_carrier_count + fleets[1].craft_carrier_count;
            this.arctic_gear_carrier_count = fleets[0].arctic_gear_carrier_count + fleets[1].arctic_gear_carrier_count;
            this.total_drum_count = fleets[0].total_drum_count + fleets[1].total_drum_count;
            this.total_valid_craft_count = fleets[0].total_valid_craft_count + fleets[1].total_valid_craft_count;
        } else {
            const fleet = fleets[0];

            this.composition = new Composition([fleet]);
            this.ship_names = fleet.ship_names;
            this.fleet_length = fleet.ships.length;
            this.speed_id = fleet.speed_id;
            this.speed = convertFleetSpeedIdToName(this.speed_id);
            this.seek = fleet.seek;
            this.drum_carrier_count = fleet.drum_carrier_count;
            this.radar_carrier_count = fleet.radar_carrier_count;
            this.radar5_carrier_count = fleet.radar5_carrier_count;
            this.craft_carrier_count = fleet.craft_carrier_count;
            this.arctic_gear_carrier_count = fleet.arctic_gear_carrier_count;
            this.total_drum_count = fleet.total_drum_count;
            this.total_valid_craft_count = fleet.total_valid_craft_count;
        }
    }

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
    public isFaster(): boolean {
        return this.speed_id >= 2;
    }
}
