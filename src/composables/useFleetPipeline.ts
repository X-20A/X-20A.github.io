import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from '../stores';
import CustomError from '../errors/CustomError';
import type { SelectedType } from '../types';
import type { FleetComponent } from '../models/fleet/FleetComponent';
import { Ft as FleetType } from '../models/fleet/predicate';
import { derive_adopt_fleet } from '../models/fleet/AdoptFleet';
import { derive_FleetComponents_from_DeckBuilder } from '../logic/deckBuilder';
import { is_exists_and_Number } from '../logic/util';
import { parse_DeckBuilder_String, parseSelectedType } from '../models/schemas';

/**
 * 艦隊読込パイプライン
 * - deck文字列 → FleetComponents → adoptFleet の導出と、それらを繋ぐwatcherを一括で持つ
 * - App.vueのsetup内で1度だけ呼ぶこと(watcherを二重登録しないため)
 */
export function useFleetPipeline() {
	const store = useStore();
	const modalStore = useModalStore();
	const { deck, fleetComponents, selectedType } = storeToRefs(store);

	/**
	 * デッキビルダー文字列から艦隊読込
	 * @param deck_string
	 */
	const load_fleet = (
		deck_string: string,
	): void => {
		try {
			const deck = parse_DeckBuilder_String(deck_string);
			const fleet_components = derive_FleetComponents_from_DeckBuilder(
				deck,
			);
			store.UPDATE_FLEET_COMPONENTS(fleet_components);

			store.UPDATE_DECK(deck_string);
			store.SAVE_DATA();

			let selected_type = 1 as SelectedType;
			if (deck?.f1?.t) {
				const fleet_type = is_exists_and_Number(deck.f1.t) && [0, 1, 2, 3].includes(Number(deck.f1.t))
					? Number(deck.f1.t) as FleetType
					: 0 as FleetType
					;
				switch (fleet_type) {
					case 1:
						selected_type = 5;
						break;
					case 2:
						selected_type = 6;
						break;
					case 3:
						selected_type = 7;
						break;
				}
			}
			adjust_fleet_type(selected_type);
		} catch (e) {
			store.CLEAR_ROUTES();
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
	};

	// fleet_typeとかselected_typeの調停
	const adjust_fleet_type = (
		selected_type_number: number,
	): void => { // 入力系とimportの2箇所から発火
		try {
			const selected_type = parseSelectedType(selected_type_number);
			if (selected_type >= 5) {
				if (!store.fleetComponents[0]) {
					throw new CustomError('連合艦隊が指定されましたが第一艦隊が空です');
				}
				if (!store.fleetComponents[1]) {
					throw new CustomError('連合艦隊が指定されましたが第二艦隊が空です');
				}
			}

			store.UPDATE_SELECTED_TYPE(selected_type);
			store.SAVE_DATA();
		} catch (e: unknown) {
			store.CLEAR_ROUTES();
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
	};

	watch(deck, () => { // localStorageからの読込想定
		if (!deck.value) return;

		load_fleet(deck.value);
	});

	// fleetComponents, selectedTypeからシミュに使用する艦隊をセット
	watch([fleetComponents, selectedType], () => {
		if (
			!selectedType.value ||
			fleetComponents.value.length === 0
		) return;

		try { // ここでも一応、変な値が保存されてるとエラーになり得る
			let fleets = [] as FleetComponent[];
			let fleet_type = 0 as FleetType;
			if (selectedType.value >= 5) {
				fleets = [fleetComponents.value[0], fleetComponents.value[1]];
				fleet_type = selectedType.value - 4 as FleetType;
			} else {
				fleets = [fleetComponents.value[selectedType.value - 1]];
			}
			if (!fleets[0]) throw new CustomError('艦隊が空です');

			const adopt_fleet = derive_adopt_fleet(
				fleets,
				fleet_type,
			);

			store.UPDATE_ADOPT_FLEET(adopt_fleet);
		} catch (e: unknown) {
			store.CLEAR_ROUTES();
			modalStore.SHOW_ERROR(e);
			console.error(e);
			return;
		}
	});

	return { load_fleet, adjust_fleet_type };
}
