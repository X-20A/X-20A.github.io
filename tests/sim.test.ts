import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import LZString from 'lz-string';
import axios from 'axios';
import {
    createSimControllerState,
    startSim,
} from '@/core/SimController';
import { getSimSet } from './setup';
import Const from '@/constants/const';
import { AreaId, OptionsType } from '@/models/types';
import { createCacheFleetsFromDeckBuilder } from '@/logic/deckBuilder';
import AdoptFleet from '@/core/AdoptFleet';
import { getParam } from '@/logic/url';
import { nomal_mock_datas, astray_mock_datas } from './mock';
import { node_datas, NT as NodeType } from '@/data/map';
import ship_datas, { ST as ShipType } from '@/data/ship';
import equip_datas, { EquipType } from '@/data/equip';
import { Ft } from '@/core/branch';

describe('Simテスト', () => {
    it(`rand-test: ランダムに生成した艦隊をSimクラスに渡してクラス内でエラーが発生しないこと、
        SimResult.rateが 1 と等しいことを確認`, async () => {
        let limit = 0;
        while (limit < 1000) {
            const simSet = getSimSet();

            const adoptFleet = simSet.adoptFleet;
            const areaIds = simSet.areaIds;
            const selectableOptions = simSet.options;
            const defaultOptions = Const.OPTIONS;

            // 各シミュレーション実行用関数
            const runSim = async (areaId: AreaId, options: OptionsType) => {
                const simState = createSimControllerState(adoptFleet, areaId, options);
                const result = await startSim(simState);
                // console.log(result);
                const totalRate = result.reduce(
                    (sum, item) => sum.plus(item.rate),
                    new Big(0)
                );
                expect(totalRate.toNumber()).toBe(1);
            };

            // 配列の配列から全組み合わせを生成するヘルパー関数 デカルト積っていうらしいよ
            const cartesian = <T>(arrays: T[][]): T[][] => {
                return arrays.reduce<T[][]>(
                    (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
                    [[]]
                );
            };

            let debug_area_id: AreaId = '1-1';
            let debug_option: Record<string, string> | undefined;

            try {
                for (var area_id of areaIds) { // area_idは任意に再設定できるように
                    // area_id = '60-1';
                    debug_area_id = area_id;
                    // console.log('テスト海域: ', area_id);
                    // if (adoptFleet.fleet_type_id > 0 && Number(area_id.split('-')[0]) > 7) continue; // 連合艦隊なら通常海域除外
                    if (selectableOptions[area_id]) {
                        // 該当海域に選択肢がある場合、キーごとに全組み合わせを生成する
                        const area_option = selectableOptions[area_id];
                        const keys = Object.keys(area_option);
                        // 各キーに対して、{ key, value }の形で配列を作成
                        const optionsPerKey = keys.map(key =>
                            area_option[key].map(value => ({ key, value }))
                        );
                        // キーごとの全組み合わせを生成
                        const combinations = cartesian(optionsPerKey);

                        // 各組み合わせごとにシミュレーションを実行
                        for (const combination of combinations) {
                            // defaultOptionsをコピーして更新
                            const updatedOptions = { ...defaultOptions };
                            if (!updatedOptions[area_id]) {
                                updatedOptions[area_id] = {};
                            }
                            for (const { key, value } of combination) {
                                updatedOptions[area_id]![key] = value;
                            }
                            debug_option = updatedOptions[area_id];
                            // console.log('option: ', updatedOptions[area_id]);
                            await runSim(area_id, updatedOptions);

                            // throw new Error('エラー時処理テスト');
                        }
                    } else {
                        // 選択肢がなければデフォルトで実行
                        await runSim(area_id, defaultOptions);
                    }
                }
            } catch (error) {
                console.error('Error occurred:', error);
                console.log('area: ', debug_area_id);
                console.log('option: ', debug_option);
                console.log(adoptFleet.getMainFleetNames());
                if (adoptFleet.fleet_type > 0) console.log(adoptFleet.getEscortFleetNames());
                console.log(adoptFleet.fleet_type);
                console.log(JSON.stringify(simSet.deck));
                throw error;
            }

            limit++;
        }
    }, 30000);

    it('route-test: モック艦隊をSimにかけて、正しいルートを返すことを確認', async () => {
        const mock_datas = nomal_mock_datas.concat(astray_mock_datas);

        for (const mock_data of mock_datas) {
            // 海域
            const area_id = mock_data.area;

            // 艦隊

            const debug_deck =
                mock_data.deck.replaceAll('https://x-20a.github.io', 'http://localhost:5173/compass/');

            const compressed_deck = getParam('pdz', mock_data.deck)!;
            const deck_string = LZString.decompressFromEncodedURIComponent(compressed_deck);
            const deck = JSON.parse(deck_string);
            const cache_fleets = createCacheFleetsFromDeckBuilder(
                deck,
                ship_datas,
                equip_datas,
            );
            const fleet_type_id = deck!.f1!.t as Ft;
            const adoptFleet = new AdoptFleet(
                cache_fleets,
                fleet_type_id,
                [999, 999, 999, 999],
            );

            const expected_routes = mock_data.routes;
            for (const expected_route of expected_routes) {
                // option
                const mock_option = mock_data.option;
                const nodes = expected_route.split('-');
                for (const [index, node] of nodes.entries()) { // nodeデータから能動分岐自動セット
                    if (node_datas[area_id][node][2] === NodeType.ac) {
                        mock_option[node] = nodes[index + 1];
                    }
                }
                const options = Const.OPTIONS;
                options[area_id] = { ...options[area_id], ...mock_option };
                
                const simState = createSimControllerState(adoptFleet, area_id, options);
                const result = startSim(simState);
                const actual_route = result[0].route.join('-');

                if (expected_route !== actual_route) {
                    console.log(`海域: ${area_id}`);
                    console.log('option: ', options);
                    console.log(`期待: ${expected_route}`);
                    console.log(`実際: ${actual_route}`);
                    console.log(
                        'deck: ',
                        debug_deck,
                    );
                }

                expect(expected_route).toBe(actual_route);
            }
        }
    });

    it('data-test: 制空シミュのデータと照合して艦や装備に抜けや不一致が無いか確認', async () => {
        // Cors回避のために別途プロキシサーバを起動してから
        const response = await axios.get(
            'http://localhost:3000/proxy'
        );
        expect(response.status).toBe(200); // 通信成功確認

        type MasterShip = {
            id: number,
            name: string,
            type: ShipType,
            min_scout: number,
            scout: number,
        }
        type MasterItem = {
            id: number,
            name: string,
            type: EquipType,
            scout: number,
        }
        const master = response.data;
        const ac_ships: MasterShip[] = master.ships;
        const ac_items: MasterItem[] = master.items;

        type MissingShip = {
            id: number,
            ship_name: string,
            type: ShipType,
            seek: number,
            seek2: number,
        }
        type MismatchShipParam = {
            param: 'name' | 'type' | 'seek' | 'seek2',
            ship_name: string,
            master_param: number | string,
        }
        const missing_ships = [] as MissingShip[];
        const mismatch_ship_params = [] as MismatchShipParam[];
        for (const ac_ship of ac_ships) { // 艦データ照合
            const id = ac_ship.id;

            const ship = ship_datas[id];
            if (!ship) {
                missing_ships.push({
                    id: id,
                    ship_name: ac_ship.name,
                    type: ac_ship.type,
                    seek: ac_ship.min_scout,
                    seek2: ac_ship.scout,
                });
                continue;
            }

            if (ac_ship.name !== ship.name) {
                mismatch_ship_params.push({
                    param: 'name',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.name,
                });
            }

            if (ac_ship.type !== ship.type) {
                // こちらでは高速戦艦と低速戦艦をデータでは区別しない
                if (!(Number(ac_ship.type) === 8 && ship.type === ShipType.BB)) {
                    mismatch_ship_params.push({
                        param: 'type',
                        ship_name: ac_ship.name,
                        master_param: ac_ship.type,
                    });
                }
            }

            if (ac_ship.min_scout !== ship.seek) {
                mismatch_ship_params.push({
                    param: 'seek',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.min_scout,
                });
            }

            if (ac_ship.scout !== ship.seek2) {
                mismatch_ship_params.push({
                    param: 'seek2',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.scout,
                });
            }
        }
        if (missing_ships.length) console.log('艦に不足: ', missing_ships);
        if (mismatch_ship_params.length) console.log('艦パラメータ不一致: ', mismatch_ship_params);

        // 空であることを確認
        expect(missing_ships.length).toBe(0);
        expect(mismatch_ship_params.length).toBe(0);

        type MissingEquip = {
            id: number,
            name: string,
            seek: number,
            equip_type: EquipType,
        }
        type MismatchEquipParam = {
            name: string,
            param: 'type' | 'seek',
            master_param: number,
        }
        const missing_equips = [] as MissingEquip[];
        const mismatch_equip_params = [] as MismatchEquipParam[];
        for (const ac_item of ac_items) { // 装備データ照合
            const id = ac_item.id;
            // 深海、[陸攻、陸戦、陸偵、深山] 弾き
            if (id > 1500 || [47, 48, 49, 53].includes(Number(ac_item.type))) continue;

            const equip = equip_datas[id];
            if (!equip) {
                missing_equips.push({
                    id: id,
                    name: ac_item.name,
                    seek: ac_item.scout,
                    equip_type: ac_item.type,
                });
                continue;
            }

            if (ac_item.type !== equip[1]) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'type',
                    master_param: ac_item.type,
                });
            }

            if (ac_item.scout !== equip[0]) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'seek',
                    master_param: ac_item.scout,
                });
            }
        }

        if (missing_equips.length) console.log('装備に不足: ', missing_equips);
        if (mismatch_equip_params.length) console.log('装備パラメータ不一致: ', mismatch_equip_params);

        // 空であることを確認
        expect(missing_equips.length).toBe(0);
        expect(mismatch_equip_params.length).toBe(0);
    });
});
