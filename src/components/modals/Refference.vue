<template>
	<div
		v-if="isRefferenceVisible"
		@mousedown.stop
		class="refference-container"
	>
		<v-tabs
    v-model="tab"
    align-tabs="center"
    show-arrows
    class="tab-header"
    color="#1976d2"
    bg-color="primary"
  >
    <v-tab class="custom-tab" :value="route" @mousedown="tab = route">経路</v-tab>
    <v-tab class="custom-tab" :value="branch" @mousedown="tab = branch">分岐条件</v-tab>
  </v-tabs>
		<v-tabs-window v-model="tab">
			<v-tabs-window-item :value="Route">
				<Route />
			</v-tabs-window-item>
			<v-tabs-window-item :value="Branch">
				<Branch />
			</v-tabs-window-item>
		</v-tabs-window>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Route from '../tabs/Route.vue';
import Branch from '../tabs/Branch.vue';
import { useStore, useModalStore } from '@/stores';

// 経路/分岐条件一覧

// mousedownにしたいのでちょっと工夫
const route = ref(Route);
const branch = ref(Branch);
const tab = ref(route.value);

const store = useStore();
const modalStore = useModalStore();

const isRefferenceVisible = computed(() => modalStore.isRefferenceVisible);
</script>

<style scoped>
.refference-container {
	width: 590px;
	height: 90vh;
	max-height: 820px;
	background-color: white;
	overflow: scroll;
	overflow-x: hidden;
	overscroll-behavior: contain;
}
.tab-header {
	border-bottom: 1px solid #E0E0E0;
	color: #1976d2;
	top: 0;
	z-index: 10;
}
.custom-tab {
	cursor: pointer;
	color: #8b8b8b;
}
</style>