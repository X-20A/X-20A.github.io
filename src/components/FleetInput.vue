<template>
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
						<span class="fleet-type" @pointerdown=update_selected_type(1)>第一艦隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(2)>第二艦隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(3)>第三艦隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(4)>第四艦隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(5)>空母機動部隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(6)>水上打撃部隊</span>
						<span class="fleet-type" @pointerdown=update_selected_type(7)>輸送護衛部隊</span>
					</div>
				</div>
				<Option />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores';
import Option from './Option.vue';

const emit = defineEmits<{
	load: [text: string];
	selectType: [type_id: number];
}>();

const store = useStore();
const { fleetComponents } = storeToRefs(store);

const fleetInput = ref(''); // 入力取得用
const fleetInputRef = ref<HTMLInputElement | null>(null); // focus用

const isVisibleTypeSelect = computed(() => fleetComponents.value.filter(item => item !== null).length >= 2);
const isFleetOptionsVisible = ref(false);

const showFleetOptions = () => {
	isFleetOptionsVisible.value = true;
};
const hideFleetOptions = () => {
	isFleetOptionsVisible.value = false;
};

const update_selected_type = (type_id: number) => {
	emit('selectType', type_id);
};

// import貼り付け
watch(fleetInput, (text) => {
	if (!text) return;

	fleetInput.value = ''; // 空欄化
	emit('load', text);
});

onMounted(() => {
	fleetInputRef.value?.focus();
});
</script>

<style scoped>
.input-container {
	text-align: center;
	padding-top: 15px;
	padding-bottom: 20px;
}
.type-select {
	width: 119px;
	border: solid 1px;
	font-size: 14px;
	padding-left: 2px;
	border-radius: 2px;
	color: #5f5f5f;
}
.fleet-option-box {
	width: 121px;
	font-size: 14px;
	z-index: var(--z-popover);
	background-color: white;
	top: 24px;
	position: absolute;
	border: 1px solid;
}
.split {
	display: flex;
}
.fleet-type {
	cursor: pointer;
	display: block;
	user-select: none;
}

.fleet-type:hover {
	background-color: rgb(0 0 0 / 8%);
}
.inputs {
	flex: 1;
	text-align: left;
	flex: 1;
	display: flex;
}
.import {
	margin: 0px 10px 0px 0px;
	max-width: 115px;
}
</style>
