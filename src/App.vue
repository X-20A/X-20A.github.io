<template>
	<Header />
	<div class="container">
		<input v-model="current_data.project_name" placeholder="計画名" @input="handleProjectNameUpdate" />
		<div class="sheet-container">
			<div class="table-wrapper">
				<table class="spread-sheet">
					<thead class="table-header">
						<tr>
							<th class="drag-column"></th>
							<th class="import-column">Import</th>
							<th class="name-column">name</th>
							<th class="resource-column">燃料</th>
							<th class="resource-column">弾薬</th>
							<th class="resource-column">鋼材</th>
							<th class="resource-column">ボーキ</th>
							<th class="resource-column">バケツ</th>
							<th class="resource-column">ダメコン</th>
							<th class="resource-column">洋上補給</th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr v-for="(row, index) in current_data.datas" :key="index" class="data-row">
							<td class="drag-handle">⋮⋮</td>
							<td>
								<input @paste="handle_paste($event, index)" type="text" class="cell import-cell" />
							</td>
							<td>
								<input v-model="row.row_name" @input="handleRowUpdate(index)" type="text" class="cell name-cell" />
							</td>
							<td>
								<input v-model.number="row.fuel" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.ammo" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.steel" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.baux" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.bucket" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.damecon" @input="handleRowUpdate(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.underway_replenishment" @input="handleRowUpdate(index)"
									class="cell resource-cell" type="number" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="total-row-container">
				<table class="spread-sheet total-table">
					<tbody>
						<tr class="total-row">
							<td class="total-label">sum</td>
							<td class="empty-cell"></td>
							<td class="total-cell">{{ sum.fuel }}</td>
							<td class="total-cell">{{ sum.ammo }}</td>
							<td class="total-cell">{{ sum.steel }}</td>
							<td class="total-cell">{{ sum.baux }}</td>
							<td class="total-cell">{{ sum.bucket }}</td>
							<td class="total-cell">{{ sum.damecon }}</td>
							<td class="total-cell">{{ sum.underway_replenishment }}</td>
							<td style="width:9px;"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { useStore } from './stores';
import { computed, onMounted } from 'vue';
import { INITIAL_SUM_DATA } from './types';
import { calc_sum_data } from './logics/sum';
import { extract_data_from_text } from './logics/extract';
import { floor_sum_data } from './logics/floor';

const store = useStore();
const current_data = computed(() => store.current_data);

const sum = computed(() => {
	if (!current_data.value) return { ...INITIAL_SUM_DATA };

	const sumed_data = calc_sum_data(current_data.value.datas);
	return floor_sum_data(sumed_data);
});

// プロジェクト名更新
const handleProjectNameUpdate = () => {
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
	});
};

// 行データ更新
const handleRowUpdate = (rowIndex: number) => {
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		datas: [...current_data.value.datas] // 配列を新しく作成してリアクティブをトリガー
	});
};

const handle_paste = (event: ClipboardEvent, row_index: number) => {
	const pasted_text = event.clipboardData?.getData('text');
	if (!pasted_text) return;

	event.preventDefault();

	try {
		const extracted_data =
			extract_data_from_text(pasted_text, current_data.value.datas[row_index]);

		store.UPDATE_ROW_DATA(extracted_data, row_index);
	} catch (error) {
		console.error(error);
	}
};

onMounted(() => {
	store.LOAD_DATA();
});
</script>

<style scoped>
.container {
	width: 100%;
	max-width: 760px;
	margin: auto;
	margin-top: 50px;
	padding: 0 20px;
}

.sheet-container {
	background: white;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	overflow: hidden;
	border: 1px solid #e0e0e0;
	display: flex;
	flex-direction: column;
	height: 82vh;
}

.table-wrapper {
	flex: 1;
	overflow: auto;
	position: relative;
}

.spread-sheet {
	width: 100%;
	border-collapse: collapse;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	font-size: 14px;
	table-layout: fixed;
}

.table-header {
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: white;
}

.table-header th {
	font-weight: 500;
	font-size: 13px;
	background-color: #f8f9fa;
	color: #495057;
	padding: 8px 0px;
	border-bottom: 2px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	text-align: center;
	white-space: nowrap;
	position: sticky;
	top: 0;
}

.table-header th:last-child {
	border-right: none;
}

.drag-column {
	width: 40px;
	background-color: #f8f9fa;
}

.import-column {
	width: 65px;
}

.name-column {
	width: 80px;
}

.resource-column {
	width: 65px;
	padding: 0px;
}

.data-row:hover {
	background-color: #f8f9fa;
}

.data-row td {
	border-bottom: 1px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	vertical-align: middle;
	padding: 0;
}

.data-row td:last-child {
	border-right: none;
}

.drag-handle {
	text-align: center;
	color: #6c757d;
	cursor: ns-resize;
	font-size: 12px;
	padding: 5px 4px;
	user-select: none;
}

.drag-handle:hover {
	color: #495057;
	background-color: #e9ecef;
}

.cell {
	width: 100%;
	border: 1px solid #ced4da;
	border-radius: 2px;
	padding: 3px 4px;
	font-size: 13px;
	background: white;
	box-sizing: border-box;
	transition: border-color 0.15s ease-in-out;
}

.cell:focus {
	outline: none;
	border-color: #4dabf7;
	box-shadow: 0 0 0 2px rgba(77, 171, 247, 0.2);
}

.import-cell,
.name-cell {
	min-width: 60px;
}

.resource-cell {
	min-width: 50px;
	text-align: right;
}

input[type="number"] {
	text-align: right;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type="number"] {
	-moz-appearance: textfield;
}

.total-row-container {
	border-top: 2px solid #4dabf7;
	position: sticky;
	bottom: 0;
	background-color: white;
	z-index: 5;
}

.total-table {
	margin-top: -1px;
	/* ボーダーの重なりを防ぐ */
}

.total-row {
	background-color: #e7f3ff;
	font-weight: 500;
}

.total-row td {
	padding: 10px 0px;
	border-bottom: none;
	border-right: 1px solid #dee2e6;
	text-align: center;
	vertical-align: middle;
}

.total-row td:last-child {
	border-right: none;
}

.total-label {
	background-color: #4dabf7;
	color: white;
	font-weight: 600;
	text-align: center;
	width: 47px;
}

.total-cell {
	font-weight: 600;
	color: #1971c2;
	background-color: #e7f3ff;
}
.empty-cell {
	width: 168px;
}

/* スクロール可能なテーブルの場合 */
@media (max-width: 1200px) {
	.sheet-container {
		overflow-x: auto;
	}

	.spread-sheet {
		min-width: 900px;
	}
}
</style>