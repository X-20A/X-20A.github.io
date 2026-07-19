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

/** 更新先1つ分のネジ消費。更新先の装備を添える */
export type Upgrade = {
	to: {
		/** 更新先のゲーム内装備ID */
		id: number;
		name: string;
	};
	screws: number;
	certainScrews: number | null;
	/**
	 * 同じ更新先が条件違いで並ぶ装備の、行を見分けるための注記。
	 * 区別が要らない大多数の更新先では持たない。
	 */
	note?: string;
};

/**
 * 更新のネジ消費。二番艦の指定違いなどで更新先が複数ある装備があるため、
 * Phase と違って available の中身は配列になる。
 */
export type UpgradeCost =
	/** upgrades は必ず1件以上 */
	| { status: 'available'; upgrades: Upgrade[] }
	| { status: 'none' }
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
		upgrade: UpgradeCost;
	};
};

export type CostKey = keyof Equipment['cost'];
