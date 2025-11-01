import { ResourceType } from "../models/resource/NomalResource";
import type { AreaId } from "../types";

// マスごとのデータ
// 通常の資源マスにおいては、資源マスと獲得資源の数が1:1である
export type NodeResource = {
    type?: ResourceType;
    memo?: string | string[];
    // 釘だけ、みたいな資源の無いマスもある
    /** 最低獲得資源には固定値の場合と振れ幅がある場合がある */
    base?: number | [number, number];
    max?: number;
    coefficient?: {
        drum: number,
        craft: number,
    };
};

type AreaResourceData = {
    [nodeId: string]: NodeResource;
};

// RESOURCE_DATA自体は、AreaIdの**部分集合**
export type ResourceData = Partial<Record<AreaId, AreaResourceData>>;