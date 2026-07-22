<template>
	<div v-if="adoptFleet">
		<template v-if="adoptFleet.fleet_type > 0">
			<p>{{ FLEET_TYPE_LABELS[adoptFleet.fleet_type] }}</p>
		</template>
		<template v-if="adoptFleet.fleet_type === 0 && adoptFleet.ships_length === 7">
			<p>遊撃部隊</p>
		</template>
		<p>
			<span
				:style="isSpeedOverridden ? 'color: #f6a306' : ''"
			>
				{{ SPEED_LABELS[adoptFleet.speed] }}
			</span>
			<span> | </span>
			<span>搭載艦数[ </span>

			<template v-if="is_target_world([60])">
				<span class="tooltip-container">
					<span style="color: #4800ff;cursor: default;">第五</span>
					<span>: {{ count_Daigo_ships(adoptFleet) }}&nbsp;</span>
					<span class="tooltip-text">
						那智 | 足柄 | 阿武隈 | 多摩 | 木曾 | 霞 | 不知火 | 薄雲 | 曙 | 潮 | 初霜 | 初春 | 若葉
					</span>
				</span>

				<span class="tooltip-container">
					<span style="color: #e65100;cursor: default;">礼号</span>
					<span>: {{ count_Reigo_ships(adoptFleet) }}&nbsp;</span>
					<span class="tooltip-text">
						足柄 | 大淀 | 霞 | 清霜 | 朝霜 | 榧 | 杉
					</span>
				</span>

				<span class="tooltip-container">
					<img :src="Bulge" alt="北方迷彩(＋北方装備)" style="height: 20px;vertical-align: -4px;">
					<span>: {{ adoptFleet.arBulge_carrier_count }}&nbsp;</span>
					<span class="tooltip-text">北方迷彩(＋北方装備)</span>
				</span>
			</template>

			<template v-if="is_target_world([58])">
				<span class="tooltip-container">
					<img :src="NotSpanner" alt="寒冷地装備＆甲板要員を装備していない空母系+あきつ丸" style="height: 17px;vertical-align: -3px;">
					<span>: {{ count_not_equip_arctic_carriers(adoptFleet) }}&nbsp;</span>
					<span class="tooltip-text">寒冷地装備＆甲板要員を装備していない(空母系+あきつ丸)</span>
				</span>
			</template>

			<span class="tooltip-container">
				<img :src="Drum" alt="ドラム缶" style="height: 17px;vertical-align: -3px;">
				<span>: {{ adoptFleet.drum_carrier_count }}&nbsp;</span>
				<span class="tooltip-text">ドラム缶</span>
			</span>

			<span class="tooltip-container">
				<img :src="Craft" alt="大発系" style="height: 21px;vertical-align: -4px;">
				<span>: {{ adoptFleet.craft_carrier_count }}&nbsp;</span>
				<span class="tooltip-text" v-html="routing_craft_text"></span>
			</span>

			<span class="tooltip-container">
				<img :src="Radar" alt="電探系" style="height: 19px;vertical-align: -5px;">
				<span>: {{ adoptFleet.radar_carrier_count }}</span>
				<span class="tooltip-text">電探系</span>
			</span>

			<span> ]</span>
		</p>
		<template v-if="adoptFleet.fleet_type > 0"><!-- 連合艦隊 -->
			<div>
				<strong>主力: </strong>
				<template v-for="(name, index) in calc_main_fleet_ship_names(adoptFleet)" :key="index">
					<span>{{ name }}</span>
					<span v-if="index < get_main_fleet_ships_length(adoptFleet) - 1"> | </span>
				</template>
			</div>
			<div>
				<strong>随伴: </strong>
				<template v-for="(name, index) in calc_escort_fleet_ship_names(adoptFleet)" :key="index">
					<span>{{ name }}</span>
					<span v-if="index < get_escort_fleet_ships_length(adoptFleet) - 1"> | </span>
				</template>
			</div>
		</template>
		<template v-else><!-- 通常艦隊 or 遊撃部隊 -->
			<template v-for="(name, index) in adoptFleet.ship_names" :key="index">
				<span>{{ name }}</span>
				<span v-if="index < adoptFleet.ships_length - 1"> | </span>
			</template>
		</template>
		<p :style="adoptFleet?.seek.c1 === 999 ? 'color: #f6a306' : ''">
			<span>索敵値: </span>
			<strong>1: </strong>
			<span>{{ adoptFleet.seek.c1 }}</span>
			<strong> 2: </strong>
			<span>{{ adoptFleet.seek.c2 }}</span>
			<strong> 3: </strong>
			<span>{{ adoptFleet.seek.c3 }}</span>
			<strong> 4: </strong>
			<span>{{ adoptFleet.seek.c4 }}</span>
		</p>
	</div>
	<p v-if="is_target_world([61])" style="color: red;font-size: 15px;">
		イベント海域の分岐条件は暫定的で随時更新されます
		<a href="https://x.com/momemi_kc/status/1985248128975671483" target="_blank" rel="noopener noreferrer">
			更新履歴
		</a>
	</p>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores';
import {
	type AdoptFleet,
	count_not_equip_arctic_carriers,
	get_escort_fleet_ships_length,
	calc_escort_fleet_ship_names,
	get_main_fleet_ships_length,
	calc_main_fleet_ship_names,
	count_Reigo_ships,
	count_Daigo_ships,
	is_speed_overridden,
} from '../models/fleet/AdoptFleet';
import { ROUTING_CRAFT_NAMES } from '../models/ship/EquippedShip';
import { disassembly_area_id } from '../logic/area';
import Bulge from '@/icons/items/bulge.png';
import NotSpanner from '@/icons/items/not-spanner.png';
import Drum from '@/icons/items/drum.png';
import Craft from '@/icons/items/craft.png';
import Radar from '@/icons/items/radar.png';

const store = useStore();
const { adoptFleet, selectedArea } = storeToRefs(store);

const SPEED_LABELS = {
	1: '低速艦隊',
	2: '高速艦隊',
	3: '高速+艦隊',
	4: '最速艦隊',
};

const FLEET_TYPE_LABELS = {
	0: '', // 通常艦隊 表示されることは無いので空文字
	1: '空母機動部隊',
	2: '水上打撃部隊',
	3: '輸送護衛部隊',
};

const isSpeedOverridden = computed(() =>
	adoptFleet.value
		? is_speed_overridden(adoptFleet.value as AdoptFleet)
		: false
);

const routing_craft_text = computed(() => {
	const first_part = ROUTING_CRAFT_NAMES.slice(0, 5).join(' | ');
	const second_part = ROUTING_CRAFT_NAMES.slice(5).join(' | ');
	return first_part + '<br> | ' + second_part;
});

/**
 * 海域IDのworldがtarget_worldsに含まれているか判定する関数
 * @param target_worlds 判定対象world配列
 * @returns boolean
 */
function is_target_world(
	target_worlds: number[],
): boolean {
	if (!selectedArea.value) return false;

	const { world } = disassembly_area_id(selectedArea.value);
	return world
		? target_worlds.includes(world)
		: false;
}
</script>
