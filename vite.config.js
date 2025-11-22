import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'node:path';

export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		createSvgIconsPlugin({
			// SVGファイルを格納するディレクトリ
			iconDirs: [path.resolve(process.cwd(), 'src/icons/svgs')],
			symbolId: 'icon-[name]', // アイコンのIDを `icon-xxx` の形式にする
			customDomId: '__svg__icons__dom__',
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	base: '/cost/',
})
