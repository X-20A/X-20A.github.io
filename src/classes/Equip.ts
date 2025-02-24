import equip_datas from "@/data/equip";
import type { Improvement } from "./types";
import CustomError from "@/classes/CustomError";

export default class Equip {
    /** 装備ID */
	public readonly id: number;

    /** 改修値 */
	public readonly implovement: Improvement;

    /** 装備名 */
	public readonly name: string;

    /** 種別ID */
	public readonly type: number;

    /** 索敵値 */
	public readonly seek: number;

    /** 増設に設定された装備であるか */
    public readonly is_ex: boolean;

	constructor(
        id: number,
		implovement: Improvement,
		ship_name: string,
		slot_index: number,
        is_ex: boolean,
	) {
		const data = equip_datas[id];

		if (!data) {
            throw new CustomError(`${ship_name}の${slot_index}番目の装備は未対応です`);
		}

		this.id = id;
		this.implovement = implovement;
		this.name = data.name;
		this.type = data.type;
		this.seek = data.seek;
        this.is_ex = is_ex;
	}
}