import { defineStore } from "pinia";
import CustomError from "../errors/CustomError";

export const useModalStore = defineStore('modal', {
    state: () => ({
        /** ドメイン確認モーダルの表示状態 */
        is_domain_permission_visible: false,
        /** エラーモーダルの表示状態 */
        is_error_visible: false,
        /** 操作説明モーダルの表示状態 */
        is_help_visible: false,
        /** 表示するエラーメッセージ */
        error_message: '',
        /**
         * 退避した壊れデータの localStorage キー。
         * null 以外なら、エラーモーダルに退避データの保存ボタンを出す
         */
        corrupted_backup_key: null as string | null,
    }),
    actions: {
        /**
         * ドメイン確認モーダル表示
         */
        SHOW_DOMAIN_PERMISSION(): void {
            this.is_domain_permission_visible = true;
        },
        /**
         * 操作説明モーダル表示
         */
        SHOW_HELP(): void {
            this.is_help_visible = true;
        },
        /**
         * エラーモーダル    
         * ユーザーに伝えたいエラーはCustomErrorでthrow
         */
        SHOW_ERROR(error: unknown): void {
            if (error instanceof CustomError) {
                this.error_message = error.message;
            } else {
                this.error_message = '予期しないエラーが発生しました';
            }
            this.is_error_visible = true;
        },
        /**
         * 壊れ / 移行失敗データを検出したことをユーザーに知らせる。
         * データは削除せず退避済みで、backup_key から取り出せる
         */
        SHOW_CORRUPTED_NOTICE(backup_key: string): void {
            this.error_message =
                'データの一部を読み込めませんでした。'
                + '壊れたデータは削除せず退避しています。'
                + '下のボタンで退避データを保存できます。';
            this.corrupted_backup_key = backup_key;
            this.is_error_visible = true;
        },
        /**
         * モーダル非表示。種類に関わらず、全てこれを呼ぶ
         */
        HIDE_MODALS(): void {
            this.is_domain_permission_visible = false;
            this.is_error_visible = false;
            this.is_help_visible = false;
            this.error_message = '';
            this.corrupted_backup_key = null;
        },
    }
});

/** 表示中のトーストを閉じるためのタイマー。ストアの状態には含めない */
let hide_timer: ReturnType<typeof setTimeout> | null = null;

export const useToastStore = defineStore('toast', {
    state: () => ({
        /** トーストの表示状態 */
        is_show_notice: false,
        /** 表示するメッセージ */
        notice_message: '',
        /** アクションボタンのラベル。null ならボタンを出さない */
        action_label: null as string | null,
        action: null as (() => void) | null,
    }),
    actions: {
        SHOW_TOAST(
            message: string,
            display_time: number = 5000,
        ): void {
            this.SHOW_TOAST_WITH_ACTION(message, null, null, display_time);
        },
        /**
         * 取り消しなどの操作を伴うトースト。
         * ツリー操作は Undo の対象外のため、直前の移動はここから戻す
         */
        SHOW_TOAST_WITH_ACTION(
            message: string,
            action_label: string | null,
            action: (() => void) | null,
            display_time: number = 5000,
        ): void {
            // 前のトーストのタイマーが残っていると、新しいトーストが早く消える
            if (hide_timer !== null) clearTimeout(hide_timer);

            this.notice_message = message;
            this.action_label = action_label;
            this.action = action;
            this.is_show_notice = true;

            hide_timer = setTimeout(() => {
                hide_timer = null;
                this.HIDE_TOAST();
            }, display_time);
        },
        RUN_ACTION(): void {
            const action = this.action;
            this.HIDE_TOAST();
            action?.();
        },
        HIDE_TOAST(): void {
            if (hide_timer !== null) {
                clearTimeout(hide_timer);
                hide_timer = null;
            }

            this.is_show_notice = false;
            this.notice_message = '';
            this.action_label = null;
            this.action = null;
        },
    }
});