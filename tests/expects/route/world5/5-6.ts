import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_5_6: TestFleetData[] = [
    {
        area: '5-6', routes: ['1-A-C2-D-E-G'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '早潮' }, { name: '最上' },
                { name: '矢矧' }, { name: '霞' },
                { name: '吹雪' }, { name: '秋月' },
            ],
        },
    },
    {
        area: '5-6', routes: ['1-A1-A2-B-C1-C-H-R'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '時雨' }, { name: '赤城' },
                { name: '最上' }, { name: '矢矧' },
                { name: '吹雪' }, { name: '秋月' },
            ],
        },
    },
    {
        area: '5-6', routes: ['2-I-J-K-L-N'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '時雨' }, { name: '大和改二' },
                { name: '赤城' }, { name: '最上' },
                { name: '矢矧' }, { name: '秋月' },
            ],
        },
    },
    {
        area: '5-6', routes: ['2-I-O-Q-U-X-Z'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '武蔵改二',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ]
                },
                { name: '赤城' }, { name: '秋月' },
                { name: '時雨' }, { name: '矢矧' },
            ],
        },
    },
];
