# x-20a

主に艦これ関連のツール群です

## 羅針盤シミュ\([/compass](https://x-20a.github.io/compass/)\)

URLパラメータでの編成読み込みに対応しています

**predeck: デッキビルダー形式で読み込み**

```
const deck = {version:4,hqlv:120,f1:{s1:...};
const deck_string = JSON.stringify(deck);
const encoded_deck = encodeURIComponent(deck_string);
window.open(`https://x-20a.github.io/compass/?predeck=${encoded_deck}`, '_blank');
```
**pdz: デッキビルダー形式(圧縮)で読み込み**

Vivaldi等一部のブラウザではURLが長すぎるとURI too longエラーが発生するようです  
これはパラメータを圧縮することで回避できます  
圧縮には lz-string > compressToEncodedURIComponent を使用してください
```
const deck = {version:4,hqlv:120,f1:{s1:...};
const deck_string = JSON.stringify(deck);
const compressed_deck = LZString.compressToEncodedURIComponent(deck_string);
const encoded_deck = encodeURIComponent(compressed_deck);
window.open(`https://x-20a.github.io/compass/?pdz=${encoded_deck}`, '_blank');
```