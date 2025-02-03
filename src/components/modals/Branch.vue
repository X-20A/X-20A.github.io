<template>
	<div class="branch-container">
		<template v-if="selectedArea">
			<table>
				<tbody>
					<template v-for="([key, html]) in Object.entries(formated_branch)" :key="key">
						<tr>
							<td class="node">
								<span>{{ key }}</span>
							</td>
							<td class="text">
								<p v-html="html"></p>
							</td>
						</tr>
					</template>
				</tbody>
			</table>
		</template>
	</div>
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
	if (!selectedArea.value) return;

	const area_branch = branch_data[selectedArea.value];

	formated_branch.value = Object.fromEntries(
    Object.entries(area_branch).map(([key, node_branch]) => {
        let html = convertBranchDataToHTML(node_branch);
				
        if (html === '$sw') html = '能動分岐';
        
        return [key, html];
    })
);

}, { immediate: true });
</script>

<style scoped>
.branch-container {
	padding: 20px 40px 0px 40px;
	font-size: 13px;
}
table {
	border-collapse: collapse;
	margin-bottom: 300px;
}
table td, table tr {
	border: 1px solid silver;
}
.node {
	padding: 0px 4px;
	text-align: center;
}
.text {
	padding: 2px 8px;
}
</style>