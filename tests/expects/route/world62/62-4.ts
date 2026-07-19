import { TestFleetData } from "..";
import { Ft } from "../../../../src/models/fleet/predicate";

export const TEST_FLEET_DATAS_62_4: TestFleetData[] = [
    {
        area: '62-4', routes: ['1-A-C-D'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '最上改二特' }, { name: '天霧改二丁' },
                { name: '羽黒' }, { name: '綾波' },
                { name: 'Pola' }, { name: '海風' },
                { name: '大潮' },
            ],
        },
    },
    {
        area: '62-4', routes: ['1-E-E1-E2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '山城改二' }, { name: '天霧改二丁' },
                { name: '羽黒' }, { name: '綾波' },
                { name: 'Pola' }, { name: '海風' },
                { name: '大潮' },
            ],
        },
    },
    {
        area: '62-4', routes: ['2-F-E1-K-L-N'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '最上改二特' }, { name: '天霧改二丁' },
                { name: '睦月' }, { name: '如月' },
                { name: '文月' }, { name: '海風' },
            ],
            escort_fleet_ships: [
                { name: '大淀' }, { name: '羽黒' },
                { name: '睦月' }, { name: '如月' },
                { name: '文月' }, { name: '海風' },
            ],
        },
    },
    {
        area: '62-4', routes: ['3-O-P-Q-R-S'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: '大和改二重' }, { name: 'Richelieu' },
                { name: 'Ark Royal' }, { name: '瑞鳳' },
                { name: 'Zara' }, { name: '由良' },
            ],
            escort_fleet_ships: [
                { name: '大淀' }, { name: 'Mogador' },
                { name: '睦月' }, { name: '如月' },
                { name: '文月' }, { name: '海風' },
            ],
        },
    },
    {
        area: '62-4', routes: ['3-O-P-P1-T-T1-V-X'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Rodney' }, { name: '由良' },
                { name: '夕張改二特' }, { name: '満潮' },
                { name: '第百一号輸送艦' }, { name: '瑞鳳' },
            ],
            escort_fleet_ships: [
                { name: 'Zara' }, { name: 'Mogador' },
                { name: '睦月' }, { name: '如月' },
                { name: '文月' }, { name: '海風' },
            ],
        },
    },
    {
        area: '62-4', routes: ['3-O-P-P1-T-T1-U-Y-Z'],
        option: {
            'phase': '4',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Ark Royal' }, { name: '瑞鳳' },
                { name: '筑摩改二' }, { name: '千代田航改二' },
            ],
            escort_fleet_ships: [
                { name: 'Gloire' }, { name: 'Mogador' },
                { name: 'Zara' }, { name: '如月' },
                { name: '文月' }, { name: '海風' },
            ],
        },
    },
];