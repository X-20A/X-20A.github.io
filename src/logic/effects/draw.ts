/**
 * シミュ結果をSVGグラフエンジン(svgGraph.ts)へ流し込みマップを描画する
 * このファイルはKanColle固有のデータ変換とスタイルシートのみを持つ:
 *   - sim_result → エッジ通過率(transit_data)
 *   - ノードタイプ別スタイル(NODE_STYLES)・率別エッジ色(edge_color)
 *   - 装飾判定(能動分岐マス・暫定警告・司令部退避)
 * 描画エンジン(幾何・エッジ描画・fit・マウント・スクショ)はsvgGraph.tsが担う。
 * @module logic/efffects/draw
 */
import { NODE_DATAS, EDGE_DATAS, NT as NodeType, WARNING_NODE_DATAS } from '../../data/map';
import type { AreaId, SimResult } from '../../types';
import Big from 'big.js';
import { type CommandEvacuation, is_evacuation_node } from '../../core/CommandEvacuation';
import {
    type MapCore,
    type NodeStyle,
    type TextStyle,
    type GraphParts,
    type MapBounds,
    create_map,
    draw_edge,
    image_el,
    text_el,
    n,
} from './svgGraph';
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

/** 通過率からエッジ色を決定(旧styles/edge.tsと同じ区分) */
function edge_color(ratio: number): string {
    if (ratio >= 100) return 'rgb(220,20,60)';
    if (ratio >= 80) return 'rgb(255,99,71)';
    if (ratio >= 60) return 'rgb(255,165,0)';
    if (ratio >= 20) return 'rgb(255,215,0)';
    if (ratio > 0) return 'rgb(240,230,140)';
    return 'rgb(169,169,169)';
}

const BASE_TEXT: TextStyle = {
    size: 15,
    weight: 100,
    fill: 'rgb(250,250,250)',
    stroke: 'rgb(20,20,20)',
    stroke_opacity: 0.85,
    outline: 1.5,
};

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

    // 全要素のバウンディングボックス(fit用)。エッジは端点がノード内に収まるため寄与しない
    const bounds: MapBounds = {
        min_x: Number.POSITIVE_INFINITY,
        min_y: Number.POSITIVE_INFINITY,
        max_x: Number.NEGATIVE_INFINITY,
        max_y: Number.NEGATIVE_INFINITY,
    };
    const expand = (x: number, y: number, hw: number, hh: number) => {
        if (x - hw < bounds.min_x) bounds.min_x = x - hw;
        if (x + hw > bounds.max_x) bounds.max_x = x + hw;
        if (y - hh < bounds.min_y) bounds.min_y = y - hh;
        if (y + hh > bounds.max_y) bounds.max_y = y + hh;
    };

    // edges: 通過率→色/ラベル、双方向は湾曲。描画そのものはエンジン(draw_edge)へ委譲
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

        edge_parts.push(...draw_edge(
            sx, sy, tx, ty,
            NODE_STYLES[s_label], NODE_STYLES[t_label],
            {
                color: edge_color(ratio),
                // 逆向きエッジが存在するペアは左右に湾曲させて分離(旧bezier相当)
                curved: edge_keys.has(`${target}>${source}`),
                // 0の場合ラベル表示なし(旧styles/edge.tsと同じ)
                label: ratio !== 0 ? String(ratio) : null,
                // エッジはfont-size未指定だったのでcytoscape既定の16
                label_style: { ...BASE_TEXT, size: 16 },
            },
        ));
    }

    // nodes: 画像/ラベルの配置とKanColle固有の装飾(能動分岐・警告・退避)を組み立て
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

    const parts: GraphParts = { edge_parts, node_parts, hit_parts };

    // 描画エンジンへ引き渡してfit・マウント・ハンドル生成
    return create_map(parts, bounds, (node_name) => {
        const data = local_nodes[node_name];
        return data ? { x: data[0], y: data[1] } : null;
    });
}
