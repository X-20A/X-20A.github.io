// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'jsdom', // Vue コンポーネントのテストに必要
        globals: true, // describe, it, expect などをグローバルに使用可能にする
        coverage: {
            provider: 'istanbul', // カバレッジレポートの生成
            reporter: ['text', 'json', 'html'], // レポート形式
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
});