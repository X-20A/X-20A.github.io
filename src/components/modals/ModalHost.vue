<template>
	<div v-if="isAreaVisible
		|| isReferenceVisible
		|| isErrorVisible
		|| isCommandEvacuationVisible"
		class="modal-overlay" @pointerdown="close_modals">
		<Area />
		<Reference />
		<ErrorView />
		<CommandEvacuation />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '../../stores';
import Area from './Area.vue';

const Reference = defineAsyncComponent(() => import(
	'./Reference.vue'
));
const ErrorView = defineAsyncComponent(() => import(
	'./ErrorView.vue'
));
const CommandEvacuation = defineAsyncComponent(() => import(
	'./CommandEvacuation.vue'
));

const modalStore = useModalStore();
const {
	isAreaVisible,
	isReferenceVisible,
	isErrorVisible,
	isCommandEvacuationVisible,
} = storeToRefs(modalStore);

const close_modals = () => {
	modalStore.HIDE_MODALS();
};
</script>

<style scoped>
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
	z-index: var(--z-modal);
}
</style>
