<template>
	<div class="header-controls">
		<input v-model="current_data.project_name" placeholder="計画名" @input="handle_project_name_update"
			class="project-name-input" />
		<div class="button-group">
			<button @pointerdown="handle_sort_rows" class="action-btn">上詰め</button>
			<button @pointerdown="handle_copy_url" class="action-btn" :disabled="is_copying">
				{{ is_copying ? '処理中...' : 'URL発行' }}
			</button>
			<button @pointerdown="handle_initialize" class="action-btn danger">初期化</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useStore, useToastStore } from '../stores';
import { computed, ref } from 'vue';
import { do_create_shorten_url } from '../logics/url';
import { sort_row_datas } from '../logics/sort';

const store = useStore();
const current_data = computed(() => store.current_data);

const toast_store = useToastStore();

const is_copying = ref(false);

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
	if (is_copying.value) return;

	is_copying.value = true;

	try {
		const shorten_url = await do_create_shorten_url(current_data.value);

		const textArea = document.createElement('textarea');
		textArea.value = shorten_url;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('copy');
		document.body.removeChild(textArea);
		// 通知を表示
		toast_store.SHOW_TOAST(`copied: ${shorten_url}`, 5000);
	} catch (err) {
		toast_store.SHOW_TOAST('共有URLの発行に失敗しました', 5000);
		console.error(err);
	} finally {
		is_copying.value = false;
	}
};

const handle_initialize = () => {
	const is_permission = confirm('データを削除しますか?');
	if (!is_permission) return;

	store.INITIALIZE_DATA();
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

.action-btn:disabled {
	background-color: #adb5bd;
	cursor: not-allowed;
	transform: none;
}

.action-btn:disabled:hover {
	background-color: #adb5bd;
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