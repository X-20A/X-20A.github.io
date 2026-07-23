import { nextTick, onMounted, onUnmounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '../stores';
import { sanitize_text } from '../logic/util';
import { convert_branch_data_to_HTML } from '../logic/convert';
import type { MapCore } from '../logic/effects/svgGraph';
import type { StandardResource } from '../models/resource/StandardResource';
import type { SyonanResource } from '../models/resource/SyonanResource';

/** ノード中心からポップアップまでのオフセット */
const POPUP_OFFSET = 20;
/** ビューポート端との最小余白 */
const POPUP_MARGIN = 8;

/**
 * マップノードのポップアップ(分岐条件HTML / 資源情報)の表示状態と座標計算
 * - マップ描画(useMapRenderer)には非依存。ノードの画面座標は渡された MapCore から読むだけ
 * - App.vueのsetup内で1度だけ呼ぶこと(resize購読を二重登録しないため)
 */
export function usePopup() {
	const store = useStore();
	const { selectedArea, options, branchData } = storeToRefs(store);

	const branch_html = ref<string | null>(null);
	const popup_style = ref({
		top: '0px',
		left: '0px',
	});
	const node = ref<string | null>(null);
	const standard_resource = ref<StandardResource | null>(null);
	const syonan_resource = ref<SyonanResource | null>(null);

	/** ポップアップ位置の基準ノード(リサイズ・スクロール時の再調整用) */
	let popup_anchor: { map: MapCore; node_name: string } | null = null;

	const hide_popup = () => {
		standard_resource.value = null;
		syonan_resource.value = null;
		branch_html.value = null;
		popup_anchor = null;
	};

	const generate_branch_html = (node_name: string): string | null => {
		node.value = node_name;

		let key = selectedArea.value!;

		if (options.value && selectedArea.value === '7-3') {
			const option = options.value['7-3']!;
			if (option.phase) {
				key += `-${option.phase}`;
			}
		}

		let node_data = branchData.value![key][node_name];

		if (!node_data) return null;

		const topic = sanitize_text(`${selectedArea.value}-${node_name}`);

		node_data = convert_branch_data_to_HTML(node_data, topic);

		node_data = `<p>${node_data}</p>`;

		return node_data;
	};

	const adjust_popup_position = (
		map: MapCore,
		node_name: string,
	) => {
		popup_anchor = { map, node_name };
		apply_popup_position();
		// 描画完了後に実サイズで再クランプ
		nextTick(apply_popup_position);
	};

	const apply_popup_position = () => {
		if (!popup_anchor) return;
		const position = popup_anchor.map.rendered_position(popup_anchor.node_name);
		if (!position) return;

		// ノード中心のビューポート座標
		const cyContainer = popup_anchor.map.container.getBoundingClientRect();
		const anchor_x = position.x + cyContainer.left;
		const anchor_y = position.y + cyContainer.top;

		// 表示中ポップアップの実サイズ(描画前はCSSのmin-width相当をフォールバック)
		let popup_w = 210;
		let popup_h = 40;
		for (const el of document.querySelectorAll<HTMLElement>('.popup-info')) {
			popup_w = Math.max(popup_w, el.offsetWidth);
			popup_h = Math.max(popup_h, el.offsetHeight);
		}

		const view_w = document.documentElement.clientWidth;
		const view_h = document.documentElement.clientHeight;

		// 基本はノードの右。収まらなければ左へ反転し、最後にビューポート内へクランプ
		let left = anchor_x + POPUP_OFFSET;
		if (left + popup_w + POPUP_MARGIN > view_w) {
			left = anchor_x - POPUP_OFFSET - popup_w;
		}
		left = Math.max(Math.min(left, view_w - popup_w - POPUP_MARGIN), POPUP_MARGIN);

		let top = anchor_y - 10;
		if (top + popup_h + POPUP_MARGIN > view_h) {
			top = view_h - popup_h - POPUP_MARGIN;
		}
		top = Math.max(top, POPUP_MARGIN);

		// position:absoluteの基準はドキュメントなのでスクロール分を加算
		popup_style.value.top = top + window.scrollY + 'px';
		popup_style.value.left = left + window.scrollX + 'px';
	};

	// ウィンドウリサイズでポップアップ位置を再調整
	onMounted(() => {
		window.addEventListener('resize', apply_popup_position);
	});
	onUnmounted(() => {
		window.removeEventListener('resize', apply_popup_position);
	});

	return {
		branch_html,
		popup_style,
		node,
		standard_resource,
		syonan_resource,
		hide_popup,
		generate_branch_html,
		adjust_popup_position,
	};
}
