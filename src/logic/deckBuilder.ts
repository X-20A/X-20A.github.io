import { type FleetComponent, derive_fleet_component } from '../models/fleet/FleetComponent';
import type { EquippedShip } from '../models/ship/EquippedShip';
import { derive_equipped_ship } from '../models/ship/EquippedShip';
import type { EquipInDeck, Improvement } from '../types';
import type DeckBuilder from '../types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderShip,
    DeckBuilderItem
} from '../types/DeckBuilder';
import CustomError from "../errors/CustomError";
import { is_exists_and_Number } from '../logic/util';
import type { AdoptFleet } from '../models/fleet/AdoptFleet';
import { brandShipAsw, brandShipHp, brandShipIndex, brandShipLuck, brandShipLv } from '../types/brand';
import { derive_equip } from '../models/Equip';
import { derive_naked_ship } from '../models/ship/NakedShip';
import { derive_fleet_unit } from '../models/fleet/FleetUnit';

/**
 * デッキビルダーからFleetComponent[]を生成    
 * 艦隊(艦)が少なくとも一つあることを保証(なければエラー)
 * @param deck 入力されたデッキビルダー
 * @returns - デッキビルダーから読み取った艦隊インスタンス
 * @throws {Error} - デッキビルダーの形式がまずかったり、艦隊が空だったりするとエラーを投げるのでcatchすること
 */
export function derive_FleetComponents_from_DeckBuilder(
    deck: DeckBuilder,
): FleetComponent[] {
	const fleets = [] as FleetComponent[];
    
	const command_lv = is_exists_and_Number(deck.hqlv) ? Number(deck.hqlv) : 120;
	for (let fleet_index = 1;fleet_index < 5;fleet_index++) { // 艦隊
        const fleet_key = `f${fleet_index}` as 'f1'|'f2'|'f3'|'f4';
		if (!deck[fleet_key]) continue;

		const ships = [] as EquippedShip[];
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
					if (is_exists_and_Number(item.id) && is_exists_and_Number(item.id)) {
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
			
            const ship_id = ship_deck.id;
            const ship_lv = brandShipLv(ship_deck.lv);
            const ship_hp = brandShipHp(ship_deck.hp);
            const ship_asw = brandShipAsw(ship_deck.asw);
            const ship_luck = brandShipLuck(ship_deck.luck);

            const naked_ship = derive_naked_ship(
                ship_lv,
                ship_id,
                ship_hp,
                ship_asw,
                ship_luck,
            );

            const equips = equip_decks.map(equip_deck =>
                derive_equip(
                    equip_deck.id,
                    equip_deck.improvement,
                    equip_deck.is_ex,
                )
            );

			const ship = derive_equipped_ship(
                naked_ship,
                equips,
			);
			ships.push(ship);
		}
		if (ships.length === 0) continue;

        const units = ships.map((ship, index) => derive_fleet_unit(index, ship));
        const fleet = derive_fleet_component(units, command_lv);
		fleets.push(fleet);
	}
	if (!fleets.length) {
		throw new CustomError('艦隊が空です');
	}

	return fleets;
}

export function derive_DeckBuilder_from_AdoptFleet(
    adoptFleet: AdoptFleet,
): DeckBuilder {
    const deck = {} as DeckBuilder;
    for (let i = 0;i < adoptFleet.fleets.length;i++) {
        const fleet = adoptFleet.fleets[i];
        
        const deck_fleet = {} as DeckBuilderFleet;
        for (let j = 0;j < fleet.units.length;j++) {
            const ship = fleet.units[j].ship;

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
            for (let k = 0;k < ship.equips.length;k++) {
                const equip = ship.equips[k];

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