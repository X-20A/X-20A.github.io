import { build_map_screenshot_svg, type MapCore } from './effects/svgGraph';

/**
 * マップ(SVG)のBlob取得
 * 幅1293/背景#212121は旧cy.jpg設定の踏襲(gkcoi画像と連結するため幅を合わせる)
 * @param map
 * @returns
 */
export function calc_Map_Blob(map: MapCore): Blob {
    const svg_text = build_map_screenshot_svg(map, 1293, '#212121');
    return new Blob([svg_text], { type: 'image/svg+xml;charset=utf-8' });
}
// Canvasをblobで取得
export function calc_Gkcoi_Blob(canvas: HTMLCanvasElement): Blob {
    // CanvasからBase64形式の画像データを取得
    const dataUrl = canvas.toDataURL('image/jpeg');
    // Base64形式のデータからBlobオブジェクトを作成
    return convert_dataURI_to_Blob(dataUrl);
}
// Data URIをBlobオブジェクトに変換
export function convert_dataURI_to_Blob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}