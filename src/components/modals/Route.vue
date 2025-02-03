<template>
	<div class="route-container">
		<template v-if="simResult.length > 0">
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

const store = useStore();

type Routes = {
	route: string,
	rate: number,
}

const simResult = computed(() => store.simResult);

const formated_result = ref<Routes[]>([]);

watch(simResult, () => {
	if (!simResult.value) return;

	formated_result.value = simResult.value
		.sort((a, b) => b.rate.minus(a.rate).toNumber())
		.map(item => ({
			route: item.route.join(" → "),
			rate: item.rate.times(100).toNumber(),
		})
	);
}, { immediate: true });
</script>
<style scoped>
.route-container {
	padding: 20px 40px 0px 40px;
}
.result {
	display: flex;
}
.rate {
	flex: 1;
	text-align: left;
}
.route {
	flex: 5;
}
</style>