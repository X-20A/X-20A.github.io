import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path';

export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		createHtmlPlugin({}),
        createSvgIconsPlugin({
            // SVGファイルを格納するディレクトリ
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svgs')],
            symbolId: 'icon-[name]', // アイコンのIDを `icon-xxx` の形式にする
            customDomId: '__svg__icons__dom__',
        }),
        visualizer({
            filename: './dist/stats.html', // 出力ファイルのパス
            template: 'flamegraph', // これ以外だとtreemapくらいかな listでjson出力
            // open: true, // ビルド後に自動でブラウザで開く
        }), 
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
    build: {
        minify: 'terser', // Terserを使用して圧縮
        terserOptions: {
            mangle: true, // 変数名などの圧縮
        },
        rollupOptions: {
            output: {
                // 更新頻度の異なるモジュールをチャンク分離し、再訪時に変更分だけ再DLさせる
                manualChunks(id: string) {
                    const normalized = id.split(path.sep).join('/');
                    if (normalized.includes('/node_modules/')) {
                        if (/\/node_modules\/cytoscape\//.test(normalized)) {
                            return 'cytoscape';
                        }
                        // gkcoi等の動的import専用パッケージは既定の分割に任せる
                        if (/\/node_modules\/(vue|@vue|pinia|big\.js|lz-string|valibot|axios)\//.test(normalized)) {
                            return 'vendor';
                        }
                        return undefined;
                    }
                    // branch.ts は動的import、quest配下は非同期のQuest.vue専用なので
                    // 静的ロードされるdataチャンクには含めない
                    if (
                        normalized.includes('/src/data/') &&
                        !normalized.includes('/src/data/branch.ts') &&
                        !normalized.includes('/src/data/quest/')
                    ) {
                        return 'data';
                    }
                    return undefined;
                },
            },
        },
    },
})
