import type { ShipData } from '@/types';
import { ShipId } from '@/types/shipId';

/* http://kancolle-calc.net/deckbuilder.html 様より失敬 */

// 同一ファイル内に定義しないとバンドル時にインライン化されないので注意
/** 艦種ID */
export const enum ST {
    /** 海防 */
    DE = 1,
    /** 駆逐 */
    DD = 2,
    /** 軽巡 */
    CL = 3,
    /** 雷巡 */
    CLT = 4,
    /** 重巡 */
    CA = 5,
    /** 航巡 */
    CAV = 6,
    /** 軽空 */
    CVL = 7,
    /** 戦艦 */
    BB = 9,
    /** 航戦 */
    BBV = 10,
    /** 正規空母 */
    CV = 11,
    /** 潜水 */
    SS = 13,
    /** 潜空 */
    SSV = 14,
    /** 水母 */
    AV = 16,
    /** 揚陸 */
    LHA = 17,
    /** 装空 */
    CVB = 18,
    /** 工作 */
    AR = 19,
    /** 潜水母艦 */
    AS = 20,
    /** 練巡 */
    CT = 21,
    /** 補給 */
    AO = 22,
}

/** 国籍ID */
export const enum NA {
    /** 日本 */
    Japan = 1,
    /** アメリカ */
    USA = 2,
    /** イタリア */
    Italia = 3,
    /** イギリス */
    UK = 4,
    /** ドイツ */
    Germany = 5,
    /** フランス */
    France = 6,
    /** ソ連 */
    USSR = 7,
    /** ノルウェイ */
    Norge = 8,
    /** その他 */
    Other = 9,
}

/** 速力グループID */
export const enum SG {
  /** 高速A群 */
  FastA = 1,
  /** 高速B1群 */
  FastB1 = 2,
  /** 高速B2群 */
  FastB2 = 3,
  /** 高速C群 */
  FastC = 4,
  /** 低速A群 */
  SlowA = 5,
  /** 低速B群 */
  SlowB = 6,
  /** 低速C群 */
  SlowC = 7,
  /** 低速D群 */
  SlowD = 8,
  /** 低速E群 */
  SlowE = 9,
  /** 低速特殊B群 サミュ/改 夕張改二特 */
  SlowB2 = 10,
}

export type ShipDatas = Record<ShipId, ShipData>;

// NOTE: 配列にしてもgzip後は1kBしか変わらない あとなぜかrand-testがこける
const SHIP_DATAS: ShipDatas = {
 1:{name:"睦月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,2:{name:"如月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,6:{name:"長月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,7:{name:"三日月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,9:{name:"吹雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,10:{name:"白雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,11:{name:"深雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,12:{name:"磯波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,13:{name:"綾波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,14:{name:"敷波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,15:{name:"曙",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,16:{name:"潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,17:{name:"陽炎",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,18:{name:"不知火",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,19:{name:"黒潮",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,20:{name:"雪風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,21:{name:"長良",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,22:{name:"五十鈴",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,23:{name:"由良",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,24:{name:"大井",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,25:{name:"北上",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,26:{name:"扶桑",type:ST.BB,seek:9,seek2:33,na:NA.Japan,sg:SG.SlowB}
,27:{name:"山城",type:ST.BB,seek:9,seek2:33,na:NA.Japan,sg:SG.SlowB}
,28:{name:"皐月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,29:{name:"文月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,30:{name:"菊月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,31:{name:"望月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,32:{name:"初雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,33:{name:"叢雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,34:{name:"暁",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,35:{name:"響",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,36:{name:"雷",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,37:{name:"電",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,38:{name:"初春",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,39:{name:"子日",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,40:{name:"若葉",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,41:{name:"初霜",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,42:{name:"白露",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,43:{name:"時雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,44:{name:"村雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,45:{name:"夕立",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,46:{name:"五月雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,47:{name:"涼風",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,48:{name:"霰",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,49:{name:"霞",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,50:{name:"島風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.FastA}
,51:{name:"天龍",type:ST.CL,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,52:{name:"龍田",type:ST.CL,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,53:{name:"名取",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,54:{name:"川内",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,55:{name:"神通",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,56:{name:"那珂",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,57:{name:"大井改",type:ST.CLT,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,58:{name:"北上改",type:ST.CLT,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,59:{name:"古鷹",type:ST.CA,seek:10,seek2:39,na:NA.Japan,sg:SG.FastB2}
,60:{name:"加古",type:ST.CA,seek:10,seek2:39,na:NA.Japan,sg:SG.FastB2}
,61:{name:"青葉",type:ST.CA,seek:11,seek2:39,na:NA.Japan,sg:SG.FastB2}
,62:{name:"妙高",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.FastB2}
,63:{name:"那智",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.FastB2}
,64:{name:"足柄",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.FastB2}
,65:{name:"羽黒",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.FastB2}
,66:{name:"高雄",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,67:{name:"愛宕",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,68:{name:"摩耶",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,69:{name:"鳥海",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,70:{name:"最上",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.FastA}
,71:{name:"利根",type:ST.CA,seek:20,seek2:59,na:NA.Japan,sg:SG.FastA}
,72:{name:"筑摩",type:ST.CA,seek:20,seek2:59,na:NA.Japan,sg:SG.FastA}
,73:{name:"最上改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.FastA}
,74:{name:"祥鳳",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.FastB2}
,75:{name:"飛鷹",type:ST.CVL,seek:38,seek2:59,na:NA.Japan,sg:SG.SlowB}
,76:{name:"龍驤",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.FastB2}
,77:{name:"伊勢",type:ST.BB,seek:10,seek2:36,na:NA.Japan,sg:SG.SlowB}
,78:{name:"金剛",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,79:{name:"榛名",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,80:{name:"長門",type:ST.BB,seek:12,seek2:39,na:NA.Japan,sg:SG.SlowB}
,81:{name:"陸奥",type:ST.BB,seek:12,seek2:39,na:NA.Japan,sg:SG.SlowB}
,82:{name:"伊勢改",type:ST.BBV,seek:24,seek2:60,na:NA.Japan,sg:SG.SlowB}
,83:{name:"赤城",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.FastB2}
,84:{name:"加賀",type:ST.CV,seek:40,seek2:69,na:NA.Japan,sg:SG.FastC}
,85:{name:"霧島",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,86:{name:"比叡",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.FastB2}
,87:{name:"日向",type:ST.BB,seek:10,seek2:36,na:NA.Japan,sg:SG.SlowB}
,88:{name:"日向改",type:ST.BBV,seek:24,seek2:60,na:NA.Japan,sg:SG.SlowB}
,89:{name:"鳳翔",type:ST.CVL,seek:32,seek2:69,na:NA.Japan,sg:SG.SlowC}
,90:{name:"蒼龍",type:ST.CV,seek:42,seek2:69,na:NA.Japan,sg:SG.FastB1}
,91:{name:"飛龍",type:ST.CV,seek:42,seek2:69,na:NA.Japan,sg:SG.FastB1}
,92:{name:"隼鷹",type:ST.CVL,seek:38,seek2:59,na:NA.Japan,sg:SG.SlowC}
,93:{name:"朧",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,94:{name:"漣",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,95:{name:"朝潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,96:{name:"大潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,97:{name:"満潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,98:{name:"荒潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,99:{name:"球磨",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,100:{name:"多摩",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,101:{name:"木曾",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,102:{name:"千歳",type:ST.AV,seek:34,seek2:69,na:NA.Japan,sg:SG.FastC}
,103:{name:"千代田",type:ST.AV,seek:34,seek2:69,na:NA.Japan,sg:SG.FastC}
,104:{name:"千歳改",type:ST.AV,seek:36,seek2:69,na:NA.Japan,sg:SG.FastC}
,105:{name:"千代田改",type:ST.AV,seek:36,seek2:69,na:NA.Japan,sg:SG.FastC}
,106:{name:"千歳甲",type:ST.AV,seek:30,seek2:69,na:NA.Japan,sg:SG.FastC}
,107:{name:"千代田甲",type:ST.AV,seek:30,seek2:69,na:NA.Japan,sg:SG.FastC}
,108:{name:"千歳航",type:ST.CVL,seek:36,seek2:69,na:NA.Japan,sg:SG.FastB2}
,109:{name:"千代田航",type:ST.CVL,seek:36,seek2:69,na:NA.Japan,sg:SG.FastB2}
,110:{name:"翔鶴",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.FastA}
,111:{name:"瑞鶴",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.FastA}
,112:{name:"瑞鶴改",type:ST.CV,seek:48,seek2:89,na:NA.Japan,sg:SG.FastA}
,113:{name:"鬼怒",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,114:{name:"阿武隈",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,115:{name:"夕張",type:ST.CL,seek:6,seek2:39,na:NA.Japan,sg:SG.FastC}
,116:{name:"瑞鳳",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.FastB2}
,117:{name:"瑞鳳改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.FastB2}
,118:{name:"大井改二",type:ST.CLT,seek:9,seek2:43,na:NA.Japan,sg:SG.FastB2}
,119:{name:"北上改二",type:ST.CLT,seek:9,seek2:43,na:NA.Japan,sg:SG.FastB2}
,120:{name:"三隈",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.FastA}
,121:{name:"三隈改",type:ST.CAV,seek:22,seek2:61,na:NA.Japan,sg:SG.FastA}
,122:{name:"舞風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,123:{name:"衣笠",type:ST.CA,seek:11,seek2:39,na:NA.Japan,sg:SG.FastB2}
,124:{name:"鈴谷",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.FastA}
,125:{name:"熊野",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.FastA}
,126:{name:"伊168",type:ST.SS,seek:9,seek2:29,na:NA.Japan,sg:SG.SlowC}
,127:{name:"伊58",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.SlowC}
,128:{name:"伊8",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.SlowC}
,129:{name:"鈴谷改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.FastA}
,130:{name:"熊野改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.FastA}
,131:{name:"大和",type:ST.BB,seek:15,seek2:39,na:NA.Japan,sg:SG.SlowA}
,132:{name:"秋雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,133:{name:"夕雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,134:{name:"巻雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,135:{name:"長波",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,136:{name:"大和改",type:ST.BB,seek:17,seek2:39,na:NA.Japan,sg:SG.SlowA}
,137:{name:"阿賀野",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.FastB1}
,138:{name:"能代",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.FastB1}
,139:{name:"矢矧",type:ST.CL,seek:13,seek2:45,na:NA.Japan,sg:SG.FastB1}
,140:{name:"酒匂",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.FastB1}
,141:{name:"五十鈴改二",type:ST.CL,seek:15,seek2:59,na:NA.Japan,sg:SG.FastB2}
,142:{name:"衣笠改二",type:ST.CA,seek:13,seek2:58,na:NA.Japan,sg:SG.FastB2}
,143:{name:"武蔵",type:ST.BB,seek:16,seek2:40,na:NA.Japan,sg:SG.SlowA}
,144:{name:"夕立改二",type:ST.DD,seek:12,seek2:49,na:NA.Japan,sg:SG.FastB2}
,145:{name:"時雨改二",type:ST.DD,seek:9,seek2:48,na:NA.Japan,sg:SG.FastB2}
,146:{name:"木曾改二",type:ST.CLT,seek:13,seek2:49,na:NA.Japan,sg:SG.FastB2}
,147:{name:"Верный",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,148:{name:"武蔵改",type:ST.BB,seek:18,seek2:40,na:NA.Japan,sg:SG.SlowA}
,149:{name:"金剛改二",type:ST.BB,seek:16,seek2:49,na:NA.Japan,sg:SG.FastB2}
,150:{name:"比叡改二",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.FastB2}
,151:{name:"榛名改二",type:ST.BB,seek:17,seek2:51,na:NA.Japan,sg:SG.FastB2}
,152:{name:"霧島改二",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.FastB2}
,153:{name:"大鳳",type:ST.CVB,seek:47,seek2:74,na:NA.Japan,sg:SG.FastA}
,154:{name:"香取",type:ST.CT,seek:10,seek2:38,na:NA.Japan,sg:SG.SlowB}
,155:{name:"伊401",type:ST.SSV,seek:15,seek2:45,na:NA.Japan,sg:SG.SlowC}
,156:{name:"大鳳改",type:ST.CVB,seek:50,seek2:77,na:NA.Japan,sg:SG.FastA}
,157:{name:"龍驤改二",type:ST.CVL,seek:37,seek2:79,na:NA.Japan,sg:SG.FastB2}
,158:{name:"川内改二",type:ST.CL,seek:16,seek2:55,na:NA.Japan,sg:SG.FastB2}
,159:{name:"神通改二",type:ST.CL,seek:12,seek2:54,na:NA.Japan,sg:SG.FastB2}
,160:{name:"那珂改二",type:ST.CL,seek:15,seek2:54,na:NA.Japan,sg:SG.FastB2}
,161:{name:"あきつ丸",type:ST.LHA,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowC}
,162:{name:"神威",type:ST.AO,seek:5,seek2:15,na:NA.Japan,sg:SG.SlowB}
,163:{name:"まるゆ",type:ST.SS,seek:1,seek2:9,na:NA.Japan,sg:SG.SlowC}
,164:{name:"弥生",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,165:{name:"卯月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,166:{name:"あきつ丸改",type:ST.LHA,seek:13,seek2:59,na:NA.Japan,sg:SG.SlowC}
,167:{name:"磯風",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.FastB2}
,168:{name:"浦風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,169:{name:"谷風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,170:{name:"浜風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,171:{name:"Bismarck",type:ST.BB,seek:16,seek2:42,na:NA.Germany,sg:SG.FastB2}
,172:{name:"Bismarck改",type:ST.BB,seek:18,seek2:52,na:NA.Germany,sg:SG.FastB2}
,173:{name:"Bismarck zwei",type:ST.BB,seek:19,seek2:54,na:NA.Germany,sg:SG.FastB2}
,174:{name:"Z1",type:ST.DD,seek:6,seek2:24,na:NA.Germany,sg:SG.FastB2}
,175:{name:"Z3",type:ST.DD,seek:6,seek2:24,na:NA.Germany,sg:SG.FastB2}
,176:{name:"Prinz Eugen",type:ST.CA,seek:15,seek2:40,na:NA.Germany,sg:SG.FastB2}
,177:{name:"Prinz Eugen改",type:ST.CA,seek:16,seek2:50,na:NA.Germany,sg:SG.FastB2}
,178:{name:"Bismarck drei",type:ST.BB,seek:22,seek2:59,na:NA.Germany,sg:SG.FastB2}
,179:{name:"Z1 zwei",type:ST.DD,seek:9,seek2:43,na:NA.Germany,sg:SG.FastB2}
,180:{name:"Z3 zwei",type:ST.DD,seek:9,seek2:43,na:NA.Germany,sg:SG.FastB2}
,181:{name:"天津風",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.FastB1}
,182:{name:"明石",type:ST.AR,seek:1,seek2:5,na:NA.Japan,sg:SG.SlowC}
,183:{name:"大淀",type:ST.CL,seek:24,seek2:80,na:NA.Japan,sg:SG.FastB2}
,184:{name:"大鯨",type:ST.AS,seek:24,seek2:48,na:NA.Japan,sg:SG.SlowB}
,185:{name:"龍鳳",type:ST.CVL,seek:28,seek2:64,na:NA.Japan,sg:SG.FastB2}
,186:{name:"時津風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.FastB2}
,187:{name:"明石改",type:ST.AR,seek:2,seek2:6,na:NA.Japan,sg:SG.SlowC}
,188:{name:"利根改二",type:ST.CAV,seek:30,seek2:93,na:NA.Japan,sg:SG.FastA}
,189:{name:"筑摩改二",type:ST.CAV,seek:30,seek2:94,na:NA.Japan,sg:SG.FastA}
,190:{name:"初風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,191:{name:"伊19",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.SlowC}
,192:{name:"那智改二",type:ST.CA,seek:20,seek2:63,na:NA.Japan,sg:SG.FastB2}
,193:{name:"足柄改二",type:ST.CA,seek:17,seek2:57,na:NA.Japan,sg:SG.FastB2}
,194:{name:"羽黒改二",type:ST.CA,seek:18,seek2:58,na:NA.Japan,sg:SG.FastB2}
,195:{name:"綾波改二",type:ST.DD,seek:13,seek2:51,na:NA.Japan,sg:SG.FastB2}
,196:{name:"飛龍改二",type:ST.CV,seek:52,seek2:89,na:NA.Japan,sg:SG.FastB1}
,197:{name:"蒼龍改二",type:ST.CV,seek:55,seek2:93,na:NA.Japan,sg:SG.FastB1}
,198:{name:"霰改二",type:ST.DD,seek:11,seek2:53,na:NA.Japan,sg:SG.FastB2}
,199:{name:"大潮改二",type:ST.DD,seek:12,seek2:54,na:NA.Japan,sg:SG.FastB2}
,200:{name:"阿武隈改二",type:ST.CL,seek:16,seek2:60,na:NA.Japan,sg:SG.FastB2}
,201:{name:"吹雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,202:{name:"白雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,203:{name:"初雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,204:{name:"深雪改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.FastB2}
,205:{name:"叢雲改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,206:{name:"磯波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,207:{name:"綾波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,208:{name:"敷波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,209:{name:"金剛改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.FastB2}
,210:{name:"比叡改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.FastB2}
,211:{name:"榛名改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.FastB2}
,212:{name:"霧島改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.FastB2}
,213:{name:"天龍改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,214:{name:"龍田改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,215:{name:"球磨改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,216:{name:"多摩改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,217:{name:"木曾改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,218:{name:"長良改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,219:{name:"五十鈴改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,220:{name:"由良改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,221:{name:"名取改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,222:{name:"川内改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,223:{name:"神通改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,224:{name:"那珂改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,225:{name:"陽炎改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,226:{name:"不知火改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,227:{name:"黒潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,228:{name:"雪風改",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.FastB2}
,229:{name:"島風改",type:ST.DD,seek:9,seek2:39,na:NA.Japan,sg:SG.FastA}
,230:{name:"朧改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,231:{name:"曙改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,232:{name:"漣改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,233:{name:"潮改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,234:{name:"暁改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,235:{name:"響改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,236:{name:"雷改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,237:{name:"電改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,238:{name:"初春改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,239:{name:"子日改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,240:{name:"若葉改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,241:{name:"初霜改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,242:{name:"白露改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,243:{name:"時雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,244:{name:"村雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,245:{name:"夕立改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,246:{name:"五月雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,247:{name:"涼風改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,248:{name:"朝潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,249:{name:"大潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,250:{name:"満潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,251:{name:"荒潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,252:{name:"霰改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,253:{name:"霞改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,254:{name:"睦月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,255:{name:"如月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,256:{name:"皐月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,257:{name:"文月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,258:{name:"長月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,259:{name:"菊月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,260:{name:"三日月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,261:{name:"望月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,262:{name:"古鷹改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.FastB2}
,263:{name:"加古改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.FastB2}
,264:{name:"青葉改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.FastB2}
,265:{name:"妙高改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,266:{name:"那智改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,267:{name:"足柄改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,268:{name:"羽黒改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,269:{name:"高雄改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,270:{name:"愛宕改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,271:{name:"摩耶改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,272:{name:"鳥海改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.FastB2}
,273:{name:"利根改",type:ST.CA,seek:24,seek2:79,na:NA.Japan,sg:SG.FastA}
,274:{name:"筑摩改",type:ST.CA,seek:24,seek2:79,na:NA.Japan,sg:SG.FastA}
,275:{name:"長門改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.SlowB}
,276:{name:"陸奥改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.SlowB}
,277:{name:"赤城改",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.FastB2}
,278:{name:"加賀改",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.FastC}
,279:{name:"蒼龍改",type:ST.CV,seek:46,seek2:89,na:NA.Japan,sg:SG.FastB1}
,280:{name:"飛龍改",type:ST.CV,seek:46,seek2:89,na:NA.Japan,sg:SG.FastB1}
,281:{name:"龍驤改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.FastB2}
,282:{name:"祥鳳改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.FastB2}
,283:{name:"飛鷹改",type:ST.CVL,seek:40,seek2:79,na:NA.Japan,sg:SG.SlowB}
,284:{name:"隼鷹改",type:ST.CVL,seek:40,seek2:79,na:NA.Japan,sg:SG.SlowB}
,285:{name:"鳳翔改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.SlowB}
,286:{name:"扶桑改",type:ST.BBV,seek:18,seek2:49,na:NA.Japan,sg:SG.SlowB}
,287:{name:"山城改",type:ST.BBV,seek:18,seek2:49,na:NA.Japan,sg:SG.SlowB}
,288:{name:"翔鶴改",type:ST.CV,seek:48,seek2:89,na:NA.Japan,sg:SG.FastA}
,289:{name:"鬼怒改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,290:{name:"阿武隈改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,291:{name:"千歳航改",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.FastB2}
,292:{name:"千代田航改",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.FastB2}
,293:{name:"夕張改",type:ST.CL,seek:8,seek2:44,na:NA.Japan,sg:SG.FastC}
,294:{name:"舞風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,295:{name:"衣笠改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.FastB2}
,296:{name:"千歳航改二",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.FastB2}
,297:{name:"千代田航改二",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.FastB2}
,299:{name:"Scamp",type:ST.SS,seek:11,seek2:41,na:NA.Japan,sg:SG.SlowC}
,300:{name:"初風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,301:{name:"秋雲改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,302:{name:"夕雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,303:{name:"巻雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,304:{name:"長波改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,305:{name:"阿賀野改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.FastB1}
,306:{name:"能代改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.FastB1}
,307:{name:"矢矧改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.FastB1}
,308:{name:"弥生改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,309:{name:"卯月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,310:{name:"Z1改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.FastB2}
,311:{name:"Z3改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.FastB2}
,312:{name:"浜風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,313:{name:"谷風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,314:{name:"酒匂改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.FastB1}
,316:{name:"天津風改",type:ST.DD,seek:9,seek2:39,na:NA.Japan,sg:SG.FastB1}
,317:{name:"浦風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,318:{name:"龍鳳改",type:ST.CVL,seek:30,seek2:74,na:NA.Japan,sg:SG.FastB2}
,319:{name:"妙高改二",type:ST.CA,seek:19,seek2:61,na:NA.Japan,sg:SG.FastB2}
,320:{name:"磯風改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.FastB2}
,321:{name:"大淀改",type:ST.CL,seek:28,seek2:84,na:NA.Japan,sg:SG.FastB2}
,322:{name:"時津風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,323:{name:"春雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,324:{name:"早霜改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,325:{name:"清霜改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,326:{name:"初春改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.FastB2}
,327:{name:"朝雲改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.FastB2}
,328:{name:"山雲改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.FastB2}
,329:{name:"野分改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,330:{name:"秋月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,331:{name:"天城",type:ST.CV,seek:38,seek2:74,na:NA.Japan,sg:SG.FastB1}
,332:{name:"葛城",type:ST.CV,seek:36,seek2:70,na:NA.Japan,sg:SG.FastB2}
,334:{name:"U-511改",type:ST.SS,seek:9,seek2:29,na:NA.Japan,sg:SG.SlowC}
,343:{name:"香取改",type:ST.CT,seek:12,seek2:48,na:NA.Japan,sg:SG.SlowB}
,344:{name:"朝霜改",type:ST.DD,seek:10,seek2:43,na:NA.Japan,sg:SG.FastB2}
,345:{name:"高波改",type:ST.DD,seek:13,seek2:54,na:NA.Japan,sg:SG.FastB2}
,346:{name:"照月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,347:{name:"Libeccio改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.FastB2}
,348:{name:"瑞穂改",type:ST.AV,seek:38,seek2:94,na:NA.Japan,sg:SG.SlowB}
,349:{name:"風雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,350:{name:"海風改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.FastB2}
,351:{name:"江風改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.FastB2}
,352:{name:"速吸改",type:ST.AO,seek:18,seek2:59,na:NA.Japan,sg:SG.SlowC}
,353:{name:"Graf Zeppelin改",type:ST.CV,seek:46,seek2:75,na:NA.Germany,sg:SG.FastB2}
,354:{name:"嵐改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,355:{name:"萩風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.FastB2}
,356:{name:"鹿島改",type:ST.CT,seek:10,seek2:50,na:NA.Japan,sg:SG.SlowB}
,357:{name:"初月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.FastB2}
,358:{name:"Zara改",type:ST.CA,seek:12,seek2:46,na:NA.Italia,sg:SG.FastB2}
,359:{name:"沖波改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,360:{name:"Iowa改",type:ST.BB,seek:30,seek2:71,na:NA.USA,sg:SG.FastB1}
,361:{name:"Pola改",type:ST.CA,seek:11,seek2:47,na:NA.Italia,sg:SG.FastB2}
,362:{name:"親潮改",type:ST.DD,seek:9,seek2:40,na:NA.Japan,sg:SG.FastB2}
,363:{name:"春風改",type:ST.DD,seek:8,seek2:46,na:NA.Japan,sg:SG.FastB2}
,364:{name:"Warspite改",type:ST.BB,seek:20,seek2:60,na:NA.UK,sg:SG.SlowB}
,365:{name:"Aquila改",type:ST.CV,seek:36,seek2:72,na:NA.Italia,sg:SG.FastB2}
,366:{name:"水無月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,367:{name:"伊26改",type:ST.SSV,seek:17,seek2:41,na:NA.Japan,sg:SG.SlowC}
,368:{name:"浦波改",type:ST.DD,seek:8,seek2:43,na:NA.Japan,sg:SG.FastB2}
,369:{name:"山風改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.FastB2}
,370:{name:"朝風改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.FastB2}
,371:{name:"松風改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.FastB2}
,372:{name:"Commandant Teste改",type:ST.AV,seek:34,seek2:88,na:NA.France,sg:SG.SlowB}
,373:{name:"藤波改",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.FastB2}
,374:{name:"伊13改",type:ST.SSV,seek:13,seek2:43,na:NA.Japan,sg:SG.SlowC}
,375:{name:"伊14改",type:ST.SSV,seek:14,seek2:44,na:NA.Japan,sg:SG.SlowC}
,376:{name:"占守改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,377:{name:"国後改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.SlowB}
,378:{name:"八丈改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.SlowB}
,379:{name:"石垣改",type:ST.DE,seek:6,seek2:30,na:NA.Japan,sg:SG.SlowB}
,380:{name:"大鷹改",type:ST.CVL,seek:33,seek2:64,na:NA.Japan,sg:SG.SlowB}
,381:{name:"神鷹改",type:ST.CVL,seek:29,seek2:60,na:NA.Japan,sg:SG.SlowB}
,382:{name:"雲鷹改",type:ST.CVL,seek:31,seek2:61,na:NA.Japan,sg:SG.SlowB}
,383:{name:"択捉改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,384:{name:"松輪改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,385:{name:"佐渡改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.SlowB}
,386:{name:"対馬改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,387:{name:"旗風改",type:ST.DD,seek:8,seek2:46,na:NA.Japan,sg:SG.FastB2}
,390:{name:"天霧改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.FastB2}
,391:{name:"狭霧改",type:ST.DD,seek:7,seek2:41,na:NA.Japan,sg:SG.FastB2}
,392:{name:"Richelieu改",type:ST.BB,seek:16,seek2:54,na:NA.France,sg:SG.FastB2}
,393:{name:"Ark Royal改",type:ST.CV,seek:42,seek2:84,na:NA.UK,sg:SG.FastB2}
,394:{name:"Jervis改",type:ST.DD,seek:12,seek2:52,na:NA.UK,sg:SG.FastB2}
,395:{name:"Ташкент改",type:ST.DD,seek:10,seek2:48,na:NA.USSR,sg:SG.FastA}
,396:{name:"Gambier Bay改",type:ST.CVL,seek:38,seek2:68,na:NA.USA,sg:SG.SlowB}
,397:{name:"Intrepid改",type:ST.CV,seek:52,seek2:90,na:NA.USA,sg:SG.FastB2}
,398:{name:"伊168改",type:ST.SS,seek:10,seek2:29,na:NA.Japan,sg:SG.SlowC}
,399:{name:"伊58改",type:ST.SSV,seek:15,seek2:39,na:NA.Japan,sg:SG.SlowC}
,400:{name:"伊8改",type:ST.SSV,seek:16,seek2:39,na:NA.Japan,sg:SG.SlowC}
,401:{name:"伊19改",type:ST.SSV,seek:15,seek2:39,na:NA.Japan,sg:SG.SlowC}
,402:{name:"まるゆ改",type:ST.SS,seek:1,seek2:19,na:NA.Japan,sg:SG.SlowC}
,403:{name:"伊401改",type:ST.SSV,seek:15,seek2:45,na:NA.Japan,sg:SG.SlowC}
,404:{name:"雲龍",type:ST.CV,seek:40,seek2:72,na:NA.Japan,sg:SG.FastB1}
,405:{name:"春雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,406:{name:"雲龍改",type:ST.CV,seek:48,seek2:82,na:NA.Japan,sg:SG.FastB1}
,407:{name:"潮改二",type:ST.DD,seek:11,seek2:48,na:NA.Japan,sg:SG.FastB2}
,408:{name:"隼鷹改二",type:ST.CVL,seek:44,seek2:79,na:NA.Japan,sg:SG.SlowB}
,409:{name:"早霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,410:{name:"清霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,411:{name:"扶桑改二",type:ST.BBV,seek:22,seek2:59,na:NA.Japan,sg:SG.SlowB}
,412:{name:"山城改二",type:ST.BBV,seek:23,seek2:59,na:NA.Japan,sg:SG.SlowB}
,413:{name:"朝雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,414:{name:"山雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,415:{name:"野分",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.FastB2}
,416:{name:"古鷹改二",type:ST.CA,seek:13,seek2:54,na:NA.Japan,sg:SG.FastB2}
,417:{name:"加古改二",type:ST.CA,seek:14,seek2:55,na:NA.Japan,sg:SG.FastB2}
,418:{name:"皐月改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.FastB2}
,419:{name:"初霜改二",type:ST.DD,seek:11,seek2:49,na:NA.Japan,sg:SG.FastB2}
,420:{name:"叢雲改二",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,421:{name:"秋月",type:ST.DD,seek:9,seek2:29,na:NA.Japan,sg:SG.FastB2}
,422:{name:"照月",type:ST.DD,seek:9,seek2:29,na:NA.Japan,sg:SG.FastB2}
,423:{name:"初月",type:ST.DD,seek:8,seek2:28,na:NA.Japan,sg:SG.FastB2}
,424:{name:"高波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.FastB2}
,425:{name:"朝霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,426:{name:"吹雪改二",type:ST.DD,seek:14,seek2:54,na:NA.Japan,sg:SG.FastB2}
,427:{name:"鳥海改二",type:ST.CA,seek:22,seek2:62,na:NA.Japan,sg:SG.FastB2}
,428:{name:"摩耶改二",type:ST.CA,seek:16,seek2:55,na:NA.Japan,sg:SG.FastB2}
,429:{name:"天城改",type:ST.CV,seek:46,seek2:80,na:NA.Japan,sg:SG.FastB1}
,430:{name:"葛城改",type:ST.CV,seek:44,seek2:78,na:NA.Japan,sg:SG.FastB2}
,431:{name:"U-511",type:ST.SS,seek:8,seek2:28,na:NA.Germany,sg:SG.SlowC}
,432:{name:"Graf Zeppelin",type:ST.CV,seek:40,seek2:69,na:NA.Germany,sg:SG.FastB2}
,433:{name:"Saratoga",type:ST.CV,seek:40,seek2:68,na:NA.USA,sg:SG.FastB2}
,434:{name:"睦月改二",type:ST.DD,seek:8,seek2:43,na:NA.Japan,sg:SG.FastB2}
,435:{name:"如月改二",type:ST.DD,seek:9,seek2:44,na:NA.Japan,sg:SG.FastB2}
,436:{name:"呂500",type:ST.SS,seek:12,seek2:34,na:NA.Japan,sg:SG.SlowC}
,437:{name:"暁改二",type:ST.DD,seek:17,seek2:60,na:NA.Japan,sg:SG.FastB2}
,438:{name:"Saratoga改",type:ST.CV,seek:48,seek2:80,na:NA.USA,sg:SG.FastB2}
,439:{name:"Warspite",type:ST.BB,seek:14,seek2:48,na:NA.UK,sg:SG.SlowB}
,440:{name:"Iowa",type:ST.BB,seek:24,seek2:64,na:NA.USA,sg:SG.FastB1}
,441:{name:"Littorio",type:ST.BB,seek:15,seek2:44,na:NA.Italia,sg:SG.FastB2}
,442:{name:"Roma",type:ST.BB,seek:17,seek2:46,na:NA.Italia,sg:SG.FastB2}
,443:{name:"Libeccio",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.FastB2}
,444:{name:"Aquila",type:ST.CV,seek:30,seek2:52,na:NA.Italia,sg:SG.FastB2}
,445:{name:"秋津洲",type:ST.AV,seek:22,seek2:42,na:NA.Japan,sg:SG.SlowB}
,446:{name:"Italia",type:ST.BB,seek:17,seek2:52,na:NA.Italia,sg:SG.FastB2}
,447:{name:"Roma改",type:ST.BB,seek:17,seek2:52,na:NA.Italia,sg:SG.FastB2}
,448:{name:"Zara",type:ST.CA,seek:10,seek2:36,na:NA.Italia,sg:SG.FastB2}
,449:{name:"Pola",type:ST.CA,seek:9,seek2:35,na:NA.Italia,sg:SG.FastB2}
,450:{name:"秋津洲改",type:ST.AV,seek:24,seek2:54,na:NA.Japan,sg:SG.SlowB}
,451:{name:"瑞穂",type:ST.AV,seek:36,seek2:74,na:NA.Japan,sg:SG.SlowB}
,452:{name:"沖波",type:ST.DD,seek:7,seek2:21,na:NA.Japan,sg:SG.FastB2}
,453:{name:"風雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,454:{name:"嵐",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,455:{name:"萩風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,456:{name:"親潮",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.FastB2}
,457:{name:"山風",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.FastB2}
,458:{name:"海風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,459:{name:"江風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,460:{name:"速吸",type:ST.AO,seek:15,seek2:40,na:NA.Japan,sg:SG.SlowC}
,461:{name:"翔鶴改二",type:ST.CV,seek:53,seek2:93,na:NA.Japan,sg:SG.FastA}
,462:{name:"瑞鶴改二",type:ST.CV,seek:52,seek2:92,na:NA.Japan,sg:SG.FastA}
,463:{name:"朝潮改二",type:ST.DD,seek:11,seek2:57,na:NA.Japan,sg:SG.FastB2}
,464:{name:"霞改二",type:ST.DD,seek:14,seek2:55,na:NA.Japan,sg:SG.FastB2}
,465:{name:"鹿島",type:ST.CT,seek:9,seek2:36,na:NA.Japan,sg:SG.SlowB}
,466:{name:"翔鶴改二甲",type:ST.CVB,seek:50,seek2:90,na:NA.Japan,sg:SG.FastA}
,467:{name:"瑞鶴改二甲",type:ST.CVB,seek:50,seek2:90,na:NA.Japan,sg:SG.FastA}
,468:{name:"朝潮改二丁",type:ST.DD,seek:10,seek2:55,na:NA.Japan,sg:SG.FastB2}
,469:{name:"江風改二",type:ST.DD,seek:13,seek2:53,na:NA.Japan,sg:SG.FastB2}
,470:{name:"霞改二乙",type:ST.DD,seek:15,seek2:56,na:NA.Japan,sg:SG.FastB2}
,471:{name:"神風",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.FastB2}
,472:{name:"朝風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.FastB2}
,473:{name:"春風",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,474:{name:"松風",type:ST.DD,seek:4,seek2:18,na:NA.Japan,sg:SG.FastB2}
,475:{name:"旗風",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,476:{name:"神風改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.FastB2}
,477:{name:"天龍改二",type:ST.CL,seek:12,seek2:53,na:NA.Japan,sg:SG.FastB2}
,478:{name:"龍田改二",type:ST.CL,seek:10,seek2:52,na:NA.Japan,sg:SG.FastB2}
,479:{name:"天霧",type:ST.DD,seek:5,seek2:20,na:NA.Japan,sg:SG.FastB2}
,480:{name:"狭霧",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,481:{name:"水無月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.FastB2}
,483:{name:"伊26",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.SlowC}
,484:{name:"浜波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.FastB2}
,485:{name:"藤波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.FastB2}
,486:{name:"浦波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,487:{name:"鬼怒改二",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.FastB2}
,488:{name:"由良改二",type:ST.CL,seek:17,seek2:64,na:NA.Japan,sg:SG.FastB2}
,489:{name:"満潮改二",type:ST.DD,seek:10,seek2:55,na:NA.Japan,sg:SG.FastB2}
,490:{name:"荒潮改二",type:ST.DD,seek:11,seek2:52,na:NA.Japan,sg:SG.FastB2}
,491:{name:"Commandant Teste",type:ST.AV,seek:32,seek2:70,na:NA.France,sg:SG.SlowB}
,492:{name:"Richelieu",type:ST.BB,seek:14,seek2:50,na:NA.France,sg:SG.FastB2}
,493:{name:"伊400",type:ST.SSV,seek:15,seek2:46,na:NA.Japan,sg:SG.SlowC}
,494:{name:"伊13",type:ST.SSV,seek:13,seek2:43,na:NA.Japan,sg:SG.SlowC}
,495:{name:"伊14",type:ST.SSV,seek:14,seek2:44,na:NA.Japan,sg:SG.SlowC}
,496:{name:"Zara due",type:ST.CA,seek:19,seek2:64,na:NA.France,sg:SG.FastB2}
,497:{name:"白露改二",type:ST.DD,seek:10,seek2:50,na:NA.Japan,sg:SG.FastB2}
,498:{name:"村雨改二",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.FastB2}
,499:{name:"神威改",type:ST.AV,seek:22,seek2:48,na:NA.Japan,sg:SG.SlowB}
,500:{name:"神威改母",type:ST.AO,seek:24,seek2:54,na:NA.Japan,sg:SG.SlowB}
,501:{name:"最上改二",type:ST.CAV,seek:28,seek2:86,na:NA.Japan,sg:SG.FastA}
,503:{name:"鈴谷改二",type:ST.CAV,seek:26,seek2:83,na:NA.Japan,sg:SG.FastA}
,504:{name:"熊野改二",type:ST.CAV,seek:25,seek2:81,na:NA.Japan,sg:SG.FastA}
,506:{name:"最上改二特",type:ST.CAV,seek:24,seek2:80,na:NA.Japan,sg:SG.FastA}
,508:{name:"鈴谷航改二",type:ST.CVL,seek:46,seek2:85,na:NA.Japan,sg:SG.FastA}
,509:{name:"熊野航改二",type:ST.CVL,seek:45,seek2:83,na:NA.Japan,sg:SG.FastA}
,511:{name:"Гангут",type:ST.BB,seek:8,seek2:30,na:NA.USSR,sg:SG.SlowB}
,512:{name:"Октябрьская революция",type:ST.BB,seek:10,seek2:36,na:NA.USSR,sg:SG.SlowB}
,513:{name:"Гангут два",type:ST.BB,seek:14,seek2:38,na:NA.USSR,sg:SG.SlowB}
,514:{name:"Sheffield",type:ST.CL,seek:22,seek2:68,na:NA.UK,sg:SG.FastB2}
,515:{name:"Ark Royal",type:ST.CV,seek:40,seek2:72,na:NA.UK,sg:SG.FastB2}
,516:{name:"Ташкент",type:ST.DD,seek:7,seek2:36,na:NA.USSR,sg:SG.FastA}
,517:{name:"占守",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,518:{name:"国後",type:ST.DE,seek:4,seek2:14,na:NA.Japan,sg:SG.SlowB}
,519:{name:"Jervis",type:ST.DD,seek:10,seek2:22,na:NA.UK,sg:SG.FastB2}
,520:{name:"Janus",type:ST.DD,seek:10,seek2:20,na:NA.UK,sg:SG.FastB2}
,521:{name:"春日丸",type:ST.CVL,seek:28,seek2:48,na:NA.Japan,sg:SG.SlowB}
,522:{name:"八幡丸",type:ST.CVL,seek:28,seek2:47,na:NA.Japan,sg:SG.SlowB}
,524:{name:"択捉",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.SlowB}
,525:{name:"松輪",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.SlowB}
,526:{name:"大鷹",type:ST.CVL,seek:30,seek2:52,na:NA.Japan,sg:SG.SlowB}
,527:{name:"岸波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.FastB2}
,528:{name:"早波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.FastB2}
,529:{name:"大鷹改二",type:ST.CVL,seek:40,seek2:68,na:NA.Japan,sg:SG.SlowB}
,530:{name:"伊504",type:ST.SS,seek:10,seek2:32,na:NA.Japan,sg:SG.SlowC}
,531:{name:"佐渡",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.SlowB}
,532:{name:"涼月",type:ST.DD,seek:8,seek2:27,na:NA.Japan,sg:SG.FastB2}
,533:{name:"冬月",type:ST.DD,seek:8,seek2:28,na:NA.Japan,sg:SG.FastB2}
,534:{name:"神鷹",type:ST.CVL,seek:28,seek2:48,na:NA.Japan,sg:SG.SlowB}
,535:{name:"Luigi Torelli",type:ST.SS,seek:6,seek2:24,na:NA.Italia,sg:SG.SlowC}
,536:{name:"神鷹改二",type:ST.CVL,seek:32,seek2:64,na:NA.Japan,sg:SG.SlowB}
,537:{name:"涼月改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.FastB2}
,538:{name:"冬月改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.FastB2}
,539:{name:"UIT-25",type:ST.SS,seek:9,seek2:30,na:NA.Italia,sg:SG.SlowC}
,540:{name:"対馬",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,541:{name:"長門改二",type:ST.BB,seek:16,seek2:55,na:NA.Japan,sg:SG.SlowA}
,542:{name:"夕雲改二",type:ST.DD,seek:12,seek2:46,na:NA.Japan,sg:SG.FastB2}
,543:{name:"長波改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.FastB2}
,544:{name:"Gambier Bay",type:ST.CVL,seek:36,seek2:60,na:NA.USA,sg:SG.SlowB}
,545:{name:"Saratoga Mk.II",type:ST.CV,seek:54,seek2:93,na:NA.USA,sg:SG.FastB2}
,546:{name:"武蔵改二",type:ST.BB,seek:18,seek2:58,na:NA.Japan,sg:SG.SlowA}
,547:{name:"多摩改二",type:ST.CL,seek:14,seek2:61,na:NA.Japan,sg:SG.FastB2}
,548:{name:"文月改二",type:ST.DD,seek:11,seek2:47,na:NA.Japan,sg:SG.FastB2}
,549:{name:"Intrepid",type:ST.CV,seek:50,seek2:80,na:NA.USA,sg:SG.FastB2}
,550:{name:"Saratoga Mk.II Mod.2",type:ST.CVB,seek:56,seek2:95,na:NA.USA,sg:SG.FastB2}
,551:{name:"日振",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.SlowB}
,552:{name:"大東",type:ST.DE,seek:3,seek2:12,na:NA.Japan,sg:SG.SlowB}
,553:{name:"伊勢改二",type:ST.BBV,seek:30,seek2:72,na:NA.Japan,sg:SG.SlowB}
,554:{name:"日向改二",type:ST.BBV,seek:32,seek2:75,na:NA.Japan,sg:SG.SlowB}
,555:{name:"瑞鳳改二",type:ST.CVL,seek:40,seek2:80,na:NA.Japan,sg:SG.FastB2}
,556:{name:"浦風丁改",type:ST.DD,seek:10,seek2:48,na:NA.Japan,sg:SG.FastB2}
,557:{name:"磯風乙改",type:ST.DD,seek:10,seek2:52,na:NA.Japan,sg:SG.FastB2}
,558:{name:"浜風乙改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.FastB2}
,559:{name:"谷風丁改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.FastB2}
,560:{name:"瑞鳳改二乙",type:ST.CVL,seek:40,seek2:77,na:NA.Japan,sg:SG.FastB2}
,561:{name:"Samuel B.Roberts",type:ST.DD,seek:12,seek2:20,na:NA.USA,sg:SG.SlowB2}
,562:{name:"Johnston",type:ST.DD,seek:20,seek2:32,na:NA.USA,sg:SG.FastB2}
,563:{name:"巻雲改二",type:ST.DD,seek:11,seek2:43,na:NA.Japan,sg:SG.FastB2}
,564:{name:"風雲改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.FastB2}
,565:{name:"福江",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,566:{name:"陽炎改二",type:ST.DD,seek:10,seek2:42,na:NA.Japan,sg:SG.FastB2}
,567:{name:"不知火改二",type:ST.DD,seek:11,seek2:43,na:NA.Japan,sg:SG.FastB2}
,568:{name:"黒潮改二",type:ST.DD,seek:11,seek2:41,na:NA.Japan,sg:SG.FastB2}
,569:{name:"沖波改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,570:{name:"平戸",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.SlowB}
,571:{name:"Nelson",type:ST.BB,seek:12,seek2:42,na:NA.UK,sg:SG.SlowB}
,572:{name:"Rodney",type:ST.BB,seek:12,seek2:43,na:NA.UK,sg:SG.SlowB}
,573:{name:"陸奥改二",type:ST.BB,seek:15,seek2:57,na:NA.Japan,sg:SG.SlowA}
,574:{name:"Gotland",type:ST.CL,seek:45,seek2:70,na:NA.Other,sg:SG.FastB2}
,575:{name:"Maestrale",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.FastB2}
,576:{name:"Nelson改",type:ST.BB,seek:14,seek2:48,na:NA.UK,sg:SG.SlowB}
,577:{name:"Rodney改",type:ST.BB,seek:13,seek2:48,na:NA.UK,sg:SG.SlowB}
,578:{name:"朝霜改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,579:{name:"Gotland改",type:ST.CL,seek:18,seek2:55,na:NA.Other,sg:SG.FastB2}
,580:{name:"Maestrale改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.FastB2}
,581:{name:"日進",type:ST.AV,seek:40,seek2:80,na:NA.Japan,sg:SG.FastC}
,582:{name:"夏雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,583:{name:"峯雲",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.FastB2}
,584:{name:"八丈",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,585:{name:"石垣",type:ST.DE,seek:4,seek2:15,na:NA.Japan,sg:SG.SlowB}
,586:{name:"日進甲",type:ST.AV,seek:48,seek2:96,na:NA.Japan,sg:SG.FastC}
,587:{name:"海風改二",type:ST.DD,seek:11,seek2:51,na:NA.Japan,sg:SG.FastB2}
,588:{name:"山風改二",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.FastB2}
,589:{name:"L.d.S.D.d.Abruzzi",type:ST.CL,seek:12,seek2:41,na:NA.Italia,sg:SG.FastB2}
,590:{name:"G.Garibaldi",type:ST.CL,seek:12,seek2:40,na:NA.Italia,sg:SG.FastB2}
,591:{name:"金剛改二丙",type:ST.BB,seek:17,seek2:51,na:NA.Japan,sg:SG.FastB2}
,592:{name:"比叡改二丙",type:ST.BB,seek:17,seek2:53,na:NA.Japan,sg:SG.FastB2}
,593:{name:"榛名改二乙",type:ST.BB,seek:16,seek2:53,na:NA.Japan,sg:SG.FastB2}
,594:{name:"赤城改二",type:ST.CV,seek:51,seek2:91,na:NA.Japan,sg:SG.FastB2}
,595:{name:"Houston",type:ST.CA,seek:15,seek2:50,na:NA.USA,sg:SG.FastB2}
,596:{name:"Fletcher",type:ST.DD,seek:20,seek2:33,na:NA.USA,sg:SG.FastB2}
,597:{name:"Atlanta",type:ST.CL,seek:11,seek2:40,na:NA.USA,sg:SG.FastB2}
,598:{name:"Honolulu",type:ST.CL,seek:17,seek2:65,na:NA.USA,sg:SG.FastB2}
,599:{name:"赤城改二戊",type:ST.CV,seek:50,seek2:90,na:NA.Japan,sg:SG.FastB2}
,600:{name:"Houston改",type:ST.CA,seek:16,seek2:53,na:NA.USA,sg:SG.FastB2}
,601:{name:"Colorado",type:ST.BB,seek:9,seek2:37,na:NA.USA,sg:SG.SlowB}
,602:{name:"South Dakota",type:ST.BB,seek:15,seek2:48,na:NA.USA,sg:SG.FastB2}
,603:{name:"Hornet",type:ST.CV,seek:45,seek2:70,na:NA.USA,sg:SG.FastB2}
,604:{name:"De Ruyter",type:ST.CL,seek:10,seek2:42,na:NA.Other,sg:SG.FastB2}
,605:{name:"Luigi Torelli改",type:ST.SS,seek:8,seek2:28,na:NA.Italia,sg:SG.SlowC}
,606:{name:"伊400改",type:ST.SSV,seek:16,seek2:46,na:NA.Japan,sg:SG.SlowC}
,607:{name:"伊47改",type:ST.SS,seek:11,seek2:30,na:NA.Japan,sg:SG.SlowC}
,609:{name:"De Ruyter改",type:ST.CL,seek:12,seek2:55,na:NA.Other,sg:SG.FastB2}
,610:{name:"加賀改二戊",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.FastC}
,611:{name:"御蔵",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.SlowB}
,612:{name:"屋代",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.SlowB}
,613:{name:"Perth",type:ST.CL,seek:9,seek2:40,na:NA.Other,sg:SG.FastB2}
,614:{name:"Grecale",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.FastB2}
,615:{name:"Helena",type:ST.CL,seek:18,seek2:64,na:NA.USA,sg:SG.FastB2}
,616:{name:"御蔵改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.SlowB}
,617:{name:"屋代改",type:ST.DE,seek:5,seek2:30,na:NA.Japan,sg:SG.SlowB}
,618:{name:"Perth改",type:ST.CL,seek:10,seek2:50,na:NA.Other,sg:SG.FastB2}
,619:{name:"Grecale改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.FastB2}
,620:{name:"Helena改",type:ST.CL,seek:0,seek2:77,na:NA.USA,sg:SG.FastB2}
,621:{name:"神州丸",type:ST.LHA,seek:20,seek2:52,na:NA.Japan,sg:SG.SlowB}
,622:{name:"夕張改二",type:ST.CL,seek:11,seek2:52,na:NA.Japan,sg:SG.FastB2}
,623:{name:"夕張改二特",type:ST.CL,seek:10,seek2:50,na:NA.Japan,sg:SG.SlowB2}
,624:{name:"夕張改二丁",type:ST.CL,seek:12,seek2:54,na:NA.Japan,sg:SG.FastB2}
,625:{name:"秋霜",type:ST.DD,seek:6,seek2:20,na:NA.Japan,sg:SG.FastB2}
,626:{name:"神州丸改",type:ST.LHA,seek:24,seek2:58,na:NA.Japan,sg:SG.SlowB}
,627:{name:"敷波改二",type:ST.DD,seek:11,seek2:48,na:NA.Japan,sg:SG.FastB2}
,628:{name:"Fletcher改 Mod.2",type:ST.DD,seek:22,seek2:64,na:NA.USA,sg:SG.FastB2}
,629:{name:"Fletcher Mk.II",type:ST.DD,seek:23,seek2:66,na:NA.USA,sg:SG.FastB2}
,630:{name:"Gotland andra",type:ST.CL,seek:46,seek2:72,na:NA.Other,sg:SG.FastB2}
,631:{name:"薄雲",type:ST.DD,seek:4,seek2:19,na:NA.Japan,sg:SG.FastB2}
,632:{name:"有明",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.FastB2}
,633:{name:"夕暮",type:ST.DD,seek:5,seek2:20,na:NA.Japan,sg:SG.FastB2}
,634:{name:"迅鯨",type:ST.AS,seek:20,seek2:38,na:NA.Japan,sg:SG.SlowB}
,635:{name:"長鯨",type:ST.AS,seek:20,seek2:37,na:NA.Japan,sg:SG.SlowB}
,636:{name:"伊47",type:ST.SS,seek:7,seek2:27,na:NA.Japan,sg:SG.SlowC}
,637:{name:"第四号海防艦",type:ST.DE,seek:2,seek2:11,na:NA.Japan,sg:SG.SlowB}
,638:{name:"第三〇号海防艦",type:ST.DE,seek:2,seek2:11,na:NA.Japan,sg:SG.SlowB}
,639:{name:"迅鯨改",type:ST.AS,seek:22,seek2:44,na:NA.Japan,sg:SG.SlowB}
,640:{name:"長鯨改",type:ST.AS,seek:22,seek2:43,na:NA.Japan,sg:SG.SlowB}
,641:{name:"松",type:ST.DD,seek:10,seek2:25,na:NA.Japan,sg:SG.FastB2}
,642:{name:"竹",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.FastB2}
,643:{name:"梅",type:ST.DD,seek:11,seek2:24,na:NA.Japan,sg:SG.FastB2}
,644:{name:"桃",type:ST.DD,seek:8,seek2:24,na:NA.Japan,sg:SG.FastB2}
,645:{name:"宗谷",type:ST.AO,seek:9,seek2:18,na:NA.Japan,sg:SG.SlowB}
,646:{name:"加賀改二護",type:ST.CV,seek:54,seek2:93,na:NA.Japan,sg:SG.FastC}
,647:{name:"浦波改二",type:ST.DD,seek:12,seek2:44,na:NA.Japan,sg:SG.FastB2}
,648:{name:"秋雲改二",type:ST.DD,seek:10,seek2:42,na:NA.Japan,sg:SG.FastB2}
,649:{name:"高波改二",type:ST.DD,seek:14,seek2:62,na:NA.Japan,sg:SG.FastB2}
,650:{name:"宗谷",type:ST.AO,seek:16,seek2:32,na:NA.Japan,sg:SG.SlowB}
,651:{name:"丹陽",type:ST.DD,seek:15,seek2:50,na:NA.Japan,sg:SG.FastB2}
,652:{name:"球磨改二",type:ST.CL,seek:13,seek2:58,na:NA.Japan,sg:SG.FastB2}
,653:{name:"Scirocco",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.FastB2}
,654:{name:"Washington",type:ST.BB,seek:14,seek2:46,na:NA.USA,sg:SG.FastB2}
,655:{name:"Northampton",type:ST.CA,seek:14,seek2:51,na:NA.USA,sg:SG.FastB2}
,656:{name:"雪風改二",type:ST.DD,seek:14,seek2:48,na:NA.Japan,sg:SG.FastB2}
,657:{name:"球磨改二丁",type:ST.CL,seek:13,seek2:53,na:NA.Japan,sg:SG.FastB2}
,658:{name:"Scirocco改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.FastB2}
,659:{name:"Washington改",type:ST.BB,seek:18,seek2:62,na:NA.USA,sg:SG.FastB2}
,660:{name:"Northampton改",type:ST.CA,seek:15,seek2:52,na:NA.USA,sg:SG.FastB2}
,662:{name:"能代改二",type:ST.CL,seek:15,seek2:61,na:NA.Japan,sg:SG.FastB1}
,663:{name:"矢矧改二",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.FastB1}
,665:{name:"曙改二",type:ST.DD,seek:10,seek2:46,na:NA.Japan,sg:SG.FastB2}
,666:{name:"磯波改二",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.FastB2}
,667:{name:"山風改二丁",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.FastB2}
,668:{name:"矢矧改二乙",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.FastB1}
,670:{name:"親潮改二",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.FastB2}
,671:{name:"巻波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.FastB2}
,674:{name:"玉波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.FastB2}
,675:{name:"涼波",type:ST.DD,seek:9,seek2:22,na:NA.Japan,sg:SG.FastB2}
,678:{name:"日振改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.SlowB}
,679:{name:"大東改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,680:{name:"浜波改",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.FastB2}
,681:{name:"Samuel B.Roberts改",type:ST.DD,seek:14,seek2:48,na:NA.USA,sg:SG.SlowB2}
,684:{name:"平戸改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.SlowB}
,685:{name:"福江改",type:ST.DE,seek:5,seek2:27,na:NA.Japan,sg:SG.SlowB}
,686:{name:"岸波改",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,687:{name:"峯雲改",type:ST.DD,seek:8,seek2:37,na:NA.Japan,sg:SG.FastB2}
,688:{name:"早波改",type:ST.DD,seek:12,seek2:55,na:NA.Japan,sg:SG.FastB2}
,689:{name:"Johnston改",type:ST.DD,seek:20,seek2:60,na:NA.USA,sg:SG.FastB2}
,690:{name:"日進改",type:ST.AV,seek:48,seek2:95,na:NA.Japan,sg:SG.FastC}
,691:{name:"G.Garibaldi改",type:ST.CL,seek:13,seek2:48,na:NA.Italia,sg:SG.FastB2}
,692:{name:"Fletcher改",type:ST.DD,seek:20,seek2:62,na:NA.USA,sg:SG.FastB2}
,693:{name:"L.d.S.D.d.Abruzzi改",type:ST.CL,seek:13,seek2:49,na:NA.Italia,sg:SG.FastB2}
,695:{name:"秋霜改",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.FastB2}
,696:{name:"Atlanta改",type:ST.CL,seek:11,seek2:50,na:NA.USA,sg:SG.FastB2}
,697:{name:"South Dakota改",type:ST.BB,seek:18,seek2:60,na:NA.USA,sg:SG.FastB2}
,698:{name:"加賀改二",type:ST.CV,seek:51,seek2:90,na:NA.Japan,sg:SG.FastC}
,699:{name:"宗谷",type:ST.AO,seek:2,seek2:12,na:NA.Japan,sg:SG.SlowB}
,700:{name:"薄雲改",type:ST.DD,seek:7,seek2:41,na:NA.Japan,sg:SG.FastB2}
,701:{name:"第四号海防艦改",type:ST.DE,seek:4,seek2:20,na:NA.Japan,sg:SG.SlowB}
,702:{name:"松改",type:ST.DD,seek:15,seek2:45,na:NA.Japan,sg:SG.FastB2}
,703:{name:"有明改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.FastB2}
,704:{name:"Hornet改",type:ST.CV,seek:49,seek2:90,na:NA.USA,sg:SG.FastB2}
,705:{name:"Sheffield改",type:ST.CL,seek:24,seek2:72,na:NA.UK,sg:SG.FastB2}
,706:{name:"竹改",type:ST.DD,seek:14,seek2:43,na:NA.Japan,sg:SG.FastB2}
,707:{name:"Gambier Bay Mk.II",type:ST.CVL,seek:39,seek2:70,na:NA.USA,sg:SG.SlowB}
,708:{name:"桃改",type:ST.DD,seek:13,seek2:43,na:NA.Japan,sg:SG.FastB2}
,709:{name:"巻波改",type:ST.DD,seek:11,seek2:54,na:NA.Japan,sg:SG.FastB2}
,710:{name:"涼波改",type:ST.DD,seek:10,seek2:54,na:NA.Japan,sg:SG.FastB2}
,711:{name:"Honolulu改",type:ST.CL,seek:22,seek2:76,na:NA.USA,sg:SG.FastB2}
,712:{name:"第三〇号海防艦改",type:ST.DE,seek:4,seek2:19,na:NA.Japan,sg:SG.SlowB}
,713:{name:"Victorious改",type:ST.CVB,seek:46,seek2:85,na:NA.UK,sg:SG.FastB2}
,714:{name:"昭南改",type:ST.DE,seek:6,seek2:28,na:NA.Japan,sg:SG.SlowB}
,715:{name:"Scamp改",type:ST.SS,seek:13,seek2:43,na:NA.USA,sg:SG.SlowC}
,716:{name:"梅改",type:ST.DD,seek:16,seek2:45,na:NA.Japan,sg:SG.FastB2}
,717:{name:"山汐丸改",type:ST.AO,seek:23,seek2:63,na:NA.Japan,sg:SG.SlowB}
,718:{name:"玉波改",type:ST.DD,seek:12,seek2:53,na:NA.Japan,sg:SG.FastB2}
,719:{name:"伊201改",type:ST.SS,seek:13,seek2:48,na:NA.Japan,sg:SG.SlowD}
,720:{name:"早潮改",type:ST.DD,seek:9,seek2:41,na:NA.Japan,sg:SG.FastB2}
,721:{name:"夏雲改",type:ST.DD,seek:6,seek2:36,na:NA.Japan,sg:SG.FastB2}
,722:{name:"Brooklyn改",type:ST.CL,seek:22,seek2:77,na:NA.USA,sg:SG.FastB2}
,723:{name:"Ranger改",type:ST.CV,seek:40,seek2:82,na:NA.USA,sg:SG.FastB2}
,724:{name:"Jean Bart改",type:ST.BB,seek:15,seek2:53,na:NA.France,sg:SG.FastB2}
,725:{name:"夕暮改",type:ST.DD,seek:6,seek2:40,na:NA.Japan,sg:SG.FastB2}
,726:{name:"Heywood L.E.改",type:ST.DD,seek:20,seek2:61,na:NA.USA,sg:SG.FastB2}
,727:{name:"第百一号輸送艦改",type:ST.LHA,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,728:{name:"第二十二号海防艦改",type:ST.DE,seek:4,seek2:22,na:NA.Japan,sg:SG.SlowB}
,729:{name:"白雲改",type:ST.DD,seek:5,seek2:40,na:NA.Japan,sg:SG.FastB2}
,730:{name:"稲木改",type:ST.DE,seek:4,seek2:24,na:NA.Japan,sg:SG.SlowB}
,731:{name:"C.Cappellini改",type:ST.SS,seek:7,seek2:28,na:NA.Italia,sg:SG.SlowC}
,877:{name:"Conte di Cavour",type:ST.BB,seek:6,seek2:29,na:NA.Italia,sg:SG.FastB2}
,878:{name:"Conte di Cavour改",type:ST.BB,seek:11,seek2:40,na:NA.Italia,sg:SG.FastB2}
,879:{name:"Conte di Cavour nuovo",type:ST.BB,seek:18,seek2:58,na:NA.Italia,sg:SG.FastB2}
,881:{name:"伊201",type:ST.SS,seek:8,seek2:39,na:NA.Japan,sg:SG.SlowD}
,882:{name:"伊203",type:ST.SS,seek:8,seek2:38,na:NA.Japan,sg:SG.SlowD}
,883:{name:"龍鳳改二戊",type:ST.CVL,seek:30,seek2:77,na:NA.Japan,sg:SG.SlowB}
,884:{name:"雲鷹",type:ST.CVL,seek:29,seek2:52,na:NA.Japan,sg:SG.SlowB}
,885:{name:"Victorious",type:ST.CVB,seek:39,seek2:73,na:NA.UK,sg:SG.FastB2}
,886:{name:"早潮",type:ST.DD,seek:9,seek2:19,na:NA.Japan,sg:SG.FastB2}
,887:{name:"伊203改",type:ST.SS,seek:14,seek2:48,na:NA.Japan,sg:SG.SlowD}
,888:{name:"龍鳳改二",type:ST.CVL,seek:33,seek2:80,na:NA.Japan,sg:SG.FastB2}
,889:{name:"雲鷹改二",type:ST.CVL,seek:37,seek2:66,na:NA.Japan,sg:SG.SlowB}
,891:{name:"Salmon",type:ST.SS,seek:10,seek2:42,na:NA.USA,sg:SG.SlowC}
,893:{name:"Janus改",type:ST.DD,seek:12,seek2:52,na:NA.UK,sg:SG.FastB2}
,894:{name:"鳳翔改二",type:ST.CVL,seek:43,seek2:82,na:NA.Japan,sg:SG.SlowE}
,895:{name:"昭南",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.SlowB}
,896:{name:"Brooklyn",type:ST.CL,seek:18,seek2:67,na:NA.USA,sg:SG.FastB2}
,897:{name:"Salmon改",type:ST.SS,seek:12,seek2:45,na:NA.USA,sg:SG.SlowC}
,898:{name:"第二十二号海防艦",type:ST.DE,seek:2,seek2:13,na:NA.Japan,sg:SG.SlowB}
,899:{name:"鳳翔改二戦",type:ST.CVL,seek:36,seek2:76,na:NA.Japan,sg:SG.SlowE}
,900:{name:"山汐丸",type:ST.AO,seek:13,seek2:53,na:NA.Japan,sg:SG.SlowB}
,901:{name:"Javelin",type:ST.DD,seek:10,seek2:21,na:NA.UK,sg:SG.FastB2}
,903:{name:"天霧改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,904:{name:"能美",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,905:{name:"倉橋",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.SlowB}
,906:{name:"Javelin改",type:ST.DD,seek:12,seek2:53,na:NA.UK,sg:SG.FastB2}
,908:{name:"天霧改二丁",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastB2}
,909:{name:"能美改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.SlowB}
,910:{name:"倉橋改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.SlowB}
,911:{name:"大和改二",type:ST.BB,seek:18,seek2:59,na:NA.Japan,sg:SG.FastB1}
,913:{name:"Maryland",type:ST.BB,seek:9,seek2:36,na:NA.USA,sg:SG.SlowB}
,915:{name:"早潮改二",type:ST.DD,seek:10,seek2:41,na:NA.Japan,sg:SG.FastB2}
,916:{name:"大和改二重",type:ST.BBV,seek:20,seek2:68,na:NA.Japan,sg:SG.SlowA}
,918:{name:"Maryland改",type:ST.BB,seek:16,seek2:51,na:NA.USA,sg:SG.SlowB}
,920:{name:"Samuel B.Roberts Mk.II",type:ST.DD,seek:15,seek2:52,na:NA.USA,sg:SG.FastC}
,921:{name:"鵜来",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.SlowB}
,922:{name:"稲木",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.SlowB}
,923:{name:"Tuscaloosa",type:ST.CA,seek:15,seek2:55,na:NA.USA,sg:SG.FastB2}
,924:{name:"Nevada",type:ST.BB,seek:8,seek2:36,na:NA.USA,sg:SG.SlowB}
,925:{name:"Langley",type:ST.CVL,seek:40,seek2:68,na:NA.USA,sg:SG.FastB2}
,926:{name:"鵜来改",type:ST.DE,seek:5,seek2:27,na:NA.Japan,sg:SG.SlowB}
,928:{name:"Tuscaloosa改",type:ST.CA,seek:16,seek2:57,na:NA.USA,sg:SG.FastB2}
,929:{name:"Nevada改",type:ST.BB,seek:13,seek2:50,na:NA.USA,sg:SG.SlowB}
,930:{name:"Langley改",type:ST.CVL,seek:50,seek2:80,na:NA.USA,sg:SG.FastB2}
,931:{name:"Ranger",type:ST.CV,seek:38,seek2:68,na:NA.USA,sg:SG.FastB2}
,933:{name:"Massachusetts",type:ST.BB,seek:15,seek2:47,na:NA.USA,sg:SG.FastB2}
,934:{name:"C.Cappellini",type:ST.SS,seek:5,seek2:24,na:NA.Italia,sg:SG.SlowC}
,935:{name:"Jean Bart",type:ST.BB,seek:12,seek2:48,na:NA.France,sg:SG.FastB2}
,936:{name:"Nevada改 Mod.2",type:ST.BB,seek:15,seek2:52,na:NA.USA,sg:SG.SlowB}
,938:{name:"Massachusetts改",type:ST.BB,seek:18,seek2:59,na:NA.USA,sg:SG.FastB2}
,939:{name:"UIT-24",type:ST.SS,seek:9,seek2:31,na:NA.Italia,sg:SG.SlowC}
,940:{name:"伊503",type:ST.SS,seek:10,seek2:33,na:NA.Japan,sg:SG.SlowC}
,941:{name:"Heywood L.E.",type:ST.DD,seek:20,seek2:33,na:NA.USA,sg:SG.FastB2}
,943:{name:"熊野丸",type:ST.LHA,seek:13,seek2:56,na:NA.Japan,sg:SG.SlowB}
,945:{name:"第百一号輸送艦",type:ST.LHA,seek:2,seek2:9,na:NA.Japan,sg:SG.SlowB}
,948:{name:"熊野丸改",type:ST.LHA,seek:15,seek2:60,na:NA.Japan,sg:SG.SlowB}
,951:{name:"天津風改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.FastA}
,953:{name:"朝日",type:ST.CT,seek:1,seek2:3,na:NA.Japan,sg:SG.SlowB}
,954:{name:"榛名改二丙",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.FastB1}
,955:{name:"清霜改二",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.FastB2}
,958:{name:"朝日改",type:ST.AR,seek:1,seek2:4,na:NA.Japan,sg:SG.SlowB}
,959:{name:"深雪改二",type:ST.DD,seek:13,seek2:51,na:NA.Japan,sg:SG.FastB2}
,960:{name:"清霜改二丁",type:ST.DD,seek:12,seek2:50,na:NA.Japan,sg:SG.FastB2}
,961:{name:"時雨改三",type:ST.DD,seek:12,seek2:51,na:NA.Japan,sg:SG.FastB2}
,964:{name:"白雲",type:ST.DD,seek:3,seek2:19,na:NA.Japan,sg:SG.FastB2}
,1496:{name:"Colorado改",type:ST.BB,seek:16,seek2:52,na:NA.USA,sg:SG.SlowB}
,502:{name:"三隈改二",type:ST.CAV,seek:25,seek2:82,na:NA.Japan,sg:SG.FastA}
,507:{name:"三隈改二特",type:ST.AV,seek:32,seek2:89,na:NA.Japan,sg:SG.FastA}
,971:{name:"伊36",type:ST.SSV,seek:9,seek2:31,na:NA.Japan,sg:SG.SlowC}
,976:{name:"伊36改",type:ST.SSV,seek:10,seek2:33,na:NA.Japan,sg:SG.SlowC}
,944:{name:"平安丸",type:ST.AS,seek:11,seek2:30,na:NA.Japan,sg:SG.SlowB}
,949:{name:"平安丸改",type:ST.AS,seek:18,seek2:39,na:NA.Japan,sg:SG.SlowB}
,892:{name:"Drum",type:ST.SS,seek:11,seek2:43,na:NA.Japan,sg:SG.SlowC}
,732:{name:"Drum改",type:ST.SS,seek:12,seek2:43,na:NA.Japan,sg:SG.SlowC}
,972:{name:"伊41",type:ST.SSV,seek:10,seek2:30,na:NA.Japan,sg:SG.SlowC}
,977:{name:"伊41改",type:ST.SSV,seek:11,seek2:33,na:NA.Japan,sg:SG.SlowC}
,975:{name:"春雨改二",type:ST.DD,seek:10,seek2:51,na:NA.Japan,sg:SG.FastB2}
,979:{name:"稲木改二",type:ST.DE,seek:5,seek2:42,na:NA.Japan,sg:SG.SlowD}
,968:{name:"初月改二",type:ST.DD,seek:12,seek2:54,na:NA.Japan,sg:SG.FastB2}
,927:{name:"Valiant",type:ST.BB,seek:15,seek2:47,na:NA.UK,sg:SG.SlowB}
,733:{name:"Valiant改",type:ST.BB,seek:18,seek2:59,na:NA.UK,sg:SG.SlowB}
,962:{name:"Mogador",type:ST.DD,seek:8,seek2:38,na:NA.France,sg:SG.FastB2}
,967:{name:"Mogador改",type:ST.DD,seek:11,seek2:50,na:NA.France,sg:SG.FastB2}
,965:{name:"Gloire",type:ST.CL,seek:20,seek2:64,na:NA.France,sg:SG.FastB2}
,970:{name:"Gloire改",type:ST.CL,seek:24,seek2:76,na:NA.France,sg:SG.FastB2}
,969:{name:"Richelieu Deux",type:ST.BB,seek:19,seek2:58,na:NA.France,sg:SG.FastB2}
,952:{name:"Phoenix",type:ST.CL,seek:18,seek2:68,na:NA.USA,sg:SG.FastB2}
,734:{name:"Phoenix改",type:ST.CL,seek:22,seek2:78,na:NA.USA,sg:SG.FastB2}
,957:{name:"General Belgrano",type:ST.CL,seek:40,seek2:90,na:NA.USA,sg:SG.FastB2}
,966:{name:"Lexington",type:ST.CV,seek:40,seek2:67,na:NA.USA,sg:SG.FastB2}
,735:{name:"Lexington改",type:ST.CV,seek:46,seek2:80,na:NA.USA,sg:SG.FastB2}
,694:{name:"霧島改二丙",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.FastB2}
,956:{name:"早霜改二",type:ST.DD,seek:11,seek2:42,na:NA.Japan,sg:SG.FastB2}
,981:{name:"藤波改二",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.FastB2}
,986:{name:"白雪改二",type:ST.DD,seek:13,seek2:54,na:NA.Japan,sg:SG.FastB2}
,987:{name:"初雪改二",type:ST.DD,seek:15,seek2:52,na:NA.Japan,sg:SG.FastB2}
,984:{name:"Wahoo",type:ST.SS,seek:12,seek2:44,na:NA.USA,sg:SG.SlowC}
,989:{name:"Wahoo改",type:ST.SS,seek:14,seek2:46,na:NA.USA,sg:SG.SlowC}
,994:{name:"榧",type:ST.DD,seek:8,seek2:25,na:NA.Japan,sg:SG.FastB2}
,736:{name:"榧改",type:ST.DD,seek:16,seek2:47,na:NA.Japan,sg:SG.FastB2}
,995:{name:"大泊",type:ST.AO,seek:7,seek2:14,na:NA.Japan,sg:SG.SlowB}
,1000:{name:"大泊改",type:ST.AO,seek:8,seek2:16,na:NA.Japan,sg:SG.SlowB}
,1001:{name:"Киров",type:ST.CL,seek:13,seek2:42,na:NA.USSR,sg:SG.FastB1}
,1006:{name:"Киров改",type:ST.CL,seek:14,seek2:45,na:NA.USSR,sg:SG.FastB1}
,992:{name:"杉",type:ST.DD,seek:8,seek2:26,na:NA.Japan,sg:SG.FastB2}
,997:{name:"杉改",type:ST.DD,seek:16,seek2:47,na:NA.Japan,sg:SG.FastB2}
,1003:{name:"しまね丸",type:ST.AO,seek:13,seek2:57,na:NA.Japan,sg:SG.SlowB}
,1008:{name:"しまね丸改",type:ST.AO,seek:22,seek2:66,na:NA.Japan,sg:SG.SlowB}
,1005:{name:"Minneapolis",type:ST.CA,seek:15,seek2:56,na:NA.USA,sg:SG.FastB2}
,1010:{name:"Minneapolis改",type:ST.CA,seek:16,seek2:58,na:NA.USA,sg:SG.FastB2}
,983:{name:"浜波改二",type:ST.DD,seek:10,seek2:55,na:NA.Japan,sg:SG.FastB2}
,942:{name:"Richard P.Leary",type:ST.DD,seek:20,seek2:32,na:NA.USA,sg:SG.FastB2}
,737:{name:"Richard P.Leary改",type:ST.DD,seek:21,seek2:61,na:NA.USA,sg:SG.FastB2}

,998:{name:'Norge',type:ST.DE,seek:0,seek2:0,na:NA.Norge,sg:SG.SlowB}
,738:{name:'Norge改',type:ST.DE,seek:0,seek2:0,na:NA.Norge,sg:SG.SlowB}
,999:{name:'Eidsvold',type:ST.DE,seek:0,seek2:0,na:NA.Norge,sg:SG.SlowB}
,739:{name:'Eidsvold改',type:ST.DE,seek:0,seek2:0,na:NA.Norge,sg:SG.SlowB}
,1022:{name:'Glorious',type:ST.BB,seek:0,seek2:0,na:NA.Norge,sg:SG.FastB2}
,1027:{name:'Glorious',type:ST.CV,seek:0,seek2:0,na:NA.Norge,sg:SG.FastB2}
,740:{name:'Glorious改',type:ST.BB,seek:0,seek2:0,na:NA.Norge,sg:SG.FastB2}
,741:{name:'Glorious改',type:ST.CV,seek:0,seek2:0,na:NA.Norge,sg:SG.FastB2}
}; // @expansion

export default SHIP_DATAS;