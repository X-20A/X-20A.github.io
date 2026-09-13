import { describe, expect, it } from "vitest";
import { build_fleet_from_fixture, ShipFixture } from "../generator/fixture";
import { QuestCompositionCondition } from "../../src/logic/quest/conditions/sortie";
import { calc_By17 } from "../../src/logic/quest/conditions/sortie/yearly";

const curry_test = (
    condition: QuestCompositionCondition,
) => (
    expected: boolean,
    main_fleet_ships: ShipFixture[],
): void => {
    expect(condition(build_fleet_from_fixture({ main_fleet_ships }))).toBe(expected);
}

describe('quest-test: 任務達成条件', () => {
    it('By17 「第九戦隊」抜錨！前線展開せよッ！', () => {
        const test = curry_test(calc_By17);

        // 旗艦・2番艦それぞれの艦名列挙
        test(true, [{ name: '北上改二' }, { name: '大井改二' }, { name: '吹雪' }, { name: '白雪' }]);
        test(true, [{ name: '北上改三' }, { name: '大井改二' }, { name: '吹雪' }, { name: '白雪' }]);
        test(true, [{ name: '大井改二' }, { name: '北上改二' }, { name: '吹雪' }, { name: '白雪' }]);
        test(true, [{ name: '大井改二' }, { name: '北上改三' }, { name: '吹雪' }, { name: '白雪' }]);

        // 艦種(雷巡)や改造前の艦名で判定していない
        test(false, [{ name: '北上改' }, { name: '大井改二' }, { name: '吹雪' }, { name: '白雪' }]);
        test(false, [{ name: '北上改二' }, { name: '大井改' }, { name: '吹雪' }, { name: '白雪' }]);

        // 旗艦・2番艦の位置であること
        test(false, [{ name: '阿武隈改二' }, { name: '北上改二' }, { name: '大井改二' }, { name: '吹雪' }, { name: '白雪' }]);
        test(false, [{ name: '北上改二' }, { name: '吹雪' }, { name: '大井改二' }, { name: '白雪' }]);

        // 駆逐2隻以上
        test(false, [{ name: '北上改二' }, { name: '大井改二' }, { name: '吹雪' }]);
        test(true, [{ name: '北上改二' }, { name: '大井改二' }, { name: '吹雪' }, { name: '白雪' }, { name: '初雪' }]);
    });
});
