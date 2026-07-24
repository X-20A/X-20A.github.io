<template>
	<li class="tree-node">
		<div class="node-row" :class="{
			'is-active': is_active,
			'is-selected': is_selected,
			'is-folder': is_folder,
			'is-dragging': is_dragging,
			'drop-before': drop_zone === 'before',
			'drop-after': drop_zone === 'after',
			'drop-into': drop_zone === 'into',
		}" :style="{ paddingLeft: `${item.depth * 14 + 8}px` }" @pointerdown="handle_activate"
			draggable="true" @dragstart="handle_dragstart" @dragend="handle_dragend"
			@dragover.prevent="handle_dragover" @dragleave="drop_zone = null" @drop.prevent="handle_drop">
			<button v-if="is_folder" class="disclosure" :aria-label="is_expanded ? '閉じる' : '開く'"
				@pointerdown.stop="handle_toggle">
				{{ is_expanded ? '▾' : '▸' }}
			</button>
			<span v-else class="disclosure-spacer"></span>

			<span class="node-icon">{{ is_folder ? '📁' : '📄' }}</span>

			<input v-if="is_editing" ref="name_input" v-model="draft_name" class="name-input"
				@pointerdown.stop @blur="commit_rename" @keydown.enter="commit_rename"
				@keydown.esc="cancel_rename" />
			<span v-else class="node-name" @dblclick.stop="start_rename">{{ item.node.name }}</span>

			<span class="node-actions">
				<template v-if="is_trashed">
					<button class="node-action" title="元に戻す"
						@pointerdown.stop="handle_restore">↩</button>
				</template>
				<template v-else>
					<button v-if="is_folder" class="node-action" title="シートを追加"
						@pointerdown.stop="handle_create_sheet">＋</button>
					<button v-if="is_folder" class="node-action" title="フォルダを追加"
						@pointerdown.stop="handle_create_folder">📁</button>
					<button v-if="!is_folder" class="node-action" title="シートを複製"
						@pointerdown.stop="handle_duplicate">⧉</button>
					<button class="node-action" title="ゴミ箱へ移動"
						@pointerdown.stop="handle_trash">🗑</button>
				</template>
			</span>
		</div>

		<ul v-if="is_folder && is_expanded && item.children.length > 0" class="tree-children">
			<TreeNode v-for="child in item.children" :key="child.node.id" :item="child" />
		</ul>
	</li>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useWorkspaceStore } from '../stores/workspace';
import { useSheetStore } from '../stores/sheet';
import { useToastStore } from '../stores';
import { is_in_trash, type TreeItem } from '../logics/tree';

const props = defineProps<{ item: TreeItem }>();

const workspace_store = useWorkspaceStore();
const sheet_store = useSheetStore();
const toast_store = useToastStore();

const is_folder = computed(() => props.item.node.type === 'folder');
const is_active = computed(
	() => workspace_store.active_sheet_id === props.item.node.id,
);
const is_expanded = computed(() =>
	props.item.node.type === 'folder' && props.item.node.is_expanded,
);
const is_trashed = computed(
	() => is_in_trash(workspace_store.nodes, props.item.node.id),
);
const is_selected = computed(
	() => workspace_store.selected_node_id === props.item.node.id,
);

// 編集状態はストアで持つ。F2 など外部からも編集を開始できるようにするため
const is_editing = computed(
	() => workspace_store.editing_node_id === props.item.node.id,
);
const draft_name = ref('');
const name_input = ref<HTMLInputElement | null>(null);

// 編集開始時に、下書きを現在名で初期化して入力欄を選択状態にする
watch(is_editing, async (editing) => {
	if (!editing) return;

	draft_name.value = props.item.node.name;
	await nextTick();
	name_input.value?.select();
});

const handle_activate = () => {
	workspace_store.SELECT_NODE(props.item.node.id);

	if (is_folder.value) {
		void workspace_store.SET_EXPANDED(props.item.node.id, !is_expanded.value);
		return;
	}
	void workspace_store.ACTIVATE_SHEET(props.item.node.id);
};

const handle_toggle = () => {
	void workspace_store.SET_EXPANDED(props.item.node.id, !is_expanded.value);
};

const start_rename = () => {
	workspace_store.START_EDITING(props.item.node.id);
};

const commit_rename = () => {
	if (!is_editing.value) return;
	workspace_store.STOP_EDITING();

	const name = draft_name.value.trim();
	// 名前を消すと一覧で見分けがつかなくなるため、空なら元に戻す
	if (!name || name === props.item.node.name) return;

	void workspace_store.RENAME(props.item.node.id, name);
};

const cancel_rename = () => {
	workspace_store.STOP_EDITING();
};

type DropZone = 'before' | 'into' | 'after';

/** ドロップ先の見た目。中央へのドロップはフォルダにのみ許す */
const drop_zone = ref<DropZone | null>(null);
const is_dragging = computed(
	() => workspace_store.dragging_node_id === props.item.node.id,
);

const handle_dragstart = (event: DragEvent) => {
	workspace_store.START_DRAG(props.item.node.id);
	// これを設定しないと Firefox がドラッグを開始しない
	event.dataTransfer?.setData('text/plain', props.item.node.id);
	if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
};

const handle_dragend = () => {
	drop_zone.value = null;
	workspace_store.END_DRAG();
};

const handle_dragover = (event: DragEvent) => {
	const dragging_id = workspace_store.dragging_node_id;
	// 自分自身の上ではドロップ先を表示しない
	if (!dragging_id || dragging_id === props.item.node.id) {
		drop_zone.value = null;
		return;
	}

	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
	const ratio = (event.clientY - rect.top) / rect.height;

	if (is_folder.value && ratio > 0.25 && ratio < 0.75) {
		drop_zone.value = 'into';
		return;
	}
	drop_zone.value = ratio < 0.5 ? 'before' : 'after';
};

const handle_drop = async () => {
	const zone = drop_zone.value;
	drop_zone.value = null;
	if (!zone) return;

	if (zone === 'into') {
		// DROP_INTO を先に呼ぶ。SET_EXPANDED の await 中に dragend が発火して
		// dragging_node_id が消えると、後から DROP_INTO しても移動できないため
		await workspace_store.DROP_INTO(props.item.node.id);
		// 落とした先が閉じていると、どこへ入ったのか分からなくなる
		await workspace_store.SET_EXPANDED(props.item.node.id, true);
		return;
	}
	await workspace_store.DROP_BESIDE(props.item.node.id, zone);
};

const handle_create_sheet = () => {
	void workspace_store.CREATE_SHEET(props.item.node.id);
};

const handle_create_folder = () => {
	void workspace_store.CREATE_FOLDER(props.item.node.id);
};

const handle_duplicate = async () => {
	// 複製元がアクティブなら、未保存の編集を先に確定させてから本体を読む
	await sheet_store.FLUSH();

	const new_id = await workspace_store.DUPLICATE_SHEET(props.item.node.id);
	if (new_id) {
		toast_store.SHOW_TOAST(`「${props.item.node.name}」を複製しました`);
	}
};

const handle_restore = async () => {
	await workspace_store.RESTORE(props.item.node.id);
	toast_store.SHOW_TOAST(`「${props.item.node.name}」を元に戻しました`);
};

const handle_trash = async () => {
	await workspace_store.TRASH(props.item.node.id);

	toast_store.SHOW_TOAST_WITH_ACTION(
		`「${props.item.node.name}」をゴミ箱へ移動しました`,
		'元に戻す',
		() => { void workspace_store.UNDO_MOVE(); },
		8000,
	);
};
</script>

<style scoped>
.tree-node {
	list-style: none;
}

.node-row {
	display: flex;
	align-items: center;
	gap: 4px;
	padding: 5px 8px;
	cursor: pointer;
	border-radius: 4px;
	font-size: 13px;
	user-select: none;
}

.node-row:hover {
	background-color: #e9ecef;
}

.node-row.is-active {
	background-color: #d0ebff;
	font-weight: 600;
}

/* F2 リネームの対象。アクティブ・ホバー・ドロップ表示と重なっても分かるよう輪郭で示す */
.node-row.is-selected {
	outline: 1.5px solid #4dabf7;
	outline-offset: -1.5px;
}

.node-row.is-dragging {
	opacity: 0.4;
}

/* ドロップ位置の表示。前後は境界線、フォルダの中は枠で示す */
.node-row.drop-before {
	box-shadow: inset 0 2px 0 0 #4dabf7;
}

.node-row.drop-after {
	box-shadow: inset 0 -2px 0 0 #4dabf7;
}

.node-row.drop-into {
	background-color: #d0ebff;
	box-shadow: inset 0 0 0 2px #4dabf7;
}

.disclosure {
	border: none;
	background: none;
	cursor: pointer;
	padding: 0;
	width: 14px;
	font-size: 11px;
	color: #495057;
}

.disclosure-spacer {
	width: 14px;
}

.node-icon {
	font-size: 12px;
}

.node-name {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.name-input {
	flex: 1;
	min-width: 0;
	font-size: 13px;
	padding: 1px 4px;
	border: 1px solid #4dabf7;
	border-radius: 3px;
}

.node-actions {
	display: none;
	gap: 2px;
}

.node-row:hover .node-actions {
	display: flex;
}

.node-action {
	border: none;
	background: none;
	cursor: pointer;
	padding: 0 3px;
	font-size: 11px;
	line-height: 1;
	opacity: 0.6;
}

.node-action:hover {
	opacity: 1;
}

.tree-children {
	margin: 0;
	padding: 0;
}
</style>
