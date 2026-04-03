import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_3: TestFleetData[] = [
    {
        area: '60-3', routes: ['1-A-C-E-E2-F-F1-G', '1-A-C-D-D3', '1-A-B-B2-B4'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '那智' }, { name: 'Roma' },
                { name: '多摩' }, { name: '初春' },
                { name: '潮' }, { name: '曙' },
                { name: '不知火' },
            ],
        },
    },
    {
        area: '60-3', routes: ['1-A-C-E-F-F1-G'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '那智', equips: [{ name: '北方迷彩(+北方装備)' }] },
                { name: '摩耶', equips: [{ name: '北方迷彩(+北方装備)' }] },
                { name: '多摩', equips: [{ name: '北方迷彩(+北方装備)' }] },
                { name: '初春' }, { name: '潮' },
                { name: '曙' }, { name: '不知火' },
            ],
        },
    },
    {
        area: '60-3', routes: ['2-H-H1-H3'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: 'Graf Zeppelin' },
                { name: '如月' }, { name: '鳥海' },
                { name: '秋月' }, { name: 'Mogador' },
                { name: '初月' },
            ],
        },
    },
    {
        area: '60-3', routes: ['2-H-I-I2-I3'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: 'Graf Zeppelin' },
                { name: '如月' }, { name: '鳥海' },
                { name: '秋月' }, { name: '初月' },
                { name: 'Mogador' },
            ],
        },
    },
    {
        area: '60-3', routes: ['2-H-I-I1'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' }, { name: 'Graf Zeppelin' },
                { name: '如月' }, { name: '鳥海' },
                { name: '国後' }, { name: '初月' },
                { name: 'Mogador' },
            ],
        },
    },
    {
        area: '60-3', routes: ['3-K-L-M-M1-P-O1-R', '3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' }, { name: '陸奥' },
                { name: '古鷹' }, { name: '球磨' },
                { name: 'Commandant Teste' }, { name: 'Ark Royal' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' }, { name: '鬼怒' },
                { name: '如月' }, { name: '深雪' },
                { name: '白露' }, { name: '霞' },
            ],
        },
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-P-O1-R'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' }, { name: '陸奥' },
                { name: '古鷹' }, { name: '球磨' },
                { name: 'Commandant Teste' }, { name: 'Ark Royal' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' }, { name: '鬼怒' },
                { name: '如月' }, { name: '深雪' },
                { name: '白露' }, { name: '霞' },
            ],
        },
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S1-T-F3-U'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '武蔵',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '那智' }, { name: '瑞鳳' },
                { name: '最上' }, { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' }, { name: '矢矧' },
                { name: '如月' }, { name: '深雪' },
                { name: '白露' }, { name: '霞' },
            ],
        },
    },
    {
        area: '60-3', routes: ['3-K-L-M-M2-S-S2-V-X'],
        option: {
            'phase': '4',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                {
                    name: '武蔵',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '那智' }, { name: '瑞鳳' },
                { name: 'Washington' }, { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' }, { name: '矢矧' },
                { name: '最上' }, { name: '深雪' },
                { name: '白露' }, { name: '霞' },
            ],
        },
    },
];
