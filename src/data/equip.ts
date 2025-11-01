/* 
    http://kancolle-calc.net/deckbuilder.html 様より失敬
*/

import { EquipId } from "../types/equipId";

// 同一ファイル内に定義しないとバンドル時にインライン化されないので注意
export const enum EquipType {
    /** 小口径主砲 */
    MainGunS = 1,
    /** 中口径主砲 */
    MainGunM = 2,
    /** 大口径主砲 */
    MainGunL = 3,
    /** 副砲 */
    SecGun = 4,
    /** 魚雷 */
    Torpedo = 5,
    /** 艦戦 */
    Fighter = 6,
    /** 艦爆 */
    DiveBomber = 7,
    /** 艦攻 */
    TorpBomber = 8,
    /** 艦偵 */
    CarrierScout = 9,
    /** 水偵 */
    SeaPlane = 10,
    /** 水爆 */
    SeaPlaneBomber = 11,
    /** 小型電探 */
    RadarS = 12,
    /** 大型電探 */
    RadarL = 13,
    /** 小型ソナー */
    SonarS = 14,
    /** 大型ソナー */
    SonarL = 40,
    /** 爆雷(含投射機) */
    DepthCharge = 15,
    /** 缶|タービン */
    Engine = 17,
    /** 三式弾 */
    ShrapnelShell = 18,
    /** 徹甲弾 */
    APShell = 19,
    /** 機銃 */
    AAGun = 21,
    /** 甲標的 */
    MidgetSub = 22,
    /** ダメコン */
    Repair = 23,
    /** 大発系 */
    LandingCraft = 24,
    /** 回転翼機 */
    AutoGyro = 25,
    /** 対潜哨戒機 */
    AswPlane = 26,
    /** 中型バルジ */
    BulgeM = 27,
    /** 大型バルジ */
    BulgeL = 28,
    /** 小型探照灯 */
    SearchLightS = 29,
    /** 大型探照灯 */
    SearchLightL = 42,
    /** ドラム缶 */
    Drum = 30,
    /** 艦艇修理施設 */
    SRF = 31,
    /** 潜水魚雷 */
    TorpedoSS = 32,
    /** 照明弾 */
    StarShell = 33,
    /** 司令部施設 */
    FCF = 34,
    /** 整備員 */
    Scamp = 35,
    /** 高射装置 */
    AAFD = 36,
    /** WG 42|四式20cm対地噴進砲 */
    WG = 37,
    /** 見張り員 */
    Picket = 39,
    /** 二式大艇|Catalina */
    FlyingBoat = 41,
    /** 戦闘糧食 */
    Ration = 43,
    /** 洋上補給 */
    OilDrum = 44,
    /** 水戦 */
    SeaPlaneFighter = 45,
    /** 内火艇 */
    LandingTank = 46,
    /** 彩雲(輸送用分解済) */
    TransportItem = 50,
    /** 潜水電探 */
    SubRadar = 51,
    /** 陸軍歩兵部隊|チハ */
    ArmyUnit = 52,
    /** 煙幕装置|阻塞気球 */
    SmokeScreen = 54,
    /** 噴式艦爆 */
    JetBomber = 57,
}

/** 索敵値, 装備種別ID */
export type EquipData = [number, EquipType];

export type EquipDatas = Record<EquipId, EquipData>;

/** 基地系は除外 */
const EQUIP_DATAS: EquipDatas = {
 1:[0,EquipType.MainGunS] // 12cm単装砲
,2:[0,EquipType.MainGunS] // 12.7cm連装砲
,3:[0,EquipType.MainGunS] // 10cm連装高角砲
,4:[0,EquipType.MainGunM] // 14cm単装砲
,5:[0,EquipType.MainGunM] // 15.5cm三連装砲
,6:[0,EquipType.MainGunM] // 20.3cm連装砲
,7:[0,EquipType.MainGunL] // 35.6cm連装砲
,8:[0,EquipType.MainGunL] // 41cm連装砲
,9:[0,EquipType.MainGunL] // 46cm三連装砲
,10:[0,EquipType.SecGun] // 12.7cm連装高角砲
,11:[0,EquipType.SecGun] // 15.2cm単装砲
,12:[0,EquipType.SecGun] // 15.5cm三連装副砲
,13:[0,EquipType.Torpedo] // 61cm三連装魚雷
,14:[0,EquipType.Torpedo] // 61cm四連装魚雷
,15:[0,EquipType.Torpedo] // 61cm四連装(酸素)魚雷
,16:[1,EquipType.TorpBomber] // 九七式艦攻
,17:[1,EquipType.TorpBomber] // 天山
,18:[1,EquipType.TorpBomber] // 流星
,19:[0,EquipType.Fighter] // 九六式艦戦
,20:[0,EquipType.Fighter] // 零式艦戦21型
,21:[0,EquipType.Fighter] // 零式艦戦52型
,22:[0,EquipType.Fighter] // 試製烈風 後期型
,23:[0,EquipType.DiveBomber] // 九九式艦爆
,24:[0,EquipType.DiveBomber] // 彗星
,25:[5,EquipType.SeaPlane] // 零式水上偵察機
,26:[6,EquipType.SeaPlaneBomber] // 瑞雲
,27:[3,EquipType.RadarS] // 13号対空電探
,28:[5,EquipType.RadarS] // 22号対水上電探
,29:[7,EquipType.RadarS] // 33号対水上電探
,30:[4,EquipType.RadarL] // 21号対空電探
,31:[10,EquipType.RadarL] // 32号対水上電探
,32:[5,EquipType.RadarL] // 42号対空電探
,33:[0,EquipType.Engine] // 改良型艦本式タービン
,34:[0,EquipType.Engine] // 強化型艦本式缶
,35:[0,EquipType.ShrapnelShell] // 三式弾
,36:[0,EquipType.APShell] // 九一式徹甲弾
,37:[0,EquipType.AAGun] // 7.7mm機銃
,38:[0,EquipType.AAGun] // 12.7mm単装機銃
,39:[0,EquipType.AAGun] // 25mm連装機銃
,40:[0,EquipType.AAGun] // 25mm三連装機銃
,41:[0,EquipType.MidgetSub] // 甲標的 甲型
,42:[0,EquipType.Repair] // 応急修理要員
,43:[0,EquipType.Repair] // 応急修理女神
,44:[0,EquipType.DepthCharge] // 九四式爆雷投射機
,45:[0,EquipType.DepthCharge] // 三式爆雷投射機
,46:[0,EquipType.SonarS] // 九三式水中聴音機
,47:[0,EquipType.SonarS] // 三式水中探信儀
,48:[0,EquipType.MainGunS] // 12cm単装高角砲
,49:[0,EquipType.AAGun] // 25mm単装機銃
,50:[0,EquipType.MainGunM] // 20.3cm(3号)連装砲
,51:[0,EquipType.AAGun] // 12cm30連装噴進砲
,52:[2,EquipType.TorpBomber] // 流星改
,53:[0,EquipType.Fighter] // 烈風 一一型
,54:[9,EquipType.CarrierScout] // 彩雲
,55:[0,EquipType.Fighter] // 紫電改二
,56:[0,EquipType.Fighter] // 震電改
,57:[1,EquipType.DiveBomber] // 彗星一二型甲
,58:[0,EquipType.Torpedo] // 61cm五連装(酸素)魚雷
,59:[6,EquipType.SeaPlane] // 零式水上観測機
,60:[0,EquipType.DiveBomber] // 零式艦戦62型(爆戦)
,61:[7,EquipType.CarrierScout] // 二式艦上偵察機
,62:[6,EquipType.SeaPlaneBomber] // 試製晴嵐
,63:[0,EquipType.MainGunS] // 12.7cm連装砲B型改二
,64:[0,EquipType.DiveBomber] // Ju87C改
,65:[0,EquipType.MainGunM] // 15.2cm連装砲
,66:[0,EquipType.SecGun] // 8cm高角砲
,67:[0,EquipType.Torpedo] // 53cm艦首(酸素)魚雷
,68:[0,EquipType.LandingCraft] // 大発動艇
,69:[0,EquipType.AutoGyro] // カ号観測機
,70:[1,EquipType.AswPlane] // 三式指揮連絡機(対潜)
,71:[0,EquipType.SecGun] // 10cm連装高角砲(砲架)
,72:[0,EquipType.BulgeM] // 増設バルジ(中型艦)
,73:[0,EquipType.BulgeL] // 増設バルジ(大型艦)
,74:[2,EquipType.SearchLightS] // 探照灯
,75:[0,EquipType.Drum] // ドラム缶(輸送用)
,76:[0,EquipType.MainGunL] // 38cm連装砲
,77:[0,EquipType.SecGun] // 15cm連装副砲
,78:[0,EquipType.MainGunS] // 12.7cm単装砲
,79:[6,EquipType.SeaPlaneBomber] // 瑞雲(六三四空)
,80:[6,EquipType.SeaPlaneBomber] // 瑞雲12型
,81:[7,EquipType.SeaPlaneBomber] // 瑞雲12型(六三四空)
,82:[2,EquipType.TorpBomber] // 九七式艦攻(九三一空)
,83:[2,EquipType.TorpBomber] // 天山(九三一空)
,84:[0,EquipType.AAGun] // 2cm 四連装FlaK 38
,85:[0,EquipType.AAGun] // 3.7cm FlaK M42
,86:[0,EquipType.SRF] // 艦艇修理施設
,87:[0,EquipType.Engine] // 新型高温高圧缶
,88:[5,EquipType.RadarS] // 22号対水上電探改四
,89:[6,EquipType.RadarL] // 21号対空電探改
,90:[0,EquipType.MainGunM] // 20.3cm(2号)連装砲
,91:[0,EquipType.MainGunS] // 12.7cm連装高角砲(後期型)
,92:[0,EquipType.AAGun] // 毘式40mm連装機銃
,93:[4,EquipType.TorpBomber] // 九七式艦攻(友永隊)
,94:[5,EquipType.TorpBomber] // 天山一二型(友永隊)
,95:[0,EquipType.TorpedoSS] // 潜水艦53cm艦首魚雷(8門)
,96:[1,EquipType.Fighter] // 零式艦戦21型(熟練)
,97:[2,EquipType.DiveBomber] // 九九式艦爆(熟練)
,98:[2,EquipType.TorpBomber] // 九七式艦攻(熟練)
,99:[3,EquipType.DiveBomber] // 九九式艦爆(江草隊)
,100:[4,EquipType.DiveBomber] // 彗星(江草隊)
,101:[0,EquipType.StarShell] // 照明弾
,102:[3,EquipType.SeaPlane] // 九八式水上偵察機(夜偵)
,103:[0,EquipType.MainGunL] // 試製35.6cm三連装砲
,104:[0,EquipType.MainGunL] // 35.6cm連装砲(ダズル迷彩)
,105:[0,EquipType.MainGunL] // 試製41cm三連装砲
,106:[4,EquipType.RadarS] // 13号対空電探改
,107:[1,EquipType.FCF] // 艦隊司令部施設
,108:[1,EquipType.Scamp] // 熟練艦載機整備員
,109:[0,EquipType.Fighter] // 零戦52型丙(六〇一空)
,110:[0,EquipType.Fighter] // 烈風(六〇一空)
,111:[1,EquipType.DiveBomber] // 彗星(六〇一空)
,112:[2,EquipType.TorpBomber] // 天山(六〇一空)
,113:[3,EquipType.TorpBomber] // 流星(六〇一空)
,114:[0,EquipType.MainGunL] // 38cm連装砲改
,115:[5,EquipType.SeaPlane] // Ar196改
,116:[0,EquipType.APShell] // 一式徹甲弾
,117:[0,EquipType.MainGunL] // 試製46cm連装砲
,118:[8,EquipType.SeaPlane] // 紫雲
,119:[0,EquipType.MainGunM] // 14cm連装砲
,120:[0,EquipType.AAFD] // 91式高射装置
,121:[0,EquipType.AAFD] // 94式高射装置
,122:[0,EquipType.MainGunS] // 10cm連装高角砲+高射装置
,123:[0,EquipType.MainGunM] // SKC34 20.3cm連装砲
,124:[9,EquipType.RadarL] // FuMO25 レーダー
,125:[0,EquipType.Torpedo] // 61cm三連装(酸素)魚雷
,126:[0,EquipType.WG] // WG42 (Wurfgerät 42)
,127:[0,EquipType.TorpedoSS] // 試製FaT仕様九五式酸素魚雷改
,128:[0,EquipType.MainGunL] // 試製51cm連装砲
,129:[2,EquipType.Picket] // 熟練見張員
,130:[0,EquipType.SecGun] // 12.7cm高角砲+高射装置
,131:[0,EquipType.AAGun] // 25mm三連装機銃 集中配備
,132:[1,EquipType.SonarL] // 零式水中聴音機
,133:[0,EquipType.MainGunL] // 381mm/50 三連装砲
,134:[0,EquipType.SecGun] // OTO 152mm三連装速射砲
,135:[0,EquipType.SecGun] // 90mm単装高角砲
,136:[0,EquipType.BulgeL] // プリエーゼ式水中防御隔壁
,137:[0,EquipType.MainGunL] // 381mm/50 三連装砲改
,138:[12,EquipType.FlyingBoat] // 二式大艇
,139:[0,EquipType.MainGunM] // 15.2cm連装砲改
,140:[3,EquipType.SearchLightL] // 96式150cm探照灯
,141:[11,EquipType.RadarL] // 32号対水上電探改
,142:[7,EquipType.RadarL] // 15m二重測距儀+21号電探改二
,143:[4,EquipType.TorpBomber] // 九七式艦攻(村田隊)
,144:[4,EquipType.TorpBomber] // 天山一二型(村田隊)
,145:[0,EquipType.Ration] // 戦闘糧食
,146:[0,EquipType.OilDrum] // 洋上補給
,147:[0,EquipType.MainGunS] // 120mm/50 連装砲
,148:[2,EquipType.DiveBomber] // 試製南山
,149:[0,EquipType.SonarS] // 四式水中聴音機
,150:[0,EquipType.Ration] // 秋刀魚の缶詰
,151:[11,EquipType.CarrierScout] // 試製景雲(艦偵型)
,152:[1,EquipType.Fighter] // 零式艦戦52型(熟練)
,153:[1,EquipType.Fighter] // 零戦52型丙(付岩井小隊)
,154:[1,EquipType.DiveBomber] // 零戦62型(爆戦/岩井隊)
,155:[1,EquipType.Fighter] // 零戦21型(付岩本小隊)
,156:[1,EquipType.Fighter] // 零戦52型甲(付岩本小隊)
,157:[3,EquipType.Fighter] // 零式艦戦53型(岩本隊)
,158:[0,EquipType.Fighter] // Bf109T改
,159:[0,EquipType.Fighter] // Fw190T改
,160:[0,EquipType.SecGun] // 10.5cm連装砲
,161:[0,EquipType.MainGunL] // 16inch三連装砲 Mk.7
,162:[0,EquipType.MainGunM] // 203mm/53 連装砲
,163:[4,EquipType.SeaPlane] // Ro.43水偵
,164:[2,EquipType.SeaPlaneFighter] // Ro.44水上戦闘機
,165:[1,EquipType.SeaPlaneFighter] // 二式水戦改
,166:[0,EquipType.LandingCraft] // 大発動艇(八九式中戦車&陸戦隊)
,167:[0,EquipType.LandingTank] // 特二式内火艇
,171:[6,EquipType.SeaPlane] // OS2U
,172:[0,EquipType.SecGun] // 5inch連装砲 Mk.28 mod.2
,173:[0,EquipType.AAGun] // Bofors 40mm四連装機関砲
,174:[0,EquipType.Torpedo] // 53cm連装魚雷
,178:[9,EquipType.FlyingBoat] // PBY-5A Catalina
,179:[0,EquipType.Torpedo] // 試製61cm六連装(酸素)魚雷
,181:[0,EquipType.Fighter] // 零式艦戦32型
,182:[0,EquipType.Fighter] // 零式艦戦32型(熟練)
,183:[0,EquipType.MainGunL] // 16inch三連装砲 Mk.7+GFCS
,184:[0,EquipType.Fighter] // Re.2001 OR改
,188:[0,EquipType.TorpBomber] // Re.2001 G改
,189:[0,EquipType.Fighter] // Re.2005 改
,190:[0,EquipType.MainGunL] // 38.1cm Mk.I連装砲
,191:[0,EquipType.AAGun] // QF 2ポンド8連装ポンポン砲
,192:[0,EquipType.MainGunL] // 38.1cm Mk.I/N連装砲改
,193:[0,EquipType.LandingCraft] // 特大発動艇
,194:[4,EquipType.SeaPlaneBomber] // Laté 298B
,195:[2,EquipType.DiveBomber] // SBD
,196:[2,EquipType.TorpBomber] // TBD
,197:[0,EquipType.Fighter] // F4F-3
,198:[1,EquipType.Fighter] // F4F-4
,199:[3,EquipType.JetBomber] // 噴式景雲改
,200:[0,EquipType.JetBomber] // 橘花改
,203:[0,EquipType.BulgeM] // 艦本新設計 増設バルジ(中型艦)
,204:[0,EquipType.BulgeL] // 艦本新設計 増設バルジ(大型艦)
,205:[1,EquipType.Fighter] // F6F-3
,206:[1,EquipType.Fighter] // F6F-5
,207:[4,EquipType.SeaPlaneBomber] // 瑞雲(六三一空)
,208:[6,EquipType.SeaPlaneBomber] // 晴嵐(六三一空)
,209:[0,EquipType.TransportItem] // 彩雲(輸送用分解済)
,210:[4,EquipType.SubRadar] // 潜水艦搭載電探&水防式望遠鏡
,211:[5,EquipType.SubRadar] // 潜水艦搭載電探&逆探(E27)
,212:[10,EquipType.CarrierScout] // 彩雲(東カロリン空)
,213:[0,EquipType.TorpedoSS] // 後期型艦首魚雷(6門)
,214:[1,EquipType.TorpedoSS] // 熟練聴音員+後期型艦首魚雷(6門)
,215:[3,EquipType.SeaPlaneFighter] // Ro.44水上戦闘機bis
,216:[1,EquipType.SeaPlaneFighter] // 二式水戦改(熟練)
,217:[1,EquipType.SeaPlaneFighter] // 強風改
,219:[0,EquipType.DiveBomber] // 零式艦戦63型(爆戦)
,220:[0,EquipType.SecGun] // 8cm高角砲改+増設機銃
,226:[0,EquipType.DepthCharge] // 九五式爆雷
,227:[0,EquipType.DepthCharge] // 二式爆雷
,228:[0,EquipType.Fighter] // 九六式艦戦改
,229:[0,EquipType.MainGunS] // 12.7cm単装高角砲(後期型)
,230:[0,EquipType.LandingCraft] // 特大発動艇+戦車第11連隊
,231:[0,EquipType.MainGunL] // 30.5cm三連装砲
,232:[0,EquipType.MainGunL] // 30.5cm三連装砲改
,233:[1,EquipType.DiveBomber] // F4U-1D
,234:[0,EquipType.SecGun] // 15.5cm三連装副砲改
,235:[0,EquipType.MainGunM] // 15.5cm三連装砲改
,236:[0,EquipType.MainGunL] // 41cm三連装砲改
,237:[7,EquipType.SeaPlaneBomber] // 瑞雲(六三四空/熟練)
,238:[6,EquipType.SeaPlane] // 零式水上偵察機11型乙
,239:[8,EquipType.SeaPlane] // 零式水上偵察機11型乙(熟練)
,240:[7,EquipType.RadarS] // 22号対水上電探改四(後期調整型)
,241:[0,EquipType.Ration] // 戦闘糧食(特別なおにぎり)
,242:[1,EquipType.TorpBomber] // Swordfish
,243:[2,EquipType.TorpBomber] // Swordfish Mk.II(熟練)
,244:[5,EquipType.TorpBomber] // Swordfish Mk.III(熟練)
,245:[0,EquipType.MainGunL] // 38cm四連装砲
,246:[0,EquipType.MainGunL] // 38cm四連装砲改
,247:[0,EquipType.SecGun] // 15.2cm三連装砲
,248:[0,EquipType.DiveBomber] // Skua
,249:[1,EquipType.Fighter] // Fulmar
,252:[0,EquipType.Fighter] // Seafire Mk.III改
,254:[2,EquipType.Fighter] // F6F-3N
,255:[3,EquipType.Fighter] // F6F-5N
,256:[2,EquipType.TorpBomber] // TBF
,257:[4,EquipType.TorpBomber] // TBM-3D
,258:[0,EquipType.Scamp] // 夜間作戦航空要員
,259:[0,EquipType.Scamp] // 夜間作戦航空要員+熟練甲板員
,260:[0,EquipType.SonarS] // Type124 ASDIC
,261:[0,EquipType.SonarS] // Type144/147 ASDIC
,262:[2,EquipType.SonarS] // HF/DF + Type144/147 ASDIC
,266:[0,EquipType.MainGunS] // 12.7cm連装砲C型改二
,267:[0,EquipType.MainGunS] // 12.7cm連装砲D型改二
,268:[0,EquipType.BulgeM] // 北方迷彩(+北方装備)
,271:[0,EquipType.Fighter] // 紫電改四
,272:[1,EquipType.FCF] // 遊撃部隊 艦隊司令部
,273:[10,EquipType.CarrierScout] // 彩雲(偵四)
,274:[0,EquipType.AAGun] // 12cm30連装噴進砲改二
,275:[0,EquipType.SecGun] // 10cm連装高角砲改+増設機銃
,276:[0,EquipType.MainGunL] // 46cm三連装砲改
,277:[0,EquipType.DiveBomber] // FM-2
,278:[10,EquipType.RadarL] // SK レーダー
,279:[12,EquipType.RadarL] // SK+SG レーダー
,280:[0,EquipType.MainGunS] // QF 4.7inch砲 Mk.XII改
,281:[0,EquipType.MainGunL] // 51cm連装砲
,282:[0,EquipType.MainGunS] // 130mm B-13連装砲
,283:[0,EquipType.Torpedo] // 533mm 三連装魚雷
,284:[0,EquipType.MainGunS] // 5inch単装砲 Mk.30
,285:[0,EquipType.Torpedo] // 61cm三連装(酸素)魚雷後期型
,286:[0,EquipType.Torpedo] // 61cm四連装(酸素)魚雷後期型
,287:[0,EquipType.DepthCharge] // 三式爆雷投射機 集中配備
,288:[0,EquipType.DepthCharge] // 試製15cm9連装対潜噴進砲
,289:[0,EquipType.MainGunL] // 35.6cm三連装砲改(ダズル迷彩仕様)
,290:[0,EquipType.MainGunL] // 41cm三連装砲改二
,291:[0,EquipType.DiveBomber] // 彗星二二型(六三四空)
,292:[2,EquipType.DiveBomber] // 彗星二二型(六三四空/熟練)
,293:[0,EquipType.MainGunS] // 12cm単装砲改二
,294:[0,EquipType.MainGunS] // 12.7cm連装砲A型改二
,295:[0,EquipType.MainGunS] // 12.7cm連装砲A型改三(戦時改修)+高射装置
,296:[0,EquipType.MainGunS] // 12.7cm連装砲B型改四(戦時改修)+高射装置
,297:[0,EquipType.MainGunS] // 12.7cm連装砲A型
,298:[0,EquipType.MainGunL] // 16inch Mk.I三連装砲
,299:[0,EquipType.MainGunL] // 16inch Mk.I三連装砲+AFCT改
,300:[0,EquipType.MainGunL] // 16inch Mk.I三連装砲改+FCR type284
,301:[0,EquipType.AAGun] // 20連装7inch UP Rocket Launchers
,302:[3,EquipType.TorpBomber] // 九七式艦攻(九三一空/熟練)
,303:[0,EquipType.MainGunM] // Bofors 15.2cm連装砲 Model 1930
,304:[4,EquipType.SeaPlane] // S9 Osprey
,305:[2,EquipType.DiveBomber] // Ju87C改二(KMX搭載機)
,306:[2,EquipType.DiveBomber] // Ju87C改二(KMX搭載機/熟練)
,307:[6,EquipType.RadarS] // GFCS Mk.37
,308:[3,EquipType.MainGunS] // 5inch単装砲 Mk.30改+GFCS Mk.37
,309:[0,EquipType.MidgetSub] // 甲標的 丙型
,310:[0,EquipType.MainGunM] // 14cm連装砲改
,313:[0,EquipType.MainGunS] // 5inch単装砲 Mk.30改
,314:[0,EquipType.Torpedo] // 533mm五連装魚雷(初期型)
,315:[8,EquipType.RadarS] // SG レーダー(初期型)
,316:[0,EquipType.DiveBomber] // Re.2001 CB改
,317:[0,EquipType.ShrapnelShell] // 三式弾改
,318:[0,EquipType.MainGunL] // 41cm連装砲改二
,319:[0,EquipType.DiveBomber] // 彗星一二型(六三四空/三号爆弾搭載機)
,320:[0,EquipType.DiveBomber] // 彗星一二型(三一号光電管爆弾搭載機)
,322:[7,EquipType.SeaPlaneBomber] // 瑞雲改二(六三四空)
,323:[8,EquipType.SeaPlaneBomber] // 瑞雲改二(六三四空/熟練)
,324:[0,EquipType.AutoGyro] // オ号観測機改
,325:[1,EquipType.AutoGyro] // オ号観測機改二
,326:[3,EquipType.AutoGyro] // S-51J
,327:[4,EquipType.AutoGyro] // S-51J改
,328:[0,EquipType.MainGunL] // 35.6cm連装砲改
,329:[0,EquipType.MainGunL] // 35.6cm連装砲改二
,330:[0,EquipType.MainGunL] // 16inch Mk.I連装砲
,331:[0,EquipType.MainGunL] // 16inch Mk.V連装砲
,332:[0,EquipType.MainGunL] // 16inch Mk.VIII連装砲改
,335:[0,EquipType.Fighter] // 烈風改(試製艦載型)
,336:[0,EquipType.Fighter] // 烈風改二
,337:[0,EquipType.Fighter] // 烈風改二(一航戦/熟練)
,338:[1,EquipType.Fighter] // 烈風改二戊型
,339:[1,EquipType.Fighter] // 烈風改二戊型(一航戦/熟練)
,340:[0,EquipType.MainGunM] // 152mm/55 三連装速射砲
,341:[0,EquipType.MainGunM] // 152mm/55 三連装速射砲改
,342:[4,EquipType.TorpBomber] // 流星改(一航戦)
,343:[6,EquipType.TorpBomber] // 流星改(一航戦/熟練)
,344:[4,EquipType.TorpBomber] // 九七式艦攻改 試製三号戊型(空六号電探改装備機)
,345:[5,EquipType.TorpBomber] // 九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)
,346:[0,EquipType.DepthCharge] // 二式12cm迫撃砲改
,347:[0,EquipType.DepthCharge] // 二式12cm迫撃砲改 集中配備
,348:[0,EquipType.WG] // 艦載型 四式20cm対地噴進砲
,349:[0,EquipType.WG] // 四式20cm対地噴進砲 集中配備
,353:[0,EquipType.Fighter] // Fw190 A-5改(熟練)
,355:[0,EquipType.LandingCraft] // M4A1 DD
,356:[0,EquipType.MainGunM] // 8inch三連装砲 Mk.9
,357:[0,EquipType.MainGunM] // 8inch三連装砲 Mk.9 mod.2
,358:[0,EquipType.SecGun] // 5inch 単装高角砲群
,359:[0,EquipType.MainGunM] // 6inch 連装速射砲 Mk.XXI
,360:[0,EquipType.MainGunM] // Bofors 15cm連装速射砲 Mk.9 Model 1938
,361:[0,EquipType.MainGunM] // Bofors 15cm連装速射砲 Mk.9改+単装速射砲 Mk.10改 Model 1938
,362:[0,EquipType.MainGunM] // 5inch連装両用砲(集中配備)
,363:[3,EquipType.MainGunM] // GFCS Mk.37+5inch連装両用砲(集中配備)
,364:[2,EquipType.MidgetSub] // 甲標的 丁型改(蛟龍改)
,365:[0,EquipType.APShell] // 一式徹甲弾改
,366:[0,EquipType.MainGunS] // 12.7cm連装砲D型改三
,367:[2,EquipType.SeaPlaneBomber] // Swordfish(水上機型)
,368:[3,EquipType.SeaPlaneBomber] // Swordfish Mk.III改(水上機型)
,369:[4,EquipType.SeaPlaneBomber] // Swordfish Mk.III改(水上機型/熟練)
,370:[5,EquipType.SeaPlane] // Swordfish Mk.II改(水偵型)
,371:[6,EquipType.SeaPlane] // Fairey Seafox改
,372:[2,EquipType.TorpBomber] // 天山一二型甲
,373:[5,EquipType.TorpBomber] // 天山一二型甲改(空六号電探改装備機)
,374:[6,EquipType.TorpBomber] // 天山一二型甲改(熟練/空六号電探改装備機)
,375:[1,EquipType.Fighter] // XF5U
,376:[0,EquipType.Torpedo] // 533mm五連装魚雷(後期型)
,377:[0,EquipType.DepthCharge] // RUR-4A Weapon Alpha改
,378:[0,EquipType.DepthCharge] // 対潜短魚雷(試作初期型)
,379:[0,EquipType.MainGunS] // 12.7cm単装高角砲改二
,380:[0,EquipType.MainGunS] // 12.7cm連装高角砲改二
,381:[0,EquipType.MainGunL] // 16inch三連装砲 Mk.6
,382:[0,EquipType.MainGunS] // 12cm単装高角砲E型
,383:[0,EquipType.TorpedoSS] // 後期型53cm艦首魚雷(8門)
,384:[7,EquipType.SubRadar] // 後期型潜水艦搭載電探&逆探
,385:[0,EquipType.MainGunL] // 16inch三連装砲 Mk.6 mod.2
,386:[0,EquipType.MainGunM] // 6inch三連装速射砲 Mk.16
,387:[0,EquipType.MainGunM] // 6inch三連装速射砲 Mk.16 mod.2
,389:[10,EquipType.TorpBomber] // TBM-3W+3S
,390:[0,EquipType.MainGunL] // 16inch三連装砲 Mk.6+GFCS
,391:[2,EquipType.DiveBomber] // 九九式艦爆二二型
,392:[3,EquipType.DiveBomber] // 九九式艦爆二二型(熟練)
,393:[0,EquipType.MainGunS] // 120mm/50 連装砲 mod.1936
,394:[0,EquipType.MainGunS] // 120mm/50 連装砲改 A.mod.1937
,397:[0,EquipType.MainGunS] // 現地改装12.7cm連装高角砲
,398:[0,EquipType.MainGunS] // 現地改装10cm連装高角砲
,399:[0,EquipType.MainGunM] // 6inch Mk.XXIII三連装砲
,400:[0,EquipType.Torpedo] // 533mm 三連装魚雷(53-39型)
,402:[0,EquipType.Scamp] // 寒冷地装備&甲板要員
,407:[0,EquipType.MainGunM] // 15.2cm連装砲改二
,408:[1,EquipType.LandingCraft] // 装甲艇(AB艇)
,409:[0,EquipType.LandingCraft] // 武装大発
,410:[7,EquipType.RadarL] // 21号対空電探改二
,411:[6,EquipType.RadarL] // 42号対空電探改二
,412:[2,EquipType.Picket] // 水雷戦隊 熟練見張員
,413:[1,EquipType.FCF] // 精鋭水雷戦隊 司令部
,414:[4,EquipType.SeaPlane] // SOC Seagull
,415:[7,EquipType.SeaPlane] // SO3C Seamew改
,419:[3,EquipType.DiveBomber] // SBD-5
,420:[3,EquipType.DiveBomber] // SB2C-3
,421:[4,EquipType.DiveBomber] // SB2C-5
,422:[0,EquipType.Fighter] // FR-1 Fireball
,423:[4,EquipType.CarrierScout] // Fulmar(戦闘偵察/熟練)
,424:[2,EquipType.TorpBomber] // Barracuda Mk.II
,425:[3,EquipType.TorpBomber] // Barracuda Mk.III
,426:[0,EquipType.MainGunL] // 305mm/46 連装砲
,427:[0,EquipType.MainGunL] // 305mm/46 三連装砲
,428:[0,EquipType.MainGunL] // 320mm/44 連装砲
,429:[0,EquipType.MainGunL] // 320mm/44 三連装砲
,430:[0,EquipType.SecGun] // 65mm/64 単装速射砲改
,434:[1,EquipType.Fighter] // Corsair Mk.II
,435:[2,EquipType.Fighter] // Corsair Mk.II(Ace)
,436:[0,EquipType.LandingCraft] // 大発動艇(II号戦車/北アフリカ仕様)
,437:[0,EquipType.Fighter] // 試製 陣風
,438:[0,EquipType.SonarS] // 三式水中探信儀改
,439:[0,EquipType.DepthCharge] // Hedgehog(初期型)
,440:[0,EquipType.TorpedoSS] // 21inch艦首魚雷発射管6門(初期型)
,441:[0,EquipType.TorpedoSS] // 21inch艦首魚雷発射管6門(後期型)
,442:[0,EquipType.TorpedoSS] // 潜水艦後部魚雷発射管4門(初期型)
,443:[0,EquipType.TorpedoSS] // 潜水艦後部魚雷発射管4門(後期型)
,447:[3,EquipType.DiveBomber] // 零式艦戦64型(複座KMX搭載機)
,449:[0,EquipType.LandingCraft] // 特大発動艇+一式砲戦車
,450:[5,EquipType.RadarS] // 13号対空電探改(後期型)
,451:[2,EquipType.AswPlane] // 三式指揮連絡機改
,455:[0,EquipType.MainGunS] // 試製 長12.7cm連装砲A型改四
,456:[9,EquipType.RadarS] // SG レーダー(後期型)
,457:[0,EquipType.TorpedoSS] // 後期型艦首魚雷(4門)
,458:[6,EquipType.SubRadar] // 後期型電探&逆探+シュノーケル装備
,460:[8,EquipType.RadarL] // 15m二重測距儀改+21号電探改二+熟練射撃指揮所
,461:[0,EquipType.TorpedoSS] // 熟練聴音員+後期型艦首魚雷(4門)
,463:[0,EquipType.SecGun] // 15.5cm三連装副砲改二
,464:[0,EquipType.SecGun] // 10cm連装高角砲群 集中配備
,465:[0,EquipType.MainGunL] // 試製51cm三連装砲
,466:[5,EquipType.TorpBomber] // 流星改(熟練)
,467:[0,EquipType.SecGun] // 5inch連装砲(副砲配置) 集中配備
,468:[0,EquipType.MainGunL] // 38cm四連装砲改 deux
,469:[5,EquipType.SeaPlane] // 零式水上偵察機11型乙改(夜偵)
,470:[0,EquipType.MainGunS] // 12.7cm連装砲C型改三
,471:[3,EquipType.SeaPlane] // Loire 130M
,472:[0,EquipType.DepthCharge] // Mk.32 対潜魚雷(Mk.2落射機)
,473:[2,EquipType.Fighter] // F4U-2 Night Corsair
,474:[2,EquipType.DiveBomber] // F4U-4
,475:[2,EquipType.DiveBomber] // AU-1
,476:[2,EquipType.DiveBomber] // F4U-7
,477:[1,EquipType.Scamp] // 熟練甲板要員
,478:[1,EquipType.Scamp] // 熟練甲板要員+航空整備員
,481:[6,EquipType.TorpBomber] // Mosquito TR Mk.33
,482:[0,EquipType.LandingCraft] // 特大発動艇+Ⅲ号戦車(北アフリカ仕様)
,483:[0,EquipType.ShrapnelShell] // 三式弾改二
,485:[2,EquipType.SeaPlaneFighter] // 強風改二
,486:[1,EquipType.Fighter] // 零式艦戦64型(制空戦闘機仕様)
,487:[2,EquipType.DiveBomber] // 零式艦戦64型(熟練爆戦)
,488:[0,EquipType.DepthCharge] // 二式爆雷改二
,489:[0,EquipType.AswPlane] // 一式戦 隼II型改(20戦隊)
,490:[7,EquipType.SeaPlaneBomber] // 試製 夜間瑞雲(攻撃装備)
,491:[0,EquipType.AswPlane] // 一式戦 隼III型改(熟練/20戦隊)
,492:[0,EquipType.Fighter] // 零戦52型丙(八幡部隊)
,494:[0,EquipType.LandingCraft] // 特大発動艇+チハ
,495:[0,EquipType.LandingCraft] // 特大発動艇+チハ改
,496:[0,EquipType.ArmyUnit] // 陸軍歩兵部隊
,497:[0,EquipType.ArmyUnit] // 九七式中戦車(チハ)
,498:[0,EquipType.ArmyUnit] // 九七式中戦車 新砲塔(チハ改)
,499:[0,EquipType.ArmyUnit] // 陸軍歩兵部隊+チハ改
,500:[0,EquipType.SmokeScreen] // 発煙装置(煙幕)
,501:[0,EquipType.SmokeScreen] // 発煙装置改(煙幕)
,502:[0,EquipType.MainGunL] // 35.6cm連装砲改三(ダズル迷彩仕様)
,503:[0,EquipType.MainGunL] // 35.6cm連装砲改四
,505:[0,EquipType.AAGun] // 25mm対空機銃増備
,506:[5,EquipType.RadarS] // 電探装備マスト(13号改+22号電探改四)
,507:[0,EquipType.MainGunL] // 14inch/45 連装砲
,508:[0,EquipType.MainGunL] // 14inch/45 三連装砲
,509:[0,EquipType.MainGunS] // 12cm単装高角砲E型改
,510:[4,EquipType.SeaPlane] // Walrus
,511:[0,EquipType.TorpedoSS] // 21inch艦首魚雷発射管4門(初期型)
,512:[0,EquipType.TorpedoSS] // 21inch艦首魚雷発射管4門(後期型)
,513:[0,EquipType.SmokeScreen] // 阻塞気球
,514:[0,EquipType.LandingCraft] // 特大発動艇+Ⅲ号戦車J型
,515:[5,EquipType.SeaPlane] // Sea Otter
,517:[8,EquipType.RadarS] // 逆探(E27)+22号対水上電探改四(後期調整型)
,518:[0,EquipType.MainGunM] // 14cm連装砲改二
,519:[7,EquipType.SubRadar] // SJレーダー+潜水艦司令塔装備
,520:[0,EquipType.MainGunM] // 試製20.3cm(4号)連装砲
,521:[9,EquipType.SeaPlane] // 紫雲(熟練)
,524:[0,EquipType.SecGun] // 12cm単装高角砲＋25mm機銃増備
,525:[0,EquipType.LandingTank] // 特四式内火艇
,526:[0,EquipType.LandingTank] // 特四式内火艇改
,522:[3,EquipType.SeaPlane] // 零式小型水上機
,523:[4,EquipType.SeaPlane] // 零式小型水上機(熟練)
,527:[8,EquipType.RadarL] // Type281 レーダー
,528:[5,EquipType.RadarL] // Type274 射撃管制レーダー
,529:[0,EquipType.MainGunS] // 12.7cm連装砲C型改三H
,530:[0,EquipType.MainGunL] // 35.6cm連装砲改三丙
,531:[1,EquipType.FCF] // 艦隊通信アンテナ
,532:[1,EquipType.FCF] // 通信装置&要員
,533:[0,EquipType.MainGunS] // 10cm連装高角砲改+高射装置改
,534:[0,EquipType.MainGunS] // 13.8cm連装砲
,535:[0,EquipType.MainGunS] // 13.8cm連装砲改
,537:[0,EquipType.MainGunM] // 15.2cm三連装主砲改
,538:[5,EquipType.SeaPlane] // Loire 130M改(熟練)
,536:[0,EquipType.MainGunM] // 15.2cm三連装主砲
,541:[2,EquipType.DiveBomber] // SBD(Yellow Wings)
,542:[2,EquipType.TorpBomber] // TBD(Yellow Wings)
,544:[2,EquipType.DiveBomber] // SBD VB-2(爆撃飛行隊)
,545:[6,EquipType.TorpBomber] // 天山一二型甲改二(村田隊/電探装備)
,543:[6,EquipType.CarrierScout] // SBD VS-2(偵察飛行隊)
,539:[7,EquipType.SeaPlane] // SOC Seagull 後期型(熟練)
,540:[7,EquipType.SeaPlane] // 零式水上偵察機11型甲改二
,549:[3,EquipType.AswPlane] // 三式指揮連絡機改二
,550:[1,EquipType.DiveBomber] // 試製 明星(増加試作機)
,551:[2,EquipType.DiveBomber] // 明星
,552:[4,EquipType.DiveBomber] // 九九式練爆二二型改(夜間装備実験機)
,553:[0,EquipType.MainGunS] // 10cm連装高角砲改
,554:[2,EquipType.TorpBomber] // 九七式艦攻改(北東海軍航空隊)
,555:[0,EquipType.MainGunM] // 18cm/57 三連装主砲
,556:[1,EquipType.SecGun] // 10cm/56 単装高角砲(集中配備)
,557:[1,EquipType.DiveBomber] // 零式艦戦62型改(夜間爆戦)
,558:[2,EquipType.DiveBomber] // 零式艦戦62型改(熟練/夜間爆戦)
,559:[3,EquipType.TorpBomber] // Ju87 D-4(Fliegerass)
,560:[0,EquipType.Fighter] // Bf109 T-3(G)

,564:[0,EquipType.MainGunM] // 21cm単装主砲
,565:[0,EquipType.SecGun] // 15cm単装副砲
,566:[0,EquipType.SecGun] // 10.2cm三連装副砲
,567:[1,EquipType.Fighter] // Sea Gladiator
} as const; // @expansion

export default EQUIP_DATAS;