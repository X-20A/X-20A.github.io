<template>
  <div class="option-container">
    <div
      v-if="matched_data"
      class="draggable"
      :style="{ left: `${position.x}px`, top: `${position.y}px` }"
    >
      <template v-for="(group, key) in matched_data" :key="key">
        <div class="inner">
          <p class="title" @mousedown="startDrag">
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
										@change="updateOption"
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
import { useStore } from '@/stores';
import type { AreaId } from '@/classes/types';

// オプションパネル

const store = useStore();

const selectedArea = computed(() => store.selectedArea);

const options = computed(() => store.options);

type Option = {
  value: string;
  label?: string;
	is_checked?: boolean,
};

type OptionGroup = {
	options: Option[];
  label?: string;
};

type OptionSelector = {
  [key in AreaId]?: Record<string, OptionGroup>;
};

const option_data: OptionSelector = {
	'7-3': {
		'phase': {
			label: '第二ボス',
			options: [
				{ value: '1', label: '出現前' },
				{ value: '2', label: '出現後' },
			],
		},
	},
	'57-7': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Hボス出現後' },
				{ value: '2', label: 'F-H開通後' },
				{ value: '3', label: 'Pボス出現後' },
				{ value: '4', label: '出撃地点3解放後' },
				{ value: '5', label: 'C2-L開通後' },
				{ value: '6', label: 'Zボス出現後' },
				{ value: '7', label: 'L-V & L-X開通後' },
			],
		},
	},
	'58-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '出撃地点2解放前' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: 'Xボス出現後' },
			],
		},
	},
	'58-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '第一ボス出現前' },
				{ value: '2', label: '第一ボス出現後' },
				{ value: '3', label: '第二ボス出現後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'58-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '出撃地点3解放前' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: '出撃地点4解放後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'58-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Oボス出現前' },
				{ value: '2', label: 'Oボス出現後' },
				{ value: '3', label: 'Sボス出現後' },
			],
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
		'tag': {
			label: '出撃札',
			options: [
				{ value: '1', label: '新編竜巻部隊のみ' },
				{ value: '0', label: 'その他' },
			],
		},
	},
	'59-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第一ギミック完了後' },
				{ value: '3', label: '第二ギミック完了後' },
			],
		},
	},
	'59-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: '短縮後' },
			],
		},
	},
	'59-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第二ゲージ以降' },
			],
		},
	},
	'59-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3解放後' },
				{ value: '3', label: 'ZZボス出現後' },
			],
		},
	},
	'60-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点2解放後' },
				{ value: '3', label: 'Oボス出現後' },
			],
		},
		'is_third': {
			label: '出撃艦隊',
			options: [
				{ value: '1', label: '第三艦隊' },
				{ value: '0', label: 'それ以外' },
			],
		},
	},
	'60-2': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'Uボス出現前' },
				{ value: '2', label: 'Uボス出現後' },
				{ value: '3', label: 'Wボス出現後' },
			],
		},
	},
	'60-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Gボス出現後' },
				{ value: '3', label: '出撃地点2,3解放後' },
				{ value: '4', label: 'Rボス出現後' },
				{ value: '5', label: 'W泊地マス解放後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'60-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Lボス出現後' },
				{ value: '3', label: 'Wボス出現後' },
			]
		},
	},
	'60-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Tボス出現後' },
				{ value: '3', label: 'Zボス出現後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
	'60-6': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: 'Vボス出現後' },
				{ value: '3', label: '短縮ギミック後' },
			]
		},
		'difficulty': {
			label: '難易度',
			options: [
				{ value: '4', label: '甲' },
				{ value: '3', label: '乙' },
				{ value: '2', label: '丙' },
				{ value: '1', label: '丁' },
			],
		},
	},
}; // @expansion

// 海域絞り込み
const matched_data = computed(() => {
  if (selectedArea.value && option_data[selectedArea.value] && options.value) {
		const base_datas = option_data[selectedArea.value]!;
    return base_datas;
  }
});

const selectedOptions = ref<Record<string, string>>({});

// 入力からstore
const updateOption = (event: Event) => {
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
const startDrag = (event: MouseEvent) => {
  isDragging.value = true;
  offset.value.x = event.clientX - position.value.x;
  offset.value.y = event.clientY - position.value.y;
  window.addEventListener('mousemove', onDrag);
  window.addEventListener('mouseup', stopDrag);
};

// ドラッグ中の処理
const onDrag = (event: MouseEvent) => {
  if (isDragging.value) {
    position.value.x = event.clientX - offset.value.x;
    position.value.y = event.clientY - offset.value.y;
  }
};

// ドラッグ終了
const stopDrag = () => {
  isDragging.value = false;
  window.removeEventListener('mousemove', onDrag);
  window.removeEventListener('mouseup', stopDrag);
};
</script>

<style scoped>
.option-container {
	position: relative;
  width: 200px;
}
.draggable {
  position: absolute;
	z-index: 9999;
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