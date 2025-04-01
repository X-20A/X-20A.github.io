import cytoscape from 'cytoscape';
import { node_datas, edge_datas, NT as NodeType } from '@/data/map';
import styles from '@/styles';
import type { AreaId } from './types';

export default function drawMap(
    area: AreaId,
    route: string,
): void {
    console.log('draw');
    console.log('area: ', area);
    console.log('route: ', route);

    type TempNodeType = NodeType | 'alert'

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
    const local_nodes = node_datas[area];
    for (const key in local_nodes) {
        if (Object.hasOwn(local_nodes, key)) {
            // 座標,マスの種類
            const [x, y, label] = local_nodes[key];
            elements.nodes.push({
                data: { id: key, name: key, label: label },
                position: { x, y }
            });
        }
    }
    // edges流し込み
    const local_edges = edge_datas[area];
    const parts = route.split('-');
    const pairs = parts.slice(0, -1).map((item, index) => [item, parts[index + 1]]);
    for (const key in local_edges) {
        if (Object.hasOwn(local_edges, key)) {
            const [source, target] = local_edges[key];
            let highlight = 0;
            if (pairs.some(pair => pair[0] === local_edges[key][0] && pair[1] === local_edges[key][1])) {
                highlight = 1;
            }
            elements.edges.push({
                data: {
                    source,
                    target,
                    ratio: highlight
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
}