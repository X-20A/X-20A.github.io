import { QuarterlyQuestId, QuestData } from ".";
import { calc_Bq1, calc_Bq10, calc_Bq11, calc_Bq12, calc_Bq13, calc_Bq2, calc_Bq3, calc_Bq4, calc_Bq5, calc_Bq6, calc_Bq7, calc_Bq8, calc_Bq9 } from "../../logic/quest/conditions/quarterly";

export const QUARTERLY_QUEST_DATAS = {
    Bq1: {
        name: '沖ノ島海域迎撃戦',
        icon: 'Quarterly',
        zekamashi_id: '2-4-s-geigekisen',
        target_areas: ['3-1', '3-2', '3-3', '3-4'],
        condition: calc_Bq1,
    },
    Bq2: {
        name: '戦果拡張任務！「Z作戦」前段作戦',
        icon: 'Quarterly',
        zekamashi_id: 'z-sakusen-zendan',
        target_areas: ['2-4', '6-1', '6-3', '6-4'],
        condition: calc_Bq2,
    },
    Bq3: {
        name: '強行輸送艦隊、抜錨！',
        icon: 'Quarterly',
        zekamashi_id: 'kyoukou-yusou',
        target_areas: [{
            area: '1-6',
            specific_node: 'N',
        }],
        condition: calc_Bq3,
    },
    Bq4: {
        name: '前線の航空偵察を実施せよ！',
        icon: 'Quarterly',
        zekamashi_id: 'zensen-koukuuteisatu',
        target_areas: ['6-3'],
        condition: calc_Bq4,
    },
    Bq5: {
        name: '北方海域警備を実施せよ！',
        icon: 'Quarterly',
        zekamashi_id: 'hoppoukeibi',
        target_areas: ['3-1', '3-2', '3-3'],
        condition: calc_Bq5,
    },
    Bq6: {
        name: '精鋭「三一駆」、鉄底海域に突入せよ！',
        icon: 'Quarterly',
        zekamashi_id: 'naganami-kaini',
        target_areas: ['5-4'],
        condition: calc_Bq6,
    },
    Bq7: {
        name: '新編成「三川艦隊」、鉄底海峡に突入せよ！',
        icon: 'Quarterly',
        zekamashi_id: 'sinnpen-mikawakantai',
        target_areas: ['5-1', '5-3', '5-4'],
        condition: calc_Bq7,
    },
    Bq8: {
        name: '泊地周辺海域の安全確保を徹底せよ！',
        icon: 'Quarterly',
        zekamashi_id: 'hakutisyuuhen',
        target_areas: ['1-5', '7-1', '7-2'],
        condition: calc_Bq8,
    },
    Bq9: {
        name: '空母戦力の投入による兵站線戦闘哨戒',
        icon: 'Quarterly',
        zekamashi_id: 'kuubo-tounyuu',
        target_areas: ['1-3', '1-4', '2-1', '2-2', '2-3'],
        condition: calc_Bq9,
    },
    Bq10: {
        name: '戦果拡張任務！「Z作戦」後段作戦',
        icon: 'Quarterly',
        zekamashi_id: 'z-sakusen-koudan',
        target_areas: [
            { area: '7-2', specific_node : 'M'},
            '5-5', '6-2', '6-5',
        ],
        condition: calc_Bq10,
    },
    Bq11: {
        name: '南西諸島方面「海上警備行動」発令！',
        icon: 'Quarterly',
        zekamashi_id: 'nansei-kaizyoukeibi',
        target_areas: ['1-4', '2-1', '2-2', '2-3'],
        condition: calc_Bq11,
    },
    Bq12: {
        name: '発令！「西方海域作戦」',
        icon: 'Quarterly',
        zekamashi_id: 'haturei-seihou',
        target_areas: ['4-1', '4-2', '4-3', '4-4', '4-5'],
        condition: calc_Bq12,
    },
    Bq13: {
        name: '拡張「六水戦」、最前線へ！',
        icon: 'Quarterly',
        zekamashi_id: 'yuubari-rokusuisen',
        target_areas: ['5-1', '5-4', '6-4', '6-5'],
        condition: calc_Bq13,
    },

} as const satisfies Record<QuarterlyQuestId, QuestData>;