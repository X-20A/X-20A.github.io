<!-- components/ErrorModal.vue -->
<template>
	<div
		class="modal-content"
		v-if="isErrorVisible"
		@pointerdown.stop
	>
		<p>{{ errorMessage }}</p>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '@/stores/';

// エラーメッセージモーダル

const store = useModalStore();

// store経由でどこからでも呼び出せる
const isErrorVisible = computed(() => store.isErrorVisible);
const errorMessage = computed(() => store.errorMessage);
</script>

<style scoped>
.modal-content {
  min-width: 400px;
  height: 160px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>
