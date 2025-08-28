/**
 * cytoscapeインスタンスへのイベント登録を行う関数
 * @module logic/cytoscapeEvents
 */
import type cytoscape from 'cytoscape';
import type { Ref } from 'vue';
import type { AdoptFleet } from '@/models/fleet/AdoptFleet';
import { derive_Syonan_resource, type SyonanResource } from '@/models/resource/SyonanResource';
import { derive_normal_resource, type NomalResource } from '@/models/resource/NomalResource';
import type { AreaId, ItemIconKey, NodeDatas, EdgeDatas } from '@/types';
import type { StoreType, ModalStoreType } from '../../stores/types';
import { is_special_resource_node } from '../resource';
import type { ConstType } from '@/constants/const';

/**
 * cytoscapeインスタンスにイベントを登録する
 * @param cytoscape_core cytoscapeインスタンス
 * @param generarteBranchHtml ノード名からHTMLを生成する関数
 * @param adjustBranchStyle ポップアップ位置調整関数
 * @param hidePopup ポップアップ非表示関数
 * @param branchHtml ポップアップHTML格納用ref
 * @param drewArea 現在描画中の海域ref
 * @param adoptFleet 採用艦隊ref
 * @param icons アイコンref
 * @param Drum ドラム缶画像
 * @param Craft 大発画像
 * @param Const 定数
 * @param store ストア
 * @param modalStore モーダルストア
 * @param node_datas ノードデータ
 * @param edge_datas エッジデータ
 * @param syonanResource 湘南資源ref
 * @param nomalResource 通常資源ref
 */
export function register_Cytoscape_events(
    cytoscape_core: cytoscape.Core,
    generarteBranchHtml: (node_name: string) => string | null,
    adjustBranchStyle: (cy: cytoscape.Core, event: cytoscape.EventObject) => void,
    hidePopup: () => void,
    branchHtml: Ref<string | null>,
    drewArea: Ref<AreaId | null>,
    adoptFleet: Ref<AdoptFleet | null>,
    icons: Ref<Record<ItemIconKey, string>>,
    Drum: string,
    Craft: string,
    Const: ConstType,
    store: StoreType,
    modalStore: ModalStoreType,
    node_datas: NodeDatas,
    edge_datas: EdgeDatas,
    syonanResource: Ref<SyonanResource | null>,
    nomalResource: Ref<NomalResource | null>
) {
    cytoscape_core.on('mousedown tapstart', (event) => {
        if (!cytoscape_core) return;
        const target = event.target;
        if (target.data('name')) { // node
            const html = generarteBranchHtml(target.data('name'));
            if (!html) return;
            branchHtml.value = html;
            adjustBranchStyle(cytoscape_core, event);
        } else { // 背景
            hidePopup();
        }
    });

    cytoscape_core.on('cxttapstart taphold', 'node', async (event) => {
        if (!cytoscape_core) return;
        const node = event.target.data('name');
        if (!node) return;
        if (!drewArea.value) return;
        hidePopup();
        if (is_special_resource_node(drewArea.value, node)) {
            if (adoptFleet.value) {
                syonanResource.value = derive_Syonan_resource(
                    drewArea.value,
                    node,
                    adoptFleet.value,
                    icons.value,
                    Drum,
                    Craft,
                    Const.VALID_CRAFT_NAMES,
                );
            }
        } else {
            if (adoptFleet.value) {
                nomalResource.value = derive_normal_resource(
                    drewArea.value,
                    node,
                    adoptFleet.value,
                    icons.value,
                    Drum,
                    Craft,
                    Const.VALID_CRAFT_NAMES,
                );
            }
        }
        adjustBranchStyle(cytoscape_core, event);
        store.UPDATE_CXT_TAPED_NODE(node);
        modalStore.SHOW_COMMAND_EVACUATION(drewArea.value, node, node_datas, edge_datas);
    });
}
