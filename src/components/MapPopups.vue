<template>
	<StandardResourcePopup v-if="standardResource" :data="standardResource" :style="popupStyle" class="popup popup-info" />
	<SyonanResourcePopup v-if="syonanResource" :data="syonanResource" :style="popupStyle" class="popup popup-info" />
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
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores';
import { EDGE_DATAS } from '../data/map';
import type { StandardResource } from '../models/resource/StandardResource';
import type { SyonanResource } from '../models/resource/SyonanResource';

const StandardResourcePopup = defineAsyncComponent(() => import(
	'./resource/StandardResourcePopup.vue'
));
const SyonanResourcePopup = defineAsyncComponent(() => import(
	'./resource/SyonanResourcePopup.vue'
));

defineProps<{
	branchHtml: string | null;
	popupStyle: { top: string; left: string };
	node: string | null;
	standardResource: StandardResource | null;
	syonanResource: SyonanResource | null;
}>();

const store = useStore();
const { options, drewArea } = storeToRefs(store);

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
</script>
