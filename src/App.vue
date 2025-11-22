<template>
	<Header />
	<div class="container">
		<textarea></textarea>
	</div>
	<Footer />
</template>

<script setup>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';


</script>

<style scoped>
.container {
	margin: auto;
	margin-top: 40px;
	padding-bottom: 8px;
	max-width: 960px;
}
</style>
