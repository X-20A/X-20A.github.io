import { CyStyle } from "../types";

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
            'content': 'data(ratio)',
            'events': 'no'
        }
    }, // 割合によって色分け
    {
        selector: 'edge[ratio = 100]',
        style: {
            'line-color': 'rgb(220,20,60)',
            'target-arrow-color': 'rgb(220,20,60)',
        }
    },
    {
        selector: 'edge[ratio < 100][ratio >= 80]',
        style: {
            'line-color': 'rgb(255,99,71)',
            'target-arrow-color': 'rgb(255,99,71)',
        }
    },
    {
        selector: 'edge[ratio < 80][ratio >= 60]',
        style: {
            'line-color': 'rgb(255,165,0)',
            'target-arrow-color': 'rgb(255,165,0)',
        }
    },
    {
        selector: 'edge[ratio < 60][ratio >= 40]',
        style: {
            'line-color': 'rgb(255,215,0)',
            'target-arrow-color': 'rgb(255,215,0)',
        }
    },
    {
        selector: 'edge[ratio < 40][ratio >= 20]',
        style: {
            'line-color': 'rgb(255,215,0)',
            'target-arrow-color': 'rgb(255,215,0)',
        }
    },
    {
        selector: 'edge[ratio < 20][ratio > 0]',
        style: {
            'line-color': 'rgb(240,230,140)',
            'target-arrow-color': 'rgb(240,230,140)',
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