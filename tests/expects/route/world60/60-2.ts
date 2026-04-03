import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_60_2: TestFleetData[] = [
    {
        area: '60-2', routes: ['1-A-A2-B-D-E-F1', '1-A-A2-B-D-E-F-F2', '1-A-A2-B-C-H-I-K'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '摩耶' }, { name: '名取' },
                { name: '山城' }, { name: '飛龍' },
                { name: '白露' }, { name: '霞' },
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
                { name: '羽黒' }, { name: '鳥海' },
                { name: '那智' }, { name: 'Sheffield' },
                { name: '睦月' }, { name: '三日月' },
            ],
            escort_fleet_ships: [
                { name: '川内' }, { name: '深雪' },
                { name: '白露' }, { name: '霞' },
                { name: '谷風' }, { name: '春雨' },
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
                { name: '鳥海' }, { name: '天龍' },
                { name: '龍鳳改二' }, { name: '時雨' },
                { name: '丹陽' }, { name: '長波' },
            ],
            escort_fleet_ships: [
                { name: 'Zara' }, { name: '球磨' },
                { name: '春雨' }, { name: '親潮' },
                { name: '清霜' }, { name: 'Mogador' },
            ],
        },
    },
];
