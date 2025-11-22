import { SaveData } from "../types";
import lzstring from "lz-string";

const get_shorten_url = async (
    original_url: string,
): Promise<string> => {
    try {
        const response = await fetch(
            `https://tinyurl.com/api-create.php?url=${original_url}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        return data;
    } catch (error) {
        console.error(error);
        throw new Error('短縮URLの発行に失敗しました');
    }
}

export async function do_create_shorten_url(
    save_data: SaveData,
): Promise<string> {
    const compressed_data =
        lzstring.compressToEncodedURIComponent(JSON.stringify(save_data));

    const original_url =
        `${location.host + location.pathname}?share=${compressed_data}`;
    return await get_shorten_url(original_url);
}

/**
 * 指定したURLからクエリパラメータの値を取得する
 * @param name 取得したいクエリパラメータ名
 * @param url 対象のURL（省略時は現在のページURL）
 * @returns パラメータの値。存在しない場合はnull
 */
export function calc_URL_param(name: string, url = location.href): string | null {
    const params = new URLSearchParams(new URL(url).search);
    return params.get(name);
}

/**
 * 現在のURLからクエリパラメータをすべて削除する
 * 履歴を置き換えるため、ページ遷移は発生しない
 */
export function do_delete_URL_param(): void {
    const url = new URL(window.location.href);
    url.search = "";
    history.replaceState(null, "", url.toString());
}