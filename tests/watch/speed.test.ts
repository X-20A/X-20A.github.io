import { describe, expect, it } from "vitest";
import { EquipInDeck, ShipData } from "../../src/types";
import { ASAHI, FLEY, HITOMI, HOSHO_KAI_NI, SAM_MK_2, SHIKINAMI, SHIPMAKAZE_KAI, YAMATO_KAI_NI, YAMATO_KAI_NI_JU } from "../assets/ship";
import { BuildTuple, SPEED_EXPECTS, SpeedExpect, SpeedKey } from "../expects/speed";
import { NakedShip } from "../../src/models/ship/NakedShip";
import { derive_equip } from "../../src/models/Equip";
import { derive_equipped_ship } from "../../src/models/ship/EquippedShip";
import { Sp as Speed } from "../../src/logic/speed/predicate";
import { ShipName } from "../../src/types/shipName";
import SHIP_DATAS, { SG, ST } from "../../src/data/ship";
import { includes_ship_name, includes_ship_type } from "../../src/models/ship/predicate";
import { get_ACSim_master_data } from "../gateway";
import { ShipId } from "../../src/types/shipId";


/** 改良型艦本式タービン */
const TURBINE: EquipInDeck = {
    id: 33,
    improvement: 0,
    is_ex: false,
}

/** 強化型艦本式缶 */
const NORMAL_KAN: EquipInDeck = {
    id: 34,
    improvement: 0,
    is_ex: false,
}

/** 新型高温高圧缶 */
const NEW_KAN: EquipInDeck = {
    id: 87,
    improvement: 0,
    is_ex: false,
}

/** 新型高温高圧缶★7 */
const POWER_KAN: EquipInDeck = {
    id: 87,
    improvement: 7,
    is_ex: false,
}

describe('艦速度テスト', () => {
    it('speed-test: 速度グループごとに想定される速度(装備込)になることを確認', async () => {
        // 高速A群
        cartesianEquipPattern(
            SHIPMAKAZE_KAI,
            SPEED_EXPECTS.FastA,
            'FastA',
        );
        // 高速B1群
        cartesianEquipPattern(
            YAMATO_KAI_NI,
            SPEED_EXPECTS.FastB1,
            'FastB1',
        );
        // 高速B2群
        cartesianEquipPattern(
            SHIKINAMI,
            SPEED_EXPECTS.FastB2,
            'FastB2',
        );
        // 高速C群
        cartesianEquipPattern(
            SAM_MK_2,
            SPEED_EXPECTS.FastC,
            'FastC',
        );
        // 低速A群
        cartesianEquipPattern(
            YAMATO_KAI_NI_JU,
            SPEED_EXPECTS.SlowA,
            'SlowA',
        );
        // 低速B群
        cartesianEquipPattern(
            ASAHI,
            SPEED_EXPECTS.SlowB,
            'SlowB',
        );
        // 低速C群
        cartesianEquipPattern(
            HITOMI,
            SPEED_EXPECTS.SlowC,
            'SlowC',
        );
        // 低速D群
        cartesianEquipPattern(
            FLEY,
            SPEED_EXPECTS.SlowD,
            'SlowD',
        );
        // 低速E群
        cartesianEquipPattern(
            HOSHO_KAI_NI,
            SPEED_EXPECTS.SlowE,
            'SlowE',
        );
        
        function cartesianEquipPattern (
            ship: NakedShip,
            expects: SpeedExpect,
            key: SpeedKey,
        ): void {
            const getSpeed = curryGetSpeed(ship);
            const result: BuildTuple<Speed, 19> = [
                getSpeed([]), // すっぴん

                getSpeed([POWER_KAN]),
                getSpeed([POWER_KAN, POWER_KAN]),
                getSpeed([TURBINE, NORMAL_KAN]),
                getSpeed([TURBINE, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NORMAL_KAN, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NORMAL_KAN, NORMAL_KAN, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, POWER_KAN]),
                getSpeed([TURBINE, NEW_KAN]),
                getSpeed([TURBINE, NEW_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NEW_KAN, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NEW_KAN, NORMAL_KAN, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, POWER_KAN, POWER_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN, NORMAL_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN, NEW_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN, NEW_KAN, NORMAL_KAN]),
                getSpeed([TURBINE, NEW_KAN, NEW_KAN, NEW_KAN, NEW_KAN]),
            ];

            console.log('check at ', key);

            // 装備不可で検証データなし
            const is_not_SlowD = key !== 'SlowD';

            expect(expects[0]).toBe(result[0]);

            expect(expects[1]).toBe(result[1]);
            expect(expects[2]).toBe(result[2]);
            expect(expects[3]).toBe(result[3]);
            expect(expects[4]).toBe(result[4]);
            expect(expects[5]).toBe(result[5]);
            if (is_not_SlowD) expect(expects[6]).toBe(result[6]);
            expect(expects[7]).toBe(result[7]);
            expect(expects[8]).toBe(result[8]);
            expect(expects[9]).toBe(result[9]);
            expect(expects[10]).toBe(result[10]);
            if (is_not_SlowD) expect(expects[11]).toBe(result[11]);
            expect(expects[12]).toBe(result[12]);
            expect(expects[13]).toBe(result[13]);
            expect(expects[14]).toBe(result[14]);
            if (is_not_SlowD) expect(expects[15]).toBe(result[15]);
            expect(expects[16]).toBe(result[16]);
            if (is_not_SlowD) expect(expects[17]).toBe(result[17]);
            if (is_not_SlowD) expect(expects[18]).toBe(result[18]);
        }
        function curryGetSpeed(ship: NakedShip): (equip_in_decks: EquipInDeck[]) => Speed {
            return function (equip_in_decks: EquipInDeck[]): Speed {
                const equips = equip_in_decks.map(deck => 
                    derive_equip(
                        deck.id,
                        deck.improvement,
                        deck.is_ex,
                    )
                );
                const equipped_ship =  derive_equipped_ship(
                    ship,
                    equips,
                );

                return equipped_ship.speed;
            };
        }
    });
    it('speed-test: wikiのグループ振り分けとデータが一致するか確認', async () => {
        const master = await get_ACSim_master_data();
        const master_ships: any[] = master.ships;

        const verification = (
            expected_group: SG,
            data: ShipData,
        ): void => {
            if (
                expected_group !== data.sg
            ) throw new Error(`
                不一致: ${data.name}
                期待値: ${expected_group}
                data: ${data.sg}
            `);
        }

        const is_both_base = (
            target_base_name: ShipName,
            search_name: ShipName,
        ): boolean => {
            const target_ship =
                master_ships.find(master_ship => master_ship.name === target_base_name);
            if (!target_ship) throw new Error(`指定された艦が見つかりません: ${target_base_name}`);

            const search_ship =
                master_ships.find(master_ship => master_ship.name === search_name);
            if (!search_ship) throw new Error(`指定された艦が見つかりません: ${search_name}`);         

            return target_ship.orig === search_ship.orig;
        }
        
        const extract_class_id_from_name = (
            name: ShipName,
        ): number => {
            const target_ship =
                master_ships.find(master_ship => master_ship.name === name);
            if (!target_ship) throw new Error(`指定された艦が見つかりません: ${name}`);

            return target_ship.type2;
        }

        const IOWA_CLASS_ID = extract_class_id_from_name('Iowa');
        const SOUTH_DAKOTA_CLASS_ID = extract_class_id_from_name('South Dakota');
        const NORTH_CAROLINA_CLASS_ID = extract_class_id_from_name('Washington');
        const GRORIOUS_CLASS_ID = extract_class_id_from_name('Glorious');
        const KONGOU_CLASS_ID = extract_class_id_from_name('金剛');
        const RICHELIEU_CLASS_ID = extract_class_id_from_name('Richelieu');
        const V_VENETO_CLASS_ID = extract_class_id_from_name('Littorio');
        const SHOKAKU_CLASS_ID = extract_class_id_from_name('翔鶴');
        const SHOHO_CLASS_ID = extract_class_id_from_name('祥鳳');
        const INDEPENDENCE_CLASS_ID = extract_class_id_from_name('Langley');
        const TONE_CLASS_ID = extract_class_id_from_name('利根');
        const MOGAMI_CLASS_ID = extract_class_id_from_name('最上');
        const AGANO_CLASS_ID = extract_class_id_from_name('阿賀野');

        const equal_class_id_with_name = (
            class_id: number,
            name: ShipName,
        ): boolean => {
            return extract_class_id_from_name(name) === class_id;
        }

        const assign_to_group = (
            data: ShipData,
        ): void => {
            const {
                name,
                type,
            } = data;

            // 艦名
            if (
                includes_ship_name(['天津風改二'], name) ||
                is_both_base('大鳳', name) ||
                is_both_base('島風', name) ||
                is_both_base('Ташкент', name)
            ) {
                verification(SG.FastA, data);
                return;
            }
            if (
                includes_ship_name(['大和改二', '天津風', '天津風改'], name) ||
                is_both_base('蒼龍', name) ||
                is_both_base('飛龍', name) ||
                is_both_base('雲龍', name) ||
                is_both_base('天城', name)
            ) {
                verification(SG.FastB1, data);
                return;
            }
            if (
                includes_ship_name([
                    '龍鳳改二',
                    '千歳航', '千歳航改', '千歳航改二',
                    '千代田航', '千代田航改', '千代田航改二',
                    'Conte di Cavour改', 'Conte di Cavour nuovo',
                ], name) ||
                is_both_base('Bismarck', name) ||
                is_both_base('Littorio', name) ||
                is_both_base('赤城', name) ||
                is_both_base('葛城', name) ||
                is_both_base('龍驤', name)
            ) {
                verification(SG.FastB2, data);
                return;
            }
            if (
                is_both_base('加賀', name) ||
                includes_ship_name(['夕張', '夕張改', 'Samuel B.Roberts Mk.II'], name)
            ) {
                verification(SG.FastC, data);
                return;
            }
            if (
                includes_ship_name([
                    '長門改二', '陸奥改二',
                    '大和', '大和改', '大和改二重', '武蔵', '武蔵改', '武蔵改二',
                ], name)
            ) {
                verification(SG.SlowA, data);
                return;
            }
            if (
                is_both_base('瑞穂', name) ||
                is_both_base('秋津洲', name) ||
                is_both_base('Commandant Teste', name) ||
                is_both_base('神威', name) ||
                is_both_base('神州丸', name) ||
                is_both_base('朝日', name) ||
                is_both_base('宗谷', name) ||
                is_both_base('山汐丸', name) ||
                is_both_base('熊野丸', name) ||
                is_both_base('しまね丸', name) ||
                is_both_base('南海', name) ||
                is_both_base('大泊', name) ||
                is_both_base('第百一号輸送艦', name)
            ) {
                verification(SG.SlowB, data);
                return;
            }
            if (
                includes_ship_name(['Samuel B.Roberts', 'Samuel B.Roberts改', '夕張改二特'], name)
            ) {
                verification(SG.SlowB2, data);
                return;
            }
            if (
                is_both_base('加賀', name) ||
                is_both_base('あきつ丸', name) ||
                is_both_base('速吸', name) ||
                is_both_base('明石', name)
            ) {
                verification(SG.SlowC, data);
                return;
            }
            if (
                is_both_base('伊201', name) ||
                is_both_base('伊203', name) ||
                name === '稲木改二'
            ) {
                verification(SG.SlowD, data);
                return;
            }
            if (
                includes_ship_name(['鳳翔改二', '鳳翔改二戦'], name)
            ) {
                verification(SG.SlowE, data);
                return;
            }

            // 艦型
            if (
                equal_class_id_with_name(SHOKAKU_CLASS_ID, name) ||
                equal_class_id_with_name(TONE_CLASS_ID, name) ||
                equal_class_id_with_name(MOGAMI_CLASS_ID, name)
            ) {
                verification(SG.FastA, data);
                return;
            }
            if (
                equal_class_id_with_name(IOWA_CLASS_ID, name) ||
                equal_class_id_with_name(KONGOU_CLASS_ID, name) ||
                equal_class_id_with_name(AGANO_CLASS_ID, name)
            ) {
                verification(SG.FastB1, data);
                return;
            }
            if ( // データでBBとSBBを区別してないのでここで吸収
                equal_class_id_with_name(SOUTH_DAKOTA_CLASS_ID, name) ||
                equal_class_id_with_name(NORTH_CAROLINA_CLASS_ID, name) ||
                equal_class_id_with_name(GRORIOUS_CLASS_ID, name) ||
                equal_class_id_with_name(RICHELIEU_CLASS_ID, name) ||
                equal_class_id_with_name(V_VENETO_CLASS_ID, name) ||
                equal_class_id_with_name(SHOHO_CLASS_ID, name) ||
                equal_class_id_with_name(INDEPENDENCE_CLASS_ID, name)
            ) {
                verification(SG.FastB2, data);
                return;
            }

            // 艦種
            if (
                includes_ship_type([ST.CV, ST.CVB, ST.CA, ST.CL, ST.CLT, ST.DD], type)
            ) {
                verification(SG.FastB2, data);
                return;
            }
            if (type === ST.AV) {
                verification(SG.FastC, data);
                return;
            }
            if (
                // 稲木改二以外の海防艦はそもそも速力グループが割り振られていないが便宜上ここ
                includes_ship_type([ST.BB, ST.BBV, ST.CVL, ST.AV, ST.CT, ST.AS, ST.DE], type)
            ) {
                verification(SG.SlowB, data);
                return;
            }
            if (
                includes_ship_type([ST.SS, ST.SSV, ST.AR], type)
            ) {
                verification(SG.SlowC, data);
                return;
            }

            throw new Error(`速度振り分けに漏れ: ${name}`);
        }

        Object.keys(SHIP_DATAS).forEach(id_string => {
            const id = id_string as unknown as ShipId;
            const data = SHIP_DATAS[id];

            assign_to_group(data);
        })
    });
});