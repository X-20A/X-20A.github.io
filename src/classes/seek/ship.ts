import { ShipData } from '@/classes/types';
import { EquipBonusSeek } from '../types/brand';

export function calcShipSeek(ship_data: ShipData, bonus_seek: EquipBonusSeek, lv: number): number {
    // 現在のレベルにおける素索敵値を計算
    const max_seek = ship_data.seek2;
    const min_seek = ship_data.seek;
    const status_seek = Math.floor(((max_seek - min_seek) * (lv / 99)) + min_seek);

    // 素索敵値 + ボーナス値の平方根を計算
    return Math.sqrt(status_seek + bonus_seek);
}