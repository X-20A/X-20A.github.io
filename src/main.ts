import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'virtual:svg-icons-register'; // svg埋め込みに必要

console.time('読込 → マップ表示');

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.mount('#app');