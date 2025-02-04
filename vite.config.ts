import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
// import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import viteCompression from 'vite-plugin-compression';
import path from 'path';

export default defineConfig({
	plugins: [
		vue(),
        vuetify(), // 必ずvue()より後に書く
		vueDevTools(),
		createHtmlPlugin({}),
        createSvgIconsPlugin({
            // SVGファイルを格納するディレクトリ
            iconDirs: [path.resolve(process.cwd(), 'svgs')],
            symbolId: 'icon-[name]', // アイコンのIDを `icon-xxx` の形式にする
            customDomId: '__svg__icons__dom__',
        }),
        /* visualizer({
            filename: './dist/stats.html', // 出力ファイルのパス
            template: 'flamegraph', // これ以外だとtreemapくらいかな
            open: true, // ビルド後に自動でブラウザで開く
        }), */
        // viteCompression(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
