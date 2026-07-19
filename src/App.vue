<template>
	<Header />
	<div class="outer-container">
		<div class="main-container">
			<div class="upper-container">
				<div class="search-wrapper" ref="searchWrapperRef">
					<form class="search-container" @submit.prevent>
						<input
							class="search-text"
							type="text"
							size="25"
							placeholder="ID or 名前検索"
							v-model="searchText"
							ref="searchInputRef"
							@focus="isHitsVisible = true"
						/>
					</form>
					<div class="hits-container" v-if="isHitsVisible && hits.length">
						<div class="hits" v-for="hit in hits" :key="hit.id" @pointerdown="select(hit)">
							No: {{ hit.id }} {{ hit.name }}
						</div>
					</div>
				</div>
			</div>

			<div class="result-container">
				<div class="info-box">
					<div>
						<span>{{ selected ? `No.${selected.id}` : '' }}</span>
						<span class="name">{{ selected?.name ?? '' }}</span>
					</div>
					<div>
						<button
							class="switch-fav"
							v-if="selected"
							type="button"
							:aria-label="isFav(selected.id) ? 'お気に入り解除' : 'お気に入り登録'"
							:aria-pressed="isFav(selected.id)"
							@click="toggleFav(selected.id)"
						>
							<SvgIcon :name="isFav(selected.id) ? 'bookmark-check' : 'bookmark-outline'" />
						</button>
					</div>
				</div>
				<div class="result">
					<div></div>
					<div class="header">ネジ</div>
					<div class="header">成功率</div>
					<div class="header">期待値</div>
					<div class="header">確実化</div>

					<!-- 更新先が同名で複数ある装備があるので、キーは添字 -->
					<template v-for="(row, i) in results" :key="i">
						<div :class="{ 'upgrade-label': row.upgradeTo !== null }">
							{{ row.label
							}}<template v-if="row.upgradeTo"><br />→ {{ row.upgradeTo
							}}<template v-if="row.upgradeNote"><br />({{ row.upgradeNote }})</template></template>
						</div>
						<div :class="{ empty: row.noBorder }">{{ row.nez }}</div>
						<div>{{ row.rateLabel }}</div>
						<div>{{ row.expect }}</div>
						<div>{{ row.witch }}</div>
					</template>
				</div>
			</div>

			<div class="other-container">
				<details>
					<summary>補足</summary>
					改修確実化が合理的であるか確認できます
				</details>
				<details>
					<summary>謝辞</summary>
					<p>以下のサイトを参考に製作しました</p>
					<p>・<a href="https://dsco11.web.fc2.com/kancolle/improvement-chance.html" target="_blank" rel="noopener noreferrer">虚像工廠改二 - 改修資材必要数期待値計算</a></p>
					<p>・<a href="https://akashi-list.me/" target="_blank" rel="noopener noreferrer">明石の改修工廠早見表</a></p>
					<p>・<a href="https://docs.google.com/spreadsheets/d/1wPUtvU9yG5Sf8MnTAp3kKOXyC5EeKUIJ_V5OCu27_0c/edit?gid=485599777#gid=485599777" target="_blank" rel="noopener noreferrer">改修工廠の証</a></p>
					<p>ありがとうございます</p>
				</details>
			</div>
		</div>
	</div>
	<Footer />
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import SvgIcon from './components/SvgIcon.vue';
import { IMPROVEMENT_DATAS } from './data/improvement.js';
import type { CostKey, Equipment } from './data/types.js';

const FAVS_KEY = 'imp_favs';
const MAX_HITS = 20;

/**
 * ★区分の各行。cost はネジ数を引く区分、showCost はその区分の先頭行
 * (ネジ数を実際に表示する行) かどうかを表す。
 * 更新行は更新先ごとに増えるので、ここには含めず results 側で足す。
 */
type Row = {
	label: string;
	rateLabel: string;
	rate: number;
	cost: Exclude<CostKey, 'upgrade'>;
	showCost: boolean;
	noBorder: boolean;
};

const STAR_ROWS: readonly Row[] = [
	{ label: '1~5', rateLabel: '100%', rate: 1, cost: 'toSix', showCost: true, noBorder: true },
	{ label: '5→6', rateLabel: '94.05%', rate: 0.9405, cost: 'toSix', showCost: false, noBorder: false },
	{ label: '6→7', rateLabel: '88.82%', rate: 0.8882, cost: 'toTen', showCost: true, noBorder: true },
	{ label: '7→8', rateLabel: '81.91%', rate: 0.8191, cost: 'toTen', showCost: false, noBorder: true },
	{ label: '8→9', rateLabel: '78.91%', rate: 0.7891, cost: 'toTen', showCost: false, noBorder: true },
	{ label: '9→10', rateLabel: '70.23%', rate: 0.7023, cost: 'toTen', showCost: false, noBorder: false },
];

const UPGRADE_RATE = 0.5857;
const UPGRADE_RATE_LABEL = '58.57%';

const searchText = ref('');
const isHitsVisible = ref(false);
const selected = ref<Equipment | null>(null);
const favIds = ref<number[]>(loadFavs());
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchWrapperRef = ref<HTMLElement | null>(null);

// 検索結果
const hits = computed<Equipment[]>(() => {
	const text = convertToHalfWidth(searchText.value);
	if (!text) {
		return getFavs();
	}
	const num = Number(text);
	if (num > 0 && !text.includes('.')) {
		const byId = searchWithID(num);
		if (byId.length) {
			return byId;
		}
	}
	return searchWithName(text);
});

/** 表示用に組み上げた1行 */
type ResultRow = {
	label: string;
	/** 更新行のときだけ更新先の装備名。★区分の行では null */
	upgradeTo: string | null;
	/** 同名の更新先を見分けるための注記。無ければ null */
	upgradeNote: string | null;
	nez: string;
	rateLabel: string;
	expect: string;
	witch: string;
	noBorder: boolean;
};

// 選択中の装備の期待値と確実化判定
const results = computed<ResultRow[]>(() => {
	const item = selected.value;
	// 未選択でも表の枠は出す
	if (!item) {
		return [...STAR_ROWS, { label: '更新', rateLabel: UPGRADE_RATE_LABEL, noBorder: false }].map(
			(row) => ({ ...row, upgradeTo: null, upgradeNote: null, nez: '', expect: '', witch: '' }),
		);
	}

	const rows: ResultRow[] = STAR_ROWS.map(({ label, rateLabel, rate, cost, showCost, noBorder }) => {
		const phase = item.cost[cost];
		// 更新先が無い・未判明なら計算できない
		if (phase.status !== 'available') {
			const mark = unavailableMark(phase.status);
			return {
				label,
				rateLabel,
				noBorder,
				upgradeTo: null,
				upgradeNote: null,
				nez: showCost ? mark : '',
				expect: mark,
				witch: mark,
			};
		}
		return {
			label,
			rateLabel,
			noBorder,
			upgradeTo: null,
			upgradeNote: null,
			nez: showCost ? nezText(phase.screws, phase.certainScrews) : '',
			...calc(phase.screws, phase.certainScrews, rate),
		};
	});

	const upgrade = item.cost.upgrade;
	if (upgrade.status !== 'available') {
		const mark = unavailableMark(upgrade.status);
		rows.push({
			label: '更新',
			rateLabel: UPGRADE_RATE_LABEL,
			upgradeTo: null,
			upgradeNote: null,
			nez: mark,
			expect: mark,
			witch: mark,
			noBorder: false,
		});
		return rows;
	}

	// 更新先が複数ある装備があるので、更新先ごとに1行出す
	for (const entry of upgrade.upgrades) {
		rows.push({
			label: '更新',
			rateLabel: UPGRADE_RATE_LABEL,
			upgradeTo: entry.to.name,
			upgradeNote: entry.note ?? null,
			nez: nezText(entry.screws, entry.certainScrews),
			...calc(entry.screws, entry.certainScrews, UPGRADE_RATE),
			noBorder: false,
		});
	}
	return rows;
});

/** 期待値と、確実化した方が得かの判定 */
function calc(screws: number, certain: number | null, rate: number) {
	const expect = Math.floor((screws / rate) * 100) / 100;
	return {
		expect: String(expect),
		witch: certain !== null && expect > certain ? '〇' : '',
	};
}

/** 改修できない区分の表示。存在しないのか未判明なのかを区別する */
function unavailableMark(status: 'none' | 'unknown'): string {
	return status === 'unknown' ? '?' : '-';
}

/** ネジ列の「必要数 / 確実化数」表示 */
function nezText(screws: number, certain: number | null): string {
	return certain === null ? String(screws) : `${screws} / ${certain}`;
}

function select(item: Equipment) {
	selected.value = item;
	isHitsVisible.value = false;
}

// ID検索(前方一致) id降順
function searchWithID(target: number): Equipment[] {
	const prefix = target.toString();
	return IMPROVEMENT_DATAS
		.filter((entry) => entry.id.toString().startsWith(prefix))
		.sort((a, b) => b.id - a.id)
		.slice(0, MAX_HITS);
}

// 名前検索(部分一致) 大文字小文字を区別しない id降順
function searchWithName(target: string): Equipment[] {
	const lower = target.toLowerCase();
	return IMPROVEMENT_DATAS
		.filter((entry) => entry.name.toLowerCase().includes(lower))
		.sort((a, b) => b.id - a.id)
		.slice(0, MAX_HITS);
}

function loadFavs(): number[] {
	const raw = localStorage.getItem(FAVS_KEY);
	if (!raw) {
		return [];
	}
	try {
		const parsed: unknown = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.filter((id): id is number => typeof id === 'number') : [];
	} catch {
		return [];
	}
}

// お気に入りは登録順で表示する
function getFavs(): Equipment[] {
	const ids = favIds.value;
	return IMPROVEMENT_DATAS
		.filter((entry) => ids.includes(entry.id))
		.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
}

function isFav(id: number): boolean {
	return favIds.value.includes(id);
}

function toggleFav(id: number) {
	favIds.value = isFav(id) ? favIds.value.filter((entry) => entry !== id) : favIds.value.concat(id);
	localStorage.setItem(FAVS_KEY, JSON.stringify(favIds.value));
}

// 全角数字許容
function convertToHalfWidth(str: string): string {
	return str.replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0));
}

// 検索欄の外がクリックされたらリスト非表示
function onPointerDown(event: PointerEvent) {
	const target = event.target;
	if (target instanceof Node && searchWrapperRef.value?.contains(target)) {
		return;
	}
	isHitsVisible.value = false;
}

// 入力のたびにリストを出し直す
watch(searchText, () => {
	isHitsVisible.value = true;
});

onMounted(() => {
	document.addEventListener('pointerdown', onPointerDown);
	searchInputRef.value?.focus();
});

onBeforeUnmount(() => {
	document.removeEventListener('pointerdown', onPointerDown);
});
</script>

<style scoped>
.outer-container {
	background-color: #f5f7f8;
	min-height: 100vh;
}
.main-container {
	width: 560px;
	background-color: #fff;
	height: 100%;
	margin: auto;
}
.upper-container {
	height: 100px;
	display: flex;
	padding-top: 36px;
	border-bottom: 2px solid #DBE0E5;
	align-items: center;
	justify-content: center;
}
.search-wrapper {
	position: relative;
}
.search-container {
	box-sizing: border-box;
	border: 1px solid #999;
	display: block;
	padding: 3px 10px;
	border-radius: 20px;
	height: 2.3em;
	width: 260px;
	overflow: hidden;
	margin: 0;
}
.search-text {
	border: none;
	height: 2.0em;
	padding-top: 3px;
}
.search-text:focus {
	outline: 0;
}
.hits-container {
	position: absolute;
	top: 100%;
	left: 0;
	z-index: var(--z-popover);
	padding: 4px;
	border: 1px solid #99cffa;
	background-color: #fff;
	min-width: 230px;
}
.hits {
	cursor: pointer;
}
.hits:hover {
	background-color: #e8f4fe;
}
.result-container {
	padding: 5px;
}
.result {
	display: grid;
	/* 1列目は更新先の装備名が入るので広めに取る */
	grid-template-columns: 3fr 2fr 2fr 2fr 1fr;
	width: 100%;
	margin: auto;
	text-align: center;
	border-top: 1px solid #000;
	border-left: 1px solid #000;
}
.result div {
	border-right: 1px solid #000;
	border-bottom: 1px solid #000;
}
/* 更新先名は長いので、行高を抑えるため小さめに詰める */
.upgrade-label {
	font-size: 0.85em;
	line-height: 1.3;
	overflow-wrap: anywhere;
}
.info-box {
	display: flex;
	justify-content: space-between;
}
.name {
	margin-left: 10px;
}
.switch-fav {
	cursor: pointer;
	/* ボタンの既定装飾を消してアイコンだけ見せる */
	padding: 0;
	border: none;
	background: none;
	line-height: 0;
	color: #2196f3;
}
.switch-fav svg {
	width: 24px;
	height: 24px;
}
.empty {
	border-bottom: 0 !important;
}
.other-container {
	padding: 160px 0 40px 150px;
}
</style>
