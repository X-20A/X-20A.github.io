import type Composition from '@/classes/Composition';
import type { SpeedId, FleetSpeedName, FleetTypeId, FleetTypeName, AreaId, ItemIconKey } from '@/classes/types';

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

/**
 * branch_dataをhtml文字列に変換して返す。サニタイズはしませんよ
 * @param convertedData 
 * @returns 
 */
export function convertBranchDataToHTML(data: string, topic: string): string {
    let converted_data = data;
    converted_data = converted_data.replaceAll('$e', '<br>');
    converted_data = converted_data.replaceAll('$i', '&nbsp;&nbsp;&nbsp;&nbsp;');
    converted_data = converted_data.replaceAll('$co', '<span style="color:red;">');
    converted_data = converted_data.replaceAll('$oc', '</span>');
    converted_data = converted_data.replaceAll('$bo', '<span style="font-weight:bold;">');
    converted_data = converted_data.replaceAll('$ob', '</span>');
    converted_data = converted_data.replaceAll('$da', '<span style="color:#4800ff;">第五艦隊</span>');
    converted_data = converted_data.replaceAll(
        '$or',
        `<a
			href="https://x-20a.github.io/reference/?topic=${encodeURIComponent(topic)}"
			style="color:blue;"
			target="_blank"
			rel="noopener noreferrer"
		>`,
    );
    converted_data = converted_data.replaceAll('$ro', '</a>');

    return converted_data;
}

export async function generateResourceHtml(
    drew_area: AreaId,
    node: string,
    composition: Composition,
    fleet_total_drum: number,
    fleet_total_craft: number,
    icons: Record<ItemIconKey, string>
) {
    let html = '';
    const resource_status = {
        fuel: null as number | number[] | null,
        max_fuel: null as number | null,
        ammo: null as number | number[] | null,
        max_ammo: null as number | null,
        steel: null as number | number[] | null,
        max_steel: null as number | null,
        imo: null as number | number[] | null,
        max_imo: null as number | null,
        is_nomal: true, // ドラム缶*2 + 大発系*3ならtrue(含ボーキのドラム缶*1.5)
        memo: '',
    };
    interface Resources {
        fuel: number;
        ammo: number;
        steel: number;
        imo: number;
    };
    const resource_total: Resources = {
        fuel: 0,
        ammo: 0,
        steel: 0,
        imo: 0
    };

    switch (drew_area) {
        case '1-2':
            if (node === 'B') {
                resource_status.ammo = [10, 20];
            } else {
                return;
            }
            break;
        case '1-3':
            if (node === 'D') {
                resource_status.fuel = [10, 20];
            } else if (node === 'G') {
                resource_status.fuel = [10, 30];
            } else {
                return;
            }
            break;
        case '1-4':
            if (node === 'C') {
                resource_status.steel = [10, 20];
            } else if (node === 'E') {
                resource_status.ammo = [10, 20];
            } else if (node === 'G') {
                resource_status.imo = [10, 20];
            } else {
                return;
            }
            break;
        case '1-6':
            if (node === 'G') {
                resource_status.ammo = 20;
                resource_status.max_ammo = 40;
                resource_status.is_nomal = false;
                mold('ammo', 0, 5);
            } else if (node === 'M') {
                resource_status.fuel = 40;
                resource_status.max_fuel = 80;
                resource_status.is_nomal = false;
                mold('fuel', 0, 10);
            } else {
                return;
            }
            break;
        case '2-1':
            if (node === 'B') {
                resource_status.steel = [10, 30];
            } else if (node === 'E') {
                resource_status.memo = '高速建造材:1';
            } else {
                return;
            }
            break;
        case '2-2':
            if (node === 'A') {
                resource_status.imo = [10, 20];
            } else if (node === 'F') {
                resource_status.imo = [15, 35];
            } else if (node === 'J') {
                resource_status.memo = '高速建造材:1';
            } else {
                return;
            }
            break;
        case '2-3':
            if (node === 'D') {
                resource_status.fuel = [15, 45];
            } else if (node === 'G') {
                resource_status.ammo = [15, 45];
            } else if (node === 'H') {
                resource_status.ammo = [35, 40];
            } else if (node === 'I') {
                resource_status.fuel = [15, 45];
            } else {
                return;
            }
            break;
        case '2-4':
            if (node === 'A') {
                resource_status.memo = '高速建造材:1<br>((上陸用舟艇+特型内火艇)4以上で+2個の確率が発生する？)';
            } else if (node === 'D') {
                resource_status.fuel = [25, 60];
            } else if (node === 'G') {
                resource_status.memo = '開発資材:1';
            } else if (node === 'N') {
                resource_status.ammo = [20, 60];
            } else {
                return;
            }
            break;
        case '2-5':
            if (node === 'M') {
                resource_status.fuel = 70;
                resource_status.is_nomal = false;
                mold('fuel', 0, 0);
            } else if (node === 'N') {
                resource_status.steel = [50, 60];
                resource_status.is_nomal = false;
                mold('steel', 0, 0);
            } else {
                return;
            }
            break;
        case '3-1':
            if (node === 'A') {
                resource_status.ammo = [35, 140];
            } else {
                return;
            }
            break;
        case '3-2':
            if (node === 'B') {
                resource_status.ammo = [50, 150];
            } else if (node === 'I') {
                resource_status.memo = '家具箱(小):1';
            } else {
                return;
            }
            break;
        case '3-3':
            if (node === 'D') {
                resource_status.memo = '家具箱(中):1';
            } else if (node === 'H') {
                resource_status.memo = '家具箱(大):1';
            } else {
                return;
            }
            break;
        case '3-4':
            if (node === 'E') {
                resource_status.imo = [25, 150];
            } else if (node === 'K') {
                resource_status.memo = '家具箱(大):1';
            } else if (node === 'O') {
                resource_status.memo = '家具箱(中):1';
            } else {
                return;
            }
            break;
        case '3-5':
            if (node === 'J') {
                resource_status.ammo = 50;
                resource_status.is_nomal = false;
                mold('ammo', 10, 0);
            } else {
                return;
            }
            break;
        case '4-1':
            if (node === 'B') {
                resource_status.fuel = [40, 120];
            } else {
                return;
            }
            break;
        case '4-2':
            if (node === 'J') {
                resource_status.imo = [40, 60];
            } else if (node === 'K') {
                resource_status.steel = [20, 80];
            } else {
                return;
            }
            break;
        case '4-3':
            if (node === 'B') {
                resource_status.fuel = [30, 90];
            } else if (node === 'J') {
                resource_status.imo = [50, 100];
            } else {
                return;
            }
            break;
        case '4-4':
            if (node === 'C') {
                resource_status.fuel = [60, 150];
            } else if (node === 'J') {
                resource_status.steel = [40, 70];
            } else {
                return;
            }
            break;
        case '5-1':
            if (node === 'C') {
                resource_status.steel = [25, 50];
            } else if (node === 'H') {
                resource_status.ammo = [45, 70];
                resource_status.is_nomal = false;
                mold('ammo', 0, 0);
            } else {
                return;
            }
            break;
        case '5-2':
            if (node === 'G') {
                resource_status.ammo = [20, 50];
            } else if (node === 'J') {
                resource_status.imo = [40, 80];
            } else {
                return;
            }
            break;
        case '5-3':
            if (node === 'F') {
                resource_status.ammo = [60, 80];
            } else if (node === 'H') {
                resource_status.steel = [50, 80];
            } else {
                return;
            }
            break;
        case '5-4':
            if (node === 'I') {
                resource_status.ammo = 60;
                resource_status.max_ammo = 180;
                resource_status.is_nomal = false;
                mold('ammo', 10, 15);
            } else {
                return;
            }
            break;
        case '5-5':
            if (node === 'E') {
                resource_status.fuel = 40;
                resource_status.max_fuel = 180;
                resource_status.is_nomal = false;
                mold('fuel', 15, 10);
            } else {
                return;
            }
            break;
        case '7-1':
            if (node === 'E') {
                resource_status.fuel = [10, 20];
            } else if (node === 'I') {
                resource_status.fuel = [30, 50];
            } else {
                return;
            }
            break;
        case '7-2':
            if (node === 'K') {
                resource_status.fuel = [25, 40];
            } else {
                return;
            }
            break;
        case '7-3':
            if (node === 'H') {
                resource_status.fuel = [30, 50];
            } else if (node === 'O') {
                resource_status.imo = [40, 50];
                resource_status.is_nomal = false;
                mold('imo', 2, 3);
            } else {
                return;
            }
            break;
        case '7-4':
            if (node === 'O') { // 7-4-Oはだいぶ特殊なのでフルスクラッチ
                let fuel = fleet_total_drum * 8 + fleet_total_craft * 7;
                fuel += composition.BBV * 10 + composition.CVL * 7 + composition.AV * 6 + composition.AS * 5 + composition.LHA * 8 + composition.AO * 22;
                let imo = fleet_total_drum * 6 + fleet_total_craft * 10;
                imo += composition.BBV * 10 + composition.CVL * 7 + composition.AV * 6 + composition.AS * 5 + composition.LHA * 8 + composition.AO * 22;
                html += `<p><img src="${icons.fuel}" class="item-icon"></p>`;
                html += "<p>base: 40</p>";
                html += "<p>max: 200</p>";
                html += `<p>add: <span style="font-weight:600;color:#1e00ff;">${fuel}</span> = <img src="${icons.drum}" class="item-icon drum-icon">${fleet_total_drum} * 8 + <img src="${icons.craft}" class="item-icon craft-icon">${fleet_total_craft} * 7</p>`;
                html += `<p>+ 航空戦艦 ${composition.BBV} * 10</p>`;
                html += `<p>+ 軽空母 ${composition.CVL} * 7</p>`;
                html += `<p>+ 水上機母艦 ${composition.AV} * 6</p>`;
                html += `<p>+ 潜水母艦 ${composition.AS} * 5</p>`;
                html += `<p>+ 揚陸艦 ${composition.LHA} * 8</p>`;
                html += `<p>+ 補給艦 ${composition.AO} * 22</p>`;
                html += `<p><img src="${icons.imo}" class="item-icon"></p>`;
                html += "<p>base: 20</p>";
                html += "<p>max: 120</p>";
                html += `<p>add: <span style="font-weight:600;color:#1e00ff;">${imo}</span> = <img src="${icons.drum}" class="item-icon drum-icon">${fleet_total_drum} * 6 + <img src="${icons.craft}" class="item-icon craft-icon">${fleet_total_craft} * 10</p>`;
                html += `<p>+ 航空戦艦 ${composition.BBV} * 10</p>`;
                html += `<p>+ 軽空母 ${composition.CVL} * 4</p>`;
                html += `<p>+ 水上機母艦 ${composition.AV} * 5</p>`;
                html += `<p>+ 潜水母艦 ${composition.AS} * 5</p>`;
                html += `<p>+ 揚陸艦 ${composition.LHA} * 7</p>`;
                html += `<p>+ 補給艦 ${composition.AO} * 16</p>`;
                resource_status.is_nomal = false;
            } else {
                return;
            }
            break;
        default:
            return;
    }
    if (resource_status.is_nomal) {
        if (resource_status.fuel) {
            mold('fuel', 2, 3);
        }
        if (resource_status.ammo) {
            mold('ammo', 2, 3);
        }
        if (resource_status.steel) {
            mold('steel', 2, 3);
        }
        if (resource_status.imo) {
            mold('imo', 1.5, 2);
        }
    }
    if (resource_status.memo) {
        html += `<p>${resource_status.memo}</p>`;
    }
    return html;
    
    function mold(
        key: keyof Resources,
        d_mag: number,
        c_mag: number,
    ) {
        resource_total[key] = Math.trunc(fleet_total_drum * d_mag) + fleet_total_craft * c_mag;
        html += `<p><img src="${icons[key]}" class="item-icon"></p>`;
        if (Array.isArray(resource_status[key])) {
            html += `<p>base: ${resource_status[key][0]} ~ ${resource_status[key][1]}</p>`;
        } else {
            html += `<p>base: ${resource_status[key]}</p>`;
        }
        if (key === 'imo') {
            html += `<p>add: <span style="font-weight:600;color:#1e00ff;">${resource_total[key]}</span> = Math.trunc(${fleet_total_drum} * ${d_mag}) + ${fleet_total_craft} * ${c_mag}</p>`;
        } else {
            html += `<p>add: <span style="font-weight:600;color:#1e00ff;">${resource_total[key]}</span> = <img src="${icons.drum}" class="item-icon drum-icon">${fleet_total_drum} * ${d_mag} + <img src="${icons.craft}" class="item-icon craft-icon">${fleet_total_craft} * ${c_mag}</p>`;
        }
        html += `<p>max: ${resource_status[`max_${key}`] ? resource_status[`max_${key}`] : 'unknown'}</p>`;
    }
}