import { setActivePinia, createPinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useModalStore } from "../src/stores";

describe('useModalStore の壊れデータ通知', () => {
    beforeEach(() => setActivePinia(createPinia()));

    it('退避キー付きでエラーモーダルを開く', () => {
        const store = useModalStore();
        store.SHOW_CORRUPTED_NOTICE('cost-manager:corrupted:123');

        expect(store.is_error_visible).toBe(true);
        expect(store.corrupted_backup_key).toBe('cost-manager:corrupted:123');
        expect(store.error_message).not.toBe('');
    });

    it('HIDE_MODALS で退避キーもクリアする', () => {
        const store = useModalStore();
        store.SHOW_CORRUPTED_NOTICE('cost-manager:corrupted:123');
        store.HIDE_MODALS();

        expect(store.is_error_visible).toBe(false);
        expect(store.corrupted_backup_key).toBeNull();
    });
});
