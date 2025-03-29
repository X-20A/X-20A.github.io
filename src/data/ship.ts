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
    German = 5,
    /** フランス */
    France = 6,
    /** ソ連 */
    USSR = 7,
    /** その他 */
    Other = 8,
}

/** 速力グループID */
export const enum SG {
  /** 高速A群 */
  HighA = 1,
  /** 高速B1群 */
  HighB1 = 2,
  /** 高速B2群 */
  HighB2 = 3,
  /** 高速C群 */
  HighC = 4,
  /** 低速A群 */
  LowA = 5,
  /** 低速B群 */
  LowB = 6,
  /** 低速C群 */
  LowC = 7,
  /** 低速D群 */
  LowD = 8,
  /** 低速E群 */
  LowE = 9,
  /** 低速特殊B群 サミュ/改 夕張改二特 */
  LowB2 = 10,
}


import { type ShipData } from '@/classes/types';

// NOTE: 配列にしてもgzip後は1kBしか変わらない あとなぜかrand-testがこける
const ship_datas: Record<number, ShipData> = {
1:{name:"睦月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,2:{name:"如月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,6:{name:"長月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,7:{name:"三日月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,9:{name:"吹雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,10:{name:"白雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,11:{name:"深雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,12:{name:"磯波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,13:{name:"綾波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,14:{name:"敷波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,15:{name:"曙",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,16:{name:"潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,17:{name:"陽炎",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,18:{name:"不知火",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,19:{name:"黒潮",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,20:{name:"雪風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,21:{name:"長良",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,22:{name:"五十鈴",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,23:{name:"由良",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,24:{name:"大井",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,25:{name:"北上",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,26:{name:"扶桑",type:ST.BB,seek:9,seek2:33,na:NA.Japan,sg:SG.LowB}
,27:{name:"山城",type:ST.BB,seek:9,seek2:33,na:NA.Japan,sg:SG.LowB}
,28:{name:"皐月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,29:{name:"文月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,30:{name:"菊月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,31:{name:"望月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,32:{name:"初雪",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,33:{name:"叢雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,34:{name:"暁",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,35:{name:"響",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,36:{name:"雷",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,37:{name:"電",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,38:{name:"初春",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,39:{name:"子日",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,40:{name:"若葉",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,41:{name:"初霜",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,42:{name:"白露",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,43:{name:"時雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,44:{name:"村雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,45:{name:"夕立",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,46:{name:"五月雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,47:{name:"涼風",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,48:{name:"霰",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,49:{name:"霞",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,50:{name:"島風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.HighA}
,51:{name:"天龍",type:ST.CL,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,52:{name:"龍田",type:ST.CL,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,53:{name:"名取",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,54:{name:"川内",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,55:{name:"神通",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,56:{name:"那珂",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,57:{name:"大井改",type:ST.CLT,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,58:{name:"北上改",type:ST.CLT,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,59:{name:"古鷹",type:ST.CA,seek:10,seek2:39,na:NA.Japan,sg:SG.HighB2}
,60:{name:"加古",type:ST.CA,seek:10,seek2:39,na:NA.Japan,sg:SG.HighB2}
,61:{name:"青葉",type:ST.CA,seek:11,seek2:39,na:NA.Japan,sg:SG.HighB2}
,62:{name:"妙高",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.HighB2}
,63:{name:"那智",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.HighB2}
,64:{name:"足柄",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.HighB2}
,65:{name:"羽黒",type:ST.CA,seek:12,seek2:39,na:NA.Japan,sg:SG.HighB2}
,66:{name:"高雄",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,67:{name:"愛宕",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,68:{name:"摩耶",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,69:{name:"鳥海",type:ST.CA,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,70:{name:"最上",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.HighA}
,71:{name:"利根",type:ST.CA,seek:20,seek2:59,na:NA.Japan,sg:SG.HighA}
,72:{name:"筑摩",type:ST.CA,seek:20,seek2:59,na:NA.Japan,sg:SG.HighA}
,73:{name:"最上改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.HighA}
,74:{name:"祥鳳",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.HighB2}
,75:{name:"飛鷹",type:ST.CVL,seek:38,seek2:59,na:NA.Japan,sg:SG.LowB}
,76:{name:"龍驤",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.HighB2}
,77:{name:"伊勢",type:ST.BB,seek:10,seek2:36,na:NA.Japan,sg:SG.LowB}
,78:{name:"金剛",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,79:{name:"榛名",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,80:{name:"長門",type:ST.BB,seek:12,seek2:39,na:NA.Japan,sg:SG.LowB}
,81:{name:"陸奥",type:ST.BB,seek:12,seek2:39,na:NA.Japan,sg:SG.LowB}
,82:{name:"伊勢改",type:ST.BBV,seek:24,seek2:60,na:NA.Japan,sg:SG.LowB}
,83:{name:"赤城",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.HighB2}
,84:{name:"加賀",type:ST.CV,seek:40,seek2:69,na:NA.Japan,sg:SG.HighC}
,85:{name:"霧島",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,86:{name:"比叡",type:ST.BB,seek:13,seek2:39,na:NA.Japan,sg:SG.HighB2}
,87:{name:"日向",type:ST.BB,seek:10,seek2:36,na:NA.Japan,sg:SG.LowB}
,88:{name:"日向改",type:ST.BBV,seek:24,seek2:60,na:NA.Japan,sg:SG.LowB}
,89:{name:"鳳翔",type:ST.CVL,seek:32,seek2:69,na:NA.Japan,sg:SG.LowC}
,90:{name:"蒼龍",type:ST.CV,seek:42,seek2:69,na:NA.Japan,sg:SG.HighB1}
,91:{name:"飛龍",type:ST.CV,seek:42,seek2:69,na:NA.Japan,sg:SG.HighB1}
,92:{name:"隼鷹",type:ST.CVL,seek:38,seek2:59,na:NA.Japan,sg:SG.LowC}
,93:{name:"朧",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,94:{name:"漣",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,95:{name:"朝潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,96:{name:"大潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,97:{name:"満潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,98:{name:"荒潮",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,99:{name:"球磨",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,100:{name:"多摩",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,101:{name:"木曾",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,102:{name:"千歳",type:ST.AV,seek:34,seek2:69,na:NA.Japan,sg:SG.HighC}
,103:{name:"千代田",type:ST.AV,seek:34,seek2:69,na:NA.Japan,sg:SG.HighC}
,104:{name:"千歳改",type:ST.AV,seek:36,seek2:69,na:NA.Japan,sg:SG.HighC}
,105:{name:"千代田改",type:ST.AV,seek:36,seek2:69,na:NA.Japan,sg:SG.HighC}
,106:{name:"千歳甲",type:ST.AV,seek:30,seek2:69,na:NA.Japan,sg:SG.HighC}
,107:{name:"千代田甲",type:ST.AV,seek:30,seek2:69,na:NA.Japan,sg:SG.HighC}
,108:{name:"千歳航",type:ST.CVL,seek:36,seek2:69,na:NA.Japan,sg:SG.HighB2}
,109:{name:"千代田航",type:ST.CVL,seek:36,seek2:69,na:NA.Japan,sg:SG.HighB2}
,110:{name:"翔鶴",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.HighA}
,111:{name:"瑞鶴",type:ST.CV,seek:44,seek2:69,na:NA.Japan,sg:SG.HighA}
,112:{name:"瑞鶴改",type:ST.CV,seek:48,seek2:89,na:NA.Japan,sg:SG.HighA}
,113:{name:"鬼怒",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,114:{name:"阿武隈",type:ST.CL,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,115:{name:"夕張",type:ST.CL,seek:6,seek2:39,na:NA.Japan,sg:SG.HighC}
,116:{name:"瑞鳳",type:ST.CVL,seek:34,seek2:69,na:NA.Japan,sg:SG.HighB2}
,117:{name:"瑞鳳改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.HighB2}
,118:{name:"大井改二",type:ST.CLT,seek:9,seek2:43,na:NA.Japan,sg:SG.HighB2}
,119:{name:"北上改二",type:ST.CLT,seek:9,seek2:43,na:NA.Japan,sg:SG.HighB2}
,120:{name:"三隈",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.HighA}
,121:{name:"三隈改",type:ST.CAV,seek:22,seek2:61,na:NA.Japan,sg:SG.HighA}
,122:{name:"舞風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,123:{name:"衣笠",type:ST.CA,seek:11,seek2:39,na:NA.Japan,sg:SG.HighB2}
,124:{name:"鈴谷",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.HighA}
,125:{name:"熊野",type:ST.CA,seek:14,seek2:39,na:NA.Japan,sg:SG.HighA}
,126:{name:"伊168",type:ST.SS,seek:9,seek2:29,na:NA.Japan,sg:SG.LowC}
,127:{name:"伊58",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.LowC}
,128:{name:"伊8",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.LowC}
,129:{name:"鈴谷改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.HighA}
,130:{name:"熊野改",type:ST.CAV,seek:22,seek2:59,na:NA.Japan,sg:SG.HighA}
,131:{name:"大和",type:ST.BB,seek:15,seek2:39,na:NA.Japan,sg:SG.LowA}
,132:{name:"秋雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,133:{name:"夕雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,134:{name:"巻雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,135:{name:"長波",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,136:{name:"大和改",type:ST.BB,seek:17,seek2:39,na:NA.Japan,sg:SG.LowA}
,137:{name:"阿賀野",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.HighB1}
,138:{name:"能代",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.HighB1}
,139:{name:"矢矧",type:ST.CL,seek:13,seek2:45,na:NA.Japan,sg:SG.HighB1}
,140:{name:"酒匂",type:ST.CL,seek:12,seek2:45,na:NA.Japan,sg:SG.HighB1}
,141:{name:"五十鈴改二",type:ST.CL,seek:15,seek2:59,na:NA.Japan,sg:SG.HighB2}
,142:{name:"衣笠改二",type:ST.CA,seek:13,seek2:58,na:NA.Japan,sg:SG.HighB2}
,143:{name:"武蔵",type:ST.BB,seek:16,seek2:40,na:NA.Japan,sg:SG.LowA}
,144:{name:"夕立改二",type:ST.DD,seek:12,seek2:49,na:NA.Japan,sg:SG.HighB2}
,145:{name:"時雨改二",type:ST.DD,seek:9,seek2:48,na:NA.Japan,sg:SG.HighB2}
,146:{name:"木曾改二",type:ST.CLT,seek:13,seek2:49,na:NA.Japan,sg:SG.HighB2}
,147:{name:"Верный",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,148:{name:"武蔵改",type:ST.BB,seek:18,seek2:40,na:NA.Japan,sg:SG.LowA}
,149:{name:"金剛改二",type:ST.BB,seek:16,seek2:49,na:NA.Japan,sg:SG.HighB2}
,150:{name:"比叡改二",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.HighB2}
,151:{name:"榛名改二",type:ST.BB,seek:17,seek2:51,na:NA.Japan,sg:SG.HighB2}
,152:{name:"霧島改二",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.HighB2}
,153:{name:"大鳳",type:ST.CVB,seek:47,seek2:74,na:NA.Japan,sg:SG.HighA}
,154:{name:"香取",type:ST.CT,seek:10,seek2:38,na:NA.Japan,sg:SG.LowB}
,155:{name:"伊401",type:ST.SSV,seek:15,seek2:45,na:NA.Japan,sg:SG.LowC}
,156:{name:"大鳳改",type:ST.CVB,seek:50,seek2:77,na:NA.Japan,sg:SG.HighA}
,157:{name:"龍驤改二",type:ST.CVL,seek:37,seek2:79,na:NA.Japan,sg:SG.HighB2}
,158:{name:"川内改二",type:ST.CL,seek:16,seek2:55,na:NA.Japan,sg:SG.HighB2}
,159:{name:"神通改二",type:ST.CL,seek:12,seek2:54,na:NA.Japan,sg:SG.HighB2}
,160:{name:"那珂改二",type:ST.CL,seek:15,seek2:54,na:NA.Japan,sg:SG.HighB2}
,161:{name:"あきつ丸",type:ST.LHA,seek:3,seek2:13,na:NA.Japan,sg:SG.LowC}
,162:{name:"神威",type:ST.AO,seek:5,seek2:15,na:NA.Japan,sg:SG.LowB}
,163:{name:"まるゆ",type:ST.SS,seek:1,seek2:9,na:NA.Japan,sg:SG.LowC}
,164:{name:"弥生",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,165:{name:"卯月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,166:{name:"あきつ丸改",type:ST.LHA,seek:13,seek2:59,na:NA.Japan,sg:SG.LowC}
,167:{name:"磯風",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.HighB2}
,168:{name:"浦風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,169:{name:"谷風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,170:{name:"浜風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,171:{name:"Bismarck",type:ST.BB,seek:16,seek2:42,na:NA.German,sg:SG.HighB2}
,172:{name:"Bismarck改",type:ST.BB,seek:18,seek2:52,na:NA.German,sg:SG.HighB2}
,173:{name:"Bismarck zwei",type:ST.BB,seek:19,seek2:54,na:NA.German,sg:SG.HighB2}
,174:{name:"Z1",type:ST.DD,seek:6,seek2:24,na:NA.German,sg:SG.HighB2}
,175:{name:"Z3",type:ST.DD,seek:6,seek2:24,na:NA.German,sg:SG.HighB2}
,176:{name:"Prinz Eugen",type:ST.CA,seek:15,seek2:40,na:NA.German,sg:SG.HighB2}
,177:{name:"Prinz Eugen改",type:ST.CA,seek:16,seek2:50,na:NA.German,sg:SG.HighB2}
,178:{name:"Bismarck drei",type:ST.BB,seek:22,seek2:59,na:NA.German,sg:SG.HighB2}
,179:{name:"Z1 zwei",type:ST.DD,seek:9,seek2:43,na:NA.German,sg:SG.HighB2}
,180:{name:"Z3 zwei",type:ST.DD,seek:9,seek2:43,na:NA.German,sg:SG.HighB2}
,181:{name:"天津風",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.HighB1}
,182:{name:"明石",type:ST.AR,seek:1,seek2:5,na:NA.Japan,sg:SG.LowC}
,183:{name:"大淀",type:ST.CL,seek:24,seek2:80,na:NA.Japan,sg:SG.HighB2}
,184:{name:"大鯨",type:ST.AS,seek:24,seek2:48,na:NA.Japan,sg:SG.LowB}
,185:{name:"龍鳳",type:ST.CVL,seek:28,seek2:64,na:NA.Japan,sg:SG.HighB2}
,186:{name:"時津風",type:ST.DD,seek:7,seek2:19,na:NA.Japan,sg:SG.HighB2}
,187:{name:"明石改",type:ST.AR,seek:2,seek2:6,na:NA.Japan,sg:SG.LowC}
,188:{name:"利根改二",type:ST.CAV,seek:30,seek2:93,na:NA.Japan,sg:SG.HighA}
,189:{name:"筑摩改二",type:ST.CAV,seek:30,seek2:94,na:NA.Japan,sg:SG.HighA}
,190:{name:"初風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,191:{name:"伊19",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.LowC}
,192:{name:"那智改二",type:ST.CA,seek:20,seek2:63,na:NA.Japan,sg:SG.HighB2}
,193:{name:"足柄改二",type:ST.CA,seek:17,seek2:57,na:NA.Japan,sg:SG.HighB2}
,194:{name:"羽黒改二",type:ST.CA,seek:18,seek2:58,na:NA.Japan,sg:SG.HighB2}
,195:{name:"綾波改二",type:ST.DD,seek:13,seek2:49,na:NA.Japan,sg:SG.HighB2}
,196:{name:"飛龍改二",type:ST.CV,seek:52,seek2:89,na:NA.Japan,sg:SG.HighB1}
,197:{name:"蒼龍改二",type:ST.CV,seek:55,seek2:93,na:NA.Japan,sg:SG.HighB1}
,198:{name:"霰改二",type:ST.DD,seek:11,seek2:53,na:NA.Japan,sg:SG.HighB2}
,199:{name:"大潮改二",type:ST.DD,seek:12,seek2:54,na:NA.Japan,sg:SG.HighB2}
,200:{name:"阿武隈改二",type:ST.CL,seek:16,seek2:60,na:NA.Japan,sg:SG.HighB2}
,201:{name:"吹雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,202:{name:"白雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,203:{name:"初雪改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,204:{name:"深雪改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.HighB2}
,205:{name:"叢雲改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,206:{name:"磯波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,207:{name:"綾波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,208:{name:"敷波改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,209:{name:"金剛改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.HighB2}
,210:{name:"比叡改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.HighB2}
,211:{name:"榛名改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.HighB2}
,212:{name:"霧島改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.HighB2}
,213:{name:"天龍改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,214:{name:"龍田改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,215:{name:"球磨改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,216:{name:"多摩改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,217:{name:"木曾改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,218:{name:"長良改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,219:{name:"五十鈴改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,220:{name:"由良改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,221:{name:"名取改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,222:{name:"川内改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,223:{name:"神通改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,224:{name:"那珂改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,225:{name:"陽炎改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,226:{name:"不知火改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,227:{name:"黒潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,228:{name:"雪風改",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.HighB2}
,229:{name:"島風改",type:ST.DD,seek:9,seek2:39,na:NA.Japan,sg:SG.HighA}
,230:{name:"朧改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,231:{name:"曙改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,232:{name:"漣改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,233:{name:"潮改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,234:{name:"暁改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,235:{name:"響改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,236:{name:"雷改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,237:{name:"電改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,238:{name:"初春改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,239:{name:"子日改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,240:{name:"若葉改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,241:{name:"初霜改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,242:{name:"白露改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,243:{name:"時雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,244:{name:"村雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,245:{name:"夕立改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,246:{name:"五月雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,247:{name:"涼風改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,248:{name:"朝潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,249:{name:"大潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,250:{name:"満潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,251:{name:"荒潮改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,252:{name:"霰改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,253:{name:"霞改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,254:{name:"睦月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,255:{name:"如月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,256:{name:"皐月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,257:{name:"文月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,258:{name:"長月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,259:{name:"菊月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,260:{name:"三日月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,261:{name:"望月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,262:{name:"古鷹改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.HighB2}
,263:{name:"加古改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.HighB2}
,264:{name:"青葉改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.HighB2}
,265:{name:"妙高改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,266:{name:"那智改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,267:{name:"足柄改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,268:{name:"羽黒改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,269:{name:"高雄改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,270:{name:"愛宕改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,271:{name:"摩耶改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,272:{name:"鳥海改",type:ST.CA,seek:14,seek2:49,na:NA.Japan,sg:SG.HighB2}
,273:{name:"利根改",type:ST.CA,seek:24,seek2:79,na:NA.Japan,sg:SG.HighA}
,274:{name:"筑摩改",type:ST.CA,seek:24,seek2:79,na:NA.Japan,sg:SG.HighA}
,275:{name:"長門改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.LowB}
,276:{name:"陸奥改",type:ST.BB,seek:15,seek2:49,na:NA.Japan,sg:SG.LowB}
,277:{name:"赤城改",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.HighB2}
,278:{name:"加賀改",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.HighC}
,279:{name:"蒼龍改",type:ST.CV,seek:46,seek2:89,na:NA.Japan,sg:SG.HighB1}
,280:{name:"飛龍改",type:ST.CV,seek:46,seek2:89,na:NA.Japan,sg:SG.HighB1}
,281:{name:"龍驤改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.HighB2}
,282:{name:"祥鳳改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.HighB2}
,283:{name:"飛鷹改",type:ST.CVL,seek:40,seek2:79,na:NA.Japan,sg:SG.LowB}
,284:{name:"隼鷹改",type:ST.CVL,seek:40,seek2:79,na:NA.Japan,sg:SG.LowB}
,285:{name:"鳳翔改",type:ST.CVL,seek:35,seek2:79,na:NA.Japan,sg:SG.LowB}
,286:{name:"扶桑改",type:ST.BBV,seek:18,seek2:49,na:NA.Japan,sg:SG.LowB}
,287:{name:"山城改",type:ST.BBV,seek:18,seek2:49,na:NA.Japan,sg:SG.LowB}
,288:{name:"翔鶴改",type:ST.CV,seek:48,seek2:89,na:NA.Japan,sg:SG.HighA}
,289:{name:"鬼怒改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,290:{name:"阿武隈改",type:ST.CL,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,291:{name:"千歳航改",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.HighB2}
,292:{name:"千代田航改",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.HighB2}
,293:{name:"夕張改",type:ST.CL,seek:8,seek2:44,na:NA.Japan,sg:SG.HighC}
,294:{name:"舞風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,295:{name:"衣笠改",type:ST.CA,seek:12,seek2:49,na:NA.Japan,sg:SG.HighB2}
,296:{name:"千歳航改二",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.HighB2}
,297:{name:"千代田航改二",type:ST.CVL,seek:42,seek2:79,na:NA.Japan,sg:SG.HighB2}
,299:{name:"Scamp",type:ST.SS,seek:11,seek2:41,na:NA.Japan,sg:SG.LowC}
,300:{name:"初風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,301:{name:"秋雲改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,302:{name:"夕雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,303:{name:"巻雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,304:{name:"長波改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,305:{name:"阿賀野改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.HighB1}
,306:{name:"能代改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.HighB1}
,307:{name:"矢矧改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.HighB1}
,308:{name:"弥生改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,309:{name:"卯月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,310:{name:"Z1改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.HighB2}
,311:{name:"Z3改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.HighB2}
,312:{name:"浜風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,313:{name:"谷風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,314:{name:"酒匂改",type:ST.CL,seek:14,seek2:59,na:NA.Japan,sg:SG.HighB1}
,316:{name:"天津風改",type:ST.DD,seek:9,seek2:39,na:NA.Japan,sg:SG.HighB1}
,317:{name:"浦風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,318:{name:"龍鳳改",type:ST.CVL,seek:30,seek2:74,na:NA.Japan,sg:SG.HighB2}
,319:{name:"妙高改二",type:ST.CA,seek:19,seek2:61,na:NA.Japan,sg:SG.HighB2}
,320:{name:"磯風改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.HighB2}
,321:{name:"大淀改",type:ST.CL,seek:28,seek2:84,na:NA.Japan,sg:SG.HighB2}
,322:{name:"時津風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,323:{name:"春雨改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,324:{name:"早霜改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,325:{name:"清霜改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,326:{name:"初春改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.HighB2}
,327:{name:"朝雲改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.HighB2}
,328:{name:"山雲改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.HighB2}
,329:{name:"野分改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,330:{name:"秋月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,331:{name:"天城",type:ST.CV,seek:38,seek2:74,na:NA.Japan,sg:SG.HighB1}
,332:{name:"葛城",type:ST.CV,seek:36,seek2:70,na:NA.Japan,sg:SG.HighB2}
,334:{name:"U-511改",type:ST.SS,seek:9,seek2:29,na:NA.Japan,sg:SG.LowC}
,343:{name:"香取改",type:ST.CT,seek:12,seek2:48,na:NA.Japan,sg:SG.LowB}
,344:{name:"朝霜改",type:ST.DD,seek:10,seek2:43,na:NA.Japan,sg:SG.HighB2}
,345:{name:"高波改",type:ST.DD,seek:13,seek2:54,na:NA.Japan,sg:SG.HighB2}
,346:{name:"照月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,347:{name:"Libeccio改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.HighB2}
,348:{name:"瑞穂改",type:ST.AV,seek:38,seek2:94,na:NA.Japan,sg:SG.LowB}
,349:{name:"風雲改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,350:{name:"海風改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.HighB2}
,351:{name:"江風改",type:ST.DD,seek:8,seek2:40,na:NA.Japan,sg:SG.HighB2}
,352:{name:"速吸改",type:ST.AO,seek:18,seek2:59,na:NA.Japan,sg:SG.LowC}
,353:{name:"Graf Zeppelin改",type:ST.CV,seek:46,seek2:75,na:NA.German,sg:SG.HighB2}
,354:{name:"嵐改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,355:{name:"萩風改",type:ST.DD,seek:8,seek2:39,na:NA.Japan,sg:SG.HighB2}
,356:{name:"鹿島改",type:ST.CT,seek:10,seek2:50,na:NA.Japan,sg:SG.LowB}
,357:{name:"初月改",type:ST.DD,seek:10,seek2:49,na:NA.Japan,sg:SG.HighB2}
,358:{name:"Zara改",type:ST.CA,seek:12,seek2:46,na:NA.Italia,sg:SG.HighB2}
,359:{name:"沖波改",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,360:{name:"Iowa改",type:ST.BB,seek:30,seek2:71,na:NA.USA,sg:SG.HighB1}
,361:{name:"Pola改",type:ST.CA,seek:11,seek2:47,na:NA.Italia,sg:SG.HighB2}
,362:{name:"親潮改",type:ST.DD,seek:9,seek2:40,na:NA.Japan,sg:SG.HighB2}
,363:{name:"春風改",type:ST.DD,seek:8,seek2:46,na:NA.Japan,sg:SG.HighB2}
,364:{name:"Warspite改",type:ST.BB,seek:20,seek2:60,na:NA.UK,sg:SG.LowB}
,365:{name:"Aquila改",type:ST.CV,seek:36,seek2:72,na:NA.Italia,sg:SG.HighB2}
,366:{name:"水無月改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,367:{name:"伊26改",type:ST.SSV,seek:17,seek2:41,na:NA.Japan,sg:SG.LowC}
,368:{name:"浦波改",type:ST.DD,seek:8,seek2:43,na:NA.Japan,sg:SG.HighB2}
,369:{name:"山風改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.HighB2}
,370:{name:"朝風改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.HighB2}
,371:{name:"松風改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.HighB2}
,372:{name:"Commandant Teste改",type:ST.AV,seek:34,seek2:88,na:NA.France,sg:SG.LowB}
,373:{name:"藤波改",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.HighB2}
,374:{name:"伊13改",type:ST.SSV,seek:13,seek2:43,na:NA.Japan,sg:SG.LowC}
,375:{name:"伊14改",type:ST.SSV,seek:14,seek2:44,na:NA.Japan,sg:SG.LowC}
,376:{name:"占守改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,377:{name:"国後改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.LowB}
,378:{name:"八丈改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.LowB}
,379:{name:"石垣改",type:ST.DE,seek:6,seek2:30,na:NA.Japan,sg:SG.LowB}
,380:{name:"大鷹改",type:ST.CVL,seek:33,seek2:64,na:NA.Japan,sg:SG.LowB}
,381:{name:"神鷹改",type:ST.CVL,seek:29,seek2:60,na:NA.Japan,sg:SG.LowB}
,382:{name:"雲鷹改",type:ST.CVL,seek:31,seek2:61,na:NA.Japan,sg:SG.LowB}
,383:{name:"択捉改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,384:{name:"松輪改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,385:{name:"佐渡改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.LowB}
,386:{name:"対馬改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,387:{name:"旗風改",type:ST.DD,seek:8,seek2:46,na:NA.Japan,sg:SG.HighB2}
,390:{name:"天霧改",type:ST.DD,seek:7,seek2:39,na:NA.Japan,sg:SG.HighB2}
,391:{name:"狭霧改",type:ST.DD,seek:7,seek2:41,na:NA.Japan,sg:SG.HighB2}
,392:{name:"Richelieu改",type:ST.BB,seek:16,seek2:54,na:NA.France,sg:SG.HighB2}
,393:{name:"Ark Royal改",type:ST.CV,seek:42,seek2:84,na:NA.UK,sg:SG.HighB2}
,394:{name:"Jervis改",type:ST.DD,seek:12,seek2:52,na:NA.UK,sg:SG.HighB2}
,395:{name:"Ташкент改",type:ST.DD,seek:10,seek2:48,na:NA.USSR,sg:SG.HighA}
,396:{name:"Gambier Bay改",type:ST.CVL,seek:38,seek2:68,na:NA.USA,sg:SG.LowB}
,397:{name:"Intrepid改",type:ST.CV,seek:52,seek2:90,na:NA.USA,sg:SG.HighB2}
,398:{name:"伊168改",type:ST.SS,seek:10,seek2:29,na:NA.Japan,sg:SG.LowC}
,399:{name:"伊58改",type:ST.SSV,seek:15,seek2:39,na:NA.Japan,sg:SG.LowC}
,400:{name:"伊8改",type:ST.SSV,seek:16,seek2:39,na:NA.Japan,sg:SG.LowC}
,401:{name:"伊19改",type:ST.SSV,seek:15,seek2:39,na:NA.Japan,sg:SG.LowC}
,402:{name:"まるゆ改",type:ST.SS,seek:1,seek2:19,na:NA.Japan,sg:SG.LowC}
,403:{name:"伊401改",type:ST.SSV,seek:15,seek2:45,na:NA.Japan,sg:SG.LowC}
,404:{name:"雲龍",type:ST.CV,seek:40,seek2:72,na:NA.Japan,sg:SG.HighB1}
,405:{name:"春雨",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,406:{name:"雲龍改",type:ST.CV,seek:48,seek2:82,na:NA.Japan,sg:SG.HighB1}
,407:{name:"潮改二",type:ST.DD,seek:11,seek2:48,na:NA.Japan,sg:SG.HighB2}
,408:{name:"隼鷹改二",type:ST.CVL,seek:44,seek2:79,na:NA.Japan,sg:SG.LowB}
,409:{name:"早霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,410:{name:"清霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,411:{name:"扶桑改二",type:ST.BBV,seek:22,seek2:59,na:NA.Japan,sg:SG.LowB}
,412:{name:"山城改二",type:ST.BBV,seek:23,seek2:59,na:NA.Japan,sg:SG.LowB}
,413:{name:"朝雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,414:{name:"山雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,415:{name:"野分",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.HighB2}
,416:{name:"古鷹改二",type:ST.CA,seek:13,seek2:54,na:NA.Japan,sg:SG.HighB2}
,417:{name:"加古改二",type:ST.CA,seek:14,seek2:55,na:NA.Japan,sg:SG.HighB2}
,418:{name:"皐月改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.HighB2}
,419:{name:"初霜改二",type:ST.DD,seek:11,seek2:49,na:NA.Japan,sg:SG.HighB2}
,420:{name:"叢雲改二",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,421:{name:"秋月",type:ST.DD,seek:9,seek2:29,na:NA.Japan,sg:SG.HighB2}
,422:{name:"照月",type:ST.DD,seek:9,seek2:29,na:NA.Japan,sg:SG.HighB2}
,423:{name:"初月",type:ST.DD,seek:8,seek2:28,na:NA.Japan,sg:SG.HighB2}
,424:{name:"高波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.HighB2}
,425:{name:"朝霜",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,426:{name:"吹雪改二",type:ST.DD,seek:14,seek2:54,na:NA.Japan,sg:SG.HighB2}
,427:{name:"鳥海改二",type:ST.CA,seek:22,seek2:62,na:NA.Japan,sg:SG.HighB2}
,428:{name:"摩耶改二",type:ST.CA,seek:16,seek2:55,na:NA.Japan,sg:SG.HighB2}
,429:{name:"天城改",type:ST.CV,seek:46,seek2:80,na:NA.Japan,sg:SG.HighB1}
,430:{name:"葛城改",type:ST.CV,seek:44,seek2:78,na:NA.Japan,sg:SG.HighB2}
,431:{name:"U-511",type:ST.SS,seek:8,seek2:28,na:NA.German,sg:SG.LowC}
,432:{name:"Graf Zeppelin",type:ST.CV,seek:40,seek2:69,na:NA.German,sg:SG.HighB2}
,433:{name:"Saratoga",type:ST.CV,seek:40,seek2:68,na:NA.USA,sg:SG.HighB2}
,434:{name:"睦月改二",type:ST.DD,seek:8,seek2:43,na:NA.Japan,sg:SG.HighB2}
,435:{name:"如月改二",type:ST.DD,seek:9,seek2:44,na:NA.Japan,sg:SG.HighB2}
,436:{name:"呂500",type:ST.SS,seek:12,seek2:34,na:NA.Japan,sg:SG.LowC}
,437:{name:"暁改二",type:ST.DD,seek:17,seek2:60,na:NA.Japan,sg:SG.HighB2}
,438:{name:"Saratoga改",type:ST.CV,seek:48,seek2:80,na:NA.USA,sg:SG.HighB2}
,439:{name:"Warspite",type:ST.BB,seek:14,seek2:48,na:NA.UK,sg:SG.LowB}
,440:{name:"Iowa",type:ST.BB,seek:24,seek2:64,na:NA.USA,sg:SG.HighB1}
,441:{name:"Littorio",type:ST.BB,seek:15,seek2:44,na:NA.Italia,sg:SG.HighB2}
,442:{name:"Roma",type:ST.BB,seek:17,seek2:46,na:NA.Italia,sg:SG.HighB2}
,443:{name:"Libeccio",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.HighB2}
,444:{name:"Aquila",type:ST.CV,seek:30,seek2:52,na:NA.Italia,sg:SG.HighB2}
,445:{name:"秋津洲",type:ST.AV,seek:22,seek2:42,na:NA.Japan,sg:SG.LowB}
,446:{name:"Italia",type:ST.BB,seek:17,seek2:52,na:NA.Italia,sg:SG.HighB2}
,447:{name:"Roma改",type:ST.BB,seek:17,seek2:52,na:NA.Italia,sg:SG.HighB2}
,448:{name:"Zara",type:ST.CA,seek:10,seek2:36,na:NA.Italia,sg:SG.HighB2}
,449:{name:"Pola",type:ST.CA,seek:9,seek2:35,na:NA.Italia,sg:SG.HighB2}
,450:{name:"秋津洲改",type:ST.AV,seek:24,seek2:54,na:NA.Japan,sg:SG.LowB}
,451:{name:"瑞穂",type:ST.AV,seek:36,seek2:74,na:NA.Japan,sg:SG.LowB}
,452:{name:"沖波",type:ST.DD,seek:7,seek2:21,na:NA.Japan,sg:SG.HighB2}
,453:{name:"風雲",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,454:{name:"嵐",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,455:{name:"萩風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,456:{name:"親潮",type:ST.DD,seek:8,seek2:19,na:NA.Japan,sg:SG.HighB2}
,457:{name:"山風",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.HighB2}
,458:{name:"海風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,459:{name:"江風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,460:{name:"速吸",type:ST.AO,seek:15,seek2:40,na:NA.Japan,sg:SG.LowC}
,461:{name:"翔鶴改二",type:ST.CV,seek:53,seek2:93,na:NA.Japan,sg:SG.HighA}
,462:{name:"瑞鶴改二",type:ST.CV,seek:52,seek2:92,na:NA.Japan,sg:SG.HighA}
,463:{name:"朝潮改二",type:ST.DD,seek:11,seek2:57,na:NA.Japan,sg:SG.HighB2}
,464:{name:"霞改二",type:ST.DD,seek:14,seek2:55,na:NA.Japan,sg:SG.HighB2}
,465:{name:"鹿島",type:ST.CT,seek:9,seek2:36,na:NA.Japan,sg:SG.LowB}
,466:{name:"翔鶴改二甲",type:ST.CVB,seek:50,seek2:90,na:NA.Japan,sg:SG.HighA}
,467:{name:"瑞鶴改二甲",type:ST.CVB,seek:50,seek2:90,na:NA.Japan,sg:SG.HighA}
,468:{name:"朝潮改二丁",type:ST.DD,seek:10,seek2:55,na:NA.Japan,sg:SG.HighB2}
,469:{name:"江風改二",type:ST.DD,seek:13,seek2:53,na:NA.Japan,sg:SG.HighB2}
,470:{name:"霞改二乙",type:ST.DD,seek:15,seek2:56,na:NA.Japan,sg:SG.HighB2}
,471:{name:"神風",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.HighB2}
,472:{name:"朝風",type:ST.DD,seek:6,seek2:19,na:NA.Japan,sg:SG.HighB2}
,473:{name:"春風",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,474:{name:"松風",type:ST.DD,seek:4,seek2:18,na:NA.Japan,sg:SG.HighB2}
,475:{name:"旗風",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,476:{name:"神風改",type:ST.DD,seek:7,seek2:42,na:NA.Japan,sg:SG.HighB2}
,477:{name:"天龍改二",type:ST.CL,seek:12,seek2:53,na:NA.Japan,sg:SG.HighB2}
,478:{name:"龍田改二",type:ST.CL,seek:10,seek2:52,na:NA.Japan,sg:SG.HighB2}
,479:{name:"天霧",type:ST.DD,seek:5,seek2:20,na:NA.Japan,sg:SG.HighB2}
,480:{name:"狭霧",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,481:{name:"水無月",type:ST.DD,seek:4,seek2:17,na:NA.Japan,sg:SG.HighB2}
,483:{name:"伊26",type:ST.SS,seek:10,seek2:39,na:NA.Japan,sg:SG.LowC}
,484:{name:"浜波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.HighB2}
,485:{name:"藤波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.HighB2}
,486:{name:"浦波",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,487:{name:"鬼怒改二",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.HighB2}
,488:{name:"由良改二",type:ST.CL,seek:17,seek2:64,na:NA.Japan,sg:SG.HighB2}
,489:{name:"満潮改二",type:ST.DD,seek:10,seek2:55,na:NA.Japan,sg:SG.HighB2}
,490:{name:"荒潮改二",type:ST.DD,seek:11,seek2:52,na:NA.Japan,sg:SG.HighB2}
,491:{name:"Commandant Teste",type:ST.AV,seek:32,seek2:70,na:NA.France,sg:SG.LowB}
,492:{name:"Richelieu",type:ST.BB,seek:14,seek2:50,na:NA.France,sg:SG.HighB2}
,493:{name:"伊400",type:ST.SSV,seek:15,seek2:46,na:NA.Japan,sg:SG.LowC}
,494:{name:"伊13",type:ST.SSV,seek:13,seek2:43,na:NA.Japan,sg:SG.LowC}
,495:{name:"伊14",type:ST.SSV,seek:14,seek2:44,na:NA.Japan,sg:SG.LowC}
,496:{name:"Zara due",type:ST.CA,seek:19,seek2:64,na:NA.France,sg:SG.HighB2}
,497:{name:"白露改二",type:ST.DD,seek:10,seek2:50,na:NA.Japan,sg:SG.HighB2}
,498:{name:"村雨改二",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.HighB2}
,499:{name:"神威改",type:ST.AV,seek:22,seek2:48,na:NA.Japan,sg:SG.LowB}
,500:{name:"神威改母",type:ST.AO,seek:24,seek2:54,na:NA.Japan,sg:SG.LowB}
,501:{name:"最上改二",type:ST.CAV,seek:28,seek2:86,na:NA.Japan,sg:SG.HighA}
,503:{name:"鈴谷改二",type:ST.CAV,seek:26,seek2:83,na:NA.Japan,sg:SG.HighA}
,504:{name:"熊野改二",type:ST.CAV,seek:25,seek2:81,na:NA.Japan,sg:SG.HighA}
,506:{name:"最上改二特",type:ST.CAV,seek:24,seek2:80,na:NA.Japan,sg:SG.HighA}
,508:{name:"鈴谷航改二",type:ST.CVL,seek:46,seek2:85,na:NA.Japan,sg:SG.HighA}
,509:{name:"熊野航改二",type:ST.CVL,seek:45,seek2:83,na:NA.Japan,sg:SG.HighA}
,511:{name:"Гангут",type:ST.BB,seek:8,seek2:30,na:NA.USSR,sg:SG.LowB}
,512:{name:"Октябрьская революция",type:ST.BB,seek:10,seek2:36,na:NA.USSR,sg:SG.LowB}
,513:{name:"Гангут два",type:ST.BB,seek:14,seek2:38,na:NA.USSR,sg:SG.LowB}
,514:{name:"Sheffield",type:ST.CL,seek:22,seek2:68,na:NA.UK,sg:SG.HighB2}
,515:{name:"Ark Royal",type:ST.CV,seek:40,seek2:72,na:NA.UK,sg:SG.HighB2}
,516:{name:"Ташкент",type:ST.DD,seek:7,seek2:36,na:NA.USSR,sg:SG.HighA}
,517:{name:"占守",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,518:{name:"国後",type:ST.DE,seek:4,seek2:14,na:NA.Japan,sg:SG.LowB}
,519:{name:"Jervis",type:ST.DD,seek:10,seek2:22,na:NA.UK,sg:SG.HighB2}
,520:{name:"Janus",type:ST.DD,seek:10,seek2:20,na:NA.UK,sg:SG.HighB2}
,521:{name:"春日丸",type:ST.CVL,seek:28,seek2:48,na:NA.Japan,sg:SG.LowB}
,522:{name:"八幡丸",type:ST.CVL,seek:28,seek2:47,na:NA.Japan,sg:SG.LowB}
,524:{name:"択捉",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.LowB}
,525:{name:"松輪",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.LowB}
,526:{name:"大鷹",type:ST.CVL,seek:30,seek2:52,na:NA.Japan,sg:SG.LowB}
,527:{name:"岸波",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.HighB2}
,528:{name:"早波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.HighB2}
,529:{name:"大鷹改二",type:ST.CVL,seek:40,seek2:68,na:NA.Japan,sg:SG.LowB}
,530:{name:"伊504",type:ST.SS,seek:10,seek2:32,na:NA.Japan,sg:SG.LowC}
,531:{name:"佐渡",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.LowB}
,532:{name:"涼月",type:ST.DD,seek:8,seek2:27,na:NA.Japan,sg:SG.HighB2}
,533:{name:"冬月",type:ST.DD,seek:8,seek2:28,na:NA.Japan,sg:SG.HighB2}
,534:{name:"神鷹",type:ST.CVL,seek:28,seek2:48,na:NA.Japan,sg:SG.LowB}
,535:{name:"Luigi Torelli",type:ST.SS,seek:6,seek2:24,na:NA.Italia,sg:SG.LowC}
,536:{name:"神鷹改二",type:ST.CVL,seek:32,seek2:64,na:NA.Japan,sg:SG.LowB}
,537:{name:"涼月改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.HighB2}
,538:{name:"冬月改",type:ST.DD,seek:9,seek2:49,na:NA.Japan,sg:SG.HighB2}
,539:{name:"UIT-25",type:ST.SS,seek:9,seek2:30,na:NA.Italia,sg:SG.LowC}
,540:{name:"対馬",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,541:{name:"長門改二",type:ST.BB,seek:16,seek2:55,na:NA.Japan,sg:SG.LowA}
,542:{name:"夕雲改二",type:ST.DD,seek:12,seek2:46,na:NA.Japan,sg:SG.HighB2}
,543:{name:"長波改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.HighB2}
,544:{name:"Gambier Bay",type:ST.CVL,seek:36,seek2:60,na:NA.USA,sg:SG.LowB}
,545:{name:"Saratoga Mk.II",type:ST.CV,seek:54,seek2:93,na:NA.USA,sg:SG.HighB2}
,546:{name:"武蔵改二",type:ST.BB,seek:18,seek2:58,na:NA.Japan,sg:SG.LowA}
,547:{name:"多摩改二",type:ST.CL,seek:14,seek2:61,na:NA.Japan,sg:SG.HighB2}
,548:{name:"文月改二",type:ST.DD,seek:11,seek2:47,na:NA.Japan,sg:SG.HighB2}
,549:{name:"Intrepid",type:ST.CV,seek:50,seek2:80,na:NA.USA,sg:SG.HighB2}
,550:{name:"Saratoga Mk.II Mod.2",type:ST.CVB,seek:56,seek2:95,na:NA.USA,sg:SG.HighB2}
,551:{name:"日振",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.LowB}
,552:{name:"大東",type:ST.DE,seek:3,seek2:12,na:NA.Japan,sg:SG.LowB}
,553:{name:"伊勢改二",type:ST.BBV,seek:30,seek2:72,na:NA.Japan,sg:SG.LowB}
,554:{name:"日向改二",type:ST.BBV,seek:32,seek2:75,na:NA.Japan,sg:SG.LowB}
,555:{name:"瑞鳳改二",type:ST.CVL,seek:40,seek2:80,na:NA.Japan,sg:SG.HighB2}
,556:{name:"浦風丁改",type:ST.DD,seek:10,seek2:48,na:NA.Japan,sg:SG.HighB2}
,557:{name:"磯風乙改",type:ST.DD,seek:10,seek2:52,na:NA.Japan,sg:SG.HighB2}
,558:{name:"浜風乙改",type:ST.DD,seek:9,seek2:47,na:NA.Japan,sg:SG.HighB2}
,559:{name:"谷風丁改",type:ST.DD,seek:8,seek2:42,na:NA.Japan,sg:SG.HighB2}
,560:{name:"瑞鳳改二乙",type:ST.CVL,seek:40,seek2:77,na:NA.Japan,sg:SG.HighB2}
,561:{name:"Samuel B.Roberts",type:ST.DD,seek:12,seek2:20,na:NA.USA,sg:SG.LowB2}
,562:{name:"Johnston",type:ST.DD,seek:20,seek2:32,na:NA.USA,sg:SG.HighB2}
,563:{name:"巻雲改二",type:ST.DD,seek:11,seek2:43,na:NA.Japan,sg:SG.HighB2}
,564:{name:"風雲改二",type:ST.DD,seek:10,seek2:45,na:NA.Japan,sg:SG.HighB2}
,565:{name:"福江",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,566:{name:"陽炎改二",type:ST.DD,seek:10,seek2:42,na:NA.Japan,sg:SG.HighB2}
,567:{name:"不知火改二",type:ST.DD,seek:11,seek2:43,na:NA.Japan,sg:SG.HighB2}
,568:{name:"黒潮改二",type:ST.DD,seek:11,seek2:41,na:NA.Japan,sg:SG.HighB2}
,569:{name:"沖波改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,570:{name:"平戸",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.LowB}
,571:{name:"Nelson",type:ST.BB,seek:12,seek2:42,na:NA.UK,sg:SG.LowB}
,572:{name:"Rodney",type:ST.BB,seek:12,seek2:43,na:NA.UK,sg:SG.LowB}
,573:{name:"陸奥改二",type:ST.BB,seek:15,seek2:56,na:NA.Japan,sg:SG.LowA}
,574:{name:"Gotland",type:ST.CL,seek:45,seek2:70,na:NA.Other,sg:SG.HighB2}
,575:{name:"Maestrale",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.HighB2}
,576:{name:"Nelson改",type:ST.BB,seek:14,seek2:48,na:NA.UK,sg:SG.LowB}
,577:{name:"Rodney改",type:ST.BB,seek:13,seek2:48,na:NA.UK,sg:SG.LowB}
,578:{name:"朝霜改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,579:{name:"Gotland改",type:ST.CL,seek:18,seek2:55,na:NA.Other,sg:SG.HighB2}
,580:{name:"Maestrale改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.HighB2}
,581:{name:"日進",type:ST.AV,seek:40,seek2:80,na:NA.Japan,sg:SG.HighC}
,582:{name:"夏雲",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,583:{name:"峯雲",type:ST.DD,seek:5,seek2:18,na:NA.Japan,sg:SG.HighB2}
,584:{name:"八丈",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,585:{name:"石垣",type:ST.DE,seek:4,seek2:15,na:NA.Japan,sg:SG.LowB}
,586:{name:"日進甲",type:ST.AV,seek:48,seek2:96,na:NA.Japan,sg:SG.HighC}
,587:{name:"海風改二",type:ST.DD,seek:11,seek2:51,na:NA.Japan,sg:SG.HighB2}
,588:{name:"山風改二",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.HighB2}
,589:{name:"L.d.S.D.d.Abruzzi",type:ST.CL,seek:12,seek2:41,na:NA.Italia,sg:SG.HighB2}
,590:{name:"G.Garibaldi",type:ST.CL,seek:12,seek2:40,na:NA.Italia,sg:SG.HighB2}
,591:{name:"金剛改二丙",type:ST.BB,seek:17,seek2:51,na:NA.Japan,sg:SG.HighB2}
,592:{name:"比叡改二丙",type:ST.BB,seek:17,seek2:53,na:NA.Japan,sg:SG.HighB2}
,593:{name:"榛名改二乙",type:ST.BB,seek:16,seek2:53,na:NA.Japan,sg:SG.HighB2}
,594:{name:"赤城改二",type:ST.CV,seek:51,seek2:91,na:NA.Japan,sg:SG.HighB2}
,595:{name:"Houston",type:ST.CA,seek:15,seek2:50,na:NA.USA,sg:SG.HighB2}
,596:{name:"Fletcher",type:ST.DD,seek:20,seek2:33,na:NA.USA,sg:SG.HighB2}
,597:{name:"Atlanta",type:ST.CL,seek:11,seek2:40,na:NA.USA,sg:SG.HighB2}
,598:{name:"Honolulu",type:ST.CL,seek:17,seek2:65,na:NA.USA,sg:SG.HighB2}
,599:{name:"赤城改二戊",type:ST.CV,seek:50,seek2:90,na:NA.Japan,sg:SG.HighB2}
,600:{name:"Houston改",type:ST.CA,seek:16,seek2:53,na:NA.USA,sg:SG.HighB2}
,601:{name:"Colorado",type:ST.BB,seek:9,seek2:37,na:NA.USA,sg:SG.LowB}
,602:{name:"South Dakota",type:ST.BB,seek:15,seek2:48,na:NA.USA,sg:SG.HighB2}
,603:{name:"Hornet",type:ST.CV,seek:45,seek2:70,na:NA.USA,sg:SG.HighB2}
,604:{name:"De Ruyter",type:ST.CL,seek:10,seek2:42,na:NA.Other,sg:SG.HighB2}
,605:{name:"Luigi Torelli改",type:ST.SS,seek:8,seek2:28,na:NA.Italia,sg:SG.LowC}
,606:{name:"伊400改",type:ST.SSV,seek:16,seek2:46,na:NA.Japan,sg:SG.LowC}
,607:{name:"伊47改",type:ST.SS,seek:11,seek2:30,na:NA.Japan,sg:SG.LowC}
,609:{name:"De Ruyter改",type:ST.CL,seek:12,seek2:55,na:NA.Other,sg:SG.HighB2}
,610:{name:"加賀改二戊",type:ST.CV,seek:50,seek2:89,na:NA.Japan,sg:SG.HighC}
,611:{name:"御蔵",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.LowB}
,612:{name:"屋代",type:ST.DE,seek:3,seek2:15,na:NA.Japan,sg:SG.LowB}
,613:{name:"Perth",type:ST.CL,seek:9,seek2:40,na:NA.Other,sg:SG.HighB2}
,614:{name:"Grecale",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.HighB2}
,615:{name:"Helena",type:ST.CL,seek:18,seek2:64,na:NA.USA,sg:SG.HighB2}
,616:{name:"御蔵改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.LowB}
,617:{name:"屋代改",type:ST.DE,seek:5,seek2:30,na:NA.Japan,sg:SG.LowB}
,618:{name:"Perth改",type:ST.CL,seek:10,seek2:50,na:NA.Other,sg:SG.HighB2}
,619:{name:"Grecale改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.HighB2}
,620:{name:"Helena改",type:ST.CL,seek:24,seek2:76,na:NA.USA,sg:SG.HighB2}
,621:{name:"神州丸",type:ST.LHA,seek:20,seek2:52,na:NA.Japan,sg:SG.LowB}
,622:{name:"夕張改二",type:ST.CL,seek:11,seek2:52,na:NA.Japan,sg:SG.HighB2}
,623:{name:"夕張改二特",type:ST.CL,seek:10,seek2:50,na:NA.Japan,sg:SG.LowB2}
,624:{name:"夕張改二丁",type:ST.CL,seek:12,seek2:54,na:NA.Japan,sg:SG.HighB2}
,625:{name:"秋霜",type:ST.DD,seek:6,seek2:20,na:NA.Japan,sg:SG.HighB2}
,626:{name:"神州丸改",type:ST.LHA,seek:24,seek2:58,na:NA.Japan,sg:SG.LowB}
,627:{name:"敷波改二",type:ST.DD,seek:11,seek2:48,na:NA.Japan,sg:SG.HighB2}
,628:{name:"Fletcher改 Mod.2",type:ST.DD,seek:22,seek2:64,na:NA.USA,sg:SG.HighB2}
,629:{name:"Fletcher Mk.II",type:ST.DD,seek:23,seek2:66,na:NA.USA,sg:SG.HighB2}
,630:{name:"Gotland andra",type:ST.CL,seek:46,seek2:72,na:NA.Other,sg:SG.HighB2}
,631:{name:"薄雲",type:ST.DD,seek:4,seek2:19,na:NA.Japan,sg:SG.HighB2}
,632:{name:"有明",type:ST.DD,seek:5,seek2:19,na:NA.Japan,sg:SG.HighB2}
,633:{name:"夕暮",type:ST.DD,seek:5,seek2:20,na:NA.Japan,sg:SG.HighB2}
,634:{name:"迅鯨",type:ST.AS,seek:20,seek2:38,na:NA.Japan,sg:SG.LowB}
,635:{name:"長鯨",type:ST.AS,seek:20,seek2:37,na:NA.Japan,sg:SG.LowB}
,636:{name:"伊47",type:ST.SS,seek:7,seek2:27,na:NA.Japan,sg:SG.LowC}
,637:{name:"第四号海防艦",type:ST.DE,seek:2,seek2:11,na:NA.Japan,sg:SG.LowB}
,638:{name:"第三〇号海防艦",type:ST.DE,seek:2,seek2:11,na:NA.Japan,sg:SG.LowB}
,639:{name:"迅鯨改",type:ST.AS,seek:22,seek2:44,na:NA.Japan,sg:SG.LowB}
,640:{name:"長鯨改",type:ST.AS,seek:22,seek2:43,na:NA.Japan,sg:SG.LowB}
,641:{name:"松",type:ST.DD,seek:10,seek2:25,na:NA.Japan,sg:SG.HighB2}
,642:{name:"竹",type:ST.DD,seek:9,seek2:24,na:NA.Japan,sg:SG.HighB2}
,643:{name:"梅",type:ST.DD,seek:11,seek2:24,na:NA.Japan,sg:SG.HighB2}
,644:{name:"桃",type:ST.DD,seek:8,seek2:24,na:NA.Japan,sg:SG.HighB2}
,645:{name:"宗谷",type:ST.AO,seek:9,seek2:18,na:NA.Japan,sg:SG.LowB}
,646:{name:"加賀改二護",type:ST.CV,seek:54,seek2:93,na:NA.Japan,sg:SG.HighC}
,647:{name:"浦波改二",type:ST.DD,seek:12,seek2:44,na:NA.Japan,sg:SG.HighB2}
,648:{name:"秋雲改二",type:ST.DD,seek:10,seek2:42,na:NA.Japan,sg:SG.HighB2}
,649:{name:"高波改二",type:ST.DD,seek:14,seek2:60,na:NA.Japan,sg:SG.HighB2}
,650:{name:"宗谷",type:ST.AO,seek:16,seek2:32,na:NA.Japan,sg:SG.LowB}
,651:{name:"丹陽",type:ST.DD,seek:15,seek2:50,na:NA.Japan,sg:SG.HighB2}
,652:{name:"球磨改二",type:ST.CL,seek:13,seek2:58,na:NA.Japan,sg:SG.HighB2}
,653:{name:"Scirocco",type:ST.DD,seek:7,seek2:20,na:NA.Italia,sg:SG.HighB2}
,654:{name:"Washington",type:ST.BB,seek:14,seek2:46,na:NA.USA,sg:SG.HighB2}
,655:{name:"Northampton",type:ST.CA,seek:14,seek2:51,na:NA.USA,sg:SG.HighB2}
,656:{name:"雪風改二",type:ST.DD,seek:14,seek2:48,na:NA.Japan,sg:SG.HighB2}
,657:{name:"球磨改二丁",type:ST.CL,seek:13,seek2:53,na:NA.Japan,sg:SG.HighB2}
,658:{name:"Scirocco改",type:ST.DD,seek:10,seek2:46,na:NA.Italia,sg:SG.HighB2}
,659:{name:"Washington改",type:ST.BB,seek:18,seek2:62,na:NA.USA,sg:SG.HighB2}
,660:{name:"Northampton改",type:ST.CA,seek:15,seek2:52,na:NA.USA,sg:SG.HighB2}
,662:{name:"能代改二",type:ST.CL,seek:15,seek2:61,na:NA.Japan,sg:SG.HighB1}
,663:{name:"矢矧改二",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.HighB1}
,665:{name:"曙改二",type:ST.DD,seek:10,seek2:46,na:NA.Japan,sg:SG.HighB2}
,666:{name:"磯波改二",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.HighB2}
,667:{name:"山風改二丁",type:ST.DD,seek:8,seek2:41,na:NA.Japan,sg:SG.HighB2}
,668:{name:"矢矧改二乙",type:ST.CL,seek:15,seek2:60,na:NA.Japan,sg:SG.HighB1}
,670:{name:"親潮改二",type:ST.DD,seek:9,seek2:42,na:NA.Japan,sg:SG.HighB2}
,671:{name:"巻波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.HighB2}
,674:{name:"玉波",type:ST.DD,seek:9,seek2:23,na:NA.Japan,sg:SG.HighB2}
,675:{name:"涼波",type:ST.DD,seek:9,seek2:22,na:NA.Japan,sg:SG.HighB2}
,678:{name:"日振改",type:ST.DE,seek:6,seek2:29,na:NA.Japan,sg:SG.LowB}
,679:{name:"大東改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,680:{name:"浜波改",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.HighB2}
,681:{name:"Samuel B.Roberts改",type:ST.DD,seek:14,seek2:48,na:NA.USA,sg:SG.LowB2}
,684:{name:"平戸改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.LowB}
,685:{name:"福江改",type:ST.DE,seek:5,seek2:27,na:NA.Japan,sg:SG.LowB}
,686:{name:"岸波改",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,687:{name:"峯雲改",type:ST.DD,seek:8,seek2:37,na:NA.Japan,sg:SG.HighB2}
,688:{name:"早波改",type:ST.DD,seek:12,seek2:55,na:NA.Japan,sg:SG.HighB2}
,689:{name:"Johnston改",type:ST.DD,seek:20,seek2:60,na:NA.USA,sg:SG.HighB2}
,690:{name:"日進改",type:ST.AV,seek:48,seek2:95,na:NA.Japan,sg:SG.HighC}
,691:{name:"G.Garibaldi改",type:ST.CL,seek:13,seek2:48,na:NA.Italia,sg:SG.HighB2}
,692:{name:"Fletcher改",type:ST.DD,seek:20,seek2:62,na:NA.USA,sg:SG.HighB2}
,693:{name:"L.d.S.D.d.Abruzzi改",type:ST.CL,seek:13,seek2:49,na:NA.Italia,sg:SG.HighB2}
,695:{name:"秋霜改",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.HighB2}
,696:{name:"Atlanta改",type:ST.CL,seek:11,seek2:50,na:NA.USA,sg:SG.HighB2}
,697:{name:"South Dakota改",type:ST.BB,seek:18,seek2:60,na:NA.USA,sg:SG.HighB2}
,698:{name:"加賀改二",type:ST.CV,seek:51,seek2:90,na:NA.Japan,sg:SG.HighC}
,699:{name:"宗谷",type:ST.AO,seek:2,seek2:12,na:NA.Japan,sg:SG.LowB}
,700:{name:"薄雲改",type:ST.DD,seek:7,seek2:41,na:NA.Japan,sg:SG.HighB2}
,701:{name:"第四号海防艦改",type:ST.DE,seek:4,seek2:20,na:NA.Japan,sg:SG.LowB}
,702:{name:"松改",type:ST.DD,seek:15,seek2:45,na:NA.Japan,sg:SG.HighB2}
,703:{name:"有明改",type:ST.DD,seek:6,seek2:39,na:NA.Japan,sg:SG.HighB2}
,704:{name:"Hornet改",type:ST.CV,seek:49,seek2:90,na:NA.USA,sg:SG.HighB2}
,705:{name:"Sheffield改",type:ST.CL,seek:24,seek2:72,na:NA.UK,sg:SG.HighB2}
,706:{name:"竹改",type:ST.DD,seek:14,seek2:43,na:NA.Japan,sg:SG.HighB2}
,707:{name:"Gambier Bay Mk.II",type:ST.CVL,seek:39,seek2:70,na:NA.USA,sg:SG.LowB}
,708:{name:"桃改",type:ST.DD,seek:13,seek2:43,na:NA.Japan,sg:SG.HighB2}
,709:{name:"巻波改",type:ST.DD,seek:11,seek2:54,na:NA.Japan,sg:SG.HighB2}
,710:{name:"涼波改",type:ST.DD,seek:10,seek2:54,na:NA.Japan,sg:SG.HighB2}
,711:{name:"Honolulu改",type:ST.CL,seek:22,seek2:76,na:NA.USA,sg:SG.HighB2}
,712:{name:"第三〇号海防艦改",type:ST.DE,seek:4,seek2:19,na:NA.Japan,sg:SG.LowB}
,713:{name:"Victorious改",type:ST.CVB,seek:46,seek2:85,na:NA.UK,sg:SG.HighB2}
,714:{name:"昭南改",type:ST.DE,seek:6,seek2:28,na:NA.Japan,sg:SG.LowB}
,715:{name:"Scamp改",type:ST.SS,seek:13,seek2:43,na:NA.USA,sg:SG.LowC}
,716:{name:"梅改",type:ST.DD,seek:16,seek2:45,na:NA.Japan,sg:SG.HighB2}
,717:{name:"山汐丸改",type:ST.AO,seek:23,seek2:63,na:NA.Japan,sg:SG.LowB}
,718:{name:"玉波改",type:ST.DD,seek:12,seek2:53,na:NA.Japan,sg:SG.HighB2}
,719:{name:"伊201改",type:ST.SS,seek:13,seek2:48,na:NA.Japan,sg:SG.LowD}
,720:{name:"早潮改",type:ST.DD,seek:9,seek2:41,na:NA.Japan,sg:SG.HighB2}
,721:{name:"夏雲改",type:ST.DD,seek:6,seek2:36,na:NA.Japan,sg:SG.HighB2}
,722:{name:"Brooklyn改",type:ST.CL,seek:22,seek2:77,na:NA.USA,sg:SG.HighB2}
,723:{name:"Ranger改",type:ST.CV,seek:40,seek2:82,na:NA.USA,sg:SG.HighB2}
,724:{name:"Jean Bart改",type:ST.BB,seek:15,seek2:53,na:NA.France,sg:SG.HighB2}
,725:{name:"夕暮改",type:ST.DD,seek:6,seek2:40,na:NA.Japan,sg:SG.HighB2}
,726:{name:"Heywood L.E.改",type:ST.DD,seek:20,seek2:61,na:NA.USA,sg:SG.HighB2}
,727:{name:"第百一号輸送艦改",type:ST.LHA,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,728:{name:"第二十二号海防艦改",type:ST.DE,seek:4,seek2:22,na:NA.Japan,sg:SG.LowB}
,729:{name:"白雲改",type:ST.DD,seek:5,seek2:40,na:NA.Japan,sg:SG.HighB2}
,730:{name:"稲木改",type:ST.DE,seek:4,seek2:24,na:NA.Japan,sg:SG.LowB}
,731:{name:"C.Cappellini改",type:ST.SS,seek:7,seek2:28,na:NA.Italia,sg:SG.LowC}
,877:{name:"Conte di Cavour",type:ST.BB,seek:6,seek2:29,na:NA.Italia,sg:SG.HighB2}
,878:{name:"Conte di Cavour改",type:ST.BB,seek:11,seek2:40,na:NA.Italia,sg:SG.HighB2}
,879:{name:"Conte di Cavour nuovo",type:ST.BB,seek:18,seek2:58,na:NA.Italia,sg:SG.HighB2}
,881:{name:"伊201",type:ST.SS,seek:8,seek2:39,na:NA.Japan,sg:SG.LowD}
,882:{name:"伊203",type:ST.SS,seek:8,seek2:38,na:NA.Japan,sg:SG.LowD}
,883:{name:"龍鳳改二戊",type:ST.CVL,seek:30,seek2:77,na:NA.Japan,sg:SG.LowB}
,884:{name:"雲鷹",type:ST.CVL,seek:29,seek2:52,na:NA.Japan,sg:SG.LowB}
,885:{name:"Victorious",type:ST.CVB,seek:39,seek2:73,na:NA.UK,sg:SG.HighB2}
,886:{name:"早潮",type:ST.DD,seek:9,seek2:19,na:NA.Japan,sg:SG.HighB2}
,887:{name:"伊203改",type:ST.SS,seek:14,seek2:48,na:NA.Japan,sg:SG.LowD}
,888:{name:"龍鳳改二",type:ST.CVL,seek:33,seek2:80,na:NA.Japan,sg:SG.HighB2}
,889:{name:"雲鷹改二",type:ST.CVL,seek:37,seek2:66,na:NA.Japan,sg:SG.LowB}
,891:{name:"Salmon",type:ST.SS,seek:10,seek2:42,na:NA.USA,sg:SG.LowC}
,893:{name:"Janus改",type:ST.DD,seek:12,seek2:52,na:NA.UK,sg:SG.HighB2}
,894:{name:"鳳翔改二",type:ST.CVL,seek:43,seek2:82,na:NA.Japan,sg:SG.LowE}
,895:{name:"昭南",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.LowB}
,896:{name:"Brooklyn",type:ST.CL,seek:18,seek2:67,na:NA.USA,sg:SG.HighB2}
,897:{name:"Salmon改",type:ST.SS,seek:12,seek2:45,na:NA.USA,sg:SG.LowC}
,898:{name:"第二十二号海防艦",type:ST.DE,seek:2,seek2:13,na:NA.Japan,sg:SG.LowB}
,899:{name:"鳳翔改二戦",type:ST.CVL,seek:36,seek2:76,na:NA.Japan,sg:SG.LowE}
,900:{name:"山汐丸",type:ST.AO,seek:13,seek2:53,na:NA.Japan,sg:SG.LowB}
,901:{name:"Javelin",type:ST.DD,seek:10,seek2:21,na:NA.UK,sg:SG.HighB2}
,903:{name:"天霧改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,904:{name:"能美",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,905:{name:"倉橋",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.LowB}
,906:{name:"Javelin改",type:ST.DD,seek:12,seek2:53,na:NA.UK,sg:SG.HighB2}
,908:{name:"天霧改二丁",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighB2}
,909:{name:"能美改",type:ST.DE,seek:5,seek2:28,na:NA.Japan,sg:SG.LowB}
,910:{name:"倉橋改",type:ST.DE,seek:5,seek2:29,na:NA.Japan,sg:SG.LowB}
,911:{name:"大和改二",type:ST.BB,seek:18,seek2:59,na:NA.Japan,sg:SG.HighB1}
,913:{name:"Maryland",type:ST.BB,seek:9,seek2:36,na:NA.USA,sg:SG.LowB}
,915:{name:"早潮改二",type:ST.DD,seek:10,seek2:41,na:NA.Japan,sg:SG.HighB2}
,916:{name:"大和改二重",type:ST.BBV,seek:20,seek2:68,na:NA.Japan,sg:SG.LowA}
,918:{name:"Maryland改",type:ST.BB,seek:16,seek2:51,na:NA.USA,sg:SG.LowB}
,920:{name:"Samuel B.Roberts Mk.II",type:ST.DD,seek:15,seek2:52,na:NA.USA,sg:SG.HighC}
,921:{name:"鵜来",type:ST.DE,seek:3,seek2:14,na:NA.Japan,sg:SG.LowB}
,922:{name:"稲木",type:ST.DE,seek:3,seek2:13,na:NA.Japan,sg:SG.LowB}
,923:{name:"Tuscaloosa",type:ST.CA,seek:15,seek2:55,na:NA.USA,sg:SG.HighB2}
,924:{name:"Nevada",type:ST.BB,seek:8,seek2:36,na:NA.USA,sg:SG.LowB}
,925:{name:"Langley",type:ST.CVL,seek:40,seek2:68,na:NA.USA,sg:SG.HighB2}
,926:{name:"鵜来改",type:ST.DE,seek:5,seek2:27,na:NA.Japan,sg:SG.LowB}
,928:{name:"Tuscaloosa改",type:ST.CA,seek:16,seek2:57,na:NA.USA,sg:SG.HighB2}
,929:{name:"Nevada改",type:ST.BB,seek:13,seek2:50,na:NA.USA,sg:SG.LowB}
,930:{name:"Langley改",type:ST.CVL,seek:50,seek2:80,na:NA.USA,sg:SG.HighB2}
,931:{name:"Ranger",type:ST.CV,seek:38,seek2:68,na:NA.USA,sg:SG.HighB2}
,933:{name:"Massachusetts",type:ST.BB,seek:15,seek2:47,na:NA.USA,sg:SG.HighB2}
,934:{name:"C.Cappellini",type:ST.SS,seek:5,seek2:24,na:NA.Italia,sg:SG.LowC}
,935:{name:"Jean Bart",type:ST.BB,seek:12,seek2:48,na:NA.France,sg:SG.HighB2}
,936:{name:"Nevada改 Mod.2",type:ST.BB,seek:15,seek2:52,na:NA.USA,sg:SG.LowB}
,938:{name:"Massachusetts改",type:ST.BB,seek:18,seek2:59,na:NA.USA,sg:SG.HighB2}
,939:{name:"UIT-24",type:ST.SS,seek:9,seek2:31,na:NA.Italia,sg:SG.LowC}
,940:{name:"伊503",type:ST.SS,seek:10,seek2:33,na:NA.Japan,sg:SG.LowC}
,941:{name:"Heywood L.E.",type:ST.DD,seek:20,seek2:33,na:NA.USA,sg:SG.HighB2}
,943:{name:"熊野丸",type:ST.LHA,seek:13,seek2:56,na:NA.Japan,sg:SG.LowB}
,945:{name:"第百一号輸送艦",type:ST.LHA,seek:2,seek2:9,na:NA.Japan,sg:SG.LowB}
,948:{name:"熊野丸改",type:ST.LHA,seek:15,seek2:60,na:NA.Japan,sg:SG.LowB}
,951:{name:"天津風改二",type:ST.DD,seek:10,seek2:44,na:NA.Japan,sg:SG.HighA}
,953:{name:"朝日",type:ST.CT,seek:1,seek2:3,na:NA.Japan,sg:SG.LowB}
,954:{name:"榛名改二丙",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.HighB1}
,955:{name:"清霜改二",type:ST.DD,seek:9,seek2:43,na:NA.Japan,sg:SG.HighB2}
,958:{name:"朝日改",type:ST.AR,seek:1,seek2:4,na:NA.Japan,sg:SG.LowB}
,959:{name:"深雪改二",type:ST.DD,seek:13,seek2:51,na:NA.Japan,sg:SG.HighB2}
,960:{name:"清霜改二丁",type:ST.DD,seek:12,seek2:50,na:NA.Japan,sg:SG.HighB2}
,961:{name:"時雨改三",type:ST.DD,seek:12,seek2:51,na:NA.Japan,sg:SG.HighB2}
,964:{name:"白雲",type:ST.DD,seek:3,seek2:19,na:NA.Japan,sg:SG.HighB2}
,1496:{name:"Colorado改",type:ST.BB,seek:16,seek2:52,na:NA.USA,sg:SG.LowB}
,502:{name:"三隈改二",type:ST.CAV,seek:25,seek2:82,na:NA.Japan,sg:SG.HighA}
,507:{name:"三隈改二特",type:ST.AV,seek:32,seek2:89,na:NA.Japan,sg:SG.HighA}
,971:{name:"伊36",type:ST.SSV,seek:9,seek2:31,na:NA.Japan,sg:SG.LowC}
,976:{name:"伊36改",type:ST.SSV,seek:10,seek2:33,na:NA.Japan,sg:SG.LowC}
,944:{name:"平安丸",type:ST.AS,seek:11,seek2:30,na:NA.Japan,sg:SG.LowB}
,949:{name:"平安丸改",type:ST.AS,seek:18,seek2:39,na:NA.Japan,sg:SG.LowB}
,892:{name:"Drum",type:ST.SS,seek:11,seek2:43,na:NA.Japan,sg:SG.LowC}
,732:{name:"Drum改",type:ST.SS,seek:12,seek2:43,na:NA.Japan,sg:SG.LowC}
,972:{name:"伊41",type:ST.SSV,seek:10,seek2:30,na:NA.Japan,sg:SG.LowC}
,977:{name:"伊41改",type:ST.SSV,seek:11,seek2:33,na:NA.Japan,sg:SG.LowC}
,975:{name:"春雨改二",type:ST.DD,seek:10,seek2:51,na:NA.Japan,sg:SG.HighB2}
,979:{name:"稲木改二",type:ST.DE,seek:5,seek2:42,na:NA.Japan,sg:SG.LowD}
,968:{name:"初月改二",type:ST.DD,seek:12,seek2:54,na:NA.Japan,sg:SG.HighB2}
,927:{name:"Valiant",type:ST.BB,seek:15,seek2:47,na:NA.UK,sg:SG.LowB}
,733:{name:"Valiant改",type:ST.BB,seek:18,seek2:59,na:NA.UK,sg:SG.LowB}
,962:{name:"Mogador",type:ST.DD,seek:8,seek2:38,na:NA.France,sg:SG.HighB2}
,967:{name:"Mogador改",type:ST.DD,seek:11,seek2:50,na:NA.France,sg:SG.HighB2}
,965:{name:"Gloire",type:ST.CL,seek:20,seek2:64,na:NA.France,sg:SG.HighB2}
,970:{name:"Gloire改",type:ST.CL,seek:24,seek2:76,na:NA.France,sg:SG.HighB2}
,969:{name:"Richelieu Deux",type:ST.BB,seek:19,seek2:58,na:NA.France,sg:SG.HighB2}
,952:{name:"Phoenix",type:ST.CL,seek:18,seek2:68,na:NA.USA,sg:SG.HighB2}
,734:{name:"Phoenix改",type:ST.CL,seek:22,seek2:78,na:NA.USA,sg:SG.HighB2}
,957:{name:"General Belgrano",type:ST.CL,seek:40,seek2:90,na:NA.USA,sg:SG.HighB2}
,966:{name:"Lexington",type:ST.CV,seek:40,seek2:67,na:NA.USA,sg:SG.HighB2}
,735:{name:"Lexington改",type:ST.CV,seek:46,seek2:80,na:NA.USA,sg:SG.HighB2}
,694:{name:"霧島改二丙",type:ST.BB,seek:16,seek2:52,na:NA.Japan,sg:SG.HighB2}
,956:{name:"早霜改二",type:ST.DD,seek:11,seek2:42,na:NA.Japan,sg:SG.HighB2}
,981:{name:"藤波改二",type:ST.DD,seek:12,seek2:56,na:NA.Japan,sg:SG.HighB2}
,986:{name:"白雪改二",type:ST.DD,seek:13,seek2:54,na:NA.Japan,sg:SG.HighB2}

,987:{name:"初雪改二",type:ST.DD,seek:10,seek2:52,na:NA.Japan,sg:SG.HighB2}

,984:{name:"Wahoo",type:ST.SS,seek:12,seek2:44,na:NA.USA,sg:SG.LowC}
,989:{name:"Wahoo改",type:ST.SS,seek:0,seek2:0,na:NA.USA,sg:SG.LowC}
,994:{name:"榧",type:ST.DD,seek:8,seek2:25,na:NA.Japan,sg:SG.HighB2}
,736:{name:"榧改",type:ST.DD,seek:15,seek2:46,na:NA.Japan,sg:SG.HighB2}
,995:{name:"大泊",type:ST.AO,seek:0,seek2:14,na:NA.Japan,sg:SG.LowB}
,1000:{name:"大泊改",type:ST.AO,seek:0,seek2:0,na:NA.Japan,sg:SG.LowB}
,1001:{name:"Киров",type:ST.CL,seek:13,seek2:42,na:NA.USSR,sg:SG.HighB1}
,1006:{name:"Киров改",type:ST.CL,seek:0,seek2:0,na:NA.USSR,sg:SG.HighB1}

,992:{name:"杉",type:ST.DD,seek:0,seek2:0,na:NA.Japan,sg:SG.HighB2}
,997:{name:"杉改",type:ST.DD,seek:0,seek2:0,na:NA.Japan,sg:SG.HighB2}
,1003:{name:"しまね丸",type:ST.AO,seek:0,seek2:0,na:NA.Japan,sg:SG.LowB}
,1008:{name:"しまね丸改",type:ST.AO,seek:0,seek2:0,na:NA.Japan,sg:SG.LowB}
,1005:{name:"Minneapolis",type:ST.CA,seek:0,seek2:0,na:NA.USA,sg:SG.HighB2}
,1010:{name:"Minneapolis改",type:ST.CA,seek:0,seek2:0,na:NA.USA,sg:SG.HighB2}
}; // @expansion

export default ship_datas;