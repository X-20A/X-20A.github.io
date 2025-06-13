import { describe, it, expect } from 'vitest';
import path, { basename } from 'node:path';
import fs from 'node:fs';
import axios from 'axios';
import SHIP_DATAS, { ST as ShipType } from '@/data/ship';
import EQUIP_DATAS, { EquipType } from '@/data/equip';

describe('Dataテスト', () => {
    it('data-test: 制空シミュのデータと照合して艦や装備に抜けや不一致が無いか確認', async () => {
        // Cors回避のために別途プロキシサーバを起動してから
        const response = await axios.get(
            'http://localhost:3000/proxy'
        );
        expect(200).toBe(response.status); // 通信成功確認

        type MasterShip = {
            id: number,
            name: string,
            type: ShipType,
            min_scout: number,
            scout: number,
        }
        type MasterItem = {
            id: number,
            name: string,
            type: EquipType,
            scout: number,
        }
        const master = response.data;
        const ac_ships: MasterShip[] = master.ships;
        const ac_items: MasterItem[] = master.items;

        type MissingShip = {
            id: number,
            ship_name: string,
            type: ShipType,
            seek: number,
            seek2: number,
        }
        type MismatchShipParam = {
            param: 'name' | 'type' | 'seek' | 'seek2',
            ship_name: string,
            master_param: number | string,
        }
        const missing_ships = [] as MissingShip[];
        const mismatch_ship_params = [] as MismatchShipParam[];
        for (const ac_ship of ac_ships) { // 艦データ照合
            const id = ac_ship.id;

            const ship = SHIP_DATAS[id];
            if (!ship) {
                missing_ships.push({
                    id: id,
                    ship_name: ac_ship.name,
                    type: ac_ship.type,
                    seek: ac_ship.min_scout,
                    seek2: ac_ship.scout,
                });
                continue;
            }

            if (ac_ship.name !== ship.name) {
                mismatch_ship_params.push({
                    param: 'name',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.name,
                });
            }

            if (ac_ship.type !== ship.type) {
                // こちらでは高速戦艦と低速戦艦をデータでは区別しない
                if (!(Number(ac_ship.type) === 8 && ship.type === ShipType.BB)) {
                    mismatch_ship_params.push({
                        param: 'type',
                        ship_name: ac_ship.name,
                        master_param: ac_ship.type,
                    });
                }
            }

            if (ac_ship.min_scout !== ship.seek) {
                mismatch_ship_params.push({
                    param: 'seek',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.min_scout,
                });
            }

            if (ac_ship.scout !== ship.seek2) {
                mismatch_ship_params.push({
                    param: 'seek2',
                    ship_name: ac_ship.name,
                    master_param: ac_ship.scout,
                });
            }
        }
        if (missing_ships.length) console.log('艦に不足: ', missing_ships);
        if (mismatch_ship_params.length) console.log('艦パラメータ不一致: ', mismatch_ship_params);

        // 空であることを確認
        expect(0).toBe(missing_ships.length);
        expect(0).toBe(mismatch_ship_params.length);

        // 艦バナー画像の存在チェック
        const missing_banners: number[] = [];
        const banners_dir = path
            .resolve(__dirname, '../public/banners')
            .replaceAll('\\tests', ''); // なぜか compass\tests みたいになってるので除去
        for (const ac_ship of ac_ships) {
            const banner_path = path.join(banners_dir, `${ac_ship.id}.png`);
            if (!fs.existsSync(banner_path)) {
                missing_banners.push(ac_ship.id);
            }
        }
        if (missing_banners.length) {
            console.log('バナー画像が存在しない艦ID: ', missing_banners);
        }
        expect(0).toBe(missing_banners.length);

        type MissingEquip = {
            id: number,
            name: string,
            seek: number,
            equip_type: EquipType,
        }
        type MismatchEquipParam = {
            name: string,
            param: 'type' | 'seek',
            master_param: number,
        }
        const missing_equips = [] as MissingEquip[];
        const mismatch_equip_params = [] as MismatchEquipParam[];
        for (const ac_item of ac_items) { // 装備データ照合
            const id = ac_item.id;
            // 深海、[陸攻、陸戦、陸偵、深山] 弾き
            if (id > 1500 || [47, 48, 49, 53].includes(Number(ac_item.type))) continue;

            const equip = EQUIP_DATAS[id];
            if (!equip) {
                missing_equips.push({
                    id: id,
                    name: ac_item.name,
                    seek: ac_item.scout,
                    equip_type: ac_item.type,
                });
                continue;
            }

            if (ac_item.type !== equip[1]) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'type',
                    master_param: ac_item.type,
                });
            }

            if (ac_item.scout !== equip[0]) {
                mismatch_equip_params.push({
                    name: ac_item.name,
                    param: 'seek',
                    master_param: ac_item.scout,
                });
            }
        }

        if (missing_equips.length) console.log('装備に不足: ', missing_equips);
        if (mismatch_equip_params.length) console.log('装備パラメータ不一致: ', mismatch_equip_params);

        // 空であることを確認
        expect(0).toBe(missing_equips.length);
        expect(0).toBe(mismatch_equip_params.length);
    });
});