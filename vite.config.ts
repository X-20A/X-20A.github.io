import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import viteCompression from 'vite-plugin-compression';
// import legacy from '@vitejs/plugin-legacy';
// import lightningcss from 'lightningcss';
import path from 'node:path';

export default defineConfig({
	plugins: [
		vue(),
        vuetify(), // 必ずvue()より後に書く
		vueDevTools(),
		createHtmlPlugin({}),
        createSvgIconsPlugin({
            // SVGファイルを格納するディレクトリ
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svgs')],
            symbolId: 'icon-[name]', // アイコンのIDを `icon-xxx` の形式にする
            customDomId: '__svg__icons__dom__',
        }),
        /*
        legacy({
            targets: ['defaults', 'not IE 11'],
            modernPolyfills: true,
        }), */
        
        visualizer({
            filename: './dist/stats.html', // 出力ファイルのパス
            template: 'flamegraph', // これ以外だとtreemapくらいかな listでjson出力
            open: true, // ビルド後に自動でブラウザで開く
        }), 
        // viteCompression(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
    base: '/compass/',
    optimizeDeps: {
        exclude: [
            'tests',
            'patches',
        ], // 無視させる
    },
    /* なんかサイズ大きくなっちゃった。設定がまずい？
    css: {
        transformer: 'lightningcss',
        lightningcss: {
            // Lightning CSSのオプションをここに設定
        }
    },
    build: {
        cssMinify: 'lightningcss',
    },*/
})
