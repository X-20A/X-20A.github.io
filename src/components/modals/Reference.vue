<template>
	<div v-if="is_reference_visible" @pointerdown.stop class="reference-container">
		<div class="tab-header tabs" role="tablist">
			<button v-for="tab in TABS" :key="tab.key" type="button" role="tab"
				class="tab custom-tab" :class="{ 'tab--selected': tab_key === tab.key }"
				:style="tab_key === tab.key ? { color: '#1976d2' } : undefined"
				:aria-selected="tab_key === tab.key" :tabindex="tab_key === tab.key ? 0 : -1"
				@pointerdown.prevent="handle_tab_pointer_down(tab.key)"
				@click="handle_tab_pointer_down(tab.key)">
				{{ tab.label }}
				<div class="tab-slider" :ref="el => { slider_els[tab.key] = el as HTMLElement | null }"></div>
			</button>
		</div>

		<div class="tabs-window" ref="window_root">
			<div class="tabs-window-container" :style="{ height: container_height }">
				<Transition v-for="tab in TABS" :key="tab.key" :name="transition_name"
					@before-enter="on_before_transition" @enter="on_enter_transition"
					@after-enter="on_after_transition" @enter-cancelled="on_after_transition"
					@before-leave="on_before_transition"
					@after-leave="on_after_transition" @leave-cancelled="on_after_transition">
					<div v-if="visited[tab.key]" v-show="tab_key === tab.key" class="tabs-window-item">
						<Route v-if="tab.key === 'route'" />
						<Branch v-else-if="tab.key === 'branch'" />
						<Quest v-else />
					</div>
				</Transition>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, nextTick, ref, watch } from 'vue';
import Route from '../tabs/Route.vue';
import Branch from '../tabs/Branch.vue';

// Route, Branchは非同期読込すると却ってモタる
const Quest = defineAsyncComponent(() => import(
	'../tabs/Quest.vue'
));

import { useModalStore, useStore } from '../../stores';

/** タブ識別子 */
export type TabKey = 'route' | 'branch' | 'quest';

const TABS = [
	{ key: 'route', label: '経路' },
	{ key: 'branch', label: '分岐条件' },
	{ key: 'quest', label: '任務' },
] as const satisfies readonly { key: TabKey, label: string }[];

const store = useStore();
const modal_store = useModalStore();

const tab_key = computed<TabKey>({
	get: () => store.referenceTabKey ?? 'route',
	set: (value) => {
		store.UPDATE_REFERENCE_TAB_KEY(value);
		store.SAVE_DATA();
	},
});

const is_reference_visible = computed(
	() => modal_store.isReferenceVisible,
);

/**
 * 一度表示したタブは以降マウントしたまま保持する(v-tabs-window互換)
 * モーダルを閉じたらリセット
 */
const visited = ref<Record<TabKey, boolean>>({ route: false, branch: false, quest: false });

watch(tab_key, (key) => {
	visited.value[key] = true;
}, { immediate: true });

watch(is_reference_visible, (visible) => {
	if (!visible) {
		visited.value = { route: false, branch: false, quest: false };
		visited.value[tab_key.value] = true;
	}
});

const index_of = (key: TabKey): number => TABS.findIndex(tab => tab.key === key);

// v-window互換の逆方向判定(端から端への移動は巡回扱い)
const is_reversed = (old_index: number, new_index: number): boolean => {
	const last_index = TABS.length - 1;
	if (new_index === last_index && old_index === 0) return true;
	if (new_index === 0 && old_index === last_index) return false;
	return new_index < old_index;
};

const transition_name = ref<'window-x' | 'window-x-reverse'>('window-x');

const slider_els = ref<Record<TabKey, HTMLElement | null>>({ route: null, branch: null, quest: null });

/**
 * 選択タブ下線のスライドアニメーション(VTab.updateSliderの移植)
 * DOM更新前に呼ぶこと(旧タブの色・位置を参照する為)
 */
const animate_slider = (prev_key: TabKey, next_key: TabKey): void => {
	const prev_el = slider_els.value[prev_key];
	const next_el = slider_els.value[next_key];
	if (!prev_el || !next_el) return;

	const color = getComputedStyle(prev_el).color;
	const prev_box = prev_el.getBoundingClientRect();
	const next_box = next_el.getBoundingClientRect();
	const delta = prev_box.x > next_box.x
		? prev_box.right - next_box.right
		: prev_box.x - next_box.x;
	const origin = Math.sign(delta) > 0
		? 'right'
		: Math.sign(delta) < 0
			? 'left'
			: 'center';
	const size = Math.abs(delta) + (Math.sign(delta) < 0 ? prev_box.width : next_box.width);
	const scale = size / Math.max(prev_box.width, next_box.width) || 0;
	const initial_scale = prev_box.width / next_box.width || 0;
	const sigma = 1.5;
	next_el.animate({
		backgroundColor: [color, 'currentcolor'],
		transform: [
			`translateX(${delta}px) scaleX(${initial_scale})`,
			`translateX(${delta / sigma}px) scaleX(${(scale - 1) / sigma + 1})`,
			'none',
		],
		transformOrigin: Array(3).fill(origin),
	}, {
		duration: 225,
		easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
	});
};

const handle_tab_pointer_down = (
	selected_tab_key: TabKey,
) => {
	const prev_key = tab_key.value;
	if (selected_tab_key !== prev_key) {
		transition_name.value = is_reversed(index_of(prev_key), index_of(selected_tab_key))
			? 'window-x-reverse'
			: 'window-x';
		animate_slider(prev_key, selected_tab_key); // DOM更新はまだ走っていないので旧状態を参照できる
	}
	tab_key.value = selected_tab_key;
};

// v-window互換のコンテナ高さ遷移
let transition_count = 0;
const container_height = ref<string | undefined>(undefined);
const window_root = ref<HTMLElement | null>(null);

const on_before_transition = (): void => {
	if (transition_count === 0 && window_root.value) {
		container_height.value = `${window_root.value.clientHeight}px`;
	}
	transition_count += 1;
};

const on_after_transition = (): void => {
	if (transition_count === 0) return;
	transition_count -= 1;
	if (transition_count === 0) {
		container_height.value = undefined;
	}
};

const on_enter_transition = (el: Element): void => {
	nextTick(() => {
		container_height.value = `${(el as HTMLElement).clientHeight}px`;
	});
};
</script>

<style scoped>
.reference-container {
	width: 590px;
	height: 90vh;
	max-height: 820px;
	background-color: white;
	overflow-y: auto;
	overflow-x: hidden;
	scrollbar-gutter: stable;
	overscroll-behavior: contain;
	margin-top: 50px;
}

.tab-header {
	position: sticky;
	top: 0;
	background-color: white;
	border-bottom: 1px solid #e0e0e0;
	color: #1976d2;
	/* モーダル内スクロールコンテンツに対するローカル */
	z-index: 1;
}

.tabs {
	display: flex;
	height: 48px;
}
/* align-tabs-center相当 */
.tab:first-child {
	margin-inline-start: auto;
}
.tab:last-child {
	margin-inline-end: auto;
}
.tab {
	position: relative;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 auto;
	height: 48px;
	min-width: 90px;
	max-width: 360px;
	padding: 0 16px;
	border: none;
	border-radius: 0;
	background-color: transparent;
	outline: none;
	font-family: Roboto, sans-serif; /* Vuetifyが当てていたフォントを維持 */
	font-size: 14px;
	font-weight: 500;
	letter-spacing: 0.0892857143em;
	line-height: normal;
	text-transform: uppercase;
}
/* hover/focus時のオーバーレイ */
.tab::before {
	content: '';
	position: absolute;
	inset: 0;
	background-color: currentColor;
	opacity: 0;
	pointer-events: none;
	transition: opacity 0.2s ease-in-out;
}
.tab:hover::before {
	opacity: 0.04;
}
.tab:focus-visible::before {
	opacity: 0.12;
}
.tab-slider {
	position: absolute;
	bottom: 0;
	left: 0;
	height: 2px;
	width: 100%;
	background: currentColor;
	pointer-events: none;
	opacity: 0;
}
.tab--selected .tab-slider {
	opacity: 1;
}

.custom-tab {
	cursor: pointer;
	color: #8b8b8b;
}

.tabs-window {
	overflow: hidden;
}
.tabs-window-container {
	display: flex;
	flex-direction: column;
	height: inherit;
	position: relative;
	transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
/* v-window-x-transition互換 */
.window-x-enter-active,
.window-x-leave-active,
.window-x-reverse-enter-active,
.window-x-reverse-leave-active {
	transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}
.window-x-leave-from,
.window-x-leave-to,
.window-x-reverse-leave-from,
.window-x-reverse-leave-to {
	position: absolute !important;
	top: 0;
	width: 100%;
}
.window-x-enter-from {
	transform: translateX(100%);
}
.window-x-leave-to {
	transform: translateX(-100%);
}
.window-x-reverse-enter-from {
	transform: translateX(-100%);
}
.window-x-reverse-leave-to {
	transform: translateX(100%);
}
</style>
