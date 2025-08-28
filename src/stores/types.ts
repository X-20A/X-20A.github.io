import type { AdoptFleet } from '@/models/fleet/AdoptFleet';
import type { CommandEvacuation } from '@/core/CommandEvacuation';
import type { FleetComponent } from '@/models/fleet/FleetComponent';
import type { AreaId, ItemIconKey, NodeDatas, EdgeDatas, SelectedType, SimResult, OptionsType, SaveData, BranchLastUpdate, BranchType } from '@/types';
import type { Node } from '@/types/brand';

/**
 * ストア型定義
 */
export type StoreType = {
    UPDATE_CXT_TAPED_NODE: (node: Node) => void;
    UPDATE_DECK: (value: string) => void;
    UPDATE_SELECTED_TYPE: (value: SelectedType) => void;
    UPDATE_FLEET_COMPONENTS: (value: FleetComponent[]) => void;
    UPDATE_ADOPT_FLEET: (value: AdoptFleet) => void;
    UPDATE_SELECTED_AREA: (value: AreaId) => void;
    UPDATE_DREW_AREA: (value: AreaId) => void;
    UPDATE_SIM_RESULT: (value: SimResult[]) => void;
    UPDATE_OPTIONS: (value: OptionsType) => void;
    UPDATE_OPTION_WITH_KEY: (area: AreaId, key: string, value: string) => void;
    SWITCH_SEEK: () => void;
    LOAD_DATA: () => void;
    SAVE_DATA: (save_data?: SaveData) => void;
    DYNAMIC_LOAD: () => Promise<void>;
    UPDATE_BRANCH_INFO: (value: BranchLastUpdate) => void;
    UPDATE_BRANCH_DATA: (value: BranchType) => void;
    UPDATE_ICONS: (value: Record<ItemIconKey, string>) => void;
    UPDATE_COMMAND_EVACUATIONS: (evacuations: CommandEvacuation[]) => void;
};

/**
 * モーダルストア型定義
 */
export type ModalStoreType = {
    SHOW_COMMAND_EVACUATION: (
        area_id: AreaId,
        node: string,
        node_datas: NodeDatas,
        edge_datas: EdgeDatas
    ) => void;
    SHOW_AREA: () => void;
    SHOW_REFFERENCE: () => void;
    SHOW_ERROR: (error: unknown) => void;
    HIDE_MODALS: () => void;
    UPDATE_CURRENT_REFFERENCE_TAB: (value: 'Route' | 'Branch') => void;
};
