import { defineStore } from 'pinia';

import CacheFleet from '@/classes/CacheFleet';
import CustomError from "@/classes/CustomError";
import AdoptFleet from '@/classes/AdoptFleet';
import Const from '@/classes/const';
import {
    SelectedType,
    AreaId,
    SimResult,
    SaveData,
    OptionsType,
} from '@/classes/types';

export const useStore = defineStore('compass', {
	state: () => ({
        /**
         * 選択された艦隊(SelectedType参照)    
         * 艦隊読込時にも自動で操作されたりする    
         * 保存する
         */
		selectedType: 0 as SelectedType,
		/**
		 * デッキビルダーで第四艦隊まで読み込んだやつ    
		 * ここからselectedTypeに応じてadoptFleetを選ぶ    
		 * 保存する
		 */
		cacheFleets: [] as CacheFleet[],
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
        /** シミュレーション結果 */
        simResult: [] as SimResult[],
	}),
	actions: {
		UPDATE_SELECTED_TYPE(value: SelectedType): void {
			this.selectedType = value;
		},
        UPDATE_CACHE_FLEETS(value: CacheFleet[]): void {
			this.cacheFleets = value;
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
        SWITCH_SEEK(): void {
            this.adoptFleet?.switchSeek();
        },
        LOAD_DATA(): void {
            let data = localStorage.getItem('compass-v2');
            if (data) {
                try {
                    const json = JSON.parse(data) as SaveData;
                    if (json.fleets) this.UPDATE_CACHE_FLEETS(json.fleets);
                    if (json.selected_type) this.UPDATE_SELECTED_TYPE(json.selected_type);
                    if (json.area) this.UPDATE_SELECTED_AREA(json.area);
                    if (json.options) {
                        this.UPDATE_OPTIONS({ ...Const.OPTIONS, ...json.options });
                    } else {
                        this.UPDATE_OPTIONS(Const.OPTIONS);
                    }
                } catch (e) {
                    this.UPDATE_OPTIONS(Const.OPTIONS);
                }
            } else {
                this.UPDATE_OPTIONS(Const.OPTIONS);
            }
        },
        /**
         * saveDataをlocalStorageに保存
         * @param save_data - 空ならstoreから取得
         */
		SAVE_DATA(save_data?: SaveData): void {
            if (!save_data) {
                save_data = {
                    fleets: this.cacheFleets as CacheFleet[],
                    selected_type: this.selectedType,
                    area: this.selectedArea,
                    options: this.options,
                };
            }

            localStorage.setItem('compass-v2', JSON.stringify(save_data));
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
         * エラーモーダル    
         * ユーザーに伝えたいエラーはCustomErrorでthrow
         */
        SHOW_ERROR(error: any): void {
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
            this.errorMessage = '';
        },
        UPDATE_CURRENT_REFFERENCE_TAB(value: 'Route' | 'Branch'): void {
            this.currentRefferenceTab = value;
        }
	}
});
