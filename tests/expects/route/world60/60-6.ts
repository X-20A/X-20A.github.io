import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_6: TestFleetData[] = [
    {
        area: '60-6', routes: ['1-A-C-D-F'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' }, { name: '陸奥' },
                { name: '足柄' }, { name: '熊野' },
                { name: '三隈' }, { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '清霜' }, { name: '大淀' },
                { name: '霞' }, { name: '雪風' },
                { name: 'Mogador' }, { name: '朝霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-H-C2-I', '2-G-J-J2-K-J3-J4-M-N-O'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '龍鳳改二',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Houston',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '利根',
                    equips: [
                        { name: '新型高温高圧缶', improvement_lv: 7 },
                    ],
                },
                {
                    name: '冬月',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
            ],
            escort_fleet_ships: [
                {
                    name: '竹',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Верный',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '矢矧',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '初霜',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],

                },
                {
                    name: '最上',
                    equips: [
                        { name: '新型高温高圧缶', improvement_lv: 7 },
                    ],
                },
                {
                    name: '時雨',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-J-J3-M-N-O'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '伊勢' }, { name: '日向' },
                { name: '荒潮' }, { name: '白露' },
                { name: '夕立' }, { name: '冬月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: 'Верный' },
                { name: '竹' }, { name: '初霜' },
                { name: '最上' }, { name: '時雨' },
            ],
        },
    },
    {
        area: '60-6', routes: ['3-J-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '榛名' },
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '足柄' }, { name: '羽黒' },
                { name: '加賀' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '夕立' },
                { name: '綾波' }, { name: '霞' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['3-J-J1-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '綾波' }, { name: '熊野' },
                { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '時雨' },
                { name: '満潮' }, { name: '霞' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['1-A-C-D-F'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' }, { name: '陸奥' },
                { name: '足柄' }, { name: '熊野' },
                { name: '三隈' }, { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '清霜' }, { name: '大淀' },
                { name: '霞' }, { name: '雪風' },
                { name: 'Mogador' }, { name: '朝霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-H-C2-I'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '龍鳳改二',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Houston',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '利根',
                    equips: [
                        { name: '新型高温高圧缶', improvement_lv: 7 },
                    ],
                },
                {
                    name: '冬月',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
            ],
            escort_fleet_ships: [
                {
                    name: '竹',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Верный',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '矢矧',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '初霜',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],

                },
                {
                    name: '最上',
                    equips: [
                        { name: '新型高温高圧缶', improvement_lv: 7 },
                    ],
                },
                {
                    name: '時雨',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-J-J3-M-N-O'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '伊勢' }, { name: '日向' },
                { name: '荒潮' }, { name: '白露' },
                { name: '夕立' }, { name: '冬月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: 'Верный' },
                { name: '竹' }, { name: '初霜' },
                { name: '最上' }, { name: '時雨' },
            ],
        },
    },
    {
        area: '60-6', routes: ['3-J-J1-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '綾波' }, { name: '熊野' },
                { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '時雨' },
                { name: '満潮' }, { name: '霞' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-J-J2-P-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '大淀' }, { name: '足柄' },
                { name: '龍鳳改二' }, { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '夕立' },
                { name: '綾波' }, { name: '霞' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['2-G-J-J2-K-L-Q-R-T-V'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '伊勢' }, { name: '日向' },
                { name: '大淀' }, { name: '足柄' },
                { name: '龍鳳' }, { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '夕立' },
                { name: '綾波' }, { name: '霞' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
    {
        area: '60-6', routes: ['3-J-J1-P-R-S-X-Z'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                {
                    name: 'Nelson',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '足柄' },
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '初月' },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '龍鳳改二' },
            ],
            escort_fleet_ships: [
                { name: '霞' }, { name: '榧' },
                { name: '大淀' }, { name: '時雨' },
                { name: '朝霜' }, { name: '清霜' },
            ],
        },
    },
];
