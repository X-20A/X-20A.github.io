import { ST as ShipType, NA as National } from './ship';
import { BaseShipName } from '../types/baseShipName';
import { ShipName } from '../types/shipName';
import { EquipBonusDatas } from '../types/equipBonus';

const AKIZUKI_BASE_NAMES: BaseShipName[] =
    ['秋月', '照月', '初月', '涼月', '冬月'] as const;
const MOGAMI_KAI_OR_MORE: ShipName[] =
    ['最上改', '最上改二', '最上改二特'] as const;

const EQUIP_BONUS_DATAS: EquipBonusDatas = {
    'SG レーダー(初期型)': {
        rules: [
            {
                conditions: {
                    name_in: ['丹陽', '雪風改二'],
                    is_one_time: true,
                },
                seek: 3,
            },
            { conditions: { national_is: National.USA }, seek: 4 },
        ],
    },
    'SG レーダー(後期型)': {
        rules: [
            {
                conditions: {
                    name_in: ['丹陽', '雪風改二'],
                    is_one_time: true,
                },
                seek: 3,
            },
            { conditions: { national_is: National.USA }, seek: 4 },
            { conditions: { national_is: National.UK }, seek: 2 },
        ],
    },
    'SK レーダー': {
        rules: [
            {
                conditions: {
                    national_is: National.USA,
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    'SK+SG レーダー': {
        rules: [
            {
                conditions: {
                    national_is: National.USA,
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    national_is: National.UK,
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    '逆探(E27)+22号対水上電探改四(後期調整型)': {
        rules: [
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.DD],
                    is_one_time: true,
                },
                seek: 1,
            },
            {
                conditions: {
                    name_in: ['清霜改二丁'],
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    name_in: [
                        '朝霜改二',
                        '清霜改二',
                        '初霜改二',
                        '潮改二',
                        'Верный',
                        '霞改二',
                        '時雨改三',
                        '雪風改二',
                    ],
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    '21号対空電探': {
        rules: [
            {
                conditions: {
                    base_name_in: AKIZUKI_BASE_NAMES,
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    name_in: MOGAMI_KAI_OR_MORE,
                    is_one_time: true,
                },
                seek: 2,
            },
        ],
    },
    '21号対空電探改二': {
        rules: [
            {
                conditions: {
                    base_name_in: AKIZUKI_BASE_NAMES,
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    name_in: MOGAMI_KAI_OR_MORE,
                    is_one_time: true,
                },
                seek: 2,
            },
        ],
    },
    '紫雲': {
        rules: [
            { conditions: { base_name_in: ['大淀'] }, seek: 2 },
            {
                conditions: {
                    base_name_in: ['大淀'],
                    require_improvement_lv: 10,
                },
                seek: 1,
            },
        ],
    },
    'SOC Seagull': {
        rules: [
            {
                conditions: {
                    national_is: National.USA,
                    ship_type_in: [ShipType.CL, ShipType.CA],
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    national_is: National.USA,
                    ship_type_in: [ShipType.CL, ShipType.CA],
                    require_improvement_lv: 4,
                },
                seek: 1,
            },
            {
                conditions: {
                    national_is: National.USA,
                    ship_type_in: [ShipType.BB],
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    'Ar196改': {
        rules: [
            {
                conditions: {
                    base_name_in: ['Bismarck', 'Prinz Eugen'],
                },
                seek: 2,
            },
        ],
    },
    'Fairey Seafox改': {
        rules: [
            {
                conditions: {
                    base_name_in: ['Gotland'],
                    is_one_time: true,
                },
                seek: 6,
            },
            {
                conditions: {
                    base_name_in: ['Nelson'],
                    is_one_time: true,
                },
                seek: 5,
            },
            {
                conditions: {
                    base_name_in: ['Commandant Teste'],
                    is_one_time: true,
                },
                seek: 4,
            },
            {
                conditions: {
                    base_name_in: ['Warspite', 'Richelieu', 'Jean Bart'],
                    is_one_time: true,
                },
                seek: 3,
            },
        ],
    },
    'Swordfish Mk.II改(水偵型)': {
        rules: [
            {
                conditions: {
                    base_name_in: ['Warspite'],
                    is_one_time: true,
                },
                seek: 3,
            },
            {
                conditions: {
                    base_name_in: ['Nelson', 'Sheffield', 'Gotland'],
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    base_name_in: ['Commandant Teste', '瑞穂', '神威'],
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    'Laté 298B': {
        rules: [
            {
                conditions: {
                    base_name_in: [
                        'Commandant Teste',
                        'Richelieu',
                        'Jean Bart',
                        '瑞穂',
                        '神威',
                    ],
                },
                seek: 2,
            },
        ],
    },
    'SO3C Seamew改': {
        rules: [
            {
                conditions: {
                    national_is: National.USA,
                    ship_type_in: [ShipType.CL, ShipType.CA],
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    national_is: National.USA,
                    ship_type_in: [ShipType.BB],
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    'Swordfish Mk.III改(水上機型/熟練)': {
        rules: [
            {
                conditions: {
                    base_name_in: ['Gotland', 'Commandant Teste'],
                },
                seek: 3,
            },
            {
                conditions: {
                    name_in: ['Gotland andra'],
                    is_one_time: true,
                },
                seek: 2,
            },
            {
                conditions: {
                    base_name_in: ['瑞穂', '神威'],
                    is_one_time: true,
                },
                seek: 2,
            },
        ],
    },
    'Swordfish Mk.III改(水上機型)': {
        rules: [
            { conditions: { base_name_in: ['Gotland'] }, seek: 3 },
            {
                conditions: {
                    name_in: ['Gotland andra'],
                    is_one_time: true,
                },
                seek: 1,
            },
            {
                conditions: {
                    base_name_in: ['Commandant Teste', '瑞穂', '神威'],
                },
                seek: 2,
            },
        ],
    },
    'Swordfish(水上機型)': {
        rules: [
            {
                conditions: {
                    base_name_in: [
                        'Gotland',
                        'Commandant Teste',
                        '瑞穂',
                        '神威',
                    ],
                },
                seek: 1,
            },
        ],
    },
    '装甲艇(AB艇)': {
        rules: [
            { conditions: { base_name_in: ['神州丸'] }, seek: 2 },
            { conditions: { base_name_in: ['あきつ丸'] }, seek: 1 },
            { conditions: { ship_type_in: [ShipType.DD] }, seek: 1 },
        ],
    },
    '武装大発': {
        rules: [
            { conditions: { base_name_in: ['神州丸'] }, seek: 2 },
            { conditions: { base_name_in: ['あきつ丸'] }, seek: 1 },
        ],
    },
    '水雷戦隊 熟練見張員': {
        rules: [
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.DD],
                },
                seek: 1,
            },
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.CL, ShipType.CT, ShipType.CLT],
                },
                seek: 3,
            },
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.CA, ShipType.CAV],
                },
                seek: 1,
            },
        ],
    },
    '熟練見張員': {
        rules: [
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.DD],
                },
                seek: 1,
            },
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.CL, ShipType.CT, ShipType.CLT],
                },
                seek: 3,
            },
            {
                conditions: {
                    national_is: National.Japan,
                    ship_type_in: [ShipType.CA, ShipType.CAV],
                },
                seek: 3,
            },
        ],
    },
    '紫雲(熟練)': {
        rules: [
            {
                conditions: {
                    name_in: ['大淀改'],
                    require_improvement_lv: 1,
                },
                seek: 5,
            },
            {
                conditions: {
                    name_in: ['大淀改'],
                    require_improvement_lv: 4,
                },
                seek: 1,
            },
            {
                conditions: {
                    name_in: ['三隈改二特'],
                    require_improvement_lv: 1,
                },
                seek: 4,
            },
        ],
    },
    '零式小型水上機': {
        rules: [
            {
                conditions: {
                    ship_type_in: [ShipType.SS, ShipType.SSV],
                },
                seek: 3
            },
        ],
    },
    '零式小型水上機(熟練)': {
        rules: [
            {
                conditions: {
                    ship_type_in: [ShipType.SS, ShipType.SSV],
                },
                seek: 4,
            },
        ],
    },
    'Type281 レーダー': {
        rules: [
            {
                conditions: {
                    national_is: National.UK,
                },
                seek: 2,
            }
        ],
    },
    '彩雲(偵四)': {
        rules: [
            {
                conditions: {
                    require_improvement_lv: 2,
                    is_one_time: true,
                },
                seek: 1,
            },
        ],
    },
    'Walrus': {
        rules: [
            { conditions: { base_name_in: ['Nelson', 'Rodney'] }, seek: 5 },
            { conditions: { base_name_in: ['Warspite', 'Sheffield'] }, seek: 2 },
        ],
    },
    '天山一二型甲改二(村田隊/電探装備)': {
        rules: [
            { conditions: { name_in: ['翔鶴改二', '翔鶴改二甲'] }, seek: 2 },
            {
                conditions: {
                    name_in: [
                        '瑞鶴改二',
                        '瑞鶴改二甲',
                        '加賀改二護',
                        '大鳳改',
                        '赤城改二戊',
                        '加賀改二戊',
                    ],
                },
                seek: 1,
            },
        ],
    },
} as const;

export default EQUIP_BONUS_DATAS;