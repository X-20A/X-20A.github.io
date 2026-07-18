/**
 * 自前SVGによるマップ描画(cytoscape置換)
 * 使用していた機能(preset座標の静的グラフ + ノード画像 + エッジ率ラベル + クリック対象)のみを再現する
 * @module logic/efffects/draw
 */
import { NODE_DATAS, EDGE_DATAS, NT as NodeType, WARNING_NODE_DATAS } from '../../data/map';
import type { AreaId, SimResult } from '../../types';
import Big from 'big.js';
import { type CommandEvacuation, is_evacuation_node } from '../../core/CommandEvacuation';
// スクショ時にSVGごと画像化するため、アイコンはdata URIで埋め込む(?inline)
import start from '@/icons/nodes/start.png?inline';
import port from '@/icons/nodes/port.png?inline';
import boss from '@/icons/nodes/boss.png?inline';
import airB from '@/icons/nodes/air-b.png?inline';
import airD from '@/icons/nodes/air-d.png?inline';
import calm from '@/icons/nodes/calm.png?inline';
import command from '@/icons/items/command.png?inline';
import shadow from '@/icons/nodes/shadow.png?inline';
import enemy from '@/icons/nodes/enemy.png?inline';
import whirl from '@/icons/nodes/whirl.png?inline';
import resource from '@/icons/nodes/resource.png?inline';
import night from '@/icons/nodes/night.png?inline';
import scout from '@/icons/nodes/scout.png?inline';
import unknown from '@/icons/nodes/unknown.png?inline';
import airstrikeSupported from '@/icons/nodes/airstrike_supported.png?inline';
import transportLoadout from '@/icons/nodes/transport_loadout.png?inline';

/** 描画済みマップのハンドル(cytoscape.Coreの代替) */
export interface MapCore {
    /** #cy要素 */
    container: HTMLElement;
    svg: SVGSVGElement;
    /** スクショ用に保持するSVG内部マークアップ */
    content: string;
    view_box: { x: number; y: number; w: number; h: number };
    /** ノード中心のコンテナ内ピクセル座標(旧renderedPosition相当) */
    rendered_position(node_name: string): { x: number; y: number } | null;
}

interface NodeStyle {
    img: string;
    /** 画像のネイティブサイズ(cytoscapeはbackground-fit:noneで原寸描画していた) */
    iw: number;
    ih: number;
    /** ノード形状(楕円)のサイズ = 当たり判定・エッジ端点 */
    w: number;
    h: number;
    /** 画像オフセット(旧background-position-x/y相当。未指定は中央寄せ) */
    ox?: number;
    oy?: number;
}

const NODE_STYLES: Record<NodeType, NodeStyle> = {
    [NodeType.st]: { img: start, iw: 48, ih: 48, w: 48, h: 48, ox: 1, oy: -1 },
    [NodeType.po]: { img: port, iw: 36, ih: 36, w: 48, h: 48, ox: 5.7, oy: 5 },
    [NodeType.bo]: { img: boss, iw: 37, ih: 40, w: 48, h: 48, ox: 5, oy: 1 },
    [NodeType.ab]: { img: airB, iw: 48, ih: 31, w: 48, h: 27, ox: 1 },
    [NodeType.ad]: { img: airD, iw: 44, ih: 25, w: 44, h: 25 },
    [NodeType.ac]: { img: calm, iw: 27, ih: 27, w: 27, h: 27 },
    [NodeType.en]: { img: enemy, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.su]: { img: enemy, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.ca]: { img: calm, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.wh]: { img: whirl, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.re]: { img: resource, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.ni]: { img: night, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.sc]: { img: scout, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
    [NodeType.as]: { img: airstrikeSupported, iw: 40, ih: 30, w: 48, h: 27, ox: -0.5, oy: -1 },
    [NodeType.tl]: { img: transportLoadout, iw: 20, ih: 24, w: 48, h: 27, ox: 12, oy: 1 },
    [NodeType.un]: { img: unknown, iw: 27, ih: 27, w: 27, h: 27, ox: -0.5, oy: -1 },
};

const FONT_FAMILY = 'Helvetica Neue, Helvetica, sans-serif';
const EDGE_WIDTH = 4;
const ARROW_LENGTH = 12;
const ARROW_HALF_WIDTH = 5;
/** 双方向エッジを分離する制御点オフセット */
const CURVE_OFFSET = 20;
/** fit時の余白(旧cytoscapeのfit padding相当) */
const FIT_PADDING = 30;
/** 表示コンテナの基準サイズ(App.vueの.cy: max 960x640) */
const CONTAINER_W = 960;
const CONTAINER_H = 640;

/** 通過率からエッジ色を決定(旧styles/edge.tsと同じ区分) */
function edge_color(ratio: number): string {
    if (ratio >= 100) return 'rgb(220,20,60)';
    if (ratio >= 80) return 'rgb(255,99,71)';
    if (ratio >= 60) return 'rgb(255,165,0)';
    if (ratio >= 20) return 'rgb(255,215,0)';
    if (ratio > 0) return 'rgb(240,230,140)';
    return 'rgb(169,169,169)';
}

/** 数値を小数2桁で文字列化(SVG座標用) */
const n = (v: number): string => String(Math.round(v * 100) / 100);

interface TextStyle {
    size: number;
    weight: number;
    fill: string;
    stroke: string;
    stroke_opacity: number;
    /** 旧text-outline-width。stroke-widthはその2倍になる */
    outline: number;
}

const BASE_TEXT: TextStyle = {
    size: 15,
    weight: 100,
    fill: 'rgb(250,250,250)',
    stroke: 'rgb(20,20,20)',
    stroke_opacity: 0.85,
    outline: 1.5,
};

function text_el(x: number, y: number, content: string, style: TextStyle): string {
    return `<text x="${n(x)}" y="${n(y)}" dy="0.35em" text-anchor="middle"`
        + ` font-size="${style.size}" font-weight="${style.weight}" fill="${style.fill}"`
        + ` stroke="${style.stroke}" stroke-opacity="${style.stroke_opacity}" stroke-width="${style.outline * 2}"`
        + ` paint-order="stroke" stroke-linejoin="round">${content}</text>`;
}

function image_el(cx: number, cy: number, s: NodeStyle): string {
    const left = cx - s.w / 2 + (s.ox ?? (s.w - s.iw) / 2);
    const top = cy - s.h / 2 + (s.oy ?? (s.h - s.ih) / 2);
    return `<image x="${n(left)}" y="${n(top)}" width="${s.iw}" height="${s.ih}" href="${s.img}"/>`;
}

/** (tx,ty)方向へ向かう、中心(cx,cy)の楕円(rx,ry)境界点 */
function ellipse_boundary(
    cx: number, cy: number, rx: number, ry: number,
    tx: number, ty: number,
): { x: number; y: number } {
    const dx = tx - cx;
    const dy = ty - cy;
    const t = 1 / Math.sqrt((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry));
    return { x: cx + dx * t, y: cy + dy * t };
}

/**
 * シミュ結果からマップを描画
 * @param selectedArea
 * @param sim_result
 * @returns 描画済みマップのハンドル
 * @subEffect -マップの描画(#cy内へのSVG生成)
 */
export default function do_draw_map(
    selectedArea: AreaId,
    sim_result: SimResult[],
    command_evacuations: CommandEvacuation[],
): MapCore {
    // データの形式を調整
    const transit_data = {} as { [key: string]: Big };

    // ルートを分解して格納
    for (const item of sim_result) {
        const { route, rate } = item;

        // 途中のペアを作成して格納
        for (let i = 0; i < route.length - 1; i++) {
            const pair = [route[i], route[i + 1]].join('e');

            if (transit_data[pair]) {
                transit_data[pair] = transit_data[pair].plus(rate);  // 同じペアがあればrateを加算
            } else {
                transit_data[pair] = rate;  // 新しいペアはそのままrateを設定
            }
        }
    };

    const local_nodes = NODE_DATAS[selectedArea];
    const warning_nodes = WARNING_NODE_DATAS[selectedArea] ?? [];
    const local_edges = EDGE_DATAS[selectedArea];

    // 全要素のバウンディングボックス(fit用)
    let min_x = Number.POSITIVE_INFINITY;
    let min_y = Number.POSITIVE_INFINITY;
    let max_x = Number.NEGATIVE_INFINITY;
    let max_y = Number.NEGATIVE_INFINITY;
    const expand = (x: number, y: number, hw: number, hh: number) => {
        if (x - hw < min_x) min_x = x - hw;
        if (x + hw > max_x) max_x = x + hw;
        if (y - hh < min_y) min_y = y - hh;
        if (y + hh > max_y) max_y = y + hh;
    };

    // edges
    const edge_parts: string[] = [];
    const edge_keys = new Set(local_edges.map(([s, t]) => `${s}>${t}`));
    for (const [source, target] of local_edges) {
        // 通っていないルートはrateに無いので0に置き換え
        let ratio = 0;
        if (transit_data[source + 'e' + target]) {
            ratio = new Big(transit_data[source + 'e' + target])
                .times(100)
                .toNumber();
        }
        ratio = ratio ? ratio : 0;

        const [sx, sy, s_label] = local_nodes[source];
        const [tx, ty, t_label] = local_nodes[target];
        const s_style = NODE_STYLES[s_label];
        const t_style = NODE_STYLES[t_label];
        const color = edge_color(ratio);

        // 逆向きエッジが存在するペアは左右に湾曲させて分離(旧bezier相当)
        const is_curved = edge_keys.has(`${target}>${source}`);

        let path: string;
        let tip: { x: number; y: number };
        let arrow_dir: { x: number; y: number };
        let label_pos: { x: number; y: number };

        if (is_curved) {
            const mx = (sx + tx) / 2;
            const my = (sy + ty) / 2;
            const dx = tx - sx;
            const dy = ty - sy;
            const len = Math.hypot(dx, dy) || 1;
            const ctrl = {
                x: mx + (-dy / len) * CURVE_OFFSET,
                y: my + (dx / len) * CURVE_OFFSET,
            };
            const s_b = ellipse_boundary(sx, sy, s_style.w / 2, s_style.h / 2, ctrl.x, ctrl.y);
            tip = ellipse_boundary(tx, ty, t_style.w / 2, t_style.h / 2, ctrl.x, ctrl.y);
            const a_len = Math.hypot(tip.x - ctrl.x, tip.y - ctrl.y) || 1;
            arrow_dir = { x: (tip.x - ctrl.x) / a_len, y: (tip.y - ctrl.y) / a_len };
            const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
            path = `<path d="M ${n(s_b.x)} ${n(s_b.y)} Q ${n(ctrl.x)} ${n(ctrl.y)} ${n(base.x)} ${n(base.y)}"`
                + ` fill="none" stroke="${color}" stroke-width="${EDGE_WIDTH}"/>`;
            // 2次ベジェのt=0.5点にラベル
            label_pos = {
                x: 0.25 * s_b.x + 0.5 * ctrl.x + 0.25 * tip.x,
                y: 0.25 * s_b.y + 0.5 * ctrl.y + 0.25 * tip.y,
            };
        } else {
            const s_b = ellipse_boundary(sx, sy, s_style.w / 2, s_style.h / 2, tx, ty);
            tip = ellipse_boundary(tx, ty, t_style.w / 2, t_style.h / 2, sx, sy);
            const len = Math.hypot(tip.x - s_b.x, tip.y - s_b.y) || 1;
            arrow_dir = { x: (tip.x - s_b.x) / len, y: (tip.y - s_b.y) / len };
            const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
            path = `<line x1="${n(s_b.x)}" y1="${n(s_b.y)}" x2="${n(base.x)}" y2="${n(base.y)}"`
                + ` stroke="${color}" stroke-width="${EDGE_WIDTH}"/>`;
            label_pos = { x: (s_b.x + tip.x) / 2, y: (s_b.y + tip.y) / 2 };
        }

        edge_parts.push(path);

        // 矢印(三角)
        const base = { x: tip.x - arrow_dir.x * ARROW_LENGTH, y: tip.y - arrow_dir.y * ARROW_LENGTH };
        const perp = { x: -arrow_dir.y, y: arrow_dir.x };
        edge_parts.push(
            `<polygon points="${n(tip.x)},${n(tip.y)}`
            + ` ${n(base.x + perp.x * ARROW_HALF_WIDTH)},${n(base.y + perp.y * ARROW_HALF_WIDTH)}`
            + ` ${n(base.x - perp.x * ARROW_HALF_WIDTH)},${n(base.y - perp.y * ARROW_HALF_WIDTH)}"`
            + ` fill="${color}"/>`
        );

        // 0の場合ラベル表示なし(旧styles/edge.tsと同じ)
        if (ratio !== 0) {
            edge_parts.push(text_el(label_pos.x, label_pos.y, String(ratio), {
                ...BASE_TEXT,
                size: 16, // エッジはfont-size未指定だったのでcytoscape既定の16
            }));
        }
    }

    // nodes
    const node_parts: string[] = [];
    const hit_parts: string[] = [];
    for (const key in local_nodes) {
        if (Object.hasOwn(local_nodes, key)) {
            const [x, y, label] = local_nodes[key];
            const style = NODE_STYLES[label];

            // 能動分岐マスに影付
            if (label === NodeType.ac) {
                node_parts.push(`<image x="${n(x - 35 - 1.5)}" y="${n(y - 35 - 1)}" width="70" height="70" href="${shadow}"/>`);
                expand(x, y, 37, 37);
            }
            node_parts.push(image_el(x, y, style));
            // 能動分岐は青枠(旧border相当)
            if (label === NodeType.ac) {
                node_parts.push(`<circle cx="${n(x)}" cy="${n(y)}" r="13.5" fill="none" stroke="rgb(60, 73, 255)" stroke-width="3"/>`);
            }
            // ラベル(出撃地点のみ強調)
            if (label === NodeType.st) {
                node_parts.push(text_el(x, y, key, { ...BASE_TEXT, size: 20, weight: 600, outline: 2 }));
            } else {
                node_parts.push(text_el(x, y, key, BASE_TEXT));
            }
            expand(x, y, Math.max(style.w, style.iw) / 2 + 2, Math.max(style.h, style.ih) / 2 + 2);

            // 暫定度が高いNodeには「!」表示
            if (warning_nodes.includes(key)) {
                node_parts.push(text_el(x + 14, y - 14, '!', {
                    ...BASE_TEXT,
                    size: 18,
                    fill: 'white',
                    stroke: 'rgb(255,0,0)',
                    stroke_opacity: 1,
                }));
                expand(x + 14, y - 14, 9, 9);
            }
            if (is_evacuation_node(command_evacuations, key)) {
                // 司令部アイコン(原寸40x40を28x28ノード中央に重ねていたのを踏襲)
                node_parts.push(`<image x="${n(x - 14 - 20)}" y="${n(y - 20 - 20)}" width="40" height="40" href="${command}"/>`);
                expand(x - 14, y - 20, 20, 20);
            }

            // クリック当たり判定(旧events:noの補助ノードは対象外)
            hit_parts.push(`<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(style.w / 2)}" ry="${n(style.h / 2)}" fill="transparent" data-node="${key}"/>`);
        }
    }

    // fit相当: 全要素bbox + 余白をviewBoxに設定(以降のリサイズはSVGが自動追従)
    const bw = max_x - min_x;
    const bh = max_y - min_y;
    const scale = Math.min(CONTAINER_W / bw, CONTAINER_H / bh);
    const pad = FIT_PADDING / scale;
    const view_box = {
        x: min_x - pad,
        y: min_y - pad,
        w: bw + pad * 2,
        h: bh + pad * 2,
    };

    const content = `<g pointer-events="none">${edge_parts.join('')}${node_parts.join('')}</g>`
        + `<g>${hit_parts.join('')}</g>`;

    // #cyに生成
    const container = document.getElementById('cy')!;
    container.innerHTML = '';
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', `${n(view_box.x)} ${n(view_box.y)} ${n(view_box.w)} ${n(view_box.h)}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('font-family', FONT_FAMILY);
    svg.style.userSelect = 'none';
    svg.style.display = 'block';
    svg.innerHTML = content;
    container.appendChild(svg);

    return {
        container,
        svg,
        content,
        view_box,
        rendered_position(node_name: string) {
            const data = local_nodes[node_name];
            const ctm = svg.getScreenCTM();
            if (!data || !ctm) return null;
            const rect = container.getBoundingClientRect();
            const p = new DOMPoint(data[0], data[1]).matrixTransform(ctm);
            return { x: p.x - rect.left, y: p.y - rect.top };
        },
    };
}

/**
 * スクショ用のスタンドアロンSVG文字列を生成(旧cy.jpg相当の元画像)
 * @param map 描画済みマップ
 * @param width 出力幅(旧maxWidth: 1293)
 * @param bg 背景色(旧bg: '#212121')
 */
export function build_map_screenshot_svg(
    map: MapCore,
    width: number,
    bg: string,
): string {
    const { x, y, w, h } = map.view_box;
    const height = Math.round(width * h / w);
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"`
        + ` viewBox="${n(x)} ${n(y)} ${n(w)} ${n(h)}" font-family="${FONT_FAMILY}">`
        + `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${bg}"/>`
        + map.content
        + '</svg>';
}
