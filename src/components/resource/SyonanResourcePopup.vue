<template>
	<div v-if="data">
		<p><img :src="data.icon_suite.fuel" class="item-icon"></p>
		<p>base: {{ data.BASE_FUEL }}</p>
		<p>max: {{ data.MAX_FUEL }}</p>
		<p>
			add: <span class="add-font">{{ data.add_fuel }}</span>
			&nbsp;= <img :src="data.icon_suite.drum" class="item-icon drum-icon">
			{{ data.fleet_total_drum }} * {{ data.FUEL_EQUIP_COEFFICIENT.drum }}
			&nbsp;+
			<span class="tooltip-container">
				<img :src="data.icon_suite.craft" class="item-icon craft-icon">
				<span class="tooltip-text" v-html="data.formatted_craft_names"></span>
			</span>
			{{ data.fleet_total_craft }} * {{ data.FUEL_EQUIP_COEFFICIENT.craft }}
		</p>
		<p> + 航空戦艦 {{ data.composition.BBV }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.BBV }}</p>
		<p> + 軽空母 {{ data.composition.CVL }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.CVL }} </p>
		<p> + 水上機母艦 {{ data.composition.AV }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.AV }}</p>
		<p> + 潜水母艦 {{ data.composition.AS }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.AS }}</p>
		<p> + 揚陸艦 {{ data.composition.LHA }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.LHA }}</p>
		<p> + 補給艦 {{ data.composition.AO }} * {{ data.FUEL_COMPOSITION_COEFFICIENT.AO }}</p>
		<p><img :src="data.icon_suite.imo" class="item-icon"></p>
		<p>base: {{ data.BASE_IMO }}</p>
		<p>max: {{ data.MAX_IMO }}</p>
		<p>
			add: <span class="add-font">{{ data.add_imo }}</span>
			&nbsp;= <img :src="data.icon_suite.drum" class="item-icon drum-icon">
			{{ data.fleet_total_drum }} * {{ data.IMO_EQUIP_COEFFICIENT.drum }}
			&nbsp;+
			<span class="tooltip-container">
				<img :src="data.icon_suite.craft" class="item-icon craft-icon">
				<span class="tooltip-text" v-html="data.formatted_craft_names"></span>
			</span>
			{{ data.fleet_total_craft }} * {{ data.IMO_EQUIP_COEFFICIENT.craft }}
		</p>
		<p> + 航空戦艦 {{ data.composition.BBV }} * {{ data.IMO_COMPOSITION_COEFFICIENT.BBV }}</p>
		<p> + 軽空母 {{ data.composition.CVL }} * {{ data.IMO_COMPOSITION_COEFFICIENT.CVL }}</p>
		<p> + 水上機母艦 {{ data.composition.AV }} * {{ data.IMO_COMPOSITION_COEFFICIENT.AV }}</p>
		<p> + 潜水母艦 {{ data.composition.AS }} * {{ data.IMO_COMPOSITION_COEFFICIENT.AS }}</p>
		<p> + 揚陸艦 {{ data.composition.LHA }} * {{ data.IMO_COMPOSITION_COEFFICIENT.LHA }}</p>
		<p> + 補給艦 {{ data.composition.AO }} * {{ data.IMO_COMPOSITION_COEFFICIENT.AO }}</p>
	</div>
</template>
<script setup lang="ts">
import type { SyonanResource } from '@/models/resource/SyonanResource';

defineProps<{ data: SyonanResource | null }>();
</script>
<style scoped>
.item-icon {
	vertical-align: -6px;
	margin-right: 3px;
}
</style>
