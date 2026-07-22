<template>
	<Header />
	<div class="container">
		<button class="design-button area-select-button" @pointerdown="show_area">
			{{ selectedArea ? '海域: ' + selectedArea : '海域' }}
		</button>
		<div class="upper-container">
			<FleetInput @load="load_fleet" @select-type="adjust_fleet_type" />
			<FleetSummary />
		</div>
		<div class="result-container">
			<template v-if="simResult.length > 0">
				<div class="override-speed" @mouseover="showSpeedOptions" @mouseleave="hideSpeedOptions">
					<SvgIcon name="speed-meter" :color="isSpeedOverridden ? '#f6a306' : '#fff'"
						class="icon-on-map override-speed-icon"></SvgIcon>
					<div v-if="isSpeedOptionsVisible" class="speed-option-box">
						<span v-for="option in SPEED_OPTIONS" :key="option.id" class="speed-option"
							@pointerdown="overrideSpeed(option.id)">
							<SvgIcon :name="option.icon" color="#fff" class="speed-option-icon"></SvgIcon>
							<span class="speed-tip">{{ option.label }}</span>
						</span>
						<span class="speed-option" @pointerdown="clearSpeedOverride">
							<SvgIcon name="close" color="#fff" class="speed-option-icon"></SvgIcon>
							<span class="speed-tip">上書きを無効</span>
						</span>
					</div>
				</div>
				<SvgIcon @pointerdown="switchSeek" name="radar-8" :color="adoptFleet?.seek.c1 === 999 ? '#f6a306' : '#fff'"
					class="ignore-seek icon-on-map"></SvgIcon>
				<SvgIcon @pointerdown="show_reference" name="layers" color="#fff" class="reference icon-on-map"></SvgIcon>
				<SvgIcon @click="screenShot" name="camera-outline" color="#fff" class="screen-shot icon-on-map" ></SvgIcon>
			</template>
			<div id="cy" class="cy">
			</div>
		</div>
	</div>
	<ModalHost />
	<StandardResourcePopup v-if="standard_resource" :data="standard_resource" :style="popupStyle" class="popup popup-info" />
	<SyonanResourcePopup v-if="syonan_resource" :data="syonan_resource" :style="popupStyle" class="popup popup-info" />
	<template v-if="branchHtml === '<p>$sw</p>'">
		<div class="popup popup-info" :style="popupStyle">
			<p>
				<span>能動分岐</span>
				<button class="design-button remote-active" :value="`${node}`" @pointerdown="switchActive">
					切替
				</button>
			</p>
		</div>
	</template>
	<template v-else>
		<div class="popup popup-info" :style="popupStyle" v-if="branchHtml" v-html="branchHtml">
		</div>
	</template>
	<DetailBox />
	<Footer />
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed, defineAsyncComponent, nextTick } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from './stores';
import Header from './components/Header.vue';
import SvgIcon from './components/SvgIcon.vue';
import { DisallowToSortie, ImageGenerationFailed } from './errors/CustomError';
import { derive_DeckBuilder_from_AdoptFleet } from './logic/deckBuilder';
import {
	getZeroFilledTime,
	sanitize_text
} from './logic/util';
import { type AdoptFleet, is_speed_overridden } from './models/fleet/AdoptFleet';
import type { Sp as FleetSpeed } from './logic/speed/predicate';
import type { GenerateOptions, DeckBuilder as GkcoiDeckBuilder, LoS, Speed } from 'gkcoi/dist/type';
import do_draw_map from './logic/effects/draw';
import type { MapCore } from './logic/effects/svgGraph';
import {
	calc_Gkcoi_Blob,
	calc_Map_Blob,
} from './logic/render';
import {
	convert_branch_data_to_HTML,
} from './logic/convert';
import Drum from '@/icons/items/drum.png';
import Craft from '@/icons/items/craft.png';
import { do_delete_URL_param, calc_URL_param } from './logic/url';
import { do_combine_blobs, do_download_data_URL } from './logic/effects/render';
import type { SyonanResource } from './models/resource/SyonanResource';
import type { StandardResource } from './models/resource/StandardResource';
import DetailBox from './components/Detail.vue';
import Footer from './components/Footer.vue';
import { derive_sim_executor, start_sim } from './core/SimExecutor';
import { clear_command_evacuation } from './core/CommandEvacuation';
import { parseAreaId } from './models/schemas';
import { register_map_events } from './logic/effects/mapEvents';
import lzstring from "lz-string";
import FleetInput from './components/FleetInput.vue';
import FleetSummary from './components/FleetSummary.vue';
import ModalHost from './components/modals/ModalHost.vue';
import { useFleetPipeline } from './composables/useFleetPipeline';
import { EDGE_DATAS, NODE_DATAS } from './data/map';

const StandardResourcePopup = defineAsyncComponent(() => import(
	'./components/resource/StandardResourcePopup.vue'
));
const SyonanResourcePopup = defineAsyncComponent(() => import(
	'./components/resource/SyonanResourcePopup.vue'
));

const store = useStore();
const modalStore = useModalStore();

const {
	adoptFleet,
	selectedArea,
	drewArea,
	options,
	commandEvacuations,
	simResult,
	branchData,
	icons,
} = storeToRefs(store);

const { load_fleet, adjust_fleet_type } = useFleetPipeline();

const {
	isAreaVisible,
	isReferenceVisible,
	isErrorVisible,
	isCommandEvacuationVisible,
} = storeToRefs(modalStore);

const show_area = () => {
	modalStore.SHOW_AREA();
}
const show_reference = () => {
	modalStore.SHOW_REFERENCE();
}
/** 描画済みマップのハンドル */
let map_core = null as MapCore | null;

/** 速度上書きドロップダウンの表示順定義 */
const SPEED_OPTIONS: { id: FleetSpeed, label: string, icon: string }[] = [
	{ id: 4, label: '最速', icon: 'chevron-quadruple-up' },
	{ id: 3, label: '高速+', icon: 'chevron-triple-up' },
	{ id: 2, label: '高速', icon: 'chevron-double-up' },
	{ id: 1, label: '低速', icon: 'chevron-up' },
];

const isSpeedOptionsVisible = ref(false);

const showSpeedOptions = () => {
	isSpeedOptionsVisible.value = true;
};
const hideSpeedOptions = () => {
	isSpeedOptionsVisible.value = false;
};

const isSpeedOverridden = computed(() =>
	adoptFleet.value
		? is_speed_overridden(adoptFleet.value as AdoptFleet)
		: false
);

const overrideSpeed = (speed: FleetSpeed) => {
	store.OVERRIDE_SPEED(speed);
	isSpeedOptionsVisible.value = false;
};

const clearSpeedOverride = () => {
	store.CLEAR_SPEED_OVERRIDE();
	isSpeedOptionsVisible.value = false;
};

watch([adoptFleet, selectedArea], () => {
	// 退避設定は 海域 | 艦隊 間で持ち越さない
	const cleared_command_evacuation = clear_command_evacuation();
	store.UPDATE_COMMAND_EVACUATIONS(cleared_command_evacuation);
});

// 艦隊 & 海域 & オプション が揃ったらシミュ開始
watch([adoptFleet, selectedArea, options, commandEvacuations], async () => {
	if (
		!adoptFleet.value
		|| !selectedArea.value
		|| !options.value
	) return;

	try {
		parseAreaId(selectedArea.value);
		const sim_executor = derive_sim_executor(
			adoptFleet.value as AdoptFleet,
			selectedArea.value,
			options.value,
			commandEvacuations.value,
		);
		// console.time('シミュ計測');
		const result = start_sim(
			sim_executor,
		);
		// console.timeEnd('シミュ計測');
		store.UPDATE_SIM_RESULT(result);
	} catch (e: unknown) {
		store.CLEAR_ROUTES();
		modalStore.SHOW_ERROR(e);
		if (e instanceof DisallowToSortie) return;

		console.error(e);
		return;
	}
}, { deep: true });

let is_first_run = true;

watch([simResult], async () => {
	draw_map();
}, { deep: true });

// リサイズはSVGのviewBoxが自動追従するので再描画不要

async function draw_map() {
	if (
		!simResult.value ||
		!selectedArea.value
	) return;

	map_core = do_draw_map(
		selectedArea.value,
		simResult.value,
		commandEvacuations.value,
	); // ここまでになるべく余計なことをしない

	if (is_first_run) {
		console.timeEnd('読込 → マップ表示'); // debug
		await store.DYNAMIC_LOAD();
		is_first_run = false;
	}

	hide_popup();
	store.UPDATE_DREW_AREA(selectedArea.value);

	register_map_events(
		map_core,
		generate_branch_html,
		adjust_popup_position,
		hide_popup,
		branchHtml,
		drewArea,
		adoptFleet,
		icons,
		Drum,
		Craft,
		store,
		modalStore,
		NODE_DATAS,
		EDGE_DATAS,
		syonan_resource,
		standard_resource
	);
}

const branchHtml = ref<string | null>(null);

const popupStyle = ref({
	top: '0px',
	left: '0px',
});

const node = ref<string | null>(null);

const standard_resource = ref<StandardResource | null>(null);

const syonan_resource = ref<SyonanResource | null>(null);

const hide_popup = () => {
	standard_resource.value = null;
	syonan_resource.value = null;
	branchHtml.value = null;
	popup_anchor = null;
}

const generate_branch_html = (node_name: string): string | null => {
	node.value = node_name;

	let key = selectedArea.value!;

	if (options.value && selectedArea.value === '7-3') {
		const option = options.value['7-3']!;
		if (option.phase) {
			key += `-${option.phase}`;
		}
	}

	let node_data = branchData.value![key][node_name];

	if (!node_data) return null;;

	const topic = sanitize_text(`${selectedArea.value}-${node_name}`);

	node_data = convert_branch_data_to_HTML(node_data, topic);

	node_data = `<p>${node_data}</p>`;

	return node_data;
};

/** ポップアップ位置の基準ノード(リサイズ・スクロール時の再調整用) */
let popup_anchor: { map: MapCore; node_name: string } | null = null;

/** ノード中心からポップアップまでのオフセット */
const POPUP_OFFSET = 20;
/** ビューポート端との最小余白 */
const POPUP_MARGIN = 8;

const adjust_popup_position = (
	map: MapCore,
	node_name: string,
) => {
	popup_anchor = { map, node_name };
	apply_popup_position();
	// 描画完了後に実サイズで再クランプ
	nextTick(apply_popup_position);
};

const apply_popup_position = () => {
	if (!popup_anchor) return;
	const position = popup_anchor.map.rendered_position(popup_anchor.node_name);
	if (!position) return;

	// ノード中心のビューポート座標
	const cyContainer = popup_anchor.map.container.getBoundingClientRect();
	const anchor_x = position.x + cyContainer.left;
	const anchor_y = position.y + cyContainer.top;

	// 表示中ポップアップの実サイズ(描画前はCSSのmin-width相当をフォールバック)
	let popup_w = 210;
	let popup_h = 40;
	for (const el of document.querySelectorAll<HTMLElement>('.popup-info')) {
		popup_w = Math.max(popup_w, el.offsetWidth);
		popup_h = Math.max(popup_h, el.offsetHeight);
	}

	const view_w = document.documentElement.clientWidth;
	const view_h = document.documentElement.clientHeight;

	// 基本はノードの右。収まらなければ左へ反転し、最後にビューポート内へクランプ
	let left = anchor_x + POPUP_OFFSET;
	if (left + popup_w + POPUP_MARGIN > view_w) {
		left = anchor_x - POPUP_OFFSET - popup_w;
	}
	left = Math.max(Math.min(left, view_w - popup_w - POPUP_MARGIN), POPUP_MARGIN);

	let top = anchor_y - 10;
	if (top + popup_h + POPUP_MARGIN > view_h) {
		top = view_h - popup_h - POPUP_MARGIN;
	}
	top = Math.max(top, POPUP_MARGIN);

	// position:absoluteの基準はドキュメントなのでスクロール分を加算
	popupStyle.value.top = top + window.scrollY + 'px';
	popupStyle.value.left = left + window.scrollX + 'px';
};

// 能動分岐切替
const switchActive = (event: Event) => {
	if (options.value && drewArea.value && options.value[drewArea.value]) {
		const target = event.target as HTMLButtonElement;
		const node_name = target.value;

		const option = options.value[drewArea.value]!;
		const current_selected = option[node_name];

		const area_edges = EDGE_DATAS[drewArea.value];
		const possible_edges =
			area_edges.filter(item => item[0] === node_name);

		const new_value =
			possible_edges
				.find(item => item[1] !== current_selected)![1];

		store.UPDATE_OPTION_WITH_KEY(drewArea.value, node_name, new_value);
		store.SAVE_DATA();
	}
};

const switchSeek = () => {
	store.SWITCH_SEEK();
};

const screenShot = async () => {
	if (!adoptFleet.value || !map_core) return;

	if (is_speed_overridden(adoptFleet.value)) {
		store.CLEAR_SPEED_OVERRIDE();
	}

	const gkcoi = await import('gkcoi'); // 動的import
	const time = getZeroFilledTime(new Date());
	const file_name = `${drewArea.value}_${time}`;

	const deck = derive_DeckBuilder_from_AdoptFleet(adoptFleet.value as AdoptFleet);
	const gkcoi_deck_builder = Object.assign(deck, {
		lang: 'jp',
		theme: 'dark',
	}) as GkcoiDeckBuilder;
	const options: GenerateOptions = { // thank you, Chami
		start2URL: 'https://raw.githubusercontent.com/Tibowl/api_start2/master/start2.json',
	};
	const { seek } = adoptFleet.value;
	const gkcoi_los: LoS = {
		'1': seek.c1,
		'2': seek.c2,
		'3': seek.c3,
		'4': seek.c4,
		'5': seek.c4,
	};
	const gkcoi_speed = adoptFleet.value.speed * 5 as Speed;
	try {
		const canvas = await gkcoi.generate(
			gkcoi_deck_builder,
			options,
			gkcoi_los,
			gkcoi_speed,
		);
		const g_blob = calc_Gkcoi_Blob(canvas);
		const cy_blob = calc_Map_Blob(map_core);
		const data_url = await do_combine_blobs(cy_blob, g_blob);
		do_download_data_URL(data_url, file_name);
	} catch (error) {
		modalStore.SHOW_ERROR(new ImageGenerationFailed('画像生成に失敗しました'));
		console.error(error);
		return;
	}
};

let save_y = 0;
// スクロールバウンス回避
watch([isAreaVisible, isReferenceVisible, isErrorVisible, isCommandEvacuationVisible], () => {
	const style = document.body.style;
	if (
		isAreaVisible.value
		|| isReferenceVisible.value
		|| isErrorVisible.value
		|| isCommandEvacuationVisible.value
	) { // DOMはあんまし触りたくないけどしゃあないかな
		save_y = window.scrollY;
		style.top = `-${window.scrollY}px`;
		style.left = `${window.scrollX}px`;
		style.position = "fixed";
		style.minWidth = '100%';
	} else {
		style.top = "";
		style.left = "";
		style.position = "";
		window.scrollTo({ top: save_y });
	}
});

onMounted(async () => {
	const predeck = calc_URL_param('predeck');
	const pdz = calc_URL_param('pdz');

	const exclude_deck =
		predeck !== null ||
		pdz !== null;
	store.LOAD_DATA({ exclude_deck });
	if (predeck) {
		load_fleet(decodeURIComponent(predeck));
		do_delete_URL_param();
	} else if (pdz) {
		load_fleet(lzstring.decompressFromEncodedURIComponent(pdz));
		do_delete_URL_param();
	}

	// ウィンドウリサイズでポップアップ位置を再調整
	window.addEventListener('resize', apply_popup_position);

	const GITHUB_DOMAIN = 'https://github.com/X-20A/X-20A.github.io/tree/';
	console.log(`Source: ${GITHUB_DOMAIN}compass_dev`);
	console.log(`API guide: ${GITHUB_DOMAIN}main`);
});
</script>

<style scoped>
.container {
	margin: auto;
	margin-top: 40px;
	padding-bottom: 8px;
	max-width: 960px;
}
.area-select-button {
	position: absolute;
	z-index: var(--z-map-overlay);
	top: 55px;
	left: 50%;
	transform: translateX(-50%);
}
.upper-container {
	padding-right: 120px;
	padding-left: clamp(0px, 230px + (100vw - 960px) * 230 / 960, 230px);
}
@media (max-width: 640px) {
	.upper-container {
		padding-right: 0px;
		padding-left: 0;
	}
}
.alert {
	width: 20px;
	height: 20px;
}
.non-margin {
	margin: 0;
	border-bottom: 0;
	cursor: default;
}
.result-container {
	position: relative;
	display: flex;
	justify-content: center;
}
.ignore-seek {
	right: 80px;
}
.override-speed {
	position: absolute;
	top: 4px;
	right: 114px;
	/* 展開メニューとtipが右隣のアイコンに重なるので同レイヤー内で+1 */
	z-index: calc(var(--z-map-overlay) + 1);
}
/* icon-on-mapの絶対配置を打ち消してラッパー内に収める(セレクタ2連で優先) */
.override-speed .override-speed-icon {
	position: static;
	display: block;
}
.speed-option-box {
	display: flex;
	flex-direction: column;
	gap: 5px;
	margin-top: 4px;
}
.speed-option {
	position: relative;
	display: block;
	height: 22px;
	width: 22px;
	padding: 3px;
	border-radius: 100%;
	background-color: #cccccc;
	cursor: pointer;
	user-select: none;
}
.speed-option:hover {
	background-color: #b3b3b3;
}
.speed-option-icon {
	display: block;
	height: 22px;
	width: 22px;
}
.speed-tip {
	position: absolute;
	left: 100%;
	top: 50%;
	transform: translateY(-50%) translateX(6px);
	background-color: rgba(0, 0, 0, 0.75);
	color: white;
	padding: 2px 8px 5px 8px;
	border-radius: 4px;
	white-space: nowrap;
	font-size: 12px;
	opacity: 0;
	transition: opacity 0.2s;
	pointer-events: none;
	/* .override-speedのスタッキングコンテキスト内ローカル */
	z-index: 1;
}
.speed-option:hover .speed-tip {
	opacity: 1;
}
.reference {
	right: 46px;
}
.screen-shot {
	right: 12px;
}
.icon-on-map {
	color: white;
	cursor: pointer;
	padding: 3px;
	border-radius: 100%;
	height: 22px;
	width: 22px;
	top: 4px;
	position: absolute;
	z-index: var(--z-map-overlay);
	background-color: #cccccc;
}
.cy {
	display: flex;
	position: relative;
	top: 0;
	left: 0;
	width: 100%;
	max-width: 960px;
	height: auto;
	aspect-ratio: 3 / 2;
	max-height: 640px;
	/* 内部canvasを閉じ込めるスタッキングコンテキスト生成用 */
	z-index: 0;
	background: blanchedalmond !important;
}
.cy-context-menus-cxt-menu {
	display: none;
	z-index: var(--z-popover);
	position: absolute;
	padding: 0;
	margin: 0;
	width: auto;
}
.cy-context-menus-cxt-menuitem {
	width: 80px;
	background-color: white;
	border: 1px solid #49A9F5;
	cursor: pointer;
}
.item-icon {
	vertical-align: -6px;
	margin-right: 3px;
}
</style>