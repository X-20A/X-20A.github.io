import { TestFleetData } from "..";
import { Ft } from "../../../../src/models/fleet/predicate";

export const TEST_FLEET_DATAS_62_5: TestFleetData[] = [
    {
        area: '62-5', routes: ['1-A1-A-A2-B1-B2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '神鷹改二' }, { name: 'Brooklyn' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: 'Mogador' },
                { name: '秋雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['1-A-A2-B-C-C2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '熊野改二' }, { name: 'Brooklyn' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '不知火' },
                { name: '秋雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['1-A-A2-B-C-D-E1-E2'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '熊野改二' }, { name: 'Brooklyn' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '不知火' },
                { name: '秋雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['1-A-A2-B-C-D-E1-G'],
        option: {
            'phase': '2',
        },
        fleet: {
            main_fleet_ships: [
                { name: '熊野改二' }, { name: 'Brooklyn' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '不知火' },
                { name: '秋雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['2-H-I-J-J1-J2'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.transport,
            main_fleet_ships: [
                { name: '日進甲' }, { name: '鬼怒' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '浦波' },
            ],
            escort_fleet_ships: [
                { name: 'Sheffield' }, { name: '多摩' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '不知火' },
            ],
        },
    },
    {
        area: '62-5', routes: ['2-K-K2-K3-L-L2'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Conte di Cavour nuovo' }, { name: '最上改二特' },
                { name: 'Houston' }, { name: '龍驤' },
            ],
            escort_fleet_ships: [
                { name: '早潮' }, { name: '玉波' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['2-K-K2-K3-L1'],
        option: {
            'phase': '2',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Conte di Cavour nuovo' }, { name: '最上改二特' },
                { name: 'Houston' }, { name: '龍驤' },
            ],
            escort_fleet_ships: [
                { name: '早潮' }, { name: '玉波' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['3-M-M1-O-P'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Italia' }, { name: 'Bismarck drei' },
                { name: '蒼龍改二' }, { name: '瑞鳳改二' },
                { name: '最上改二特' }, { name: 'Helena' },
            ],
            escort_fleet_ships: [
                { name: 'G.Garibaldi' }, { name: '玉波' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['3-M-M1-O-P1-P3'],
        option: {
            'phase': '3',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Italia' }, { name: 'Bismarck drei' },
                { name: '蒼龍改二' }, { name: '瑞鳳改二' },
                { name: '最上改二特' }, { name: 'Helena' },
            ],
            escort_fleet_ships: [
                { name: 'G.Garibaldi' }, { name: '玉波' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['2-K-K2-K3-L-Q-S'],
        option: {
            'phase': '4',
        },
        fleet: {
            fleet_type: Ft.surface,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Conte di Cavour nuovo' }, { name: '最上改二特' },
                { name: 'Houston' }, { name: '龍驤' },
            ],
            escort_fleet_ships: [
                { name: '早潮' }, { name: '玉波' },
                { name: '涼月' }, { name: '綾波' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
    {
        area: '62-5', routes: ['4-U-V-X-Y-Y1-Z-ZZ'],
        option: {
            'phase': '5',
        },
        fleet: {
            fleet_type: Ft.carrier,
            main_fleet_ships: [
                { name: 'Richelieu' }, { name: 'Jean Bart' },
                { name: 'Ark Royal' }, { name: 'Saratoga' },
                { name: '赤城' }, { name: '加賀' },
            ],
            escort_fleet_ships: [
                { name: '早潮' }, { name: 'Prinz Eugen' },
                { name: 'Gotland' }, { name: 'Mogador' },
                { name: '白露' }, { name: '巻雲' },
            ],
        },
    },
];