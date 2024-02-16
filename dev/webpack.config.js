const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: "./src/js/main.js",  //エントリポイントであるファイルのパスを指定
    output: {
        path: path.resolve(__dirname, 'dist'),  //バンドルしたファイルの出力先のパスを指定
        filename: 'main.js' //出力時のファイル名の指定
    }
}