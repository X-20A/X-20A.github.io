<template>
	<div>
		<div v-if="is_open" class="sidebar-mask" @pointerdown="close"></div>

		<transition name="sidebar">
			<aside v-if="is_open" class="sidebar">
				<div class="sidebar-toolbar">
					<button class="toolbar-btn" @pointerdown="handle_create_sheet">＋ シート</button>
					<button class="toolbar-btn" @pointerdown="handle_create_folder">＋ フォルダ</button>
				</div>

				<nav class="sidebar-tree" :class="{ 'is-drop-target': is_root_drop_target }"
					@dragover.prevent="handle_root_dragover" @dragleave="is_root_drop_target = false"
					@drop.prevent="handle_root_drop">
					<ul class="tree-root">
						<TreeNode v-for="item in tree" :key="item.node.id" :item="item" />
					</ul>
				</nav>

				<section class="trash-section">
					<div class="trash-header" :class="{ 'is-drop-target': is_trash_drop_target }"
						@pointerdown="is_trash_open = !is_trash_open"
						@dragover.prevent="handle_trash_dragover"
						@dragleave="is_trash_drop_target = false" @drop.prevent="handle_trash_drop">
						<span class="trash-disclosure">{{ is_trash_open ? '▾' : '▸' }}</span>
						<span>🗑 ゴミ箱</span>
						<span class="trash-count">{{ trash_items.length }}</span>
					</div>

					<div v-if="is_trash_open" class="trash-body">
						<p v-if="trash_items.length === 0" class="trash-empty">空です</p>

						<template v-else>
							<ul class="tree-root">
								<TreeNode v-for="item in trash_items" :key="item.node.id" :item="item" />
							</ul>
							<button class="trash-empty-btn" @pointerdown="handle_empty_trash">
								ゴミ箱を空にする
							</button>
						</template>
					</div>
				</section>
			</aside>
		</transition>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useWorkspaceStore } from '../stores/workspace';
import { useToastStore } from '../stores';
import TreeNode from './TreeNode.vue';

const workspace_store = useWorkspaceStore();
const toast_store = useToastStore();

const is_open = computed(() => workspace_store.is_sidebar_open);
const tree = computed(() => workspace_store.tree);
const trash_items = computed(() => workspace_store.trash_items);

const is_trash_open = ref(false);

// 空き領域へのドロップはルート直下への移動として扱う
const is_root_drop_target = ref(false);
const is_trash_drop_target = ref(false);

const handle_root_dragover = (event: DragEvent) => {
	// ノードの上ではノード側の判定を優先する
	const is_on_node = (event.target as HTMLElement)?.closest('.node-row');
	is_root_drop_target.value =
		!is_on_node && workspace_store.dragging_node_id !== null;
};

const handle_root_drop = async (event: DragEvent) => {
	const was_target = is_root_drop_target.value;
	is_root_drop_target.value = false;
	// ノード上のドロップは TreeNode 側で処理済み
	if (!was_target || (event.target as HTMLElement)?.closest('.node-row')) return;

	await workspace_store.DROP_INTO(null);
};

const handle_trash_dragover = () => {
	is_trash_drop_target.value = workspace_store.dragging_node_id !== null;
};

const handle_trash_drop = async () => {
	if (!is_trash_drop_target.value) return;
	is_trash_drop_target.value = false;

	const node_id = workspace_store.dragging_node_id;
	if (!node_id) return;

	const name = workspace_store.nodes[node_id]?.name ?? '';
	workspace_store.END_DRAG();
	await workspace_store.TRASH(node_id);

	toast_store.SHOW_TOAST_WITH_ACTION(
		`「${name}」をゴミ箱へ移動しました`,
		'元に戻す',
		() => { void workspace_store.UNDO_MOVE(); },
		8000,
	);
};

const close = () => workspace_store.TOGGLE_SIDEBAR();

const handle_create_sheet = () => { void workspace_store.CREATE_SHEET(); };
const handle_create_folder = () => { void workspace_store.CREATE_FOLDER(); };

const handle_empty_trash = async () => {
	// ここだけは Undo で戻せない。シート本体を物理削除するため
	const is_permission = confirm(
		'ゴミ箱の中身を完全に削除します。この操作は元に戻せません。\n続行しますか?'
	);
	if (!is_permission) return;

	await workspace_store.EMPTY_TRASH();
	toast_store.SHOW_TOAST('ゴミ箱を空にしました');
};
</script>

<style scoped>
.sidebar-mask {
	position: fixed;
	top: var(--header-height);
	left: 0;
	right: 0;
	bottom: var(--footer-height);
	background-color: rgba(0, 0, 0, 0.35);
	z-index: 900;
}

.sidebar {
	position: fixed;
	top: var(--header-height);
	left: 0;
	bottom: var(--footer-height);
	width: 260px;
	max-width: 80vw;
	background-color: #f8f9fa;
	border-right: 1px solid #dee2e6;
	z-index: 901;
	display: flex;
	flex-direction: column;
	box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
	/* 表示中の位置を明示する。これがないと enter 後も
	   translateX(-100%) が残り、画面外でクリックを受け取れなくなる */
	transform: translateX(0);
}

.sidebar-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12px;
	border-bottom: 1px solid #dee2e6;
}

.sidebar-title {
	font-weight: 600;
	font-size: 14px;
}

.sidebar-close {
	border: none;
	background: none;
	font-size: 20px;
	line-height: 1;
	cursor: pointer;
	color: #868e96;
}

.sidebar-toolbar {
	display: flex;
	gap: 6px;
	padding: 8px 10px;
	border-bottom: 1px solid #dee2e6;
}

.toolbar-btn {
	flex: 1;
	padding: 5px 6px;
	font-size: 12px;
	border: 1px solid #ced4da;
	border-radius: 4px;
	background-color: #ffffff;
	cursor: pointer;
}

.toolbar-btn:hover {
	background-color: #e9ecef;
}

.sidebar-tree {
	flex: 1;
	overflow-y: auto;
	padding: 6px;
}

.sidebar-tree.is-drop-target {
	background-color: #e7f5ff;
	box-shadow: inset 0 0 0 2px #4dabf7;
	border-radius: 4px;
}

.trash-header.is-drop-target {
	background-color: #ffe3e3;
	box-shadow: inset 0 0 0 2px #fa5252;
}

.tree-root {
	margin: 0;
	padding: 0;
}

.trash-section {
	border-top: 1px solid #dee2e6;
	padding: 6px;
	max-height: 40%;
	overflow-y: auto;
}

.trash-header {
	display: flex;
	align-items: center;
	gap: 6px;
	padding: 6px 8px;
	font-size: 13px;
	cursor: pointer;
	user-select: none;
	border-radius: 4px;
}

.trash-header:hover {
	background-color: #e9ecef;
}

.trash-disclosure {
	font-size: 11px;
	color: #495057;
}

.trash-count {
	margin-left: auto;
	font-size: 11px;
	color: #868e96;
}

.trash-empty {
	margin: 0;
	padding: 6px 12px;
	font-size: 12px;
	color: #868e96;
}

.trash-empty-btn {
	width: 100%;
	margin-top: 6px;
	padding: 5px;
	font-size: 12px;
	border: 1px solid #ffc9c9;
	border-radius: 4px;
	background-color: #fff5f5;
	color: #e03131;
	cursor: pointer;
}

.trash-empty-btn:hover {
	background-color: #ffe3e3;
}

.sidebar-enter-active,
.sidebar-leave-active {
	transition: transform 0.18s ease;
}

.sidebar-enter-from,
.sidebar-leave-to {
	transform: translateX(-100%);
}
</style>
