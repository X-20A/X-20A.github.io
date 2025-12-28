<template>
	<div v-if="is_refference_visible" @pointerdown.stop class="refference-container">
		<v-tabs v-model="tab_key" align-tabs="center" show-arrows class="tab-header" color="#1976d2" bg-color="primary">
			<v-tab class="custom-tab" value="route">経路</v-tab>
			<v-tab class="custom-tab" value="branch">分岐条件</v-tab>
			<v-tab class="custom-tab" value="quest">任務</v-tab>
		</v-tabs>

		<v-tabs-window v-model="tab_key">
			<v-tabs-window-item value="route">
				<Route />
			</v-tabs-window-item>
			<v-tabs-window-item value="branch">
				<Branch />
			</v-tabs-window-item>
			<v-tabs-window-item value="quest">
				<Quest />
			</v-tabs-window-item>
		</v-tabs-window>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Route from '../tabs/Route.vue';
import Branch from '../tabs/Branch.vue';
import Quest from '../tabs/Quest.vue';
import { useModalStore, useStore } from '../../stores';

/** タブ識別子 */
export type RefferenceTabKey = 'route' | 'branch' | 'quest';

const store = useStore();
const modal_store = useModalStore();

const tab_key = computed<RefferenceTabKey>({
	get: () => store.refferenceTabKey ?? 'route',
	set: (value) => {
		store.UPDATE_REFFERENCE_TAB_KEY(value);
		store.SAVE_DATA();
	},
});

const is_refference_visible = computed(
	() => modal_store.isRefferenceVisible,
);
</script>

<style scoped>
.refference-container {
	width: 590px;
	height: 90vh;
	max-height: 820px;
	background-color: white;
	overflow-y: scroll;
	overflow-x: hidden;
	scrollbar-gutter: stable;
	overscroll-behavior: contain;
	margin-top: 50px;
}

.tab-header {
	border-bottom: 1px solid #e0e0e0;
	color: #1976d2;
	top: 0;
	z-index: 10;
}

.custom-tab {
	cursor: pointer;
	color: #8b8b8b;
}
</style>