import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_61_4: TestFleetData[] = [
    {
        area: '61-4', routes: ['1-A-B-H-I'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '瑞鳳' }, { name: '最上' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '妙高' },
                { name: '満潮' }, { name: '長波' },
                { name: '陽炎' }, { name: '時雨' },
            ],
        },
    },
    {
        area: '61-4', routes: ['1-B1-C-D-D2-E'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '最上' }, { name: '足柄' },
                { name: 'Richelieu' }, { name: '矢矧' },
                { name: 'Helena' }, { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '綾波' },
                { name: '夕立' }, { name: 'Mogador' },
                { name: '満潮' }, { name: '長波' },
            ],
        },
    },
    {
        area: '61-4', routes: ['1-B1-C-F-F2-G-R-R2-S-T'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '最上' }, { name: '足柄' },
                { name: 'Richelieu' }, { name: '矢矧' },
                { name: 'Helena' }, { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '綾波' },
                { name: '夕立' }, { name: 'Mogador' },
                { name: '満潮' }, { name: '長波' },
            ],
        },
    },
    {
        area: '61-4', routes: ['1-A-B-H-I'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: '吹雪' }, { name: '雪風' },
                { name: '磯波' }, { name: '最上' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '満潮' },
                { name: '朝霜' }, { name: '親潮' },
                { name: '大潮' }, { name: '風雲' },
            ],
        },
    },
    {
        area: '61-4', routes: ['2-F-F2-G-N'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: '鈴谷航改二' }, { name: '瑞鳳' },
                { name: '龍鳳改二' }, { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '北上改二' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-4', routes: ['3-G-R-R2-S-T'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '龍鳳' }, { name: '瑞鶴' },
                { name: '伊勢' }, { name: '日向' },
                { name: 'Victorious' }, { name: '瑞鳳' },
            ],
            escort_fleet_ships: [
                { name: '川内' }, { name: '大井' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '長波' },
            ],
        },
    },
    {
        area: '61-4', routes: ['4-B-U-V-X-Z'],
        option: {
            'phase': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: '加古' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
                { name: '長波' },
            ],
        },
    },
];
