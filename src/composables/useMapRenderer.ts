import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from '../stores';
import do_draw_map from '../logic/effects/draw';
import type { MapCore } from '../logic/effects/svgGraph';
import Drum from '@/icons/items/drum.png';
import Craft from '@/icons/items/craft.png';
import { EDGE_DATAS, NODE_DATAS } from '../data/map';
import { is_special_resource_node } from '../logic/resource';
import { derive_Syonan_resource } from '../models/resource/SyonanResource';
import { derive_standard_resource } from '../models/resource/StandardResource';
import { RESOURCE_CRAFT_NAMES } from '../models/ship/EquippedShip';
import { brandNode } from '../types/brand';
import type { usePopup } from './usePopup';

/** 長押し(旧taphold)の判定時間 */
const HOLD_MS = 500;
/** 長押しキャンセルとみなす移動量(px) */
const HOLD_MOVE_TOLERANCE = 8;

/**
 * マップ描画とノードイベント配線
 * - simResultが変わるたびにマップを再描画し、ノードイベントを登録し直す
 * - ポップアップ表示はusePopupに委譲(そのコールバック/refを直接叩く)
 * - App.vueのsetup内で1度だけ呼ぶこと(watcherを二重登録しないため)
 * @param popup usePopupの戻り値
 */
export function useMapRenderer(
	{ popup }: { popup: ReturnType<typeof usePopup> },
) {
	const store = useStore();
	const modalStore = useModalStore();
	const { selectedArea, simResult, commandEvacuations, drewArea, adoptFleet, icons } = storeToRefs(store);

	/** 描画済みマップのハンドル */
	let map_core = null as MapCore | null;
	let is_first_run = true;

	/**
	 * SVGマップにポインタイベントを登録する(旧register_map_events/cytoscapeEvents)
	 * 依存はすべてこのcomposableのスコープから直接参照する
	 */
	const register_events = (map: MapCore) => {
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
			popup.hide_popup();
			if (is_special_resource_node(drewArea.value, node)) {
				if (adoptFleet.value) {
					popup.syonan_resource.value = derive_Syonan_resource(
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
					popup.standard_resource.value = derive_standard_resource(
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
			popup.adjust_popup_position(map, node);
			store.UPDATE_CXT_TAPED_NODE(brandNode(node));
			modalStore.SHOW_COMMAND_EVACUATION(drewArea.value, node, NODE_DATAS, EDGE_DATAS);
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
				const html = popup.generate_branch_html(node);
				if (html) {
					popup.branch_html.value = html;
					popup.adjust_popup_position(map, node);
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
				popup.hide_popup();
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
	};

	async function draw_map() {
		if (
			!simResult.value ||
			!selectedArea.value
		) return;

		map_core = do_draw_map(
			selectedArea.value,
			simResult.value,
			commandEvacuations.value,
		); // ここまでになるべく余計なことをしない

		if (is_first_run) {
			console.timeEnd('読込 → マップ表示'); // debug
			await store.DYNAMIC_LOAD();
			is_first_run = false;
		}

		popup.hide_popup();
		store.UPDATE_DREW_AREA(selectedArea.value);

		register_events(map_core);
	}

	watch([simResult], async () => {
		draw_map();
	}, { deep: true });

	return { getMapCore: () => map_core };
}
