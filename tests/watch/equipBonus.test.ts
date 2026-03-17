import { describe, expect, it } from "vitest";
import { calc_equip_bonus } from "../../src/logic/seek/equipBonus";
import { build_ship_from_fixture } from "../generator/fixture";
import { EquippedShip } from "../../src/models/ship/EquippedShip";

describe('bonus-test: 装備ボーナス', () => {
    it('単発付与', () => {
        const test = (
            expected: number,
            ship: EquippedShip,
        ): void => {
            expect(expected).toBe(calc_equip_bonus(
                ship.name,
                ship.base_name,
                ship.type,
                ship.national,
                ship.equips,
            ));
        }

        test(3, build_ship_from_fixture({
            equips: [{ name: 'SG レーダー(初期型)' }],
            name: '雪風改二',
        }))

        test(4, build_ship_from_fixture({
            equips: [{ name: 'SG レーダー(初期型)' }],
            name: 'Atlanta',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'SG レーダー(後期型)' }],
            name: '丹陽',
        }))

        test(4, build_ship_from_fixture({
            equips: [{ name: 'SG レーダー(後期型)' }],
            name: 'Atlanta',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'SG レーダー(後期型)' }],
            name: 'Sheffield',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: 'SK レーダー' }],
            name: 'Atlanta',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'SK+SG レーダー' }],
            name: 'Atlanta',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: 'SK+SG レーダー' }],
            name: 'Sheffield',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '逆探(E27)+22号対水上電探改四(後期調整型)' }],
            name: '清霜改二丁',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '逆探(E27)+22号対水上電探改四(後期調整型)' }],
            name: '朝霜改二',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '逆探(E27)+22号対水上電探改四(後期調整型)' }],
            name: '吹雪',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探' }],
            name: '秋月',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探改二' }],
            name: '秋月',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探' }],
            name: '最上改',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '紫雲' }],
            name: '大淀',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '紫雲', improvement_lv: 10 }],
            name: '大淀',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'SOC Seagull' }],
            name: 'Atlanta',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'SOC Seagull', improvement_lv: 4 }],
            name: 'Atlanta',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: 'SOC Seagull' }],
            name: 'Colorado',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'Ar196改' }],
            name: 'Bismarck',
        }))

        test(6, build_ship_from_fixture({
            equips: [{ name: 'Fairey Seafox改' }],
            name: 'Gotland',
        }))

        test(5, build_ship_from_fixture({
            equips: [{ name: 'Fairey Seafox改' }],
            name: 'Nelson',
        }))

        test(4, build_ship_from_fixture({
            equips: [{ name: 'Fairey Seafox改' }],
            name: 'Commandant Teste',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'Fairey Seafox改' }],
            name: 'Warspite',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'Swordfish Mk.II改(水偵型)' }],
            name: 'Warspite',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'Swordfish Mk.II改(水偵型)' }],
            name: 'Nelson',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: 'Swordfish Mk.II改(水偵型)' }],
            name: 'Commandant Teste',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'Laté 298B' }],
            name: 'Commandant Teste',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'SO3C Seamew改' }],
            name: 'Atlanta',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'Swordfish Mk.III改(水上機型/熟練)' }],
            name: 'Gotland',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: 'Swordfish Mk.III改(水上機型)' }],
            name: 'Gotland',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: 'Swordfish(水上機型)' }],
            name: 'Gotland',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '装甲艇(AB艇)' }],
            name: '神州丸',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '装甲艇(AB艇)' }],
            name: 'あきつ丸',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '装甲艇(AB艇)' }],
            name: '吹雪',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '武装大発' }],
            name: '神州丸',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '水雷戦隊 熟練見張員' }],
            name: '吹雪',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '水雷戦隊 熟練見張員' }],
            name: '夕張',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '熟練見張員' }],
            name: '吹雪',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '熟練見張員' }],
            name: '夕張',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '熟練見張員' }],
            name: '妙高',
        }))

        test(5, build_ship_from_fixture({
            equips: [{ name: '紫雲(熟練)', improvement_lv: 1 }],
            name: '大淀改',
        }))

        test(6, build_ship_from_fixture({
            equips: [{ name: '紫雲(熟練)', improvement_lv: 4 }],
            name: '大淀改',
        }))

        test(3, build_ship_from_fixture({
            equips: [{ name: '零式小型水上機' }],
            name: '伊168',
        }))

        test(4, build_ship_from_fixture({
            equips: [{ name: '零式小型水上機(熟練)' }],
            name: '伊168',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'Type281 レーダー' }],
            name: 'Sheffield',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '彩雲(偵四)', improvement_lv: 2 }],
            name: '翔鶴',
        }))

        test(5, build_ship_from_fixture({
            equips: [{ name: 'Walrus' }],
            name: 'Nelson',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: 'Walrus' }],
            name: 'Warspite',
        }))

        test(2, build_ship_from_fixture({
            equips: [{ name: '天山一二型甲改二(村田隊/電探装備)' }],
            name: '翔鶴改二',
        }))

        test(1, build_ship_from_fixture({
            equips: [{ name: '天山一二型甲改二(村田隊/電探装備)' }],
            name: '瑞鶴改二',
        }))
    });

    it('重複不可', () => {
        const test = (
            expected: number,
            ship: EquippedShip,
        ): void => {
            expect(expected).toBe(calc_equip_bonus(
                ship.name,
                ship.base_name,
                ship.type,
                ship.national,
                ship.equips,
            ));
        }

        // 同じ装備を複数積んでも重複不可
        test(3, build_ship_from_fixture({
            equips: [
                { name: 'SG レーダー(初期型)' },
                { name: 'SG レーダー(初期型)' }
            ],
            name: '雪風改二',
        }))

        // 異なる装備は別カウント
        test(6, build_ship_from_fixture({
            equips: [
                { name: 'SG レーダー(初期型)' },
                { name: 'SG レーダー(後期型)' }
            ],
            name: '雪風改二',
        }))
    });

    it('重複可', () => {
        const test = (
            expected: number,
            ship: EquippedShip,
        ): void => {
            expect(expected).toBe(calc_equip_bonus(
                ship.name,
                ship.base_name,
                ship.type,
                ship.national,
                ship.equips,
            ));
        }

        // 複数装備の合計
        test(5, build_ship_from_fixture({
            equips: [
                { name: 'SG レーダー(初期型)' },
                { name: 'SK レーダー' }
            ],
            name: 'Atlanta',
        }))

        // 21号対空電探 - 秋月
        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探' }],
            name: '秋月',
        }))

        // 21号対空電探改二 - 秋月
        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探改二' }],
            name: '秋月',
        }))

        // 21号対空電探 - 最上改
        test(2, build_ship_from_fixture({
            equips: [{ name: '21号対空電探' }],
            name: '最上改',
        }))
    });
});