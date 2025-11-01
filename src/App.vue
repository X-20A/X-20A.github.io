<template>
	<Header />
	<div class="container">
		<button class="design-button area-select-button" @pointerdown="showArea">
			{{ selectedArea ? '海域: ' + selectedArea : '海域'}}
		</button>
		<div class="upper-container">
			<div class="input-container">
				<div class="split">
					<div class="inputs">
						<div style="flex: 1;position: relative; user-select: none;">
							<div>
								<input type="text" class="import" id="fleet-import" placeholder="DeckBuilder" v-model="fleetInput"
									ref="fleetInputRef" /><!-- #fleet-importは七四式読込に残しとく -->
							</div>
							<p class="type-select" v-if="isVisibleTypeSelect" @mouseover="showFleetOptions">艦隊種別</p>
							<div v-if="isFleetOptionsVisible" class="fleet-option-box" @mouseover="showFleetOptions"
								@mouseleave="hideFleetOptions">
								<span class="fleet-type" @pointerdown=updateSelectedType(1)>第一艦隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(2)>第二艦隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(3)>第三艦隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(4)>第四艦隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(5)>空母機動部隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(6)>水上打撃部隊</span>
								<span class="fleet-type" @pointerdown=updateSelectedType(7)>輸送護衛部隊</span>
							</div>
						</div>
						<Option />
					</div>
				</div>
			</div>
			<div v-if="adoptFleet">
				<template v-if="adoptFleet.fleet_type > 0">
					<p>{{ fleetTypeLabels[adoptFleet.fleet_type] }}</p>
				</template>
				<template v-if="adoptFleet.fleet_type === 0 && adoptFleet.fleet_length === 7">
					<p>遊撃部隊</p>
				</template>
				<p>
					<span>{{ speedLabels[adoptFleet.speed] }}</span>
					<span> | </span>
					<span>搭載艦数[ </span>

					<template v-if="is_target_world([60])">
						<span class="tooltip-container">
							<span style="color: #4800ff;cursor: default;">第五</span>
							<span>: {{ adoptFleet.daigo_count }}&nbsp;</span>
							<span class="tooltip-text">
								那智 | 足柄 | 阿武隈 | 多摩 | 木曾 | 霞 | 不知火 | 薄雲 | 曙 | 潮 | 初霜 | 初春 | 若葉
							</span>
						</span>

						<span class="tooltip-container">
							<span style="color: #e65100;cursor: default;">礼号</span>
							<span>: {{ adoptFleet.reigo_count }}&nbsp;</span>
							<span class="tooltip-text">
								足柄 | 大淀 | 霞 | 清霜 | 朝霜 | 榧 | 杉
							</span>
						</span>

						<span class="tooltip-container">
							<img :src="Bulge" alt="北方迷彩(＋北方装備)" style="height: 20px;vertical-align: -4px;">
							<span>: {{ adoptFleet.arBulge_carrier_count }}&nbsp;</span>
							<span class="tooltip-text">北方迷彩(＋北方装備)</span>
						</span>
					</template>

					<template v-if="is_target_world([58])">
						<span class="tooltip-container">
							<img :src="NotSpanner" alt="寒冷地装備＆甲板要員を装備していない空母系+あきつ丸" style="height: 17px;vertical-align: -3px;">
							<span>: {{ countNotEquipArctic(adoptFleet) }}&nbsp;</span>
							<span class="tooltip-text">寒冷地装備＆甲板要員を装備していない(空母系+あきつ丸)</span>
						</span>
					</template>

					<span class="tooltip-container">
						<img :src="Drum" alt="ドラム缶" style="height: 17px;vertical-align: -3px;">
						<span>: {{ adoptFleet.drum_carrier_count }}&nbsp;</span>
						<span class="tooltip-text">ドラム缶</span>
					</span>

					<span class="tooltip-container">
						<img :src="Craft" alt="大発系" style="height: 21px;vertical-align: -4px;">
						<span>: {{ adoptFleet.craft_carrier_count }}&nbsp;</span>
						<span class="tooltip-text">
							大発動艇 | 大発動艇(八九式中戦車&陸戦隊) | 特二式内火艇 | 特大発動艇 | 武装大発<br> | 大発動艇(II号戦車/北アフリカ仕様) | 特大発動艇+一式砲戦車 | 特四式内火艇 | 特四式内火艇改
						</span>
					</span>

					<span class="tooltip-container">
						<img :src="Radar" alt="電探系" style="height: 19px;vertical-align: -5px;">
						<span>: {{ adoptFleet.radar_carrier_count }}</span>
						<span class="tooltip-text">電探系</span>
					</span>

					<span> ]</span>
				</p>
				<template v-if="adoptFleet.fleet_type > 0"><!-- 連合艦隊 -->
					<div>
						<strong>主力: </strong>
						<template v-for="(name, index) in calc_main_fleet_ship_names(adoptFleet)" :key="index">
							<span>{{ name }}</span>
							<span v-if="index < getMainFleetLength(adoptFleet) - 1"> | </span>
						</template>
					</div>
					<div>
						<strong>随伴: </strong>
						<template v-for="(name, index) in calc_escort_fleet_ship_names(adoptFleet)" :key="index">
							<span>{{ name }}</span>
							<span v-if="index < getEscortFleetLength(adoptFleet) - 1"> | </span>
						</template>
					</div>
				</template>
				<template v-else><!-- 通常艦隊 or 遊撃部隊 -->
					<template v-for="(name, index) in adoptFleet.ship_names" :key="index">
						<span>{{ name }}</span>
						<span v-if="index < adoptFleet.fleet_length - 1"> | </span>
					</template>
				</template>
				<p :style="adoptFleet?.seek[0] === 999 ? 'color: #f6a306' : ''">
					<span>索敵値: </span>
					<strong>1: </strong>
					<span>{{ adoptFleet.seek[0] }}</span>
					<strong> 2: </strong>
					<span>{{ adoptFleet.seek[1] }}</span>
					<strong> 3: </strong>
					<span>{{ adoptFleet.seek[2] }}</span>
					<strong> 4: </strong>
					<span>{{ adoptFleet.seek[3] }}</span>
				</p>
			</div>
		</div>
		<div class="result-container">
			<template v-if="simResult.length > 0">
				<SvgIcon @pointerdown="switchSeek" name="radar-8" :color="adoptFleet?.seek[0] === 999 ? '#f6a306' : '#fff'"
					class="ignore-seek icon-on-map"></SvgIcon>
				<SvgIcon @pointerdown="showRefference" name="layers" color="#fff" class="reference icon-on-map"></SvgIcon>
				<SvgIcon @click="screenShot" name="camera-outline" color="#fff" class="screen-shot icon-on-map"></SvgIcon>
			</template>
			<div id="cy" class="cy">
			</div>
		</div>
	</div>
	<div v-if="isAreaVisible
			|| isRefferenceVisible
			|| isErrorVisible
			|| isCommandEvacuationVisible" class="modal-overlay" @pointerdown="closeModals">
		<Area />
		<Refference />
		<ErrorView />
		<CommandEvacuation />
	</div>
	<NomalResourcePopup :data="nomalResource" :style="popupStyle" class="popup popup-info" />
	<SyonanResourcePopup :data="syonanResource" :style="popupStyle" class="popup popup-info" />
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
import { onMounted, watch, ref, computed } from 'vue';
import { useStore, useModalStore } from './stores';
import Header from './components/Header.vue';
import Option from './components/Option.vue';
import Area from './components/modals/Area.vue';
import Refference from './components/modals/Refference.vue';
import ErrorView from './components/modals/ErrorView.vue';
import CommandEvacuation from './components/modals/CommandEvacuation.vue';
import SvgIcon from './components/SvgIcon.vue';
import type { SelectedType } from './types';
import CustomError from './errors/CustomError';
import {
	derive_FleetComponents_from_DeckBuilder,
	derive_DeckBuilder_from_AdoptFleet,
} from './logic/deckBuilder';
import {
	getZeroFilledTime,
	is_exists_and_Number,
	sanitize_text
} from './logic/util';
import { type AdoptFleet, countNotEquipArctic, derive_adopt_fleet, getEscortFleetLength, calc_escort_fleet_ship_names, getMainFleetLength, calc_main_fleet_ship_names } from './models/fleet/AdoptFleet';
import type { DeckBuilder as GkcoiDeckBuilder } from 'gkcoi/dist/type';
import do_draw_map from './logic/efffects/draw';
import { EDGE_DATAS, NODE_DATAS } from './data/map';
import {
	calc_Gkcoi_Blob,
	calc_Cytoscape_Blob,
} from './logic/render';
import {
	convert_branch_data_to_HTML,
} from './logic/convert';
import Bulge from '@/icons/items/bulge.png';
import NotSpanner from '@/icons/items/not-spanner.png';
import Drum from '@/icons/items/drum.png';
import Craft from '@/icons/items/craft.png';
import Radar from '@/icons/items/radar.png';
import { do_delete_URL_param, calc_URL_param } from './logic/url';
import { do_combine_blobs, do_download_data_URL } from './logic/efffects/render';
import NomalResourcePopup from './components/resource/NomalResourcePopup.vue';
import SyonanResourcePopup from './components/resource/SyonanResourcePopup.vue';
import type { FleetComponent } from './models/fleet/FleetComponent';
import type { SyonanResource } from './models/resource/SyonanResource';
import type { NomalResource } from './models/resource/NomalResource';
import DetailBox from './components/Detail.vue';
import Footer from './components/Footer.vue';
import { derive_sim_executer, start_sim } from './core/SimExecutor';
import Const from './constants/const';
import { clear_command_evacuation } from './core/CommandEvacuation';
import { parseAreaId, parse_DeckBuilder_String, parseSelectedType } from './models/shemas';
import { register_Cytoscape_events } from './logic/efffects/cytoscapeEvents';
import { disassembly_area_id } from './logic/area';
import lzstring from "lz-string";
import { Ft as FleetType } from './models/fleet/predicate';

const store = useStore();
const modalStore = useModalStore();

const fleetInput = ref(''); // 入力取得用
const fleetInputRef = ref<HTMLInputElement | null>(null); // focus用

const deck = computed(() => store.deck);

const fleetComponents = computed(() => store.fleetComponents as FleetComponent[]);

const selectedType = computed(() => store.selectedType);

const adoptFleet = computed(() => store.adoptFleet);

const selectedArea = computed(() => store.selectedArea);

const drewArea = computed(() => store.drewArea);

const options = computed(() => store.options);

const commandEvacuations = computed(() => store.commandEvacuations);

const simResult = computed(() => store.simResult);

const isVisibleTypeSelect = computed(() => fleetComponents.value.filter(item => item !== null).length >= 2);
const isFleetOptionsVisible = ref(false);

const showFleetOptions = () => {
	isFleetOptionsVisible.value = true;
};
const hideFleetOptions = () => {
	isFleetOptionsVisible.value = false;
};

const isAreaVisible = computed(() => modalStore.isAreaVisible);
const isRefferenceVisible = computed(() => modalStore.isRefferenceVisible);
const isErrorVisible = computed(() => modalStore.isErrorVisible);
const isCommandEvacuationVisible = computed(() => modalStore.isCommandEvacuationVisible);

const showArea = () => {
	modalStore.SHOW_AREA();
}
const showRefference = () => {
	modalStore.SHOW_REFFERENCE();
}
const closeModals = () => {
	modalStore.HIDE_MODALS();
}

/**
 * 海域IDのworldがtarget_worldsに含まれているか判定する関数
 * @param target_worlds 判定対象world配列
 * @returns boolean
 */
function is_target_world(
	target_worlds: number[],
): boolean {
	if (!selectedArea.value) return false;

	const { world } = disassembly_area_id(selectedArea.value);
	return world
		? target_worlds.includes(world)
		: false;
}

/**
 * cytoscapeインスタンス    
 * storeに登録しようとするとMap maximum size exceeded    
 * たぶん大きすぎる為
 */
let cytoscape_core = null as cytoscape.Core | null;

const branchData = computed(() => store.branchData);

const icons = computed(() => store.icons);

const speedLabels = {
	1: '低速艦隊',
	2: '高速艦隊',
	3: '高速+艦隊',
	4: '最速艦隊',
};

const fleetTypeLabels = {
	0: '', // 通常艦隊 表示されることは無いので空文字
	1: '空母機動部隊',
	2: '水上打撃部隊',
	3: '輸送護衛部隊',
}

watch(deck, () => { // localStorageからの読込想定
	if (!deck.value) return;

	load_fleet(deck.value);
})

// import貼り付け
watch(fleetInput, (text) => {
	if (!text) return;

	if (fleetInput.value) fleetInput.value = ''; // 空欄化
	try {
		load_fleet(text);
	} catch (e: unknown) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}
});

/**
 * デッキビルダー文字列から艦隊読込
 * @param deck_string 
 */
const load_fleet = (deck_string: string): void => {
	try {
		const deck = parse_DeckBuilder_String(deck_string);
		const fleet_components = derive_FleetComponents_from_DeckBuilder(
			deck,
		);
		store.UPDATE_FLEET_COMPONENTS(fleet_components);

		store.UPDATE_DECK(deck_string);
		store.SAVE_DATA();

		let selected_type = 1 as SelectedType;
		if (deck?.f1?.t) {
			const fleet_type = is_exists_and_Number(deck.f1.t) && [0, 1, 2, 3].includes(Number(deck.f1.t))
				? Number(deck.f1.t) as FleetType
				: 0 as FleetType
				;
			switch (fleet_type) {
				case 1:
					selected_type = 5;
					break;
				case 2:
					selected_type = 6;
					break;
				case 3:
					selected_type = 7;
					break;
			}
		}
		adjustFleetType(selected_type);
	} catch (e) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}
};

const updateSelectedType = (type_id: number) => {
	adjustFleetType(type_id);
}

// fleet_typeとかselected_typeの調停
const adjustFleetType = (selected_type_number: number) => { // 入力系とimportの2箇所から発火
	try {
		const selected_type = parseSelectedType(selected_type_number);
		if (selected_type >= 5) {
			if (!store.fleetComponents[0]) {
				throw new CustomError('連合艦隊が指定されましたが第一艦隊が空です');
			}
			if (!store.fleetComponents[1]) {
				throw new CustomError('連合艦隊が指定されましたが第二艦隊が空です');
			}
		}

		store.UPDATE_SELECTED_TYPE(selected_type);
		store.SAVE_DATA();
	} catch (e: unknown) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}
}

// fleetComponents, selectedTypeからシミュに使用する艦隊をセット
watch([fleetComponents, selectedType], () => {
	if (
		!selectedType.value ||
		fleetComponents.value.length === 0
	) return;

	try { // ここでも一応、変な値が保存されてるとエラーになり得る
		let fleets = [] as FleetComponent[];
		let fleet_type = 0 as FleetType;
		if (selectedType.value >= 5) {
			fleets = [fleetComponents.value[0], fleetComponents.value[1]];
			fleet_type = selectedType.value - 4 as FleetType;
		} else {
			fleets = [fleetComponents.value[selectedType.value - 1]];
		}
		if (!fleets[0]) throw new CustomError('艦隊が空です');

		const adopt_fleet = derive_adopt_fleet(
			fleets,
			fleet_type,
		);

		store.UPDATE_ADOPT_FLEET(adopt_fleet);
	} catch (e: unknown) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
});

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
		const sim = derive_sim_executer(
			adoptFleet.value as AdoptFleet,
			selectedArea.value,
			options.value,
			commandEvacuations.value,
		);
		// console.time('シミュ計測');
		const result = start_sim(
			sim,
			adoptFleet.value as AdoptFleet,
			commandEvacuations.value,
		);
		// console.timeEnd('シミュ計測');
		store.UPDATE_SIM_RESULT(result);
	} catch (e: unknown) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}
}, { deep: true });

let is_first_run = true;

watch([simResult], async () => {
	draw_map();
}, { deep: true });

window.addEventListener('resize', draw_map);

async function draw_map() {
	if (
		!simResult.value ||
		!selectedArea.value
	) return;

	cytoscape_core = do_draw_map(
		selectedArea.value,
		simResult.value,
		commandEvacuations.value,
	); // ここまでになるべく余計なことをしない

	if (is_first_run) {
		console.timeEnd('読込 → マップ表示'); // debug
		await store.DYNAMIC_LOAD();
		is_first_run = false;
	}

	hidePopup();
	store.UPDATE_DREW_AREA(selectedArea.value);

	register_Cytoscape_events(
		cytoscape_core,
		generarteBranchHtml,
		adjustPopupPosition,
		hidePopup,
		branchHtml,
		drewArea,
		adoptFleet,
		icons,
		Drum,
		Craft,
		Const,
		store,
		modalStore,
		NODE_DATAS,
		EDGE_DATAS,
		syonanResource,
		nomalResource
	);
}

const branchHtml = ref<string | null>(null);

const popupStyle = ref({
  top: '0px',
  left: '0px',
});

const node = ref<string | null>(null);

const nomalResource = ref<NomalResource | null>(null);

const syonanResource = ref<SyonanResource | null>(null);

const hidePopup = () => {
	nomalResource.value = null;
	syonanResource.value = null;
	branchHtml.value = null;
}

const generarteBranchHtml = (node_name: string): string | null => {
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

const adjustPopupPosition = (
	cy: cytoscape.Core,
	element: cytoscape.EventObject,
) => {
	const position = element.target.renderedPosition();

	// cy領域の左上の座標を取得
	const cyContainer = cy.container()?.getBoundingClientRect()!;

	// 表示位置調整
	let top: number;
	let left: number;

	if (position.x >= 650) {
			left = position.x + cyContainer.left - 260;
			top = position.y + cyContainer.top + 20;
	} else {
			left = position.x + cyContainer.left + 20;
			top = position.y + cyContainer.top - 10;
	}

	popupStyle.value.top = top + 'px';
	popupStyle.value.left = left + 'px';
};
	
const switchActive = (event: Event) => {
	if (options.value && drewArea.value && options.value[drewArea.value]) {
		const target = event.target as HTMLButtonElement;
		const node_name = target.value;

		const option = options.value[drewArea.value]!;
		const current_selectted = option[node_name];

		const area_edges = EDGE_DATAS[drewArea.value];
		const possible_edges =
			area_edges.filter(item => item[0] === node_name);

		const new_value =
			possible_edges
			.find(item => item[1] !== current_selectted)![1];

		store.UPDATE_OPTION_WITH_KEY(drewArea.value, node_name, new_value);
		store.SAVE_DATA();
	}
};

const switchSeek = () => {
	store.SWITCH_SEEK();
};

const screenShot = async () => {
	if (!adoptFleet.value || !cytoscape_core)  return;

	const gkcoi = await import('gkcoi'); // 動的import
	const time = getZeroFilledTime(new Date());
	const fileName = `${drewArea.value}_${time}`;

	const deck = derive_DeckBuilder_from_AdoptFleet(adoptFleet.value as AdoptFleet);
	const gkcoiBuilder = Object.assign(deck, {
		lang: 'jp',
		theme: 'dark',
	}) as GkcoiDeckBuilder;
	const fleet_seek = adoptFleet.value.seek;
	const speed = adoptFleet.value.speed * 5;
	const los = {
		'1': fleet_seek[0],
		'2': fleet_seek[1],
		'3': fleet_seek[2],
		'4': fleet_seek[3],
	};
	const canvas = await gkcoi.generate(
		gkcoiBuilder,
		undefined,
		los,
		speed as 0 | 5 | 10 | 15 | 20,
	);
	const g_blob = calc_Gkcoi_Blob(canvas);
	const cy_blob = calc_Cytoscape_Blob(cytoscape_core);
	try {
		const data_url = await do_combine_blobs(cy_blob, g_blob);
		do_download_data_URL(data_url, fileName);
	} catch (error) {
		modalStore.SHOW_ERROR('画像出力に失敗しました');
		console.error(error);
		return;
	}
};

let save_y = 0;
// スクロールバウンス回避
watch([isAreaVisible, isRefferenceVisible, isErrorVisible, isCommandEvacuationVisible], () => {
	const style = document.body.style;
	if (
		isAreaVisible.value
		|| isRefferenceVisible.value
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

	fleetInputRef.value?.focus();

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
  max-width:960px;
}
.area-select-button {
	position: absolute;
	z-index: 9998;
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
.input-container {
	text-align: center;
	padding-top: 15px;
	padding-bottom: 20px;
}
.type-select {
	width:119px;
	border: solid 1px;
	font-size: 14px;
	padding-left: 2px;
	border-radius: 2px;
	color: #5f5f5f;
}
.fleet-option-box {
	width: 121px;
	font-size: 14px;
	z-index: 9997;
	background-color: white;
	left: 3px;
	top: 24px;
	position: absolute;
	border: 1px solid;
}
.alert {
	width: 20px;
	height: 20px;
}
.split {
	display: flex;
}
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}
.fleet-type {
	cursor: pointer;
	display: block;
	user-select: none;
}
.fleet-type:hover{
  background-color: rgb(0 0 0 / 8%);
}
.inputs {
	flex: 1;
	text-align: left;
	flex:1;
	display: flex;
}
.import {
  margin:0px 10px 0px 0px;
	max-width: 115px;
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
	z-index: 9999;
	background-color: #cccccc;
}
.cy {
	display:flex;
	position:relative;
	top:0;
	left:0;
	width: 100%;
	max-width: 960px;
	height: auto;
	aspect-ratio: 3 / 2;
	max-height: 640px;
	z-index:999;
	background: blanchedalmond !important;
}
.cy-context-menus-cxt-menu {
	display:none;
	z-index: 1000;
	position:absolute;
	padding: 0;
	margin: 0;
	width:auto;
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