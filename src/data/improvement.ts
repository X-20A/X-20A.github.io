import type { Equipment } from './types';

/**
 * 改修工廠のネジ消費データ。改修可能な装備のみを収録する。
 * satisfies により、各エントリの構造は vue-tsc で検証される。
 *
 * このファイルは tools/gen-improvement.ts が akashi-list/detail から生成する。手で編集しない。
 */
export const IMPROVEMENT_DATAS = [
	{
		id: 1,
		name: '12cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 293, name: '12cm単装砲改二' }, screws: 2, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 2,
		name: '12.7cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 63, name: '12.7cm連装砲B型改二' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 3,
		name: '10cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 122, name: '10cm連装高角砲＋高射装置' }, screws: 6, certainScrews: 10 },
					{ to: { id: 553, name: '10cm連装高角砲改' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 4,
		name: '14cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 119, name: '14cm連装砲' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 5,
		name: '15.5cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 235, name: '15.5cm三連装砲改' }, screws: 4, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 6,
		name: '20.3cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 90, name: '20.3cm(2号)連装砲' }, screws: 4, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 7,
		name: '35.6cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 103, name: '試製35.6cm三連装砲' }, screws: 5, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 8,
		name: '41cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 105, name: '試製41cm三連装砲' }, screws: 10, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 9,
		name: '46cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 276, name: '46cm三連装砲改' }, screws: 12, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 10,
		name: '12.7cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 91, name: '12.7cm連装高角砲(後期型)' }, screws: 3, certainScrews: 4 },
				],
			},
		},
	},
	{
		id: 11,
		name: '15.2cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 65, name: '15.2cm連装砲' }, screws: 3, certainScrews: 4 },
				],
			},
		},
	},
	{
		id: 12,
		name: '15.5cm三連装副砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 234, name: '15.5cm三連装副砲改' }, screws: 4, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 13,
		name: '61cm三連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 125, name: '61cm三連装(酸素)魚雷' }, screws: 2, certainScrews: 4 },
				],
			},
		},
	},
	{
		id: 14,
		name: '61cm四連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 15, name: '61cm四連装(酸素)魚雷' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 15,
		name: '61cm四連装(酸素)魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 58, name: '61cm五連装(酸素)魚雷' }, screws: 5, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 16,
		name: '九七式艦攻',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 98, name: '九七式艦攻(熟練)' }, screws: 2, certainScrews: 4 },
					{ to: { id: 82, name: '九七式艦攻(九三一空)' }, screws: 5, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 17,
		name: '天山',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 372, name: '天山一二型甲' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 18,
		name: '流星',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 52, name: '流星改' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 19,
		name: '九六式艦戦',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 228, name: '九六式艦戦改' }, screws: 2, certainScrews: 4 },
				],
			},
		},
	},
	{
		id: 20,
		name: '零式艦戦21型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 181, name: '零式艦戦32型' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 21,
		name: '零式艦戦52型',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 60, name: '零式艦戦62型(爆戦)' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 22,
		name: '試製烈風 後期型',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 53, name: '烈風 一一型' }, screws: 6, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 23,
		name: '九九式艦爆',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 391, name: '九九式艦爆二二型' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 24,
		name: '彗星',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 57, name: '彗星一二型甲' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 25,
		name: '零式水上偵察機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 165, name: '二式水戦改' }, screws: 5, certainScrews: 10 },
					{ to: { id: 59, name: '零式水上観測機' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 26,
		name: '瑞雲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 79, name: '瑞雲(六三四空)' }, screws: 7, certainScrews: 10 },
					{ to: { id: 80, name: '瑞雲12型' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 27,
		name: '13号対空電探',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 106, name: '13号対空電探改' }, screws: 5, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 28,
		name: '22号対水上電探',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 88, name: '22号対水上電探改四' }, screws: 8, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 29,
		name: '33号対水上電探',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 30,
		name: '21号対空電探',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 89, name: '21号対空電探改' }, screws: 5, certainScrews: 13 },
					{ to: { id: 410, name: '21号対空電探改二' }, screws: 7, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 31,
		name: '32号対水上電探',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 141, name: '32号対水上電探改' }, screws: 10, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 32,
		name: '42号対空電探',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 34,
		name: '強化型艦本式缶',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 8 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 87, name: '新型高温高圧缶' }, screws: 8, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 35,
		name: '三式弾',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 317, name: '三式弾改' }, screws: 8, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 36,
		name: '九一式徹甲弾',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 116, name: '一式徹甲弾' }, screws: 4, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 37,
		name: '7.7mm機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 38, name: '12.7mm単装機銃' }, screws: 1, certainScrews: 2 },
				],
			},
		},
	},
	{
		id: 38,
		name: '12.7mm単装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 39,
		name: '25mm連装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 40, name: '25mm三連装機銃' }, screws: 1, certainScrews: 2 },
				],
			},
		},
	},
	{
		id: 40,
		name: '25mm三連装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 131, name: '25mm三連装機銃 集中配備' }, screws: 3, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 41,
		name: '甲標的 甲型',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 309, name: '甲標的 丙型' }, screws: 4, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 44,
		name: '九四式爆雷投射機',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 45, name: '三式爆雷投射機' }, screws: 3, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 45,
		name: '三式爆雷投射機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 46,
		name: '九三式水中聴音機',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 47, name: '三式水中探信儀' }, screws: 3, certainScrews: 5 },
					{ to: { id: 149, name: '四式水中聴音機' }, screws: 6, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 47,
		name: '三式水中探信儀',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 438, name: '三式水中探信儀改' }, screws: 18, certainScrews: 25 },
				],
			},
		},
	},
	{
		id: 49,
		name: '25mm単装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 39, name: '25mm連装機銃' }, screws: 1, certainScrews: 2 },
				],
			},
		},
	},
	{
		id: 50,
		name: '20.3cm(3号)連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 520, name: '試製20.3cm(4号)連装砲' }, screws: 8, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 51,
		name: '12cm30連装噴進砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 274, name: '12cm30連装噴進砲改二' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 52,
		name: '流星改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 466, name: '流星改(熟練)' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 53,
		name: '烈風 一一型',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 55,
		name: '紫電改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 271, name: '紫電改四' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 57,
		name: '彗星一二型甲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 320, name: '彗星一二型(三一号光電管爆弾搭載機)' }, screws: 8, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 58,
		name: '61cm五連装(酸素)魚雷',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 3, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 59,
		name: '零式水上観測機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 60,
		name: '零式艦戦62型(爆戦)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 219, name: '零式艦戦63型(爆戦)' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 61,
		name: '二式艦上偵察機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 63,
		name: '12.7cm連装砲B型改二',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 266, name: '12.7cm連装砲C型改二' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 64,
		name: 'Ju87C改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 559, name: 'Ju87 D-4(Fliegerass)' }, screws: 8, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 65,
		name: '15.2cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 139, name: '15.2cm連装砲改' }, screws: 4, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 66,
		name: '8cm高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 220, name: '8cm高角砲改＋増設機銃' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 68,
		name: '大発動艇',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 166, name: '大発動艇(八九式中戦車&陸戦隊)' }, screws: 3, certainScrews: 7 },
					{ to: { id: 193, name: '特大発動艇' }, screws: 6, certainScrews: 12 },
					{ to: { id: 409, name: '武装大発' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 69,
		name: 'カ号観測機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 324, name: 'オ号観測機改' }, screws: 5, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 70,
		name: '三式指揮連絡機(対潜)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 451, name: '三式指揮連絡機改' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 71,
		name: '10cm連装高角砲(砲架)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 275, name: '10cm連装高角砲改＋増設機銃' }, screws: 10, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 72,
		name: '増設バルジ(中型艦)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 203, name: '艦本新設計 増設バルジ(中型艦)' }, screws: 8, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 73,
		name: '増設バルジ(大型艦)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 204, name: '艦本新設計 増設バルジ(大型艦)' }, screws: 8, certainScrews: 12 },
					{ to: { id: 136, name: 'プリエーゼ式水中防御隔壁' }, screws: 7, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 74,
		name: '探照灯',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 140, name: '96式150cm探照灯' }, screws: 3, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 76,
		name: '38cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 114, name: '38cm連装砲改' }, screws: 6, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 78,
		name: '12.7cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 79,
		name: '瑞雲(六三四空)',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 81, name: '瑞雲12型(六三四空)' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 80,
		name: '瑞雲12型',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 81, name: '瑞雲12型(六三四空)' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 81,
		name: '瑞雲12型(六三四空)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 237, name: '瑞雲(六三四空/熟練)' }, screws: 7, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 82,
		name: '九七式艦攻(九三一空)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 344, name: '九七式艦攻改 試製三号戊型(空六号電探改装備機)' }, screws: 7, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 84,
		name: '2cm 四連装FlaK 38',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 87,
		name: '新型高温高圧缶',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 10 },
			toTen: { status: 'available', screws: 9, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 88,
		name: '22号対水上電探改四',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 89,
		name: '21号対空電探改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 90,
		name: '20.3cm(2号)連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 50, name: '20.3cm(3号)連装砲' }, screws: 4, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 91,
		name: '12.7cm連装高角砲(後期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 380, name: '12.7cm連装高角砲改二' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 92,
		name: '毘式40mm連装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 191, name: 'QF 2ポンド8連装ポンポン砲' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 93,
		name: '九七式艦攻(友永隊)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 94, name: '天山一二型(友永隊)' }, screws: 6, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 94,
		name: '天山一二型(友永隊)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 570, name: '流星改(友永隊)' }, screws: 18, certainScrews: 27 },
				],
			},
		},
	},
	{
		id: 95,
		name: '潜水艦53cm艦首魚雷(8門)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 383, name: '後期型53cm艦首魚雷(8門)' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 96,
		name: '零式艦戦21型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 182, name: '零式艦戦32型(熟練)' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 98,
		name: '九七式艦攻(熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 345, name: '九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 99,
		name: '九九式艦爆(江草隊)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 100, name: '彗星(江草隊)' }, screws: 10, certainScrews: 20 },
				],
			},
		},
	},
	{
		id: 102,
		name: '九八式水上偵察機(夜偵)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 103,
		name: '試製35.6cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 328, name: '35.6cm連装砲改' }, screws: 12, certainScrews: 15 },
					{ to: { id: 289, name: '35.6cm三連装砲改(ダズル迷彩仕様)' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 104,
		name: '35.6cm連装砲(ダズル迷彩)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 289, name: '35.6cm三連装砲改(ダズル迷彩仕様)' }, screws: 8, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 105,
		name: '試製41cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 236, name: '41cm三連装砲改' }, screws: 12, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 106,
		name: '13号対空電探改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 450, name: '13号対空電探改(後期型)' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 109,
		name: '零戦52型丙(六〇一空)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 110,
		name: '烈風(六〇一空)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 114,
		name: '38cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 115,
		name: 'Ar196改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 116,
		name: '一式徹甲弾',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 365, name: '一式徹甲弾改' }, screws: 6, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 117,
		name: '試製46cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 9, name: '46cm三連装砲' }, screws: 8, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 118,
		name: '紫雲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 119,
		name: '14cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 310, name: '14cm連装砲改' }, screws: 8, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 120,
		name: '91式高射装置',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 121, name: '94式高射装置' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 121,
		name: '94式高射装置',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 122, name: '10cm連装高角砲＋高射装置' }, screws: 5, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 122,
		name: '10cm連装高角砲＋高射装置',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 533, name: '10cm連装高角砲改+高射装置改' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 123,
		name: 'SKC34 20.3cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 124,
		name: 'FuMO25 レーダー',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 125,
		name: '61cm三連装(酸素)魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 285, name: '61cm三連装(酸素)魚雷後期型' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 128,
		name: '試製51cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 281, name: '51cm連装砲' }, screws: 15, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 129,
		name: '熟練見張員',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 130,
		name: '12.7cm高角砲＋高射装置',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 131,
		name: '25mm三連装機銃 集中配備',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 132,
		name: '零式水中聴音機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 133,
		name: '381mm/50 三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 137, name: '381mm/50 三連装砲改' }, screws: 7, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 134,
		name: 'OTO 152mm三連装速射砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 135,
		name: '90mm単装高角砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 136,
		name: 'プリエーゼ式水中防御隔壁',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 137,
		name: '381mm/50 三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 139,
		name: '15.2cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 407, name: '15.2cm連装砲改二' }, screws: 5, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 140,
		name: '96式150cm探照灯',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 141,
		name: '32号対水上電探改',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 142,
		name: '15m二重測距儀+21号電探改二',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 460, name: '15m二重測距儀改+21号電探改二+熟練射撃指揮所' }, screws: 9, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 145,
		name: '戦闘糧食',
		cost: {
			toSix: { status: 'available', screws: 0, certainScrews: 0 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 241, name: '戦闘糧食(特別なおにぎり)' }, screws: 0, certainScrews: 1 },
				],
			},
		},
	},
	{
		id: 147,
		name: '120mm/50 連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 393, name: '120mm/50 連装砲 mod.1936' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 149,
		name: '四式水中聴音機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 151,
		name: '試製景雲(艦偵型)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 8 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 199, name: '噴式景雲改' }, screws: 10, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 152,
		name: '零式艦戦52型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 153,
		name: '零戦52型丙(付岩井小隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 154,
		name: '零戦62型(爆戦／岩井隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 156,
		name: '零戦52型甲(付岩本小隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 157,
		name: '零式艦戦53型(岩本隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 158,
		name: 'Bf109T改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 560, name: 'Bf109 T-3(G)' }, screws: 10, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 161,
		name: '16inch三連装砲 Mk.7',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 183, name: '16inch三連装砲 Mk.7+GFCS' }, screws: 12, certainScrews: 20 },
				],
			},
		},
	},
	{
		id: 162,
		name: '203mm/53 連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 163,
		name: 'Ro.43水偵',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 164, name: 'Ro.44水上戦闘機' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 164,
		name: 'Ro.44水上戦闘機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 215, name: 'Ro.44水上戦闘機bis' }, screws: 8, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 165,
		name: '二式水戦改',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 217, name: '強風改' }, screws: 9, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 166,
		name: '大発動艇(八九式中戦車&陸戦隊)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 167, name: '特二式内火艇' }, screws: 5, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 167,
		name: '特二式内火艇',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 525, name: '特四式内火艇' }, screws: 9, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 168,
		name: '九六式陸攻',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 169, name: '一式陸攻' }, screws: 4, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 169,
		name: '一式陸攻',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 180, name: '一式陸攻 二二型甲' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 170,
		name: '一式陸攻(野中隊)',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 171,
		name: 'OS2U',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 172,
		name: '5inch連装砲 Mk.28 mod.2',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 174,
		name: '53cm連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 175,
		name: '雷電',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 176,
		name: '三式戦 飛燕',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 185, name: '三式戦 飛燕一型丁' }, screws: 6, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 179,
		name: '試製61cm六連装(酸素)魚雷',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 180,
		name: '一式陸攻 二二型甲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 186, name: '一式陸攻 三四型' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 181,
		name: '零式艦戦32型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 21, name: '零式艦戦52型' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 182,
		name: '零式艦戦32型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 152, name: '零式艦戦52型(熟練)' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 183,
		name: '16inch三連装砲 Mk.7+GFCS',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 12 },
			toTen: { status: 'available', screws: 8, certainScrews: 16 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 184,
		name: 'Re.2001 OR改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 316, name: 'Re.2001 CB改' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 185,
		name: '三式戦 飛燕一型丁',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 177, name: '三式戦 飛燕(飛行第244戦隊)' }, screws: 9, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 186,
		name: '一式陸攻 三四型',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 187,
		name: '銀河',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 504, name: '銀河(熟練)' }, screws: 11, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 189,
		name: 'Re.2005 改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 190,
		name: '38.1cm Mk.I連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 192, name: '38.1cm Mk.I/N連装砲改' }, screws: 6, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 192,
		name: '38.1cm Mk.I/N連装砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 193,
		name: '特大発動艇',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 194,
		name: 'Laté 298B',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 195,
		name: 'SBD',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 419, name: 'SBD-5' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 196,
		name: 'TBD',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 256, name: 'TBF' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 197,
		name: 'F4F-3',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 198, name: 'F4F-4' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 198,
		name: 'F4F-4',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 205, name: 'F6F-3' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 201,
		name: '紫電一一型',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 202, name: '紫電二一型 紫電改' }, screws: 7, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 202,
		name: '紫電二一型 紫電改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 263, name: '紫電改(三四三空) 戦闘301' }, screws: 13, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 203,
		name: '艦本新設計 増設バルジ(中型艦)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 9 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 204,
		name: '艦本新設計 増設バルジ(大型艦)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 9 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 205,
		name: 'F6F-3',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 206, name: 'F6F-5' }, screws: 8, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 206,
		name: 'F6F-5',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 210,
		name: '潜水艦搭載電探＆水防式望遠鏡',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 9 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 211, name: '潜水艦搭載電探＆逆探(E27)' }, screws: 10, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 211,
		name: '潜水艦搭載電探＆逆探(E27)',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 9 },
			toTen: { status: 'available', screws: 9, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 213,
		name: '後期型艦首魚雷(6門)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 215,
		name: 'Ro.44水上戦闘機bis',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 216,
		name: '二式水戦改(熟練)',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 217,
		name: '強風改',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 8 },
			toTen: { status: 'available', screws: 7, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 219,
		name: '零式艦戦63型(爆戦)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 220,
		name: '8cm高角砲改＋増設機銃',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 221,
		name: '一式戦 隼II型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 222, name: '一式戦 隼III型甲' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 222,
		name: '一式戦 隼III型甲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 224,
		name: '爆装一式戦 隼III型改(65戦隊)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 226,
		name: '九五式爆雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 227, name: '二式爆雷' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 227,
		name: '二式爆雷',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 228,
		name: '九六式艦戦改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 229,
		name: '12.7cm単装高角砲(後期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 379, name: '12.7cm単装高角砲改二' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 231,
		name: '30.5cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 232, name: '30.5cm三連装砲改' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 232,
		name: '30.5cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 233,
		name: 'F4U-1D',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 473, name: 'F4U-2 Night Corsair' }, screws: 8, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 234,
		name: '15.5cm三連装副砲改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 235, name: '15.5cm三連装砲改' }, screws: 2, certainScrews: 3 },
					{ to: { id: 463, name: '15.5cm三連装副砲改二' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 235,
		name: '15.5cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 234, name: '15.5cm三連装副砲改' }, screws: 2, certainScrews: 3 },
				],
			},
		},
	},
	{
		id: 236,
		name: '41cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 290, name: '41cm三連装砲改二' }, screws: 14, certainScrews: 20 },
					{ to: { id: 318, name: '41cm連装砲改二' }, screws: 13, certainScrews: 19 },
				],
			},
		},
	},
	{
		id: 237,
		name: '瑞雲(六三四空/熟練)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 322, name: '瑞雲改二(六三四空)' }, screws: 9, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 238,
		name: '零式水上偵察機11型乙',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 240,
		name: '22号対水上電探改四(後期調整型)',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 242,
		name: 'Swordfish',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 243, name: 'Swordfish Mk.II(熟練)' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 243,
		name: 'Swordfish Mk.II(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 245,
		name: '38cm四連装砲',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 246, name: '38cm四連装砲改' }, screws: 13, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 246,
		name: '38cm四連装砲改',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 468, name: '38cm四連装砲改 deux' }, screws: 16, certainScrews: 21 },
				],
			},
		},
	},
	{
		id: 247,
		name: '15.2cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 248,
		name: 'Skua',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 249,
		name: 'Fulmar',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 423, name: 'Fulmar(戦闘偵察/熟練)' }, screws: 5, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 250,
		name: 'Spitfire Mk.I',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 251, name: 'Spitfire Mk.V' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 251,
		name: 'Spitfire Mk.V',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 252, name: 'Seafire Mk.III改' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 252,
		name: 'Seafire Mk.III改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 256,
		name: 'TBF',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 260,
		name: 'Type124 ASDIC',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 261, name: 'Type144/147 ASDIC' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 261,
		name: 'Type144/147 ASDIC',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 266,
		name: '12.7cm連装砲C型改二',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 267, name: '12.7cm連装砲D型改二' }, screws: 4, certainScrews: 8 },
					{ to: { id: 470, name: '12.7cm連装砲C型改三' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 267,
		name: '12.7cm連装砲D型改二',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 271,
		name: '紫電改四',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 274,
		name: '12cm30連装噴進砲改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 275,
		name: '10cm連装高角砲改＋増設機銃',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 276,
		name: '46cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 8, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 128, name: '試製51cm連装砲' }, screws: 13, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 277,
		name: 'FM-2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 233, name: 'F4U-1D' }, screws: 10, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 278,
		name: 'SKレーダー',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 279, name: 'SK＋SGレーダー' }, screws: 18, certainScrews: 30 },
				],
			},
		},
	},
	{
		id: 279,
		name: 'SK＋SGレーダー',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 280,
		name: 'QF 4.7inch砲 Mk.XII改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 281,
		name: '51cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 10, certainScrews: 13 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 282,
		name: '130mm B-13連装砲',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 283,
		name: '533mm 三連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 284,
		name: '5inch単装砲 Mk.30',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 313, name: '5inch単装砲 Mk.30改' }, screws: 8, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 285,
		name: '61cm三連装(酸素)魚雷後期型',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 286,
		name: '61cm四連装(酸素)魚雷後期型',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 287,
		name: '三式爆雷投射機 集中配備',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 288,
		name: '試製15cm9連装対潜噴進砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 8, certainScrews: 13 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 289,
		name: '35.6cm三連装砲改(ダズル迷彩仕様)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 502, name: '35.6cm連装砲改三(ダズル迷彩仕様)' }, screws: 12, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 290,
		name: '41cm三連装砲改二',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 10, certainScrews: 13 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 293,
		name: '12cm単装砲改二',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 294,
		name: '12.7cm連装砲A型改二',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 455, name: '試製 長12.7cm連装砲A型改四' }, screws: 6, certainScrews: 8 },
					{ to: { id: 295, name: '12.7cm連装砲A型改三(戦時改修)＋高射装置' }, screws: 8, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 295,
		name: '12.7cm連装砲A型改三(戦時改修)＋高射装置',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 296,
		name: '12.7cm連装砲B型改四(戦時改修)＋高射装置',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 297,
		name: '12.7cm連装砲A型',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 294, name: '12.7cm連装砲A型改二' }, screws: 3, certainScrews: 5, note: '秘書: 吹雪' },
					{ to: { id: 294, name: '12.7cm連装砲A型改二' }, screws: 3, certainScrews: 6, note: '秘書: 浦波' },
				],
			},
		},
	},
	{
		id: 298,
		name: '16inch Mk.I三連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 299, name: '16inch Mk.I三連装砲＋AFCT改' }, screws: 12, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 299,
		name: '16inch Mk.I三連装砲＋AFCT改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 300, name: '16inch Mk.I三連装砲改＋FCR type284' }, screws: 14, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 300,
		name: '16inch Mk.I三連装砲改＋FCR type284',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 303,
		name: 'Bofors15.2cm連装砲 Model1930',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 304,
		name: 'S9 Osprey',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 368, name: 'Swordfish Mk.III改(水上機型)' }, screws: 9, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 309,
		name: '甲標的 丙型',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 310,
		name: '14cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 518, name: '14cm連装砲改二' }, screws: 9, certainScrews: 16 },
				],
			},
		},
	},
	{
		id: 313,
		name: '5inch単装砲 Mk.30改',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 11 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 308, name: '5inch単装砲 Mk.30改＋GFCS Mk.37' }, screws: 13, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 314,
		name: '533mm五連装魚雷(初期型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 376, name: '533mm五連装魚雷(後期型)' }, screws: 9, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 315,
		name: 'SG レーダー(初期型)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 456, name: 'SG レーダー(後期型)' }, screws: 9, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 316,
		name: 'Re.2001 CB改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 189, name: 'Re.2005 改' }, screws: 9, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 317,
		name: '三式弾改',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 318,
		name: '41cm連装砲改二',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 10, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 322,
		name: '瑞雲改二(六三四空)',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 12 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 490, name: '試製 夜間瑞雲(攻撃装備)' }, screws: 10, certainScrews: 17 },
				],
			},
		},
	},
	{
		id: 324,
		name: 'オ号観測機改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 325, name: 'オ号観測機改二' }, screws: 7, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 325,
		name: 'オ号観測機改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 326, name: 'S-51J' }, screws: 10, certainScrews: 20 },
				],
			},
		},
	},
	{
		id: 326,
		name: 'S-51J',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 327, name: 'S-51J改' }, screws: 10, certainScrews: 20 },
				],
			},
		},
	},
	{
		id: 327,
		name: 'S-51J改',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 328,
		name: '35.6cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 329, name: '35.6cm連装砲改二' }, screws: 8, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 329,
		name: '35.6cm連装砲改二',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 330,
		name: '16inch Mk.I連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 331, name: '16inch Mk.V連装砲' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 331,
		name: '16inch Mk.V連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 332, name: '16inch Mk.VIII連装砲改' }, screws: 7, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 332,
		name: '16inch Mk.VIII連装砲改',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 340,
		name: '152mm／55 三連装速射砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 341, name: '152mm／55 三連装速射砲改' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 341,
		name: '152mm／55 三連装速射砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 344,
		name: '九七式艦攻改 試製三号戊型(空六号電探改装備機)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 373, name: '天山一二型甲改(空六号電探改装備機)' }, screws: 11, certainScrews: 22 },
				],
			},
		},
	},
	{
		id: 346,
		name: '二式12cm迫撃砲改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 347, name: '二式12cm迫撃砲改 集中配備' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 348,
		name: '艦載型 四式20cm対地噴進砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 349, name: '四式20cm対地噴進砲 集中配備' }, screws: 7, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 356,
		name: '8inch三連装砲 Mk.9',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 357, name: '8inch三連装砲 Mk.9 mod.2' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 357,
		name: '8inch三連装砲 Mk.9 mod.2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 365,
		name: '一式徹甲弾改',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 367,
		name: 'Swordfish(水上機型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 370, name: 'Swordfish Mk.II改(水偵型)' }, screws: 6, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 368,
		name: 'Swordfish Mk.III改(水上機型)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 370,
		name: 'Swordfish Mk.II改(水偵型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 371,
		name: 'Fairey Seafox改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 372,
		name: '天山一二型甲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 379,
		name: '12.7cm単装高角砲改二',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 572, name: '12.7cm単装高角砲改三' }, screws: 7, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 381,
		name: '16inch三連装砲 Mk.6',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 385, name: '16inch三連装砲 Mk.6 mod.2' }, screws: 7, certainScrews: 13 },
				],
			},
		},
	},
	{
		id: 382,
		name: '12cm単装高角砲E型',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 509, name: '12cm単装高角砲E型改' }, screws: 3, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 383,
		name: '後期型53cm艦首魚雷(8門)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 385,
		name: '16inch三連装砲 Mk.6 mod.2',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 386,
		name: '6inch三連装速射砲 Mk.16',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 387, name: '6inch三連装速射砲 Mk.16 mod.2' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 387,
		name: '6inch三連装速射砲 Mk.16 mod.2',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 391,
		name: '九九式艦爆二二型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 392, name: '九九式艦爆二二型(熟練)' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 392,
		name: '九九式艦爆二二型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 393,
		name: '120mm/50 連装砲 mod.1936',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 394, name: '120mm/50 連装砲改 A.mod.1937' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 394,
		name: '120mm/50 連装砲改 A.mod.1937',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 395,
		name: '深山',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 397,
		name: '現地改装12.7cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 398,
		name: '現地改装10cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 399,
		name: '6inch Mk.XXIII三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 400,
		name: '533mm 三連装魚雷(53-39型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 401,
		name: 'Do 17 Z-2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 405, name: 'Do 217 E-5＋Hs293初期型' }, screws: 11, certainScrews: 19 },
				],
			},
		},
	},
	{
		id: 403,
		name: '四式重爆 飛龍',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 404, name: '四式重爆 飛龍(熟練)' }, screws: 8, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 407,
		name: '15.2cm連装砲改二',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 408,
		name: '装甲艇(AB艇)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 409,
		name: '武装大発',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 410,
		name: '21号対空電探改二',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 411,
		name: '42号対空電探改二',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 414,
		name: 'SOC Seagull',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 415, name: 'SO3C Seamew改' }, screws: 7, certainScrews: 11 },
					{ to: { id: 539, name: 'SOC Seagull 後期型(熟練)' }, screws: 7, certainScrews: 12 },
				],
			},
		},
	},
	{
		id: 419,
		name: 'SBD-5',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 420, name: 'SB2C-3' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 420,
		name: 'SB2C-3',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 421, name: 'SB2C-5' }, screws: 7, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 421,
		name: 'SB2C-5',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 422,
		name: 'FR-1 Fireball',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 14 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 423,
		name: 'Fulmar(戦闘偵察/熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 424,
		name: 'Barracuda Mk.II',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 425, name: 'Barracuda Mk.III' }, screws: 7, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 425,
		name: 'Barracuda Mk.III',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 426,
		name: '305mm/46 連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 428, name: '320mm/44 連装砲' }, screws: 6, certainScrews: 9 },
				],
			},
		},
	},
	{
		id: 427,
		name: '305mm/46 三連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 429, name: '320mm/44 三連装砲' }, screws: 8, certainScrews: 11 },
				],
			},
		},
	},
	{
		id: 428,
		name: '320mm/44 連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 429,
		name: '320mm/44 三連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 431,
		name: 'SM.79',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 432, name: 'SM.79 bis' }, screws: 4, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 432,
		name: 'SM.79 bis',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 438,
		name: '三式水中探信儀改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 440,
		name: '21inch艦首魚雷発射管6門(初期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 441, name: '21inch艦首魚雷発射管6門(後期型)' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 441,
		name: '21inch艦首魚雷発射管6門(後期型)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 442,
		name: '潜水艦後部魚雷発射管4門(初期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 443, name: '潜水艦後部魚雷発射管4門(後期型)' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 445,
		name: '二式複戦 屠龍',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 446, name: '二式複戦 屠龍 丙型' }, screws: 4, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 446,
		name: '二式複戦 屠龍 丙型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 452, name: 'キ96' }, screws: 5, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 447,
		name: '零式艦戦64型(複座KMX搭載機)',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 450,
		name: '13号対空電探改(後期型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 451,
		name: '三式指揮連絡機改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 452,
		name: 'キ96',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 453, name: 'キ102乙' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 455,
		name: '試製 長12.7cm連装砲A型改四',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 457,
		name: '後期型艦首魚雷(4門)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 464,
		name: '10cm連装高角砲群 集中配備',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 468,
		name: '38cm四連装砲改 deux',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 9 },
			toTen: { status: 'available', screws: 9, certainScrews: 13 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 470,
		name: '12.7cm連装砲C型改三',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 529, name: '12.7cm連装砲C型改三H' }, screws: 9, certainScrews: 15 },
				],
			},
		},
	},
	{
		id: 471,
		name: 'Loire 130M',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 473,
		name: 'F4U-2 Night Corsair',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 12 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 474, name: 'F4U-4' }, screws: 9, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 474,
		name: 'F4U-4',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 14 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 478,
		name: '熟練甲板要員＋航空整備員',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 483,
		name: '三式弾改二',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 485,
		name: '強風改二',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 486,
		name: '零式艦戦64型(制空戦闘機仕様)',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 487, name: '零式艦戦64型(熟練爆戦)' }, screws: 9, certainScrews: 14 },
				],
			},
		},
	},
	{
		id: 487,
		name: '零式艦戦64型(熟練爆戦)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 488,
		name: '二式爆雷改二',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 489,
		name: '一式戦 隼II型改(20戦隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 492,
		name: '零戦52型丙(八幡部隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 493,
		name: '一式陸攻(八幡部隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 496,
		name: '陸軍歩兵部隊',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 500,
		name: '発煙装置(煙幕)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 502,
		name: '35.6cm連装砲改三(ダズル迷彩仕様)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 507,
		name: '14inch/45 連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 508,
		name: '14inch/45 三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 509,
		name: '12cm単装高角砲E型改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 511,
		name: '21inch艦首魚雷発射管4門(初期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 512, name: '21inch艦首魚雷発射管4門(後期型)' }, screws: 4, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 512,
		name: '21inch艦首魚雷発射管4門(後期型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 517,
		name: '逆探(E27)＋22号対水上電探改四(後期調整型)',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 518,
		name: '14cm連装砲改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 519,
		name: 'SJレーダー+潜水艦司令塔装備',
		cost: {
			toSix: { status: 'available', screws: 9, certainScrews: 10 },
			toTen: { status: 'available', screws: 10, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 520,
		name: '試製20.3cm(4号)連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 522,
		name: '零式小型水上機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 523, name: '零式小型水上機(熟練)' }, screws: 4, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 523,
		name: '零式小型水上機(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 524,
		name: '12cm単装高角砲＋25mm機銃増備',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 529,
		name: '12.7cm連装砲C型改三H',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 5 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 530,
		name: '35.6cm連装砲改三丙',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 531,
		name: '艦隊通信アンテナ',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 533,
		name: '10cm連装高角砲改+高射装置改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 534,
		name: '13.8cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 535, name: '13.8cm連装砲改' }, screws: 6, certainScrews: 8 },
				],
			},
		},
	},
	{
		id: 535,
		name: '13.8cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 536,
		name: '15.2cm三連装主砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 537, name: '15.2cm三連装主砲改' }, screws: 7, certainScrews: 10 },
				],
			},
		},
	},
	{
		id: 537,
		name: '15.2cm三連装主砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 539,
		name: 'SOC Seagull 後期型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 541,
		name: 'SBD(Yellow Wings)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 544, name: 'SBD VB-2(爆撃飛行隊)' }, screws: 4, certainScrews: 5 },
				],
			},
		},
	},
	{
		id: 542,
		name: 'TBD(Yellow Wings)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 543,
		name: 'SBD VS-2(偵察飛行隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 544,
		name: 'SBD VB-2(爆撃飛行隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 546,
		name: '試製 震電(局地戦闘機)',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 547,
		name: '震電改二(艦戦型改二)',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 9 },
			toTen: { status: 'available', screws: 9, certainScrews: 13 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 549,
		name: '三式指揮連絡機改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 550,
		name: '試製 明星(増加試作機)',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 551, name: '明星改' }, screws: 3, certainScrews: 6 },
				],
			},
		},
	},
	{
		id: 551,
		name: '明星改',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 552, name: '九九式練爆二二型改(夜間装備実験機)' }, screws: 4, certainScrews: 7 },
				],
			},
		},
	},
	{
		id: 552,
		name: '九九式練爆二二型改(夜間装備実験機)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 553,
		name: '10cm連装高角砲改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 533, name: '10cm連装高角砲改+高射装置改' }, screws: 14, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 555,
		name: '18cm/57 三連装主砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 564,
		name: '21cm単装主砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 565,
		name: '15cm単装副砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 570,
		name: '流星改(友永隊)',
		cost: {
			toSix: { status: 'available', screws: 8, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 11 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 572,
		name: '12.7cm単装高角砲改三',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 573,
		name: '試製 23号電探改三',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: {
				status: 'available',
				upgrades: [
					{ to: { id: 574, name: 'SCレーダー改(後期調整型)' }, screws: 13, certainScrews: 18 },
				],
			},
		},
	},
	{
		id: 574,
		name: 'SCレーダー改(後期調整型)',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 9, certainScrews: 12 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 575,
		name: '25mm連装機銃(熟練機銃員分隊)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
] satisfies Equipment[];
