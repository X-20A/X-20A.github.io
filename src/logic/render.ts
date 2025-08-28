/**
 * cytoscapeグラフのBlob取得
 * @param cy
 * @returns 
 */
export function calc_Cytoscape_Blob(cy: cytoscape.Core): Blob {
    return cy.jpg({
        maxWidth: 1293,
        quality: 1,
        output: 'blob',
        full: true,
        bg: '#212121'
    });
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