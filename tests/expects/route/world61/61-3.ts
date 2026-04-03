import { Ft } from "../../../../src/models/fleet/predicate";
import { TestFleetData } from "..";

export const TEST_FLEET_DATAS_61_3: TestFleetData[] = [
    {
        area: '61-3', routes: ['1-A-A1-A2-Q'],
        option: {
            'phase': '1',
        },
        fleet: {
            main_fleet_ships: [
                { name: '夕立' }, { name: '綾波' },
                { name: '長波' }, { name: '矢矧' },
                { name: '鳥海' }, { name: 'Richelieu' },
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
                { name: '夕立' }, { name: '綾波' },
                { name: '長波' }, { name: '矢矧' },
                { name: '鳥海' }, { name: 'Richelieu' },
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
                { name: '大和改二' }, { name: '武蔵' },
                { name: '翔鶴' }, { name: '加賀' },
                { name: 'Victorious' }, { name: 'Graf Zeppelin' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '北上改二' }, { name: '夕立' },
                { name: '綾波' }, { name: '時雨' },
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
                { name: '大和改二' }, { name: '武蔵' },
                { name: '翔鶴' }, { name: '加賀' },
                { name: 'Victorious' }, { name: 'Graf Zeppelin' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '北上改二' }, { name: '夕立' },
                { name: '綾波' }, { name: '時雨' },
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
                { name: '神通' }, { name: '最上' },
                { name: '霧島' }, { name: '翔鶴' },
                { name: '夕立' }, { name: '綾波' },
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
                { name: '神通' }, { name: '翔鶴' },
                { name: '飛龍' }, { name: '最上' },
                { name: '霧島' },
                {
                    name: 'Nelson',
                    equips: [
                        { name: '新型高温高圧缶' }, { name: '改良型艦本式タービン' },
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
                { name: '神通' }, { name: '翔鶴' },
                { name: '飛龍' }, { name: '最上' },
                { name: '霧島' }, { name: 'Nelson' },
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
                { name: '大和改二' }, { name: '武蔵' },
                { name: '瑞鳳' }, { name: '大鷹' },
                { name: '神通' }, { name: '矢矧' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '最上' },
                { name: '北上改二' }, { name: '夕立' },
                { name: '綾波' }, { name: '時雨' },
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
                { name: 'Warspite' }, { name: 'Valiant' },
                { name: '翔鶴' }, { name: '飛龍' },
                { name: '矢矧' }, { name: '神通' },
            ],
            escort_fleet_ships: [
                { name: '矢矧' }, { name: '鳥海' },
                { name: '夕立' }, { name: '綾波' },
                { name: '時雨' }, { name: '満潮' },
            ],
        },
    },
];
