import cytoscape from 'cytoscape';
import { node_datas, edge_datas, NT as NodeType, warning_node_datas } from '@/data/map';
import styles from '@/styles';
import type { AreaId, SimResult } from '../../models/types';
import Big from 'big.js';
import { type CommandEvacuation, isEvacuationNode } from '@/core/CommandEvacuation';

/**
 * シミュ結果からマップを描画
 * @param selectedArea 
 * @param sim_result 
 * @returns 
 * @subEffect -マップの描画
 */
export default function doDrawMap(
    selectedArea: AreaId,
    sim_result: SimResult[],
    command_evacuations: CommandEvacuation[],
): cytoscape.Core {
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

    type TempNodeType = NodeType | 'alert' | 'shadow' | 'evacuation'

    interface Node {
        data: {
            id: string;
            name: string;
            label: TempNodeType;
        };
        position: {
            x: number;
            y: number;
        };
    }

    interface Edge {
        data: {
            source: string;
            target: string;
            ratio: number;
        };
    }

    const elements = {
        nodes: [] as Node[],
        edges: [] as Edge[]
    };
    // nodes流し込み
    const local_nodes = node_datas[selectedArea];
    const warning_nodes = warning_node_datas[selectedArea] ?? [];
    for (const key in local_nodes) {
        if (Object.hasOwn(local_nodes, key)) {
            const [x, y, label] = local_nodes[key];
            // 能動分岐マスに影付
            if (label === NodeType.ac) {
                elements.nodes.push({
                    data: {
                        id: key + 'shadow',
                        name: key + 'shadow',
                        label: 'shadow',
                    },
                    position: { x: x, y: y }
                });
            }
            // 座標, Nodeの種類
            elements.nodes.push({
                data: {
                    id: key,
                    name: key,
                    label: label,
                },
                position: { x, y }
            });
            // 暫定度が高いNodeには「!」表示
            if (warning_nodes.includes(key)) {
                elements.nodes.push({
                    data: {
                        id: key + 'alert',
                        name: key + 'alert',
                        label: 'alert',
                    },
                    position: { x: x + 14, y: y - 14 }
                });
            }
            if (isEvacuationNode(command_evacuations, key)) {
                elements.nodes.push({
                    data: {
                        id: key + 'evacuation',
                        name: key + 'evacuation',
                        label: 'evacuation',
                    },
                    position: { x: x - 14, y: y - 20 }
                });
            }
        }
    }

    // edges流し込み
    const local_edges = edge_datas[selectedArea];
    for (const key in local_edges) {
        if (Object.hasOwn(local_edges, key)) {
            const [source, target] = local_edges[key];
            // 通っていないルートはrateに無いので0に置き換え
            let ratio = 0;
            if (transit_data[source + 'e' + target]) {
                ratio = new Big(transit_data[source + 'e' + target])
                    .times(100)
                    .toNumber();
            }
            
            ratio = ratio ? ratio : 0;
            elements.edges.push({
                data: {
                    source,
                    target,
                    ratio: ratio
                }
            });
        }
    }

    const layout = {
        name: 'preset'
    };

    // 無理にcomponentsに持ってこうとするとややこいのでここでやっちゃう
    const cy = cytoscape({
        // #cyに生成
        container: document.getElementById('cy'),
        elements: elements,
        style: styles,
        layout: layout,
        autoungrabify: true, // nodeのドラッグ不可
        userZoomingEnabled: false
    });

    return cy;
}