<template>
	<Header />
	<div class="container">
		<p style="color:magenta;">β版</p>
		<div class="header-controls">
			<input v-model="current_data.project_name" placeholder="計画名" @input="handle_project_name_update"
				class="project-name-input" />
			<div class="button-group">
				<button @pointerdown="handle_sort_rows" class="action-btn">上詰め</button>
				<button @pointerdown="handle_copy_url" class="action-btn">URL発行</button>
				<button @pointerdown="handle_initialize" class="action-btn danger">初期化</button>
			</div>
		</div>
		<div class="sheet-container">
			<div class="table-wrapper">
				<table class="spread-sheet">
					<thead class="table-header">
						<tr>
							<th class="drag-column"></th>
							<th class="import-column">Import</th>
							<th class="name-column">name</th>
							<th class="resource-column"><img src="./icons/items/fuel.png" /></th>
							<th class="resource-column"><img src="./icons/items/ammo.png" /></th>
							<th class="resource-column"><img src="./icons/items/steel.png" /></th>
							<th class="resource-column"><img src="./icons/items/imo.png" /></th>
							<th class="resource-column"><img src="./icons/items/bucket.png" /></th>
							<th class="resource-column"><img src="./icons/items/damecon.png" /></th>
							<th class="resource-column"><img src="./icons/items/underway_replenishment.png" /></th>
							<th class="action-column"></th>
						</tr>
					</thead>
					<tbody class="table-body">
						<tr v-for="(row, index) in current_data.row_datas" :key="index" class="data-row" :data-index="index"
							:draggable="true" @dragstart="handleDragStart($event, index)" @dragover="handleDragOver($event)"
							@dragenter="handleDragEnter($event)" @dragleave="handleDragLeave($event)"
							@drop="handleDrop($event, index)" @dragend="handleDragEnd">
							<td class="drag-handle" draggable="false">⋮⋮</td>
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
							<td @pointerup="clearRow(index)" class="action-cell">
								<span class="clear-btn">X</span>
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
							<td style="width:37px;"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<transition name="notification">
		<div v-if="is_show_notice" class="notification">
			<div class="notification-content">
				<p>{{ notice_message }}</p>
			</div>
		</div>
	</transition>

	<Footer />
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { useStore } from './stores';
import { computed, onMounted, ref } from 'vue';
import { INITIAL_SUM_DATA, INITIAL_ROW_DATA, INITIAL_SAVE_DATA, SaveData } from './types';
import { calc_sum_data } from './logics/sum';
import { floor_sum_data } from './logics/floor';
import { sort_row_datas } from './logics/sort';
import { calc_URL_param, do_delete_URL_param, do_create_shorten_url } from './logics/url';
import lzstring from "lz-string";
import { extract_data_from_text } from './logics/extract';

const store = useStore();
const current_data = computed(() => store.current_data);
const is_show_notice = ref(false);
const notice_message = ref('');

const sum = computed(() => {
	if (!current_data.value) return { ...INITIAL_SUM_DATA };

	const sumed_data = calc_sum_data(current_data.value.row_datas);
	return floor_sum_data(sumed_data);
});

// プロジェクト名更新
const handle_project_name_update = () => {
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
	});
};

const handle_sort_rows = () => {
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		row_datas: sort_row_datas(current_data.value.row_datas),
	});
};

const handle_copy_url = async () => {
	try {
		console.log('handle_copy_url');
		const shorten_url = await do_create_shorten_url(current_data.value);
		// console.log('shorten_url: ', shorten_url);

		const textArea = document.createElement('textarea');
		textArea.value = shorten_url;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
		// 通知を表示
		notice_message.value = `copied: ${shorten_url}`;
		is_show_notice.value = true;
		
	} catch (err) {
		notice_message.value = '共有URLの発行に失敗しました';
		console.error(err);
	}
	// 5秒後に自動的に非表示
	setTimeout(() => {
		is_show_notice.value = false;
	}, 5000);
};

const handle_initialize = () => {
	const is_permission = confirm('データを削除しますか?');
	if (!is_permission) return;

	store.UPDATE_CURRENT_DATA({ ...INITIAL_SAVE_DATA });
};

// 行データ更新
const handleRowUpdate = (rowIndex: number) => {
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		row_datas: [...current_data.value.row_datas] // 配列を新しく作成してリアクティブをトリガー
	});
};

const handle_paste = (event: ClipboardEvent, row_index: number) => {
	const pasted_text = event.clipboardData?.getData('text');
	if (!pasted_text) return;

	event.preventDefault();

	try {
		const extracted_data =
			extract_data_from_text(pasted_text, current_data.value.row_datas[row_index]);

		store.UPDATE_ROW_DATA(extracted_data, row_index);
	} catch (error) {
		console.error(error);
	}
};

// 行をクリアしてソート
const clearRow = (row_index: number) => {
	store.UPDATE_ROW_DATA(INITIAL_ROW_DATA, row_index);
};

const tableBody = ref<HTMLElement>();
const dragStartIndex = ref<number | null>(null);
const dragOverIndex = ref<number | null>(null);
const isDragging = ref(false);

// ドラッグ開始
const handleDragStart = (event: DragEvent, index: number) => {
	if (!event.dataTransfer) return;

	dragStartIndex.value = index;
	isDragging.value = true;

	// ドラッグ中の視覚効果を設定
	event.dataTransfer.effectAllowed = 'move';

	// モバイルデバイス用にドラッグ画像を設定
	const target = event.currentTarget as HTMLElement;
	if (target) {
		event.dataTransfer.setDragImage(target, 20, 10);
	}

	// ドラッグ中のスタイル変更
	target.classList.add('dragging');
};

// ドラッグオーバー
const handleDragOver = (event: DragEvent) => {
	event.preventDefault();
	if (!event.dataTransfer) return;

	event.dataTransfer.dropEffect = 'move';
};

// ドラッグエンター
const handleDragEnter = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	const index = parseInt(target.getAttribute('data-index') || '-1');

	if (index !== -1 && index !== dragStartIndex.value) {
		dragOverIndex.value = index;
		target.classList.add('drag-over');
	}
};

// ドラッグリーブ
const handleDragLeave = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('drag-over');
};

// ドロップ
const handleDrop = (event: DragEvent, dropIndex: number) => {
	event.preventDefault();
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('drag-over');

	if (dragStartIndex.value === null || dragStartIndex.value === dropIndex) {
		resetDragState();
		return;
	}

	// 行の順番を入れ替え
	const newRowDatas = [...current_data.value.row_datas];
	const [movedRow] = newRowDatas.splice(dragStartIndex.value, 1);
	newRowDatas.splice(dropIndex, 0, movedRow);

	// ストアを更新
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		row_datas: newRowDatas
	});

	resetDragState();
};

// ドラッグ終了
const handleDragEnd = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('dragging');

	// すべての行からdrag-overクラスを削除
	if (tableBody.value) {
		const rows = tableBody.value.querySelectorAll('.data-row');
		rows.forEach(row => row.classList.remove('drag-over'));
	}

	resetDragState();
};

// ドラッグ状態をリセット
const resetDragState = () => {
	dragStartIndex.value = null;
	dragOverIndex.value = null;
	isDragging.value = false;
};

onMounted(() => {
	const share_data = calc_URL_param('share');
	if (share_data) {
		const decompressed_data =
			lzstring.decompressFromEncodedURIComponent(share_data);

		store.UPDATE_CURRENT_DATA(JSON.parse(decompressed_data) as SaveData);
		do_delete_URL_param();
		return;
	}
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

.header-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	flex-wrap: wrap;
	gap: 15px;
}

.project-name-input {
	flex: 1;
	min-width: 200px;
	padding: 8px 12px;
	border: 1px solid #ced4da;
	border-radius: 4px;
	font-size: 14px;
}

.button-group {
	display: flex;
	gap: 10px;
}

.action-btn {
	padding: 6px 14px;
	border: none;
	border-radius: 4px;
	background-color: #4dabf7;
	color: white;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s, transform 0.1s;
}

.action-btn:hover {
	background-color: #339af0;
}

.action-btn:active {
	transform: translateY(1px);
}

.action-btn.danger {
	background-color: #fa5252;
}

.action-btn.danger:hover {
	background-color: #e03131;
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

.action-column {
	width: 24px;
}

.action-cell {
	text-align: center;
	cursor: pointer;
	color: #c9c9c9;
}

.clear-btn {
	padding: 0px;
	border: none;
	font-size: 12px;
}

.action-cell:hover {
	background-color: #e95353;
	color: white;
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
	width: 46px;
}

.total-cell {
	font-weight: 600;
	color: #1971c2;
	background-color: #e7f3ff;
}

.empty-cell {
	width: 161px;
}

/* 通知スタイル */
.notification {
	position: fixed;
	top: 40px;
	right: 20px;
	background-color: white;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	padding: 12px 16px;
	z-index: 1000;
	max-width: 300px;
	border-left: 4px solid #4dabf7;
}

.notification-content {
	display: flex;
	flex-direction: column;
	gap: 12px;
}

.notification-content p {
	margin: 0;
	font-weight: 500;
	color: #333;
}

.copy-btn,
.close-btn {
	padding: 6px 12px;
	border: none;
	border-radius: 4px;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s;
}

.copy-btn {
	background-color: #4dabf7;
	color: white;
}

.copy-btn:hover {
	background-color: #339af0;
}

.close-btn {
	background-color: #f8f9fa;
	color: #495057;
}

.close-btn:hover {
	background-color: #e9ecef;
}

/* 通知のトランジション */
.notification-enter-active,
.notification-leave-active {
	transition: all 0.1s ease;
}

.notification-enter-from {
	opacity: 0;
	transform: translateX(100%);
}

.notification-leave-to {
	opacity: 0;
	transform: translateX(100%);
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

/* レスポンシブ対応 */
@media (max-width: 768px) {
	.header-controls {
		flex-direction: column;
		align-items: stretch;
	}

	.button-group {
		justify-content: space-between;
	}

	.project-name-input {
		min-width: 100%;
	}
}

.drag-handle {
	text-align: center;
	color: #6c757d;
	cursor: grab;
	font-size: 12px;
	padding: 5px 4px;
	user-select: none;
	touch-action: none;
	/* モバイルでのタッチ操作を改善 */
}

.drag-handle:active {
	cursor: grabbing;
}

.drag-handle:hover {
	color: #495057;
	background-color: #e9ecef;
}

/* ドラッグ中の行スタイル */
.data-row.dragging {
	opacity: 0.5;
	background-color: #f8f9fa;
}

/* ドロップ可能領域のスタイル */
.data-row.drag-over {
	border-top: 2px solid #4dabf7;
	background-color: #e7f3ff !important;
}

/* ドラッグ中の行に適用されるスタイル */
.data-row.dragging .drag-handle {
	cursor: grabbing;
}

/* モバイルデバイス用の最適化 */
@media (max-width: 768px) {
	.drag-handle {
		padding: 8px 6px;
		font-size: 14px;
	}
}
</style>