import { describe, it } from "vitest";
import { get_zekamashi_article_title } from "../gateway";
import { QUEST_DATAS } from "../../src/data/quest";

const delay = (
    ms: number,
) => new Promise(resolve => setTimeout(resolve, ms));

describe('任務データ', () => {
    it('data-test: 任務データ重複チェック', () => {
        const name_set = new Set();
        const zekamashi_id_set = new Set();
        for (const quest_data of Object.values(QUEST_DATAS)) {
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
    it('data-test: ぜかましリンク', async () => {
        for (const quest_data of Object.values(QUEST_DATAS)) {
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
    }, { timeout: 50000 });
});