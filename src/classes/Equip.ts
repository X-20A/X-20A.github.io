import equip_datas from "@/data/equip";
import type { Improvement } from "./types";
import { createPinia } from 'pinia';
import { useModalStore } from '@/stores';
import CustomError from "@/classes/CustomError";

const pinia = createPinia(); // 手動でPiniaインスタンスを作成
const errorStore = useModalStore(pinia);

export default class Equip {
    /**
     * 装備ID
     */
	public readonly id: number;
    /**
     * 改修値
     */
	public readonly implovement: Improvement;
    /**
     * 装備名
     */
	public readonly name: string;
    /**
     * 種別ID
     */
	public readonly type: number;
    /**
     * 索敵値
     */
	public readonly seek: number;
    /**
     * 増設に設定された装備であるか
     */
    public readonly is_ex: boolean;

	constructor(
        id: number,
		implovement: Improvement,
		ship_name: string,
		slot_index: number,
        is_ex: boolean,
	) {
		const equip = equip_datas[id];

		if (!equip) {
			const message = `${ship_name}の${slot_index}番目の装備は未対応です`
			errorStore.SHOW_ERROR(message);
			throw new CustomError(message);
		}

		this.id = id;
		this.implovement = implovement;
		this.name = equip.name;
		this.type = Number(equip.type.slice(0, 3).join('')); // 先頭の3つを連結して装備種別IDにしてしまう
		this.seek = equip.seek;
        this.is_ex = is_ex;
	}
}