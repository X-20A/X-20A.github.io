/**
 * Blobから画像を生成して上限に連結(img1が上)幅はimg1に合わせる
 * @param blob1 
 * @param blob2 
 * @param fileName 
 * @subEffect -canvas要素の生成
 */
export function do_combine_blobs(
    blob1: Blob,
    blob2: Blob,
): Promise<string> {
    return new Promise<string>((resolve, reject) => {
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
                resolve(canvas.toDataURL('image/jpeg'));
            };
            img2.onerror = (error) => reject(error);
            // 2つ目の画像を読み込む
            img2.src = URL.createObjectURL(blob2);
        };
        img1.onerror = (error) => reject(error);
        // 1つ目の画像を読み込む
        img1.src = URL.createObjectURL(blob1);
    });
}

/**
 * DataURLをダウンロードする
 * @subEffect -DOMの生成 & ダウンロード
 */
export function do_download_data_URL(dataURL: string, fileName: string) {
    const a = document.createElement('a');
    a.href = dataURL;
    a.download = `${fileName}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}