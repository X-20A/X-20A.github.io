import { MonthlyQuestId, QuestData } from ".";
import { calc_Bm1, calc_Bm2, calc_Bm3, calc_Bm4, calc_Bm5, calc_Bm6, calc_Bm7, calc_Bm8 } from "../../logic/quest/conditions/monthly";

export const MONTHLY_QUEST_DATAS = {
    Bm1: {
        name: '「第五戦隊」出撃せよ！',
        icon: 'Monthly',
        zekamashi_id: '2-5-daigsentai',
        target_areas: ['2-5'],
        condition: calc_Bm1,
    },
    Bm2: {
        name: '「潜水艦隊」出撃せよ！',
        icon: 'Monthly',
        zekamashi_id: '6-1-s',
        target_areas: ['6-1'],
        condition: calc_Bm2,
    },
    Bm3: {
        name: '「水雷戦隊」南西へ！',
        icon: 'Monthly',
        zekamashi_id: 'suiraisentai-nansei',
        target_areas: ['1-4'],
        condition: calc_Bm3,
    },
    Bm4: {
        name: '「水上打撃部隊」南方へ！',
        icon: 'Monthly',
        zekamashi_id: '5-1-suizyoudagekibutai',
        target_areas: ['5-1'],
        condition: calc_Bm4,
    },
    Bm5: {
        name: '海上護衛強化月間',
        icon: 'Monthly',
        zekamashi_id: 'kaizyougoeikyouka',
        target_areas: ['1-5'],
        condition: calc_Bm5,
    },
    Bm6: {
        name: '「空母機動部隊」西へ！',
        icon: 'Monthly',
        zekamashi_id: 'kuubokidoubutai-4-2',
        target_areas: ['4-2'],
        condition: calc_Bm6,
    },
    Bm7: {
        name: '「水上反撃部隊」突入せよ！',
        icon: 'Monthly',
        zekamashi_id: 'suizyouhangekibutai-totunyuu-2-5',
        target_areas: ['2-5'],
        condition: calc_Bm7,
    },
    Bm8: {
        name: '兵站線確保！海上警備を強化実施せよ！',
        icon: 'Monthly',
        zekamashi_id: 'heitan-kaizyoukeibi',
        target_areas: ['1-2', '1-3', '1-4', '2-1'],
        condition: calc_Bm8,
    },
} as const satisfies Record<MonthlyQuestId, QuestData>;