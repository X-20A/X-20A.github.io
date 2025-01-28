import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
        vuetify(), // 必ずvue()より後に書く
		vueDevTools(),
		createHtmlPlugin({}),
        visualizer({
            filename: './dist/stats.html', // 出力ファイルのパス
            template: 'flamegraph', // これ以外だとtreemapくらいかな
            open: true, // ビルド後に自動でブラウザで開く
        }),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
