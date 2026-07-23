import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore, useModalStore } from '../stores';
import { clear_command_evacuation } from '../core/CommandEvacuation';
import { parseAreaId } from '../models/schemas';
import { derive_sim_executor, start_sim } from '../core/SimExecutor';
import { DisallowToSortie } from '../errors/CustomError';
import type { AdoptFleet } from '../models/fleet/AdoptFleet';

/**
 * シミュレーション駆動
 * - 艦隊・海域が変わったら退避設定をリセットし、
 *   艦隊・海域・オプション・退避設定が揃ったらシミュを実行して結果をstoreへ反映する
 * - App.vueのsetup内で1度だけ呼ぶこと(watcherを二重登録しないため)
 */
export function useSimulation() {
	const store = useStore();
	const modalStore = useModalStore();
	const { adoptFleet, selectedArea, options, commandEvacuations } = storeToRefs(store);

	watch([adoptFleet, selectedArea], () => {
		// 退避設定は 海域 | 艦隊 間で持ち越さない
		const cleared_command_evacuation = clear_command_evacuation();
		store.UPDATE_COMMAND_EVACUATIONS(cleared_command_evacuation);
	});

	// 艦隊 & 海域 & オプション が揃ったらシミュ開始
	watch([adoptFleet, selectedArea, options, commandEvacuations], async () => {
		if (
			!adoptFleet.value
			|| !selectedArea.value
			|| !options.value
		) return;

		try {
			parseAreaId(selectedArea.value);
			const sim_executor = derive_sim_executor(
				adoptFleet.value as AdoptFleet,
				selectedArea.value,
				options.value,
				commandEvacuations.value,
			);
			const result = start_sim(sim_executor);
			store.UPDATE_SIM_RESULT(result);
		} catch (e: unknown) {
			store.CLEAR_ROUTES();
			modalStore.SHOW_ERROR(e);
			if (e instanceof DisallowToSortie) return;

			console.error(e);
			return;
		}
	}, { deep: true });
}
