<template>
	<div v-if="data">
		<template v-if="data.type === ResourceType.fuel">
			<p><img :src="data.icon_suite.fuel" class="item-icon"></p>
		</template>
		<template v-else-if="data.type === ResourceType.ammo">
			<p><img :src="data.icon_suite.ammo" class="item-icon"></p>
		</template>
		<template v-else-if="data.type === ResourceType.steel">
			<p><img :src="data.icon_suite.steel" class="item-icon"></p>
		</template>
		<template v-else-if="data.type === ResourceType.imo">
			<p><img :src="data.icon_suite.imo" class="item-icon"></p>
		</template>

		<template v-if="data.base">
			<p>base: {{ Array.isArray(data.base) ? data.base.join(' ~ ') : data.base }}</p>
			<p>
				add: <span class="add-font">{{ data.add }}</span>
				= <img class="item-icon drum-icon" :src="data.icon_suite.drum"> {{ data.fleet_total_drum }} * {{
				data.actual_drum_coefficient }}
				+
				<span class="tooltip-container">
					<img :src="data.icon_suite.craft" class="item-icon craft-icon">
					<span class="tooltip-text" v-html="data.formattedCraftNames"></span>
				</span> {{ data.fleet_total_craft }} * {{
				data.actual_craft_coefficient }}
			</p>
			<p>max: {{ data.max ? data.max : 'unknown' }}</p>
		</template>

		<template v-if="data.memo">
			<template v-if="Array.isArray(data.memo)">
				<p v-for="(line, idx) in data.memo" :key="idx">{{ line }}</p>
			</template>
			<template v-else>
				<p>{{ data.memo }}</p>
			</template>
		</template>
	</div>
</template>
<script setup lang="ts">
import { NomalResource, ResourceType } from '@/models/resource/NomalResource';

defineProps<{ data: NomalResource | null }>();
</script>
<style scoped>
.item-icon {
  vertical-align: -6px;
  margin-right: 3px;
}
</style>
