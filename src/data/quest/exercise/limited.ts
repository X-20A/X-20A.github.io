import { ExerciseQuestData, LimitedExerciseQuestId } from ".";
import { calc_2409C1 } from "../../../logic/quest/conditions/exercise/limited";

export const LIMITED_EXERCISE_QUEST_DATAS = {
    '2409C1': {
        name: '【期間限定任務】「三十二駆」特別演習！',
        icon: 'Weekly',
        zekamashi_id: 'sanzyuuniku-tokubetuensyuu',
        condition: calc_2409C1,
    },
} as const satisfies Record<LimitedExerciseQuestId, ExerciseQuestData>;