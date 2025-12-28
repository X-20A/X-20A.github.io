import { DailyQuestId, QuestData } from ".";
import { calc_Bd7 } from "../../logic/quest/conditions/daily";

export const DAILY_QUEST_DATAS = {
    Bd7: {
        name: '南西諸島海域の制海権を握れ！',
        icon: 'Daily',
        zekamashi_id: 'nansei-seikaikenn',
        target_areas: ['2-1', '2-2', '2-3', '2-4', '2-5'],
        condition: calc_Bd7,
    },
} as const satisfies Record<DailyQuestId, QuestData>;