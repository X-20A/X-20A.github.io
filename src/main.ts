import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import vuetify from "./plugins/vuetify";

// console.time('読込 → マップ表示');

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.use(vuetify)
.mount('#app');