<template>
	<div class="detail-box">
		<div class="panels">
			<div class="panel" :class="panel_class(0)">
				<button type="button" class="panel-title" :aria-expanded="open_panels[0]" @click="toggle_panel(0)">
					使い方
					<span class="panel-title-icon"><span class="panel-icon"></span></span>
				</button>
				<div v-show="open_panels[0]" class="panel-text">
					<div class="panel-text-wrapper">
						<p>1.制空シミュの編成ページを開く</p>
						<p>2.[共有] &gt; [羅針盤シミュで開く]</p>
						<p>3.海域をセット</p>
						<p>4.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
						<br>
						<div class="gap">
							<span class="or">or</span>
						</div>
						<br>
						<p>1.制空シミュの編成ページを開く</p>
						<p>2.[共有] &gt; [デッキビルダー形式データ] コピー</p>
						<p>3.羅針盤シミュの [DeckBuilder] 欄に貼り付け</p>
						<p>4.海域をセット</p>
						<p>5.オプションがあれば選択(能動分岐、攻略段階、難易度等)</p>
					</div>
				</div>
			</div>
			<div class="panel" :class="panel_class(1)">
				<button type="button" class="panel-title" :aria-expanded="open_panels[1]" @click="toggle_panel(1)">
					謝辞
					<span class="panel-title-icon"><span class="panel-icon"></span></span>
				</button>
				<div v-show="open_panels[1]" class="panel-text">
					<div class="panel-text-wrapper">
						<p><a href="https://tsunkit.net/nav/" target="_blank" rel="noopener noreferrer">KCNav</a>: マップ周り</p>
						<p><a href="http://kancolle-calc.net/deckbuilder.html" target="_blank" rel="noopener noreferrer">デッキビルダー</a>:
							艦/装備データ</p>
						<p><a href="https://noro6.github.io/kc-web/#/" target="_blank" rel="noopener noreferrer">制空権シミュレータ</a>:
							速度演算、艦バナー、コーディング全般</p>
						<p><a href="https://jervis.vercel.app/" target="_blank" rel="noopener noreferrer">作戦室 Jervis</a>: 海域選択レイアウト
						</p>
						<p><a href="https://github.com/Nishisonic/gkcoi" target="_blank" rel="noopener noreferrer">gkcoi</a>:
							編成のグラフィック出力</p>
						<p>本ツールは以上のサイトを大いに参考にして制作しました。先人に感謝。</p>
						<p>This tool was created with great reference to the above sites. Thanks to our predecessors.</p>
					</div>
				</div>
			</div>
			<div class="panel" :class="panel_class(2)">
				<button type="button" class="panel-title" :aria-expanded="open_panels[2]" @click="toggle_panel(2)">
					分岐法則について
					<span class="panel-title-icon"><span class="panel-icon"></span></span>
				</button>
				<div v-show="open_panels[2]" class="panel-text">
					<div class="panel-text-wrapper">
						<p>通常海域は日本語版wiki、イベント海域はNGAに則ります</p>
						<p>表示されたマップの分岐マスをクリックすると分岐条件が表示されます</p>
						<p>ランダムとあって確率の記載がない場合、進行可能なマスへ等分しています</p>
						<p>20%~25%のように表記されている場合、中間値を採用しています(この場合22.5%)</p>
						<p><span style="color: red">赤字</span>は本シミュにおいて採用している暫定値です</p>
						<p>n寄りランダム のように確率の記載がない場合、開発者がそれっぽい値を暫定的にセットしています。根拠は基本的にありません</p>
						<p><span style="color:blue">青字</span>は本シミュ独自の処理をしている部分です。論拠についてはリンク先で確認してください</p>
					</div>
				</div>
			</div>
			<div class="panel" :class="panel_class(3)">
				<button type="button" class="panel-title" :aria-expanded="open_panels[3]" @click="toggle_panel(3)">
					アプデ履歴
					<span class="panel-title-icon"><span class="panel-icon"></span></span>
				</button>
				<div v-show="open_panels[3]" class="panel-text">
					<div class="panel-text-wrapper">
						<p>2026/07/12_v2.0.3 艦隊速度上書き機能</p>
						<p>2025/12/29_v2.0.2 タブに任務条件判定を追加</p>
						<p>2025/05/23_v2.0.1 戦闘系マスにおける退避設定の実装</p>
						<p>2025/02/07_v2.0.0 経路/分岐条件一覧&システム全面改修</p>
						<p>2024/05/02_v1.1.8 資源マスでの獲得資源予測</p>
						<p>2024/03/16_v1.1.7 <del>合致する条件に下線表示</del> 廃止</p>
						<p>2024/02/21_v1.1.6 資料室の設置</p>
						<p>2024/02/16_v1.1.5 スクショ機能の実装</p>
						<p>2024/02/03_v1.1.4 マス点灯&amp;図上における能動分岐切替</p>
						<p>2024/01/31_v1.1.3 連合艦隊読込&amp;イベント海域試験実装</p>
						<p>2024/01/18_v1.1.2 分岐マスをクリックで条件表示</p>
						<p>2024/01/16_v1.1.1 <del>キーボードショートカット追加</del> 廃止</p>
						<p>2024/01/15_v1.1.0 デッキビルダー形式での読込に対応</p>
						<p>2024/01/11_v1.0.2 手順を簡素化</p>
						<p>2024/01/11_v1.0.1 読み込んだ艦隊を表示&amp;バグ修正</p>
						<p>2023/10/28_v1.0.0 公開</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 詳細情報を表示する展開パネルボックス
 * v-expansion-panels(Vuetify)を同等の見た目・挙動で自前実装したもの
 */

/** 各パネルの展開状態 初期は「使い方」のみ開く */
const open_panels = ref([true, false, false, false]);

const toggle_panel = (index: number): void => {
	open_panels.value[index] = !open_panels.value[index];
};

// Vuetifyのv-expansion-panelが付与していたクラスを再現
// (active: 展開中 / after-active: 直前が展開中 / before-active: 直後が展開中)
const panel_class = (index: number) => ({
	'panel--active': open_panels.value[index],
	'panel--after-active': index > 0 && open_panels.value[index - 1],
	'panel--before-active': index < open_panels.value.length - 1 && open_panels.value[index + 1],
});
</script>

<style scoped>
.detail-box {
	margin: auto;
	margin-bottom: 210px;
	max-width: 500px;
}
.panels {
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	padding: 0;
	width: 100%;
	position: relative;
	z-index: 1;
}
.panel {
	flex: 1 0 100%;
	max-width: 100%;
	position: relative;
	border-radius: 4px;
	background-color: #fff;
	color: rgba(0, 0, 0, 0.87);
	transition: 0.3s all cubic-bezier(0.4, 0, 0.2, 1);
	transition-property: margin-top, border-radius, border, max-width;
}
/* 影は疑似要素をz-index:-1で敷き、結合中のパネル境界に影が出ないようにする */
.panel::before {
	content: '';
	position: absolute;
	inset: 0;
	z-index: -1;
	border-radius: inherit;
	box-shadow:
		0px 3px 1px -2px rgba(0, 0, 0, 0.2),
		0px 2px 2px 0px rgba(0, 0, 0, 0.14),
		0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
/* 結合中のパネル間の区切り線 */
.panel:not(:first-child)::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	border-top: thin solid rgba(0, 0, 0, 0.12);
	transition: 0.3s opacity cubic-bezier(0.4, 0, 0.2, 1);
}
/* 展開中パネルの前後は16px空けて切り離す */
.panel--active:not(:first-child),
.panel--active + .panel {
	margin-top: 16px;
}
.panel--active:not(:first-child)::after,
.panel--active + .panel::after {
	opacity: 0;
}
/* 隣接して結合しているパネルの接触辺は角丸を打ち消す */
.panels > .panel:not(:first-child):not(:last-child):not(.panel--active):not(.panel--before-active) {
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.panels > .panel:not(:first-child):not(:last-child):not(.panel--active):not(.panel--after-active) {
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}
.panels > .panel:first-child:not(:last-child):not(.panel--active):not(.panel--before-active) {
	border-bottom-left-radius: 0 !important;
	border-bottom-right-radius: 0 !important;
}
.panels > .panel:last-child:not(:first-child):not(.panel--active):not(.panel--after-active) {
	border-top-left-radius: 0 !important;
	border-top-right-radius: 0 !important;
}
.panel-title {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	min-height: 48px;
	padding: 16px 24px;
	position: relative;
	background-color: #fff;
	color: #000;
	border: none;
	border-radius: inherit;
	outline: none;
	font-family: Roboto, sans-serif; /* Vuetifyが当てていたフォントを維持 */
	font-size: 15px;
	font-weight: 400;
	line-height: 1;
	letter-spacing: normal;
	text-align: start;
	cursor: pointer;
	transition: 0.3s min-height cubic-bezier(0.4, 0, 0.2, 1);
}
.panel--active > .panel-title {
	min-height: 64px;
	border-bottom-left-radius: 0;
	border-bottom-right-radius: 0;
}
/* hover/focus時のオーバーレイ */
.panel-title::before {
	content: '';
	position: absolute;
	inset: 0;
	border-radius: inherit;
	background-color: currentColor;
	opacity: 0;
	pointer-events: none;
}
.panel-title:hover::before {
	opacity: 0.04;
}
.panel-title:focus-visible::before {
	opacity: 0.12;
}
.panel-title-icon {
	display: inline-flex;
	margin-top: -4px;
	margin-bottom: -4px;
	margin-inline-start: auto;
	user-select: none;
}
.panel-icon {
	display: block;
	height: 22.5px;
	width: 22.5px;
}
.panel-text {
	display: flex;
	border-top: 1px solid #dadada;
}
.panel-text-wrapper {
	padding: 8px 24px 16px;
	flex: 1 1 auto;
	max-width: 100%;
}
.panel-text p {
	padding: 4px 0px;
}
.gap {
	display: flex;
	align-items: center;
	text-align: center;
}
.gap::before,
.gap::after {
	content: '';
	flex-grow: 1;
	height: 1px;
	background: #c4c4c4;
}
.or {
	margin: 0 18px;
}
</style>
