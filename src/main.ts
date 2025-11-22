import { createApp } from 'vue'
import { createPinia } from 'pinia';
import 'virtual:svg-icons-register'; // svg埋め込みに必要
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.mount('#app');