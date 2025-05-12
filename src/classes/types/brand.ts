type Brand<T, B> = T & { __brand: B };

/** 装備ボーナスのブランド型 */
export type EquipBonusSeek = Brand<number, "EquipBonusSeek">;

/** 初期化忘れではなく、未出航(まだ経由したNodeが無い)という意味のnull */
export type PreSailNull = Brand<null, 'PreSailNull'>;