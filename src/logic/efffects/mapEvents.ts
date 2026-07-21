/**
 * SVGマップへのイベント登録を行う関数(旧cytoscapeEvents)
 * @module logic/efffects/mapEvents
 */
import type { Ref } from 'vue';
import type { MapCore } from './svgGraph';
import type { AdoptFleet } from '../../models/fleet/AdoptFleet';
import { derive_Syonan_resource, type SyonanResource } from '../../models/resource/SyonanResource';
import type { AreaId, ItemIconKey, NodeDatas, EdgeDatas } from '../../types';
import type { StoreType, ModalStoreType } from '../../stores/types';
import { is_special_resource_node } from '../resource';
import { derive_standard_resource, type StandardResource } from '../../models/resource/StandardResource';
import { RESOURCE_CRAFT_NAMES } from '../../models/ship/EquippedShip';
import { brandNode } from '../../types/brand';

/** 長押し(旧taphold)の判定時間 */
const HOLD_MS = 500;
/** 長押しキャンセルとみなす移動量(px) */
const HOLD_MOVE_TOLERANCE = 8;

/**
 * SVGマップにイベントを登録する
 * @param map 描画済みマップのハンドル
 * @param generarteBranchHtml ノード名からHTMLを生成する関数
 * @param adjustBranchStyle ポップアップ位置調整関数
 * @param hidePopup ポップアップ非表示関数
 * @param branchHtml ポップアップHTML格納用ref
 * @param drewArea 現在描画中の海域ref
 * @param adoptFleet 採用艦隊ref
 * @param icons アイコンref
 * @param Drum ドラム缶画像
 * @param Craft 大発画像
 * @param store ストア
 * @param modalStore モーダルストア
 * @param node_datas ノードデータ
 * @param edge_datas エッジデータ
 * @param syonanResource 湘南資源ref
 * @param nomalResource 通常資源ref
 */
export function register_map_events(
    map: MapCore,
    generarteBranchHtml: (node_name: string) => string | null,
    adjustBranchStyle: (map: MapCore, node_name: string) => void,
    hidePopup: () => void,
    branchHtml: Ref<string | null>,
    drewArea: Ref<AreaId | null>,
    adoptFleet: Ref<AdoptFleet | null>,
    icons: Ref<Record<ItemIconKey, string>>,
    Drum: string,
    Craft: string,
    store: StoreType,
    modalStore: ModalStoreType,
    node_datas: NodeDatas,
    edge_datas: EdgeDatas,
    syonanResource: Ref<SyonanResource | null>,
    StandardResource: Ref<StandardResource | null>
) {
    const svg = map.svg;

    let hold_timer: number | null = null;
    let hold_start: { x: number; y: number } | null = null;

    const cancel_hold = () => {
        if (hold_timer !== null) {
            clearTimeout(hold_timer);
            hold_timer = null;
        }
        hold_start = null;
    };

    // 旧cxttapstart/taphold相当: 資源ポップアップ + 退避モーダル
    const fire_cxt = (node: string) => {
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
                    RESOURCE_CRAFT_NAMES,
                );
            }
        } else {
            if (adoptFleet.value) {
                StandardResource.value = derive_standard_resource(
                    drewArea.value,
                    node,
                    adoptFleet.value,
                    icons.value,
                    Drum,
                    Craft,
                    RESOURCE_CRAFT_NAMES,
                );
            }
        }
        adjustBranchStyle(map, node);
        store.UPDATE_CXT_TAPED_NODE(brandNode(node));
        modalStore.SHOW_COMMAND_EVACUATION(drewArea.value, node, node_datas, edge_datas);
    };

    svg.addEventListener('pointerdown', (event: PointerEvent) => {
        const hit = (event.target as Element).closest('[data-node]');
        const node = hit?.getAttribute('data-node') ?? null;

        if (event.button === 2) { // 右クリック(旧cxttapstart)
            if (node) fire_cxt(node);
            return;
        }
        if (event.button !== 0) return;

        if (node) { // node(旧mousedown/tapstart)
            const html = generarteBranchHtml(node);
            if (html) {
                branchHtml.value = html;
                adjustBranchStyle(map, node);
            }
            // 同位置で押し続けたら長押し(旧taphold)
            hold_start = { x: event.clientX, y: event.clientY };
            hold_timer = window.setTimeout(() => {
                cancel_hold();
                fire_cxt(node);
            }, HOLD_MS);
            // ポップアップがカーソル下に出現してもpointerupを取り逃さないよう捕捉
            svg.setPointerCapture(event.pointerId);
        } else { // 背景
            hidePopup();
        }
    });

    svg.addEventListener('pointermove', (event: PointerEvent) => {
        if (!hold_start) return;
        if (Math.hypot(event.clientX - hold_start.x, event.clientY - hold_start.y) > HOLD_MOVE_TOLERANCE) {
            cancel_hold();
        }
    });
    svg.addEventListener('pointerup', cancel_hold);
    svg.addEventListener('pointercancel', cancel_hold);

    // 右クリック/長押しでブラウザメニューを出さない
    svg.addEventListener('contextmenu', (event) => event.preventDefault());
}
