import { TestFleetData } from "..";
import { Ft } from "../../../../src/models/fleet/predicate";

export const TEST_FLEET_DATAS_62_3: TestFleetData[] = [
    {
        area: '62-3', routes: ['1-A-A2-B-B1-B2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '五十鈴' }, { name: '雲鷹改二' },
                { name: '梅' }, { name: '綾波' },
                { name: '白露' }, { name: '初霜' },
                { name: '高波' },
            ],
        },
    },
    {
        area: '62-3', routes: ['1-A-A2-B-C-C1-C2-P-Q'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '五十鈴' }, { name: '雲鷹改二' },
                { name: '梅' }, { name: '綾波' },
                { name: '白露' }, { name: '初霜' },
                { name: '高波' },
            ],
        },
    },
    {
        area: '62-3', routes: ['1-A-A2-D-E-E1-E2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '五十鈴' }, { name: '雲鷹改二' },
                { name: '鬼怒' }, { name: '綾波' },
                { name: '白露' }, { name: '初霜' },
                { name: '高波' },
            ],
        },
    },
    {
        area: '62-3', routes: ['1-A-A2-D-D1-D2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '五十鈴' }, { name: '雲鷹改二' },
                { name: '鬼怒' }, { name: '綾波' },
                { name: '白露' }, { name: '初霜' },
                { name: '高波' },
            ],
        },
    },
    {
        area: '62-3', routes: ['2-F-A2-G-H-I-J-L-O'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: '武蔵改二' },
                { name: 'Intrepid' }, { name: '隼鷹' },
                { name: '赤城' }, { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '龍鳳改二戊' },
                { name: '雪風' }, { name: '初月' },
                { name: 'Fletcher' }, { name: '時雨' },
            ],
        },
    },
    {
        area: '62-3', routes: ['1-A-A2-B-C-C2-P-Q'],
        option: {
            'phase': '3',
        },
        fleet: {
            main_fleet_ships: [
                { name: '初霜' }, { name: '比叡' },
                { name: '梅' }, { name: '冬月' },
                { name: '村雨' }, { name: '巻雲' },
                { name: '由良' },
            ],
        },
    },
    {
        area: '62-3', routes: ['3-R-S-T-V-X'],
        option: {
            'phase': '4',
        },
        fleet: {
            main_fleet_ships: [
                { name: '伊58' }, { name: '伊36' },
                { name: '伊41' }, { name: '伊13' },
                { name: '伊26' }, { name: '伊19' },
                { name: '伊47' },
            ],
        },
    },
    {
        area: '62-3', routes: ['2-F-A2-G-H-M-Y1-U-Y2-Y-Z'],
        option: {
            'phase': '5',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: '武蔵改二' },
                { name: 'Intrepid' }, { name: '隼鷹' },
                { name: '赤城' }, { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '北上改二' }, { name: '龍鳳改二戊' },
                { name: '雪風' }, { name: '矢矧' },
                { name: 'Fletcher' }, { name: '時雨' },
            ],
        },
    },
];