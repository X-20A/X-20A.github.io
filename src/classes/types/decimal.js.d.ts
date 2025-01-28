declare module 'decimal.js' {
	export default class Decimal {
		constructor(value: string | number | Decimal);

		// 算術演算
		plus(value: string | number | Decimal): Decimal;
		minus(value: string | number | Decimal): Decimal;
		times(value: string | number | Decimal): Decimal;
		div(value: string | number | Decimal): Decimal;

		// 数値変換
		toString(): string;
		toNumber(): number;

		// 丸め処理
		toDecimalPlaces(places: number, roundingMode?: Decimal.Rounding): Decimal;

		// 比較
		gt(value: string | number | Decimal): boolean; // >
		gte(value: string | number | Decimal): boolean; // >=
		lt(value: string | number | Decimal): boolean; // <
		lte(value: string | number | Decimal): boolean; // <=
		eq(value: string | number | Decimal): boolean; // ===

		// その他のメソッド
		floor(): Decimal;
		sqrt(): Decimal;
		negated(): Decimal;

		// 静的プロパティ
		static ROUND_UP: Decimal.Rounding;
		static ROUND_DOWN: Decimal.Rounding;
		static ROUND_CEIL: Decimal.Rounding;
		static ROUND_FLOOR: Decimal.Rounding;
		static ROUND_HALF_UP: Decimal.Rounding;
		static ROUND_HALF_DOWN: Decimal.Rounding;
		static ROUND_HALF_EVEN: Decimal.Rounding;
		static ROUND_HALF_CEIL: Decimal.Rounding;
		static ROUND_HALF_FLOOR: Decimal.Rounding;
		static EUCLID: Decimal.Rounding;
	}

	// ラウンディングモードの定義
	export namespace Decimal {
		enum Rounding {
			ROUND_UP,
			ROUND_DOWN,
			ROUND_CEIL,
			ROUND_FLOOR,
			ROUND_HALF_UP,
			ROUND_HALF_DOWN,
			ROUND_HALF_EVEN,
			ROUND_HALF_CEIL,
			ROUND_HALF_FLOOR,
			EUCLID,
		}
	}
}
