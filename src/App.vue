<template>
	<Header />
	<div class="container">
		<input v-if="current_data" :value="current_data.name"></input>
		<div class="sheet-container">
			<table class="spread-sheet">
				<thead>
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
				<tbody>
					<tr v-for="(row, index) in rows" :key="index" class="data-row">
						<td class="drag-handle">⋮⋮</td>
						<td><input type="text" class="cell import-cell" /></td>
						<td><input type="text" class="cell name-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
						<td><input type="number" class="cell resource-cell" /></td>
					</tr>
					<tr class="total-row">
						<td class="total-label">sum</td>
						<td class="total-cell">-</td>
						<td class="total-cell">-</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
						<td class="total-cell">999999</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { useStore } from './stores';
import { computed, onMounted, ref } from 'vue';

const store = useStore();
const current_data = computed(() => store.current_data);

// サンプルデータ
const rows = ref(Array(100).fill(0));

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
}

.spread-sheet {
	width: 100%;
	border-collapse: collapse;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
	font-size: 14px;
}

th {
	font-weight: 500;
	font-size: 13px;
	background-color: #f8f9fa;
	color: #495057;
	padding: 8px 8px;
	border-bottom: 2px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	text-align: center;
	white-space: nowrap;
}

th:last-child {
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
}

.data-row:hover {
	background-color: #f8f9fa;
}

.data-row td {
	border-bottom: 1px solid #e9ecef;
	border-right: 1px solid #e9ecef;
	vertical-align: middle;
}

.data-row td:last-child {
	border-right: none;
}

.drag-handle {
	text-align: center;
	color: #6c757d;
	cursor: grab;
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
	border-radius: 3px;
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

.total-row {
	background-color: #e7f3ff;
	font-weight: 500;
}

.total-row td {
	padding: 10px 6px;
	border-top: 2px solid #4dabf7;
	border-bottom: none;
	border-right: 1px solid #dee2e6;
	text-align: center;
}

.total-row td:last-child {
	border-right: none;
}

.total-label {
	background-color: #4dabf7;
	color: white;
	font-weight: 600;
	text-align: center;
}

.total-cell {
	font-weight: 600;
	color: #1971c2;
	background-color: #e7f3ff;
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