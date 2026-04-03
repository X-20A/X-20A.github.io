import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_4: TestFleetData[] = [
    {
        area: '60-4', routes: ['1-A-B-C-U-W', '1-A-D-F-F1-F2', '1-A-D-F-G-H-M-O-P-R'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '羽黒' }, { name: '矢矧' },
                { name: '朝潮' }, { name: '浦風' },
                { name: '清霜' }, { name: '涼月' },
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
                { name: '矢矧' }, { name: '加賀' },
                { name: '榛名' }, { name: '龍鳳改二' },
                { name: '最上' }, { name: '如月' },
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
                { name: '矢矧' }, { name: '加賀' },
                { name: '榛名' }, { name: '睦月' },
                { name: 'Jervis' }, { name: '如月' },
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
                { name: '金剛' }, { name: '比叡' },
                { name: '羽黒' }, { name: '矢矧' },
                { name: '時雨' }, { name: '加賀' },
            ],
            escort_fleet_ships: [
                { name: '鬼怒' }, { name: '如月' },
                { name: '深雪' }, { name: '白露' },
                { name: '朝潮' }, { name: '浦風' },
            ],
        },
    },
];
