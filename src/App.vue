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
		<MapResult :screen-shot="screenShot" />
	</div>
	<ModalHost />
	<MapPopups
		:branch-html="branch_html"
		:popup-style="popup_style"
		:node="node"
		:standard-resource="standard_resource"
		:syonan-resource="syonan_resource"
	/>
	<DetailBox />
	<Footer />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from './stores';
import Header from './components/Header.vue';
import FleetInput from './components/FleetInput.vue';
import FleetSummary from './components/FleetSummary.vue';
import MapResult from './components/MapResult.vue';
import MapPopups from './components/MapPopups.vue';
import ModalHost from './components/modals/ModalHost.vue';
import DetailBox from './components/Detail.vue';
import Footer from './components/Footer.vue';
import { useFleetPipeline } from './composables/useFleetPipeline';
import { useSimulation } from './composables/useSimulation';
import { useModalScrollLock } from './composables/useModalScrollLock';
import { usePopup } from './composables/usePopup';
import { useMapRenderer } from './composables/useMapRenderer';
import { useScreenshot } from './composables/useScreenshot';

const store = useStore();
const modalStore = useModalStore();
const { selectedArea } = storeToRefs(store);

const { load_fleet, adjust_fleet_type } = useFleetPipeline();
useSimulation();
useModalScrollLock();

const popup = usePopup();
const {
	branch_html,
	popup_style,
	node,
	standard_resource,
	syonan_resource,
} = popup;

const renderer = useMapRenderer({ popup });
const { screenShot } = useScreenshot({ getMapCore: renderer.getMapCore });

const show_area = () => {
	modalStore.SHOW_AREA();
};

onMounted(() => {
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
</style>
