import { defineStore } from "pinia";
import { RowData, INITIAL_SAVE_DATA, SaveData, INITIAL_ROW_DATA } from "../types";
import { parse, ValiError } from "valibot";
import { SaveDataSchema } from "../logics/sheme";
import CustomError from "../errors/CustomError";
import { extract_url_domain } from "../logics/url";

const LOCAL_STORAGE_KEY = 'cost-manager';

export const useStore = defineStore('datas', {
    state: () => ({
        current_data: INITIAL_SAVE_DATA as SaveData,
        data_history: [] as SaveData[],
        pending_url: '' as string,
    }),
    actions: {
        UPDATE_CURRENT_DATA(new_data: SaveData): void {
            this.current_data = new_data;
            this.SAVE_DATA();
        },
        UPDATE_ROW_DATA(new_data: RowData, row_index: number): void {
            const updatedDatas = [...this.current_data.row_datas];
            updatedDatas[row_index] = {
                ...updatedDatas[row_index],
                ...new_data,
            };

            this.UPDATE_CURRENT_DATA({
                ...this.current_data,
                row_datas: updatedDatas,
            });
        },
        UNDO_DATA(history_index: number): void {
            const previous_data = this.data_history[history_index - 1];
            if (!previous_data) return;

            this.UPDATE_CURRENT_DATA(previous_data);
        },
        UPDATE_PENDING_URL(url: string): void {
            this.pending_url = url;
        },
        REDO_DATA(history_index: number): void {
            const next_data = this.data_history[history_index + 1];
            if (!next_data) return;

            this.UPDATE_CURRENT_DATA(next_data);
        },
        ADD_ROWS(): void {
            const ADD_COUNT = 10;
            const new_row_datas: RowData[] =
                this.current_data.row_datas
                    .concat(Array(ADD_COUNT)
                    .fill(null)
                    .map(() => ({ ...INITIAL_ROW_DATA })));

            this.UPDATE_CURRENT_DATA({
                ...this.current_data,
                row_datas: new_row_datas,
            });
        },
        ADD_APPROVED_DOMAIN(url_string: string): void {
            const new_domain = extract_url_domain(url_string);
            if (this.current_data.approved_domains.includes(new_domain)) return;

            const new_approved_domains =
                this.current_data.approved_domains.concat(new_domain);
            const new_save_data: SaveData = {
                ...this.current_data,
                approved_domains: new_approved_domains,
            };
            this.UPDATE_CURRENT_DATA(new_save_data);
        },
        SAVE_DATA(): void {
            localStorage.setItem(
                LOCAL_STORAGE_KEY,
                JSON.stringify(this.current_data),
            );
        },
        LOAD_DATA(): void {
            const data = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (!data) return;

            try {
                const parsed_data = JSON.parse(data);
                // バリデーション実行
                const validated_data = parse(SaveDataSchema, parsed_data);
                this.UPDATE_CURRENT_DATA(validated_data);
            } catch (error) {
                console.error('ローカルストレージデータの読み込みに失敗しました:', error);

                if (error instanceof ValiError) {
                    console.error('データ形式が不正です');
                    // オプション: 不正なデータを削除
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                } else if (error instanceof SyntaxError) {
                    console.error('JSON形式が不正です');
                    localStorage.removeItem(LOCAL_STORAGE_KEY);
                }
            }
        },
        INITIALIZE_DATA(): void {
            this.UPDATE_CURRENT_DATA({ ...INITIAL_SAVE_DATA });
        }
    },
});

export const useModalStore = defineStore('modal', {
    state: () => ({
        /** ドメイン確認モーダルの表示状態 */
        is_domain_permission_visible: false,
        /** エラーモーダルの表示状態 */
        is_error_visible: false,
        /** 表示するエラーメッセージ */
        error_message: '',
    }),
    actions: {
        /**
         * ドメイン確認モーダル表示
         */
        SHOW_DOMAIN_PERMISSION(): void {
            this.is_domain_permission_visible = true;
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
         * モーダル非表示。種類に関わらず、全てこれを呼ぶ
         */
        HIDE_MODALS(): void {
            this.is_domain_permission_visible = false;
            this.is_error_visible = false;
            this.error_message = '';
        },
    }
});