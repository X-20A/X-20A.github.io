import type { CyStyle } from "@/classes/types";

const edges: CyStyle[] = [
    {
        selector: 'edge',
        style: {
            'color': 'rgb(250,250,250)',
            'font-weight': '100',
            'text-outline-color': 'rgba(20,20,20)',
            'text-outline-opacity': '.85',
            'text-outline-width': '1.5px',
            'width': '4px',
            'curve-style': 'bezier', // こいつが無いと矢印にならないっぽい
            'target-arrow-shape': 'triangle',
            'events': 'no'
        }
    }, // 割合によって色分け
    {
        selector: 'edge[ratio = 1]',
        style: {
            'line-color': 'rgb(220,20,60)',
            'target-arrow-color': 'rgb(220,20,60)',
        }
    },
    {
        selector: 'edge[ratio = 0]',
        style: {
            'line-color': 'rgb(169,169,169)',
            'content': '' // 0の場合表示なし
        }
    }
];

export default edges;