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

export const enum ShipType {
    /** 海防 */
    DE = 1,
    /** 駆逐 */
    DD = 2,
    /** 軽巡 */
    CL = 3,
    /** 雷巡 */
    CLT = 4,
    /** 重巡 */
    CA = 5,
    /** 航巡 */
    CAV = 6,
    /** 軽空 */
    CVL = 7,
    /** 戦艦 */
    BB = 9,
    /** 航戦 */
    BBV = 10,
    /** 正規空母 */
    CV = 11,
    /** 潜水 */
    SS = 13,
    /** 潜空 */
    SSV = 14,
    /** 水母 */
    AV = 16,
    /** 揚陸 */
    LHA = 17,
    /** 装空 */
    CVB = 18,
    /** 工作 */
    AR = 19,
    /** 潜水母艦 */
    AS = 20,
    /** 練巡 */
    CT = 21,
    /** 補給 */
    AO = 22,
}

export const enum EquipType {
    /** 小口径主砲 */
    MainGunS = 1,
    /** 中口径主砲 */
    MainGunM = 2,
    /** 大口径主砲 */
    MainGunL = 3,
    /** 副砲 */
    SecGun = 4,
    /** 魚雷 */
    Torpedo = 5,
    /** 艦戦 */
    Fighter = 6,
    /** 艦爆 */
    DiveBomber = 7,
    /** 艦攻 */
    TorpBomber = 8,
    /** 艦偵 */
    CarrierScout = 9,
    /** 水偵 */
    SeaPlane = 10,
    /** 水爆 */
    SeaPlaneBomber = 11,
    /** 小型電探 */
    RadarS = 12,
    /** 大型電探 */
    RadarL = 13,
    /** 小型ソナー */
    SonarS = 14,
    /** 大型ソナー */
    SonarL = 40,
    /** 爆雷(含投射機) */
    DepthCharge = 15,
    /** 缶|タービン */
    Engine = 17,
    /** 三式弾 */
    ShrapnelShell = 18,
    /** 徹甲弾 */
    APShell = 19,
    /** 機銃 */
    AAGun = 21,
    /** 甲標的 */
    MidgetSub = 22,
    /** ダメコン */
    Repair = 23,
    /** 大発系 */
    LandingCraft = 24,
    /** 回転翼機 */
    AutoGyro = 25,
    /** 対潜哨戒機 */
    AswPlane = 26,
    /** 中型バルジ */
    BulgeM = 27,
    /** 大型バルジ */
    BulgeL = 28,
    /** 小型探照灯 */
    SearchLightS = 29,
    /** 大型探照灯 */
    SearchLightL = 42,
    /** ドラム缶 */
    Drum = 30,
    /** 艦艇修理施設 */
    SRF = 31,
    /** 潜水魚雷 */
    TorpedoSS = 32,
    /** 照明弾 */
    StarShell = 33,
    /** 司令部施設 */
    FCF = 34,
    /** 整備員 */
    Scamp = 35,
    /** 高射装置 */
    AAFD = 36,
    /** WG 42|四式20cm対地噴進砲 */
    WG = 37,
    /** 見張り員 */
    Picket = 39,
    /** 二式大艇|Catalina */
    FlyingBoat = 41,
    /** 戦闘糧食 */
    Ration = 43,
    /** 洋上補給 */
    OilDrum = 44,
    /** 水戦 */
    SeaPlaneFighter = 45,
    /** 内火艇 */
    LandingTank = 46,
    /** 彩雲(輸送用分解済) */
    TransportItem = 50,
    /** 潜水電探 */
    SubRadar = 51,
    /** 陸軍歩兵部隊|チハ */
    ArmyUnit = 52,
    /** 煙幕装置|阻塞気球 */
    SmokeScreen = 54,
    /** 噴式艦爆 */
    JetBomber = 57,
}

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
    | '60-1' | '60-2' | '60-3' | '60-4' // | '60-5' | '60-6'

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