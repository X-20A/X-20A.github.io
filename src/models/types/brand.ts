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
/**
 * 読み込んだ艦隊のindex
 */
export type FleetIndex = Brand<number, 'FleetIndex'>
/**
 * 読み込んだ艦のindex
 */
export type ShipIndex = Brand<number, 'ShipIndex'>
/**
 * 艦ID
 */
export type ShipId = Brand<number, 'ShipId'>
/**
 * 艦Lv
 */
export type ShipLv = Brand<number, 'ShipLv'>;
/**
 * 艦HP
 */
export type ShipHp = Brand<number | undefined, 'ShipHp'>;
/**
 * 艦ASW
 */
export type ShipAsw = Brand<number | undefined, 'ShipAsw'>;
/**
 * 艦Luck
 */
export type ShipLuck = Brand<number | undefined, 'ShipLuck'>;

/** ブランド化するための共通関数 */
function brand<T, B extends string>(value: T): Brand<T, B> {
    return value as Brand<T, B>;
}

export const brandEquipBonusSeek =
    (value: number): EquipBonusSeek => brand<number, 'EquipBonusSeek'>(value);

export const brandPreSailNull =
    (): PreSailNull => brand<null, 'PreSailNull'>(null);

export const brandNode =
    (value: string): Node => brand<string, 'Node'>(value);

export const brandUniqueId =
    (value: number): UniqueId => brand<number, 'UniqueId'>(value);

export const brandFleetIndex =
    (value: number) => brand<number, 'FleetIndex'>(value);

export const brandShipIndex =
    (value: number) => brand<number, 'ShipIndex'>(value);
    
export const brandShipId =
    (value: number) => brand<number, 'ShipId'>(value);

export const brandShipLv =
    (value: number) => brand<number, 'ShipLv'>(value);

export const brandShipHp =
    (value: number | undefined) => brand<number | undefined, 'ShipHp'>(value);

export const brandShipAsw =
    (value: number | undefined) => brand<number | undefined, 'ShipAsw'>(value);

export const brandShipLuck =
    (value: number | undefined) => brand<number | undefined, 'ShipLuck'>(value);