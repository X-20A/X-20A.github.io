import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '../stores';

/**
 * モーダル表示中のスクロールロック
 * - いずれかのモーダルが開いている間、body を fixed にして背景スクロールを止める
 * - 閉じたら元のスクロール位置へ戻す
 * - App.vueのsetup内で1度だけ呼ぶこと(watcherを二重登録しないため)
 */
export function useModalScrollLock() {
	const modalStore = useModalStore();
	const {
		isAreaVisible,
		isReferenceVisible,
		isErrorVisible,
		isCommandEvacuationVisible,
	} = storeToRefs(modalStore);

	let save_y = 0;
	// スクロールバウンス回避
	watch([isAreaVisible, isReferenceVisible, isErrorVisible, isCommandEvacuationVisible], () => {
		const style = document.body.style;
		if (
			isAreaVisible.value
			|| isReferenceVisible.value
			|| isErrorVisible.value
			|| isCommandEvacuationVisible.value
		) { // DOMはあんまし触りたくないけどしゃあないかな
			save_y = window.scrollY;
			style.top = `-${window.scrollY}px`;
			style.left = `${window.scrollX}px`;
			style.position = "fixed";
			style.minWidth = '100%';
		} else {
			style.top = "";
			style.left = "";
			style.position = "";
			window.scrollTo({ top: save_y });
		}
	});
}
