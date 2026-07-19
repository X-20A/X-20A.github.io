import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'node:path';

export default defineConfig({
    // main ブランチの /akashi 配下に配置される
    base: '/akashi/',
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // SVGファイルを格納するディレクトリ
            iconDirs: [path.resolve(process.cwd(), 'src/icons/svgs')],
            symbolId: 'icon-[name]', // アイコンのIDを `icon-xxx` の形式にする
            customDomId: '__svg__icons__dom__',
        }),
    ],
    build: {
        target: 'es2020',
        minify: 'terser',
    },
});
