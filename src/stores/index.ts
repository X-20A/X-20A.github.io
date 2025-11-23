import { defineStore } from "pinia";
import { RowData, INITIAL_SAVE_DATA, SaveData } from "../types";
import { parse, ValiError } from "valibot";
import { SaveDataSchema } from "../logics/sheme";

const LOCAL_STORAGE_KEY = 'cost-manager';

export const useStore = defineStore('datas', {
    state: () => ({
        current_data: INITIAL_SAVE_DATA as SaveData,
        data_history: [] as SaveData[],
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
        REDO_DATA(history_index: number): void {
            const next_data = this.data_history[history_index + 1];
            if (!next_data) return;

            this.UPDATE_CURRENT_DATA(next_data);
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
                const parsedData = JSON.parse(data);
                // バリデーション実行
                const validatedData = parse(SaveDataSchema, parsedData);
                this.UPDATE_CURRENT_DATA(validatedData);
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
    },
});