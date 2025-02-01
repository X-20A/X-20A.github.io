import Const from "@/classes/const";
import { CyStyle } from "@/classes/types";

const NODE_ICONS = `${Const.CDN}/media/nodes`;

const nodes: CyStyle[] = [
    {
        selector: 'node',
        style: {
            'color': 'rgb(250,250,250)',
            'font-weight': '100',
            'text-outline-color': 'rgba(20,20,20)',
            'text-outline-opacity': '.85',
            'text-outline-width': '1.5px',
            'content': 'data(name)',
            'text-valign': 'center',
            'text-halign': 'center',
            'padding': '0pt',
            'font-size': '15px',
            'background-clip': 'none',// z-indexでedgesの下に潜り込ませるは上手くいかなかった
        }
    }, // マスの分類ごとに表示分岐
    {
        selector: 'node[label = "st"]', // 出撃
        style: {
            'background-image': `${NODE_ICONS}/start.png`,
            'font-weight': '600',
            'text-outline-width': '2px',
            'font-size': '20px',
            'width': '48px',
            'height': '48px',
            'background-opacity': 0,
            'background-position-x': '1px', // 位置微調整
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "po"]',  // 港湾
        style: {
            'background-image': `${NODE_ICONS}/port.png`,
            'width': '48px',
            'height': '48px',
            'background-opacity': 0,
            'background-position-x': '5.7px',
            'background-position-y': '5px'
        }
    },
    {
        selector: 'node[label = "bo"]', // ボス
        style: {
            'background-image': `${NODE_ICONS}/boss.png`,
            'width': '48px',
            'height': '48px',
            'background-opacity': 0,
            'background-position-x': '5px',
            'background-position-y': '1px'
        }
    },
    {
        selector: 'node[label = "ab"]',  // 航空戦
        style: {
            'background-image': `${NODE_ICONS}/air-b.png`,
            'width': '48px',
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '1px' // 位置微調整
        }
    },
    {
        selector: 'node[label = "ad"]',  // 空襲
        style: {
            'background-image': `${NODE_ICONS}/air-d.png`,
            'width': '44px',
            'height': '25px',
            'background-opacity': 0,
        }
    },
    {
        selector: 'node[label = "ac"]',  // 能動分岐
        style: {
            'background-image': `${NODE_ICONS}/calm.png`,
            'border-width': 3, // ボーダーの太さ
            'border-color': '#2c4dff',  // #ff3f87
            'width': '27px',
            'height': '27px',
            'background-position-x': '0px',
            'background-position-y': '-1px',
        }
    },
    {
        selector: 'node[label = "en"]', // 通常戦 基本設定
        style: {
            'background-image': `${NODE_ICONS}/enemy.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "su"]', // 対潜
        style: {
            'background-image': `${NODE_ICONS}/enemy.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "ca"]', // 気のせい
        style: {
            'background-image': `${NODE_ICONS}/calm.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "wh"]',  // 渦潮
        style: {
            'background-image': `${NODE_ICONS}/whirl.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "re"]',  // 資源
        style: {
            'background-image': `${NODE_ICONS}/resource.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "ni"]',  // 夜戦
        style: {
            'background-image': `${NODE_ICONS}/night.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "sc"]',  // 航空偵察
        style: {
            'background-image': `${NODE_ICONS}/scout.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "un"]', // 不明
        style: {
            'background-image': `${NODE_ICONS}/unknown.png`,
            'width': '27px', // enemy系
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "as"]', // 対潜空襲
        style: {
            'background-image': `${NODE_ICONS}/airstrike_supported.png`,
            'width': '48px',
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: 'node[label = "tl"]', // 揚陸地点
        style: {
            'background-image': `${NODE_ICONS}/transport_loadout.png`,
            'width': '48px',
            'height': '27px',
            'background-opacity': 0,
            'background-position-x': '12px',
            'background-position-y': '1px'
        }
    },
];

export default nodes;