<template>
	<template v-if="selectedArea">

	</template>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useStore } from '@/stores';
import { branch_info } from '@/data/branch';
import branch_data from '@/data/branch';
import { convertBranchDataToHTML } from '@/utils/convertUtil';

const store = useStore();

const selectedArea = computed(() => store.selectedArea);

const formated_branch = ref<Record<string, string>>({});

watch(selectedArea, () => {
	console.log('発火');
	if (!selectedArea.value) return;

	const area_branch = branch_data[selectedArea.value];

	formated_branch.value = Object.fromEntries(
		Object.entries(area_branch).map(([key, node_branch]) => [key, convertBranchDataToHTML(node_branch)])
	);
	console.log(formated_branch.value);
}, { immediate: true });
</script>

<style scoped>
</style>