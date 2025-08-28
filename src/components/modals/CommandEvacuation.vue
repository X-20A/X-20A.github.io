<template>
  <div
    class="evacuation-modal"
    v-if="isCommandEvacuationVisible"
    @pointerdown.stop
  >
    <div class="fleet-title">司令退避する艦を選択</div>
    <div class="evacuation-list">
      <div
        v-for="(fleet, fleet_index) in display_fleets"
        :key="fleet_index"
        class="fleet-block"
      >
        <div class="ship-list">
          <div
            v-for="(ship, ship_index) in fleet.ships"
            :key="ship.unit_index"
            class="ship-item"
            :class="{
              evacuated: isEvacuated(fleet_index, ship.unit_index),
              flagship: ship_index === 0
            }"
            :style="ship_index === 0 ? 'cursor: default;' : ''"
            @pointerdown="ship_index !== 0 && toggleEvacuation(fleet_index, ship.unit_index)"
          >
            <img
              class="ship-icon"
              :src="getShipIconUrl(ship.id)"
              :alt="ship.name"
              :title="ship.name"
            />
          </div>
        </div>
      </div>
    </div>
    <button class="design-button clear-btn" @click="clearEvacuation">
      一括解除
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore, useModalStore } from '@/stores';
import {
  type CommandEvacuation,
  add_command_evacuation,
  remove_command_evacuation
} from '@/core/CommandEvacuation';
import { brandNode } from '@/types/brand';
import { UnitIndex } from '@/models/fleet/FleetUnit';
import { ShipId } from '@/types/shipId';
import { ShipName } from '@/types/shipName';

const store = useStore();
const cxtTapedNode = computed(() => store.cxtTapedNode);
const adoptFleet = computed(() => store.adoptFleet);
const commandEvacuations = computed(() => store.commandEvacuations);

const modalStore = useModalStore();
const isCommandEvacuationVisible = computed(() => modalStore.isCommandEvacuationVisible);

/**
 * 艦船表示用オブジェクト
 */
type DisplayFleet = {
	ships: Array<{
		id: ShipId;
		unit_index: UnitIndex;
		name: ShipName;
	}>;
};

const display_fleets = computed<DisplayFleet[]>(() => {
	if (!adoptFleet.value) return [];

	return adoptFleet.value.fleets.map(fleet => ({
		ships: fleet.units.map(unit => {
			const { ship } = unit;
			return {
				id: ship.id,
				unit_index: unit.unit_index,
				name: ship.name,
			};
		}),
	}));
});

const current_evacuation = computed<CommandEvacuation | undefined>(() => {
  return commandEvacuations.value.find(
    evacuation => evacuation.node === cxtTapedNode.value
  );
});

/**
 * 指定艦が退避状態か判定する。
 * @param fleet_index 艦隊インデックス
 * @param unit_index 艦インデックス
 * @returns 退避状態
 */
function isEvacuated(fleet_index: number, unit_index: UnitIndex): boolean {
	if (!current_evacuation.value) return false;
  return (
    (current_evacuation.value.evacuation_ship_unique_ids[fleet_index]?.includes(unit_index)) ??
    false
  );
}

/**
 * 艦アイコンURLを返す
 * @param ship_id 艦ID
 * @returns アイコンURL
 */
function getShipIconUrl(ship_id: ShipId): string {
	// バナーが存在するかはテストで確認する
	return `./banners/${ship_id}.png`;
}

/**
 * 艦の退避状態をトグルする。
 * 旗艦は退避不可。全艦解除時は該当ノードの退避情報を削除。
 * @param fleet_index 艦隊インデックス
 * @param unit_index 艦インデックス
 */
function toggleEvacuation(fleet_index: number, unit_index: UnitIndex): void {
  if (!cxtTapedNode.value) return;
  if (unit_index === 1) return; // 旗艦は退避不可

  const node_key = cxtTapedNode.value;
  const evacuations = commandEvacuations.value;
  const evac_index = evacuations.findIndex(evac => evac.node === node_key);

  // 新規作成
  if (evac_index === -1) {
		const evacuation_ship_unique_id: { [fleet_index: number]: number[] } = {};
		evacuation_ship_unique_id[fleet_index] = [unit_index];
    const new_evac: CommandEvacuation = {
      node: brandNode(node_key),
      evacuation_ship_unique_ids: evacuation_ship_unique_id,
    };
    store.UPDATE_COMMAND_EVACUATIONS(add_command_evacuation(evacuations, new_evac));
    return;
  }

  // 既存をイミュータブルに更新
  const target = evacuations[evac_index];
  // 各配列もスプレッドでコピーし、参照渡しを防ぐ
	const new_evacuation_ship_unique_id: { [fleet_index: number]: number[] } = {};
  for (const key of Object.keys(target.evacuation_ship_unique_ids)) {
    new_evacuation_ship_unique_id[Number(key)] =
			[...target.evacuation_ship_unique_ids[Number(key)]];
  }
  const current_arr = new_evacuation_ship_unique_id[fleet_index] || [];
  if (current_arr.includes(unit_index)) {
    new_evacuation_ship_unique_id[fleet_index] = current_arr.filter(i => i !== unit_index);
  } else {
    new_evacuation_ship_unique_id[fleet_index] = [...current_arr, unit_index];
  }

  // 全艦解除時は該当ノードの退避情報を削除
  if (Object.values(new_evacuation_ship_unique_id).every(arr => arr.length === 0)) {
    store.UPDATE_COMMAND_EVACUATIONS(remove_command_evacuation(evacuations, node_key));
    return;
  }
  store.UPDATE_COMMAND_EVACUATIONS([
    ...evacuations.slice(0, evac_index),
    { ...target, evacuation_ship_unique_ids: new_evacuation_ship_unique_id },
    ...evacuations.slice(evac_index + 1),
  ]);
}

/**
 * 退避設定を全解除する。
 */
function clearEvacuation(): void {
  const new_evacuations = commandEvacuations.value.filter(
    evacuation => evacuation.node !== cxtTapedNode.value
  );
  store.UPDATE_COMMAND_EVACUATIONS(new_evacuations);
}

let is_first_tap = true;
window.addEventListener('contextmenu', (event) => {
	// モーダル表示時の右クリックメニューを抑止
	if (is_first_tap) {
		event.preventDefault();
		is_first_tap = false;
	}
});
</script>

<style scoped>
.evacuation-modal {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  min-width: 895px;
  color: #000000;
}
.evacuation-list {
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #e4e4e4;
  user-select: none;
}
.fleet-block {
  margin: 5px 3px;
}
.fleet-title {
  font-weight: bold;
  margin-bottom: 4px;
}
.ship-list {
  display: flex;
  gap: 5px;
}
.ship-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.ship-item.evacuated {
  background: #888;
  opacity: 0.5;
}
.ship-item.flagship {
  border: 3px solid #2ecc40;
	padding: 3px;
  box-sizing: border-box;
  cursor: default;
}
.ship-icon {
  height: 32px;
  border-radius: 4px;
  object-fit: cover;
  background: #222;
}
.clear-btn {
  margin-top: 7px;
  padding: 8px 16px;
}
</style>