import { QuestCompositionCondition } from "../../../logic/quest/conditions/sortie";
import { NormalAreaId } from "../../../types";
import { DAILY_SORTIE_QUEST_DATAS } from "./daily";
import { LIMITED_SORTIE_QUEST_DATAS } from "./limited";
import { MONTHLY_SORTIE_QUEST_DATAS } from "./monthly";
import { QUARTERLY_SORTIE_QUEST_DATAS } from "./quarterly";
import { WEEKLY_SORTIE_QUEST_DATAS } from "./weekly";
import { YEARLY_SORTIE_QUEST_DATAS } from "./yearly";

export type DailySortieQuestId =
    | 'Bd7'

export type WeeklySortieQuestId =
    | 'Bw6' | 'Bw7' | 'Bw8' | 'Bw9' | 'Bw10'

export type MonthlySortieQuestId =
    | 'Bm1' | 'Bm2' | 'Bm3' | 'Bm4' | 'Bm5'
    | 'Bm6' | 'Bm7' | 'Bm8'

export type QuarterlySortieQuestId =
    | 'Bq1' | 'Bq2' | 'Bq3' | 'Bq4' | 'Bq5'
    | 'Bq6' | 'Bq7' | 'Bq8' | 'Bq9' | 'Bq10'
    | 'Bq11' | 'Bq12' | 'Bq13'

export type YearlySortieQuestId =
    | 'By13' | 'By1' | 'By2' | 'By3' | 'By4'
    | 'By11' | 'By12' | 'By14' | 'By6' | 'By7'
    | 'By8' | 'By9' | 'By10' | 'By5' | 'By15'

export type LimitedSortieQuestId =
    | '2412B5'
    | '2602B1'

export type QuestId =
    | DailySortieQuestId
    | WeeklySortieQuestId
    | MonthlySortieQuestId
    | QuarterlySortieQuestId
    | YearlySortieQuestId
    | LimitedSortieQuestId

type SpecificNodeSet = {
    area: NormalAreaId,
    specific_node: string,
}

export const TEMPLATE_1_6: SpecificNodeSet = {
    area: '1-6',
    specific_node: 'N',
} as const;

export type TargetNodeInfo = NormalAreaId | SpecificNodeSet

export type QuestIconType =
    | 'Daily'
    | 'Weekly'
    | 'Monthly'
    | 'Quarterly'
    | 'January'
    | 'February'
    | 'March'
    | 'April'
    | 'May'
    | 'June'
    | 'July'
    | 'September'
    | 'October'

export type QuestPeriod =
    | 'Daily'
    | 'Weekly'
    | 'Monthly'
    | 'Quarterly'
    | 'Yearly'

export const QUEST_ICON_PERIOD_MAP:
    Readonly<Record<QuestIconType, QuestPeriod>> = {
    Daily: 'Daily',
    Weekly: 'Weekly',
    Monthly: 'Monthly',
    Quarterly: 'Quarterly',

    January: 'Yearly',
    February: 'Yearly',
    March: 'Yearly',
    April: 'Yearly',
    May: 'Yearly',
    June: 'Yearly',
    July: 'Yearly',
    September: 'Yearly',
    October: 'Yearly',
};

export type SortieQuestData = {
    readonly name: string,
    readonly icon: QuestIconType,
    readonly zekamashi_id: string,
    readonly target_areas: TargetNodeInfo[],
    readonly condition: QuestCompositionCondition,
}

export type SortieQuestDatas =
    & Record<DailySortieQuestId, SortieQuestData>
    & Record<WeeklySortieQuestId, SortieQuestData>
    & Record<MonthlySortieQuestId, SortieQuestData>
    & Record<QuarterlySortieQuestId, SortieQuestData>
    & Record<YearlySortieQuestId, SortieQuestData>
    & Record<LimitedSortieQuestId, SortieQuestData>

export const SORTIE_QUEST_DATAS = {
    ...DAILY_SORTIE_QUEST_DATAS,
    ...WEEKLY_SORTIE_QUEST_DATAS,
    ...MONTHLY_SORTIE_QUEST_DATAS,
    ...QUARTERLY_SORTIE_QUEST_DATAS,
    ...YEARLY_SORTIE_QUEST_DATAS,
    ...LIMITED_SORTIE_QUEST_DATAS,
} as const satisfies SortieQuestDatas;
