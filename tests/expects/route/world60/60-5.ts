import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_5: TestFleetData[] = [
    {
        area: '60-5', routes: ['1-C-D-D1-D2', '1-C-D-E-E2-F-F2'],
        option: {
            'phase': '1',
            'difficulty': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '初月' }, { name: 'South Dakota' },
                { name: '加賀' }, { name: '天津風' },
                { name: 'Johnston' }, { name: '北上改二' },
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
                { name: '大和改二' }, { name: 'South Dakota' },
                { name: '長門' }, { name: '伊勢' },
                { name: '夕張改二特' }, { name: '初月' },
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
                { name: '長門' }, { name: '陸奥' },
                { name: '足柄' }, { name: '大淀' },
                { name: '熊野' }, { name: '初月' },
            ],
            escort_fleet_ships: [
                { name: 'Gloire' }, { name: '白雪' },
                { name: '叢雲' }, { name: '清霜' },
                { name: '朝霜' }, { name: '霞' },
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
                { name: 'Nelson' }, { name: '夕張' },
                { name: '三隈' }, { name: '最上' },
                { name: '第百一号輸送艦' }, { name: '鈴谷' },
            ],
            escort_fleet_ships: [
                { name: '足柄' }, { name: '大淀' },
                { name: '霞' }, { name: '朝霜' },
                { name: '清霜' }, { name: '早潮' },
            ],
        },
    },
];
