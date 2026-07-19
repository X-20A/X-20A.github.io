import type { Equipment } from './types';

/**
 * 改修工廠のネジ消費データ。改修可能な装備のみを収録する。
 * satisfies により、各エントリの構造は vue-tsc で検証される。
 */
export const IMPROVEMENT_DATAS = [
	{
		id: 1,
		name: '12cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 2, certainScrews: 6 },
		},
	},
	{
		id: 2,
		name: '12.7cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 3, certainScrews: 6 },
		},
	},
	{
		id: 3,
		name: '10cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 10 },
		},
	},
	{
		id: 4,
		name: '14cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 3, certainScrews: 6 },
		},
	},
	{
		id: 5,
		name: '15.5cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 8 },
		},
	},
	{
		id: 6,
		name: '20.3cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'available', screws: 4, certainScrews: 10 },
		},
	},
	{
		id: 7,
		name: '35.6cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 5, certainScrews: 12 },
		},
	},
	{
		id: 8,
		name: '41cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'available', screws: 10, certainScrews: 15 },
		},
	},
	{
		id: 9,
		name: '46cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'available', screws: 12, certainScrews: 16 },
		},
	},
	{
		id: 10,
		name: '12.7cm連装高角砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 6, certainScrews: 10 },
		},
	},
	{
		id: 11,
		name: '15.2cm単装砲',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 12,
		name: '15.5cm三連装副砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 8 },
		},
	},
	{
		id: 13,
		name: '61cm三連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 2, certainScrews: 4 },
		},
	},
	{
		id: 14,
		name: '61cm四連装魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 3, certainScrews: 6 },
		},
	},
	{
		id: 15,
		name: '61cm四連装(酸素)魚雷',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 5, certainScrews: 11 },
		},
	},
	{
		id: 16,
		name: '九七式艦攻',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 2, certainScrews: 4 },
		},
	},
	{
		id: 17,
		name: '天山',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 7 },
		},
	},
	{
		id: 18,
		name: '流星',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 19,
		name: '九六式艦戦',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: { status: 'available', screws: 2, certainScrews: 4 },
		},
	},
	{
		id: 20,
		name: '零式艦戦21型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 21,
		name: '零式艦戦52型',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 23,
		name: '九九式艦爆',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 24,
		name: '彗星',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
		},
	},
	{
		id: 25,
		name: '零式水上偵察機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 10 },
		},
	},
	{
		id: 26,
		name: '瑞雲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
		},
	},
	{
		id: 27,
		name: '13号対空電探',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 12 },
		},
	},
	{
		id: 28,
		name: '22号対水上電探',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 8, certainScrews: 14 },
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
			upgrade: { status: 'available', screws: 5, certainScrews: 13 },
		},
	},
	{
		id: 31,
		name: '32号対水上電探',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'available', screws: 10, certainScrews: 15 },
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
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
		},
	},
	{
		id: 35,
		name: '三式弾',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 8, certainScrews: 10 },
		},
	},
	{
		id: 36,
		name: '九一式徹甲弾',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 4, certainScrews: 9 },
		},
	},
	{
		id: 37,
		name: '7.7mm機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: { status: 'available', screws: 1, certainScrews: 2 },
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
			upgrade: { status: 'available', screws: 1, certainScrews: 2 },
		},
	},
	{
		id: 40,
		name: '25mm三連装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 3, certainScrews: 7 },
		},
	},
	{
		id: 41,
		name: '甲標的 甲型',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 8 },
		},
	},
	{
		id: 44,
		name: '九四式爆雷投射機',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 1, certainScrews: 3 },
			upgrade: { status: 'available', screws: 3, certainScrews: 8 },
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
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 47,
		name: '三式水中探信儀',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 49,
		name: '25mm単装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: { status: 'available', screws: 1, certainScrews: 2 },
		},
	},
	{
		id: 50,
		name: '20.3cm(3号)連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 8, certainScrews: 14 },
		},
	},
	{
		id: 51,
		name: '12cm30連装噴進砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
		},
	},
	{
		id: 52,
		name: '流星改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
		},
	},
	{
		id: 55,
		name: '紫電改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 9 },
		},
	},
	{
		id: 57,
		name: '彗星一二型甲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: 7 },
		},
	},
	{
		id: 65,
		name: '15.2cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 10 },
		},
	},
	{
		id: 66,
		name: '8cm高角砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
		},
	},
	{
		id: 68,
		name: '大発動艇',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'available', screws: 3, certainScrews: 7 },
		},
	},
	{
		id: 69,
		name: 'カ号観測機',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 5, certainScrews: 10 },
		},
	},
	{
		id: 70,
		name: '三式指揮連絡機(対潜)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 71,
		name: '10cm連装高角砲(砲架)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 10, certainScrews: 13 },
		},
	},
	{
		id: 72,
		name: '増設バルジ(中型艦)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
		},
	},
	{
		id: 73,
		name: '増設バルジ(大型艦)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 9 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
		},
	},
	{
		id: 74,
		name: '探照灯',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 3, certainScrews: 7 },
		},
	},
	{
		id: 76,
		name: '38cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 13 },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
		},
	},
	{
		id: 80,
		name: '瑞雲12型',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'available', screws: 7, certainScrews: 9 },
		},
	},
	{
		id: 81,
		name: '瑞雲12型(六三四空)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 11 },
		},
	},
	{
		id: 82,
		name: '九七式艦攻(九三一空)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 7, certainScrews: 13 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: 11 },
		},
	},
	{
		id: 91,
		name: '12.7cm連装高角砲(後期型)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 92,
		name: '毘式40mm連装機銃',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 1 },
			toTen: { status: 'available', screws: 1, certainScrews: 2 },
			upgrade: { status: 'available', screws: 3, certainScrews: 6 },
		},
	},
	{
		id: 93,
		name: '九七式艦攻(友永隊)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
			upgrade: { status: 'available', screws: 6, certainScrews: 14 },
		},
	},
	{
		id: 95,
		name: '潜水艦53cm艦首魚雷(8門)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 96,
		name: '零式艦戦21型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 5 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 98,
		name: '九七式艦攻(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 7, certainScrews: 9 },
		},
	},
	{
		id: 99,
		name: '九九式艦爆(江草隊)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 10, certainScrews: 20 },
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
			upgrade: { status: 'available', screws: 12, certainScrews: 15 },
		},
	},
	{
		id: 104,
		name: '35.6cm連装砲(ダズル迷彩)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 8, certainScrews: 13 },
		},
	},
	{
		id: 105,
		name: '試製41cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 6 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
			upgrade: { status: 'available', screws: 12, certainScrews: 16 },
		},
	},
	{
		id: 106,
		name: '13号対空電探改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 8 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 15 },
		},
	},
	{
		id: 117,
		name: '試製46cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 5 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'available', screws: 8, certainScrews: 14 },
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
			upgrade: { status: 'available', screws: 8, certainScrews: 14 },
		},
	},
	{
		id: 120,
		name: '91式高射装置',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 7 },
		},
	},
	{
		id: 121,
		name: '94式高射装置',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 10 },
		},
	},
	{
		id: 122,
		name: '10cm連装高角砲＋高射装置',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 128,
		name: '試製51cm連装砲',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: { status: 'available', screws: 15, certainScrews: 18 },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 14 },
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
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'available', screws: 5, certainScrews: 11 },
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
			upgrade: { status: 'available', screws: 9, certainScrews: 13 },
		},
	},
	{
		id: 145,
		name: '戦闘糧食',
		cost: {
			toSix: { status: 'available', screws: 0, certainScrews: 0 },
			toTen: { status: 'available', screws: 1, certainScrews: 1 },
			upgrade: { status: 'available', screws: 0, certainScrews: 1 },
		},
	},
	{
		id: 147,
		name: '120mm/50 連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
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
			upgrade: { status: 'available', screws: 10, certainScrews: 13 },
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
		id: 161,
		name: '16inch三連装砲 Mk.7',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 12 },
			upgrade: { status: 'available', screws: 12, certainScrews: 20 },
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
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 164,
		name: 'Ro.44水上戦闘機',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
		},
	},
	{
		id: 165,
		name: '二式水戦改',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'available', screws: 9, certainScrews: 16 },
		},
	},
	{
		id: 166,
		name: '大発動艇(八九式中戦車&陸戦隊)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 9 },
		},
	},
	{
		id: 167,
		name: '特二式内火艇',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 9, certainScrews: 17 },
		},
	},
	{
		id: 168,
		name: '九六式陸攻',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 5 },
		},
	},
	{
		id: 169,
		name: '一式陸攻',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 9 },
		},
	},
	{
		id: 181,
		name: '零式艦戦32型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 182,
		name: '零式艦戦32型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 185,
		name: '三式戦 飛燕一型丁',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 9, certainScrews: 16 },
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
			upgrade: { status: 'available', screws: 11, certainScrews: 17 },
		},
	},
	{
		id: 190,
		name: '38.1cm Mk.I連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 12 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 196,
		name: 'TBD',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
		},
	},
	{
		id: 197,
		name: 'F4F-3',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 198,
		name: 'F4F-4',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 201,
		name: '紫電一一型',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'available', screws: 7, certainScrews: 12 },
		},
	},
	{
		id: 202,
		name: '紫電二一型 紫電改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'available', screws: 13, certainScrews: 17 },
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
			upgrade: { status: 'available', screws: 8, certainScrews: 16 },
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
			upgrade: { status: 'available', screws: 10, certainScrews: 15 },
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
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 221,
		name: '一式戦 隼II型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 3, certainScrews: 6 },
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
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 231,
		name: '30.5cm三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
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
		id: 234,
		name: '15.5cm三連装副砲改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 2, certainScrews: 3 },
		},
	},
	{
		id: 235,
		name: '15.5cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 2, certainScrews: 3 },
		},
	},
	{
		id: 236,
		name: '41cm三連装砲改',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 10 },
			upgrade: { status: 'available', screws: 14, certainScrews: 20 },
		},
	},
	{
		id: 237,
		name: '瑞雲(六三四空/熟練)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'available', screws: 9, certainScrews: 16 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 13, certainScrews: 17 },
		},
	},
	{
		id: 246,
		name: '38cm四連装砲改',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 8 },
			toTen: { status: 'available', screws: 8, certainScrews: 10 },
			upgrade: { status: 'available', screws: 16, certainScrews: 21 },
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
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 250,
		name: 'Spitfire Mk.I',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
		},
	},
	{
		id: 251,
		name: 'Spitfire Mk.V',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 7, certainScrews: null },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: 8 },
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
			upgrade: { status: 'available', screws: 13, certainScrews: 17 },
		},
	},
	{
		id: 277,
		name: 'FM-2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 3, certainScrews: 6 },
			upgrade: { status: 'available', screws: 10, certainScrews: 17 },
		},
	},
	{
		id: 278,
		name: 'SKレーダー',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'available', screws: 18, certainScrews: 30 },
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
			upgrade: { status: 'available', screws: 8, certainScrews: 10 },
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
		id: 289,
		name: '35.6cm三連装砲改(ダズル迷彩仕様)',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'available', screws: 12, certainScrews: 16 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
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
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
		},
	},
	{
		id: 298,
		name: '16inch Mk.I三連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 12, certainScrews: 16 },
		},
	},
	{
		id: 299,
		name: '16inch Mk.I三連装砲＋AFCT改',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 14, certainScrews: 18 },
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
			upgrade: { status: 'available', screws: 9, certainScrews: 17 },
		},
	},
	{
		id: 310,
		name: '14cm連装砲改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 9, certainScrews: 16 },
		},
	},
	{
		id: 313,
		name: '5inch単装砲 Mk.30改',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 8, certainScrews: 11 },
			upgrade: { status: 'available', screws: 13, certainScrews: 18 },
		},
	},
	{
		id: 314,
		name: '533mm五連装魚雷(初期型)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 9, certainScrews: 15 },
		},
	},
	{
		id: 315,
		name: 'SG レーダー(初期型)',
		cost: {
			toSix: { status: 'available', screws: 6, certainScrews: 6 },
			toTen: { status: 'available', screws: 7, certainScrews: 8 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 316,
		name: 'Re.2001 CB改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'available', screws: 9, certainScrews: 17 },
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
			upgrade: { status: 'available', screws: 10, certainScrews: 17 },
		},
	},
	{
		id: 324,
		name: 'オ号観測機改',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 7, certainScrews: 14 },
		},
	},
	{
		id: 325,
		name: 'オ号観測機改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'available', screws: 10, certainScrews: 20 },
		},
	},
	{
		id: 326,
		name: 'S-51J',
		cost: {
			toSix: { status: 'available', screws: 7, certainScrews: 7 },
			toTen: { status: 'available', screws: 7, certainScrews: 9 },
			upgrade: { status: 'available', screws: 10, certainScrews: 20 },
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
			upgrade: { status: 'available', screws: 8, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
		},
	},
	{
		id: 331,
		name: '16inch Mk.V連装砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 13 },
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
		id: 344,
		name: '九七式艦攻改 試製三号戊型(空六号電探改装備機)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 6 },
			upgrade: { status: 'available', screws: 11, certainScrews: 22 },
		},
	},
	{
		id: 346,
		name: '二式12cm迫撃砲改',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 348,
		name: '艦載型 四式20cm対地噴進砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'available', screws: 7, certainScrews: 13 },
		},
	},
	{
		id: 356,
		name: '8inch三連装砲 Mk.9',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 7, certainScrews: 12 },
		},
	},
	{
		id: 357,
		name: '8inch三連装砲 Mk.9 mod.2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 8 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 12 },
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
			upgrade: { status: 'none' },
		},
	},
	{
		id: 381,
		name: '16inch三連装砲 Mk.6',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 7, certainScrews: 13 },
		},
	},
	{
		id: 382,
		name: '12cm単装高角砲E型',
		cost: {
			toSix: { status: 'available', screws: 1, certainScrews: 2 },
			toTen: { status: 'available', screws: 2, certainScrews: 3 },
			upgrade: { status: 'available', screws: 3, certainScrews: 5 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
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
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 5 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 392,
		name: '九九式艦爆二二型(熟練)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 6 },
			upgrade: { status: 'none' },
		},
	},
	{
		id: 393,
		name: '120mm/50 連装砲 mod.1936',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
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
		id: 401,
		name: 'Do 17 Z-2',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 11, certainScrews: 19 },
		},
	},
	{
		id: 403,
		name: '四式重爆 飛龍',
		cost: {
			toSix: { status: 'available', screws: 5, certainScrews: 6 },
			toTen: { status: 'available', screws: 6, certainScrews: 8 },
			upgrade: { status: 'available', screws: 8, certainScrews: 12 },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 11 },
		},
	},
	{
		id: 419,
		name: 'SBD-5',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
		},
	},
	{
		id: 420,
		name: 'SB2C-3',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 14 },
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
		id: 424,
		name: 'Barracuda Mk.II',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 4 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'available', screws: 7, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
		},
	},
	{
		id: 427,
		name: '305mm/46 三連装砲',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 2, certainScrews: 4 },
			upgrade: { status: 'available', screws: 6, certainScrews: 9 },
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
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
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
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
		},
	},
	{
		id: 445,
		name: '二式複戦 屠龍',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 2 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 4, certainScrews: 6 },
		},
	},
	{
		id: 446,
		name: '二式複戦 屠龍 丙型',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
			upgrade: { status: 'available', screws: 5, certainScrews: 7 },
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
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 9, certainScrews: 15 },
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
			upgrade: { status: 'available', screws: 9, certainScrews: 14 },
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
		id: 493,
		name: '一式陸攻(八幡部隊)',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 4, certainScrews: 5 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: 5 },
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
		id: 520,
		name: '試製20.3cm(4号)連装砲',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 4 },
			toTen: { status: 'available', screws: 6, certainScrews: 7 },
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
			upgrade: { status: 'available', screws: 6, certainScrews: 8 },
		},
	},
	{
		id: 536,
		name: '15.2cm三連装主砲',
		cost: {
			toSix: { status: 'available', screws: 3, certainScrews: 3 },
			toTen: { status: 'available', screws: 3, certainScrews: 4 },
			upgrade: { status: 'available', screws: 7, certainScrews: 10 },
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
			upgrade: { status: 'available', screws: 4, certainScrews: null },
		},
	},
	{
		id: 542,
		name: 'TBD(Yellow Wings)',
		cost: {
			toSix: { status: 'available', screws: 2, certainScrews: 3 },
			toTen: { status: 'unknown' },
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
		id: 549,
		name: '三式指揮連絡機改二',
		cost: {
			toSix: { status: 'available', screws: 4, certainScrews: 5 },
			toTen: { status: 'available', screws: 5, certainScrews: 7 },
			upgrade: { status: 'none' },
		},
	},
] satisfies Equipment[];
