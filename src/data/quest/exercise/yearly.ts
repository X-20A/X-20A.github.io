import { ExerciseQuestData, YearlyExerciseQuestId } from ".";
import { calc_Cy1, calc_Cy10, calc_Cy11, calc_Cy12, calc_Cy13, calc_Cy14, calc_Cy15, calc_Cy16, calc_Cy2, calc_Cy3, calc_Cy4, calc_Cy5, calc_Cy6, calc_Cy7, calc_Cy8, calc_Cy9 } from "../../../logic/quest/conditions/exercise/yearly";

export const YEARLY_EXERCISE_QUEST_DATAS = {
    Cy3: {
        name: '「精鋭軽巡」演習！',
        icon: 'February',
        zekamashi_id: 'seieikeizyun-ensyuu',
        condition: calc_Cy3,
    },
    Cy4: {
        name: '精鋭「第七駆逐隊」演習開始！',
        icon: 'March',
        zekamashi_id: 'seiei-dainana',
        condition: calc_Cy4,
    },
    Cy10: {
        name: '特型初代「第十一駆逐隊」演習スペシャル！',
        icon: 'April',
        zekamashi_id: 'tokugatasyodai-ensyuusp',
        condition: calc_Cy10,
    },
    Cy12: {
        name: '春です！「春雨」、演習しますっ！',
        icon: 'April',
        zekamashi_id: 'harusame-ensyuu',
        condition: calc_Cy12,
    },
    Cy8: {
        name: '精鋭「第十九駆逐隊」演習！',
        icon: 'May',
        zekamashi_id: 'daizyukukutiku-ensyuu',
        condition: calc_Cy8,
    },
    Cy5: {
        name: '「巡洋艦戦隊」演習！',
        icon: 'June',
        zekamashi_id: 'zyunyoukan-sentai',
        condition: calc_Cy5,
    },
    Cy9: {
        name: '「大和型戦艦」第一戦隊演習、始め！',
        icon: 'June',
        zekamashi_id: 'yamato-ensyuu',
        condition: calc_Cy9,
    },
    Cy13: {
        name: '水上艦「艦隊防空演習」を実施せよ！',
        icon: 'June',
        zekamashi_id: 'kantaiboukuu-ensyuu',
        condition: calc_Cy13,
    },
    Cy6: {
        name: '「改装特務空母」任務部隊演習！',
        icon: 'July',
        zekamashi_id: 'bay-ensyuu',
        condition: calc_Cy6,
    },
    Cy11: {
        name: '「十六駆」演習！',
        icon: 'July',
        zekamashi_id: 'zyuuroku-ensyu',
        condition: calc_Cy11,
    },
    Cy14: {
        name: '「フランス艦隊」演習！',
        icon: 'July',
        zekamashi_id: 'huransukantai-ensyu',
        condition: calc_Cy14,
    },
    Cy15: {
        name: '「第三戦隊」第二小隊、演習開始！',
        icon: 'September',
        zekamashi_id: 'daisansentai-dainisyoutai-ensyuu',
        condition: calc_Cy15,
    },
    Cy1: {
        name: '演習ティータイム！',
        icon: 'October',
        zekamashi_id: 'ensyu-teatime',
        condition: calc_Cy1,
    },
    Cy2: {
        name: '最精鋭！主力オブ主力、演習開始！',
        icon: 'October',
        zekamashi_id: 'saiseiei-syuryoku-ensyu',
        condition: calc_Cy2,
    },
    Cy7: {
        name: '精鋭「第十五駆逐隊」第一小隊演習！',
        icon: 'October',
        zekamashi_id: 'daizyuugo-ensuyu',
        condition: calc_Cy7,
    },
    Cy16: {
        name: '「第二駆逐隊(後期編成)」、練度向上！',
        icon: 'October',
        zekamashi_id: 'dainikutikutai-rendokouzyou',
        condition: calc_Cy16,
    },
} as const satisfies Record<YearlyExerciseQuestId, ExerciseQuestData>;