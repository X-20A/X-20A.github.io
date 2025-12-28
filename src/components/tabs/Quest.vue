<template>
	<div class="composition-condition">
		<p class="attention-note">※到達率の演算には現在の設定の能動分岐が使用されます</p>

		<template v-for="data in view_quest_datas" :key="data.zekamashi_id">
			<div class="quest-block">
				<div class="quest-header">
					<div class="sortie-icon-wrapper">
						<img :src="`./quest/sortie_quest.png`" class="sortie-icon" alt="sortie quest" />
						<img :src="`./quest/${data.icon}.png`" class="sortie-overlay-icon" alt="overlay icon" />
					</div>

					<p class="quest-name">
						<span class="quest-name-text">
							{{ data.name }}
						</span>
					</p>

					<a :href="build_zekamashi_url(data.zekamashi_id)" target="_blank" rel="noopener noreferrer"
						aria-label="ぜかましURL">
						<img :src="`./quest/zekamashi.ico`" class="zekamashi-icon" alt="zekamashi icon" />
					</a>
				</div>

				<div class="area-tree">
					<div class="area-node condition-node">
						<span class="tree-line"></span>
						<p class="area-text">
							<span class="condition-label">編成条件</span>
							<span class="condition-state" :class="composition_condition_class(data.composition_condition_state)">
								{{ composition_condition_text(data.composition_condition_state) }}
							</span>
						</p>
					</div>

					<div class="area-node summary-node">
						<span class="tree-line"></span>
						<p class="area-text">
							<span class="area-label">到達率</span>
							<span class="area-results">
								<template v-for="(sim_result, index) in data.area_sim_results" :key="sim_result.area_id">
									<span class="area-id" @pointerdown="select_area(sim_result.area_id)">
										{{ sim_result.area_id }}
									</span>
									<span class="area-rate">
										: {{ sim_result.reach_rate }}%
									</span>
									<span v-if="index < data.area_sim_results.length - 1">
										,
									</span>
								</template>
							</span>
						</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch, Ref } from 'vue';
import { useStore } from '../../stores';
import { QUEST_DATAS } from '../../data/quest';
import { calc_view_quest_data, ViewQuestData } from '../../logic/quest/search';
import { CompositionCondition } from '../../logic/quest/conditions';
import { NormalAreaId } from '../../types';

const store = useStore();

const selected_area = computed(() => store.selectedArea);
const adopt_fleet = computed(() => store.adoptFleet);
const options = computed(() => store.options);

const ZEKAMASHI_ENDPOINT = 'https://zekamashi.net/kancolle-kouryaku';

const build_zekamashi_url = (zekamashi_id: string): string => {
	return `${ZEKAMASHI_ENDPOINT}/${zekamashi_id}`;
};

const select_area = (area_id: NormalAreaId): void => {
	store.UPDATE_SELECTED_AREA(area_id);
	store.SAVE_DATA();
};

/** 編成条件の表示テキストを返す */
function composition_condition_text(
	state: CompositionCondition,
): string {
	if (state === 'No_conditions') {
		return '条件なし';
	}
	return state ? '✔' : '✖';
}

/** 編成条件の表示用クラス名を返す */
function composition_condition_class(
	state: CompositionCondition,
): 'condition-none' | 'condition-ok' | 'condition-ng' {
	if (state === 'No_conditions') {
		return 'condition-none';
	}
	return state ? 'condition-ok' : 'condition-ng';
}

const QUEST_DATA_VALUES = Object.values(QUEST_DATAS);

const view_quest_datas: Ref<readonly ViewQuestData[]> = ref([]);

watch(
	[selected_area, adopt_fleet, options],
	async (): Promise<void> => {
		if (!selected_area.value || !adopt_fleet.value || !options.value) {
			view_quest_datas.value = [];
			return;
		}

		view_quest_datas.value = await calc_view_quest_data(
			QUEST_DATA_VALUES,
			adopt_fleet.value,
			options.value,
		);
	},
	{ immediate: true },
);
</script>

<style scoped>
.composition-condition {
	padding: 5px 16px;
}

.attention-note {
	font-size: 14px;
	color: #e63026;
	margin-bottom: 0px;
}

.quest-block {
	border-top: 1px solid #e4e4e4;
}

.quest-block:last-child {
	border-bottom: 1px solid #e4e4e4;
}

.quest-header {
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 8px;
}

.sortie-icon-wrapper {
	position: relative;
	height: 48px;
	width: 48px;
	flex-shrink: 0;
	margin-top: 4px;
}

.sortie-icon {
	height: 48px;
	width: 48px;
	display: block;
}

.sortie-overlay-icon {
	position: absolute;
	right: -2px;
	bottom: -2px;
	height: 16px;
	width: 16px;
}

.quest-name {
	margin: 0;
	font-size: 13px;
	color: #333;
	display: inline-flex;
	align-items: baseline;
}

.zekamashi-icon {
	position: absolute;
	top: 2px;
	right: 0;
	height: 15px;
	width: 15px;
	cursor: pointer;
}

.area-tree {
	position: relative;
	margin-left: 54px;
	margin-top: -32px;
}

.area-tree::before {
	content: '';
	position: absolute;
	left: 8px;
	top: -4px;
	bottom: 8px;
	width: 1px;
	background-color: #bbb;
}

.area-node {
	position: relative;
	display: flex;
	align-items: flex-start;
	padding-left: 20px;
}

.tree-line {
	position: absolute;
	left: 8px;
	top: 0.85em;
	width: 12px;
	height: 1px;
	background-color: #bbb;
}

.area-text {
	margin: 0;
	font-size: 13px;
	color: #555;
	display: flex;
	align-items: center;
	gap: 6px;
}

.condition-label {
	color: #777;
}

.condition-state {
	min-width: 3em;
	text-align: center;
	border-radius: 4px;
	padding: 0 6px;
	font-size: 13px;
}

.condition-none {
	color: #555;
	background-color: #eee;
}

.condition-ok {
	color: #1b7f3a;
	background-color: #e3f4ea;
}

.condition-ng {
	color: #b3261e;
	background-color: #fde8e6;
}

.area-label {
	color: #777;
}

.area-id {
	color: #2c5cc5;
	cursor: pointer;
	text-decoration: underline;
	text-underline-offset: 2px;
}

.area-id:hover {
	color: #1f4aa3;
	text-decoration-style: solid;
}

.area-rate {
	color: #555;
}
</style>
