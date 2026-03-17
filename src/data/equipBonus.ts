import { ST as ShipType, NA as National } from './ship';
import { BaseShipName } from '../types/baseShipName';
import { ShipName } from '../types/shipName';
import { EquipBonusData } from '../types/equipBonus';

const AKIZUKI_BASE_NAMES: BaseShipName[] = ['秋月', '照月', '初月', '涼月', '冬月'] as const;
const MOGAMI_KAI_OR_MORE: ShipName[] = ['最上改', '最上改二', '最上改二特'] as const;

export const EQUIP_BONUS_DATAS: EquipBonusData[] = [
    {
        equip_name: 'SG レーダー(初期型)',
        rules: [
            {
                conditions: [
                    { type: 'name_in', names: ['丹陽', '雪風改二'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 3,
            },
            { conditions: [{ type: 'national_is', national: National.USA }], seek: 4 },
        ],
    },
    {
        equip_name: 'SG レーダー(後期型)',
        rules: [
            {
                conditions: [
                    { type: 'name_in', names: ['丹陽', '雪風改二'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 3,
            },
            { conditions: [{ type: 'national_is', national: National.USA }], seek: 4 },
            { conditions: [{ type: 'national_is', national: National.UK }], seek: 2 },
        ],
    },
    {
        equip_name: 'SK レーダー',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'SK+SG レーダー',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.UK },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: '逆探(E27)+22号対水上電探改四(後期調整型)',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.DD] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
            {
                conditions: [
                    { type: 'name_in', names: ['清霜改二丁'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    {
                        type: 'name_in',
                        names: [
                            '朝霜改二',
                            '清霜改二',
                            '初霜改二',
                            '潮改二',
                            'Верный',
                            '霞改二',
                            '時雨改三',
                            '雪風改二',
                        ],
                    },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: '21号対空電探',
        rules: [
            {
                conditions: [
                    { type: 'base_name_in', base_names: AKIZUKI_BASE_NAMES },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'name_in', names: MOGAMI_KAI_OR_MORE },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
        ],
    },
    {
        equip_name: '21号対空電探改二',
        rules: [
            {
                conditions: [
                    { type: 'base_name_in', base_names: AKIZUKI_BASE_NAMES },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'name_in', names: MOGAMI_KAI_OR_MORE },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
        ],
    },
    {
        equip_name: '紫雲',
        rules: [
            { conditions: [{ type: 'base_name_in', base_names: ['大淀'] }], seek: 2 },
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['大淀'] },
                    { type: 'require_improvement_lv', lv: 10 },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'SOC Seagull',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'ship_type_in', types: [ShipType.CL, ShipType.CA] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'ship_type_in', types: [ShipType.CL, ShipType.CA] },
                    { type: 'require_improvement_lv', lv: 4 },
                ],
                seek: 1,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'ship_type_in', types: [ShipType.BB] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'Ar196改',
        rules: [
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Bismarck', 'Prinz Eugen'] }],
                seek: 2,
            },
        ],
    },
    {
        equip_name: 'Fairey Seafox改',
        rules: [
            {
                conditions: [{ type: 'base_name_in', base_names: ['Gotland'] }, { type: 'equip_id_not_duplicated' }],
                seek: 6,
            },
            {
                conditions: [{ type: 'base_name_in', base_names: ['Nelson'] }, { type: 'equip_id_not_duplicated' }],
                seek: 5,
            },
            {
                conditions: [{ type: 'base_name_in', base_names: ['Commandant Teste'] }, { type: 'equip_id_not_duplicated' }],
                seek: 4,
            },
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Warspite', 'Richelieu', 'Jean Bart'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 3,
            },
        ],
    },
    {
        equip_name: 'Swordfish Mk.II改(水偵型)',
        rules: [
            {
                conditions: [{ type: 'base_name_in', base_names: ['Warspite'] }, { type: 'equip_id_not_duplicated' }],
                seek: 3,
            },
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Nelson', 'Sheffield', 'Gotland'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Commandant Teste', '瑞穂', '神威'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'Laté 298B',
        rules: [
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Commandant Teste', 'Richelieu', 'Jean Bart', '瑞穂', '神威'] },
                ],
                seek: 2,
            },
        ],
    },
    {
        equip_name: 'SO3C Seamew改',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'ship_type_in', types: [ShipType.CL, ShipType.CA] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.USA },
                    { type: 'ship_type_in', types: [ShipType.BB] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'Swordfish Mk.III改(水上機型/熟練)',
        rules: [
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['Gotland', 'Commandant Teste'] },
                ],
                seek: 3,
            },
            {
                conditions: [
                    { type: 'name_in', names: ['Gotland andra'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
            {
                conditions: [
                    { type: 'base_name_in', base_names: ['瑞穂', '神威'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 2,
            },
        ],
    },
    {
        equip_name: 'Swordfish Mk.III改(水上機型)',
        rules: [
            { conditions: [{ type: 'base_name_in', base_names: ['Gotland'] }], seek: 3 },
            {
                conditions: [
                    { type: 'name_in', names: ['Gotland andra'] },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
            {
                conditions: [{ type: 'base_name_in', base_names: ['Commandant Teste', '瑞穂', '神威'] }],
                seek: 2,
            },
        ],
    },
    {
        equip_name: 'Swordfish(水上機型)',
        rules: [
            {
                conditions: [{ type: 'base_name_in', base_names: ['Gotland', 'Commandant Teste', '瑞穂', '神威'] }],
                seek: 1,
            },
        ],
    },
    {
        equip_name: '装甲艇(AB艇)',
        rules: [
            { conditions: [{ type: 'base_name_in', base_names: ['神州丸'] }], seek: 2 },
            { conditions: [{ type: 'base_name_in', base_names: ['あきつ丸'] }], seek: 1 },
            { conditions: [{ type: 'ship_type_in', types: [ShipType.DD] }], seek: 1 },
        ],
    },
    {
        equip_name: '武装大発',
        rules: [
            { conditions: [{ type: 'base_name_in', base_names: ['神州丸'] }], seek: 2 },
            { conditions: [{ type: 'base_name_in', base_names: ['あきつ丸'] }], seek: 1 },
        ],
    },
    {
        equip_name: '水雷戦隊 熟練見張員',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.DD] },
                ],
                seek: 1,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.CL, ShipType.CT, ShipType.CLT] },
                ],
                seek: 3,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.CA, ShipType.CAV] },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: '熟練見張員',
        rules: [
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.DD] },
                ],
                seek: 1,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.CL, ShipType.CT, ShipType.CLT] },
                ],
                seek: 3,
            },
            {
                conditions: [
                    { type: 'national_is', national: National.Japan },
                    { type: 'ship_type_in', types: [ShipType.CA, ShipType.CAV] },
                ],
                seek: 3,
            },
        ],
    },
    {
        equip_name: '紫雲(熟練)',
        rules: [
            {
                conditions: [
                    { type: 'name_in', names: ['大淀改'] },
                    { type: 'require_improvement_lv', lv: 1 },
                ],
                seek: 5,
            },
            {
                conditions: [
                    { type: 'name_in', names: ['大淀改'] },
                    { type: 'require_improvement_lv', lv: 4 },
                ],
                seek: 1,
            },
            {
                conditions: [
                    { type: 'name_in', names: ['三隈改二特'] },
                    { type: 'require_improvement_lv', lv: 1 },
                ],
                seek: 4,
            },
        ],
    },
    {
        equip_name: '零式小型水上機',
        rules: [
            {
                conditions: [{ type: 'ship_type_in', types: [ShipType.SS, ShipType.SSV] }],
                seek: 3
            },
        ],
    },
    {
        equip_name: '零式小型水上機(熟練)',
        rules: [
            {
                conditions: [{ type: 'ship_type_in', types: [ShipType.SS, ShipType.SSV] }],
                seek: 4,
            },
        ],
    },
    {
        equip_name: 'Type281 レーダー',
        rules: [
            {
                conditions: [{ type: 'national_is', national: National.UK }],
                seek: 2,
            }
        ],
    },
    {
        equip_name: '彩雲(偵四)',
        rules: [
            {
                conditions: [
                    { type: 'require_improvement_lv', lv: 2 },
                    { type: 'equip_id_not_duplicated' },
                ],
                seek: 1,
            },
        ],
    },
    {
        equip_name: 'Walrus',
        rules: [
            { conditions: [{ type: 'base_name_in', base_names: ['Nelson', 'Rodney'] }], seek: 5 },
            { conditions: [{ type: 'base_name_in', base_names: ['Warspite', 'Sheffield'] }], seek: 2 },
        ],
    },
    {
        equip_name: '天山一二型甲改二(村田隊/電探装備)',
        rules: [
            { conditions: [{ type: 'name_in', names: ['翔鶴改二', '翔鶴改二甲'] }], seek: 2 },
            {
                conditions: [
                    { type: 'name_in', names: ['瑞鶴改二', '瑞鶴改二甲', '加賀改二護', '大鳳改', '赤城改二戊', '加賀改二戊'] },
                ],
                seek: 1,
            },
        ],
    },
] as const;

export default EQUIP_BONUS_DATAS;