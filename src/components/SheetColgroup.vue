<template>
	<!--
		表と合計行の列定義。
		両方のテーブルが同じ colgroup を使うことで、table-layout: fixed が
		同じ幅を算出する。別々に幅を書くと配分がずれる
	-->
	<colgroup>
		<col class="col-drag" />
		<col class="col-import" />
		<col class="col-name" />
		<col class="col-url" />
		<col class="col-count" />
		<col class="col-rate" />
		<col v-for="i in RESOURCE_COLUMN_COUNT" :key="i" class="col-resource" />
		<col class="col-action" />
	</colgroup>
</template>

<script setup lang="ts">
/** 燃料・弾薬・鋼材・ボーキ・バケツ・ダメコン・洋上補給 */
const RESOURCE_COLUMN_COUNT = 7;
</script>

<style>
/*
	scoped にしない。col への属性セレクタが効かない環境があるため、
	クラス名で全体に定義する
*/
.col-drag {
	width: 40px;
}

.col-import {
	width: 65px;
}

.col-name {
	width: 100px;
}

.col-url {
	width: 40px;
}

.col-count {
	width: 40px;
}

.col-rate {
	width: 50px;
}

.col-resource {
	width: 65px;
}

.col-action {
	width: 37px;
}
</style>
