import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from "./plugins/vuetify";

// console.time('main.ts → マップ表示まで');

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.use(vuetify)
.mount('#app');