/*
    compass/index.html内の同リポジトリファイルへのurlをJSDelivrのurlに置換する
    
    compassディレクトリで
    
    cdnに置換
    node urlReq.js cdn
    
    相対パスに置換
    node urlReq.js original
    
    dist内に出力される
    
    Githubのリモートリポジトリにはcdn置換後のものだけ設置する(紛らわしいので
    ヽ(ﾟдﾟ)ノ ＜ delivr
*/

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// コマンドライン引数を取得
const args = process.argv.slice(2);

if (args.length !== 1 || (args[0] !== 'cdn' && args[0] !== 'original')) {
    console.error('Whoops!\nnode urlReq.js cdn\nnode urlReq.js original\nどっちか選んでね');
    process.exit(1);
}

// 書き換えるhtmlのパス
const htmlFilePath = 'index.html';

// 新しいHTMLファイルを保存するディレクトリ
const outputDir = 'dist';

// CDNのベースURL
const cdnBaseUrl = 'https://cdn.jsdelivr.net/gh/X-20A/X-20A.github.io@main';

// 相対パスとcdnURLのマッピング
const pathMappings = {
    '/commons/header.js': `${cdnBaseUrl}/commons/header.js`,
    '/commons/header.css': `${cdnBaseUrl}/commons/header.css`,
    'main.css': `${cdnBaseUrl}/compass/main.css`,
    '../media/compass.svg': `${cdnBaseUrl}/media/compass.svg`,
    '/data/ship.js': `${cdnBaseUrl}/data/ship.js`,
    '/data/item.js': `${cdnBaseUrl}/data/item.js`,
    '/data/map.js': `${cdnBaseUrl}/data/map.js`,
    '/data/branch.js': `${cdnBaseUrl}/data/branch.js`,
    'dist/main.js': `${cdnBaseUrl}/compass/dist/main.js`
};

// HTMLファイルを読み込む
fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Cheerioを使ってHTMLをパース
    const $ = cheerio.load(data);

    // コマンドライン引数に応じてsrcやhref属性を置換
    if (args[0] === 'cdn') {
        replaceWithCDNPaths($);
    } else if (args[0] === 'original') {
        replaceWithOriginalPaths($);
    }

    // 編集後のHTMLを取得
    const updatedHtml = $.html();

    // 出力先のファイルパスを設定
    const outputFilePath = path.join(outputDir, 'index.html');

    // HTMLファイルに書き込む
    fs.writeFile(outputFilePath, updatedHtml, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return;
        }
        console.log('HTML file has been updated');
    });
});

// CDNのパスに置換する関数
function replaceWithCDNPaths($) {
    $('script').each((index, element) => {
        const src = $(element).attr('src');
        if (src && pathMappings[src]) {
            $(element).attr('src', pathMappings[src]);
        }
    });

    $('link').each((index, element) => {
        const href = $(element).attr('href');
        if (href && pathMappings[href]) {
            $(element).attr('href', pathMappings[href]);
        }
    });
}

// 元のパスに戻す関数
function replaceWithOriginalPaths($) {
    Object.keys(pathMappings).forEach(originalPath => {
        const cdnPath = pathMappings[originalPath];
        $('script').each((index, element) => {
            const src = $(element).attr('src');
            if (src && src === cdnPath) {
                $(element).attr('src', originalPath);
            }
        });

        $('link').each((index, element) => {
            const href = $(element).attr('href');
            if (href && href === cdnPath) {
                $(element).attr('href', originalPath);
            }
        });
    });
}
