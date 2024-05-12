$(async function() {
    const textDecoder = new TextDecoder();
    const decodeString = buffer => textDecoder.decode(buffer);
    
    let param = getParam('search');
    if(param) {
        let elem = param.split('-');
        let map = `${elem[0]}-${elem[1]}`;
        let node = elem[2];
        let code = await getCode();
        code = code.slice(code.indexOf(`@${map}`) + 1); // @3-4等 以降
        console.log(code);
        code = code.slice(0, code.indexOf('@')); // 次の海域頭まで
        console.log(code);
        let start = findStringPosition(code, `case \'${node}\':`);
        if(start > 0) {
            code = code.slice(start); // 目的のnode 以降
            let end = code.indexOf('break;') + 6;
            code = code.slice(0, end); // 次のnodeまで
            //Prismの描画は結構もたるのでなるべく絞り込んでから渡したい
            $('#code').text(code);
            Prism.highlightAll();
        } else {
            notFound();
        }
    } else {
        notFound();
    }
    function notFound() {
        $('#not-found').css('display', 'block');
        $('#code-box').css('display', 'none');
    }
    // 検索ワードにマッチする行の頭のindex取得
    function findStringPosition(text, searchString) {
        const lines = text.split('\n');
        let currentIndex = 0;
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const index = line.indexOf(searchString);
            if (index !== -1) {
                const indentation = line.match(/^\s*/)[0];
                if (indentation.length > 0) {
                    return currentIndex - 1;
                } else {
                    return currentIndex + index;
                }
            }
            currentIndex += line.length + 1;
        }
        return -1;
    }
    // よく分らんがBase64デコードに使う
    function encodeBinaryString(binaryString) {
        const uint8Array = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
        }
        return uint8Array;
    }
    // githubAPIを叩いてソースコード取得
    async function getCode() {
        const response = await fetch('https://api.github.com/repos/X-20A/X-20A.github.io/contents/compass/src/js/main.js');
        const data = await response.json();
        const code = atob(data.content);
        const uint8ArrayB = encodeBinaryString(code);
        const stringB = decodeString(uint8ArrayB);
        return stringB;
    }
    // URLから任意のパラメータを取得
    function getParam(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
});