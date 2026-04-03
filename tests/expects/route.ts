import { Ft } from "../../src/models/fleet/predicate";
import { AreaId } from "../../src/types";
import { FleetFixture } from "../generator/fixture";

type TestFleetFata = {
    area: AreaId,
    routes: string[], // 編成と、能動分岐以外のoptionが同じなら複数設定可
    option: Record<string, string>, // 能動分岐は不要
    fleet: FleetFixture,
}

// NOTE: deckがコードとして読めないのはやや引っかかる。やりようはあるが大分膨れるので悩ましい

export const TEST_FLEET_DATAS: TestFleetFata[] = [
    {
        area: '60-1', routes: ['1-A-B-B2-C1-C2'],
        option: {
            'phase': '1',
            'is_third': '0',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: '霧島' },
                { name: '矢矧' },
                { name: '江風' },
                { name: '陽炎' },
                { name: '鈴谷' },
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
                { name: '夕立' },
                { name: '霧島' },
                { name: '江風' },
                { name: '陽炎' },
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
                { name: '夕立' },
                { name: '綾波' },
                { name: '稲木' },
                { name: '矢矧' },
                { name: '鈴谷' },
                { name: '霧島' },
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
                { name: '矢矧' },
                { name: '江風' },
                { name: '大潮' },
                { name: '霞' },
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
                { name: '矢矧' },
                { name: '鈴谷' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
                { name: '満潮' },
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
                { name: '矢矧' },
                { name: '羽黒' },
                { name: '夕立' },
                { name: '瑞鶴' },
                { name: '山城' },
                { name: '満潮' },
                { name: '霞' },
            ],
        },
    },
    {
        area: '60-2', routes: ['1-A-A2-B-D-E-F1', '1-A-A2-B-D-E-F-F2', '1-A-A2-B-C-H-I-K'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '摩耶' },
                { name: '名取' },
                { name: '山城' },
                { name: '飛龍' },
                { name: '白露' },
                { name: '霞' },
                { name: '谷風' },
            ],
        },
    },
    {
        area: '60-2', routes: ['2-L-M-N-P-R-T-U'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '羽黒' },
                { name: '鳥海' },
                { name: '那智' },
                { name: 'Sheffield' },
                { name: '睦月' },
                { name: '三日月' },
            ],
            escort_fleet_ships: [
                { name: '川内' },
                { name: '深雪' },
                { name: '白露' },
                { name: '霞' },
                { name: '谷風' },
                { name: '春雨' },
            ],
        },
    },
    {
        area: '60-2', routes: ['2-L-M-N-O-Q-V-V1-W'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '鳥海' },
                { name: '天龍' },
                { name: '龍鳳改二' },
                { name: '時雨' },
                { name: '丹陽' },
                { name: '長波' },
            ],
            escort_fleet_ships: [
                { name: 'Zara' },
                { name: '球磨' },
                { name: '春雨' },
                { name: '親潮' },
                { name: '清霜' },
                { name: 'Mogador' },
            ],
        },
    },
    {
        area: '60-3', routes: ['1-A-C-E-E2-F-F1-G', '1-A-C-D-D3', '1-A-B-B2-B4'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '那智' },
                { name: 'Roma' },
                { name: '多摩' },
                { name: '初春' },
                { name: '潮' },
                { name: '曙' },
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
                { name: '初春' },
                { name: '潮' },
                { name: '曙' },
                { name: '不知火' },
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
                { name: '矢矧' },
                { name: 'Graf Zeppelin' },
                { name: '如月' },
                { name: '鳥海' },
                { name: '秋月' },
                { name: 'Mogador' },
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
                { name: '矢矧' },
                { name: 'Graf Zeppelin' },
                { name: '如月' },
                { name: '鳥海' },
                { name: '秋月' },
                { name: '初月' },
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
                { name: '矢矧' },
                { name: 'Graf Zeppelin' },
                { name: '如月' },
                { name: '鳥海' },
                { name: '国後' },
                { name: '初月' },
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
                { name: '長門' },
                { name: '陸奥' },
                { name: '古鷹' },
                { name: '球磨' },
                { name: 'Commandant Teste' },
                { name: 'Ark Royal' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' },
                { name: '鬼怒' },
                { name: '如月' },
                { name: '深雪' },
                { name: '白露' },
                { name: '霞' },
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
                { name: '長門' },
                { name: '陸奥' },
                { name: '古鷹' },
                { name: '球磨' },
                { name: 'Commandant Teste' },
                { name: 'Ark Royal' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' },
                { name: '鬼怒' },
                { name: '如月' },
                { name: '深雪' },
                { name: '白露' },
                { name: '霞' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '那智' },
                { name: '瑞鳳' },
                { name: '最上' },
                { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' },
                { name: '矢矧' },
                { name: '如月' },
                { name: '深雪' },
                { name: '白露' },
                { name: '霞' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '那智' },
                { name: '瑞鳳' },
                { name: 'Washington' },
                { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' },
                { name: '矢矧' },
                { name: '最上' },
                { name: '深雪' },
                { name: '白露' },
                { name: '霞' },
            ],
        },
    },
    {
        area: '60-4', routes: ['1-A-B-C-U-W', '1-A-D-F-F1-F2', '1-A-D-F-G-H-M-O-P-R'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '羽黒' },
                { name: '矢矧' },
                { name: '朝潮' },
                { name: '浦風' },
                { name: '清霜' },
                { name: '涼月' },
                { name: 'Fletcher' },
            ],
        },
    },
    {
        area: '60-4', routes: ['1-A-D-F-G-G1-I-L'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' },
                { name: '加賀' },
                { name: '榛名' },
                { name: '龍鳳改二' },
                { name: '最上' },
                { name: '如月' },
                { name: 'Fletcher' },
            ],
        },
    },
    {
        area: '60-4', routes: ['1-A-D-F-G-H-M-O-P-R'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '矢矧' },
                { name: '加賀' },
                { name: '榛名' },
                { name: '睦月' },
                { name: 'Jervis' },
                { name: '如月' },
                { name: 'Fletcher' },
            ],
        },
    },
    {
        area: '60-4', routes: ['1-A-B-T-C-W'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '金剛' },
                { name: '比叡' },
                { name: '羽黒' },
                { name: '矢矧' },
                { name: '時雨' },
                { name: '加賀' },
            ],
            escort_fleet_ships: [
                { name: '鬼怒' },
                { name: '如月' },
                { name: '深雪' },
                { name: '白露' },
                { name: '朝潮' },
                { name: '浦風' },
            ],
        },
    },
    {
        area: '60-5', routes: ['1-C-D-D1-D2', '1-C-D-E-E2-F-F2'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '初月' },
                { name: 'South Dakota' },
                { name: '加賀' },
                { name: '天津風' },
                { name: 'Johnston' },
                { name: '北上改二' },
                { name: '矢矧' },
            ],
        },
    },
    {
        area: '60-5',
        routes: ['1-A-B-B1-H-I-J1-J-K', '1-A-B-B2-G-H-I-J1-J-K'], // 含輸送
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '大和改二' },
                { name: 'South Dakota' },
                { name: '長門' },
                { name: '伊勢' },
                { name: '夕張改二特' },
                { name: '初月' },
                { name: '冬月' },
            ],
        },
    },
    {
        area: '60-5',
        routes: ['2-L-M-N-P-P2-R-T'],
        option: {
            'phase': '2',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' },
                { name: '陸奥' },
                { name: '足柄' },
                { name: '大淀' },
                { name: '熊野' },
                { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: 'Gloire' },
                { name: '白雪' },
                { name: '叢雲' },
                { name: '清霜' },
                { name: '朝霜' },
                { name: '霞' },
            ],
        },
    },
    {
        area: '60-5',
        routes: ['2-L-M-U1-U2-U3-X-P2-R-Z'],
        option: {
            'phase': '3',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Nelson' },
                { name: '夕張' },
                { name: '三隈' },
                { name: '最上' },
                { name: '第百一号輸送艦' },
                { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '足柄' },
                { name: '大淀' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
                { name: '早潮' },
            ],
        },
    },
    {
        area: '60-6', routes: ['1-A-C-D-F'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '長門' },
                { name: '陸奥' },
                { name: '足柄' },
                { name: '熊野' },
                { name: '三隈' },
                { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '清霜' },
                { name: '大淀' },
                { name: '霞' },
                { name: '雪風' },
                { name: 'Mogador' },
                { name: '朝霜' },
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
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '龍鳳改二',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Houston',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
            ],
            escort_fleet_ships: [
                {
                    name: '竹',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Верный',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '矢矧',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '初霜',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                { name: '伊勢' },
                { name: '日向' },
                { name: '荒潮' },
                { name: '白露' },
                { name: '夕立' },
                { name: '冬月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: 'Верный' },
                { name: '竹' },
                { name: '初霜' },
                { name: '最上' },
                { name: '時雨' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '足柄' },
                { name: '羽黒' },
                { name: '加賀' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '綾波' },
                { name: '熊野' },
                { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '時雨' },
                { name: '満潮' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
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
                { name: '長門' },
                { name: '陸奥' },
                { name: '足柄' },
                { name: '熊野' },
                { name: '三隈' },
                { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '清霜' },
                { name: '大淀' },
                { name: '霞' },
                { name: '雪風' },
                { name: 'Mogador' },
                { name: '朝霜' },
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
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '龍鳳改二',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Houston',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
            ],
            escort_fleet_ships: [
                {
                    name: '竹',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: 'Верный',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '矢矧',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '初霜',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
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
                { name: '伊勢' },
                { name: '日向' },
                { name: '荒潮' },
                { name: '白露' },
                { name: '夕立' },
                { name: '冬月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: 'Верный' },
                { name: '竹' },
                { name: '初霜' },
                { name: '最上' },
                { name: '時雨' },
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
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '綾波' },
                { name: '熊野' },
                { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '時雨' },
                { name: '満潮' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '大淀' },
                { name: '足柄' },
                { name: '龍鳳改二' },
                { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
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
                { name: '伊勢' },
                { name: '日向' },
                { name: '大淀' },
                { name: '足柄' },
                { name: '龍鳳' },
                { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '霞' },
                { name: '朝霜' },
                { name: '清霜' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '足柄' },
                {
                    name: '伊勢',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '初月' },
                {
                    name: '日向',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '龍鳳改二' },
            ],
            escort_fleet_ships: [
                { name: '霞' },
                { name: '榧' },
                { name: '大淀' },
                { name: '時雨' },
                { name: '朝霜' },
                { name: '清霜' },
            ],
        },
    },

    {
        area: '61-1', routes: ['1-A-B-E'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: 'Roma' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '白露' },
                { name: 'Victorious' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-B-C-D'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: 'Nelson' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '白露' },
                { name: 'Victorious' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-F-G-I'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: 'Roma' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '白露' },
                { name: 'Victorious' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-M-N-O'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: 'Nelson' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '白露' },
                { name: 'Victorious' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-M-O'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: '満潮' },
                { name: '朝霜' },
                { name: '陽炎' },
                { name: 'General Belgrano' },
                { name: '最上' },
                { name: 'Roma' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-F-J-L-P-S-T-V'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: '満潮' },
                { name: '朝霜' },
                { name: 'General Belgrano' },
                { name: '最上' },
                { name: 'Italia' },
                { name: '鈴谷航改二' },
            ],
        },
    },
    {
        area: '61-1', routes: ['1-A-F-J-K-Q-S-T-V'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '満潮' },
                { name: '朝霜' },
                { name: '陽炎' },
                { name: '時雨' },
                { name: '夕雲' },
                { name: '霰' },
                { name: '霞' },
            ],
        },
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-L-M'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '綾波' },
                { name: '白露' },
                { name: '長波' },
                { name: '朝潮' },
                { name: 'General Belgrano' },
                { name: 'Zara' },
                { name: '瑞鳳' },
            ],
        },
    },
    {
        area: '61-2', routes: ['1-A-F-I-J-R'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '綾波' },
                { name: '白露' },
                { name: '長波' },
                { name: '朝潮' },
                { name: 'General Belgrano' },
                { name: 'Zara' },
                { name: '瑞鳳' },
            ],
        },
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-E-S'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: 'General Belgrano' },
                { name: 'Zara' },
                { name: '扶桑' },
                { name: 'Colorado' },
                { name: 'Lexington' },
                { name: '赤城' },
            ],
        },
    },
    {
        area: '61-2', routes: ['2-K-O-P-Q-T-V-W-X'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '三隈' },
                { name: '矢矧' },
                { name: '夕立' },
                { name: '満潮' },
                { name: '陽炎' },
                { name: '朝霜' },
            ],
            escort_fleet_ships: [
                { name: 'Helena' },
                { name: '山風' },
                { name: '海風' },
                { name: '江風' },
                { name: '浜波' },
                { name: '沖波' },
            ],
        },
    },
    {
        area: '61-2', routes: ['2-K-P-Q-T-V-W-X'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '三隈' },
                { name: '矢矧' },
                { name: '夕立' },
                { name: '満潮' },
                { name: '陽炎' },
                { name: '朝霜' },
            ],
            escort_fleet_ships: [
                { name: 'Helena' },
                { name: '山風' },
                { name: '海風' },
                { name: '江風' },
                { name: '浜波' },
                { name: '沖波' },
            ],
        },
    },
    {
        area: '61-2', routes: ['1-A-B-D-K-E-S'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: 'Commandant Teste' },
                { name: 'General Belgrano' },
                { name: '綾波' },
                { name: '扶桑' },
                { name: 'Colorado' },
                { name: 'Lexington' },
            ],
        },
    },
    {
        area: '61-2', routes: ['2-K-O-P-Q-T-V-Y'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: 'Richelieu' },
                { name: 'Jean Bart' },
                { name: 'Ark Royal' },
                { name: '鈴谷' },
                { name: '最上' },
                { name: 'General Belgrano' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' },
                { name: '那智' },
                { name: '夕立' },
                { name: '満潮' },
                { name: '朝霜' },
                { name: '陽炎' },
            ],
        },
    },
    {
        area: '61-3', routes: ['1-A-A1-A2-Q'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: '綾波' },
                { name: '長波' },
                { name: '矢矧' },
                { name: '鳥海' },
                { name: 'Richelieu' },
                { name: '飛龍' },
            ],
        },
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-C1-C2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' },
                { name: '綾波' },
                { name: '長波' },
                { name: '矢矧' },
                { name: '鳥海' },
                { name: 'Richelieu' },
                { name: '飛龍' },
            ],
        },
    },
    {
        area: '61-3', routes: ['2-E-F-H-I-J-K-M'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二' },
                { name: '武蔵' },
                { name: '翔鶴' },
                { name: '加賀' },
                { name: 'Victorious' },
                { name: 'Graf Zeppelin' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '北上改二' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
            ],
        },
    },
    {
        area: '61-3', routes: ['2-E-F-G-G1-G2-S'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二' },
                { name: '武蔵' },
                { name: '翔鶴' },
                { name: '加賀' },
                { name: 'Victorious' },
                { name: 'Graf Zeppelin' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '北上改二' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
            ],
        },
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-T-W'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '神通' },
                { name: '最上' },
                { name: '霧島' },
                { name: '翔鶴' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
            ],
        },
    },
    {
        area: '61-3', routes: ['1-A-A1-B-C-C1-P'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '神通' },
                { name: '翔鶴' },
                { name: '飛龍' },
                { name: '最上' },
                { name: '霧島' },
                {
                    name: 'Nelson',
                    equips: [
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '夕立' },
            ],
        },
    },
    {
        area: '61-3', routes: ['1-A-A1-A2-Q'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '神通' },
                { name: '翔鶴' },
                { name: '飛龍' },
                { name: '最上' },
                { name: '霧島' },
                { name: 'Nelson' },
                { name: '夕立' },
            ],
        },
    },
    {
        area: '61-3', routes: ['2-E-F-G-G1-G2-S'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: '大和改二' },
                { name: '武蔵' },
                { name: '瑞鳳' },
                { name: '大鷹' },
                { name: '神通' },
                { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '北上改二' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
            ],
        },
    },
    {
        area: '61-3', routes: ['3-N-V-X-O-Z'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: 'Warspite' },
                { name: 'Valiant' },
                { name: '翔鶴' },
                { name: '飛龍' },
                { name: '矢矧' },
                { name: '神通' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '鳥海' },
                { name: '夕立' },
                { name: '綾波' },
                { name: '時雨' },
                { name: '満潮' },
            ],
        },
    },
    {
        area: '61-4', routes: ['1-A-B-H-I'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '瑞鳳' },
                { name: '最上' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '妙高' },
                { name: '満潮' },
                { name: '長波' },
                { name: '陽炎' },
                { name: '時雨' },
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
                { name: '最上' },
                { name: '足柄' },
                { name: 'Richelieu' },
                { name: '矢矧' },
                { name: 'Helena' },
                { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
                { name: '長波' },
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
                { name: '最上' },
                { name: '足柄' },
                { name: 'Richelieu' },
                { name: '矢矧' },
                { name: 'Helena' },
                { name: '千歳' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
                { name: '長波' },
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
                { name: 'Richelieu' },
                { name: 'Jean Bart' },
                { name: '吹雪' },
                { name: '雪風' },
                { name: '磯波' },
                { name: '最上' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '満潮' },
                { name: '朝霜' },
                { name: '親潮' },
                { name: '大潮' },
                { name: '風雲' },
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
                { name: 'Richelieu' },
                { name: 'Jean Bart' },
                { name: '鈴谷航改二' },
                { name: '瑞鳳' },
                { name: '龍鳳改二' },
                { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '北上改二' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                { name: '龍鳳' },
                { name: '瑞鶴' },
                { name: '伊勢' },
                { name: '日向' },
                { name: 'Victorious' },
                { name: '瑞鳳' },
            ],
            escort_fleet_ships: [
                { name: '川内' },
                { name: '大井' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '長波' },
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
                { name: '矢矧' },
                { name: '加古' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
                { name: '長波' },
            ],
        },
    },
    {
        area: '61-5', routes: ['1-A1-A2-E-I-Q-Y-Z-ZZ'],
        option: {
            'phase': '1',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'South Dakota' },
                { name: 'Washington' },
                { name: '翔鶴' },
                { name: 'Zara' },
                { name: '最上' },
                { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' },
                { name: '時雨' },
                { name: '夕雲' },
                { name: '霰' },
                { name: '霞' },
                { name: '天津風' },
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
                { name: 'South Dakota' },
                { name: 'Washington' },
                { name: '翔鶴' },
                { name: 'Zara' },
                { name: '最上' },
                { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' },
                { name: '時雨' },
                { name: '夕雲' },
                { name: '霰' },
                { name: '霞' },
                { name: '天津風' },
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
                        { name: '寒冷地装備&甲板要員' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: 'Zara' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                { name: '金剛' },
                { name: '比叡' },
                {
                    name: '加賀',
                    equips: [
                        { name: '寒冷地装備&甲板要員' },
                    ],
                },
                { name: 'Zara' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
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
                { name: '大和改二重' },
                { name: 'Bismarck' },
                { name: '長門' },
                { name: '隼鷹' },
                { name: '三隈' },
                { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                { name: '大和改二重' },
                { name: 'Bismarck' },
                { name: '長門' },
                { name: '隼鷹' },
                { name: '三隈' },
                { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                { name: '大和改二重' },
                { name: 'Bismarck' },
                { name: '長門' },
                { name: '隼鷹' },
                { name: '日進' },
                { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' },
                { name: '最上' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                { name: '金剛' },
                { name: '比叡' },
                {
                    name: '加賀',
                    equips: [
                        { name: '寒冷地装備&甲板要員' },
                    ],
                },
                { name: 'Zara' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
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
                        { name: '寒冷地装備&甲板要員' },
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: 'Zara' },
                { name: '矢矧' },
                { name: '綾波' },
                { name: '夕立' },
                { name: 'Mogador' },
                { name: '満潮' },
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
                        { name: '新型高温高圧缶' },
                        { name: '改良型艦本式タービン' },
                    ],
                },
                { name: '翔鶴' },
                { name: '飛龍' },
                { name: '蒼龍' },
                { name: '大鳳' },
            ],
            escort_fleet_ships: [
                { name: '最上' },
                { name: '矢矧' },
                { name: '満潮' },
                { name: '長波' },
                { name: '陽炎' },
                { name: '時雨' },
            ],
        },
    },
]; // @expansion
/*
{
    area: '61-5', routes: ['1-A'],
        option: {
        'phase': '5',
        },
    deck: '',
},
*/
// TODO: 第三艦隊以降にデータがあるとこける。実機では問題なし
/*
{
    area: '', routes: [''],
    option: {
        'phase': '1',
        'difficulty': '4',
    },
    deck: '',
},
*/

/**
 * 意図的に逸れるようにしたデータ
 */
export const astray_mock_datas: TestFleetFata[] = [

]; // @expansion