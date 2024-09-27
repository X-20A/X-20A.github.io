const exs = [
    {
        id: "01",
        name: "練習航海",
        area: 1,
        time: "00:15",
    },
    {
        id: "02",
        name: "長距離練習航海",
        area: 1,
        time: "00:30"
    },
    {
        id: "03",
        name: "警備任務",
        area: 1,
        time: "00:20"
    },
    {
        id: "04",
        name: "対潜警戒任務",
        area: 1,
        time: "00:50"
    },
    {
        id: "05",
        name: "海上護衛任務",
        area: 1,
        time: "01:30"
    },
    {
        id: "06",
        name: "防空射撃演習",
        area: 1,
        time: "00:40"
    },
    {
        id: "07",
        name: "観艦式予行",
        area: 1,
        time: "01:00"
    },
    {
        id: "08",
        name: "観艦式",
        area: 1,
        time: "03:00"
    },
    {
        id: "A1",
        name: "兵站強化任務",
        area: 1,
        time: "00:25"
    },
    {
        id: "A2",
        name: "海峡警備行動",
        area: 1,
        time: "00:55"
    },
    {
        id: "A3",
        name: "長時間対潜警戒",
        area: 1,
        time: "02:15"
    },
    {
        id: "A4",
        name: "南西方面連絡線哨戒",
        area: 1,
        time: "01:50"
    },
    {
        id: "A5",
        name: "小笠原沖哨戒線 ",
        area: 1,
        time: "03:00"
    },
    {
        id: "A6",
        name: "小笠原沖戦闘哨戒",
        area: 1,
        time: "03:30"
    },
    {
        id: "09",
        name: "タンカー護衛任務",
        area: 2,
        time: "04:00"
    },
    {
        id: "10",
        name: "強行偵察任務",
        area: 2,
        time: "01:30"
    },
    {
        id: "11",
        name: "ボーキサイト輸送任務",
        area: 2,
        time: "05:00"
    },
    {
        id: "12",
        name: "資源輸送任務",
        area: 2,
        time: "08:00"
    },
    {
        id: "13",
        name: "鼠輸送作戦",
        area: 2,
        time: "04:00"
    },
    {
        id: "14",
        name: "包囲陸戦隊撤収作戦",
        area: 2,
        time: "06:00"
    },
    {
        id: "15",
        name: "囮機動部隊支援作戦",
        area: 2,
        time: "12:00"
    },
    {
        id: "16",
        name: "艦隊決戦援護作戦",
        area: 2,
        time: "15:00"
    },
    {
        id: "B1",
        name: "南西方面航空偵察作戦",
        area: 2,
        time: "00:35"
    },
    {
        id: "B2",
        name: "敵泊地強襲反撃作戦",
        area: 2,
        time: "08:40"
    },
    {
        id: "B3",
        name: "南西諸島離島哨戒作戦\t",
        area: 2,
        time: "02:50"
    },
    {
        id: "B4",
        name: "南西諸島離島防衛作戦",
        area: 2,
        time: "07:30"
    },
    {
        id: "B5",
        name: "南西諸島捜索撃滅戦",
        area: 2,
        time: "06:30"
    },
    {
        id: "B6",
        name: "精鋭水雷戦隊夜襲",
        area: 2,
        time: "05:50"
    },
    {
        id: "17",
        name: "敵地偵察作戦",
        area: 3,
        time: "00:45"
    },
    {
        id: "18",
        name: "航空機輸送作戦",
        area: 3,
        time: "05:00"
    },
    {
        id: "19",
        name: "北号作戦",
        area: 3,
        time: "06:00"
    },
    {
        id: "20",
        name: "潜水艦哨戒任務",
        area: 3,
        time: "02:00"
    },
    {
        id: "21",
        name: "北方鼠輸送作戦",
        area: 3,
        time: "02:20"
    },
    {
        id: "22",
        name: "艦隊演習",
        area: 3,
        time: "03:00"
    },
    {
        id: "23",
        name: "航空戦艦運用演習",
        area: 3,
        time: "04:00"
    },
    {
        id: "24",
        name: "北方航路海上護衛",
        area: 3,
        time: "08:20"
    },
    {
        id: "41",
        name: "ブルネイ泊地沖哨戒",
        area: 7,
        time: "01:00"
    },
    {
        id: "42",
        name: "ミ船団護衛(一号船団)",
        area: 7,
        time: "08:00"
    },
    {
        id: "43",
        name: "ミ船団護衛(二号船団)",
        area: 7,
        time: "12:00"
    },
    {
        id: "44",
        name: "航空装備輸送任務",
        area: 1,
        time: "10:00"
    },
    {
        id: "45",
        name: "ボーキサイト船団護衛",
        area: 7,
        time: "03:20"
    },
    {
        id: "46",
        name: "南西海域戦闘哨戒",
        area: 7,
        time: "03:30"
    },
    {
        id: "25",
        name: "通商破壊作戦",
        area: 4,
        time: "40:00"
    },
    {
        id: "26",
        name: "敵母港空襲作戦",
        area: 4,
        time: "80:00"
    },
    {
        id: "27",
        name: "潜水艦通商破壊作戦",
        area: 4,
        time: "20:00"
    },
    {
        id: "28",
        name: "西方海域封鎖作戦",
        area: 4,
        time: "25:00"
    },
    {
        id: "29",
        name: "潜水艦派遣演習",
        area: 4,
        time: "24:00"
    },
    {
        id: "30",
        name: "潜水艦派遣作戦",
        area: 4,
        time: "48:00"
    },
    {
        id: "31",
        name: "海外艦との接触",
        area: 4,
        time: "02:00"
    },
    {
        id: "32",
        name: "遠洋練習航海",
        area: 4,
        time: "24:00"
    },
    {
        id: "D1",
        name: "西方海域偵察作戦",
        area: 4,
        time: "02:00"
    },
    {
        id: "D2",
        name: "西方潜水艦作戦",
        area: 4,
        time: "10:00"
    },
    {
        id: "D3",
        name: "欧州方面友軍との接触",
        area: 4,
        time: "12:00"
    },
    {
        id: "33",
        name: "前衛支援任務",
        area: 5,
        time: "00:15"
    },
    {
        id: "34",
        name: "艦隊決戦支援任務",
        area: 5,
        time: "00:30"
    },
    {
        id: "35",
        name: "MO作戦",
        area: 5,
        time: "07:00"
    },
    {
        id: "36",
        name: "水上機基地建設",
        area: 5,
        time: "09:00"
    },
    {
        id: "37",
        name: "東京急行",
        area: 5,
        time: "02:45"
    },
    {
        id: "38",
        name: "東京急行(弐)",
        area: 5,
        time: "02:55"
    },
    {
        id: "39",
        name: "遠洋潜水艦作戦",
        area: 5,
        time: "30:00"
    },
    {
        id: "40",
        name: "水上機前線輸送",
        area: 5,
        time: "06:50"
    },
    {
        id: "E1",
        name: "ラバウル方面艦隊進出",
        area: 5,
        time: "07:30"
    },
    {
        id: "E2",
        name: "強行鼠輸送作戦",
        area: 5,
        time: "03:05"
    }
];
// データからレイアウトするともたるかな、分からない
let quest_json = [
    {
        id: 'Bm2',
        name: '「潜水艦隊」出撃せよ！',
        area: ['6-1'],
        zekamashi: "6-1-s",
        kiton: "任務「「潜水艦隊」出撃せよ！」-攻略"
    },
    {
        id: 'Bm8',
        name: '兵站線確保！海上警備を強化実施せよ！',
        area: ['1-2','1-3','1-4','2-1'],
        zekamashi: "heitan-kaizyoukeibi",
        kiton: "任務「兵站線確保！海上警備を強化実"
    }, // 以上マンスリー
    {
        id: 'Bq1',
        name: '沖ノ島海域迎撃戦',
        area: ['2-4'],
        zekamashi: "2-4-s-geigekisen",
        kiton: "クォータリー任務「沖ノ島海域迎撃戦"
    },
    {
        id: 'Bq2',
        name: '戦果拡張任務！「Z作戦」前段作戦',
        area: ['2-4','6-1','6-3','6-4'],
        zekamashi: "z-sakusen-zendan",
        kiton: "任務「戦果拡張任務！「z作戦」前段作"
    },
    {
        id: 'Bq3',
        name: '強行輸送艦隊、抜錨！',
        area: ['1-6'],
        zekamashi: "kyoukou-yusou",
        kiton: "任務「海上通商航路の警戒を厳とせよ"
    },
    {
        id: 'Bq4',
        name: '前線の航空偵察を実施せよ！',
        area: ['6-3'],
        zekamashi: "zensen-koukuuteisatu",
        kiton: "任務「前線の航空偵察を実施せよ！」"
    },
    {
        id: 'Bq5',
        name: '北方海域警備を実施せよ！',
        area: ['3-1','3-2','3-3'],
        zekamashi: "hoppoukeibi",
        kiton: "クォータリー任務「北方海域警備を実"
    },
    {
        id: 'Bq6',
        name: '精鋭「三一駆」、鉄底海域に突入せよ！',
        area: ['5-4'],
        zekamashi: "naganami-kaini",
        kiton: "クォータリー任務「精鋭「三一駆」、"
    },
    {
        id: 'Bq7',
        name: '新編成「三川艦隊」、鉄底海峡に突入せよ！',
        area: ['5-1','5-3','5-4'],
        zekamashi: "sinnpen-mikawakantai",
        kiton: "クォータリー任務「新編成「三川艦隊"
    },
    {
        id: 'Bq8',
        name: '泊地周辺海域の安全確保を徹底せよ！',
        area: ['1-5','7-1','7-2-1','7-2-2'],
        zekamashi: "hakutisyuuhen",
        kiton: "クォータリー任務「泊地周辺海域の安"
    },
    {
        id: 'Bq9',
        name: '空母戦力の投入による兵站線戦闘哨戒',
        area: ['1-3','1-4','2-1','2-2','2-3'],
        zekamashi: "kuubo-tounyuu",
        kiton: "任務「空母戦力の投入による兵站線戦"
    },
    {
        id: 'Bq10',
        name: '戦果拡張任務！「Z作戦」後段作戦',
        area: ['7-2-2','5-5','6-2','6-5'],
        zekamashi: "z-sakusen-koudan",
        kiton: "任務「戦果拡張任務！「z作戦」後段作"
    },
    {
        id: 'Bq11',
        name: '南西諸島方面「海上警備行動」発令！',
        area: ['1-4','2-1','2-2','2-3'],
        zekamashi: "nansei-kaizyoukeibi",
        kiton: "任務「南西諸島方面「海上警備行動」"
    },
    {
        id: 'Bq12',
        name: '発令！「西方海域作戦」',
        area: ['4-1','4-2','4-3','4-4','4-5'],
        zekamashi: "haturei-seihou",
        kiton: "任務「発令！「西方海域作戦」」攻略"
    },
    {
        id: 'Bq13',
        name: '拡張「六水戦」、最前線へ！',
        area: ['5-1','5-4','6-4','6-5'],
        zekamashi: "yuubari-rokusuisen",
        kiton: "任務「拡張「六水戦」、最前線へ！」"
    },
    { // 以上クウォータリー
        id: 'By13',
        name: '精強「第七駆逐隊」緊急出動！',
        area: ['1-2','1-3','1-5','3-2'],
        zekamashi: "dainanakutikutai-kinkyuu",
        kiton: "任務『精強「第七駆逐隊」緊急出動！"
    },
    {
        id: 'By1',
        name: '精鋭「十九駆」、躍り出る！',
        area: ['2-5','3-4','4-5','5-3'],
        zekamashi: "kaiboukan-odorideru",
        kiton: "任務「精鋭「十九駆」、躍り出る！」"
    },
    {
        id: 'By2',
        name: '「海防艦」、海を護る！',
        area: ['1-1','1-2','1-3','1-5','1-6'],
        zekamashi: "kaiboukan-mamoru",
        kiton: "任務「「海防艦」、海を護る！」攻略"
    },
    {
        id: 'By3',
        name: '工作艦「明石」護衛任務',
        area: ['1-3','2-1','2-2','2-3','1-6'],
        zekamashi: "akashi-goei",
        kiton: "任務「工作艦「明石」護衛任務」攻略"
    },
    {
        id: 'By4',
        name: '重巡戦隊、西へ！',
        area: ['4-1','4-2','4-3','4-4'],
        zekamashi: "zyuuzyun-nishi",
        kiton: "任務「重巡戦隊、西へ！」攻略（イヤ"
    },
    {
        id: 'By11',
        name: '日英米合同水上艦隊、抜錨せよ！',
        area: ['3-1','3-3','4-3','7-3-2'],
        zekamashi: "nitieibei-batubyou",
        kiton: "任務『日英米合同水上艦隊、抜錨せよ"
    },
    {
        id: 'By12',
        name: '精鋭「第十九駆逐隊」、全力出撃！',
        area: ['1-5','2-3','3-2','5-3'],
        zekamashi: "daizyuukukutiku-zenryoku",
        kiton: "任務『精鋭「第十九駆逐隊」、全力出"
    },
    {
        id: 'By14',
        name: '鵜来型海防艦、静かな海を防衛せよ！',
        area: ['1-1','1-2','1-5'],
        zekamashi: "ukurugata-bouei",
        kiton: "任務『鵜来型海防艦、静かな海を防衛"
    },
    {
        id: 'By6',
        name: '鎮守府近海海域の哨戒を実施せよ！',
        area: ['1-2','1-3','1-4'],
        zekamashi: "tinzyuhukinkai-syoukai",
        kiton: "任務『鎮守府近海海域の哨戒を実施せ"
    },
    {
        id: 'By7',
        name: '南西方面の兵站航路の安全を図れ！',
        area: ['1-5','1-6','2-1'],
        zekamashi: "nansei-heitankouro",
        kiton: "任務『南西方面の兵站航路の安全を図"
    },
    {
        id: 'By8',
        name: '空母機動部隊、出撃！敵艦隊を迎撃せよ！',
        area: ['2-2','2-3','2-4'],
        zekamashi: "kuubokidou-geigeki",
        kiton: "任務『空母機動部隊、出撃！敵艦隊を"
    },
    {
        id: 'By9',
        name: 'AL作戦',
        area: ['3-1','3-3','3-4','3-5'],
        zekamashi: "al-sakusen-yearly",
        kiton: "任務『al作戦』攻略！【イヤーリー6月"
    },
    {
        id: 'By10',
        name: '機動部隊決戦',
        area: ['5-2','5-5','6-4','6-5'],
        zekamashi: "kidoubutai-kessen",
        kiton: "任務『機動部隊決戦』攻略！【イヤー"
    },
    {
        id: 'By5',
        name: '歴戦「第十方面艦隊」、全力出撃！',
        area: ['4-2','7-2-2','7-3-2'],
        zekamashi: "rekisen-zyuhoumen",
        kiton: "任務「歴戦「第十方面艦隊」、全力出"
    },
    { // 以下遠征
        id: 'Dq1',
        name: '海上通商航路の警戒を厳とせよ！',
        zekamashi: "kaizyou-gentoseyo",
        kiton: "任務「海上通商航路の警戒を厳とせよ-2"
    },
    {
        id: 'Dq2',
        name: '近海に侵入する敵潜を制圧せよ！',
        zekamashi: "kinkai-tekisen",
        kiton: "任務「近海に侵入する敵潜を制圧せよ"
    },
    {
        id: 'Dy1',
        name: '特設護衛船団司令部、活動開始！',
        zekamashi: "tokusetugoei",
        kiton: "任務「特設護衛船団司令部、活動開始"
    },
    {
        id: 'Dy7',
        name: '西方連絡作戦準備を実施せよ！',
        zekamashi: "seihourenraku-zyunbi",
        kiton: "任務「西方連絡作戦準備を実施せよ！"
    },
    {
        id: 'Dy2',
        name: '練習航海及び警備任務を実施せよ！',
        zekamashi: "rensyuu-keibi",
        kiton: "任務「練習航海及び警備任務を実施せ"
    },
    {
        id: 'Dy8',
        name: '新兵装開発資材輸送を船団護衛せよ！',
        zekamashi: "sinheisou-yusou",
        kiton: "任務「新兵装開発資材輸送を船団護衛"
    },
    {
        id: 'Dy3',
        name: '小笠原沖哨戒線の強化を実施せよ！',
        zekamashi: "ogasawaraoki-syoukai",
        kiton: "任務「小笠原沖哨戒線の強化を実施せ"
    },
    {
        id: 'Dy4',
        name: '南西諸島方面の海上護衛を強化せよ！',
        zekamashi: "nanseisyotou-kaizyougoei",
        kiton: "任務「南西諸島方面の海上護衛を強化"
    },
    {
        id: 'Dy5',
        name: '兵站強化遠征任務【基本作戦】',
        zekamashi: "heitan-ensei-kihon",
        kiton: "任務「兵站強化遠征任務【基本作戦】"
    },
    {
        id: 'Dy6',
        name: '兵站強化遠征任務【拡張作戦】',
        zekamashi: "heitan-ensei-kakutyou",
        kiton: "任務「兵站強化遠征任務【拡張作戦】"
    }
];