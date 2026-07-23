<template>
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
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from '../stores';
import SvgIcon from './SvgIcon.vue';
import { type AdoptFleet, is_speed_overridden } from '../models/fleet/AdoptFleet';
import type { Sp as FleetSpeed } from '../logic/speed/predicate';

defineProps<{
	screenShot: () => void;
}>();

const store = useStore();
const modalStore = useModalStore();
const { adoptFleet, simResult } = storeToRefs(store);

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

const switchSeek = () => {
	store.SWITCH_SEEK();
};

const show_reference = () => {
	modalStore.SHOW_REFERENCE();
};
</script>

<style scoped>
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
</style>
