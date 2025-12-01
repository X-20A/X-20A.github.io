import { SaveData } from "../types";
import lzstring from "lz-string";

const get_shorten_url = async (
    original_url: string,
): Promise<string> => {
    try {
        const request = `https://tinyurl.com/api-create.php?url=${original_url}`;
        const response = await fetch(request);

        if (!response.ok) {
            console.error('request: ', request);
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

/**
 * urlが承認されたドメインのものであるか判定して返す
 * @param search_url 
 * @param allowed_domains 
 * @returns 
 */
export function is_approved_url(
    search_url: string,
    allowed_domains: string[],
): boolean {
    const search_domain = extract_url_domain(search_url);
    return allowed_domains.some(
        allowed_domain => search_domain === allowed_domain
    );
}

/**
 * URLを新しいタブで開く
 * @param url 
 */
export function do_open_url_in_new_tab(
    url: string,
): void {
    window.open(url, '_blank');
}

export type Domain = string & { __brand?: "Domain" };

/**
 * URL文字列からドメイン名を抽出して返す
 * @param url_string 
 * @returns 
 */
export function extract_url_domain(
    url_string: string,
): Domain {
    const url = new URL(url_string);
    return url.hostname as Domain;
}