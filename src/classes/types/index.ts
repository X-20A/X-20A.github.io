import { NT as NodeType } from "@/data/map";

export type Mode = // @expansion
    | 'nomal'
    | 59
    | 60
    | 61
    | 'vanguard'

export interface Ttemplate {
    title: string;
    world: number;
    area: number;
    route: string;
    token: string;
    memo: string | null;
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
    | '61-1' | '61-2' | '61-3' | '61-4' | '61-5'

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