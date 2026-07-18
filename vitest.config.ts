// vitest.config.ts
import { defineConfig, configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'jsdom', // Vue コンポーネントのテストに必要
        globals: true, // describe, it, expect などをグローバルに使用可能にする
        // vue-tsc -b が build/ にemitするコンパイル済みテストを収集しないようにする
        exclude: [...configDefaults.exclude, 'build/**'],
        coverage: {
            provider: 'istanbul', // カバレッジレポートの生成
            reporter: ['text', 'json', 'html'], // レポート形式
        },
    },
});