<template>
	<Header />
	<div class="container">
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
							<span class="fleet-type" @mousedown=updateSelectedType(1)>第一艦隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(2)>第二艦隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(3)>第三艦隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(4)>第四艦隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(5)>空母機動部隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(6)>水上打撃部隊</span>
							<span class="fleet-type" @mousedown=updateSelectedType(7)>輸送護衛部隊</span>
						</div>
					</div>
					<div style="flex: 1;">
						<button class="design-button" @mousedown="showArea">{{ selectedArea ? '海域: ' + selectedArea : '海域'
							}}</button>
					</div>
					<Option />
				</div>
			</div>
		</div>
		<div class="import-display" v-if="adoptFleet">
			<template v-if="adoptFleet.fleet_type_id > 0">
				<p>{{ adoptFleet.fleet_type }}</p>
			</template>
			<template v-if="adoptFleet.fleet_type_id === 0 && adoptFleet.fleet_length === 7">
				<p>遊撃部隊</p>
			</template>
			<p>
				<span>{{ adoptFleet.speed }}</span>
				<span> | </span>
				<span>搭載艦数[ </span>

				<span class="tooltip-container"> <!-- この辺はイベント後にAdditional Stat的なのにしまうかも -->
					<span style="color: #4800ff;cursor: default;">第五</span>
					<span>: {{ adoptFleet.daigo_count }}&nbsp;</span>
					<span class="tooltip-text">
						那智 | 足柄 | 阿武隈 | 多摩 | 木曾 | 霞 | 不知火 | 薄雲 | 曙 | 潮 | 初霜 | 初春 | 若葉
					</span>
				</span>

				<span class="tooltip-container">
					<span style="color: #e57600;cursor: default;">礼号</span>
					<span>: {{ adoptFleet.reigo_count }}&nbsp;</span>
					<span class="tooltip-text">
						足柄 | 大淀 | 霞 | 清霜 | 朝霜 | 榧 | 杉
					</span>
				</span>

				<span class="tooltip-container">
					<img :src="NotSpanner" alt="寒冷地装備＆甲板要員を装備していない空母系+あきつ丸" style="height: 17px;vertical-align: -3px;">
					<span>: {{ adoptFleet.countNotEquipArctic() }}&nbsp;</span>
					<span class="tooltip-text">寒冷地装備＆甲板要員を装備していない(空母系+あきつ丸)</span>
				</span>

				<span class="tooltip-container">
					<img :src="Bulge" alt="北方迷彩(＋北方装備)" style="height: 20px;vertical-align: -4px;">
					<span>: {{ adoptFleet.arBulge_carrier_count }}&nbsp;</span>
					<span class="tooltip-text">北方迷彩(＋北方装備)</span>
				</span>

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
			<p style="color: #D90000;">
				イベント海域の分岐条件は未確定で、随時更新されます。
				<a href="https://x.com/momemi_kc/status/1898667989525827682" target="_blank" rel="noopener noreferrer"
					style="text-decoration: underline;">
					更新履歴
				</a>
			</p>
			<p style="color: #D90000;">新艦組の素索敵値は0で計算されています。</p>
		</div>
		<div class="result-container">
			<template v-if="simResult.length > 0">
				<SvgIcon @mousedown="switchSeek" name="radar-8" :color="adoptFleet?.seek[0] === 999 ? '#f6a306' : '#fff'"
					class="ignore-seek icon-on-map"></SvgIcon>
				<SvgIcon @mousedown="showRefference" name="layers" color="#fff" class="reference icon-on-map"></SvgIcon>
				<SvgIcon @click="screenShot" name="camera-outline" color="#fff" class="screen-shot icon-on-map"></SvgIcon>
			</template>
			<div id="cy" class="cy">
			</div>
		</div>
	</div>
	<div v-if="isAreaVisible || isRefferenceVisible || isErrorVisible" class="modal-overlay" @mousedown="closeModals">
		<Area />
		<Refference />
		<Error />
	</div>
	<template v-if="popupHtml === '<p>$sw</p>'">
		<div class="popup" id="popup-info" :style="popupStyle">
			<p>
				<span>能動分岐</span>
				<button class="design-button remote-active" :value="`${node}`" @mousedown="switchActive">
					切替
				</button>
			</p>
		</div>
	</template>
	<template v-else>
		<div class="popup" id="popup-info" :style="popupStyle" v-if="popupHtml" v-html="popupHtml">
		</div>
	</template>
	<div class="detail-box">
		<v-expansion-panels v-model="openPanel" color="primary" multiple>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					使い方
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>1.制空シミュの編成ページを開く</p>
					<p>2.[共有] &gt; [羅針盤シミュで開く]</p>
					<p>3.海域をセット</p>
					<p>4.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
					<br>
					<div class="gap">
						<span class="or">or</span>
					</div>
					<br>
					<p>1.制空シミュの編成ページを開く</p>
					<p>2.[共有] &gt; [デッキビルダー形式データ] コピー</p>
					<p>3.羅針盤シミュの [DeckBuilder] 欄に貼り付け</p>
					<p>4.海域をセット</p>
					<p>5.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					謝辞
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title><!-- panel-textはv-ifしても変わらなかったのでそのまま -->
				<v-expansion-panel-text class="panel-text">
					<p><a href="https://tsunkit.net/nav/" target="_blank" rel="noopener noreferrer">KCNav</a>: マップ周り</p>
					<p><a href="http://kancolle-calc.net/deckbuilder.html" target="_blank" rel="noopener noreferrer">デッキビルダー</a>:
						艦/装備データ</p>
					<p><a href="https://noro6.github.io/kc-web/#/" target="_blank" rel="noopener noreferrer">制空権シミュレータ</a>:
						速度演算、コーディング全般</p>
					<p><a href="https://jervis.vercel.app/" target="_blank" rel="noopener noreferrer">作戦室 Jervis</a>: 海域選択レイアウト
					</p>
					<p><a href="https://github.com/Nishisonic/gkcoi" target="_blank" rel="noopener noreferrer">gkcoi</a>:
						編成のグラフィック出力</p>
					<p>本ツールは以上のサイトを大いに参考にして制作しました。先人に感謝。</p>
					<p>This tool was created with great reference to the above sites. Thanks to our predecessors.</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					分岐法則について
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
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
				<v-expansion-panel-title class="panel-title">
					アプデ履歴
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>2025/02/07_v2.0.0 経路/分岐条件一覧&システム全面改修</p>
					<p>2024/05/02_v1.1.8 資源マスでの獲得資源予測</p>
					<p>2024/03/16_v1.1.7 <del>合致する条件に下線表示</del> 廃止</p>
					<p>2024/02/21_v1.1.6 資料室の設置</p>
					<p>2024/02/16_v1.1.5 スクショ機能の実装</p>
					<p>2024/02/03_v1.1.4 マス点灯&amp;図上における能動分岐切替</p>
					<p>2024/01/31_v1.1.3 連合艦隊読込&amp;イベント海域試験実装</p>
					<p>2024/01/18_v1.1.2 分岐マスをクリックで条件表示</p>
					<p>2024/01/16_v1.1.1 <del>キーボードショートカット追加</del> 廃止</p>
					<p>2024/01/15_v1.1.0 デッキビルダー形式での読込に対応</p>
					<p>2024/01/11_v1.0.2 手順を簡素化</p>
					<p>2024/01/11_v1.0.1 読み込んだ艦隊を表示&amp;バグ修正</p>
					<p>2023/10/28_v1.0.0 公開</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
	<div class="footer">
		<span>
			バグ報告、要望等は<a class="odaibako" href="https://odaibako.net/u/__poyo" target="_blank"
				rel="noopener noreferrer">お題箱</a>まで
		</span>
		<span>
			作者: <a href="https://kancolle.social/@momemi" target="_blank" rel="noopener noreferrer" aria-label="作者mastodon">
				<SvgIcon name="mastodon" class="sns-icon mastodon"></SvgIcon>
			</a>
			<a href="https://twitter.com/momemi_kc" target="_blank" rel="noopener noreferrer" aria-label="作者Twitter">
				<SvgIcon name="twitter" class="sns-icon twitter"></SvgIcon>
			</a>
		</span>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import { useStore, useModalStore } from '@/stores';
import Header from './components/Header.vue';
import Option from './components/Option.vue';
import Area from './components/modals/Area.vue';
import Refference from './components/modals/Refference.vue';
import Error from './components/modals/Error.vue';
import SvgIcon from './components/SvgIcon.vue';
import type { SelectedType, FleetTypeId } from '@/classes/types';
import CustomError from '@/classes/CustomError';
import type CacheFleet from './classes/CacheFleet';
import Sim from '@/classes/Sim';
import {
	createCacheFleetsFromDeckBuilder,
	createDeckBuilderFromAdoptFleet
} from './utils/deckBuilderUtil';
import {
	deleteParam,
	generateFormatedTime,
	getParam,
	isNumber,
	sanitizeText
} from '@/utils/util';
import AdoptFleet from './classes/AdoptFleet';
import type DeckBuilder from '@/classes/types/DeckBuilder';
import type { DeckBuilder as GkcoiDeckBuilder } from 'gkcoi/dist/type';
import drawMap from '@/classes/draw';
import { edge_datas } from './data/map';
import {
	getGkcoiBlob,
	getCyBlob,
	combineAndDownloadBlobs
} from '@/utils/renderUtil';
import {
	convertBranchDataToHTML,
	convertFleetSpeedNameToId,
	generateResourceHtml
} from './utils/convertUtil';
import Bulge from '@/icons/items/bulge.png';
import NotSpanner from '@/icons/items/not-spanner.png';
// import Spanner from '@/icons/items/spanner.png';
import Drum from '@/icons/items/drum.png';
import Craft from '@/icons/items/craft.png';
import Radar from '@/icons/items/radar.png';
import Const from './classes/const';

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

const isVisibleTypeSelect = computed(() => cacheFleets.value.filter(item => item !== null).length >= 2);
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

/* v-expantionをmousedownにしたかったが厳しそう
const togglePanel = (event: MouseEvent, index: number) => {
	event.preventDefault();
	openPanel.value.includes(index)
		? openPanel.value = openPanel.value.filter(item => item !== index)
		: openPanel.value.push(index)
	;
};

const stopEvent = (event: MouseEvent) => {
	event.preventDefault();
};*/

/**
 * cytoscapeインスタンス    
 * storeに登録しようとするとMap maximum size exceeded    
 * たぶん大きすぎる為
 */
let cy = null as cytoscape.Core | null;

const branchData = computed(() => store.branchData);

const icons = computed(() => store.icons);

// import
watch(fleetInput, (text) => {
	if (!text) return;
	if (fleetInput.value) fleetInput.value = ''; // 空欄化
	try {
		loadFleet(text);
	} catch (e: unknown) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}
});

const loadFleet = (text: string) => {
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
};

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
	} catch (e: unknown) {
		modalStore.SHOW_ERROR(e);
		console.error(e);
		return;
	}

	store.UPDATE_SELECTED_TYPE(selected_type);
	store.SAVE_DATA();
}

// cacheFleets, selectedTypeからシミュに使用する艦隊をセット
watch([cacheFleets, selectedType], () => {
	if (!selectedType.value) return;

	try { // ここでも一応、変な値が保存されてるとエラーになり得る
		let fleets = [] as CacheFleet[];
		let fleet_type = 0 as FleetTypeId;
		if (selectedType.value >= 5) {
			fleets = [cacheFleets.value[0], cacheFleets.value[1]];
			fleet_type = selectedType.value - 4 as FleetTypeId;
		} else {
			fleets = [cacheFleets.value[selectedType.value - 1]];
		}

		if (!fleets[0]) throw new CustomError('艦隊が空です');

		const adopt_fleet = new AdoptFleet(
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

let is_first_run = true;
// 艦隊 & 海域 & オプション が揃ったらシミュ開始
watch([adoptFleet, selectedArea, options], async () => {
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
			
			if (is_first_run) {
				console.timeEnd('読込 → マップ表示'); // debug
				await store.DYNAMIC_LOAD();
				is_first_run = false;
			}
			
			popupHtml.value = null;
			store.UPDATE_DREW_AREA(selectedArea.value);

			cy.on('mousedown', (event) => { // cytoscape周りはどうしてもDOM操作が必要になる
				if (cy) {
					const target = event.target;
					if (event.target.data('name')) { // node
						const html = generarteBranchHtml(target.data('name'));
						if (!html) return;
						popupHtml.value = html;
						adjustBranchStyle(cy, event);
					} else { // 背景
						popupHtml.value = null;
					}
				}
			});

			cy.on('cxttapstart', 'node', async (event) => {
				if (!cy) return;
				if (event.target.data('name')) {
					const html = await generateResourceHtml(
						drewArea.value!,
						event.target.data('name'),
						adoptFleet.value?.composition!,
						adoptFleet.value?.getTotalDrumCount()!,
						adoptFleet.value?.getTotalValidCraftCount()!,
						icons.value,
						Drum,
						Craft,
					);
					if (!html) return;
					popupHtml.value = html;
					adjustBranchStyle(cy, event);
				} else { // 背景
					popupHtml.value = null;
				}
				

			});

		} catch (e: unknown) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
  }
}, { deep: true });

const popupHtml = ref<string | null>(null);

const popupStyle = ref({
  top: '0px',
  left: '0px',
});

const node = ref<string | null>(null);

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

	const topic = sanitizeText(`${selectedArea.value}-${node_name}`);

	node_data = convertBranchDataToHTML(node_data, topic);

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

		const area_edges = edge_datas[drewArea.value];
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

// スクロールバウンス回避
watch([isAreaVisible, isRefferenceVisible, isErrorVisible], () => {
	if (
		isAreaVisible.value
		|| isRefferenceVisible.value
		|| isErrorVisible.value
	) { // DOMはあんまし触りたくないけどしゃあないかな
		document.body.style.position = "fixed";
  	document.body.style.top = `-${window.scrollY}px`;
		document.body.style.left = `${window.scrollX}px`;
	} else {
		document.body.style.position = "";
  	document.body.style.top = "";
		document.body.style.left = "";
	}
});

onMounted(async () => {
	store.LOAD_DATA();
	const predeck = getParam('predeck');
	if (predeck) {
		try {
			loadFleet(
				decodeURIComponent(predeck)
			);
		} catch (e: unknown) {
			modalStore.SHOW_ERROR(e);
			console.error(e);
		}
		deleteParam();
	} else {
		const pdz = getParam('pdz');
		if (pdz) {
			try {
				const LZString = await import('lz-string');
				loadFleet(
					LZString.decompressFromEncodedURIComponent(pdz)
				);
			} catch (e: unknown) {
				modalStore.SHOW_ERROR(e);
				console.error(e);
			}
			deleteParam();
		}
	}
	fleetInputRef.value?.focus();

	console.log('Source: https://github.com/X-20A/X-20A.github.io/tree/compass_dev');
	console.log('API guide: https://github.com/X-20A/X-20A.github.io/tree/main');
});
</script>

<style scoped>
.container {
  margin: auto;
  margin-top: 40px;
	padding-bottom: 8px;
  width:960px;
	background-color: #fff;
}
.input-container {
	text-align: center;
	padding: 15px 120px 20px 225px;
}
.type-select {
	margin-left: 3px;
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
	z-index: 9999;
	background-color: white;
	left: 3px;
	top: 24px;
	position: absolute;
	border: 1px solid;
}
.import-display {
	padding-left: 230px;
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
.import {
  margin:0px 10px 0px 3px;
	width: 115px;
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
	margin-bottom: 210px;
	max-width: 500px;
}
.panel-title {
	border: none;
	height: 20px;
	cursor: pointer;
}
.panel-icon {
	height: 22.5px;
	width: 22.5px;
	pointer-events: auto;
}
.panel-text {
	border-top: 1px solid #dadada;
}
.panel-text p {
	padding: 4px 0px;
}
.gap {
    display: flex;
    align-items: center;
    text-align: center;
}
.gap::before,
.gap::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: #c4c4c4;
}
.or {
    margin: 0 18px;
}
.footer {
	z-index: 9999;
	padding: 2px;
	font-size: 13px;
	color: white;
	background-color: #333333;
	width: 100%;
	position: fixed;
	bottom: 0;
	text-align: center;
}
.odaibako {
    color: #82b1ff;
    text-decoration: underline;
}
.sns-icon {
    vertical-align: middle;
		margin-right: 3px;
		height: 16px;
		width: 16px;
		color: inherit;
}
.mastodon {
	color: #3089D4;
}
.twitter {
	color: #00A0E8;
}
</style>
