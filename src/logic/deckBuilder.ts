import CacheFleet from '@/core/CacheFleet';
import Ship from '@/models/Ship';
import type { EquipInDeck, Improvement } from '@/models/types';
import type DeckBuilder from '@/models/types/DeckBuilder';
import type {
    DeckBuilderFleet,
    DeckBuilderShip,
    DeckBuilderItem
} from '@/models/types/DeckBuilder';
import CustomError from "@/errors/CustomError";
import { isNumber } from '@/logic/util';
import type AdoptFleet from '@/core/AdoptFleet';


/**
 * デッキビルダーからCacheFleet[]を生成    
 * 艦隊(艦)が少なくとも一つあることを保証(なければエラー)
 * @param deck 入力されたデッキビルダー
 * @returns - デッキビルダーから読み取った艦隊インスタンス
 * @throws {Error} - デッキビルダーの形式がまずかったり、艦隊が空だったりするとエラーを投げるのでcatchすること
 */
export function createCacheFleetsFromDeckBuilder(deck: DeckBuilder): CacheFleet[] {
	const fleets = [] as CacheFleet[];
    
	const command_lv = isNumber(deck.hqlv) ? Number(deck.hqlv): 120;
	for (let i = 1;i < 5;i++) { // 艦隊
        const fleet_key = `f${i}` as 'f1'|'f2'|'f3'|'f4';
		if (!deck[fleet_key]) continue;

		const ships = [] as Ship[];
		const fleet_deck = deck[fleet_key];
		for (let j = 1;j <= 7;j++) { // 艦
            const ship_key = `s${j}` as 's1'|'s2'|'s3'|'s4'|'s5'|'s6'|'s7';
			if (!fleet_deck[ship_key]) continue;

			const ship_deck = fleet_deck[ship_key];
			const equips = [] as EquipInDeck[];
			if (ship_deck.items) {
				const keys = Object.keys(ship_deck.items);
				for (let k = 0; k < keys.length; k++) { // 装備
					const key = keys[k];
					const item = ship_deck.items[key];
					if (isNumber(item.id) && isNumber(item.id)) {
						const id = Number(item.id);
						const implovement = Number(item.rf);

						const equip: EquipInDeck = {
							id: id,
							improvement: [0,1,2,3,4,5,6,7,8,9,10].includes(implovement)
                            ? implovement as Improvement
                            : 0,
                            is_ex: key === 'ix',
                        }
						equips.push(equip);
					}
					if (k === 6) break; // 6個目で抜ける
				}
			}
			
			const id = ship_deck.id;
			const lv = ship_deck.lv;
			const hp = ship_deck.hp;
			const asw = ship_deck.asw;
            const luck = ship_deck.luck;

			if (!(isNumber(id) && isNumber(lv))) {
				throw new CustomError('デッキビルダーの形式に誤りがあります');
			}

			const ship = new Ship(
				i,
				j,
				Number(id),
				Number(lv),
				equips,
				Number(hp),
				Number(asw),
                Number(luck),
			);
			ships.push(ship);
		}
		if (ships.length === 0) continue;

		const fleet = new CacheFleet(ships, command_lv);
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