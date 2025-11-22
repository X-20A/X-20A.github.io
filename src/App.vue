<template>
	<Header />
	<div class="container">
		<table class="spread-sheet">
			<thead>
				<tr>
					<th></th>
					<th>Import</th>
					<th>名前</th>
					<th>燃料</th>
					<th>弾薬</th>
					<th>鋼材</th>
					<th>ボーキ</th>
					<th>バケツ</th>
					<th>ダメコン</th>
					<th>洋上補給</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="drag-handle">: :</td>
					<td><input type="text" class="cell" /></td>
					<td><input type="text" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
					<td><input type="number" class="cell" /></td>
				</tr>
				<tr class="total">
					<td></td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
					<td>999999</td>
				</tr>
			</tbody>
		</table>
	</div>
	<Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { useStore } from './stores';
import { computed } from 'vue';

const store = useStore();
const current_data = computed(() => store.current_data);



</script>

<style scoped>
th {
	font-weight: 350;
	font-size: 15px;
}
.container {
	width: 1000px;
	margin: auto;
	margin-top: 50px;
}
.spread-sheet {
	margin: auto;
}
.cell {
	width: 65px;
}
</style>
