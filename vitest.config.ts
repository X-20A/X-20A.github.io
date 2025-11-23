// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    test: {
        environment: 'node', // Vue コンポーネントのテストに必要
        globals: true, // describe, it, expect などをグローバルに使用可能にする
        coverage: {
            provider: 'istanbul', // カバレッジレポートの生成
            reporter: ['text', 'json', 'html'], // レポート形式
        },
    },
});