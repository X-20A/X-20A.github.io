import { describe, it } from "vitest";
import { get_wikiwiki_quest_names, get_zekamashi_article_title } from "../gateway";
import { SORTIE_QUEST_DATAS } from "../../src/data/quest/sortie";
import { LIMITED_SORTIE_QUEST_DATAS } from "../../src/data/quest/sortie/limited";
import { EXERCISE_QUEST_DATAS } from "../../src/data/quest/exercise";

const delay = (
    ms: number,
) => new Promise(resolve => setTimeout(resolve, ms));

const all_quest_datas = [
    ...Object.values(SORTIE_QUEST_DATAS),
    ...Object.values(EXERCISE_QUEST_DATAS),
];

describe('任務データ', () => {
    it('quest-test: 任務データ重複チェック', () => {
        const name_set = new Set();
        const zekamashi_id_set = new Set();
        for (const quest_data of all_quest_datas) {
            const {
                zekamashi_id,
                name,
            } = quest_data;
            if (
                name_set.has(name)
            ) throw new Error(`任務名重複: ${name}`);
            if (
                zekamashi_id_set.has(zekamashi_id)
            ) throw new Error(`ぜかましID重複: ${zekamashi_id}`);

            name_set.add(name);
            zekamashi_id_set.add(zekamashi_id);
        }
    });
    it(
        'quest-test: ぜかましリンク',
        { timeout: 50000 },
    )
    async () => {
        for (const quest_data of all_quest_datas) {
            const {
                zekamashi_id,
                name,
            } = quest_data;
            // 表記ゆれ弾き
            if (name === '海上輸送路の安全確保に努めよ！') continue;

            type ResponseData = {
                h1_texts: string,
            }

            const response_data =
                await get_zekamashi_article_title(zekamashi_id) as unknown as ResponseData;

            const response_title = response_data.h1_texts;
            // console.log('response_title: ', response_title);
            if (
                !response_title.includes(name)
            ) throw new Error(`${name} のぜかましIDに不備があります`);

            await delay(200);
        }
    };
    it(
        'quest-test: 期間限定任務 期限切れチェック',
        { timeout: 10000 }
    ),
        async () => {
            const quest_names =
                await get_wikiwiki_quest_names();
            // console.log('quest_names: ', quest_names);

            for (const quest_data of Object.values(LIMITED_SORTIE_QUEST_DATAS)) {
                const { name } = quest_data;

                if (
                    // wikiwikiの任務ページには失効した任務は記載されない
                    !quest_names.includes(name)
                ) throw new Error(`${name} は期限切れの可能性があります`);
            }
        };
});