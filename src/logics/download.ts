/**
 * ファイルの保存と読み込み。
 * ブラウザ API に触る部分をここに閉じ込め、変換処理は純粋に保つ
 */

/** ファイル名に使えない文字を落とす */
export function sanitize_filename(name: string): string {
    const cleaned = name.replace(/[\\/:*?"<>|]/g, '_').trim();
    return cleaned || 'cost';
}

export function build_timestamp(now: Date = new Date()): string {
    const pad = (value: number) => String(value).padStart(2, '0');

    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`
        + `-${pad(now.getHours())}${pad(now.getMinutes())}`;
}

function save_blob(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    // 解放が早すぎるとダウンロードが始まらないブラウザがある
    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function download_json(data: unknown, filename: string): void {
    save_blob(
        new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json',
        }),
        filename,
    );
}

/** 文字列をそのままファイルとして保存する。退避データの取り出しに使う */
export function download_text(
    text: string,
    filename: string,
    mime: string = 'application/json',
): void {
    save_blob(new Blob([text], { type: `${mime};charset=utf-8` }), filename);
}

export function download_csv(text: string, filename: string): void {
    // BOM がないと Excel が UTF-8 と判断せず日本語が化ける
    save_blob(
        new Blob(['﻿' + text], { type: 'text/csv;charset=utf-8' }),
        filename,
    );
}

/**
 * ファイル選択ダイアログを開いて中身を読む
 * @returns 選択されたファイルの中身。取り消された場合は null
 */
export function pick_text_file(accept: string = '.json'): Promise<string | null> {
    return new Promise(resolve => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;

        input.onchange = () => {
            const file = input.files?.[0];
            if (!file) {
                resolve(null);
                return;
            }

            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = () => resolve(null);
            reader.readAsText(file);
        };

        // 取り消しは onchange が発火しないため、検知できない環境がある。
        // その場合は Promise が解決されないままになるが、実害はない
        input.click();
    });
}
