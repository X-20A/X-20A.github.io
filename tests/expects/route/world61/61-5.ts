import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_61_5: TestFleetData[] = [
    {
        area: '61-5', routes: ['1-A1-A2-E-I-Q-Y-Z-ZZ'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'South Dakota' }, { name: 'Washington' },
                { name: '翔鶴' }, { name: 'Zara' },
                { name: '最上' }, { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' }, { name: '時雨' },
                { name: '夕雲' }, { name: '霰' },
                { name: '霞' }, { name: '天津風' },
            ],
        },
    },
    {
        area: '61-5', routes: ['1-A1-A2-B2-F-H-Y-Z-ZZ'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'South Dakota' }, { name: 'Washington' },
                { name: '翔鶴' }, { name: 'Zara' },
                { name: '最上' }, { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' }, { name: '時雨' },
                { name: '夕雲' }, { name: '霰' },
                { name: '霞' }, { name: '天津風' },
            ],
        },
    },
    {
        area: '61-5', routes: ['2-J-M-N-P'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                {
                    name: '鳳翔改二',
                    equips: [
                        { name: '寒冷地装備&甲板要員' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: 'Zara' }, { name: '矢矧' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-5', routes: ['2-C-R-S-D-U'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '金剛' }, { name: '比叡' },
                {
                    name: '加賀',
                    equips: [
                        { name: '寒冷地装備&甲板要員' },
                    ],
                },
                { name: 'Zara' }, { name: '綾波' },
                { name: '夕立' }, { name: 'Mogador' },
            ],
        },
    },
    {
        area: '61-5', routes: ['1-A-E-I-W-X'],
        option: {
            'phase': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: 'Bismarck' },
                { name: '長門' }, { name: '隼鷹' },
                { name: '三隈' }, { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-5', routes: ['1-A-E-I-W-X'],
        option: {
            'phase': '5',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: 'Bismarck' },
                { name: '長門' }, { name: '隼鷹' },
                { name: '三隈' }, { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-5', routes: ['1-A-E-I-Q-Y-Z-ZZ'],
        option: {
            'phase': '5',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: 'Bismarck' },
                { name: '長門' }, { name: '隼鷹' },
                { name: '日進' }, { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-5', routes: ['2-C-R-S-D-U'],
        option: {
            'phase': '5',
        },
        fleet: {
            main_fleet_ships: [
                { name: '金剛' }, { name: '比叡' },
                {
                    name: '加賀',
                    equips: [
                        { name: '寒冷地装備&甲板要員' },
                    ],
                },
                { name: 'Zara' }, { name: '綾波' },
                { name: '夕立' }, { name: 'Mogador' },
            ],
        },
    },
    {
        area: '61-5', routes: ['2-J-M-N-P'],
        option: {
            'phase': '5',
        },
        fleet: {
            main_fleet_ships: [
                {
                    name: '鳳翔改二',
                    equips: [
                        { name: '寒冷地装備&甲板要員' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: 'Zara' }, { name: '矢矧' },
                { name: '綾波' }, { name: '夕立' },
                { name: 'Mogador' }, { name: '満潮' },
            ],
        },
    },
    {
        area: '61-5', routes: ['3-B2-X1-X2-Y-Z-ZZ'],
        option: {
            'phase': '6',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '武蔵',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '翔鶴' }, { name: '飛龍' },
                { name: '蒼龍' }, { name: '大鳳' },
            ],
            escort_fleet_ships: [
                { name: '最上' }, { name: '矢矧' },
                { name: '満潮' }, { name: '長波' },
                { name: '陽炎' }, { name: '時雨' },
            ],
        },
    },
];
