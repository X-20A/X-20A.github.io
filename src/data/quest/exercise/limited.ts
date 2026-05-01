import { ExerciseQuestData, LimitedExerciseQuestId } from ".";
import { calc_2409C1, calc_2604Cw1 } from "../../../logic/quest/conditions/exercise/limited";

export const LIMITED_EXERCISE_QUEST_DATAS = {
    '2409C1': {
        name: '【期間限定任務】「三十二駆」特別演習！',
        icon: 'Weekly',
        zekamashi_id: 'sanzyuuniku-tokubetuensyuu',
        condition: calc_2409C1,
    },
    '2604Cw1': {
        name: '【13周年記念任務】記念祝賀艦隊演習！',
        icon: 'Weekly',
        zekamashi_id: 'kantai13syuunen-ensyuu',
        condition: calc_2604Cw1,
    }
} as const satisfies Record<LimitedExerciseQuestId, ExerciseQuestData>;