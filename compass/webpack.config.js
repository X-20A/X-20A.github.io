const webpack = require('webpack');
const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: "./src/js/main.js",  //エントリポイントであるファイルのパスを指定
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),  //バンドルしたファイルの出力先のパスを指定
        filename: 'main.js' //出力時のファイル名の指定
    },
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
}