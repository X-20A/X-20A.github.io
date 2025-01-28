import { EquipInDeck, Improvement, SpeedId, FleetSpeedName, FleetTypeId, FleetTypeName } from '@/classes/types';

export function convertFleetSpeedIdToName(speed_id: SpeedId): FleetSpeedName {
	let speed_name = '低速艦隊' as FleetSpeedName;
	switch (speed_id) {
		case 1:
			speed_name = '高速艦隊';
			break;
		case 2:
			speed_name = '高速+艦隊';
			break;
		case 3:
			speed_name = '最速艦隊';
	}

	return speed_name;
}

export function convertFleetSpeedNameToId(speed_name: FleetSpeedName): number {
    let speed_id = 1;
    switch (speed_name) {
        case '低速艦隊':
            speed_id = 1;
            break;
        case '高速艦隊':
            speed_id = 2;
            break;
        case '高速+艦隊':
            speed_id = 3;
            break;
        case '最速艦隊':
            speed_id = 4;
            break;
    }

    return speed_id * 5;
}


export function convertFleetTypeIdToName(fleet_type_id: FleetTypeId): FleetTypeName {
	let fleet_type_name = '通常艦隊' as FleetTypeName;
	switch (fleet_type_id) {
		case 1:
			fleet_type_name = '空母機動部隊';
			break;
		case 2:
			fleet_type_name = '水上打撃部隊';
			break;
		case 3:
			fleet_type_name = '輸送護衛部隊';
			break;
    }

	return fleet_type_name;
}

export function convertFleetTypeNameToId() {

}