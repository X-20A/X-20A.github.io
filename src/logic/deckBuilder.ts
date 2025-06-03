import { type FleetComponent, createFleetComponent } from '@/core/FleetComponent';
import type { Ship } from '@/models/Ship';
import { createShip } from '@/models/Ship';
import type { EquipInDeck, Improvement } from '@/models/types';
import type DeckBuilder from '@/models/types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderShip,
    DeckBuilderItem
} from '@/models/types/DeckBuilder';
import CustomError from "@/errors/CustomError";
import { isExistsAndNumber } from '@/logic/util';
import type { AdoptFleet } from '@/core/AdoptFleet';
import type { ShipDatas } from '@/data/ship';
import type { EquipDatas } from '@/data/equip';
import { brandFleetIndex, brandShipAsw, brandShipHp, brandShipId, brandShipIndex, brandShipLuck, brandShipLv } from '@/models/types/brand';

/**
 * デッキビルダーからFleetComponent[]を生成    
 * 艦隊(艦)が少なくとも一つあることを保証(なければエラー)
 * @param deck 入力されたデッキビルダー
 * @returns - デッキビルダーから読み取った艦隊インスタンス
 * @throws {Error} - デッキビルダーの形式がまずかったり、艦隊が空だったりするとエラーを投げるのでcatchすること
 */
export function createFleetComponentsFromDeckBuilder(
    deck: DeckBuilder,
    ship_datas: ShipDatas,
    equip_datas: EquipDatas,
): FleetComponent[] {
	const fleets = [] as FleetComponent[];
    
	const command_lv = isExistsAndNumber(deck.hqlv) ? Number(deck.hqlv) : 120;
	for (let fleet_index = brandFleetIndex(1);fleet_index < 5;fleet_index++) { // 艦隊
        const fleet_key = `f${fleet_index}` as 'f1'|'f2'|'f3'|'f4';
		if (!deck[fleet_key]) continue;

		const ships = [] as Ship[];
		const fleet_deck = deck[fleet_key];
		for (let ship_index = brandShipIndex(1);ship_index <= 7;ship_index++) { // 艦
            const ship_key = `s${ship_index}` as 's1'|'s2'|'s3'|'s4'|'s5'|'s6'|'s7';
			if (!fleet_deck[ship_key]) continue;

			const ship_deck = fleet_deck[ship_key];
			const equip_decks = [] as EquipInDeck[];
			if (ship_deck.items) {
				const keys = Object.keys(ship_deck.items);
				for (let k = 0; k < keys.length; k++) { // 装備
					const key = keys[k];
					const item = ship_deck.items[key];
					if (isExistsAndNumber(item.id) && isExistsAndNumber(item.id)) {
						const id = item.id;
						const implovement = item.rf ?? 0;

						const equip: EquipInDeck = {
							id: id,
							improvement: [0,1,2,3,4,5,6,7,8,9,10].includes(implovement)
                            ? implovement as Improvement
                            : 0,
                            is_ex: key === 'ix',
                        }
						equip_decks.push(equip);
					}
					if (k === 6) break; // 6個目で抜ける
				}
			}
			
            const ship_id = brandShipId(ship_deck.id);
            const ship_lv = brandShipLv(ship_deck.lv);
            const ship_hp = brandShipHp(ship_deck.hp);
            const ship_asw = brandShipAsw(ship_deck.asw);
            const ship_luck = brandShipLuck(ship_deck.luck);

			const ship = createShip(
				fleet_index,
				ship_index,
                ship_datas,
                equip_datas,
				ship_lv,
                ship_id,
				equip_decks,
				ship_hp,
				ship_asw,
                ship_luck,
			);
			ships.push(ship);
		}
		if (ships.length === 0) continue;

		const fleet = createFleetComponent(ships, command_lv);
		fleets.push(fleet);
	}
	if (!fleets.length) {
		throw new CustomError('艦隊が空です');
	}

	return fleets;
}

export function createDeckBuilderFromAdoptFleet(adoptFleet: AdoptFleet): DeckBuilder {
    const deck = {} as DeckBuilder;
    for (let i = 0;i < adoptFleet.fleets.length;i++) {
        const fleet = adoptFleet.fleets[i];
        
        const deck_fleet = {} as DeckBuilderFleet;
        for (let j = 0;j < fleet.ships.length;j++) {
            const ship = fleet.ships[j];

            const deck_ship = {} as DeckBuilderShip;
            deck_ship.id = ship.id;
            deck_ship.lv = ship.lv;
            deck_ship.luck = ship.luck;
            deck_ship.hp = ship.hp;
            deck_ship.fp = 0;
            deck_ship.tp = 0;
            deck_ship.aa = 0;
            deck_ship.ar = 0;
            deck_ship.asw = ship.asw;
            deck_ship.ev = 0;
            deck_ship.los = Number(ship.status_seek);
            const deck_item: { [name: string]: DeckBuilderItem } = {};
            for (let k = 0;k < ship.equip_in_decks.length;k++) {
                const equip = ship.equip_in_decks[k];

                const deck_equip = {
                    id: equip.id,
                    rf: equip.improvement,
                    mas: 7
                };
                
                if (equip.is_ex) {
                    deck_item.ix = deck_equip;
                } else {
                    deck_item[`i${k + 1}`] = deck_equip;
                }
                
            }
            deck_ship.items = deck_item;

            deck_fleet[`s${j + 1}` as 's1'|'s2'|'s3'|'s4'|'s5'|'s6'|'s7'] = deck_ship;
        }

        deck[`f${i + 1}` as |'f1'|'f2'] = deck_fleet;
    }

    return deck;
}