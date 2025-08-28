import
{ NA as National, ST as ShipType }
    from '@/data/ship';
import { includes_equip_id, type Equip } from '@/models/Equip';
import { includes_ship_name, some_startsWith_ship_name, startsWith_ship_name } from '@/models/ship/NakedShip';
import { Brand } from '@/types';
import { EquipId } from '@/types/equipId';
import { ShipName } from '@/types/shipName';

/**
 * 装備idがまだ重複していないことを判定して返す
 * @param disable_ids 
 * @param equip_id 
 * @returns 
 */
const is_not_yet_duplicated = (
    disable_ids: EquipId[],
    equip_id: EquipId,
): boolean => {
    return !includes_equip_id(disable_ids, equip_id);
}

/** 装備ボーナスのブランド型 */
export type EquipBonusSeek = Brand<number, 'EquipBonusSeek'>;

/** 装備ボーナスを計算して返す */
export function calc_equip_bonus(
    ship_name: ShipName,
    ship_type: ShipType,
    national: National,
    equips: Equip[]
): EquipBonusSeek {
    let total_bonus = 0;
    const disable_ids: EquipId[] = []; // 重複不可のがきたらこれに追加
    for (let i = 0;i < equips.length;i++) {
        const equip = equips[i];
        const {
            id: equip_id,
        } = equip;
        switch (equip_id) {
            case 315: // SG初期
                if (includes_ship_name(['丹陽', '雪風改二'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (national === National.USA) {
                    total_bonus += 4;
                }
                break;
            case 456: // SG後期
                if (includes_ship_name(['丹陽', '雪風改二'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (national === National.USA) {
                    total_bonus += 4;
                } else if (national === National.UK) {
                    total_bonus += 2;
                }
                break;
            case 278: // SK
                if (national === National.USA) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            case 279: // SK+SG
                if (national === National.USA) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 2;
                        disable_ids.push(equip_id);
                    }
                } else if (national === National.UK) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            case 517: { // 清霜逆探
                if (ship_name === '清霜改二丁') {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (includes_ship_name(['朝霜改二', '清霜改二', '初霜改二', '潮改二', 'Верный', '霞改二', '時雨改三', '雪風改二'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 2;
                        disable_ids.push(equip_id);
                    }
                } else if (national === National.Japan && ship_type === ShipType.DD) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            }
            case 30: // 21号対空電探
            case 410: { // 21号対空電探改二
                const AKIZUKI_BASE_NAMES: ShipName[] = ['秋月', '照月', '初月', '涼月', '冬月'];
                const MOGAMI_KAI_OR_MORE: ShipName[] = ['最上改', '最上改二', '最上改二特']; // 無印は含まない
                if (
                    some_startsWith_ship_name(AKIZUKI_BASE_NAMES, ship_name) ||
                    some_startsWith_ship_name(MOGAMI_KAI_OR_MORE, ship_name)
                ) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 2;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            }
            case 118: { // 紫雲
                if (startsWith_ship_name('大淀', ship_name)) {
                    total_bonus += 2;
                    if (equip.improvement === 10) { // 改修maxで更に+1
                        total_bonus += 1;
                    }
                }
                break;
            }
            case 414: { // SOC seagull
                if (national === National.USA) {
                    if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
                        if (is_not_yet_duplicated(disable_ids, equip_id)) {
                            total_bonus += 2;
                            // 改修でさらにボーナス
                            if (equip.improvement > 3) {
                                total_bonus += 1;
                            }
                            disable_ids.push(equip_id);
                        }
                    } else if (ship_type === ShipType.BB) {
                        if (is_not_yet_duplicated(disable_ids, equip_id)) {
                            total_bonus += 1;
                            disable_ids.push(equip_id);
                        }
                    }
                }
                break;
            }
            case 115: // Ar196改
                if (some_startsWith_ship_name(['Bismarck', 'Prinz Eugen'], ship_name)) {
                    total_bonus += 2;
                }
                break;
            case 371: // Fairey Seafox改
                if (startsWith_ship_name('Gotland', ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 6;
                        disable_ids.push(equip_id);
                    }
                } else if (startsWith_ship_name('Nelson', ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 5;
                        disable_ids.push(equip_id);
                    }
                } else if (startsWith_ship_name('Commandant Teste', ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 4;
                        disable_ids.push(equip_id);
                    }
                } else if (some_startsWith_ship_name(['Warspite', 'Richelieu', 'Jean Bart'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            case 370: // Swordfish Mk.II改(水偵型)
                if (startsWith_ship_name('Warspite', ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (some_startsWith_ship_name(['Nelson', 'Sheffield', 'Gotland'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 2;
                        disable_ids.push(equip_id);
                    }
                } else if (some_startsWith_ship_name(['Commandant Teste', '瑞穂', '神威'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            case 194: { // Laté 298B
                if (some_startsWith_ship_name(['Commandant Teste', 'Richelieu', 'Jean Bart', '瑞穂', '神威'], ship_name)) {
                    total_bonus += 2;
                    disable_ids.push(equip_id);
                }
                break;
            }
            case 415: // SO3C Seamew改
                if (national === National.USA) {
                    if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
                        if (is_not_yet_duplicated(disable_ids, equip_id)) {
                            total_bonus += 2;
                            disable_ids.push(equip_id);
                        }
                    } else if (ship_type === ShipType.BB) {
                        if (is_not_yet_duplicated(disable_ids, equip_id)) {
                            total_bonus += 1;
                            disable_ids.push(equip_id);
                        }
                    }
                }
                break;
            case 369: // Swordfish Mk.III改(水上機型/熟練)
                if (ship_name === 'Gotland andra') {
                    if (disable_ids.filter(item => item === equip_id).length === 0) {
                        total_bonus += 4;
                        disable_ids.push(equip_id);
                    } else if (disable_ids.filter(item => item === equip_id).length === 1) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                } else if (some_startsWith_ship_name(['Gotland', 'Commandant Teste'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (some_startsWith_ship_name(['瑞穂', '神威'], ship_name)) {
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 2;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            case 368: // Swordfish Mk.III改(水上機型)
                if (ship_name === 'Gotland andra') {
                    if (disable_ids.filter(item => item === equip_id).length === 0) {
                        total_bonus += 4;
                        disable_ids.push(equip_id);
                    } else if (disable_ids.filter(item => item === equip_id).length < 5) {
                        total_bonus += 3;
                        disable_ids.push(equip_id);
                    }
                } else if (startsWith_ship_name('Gotland', ship_name)) {
                    total_bonus += 3;
                } else if (some_startsWith_ship_name(['Commandant Teste', '瑞穂', '神威'], ship_name)) {
                    total_bonus += 2;
                }
                break;
            case 367: // Swordfish(水上機型)
                if (some_startsWith_ship_name(['Gotland', 'Commandant Teste', '瑞穂', '神威'], ship_name)) {
                    total_bonus += 1;
                }
                break;
            case 408: // 装甲艇(AB艇)
                if (startsWith_ship_name('神州丸', ship_name)) {
                    total_bonus += 2;
                } else if (
                    startsWith_ship_name('あきつ丸', ship_name) ||
                    ship_type === ShipType.DD
                ) { // 本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
                    total_bonus += 1;
                }
                break;
            case 409: // 武装大発
                if (startsWith_ship_name('神州丸', ship_name)) {
                    total_bonus += 2;
                } else if (startsWith_ship_name('あきつ丸', ship_name)) {
                    total_bonus += 1;
                }
                break;
            case 412: // 水雷見張員
                if (national === National.Japan) {
                    if (ship_type === ShipType.DD) {
                        total_bonus += 1;
                    } else if ([ShipType.CL, ShipType.CT, ShipType.CLT].includes(ship_type)) {
                        total_bonus += 3;
                    } else if ([ShipType.CA, ShipType.CAV].includes(ship_type)) {
                        total_bonus += 1;
                    }
                }
                break;
            case 129: // 見張員
                if (national === National.Japan) {
                    if (ship_type === ShipType.DD) {
                        total_bonus += 1;
                    } else if ([ShipType.CL, ShipType.CT, ShipType.CLT].includes(ship_type)) {
                        total_bonus += 3;
                    } else if ([ShipType.CA, ShipType.CAV].includes(ship_type)) {
                        total_bonus += 3;
                    }
                }
                break;
            case 521: { // 紫雲(熟練)
                if (ship_name === '大淀改') {
                    if (equip.improvement > 0) { // 改修1以上で+5
                        total_bonus += 5;
                    }
                    if (equip.improvement > 3) { // ☆4以上で更に+1
                        total_bonus += 1;
                    }
                } else if (ship_name === '三隈改二特') {
                    if (equip.improvement > 0) { // 改修1以上で+4
                        total_bonus += 4;
                    }
                }
                break;
            }
            case 522: // 零式小型水上機
                if ([ShipType.SS, ShipType.SSV].includes(ship_type)) {
                    total_bonus += 3;
                }
                break;
            case 523: // 零式小型水上機(熟練)
                if ([ShipType.SS, ShipType.SSV].includes(ship_type)) {
                    total_bonus += 4;
                }
                break;
            case 527: // Type281 レーダー
                if (national === National.UK) {
                    total_bonus += 2;
                }
                break;
            case 273: { // 彩雲(偵四)
                if (equip.improvement === 2) { // ☆2のときのみ
                    if (is_not_yet_duplicated(disable_ids, equip_id)) {
                        total_bonus += 1;
                        disable_ids.push(equip_id);
                    }
                }
                break;
            }
            case 510: // Walrus
                if (some_startsWith_ship_name(['Nelson', 'Rodney'], ship_name)) { // 含同改
                    total_bonus += 5;
                } else if (some_startsWith_ship_name(['Warspite', 'Sheffield'], ship_name)) { // 含同改
                    total_bonus += 2;
                }
                break;
            case 545: // 天山一二型甲改二(村田隊/電探装備)
                if (includes_ship_name(['翔鶴改二', '翔鶴改二甲'], ship_name)) {
                    total_bonus += 2;
                } else if (includes_ship_name(['瑞鶴改二','瑞鶴改二甲','加賀改二護','大鳳改','赤城改二戊','加賀改二戊'], ship_name)) {
                    total_bonus += 1;
                }
                break;
        }
    }

    return total_bonus as EquipBonusSeek;
}