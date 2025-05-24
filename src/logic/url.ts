/**
 * 指定したURLからクエリパラメータの値を取得する
 * @param name 取得したいクエリパラメータ名
 * @param url 対象のURL（省略時は現在のページURL）
 * @returns パラメータの値。存在しない場合はnull
 */
export function getParam(name: string, url = location.href): string | null {
    const params = new URLSearchParams(new URL(url).search);
    return params.get(name);
}

/**
 * 現在のURLからクエリパラメータをすべて削除する
 * 履歴を置き換えるため、ページ遷移は発生しない
 */
export function doDeleteParam(): void {
    const url = new URL(window.location.href);
    url.search = "";
    history.replaceState(null, "", url.toString());
}