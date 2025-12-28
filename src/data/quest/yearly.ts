import { QuestData, YearlyQuestId } from ".";
import { calc_By1, calc_By10, calc_By11, calc_By12, calc_By13, calc_By14, calc_By15, calc_By2, calc_By3, calc_By4, calc_By5, calc_By6, calc_By7, calc_By8, calc_By9 } from "../../logic/quest/conditions/yearly";

export const YEARLY_QUEST_DATAS = {
    By13: {
        name: '精強「第七駆逐隊」緊急出動！',
        icon: 'January',
        zekamashi_id: 'dainanakutikutai-kinkyuu',
        target_areas: ['1-2', '1-3', '1-5', '3-2'],
        condition: calc_By13,
    },
    By1: {
        name: '精鋭「十九駆」、躍り出る！',
        icon: 'February',
        zekamashi_id: 'kaiboukan-odorideru',
        target_areas: ['2-5', '3-4', '4-5', '5-3'],
        condition: calc_By1,
    },
    By2: {
        name: '「海防艦」、海を護る！',
        icon: 'February',
        zekamashi_id: 'kaiboukan-mamoru',
        target_areas: [
            '1-1', '1-2', '1-3', '1-5',
            {
                area: '1-6',
                specific_node: 'N',
            },
        ],
        condition: calc_By2,
    },
    By3: {
        name: '工作艦「明石」護衛任務',
        icon: 'March',
        zekamashi_id: 'akashi-goei',
        target_areas: [
            '1-3',
            {
                area: '1-6',
                specific_node: 'N',
            },
            '2-1', '2-2', '2-3',
        ],
        condition: calc_By3,
    },
    By4: {
        name: '重巡戦隊、西へ！',
        icon: 'March',
        zekamashi_id: 'zyuuzyun-nishi',
        target_areas: ['4-1', '4-2', '4-3', '4-4'],
        condition: calc_By4,
    },
    By11: {
        name: '日英米合同水上艦隊、抜錨せよ！',
        icon: 'May',
        zekamashi_id: 'nitieibei-batubyou',
        target_areas: [
            '3-1', '3-3',
            { area: '7-3', specific_node: 'P' },
            '4-3',
        ],
        condition: calc_By11,
    },
    By12: {
        name: '精鋭「第十九駆逐隊」、全力出撃！',
        icon: 'May',
        zekamashi_id: 'daizyuukukutiku-zenryoku',
        target_areas: ['1-5', '2-3', '3-2', '5-3'],
        condition: calc_By12,
    },
    By14: {
        name: '鵜来型海防艦、静かな海を防衛せよ！',
        icon: 'May',
        zekamashi_id: 'ukurugata-bouei',
        target_areas: ['1-1', '1-2', '1-5'],
        condition: calc_By14,
    },
    By6: {
        name: '鎮守府近海海域の哨戒を実施せよ！',
        icon: 'June',
        zekamashi_id: 'tinzyuhukinkai-syoukai',
        target_areas: ['1-2', '1-3', '1-4'],
        condition: calc_By6,
    },
    By7: {
        name: '南西方面の兵站航路の安全を図れ！',
        icon: 'June',
        zekamashi_id: 'nansei-heitankouro',
        target_areas: [
            '1-5',
            {
                area: '1-6',
                specific_node: 'N',
            },
            '2-1',
        ],
        condition: calc_By7,
    },
    By8: {
        name: '空母機動部隊、出撃！敵艦隊を迎撃せよ！',
        icon: 'June',
        zekamashi_id: 'kuubokidou-geigeki',
        target_areas: ['2-2', '2-3', '2-4'],
        condition: calc_By8,
    },
    By9: {
        name: 'AL作戦',
        icon: 'June',
        zekamashi_id: 'al-sakusen-yearly',
        target_areas: ['3-1', '3-3', '3-4', '3-5'],
        condition: calc_By9,
    },
    By10: {
        name: '機動部隊決戦',
        icon: 'June',
        zekamashi_id: 'kidoubutai-kessen',
        target_areas: ['5-2', '5-5', '6-5', '6-4'],
        condition: calc_By10,
    },
    By5: {
        name: '歴戦「第十方面艦隊」、全力出撃！',
        icon: 'September',
        zekamashi_id: 'rekisen-zyuhoumen',
        target_areas: [
            { area: '7-2', specific_node: 'M' },
            { area: '7-3', specific_node: 'P' },
            '4-2',
        ],
        condition: calc_By5,
    },
    By15: {
        name: '「第三戦隊」第二小隊、鉄底海峡へ！',
        icon: 'September',
        zekamashi_id: 'daisansentai-dainisyoutai-tetteikaikyou',
        target_areas: ['5-1', '5-3', '5-4', '5-5'],
        condition: calc_By15,
    },
} as const satisfies Record<YearlyQuestId, QuestData>;