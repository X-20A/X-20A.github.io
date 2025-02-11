/**
 * cytoscapeグラフのBlob取得
 * @param cy
 * @returns 
 */
export function getCyBlob(cy: cytoscape.Core): Blob {
    return cy.jpg({
        maxWidth: 1293,
        quality: 1,
        output: 'blob',
        full: true,
        bg: '#212121'
    });
}
// Canvasをblobで取得
export function getGkcoiBlob(canvas: HTMLCanvasElement): Blob {
    // CanvasからBase64形式の画像データを取得
    const dataUrl = canvas.toDataURL('image/jpeg');
    // Base64形式のデータからBlobオブジェクトを作成
    return dataURItoBlob(dataUrl);
}
// Data URIをBlobオブジェクトに変換
export function dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}
/**
 * Blobから画像を生成して上限に連結(img1が上)幅はimg1に合わせる    
 * ダウンロードまで
 * @param blob1 
 * @param blob2 
 * @param fileName 
 */
export function combineAndDownloadBlobs(
    blob1: Blob,
    blob2: Blob,
    fileName: string
): void {
    const canvas = document.createElement('canvas');
    const context: CanvasRenderingContext2D = canvas.getContext('2d')!;
    // 入力Blobの高さを取得
    let b1_height: number;
    let b2_height: number;
    // BlobのためのImage要素を作成
    const img1 = new Image();
    const img2 = new Image();
    // 1つ目の画像の読み込みが完了したときの処理
    img1.onload = () => {
        b1_height = img1.height;
        // 2つ目の画像の読み込みが完了したときの処理
        img2.onload = () => {
            b2_height = img2.height;
            // 2つの画像の幅を比較し、大きい方に合わせる
            const max_width = Math.max(img1.width, img2.width);
            canvas.width = max_width;
            canvas.height = b1_height + b2_height;
            // 画像を描画
            context.drawImage(img1, 0, 0, max_width, b1_height);
            context.drawImage(img2, 0, b1_height, max_width, b2_height);
            const combinedImage = canvas.toDataURL(); // 画像をDataURLに変換
            const a = document.createElement('a');
            a.href = combinedImage;
            a.download = `${fileName}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            // BlobのURLを解放
            URL.revokeObjectURL(img1.src);
            URL.revokeObjectURL(img2.src);
        };
        // 2つ目の画像を読み込む
        img2.src = URL.createObjectURL(blob2);
    };
    // 1つ目の画像を読み込む
    img1.src = URL.createObjectURL(blob1);
}