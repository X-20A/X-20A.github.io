import { LimitedSortieQuestId, SortieQuestData } from "../sortie";
import { calc_2412B5 } from "../../../logic/quest/conditions/sortie/limited";

export const LIMITED_SORTIE_QUEST_DATAS = {
    '2412B5': {
        name: '【期間限定任務】「三十二駆」月次戦闘哨戒！',
        icon: 'Monthly',
        zekamashi_id: 'sanzyuuniku-tukizisentousyoukai',
        target_areas: ['2-3', '7-1', '4-1', '5-1'],
        condition: calc_2412B5,
    },
} as const satisfies Record<LimitedSortieQuestId, SortieQuestData>;