import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_61_2: TestFleetData[] = [
    {
        area: '61-2', routes: ['1-A-B-D-K-L-M'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '綾波' }, { name: '白露' },
                { name: '長波' }, { name: '朝潮' },
                { name: 'General Belgrano' }, { name: 'Zara' },
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
                { name: '綾波' }, { name: '白露' },
                { name: '長波' }, { name: '朝潮' },
                { name: 'General Belgrano' }, { name: 'Zara' },
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
                { name: '夕立' }, { name: 'General Belgrano' },
                { name: 'Zara' }, { name: '扶桑' },
                { name: 'Colorado' }, { name: 'Lexington' },
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
                { name: '三隈' }, { name: '矢矧' },
                { name: '夕立' }, { name: '満潮' },
                { name: '陽炎' }, { name: '朝霜' },
            ],
            escort_fleet_ships: [
                { name: 'Helena' }, { name: '山風' },
                { name: '海風' }, { name: '江風' },
                { name: '浜波' }, { name: '沖波' },
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
                { name: '三隈' }, { name: '矢矧' },
                { name: '夕立' }, { name: '満潮' },
                { name: '陽炎' }, { name: '朝霜' },
            ],
            escort_fleet_ships: [
                { name: 'Helena' }, { name: '山風' },
                { name: '海風' }, { name: '江風' },
                { name: '浜波' }, { name: '沖波' },
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
                { name: 'Commandant Teste' }, { name: 'General Belgrano' },
                { name: '綾波' }, { name: '扶桑' },
                { name: 'Colorado' }, { name: 'Lexington' },
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
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Ark Royal' }, { name: '鈴谷' },
                { name: '最上' }, { name: 'General Belgrano' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' }, { name: '那智' },
                { name: '夕立' }, { name: '満潮' },
                { name: '朝霜' }, { name: '陽炎' },
            ],
        },
    },
];
