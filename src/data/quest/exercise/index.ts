import { QuestCompositionCondition } from "../../../logic/quest/conditions/sortie"
import { QuestIconType } from "../sortie"
import { QUARTERLY_EXERCISE_QUEST_DATAS } from "./quarterly"
import { YEARLY_EXERCISE_QUEST_DATAS } from "./yearly"

export type QuarterlyExerciseQuestId =
    | 'Cq1' | 'Cq2' | 'Cq3' | 'Cq4'

export type YearlyExerciseQuestId =
    | 'Cy3' | 'Cy4' | 'Cy10' | 'Cy12' | 'Cy8'
    | 'Cy5' | 'Cy9' | 'Cy13' | 'Cy6' | 'Cy11'
    | 'Cy14' | 'Cy15' | 'Cy1' | 'Cy2' | 'Cy7'
    | 'Cy16'

export type ExerciseQuestData = {
    readonly name: string,
    readonly icon: QuestIconType,
    readonly zekamashi_id: string,
    readonly condition: QuestCompositionCondition,
}

export type ExerciseQuestDatas =
    & Record<QuarterlyExerciseQuestId, ExerciseQuestData>
    & Record<YearlyExerciseQuestId, ExerciseQuestData>

export const EXERCISE_QUEST_DATAS = {
    ...QUARTERLY_EXERCISE_QUEST_DATAS,
    ...YEARLY_EXERCISE_QUEST_DATAS,
} as const satisfies ExerciseQuestDatas;