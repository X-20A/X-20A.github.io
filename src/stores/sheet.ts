import { defineStore } from "pinia";
import { parse } from "valibot";
import { NodeId, RowData, create_empty_rows, create_sheet } from "../types";
import { SheetSchema } from "../logics/schema";
import { load_sheet, save_sheet } from "../logics/storage";
import { stash_corrupted_data } from "../logics/migration";
import {
    calc_selection, can_show_diff, clamp_selection, EMPTY_SELECTION,
    sorted_selection, type ClickModifiers, type SelectionState,
} from "../logics/selection";
import {
    calc_pasted_indexes, clear_rows, copy_rows, paste_insert, paste_overwrite,
} from "../logics/rows";

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
        /** 上限なし。diff の対象指定とは切り離している */
        selection: [] as number[],
        /** Shift による範囲選択の起点 */
        anchor_index: null as number | null,
        display_mode: 'sum' as 'sum' | 'diff',
        pending_url: '' as string,
    }),
    getters: {
        selection_state(): SelectionState {
            return { selection: this.selection, anchor_index: this.anchor_index };
        },
        can_show_diff(): boolean {
            return can_show_diff(this.selection_state);
        },
    },
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
            this.selection = [];
            this.anchor_index = null;
            this.display_mode = 'sum';
        },

        UPDATE_ROW_DATAS(row_datas: RowData[]): void {
            this.row_datas = row_datas;
            // 行が減った場合に、消えた行を選択したままにしない
            this.APPLY_SELECTION(
                clamp_selection(this.selection_state, row_datas.length),
            );
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
            this.CLEAR_SELECTION();
            this.display_mode = 'sum';
        },

        APPLY_SELECTION(next: SelectionState): void {
            this.selection = next.selection;
            this.anchor_index = next.anchor_index;

            // 2行選択でなくなったら diff は成立しない
            if (this.display_mode === 'diff' && !can_show_diff(next)) {
                this.display_mode = 'sum';
            }
        },

        /** 行がクリックされたときの選択更新 */
        SELECT_ROW(index: number, modifiers: ClickModifiers): void {
            this.APPLY_SELECTION(
                calc_selection(this.selection_state, index, modifiers),
            );
        },

        /** 選択行を並び順で複製して返す。クリップボードへの格納は呼び出し側 */
        COPY_SELECTED_ROWS(): RowData[] {
            return copy_rows(this.row_datas, this.selection);
        },

        /** 選択行を空にする。行自体は詰めない */
        CLEAR_SELECTED_ROWS(): void {
            this.UPDATE_ROW_DATAS(clear_rows(this.row_datas, this.selection));
        },

        /**
         * 選択行の先頭を起点に上書きする
         * @returns 貼り付けた行数。貼り付け先がない場合は 0
         */
        PASTE_OVERWRITE(clipboard: RowData[]): number {
            const start = sorted_selection(this.selection_state)[0];
            if (start === undefined || clipboard.length === 0) return 0;

            this.UPDATE_ROW_DATAS(
                paste_overwrite(this.row_datas, clipboard, start),
            );
            this.UPDATE_SELECTED_ROW_INDEXES(
                calc_pasted_indexes(start, clipboard.length),
            );
            return clipboard.length;
        },

        /**
         * 選択行の末尾の直後に挿入する
         * @returns 貼り付けた行数。貼り付け先がない場合は 0
         */
        PASTE_INSERT(clipboard: RowData[]): number {
            const sorted = sorted_selection(this.selection_state);
            const after = sorted[sorted.length - 1];
            if (after === undefined || clipboard.length === 0) return 0;

            this.UPDATE_ROW_DATAS(
                paste_insert(this.row_datas, clipboard, after),
            );
            this.UPDATE_SELECTED_ROW_INDEXES(
                calc_pasted_indexes(after + 1, clipboard.length),
            );
            return clipboard.length;
        },

        UPDATE_SELECTED_ROW_INDEXES(indexes: number[]): void {
            this.APPLY_SELECTION({
                selection: indexes,
                anchor_index: this.anchor_index,
            });
        },

        CLEAR_SELECTION(): void {
            this.APPLY_SELECTION(EMPTY_SELECTION);
        },

        UPDATE_DISPLAY_MODE(mode: 'sum' | 'diff'): void {
            // diff は2行を比べる機能。それ以外の選択数では選ばせない
            if (mode === 'diff' && !this.can_show_diff) return;

            this.display_mode = mode;
        },

        TOGGLE_DISPLAY_MODE(): void {
            this.UPDATE_DISPLAY_MODE(
                this.display_mode === 'sum' ? 'diff' : 'sum',
            );
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
