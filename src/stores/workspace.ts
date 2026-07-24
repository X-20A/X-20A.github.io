import { defineStore } from "pinia";
import { parse } from "valibot";
import {
    NodeId, RowData, Sheet, TreeNode, TRASH_ID, Workspace,
    create_empty_rows, create_empty_workspace, create_folder_node,
    create_node_id, create_sheet, create_sheet_node, SORTIE_SIM_DOMAIN,
} from "../types";
import {
    build_sheet_import, merge_workspace_import,
    type SheetExport, type WorkspaceExport,
} from "../logics/exchange";
import { Domain, extract_url_domain } from "../logics/url";
import { SheetSchema, WorkspaceSchema } from "../logics/schema";
import {
    build_tree, calc_drop_index, empty_trash, insert_node, insert_node_after,
    is_in_trash, list_active_sheets, move_node, remember_parent, rename_node,
    restore_node, set_folder_expanded,
    type DropPosition, type NodeMap, type TreeItem,
} from "../logics/tree";
import { useModalStore, useToastStore } from ".";
import {
    delete_sheet, load_sheet, load_workspace, save_sheet, save_workspace,
} from "../logics/storage";
import { run_legacy_migration, stash_corrupted_data } from "../logics/migration";

const NEW_SHEET_NAME = '新しいシート';
const NEW_FOLDER_NAME = '新しいフォルダ';

/**
 * Vue のリアクティブプロキシは構造化複製に失敗することがあるため、
 * IndexedDB へ渡す前に素のオブジェクトへ戻す
 */
function to_plain<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
}

/** 直前の移動。ツリー操作は Undo の対象外のため、1手だけ戻せるようにしている */
type LastMove = {
    node_id: NodeId,
    parent_id: NodeId | null,
    order: number,
}

export const useWorkspaceStore = defineStore('workspace', {
    state: () => ({
        nodes: {} as NodeMap,
        approved_domains: [SORTIE_SIM_DOMAIN] as Domain[],
        active_sheet_id: null as NodeId | null,
        /** シート間で行を運ぶためのアプリ内クリップボード */
        row_clipboard: [] as RowData[],
        last_move: null as LastMove | null,
        /** ドラッグ中のノード。ドロップ先の判定に使う */
        dragging_node_id: null as NodeId | null,
        is_sidebar_open: false,
        is_loaded: false,
    }),
    getters: {
        /** ルート配下の描画用ツリー(ゴミ箱を含まない) */
        tree(): TreeItem[] {
            return build_tree(this.nodes);
        },
        trash_items(): TreeItem[] {
            return build_tree(this.nodes, TRASH_ID);
        },
        active_sheet_node(): TreeNode | null {
            if (!this.active_sheet_id) return null;
            return this.nodes[this.active_sheet_id] ?? null;
        },
        active_sheet_name(): string {
            return this.active_sheet_node?.name ?? '';
        },
        active_sheets(): TreeNode[] {
            return list_active_sheets(this.nodes);
        },
    },
    actions: {
        /**
         * 起動時に一度だけ呼ぶ。
         * 旧データの移行 → ワークスペース読み込み → シートが無ければ作成
         */
        async INITIALIZE(): Promise<void> {
            if (this.is_loaded) return;

            const outcome = await run_legacy_migration();
            // 旧データの移行に失敗した場合も、退避を知らせて取り出せるようにする
            if (outcome.status === 'corrupted') {
                useModalStore().SHOW_CORRUPTED_NOTICE(outcome.backup_key);
            }

            const raw = await load_workspace();
            if (raw !== null) {
                try {
                    // 形は valibot が検証済み。ブランドは名目的な差でしかないため
                    // ここでのみキャストする
                    this.APPLY_WORKSPACE(parse(WorkspaceSchema, raw) as Workspace);
                } catch (error) {
                    console.error('ワークスペースの読み込みに失敗しました:', error);
                    // 壊れたデータは削除せず退避し、ユーザーへ通知する
                    const backup_key = stash_corrupted_data(JSON.stringify(raw));
                    useModalStore().SHOW_CORRUPTED_NOTICE(backup_key);
                    this.APPLY_WORKSPACE(create_empty_workspace());
                }
            } else {
                this.APPLY_WORKSPACE(create_empty_workspace());
            }

            // シートが1枚もない状態を作らない。UI の場合分けを減らすため
            if (this.active_sheets.length === 0) {
                await this.CREATE_SHEET();
            } else if (
                !this.active_sheet_id
                || !this.nodes[this.active_sheet_id]
                || is_in_trash(this.nodes, this.active_sheet_id)
            ) {
                this.active_sheet_id = this.active_sheets[0].id;
            }

            this.is_loaded = true;
            await this.SAVE();
        },

        APPLY_WORKSPACE(workspace: Workspace): void {
            this.nodes = workspace.nodes;
            this.approved_domains = workspace.approved_domains;
            this.active_sheet_id = workspace.active_sheet_id;
        },

        async SAVE(): Promise<void> {
            await save_workspace(to_plain({
                ...create_empty_workspace(),
                nodes: this.nodes,
                approved_domains: this.approved_domains,
                active_sheet_id: this.active_sheet_id,
            }));
        },

        /**
         * 新しいシートを作成し、本体を保存してアクティブにする
         * @returns 作成したシートの ID
         */
        async CREATE_SHEET(parent_id: NodeId | null = null): Promise<NodeId> {
            const id = create_node_id();

            this.nodes = insert_node(
                this.nodes,
                create_sheet_node(id, NEW_SHEET_NAME, parent_id),
            );
            // ツリーに現れた時点で本体が引ける状態にしておく
            await save_sheet(to_plain(create_sheet(id)));

            this.active_sheet_id = id;
            await this.SAVE();
            return id;
        },

        /**
         * 共有URLのデータを新しいシートとして取り込む。
         * 既存のシートは上書きしない
         * @returns 取り込んだシートの ID
         */
        async IMPORT_SHARED_SHEET(shared: {
            project_name: string,
            row_datas: RowData[],
            approved_domains: Domain[],
        }): Promise<NodeId> {
            const id = create_node_id();
            const name = shared.project_name.trim() || NEW_SHEET_NAME;

            this.nodes = insert_node(this.nodes, create_sheet_node(id, name));
            await save_sheet(to_plain(create_sheet(id, shared.row_datas)));

            // 共有元で承認されていたドメインを取り込む
            for (const domain of shared.approved_domains) {
                if (!this.approved_domains.includes(domain)) {
                    this.approved_domains = this.approved_domains.concat(domain);
                }
            }

            this.active_sheet_id = id;
            await this.SAVE();
            return id;
        },

        /**
         * シートを複製する。行データを引き継ぎ、元シートの直後(同じ親)へ置いて
         * アクティブにする。承認ドメインはワークスペース共有のため対象外。
         *
         * アクティブシートを複製する場合、未保存の編集を取りこぼさないよう
         * 呼び出し側で先に sheet_store.FLUSH() を済ませておくこと
         * @returns 複製したシートの ID。対象がシートでなければ null
         */
        async DUPLICATE_SHEET(node_id: NodeId): Promise<NodeId | null> {
            const source = this.nodes[node_id];
            if (!source || source.type !== 'sheet') return null;

            // 元シートの本体を読む。壊れていても複製自体は空で成立させる
            let row_datas: RowData[] = create_empty_rows();
            const raw = await load_sheet(node_id);
            if (raw !== null) {
                try {
                    row_datas = (parse(SheetSchema, raw) as unknown as Sheet).row_datas;
                } catch (error) {
                    console.error('複製元シートを読み込めませんでした:', error);
                }
            }

            const new_id = create_node_id();
            this.nodes = insert_node_after(
                this.nodes,
                create_sheet_node(new_id, `${source.name}のコピー`, source.parent_id),
                node_id,
            );
            // to_plain の JSON 往復で行データは複製されるため、元と参照を共有しない
            await save_sheet(to_plain(create_sheet(new_id, row_datas)));

            this.active_sheet_id = new_id;
            await this.SAVE();
            return new_id;
        },

        async CREATE_FOLDER(parent_id: NodeId | null = null): Promise<NodeId> {
            const id = create_node_id();

            this.nodes = insert_node(
                this.nodes,
                create_folder_node(id, NEW_FOLDER_NAME, parent_id),
            );
            await this.SAVE();
            return id;
        },

        async RENAME(node_id: NodeId, name: string): Promise<void> {
            this.nodes = rename_node(this.nodes, node_id, name);
            await this.SAVE();
        },

        async SET_EXPANDED(node_id: NodeId, is_expanded: boolean): Promise<void> {
            this.nodes = set_folder_expanded(this.nodes, node_id, is_expanded);
            await this.SAVE();
        },

        /**
         * ノードを移動する。直前の位置を1手だけ保持し、UNDO_MOVE で戻せる
         */
        async MOVE(
            node_id: NodeId,
            target_parent_id: NodeId | null,
            target_index?: number,
        ): Promise<void> {
            const node = this.nodes[node_id];
            if (!node) return;

            const before: LastMove = {
                node_id,
                parent_id: node.parent_id,
                order: node.order,
            };

            const moved = move_node(this.nodes, node_id, target_parent_id, target_index);
            // 移動が拒否された場合は履歴を残さない
            if (moved === this.nodes) return;

            this.nodes = moved;
            this.last_move = before;
            await this.SAVE();
        },

        async UNDO_MOVE(): Promise<void> {
            if (!this.last_move) return;

            const { node_id, parent_id, order } = this.last_move;
            this.last_move = null;

            this.nodes = move_node(this.nodes, node_id, parent_id, order);
            await this.SAVE();
        },

        /**
         * ゴミ箱へ移す。ツリー操作は Undo の対象外のため物理削除はしない
         */
        async TRASH(node_id: NodeId): Promise<void> {
            // 復元先として、捨てる直前の親を控えておく
            this.nodes = remember_parent(this.nodes, node_id);
            await this.MOVE(node_id, TRASH_ID);

            // アクティブなシートを捨てた場合は残っているシートへ移る
            if (
                this.active_sheet_id
                && is_in_trash(this.nodes, this.active_sheet_id)
            ) {
                this.active_sheet_id = this.active_sheets[0]?.id ?? null;

                if (!this.active_sheet_id) await this.CREATE_SHEET();
            }
            await this.SAVE();
        },

        /**
         * ゴミ箱から戻す。元の親が使えない場合はルート直下へ置く
         */
        async RESTORE(node_id: NodeId): Promise<void> {
            this.nodes = restore_node(this.nodes, node_id);
            this.last_move = null;

            await this.SAVE();
        },

        /**
         * ゴミ箱を空にする。ここで初めてシート本体を物理削除する
         */
        async EMPTY_TRASH(): Promise<void> {
            const { nodes, removed_sheet_ids } = empty_trash(this.nodes);

            this.nodes = nodes;
            this.last_move = null;

            for (const id of removed_sheet_ids) await delete_sheet(id);
            await this.SAVE();
        },

        async ACTIVATE_SHEET(node_id: NodeId): Promise<void> {
            if (this.nodes[node_id]?.type !== 'sheet') return;

            this.active_sheet_id = node_id;
            await this.SAVE();
        },

        async ADD_APPROVED_DOMAIN(url_string: string): Promise<void> {
            const new_domain = extract_url_domain(url_string);
            if (this.approved_domains.includes(new_domain)) return;

            this.approved_domains = this.approved_domains.concat(new_domain);
            await this.SAVE();
        },

        START_DRAG(node_id: NodeId): void {
            this.dragging_node_id = node_id;
        },

        END_DRAG(): void {
            this.dragging_node_id = null;
        },

        /**
         * ドラッグ中のノードを対象の前後へ落とす
         */
        async DROP_BESIDE(
            target_id: NodeId,
            position: DropPosition,
        ): Promise<void> {
            const dragged_id = this.dragging_node_id;
            this.dragging_node_id = null;
            if (!dragged_id || dragged_id === target_id) return;

            const target = this.nodes[target_id];
            if (!target) return;

            const index = calc_drop_index(this.nodes, dragged_id, target_id, position);
            await this.MOVE_WITH_UNDO(dragged_id, target.parent_id, index);
        },

        /**
         * ドラッグ中のノードをフォルダの中(または末尾)へ落とす
         */
        async DROP_INTO(parent_id: NodeId | null): Promise<void> {
            const dragged_id = this.dragging_node_id;
            this.dragging_node_id = null;
            if (!dragged_id || dragged_id === parent_id) return;

            await this.MOVE_WITH_UNDO(dragged_id, parent_id);
        },

        /**
         * 移動し、取り消せることをトーストで知らせる。
         * ツリー操作は Undo の対象外のため、ここが唯一の復帰手段になる
         */
        async MOVE_WITH_UNDO(
            node_id: NodeId,
            target_parent_id: NodeId | null,
            target_index?: number,
        ): Promise<void> {
            const name = this.nodes[node_id]?.name ?? '';
            const before = this.nodes;

            await this.MOVE(node_id, target_parent_id, target_index);
            // 移動が拒否された(自身の子孫への移動など)場合は通知しない
            if (this.nodes === before) return;

            useToastStore().SHOW_TOAST_WITH_ACTION(
                `「${name}」を移動しました`,
                '元に戻す',
                () => { void this.UNDO_MOVE(); },
                6000,
            );
        },

        /** 全シートの本体を IndexedDB から集める */
        async COLLECT_ALL_SHEETS(): Promise<Sheet[]> {
            const sheets: Sheet[] = [];

            for (const node of Object.values(this.nodes)) {
                if (node.type !== 'sheet') continue;

                const raw = await load_sheet(node.id);
                if (raw === null) continue;

                try {
                    sheets.push(parse(SheetSchema, raw) as unknown as Sheet);
                } catch (error) {
                    // 壊れた1枚のせいで書き出し全体を失敗させない
                    console.error(`シート ${node.id} を読み込めませんでした:`, error);
                }
            }
            return sheets;
        },

        /**
         * 取り込んだワークスペースを、インポート用フォルダの下へ追加する。
         * 既存のシートは一切壊さない
         */
        async IMPORT_WORKSPACE(imported: WorkspaceExport): Promise<number> {
            const { nodes, sheets } = merge_workspace_import(this.nodes, imported);

            for (const sheet of sheets) await save_sheet(to_plain(sheet));
            this.nodes = nodes;

            // 承認済みドメインは取り込み元のものをマージする
            for (const domain of imported.workspace.approved_domains) {
                if (!this.approved_domains.includes(domain)) {
                    this.approved_domains = this.approved_domains.concat(domain);
                }
            }

            await this.SAVE();
            return sheets.length;
        },

        /** 取り込んだシートをルート直下に追加してアクティブにする */
        async IMPORT_SHEET(imported: SheetExport): Promise<NodeId> {
            const { nodes, sheet, sheet_id } =
                build_sheet_import(this.nodes, imported);

            await save_sheet(to_plain(sheet));
            this.nodes = nodes;
            this.active_sheet_id = sheet_id;

            await this.SAVE();
            return sheet_id;
        },

        SET_ROW_CLIPBOARD(rows: RowData[]): void {
            this.row_clipboard = to_plain(rows);
        },

        TOGGLE_SIDEBAR(): void {
            this.is_sidebar_open = !this.is_sidebar_open;
        },
    },
});
