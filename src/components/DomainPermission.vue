<template v-if="is_domain_permission_visible">
	<div class="domain-permission-modal" @pointerdown.stop>
		<div class="modal-content">
			<h2 class="modal-title">以下のURLを開こうとしています</h2>
			<p class="url-display">{{ pending_url }}</p>
			<div class="button-group">
				<button class="btn btn-open" @click="handle_open">開く</button>
				<button class="btn btn-always-open" @click="handle_always_open">
					このサイトのURLは常に開く
				</button>
				<button class="btn btn-cancel" @click="handle_cancel">キャンセル</button>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore, useModalStore } from '../stores';
import { do_open_url_in_new_tab } from '../logics/url';

const store = useStore();
const pending_url = computed(() => store.pending_url);

const modalStore = useModalStore();
const is_domain_permission_visible =
	computed(() => modalStore.is_domain_permission_visible);

// 開く
const handle_open = () => {
	if (pending_url.value === '') return;

	do_open_url_in_new_tab(pending_url.value);
	modalStore.HIDE_MODALS();
};

// 常に開く
const handle_always_open = () => {
	if (pending_url.value === '') return;

	store.ADD_APPROVED_DOMAIN(pending_url.value);
	do_open_url_in_new_tab(pending_url.value);
	modalStore.HIDE_MODALS();
};

// キャンセル
const handle_cancel = () => {
	modalStore.HIDE_MODALS();
};
</script>

<style scoped>
.domain-permission-modal {
	background: #ffffff;
	padding: 24px;
	border-radius: 8px;
	max-width: 600px;
	color: #000000;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content {
	display: flex;
	flex-direction: column;
	gap: 20px;
}

.modal-title {
	font-size: 1.2rem;
	font-weight: 600;
	margin: 0;
	color: #333;
}

.url-display {
	background: #f5f5f5;
	padding: 12px 16px;
	border-radius: 6px;
	font-family: monospace;
	word-break: break-all;
	margin: 0;
	border: 1px solid #e0e0e0;
}

.button-group {
	display: flex;
	gap: 12px;
	justify-content: flex-end;
}

.btn {
	padding: 10px 20px;
	border: none;
	border-radius: 6px;
	font-size: 0.9rem;
	font-weight: 500;
	cursor: pointer;
	transition: all 0.2s ease;
}

.btn-open {
	background: #4dabf7;
	color: white;
}

.btn-open:hover {
	background: #1565c0;
}

.btn-always-open {
	background: #63c269;
	color: white;
}

.btn-always-open:hover {
	background: #2e7d32;
}

.btn-cancel {
	background: #f5f5f5;
	color: #333;
	border: 1px solid #ddd;
}

.btn-cancel:hover {
	background: #e0e0e0;
}
</style>