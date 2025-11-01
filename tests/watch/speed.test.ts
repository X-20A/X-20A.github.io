import { describe, expect, it } from "vitest";
import { EquipInDeck } from "../../src/types";
import { ASAHI, FLEY, HITOMI, HOSHO_KAI_NI, SAM_MK_2, SHIKINAMI, SHIPMAKAZE_KAI, YAMATO_KAI_NI, YAMATO_KAI_NI_JU } from "../assets/ship";
import { BuildTuple, SPEED_EXPECTS, SpeedExpect, SpeedKey } from "../expects/speed";
import { NakedShip } from "../../src/models/ship/NakedShip";
import { derive_equip } from "../../src/models/Equip";
import { derive_equipped_ship } from "../../src/models/ship/EquippedShip";
import { Sp as Speed } from "../../src/logic/speed/predicate";


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
});