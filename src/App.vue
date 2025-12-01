<template>
	<Header />
	<div class="container">
		<p style="color:magenta;">β版</p>
		<HeaderControls />
		<div class="sheet-container">
			<div class="table-wrapper">
				<table class="spread-sheet">
					<thead class="table-header">
						<tr>
							<th class="drag-column"></th>
							<th class="import-column">Import</th>
							<th class="name-column">name</th>
							<th class="url-column">url</th>
							<th class="count-column">count</th>
							<th class="rate-column">rate(%)</th>
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
					<tbody class="table-body" ref="table_body">
						<tr v-for="(row, index) in current_data.row_datas" :key="index" class="data-row" :data-index="index"
							:draggable="true" @dragstart="handle_drag_start($event, index)" @dragover="handle_drag_over($event)"
							@dragenter="handle_drag_enter($event)" @dragleave="handle_drag_leave($event)"
							@drop="handle_drop($event, index)" @dragend="handle_drag_end"
							:class="{ 'selected-row': selected_row_indexes.includes(index) }">
							<td class="drag-handle" draggable="false" @mousedown="handle_mouse_down"
								@click="handle_drag_handle_click($event, index)">⋮⋮</td>
							<td>
								<input @paste="handle_paste($event, index)" type="text" class="cell import-cell" />
							</td>
							<td>
								<input v-model="row.row_name" @input="handleRowUpdate(index)"
									@keydown="handle_name_cell_keydown($event, index)" type="text" class="cell name-cell"
									ref="name_cells" />
							</td>
							<td class="url-cell" @click="open_url(row.url)"
								@contextmenu.prevent="show_context_menu($event, index, row)">
								<div class="url-icon-container">
									<svg v-if="row.url" class="url-icon" :class="{
										'approved_url': is_approved_url(row.url, current_data.approved_domains),
										'unapproved_url': !is_approved_url(row.url, current_data.approved_domains)
									}" viewBox="0 0 24 24" width="16" height="16">
										<path fill="currentColor"
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm3 0h-2V7h2v10z" />
									</svg>
									<div v-if="row.url" class="url-tooltip">{{ row.url }}</div>
								</div>
							</td>
							<td>
								<input v-model="row.multiplier" @input="handleRowUpdate(index)" class="cell count-cell" type="number" />
							</td>
							<td>
								<input v-model="row.rate" @input="handleRowUpdate(index)" class="cell rate-cell" type="number" />
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
							<td @pointerup="clear_row(index)" class="action-cell">
								<span class="clear-btn">X</span>
							</td>
						</tr>
						<tr class="add-row-row">
							<td colspan="14" class="add-row-cell">
								<button @click="handle_add_rows" class="add-row-btn">行を追加</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="total-row-container">
				<table class="spread-sheet total-table">
					<tbody>
						<tr class="total-row">
							<td class="total-label">{{ display_mode === 'diff' ? 'diff' : 'sum' }}</td>
							<td class="empty-cell"></td>
							<td class="result-rate-cell"
								:class="{ 'diff-negative': display_mode === 'diff' && diff_data.rate > 0, 'diff-positive': display_mode === 'diff' && diff_data.rate < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.rate) : '' }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.fuel > 0, 'diff-negative': display_mode === 'diff' && diff_data.fuel < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.fuel) : sum_data.fuel }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.ammo > 0, 'diff-negative': display_mode === 'diff' && diff_data.ammo < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.ammo) : sum_data.ammo }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.steel > 0, 'diff-negative': display_mode === 'diff' && diff_data.steel < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.steel) : sum_data.steel }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.baux > 0, 'diff-negative': display_mode === 'diff' && diff_data.baux < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.baux) : sum_data.baux }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.bucket > 0, 'diff-negative': display_mode === 'diff' && diff_data.bucket < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.bucket) : sum_data.bucket }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.damecon > 0, 'diff-negative': display_mode === 'diff' && diff_data.damecon < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.damecon) : sum_data.damecon }}
							</td>
							<td class="total-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.underway_replenishment > 0, 'diff-negative': display_mode === 'diff' && diff_data.underway_replenishment < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.underway_replenishment) :
									sum_data.underway_replenishment }}
							</td>
							<td class="leftover-cell"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- カスタムコンテキストメニュー -->
	<div v-if="context_menu.is_visible" class="context-menu"
		:style="{ top: context_menu.y + 'px', left: context_menu.x + 'px' }">
		<div class="context-menu-item" @click="copy_url">URLをコピー</div>
		<div class="context-menu-item" @click="delete_url">URLを削除</div>
	</div>

	<transition name="notification">
		<div v-if="is_show_notice" class="notification">
			<div class="notification-content">
				<p>{{ notice_message }}</p>
			</div>
		</div>
	</transition>

	<Footer />
	<div v-if="is_error_visible || is_domain_permission_visible" class="modal-overlay" @pointerdown="handle_close_modals">
		<DomainPermission />
		<ErrorView />
	</div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import HeaderControls from './components/HeaderControls.vue';
import { useStore, useModalStore, useToastStore } from './stores';
import { computed, onMounted, ref } from 'vue';
import { INITIAL_SUM_DATA, INITIAL_ROW_DATA, RowData, INITIAL_DIFF_DATA } from './types';
import { calc_sum_data } from './logics/sum';
import { floor_diff_data, floor_sum_data } from './logics/floor';
import { calc_URL_param, do_delete_URL_param, is_approved_url, do_open_url_in_new_tab } from './logics/url';
import lzstring from "lz-string";
import { extract_data_from_text } from './logics/extract';
import { parse, ValiError } from 'valibot';
import { SaveDataSchema } from './logics/sheme';
import DomainPermission from './components/DomainPermission.vue';
import ErrorView from './components/ErrorView.vue';
import { calc_diff_data } from './logics/difference';

const store = useStore();
const current_data = computed(() => store.current_data);
const selected_row_indexes = computed(() => store.selected_row_indexes);
const display_mode = computed(() => store.display_mode);

const modal_store = useModalStore();
const is_error_visible = computed(() => modal_store.is_error_visible);
const is_domain_permission_visible =
	computed(() => modal_store.is_domain_permission_visible);

const toast_store = useToastStore();
const is_show_notice = computed(() => toast_store.is_show_notice);
const notice_message = computed(() => toast_store.notice_message);

const handle_close_modals = () => modal_store.HIDE_MODALS();

const name_cells = ref<HTMLInputElement[]>([]);

const sum_data = computed(() => {
	if (!current_data.value) return { ...INITIAL_SUM_DATA };

	const sumed_data = calc_sum_data(current_data.value.row_datas);
	return floor_sum_data(sumed_data, 0.1);
});

// 差分データの計算
const diff_data = computed(() => {
	if (selected_row_indexes.value.length !== 2) {
		return { ...INITIAL_DIFF_DATA };
	}

	const [firstIndex, secondIndex] = selected_row_indexes.value;
	const firstRow = current_data.value.row_datas[firstIndex];
	const secondRow = current_data.value.row_datas[secondIndex];

	if (!firstRow || !secondRow) {
		return { ...INITIAL_DIFF_DATA };
	}

	const diff = calc_diff_data(firstRow, secondRow);
	return floor_diff_data(diff, 0.1);
});

// 差分値のフォーマット関数
const format_diff_data = (value: number): string => {
	if (value > 0) {
		return `+${value}`;
	}
	return value.toString();
};

// ドラッグハンドルのCtrl+クリック処理
const handle_drag_handle_click = (event: MouseEvent, index: number) => {
	if (event.ctrlKey || event.metaKey) {
		event.preventDefault();
		event.stopPropagation();

		const currentIndex = selected_row_indexes.value.indexOf(index);

		if (currentIndex === -1) {
			// 行を選択に追加（最大2つまで）
			if (selected_row_indexes.value.length < 2) {
				selected_row_indexes.value.push(index);
			} else {
				// 既に2つ選択されている場合は古いものを削除して新しいものを追加
				selected_row_indexes.value.shift();
				selected_row_indexes.value.push(index);
			}
		} else {
			// 既に選択されている場合は選択解除
			selected_row_indexes.value.splice(currentIndex, 1);
		}

		// 表示モードを更新
		const new_mode = selected_row_indexes.value.length === 2
			? 'diff'
			: 'sum';
		store.UPDATE_DISPLAY_MODE(new_mode);
	}
};

// URLを新しいタブで開く
const open_url = (url: string) => {
	if (!url) return;
	if (is_approved_url(url, current_data.value.approved_domains)) {
		do_open_url_in_new_tab(url);
		return;
	}

	store.UPDATE_PENDING_URL(url);
	modal_store.SHOW_DOMAIN_PERMISSION();
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
const clear_row = (row_index: number) => {
	store.UPDATE_ROW_DATA(INITIAL_ROW_DATA, row_index);
	// クリアした行が選択されていた場合は選択から削除
	const index = selected_row_indexes.value.indexOf(row_index);
	if (index !== -1) {
		selected_row_indexes.value.splice(index, 1);
		const new_mode = selected_row_indexes.value.length === 2
			? 'diff'
			: 'sum';
		store.UPDATE_DISPLAY_MODE(new_mode);
	}
};

// 行を追加
const handle_add_rows = () => {
	store.ADD_ROWS();
};

// name-cellのキーダウンイベント処理
const handle_name_cell_keydown = (
	event: KeyboardEvent,
	index: number,
) => {
	if (
		event.key !== 'Enter' ||
		event.isComposing
	) return;

	// Enterキーかつ文字変換中でない場合
	event.preventDefault();

	// 次の行のname-cellにフォーカスを移動
	const next_index = index + 1;
	if (next_index >= name_cells.value.length) return;

	const next_name_cell = name_cells.value[next_index];
	if (next_name_cell) {
		next_name_cell.focus();
	}
};

// コンテキストメニュー用の状態
const context_menu = ref({
	is_visible: false,
	x: 0,
	y: 0,
	row_index: -1,
	row_data: null as RowData | null,
});

// コンテキストメニューを表示
const show_context_menu = (
	event: MouseEvent,
	row_index: number,
	row_data: RowData,
) => {
	if (row_data.url === '') return;

	context_menu.value = {
		is_visible: true,
		x: event.clientX,
		y: event.clientY,
		row_index: row_index,
		row_data: row_data,
	};
};

// URLをコピー
const copy_url = () => {
	if (
		!context_menu.value.row_data ||
		!context_menu.value.row_data.url
	) return;

	navigator.clipboard.writeText(context_menu.value.row_data.url)
		.then(() => {
			toast_store.SHOW_TOAST('URLをコピーしました', 3000);
		})
		.catch(err => {
			toast_store.SHOW_TOAST('URLのコピーに失敗しました', 3000);
			console.error('URLのコピーに失敗しました:', err);
		});

	hide_context_menu();
};

// URLを削除
const delete_url = () => {
	if (context_menu.value.row_index < 0) return;

	const row_index = context_menu.value.row_index;
	const new_row_datas = [...current_data.value.row_datas];

	if (!new_row_datas[row_index]) return;

	new_row_datas[row_index] = {
		...new_row_datas[row_index],
		url: ''
	};

	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		row_datas: new_row_datas
	});

	hide_context_menu();
};

// コンテキストメニューを非表示
const hide_context_menu = () => {
	context_menu.value.is_visible = false;
};

// ドキュメントクリックでコンテキストメニューを閉じる
const handle_document_click = () => {
	if (!context_menu.value.is_visible) return;

	hide_context_menu();
};

const table_body = ref<HTMLElement>();
const drag_start_index = ref<number | null>(null);
const drag_over_index = ref<number | null>(null);
const is_dragging = ref(false);
const is_drag_handle = ref(false);

// マウスダウンイベントでドラッグハンドルかどうかを判定
const handle_mouse_down = (event: MouseEvent) => {
	is_drag_handle.value = true;
};

// ドラッグ開始
const handle_drag_start = (event: DragEvent, index: number) => {
	// ドラッグハンドル以外からのドラッグ開始を防止
	if (!is_drag_handle.value) {
		event.preventDefault();
		return;
	}

	if (!event.dataTransfer) return;

	drag_start_index.value = index;
	is_dragging.value = true;

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
const handle_drag_over = (event: DragEvent) => {
	event.preventDefault();
	if (!event.dataTransfer) return;

	event.dataTransfer.dropEffect = 'move';
};

// ドラッグエンター
const handle_drag_enter = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	const index = parseInt(target.getAttribute('data-index') || '-1');

	if (index !== -1 && index !== drag_start_index.value) {
		drag_over_index.value = index;
		target.classList.add('drag-over');
	}
};

// ドラッグリーブ
const handle_drag_leave = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('drag-over');
};

// ドロップ
const handle_drop = (event: DragEvent, drop_index: number) => {
	event.preventDefault();
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('drag-over');

	if (
		drag_start_index.value === null ||
		drag_start_index.value === drop_index
	) {
		reset_drag_state();
		return;
	}

	// 行の順番を入れ替え
	const new_row_datas = [...current_data.value.row_datas];
	const [moved_row] = new_row_datas.splice(drag_start_index.value, 1);
	new_row_datas.splice(drop_index, 0, moved_row);

	// 選択状態のインデックスを更新
	const old_index = drag_start_index.value;
	const new_selected_row_indexes = selected_row_indexes.value.map(selected_index => {
		if (selected_index === old_index) {
			return drop_index;
		} else if (selected_index === drop_index && drop_index > old_index) {
			return selected_index - 1;
		} else if (selected_index === drop_index && drop_index < old_index) {
			return selected_index + 1;
		} else if (selected_index > old_index && selected_index <= drop_index) {
			return selected_index - 1;
		} else if (selected_index < old_index && selected_index >= drop_index) {
			return selected_index + 1;
		}
		return selected_index;
	});
	store.UPDATE_SELECTED_ROW_INDEXES(new_selected_row_indexes);

	// ストアを更新
	store.UPDATE_CURRENT_DATA({
		...current_data.value,
		row_datas: new_row_datas
	});

	reset_drag_state();
};

// ドラッグ終了
const handle_drag_end = (event: DragEvent) => {
	const target = (event.currentTarget as HTMLElement);
	target.classList.remove('dragging');

	// すべての行からdrag-overクラスを削除
	if (table_body.value) {
		const rows = table_body.value.querySelectorAll('.data-row');
		rows.forEach(row => row.classList.remove('drag-over'));
	}

	reset_drag_state();
};

// ドラッグ状態をリセット
const reset_drag_state = () => {
	drag_start_index.value = null;
	drag_over_index.value = null;
	is_dragging.value = false;
	is_drag_handle.value = false;
};

onMounted(() => {
	// ドキュメントクリックイベントを登録
	document.addEventListener('click', handle_document_click);

	const share_data = calc_URL_param('share');
	do_delete_URL_param();

	if (share_data) {
		const is_permission = confirm(
			'現在のデータを共有URLのデータによって上書きします\n続行しますか?'
		);

		if (!is_permission) {
			store.LOAD_DATA();
			return;
		}

		try {
			const decompressed_data =
				lzstring.decompressFromEncodedURIComponent(share_data);
			const parsed_data = JSON.parse(decompressed_data);

			// バリデーション実行
			const validated_data = parse(SaveDataSchema, parsed_data);

			store.UPDATE_CURRENT_DATA(validated_data);
			return;
		} catch (error) {
			console.error('データの処理に失敗しました:', error);

			if (error instanceof ValiError) {
				alert('共有データの形式が正しくありません');
			} else if (error instanceof SyntaxError) {
				alert('共有データのJSON形式が不正です');
			} else {
				alert('共有データの読み込みに失敗しました');
			}
		}
	}

	// 共有データがない場合や、パースに失敗した場合などは通常読み込み
	store.LOAD_DATA();
});
</script>

<style scoped>
.container {
	width: 100%;
	max-width: 910px;
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
	border-right: 1px solid #dee2e6;
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
	width: 100px;
}

.url-column {
	width: 40px;
}

.count-column {
	width: 40px;
}

.rate-column {
	width: 50px;
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
	cursor: grab;
	font-size: 12px;
	padding: 5px 4px;
	user-select: none;
	touch-action: none;
}

.drag-handle:hover {
	color: #495057;
	background-color: #e9ecef;
}

.drag-handle:active {
	cursor: grabbing;
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

.count-cell,
.rate-cell {
	text-align: center !important;
}

.resource-cell {
	min-width: 50px;
	text-align: right;
}

.url-cell {
	text-align: center;
	cursor: pointer;
	padding: 0;
	position: relative;
}

.url-icon-container {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	position: relative;
}

.url-icon.approved_url {
	color: #4dabf7;
	transition: color 0.2s;
}

.url-icon.unapproved_url {
	color: #adadad;
	transition: color 0.2s;
}

.url-cell:hover .url-icon.approved_url {
	color: #339af0;
}

.url-cell:hover .url-icon.unapproved_url {
	color: #7c7c7c;
}

.url-cell:hover {
	background-color: #f0f8ff;
}

/* URLツールチップ  */
.url-tooltip {
	position: absolute;
	bottom: 100%;
	left: 50%;
	transform: translateX(-50%);
	background-color: rgba(0, 0, 0, 0.8);
	color: white;
	padding: 8px 12px;
	border-radius: 4px;
	font-size: 12px;
	white-space: nowrap;
	z-index: 1000;
	pointer-events: none;
	opacity: 0;
	visibility: hidden;
	transition: opacity 0.2s, visibility 0.2s;
	max-width: 300px;
	overflow: hidden;
	text-overflow: ellipsis;
}

.url-tooltip::after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	transform: translateX(-50%);
	border: 5px solid transparent;
	border-top-color: rgba(0, 0, 0, 0.8);
}

.url-cell:hover .url-tooltip {
	opacity: 1;
	visibility: visible;
}

.action-column {
	width: 24px;
}

.action-cell {
	border-right: 1px solid #ebebeb !important;
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

.add-row-row {
	background-color: #f8f9fa;
}

.add-row-cell {
	text-align: center;
	padding: 12px;
	border-bottom: 1px solid #e9ecef;
}

.add-row-btn {
	padding: 8px 16px;
	border: 1px solid #4dabf7;
	border-radius: 4px;
	background-color: white;
	color: #4dabf7;
	font-size: 14px;
	cursor: pointer;
	transition: background-color 0.2s, transform 0.1s;
}

.add-row-btn:hover {
	background-color: #e7f3ff;
}

.add-row-btn:active {
	transform: translateY(1px);
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
	width: 45px;
}

.total-cell {
	font-weight: 600;
	color: #1971c2;
	background-color: #e7f3ff;
}

.result-rate-cell {
	width: 55px;
}

.empty-cell {
	width: 267px;
}

.leftover-cell {
	width: 37px;
}

/* 選択された行のスタイル */
.selected-row {
	border: 2px solid #4dabf7 !important;
	background-color: #e7f3ff !important;
}

.selected-row td {
	border-color: #4dabf7;
}

/* 差分表示時のスタイル */
.diff-positive {
	color: #e03131 !important;
	font-weight: bold;
}

.diff-negative {
	color: #2b8a3e !important;
	font-weight: bold;
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

/* コンテキストメニュースタイル */
.context-menu {
	position: fixed;
	background: white;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	z-index: 10000;
	min-width: 120px;
}

.context-menu-item {
	padding: 8px 12px;
	cursor: pointer;
	font-size: 13px;
	transition: background-color 0.2s;
}

.context-menu-item:hover {
	background-color: #f0f8ff;
	color: #4dabf7;
}

/* スクロール可能なテーブルの場合 */
@media (max-width: 1200px) {
	.sheet-container {
		overflow-x: auto;
	}

	.spread-sheet {
		min-width: 980px;
	}
}

/* レスポンシブ対応 */
@media (max-width: 768px) {

	/* モバイルではツールチップを非表示に */
	.url-tooltip {
		display: none;
	}
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

.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;
}
</style>