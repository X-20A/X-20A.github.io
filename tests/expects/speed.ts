import { Sp as Speed } from "@/core/branch";

// 汎用タプル構築ユーティリティ
export type BuildTuple<T, N extends number, R extends unknown[] = []> =
    R['length'] extends N ? R : BuildTuple<T, N, [...R, T]>;

// 要素数 19 の Sp 型のタプル
export type SpeedExpect = BuildTuple<Speed | undefined, 19>;

export type SpeedKey =
    | 'FastA'
    | 'FastB1'
    | 'FastB2'
    | 'FastC'
    | 'SlowA'
    | 'SlowB'
    | 'SlowC'
    | 'SlowD'
    | 'SlowE'

type SpeedExpects = {
    [key in SpeedKey]: SpeedExpect
};

/**
 * https://wikiwiki.jp/kancolle/%E9%80%9F%E5%8A%9B#table01 の写し
 * 頭にすっぴんの速度を追加
 */
export const SPEED_EXPECTS: SpeedExpects = {
    FastA: [
        Speed.fast,

        Speed.faster,
        Speed.fastest,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
    ],
    FastB1: [
        Speed.fast,

        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
    ],
    FastB2: [
        Speed.fast,

        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
    ],
    FastC: [
        Speed.fast,

        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
    ],
    SlowA: [
        Speed.slow,

        Speed.slow,
        Speed.slow,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.fast,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
    ],
    SlowB: [
        Speed.slow,

        Speed.slow,
        Speed.slow,
        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
    ],
    SlowC: [
        Speed.slow,

        Speed.slow,
        Speed.slow,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
    ],
    SlowD: [
        Speed.slow,

        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.faster,
        undefined,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        undefined,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        undefined,
        Speed.faster,
        undefined,
        undefined,
    ],
    SlowE: [
        Speed.slow,

        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.fast,
        Speed.faster,
        Speed.faster,
        Speed.faster,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
        Speed.fastest,
    ],
} as const;