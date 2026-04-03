import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_61_1: TestFleetData[] = [
    {
        area: '61-1', routes: ['1-A-B-E'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: 'Roma' },
                { name: '矢矧' }, { name: '綾波' },
                { name: '白露' }, { name: 'Victorious' },
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
                { name: '夕立' }, { name: 'Nelson' },
                { name: '矢矧' }, { name: '綾波' },
                { name: '白露' }, { name: 'Victorious' },
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
                { name: '夕立' }, { name: 'Roma' },
                { name: '矢矧' }, { name: '綾波' },
                { name: '白露' }, { name: 'Victorious' },
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
                { name: '夕立' }, { name: 'Nelson' },
                { name: '矢矧' }, { name: '綾波' },
                { name: '白露' }, { name: 'Victorious' },
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
                { name: '夕立' }, { name: '満潮' },
                { name: '朝霜' }, { name: '陽炎' },
                { name: 'General Belgrano' }, { name: '最上' },
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
                { name: '夕立' }, { name: '満潮' },
                { name: '朝霜' }, { name: 'General Belgrano' },
                { name: '最上' }, { name: 'Italia' },
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
                { name: '満潮' }, { name: '朝霜' },
                { name: '陽炎' }, { name: '時雨' },
                { name: '夕雲' }, { name: '霰' },
                { name: '霞' },
            ],
        },
    },
];
