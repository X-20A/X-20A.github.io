/* 
    http://kancolle-calc.net/deckbuilder.html 様より失敬
*/

import { EquipId } from "../types/equipId";
import type { EquipName } from "../types/equipName";

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
    /** 噴式戦闘機 */
    JetFighter = 56,
    /** 噴式艦爆 */
    JetBomber = 57,
}

/** 索敵値, 装備種別ID, 装備名 */
export type EquipData = {
    seek: number,
    type: EquipType,
    name: EquipName,
};

export type EquipDatas = Record<EquipId, EquipData>;

/** 基地系は除外 */
const EQUIP_DATAS: EquipDatas = {
 1:{seek:0,type:EquipType.MainGunS,name:'12cm単装砲'}
,2:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲'}
,3:{seek:0,type:EquipType.MainGunS,name:'10cm連装高角砲'}
,4:{seek:0,type:EquipType.MainGunM,name:'14cm単装砲'}
,5:{seek:0,type:EquipType.MainGunM,name:'15.5cm三連装砲'}
,6:{seek:0,type:EquipType.MainGunM,name:'20.3cm連装砲'}
,7:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲'}
,8:{seek:0,type:EquipType.MainGunL,name:'41cm連装砲'}
,9:{seek:0,type:EquipType.MainGunL,name:'46cm三連装砲'}
,10:{seek:0,type:EquipType.SecGun,name:'12.7cm連装高角砲'}
,11:{seek:0,type:EquipType.SecGun,name:'15.2cm単装砲'}
,12:{seek:0,type:EquipType.SecGun,name:'15.5cm三連装副砲'}
,13:{seek:0,type:EquipType.Torpedo,name:'61cm三連装魚雷'}
,14:{seek:0,type:EquipType.Torpedo,name:'61cm四連装魚雷'}
,15:{seek:0,type:EquipType.Torpedo,name:'61cm四連装(酸素)魚雷'}
,16:{seek:1,type:EquipType.TorpBomber,name:'九七式艦攻'}
,17:{seek:1,type:EquipType.TorpBomber,name:'天山'}
,18:{seek:1,type:EquipType.TorpBomber,name:'流星'}
,19:{seek:0,type:EquipType.Fighter,name:'九六式艦戦'}
,20:{seek:0,type:EquipType.Fighter,name:'零式艦戦21型'}
,21:{seek:0,type:EquipType.Fighter,name:'零式艦戦52型'}
,22:{seek:0,type:EquipType.Fighter,name:'試製烈風 後期型'}
,23:{seek:0,type:EquipType.DiveBomber,name:'九九式艦爆'}
,24:{seek:0,type:EquipType.DiveBomber,name:'彗星'}
,25:{seek:5,type:EquipType.SeaPlane,name:'零式水上偵察機'}
,26:{seek:6,type:EquipType.SeaPlaneBomber,name:'瑞雲'}
,27:{seek:3,type:EquipType.RadarS,name:'13号対空電探'}
,28:{seek:5,type:EquipType.RadarS,name:'22号対水上電探'}
,29:{seek:7,type:EquipType.RadarS,name:'33号対水上電探'}
,30:{seek:4,type:EquipType.RadarL,name:'21号対空電探'}
,31:{seek:10,type:EquipType.RadarL,name:'32号対水上電探'}
,32:{seek:5,type:EquipType.RadarL,name:'42号対空電探'}
,33:{seek:0,type:EquipType.Engine,name:'改良型艦本式タービン'}
,34:{seek:0,type:EquipType.Engine,name:'強化型艦本式缶'}
,35:{seek:0,type:EquipType.ShrapnelShell,name:'三式弾'}
,36:{seek:0,type:EquipType.APShell,name:'九一式徹甲弾'}
,37:{seek:0,type:EquipType.AAGun,name:'7.7mm機銃'}
,38:{seek:0,type:EquipType.AAGun,name:'12.7mm単装機銃'}
,39:{seek:0,type:EquipType.AAGun,name:'25mm連装機銃'}
,40:{seek:0,type:EquipType.AAGun,name:'25mm三連装機銃'}
,41:{seek:0,type:EquipType.MidgetSub,name:'甲標的 甲型'}
,42:{seek:0,type:EquipType.Repair,name:'応急修理要員'}
,43:{seek:0,type:EquipType.Repair,name:'応急修理女神'}
,44:{seek:0,type:EquipType.DepthCharge,name:'九四式爆雷投射機'}
,45:{seek:0,type:EquipType.DepthCharge,name:'三式爆雷投射機'}
,46:{seek:0,type:EquipType.SonarS,name:'九三式水中聴音機'}
,47:{seek:0,type:EquipType.SonarS,name:'三式水中探信儀'}
,48:{seek:0,type:EquipType.MainGunS,name:'12cm単装高角砲'}
,49:{seek:0,type:EquipType.AAGun,name:'25mm単装機銃'}
,50:{seek:0,type:EquipType.MainGunM,name:'20.3cm(3号)連装砲'}
,51:{seek:0,type:EquipType.AAGun,name:'12cm30連装噴進砲'}
,52:{seek:2,type:EquipType.TorpBomber,name:'流星改'}
,53:{seek:0,type:EquipType.Fighter,name:'烈風 一一型'}
,54:{seek:9,type:EquipType.CarrierScout,name:'彩雲'}
,55:{seek:0,type:EquipType.Fighter,name:'紫電改二'}
,56:{seek:0,type:EquipType.Fighter,name:'震電改'}
,57:{seek:1,type:EquipType.DiveBomber,name:'彗星一二型甲'}
,58:{seek:0,type:EquipType.Torpedo,name:'61cm五連装(酸素)魚雷'}
,59:{seek:6,type:EquipType.SeaPlane,name:'零式水上観測機'}
,60:{seek:0,type:EquipType.DiveBomber,name:'零式艦戦62型(爆戦)'}
,61:{seek:7,type:EquipType.CarrierScout,name:'二式艦上偵察機'}
,62:{seek:6,type:EquipType.SeaPlaneBomber,name:'試製晴嵐'}
,63:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲B型改二'}
,64:{seek:0,type:EquipType.DiveBomber,name:'Ju87C改'}
,65:{seek:0,type:EquipType.MainGunM,name:'15.2cm連装砲'}
,66:{seek:0,type:EquipType.SecGun,name:'8cm高角砲'}
,67:{seek:0,type:EquipType.Torpedo,name:'53cm艦首(酸素)魚雷'}
,68:{seek:0,type:EquipType.LandingCraft,name:'大発動艇'}
,69:{seek:0,type:EquipType.AutoGyro,name:'カ号観測機'}
,70:{seek:1,type:EquipType.AswPlane,name:'三式指揮連絡機(対潜)'}
,71:{seek:0,type:EquipType.SecGun,name:'10cm連装高角砲(砲架)'}
,72:{seek:0,type:EquipType.BulgeM,name:'増設バルジ(中型艦)'}
,73:{seek:0,type:EquipType.BulgeL,name:'増設バルジ(大型艦)'}
,74:{seek:2,type:EquipType.SearchLightS,name:'探照灯'}
,75:{seek:0,type:EquipType.Drum,name:'ドラム缶(輸送用)'}
,76:{seek:0,type:EquipType.MainGunL,name:'38cm連装砲'}
,77:{seek:0,type:EquipType.SecGun,name:'15cm連装副砲'}
,78:{seek:0,type:EquipType.MainGunS,name:'12.7cm単装砲'}
,79:{seek:6,type:EquipType.SeaPlaneBomber,name:'瑞雲(六三四空)'}
,80:{seek:6,type:EquipType.SeaPlaneBomber,name:'瑞雲12型'}
,81:{seek:7,type:EquipType.SeaPlaneBomber,name:'瑞雲12型(六三四空)'}
,82:{seek:2,type:EquipType.TorpBomber,name:'九七式艦攻(九三一空)'}
,83:{seek:2,type:EquipType.TorpBomber,name:'天山(九三一空)'}
,84:{seek:0,type:EquipType.AAGun,name:'2cm 四連装FlaK 38'}
,85:{seek:0,type:EquipType.AAGun,name:'3.7cm FlaK M42'}
,86:{seek:0,type:EquipType.SRF,name:'艦艇修理施設'}
,87:{seek:0,type:EquipType.Engine,name:'新型高温高圧缶'}
,88:{seek:5,type:EquipType.RadarS,name:'22号対水上電探改四'}
,89:{seek:6,type:EquipType.RadarL,name:'21号対空電探改'}
,90:{seek:0,type:EquipType.MainGunM,name:'20.3cm(2号)連装砲'}
,91:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装高角砲(後期型)'}
,92:{seek:0,type:EquipType.AAGun,name:'毘式40mm連装機銃'}
,93:{seek:4,type:EquipType.TorpBomber,name:'九七式艦攻(友永隊)'}
,94:{seek:5,type:EquipType.TorpBomber,name:'天山一二型(友永隊)'}
,95:{seek:0,type:EquipType.TorpedoSS,name:'潜水艦53cm艦首魚雷(8門)'}
,96:{seek:1,type:EquipType.Fighter,name:'零式艦戦21型(熟練)'}
,97:{seek:2,type:EquipType.DiveBomber,name:'九九式艦爆(熟練)'}
,98:{seek:2,type:EquipType.TorpBomber,name:'九七式艦攻(熟練)'}
,99:{seek:3,type:EquipType.DiveBomber,name:'九九式艦爆(江草隊)'}
,100:{seek:4,type:EquipType.DiveBomber,name:'彗星(江草隊)'}
,101:{seek:0,type:EquipType.StarShell,name:'照明弾'}
,102:{seek:3,type:EquipType.SeaPlane,name:'九八式水上偵察機(夜偵)'}
,103:{seek:0,type:EquipType.MainGunL,name:'試製35.6cm三連装砲'}
,104:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲(ダズル迷彩)'}
,105:{seek:0,type:EquipType.MainGunL,name:'試製41cm三連装砲'}
,106:{seek:4,type:EquipType.RadarS,name:'13号対空電探改'}
,107:{seek:1,type:EquipType.FCF,name:'艦隊司令部施設'}
,108:{seek:1,type:EquipType.Scamp,name:'熟練艦載機整備員'}
,109:{seek:0,type:EquipType.Fighter,name:'零戦52型丙(六〇一空)'}
,110:{seek:0,type:EquipType.Fighter,name:'烈風(六〇一空)'}
,111:{seek:1,type:EquipType.DiveBomber,name:'彗星(六〇一空)'}
,112:{seek:2,type:EquipType.TorpBomber,name:'天山(六〇一空)'}
,113:{seek:3,type:EquipType.TorpBomber,name:'流星(六〇一空)'}
,114:{seek:0,type:EquipType.MainGunL,name:'38cm連装砲改'}
,115:{seek:5,type:EquipType.SeaPlane,name:'Ar196改'}
,116:{seek:0,type:EquipType.APShell,name:'一式徹甲弾'}
,117:{seek:0,type:EquipType.MainGunL,name:'試製46cm連装砲'}
,118:{seek:8,type:EquipType.SeaPlane,name:'紫雲'}
,119:{seek:0,type:EquipType.MainGunM,name:'14cm連装砲'}
,120:{seek:0,type:EquipType.AAFD,name:'91式高射装置'}
,121:{seek:0,type:EquipType.AAFD,name:'94式高射装置'}
,122:{seek:0,type:EquipType.MainGunS,name:'10cm連装高角砲+高射装置'}
,123:{seek:0,type:EquipType.MainGunM,name:'SKC34 20.3cm連装砲'}
,124:{seek:9,type:EquipType.RadarL,name:'FuMO25 レーダー'}
,125:{seek:0,type:EquipType.Torpedo,name:'61cm三連装(酸素)魚雷'}
,126:{seek:0,type:EquipType.WG,name:'WG42 (Wurfgerät 42)'}
,127:{seek:0,type:EquipType.TorpedoSS,name:'試製FaT仕様九五式酸素魚雷改'}
,128:{seek:0,type:EquipType.MainGunL,name:'試製51cm連装砲'}
,129:{seek:2,type:EquipType.Picket,name:'熟練見張員'}
,130:{seek:0,type:EquipType.SecGun,name:'12.7cm高角砲+高射装置'}
,131:{seek:0,type:EquipType.AAGun,name:'25mm三連装機銃 集中配備'}
,132:{seek:1,type:EquipType.SonarL,name:'零式水中聴音機'}
,133:{seek:0,type:EquipType.MainGunL,name:'381mm/50 三連装砲'}
,134:{seek:0,type:EquipType.SecGun,name:'OTO 152mm三連装速射砲'}
,135:{seek:0,type:EquipType.SecGun,name:'90mm単装高角砲'}
,136:{seek:0,type:EquipType.BulgeL,name:'プリエーゼ式水中防御隔壁'}
,137:{seek:0,type:EquipType.MainGunL,name:'381mm/50 三連装砲改'}
,138:{seek:12,type:EquipType.FlyingBoat,name:'二式大艇'}
,139:{seek:0,type:EquipType.MainGunM,name:'15.2cm連装砲改'}
,140:{seek:3,type:EquipType.SearchLightL,name:'96式150cm探照灯'}
,141:{seek:11,type:EquipType.RadarL,name:'32号対水上電探改'}
,142:{seek:7,type:EquipType.RadarL,name:'15m二重測距儀+21号電探改二'}
,143:{seek:4,type:EquipType.TorpBomber,name:'九七式艦攻(村田隊)'}
,144:{seek:4,type:EquipType.TorpBomber,name:'天山一二型(村田隊)'}
,145:{seek:0,type:EquipType.Ration,name:'戦闘糧食'}
,146:{seek:0,type:EquipType.OilDrum,name:'洋上補給'}
,147:{seek:0,type:EquipType.MainGunS,name:'120mm/50 連装砲'}
,148:{seek:2,type:EquipType.DiveBomber,name:'試製南山'}
,149:{seek:0,type:EquipType.SonarS,name:'四式水中聴音機'}
,150:{seek:0,type:EquipType.Ration,name:'秋刀魚の缶詰'}
,151:{seek:11,type:EquipType.CarrierScout,name:'試製景雲(艦偵型)'}
,152:{seek:1,type:EquipType.Fighter,name:'零式艦戦52型(熟練)'}
,153:{seek:1,type:EquipType.Fighter,name:'零戦52型丙(付岩井小隊)'}
,154:{seek:1,type:EquipType.DiveBomber,name:'零戦62型(爆戦/岩井隊)'}
,155:{seek:1,type:EquipType.Fighter,name:'零戦21型(付岩本小隊)'}
,156:{seek:1,type:EquipType.Fighter,name:'零戦52型甲(付岩本小隊)'}
,157:{seek:3,type:EquipType.Fighter,name:'零式艦戦53型(岩本隊)'}
,158:{seek:0,type:EquipType.Fighter,name:'Bf109T改'}
,159:{seek:0,type:EquipType.Fighter,name:'Fw190T改'}
,160:{seek:0,type:EquipType.SecGun,name:'10.5cm連装砲'}
,161:{seek:0,type:EquipType.MainGunL,name:'16inch三連装砲 Mk.7'}
,162:{seek:0,type:EquipType.MainGunM,name:'203mm/53 連装砲'}
,163:{seek:4,type:EquipType.SeaPlane,name:'Ro.43水偵'}
,164:{seek:2,type:EquipType.SeaPlaneFighter,name:'Ro.44水上戦闘機'}
,165:{seek:1,type:EquipType.SeaPlaneFighter,name:'二式水戦改'}
,166:{seek:0,type:EquipType.LandingCraft,name:'大発動艇(八九式中戦車&陸戦隊)'}
,167:{seek:0,type:EquipType.LandingTank,name:'特二式内火艇'}
,171:{seek:6,type:EquipType.SeaPlane,name:'OS2U'}
,172:{seek:0,type:EquipType.SecGun,name:'5inch連装砲 Mk.28 mod.2'}
,173:{seek:0,type:EquipType.AAGun,name:'Bofors 40mm四連装機関砲'}
,174:{seek:0,type:EquipType.Torpedo,name:'53cm連装魚雷'}
,178:{seek:9,type:EquipType.FlyingBoat,name:'PBY-5A Catalina'}
,179:{seek:0,type:EquipType.Torpedo,name:'試製61cm六連装(酸素)魚雷'}
,181:{seek:0,type:EquipType.Fighter,name:'零式艦戦32型'}
,182:{seek:0,type:EquipType.Fighter,name:'零式艦戦32型(熟練)'}
,183:{seek:0,type:EquipType.MainGunL,name:'16inch三連装砲 Mk.7+GFCS'}
,184:{seek:0,type:EquipType.Fighter,name:'Re.2001 OR改'}
,188:{seek:0,type:EquipType.TorpBomber,name:'Re.2001 G改'}
,189:{seek:0,type:EquipType.Fighter,name:'Re.2005 改'}
,190:{seek:0,type:EquipType.MainGunL,name:'38.1cm Mk.I連装砲'}
,191:{seek:0,type:EquipType.AAGun,name:'QF 2ポンド8連装ポンポン砲'}
,192:{seek:0,type:EquipType.MainGunL,name:'38.1cm Mk.I/N連装砲改'}
,193:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇'}
,194:{seek:4,type:EquipType.SeaPlaneBomber,name:'Laté 298B'}
,195:{seek:2,type:EquipType.DiveBomber,name:'SBD'}
,196:{seek:2,type:EquipType.TorpBomber,name:'TBD'}
,197:{seek:0,type:EquipType.Fighter,name:'F4F-3'}
,198:{seek:1,type:EquipType.Fighter,name:'F4F-4'}
,199:{seek:3,type:EquipType.JetBomber,name:'噴式景雲改'}
,200:{seek:0,type:EquipType.JetBomber,name:'橘花改'}
,203:{seek:0,type:EquipType.BulgeM,name:'艦本新設計 増設バルジ(中型艦)'}
,204:{seek:0,type:EquipType.BulgeL,name:'艦本新設計 増設バルジ(大型艦)'}
,205:{seek:1,type:EquipType.Fighter,name:'F6F-3'}
,206:{seek:1,type:EquipType.Fighter,name:'F6F-5'}
,207:{seek:4,type:EquipType.SeaPlaneBomber,name:'瑞雲(六三一空)'}
,208:{seek:6,type:EquipType.SeaPlaneBomber,name:'晴嵐(六三一空)'}
,209:{seek:0,type:EquipType.TransportItem,name:'彩雲(輸送用分解済)'}
,210:{seek:4,type:EquipType.SubRadar,name:'潜水艦搭載電探&水防式望遠鏡'}
,211:{seek:5,type:EquipType.SubRadar,name:'潜水艦搭載電探&逆探(E27)'}
,212:{seek:10,type:EquipType.CarrierScout,name:'彩雲(東カロリン空)'}
,213:{seek:0,type:EquipType.TorpedoSS,name:'後期型艦首魚雷(6門)'}
,214:{seek:1,type:EquipType.TorpedoSS,name:'熟練聴音員+後期型艦首魚雷(6門)'}
,215:{seek:3,type:EquipType.SeaPlaneFighter,name:'Ro.44水上戦闘機bis'}
,216:{seek:1,type:EquipType.SeaPlaneFighter,name:'二式水戦改(熟練)'}
,217:{seek:1,type:EquipType.SeaPlaneFighter,name:'強風改'}
,219:{seek:0,type:EquipType.DiveBomber,name:'零式艦戦63型(爆戦)'}
,220:{seek:0,type:EquipType.SecGun,name:'8cm高角砲改+増設機銃'}
,226:{seek:0,type:EquipType.DepthCharge,name:'九五式爆雷'}
,227:{seek:0,type:EquipType.DepthCharge,name:'二式爆雷'}
,228:{seek:0,type:EquipType.Fighter,name:'九六式艦戦改'}
,229:{seek:0,type:EquipType.MainGunS,name:'12.7cm単装高角砲(後期型)'}
,230:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+戦車第11連隊'}
,231:{seek:0,type:EquipType.MainGunL,name:'30.5cm三連装砲'}
,232:{seek:0,type:EquipType.MainGunL,name:'30.5cm三連装砲改'}
,233:{seek:1,type:EquipType.DiveBomber,name:'F4U-1D'}
,234:{seek:0,type:EquipType.SecGun,name:'15.5cm三連装副砲改'}
,235:{seek:0,type:EquipType.MainGunM,name:'15.5cm三連装砲改'}
,236:{seek:0,type:EquipType.MainGunL,name:'41cm三連装砲改'}
,237:{seek:7,type:EquipType.SeaPlaneBomber,name:'瑞雲(六三四空/熟練)'}
,238:{seek:6,type:EquipType.SeaPlane,name:'零式水上偵察機11型乙'}
,239:{seek:8,type:EquipType.SeaPlane,name:'零式水上偵察機11型乙(熟練)'}
,240:{seek:7,type:EquipType.RadarS,name:'22号対水上電探改四(後期調整型)'}
,241:{seek:0,type:EquipType.Ration,name:'戦闘糧食(特別なおにぎり)'}
,242:{seek:1,type:EquipType.TorpBomber,name:'Swordfish'}
,243:{seek:2,type:EquipType.TorpBomber,name:'Swordfish Mk.II(熟練)'}
,244:{seek:5,type:EquipType.TorpBomber,name:'Swordfish Mk.III(熟練)'}
,245:{seek:0,type:EquipType.MainGunL,name:'38cm四連装砲'}
,246:{seek:0,type:EquipType.MainGunL,name:'38cm四連装砲改'}
,247:{seek:0,type:EquipType.SecGun,name:'15.2cm三連装砲'}
,248:{seek:0,type:EquipType.DiveBomber,name:'Skua'}
,249:{seek:1,type:EquipType.Fighter,name:'Fulmar'}
,252:{seek:0,type:EquipType.Fighter,name:'Seafire Mk.III改'}
,254:{seek:2,type:EquipType.Fighter,name:'F6F-3N'}
,255:{seek:3,type:EquipType.Fighter,name:'F6F-5N'}
,256:{seek:2,type:EquipType.TorpBomber,name:'TBF'}
,257:{seek:4,type:EquipType.TorpBomber,name:'TBM-3D'}
,258:{seek:0,type:EquipType.Scamp,name:'夜間作戦航空要員'}
,259:{seek:0,type:EquipType.Scamp,name:'夜間作戦航空要員+熟練甲板員'}
,260:{seek:0,type:EquipType.SonarS,name:'Type124 ASDIC'}
,261:{seek:0,type:EquipType.SonarS,name:'Type144/147 ASDIC'}
,262:{seek:2,type:EquipType.SonarS,name:'HF/DF + Type144/147 ASDIC'}
,266:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲C型改二'}
,267:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲D型改二'}
,268:{seek:0,type:EquipType.BulgeM,name:'北方迷彩(+北方装備)'}
,271:{seek:0,type:EquipType.Fighter,name:'紫電改四'}
,272:{seek:1,type:EquipType.FCF,name:'遊撃部隊 艦隊司令部'}
,273:{seek:10,type:EquipType.CarrierScout,name:'彩雲(偵四)'}
,274:{seek:0,type:EquipType.AAGun,name:'12cm30連装噴進砲改二'}
,275:{seek:0,type:EquipType.SecGun,name:'10cm連装高角砲改+増設機銃'}
,276:{seek:0,type:EquipType.MainGunL,name:'46cm三連装砲改'}
,277:{seek:0,type:EquipType.DiveBomber,name:'FM-2'}
,278:{seek:10,type:EquipType.RadarL,name:'SK レーダー'}
,279:{seek:12,type:EquipType.RadarL,name:'SK+SG レーダー'}
,280:{seek:0,type:EquipType.MainGunS,name:'QF 4.7inch砲 Mk.XII改'}
,281:{seek:0,type:EquipType.MainGunL,name:'51cm連装砲'}
,282:{seek:0,type:EquipType.MainGunS,name:'130mm B-13連装砲'}
,283:{seek:0,type:EquipType.Torpedo,name:'533mm 三連装魚雷'}
,284:{seek:0,type:EquipType.MainGunS,name:'5inch単装砲 Mk.30'}
,285:{seek:0,type:EquipType.Torpedo,name:'61cm三連装(酸素)魚雷後期型'}
,286:{seek:0,type:EquipType.Torpedo,name:'61cm四連装(酸素)魚雷後期型'}
,287:{seek:0,type:EquipType.DepthCharge,name:'三式爆雷投射機 集中配備'}
,288:{seek:0,type:EquipType.DepthCharge,name:'試製15cm9連装対潜噴進砲'}
,289:{seek:0,type:EquipType.MainGunL,name:'35.6cm三連装砲改(ダズル迷彩仕様)'}
,290:{seek:0,type:EquipType.MainGunL,name:'41cm三連装砲改二'}
,291:{seek:0,type:EquipType.DiveBomber,name:'彗星二二型(六三四空)'}
,292:{seek:2,type:EquipType.DiveBomber,name:'彗星二二型(六三四空/熟練)'}
,293:{seek:0,type:EquipType.MainGunS,name:'12cm単装砲改二'}
,294:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲A型改二'}
,295:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲A型改三(戦時改修)+高射装置'}
,296:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲B型改四(戦時改修)+高射装置'}
,297:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲A型'}
,298:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.I三連装砲'}
,299:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.I三連装砲+AFCT改'}
,300:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.I三連装砲改+FCR type284'}
,301:{seek:0,type:EquipType.AAGun,name:'20連装7inch UP Rocket Launchers'}
,302:{seek:3,type:EquipType.TorpBomber,name:'九七式艦攻(九三一空/熟練)'}
,303:{seek:0,type:EquipType.MainGunM,name:'Bofors 15.2cm連装砲 Model 1930'}
,304:{seek:4,type:EquipType.SeaPlane,name:'S9 Osprey'}
,305:{seek:2,type:EquipType.DiveBomber,name:'Ju87C改二(KMX搭載機)'}
,306:{seek:2,type:EquipType.DiveBomber,name:'Ju87C改二(KMX搭載機/熟練)'}
,307:{seek:6,type:EquipType.RadarS,name:'GFCS Mk.37'}
,308:{seek:3,type:EquipType.MainGunS,name:'5inch単装砲 Mk.30改+GFCS Mk.37'}
,309:{seek:0,type:EquipType.MidgetSub,name:'甲標的 丙型'}
,310:{seek:0,type:EquipType.MainGunM,name:'14cm連装砲改'}
,313:{seek:0,type:EquipType.MainGunS,name:'5inch単装砲 Mk.30改'}
,314:{seek:0,type:EquipType.Torpedo,name:'533mm五連装魚雷(初期型)'}
,315:{seek:8,type:EquipType.RadarS,name:'SG レーダー(初期型)'}
,316:{seek:0,type:EquipType.DiveBomber,name:'Re.2001 CB改'}
,317:{seek:0,type:EquipType.ShrapnelShell,name:'三式弾改'}
,318:{seek:0,type:EquipType.MainGunL,name:'41cm連装砲改二'}
,319:{seek:0,type:EquipType.DiveBomber,name:'彗星一二型(六三四空/三号爆弾搭載機)'}
,320:{seek:0,type:EquipType.DiveBomber,name:'彗星一二型(三一号光電管爆弾搭載機)'}
,322:{seek:7,type:EquipType.SeaPlaneBomber,name:'瑞雲改二(六三四空)'}
,323:{seek:8,type:EquipType.SeaPlaneBomber,name:'瑞雲改二(六三四空/熟練)'}
,324:{seek:0,type:EquipType.AutoGyro,name:'オ号観測機改'}
,325:{seek:1,type:EquipType.AutoGyro,name:'オ号観測機改二'}
,326:{seek:3,type:EquipType.AutoGyro,name:'S-51J'}
,327:{seek:4,type:EquipType.AutoGyro,name:'S-51J改'}
,328:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲改'}
,329:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲改二'}
,330:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.I連装砲'}
,331:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.V連装砲'}
,332:{seek:0,type:EquipType.MainGunL,name:'16inch Mk.VIII連装砲改'}
,335:{seek:0,type:EquipType.Fighter,name:'烈風改(試製艦載型)'}
,336:{seek:0,type:EquipType.Fighter,name:'烈風改二'}
,337:{seek:0,type:EquipType.Fighter,name:'烈風改二(一航戦/熟練)'}
,338:{seek:1,type:EquipType.Fighter,name:'烈風改二戊型'}
,339:{seek:1,type:EquipType.Fighter,name:'烈風改二戊型(一航戦/熟練)'}
,340:{seek:0,type:EquipType.MainGunM,name:'152mm/55 三連装速射砲'}
,341:{seek:0,type:EquipType.MainGunM,name:'152mm/55 三連装速射砲改'}
,342:{seek:4,type:EquipType.TorpBomber,name:'流星改(一航戦)'}
,343:{seek:6,type:EquipType.TorpBomber,name:'流星改(一航戦/熟練)'}
,344:{seek:4,type:EquipType.TorpBomber,name:'九七式艦攻改 試製三号戊型(空六号電探改装備機)'}
,345:{seek:5,type:EquipType.TorpBomber,name:'九七式艦攻改(熟練) 試製三号戊型(空六号電探改装備機)'}
,346:{seek:0,type:EquipType.DepthCharge,name:'二式12cm迫撃砲改'}
,347:{seek:0,type:EquipType.DepthCharge,name:'二式12cm迫撃砲改 集中配備'}
,348:{seek:0,type:EquipType.WG,name:'艦載型 四式20cm対地噴進砲'}
,349:{seek:0,type:EquipType.WG,name:'四式20cm対地噴進砲 集中配備'}
,353:{seek:0,type:EquipType.Fighter,name:'Fw190 A-5改(熟練)'}
,355:{seek:0,type:EquipType.LandingCraft,name:'M4A1 DD'}
,356:{seek:0,type:EquipType.MainGunM,name:'8inch三連装砲 Mk.9'}
,357:{seek:0,type:EquipType.MainGunM,name:'8inch三連装砲 Mk.9 mod.2'}
,358:{seek:0,type:EquipType.SecGun,name:'5inch 単装高角砲群'}
,359:{seek:0,type:EquipType.MainGunM,name:'6inch 連装速射砲 Mk.XXI'}
,360:{seek:0,type:EquipType.MainGunM,name:'Bofors 15cm連装速射砲 Mk.9 Model 1938'}
,361:{seek:0,type:EquipType.MainGunM,name:'Bofors 15cm連装速射砲 Mk.9改+単装速射砲 Mk.10改 Model 1938'}
,362:{seek:0,type:EquipType.MainGunM,name:'5inch連装両用砲(集中配備)'}
,363:{seek:3,type:EquipType.MainGunM,name:'GFCS Mk.37+5inch連装両用砲(集中配備)'}
,364:{seek:2,type:EquipType.MidgetSub,name:'甲標的 丁型改(蛟龍改)'}
,365:{seek:0,type:EquipType.APShell,name:'一式徹甲弾改'}
,366:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲D型改三'}
,367:{seek:2,type:EquipType.SeaPlaneBomber,name:'Swordfish(水上機型)'}
,368:{seek:3,type:EquipType.SeaPlaneBomber,name:'Swordfish Mk.III改(水上機型)'}
,369:{seek:4,type:EquipType.SeaPlaneBomber,name:'Swordfish Mk.III改(水上機型/熟練)'}
,370:{seek:5,type:EquipType.SeaPlane,name:'Swordfish Mk.II改(水偵型)'}
,371:{seek:6,type:EquipType.SeaPlane,name:'Fairey Seafox改'}
,372:{seek:2,type:EquipType.TorpBomber,name:'天山一二型甲'}
,373:{seek:5,type:EquipType.TorpBomber,name:'天山一二型甲改(空六号電探改装備機)'}
,374:{seek:6,type:EquipType.TorpBomber,name:'天山一二型甲改(熟練/空六号電探改装備機)'}
,375:{seek:1,type:EquipType.Fighter,name:'XF5U'}
,376:{seek:0,type:EquipType.Torpedo,name:'533mm五連装魚雷(後期型)'}
,377:{seek:0,type:EquipType.DepthCharge,name:'RUR-4A Weapon Alpha改'}
,378:{seek:0,type:EquipType.DepthCharge,name:'対潜短魚雷(試作初期型)'}
,379:{seek:0,type:EquipType.MainGunS,name:'12.7cm単装高角砲改二'}
,380:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装高角砲改二'}
,381:{seek:0,type:EquipType.MainGunL,name:'16inch三連装砲 Mk.6'}
,382:{seek:0,type:EquipType.MainGunS,name:'12cm単装高角砲E型'}
,383:{seek:0,type:EquipType.TorpedoSS,name:'後期型53cm艦首魚雷(8門)'}
,384:{seek:7,type:EquipType.SubRadar,name:'後期型潜水艦搭載電探&逆探'}
,385:{seek:0,type:EquipType.MainGunL,name:'16inch三連装砲 Mk.6 mod.2'}
,386:{seek:0,type:EquipType.MainGunM,name:'6inch三連装速射砲 Mk.16'}
,387:{seek:0,type:EquipType.MainGunM,name:'6inch三連装速射砲 Mk.16 mod.2'}
,389:{seek:10,type:EquipType.TorpBomber,name:'TBM-3W+3S'}
,390:{seek:0,type:EquipType.MainGunL,name:'16inch三連装砲 Mk.6+GFCS'}
,391:{seek:2,type:EquipType.DiveBomber,name:'九九式艦爆二二型'}
,392:{seek:3,type:EquipType.DiveBomber,name:'九九式艦爆二二型(熟練)'}
,393:{seek:0,type:EquipType.MainGunS,name:'120mm/50 連装砲 mod.1936'}
,394:{seek:0,type:EquipType.MainGunS,name:'120mm/50 連装砲改 A.mod.1937'}
,397:{seek:0,type:EquipType.MainGunS,name:'現地改装12.7cm連装高角砲'}
,398:{seek:0,type:EquipType.MainGunS,name:'現地改装10cm連装高角砲'}
,399:{seek:0,type:EquipType.MainGunM,name:'6inch Mk.XXIII三連装砲'}
,400:{seek:0,type:EquipType.Torpedo,name:'533mm 三連装魚雷(53-39型)'}
,402:{seek:0,type:EquipType.Scamp,name:'寒冷地装備&甲板要員'}
,407:{seek:0,type:EquipType.MainGunM,name:'15.2cm連装砲改二'}
,408:{seek:1,type:EquipType.LandingCraft,name:'装甲艇(AB艇)'}
,409:{seek:0,type:EquipType.LandingCraft,name:'武装大発'}
,410:{seek:7,type:EquipType.RadarL,name:'21号対空電探改二'}
,411:{seek:6,type:EquipType.RadarL,name:'42号対空電探改二'}
,412:{seek:2,type:EquipType.Picket,name:'水雷戦隊 熟練見張員'}
,413:{seek:1,type:EquipType.FCF,name:'精鋭水雷戦隊 司令部'}
,414:{seek:4,type:EquipType.SeaPlane,name:'SOC Seagull'}
,415:{seek:7,type:EquipType.SeaPlane,name:'SO3C Seamew改'}
,419:{seek:3,type:EquipType.DiveBomber,name:'SBD-5'}
,420:{seek:3,type:EquipType.DiveBomber,name:'SB2C-3'}
,421:{seek:4,type:EquipType.DiveBomber,name:'SB2C-5'}
,422:{seek:0,type:EquipType.Fighter,name:'FR-1 Fireball'}
,423:{seek:4,type:EquipType.CarrierScout,name:'Fulmar(戦闘偵察/熟練)'}
,424:{seek:2,type:EquipType.TorpBomber,name:'Barracuda Mk.II'}
,425:{seek:3,type:EquipType.TorpBomber,name:'Barracuda Mk.III'}
,426:{seek:0,type:EquipType.MainGunL,name:'305mm/46 連装砲'}
,427:{seek:0,type:EquipType.MainGunL,name:'305mm/46 三連装砲'}
,428:{seek:0,type:EquipType.MainGunL,name:'320mm/44 連装砲'}
,429:{seek:0,type:EquipType.MainGunL,name:'320mm/44 三連装砲'}
,430:{seek:0,type:EquipType.SecGun,name:'65mm/64 単装速射砲改'}
,434:{seek:1,type:EquipType.Fighter,name:'Corsair Mk.II'}
,435:{seek:2,type:EquipType.Fighter,name:'Corsair Mk.II(Ace)'}
,436:{seek:0,type:EquipType.LandingCraft,name:'大発動艇(II号戦車/北アフリカ仕様)'}
,437:{seek:0,type:EquipType.Fighter,name:'試製 陣風'}
,438:{seek:0,type:EquipType.SonarS,name:'三式水中探信儀改'}
,439:{seek:0,type:EquipType.DepthCharge,name:'Hedgehog(初期型)'}
,440:{seek:0,type:EquipType.TorpedoSS,name:'21inch艦首魚雷発射管6門(初期型)'}
,441:{seek:0,type:EquipType.TorpedoSS,name:'21inch艦首魚雷発射管6門(後期型)'}
,442:{seek:0,type:EquipType.TorpedoSS,name:'潜水艦後部魚雷発射管4門(初期型)'}
,443:{seek:0,type:EquipType.TorpedoSS,name:'潜水艦後部魚雷発射管4門(後期型)'}
,447:{seek:3,type:EquipType.DiveBomber,name:'零式艦戦64型(複座KMX搭載機)'}
,449:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+一式砲戦車'}
,450:{seek:5,type:EquipType.RadarS,name:'13号対空電探改(後期型)'}
,451:{seek:2,type:EquipType.AswPlane,name:'三式指揮連絡機改'}
,455:{seek:0,type:EquipType.MainGunS,name:'試製 長12.7cm連装砲A型改四'}
,456:{seek:9,type:EquipType.RadarS,name:'SG レーダー(後期型)'}
,457:{seek:0,type:EquipType.TorpedoSS,name:'後期型艦首魚雷(4門)'}
,458:{seek:6,type:EquipType.SubRadar,name:'後期型電探&逆探+シュノーケル装備'}
,460:{seek:8,type:EquipType.RadarL,name:'15m二重測距儀改+21号電探改二+熟練射撃指揮所'}
,461:{seek:0,type:EquipType.TorpedoSS,name:'熟練聴音員+後期型艦首魚雷(4門)'}
,463:{seek:0,type:EquipType.SecGun,name:'15.5cm三連装副砲改二'}
,464:{seek:0,type:EquipType.SecGun,name:'10cm連装高角砲群 集中配備'}
,465:{seek:0,type:EquipType.MainGunL,name:'試製51cm三連装砲'}
,466:{seek:5,type:EquipType.TorpBomber,name:'流星改(熟練)'}
,467:{seek:0,type:EquipType.SecGun,name:'5inch連装砲(副砲配置) 集中配備'}
,468:{seek:0,type:EquipType.MainGunL,name:'38cm四連装砲改 deux'}
,469:{seek:5,type:EquipType.SeaPlane,name:'零式水上偵察機11型乙改(夜偵)'}
,470:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲C型改三'}
,471:{seek:3,type:EquipType.SeaPlane,name:'Loire 130M'}
,472:{seek:0,type:EquipType.DepthCharge,name:'Mk.32 対潜魚雷(Mk.2落射機)'}
,473:{seek:2,type:EquipType.Fighter,name:'F4U-2 Night Corsair'}
,474:{seek:2,type:EquipType.DiveBomber,name:'F4U-4'}
,475:{seek:2,type:EquipType.DiveBomber,name:'AU-1'}
,476:{seek:2,type:EquipType.DiveBomber,name:'F4U-7'}
,477:{seek:1,type:EquipType.Scamp,name:'熟練甲板要員'}
,478:{seek:1,type:EquipType.Scamp,name:'熟練甲板要員+航空整備員'}
,481:{seek:6,type:EquipType.TorpBomber,name:'Mosquito TR Mk.33'}
,482:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+Ⅲ号戦車(北アフリカ仕様)'}
,483:{seek:0,type:EquipType.ShrapnelShell,name:'三式弾改二'}
,485:{seek:2,type:EquipType.SeaPlaneFighter,name:'強風改二'}
,486:{seek:1,type:EquipType.Fighter,name:'零式艦戦64型(制空戦闘機仕様)'}
,487:{seek:2,type:EquipType.DiveBomber,name:'零式艦戦64型(熟練爆戦)'}
,488:{seek:0,type:EquipType.DepthCharge,name:'二式爆雷改二'}
,489:{seek:0,type:EquipType.AswPlane,name:'一式戦 隼II型改(20戦隊)'}
,490:{seek:7,type:EquipType.SeaPlaneBomber,name:'試製 夜間瑞雲(攻撃装備)'}
,491:{seek:0,type:EquipType.AswPlane,name:'一式戦 隼III型改(熟練/20戦隊)'}
,492:{seek:0,type:EquipType.Fighter,name:'零戦52型丙(八幡部隊)'}
,494:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+チハ'}
,495:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+チハ改'}
,496:{seek:0,type:EquipType.ArmyUnit,name:'陸軍歩兵部隊'}
,497:{seek:0,type:EquipType.ArmyUnit,name:'九七式中戦車(チハ)'}
,498:{seek:0,type:EquipType.ArmyUnit,name:'九七式中戦車 新砲塔(チハ改)'}
,499:{seek:0,type:EquipType.ArmyUnit,name:'陸軍歩兵部隊+チハ改'}
,500:{seek:0,type:EquipType.SmokeScreen,name:'発煙装置(煙幕)'}
,501:{seek:0,type:EquipType.SmokeScreen,name:'発煙装置改(煙幕)'}
,502:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲改三(ダズル迷彩仕様)'}
,503:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲改四'}
,505:{seek:0,type:EquipType.AAGun,name:'25mm対空機銃増備'}
,506:{seek:5,type:EquipType.RadarS,name:'電探装備マスト(13号改+22号電探改四)'}
,507:{seek:0,type:EquipType.MainGunL,name:'14inch/45 連装砲'}
,508:{seek:0,type:EquipType.MainGunL,name:'14inch/45 三連装砲'}
,509:{seek:0,type:EquipType.MainGunS,name:'12cm単装高角砲E型改'}
,510:{seek:4,type:EquipType.SeaPlane,name:'Walrus'}
,511:{seek:0,type:EquipType.TorpedoSS,name:'21inch艦首魚雷発射管4門(初期型)'}
,512:{seek:0,type:EquipType.TorpedoSS,name:'21inch艦首魚雷発射管4門(後期型)'}
,513:{seek:0,type:EquipType.SmokeScreen,name:'阻塞気球'}
,514:{seek:0,type:EquipType.LandingCraft,name:'特大発動艇+Ⅲ号戦車J型'}
,515:{seek:5,type:EquipType.SeaPlane,name:'Sea Otter'}
,517:{seek:8,type:EquipType.RadarS,name:'逆探(E27)+22号対水上電探改四(後期調整型)'}
,518:{seek:0,type:EquipType.MainGunM,name:'14cm連装砲改二'}
,519:{seek:7,type:EquipType.SubRadar,name:'SJレーダー+潜水艦司令塔装備'}
,520:{seek:0,type:EquipType.MainGunM,name:'試製20.3cm(4号)連装砲'}
,521:{seek:9,type:EquipType.SeaPlane,name:'紫雲(熟練)'}
,524:{seek:0,type:EquipType.SecGun,name:'12cm単装高角砲＋25mm機銃増備'}
,525:{seek:0,type:EquipType.LandingTank,name:'特四式内火艇'}
,526:{seek:0,type:EquipType.LandingTank,name:'特四式内火艇改'}
,522:{seek:3,type:EquipType.SeaPlane,name:'零式小型水上機'}
,523:{seek:4,type:EquipType.SeaPlane,name:'零式小型水上機(熟練)'}
,527:{seek:8,type:EquipType.RadarL,name:'Type281 レーダー'}
,528:{seek:5,type:EquipType.RadarL,name:'Type274 射撃管制レーダー'}
,529:{seek:0,type:EquipType.MainGunS,name:'12.7cm連装砲C型改三H'}
,530:{seek:0,type:EquipType.MainGunL,name:'35.6cm連装砲改三丙'}
,531:{seek:1,type:EquipType.FCF,name:'艦隊通信アンテナ'}
,532:{seek:1,type:EquipType.FCF,name:'通信装置&要員'}
,533:{seek:0,type:EquipType.MainGunS,name:'10cm連装高角砲改+高射装置改'}
,534:{seek:0,type:EquipType.MainGunS,name:'13.8cm連装砲'}
,535:{seek:0,type:EquipType.MainGunS,name:'13.8cm連装砲改'}
,537:{seek:0,type:EquipType.MainGunM,name:'15.2cm三連装主砲改'}
,538:{seek:5,type:EquipType.SeaPlane,name:'Loire 130M改(熟練)'}
,536:{seek:0,type:EquipType.MainGunM,name:'15.2cm三連装主砲'}
,541:{seek:2,type:EquipType.DiveBomber,name:'SBD(Yellow Wings)'}
,542:{seek:2,type:EquipType.TorpBomber,name:'TBD(Yellow Wings)'}
,544:{seek:2,type:EquipType.DiveBomber,name:'SBD VB-2(爆撃飛行隊)'}
,545:{seek:6,type:EquipType.TorpBomber,name:'天山一二型甲改二(村田隊/電探装備)'}
,543:{seek:6,type:EquipType.CarrierScout,name:'SBD VS-2(偵察飛行隊)'}
,539:{seek:7,type:EquipType.SeaPlane,name:'SOC Seagull 後期型(熟練)'}
,540:{seek:7,type:EquipType.SeaPlane,name:'零式水上偵察機11型甲改二'}
,549:{seek:3,type:EquipType.AswPlane,name:'三式指揮連絡機改二'}
,550:{seek:1,type:EquipType.DiveBomber,name:'試製 明星(増加試作機)'}
,551:{seek:2,type:EquipType.DiveBomber,name:'明星'}
,552:{seek:4,type:EquipType.DiveBomber,name:'九九式練爆二二型改(夜間装備実験機)'}
,553:{seek:0,type:EquipType.MainGunS,name:'10cm連装高角砲改'}
,554:{seek:2,type:EquipType.TorpBomber,name:'九七式艦攻改(北東海軍航空隊)'}
,555:{seek:0,type:EquipType.MainGunM,name:'18cm/57 三連装主砲'}
,556:{seek:1,type:EquipType.SecGun,name:'10cm/56 単装高角砲(集中配備)'}
,557:{seek:1,type:EquipType.DiveBomber,name:'零式艦戦62型改(夜間爆戦)'}
,558:{seek:2,type:EquipType.DiveBomber,name:'零式艦戦62型改(熟練/夜間爆戦)'}
,559:{seek:3,type:EquipType.TorpBomber,name:'Ju87 D-4(Fliegerass)'}
,560:{seek:0,type:EquipType.Fighter,name:'Bf109 T-3(G)'}

,564:{seek:0,type:EquipType.MainGunM,name:'21cm単装主砲'}
,565:{seek:0,type:EquipType.SecGun,name:'15cm単装副砲'}
,566:{seek:0,type:EquipType.SecGun,name:'10.2cm三連装副砲'}
,567:{seek:1,type:EquipType.Fighter,name:'Sea Gladiator'}
,568:{seek:3,type:EquipType.SeaPlaneFighter,name:'強風改二(熟練)'}

,547:{seek:1,type:EquipType.Fighter,name:'震電改二(艦戦型改二)'}
,569:{seek:0,type:EquipType.DepthCharge,name:'三式爆雷投射機改'}

,570:{seek:6,type:EquipType.TorpBomber,name:'流星改(友永隊)'}
,548:{seek:0,type:EquipType.JetFighter,name:'震電改三(試製 噴式震電)'}

,571:{seek:0,type:EquipType.Torpedo,name:'53cm連装魚雷改(酸素魚雷)'}

,572:{seek:0,type:EquipType.MainGunS,name:'12.7cm単装高角砲改三'}
,573:{seek:6,type:EquipType.RadarS,name:'試製 23号電探改三'}
,574:{seek:10,type:EquipType.RadarS,name:'SCレーダー改(後期調整型)'}
} as const; // @expansion

export default EQUIP_DATAS;