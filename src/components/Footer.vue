<template>
	<div class="footer">
		<span>
			バグ報告、要望等は<a class="odaibako" href="https://odaibako.net/u/__poyo" target="_blank"
				rel="noopener noreferrer">お題箱</a>まで
		</span>
		<span>
			作者: <a href="https://kancolle.social/@momemi" target="_blank" rel="noopener noreferrer" aria-label="作者mastodon">
				<SvgIcon name="mastodon" class="sns-icon mastodon"></SvgIcon>
			</a>
			<a href="https://twitter.com/momemi_kc" target="_blank" rel="noopener noreferrer" aria-label="作者Twitter">
				<SvgIcon name="twitter" class="sns-icon twitter"></SvgIcon>
			</a>
		</span>
	</div>
</template>

<script lang="ts" setup>
import SvgIcon from './SvgIcon.vue';


</script>

<style scoped>
.footer {
	z-index: 9999;
	padding: 2px;
	font-size: 13px;
	color: white;
	background-color: #333333;
	width: 100%;
	position: fixed;
	bottom: 0;
	text-align: center;
}
.odaibako {
	color: #82b1ff;
	text-decoration: underline;
}
.sns-icon {
	vertical-align: middle;
	margin-right: 3px;
	height: 16px;
	width: 16px;
	color: inherit;
}
.mastodon {
	color: #3089D4;
}
.twitter {
	color: #00A0E8;
}
</style>