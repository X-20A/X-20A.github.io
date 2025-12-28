import { defineStore } from 'pinia';

import CustomError from "../errors/CustomError";
import { switch_seek, type AdoptFleet } from '../models/fleet/AdoptFleet';
import Const from '../constants/const';
import type {
    SelectedType,
    AreaId,
    SimResult,
    SaveData,
    OptionsType,
    BranchLastUpdate,
    BranchType,
    ItemIconKey,
    NodeDatas,
    EdgeDatas
} from '../types';
import type { FleetComponent } from '../models/fleet/FleetComponent';
import { is_battle_node, is_last_stop_node, type CommandEvacuation } from '../core/CommandEvacuation';
import type { Node } from '../types/brand';
import { parseOptionsType } from '../models/shemas';
import { RefferenceTabKey } from '../components/modals/Refference.vue';

export type LoadDataCommands = {
    /** deck読込をスキップするか */
    exclude_deck: boolean;
}

const LOCAL_STORAGE_KEY = 'compass-v2.1';

export const useStore = defineStore('compass', {
	state: () => ({
        deck: null as string | null,
        /**
         * 選択された艦隊(SelectedType参照)    
         * 艦隊読込時にも自動で操作されたりする    
         * 保存する
         */
		selectedType: null as SelectedType | null,
		/**
		 * デッキビルダーで第四艦隊まで読み込んだやつ    
		 * ここからselectedTypeに応じてadoptFleetを選ぶ
		 */
		fleetComponents: [] as FleetComponent[],
		/** 実際にシミュで使う艦隊 */
		adoptFleet: null as AdoptFleet | null,
		/**
		 * 選択された海域    
		 * 保存する
		 */
		selectedArea: null as AreaId | null,
        /** 能動分岐、攻略フェイズ、難易度の設定値 */
        options: null as OptionsType | null,
        /** 現在描画されている海域 */
        drewArea: null as AreaId | null,
        /**  */
        cxtTapedNode: null as Node | null,
        /** シミュレーション結果 */
        simResult: [] as SimResult[],

        // 動的import系
        branchInfo: null as BranchLastUpdate | null,
        branchData: null as BranchType | null,
        icons: {} as Record<ItemIconKey, string>,

        /** 司令退避設定（ノードごと） */
        commandEvacuations: [] as CommandEvacuation[],

        refferenceTabKey: 'route' as RefferenceTabKey,
	}),
	actions: {
        UPDATE_DECK(value: string): void {
            this.deck = value;
        },
		UPDATE_SELECTED_TYPE(value: SelectedType): void {
			this.selectedType = value;
		},
        UPDATE_FLEET_COMPONENTS(value: FleetComponent[]): void {
			this.fleetComponents = value;
		},
        UPDATE_ADOPT_FLEET(value: AdoptFleet): void {
			this.adoptFleet = value;
		},
        UPDATE_SELECTED_AREA(value: AreaId): void {
            this.selectedArea = value;
        },
        UPDATE_DREW_AREA(value: AreaId): void {
            this.drewArea = value;
        },
        UPDATE_CXT_TAPED_NODE(value: Node): void {
            this.cxtTapedNode = value;
        },
        UPDATE_SIM_RESULT(value: SimResult[]): void {
            this.simResult = value;
        },
        UPDATE_OPTIONS(value: OptionsType): void {
            this.options = value;
        },
        UPDATE_OPTION_WITH_KEY(area: AreaId, key: string, value: string): void {
            if (this.options?.[area]) {
                this.options[area][key] = value;
            }
        },
        UPDATE_REFFERENCE_TAB_KEY(refferrence_tab_key: RefferenceTabKey): void {
            this.refferenceTabKey = refferrence_tab_key;
        },
        SWITCH_SEEK(): void {
            if (!this.adoptFleet) return;
            this.UPDATE_ADOPT_FLEET(switch_seek(this.adoptFleet as AdoptFleet));
        },
        LOAD_DATA(commands: LoadDataCommands): void {
            const data = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (data) {
                try {
                    const json = JSON.parse(data) as SaveData;
                    if (!commands.exclude_deck && json.deck) this.UPDATE_DECK(json.deck);
                    if (json.selected_type) this.UPDATE_SELECTED_TYPE(json.selected_type);
                    if (json.area) this.UPDATE_SELECTED_AREA(json.area);
                    if (json.options) {
                        // Const.OPTIONS に json.options をマージ
                        const parsed_options = parseOptionsType(json.options);
                        this.UPDATE_OPTIONS({ ...Const.DEFAULT_OPTIONS, ...(parsed_options ?? {}) });
                    } else {
                        // Const.OPTIONS をそのまま渡す
                        this.UPDATE_OPTIONS(Const.DEFAULT_OPTIONS);
                    }
                    if (json.refferrence_tab_key) this.UPDATE_REFFERENCE_TAB_KEY(json.refferrence_tab_key);
                } catch (e) {
                    // エラーが発生した場合も Const.OPTIONS をそのまま渡す
                    this.UPDATE_OPTIONS(Const.DEFAULT_OPTIONS);
                }
            } else {
                // データがない場合も Const.OPTIONS をそのまま渡す
                this.UPDATE_OPTIONS(Const.DEFAULT_OPTIONS);
            }
        },
        /**
         * saveDataをlocalStorageに保存
         * @param save_data - 空ならstoreから取得
         */
        SAVE_DATA(save_data?: SaveData): void {
            let localSaveData = save_data;
            if (!localSaveData) {
                localSaveData = {
                    deck: this.deck,
                    selected_type: this.selectedType,
                    area: this.selectedArea,
                    options: this.options,
                    refferrence_tab_key: this.refferenceTabKey,
                };
            }

            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localSaveData));
        },
        async DYNAMIC_LOAD(): Promise<void> {
            const module = await import('../data/branch');
            this.UPDATE_BRANCH_INFO(module.BRANCH_LAST_UPDATES);
            this.UPDATE_BRANCH_DATA(module.default);

            const prepare_icons = {
                fuel: await import('@/icons/items/fuel.png'),
                ammo: await import('@/icons/items/ammo.png'),
                steel: await import('@/icons/items/steel.png'),
                imo: await import('@/icons/items/imo.png'),
            };
            const icons = Object.fromEntries(
                Object.entries(prepare_icons).map(([key, value]) => [key, value.default])
            ) as Record<ItemIconKey, string>;
            this.UPDATE_ICONS(icons);
        },
        UPDATE_BRANCH_INFO(value: BranchLastUpdate): void {
            this.branchInfo = value;
        },
        UPDATE_BRANCH_DATA(value: BranchType): void {
            this.branchData = value;
        },
        UPDATE_ICONS(value: Record<ItemIconKey, string>) {
            this.icons = value;
        },
        /**
         * 司令退避設定を更新
         * @param evacuations - CommandEvacuation配列
         */
        UPDATE_COMMAND_EVACUATIONS(evacuations: CommandEvacuation[]): void {
            this.commandEvacuations = evacuations;
        },
        CLEAR_ROUTES(): void {
            this.UPDATE_SIM_RESULT([Const.EMPTY_SIM_RESULT]);
        }
	},
});

export const useModalStore = defineStore('modal', {
	state: () => ({
        /** 海域選択モーダルの表示状態 */
        isAreaVisible: false,
        /** 資料モーダル表示状態 */
        isRefferenceVisible: false,
        /** エラーモーダルの表示状態 */
		isErrorVisible: false,
        /** 司令退避モーダルの表示状態 */
        isCommandEvacuationVisible: false,
        /** 表示するエラーメッセージ */
		errorMessage: '',
        currentRefferenceTab: 'Route' as 'Route' | 'Branch',
	}),
	actions: {
        /**
         * 海域選択モーダル表示
         */
        SHOW_AREA(): void {
            this.isAreaVisible = true;
        },
        /**
         * 資料モーダル表示
         */
        SHOW_REFFERENCE(): void {
            this.isRefferenceVisible = true;
        },
        /**
         * 司令退避モーダル表示
         */
        SHOW_COMMAND_EVACUATION(
            area_id: AreaId,
            node: string,
            node_datas: NodeDatas,
            edge_datas: EdgeDatas,
        ): void {
            if (!is_battle_node(area_id, node, node_datas)) return;
            if (is_last_stop_node(area_id, node, edge_datas)) return;

            this.isCommandEvacuationVisible = true;
        },
        /**
         * エラーモーダル    
         * ユーザーに伝えたいエラーはCustomErrorでthrow
         */
        SHOW_ERROR(error: unknown): void {
            if (error instanceof CustomError) {
                this.errorMessage = error.message;
            } else {
                this.errorMessage = '予期しないエラーが発生しました';
            }
            this.isErrorVisible = true;
        },
        /**
         * モーダル非表示。種類に関わらず、全てこれを呼ぶ
         */
        HIDE_MODALS(): void {
            this.isAreaVisible = false;
            this.isRefferenceVisible = false;
            this.isErrorVisible = false;
            this.isCommandEvacuationVisible = false;
            this.errorMessage = '';
        },
        UPDATE_CURRENT_REFFERENCE_TAB(value: 'Route' | 'Branch'): void {
            this.currentRefferenceTab = value;
        },
	}
});
