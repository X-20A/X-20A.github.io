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
import Sim from '@/classes/Sim';

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

        cy: null as cytoscape.Core | null,
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
            if (this.options) {
                const options = this.options[area];
                if (options) {
                    console.log('value: ', value);
                    options[key] = value;
                }
            }
        },
        UPDATE_CY(value: cytoscape.Core): void {
            this.cy = value;
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
        isAreaVisible: false, // 海域選択モーダルの表示状態
		isErrorVisible: false, // エラーモーダルの表示状態
		errorMessage: '' // 表示するエラーメッセージ
	}),
	actions: {
        SHOW_AREA(): void {
            this.isAreaVisible = true;
        },
        HIDE_AREA(): void {
            this.isAreaVisible = false;
        },
        HIDE_MODALS(): void {
            this.isAreaVisible = false;
            this.isErrorVisible = false;
        },
		/**
		 * ユーザーに伝えたいエラーはCustomErrorでthrow
		 * 
		 */
		SHOW_ERROR(error: any): void {
			if (error instanceof CustomError) {
				this.errorMessage = error.message;
			} else {
				this.errorMessage = '予期しないエラーが発生しました';
			}
			this.isErrorVisible = true;
		},
	}
});
