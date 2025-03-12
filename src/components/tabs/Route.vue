<template>
	<div class="route-container">
		<template v-if="simResult.length > 0">
			<div class="controller">
				<label class="label">
					<input type="checkbox" v-model="isBattleOnly" />
					戦闘マスのみ
				</label>
				<div style="display: flex;">
					<span
						v-if="isMessageVisible"
						style="margin-right: 7px;color: #70D800;"
					>
						copied.
					</span>
					<SvgIcon
						name="content-copy"
						@mousedown="copyRoutes"
						color="#959594"
						class="copy-icon"
					></SvgIcon>
				</div>
			</div>
			<template v-for="result in formated_result">
				<div class="result">
					<span class="route">{{ result.route }}</span>
					<span class="rate">{{ result.rate }}%</span>
				</div>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStore } from '@/stores';
import SvgIcon from '@/components/SvgIcon.vue';
import { node_datas } from '@/data/map';

// 経路一覧

const store = useStore();

const selectedArea = computed(() => store.selectedArea);

const isBattleOnly = ref<boolean>(false);

const simResult = computed(() => store.simResult);

interface Routes {
	route: string,
	rate: number,
}
const formated_result = ref<Routes[]>([]);

watch([simResult, isBattleOnly], () => {
	if (!simResult.value) return;

	if (isBattleOnly.value === true) {
		const area_nodes = node_datas[selectedArea.value!];
		formated_result.value = simResult.value
			.sort((a, b) => b.rate.minus(a.rate).toNumber())
			.map(item => ({
				route: item.route
					.filter(node => {
						return ['en','ni','bo','ab','ad','su','as'].includes(area_nodes[node][2]);
					}).join(" - "),
				rate: item.rate.times(100).toNumber(),
			})
		);
	} else {
		formated_result.value = simResult.value
			.sort((a, b) => b.rate.minus(a.rate).toNumber())
			.map(item => ({
				route: item.route.join(" - "),
				rate: item.rate.times(100).toNumber(),
			})
		);
	}
}, { immediate: true });

const isMessageVisible = ref(false);

const copyRoutes = () => { // 桁揃えるぞ～
	if (!formated_result.value?.length) return;

	const results = formated_result.value;

	// 小数点を含む rate の最大整数部と小数部の長さを取得
	const maxIntegerLength = Math.max(...results.map(result => String(Math.floor(result.rate)).length));
	const maxDecimalLength = Math.max(...results.map(result => (String(result.rate).split('.')[1] || '').length));

	const text = results
		.map(result => {
			const [integerPart, decimalPart = ''] = String(result.rate).split('.');
			const paddedInteger = integerPart.padStart(maxIntegerLength, ' ');
			const paddedDecimal = decimalPart.padEnd(maxDecimalLength, ' ');
			const formattedRate = paddedDecimal.match(/\S/g) ? `${paddedInteger}.${paddedDecimal}` : `${paddedInteger} ${paddedDecimal}`;

			return `${formattedRate} %: ${result.route}`;
		})
		.join('\n');

	// クリップボードにコピー
	navigator.clipboard.writeText(text);

	isMessageVisible.value = true;
	setTimeout(() => {
		isMessageVisible.value = false;
	}, 2000);
};

</script>
<style scoped>
.route-container {
	padding: 20px 40px 0px 40px;
}
.controller {
	border-bottom: 1px solid #c4c4c4;
	display: flex
;
    justify-content: space-between;
}
.label {
	cursor: pointer;
	user-select: none;
}
.copy-icon {
	width: 20px;
	height: 20px;
	cursor: pointer;
}
.result {
	display: flex;
	justify-content: space-between;
	white-space: nowrap;
}
.rate {
	white-space: nowrap;
	text-align: left;
}
.route {
	white-space: nowrap;
}
</style>