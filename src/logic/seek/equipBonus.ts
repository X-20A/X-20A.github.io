import
{ NA as National, ST as ShipType }
    from '@/data/ship';
import { createEquipBonusSeek, EquipBonusSeek } from '../../models/types/brand';
import { Equip } from '@/models/Equip';

/** 装備ボーナスを計算して返す */
export function calcBonus(
    ship_name: string,
    ship_type: ShipType,
    national: National,
    equips: Equip[]
): EquipBonusSeek {
    let total_bonus = 0;
    const disable_ids: number[] = []; // 重複不可のがきたらこれに追加
    for (let i = 0;i < equips.length;i++) {
        const equip = equips[i];
        switch (equip.id) {
            case 315: // SG初期
                if (['丹陽', '雪風改二'].includes(ship_name)) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (national === National.USA) {
                    total_bonus += 4;
                }
                break;
            case 456: // SG後期
                if (['丹陽', '雪風改二'].includes(ship_name)) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (national === National.USA) {
                    total_bonus += 4;
                } else if (national === National.UK) {
                    total_bonus += 2;
                }
                break;
            case 278: // SK
                if (national === National.USA) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            case 279: // SK+SG
                if (national === National.USA) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 2;
                        disable_ids.push(equip.id);
                    }
                } else if (national === National.UK) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            case 517: { // 清霜逆探
                if (ship_name === '清霜改二丁') {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (['朝霜改二', '清霜改二', '初霜改二', '潮改二', 'Верный', '霞改二', '時雨改三', '雪風改二'].includes(ship_name)) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 2;
                        disable_ids.push(equip.id);
                    }
                } else if (national === National.Japan && ship_type === ShipType.DD) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            }
            case 30: // 21号対空電探
            case 410: { // 21号対空電探改二
                const akizuki = ['秋月', '照月', '初月', '涼月', '冬月'];
                const mogami = ['最上改', '最上改二', '最上改二特'];
                if (akizuki.some(item => ship_name.startsWith(item)) || mogami.includes(ship_name)) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 2;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            }
            case 118: { // 紫雲
                if (ship_name.includes('大淀')) {
                    total_bonus += 2;
                    if (equip.implovement === 10) { // 改修maxで更に+1
                        total_bonus += 1;
                    }
                }
                break;
            }
            case 414: { // SOC seagull
                if (national === National.USA) {
                    if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
                        if (!disable_ids.includes(equip.id)) {
                            total_bonus += 2;
                            // 改修でさらにボーナス
                            if (equip.implovement > 3) {
                                total_bonus += 1;
                            }
                            disable_ids.push(equip.id);
                        }
                    } else if (ship_type === ShipType.BB) {
                        if (!disable_ids.includes(equip.id)) {
                            total_bonus += 1;
                            disable_ids.push(equip.id);
                        }
                    }
                }
                break;
            }
            case 115: // Ar196改
                if (['Bismarck', 'Prinz Eugen'].some(item => ship_name.startsWith(item))) {
                    total_bonus += 2;
                }
                break;
            case 371: // Fairey Seafox改
                if (ship_name.includes('Gotland')) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 6;
                        disable_ids.push(equip.id);
                    }
                } else if (ship_name.includes('Nelson')) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 5;
                        disable_ids.push(equip.id);
                    }
                } else if (ship_name.includes('Commandant Teste')) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 4;
                        disable_ids.push(equip.id);
                    }
                } else if (['Warspite', 'Richelieu', 'Jean Bart'].some(item => ship_name.startsWith(item))) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            case 370: // Swordfish Mk.II改(水偵型)
                if (ship_name.includes('Warspite')) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (['Nelson', 'Sheffield', 'Gotland'].some(item => ship_name.startsWith(item))) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 2;
                        disable_ids.push(equip.id);
                    }
                } else if (['Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            case 194: { // Laté 298B
                if (['Commandant Teste', 'Richelieu', 'Jean Bart', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
                    total_bonus += 2;
                    disable_ids.push(equip.id);
                }
                break;
            }
            case 415: // SO3C Seamew改
                if (national === National.USA) {
                    if ([ShipType.CL, ShipType.CA].includes(ship_type)) {
                        if (!disable_ids.includes(equip.id)) {
                            total_bonus += 2;
                            disable_ids.push(equip.id);
                        }
                    } else if (ship_type === ShipType.BB) {
                        if (!disable_ids.includes(equip.id)) {
                            total_bonus += 1;
                            disable_ids.push(equip.id);
                        }
                    }
                }
                break;
            case 369: // Swordfish Mk.III改(水上機型/熟練)
                if (ship_name === 'Gotland andra') {
                    if (disable_ids.filter(item => item === equip.id).length === 0) {
                        total_bonus += 4;
                        disable_ids.push(equip.id);
                    } else if (disable_ids.filter(item => item === equip.id).length === 1) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                } else if (['Gotland', 'Commandant Teste'].some(item => ship_name.startsWith(item))) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (['瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 2;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            case 368: // Swordfish Mk.III改(水上機型)
                if (ship_name === 'Gotland andra') {
                    if (disable_ids.filter(item => item === equip.id).length === 0) {
                        total_bonus += 4;
                        disable_ids.push(equip.id);
                    } else if (disable_ids.filter(item => item === equip.id).length < 5) {
                        total_bonus += 3;
                        disable_ids.push(equip.id);
                    }
                } else if (ship_name.includes('Gotland')) {
                    total_bonus += 3;
                } else if (['Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
                    total_bonus += 2;
                }
                break;
            case 367: // Swordfish(水上機型)
                if (['Gotland', 'Commandant Teste', '瑞穂', '神威'].some(item => ship_name.startsWith(item))) {
                    total_bonus += 1;
                }
                break;
            case 408: // 装甲艇(AB艇)
                if (ship_name.includes('神州丸')) {
                    total_bonus += 2;
                } else if (ship_name.includes('あきつ丸') || ship_type === ShipType.DD) { // 本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
                    total_bonus += 1;
                }
                break;
            case 409: // 武装大発
                if (ship_name.includes('神州丸')) {
                    total_bonus += 2;
                } else if (ship_name.includes('あきつ丸')) {
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
                    if (equip.implovement > 0) { // 改修1以上で+5
                        total_bonus += 5;
                    }
                    if (equip.implovement > 3) { // ☆4以上で更に+1
                        total_bonus += 1;
                    }
                } else if (ship_name === '三隈改二特') {
                    if (equip.implovement > 0) { // 改修1以上で+4
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
                if (equip.implovement === 2) { // ☆2のときのみ
                    if (!disable_ids.includes(equip.id)) {
                        total_bonus += 1;
                        disable_ids.push(equip.id);
                    }
                }
                break;
            }
            case 510: // Walrus
                if (['Nelson', 'Rodney'].includes(ship_name)) { // 含同改
                    total_bonus += 5;
                } else if (['Warspite', 'Sheffield'].includes(ship_name)) { // 含同改
                    total_bonus += 2;
                }
                break;
            case 545: // 天山一二型甲改二(村田隊/電探装備)
                if (['翔鶴改二', '翔鶴改二甲'].includes(ship_name)) {
                    total_bonus += 2;
                } else if (['瑞鶴改二','瑞鶴改二甲','加賀改二護','大鳳改','赤城改二戊','加賀改二戊'].includes(ship_name)) {
                    total_bonus += 1;
                }
                break;
        }
    }

    return createEquipBonusSeek(total_bonus);
}