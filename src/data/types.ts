/**
 * 1改修区分あたりのネジ消費。
 * 「値が無い」状態を null で表さず、status で区別する。
 */
export type Phase =
	/** 改修可能。certainScrews は確実化の制度自体が無い装備で null */
	| { status: 'available'; screws: number; certainScrews: number | null }
	/** 更新先が存在しない */
	| { status: 'none' }
	/** 未判明。実装直後で解析が出ていない装備 */
	| { status: 'unknown' };

export type Equipment = {
	/** ゲーム内装備ID */
	id: number;
	name: string;
	cost: {
		/** ★0→6 */
		toSix: Phase;
		/** ★6→10 */
		toTen: Phase;
		/** 更新 */
		upgrade: Phase;
	};
};

export type CostKey = keyof Equipment['cost'];
