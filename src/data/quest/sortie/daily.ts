import { DailySortieQuestId, SortieQuestData } from ".";
import { calc_Bd7 } from "../../../logic/quest/conditions/sortie/daily";

export const DAILY_SORTIE_QUEST_DATAS = {
    Bd7: {
        name: '南西諸島海域の制海権を握れ！',
        icon: 'Daily',
        zekamashi_id: 'nansei-seikaikenn',
        target_areas: ['2-1', '2-2', '2-3', '2-4', '2-5'],
        condition: calc_Bd7,
    },
} as const satisfies Record<DailySortieQuestId, SortieQuestData>;