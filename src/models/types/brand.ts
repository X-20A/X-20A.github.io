type Brand<T, B> = T & { __brand: B };

/** 装備ボーナスのブランド型 */
export type EquipBonusSeek = Brand<number, 'EquipBonusSeek'>;

/** 初期化忘れではなく、未出航(まだ経由したNodeが無い)という意味のnull */
export type PreSailNull = Brand<null, 'PreSailNull'>;
/**
 * Node名を表す文字列    
 * データが文字列なのでどこでも使う訳ではない
 */
export type Node = Brand<string, 'Node'>
/**
 * 艦を一意に識別するためのID
 */
export type UniqueId = Brand<number, 'UniqueId'>

/** ブランド化するための共通関数 */
function brand<T, B extends string>(value: T): Brand<T, B> {
    return value as Brand<T, B>;
}

export const createEquipBonusSeek =
    (value: number): EquipBonusSeek => brand<number, 'EquipBonusSeek'>(value);

export const createPreSailNull =
    (): PreSailNull => brand<null, 'PreSailNull'>(null);

export const createNode =
    (value: string): Node => brand<string, 'Node'>(value);

export const createUniqueId =
    (value: number): UniqueId => brand<number, 'UniqueId'>(value);