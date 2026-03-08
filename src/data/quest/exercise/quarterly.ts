import { ExerciseQuestData, QuarterlyExerciseQuestId } from ".";
import { calc_Cq1 } from "../../../logic/quest/conditions/exercise/quarterly";

export const QUARTERLY_EXERCISE_QUEST_DATAS = {
    Cq1: {
        name: '空母機動部隊、演習始め！',
        icon: 'Quarterly',
        zekamashi_id: 'kuubo-ensyuu',
        condition: calc_Cq1,
    },
} as const satisfies Record<QuarterlyExerciseQuestId, ExerciseQuestData>;