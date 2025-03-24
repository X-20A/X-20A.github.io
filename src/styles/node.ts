import type { CyStyle } from "@/classes/types";
// ぶっちゃけCDNと速さでは変わらない。ただ、埋め込みなら一斉にパッと点くので採用
import start from '@/icons/nodes/start.png';
import port from '@/icons/nodes/port.png';
import boss from '@/icons/nodes/boss.png';
import airB from '@/icons/nodes/air-b.png';
import airD from '@/icons/nodes/air-d.png';
import calm from '@/icons/nodes/calm.png';
import enemy from '@/icons/nodes/enemy.png';
import whirl from '@/icons/nodes/whirl.png';
import resource from '@/icons/nodes/resource.png';
import night from '@/icons/nodes/night.png';
import scout from '@/icons/nodes/scout.png';
import unknown from '@/icons/nodes/unknown.png';
import airstrikeSupported from '@/icons/nodes/airstrike_supported.png';
import transportLoadout from '@/icons/nodes/transport_loadout.png';
import { NT as NodeType } from "@/data/map";

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
            'background-clip': 'none',// z-indexでedgesの下に潜り込ませるのは上手くいかなかった
            'background-opacity': 0,
        }
    }, // マスの分類ごとに表示分岐
    {
        selector: `node[label = ${NodeType.st}]`, // 出撃
        style: {
            'background-image': start,
            'font-weight': '600',
            'text-outline-width': '2px',
            'font-size': '20px',
            'width': '48px',
            'height': '48px',
            'background-position-x': '1px', // 位置微調整
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.po}]`,  // 港湾
        style: {
            'background-image': port,
            'width': '48px',
            'height': '48px',
            'background-position-x': '5.7px',
            'background-position-y': '5px'
        }
    },
    {
        selector: `node[label = ${NodeType.bo}]`, // ボス
        style: {
            'background-image': boss,
            'width': '48px',
            'height': '48px',
            'background-position-x': '5px',
            'background-position-y': '1px'
        }
    },
    {
        selector: `node[label = ${NodeType.ab}]`,  // 航空戦
        style: {
            'background-image': airB,
            'width': '48px',
            'height': '27px',
            'background-position-x': '1px' // 位置微調整
        }
    },
    {
        selector: `node[label = ${NodeType.ad}]`,  // 空襲
        style: {
            'background-image': airD,
            'width': '44px',
            'height': '25px',
        }
    },
    {
        selector: `node[label = ${NodeType.ac}]`,  // 能動分岐
        style: {
            'background-image': calm,
            'border-width': 3, // ボーダーの太さ
            'border-color': '#2c4dff',  // #ff3f87
            'width': '27px',
            'height': '27px',
            'background-position-x': '0px',
            'background-position-y': '-1px',
        }
    },
    {
        selector: `node[label = ${NodeType.en}]`, // 通常戦 基本設定
        style: {
            'background-image': enemy,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.su}]`, // 対潜
        style: {
            'background-image': enemy,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.ca}]`, // 気のせい
        style: {
            'background-image': calm,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.wh}]`,  // 渦潮
        style: {
            'background-image': whirl,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.re}]`,  // 資源
        style: {
            'background-image': resource,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.ni}]`,  // 夜戦
        style: {
            'background-image': night,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.sc}]`,  // 航空偵察
        style: {
            'background-image': scout,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.un}]`, // 不明
        style: {
            'background-image': unknown,
            'width': '27px', // enemy系
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.as}]`, // 対潜空襲
        style: {
            'background-image': airstrikeSupported,
            'width': '48px',
            'height': '27px',
            'background-position-x': '-0.5px',
            'background-position-y': '-1px'
        }
    },
    {
        selector: `node[label = ${NodeType.tl}]`, // 揚陸地点
        style: {
            'background-image': transportLoadout,
            'width': '48px',
            'height': '27px',
            
            'background-position-x': '12px',
            'background-position-y': '1px'
        }
    },
];

export default nodes;