<template>
  <div class="option-container">
    <div
      v-if="matched_data"
      class="draggable"
      :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    >
      <template v-for="(group, key) in matched_data" :key="key">
        <div class="inner">
          <p class="title" @pointerdown="start_drag">
						{{ group.label ? group.label : key }}:
					</p>
          <div class="value-box">
            <template v-for="option in group.options" :key="option.value">
              <div>
                <label>
                  <input
										:name="key"
                    type="radio"
										:value="option.value"
										v-model="selectedOptions[key]"
										@change="update_option"
                  />
                  <span>
										{{ option.label ? option.label : option.value }}
									</span>
                </label>
              </div>
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '../stores';
import { OPTION_DATA } from '../data/options';

// オプションパネル

const store = useStore();

const selectedArea = computed(() => store.selectedArea);

const options = computed(() => store.options);

// 海域絞り込み
const matched_data = computed(() => {
  if (selectedArea.value && OPTION_DATA[selectedArea.value] && options.value) {
		const base_datas = OPTION_DATA[selectedArea.value]!;
    return base_datas;
  }
});

const selectedOptions = ref<Record<string, string>>({});

// 入力からstore
const update_option = (event: Event) => {
	if (selectedArea.value) {
		const target = event.target as HTMLInputElement;
		const key = target.name;
		const value = target.value;

		store.UPDATE_OPTION_WITH_KEY(selectedArea.value, key, value);
		store.SAVE_DATA();
	}
};

// storeから反映
watch([options, selectedArea], () => {
	if (options.value && selectedArea.value) {
		const option = options.value[selectedArea.value];
		if (option) {
			selectedOptions.value = option;
		}
	}
}, { deep: true });

// 以下Draggable実装
const position = ref({ x: 0, y: 0 }); // ドラッグ中の位置
const isDragging = ref(false); // ドラッグ中かどうか
const offset = ref({ x: 0, y: 0 }); // マウスとのオフセット

// ドラッグ開始
const start_drag = (event: MouseEvent) => {
  isDragging.value = true;
  offset.value.x = event.clientX - position.value.x;
  offset.value.y = event.clientY - position.value.y;
  window.addEventListener('mousemove', on_drag);
  window.addEventListener('mouseup', stop_drag);
};

// ドラッグ中の処理
const on_drag = (event: MouseEvent) => {
  if (isDragging.value) {
    position.value.x = event.clientX - offset.value.x;
    position.value.y = event.clientY - offset.value.y;
  }
};

// ドラッグ終了
const stop_drag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', on_drag);
  window.removeEventListener('mouseup', stop_drag);
};
</script>

<style scoped>
.option-container {
	position: relative;
  width: 200px;
}
.draggable {
  position: absolute;
	z-index: var(--z-option-panel);
  cursor: move;
  border-radius: 3px;
	padding: 5px;
	border: 1px solid #2196F3;
  background-color: #fff;
	min-width: 200px;
	user-select: none;
}
.options {
	cursor: move;
	border-radius: 3px;
	padding: 5px;
	border: 1px solid #2196F3;
	left: 0;
	z-index: 0;
	background: #ffff;
	position: absolute;
	overflow: hidden;
}
.inner {
	display: flex;
}
.inner:not(:last-child) {
	border-bottom: 1px solid #9A9A9B;
}
.title {
	width: 80px;
	margin-left: 4px;
	display: flex;
	align-items: center;
}
.value-box {
	width: 170px;
	flex-grow: 1;
	cursor: default;
	border-left: 1px solid #9A9A9B;
}
</style>