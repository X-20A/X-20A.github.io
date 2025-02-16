export interface DeckBuilderItem {
    /** 装備id */
    id: number,
    /** 改修値 */
    rf: number,
    /** 熟練度 */
    mas?: number
}

export interface DeckBuilderShip {
    /** 艦娘id */
    id: number,
    /** 艦娘Level */
    lv: number,
    /** 艦娘運 -1で通常 */
    luck: number,
    /** 耐久 */
    hp?: number;
    /** 火力 */
    fp?: number;
    /** 雷装 */
    tp?: number;
    /** 対空 */
    aa?: number;
    /** 装甲 */
    ar?: number;
    /** 対潜 */
    asw?: number;
    /** 回避 */
    ev?: number;
    /** 索敵 */
    los?: number;
    /** 補強増設 */
    exa?: boolean;
    /** 装備データ */
    items: { [name: string]: DeckBuilderItem };
}

export interface DeckBuilderFleet {
    /** 艦隊名 */
    name?: string;
    /** 艦隊種別 */
    t?: number;
    /** 艦娘1 */
    s1?: DeckBuilderShip;
    /** 艦娘2 */
    s2?: DeckBuilderShip;
    /** 艦娘3 */
    s3?: DeckBuilderShip;
    /** 艦娘4 */
    s4?: DeckBuilderShip;
    /** 艦娘5 */
    s5?: DeckBuilderShip;
    /** 艦娘6 */
    s6?: DeckBuilderShip;
    /** 艦娘7 */
    s7?: DeckBuilderShip;
}

export default interface DeckBuilder {
    version: number,
    hqlv: number,
    lang: "jp" | "en" | "kr" | "scn" | "tcn"
    theme:
        "dark"
        | "dark-ex"
        | "light"
        | "light-ex"
        | "white"
        | "74lc"
        | "74mc"
        | "74sb"
        | "official"
    f1?: DeckBuilderFleet,
    f2?: DeckBuilderFleet,
    f3?: DeckBuilderFleet,
    f4?: DeckBuilderFleet,
}