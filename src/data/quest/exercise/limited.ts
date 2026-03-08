import { ExerciseQuestData, LimitedExerciseQuestId } from ".";
import { calc_2409C1, calc_2602C1, calc_2603C1 } from "../../../logic/quest/conditions/exercise/limited";

export const LIMITED_EXERCISE_QUEST_DATAS = {
    '2603C1': {
        name: '【桃の節句任務】桃の節句艦隊演習2026',
        icon: 'Weekly',
        zekamashi_id: '2026momonosekku-1',
        condition: calc_2603C1,
    },
    '2602C1': {
        name: 'バレンタイン2026限定任務【スイーツ演習】',
        icon: 'Weekly',
        zekamashi_id: '2026valentine-2',
        condition: calc_2602C1,
    },
    '2409C1': {
        name: '【期間限定任務】「三十二駆」特別演習！',
        icon: 'Weekly',
        zekamashi_id: 'sanzyuuniku-tokubetuensyuu',
        condition: calc_2409C1,
    },
} as const satisfies Record<LimitedExerciseQuestId, ExerciseQuestData>;