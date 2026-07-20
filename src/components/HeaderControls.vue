<template>
	<div class="header-controls">
		<button class="sheet-list-btn" title="シート一覧" @pointerdown="workspace_store.TOGGLE_SIDEBAR()">☰</button>
		<input v-model="sheet_name" placeholder="シート名" class="project-name-input" />
		<div class="button-group">
			<button @pointerdown="handle_sort_rows" class="action-btn">上詰め</button>
			<button @pointerdown="handle_copy_url" class="action-btn" :disabled="is_copying">
				{{ is_copying ? '処理中...' : 'URL発行' }}
			</button>

			<div class="menu-wrapper">
				<button class="action-btn" @pointerdown.stop="is_file_menu_open = !is_file_menu_open">
					ファイル ▾
				</button>
				<div v-if="is_file_menu_open" class="file-menu" @pointerdown.stop>
					<button class="file-menu-item" @pointerdown="handle_export_sheet">
						このシートを書き出す (JSON)
					</button>
					<button class="file-menu-item" @pointerdown="handle_export_csv">
						このシートを書き出す (CSV)
					</button>
					<button class="file-menu-item" @pointerdown="handle_export_workspace">
						全シートを書き出す (JSON)
					</button>
					<hr class="file-menu-separator" />
					<button class="file-menu-item" @pointerdown="handle_import">
						ファイルから読み込む
					</button>
				</div>
			</div>

			<button @pointerdown="handle_initialize" class="action-btn danger">初期化</button>
			<button class="help-btn" title="操作説明" @pointerdown="modal_store.SHOW_HELP()">？</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useModalStore, useToastStore } from '../stores';
import { useWorkspaceStore } from '../stores/workspace';
import { useSheetStore } from '../stores/sheet';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { do_create_shorten_url } from '../logics/url';
import { sort_row_datas } from '../logics/sort';
import {
	build_sheet_export, build_workspace_export, parse_import, rows_to_csv,
} from '../logics/exchange';
import {
	build_timestamp, download_csv, download_json, pick_text_file, sanitize_filename,
} from '../logics/download';
import { SCHEMA_VERSION } from '../types';

const sheet_store = useSheetStore();
const workspace_store = useWorkspaceStore();

// 計画名はシート名そのもの。ツリー側の名前を編集する
const sheet_name = computed({
	get: () => workspace_store.active_sheet_name,
	set: (name: string) => {
		if (!workspace_store.active_sheet_id) return;
		void workspace_store.RENAME(workspace_store.active_sheet_id, name);
	},
});

const toast_store = useToastStore();
const modal_store = useModalStore();

const is_copying = ref(false);
const is_file_menu_open = ref(false);

// メニュー外をクリックしたら閉じる
const handle_document_pointerdown = () => { is_file_menu_open.value = false; };

onMounted(() => {
	document.addEventListener('pointerdown', handle_document_pointerdown);
});
onUnmounted(() => {
	document.removeEventListener('pointerdown', handle_document_pointerdown);
});

const handle_sort_rows = () => {
	sheet_store.UPDATE_ROW_DATAS(sort_row_datas(sheet_store.row_datas));
};

const handle_copy_url = async () => {
	if (is_copying.value) return;

	is_copying.value = true;

	try {
		// 共有するのはアクティブなシート1枚
		const result = await do_create_shorten_url({
			project_name: workspace_store.active_sheet_name,
			row_datas: sheet_store.row_datas,
			approved_domains: workspace_store.approved_domains,
		});

		await copy_to_clipboard(result.url);

		toast_store.SHOW_TOAST(
			result.is_shortened
				? `copied: ${result.url}`
				: '短縮に失敗したため、短縮なしのURLをコピーしました',
			5000,
		);
	} catch (err) {
		toast_store.SHOW_TOAST('共有URLの発行に失敗しました', 5000);
		console.error(err);
	} finally {
		is_copying.value = false;
	}
};

/** execCommand は deprecated。使えない環境のためにフォールバックを残す */
const copy_to_clipboard = async (text: string): Promise<void> => {
	try {
		await navigator.clipboard.writeText(text);
		return;
	} catch {
		const textarea = document.createElement('textarea');
		textarea.value = text;
		document.body.appendChild(textarea);
		textarea.select();
		document.execCommand('copy');
		document.body.removeChild(textarea);
	}
};

const close_file_menu = () => { is_file_menu_open.value = false; };

const handle_export_sheet = () => {
	close_file_menu();
	const name = workspace_store.active_sheet_name;

	download_json(
		build_sheet_export(name, sheet_store.row_datas),
		`${sanitize_filename(name)}-${build_timestamp()}.json`,
	);
};

const handle_export_csv = () => {
	close_file_menu();
	const name = workspace_store.active_sheet_name;

	download_csv(
		rows_to_csv(sheet_store.row_datas),
		`${sanitize_filename(name)}-${build_timestamp()}.csv`,
	);
};

const handle_export_workspace = async () => {
	close_file_menu();

	// 書き出す前に未保存の変更を確定させる
	await sheet_store.FLUSH();
	const sheets = await workspace_store.COLLECT_ALL_SHEETS();

	download_json(
		build_workspace_export(
			{
				schema_version: SCHEMA_VERSION,
				nodes: workspace_store.nodes,
				approved_domains: workspace_store.approved_domains,
				active_sheet_id: workspace_store.active_sheet_id,
			},
			sheets,
		),
		`cost-workspace-${build_timestamp()}.json`,
	);
	toast_store.SHOW_TOAST(`${sheets.length}枚のシートを書き出しました`);
};

const handle_import = async () => {
	close_file_menu();

	const text = await pick_text_file('.json');
	if (text === null) return;

	try {
		const parsed = parse_import(JSON.parse(text));

		if (parsed.kind === 'sheet') {
			const sheet_id = await workspace_store.IMPORT_SHEET(parsed.data);
			await sheet_store.LOAD(sheet_id);
			toast_store.SHOW_TOAST(`「${parsed.data.name}」を読み込みました`);
			return;
		}

		// 既存を置き換えず、インポート用フォルダの下へ追加する
		const count = await workspace_store.IMPORT_WORKSPACE(parsed.data);
		toast_store.SHOW_TOAST(
			`${count}枚のシートをインポート用フォルダに読み込みました`,
		);
	} catch (error) {
		console.error('ファイルの読み込みに失敗しました:', error);
		toast_store.SHOW_TOAST(
			'ファイルの形式が正しくありません。cost で書き出した JSON を選んでください',
			6000,
		);
	}
};

const handle_initialize = () => {
	const is_permission = confirm('このシートの内容をすべて削除しますか?');
	if (!is_permission) return;

	sheet_store.RESET_ROWS();
};
</script>

<style scoped>
.header-controls {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	flex-wrap: wrap;
	gap: 15px;
}

.sheet-list-btn {
	padding: 6px 12px;
	border: 1px solid #ced4da;
	border-radius: 4px;
	background-color: #ffffff;
	font-size: 15px;
	line-height: 1;
	cursor: pointer;
}

.sheet-list-btn:hover {
	background-color: #e9ecef;
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

.menu-wrapper {
	position: relative;
}

.file-menu {
	position: absolute;
	top: calc(100% + 4px);
	right: 0;
	z-index: 800;
	min-width: 240px;
	background-color: #ffffff;
	border: 1px solid #dee2e6;
	border-radius: 4px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	padding: 4px 0;
}

.file-menu-item {
	display: block;
	width: 100%;
	padding: 8px 14px;
	border: none;
	background: none;
	text-align: left;
	font-size: 13px;
	cursor: pointer;
	white-space: nowrap;
}

.file-menu-item:hover {
	background-color: #e9ecef;
}

.file-menu-separator {
	margin: 4px 0;
	border: none;
	border-top: 1px solid #dee2e6;
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

.action-btn:disabled {
	background-color: #adb5bd;
	cursor: not-allowed;
	transform: none;
}

.action-btn:disabled:hover {
	background-color: #adb5bd;
}

.help-btn {
	width: 32px;
	border: 1px solid #ced4da;
	border-radius: 50%;
	background-color: #ffffff;
	color: #495057;
	font-size: 14px;
	cursor: pointer;
	flex-shrink: 0;
}

.help-btn:hover {
	background-color: #e9ecef;
}

.action-btn.danger {
	background-color: #fa5252;
}

.action-btn.danger:hover {
	background-color: #e03131;
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
</style>