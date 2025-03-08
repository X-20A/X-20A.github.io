import { describe, it, expect } from 'vitest';
import Big from 'big.js';
import Sim from '@/classes/Sim';
import { getSimSet } from './setup';
import Const from '@/classes/const';
import type { AreaId, OptionsType } from '@/classes/types';

describe('Simテスト', () => {
    it('Simクラス内でエラーが発生しないこと、SimResult.rateが 1 と等しいことを確認', async () => {
        let limit = 0;
        while (limit < 10000) {
            const simSet = getSimSet();

            const adoptFleet = simSet.adoptFleet;
            const areaIds = simSet.areaIds;
            const selectableOptions = simSet.options;
            const defaultOptions = Const.OPTIONS;

            // 各シミュレーション実行用関数
            const runSim = async (areaId: AreaId, options: OptionsType) => {
                const sim = new Sim(adoptFleet, areaId, options);
                const result = await sim.start();
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
                if (adoptFleet.fleet_type_id > 0) console.log(adoptFleet.getEscortFleetNames());
                console.log(adoptFleet.fleet_type);
                console.log(JSON.stringify(simSet.deck));
                throw error;
            }

            limit++;
        }
    }, 100000);
});
