<template>
	<div class="detail-box">
		<v-expansion-panels v-model="openPanel" color="primary" multiple>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					使い方
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
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
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					謝辞
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title><!-- panel-textはv-ifしても変わらなかったのでそのまま -->
				<v-expansion-panel-text class="panel-text">
					<p><a href="https://tsunkit.net/nav/" target="_blank" rel="noopener noreferrer">KCNav</a>: マップ周り</p>
					<p><a href="http://kancolle-calc.net/deckbuilder.html" target="_blank" rel="noopener noreferrer">デッキビルダー</a>:
						艦/装備データ</p>
					<p><a href="https://noro6.github.io/kc-web/#/" target="_blank" rel="noopener noreferrer">制空権シミュレータ</a>:
						速度演算、コーディング全般</p>
					<p><a href="https://jervis.vercel.app/" target="_blank" rel="noopener noreferrer">作戦室 Jervis</a>: 海域選択レイアウト
					</p>
					<p><a href="https://github.com/Nishisonic/gkcoi" target="_blank" rel="noopener noreferrer">gkcoi</a>:
						編成のグラフィック出力</p>
					<p>本ツールは以上のサイトを大いに参考にして制作しました。先人に感謝。</p>
					<p>This tool was created with great reference to the above sites. Thanks to our predecessors.</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					分岐法則について
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
					<p>通常海域は日本語版wiki、イベント海域はNGAに則ります</p>
					<p>表示されたマップの分岐マスをクリックすると分岐条件が表示されます</p>
					<p>ランダムとあって確率の記載がない場合、進行可能なマスへ等分しています</p>
					<p>20%~25%のように表記されている場合、中間値を採用しています(この場合22.5%)</p>
					<p><span style="color: red">赤字</span>は本シミュにおいて採用している暫定値です</p>
					<p>n寄りランダム のように確率の記載がない場合、開発者がそれっぽい値を暫定的にセットしています。根拠は基本的にありません</p>
					<p><span style="color:blue">青字</span>は本シミュ独自の処理をしている部分です。論拠についてはリンク先で確認してください</p>
				</v-expansion-panel-text>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-title class="panel-title">
					アプデ履歴
					<template v-slot:actions="{ expanded }">
						<SvgIcon :name="expanded ? 'menu-up' : 'menu-down'" class="panel-icon"></SvgIcon>
					</template>
				</v-expansion-panel-title>
				<v-expansion-panel-text class="panel-text">
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
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

/**
 * 詳細情報を表示する展開パネルボックス
 * @slot 展開パネルの内容
 */
const openPanel = ref([0]);
</script>

<style scoped>
.detail-box {
	margin: auto;
	margin-bottom: 210px;
	max-width: 500px;
}
.panel-title {
	border: none;
	height: 20px;
	cursor: pointer;
}
.panel-icon {
	height: 22.5px;
	width: 22.5px;
	pointer-events: auto;
}
.panel-text {
	border-top: 1px solid #dadada;
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