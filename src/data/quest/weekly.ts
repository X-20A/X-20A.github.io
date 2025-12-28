import { QuestData, WeeklyQuestId } from ".";
import { calc_Bw10, calc_Bw6, calc_Bw7, calc_Bw8, calc_Bw9 } from "../../logic/quest/conditions/weekly";

export const WEEKLY_QUEST_DATAS = {
    Bw6: {
        name: '敵東方艦隊を撃滅せよ！',
        icon: 'Weekly',
        zekamashi_id: 'touhou-quest',
        target_areas: ['4-1', '4-2', '4-3', '4-4', '4-5'],
        condition: calc_Bw6,
    },
    Bw7: {
        name: '敵北方艦隊主力を撃滅せよ！',
        icon: 'Weekly',
        zekamashi_id: 'hoppou-quest',
        target_areas: ['3-3', '3-4', '3-5'],
        condition: calc_Bw7,
    },
    Bw8: {
        name: '敵東方中枢艦隊を撃破せよ！',
        icon: 'Weekly',
        zekamashi_id: 'touhoutyuusuu',
        target_areas: ['4-4'],
        condition: calc_Bw8,
    },
    Bw9: {
        name: '南方海域珊瑚諸島沖の制空権を握れ！',
        icon: 'Weekly',
        zekamashi_id: '5-2-quest',
        target_areas: ['5-2'],
        condition: calc_Bw9,
    },
    Bw10: {
        name: '海上輸送路の安全確保に努めよ！',
        icon: 'Weekly',
        zekamashi_id: 'kaizyouyusouro-1-5',
        target_areas: ['1-5'],
        condition: calc_Bw10,
    },
} as const satisfies Record<WeeklyQuestId, QuestData>;