import { TestFleetData } from "..";
import { Ft } from "../../../../src/models/fleet/predicate";

export const TEST_FLEET_DATAS_62_2: TestFleetData[] = [
    {
        area: '62-2', routes: ['1-A-A1-A2-A3-B2-D-G-G1-G2-K-L-M-O-P'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '綾波' },
                { name: '祥鳳' }, { name: '照月' },
                { name: '鬼怒' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-2', routes: ['1-A-A1-A2-A3-B2-C-C2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: 'Гангут' },
                { name: '雲龍' }, { name: '照月' },
                { name: '鬼怒' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-2', routes: ['1-A-A1-A3-B1-F-G-H'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: 'Гангут' },
                { name: '雲龍' }, { name: '照月' },
                { name: '初霜' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-2', routes: ['1-A-A1-A3-B1-F-G-G1-G2-K-L-M-O-P'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '鬼怒' },
                { name: '祥鳳' }, { name: '照月' },
                { name: '初霜' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-2', routes: ['1-A-A1-A3-B-B1-B2-E-F-G-H'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '鬼怒' },
                { name: '祥鳳' }, { name: 'Гангут' },
                { name: '雲龍' }, { name: '愛宕' },
            ],
        },
    },
    {
        area: '62-2', routes: ['2-I-J-K-L-M-O-P'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '夕暮' },
                { name: '有明' }, { name: '冬月' },
                { name: '江風' }, { name: '初雪' },
                { name: '深雪' },
            ],
        },
    },
    {
        area: '62-2', routes: ['3-Q-G-G1-K-L-S-T-V'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '武蔵',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name : '改良型艦本式タービン' },
                    ]
                },
                { name: '瑞鶴' }, { name: '利根' },
                { name: '球磨' }, { name: 'Brooklyn' },
            ],
            escort_fleet_ships: [
                { name: '夕立' }, { name: '夕暮' },
                { name: '有明' }, { name: '矢矧' },
                { name: '江風' }, { name: '初雪' },
            ],
        },
    },
    {
        area: '62-2', routes: ['4-T-W-W2-X1-X-Y'],
        option: {
            'phase': '4',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二' }, { name: '武蔵' },
                { name: '瑞鶴' }, { name: 'Saratoga' },
                { name: '千歳航改二' }, { name: '瑞鳳' },
            ],
            escort_fleet_ships: [
                { name: '夕立' }, { name: '北上改二' },
                { name: '有明' }, { name: '朝霜' },
                { name: '矢矧' }, { name: '初雪' },
            ],
        },
    },
];