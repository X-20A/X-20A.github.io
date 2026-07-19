import { defineStore } from "pinia";
import { parse } from "valibot";
import { NodeId, RowData, create_empty_rows, create_sheet } from "../types";
import { SheetSchema } from "../logics/schema";
import { load_sheet, save_sheet } from "../logics/storage";
import { stash_corrupted_data } from "../logics/migration";

/** 編集のたびに書き込まないための待ち時間 */
const SAVE_DEBOUNCE_MS = 500;

const ADD_ROW_COUNT = 10;

function to_plain<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

let save_timer: ReturnType<typeof setTimeout> | null = null;

export const useSheetStore = defineStore('sheet', {
    state: () => ({
        sheet_id: null as NodeId | null,
        row_datas: [] as RowData[],
        selected_row_indexes: [] as number[],
        display_mode: 'sum' as 'sum' | 'diff',
        pending_url: '' as string,
    }),
    actions: {
        /**
         * シート本体を読み込んで差し替える。
         * 読み込めなかった場合は空のシートとして扱い、編集を継続できるようにする
         */
        async LOAD(sheet_id: NodeId): Promise<void> {
            // 切り替え前に未保存の変更を書き出す
            await this.FLUSH();

            const raw = await load_sheet(sheet_id);

            if (raw === null) {
                this.APPLY(sheet_id, create_empty_rows());
                return;
            }

            try {
                const sheet = parse(SheetSchema, raw);
                this.APPLY(sheet_id, sheet.row_datas);
            } catch (error) {
                console.error('シートの読み込みに失敗しました:', error);
                stash_corrupted_data(JSON.stringify(raw));
                this.APPLY(sheet_id, create_empty_rows());
            }
        },

        APPLY(sheet_id: NodeId, row_datas: RowData[]): void {
            this.sheet_id = sheet_id;
            this.row_datas = row_datas;
            // 選択は行の位置に紐づくため、シートをまたいで持ち越さない
            this.selected_row_indexes = [];
            this.display_mode = 'sum';
        },

        UPDATE_ROW_DATAS(row_datas: RowData[]): void {
            this.row_datas = row_datas;
            this.SCHEDULE_SAVE();
        },

        UPDATE_ROW_DATA(new_data: RowData, row_index: number): void {
            const updated = [...this.row_datas];
            updated[row_index] = { ...updated[row_index], ...new_data };

            this.UPDATE_ROW_DATAS(updated);
        },

        ADD_ROWS(): void {
            this.UPDATE_ROW_DATAS(
                this.row_datas.concat(create_empty_rows(ADD_ROW_COUNT)),
            );
        },

        /** 現在のシートを空にする */
        RESET_ROWS(): void {
            this.UPDATE_ROW_DATAS(create_empty_rows());
            this.selected_row_indexes = [];
            this.display_mode = 'sum';
        },

        UPDATE_SELECTED_ROW_INDEXES(indexes: number[]): void {
            this.selected_row_indexes = indexes;
        },

        UPDATE_DISPLAY_MODE(mode: 'sum' | 'diff'): void {
            this.display_mode = mode;
        },

        UPDATE_PENDING_URL(url: string): void {
            this.pending_url = url;
        },

        SCHEDULE_SAVE(): void {
            if (save_timer !== null) clearTimeout(save_timer);

            save_timer = setTimeout(() => {
                save_timer = null;
                void this.SAVE();
            }, SAVE_DEBOUNCE_MS);
        },

        /** 保留中の保存があれば即座に書き出す */
        async FLUSH(): Promise<void> {
            if (save_timer === null) return;

            clearTimeout(save_timer);
            save_timer = null;
            await this.SAVE();
        },

        async SAVE(): Promise<void> {
            if (!this.sheet_id) return;

            await save_sheet(to_plain(create_sheet(this.sheet_id, this.row_datas)));
        },
    },
});
