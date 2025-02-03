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
              v-if="isVisibleTypeSelect"
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
			<template v-if="simResult.length > 0">
				<v-icon
					@click="showRefference"
					icon="md:layers"
					class="reference icon-on-map"
				/>
				<v-icon
					@click="screenShot"
					icon="mdi:mdi-camera-outline"
					class="screen-shot icon-on-map"
				/>
			</template>
      <div id="cy" class="cy">
      </div>
    </div>
  </div>
	<div
		v-if="isAreaVisible || isRefferenceVisible || isErrorVisible"
		class="modal-overlay"
		@mousedown="closeModals"
	>
		<AreaModal />
		<RefferenceModal />
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
			v-if="branchHtml"
			v-html="branchHtml"
		>
	</div>
	</template>
	<div class="detail-box">
		<v-expansion-panels
			v-model="openPanel"
			multiple
			color="primary"
		>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">使い方</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>1.制空シミュの編成ページを開く</p>
					<p>2.[共有] &gt; [羅針盤シミュで開く]</p>
					<p>3.海域をセット</p>
					<p>4.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
					<br>
					<p style="text-align: center;">or</p>
					<br>
					<p>1.制空シミュの編成ページを開く</p>
					<p>2.[共有] &gt; [デッキビルダー形式データ] コピー</p>
					<p>3.羅針盤シミュの [DeckBuilder] 欄に貼り付け</p>
					<p>4.海域をセット</p>
					<p>5.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">謝辞</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p><a href="https://tsunkit.net/nav/" target="_blank">KCNav</a>: マップ周り</p>
					<p><a href="http://kancolle-calc.net/deckbuilder.html" target="_blank">デッキビルダー</a>: 艦/装備データ</p>
					<p><a href="https://noro6.github.io/kc-web/#/" target="_blank">制空権シミュレータ</a>: 速度演算、コーディング全般</p>
					<p><a href="https://jervis.vercel.app/" target="_blank">作戦室 Jervis</a>: 海域選択レイアウト</p>
					<p><a href="https://github.com/Nishisonic/gkcoi" target="_blank">gkcoi</a>: 編成のグラフィック出力</p>
					<p>本ツールは以上のサイトを大いに参考にして制作しました。先人に感謝。</p>
					<p>This tool was created with great reference to the above sites. Thanks to our predecessors.</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">分岐法則について</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>通常海域は日本語版wiki、イベント海域はNGAに則ります</p>
					<p>表示されたマップの分岐マスをクリックすると分岐条件が表示されます</p>
					<p>ランダムとあって確率の記載がない場合、進行可能なマスへ等分しています</p>
					<p>20%~25%のように表記されている場合、中間値を採用しています(この場合22.5%)</p>
					<p><span style="color: red">赤字</span>は本シミュにおいて採用している暫定値です</p>
					<p>n寄りランダム のように確率の記載がない場合、開発者がそれっぽい値を暫定的にセットしています。根拠は基本的にありません</p>
					<p><span style="color:blue">青字</span>は本シミュ独自の処理をしている部分です。論拠についてはリンク先で確認してください</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">アプデ履歴</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>2024/05/02_v1.1.8  資源マスでの獲得資源予測</p>
					<p>2024/03/16_v1.1.7  <del>合致する条件に下線表示</del> 廃止</p>
					<p>2024/02/21_v1.1.6  資料室の設置</p>
					<p>2024/02/16_v1.1.5  スクショ機能の実装</p>
					<p>2024/02/03_v1.1.4  マス点灯&amp;図上における能動分岐切替</p>
					<p>2024/01/31_v1.1.3  連合艦隊読込&amp;イベント海域試験実装</p>
					<p>2024/01/18_v1.1.2  分岐マスをクリックで条件表示</p>
					<p>2024/01/16_v1.1.1  <del>キーボードショートカット追加</del> 廃止</p>
					<p>2024/01/15_v1.1.0  デッキビルダー形式での読込に対応</p>
					<p>2024/01/11_v1.0.2  手順を簡素化</p>
					<p>2024/01/11_v1.0.1  読み込んだ艦隊を表示&amp;バグ修正</p>
					<p>2023/10/28_v1.0.0  公開</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, reactive, computed } from 'vue';
import { useStore, useModalStore } from '@/stores'
import Option from './components/Option.vue';
import AreaModal from './components/modals/AreaModal.vue';
import RefferenceModal from './components/modals/RefferenceModal.vue';
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
import { convertBranchDataToHTML, convertFleetSpeedNameToId } from './utils/convertUtil';

const store = useStore();
const modalStore = useModalStore();

const fleetInput = ref(''); // 入力取得用
const fleetInputRef = ref<HTMLInputElement | null>(null); // focus用

const cacheFleets = computed(() => store.cacheFleets as CacheFleet[]);

const selectedType = computed(() => store.selectedType);

const adoptFleet = computed(() => store.adoptFleet);

const selectedArea = computed(() => store.selectedArea);

const drewArea = computed(() => store.drewArea);

const options = computed(() => store.options);

const simResult = computed(() => store.simResult);

const isVisibleTypeSelect = cacheFleets.value.filter(item => item !== null).length >= 2;
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

const showArea = () => {
	modalStore.SHOW_AREA();
}
const showRefference = () => {
	modalStore.SHOW_REFFERENCE();
}
const closeModals = () => {
	modalStore.HIDE_MODALS();
}

const openPanel = ref([0]);

/**
 * cytoscapeインスタンス    
 * storeに登録しようとするとMap maximum size exceeded    
 * たぶん大きすぎる為
 */
let cy = null as cytoscape.Core | null;

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

let is_first_run = true;
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
			
			if (is_first_run) console.timeEnd('読込 → マップ表示'); // debug
			
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

	node_data = convertBranchDataToHTML(node_data);

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
  width:960px;
	background-color: #fff;
	border-radius: 4px;
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
.reference {
	right: 46px;
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
.detail-box {
	margin: auto;
	max-width: 480px;
}
.panel-title {
	border: none;
	height: 20px;
}
.panel-text {
	border-top: 1px solid #dadada;
}
.panel-text p {
	padding: 4px 0px;
}
</style>
