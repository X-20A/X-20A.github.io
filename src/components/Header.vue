<template>
  <div>
    <!-- サイドバー -->
    <div class="side-bar-container" ref="sideBarRef">
      <span class="header-side-close" @pointerdown="closeSidebar">
        <SvgIcon
					name="menu"
					color="#ffffff"
					class="side-bar-icon"
				></SvgIcon>
      </span>
      <div class="side-menu">
        <a href="/compass"><p class="side-menu-content">羅針盤シミュ</p></a>
        <a href="/reference"><p class="side-menu-content">資料室</p></a>
        <a href="/terminal"><p class="side-menu-content">ターミナル</p></a>
        <a href="/quest"><p class="side-menu-content">任務手帳</p></a>
        <a href="/akashi"><p class="side-menu-content">改修効率計算機</p></a>
        <a href="/dock"><p class="side-menu-content">入渠計算機</p></a>
        <a href="/suzu"><p class="side-menu-content">涼月タイマー</p></a>
      </div>
    </div>
    <div class="header-mask" ref="maskRef" @pointerdown="closeSidebar"></div>
    <div class="header-container">
      <div class="header-inner-container">
        <span class="header-side-open" @pointerdown="openSidebar">
          <SvgIcon
						name="menu"
						color="#ffffff"
						class="side-bar-icon"
					></SvgIcon>
        </span>
        <a href="/compass"><span class="header-title">poyopoyo工具箱</span></a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SvgIcon from './SvgIcon.vue';

// ヘッダー部

const sideBarRef = ref<HTMLElement | null>(null);
const maskRef = ref<HTMLElement | null>(null);

/**
 * サイドバーのアニメーションを行う関数
 * @param start 開始位置(px)
 * @param end 終了位置(px)
 */
function animateSidebar(start: number, end: number) {
  const duration = 150; // アニメーションの時間（ミリ秒）
  let startTime: number | null = null;

  function update(time: number) {
    if (startTime === null) startTime = time;
    const progress = (time - startTime) / duration;
    let newPosition = start + (end - start) * progress;
    newPosition = Math.floor(newPosition); // 小数点以下切り捨て
    if (sideBarRef.value) {
      sideBarRef.value.style.left = newPosition + 'px';
    }
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      if (sideBarRef.value) {
        sideBarRef.value.style.left = end + 'px';
      }
    }
  }
  requestAnimationFrame(update);
}

// サイドバーを開く
function openSidebar() {
  animateSidebar(-200, 0);
  if (maskRef.value) {
    maskRef.value.style.display = 'block';
  }
}

// サイドバーを閉じる
function closeSidebar() {
  animateSidebar(0, -200);
  if (maskRef.value) {
    maskRef.value.style.display = 'none';
  }
}
</script>
<style scoped>
.side-bar-icon {
  width: 24px;
	height: 24px;
}
.side-menu-content {
  line-height: 40px;
  height: 40px;
  color: white;
  user-select: none;
	background-color: #333333;
}
.side-menu-content:hover {
  background-color: #484848;
}
.side-bar-container {
  top: 0;
  left: -200px;
  background-color: #333333;
  height: 100%;
  position: fixed;
  z-index: 99999999;
  display: flex;
  width: 200px;
}
.side-menu {
  width: 100%;
  padding-top: 40px;
  text-align: center;
  color: white;
}
.side-menu-title {
  font-style: italic;
  font-family: 'Cormorant Garamond', serif;
  padding-left: 10px;
  text-align: left;
  font-size: 15px;
  border-bottom: 1px solid white;
  color: white;
  user-select: none;
}
.header-mask {
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  display: none;
  position: fixed;
  z-index: 99999998;
}
.header-side-close {
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
}
.header-side-open {
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
}
.header-container {
  z-index: 9999;
  position: fixed;
  width: 100%;
  top: 0;
}
.header-inner-container {
  height: 36px;
  background-color: #333333;
  color: white;
  text-align: center;
  position: relative;
}
.header-title {
  cursor: pointer;
  line-height: 36px;
  height: 100%;
  display: inline-block;
  user-select: none;
  color: white;
}
</style>
