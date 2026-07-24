<!-- components/ErrorModal.vue -->
<template>
	<div class="modal-content" v-if="isErrorVisible" @pointerdown.stop>
		<p>{{ errorMessage }}</p>
		<button v-if="backupKey" class="backup-btn" @pointerdown="download_backup">
			退避データを保存
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore, useToastStore } from '../stores';
import { download_text, sanitize_filename, build_timestamp } from '../logics/download';

// エラーメッセージモーダル

const store = useModalStore();
const toast_store = useToastStore();

// store経由でどこからでも呼び出せる
const isErrorVisible = computed(() => store.is_error_visible);
const errorMessage = computed(() => store.error_message);
const backupKey = computed(() => store.corrupted_backup_key);

// 退避された壊れデータをそのままファイルに書き出す
const download_backup = () => {
	const key = backupKey.value;
	if (!key) return;

	const raw = localStorage.getItem(key);
	if (raw === null) {
		toast_store.SHOW_TOAST('退避データが見つかりませんでした', 5000);
		return;
	}

	download_text(
		raw,
		`${sanitize_filename('cost-corrupted')}-${build_timestamp()}.json`,
	);
};
</script>

<style scoped>
.modal-content {
	min-width: 400px;
	max-width: 90vw;
	background: white;
	padding: 24px;
	border-radius: 8px;
	text-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 16px;
}

.modal-content p {
	margin: 0;
	line-height: 1.6;
}

.backup-btn {
	padding: 8px 18px;
	border: 1px solid #4dabf7;
	border-radius: 4px;
	background-color: #ffffff;
	color: #1971c2;
	font-size: 14px;
	cursor: pointer;
}

.backup-btn:hover {
	background-color: #e7f3ff;
}
</style>
