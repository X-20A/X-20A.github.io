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

					<template v-for="(row, i) in ROWS" :key="row.label">
						<div>{{ row.label }}</div>
						<div :class="{ empty: row.noBorder }">{{ nezText(row.nez) }}</div>
						<div>{{ row.rateLabel }}</div>
						<div>{{ results[i]?.expect ?? '' }}</div>
						<div>{{ results[i]?.witch ?? '' }}</div>
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
import { imp_json, type ImprovableItem, type ImprovementStep } from './data/improvement';

const FAVS_KEY = 'imp_favs';
const MAX_HITS = 20;

/** どの改修段階がどのネジ数・成功率を参照するか */
const ROWS = [
	{ label: '1~5', rateLabel: '100%', rate: 1, nez: 'step1', noBorder: true },
	{ label: '5→6', rateLabel: '94.05%', rate: 0.9405, nez: null, noBorder: false },
	{ label: '6→7', rateLabel: '88.82%', rate: 0.8882, nez: 'step2', noBorder: true },
	{ label: '7→8', rateLabel: '81.91%', rate: 0.8191, nez: null, noBorder: true },
	{ label: '8→9', rateLabel: '78.91%', rate: 0.7891, nez: null, noBorder: true },
	{ label: '9→10', rateLabel: '70.23%', rate: 0.7023, nez: null, noBorder: false },
	{ label: '更新', rateLabel: '58.57%', rate: 0.5857, nez: 'step3', noBorder: false },
] as const;

/** 各行が必要ネジ数・確実化ネジ数を引くステップ */
const ROW_STEPS = ['step1', 'step1', 'step2', 'step2', 'step2', 'step2', 'step3'] as const;

// 改修可能な装備のみが検索・選択の対象
const improvables = imp_json.filter((entry): entry is ImprovableItem => entry.canImprovement);

const searchText = ref('');
const isHitsVisible = ref(false);
const selected = ref<ImprovableItem | null>(null);
const favIds = ref<number[]>(loadFavs());
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchWrapperRef = ref<HTMLElement | null>(null);

// 検索結果
const hits = computed<ImprovableItem[]>(() => {
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

// 選択中の装備の期待値と確実化判定
const results = computed(() => {
	const item = selected.value;
	if (!item) {
		return [];
	}
	return ROWS.map((row, i) => {
		const step = item[ROW_STEPS[i]];
		const need = stepValue(step, 0);
		// ネジ数が未判明・更新不可の装備は計算できない
		if (need === null) {
			return { expect: '-', witch: '-' };
		}
		const expect = Math.floor((need / row.rate) * 100) / 100;
		const certain = stepValue(step, 1);
		return {
			expect: String(expect),
			witch: certain !== null && expect > certain ? '〇' : '',
		};
	});
});

/** 値なし(null)と要素なし(undefined)を区別せず潰す */
function stepValue(step: ImprovementStep, index: 0 | 1): number | null {
	return step[index] ?? null;
}

/** ネジ列の「必要数 / 確実化数」表示 */
function nezText(step: 'step1' | 'step2' | 'step3' | null): string {
	const item = selected.value;
	if (!item || step === null) {
		return '';
	}
	const need = stepValue(item[step], 0);
	const certain = stepValue(item[step], 1);
	if (need === null) {
		return '-';
	}
	return certain === null ? String(need) : `${need} / ${certain}`;
}

function select(item: ImprovableItem) {
	selected.value = item;
	isHitsVisible.value = false;
}

// ID検索(前方一致) id降順
function searchWithID(target: number): ImprovableItem[] {
	const prefix = target.toString();
	return improvables
		.filter((entry) => entry.id.toString().startsWith(prefix))
		.sort((a, b) => b.id - a.id)
		.slice(0, MAX_HITS);
}

// 名前検索(部分一致) 大文字小文字を区別しない id降順
function searchWithName(target: string): ImprovableItem[] {
	const lower = target.toLowerCase();
	return improvables
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
function getFavs(): ImprovableItem[] {
	const ids = favIds.value;
	return improvables
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
	grid-template-columns: 1fr 2fr 2fr 2fr 1fr;
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
