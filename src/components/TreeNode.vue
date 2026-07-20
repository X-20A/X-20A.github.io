<template>
	<li class="tree-node">
		<div class="node-row" :class="{
			'is-active': is_active,
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
import { computed, nextTick, ref } from 'vue';
import { useWorkspaceStore } from '../stores/workspace';
import { useToastStore } from '../stores';
import { is_in_trash, type TreeItem } from '../logics/tree';

const props = defineProps<{ item: TreeItem }>();

const workspace_store = useWorkspaceStore();
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

const is_editing = ref(false);
const draft_name = ref('');
const name_input = ref<HTMLInputElement | null>(null);

const handle_activate = () => {
	if (is_folder.value) {
		void workspace_store.SET_EXPANDED(props.item.node.id, !is_expanded.value);
		return;
	}
	void workspace_store.ACTIVATE_SHEET(props.item.node.id);
};

const handle_toggle = () => {
	void workspace_store.SET_EXPANDED(props.item.node.id, !is_expanded.value);
};

const start_rename = async () => {
	draft_name.value = props.item.node.name;
	is_editing.value = true;

	await nextTick();
	name_input.value?.select();
};

const commit_rename = () => {
	if (!is_editing.value) return;
	is_editing.value = false;

	const name = draft_name.value.trim();
	// 名前を消すと一覧で見分けがつかなくなるため、空なら元に戻す
	if (!name || name === props.item.node.name) return;

	void workspace_store.RENAME(props.item.node.id, name);
};

const cancel_rename = () => {
	is_editing.value = false;
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
		// 落とした先が閉じていると、どこへ入ったのか分からなくなる
		await workspace_store.SET_EXPANDED(props.item.node.id, true);
		await workspace_store.DROP_INTO(props.item.node.id);
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
