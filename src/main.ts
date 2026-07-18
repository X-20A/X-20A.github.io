import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import 'virtual:svg-icons-register'; // svg埋め込みに必要
import { registerSW } from 'virtual:pwa-register';

// cache-first配信 + 新バージョンのバックグラウンド取得。
// 更新を検知したら即適用して自動リロードする
const updateSW = registerSW({
	immediate: true,
	onNeedRefresh() {
		void updateSW(true);
	},
});

console.time('読込 → マップ表示');

const app = createApp(App);
const pinia = createPinia();

app
.use(pinia)
.mount('#app');