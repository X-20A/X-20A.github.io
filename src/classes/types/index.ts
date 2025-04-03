import type Big from "big.js";
import type CacheFleet from "../CacheFleet";
import { NA as National, SG as SpeedGroup, ST as ShipType } from "@/data/ship";
import { NT as NodeType } from "@/data/map";
import { Sp as Speed } from "../Sim";

export type Seek = [number, number, number, number]

export interface ShipData {
    /** 艦名 */
	name: string
    /** 艦種ID */
	type: ShipType
    /** 索敵値(最小) */
	seek: number
    /** 索敵値(lv.99) */
	seek2: number
    /** 国籍ID */
	na: National
    /** 速力グループID */
	sg: SpeedGroup
}

export type Improvement = 0|1|2|3|4|5|6|7|8|9|10

export type EquipInDeck = {
    /** 装備ID */
	id: number
    /** 改修値 */
	improvement: Improvement,
    /** 増設に設定された装備であるか */
    is_ex: boolean,
}

export type SelectedType = 1|2|3|4|5|6|7

export interface Fleet {
    /** 艦隊速度 */
    readonly speed: Speed
    /** 艦隊索敵値 */
    readonly seek: Seek
    /** ドラム缶 装備艦数 */
    readonly drum_carrier_count: number
    /** 電探系 装備艦数 */
    readonly radar_carrier_count: number
    /** 大発系 装備艦数 */
    readonly craft_carrier_count: number
}

export type AreaId = // @expansion
    | '1-1' | '1-2' | '1-3' | '1-4' | '1-5' | '1-6'
    | '2-1' | '2-2' | '2-3' | '2-4' | '2-5'
    | '3-1' | '3-2' | '3-3' | '3-4' | '3-5'
    | '4-1' | '4-2' | '4-3' | '4-4' | '4-5'
    | '5-1' | '5-2' | '5-3' | '5-4' | '5-5'
    | '6-1' | '6-2' | '6-3' | '6-4' | '6-5'
    | '7-1' | '7-2' | '7-3' | '7-4' | '7-5'
    | '57-7'
    | '58-1' | '58-2' | '58-3' | '58-4'
    | '59-1' | '59-2' | '59-3' | '59-4' | '59-5'
    | '60-1' | '60-2' | '60-3' | '60-4' | '60-5' | '60-6'

export type BranchResponse = {
    node: string;
    rate: number;
};

export type SimResult = {
    route: string[];
    rate: Big;
}

export type NodeData = [
    number,
    number,
    NodeType,
];
export type NodeDatas = {
    [key: string]: {
        [innerKey: string]: NodeData;
    }
}

export type EdgeData = [string, string];
export type EdgeDatas = {
    [key: string]: EdgeData[];
};

export type CyStyle = {
    selector: string;
    style: Record<string, string | number>;
}

export type OptionsType = Partial<Record<AreaId, Record<string, string>>>;


export type SaveData = {
    fleets: CacheFleet[],
    selected_type: SelectedType | null,
    area: AreaId | null,
    options: OptionsType | null,
}

export type BranchLastUpdate = {
    [key in AreaId]: string | null
}

export type BranchType = {
    [key: string]: { // key in AreaId としたいが、7-3がネックになる
        [key: string]: string;
    }
};

export type ItemIconKey = 'fuel'|'ammo'|'steel'|'imo'|'drum'|'craft'