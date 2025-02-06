import cytoscape from 'cytoscape';
import { nodes, edges } from '@/data/map';
import styles from '@/styles';
import { AreaId, SimResult } from './types';
import Big from 'big.js';

export default function drawMap(
    selectedArea: AreaId,
    sim_result: SimResult[]
): cytoscape.Core {
    // データの形式を調整
    const transit_data = {} as { [key: string]: Big };

    // ルートを分解して格納
    sim_result.forEach(item => {
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
    });

    interface Node {
        data: {
            id: string;
            name: string;
            label: string;
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
    const local_nodes = nodes[selectedArea];
    for (const key in local_nodes) {
        if (local_nodes.hasOwnProperty(key)) {
            // 座標,マスの種類
            const [x, y, label] = local_nodes[key];
            elements.nodes.push({
                data: { id: key, name: key, label: label },
                position: { x, y }
            });
        }
    }
    // edges流し込み
    const local_edges = edges[selectedArea];
    for (const key in local_edges) {
        if (local_edges.hasOwnProperty(key)) {
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