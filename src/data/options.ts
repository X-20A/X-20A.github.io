import type { AreaId } from '../types';

// 海域ごとのオプション定義

export type Option = {
  value: string;
  label?: string;
  is_checked?: boolean,
};

export type OptionGroup = {
  options: Option[];
  label?: string;
};

export type OptionSelector = {
  [key in AreaId]?: Record<string, OptionGroup>;
};

export const OPTION_DATA: OptionSelector = {
	'5-6': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Nボス出現後' },
				{ value: '3', label: 'Zボス出現後' },
			],
		},
	},
	'7-3': {
		'phase': {
			label: '第二ボス',
			options: [
				{ value: '1', label: '出現前' },
				{ value: '2', label: '出現後' },
			],
		},
	},
	'57-7': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Hボス出現後' },
				{ value: '2', label: 'F-H開通後' },
				{ value: '3', label: 'Pボス出現後' },
				{ value: '4', label: '出撃地点3解放後' },
				{ value: '5', label: 'C2-L開通後' },
				{ value: '6', label: 'Zボス出現後' },
				{ value: '7', label: 'L-V & L-X開通後' },
			],
		},
	},
	'58-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '出撃地点2解放前' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: 'Xボス出現後' },
			],
		},
	},
	'58-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '第一ボス出現前' },
				{ value: '2', label: '第一ボス出現後' },
				{ value: '3', label: '第二ボス出現後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'58-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '出撃地点3解放前' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: '出撃地点4解放後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'58-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Oボス出現前' },
				{ value: '2', label: 'Oボス出現後' },
				{ value: '3', label: 'Sボス出現後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
		'tag': {
			label: '出撃札',
			options: [
				{ value: '1', label: '新編竜巻部隊のみ' },
				{ value: '0', label: 'その他' },
			],
		},
	},
	'59-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第一ギミック完了後' },
				{ value: '3', label: '第二ギミック完了後' },
			],
		},
	},
	'59-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: '短縮後' },
			],
		},
	},
	'59-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第二ゲージ以降' },
			],
		},
	},
	'59-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: 'ZZボス出現後' },
			],
		},
	},
	'60-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: 'Oボス出現後' },
			],
		},
		'is_third': {
			label: '出撃艦隊',
			options: [
				{ value: '1', label: '第三艦隊' },
				{ value: '0', label: 'それ以外' },
			],
		},
	},
	'60-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Uボス出現前' },
				{ value: '2', label: 'Uボス出現後' },
				{ value: '3', label: 'Wボス出現後' },
			],
		},
	},
	'60-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Gボス出現後' },
				{ value: '3', label: '出撃地点2,3解放後' },
				{ value: '4', label: 'Rボス出現後' },
				{ value: '5', label: 'W泊地マス解放後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'60-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Lボス出現後' },
				{ value: '3', label: 'Wボス出現後' },
			]
		},
	},
	'60-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Tボス出現後' },
				{ value: '3', label: 'Zボス出現後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'60-6': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Vボス出現後' },
				{ value: '3', label: '短縮ギミック後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'61-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Oボス出現後' },
				{ value: '3', label: 'Vボス出現後' },
			]
		},
	},
	'61-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Xボス出現後' },
				{ value: '3', label: 'Yボス出現後' },
			]
		},
	},
	'61-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Wボス出現後' },
				{ value: '3', label: 'Zボス出現後' },
			]
		},
	},
	'61-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Nボス出現後' },
				{ value: '3', label: 'Tボス出現後' },
				{ value: '4', label: 'Zボス出現後' },
			]
		},
	},
	'61-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Pボス出現後' },
				{ value: '3', label: 'Uボス出現後' },
				{ value: '4', label: 'Xボス出現後' },
				{ value: '5', label: 'ZZボス出現後' },
				{ value: '6', label: '出撃地点3解放後' },
			]
		},
	},
	'62-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Iボス出現後' },
				{ value: '3', label: 'Iボス撃破後' },
				{ value: '4', label: 'Tボス出現後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'62-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第一ギミック解除前' },
				{ value: '3', label: '第一ギミック解除後' },
				{ value: '4', label: 'Yボス出現後' },
			]
		},
	},
	'62-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: 'Qボス出現後' },
				{ value: '4', label: '出撃地点3解放後' },
				{ value: '5', label: 'Zボス出現後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'62-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: '出撃地点3解放後' },
				{ value: '4', label: 'Zボス出現後' },
			]
		},
	},
	'62-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: '出撃地点3解放後' },
				{ value: '4', label: 'Sボス出現後' },
				{ value: '5', label: '出撃地点4解放後' },
			],
		},
		'British_relief_fleet': {
			label: 'イギリス救援艦隊',
			options: [
				{ value: '1', label: '全艦左記札or無札' },
				{ value: '0', label: 'それ以外' },
			],
		},
	},
} as const; // @expansion
