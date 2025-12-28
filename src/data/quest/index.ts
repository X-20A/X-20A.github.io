import { QuestCompositionCondition } from "../../logic/quest/conditions";
import { NormalAreaId } from "../../types";
import { DAILY_QUEST_DATAS } from "./daily";
import { MONTHLY_QUEST_DATAS } from "./monthly";
import { QUARTERLY_QUEST_DATAS } from "./quaterly";
import { WEEKLY_QUEST_DATAS } from "./weekly";
import { YEARLY_QUEST_DATAS } from "./yearly";

export type DailyQuestId =
    | 'Bd7'

export type WeeklyQuestId =
    | 'Bw6' | 'Bw7' | 'Bw8' | 'Bw9' | 'Bw10'

export type MonthlyQuestId =
    | 'Bm1' | 'Bm2' | 'Bm3' | 'Bm4' | 'Bm5'
    | 'Bm6' | 'Bm7' | 'Bm8'

export type QuarterlyQuestId =
    | 'Bq1' | 'Bq2' | 'Bq3' | 'Bq4' | 'Bq5'
    | 'Bq6' | 'Bq7' | 'Bq8' | 'Bq9' | 'Bq10'
    | 'Bq11' | 'Bq12' | 'Bq13'

export type YearlyQuestId =
    | 'By13' | 'By1' | 'By2' | 'By3' | 'By4'
    | 'By11' | 'By12' | 'By14' | 'By6' | 'By7'
    | 'By8' | 'By9' | 'By10' | 'By5' | 'By15'

export type Month =
    | 1 | 2 | 3 | 4 | 5 | 6
    | 7 | 8 | 9 | 10 | 11 | 12

export type QuestId =
    | DailyQuestId
    | WeeklyQuestId
    | MonthlyQuestId
    | QuarterlyQuestId
    | YearlyQuestId

type SpecificNodeSet = {
    area: NormalAreaId,
    specific_node: string,
}

export const TEMPLATE_1_6: SpecificNodeSet = {
    area: '1-6',
    specific_node: 'N',
} as const;

export type TargetNodeInfo = NormalAreaId | SpecificNodeSet

export type QuestData = {
    readonly name: string,
    readonly icon: string,
    readonly zekamashi_id: string,
    readonly target_areas: TargetNodeInfo[],
    readonly condition: QuestCompositionCondition,
}

export type QuestDatas =
    & Record<DailyQuestId, QuestData>
    & Record<WeeklyQuestId, QuestData>
    & Record<MonthlyQuestId, QuestData>
    & Record<QuarterlyQuestId, QuestData>
    & Record<YearlyQuestId, QuestData>

export const QUEST_DATAS = {
    ...DAILY_QUEST_DATAS,
    ...WEEKLY_QUEST_DATAS,
    ...MONTHLY_QUEST_DATAS,
    ...QUARTERLY_QUEST_DATAS,
    ...YEARLY_QUEST_DATAS,
} as const satisfies QuestDatas;
