import { ExerciseQuestData, QuarterlyExerciseQuestId } from ".";
import { calc_Cq1, calc_Cq2, calc_Cq3, calc_Cq4 } from "../../../logic/quest/conditions/exercise/quarterly";

export const QUARTERLY_EXERCISE_QUEST_DATAS = {
    Cq1: {
        name: '空母機動部隊、演習始め！',
        icon: 'Quarterly',
        zekamashi_id: 'kuubo',
        condition: calc_Cq1,
    },
    Cq2: {
        name: '「十八駆」演習！',
        icon: 'Quarterly',
        zekamashi_id: 'zyuuhati',
        condition: calc_Cq2,
    },
    Cq3: {
        name: '「十九駆」演習！',
        icon: 'Quarterly',
        zekamashi_id: 'zyuukyuu-ensyu',
        condition: calc_Cq3,
    },
    Cq4: {
        name: '小艦艇群演習強化任務',
        icon: 'Quarterly',
        zekamashi_id: 'kogatateigun',
        condition: calc_Cq4,
    },
} as const satisfies Record<QuarterlyExerciseQuestId, ExerciseQuestData>;