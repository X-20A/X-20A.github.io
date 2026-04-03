import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_1: TestFleetData[] = [
    {
        area: '60-1', routes: ['1-A-B-B2-C1-C2'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '霧島' },
                { name: '矢矧' }, { name: '江風' },
                { name: '陽炎' }, { name: '鈴谷' },
            ],
        },
    },
    {
        area: '60-1', routes: ['1-A-D-D2-D3-E-H'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '霧島' },
                { name: '江風' }, { name: '陽炎' },
                { name: '鈴谷' },
            ],
        },
    },
    {
        area: '60-1', routes: ['1-A-B-B1-B2-C-G-M-O'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '綾波' },
                { name: '稲木' }, { name: '矢矧' },
                { name: '鈴谷' }, { name: '霧島' },
            ],
        },
    },
    {
        area: '60-1', routes: ['1-A-B-B2-C1-C2', '1-A-D-D3-E-H'],
        option: {
            'phase': '2',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: '江風' },
                { name: '大潮' }, { name: '霞' },
                { name: '白露' },
            ],
        },
    },
    {
        area: '60-1', routes: ['2-F-C-G-M-O'],
        option: {
            'phase': '2',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: '鈴谷' },
                { name: '夕立' }, { name: '綾波' },
                { name: '時雨' }, { name: '満潮' },
                { name: '霞' },
            ],
        },
    },
    {
        area: '60-1', routes: ['2-F-C-G-M-O'],
        option: {
            'phase': '3',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: '羽黒' },
                { name: '夕立' }, { name: '瑞鶴' },
                { name: '山城' }, { name: '満潮' },
                { name: '霞' },
            ],
        },
    },
];
