import type Big from "big.js";
import type { NA as National, SG as SpeedGroup, ST as ShipType } from "../data/ship";
import type { NT as NodeType } from "../data/map";
import { ShipName } from "./shipName";

export type Brand<T, B> = T & { __brand: B };

export type Seek = [number, number, number, number]

export interface ShipData {
    /** 艦名 */
	name: ShipName
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
    | '61-1' | '61-2' | '61-3' //| '61-4' //| '61-5'

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
    deck: string | null,
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

export type ItemIconKey = 'fuel'|'ammo'|'steel'|'imo'