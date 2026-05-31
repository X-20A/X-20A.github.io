import { LimitedSortieQuestId, SortieQuestData } from "../sortie";
import { calc_2412B5, calc_2605Bm1, calc_2605Bw1, calc_2605Bw2 } from "../../../logic/quest/conditions/sortie/limited";

export const LIMITED_SORTIE_QUEST_DATAS = {
    '2412B5': {
        name: '【期間限定任務】「三十二駆」月次戦闘哨戒！',
        icon: 'Monthly',
        zekamashi_id: 'sanzyuuniku-tukizisentousyoukai',
        target_areas: ['2-3', '7-1', '4-1', '5-1'],
        condition: calc_2412B5,
    },
    '2605Bw1': {
        name: '【梅雨限定任務】雨の南西諸島防衛戦2026',
        icon: 'Weekly',
        zekamashi_id: '2026tuyu-boueisen',
        target_areas: ['1-2', '1-4', '2-1', '2-2'],
        condition: calc_2605Bw1,
    },
    '2605Bw2': {
        name: '【梅雨限定任務】梅雨の海上護衛強化2026',
        icon: 'Weekly',
        zekamashi_id: '2026tuyu-kaizyougoei',
        target_areas: ['1-3', '1-5', '2-3', '7-4'],
        condition: calc_2605Bw2,
    },
    '2605Bm1': {
        name: '【梅雨任務拡張作戦】南方反攻望楼作戦を叩け！',
        icon: 'Monthly',
        zekamashi_id: '2026tuyu-nanpouhankou',
        target_areas: ['5-1', '5-2', '5-3', '5-4', '5-5', '5-6',],
        condition: calc_2605Bm1,
    },
} as const satisfies Record<LimitedSortieQuestId, SortieQuestData>;