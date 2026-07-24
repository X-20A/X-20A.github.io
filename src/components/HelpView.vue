<template>
	<div v-if="is_visible" class="help-container" @pointerdown.stop>
		<header class="help-header">
			<h2 class="help-title">操作説明</h2>
			<button class="help-close" title="閉じる" @pointerdown="close">×</button>
		</header>

		<div class="help-body">
			<section v-for="section in SECTIONS" :key="section.title" class="help-section">
				<h3 class="help-section-title">{{ section.title }}</h3>
				<p v-if="section.note" class="help-note">{{ section.note }}</p>

				<dl class="help-list">
					<template v-for="item in section.items" :key="item.action">
						<dt class="help-key">
							<kbd v-for="key in item.keys" :key="key" class="key">{{ key }}</kbd>
							<span v-if="item.keys.length === 0" class="help-key-text">{{ item.hint }}</span>
						</dt>
						<dd class="help-action">{{ item.action }}</dd>
					</template>
				</dl>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useModalStore } from '../stores';

const modal_store = useModalStore();
const is_visible = computed(() => modal_store.is_help_visible);

const close = () => modal_store.HIDE_MODALS();

type HelpItem = {
	keys: string[],
	/** キー操作でない場合の説明 */
	hint?: string,
	action: string,
}

const SECTIONS: { title: string, note?: string, items: HelpItem[] }[] = [
	{
		title: 'データの取り込み',
		items: [
			{
				keys: [],
				hint: 'Import 列に貼り付け',
				action: 'シミュレータの結果テキストを貼り付けると、燃料・弾薬などを自動で読み取ります',
			},
			{
				keys: [],
				hint: 'url 列のアイコン',
				action: 'クリックで元のシミュレータを開きます。右クリックでURLを削除できます',
			},
		],
	},
	{
		title: 'セル間の移動',
		note: '表のセルを編集しているときに使えます。',
		items: [
			{ keys: ['Enter'], action: '1つ下のセルへ移動' },
			{ keys: ['Shift', 'Enter'], action: '1つ上のセルへ移動' },
			{ keys: ['↑', '↓'], action: '上下のセルへ移動' },
			{ keys: ['←', '→'], action: '左右のセルへ移動（文字の編集中はカーソル移動を優先）' },
		],
	},
	{
		title: '行の選択',
		note: '行の左端にある ⋮⋮ をクリックします。シートの外をクリックすると選択を解除できます。',
		items: [
			{ keys: [], hint: 'クリック', action: 'その行だけを選択します' },
			{ keys: ['Ctrl', 'クリック'], action: '行を選択に追加、もう一度で解除（複数選択）' },
			{ keys: ['Shift', 'クリック'], action: '直前に選んだ行からクリックした行までをまとめて選択' },
			{ keys: ['Ctrl', 'A'], action: '入力済みの行をすべて選択（セルの編集中を除く）' },
		],
	},
	{
		title: '行のコピーと貼り付け',
		note: 'コピーした行は別のシートへも貼り付けられます。セルを編集中は通常の文字のコピーになります。',
		items: [
			{ keys: ['Ctrl', 'C'], action: '選択した行をコピー' },
			{ keys: ['Ctrl', 'X'], action: '選択した行を切り取り (元の行は空になります)' },
			{ keys: ['Ctrl', 'V'], action: '選択した行に上書きで貼り付け' },
			{ keys: ['Ctrl', 'Shift', 'V'], action: '選択した行の下に挿入して貼り付け' },
		],
	},
	{
		title: '取り消し',
		note: 'シートの中の編集だけが対象です。シートやフォルダの操作は対象外で、ゴミ箱から戻せます。',
		items: [
			{ keys: ['Ctrl', 'Z'], action: '直前の編集を取り消す' },
			{ keys: ['Ctrl', 'Y'], action: '取り消した編集をやり直す' },
		],
	},
	{
		title: 'シートの管理',
		note: '左上の ☰ でシート一覧を開きます。',
		items: [
			{ keys: [], hint: 'ドラッグ&ドロップ', action: '一覧の中でシートやフォルダを並べ替え、フォルダの中へ移動できます' },
			{ keys: [], hint: 'ダブルクリック', action: 'シート名・フォルダ名を変更します' },
			{ keys: [], hint: '🗑 ボタン', action: 'ゴミ箱へ移動します。ゴミ箱の中の ↩ でいつでも元に戻せます' },
		],
	},
	{
		title: '合計と差分',
		items: [
			{ keys: [], hint: 'sum / diff ボタン', action: '2行だけ選ぶと差分表示に切り替えられます。差分は「下の行 − 上の行」です' },
			{ keys: [], hint: 'count 列', action: '周回数です。合計はこの回数を掛けた値になります' },
		],
	},
	{
		title: 'データの保存と共有',
		note: 'データはブラウザの中だけに保存されます。ブラウザのデータを消すと失われるため、大事な計画はファイルに書き出しておくことをおすすめします。',
		items: [
			{ keys: [], hint: 'URL発行', action: '今開いているシートを共有URLにします' },
			{ keys: [], hint: 'ファイル', action: 'シートや全データをファイルに書き出し、読み込みます' },
		],
	},
];
</script>

<style scoped>
.help-container {
	position: relative;
	z-index: 1001;
	width: min(680px, 92vw);
	max-height: 80vh;
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	border-radius: 8px;
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.help-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14px 18px;
	border-bottom: 1px solid #dee2e6;
}

.help-title {
	margin: 0;
	font-size: 16px;
}

.help-close {
	border: none;
	background: none;
	font-size: 22px;
	line-height: 1;
	cursor: pointer;
	color: #868e96;
}

.help-body {
	overflow-y: auto;
	padding: 4px 18px 18px;
}

.help-section {
	margin-top: 18px;
}

.help-section-title {
	margin: 0 0 6px;
	font-size: 14px;
	color: #1971c2;
	border-bottom: 1px solid #e9ecef;
	padding-bottom: 4px;
}

.help-note {
	margin: 0 0 8px;
	font-size: 12px;
	color: #868e96;
	line-height: 1.6;
}

.help-list {
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 8px 14px;
	margin: 0;
	align-items: baseline;
}

.help-key {
	margin: 0;
	white-space: nowrap;
}

.help-key-text {
	font-size: 12px;
	color: #495057;
	background-color: #f1f3f5;
	border-radius: 4px;
	padding: 3px 8px;
}

.key {
	display: inline-block;
	font-family: inherit;
	font-size: 11px;
	background-color: #f8f9fa;
	border: 1px solid #ced4da;
	border-bottom-width: 2px;
	border-radius: 4px;
	padding: 2px 6px;
	margin-right: 3px;
}

.help-action {
	margin: 0;
	font-size: 13px;
	line-height: 1.6;
}

@media (max-width: 600px) {
	.help-list {
		grid-template-columns: 1fr;
		gap: 3px;
	}

	.help-action {
		margin-bottom: 8px;
	}
}
</style>
