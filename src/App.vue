<template>
  <div class="container">
    <div class="input-container">
      <div class="split">
        <div class="inputs">
          <div style="flex: 1;position: relative; user-select: none;">
            <div style="margin-left: 4px;">
              <input
                type="text"
                class="input"
								id="fleet-import"
                placeholder="DeckBuilder"
                style="width: 115px;"
                v-model="fleetInput"
								ref="fleetInputRef"
              /><!-- #fleet-importは七四式読込に残しとく -->
            </div>
            <span
              class="type-select"
              v-show="isVisibleTypeSelect"
              @mouseover="showFleetOptions"
              @mouseleave="hideFleetOptions"
            >艦隊種別</span>
            <div
              class="fleet-option-box"
              @mouseover="showFleetOptions"
              @mouseleave="hideFleetOptions"
            >
              <span class="fleet-type" @click=updateSelectedType(1)>第一艦隊</span>
              <span class="fleet-type" @click=updateSelectedType(2)>第二艦隊</span>
              <span class="fleet-type" @click=updateSelectedType(3)>第三艦隊</span>
              <span class="fleet-type" @click=updateSelectedType(4)>第四艦隊</span>
              <span class="fleet-type" @click=updateSelectedType(5)>空母機動部隊</span>
              <span class="fleet-type" @click=updateSelectedType(6)>水上打撃部隊</span>
              <span class="fleet-type" @click=updateSelectedType(7)>輸送護衛部隊</span>
            </div>
          </div>
          <div style="flex: 1;">
            <button
							class="design-button"
							@click="showArea"
						>{{ selectedArea ? '海域: ' + selectedArea : '海域' }}</button>
          </div>
					<Option />
        </div>
      </div>
    </div>
    <div
      class="import-display"
      v-if="adoptFleet"
    >
			<template v-if="adoptFleet.fleet_type_id > 0">
				<p>{{ adoptFleet.fleet_type }}</p>
			</template>
			<template v-if="adoptFleet.fleet_type_id === 0 && adoptFleet.fleet_length === 7">
				<p>遊撃部隊</p>
			</template>
			<p>
				<span>{{ adoptFleet.speed }}</span>
				<span> | </span>
				<span>搭載艦数[ドラム缶:{{ adoptFleet.drum_carrier_count }},大発系:{{ adoptFleet.craft_carrier_count }},電探:{{ adoptFleet.radar_carrier_count }}]</span>
			</p>
      <template v-if="adoptFleet.fleet_type_id > 0"><!-- 連合艦隊 -->
				<div>
					<strong>主力: </strong>
					<template v-for="(name, index) in adoptFleet.getMainFleetNames()" :key="index">
						<span>{{ name }}</span>
						<span v-if="index < adoptFleet.getMainFleetLength() - 1"> | </span>
					</template>
				</div>
				<div>
					<strong>随伴: </strong>
					<template v-for="(name, index) in adoptFleet.getEscortFleetNames()" :key="index">
						<span>{{ name }}</span>
						<span v-if="index < adoptFleet.getEscortFleetLength() - 1"> | </span>
					</template>
				</div>
			</template>
      <template v-else><!-- 通常艦隊 or 遊撃部隊 -->
				<template v-for="(name, index) in adoptFleet.ship_names" :key="index">
					<span>{{ name }}</span>
					<span v-if="index < adoptFleet.fleet_length - 1"> | </span>
				</template>
      </template>
			<p>
				<span>索敵値: </span>
				<strong>1: </strong>
				<span>{{  adoptFleet.seek[0] }}</span>
				<strong> 2: </strong>
				<span>{{  adoptFleet.seek[1] }}</span>
				<strong> 3: </strong>
				<span>{{  adoptFleet.seek[2] }}</span>
				<strong> 4: </strong>
				<span>{{  adoptFleet.seek[3] }}</span>
			</p>
    </div>
    <div class="result-container">
			<v-icon
				@click="screenShot"
				icon="mdi:mdi-camera-outline"
				class="screen-shot icon-on-map"
			/>
      <div id="cy" class="cy">
      </div>
    </div>
  </div>
	<div
		v-show="isAreaVisible || isErrorVisible"
		class="modal-overlay"
		@click="closeModals"
	>
		<AreaModal />
		<ErrorModal />
	</div>
	<template v-if="branchHtml === '<p>$sw</p>'">
		<div
			class="popup"
			id="popup-info"
			:style="branchStyle"
		>
			<p>
				<span>能動分岐</span>
				<button
					class="design-button remote-active"
					:value="`${node}`"
					@click="switchActive"
				>
					切替
				</button>
			</p>
		</div>
	</template>
	<template v-else>
		<div
			class="popup"
			id="popup-info"
			:style="branchStyle"
			v-show="branchHtml"
			v-html="branchHtml"
		>
	</div>
	</template>
	
</template>

<script setup lang="ts">
import { onMounted, watch, ref, reactive, computed } from 'vue';
import { useStore, useModalStore } from '@/stores'
import Option from './components/Option.vue';
import AreaModal from './components/modals/AreaModal.vue';
import ErrorModal from './components/modals/ErrorModal.vue';
import { SelectedType, FleetTypeId } from '@/classes/types';
import CustomError from '@/classes/CustomError';
import CacheFleet from './classes/CacheFleet';
import Sim from '@/classes/Sim';
import {
	createCacheFleetsFromDeckBuilder,
	createDeckBuilderFromAdoptFleet
} from './utils/deckBuilderUtil';
import { generateFormatedTime, isNumber } from '@/utils/util';
import AdoptFleet from './classes/AdoptFleet';
import DeckBuilder from '@/classes/types/DeckBuilder';
import { DeckBuilder as GkcoiDeckBuilder } from 'gkcoi/dist/type';
import drawMap from '@/classes/draw';
import { edges } from './data/map';
import branch_data from './data/branch';
import { getGkcoiBlob, getCyBlob, combineAndDownloadBlobs } from '@/utils/renderUtil';
import { convertFleetSpeedNameToId } from './utils/convertUtil';

const store = useStore();
const modalStore = useModalStore();

const isAreaVisible = computed(() => modalStore.isAreaVisible);
const isErrorVisible = computed(() => modalStore.isErrorVisible);

const showArea = () => {
	modalStore.SHOW_AREA();
}
const closeModals = () => {
	modalStore.HIDE_MODALS();
}

const fleetInput = ref(''); // 入力取得用
const fleetInputRef = ref<HTMLInputElement | null>(null); // focus用

const cacheFleets = computed(() => store.cacheFleets as CacheFleet[]);

const selectedType = computed(() => store.selectedType);

const adoptFleet = computed(() => store.adoptFleet);

const selectedArea = computed(() => store.selectedArea);

const drewArea = computed(() => store.drewArea);

const options = computed(() => store.options);

const simResult = computed(() => store.simResult);

/**
 * cytoscapeインスタンス    
 * storeに登録しようとするとMap maximum size exceeded    
 * たぶん大きすぎる為
 */
let cy = null as cytoscape.Core | null;

const isVisibleTypeSelect = cacheFleets.value.filter(item => item !== null).length >= 2;
const isFleetOptionsVisible = ref(false);

const showFleetOptions = () => {
	isFleetOptionsVisible.value = true;
};
const hideFleetOptions = () => {
	isFleetOptionsVisible.value = false;
};

// import
watch(fleetInput, (text) => {
		if (!text) return;
		if (fleetInput.value) fleetInput.value = ''; // 空欄化
		try {
			let deck = null;
			try {
				deck = JSON.parse(text) as DeckBuilder;
			} catch (e) {
				throw new CustomError('デッキビルダーのデータ形式に誤りがあります');
			}
			const cache_fleets = createCacheFleetsFromDeckBuilder(deck);
			store.UPDATE_CACHE_FLEETS(cache_fleets);
			store.SAVE_DATA();

			let selected_type = 1 as SelectedType;
			if (deck?.f1?.t) {
				const fleet_type = isNumber(deck.f1.t) && [0, 1, 2, 3].includes(Number(deck.f1.t))
					? Number(deck.f1.t) as FleetTypeId
					: 0 as FleetTypeId
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
		} catch (e: any|CustomError) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
	}
);

const updateSelectedType = (type_id: number) => {
	if ([1,2,3,4,5,6,7].includes(type_id)) adjustFleetType(type_id as SelectedType);
}

// fleet_typeとかselected_typeの調停
const adjustFleetType = (selected_type: SelectedType) => { // 入力系とimportの2箇所から発火
	try {
		if (selected_type >= 5) {
			if (!store.cacheFleets[0]) {
				throw new CustomError('連合艦隊が指定されましたが第一艦隊が空です');
			}
			if (!store.cacheFleets[1]) {
				throw new CustomError('連合艦隊が指定されましたが第二艦隊が空です');
			}
		}
	} catch (e: any | CustomError) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}

	store.UPDATE_SELECTED_TYPE(selected_type);
	store.SAVE_DATA();
}

// cacheFleets, selectedTypeからシミュに使用する艦隊をセット
watch([cacheFleets, selectedType], () => {
	try { // ここでも一応、変な値が保存されてるとエラーになり得る
		let fleets = [] as CacheFleet[];
		let fleet_type = 0 as FleetTypeId;
		if (selectedType.value >= 5) {
			fleets = [cacheFleets.value[0], cacheFleets.value[1]];
			fleet_type = selectedType.value - 4 as FleetTypeId;
		} else {
			fleets = [cacheFleets.value[selectedType.value - 1]];
		}

		const adopt_fleet = new AdoptFleet(
			fleets,
			fleet_type,
		);

		store.UPDATE_ADOPT_FLEET(adopt_fleet);
	} catch (e: any | CustomError) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
});

// 艦隊 & 海域 & オプション が揃ったらシミュ開始
watch([adoptFleet, selectedArea, options], () => {
	if (
		adoptFleet.value
		&& selectedArea.value
		&& options.value
	) {
    try {
			
			const sim = new Sim(
				adoptFleet.value as AdoptFleet,
				selectedArea.value,
				options.value,
			);
			// console.time('シミュ計測');
			const result = sim.start();
			// console.timeEnd('シミュ計測');
			store.UPDATE_SIM_RESULT(result);

			cy = drawMap(selectedArea.value, simResult.value); // ここまでになるべく余計なことをしない
			// console.timeEnd('読込 → マップ表示');
			branchHtml.value = null;
			store.UPDATE_DREW_AREA(selectedArea.value);

			cy.on('mousedown', function (element) { //cytoscape周りはどうしてもDOM操作が必要になる
				if (cy) {
					const target = element.target;
					if (target.data('name')) { // node
						const html = generarteBranchHtml(target.data('name'));
						if (!html) return;
						branchHtml.value = html;
						adjustBranchStyle(cy, element);
					} else { // 背景
						branchHtml.value = null;
					}
				}
				
			});
		} catch (e: any | CustomError) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
  }
}, { deep: true });

function sanitizeText(input: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return input.replace(/[&<>"']/g, (char) => map[char]);
}

const branchHtml = ref<string | null>(null);

const branchStyle = reactive({
  top: '0px',
  left: '0px',
});

const node = ref<string | null>(null);

const generarteBranchHtml = (node_name: string): string | null => {
	node.value = node_name;

	let key = selectedArea.value!;
	
	if (options.value && selectedArea.value === '7-3') {
		const option = options.value['7-3']!;
		if (option['phase']) {
			key += `-${option['phase']}`;
		}
	}

	let node_data = branch_data[key][node_name];

	if (!node_data) return null;;

	const location = sanitizeText(`${selectedArea.value}-${node_name}`);

	node_data = node_data!.replaceAll('$e', '<br>');
	node_data = node_data.replaceAll('$i', '&nbsp;&nbsp;&nbsp;&nbsp;');
	node_data = node_data.replaceAll('$co', '<span style="color:red;">');
	node_data = node_data.replaceAll('$oc', '</span>');
	node_data = node_data.replaceAll('$bo', '<span style="font-weight:bold;">');
	node_data = node_data.replaceAll('$ob', '</span>');
	node_data = node_data.replaceAll(
		'$or',
		`<a href="https://x-20a.github.io/reference/?topic=${location}" style="color:blue;" target="_blank" rel="noopener noreferrer">`,
	);
	node_data = node_data.replaceAll('$ro', '</a>');
	node_data = node_data.replaceAll('/*', '<span class="popup-no-decoration">');
	node_data = node_data.replaceAll('*/', '</span>');

	node_data = `<p>${node_data}</p>`;
	
	return node_data;
};

const adjustBranchStyle = (
	cy: cytoscape.Core,
	element: cytoscape.EventObject
) => {
	const position = element.target.renderedPosition();

	// cy領域の左上の座標を取得
	const cyContainer = cy.container()?.getBoundingClientRect()!;

	// 表示位置調整
	let top, left;

	if (position.x >= 650) {
			left = position.x + cyContainer.left - 260;
			top = position.y + cyContainer.top + 20;
	} else {
			left = position.x + cyContainer.left + 20;
			top = position.y + cyContainer.top - 10;
	}

	branchStyle.top = top + 'px';
	branchStyle.left = left + 'px';
};
	
const switchActive = (event: Event) => {
	if (options.value && drewArea.value && options.value[drewArea.value]) {
		const target = event.target as HTMLButtonElement;
		const node_name = target.value;

		const option = options.value[drewArea.value]!;
		const current_selectted = option[node_name];

		const area_edges = edges[drewArea.value];
		const possible_edges =
			area_edges.filter(item => item[0] === node_name);

		const new_value =
			possible_edges
			.find(item => item[1] !== current_selectted)![1];

		store.UPDATE_OPTION_WITH_KEY(drewArea.value, node_name, new_value);
		store.SAVE_DATA();
	}
};

const screenShot = async () => {
	if (adoptFleet.value && cy) {
		const gkcoi = await import('gkcoi'); // 動的import
		const time = generateFormatedTime();
		const fileName = `${drewArea.value}_${time}`;

		
		const deck = createDeckBuilderFromAdoptFleet(adoptFleet.value as AdoptFleet);
		const gkcoiBuilder = Object.assign(deck, {
			lang: 'jp',
			theme: 'dark',
		}) as GkcoiDeckBuilder;
		const fleet_seek = adoptFleet.value.seek;
		const speed = convertFleetSpeedNameToId(adoptFleet.value.speed);
		const los = {
			'1': fleet_seek[0],
			'2': fleet_seek[1],
			'3': fleet_seek[2],
			'4': fleet_seek[3],
		};
		const canvas = await gkcoi.generate(
			gkcoiBuilder,
			los,
			speed as 0|5|10|15|20,
		);
		const g_blob = getGkcoiBlob(canvas);
		const cy_blob = getCyBlob(cy);
		combineAndDownloadBlobs(cy_blob, g_blob, fileName);
	}
  
};

onMounted(() => {
	store.LOAD_DATA();
	fleetInputRef.value?.focus();
});
</script>

<style scoped>
.container {
  margin: auto;
  margin-top: 40px;
	padding-bottom: 8px;
  width:976px;
	background-color: #fff;
	border-radius: 4px;
	box-shadow: 0 3px 1px -2px rgba(0, 0, 0, .2), 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
}
.input-container {
	text-align: center;
	padding: 15px 120px 20px 225px;
}
.type-select {
	display: none;
	margin-left: 3px;
	width:111px;
	border: solid 1px;
	font-size: 14px;
	padding-left: 2px;
}
.fleet-option-box {
	width: 113px;
	font-size: 14px;
	z-index: 9999;
	background-color: white;
	left: 3px;
	top: 24px;
	position: absolute;
	border: 1px solid;
	display: none;
}
.import-display {
	padding-left: 230px;
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
	padding-left: 2px;
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
.input {
  margin:0 10px 0 2px;
	width: 60px;
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
.screen-shot {
	right: 12px;
}
.icon-on-map {
	color: white;;
	cursor: pointer;
	padding: 3px;
	border-radius: 100%;
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
	width: 960px;
	height: 640px;
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
