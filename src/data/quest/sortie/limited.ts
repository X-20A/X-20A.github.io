import { LimitedSortieQuestId, SortieQuestData } from "../sortie";
import { calc_2412B5, calc_2602B1 } from "../../../logic/quest/conditions/sortie/limited";

export const LIMITED_SORTIE_QUEST_DATAS = {
    '2412B5': {
        name: '【期間限定任務】「三十二駆」月次戦闘哨戒！',
        icon: 'Monthly',
        zekamashi_id: 'sanzyuuniku-tukizisentousyoukai',
        target_areas: ['2-3', '7-1', '4-1', '5-1'],
        condition: calc_2412B5,
    },
    '2602B1': {
        name: 'バレンタイン2026特別限定任務',
        icon: 'Weekly',
        zekamashi_id: '2026valentine-1',
        target_areas: ['1-3', '1-4', '2-1'],
        condition: calc_2602B1,
    },
} as const satisfies Record<LimitedSortieQuestId, SortieQuestData>;