import { MasterData } from "./manual/data.test";

const PROXY_PORT = 'http://localhost:3000';

/**
 * GETリクエストを送信する共通関数
 * @param path APIパス
 * @returns JSONレスポンス
 */
async function fetch_json<T>(path: string): Promise<T> {
    const response = await fetch(`${PROXY_PORT}${path}`);

    if (!response.ok) {
        throw new Error(`通信失敗: ${response.status}`);
    }

    return await response.json() as T;
}

/**
 * ACSimのマスターデータを取得
 */
export async function get_ACSim_master_data(): Promise<MasterData> {
    return await fetch_json<MasterData>('/ac-master');
}

/**
 * 記事タイトルを取得
 */
export async function get_zekamashi_article_title(
    id: string,
): Promise<string> {
    return await fetch_json<string>(`/zekamashi/?id=${encodeURIComponent(id)}`);
}

/**
 * wikiwiki任務名一覧を取得する
 */
export async function get_wikiwiki_quest_names(): Promise<string[]> {
    const data = await fetch_json<{ td_texts: string[] }>('/wikiwiki');

    return data.td_texts.filter(
        text => !/^[a-zA-Z0-9]+$/.test(text)
    );
}