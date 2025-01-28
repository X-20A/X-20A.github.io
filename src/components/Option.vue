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
import { AreaId } from '@/classes/types';

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
  '4-5': {
    'A': {
      options: [
        { value: 'B' },
        { value: 'D' },
      ],
    },
    'C': {
      options: [
        { value: 'D' },
        { value: 'F' },
      ],
    },
    'I': {
      options: [
        { value: 'G' },
        { value: 'J' },
      ],
    },
  },
  '5-5': {
    'F': {
      options: [
        { value: 'D' },
        { value: 'J' },
      ],
    },
  },
  '6-3': {
    'A': {
      options: [
        { value: 'B' },
        { value: 'C' },
      ],
    },
  },
	'7-3': {
		'phase': {
				label: '第二ボス',
				options: [
					{ value: '1', label: '解放前' },
					{ value: '2', label: '解放後' },
				],
			},
		},
	'7-4': {
		'F': {
			options: [
				{ value: 'H' },
				{ value: 'J' },
			],
		},
	},
	'7-5': {
		'F': {
			options: [
				{ value: 'G' },
				{ value: 'J' },
			],
		},
		'H': {
			options: [
				{ value: 'I' },
				{ value: 'K' },
			],
		},
		'O': {
			options: [
				{ value: 'P' },
				{ value: 'Q' },
			],
		},
	},
	'58-1': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: 'ギミック1終了' },
				{ value: '2', label: '輸送終了' },
				{ value: '3', label: 'ボス出現後' },
			],
		},
		'A': {
			options: [
				{ value: 'D' },
				{ value: 'B' },
			],
		},
		'I': {
			options: [
				{ value: 'N1' },
				{ value: 'D' },
			],
		},
		'F': {
			options: [
				{ value: 'G' },
				{ value: 'H' },
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
				{ value: '1', label: '第一ボス出現前' },
				{ value: '2', label: '第一ボス出現後' },
				{ value: '3', label: '第二ボス出現後' },
				{ value: '4', label: '第三ボス出現後' },
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
		'M': {
			options: [
				{ value: 'P' },
				{ value: 'N' },
			],
		},
	},
	'58-4': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '第一ギミック完了後' },
				{ value: '3', label: '第一ボス出現後' },
				{ value: '4', label: '第二ボス出現後' },
				{ value: '5', label: '第三ボス出現後' },
				{ value: '6', label: '第四ボス出現後' },
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
		'B': {
			options: [
				{ value: 'D' },
				{ value: 'C' },
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
		'C': {
			options: [
				{ value: 'C1' },
				{ value: 'C2' },
			],
		},
		'E': {
			options: [
				{ value: 'F' },
				{ value: 'G' },
			],
		},
	},
	'59-2': {
		'L': {
			options: [
				{ value: 'M' },
				{ value: 'N' },
			],
		},
		'N': {
			options: [
				{ value: 'O' },
				{ value: 'P' },
			],
		},
		'P': {
			options: [
				{ value: 'Q' },
				{ value: 'R' },
			],
		},
	},
	'59-3': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3出現後' },
				{ value: '3', label: '短縮後' },
			],
		},
		'C': {
			options: [
				{ value: 'C1' },
				{ value: 'C2' },
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
		'A2': {
			options: [
				{ value: 'B' },
				{ value: 'C' },
			],
		},
		'D': {
			options: [
				{ value: 'E' },
				{ value: 'F' },
			],
		},
	},
	'59-5': {
		'phase': {
			label: 'Phase',
			options: [
				{ value: '1', label: '開始時点' },
				{ value: '2', label: '出撃地点3出現後' },
				{ value: '3', label: 'ZZボス出現後' },
			],
		},
		'G': {
			options: [
				{ value: 'H' },
				{ value: 'I' },
			],
		},
		'O2': {
			options: [
				{ value: 'P' },
				{ value: 'Q' },
			],
		},
		'W': {
			options: [
				{ value: 'X' },
				{ value: 'Z' },
			],
		},
	}
};

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
	align-items: center;
}
.inner:not(:last-child) {
	border-bottom: 1px solid #9A9A9B;
}
.title {
	width: 80px;
	margin-left: 4px;
}
.value-box {
	width: 170px;
	flex-grow: 1;
	cursor: default;
	border-left: 1px solid #9A9A9B;
}
</style>