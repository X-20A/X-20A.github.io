import { defineStore } from "pinia";
import { RowData, INITIAL_SAVE_DATA, SaveData } from "../types";

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
            const updatedDatas = [...this.current_data.datas];
            updatedDatas[row_index] = {
                ...updatedDatas[row_index],
                ...new_data,
            };

            this.UPDATE_CURRENT_DATA({
                ...this.current_data,
                datas: updatedDatas,
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
                const save_data = JSON.parse(data) as SaveData;
                // TODO: parse
                this.UPDATE_CURRENT_DATA(save_data);
            } catch (e) {
                console.error(e);
            }
        }
    },
});