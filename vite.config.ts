import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import vueDevTools from 'vite-plugin-vue-devtools'
import { visualizer } from 'rollup-plugin-visualizer'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { VitePWA } from 'vite-plugin-pwa'
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
        VitePWA({
            // cache-first + バックグラウンド更新。
            // 新バージョンはSWが裏で取得し、main.ts側のonNeedRefreshが即適用して自動リロードする
            // (旧仕様が1セッション表示され続けるのを許容しないため。状態はURLパラメータ由来なのでリロードで失われない)
            registerType: 'prompt',
            // 目的はキャッシュ/オフライン化でありPWAインストールではないのでマニフェストは出さない
            manifest: false,
            workbox: {
                // precacheはハッシュ付きのコアアセットのみ。
                // public/banners等の画像(850枚超)は下のruntimeCachingで初回表示時にキャッシュする
                globPatterns: ['**/*.{js,css,html}'],
                globIgnores: ['stats.html'],
                cleanupOutdatedCaches: true,
                runtimeCaching: [
                    {
                        // バナー・questアイコン等の画像はcache-first(ファイル名変更でしか更新されない前提)
                        urlPattern: ({ request, url }) =>
                            request.destination === 'image' && url.pathname.startsWith('/compass/'),
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'compass-images',
                            expiration: {
                                maxEntries: 300,
                                maxAgeSeconds: 60 * 60 * 24 * 60, // 60日
                                purgeOnQuotaError: true,
                            },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                    {
                        // サイトルート共有のアセット(/main.css, /media/compass.svg など)は
                        // /compass/ の外にありprecacheできないため stale-while-revalidate で持つ
                        urlPattern: ({ url }) =>
                            url.origin === self.location.origin && !url.pathname.startsWith('/compass/'),
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'site-shared',
                            expiration: {
                                maxEntries: 30,
                                maxAgeSeconds: 60 * 60 * 24 * 30, // 30日
                            },
                            cacheableResponse: { statuses: [0, 200] },
                        },
                    },
                ],
            },
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
