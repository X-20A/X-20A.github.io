<template>
  <div
		v-if="isAreaVisible"
		@mousedown.stop
		class="area-container"
	>
    <div class="box">
      <div class="inner">
				<div style="flex-grow: 1;"> <!-- 通常海域 -->
					<div v-for="(world, index) in worlds" :key="index">
						<div class="world-box">
							<span class="world-name">{{ world.name }}</span>
							<hr class="beside-bar" />
						</div>
						<button
							v-for="area in world.areas"
							:key="area.value"
							class="areas"
							:value="area.value"
							@mousedown="selectArea(area.value)"
						>
							{{ area.label }}
						</button>
					</div>
				</div>
        
        <div style="flex-grow: 12;"> <!-- イベント海域 -->
          <div v-for="(event, index) in events" :key="'event-' + index">
            <div class="world-box">
              <span class="world-name" :style="{ color: event.color || '' }">
                {{ event.name }}
              </span>
              <hr class="beside-bar" />
            </div>
            <button
              v-for="area in event.areas"
              :key="area.value"
              class="areas"
              :value="area.value"
              @mousedown="selectArea(area.value)"
            >
              {{ area.label }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore, useModalStore } from '@/stores';
import type { AreaId } from '@/classes/types';

// 海域選択モーダル

const store = useStore();
const modalStore = useModalStore();

const selectArea = (area_id: AreaId) => {
  store.UPDATE_SELECTED_AREA(area_id);
	store.SAVE_DATA();

	modalStore.HIDE_MODALS();
};

const isAreaVisible = computed(() => modalStore.isAreaVisible);

type AreaItem = {
    value: AreaId;
    label: string;
};

type Area = {
    name: string;
    color?: string;
    areas: AreaItem[];
};

// 通常海域
const worlds: Area[] = [
  {
    name: "鎮守府海域",
    areas: [
      { value: "1-1", label: "1-1" },
      { value: "1-2", label: "1-2" },
      { value: "1-3", label: "1-3" },
      { value: "1-4", label: "1-4" },
      { value: "1-5", label: "1-5" },
      { value: "1-6", label: "1-6" },
    ],
  },
  {
    name: "南西諸島海域",
    areas: [
      { value: "2-1", label: "2-1" },
      { value: "2-2", label: "2-2" },
      { value: "2-3", label: "2-3" },
      { value: "2-4", label: "2-4" },
      { value: "2-5", label: "2-5" },
    ],
  },
	{
    name: "北方海域",
    areas: [
      { value: "3-1", label: "3-1" },
      { value: "3-2", label: "3-2" },
      { value: "3-3", label: "3-3" },
      { value: "3-4", label: "3-4" },
      { value: "3-5", label: "3-5" },
    ],
  },
	{
    name: "西方海域",
    areas: [
      { value: "4-1", label: "4-1" },
      { value: "4-2", label: "4-2" },
      { value: "4-3", label: "4-3" },
      { value: "4-4", label: "4-4" },
      { value: "4-5", label: "4-5" },
    ],
  },
	{
    name: "南方海域",
    areas: [
      { value: "5-1", label: "5-1" },
      { value: "5-2", label: "5-2" },
      { value: "5-3", label: "5-3" },
      { value: "5-4", label: "5-4" },
      { value: "5-5", label: "5-5" },
    ],
  },
	{
    name: "中部海域",
    areas: [
      { value: "6-1", label: "6-1" },
      { value: "6-2", label: "6-2" },
      { value: "6-3", label: "6-3" },
      { value: "6-4", label: "6-4" },
      { value: "6-5", label: "6-5" },
    ],
  },
	{
    name: "南西海域",
    areas: [
      { value: "7-1", label: "7-1" },
      { value: "7-2", label: "7-2" },
      { value: "7-3", label: "7-3" },
      { value: "7-4", label: "7-4" },
      { value: "7-5", label: "7-5" },
    ],
  },
];

// イベント
const events: Area[] = [
	{
		name: '2025春',
		color: "aqua",
		areas: [
			{ value: "60-1", label: "E-1" },
			// { value: "60-2", label: "E-2" },
			// { value: "60-3", label: "E-3" },
			// { value: "60-4", label: "E-4" },
			// { value: "60-5", label: "E-5" },
			// { value: "60-6", label: "E-6" },
		],
	},
  {
    name: "2024夏",
    areas: [
      { value: "59-1", label: "E-1" },
      { value: "59-2", label: "E-2" },
      { value: "59-3", label: "E-3" },
      { value: "59-4", label: "E-4" },
      { value: "59-5", label: "E-5" },
    ],
  },
  {
    name: "2024早春",
    areas: [
      { value: "58-1", label: "E-1" },
      { value: "58-2", label: "E-2" },
      { value: "58-3", label: "E-3" },
      { value: "58-4", label: "E-4" },
    ],
  },
  {
    name: "2023夏",
    areas: [{ value: "57-7", label: "E-7" }],
  },
];
</script>

<style scoped>
.area-container {
  justify-content: center;
	width: 543px;
	z-index: 999999999;
	position: fixed;
	top: 120px;
}
.box {
	border-radius: 4px;
	background-color: #202129;
	opacity: 1;
	color: white;
}
.inner {
	padding: 16px;
	gap: 16px;
	display: flex;
}
.world-box, .conf-inner {
	display:flex;
	align-items: center;
}
.conf-inner {
	padding: 10px 20px;
}
.world-name, .conf-name {
	line-height: inherit;
	user-select: none;
	margin: 0px;
	font-family: var(--font-body);
	font-weight: 400;
	font-size: 0.75rem;
	color: rgba(255, 255, 255, 0.7);
}
.beside-bar {
	margin: 0px 0px 2px 8px;
	flex-shrink: 0;
	border-width: 0px 0px thin;
	border-style: solid;
	border-color: rgba(255, 255, 255, 0.12);
	-webkit-box-flex: 1;
	flex-grow: 1;
}
.areas {
	letter-spacing: 0.01em;
	background-color: transparent;
	border: 0px currentcolor;
	margin: 0px;
	cursor: pointer;
	user-select: none;
	vertical-align: middle;
	appearance: none;
	text-decoration: none;
	font-family: var(--font-body);
	font-size: 0.8rem;
	line-height: 1.75;
	padding: 6px 8px;
	border-radius: 4px;
	transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
	color: inherit;
	text-transform: none;
	min-width: 0px;
	font-weight: 400;
}
.areas:hover {
	text-decoration: none;
	background-color: rgba(255, 255, 255, 0.08);
}
</style>
