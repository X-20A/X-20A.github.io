import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from '../stores';
import { type AdoptFleet, is_speed_overridden } from '../models/fleet/AdoptFleet';
import { derive_DeckBuilder_from_AdoptFleet } from '../logic/deckBuilder';
import { getZeroFilledTime } from '../logic/util';
import { calc_Gkcoi_Blob, calc_Map_Blob } from '../logic/render';
import { do_combine_blobs, do_download_data_URL } from '../logic/effects/render';
import { ImageGenerationFailed } from '../errors/CustomError';
import type { MapCore } from '../logic/effects/svgGraph';
import type { GenerateOptions, DeckBuilder as GkcoiDeckBuilder, LoS, Speed } from 'gkcoi/dist/type';

/**
 * マップ＋艦隊画像(gkcoi)の合成スクリーンショット生成
 * @param getMapCore 描画済みマップハンドルの取得関数(useMapRenderer側が所有)
 */
export function useScreenshot(
	{ getMapCore }: { getMapCore: () => MapCore | null },
) {
	const store = useStore();
	const modalStore = useModalStore();
	const { adoptFleet, drewArea } = storeToRefs(store);

	const screenShot = async () => {
		const map_core = getMapCore();
		if (!adoptFleet.value || !map_core) return;

		if (is_speed_overridden(adoptFleet.value)) {
			store.CLEAR_SPEED_OVERRIDE();
		}

		const gkcoi = await import('gkcoi'); // 動的import
		const time = getZeroFilledTime(new Date());
		const file_name = `${drewArea.value}_${time}`;

		const deck = derive_DeckBuilder_from_AdoptFleet(adoptFleet.value as AdoptFleet);
		const gkcoi_deck_builder = Object.assign(deck, {
			lang: 'jp',
			theme: 'dark',
		}) as GkcoiDeckBuilder;
		const options: GenerateOptions = { // thank you, Chami
			start2URL: 'https://raw.githubusercontent.com/Tibowl/api_start2/master/start2.json',
		};
		const { seek } = adoptFleet.value;
		const gkcoi_los: LoS = {
			'1': seek.c1,
			'2': seek.c2,
			'3': seek.c3,
			'4': seek.c4,
			'5': seek.c4,
		};
		const gkcoi_speed = adoptFleet.value.speed * 5 as Speed;
		try {
			const canvas = await gkcoi.generate(
				gkcoi_deck_builder,
				options,
				gkcoi_los,
				gkcoi_speed,
			);
			const g_blob = calc_Gkcoi_Blob(canvas);
			const cy_blob = calc_Map_Blob(map_core);
			const data_url = await do_combine_blobs(cy_blob, g_blob);
			do_download_data_URL(data_url, file_name);
		} catch (error) {
			modalStore.SHOW_ERROR(new ImageGenerationFailed('画像生成に失敗しました'));
			console.error(error);
			return;
		}
	};

	return { screenShot };
}
