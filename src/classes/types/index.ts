import type Big from "big.js";
import type CacheFleet from "../CacheFleet";

export enum National {
	Japan   = 0,
	USA     = 1,
	Italia  = 2,
	UK      = 3,
	German  = 4,
	Germany = 5,
	France  = 6,
	USSR    = 7,
}

export type ShipType =
	| '駆逐'
	| '軽巡'
	| '重巡'
	| '航巡'
	| '航戦'
	| '戦艦'
	| '軽空'
	| '正空'
	| '装空'
	| '海防'
	| '補給'
	| '雷巡'
	| '水母'
	| '潜水'
	| '潜空'
	| '潜母'
    | '練巡'
	| '揚陸'
	| '工作'
;

// 使ってないけど一応置いとく
// データに使うと却って膨れる
/*
export enum ShipTypeId {
    DD,
    CL,
    CA,
    CAV,
    BBV,
    BB,
    CVL,
    CV,
    CVB,
    DE,
    AO,
    CLT,
    AV,
    SS,
    SSV,
    AS,
    CT,
    LHA,
    AR,
}*/

export type Seek = [number, number, number, number]

export interface ShipData {
	name: string
	type: ShipType
	seek: number
	seek2: number
	na: National
	sg: SpeedGroup
}

export type SpeedGroup = 0|1|2|3|4|5|6|7|8|9

export type SpeedId =
	| 0 // 低速
	| 1 // 高速
	| 2 // 高速+
	| 3 // 最速

export type FleetSpeedName = '低速艦隊' | '高速艦隊' | '高速+艦隊' | '最速艦隊'

export type Improvement = 0|1|2|3|4|5|6|7|8|9|10

export type EquipInDeck = {
	id: number
	improvement: Improvement,
    is_ex: boolean,
}

export type SelectedType = 1|2|3|4|5|6|7

export type FleetTypeId = 0|1|2|3

// 遊撃部隊は隻数から判定する
export type FleetTypeName = '通常艦隊' | '空母機動部隊' | '水上打撃部隊' | '輸送護衛部隊'

export interface Fleet {
  /** 艦隊速度 */
  readonly speed_id: SpeedId;

  /** 艦隊索敵値 */
  readonly seek: Seek;

  /** ドラム缶 装備艦数 */
  readonly drum_carrier_count: number;

  /** 電探系 装備艦数 */
  readonly radar_carrier_count: number;

  /** 大発系 装備艦数 */
  readonly craft_carrier_count: number;
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
    | '60-1' | '60-2' | '60-3' // | '60-4' | '60-5' | '60-6'

export type BranchResponse = {
    node: string;
    rate: number;
};

export type SimResult = {
    route: string[];
    rate: Big;
}

export type NodeType =
    "st"|"po"|"bo"|"ab"|"ad"|"ac"|"en"|"su"|"ca"|"wh"|"re"|"ni"|"sc"|"as"|"tl"|"un"

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