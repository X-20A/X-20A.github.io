import { ST as ShipType } from "../data/ship";
import { EquippedShip } from "./ship/EquippedShip";

/**
 * 艦種ごとの数を持つCompositionオブジェクト型
 */
export type CompositionBase = {
    /** 戦艦(高速/低速 区別無) */
    BB: number;
    /** 航空戦艦 */
    BBV: number;
    /** 空母 */
    CV: number;
    /** 装甲空母 */
    CVB: number;
    /** 軽空母 */
    CVL: number;
    /** 重巡 */
    CA: number;
    /** 航巡 */
    CAV: number;
    /** 軽巡 */
    CL: number;
    /** 雷巡 */
    CLT: number;
    /** 練巡 */
    CT: number;
    /** 駆逐 */
    DD: number;
    /** 海防 */
    DE: number;
    /** 潜水 */
    SS: number;
    /** 潜水空母 */
    SSV: number;
    /** 水母 */
    AV: number;
    /** 補給艦 */
    AO: number;
    /** 揚陸艦 */
    LHA: number;
    /** 潜水母艦 */
    AS: number;
    /** 工作艦 */
    AR: number;
};
const INITIAL: CompositionBase = {
    BB: 0,
    BBV: 0,
    CV: 0,
    CVB: 0,
    CVL: 0,
    CA: 0,
    CAV: 0,
    CL: 0,
    CLT: 0,
    CT: 0,
    DD: 0,
    DE: 0,
    SS: 0,
    SSV: 0,
    AV: 0,
    AO: 0,
    LHA: 0,
    AS: 0,
    AR: 0,
} as const;

type CompositionUtil = {
    /** 戦艦級 */
    BBs: number,
    /** 正規空母 + 装甲空母 */
    CVH: number,
    /** 空母系 */
    CVs: number,
    /** 戦艦級 + 空母系 */
    BBCVs: number,
    /** 重巡級 */
    CAs: number,
    /** 軽巡 + 練巡 */
    CLE: number,
    /** 駆逐艦 + 海防艦 */
    Ds: number,
    /** 潜水艦 + 潜水空母 */
    Ss: number,
}

export type Composition = CompositionBase & CompositionUtil

const calc_composition_base = (
    ships: EquippedShip[],
): CompositionBase => {
    return ships.reduce((acc, ship) => {
        switch (ship.type) {
            case ShipType.BB:
                acc.BB++;
                break;
            case ShipType.BBV:
                acc.BBV++;
                break;
            case ShipType.CV:
                acc.CV++;
                break;
            case ShipType.CVB:
                acc.CVB++;
                break;
            case ShipType.CVL:
                acc.CVL++;
                break;
            case ShipType.CA:
                acc.CA++;
                break;
            case ShipType.CAV:
                acc.CAV++;
                break;
            case ShipType.CL:
                acc.CL++;
                break;
            case ShipType.CLT:
                acc.CLT++;
                break;
            case ShipType.CT:
                acc.CT++;
                break;
            case ShipType.DD:
                acc.DD++;
                break;
            case ShipType.DE:
                acc.DE++;
                break;
            case ShipType.SS:
                acc.SS++;
                break;
            case ShipType.SSV:
                acc.SSV++;
                break;
            case ShipType.AV:
                acc.AV++;
                break;
            case ShipType.AO:
                acc.AO++;
                break;
            case ShipType.LHA:
                acc.LHA++;
                break;
            case ShipType.AS:
                acc.AS++;
                break;
            case ShipType.AR:
                acc.AR++;
                break;
        }
        return acc;
    }, { ...INITIAL });
}

const calc_composition_util = (
    base: CompositionBase,
): CompositionUtil => {
    const {
        BB,
        BBV,
        CV,
        CVB,
        CVL,
        CA,
        CAV,
        CL,
        CT,
        DD,
        DE,
        SS,
        SSV,
    } = base;

    const BBs = BB + BBV;
    const CVH = CV + CVB;
    const CVs = CV + CVL + CVB;
    const BBCVs = BBs + CVs;
    const CAs = CA + CAV;
    const CLE = CL + CT;
    const Ds = DD + DE;
    const Ss = SS + SSV;

    const util: CompositionUtil = {
        BBs,
        CVH,
        CVs,
        BBCVs,
        CAs,
        CLE,
        Ds,
        Ss,
    };

    return util;
}

/**
 * 艦隊構成情報オブジェクトを生成
 * @param fleets 艦隊配列
 * @returns 艦種ごとの数を持つCompositionオブジェクト
 */
export function derive_composition(
    ships: EquippedShip[],
): Composition {
    const base = calc_composition_base(ships);
    const util = calc_composition_util(base);

    const composition: Composition = {
        ...base,
        ...util,
    };

    return composition;
}