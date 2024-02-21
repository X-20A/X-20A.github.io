$(function() {
    let topic = getParam('topic');
    if(topic) {
        var titles = document.querySelectorAll('.title-text');
        for (var i = 0; i < titles.length; i++) {
            var title = titles[i];
            if (title.textContent.includes(topic)) {
                // 見つかった要素の位置にスクロール
                title.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',     // スクロールされる要素のブロックを先頭に合わせる
                });
                // スクロールした要素を強調するなどの追加の処理を行うことができます
                title.style.backgroundColor = '#ead7ff';
                // 一度見つかったら終了
                break;
            }
        }
    }
    //urlをクリップボードにコピー
    $('.link-icon').on('click', function() {
        copyToClipboard($(this).data('url'));
    });
    //urlをクリップボードにコピー
    function copyToClipboard(text) {
        // 新しいテキストエリアを作成し、テキストを設定
        var $tempTextarea = $("<textarea>");
        $("body").append($tempTextarea);
        $tempTextarea.val(text).select();
        try {
            // コピーを実行
            document.execCommand("copy");
        } catch (err) {
            console.error("クリップボードへのコピーに失敗しました", err);
        } finally {
            // 不要なテキストエリアを削除
            $tempTextarea.remove();
        }
    }
    
    function getParam(name) {
        // URLからクエリ文字列を取得
        var queryString = window.location.search.substring(1);
        // クエリ文字列をパラメータごとに分割
        var parameters = queryString.split("&");
        // 各パラメータを走査して目的のパラメータを見つける
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i].split("=");
            // パラメータが見つかった場合はその値を返す
            if (parameter[0] === name) {
                return decodeURIComponent(parameter[1]);
            }
        }
        return null;
    }
    
    //ページでは使わないやつ
    function calc(value1, value2) {
        // 期待される比率
        var expectedRatio = 2 / 1;
        // 入力が有効な場合のみ計算を行う
        if (!isNaN(value1) && !isNaN(value2)) {
            // 実際の比率を計算
            var actualRatio = value1 / value2;
            // 誤差を計算
            var error = expectedRatio - actualRatio;
            // 誤差をパーセンテージに変換して小数第二位まで表示
            var res = ((actualRatio - expectedRatio) / expectedRatio) * 100;
            res = parseFloat(res.toFixed(2));
            if(res > 0) {
                res = `${value1}:${value2}(+${res}%)`;
            } else {
                res = `${value1}:${value2}(${res}%)`;
            }
            // マイナスの場合は「-n%」と表示する
            return res;
        } else {
            // 入力が無効な場合はエラーメッセージを表示
            return "有効な数字を入力してください";
        }
    }
});