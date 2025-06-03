import { Sp as Speed } from "@/core/branch";
import EQUIP_DATAS, { EquipDatas } from "@/data/equip";
import SHIP_DATAS, { ShipDatas } from "@/data/ship";
import { createShip, Ship } from "@/models/Ship";
import { EquipInDeck } from "@/models/types";
import { brandFleetIndex, brandShipId, brandShipIndex, brandShipLv, FleetIndex, ShipAsw, ShipHp, ShipId, ShipIndex, ShipLuck, ShipLv } from "@/models/types/brand";
import { describe, it, expect } from "vitest";
import { BuildTuple, SPEED_EXPECTS, SpeedExpect, SpeedKey } from "./speedExpects";

type CreateShipFn = (
    equip_in_decks: EquipInDeck[],
) => Ship;

describe('艦速度テスト', () => {
    it('speed-test: 速度グループごとに想定される速度(装備込)になることを確認', async () => {
        const FLEET_INDEX = brandFleetIndex(1);
        const SHIP_INDEX = brandShipIndex(1);
        const SHIP_LV = brandShipLv(99);

        const pre_ship = makeCreateShip(
            FLEET_INDEX,
            SHIP_INDEX,
            SHIP_DATAS,
            EQUIP_DATAS,
            SHIP_LV,
        ); // ここまでどうでもいい

        // 高速A群
        const SHIMAKAZE_KAI_ID = brandShipId(229);
        cartesianEquipPattern(
            pre_ship(SHIMAKAZE_KAI_ID),
            SPEED_EXPECTS.FastA,
            'FastA',
        );
        // 高速B1群
        const YAMATO_KAI_NI_ID = brandShipId(911);
        cartesianEquipPattern(
            pre_ship(YAMATO_KAI_NI_ID),
            SPEED_EXPECTS.FastB1,
            'FastB1',
        );
        // 高速B2群
        const SHIKINAMI_ID = brandShipId(14);
        cartesianEquipPattern(
            pre_ship(SHIKINAMI_ID),
            SPEED_EXPECTS.FastB2,
            'FastB2',
        );
        // 高速C群
        const SAM_MK_2_ID = brandShipId(920);
        cartesianEquipPattern(
            pre_ship(SAM_MK_2_ID),
            SPEED_EXPECTS.FastC,
            'FastC',
        );
        // 低速A群
        const YAMATO_KAI_NI_JU_ID = brandShipId(916);
        cartesianEquipPattern(
            pre_ship(YAMATO_KAI_NI_JU_ID),
            SPEED_EXPECTS.SlowA,
            'SlowA',
        );
        // 低速B群
        const ASAHI_ID = brandShipId(953);
        cartesianEquipPattern(
            pre_ship(ASAHI_ID),
            SPEED_EXPECTS.SlowB,
            'SlowB',
        );
        // 低速C群
        const HITOMI_ID = brandShipId(494);
        cartesianEquipPattern(
            pre_ship(HITOMI_ID),
            SPEED_EXPECTS.SlowC,
            'SlowC',
        );
        // 低速D群
        const FLEY_ID = brandShipId(881);
        cartesianEquipPattern(
            pre_ship(FLEY_ID),
            SPEED_EXPECTS.SlowD,
            'SlowD',
        );
        // 低速E群
        const HOSHO_KAI_NI_ID = brandShipId(894);
        cartesianEquipPattern(
            pre_ship(HOSHO_KAI_NI_ID),
            SPEED_EXPECTS.SlowE,
            'SlowE',
        );
        
        function cartesianEquipPattern (
            create_ship_fn: CreateShipFn,
            expects: SpeedExpect,
            key: SpeedKey,
        ): void {
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

            const getSpeed = curryGetSpeed(create_ship_fn);
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
    });
});

/**
 * 艦船生成関数をカリー化し、装備パターンのみで速度を取得できる関数を返す。
 * @param create_ship_fn 艦船生成関数
 * @returns 装備パターンを受けて速度を返す関数
 */
function curryGetSpeed(create_ship_fn: CreateShipFn): (equip_in_decks: EquipInDeck[]) => Speed {
    return function (equip_in_decks: EquipInDeck[]): Speed {
        return create_ship_fn(equip_in_decks).speed;
    };
}

/**
 * createShipの三段階カリー化バージョン
 * @param fleet_index 艦隊番号
 * @param ship_index 艦番号
 * @param ship_datas 艦船データ
 * @param equip_datas 装備データ
 * @param lv レベル
 * @returns ship_idを受け取り、さらに装備・HP・ASW・運を受け取ってShipを返す関数
 */
export function makeCreateShip(
    fleet_index: FleetIndex,
    ship_index: ShipIndex,
    ship_datas: ShipDatas,
    equip_datas: EquipDatas,
    lv: ShipLv,
): (
    ship_id: ShipId
) => (
    equip_in_decks: EquipInDeck[],
) => Ship {
    return (ship_id: ShipId) => (
        equip_in_decks: EquipInDeck[],
    ) =>
        createShip(
            fleet_index,
            ship_index,
            ship_datas,
            equip_datas,
            lv,
            ship_id,
            equip_in_decks,
        );
}