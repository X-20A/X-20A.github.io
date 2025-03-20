<template>
	<div class="branch-container">
		<template v-if="selectedArea">
			<div class="info">
				<p class="area">{{ selectedArea }}</p>
				<p>
					<span>出典: </span>
					<span><a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>, </span>
					<span>出典元の最終更新: {{ last_update }}</span>
				</p>
			</div>
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
import { convertBranchDataToHTML } from '@/utils/convertUtil';
import { sanitizeText } from '@/utils/util';

// 分岐条件一覧

const store = useStore();

const selectedArea = computed(() => store.selectedArea);

const branchInfo = computed(() => store.branchInfo);

const branchData = computed(() => store.branchData);

interface Source {
	label: string,
	url: string,
}

const source = ref<Source>({
	label: '',
	url: '',
});

const last_update = ref<string>('');

const formated_branch = ref<Record<string, string>>({});

watch(selectedArea, () => {
	if (
		!selectedArea.value
		|| !branchData.value
		|| !branchInfo.value
	) return;

	const area_branch = branchData.value[selectedArea.value];

	formated_branch.value = Object.fromEntries(
    Object.entries(area_branch).map(([key, node_branch]) => {
			const topic = sanitizeText(`${selectedArea.value}-${node_branch}`);
			let html = convertBranchDataToHTML(node_branch, topic);
			
			if (html === '$sw') html = '能動分岐';
			
			return [key, html];
    })
	);

	const split = selectedArea.value.split('-');
	const world = Number(split[0]);
	const area = Number(split[1]);
	let url = '';
	if (world > 7) {
		source.value.label = 'NGA';
		url = 'https://bbs.nga.cn/read.php?tid=';
		switch (world) {
			case 57:
				url += '37312153&rand=689';
				break;
			case 58:
				url += '39444989&rand=541';
				break;
			case 59:
				url += '41012551&rand=650';
				break;
			case 60:
				url += '43475468&rand=866';
				break;
		} // @expansion
	} else {
		source.value.label = '日wiki';
		url = 'https://wikiwiki.jp/kancolle/';
		switch (world) {
			case 1:
				url += '鎮守府海域';
				break;
			case 2:
				url += '南西諸島海域';
				break;
			case 3:
				url += '北方海域';
				break;
			case 4:
				url += '南西海域';
				break;
			case 5:
				url += '南方海域';
				break;
			case 6:
				url += '中部海域';
				break;
			case 7:
				url += '南西海域';
				break;
		}
		url += `#area${area}`;
	}
	source.value.url = url;

	last_update.value = 
		branchInfo.value[selectedArea.value] !== null
		? branchInfo.value[selectedArea.value]!
		: '情報なし'
	;
}, { immediate: true });
</script>

<style scoped>
.branch-container {
	padding: 10px 40px 0px 40px;
	font-size: 13px;
}
.info {
	text-align: center;
}
.area {
	font-weight: 600;
	font-size: 16px;
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
	width: 100%;
}
</style>