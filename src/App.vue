<template>
	<Header />
	<Sidebar />
	<div class="container">
		<p style="color:magenta;">β版</p>
		<HeaderControls />
		<div class="sheet-container">
			<div class="table-wrapper">
				<table class="spread-sheet">
					<SheetColgroup />
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
						<tr v-for="(row, index) in row_datas" :key="index" class="data-row" :data-index="index"
							:draggable="true" @dragstart="handle_drag_start($event, index)" @dragover="handle_drag_over($event)"
							@dragenter="handle_drag_enter($event)" @dragleave="handle_drag_leave($event)"
							@drop="handle_drop($event, index)" @dragend="handle_drag_end"
							:class="{ 'selected-row': selected_row_indexes.includes(index) }">
							<td class="drag-handle" draggable="false" tabindex="-1" @mousedown="handle_mouse_down"
								@click="handle_drag_handle_click($event, index)">⋮⋮</td>
							<td>
								<input @paste="handle_paste($event, index)" type="text" class="cell import-cell" />
							</td>
							<td>
								<input v-model="row.row_name" @input="handle_row_update(index)"
									@keydown="handle_name_cell_keydown($event, index)" type="text" class="cell name-cell"
									ref="name_cells" />
							</td>
							<td class="url-cell" @click="open_url(row.url)"
								@contextmenu.prevent="show_context_menu($event, index, row)">
								<div class="url-icon-container">
									<svg v-if="row.url" class="url-icon" :class="{
										'approved_url': is_approved_url(row.url, approved_domains),
										'unapproved_url': !is_approved_url(row.url, approved_domains)
									}" viewBox="0 0 24 24" width="16" height="16">
										<path fill="currentColor"
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm3 0h-2V7h2v10z" />
									</svg>
									<div v-if="row.url" class="url-tooltip">{{ row.url }}</div>
								</div>
							</td>
							<td>
								<input v-model="row.multiplier" @input="handle_row_update(index)" class="cell count-cell"
									type="number" />
							</td>
							<td>
								<input v-model="row.rate" @input="handle_row_update(index)" class="cell rate-cell" type="number" />
							</td>
							<td>
								<input v-model.number="row.fuel" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.ammo" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.steel" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.baux" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.bucket" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.damecon" @input="handle_row_update(index)" class="cell resource-cell"
									type="number" />
							</td>
							<td>
								<input v-model.number="row.underway_replenishment" @input="handle_row_update(index)"
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
				<!--
					合計行はスクロールコンテナの内側に置く。
					外に置くと表を横スクロールしたときに列がずれる
				-->
				<div class="result-row-draggable-container" :style="{ bottom: result_row_position + 'px' }">
				<table class="spread-sheet total-table">
					<SheetColgroup />
					<tbody>
						<tr class="result-row">
							<td
							class="result-drag-handle"
							@mousedown="start_result_row_drag"
							@touchstart="start_result_row_drag"
							>⋮⋮</td>
							<!-- Import / name / url / count の4列ぶん -->
							<td class="display-mode-cell" colspan="4">
								<button class="display-mode-btn" :class="{ 'is-diff': display_mode === 'diff' }"
									:disabled="!can_show_diff && display_mode === 'sum'"
									:title="can_show_diff || display_mode === 'diff'
										? '合計と差分を切り替える'
										: '差分は2行を選択したときに使えます'"
									@pointerdown="sheet_store.TOGGLE_DISPLAY_MODE()">
									{{ display_mode === 'diff' ? 'diff' : 'sum' }}
								</button>
							</td>
							<td class="result-rate-cell"
								:class="{ 'diff-negative': display_mode === 'diff' && diff_data.rate > 0, 'diff-positive': display_mode === 'diff' && diff_data.rate < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.rate) : '' }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.fuel > 0, 'diff-negative': display_mode === 'diff' && diff_data.fuel < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.fuel) : sum_data.fuel }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.ammo > 0, 'diff-negative': display_mode === 'diff' && diff_data.ammo < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.ammo) : sum_data.ammo }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.steel > 0, 'diff-negative': display_mode === 'diff' && diff_data.steel < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.steel) : sum_data.steel }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.baux > 0, 'diff-negative': display_mode === 'diff' && diff_data.baux < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.baux) : sum_data.baux }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.bucket > 0, 'diff-negative': display_mode === 'diff' && diff_data.bucket < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.bucket) : sum_data.bucket }}
							</td>
							<td class="result-cell"
								:class="{ 'diff-positive': display_mode === 'diff' && diff_data.damecon > 0, 'diff-negative': display_mode === 'diff' && diff_data.damecon < 0 }">
								{{ display_mode === 'diff' ? format_diff_data(diff_data.damecon) : sum_data.damecon }}
							</td>
							<td class="result-cell"
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
				<button v-if="notice_action_label" class="notification-action" @pointerdown="toast_store.RUN_ACTION()">
					{{ notice_action_label }}
				</button>
			</div>
		</div>
	</transition>

	<Footer />
	<div v-if="is_error_visible || is_domain_permission_visible || is_help_visible" class="modal-overlay"
		@pointerdown="handle_close_modals">
		<DomainPermission />
		<ErrorView />
		<HelpView />
	</div>
</template>

<script setup lang="ts">
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import HeaderControls from './components/HeaderControls.vue';
import Sidebar from './components/Sidebar.vue';
import SheetColgroup from './components/SheetColgroup.vue';
import { useModalStore, useToastStore } from './stores';
import { useWorkspaceStore } from './stores/workspace';
import { useSheetStore } from './stores/sheet';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { INITIAL_SUM_DATA, INITIAL_ROW_DATA, RowData, INITIAL_DIFF_DATA } from './types';
import { floor_diff_data, floor_sum_data } from './logics/floor';
import { calc_URL_param, do_delete_URL_param, is_approved_url, do_open_url_in_new_tab } from './logics/url';
import lzstring from "lz-string";
import { extract_data_from_text } from './logics/extract';
import { parse, ValiError } from 'valibot';
import { SaveDataSchema } from './logics/schema';
import DomainPermission from './components/DomainPermission.vue';
import ErrorView from './components/ErrorView.vue';
import HelpView from './components/HelpView.vue';
import { calc_diff_data, calc_total_data } from './logics/calculation';

const sheet_store = useSheetStore();
const row_datas = computed(() => sheet_store.row_datas);
const selected_row_indexes = computed(() => sheet_store.selection);
const display_mode = computed(() => sheet_store.display_mode);
const can_show_diff = computed(() => sheet_store.can_show_diff);

const workspace_store = useWorkspaceStore();
const approved_domains = computed(() => workspace_store.approved_domains);

const modal_store = useModalStore();
const is_error_visible = computed(() => modal_store.is_error_visible);
const is_domain_permission_visible =
	computed(() => modal_store.is_domain_permission_visible);
const is_help_visible = computed(() => modal_store.is_help_visible);

const toast_store = useToastStore();
const is_show_notice = computed(() => toast_store.is_show_notice);
const notice_message = computed(() => toast_store.notice_message);
const notice_action_label = computed(() => toast_store.action_label);

const handle_close_modals = () => modal_store.HIDE_MODALS();

const name_cells = ref<HTMLInputElement[]>([]);

const sum_data = computed(() => {
	const total_data = calc_total_data(row_datas.value);
	return floor_sum_data(total_data, 0.1);
});

// 差分データの計算
const diff_data = computed(() => {
	if (selected_row_indexes.value.length !== 2) {
		return { ...INITIAL_DIFF_DATA };
	}

	const [first_index, second_index] = selected_row_indexes.value;
	// 選択順に関わらず 下の行 - 上の行
	const first_row =
		row_datas.value[first_index > second_index ? second_index : first_index];
	const second_row =
		row_datas.value[first_index > second_index ? first_index : second_index];

	if (!first_row || !second_row) {
		return { ...INITIAL_DIFF_DATA };
	}

	const diff = calc_diff_data(first_row, second_row);
	return floor_diff_data(diff, 0.1);
});

// 差分値のフォーマット関数
const format_diff_data = (value: number): string => {
	if (value > 0) {
		return `+${value}`;
	}
	return value.toString();
};

// total-rowのドラッグ関連
const result_row_position = ref(0);
const is_dragging_result_row = ref(false);
const drag_start_Y = ref(0);
const drag_start_top = ref(0);

// ドラッグの上限を計算する関数
const calc_max_position = (): number => {
	// 合計行は sticky。基準はスクロールコンテナの見えている高さになる
	const table_wrapper = document.querySelector('.table-wrapper') as HTMLElement;
	const result_row_container = document.querySelector('.result-row-draggable-container') as HTMLElement;

	if (!table_wrapper || !result_row_container) {
		return 400; // デフォルト値
	}

	const wrapper_height = table_wrapper.clientHeight;
	const result_row_container_height = result_row_container.clientHeight;

	// 表示領域の高さから、合計行コンテナの高さとマージンを引いた値が上限
	return wrapper_height - result_row_container_height - 10; // 10pxのマージンを確保
};

// total-rowのドラッグ開始
const start_result_row_drag = (event: MouseEvent | TouchEvent) => {
	event.preventDefault();
	is_dragging_result_row.value = true;

	// タッチイベントとマウスイベントの区別
	const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;

	drag_start_Y.value = clientY;
	drag_start_top.value = result_row_position.value;

	// イベントリスナーの登録
	document.addEventListener('mousemove', handle_result_row_drag);
	document.addEventListener('mouseup', stop_result_row_drag);
	document.addEventListener('touchmove', handle_result_row_touch);
	document.addEventListener('touchend', stop_result_row_drag);
	document.addEventListener('touchcancel', stop_result_row_drag);

	// ドラッグ中のスタイル変更
	const result_row_element = document.querySelector('.total-row-draggable-container');
	if (result_row_element) {
		result_row_element.classList.add('dragging');
	}
};

// total-rowのドラッグ中
const handle_result_row_drag = (event: MouseEvent) => {
	if (!is_dragging_result_row.value) return;

	const delta_Y = event.clientY - drag_start_Y.value;
	const new_position = drag_start_top.value - delta_Y;
	const max_position = calc_max_position();

	// 上限と下限を制限（最小値は0）
	result_row_position.value = Math.max(0, Math.min(max_position, new_position));
};

// total-rowのタッチドラッグ中
const handle_result_row_touch = (event: TouchEvent) => {
	if (!is_dragging_result_row.value) return;
	event.preventDefault();

	const client_Y = event.touches[0].clientY;
	const delta_Y = client_Y - drag_start_Y.value;
	const new_position = drag_start_top.value - delta_Y;
	const max_position = calc_max_position();

	// 上限と下限を制限（最小値は0）
	result_row_position.value = Math.max(0, Math.min(max_position, new_position));
};

// total-rowのドラッグ終了
const stop_result_row_drag = () => {
	if (!is_dragging_result_row.value) return;

	is_dragging_result_row.value = false;

	// イベントリスナーの削除
	document.removeEventListener('mousemove', handle_result_row_drag);
	document.removeEventListener('mouseup', stop_result_row_drag);
	document.removeEventListener('touchmove', handle_result_row_touch);
	document.removeEventListener('touchend', stop_result_row_drag);
	document.removeEventListener('touchcancel', stop_result_row_drag);

	// ドラッグスタイルの削除
	const result_row_element = document.querySelector('.total-row-draggable-container');
	if (result_row_element) {
		result_row_element.classList.remove('dragging');
	}
};

// ドラッグハンドルのクリックによる行選択
const handle_drag_handle_click = (event: MouseEvent, index: number) => {
	const ctrl = event.ctrlKey || event.metaKey;
	const shift = event.shiftKey;

	// 素のクリックで単独選択できる。Ctrl / Shift は複数選択のときだけ使う
	event.preventDefault();
	event.stopPropagation();

	sheet_store.SELECT_ROW(index, { ctrl, shift });
};

// URLを新しいタブで開く
const open_url = (url: string) => {
	if (!url) return;
	if (is_approved_url(url, approved_domains.value)) {
		do_open_url_in_new_tab(url);
		return;
	}

	sheet_store.UPDATE_PENDING_URL(url);
	modal_store.SHOW_DOMAIN_PERMISSION();
};

// 行データ更新
const handle_row_update = (row_index: number) => {
	// 配列を新しく作成してリアクティブをトリガー。
	// 連続したセル入力は履歴を1件にまとめる
	sheet_store.UPDATE_ROW_DATAS([...row_datas.value], true);
};

const handle_paste = (event: ClipboardEvent, row_index: number) => {
	const pasted_text = event.clipboardData?.getData('text');
	if (!pasted_text) return;

	event.preventDefault();

	try {
		const extracted_data =
			extract_data_from_text(pasted_text, row_datas.value[row_index]);

		sheet_store.UPDATE_ROW_DATA(extracted_data, row_index);
	} catch (error) {
		console.error(error);
	}
};

// 行をクリアしてソート
const clear_row = (row_index: number) => {
	sheet_store.UPDATE_ROW_DATA(INITIAL_ROW_DATA, row_index);
	// クリアした行が選択されていた場合は選択から削除
	sheet_store.UPDATE_SELECTED_ROW_INDEXES(
		selected_row_indexes.value.filter(index => index !== row_index),
	);
};

/**
 * 入力欄にフォーカスがあるかどうか。
 *
 * 取り込みセルは @paste でシミュ結果テキストを解析している。行のコピペと
 * ターゲットが違うため、入力欄の中では一切介入せずブラウザ既定に任せる
 */
const is_editing_cell = (): boolean => {
	const active = document.activeElement;
	if (!(active instanceof HTMLElement)) return false;

	return active.tagName === 'INPUT'
		|| active.tagName === 'TEXTAREA'
		|| active.isContentEditable;
};

// 「s」キーでサイドバーを開閉する
const handle_sidebar_shortcut = (event: KeyboardEvent) => {
	if (event.ctrlKey || event.metaKey || event.altKey) return;
	if (event.key !== 's' && event.key !== 'S') return;
	if (is_editing_cell()) return;

	event.preventDefault();
	workspace_store.TOGGLE_SIDEBAR();
};

// 行のコピー / カット / 貼り付け
const handle_row_shortcut = (event: KeyboardEvent) => {
	if (!event.ctrlKey && !event.metaKey) return;
	if (is_editing_cell()) return;

	const key = event.key.toLowerCase();

	// Ctrl+Z / Ctrl+Y、および Ctrl+Shift+Z による Redo
	if (key === 'z' || key === 'y') {
		event.preventDefault();

		const is_redo = key === 'y' || (key === 'z' && event.shiftKey);
		if (is_redo) sheet_store.REDO();
		else sheet_store.UNDO();
		return;
	}

	if (!['c', 'x', 'v'].includes(key)) return;

	if (key === 'c' || key === 'x') {
		const rows = sheet_store.COPY_SELECTED_ROWS();
		if (rows.length === 0) return;

		event.preventDefault();
		workspace_store.SET_ROW_CLIPBOARD(rows);

		if (key === 'x') {
			sheet_store.CLEAR_SELECTED_ROWS();
			toast_store.SHOW_TOAST(`${rows.length}行を切り取りました`, 3000);
			return;
		}
		toast_store.SHOW_TOAST(`${rows.length}行をコピーしました`, 3000);
		return;
	}

	const clipboard = workspace_store.row_clipboard;
	if (clipboard.length === 0) return;

	event.preventDefault();

	if (selected_row_indexes.value.length === 0) {
		toast_store.SHOW_TOAST('貼り付け先の行を選択してください', 3000);
		return;
	}

	// Shift 併用で上書きではなく挿入
	const pasted = event.shiftKey
		? sheet_store.PASTE_INSERT(clipboard)
		: sheet_store.PASTE_OVERWRITE(clipboard);

	if (pasted > 0) {
		toast_store.SHOW_TOAST(
			`${pasted}行を${event.shiftKey ? '挿入' : '貼り付け'}ました`,
			3000,
		);
	}
};

// 行を追加
const handle_add_rows = () => {
	sheet_store.ADD_ROWS();
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
	const new_row_datas = [...row_datas.value];

	if (!new_row_datas[row_index]) return;

	new_row_datas[row_index] = {
		...new_row_datas[row_index],
		url: ''
	};

	sheet_store.UPDATE_ROW_DATAS(new_row_datas);

	hide_context_menu();
};

// コンテキストメニューを非表示
const hide_context_menu = () => {
	context_menu.value.is_visible = false;
};

// ドキュメントクリックでコンテキストメニューを閉じる
const handle_document_click = (event: MouseEvent) => {
	if (context_menu.value.is_visible) hide_context_menu();

	// シート(表)の外をクリックしたら行選択を解除する。
	// 表内のセル編集や合計行の操作、ハンドルでの選択（stopPropagation 済み）は対象外
	if (selected_row_indexes.value.length === 0) return;
	if ((event.target as HTMLElement | null)?.closest('.spread-sheet')) return;

	sheet_store.CLEAR_SELECTION();
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
	const new_row_datas = [...row_datas.value];
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
	sheet_store.UPDATE_SELECTED_ROW_INDEXES(new_selected_row_indexes);

	// ストアを更新
	sheet_store.UPDATE_ROW_DATAS(new_row_datas);

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

// サイドバーからシートを切り替えたら本体を読み直す
watch(() => workspace_store.active_sheet_id, async (sheet_id) => {
	if (!sheet_id || sheet_id === sheet_store.sheet_id) return;

	await sheet_store.LOAD(sheet_id);
});

// 未保存の変更を残したままタブを閉じさせない
const handle_before_unload = () => { void sheet_store.FLUSH(); };

onMounted(async () => {
	// ドキュメントクリックイベントを登録
	document.addEventListener('click', handle_document_click);
	document.addEventListener('keydown', handle_row_shortcut);
	document.addEventListener('keydown', handle_sidebar_shortcut);
	window.addEventListener('beforeunload', handle_before_unload);

	await workspace_store.INITIALIZE();

	const share_data = calc_URL_param('share');
	do_delete_URL_param();

	if (share_data) {
		try {
			const decompressed_data =
				lzstring.decompressFromEncodedURIComponent(share_data);
			const parsed_data = JSON.parse(decompressed_data);

			// バリデーション実行
			const validated_data = parse(SaveDataSchema, parsed_data);

			// 既存データを上書きせず、新しいシートとして取り込む
			const imported_id =
				await workspace_store.IMPORT_SHARED_SHEET(validated_data);
			await sheet_store.LOAD(imported_id);

			toast_store.SHOW_TOAST('共有データを新しいシートとして読み込みました');
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
	if (workspace_store.active_sheet_id) {
		await sheet_store.LOAD(workspace_store.active_sheet_id);
	}
});

onUnmounted(() => {
	document.removeEventListener('click', handle_document_click);
	document.removeEventListener('keydown', handle_row_shortcut);
	document.removeEventListener('keydown', handle_sidebar_shortcut);
	window.removeEventListener('beforeunload', handle_before_unload);
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
	/* ビューポートの高さに応じて調整 */
	height: clamp(45vh, 45vh + (82vh - 45vh) * (100vh - 400px) / (700px - 400px), 82vh);
	position: relative;
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

/* 列幅は SheetColgroup が持つ。ここでは見た目だけを指定する */
.drag-column {
	background-color: #f8f9fa;
}

.resource-column {
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

/* total-rowのドラッグ可能コンテナ */
/*
	sticky にすることで、縦は表の上に留まりつつ横スクロールには追従する。
	absolute だとスクロールしても動かず、列がずれる
*/
.result-row-draggable-container {
	position: sticky;
	left: 0;
	z-index: 100;
	/* 幅は表と同じ指定にする。max-content にすると内側の width:100% と
	   循環して幅が破綻する */
	width: 100%;
	background: white;
	border-top: 1px solid #e0e0e0;
}

.result-row-draggable-container.dragging {
	opacity: 0.9;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
	z-index: 101;
}

.total-table {
	margin-top: -1px;
	/* ボーダーの重なりを防ぐ */
}

.result-row {
	background-color: #e7f3ff;
	font-weight: 500;
}

.result-row td {
	padding: 10px 0px;
	border-bottom: none;
	border-right: 1px solid #dee2e6;
	text-align: center;
	vertical-align: middle;
}

.result-row td:last-child {
	border-right: none;
}

.result-drag-handle {
	background-color: #4dabf7;
	color: white;
	font-weight: 600;
	text-align: center;
	cursor: ns-resize;
	user-select: none;
}

.result-cell {
	font-weight: 600;
	color: #1971c2;
	background-color: #e7f3ff;
}

.display-mode-cell {
	color: #1971c2;
}

.display-mode-btn {
	border: 1px solid #a5d8ff;
	border-radius: 4px;
	background-color: #ffffff;
	color: #1971c2;
	font-size: 13px;
	padding: 2px 14px;
	cursor: pointer;
}

.display-mode-btn:hover:not(:disabled) {
	background-color: #e7f5ff;
}

.display-mode-btn.is-diff {
	background-color: #1971c2;
	border-color: #1971c2;
	color: #ffffff;
}

/* 差分は2行を選んだときだけ成立する */
.display-mode-btn:disabled {
	border-color: #dee2e6;
	color: #adb5bd;
	cursor: not-allowed;
}


/* 選択された行のスタイル */
.selected-row {
	background-color: #e7f3ff !important;
}

.selected-row td {
	position: relative;
}

.selected-row td::after {
	content: '';
	position: absolute;
	inset: 0;
	pointer-events: none;
	z-index: 2;
	border-top: 2px solid #4dabf7;
	border-bottom: 2px solid #4dabf7;
}

.selected-row td:first-child::after {
	border-left: 2px solid #4dabf7;
}

.selected-row td:last-child::after {
	border-right: 2px solid #4dabf7;
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

	/* 合計行も同じ最小幅にしないと、表だけが広がって列がずれる */
	.spread-sheet,
	.result-row-draggable-container {
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