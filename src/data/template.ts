// タイトルがkeyも兼ねる

import { Ttemplate } from "@/classes/types";

/*
    e: 改行
*/
const templates: Ttemplate[] = [
    // @1
    {
        "title": "1-3_CFJ",
        "world": 1,
        "area": 3,
        "route": "1-C-F-J",
        "token": "ef1AQ5IYDpi",
        "memo": null
    },
    {
        "title": "1-4_BHL",
        "world": 1,
        "area": 4,
        "route": "1-B-C-F-E-H-L",
        "token": "jvG3ZIHYFUE",
        "memo": null
    },
    {
        "title": "1-5_ADFJ_破壊後",
        "world": 1,
        "area": 5,
        "route": "1-A-D-F-G-J",
        "token": "BwBUirzIyWt",
        "memo": "ボスマス通常消費"
    },
    {
        "title": "1-6_EFB",
        "world": 1,
        "area": 6,
        "route": "1-A-E-G-F-B-N",
        "token": "_B8WLx5nRht",
        "memo": null
    },
    {
        "title": "1-6_EKJD",
        "world": 1,
        "area": 6,
        "route": "1-A-E-G-K-M-J-D-N",
        "token": "oTp62HtqhAZ",
        "memo": null
    },
    // @2
    {
        "title": "2-1_CH",
        "world": 2,
        "area": 1,
        "route": "1-C-E-H",
        "token": "mQitTy3zCmo",
        "memo": null
    },
    {
        "title": "2-1_CDH",
        "world": 2,
        "area": 1,
        "route": "1-C-D-H",
        "token": "MMVguRwfrCI",
        "memo": null
    },
    {
        "title": "2-3_EFJN",
        "world": 2,
        "area": 3,
        "route": "1-B-E-F-J-N",
        "token": "UU6X1HkE_7p",
        "memo": null
    },
    {
        "title": "2-4_BLP",
        "world": 2,
        "area": 4,
        "route": "1-B-G-H-L-P",
        "token": "83maZZ81AF4",
        "memo": "道中単縦陣"
    },
    {
        "title": "2-5_上_BFJO",
        "world": 2,
        "area": 5,
        "route": "1-B-F-J-O",
        "token": "RF05sxMlR-E",
        "memo": null
    },
    {
        "title": "2-5_BFEO",
        "world": 2,
        "area": 5,
        "route": "1-B-F-E-I-O",
        "token": "0AE89SUQPG0",
        "memo": null
    },
    {
        "title": "2-5_CEO",
        "world": 2,
        "area": 5,
        "route": "1-C-E-I-O",
        "token": "40Wb9zqgCVs",
        "memo": null
    },
    // @3
    {
        "title": "3-1_CFG",
        "world": 3,
        "area": 1,
        "route": "1-C-F-G",
        "token": "7BN7CddW4iV",
        "memo": null
    },
    {
        "title": "3-2_A",
        "world": 3,
        "area": 2,
        "route": "1-A-B",
        "token": "ycla9vsHhWZ",
        "memo": "B未満夜戦"
    },
    {
        "title": "3-2_CL",
        "world": 3,
        "area": 2,
        "route": "1-C-E-F-L",
        "token": "eX2MuzDqoRW",
        "memo": "渦潮による喪失は未入力$eB未満夜戦"
    },
    {
        "title": "3-2_CJK",
        "world": 3,
        "area": 2,
        "route": "1-C-G-J-K",
        "token": "qJaYDF9_EPh",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-3_上_AGM",
        "world": 3,
        "area": 3,
        "route": "1-A-C-G-M",
        "token": "j_j2h-z26s9",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-3_下_ABM",
        "world": 3,
        "area": 3,
        "route": "1-A-B-F-J-M",
        "token": "bKjvA7x8iUm",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-4_ACGP",
        "world": 3,
        "area": 4,
        "route": "1-A-C-E-G-J-P",
        "token": "dB43TGLTBxW",
        "memo": "B未満夜戦"
    },
    {
        "title": "3-4_HP",
        "world": 3,
        "area": 4,
        "route": "1-D-H-L-J-P",
        "token": "aiXh6R_JRXp",
        "memo": "B未満夜戦"
    },
    {
        "title": "3-5_BDHK_削り",
        "world": 3,
        "area": 5,
        "route": "1-B-D-H-K",
        "token": "R4TPO6dCSi9",
        "memo": "ほっぽマス気球有効$e旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BDHK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-B-D-H-K",
        "token": "L5W5qKHXxlX",
        "memo": "ほっぽマス気球有効$e旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BFGK_削り",
        "world": 3,
        "area": 5,
        "route": "1-B-C-F-G-K",
        "token": "FIrQrAtGve5",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BFGK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-B-C-F-G-K",
        "token": "W0fdmxzIu0Z",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_FGK_削り",
        "world": 3,
        "area": 5,
        "route": "1-F-G-K",
        "token": "WaUCBmPg4OT",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_FGK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-F-G-K",
        "token": "jErD4T9Npbm",
        "memo": "旗艦健在なら夜戦"
    },
    // @4
    {
        "title": "4-1_CDGJ",
        "world": 4,
        "area": 1,
        "route": "1-C-F-D-G-J",
        "token": "Du4PSHs59R3",
        "memo": "Dマス通常消費"
    },
    {
        "title": "4-2_ACL",
        "world": 4,
        "area": 2,
        "route": "1-A-C-L",
        "token": "_JUHuGIzWEQ",
        "memo": null
    },
    {
        "title": "4-2_BDCL",
        "world": 4,
        "area": 2,
        "route": "1-B-D-C-L",
        "token": "tNSdSDIWSWu",
        "memo": null
    },
    {
        "title": "4-3_DHN",
        "world": 4,
        "area": 3,
        "route": "1-D-H-N",
        "token": "YU2H2-qO272",
        "memo": "ボスマス気球有効$eボス前10%逸れ"
    },
    {
        "title": "4-4_AEIK",
        "world": 4,
        "area": 4,
        "route": "1-A-E-I-K",
        "token": "p5sOex0n_tX",
        "memo": "B未満夜戦"
    },
    {
        "title": "4-5_DHT_削り",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-T",
        "token": "cKPoW0bOAKf",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHT_破壊",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-T",
        "token": "TEQwf5SgVMD",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHKT_削り",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-K-T",
        "token": "UUzFcl6MnyX",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHKT_破壊",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-K-T",
        "token": "o2c72R4lKvf",
        "memo": "ボスマス気球有効"
    },
    // @5
    {
        "title": "5-1_BFJ",
        "world": 5,
        "area": 1,
        "route": "1-B-C-F-J",
        "token": "uu0xItysBtq",
        "memo": null
    },
    {
        "title": "5-1_BEGJ",
        "world": 5,
        "area": 1,
        "route": "1-B-E-G-J",
        "token": "70N9xIjDEIM",
        "memo": null
    },
    {
        "title": "5-2_CDFO",
        "world": 5,
        "area": 2,
        "route": "1-B-C-D-F-O",
        "token": "lIRtzTb7-WM",
        "memo": null
    },
    {
        "title": "5-2_CEFO",
        "world": 5,
        "area": 2,
        "route": "1-B-C-E-F-O",
        "token": "OAwk-FSvHLg",
        "memo": null
    },
    {
        "title": "5-3_IP",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-P",
        "token": "h9WzHPfMg93",
        "memo": "1戦目梯形陣"
    },
    {
        "title": "5-3_IPKQ",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-P-K-E-Q",
        "token": "tecoW0yXbv_",
        "memo": "1,3戦目梯形陣"
    },
    {
        "title": "5-3_IKQ",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-K-E-Q",
        "token": "6zJug-0Eu96",
        "memo": "道中梯形陣"
    },
    {
        "title": "5-4_EHJP",
        "world": 5,
        "area": 4,
        "route": "1-A-D-E-H-I-J-M-P",
        "token": "wsbFek-Nhv0",
        "memo": "渦潮による喪失は未入力$eHマス梯形陣"
    },
    {
        "title": "5-5_BHNS_破壊前",
        "world": 5,
        "area": 5,
        "route": "1-B-F-D-H-N-O-S",
        "token": "VsxugL7qqoX",
        "memo": "渦潮による喪失は未入力$e旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BHNS_破壊後",
        "world": 5,
        "area": 5,
        "route": "1-B-F-D-H-N-O-S",
        "token": "R-DfkdpwTgo",
        "memo": "渦潮による喪失は未入力$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BKPS_破壊前",
        "world": 5,
        "area": 5,
        "route": "1-B-K-P-S",
        "token": "et3L9FZDpDP",
        "memo": "旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BKPS_破壊後",
        "world": 5,
        "area": 5,
        "route": "1-B-K-P-S",
        "token": "WTjxP0WjUrp",
        "memo": "旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    // @6
    {
        "title": "6-1_FHK",
        "world": 6,
        "area": 1,
        "route": "1-A-F-G-H-K",
        "token": "SwqXczDyEUK",
        "memo": null
    },
    {
        "title": "6-1_CFHK",
        "world": 6,
        "area": 1,
        "route": "1-C-F-G-H-K",
        "token": "TnodTcDpPmM",
        "memo": null
    },
    {
        "title": "6-2_CJK",
        "world": 6,
        "area": 2,
        "route": "1-C-E-J-K",
        "token": "jv90yr2twUs",
        "memo": null
    },
    {
        "title": "6-3_CEJ",
        "world": 6,
        "area": 3,
        "route": "1-A-C-E-G-H-J",
        "token": "hn4R0tGHvG5",
        "memo": "B未満夜戦"
    },
    {
        "title": "6-3_CEFJ",
        "world": 6,
        "area": 3,
        "route": "1-A-C-E-F-H-J",
        "token": "uReHki_KrAg",
        "memo": "B未満夜戦"
    },
    {
        "title": "6-4_左_ADCFN",
        "world": 6,
        "area": 4,
        "route": "1-A-D-C-F-N",
        "token": "HZNUnIFXpHR",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "6-4_右_MKJIN",
        "world": 6,
        "area": 4,
        "route": "2-M-K-J-I-N",
        "token": "00qZqL81Yoh",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "6-5_ACDGM_上_削り",
        "world": 6,
        "area": 5,
        "route": "1-A-C-D-G-M",
        "token": "k7YK2P3kMhs",
        "memo": "基地2中隊ボス集中"
    },
    {
        "title": "6-5_ACDGM_上_破壊",
        "world": 6,
        "area": 5,
        "route": "1-A-C-D-G-M",
        "token": "oXkAk6NvR7q",
        "memo": "基地2中隊ボス集中"
    },
    {
        "title": "6-5_BFIJM_下_削り",
        "world": 6,
        "area": 5,
        "route": "2-B-F-I-J-M",
        "token": "yq1de3ucOs4",
        "memo": "夜戦マス梯形陣$e基地2中隊ボス集中"
    },
    {
        "title": "6-5_BFIJM_下_破壊",
        "world": 6,
        "area": 5,
        "route": "2-B-F-I-J-M",
        "token": "90h8VuajPhh",
        "memo": "夜戦マス梯形陣$e基地2中隊ボス集中"
    },
    {
        "title": "7-1_DGHK",
        "world": 7,
        "area": 1,
        "route": "1-D-E-G-H-K",
        "token": "DGFjVMMGmH6",
        "memo": "ボスマス通常消費"
    },
    {
        "title": "7-2-1_CEG",
        "world": 7,
        "area": 2,
        "route": "1-C-E-G",
        "token": "4Sl7jre0cPA",
        "memo": "ゲージ指定無し$eボス梯形陣"
    },
    {
        "title": "7-2-2_BCIM",
        "world": 7,
        "area": 2,
        "route": "1-B-C-D-I-M",
        "token": "RH_ys1-5NMa",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-3-1_CE",
        "world": 7,
        "area": 3,
        "route": "1-A-C-E",
        "token": "zs9YUYQhKly",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-3-2_CDP",
        "world": 7,
        "area": 3,
        "route": "1-A-C-D-G-P",
        "token": "AN9zdLp7E3e",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-4_CEJLP_削り",
        "world": 7,
        "area": 4,
        "route": "1-C-E-J-L-P",
        "token": "A273SwNtckT",
        "memo": "ボスマス梯形陣"
    },
    {
        "title": "7-4_CEJLP_破壊",
        "world": 7,
        "area": 4,
        "route": "1-C-E-J-L-P",
        "token": "34P06vWunta",
        "memo": "ボスマス梯形陣"
    },
    {
        "title": "7-4_CDJKM_クルージング",
        "world": 7,
        "area": 4,
        "route": "1-C-D-F-J-K-M-O",
        "token": "vsG8xXTTTrF",
        "memo": "潜水マスに基地分散$eゲージ破壊時は3戦目駆逐入り編成確定"
    },
    {
        "title": "7-5-1_ABDGK_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-G-H-K",
        "token": "foReJuHjLt5",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "7-5-2_ABDJQ_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-J-O-Q",
        "token": "KUeVqXUTGkv",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "7-5-3_ABDJQ_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-J-O-P-T",
        "token": "rbdgbNCC0c2",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "59-4_大廻り_破壊",
        "world": 59,
        "area": 4,
        "route": "2-T-T2-U-U1-U2-V-W-X-Y-Z",
        "token": "UOjl9rPC62l",
        "memo": "基地未設定"
    },


    {
        "title": "60-1_CGMO_O削り",
        "world": 60,
        "area": 1,
        "route": "2-F-C-G-M-O",
        "token": "q1P2pvPffFH",
        "memo": "煙幕: ボス前M$e阻塞気球: ボス$e基地: M集中"
    },
    {
        "title": "60-1_CGMO_O破壊",
        "world": 60,
        "area": 1,
        "route": "2-F-C-G-M-O",
        "token": "2085t02wiC7",
        "memo": "煙幕: ボス前M$e阻塞気球: ボス$e基地: 1部隊ボス集中"
    },
    {
        "title": "60-1_CJLMO_O掘り",
        "world": 60,
        "area": 1,
        "route": "2-F-C-I-J-L-M-O",
        "token": "WUTOkH8bQcO",
        "memo": "煙幕: ボス前M$e阻塞気球: ボス$e基地: M集中"
    },
    {
        "title": "60-2_A2CHIK",
        "world": 60,
        "area": 2,
        "route": "1-A-A2-B-C-H-I-K",
        "token": "F2gfhV-9Lei",
        "memo": "ギミック2想定$e基地: K, H それぞれ集中"
    },
    {
        "title": "60-2_MPRU_U輸送",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-P-R-T-U",
        "token": "oWd-j2zp9Cf",
        "memo": "煙幕: P潜水$e基地: ボス、R それぞれ集中"
    },
    {
        "title": "60-2_MOQVW_W削り",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "token": "pWydOx2Y6p9",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-2_MOQVW_W破壊_破砕無",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "token": "4Ja5C4g3PV2",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-2_MOQVW_W破壊_破砕有",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "token": "0YVxiMBmDxT",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_BB2B4",
        "world": 60,
        "area": 3,
        "route": "1-A-B-B2-B4",
        "token": "JGNiZYPpZsZ",
        "memo": "基地: (B4, B2)集中"
    },
    {
        "title": "60-3_EE2",
        "world": 60,
        "area": 3,
        "route": "1-A-C-E-E2",
        "token": "6ZJzGOOpFd4",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_EFF1G_G削り",
        "world": 60,
        "area": 3,
        "route": "1-A-C-E-F-F1-G",
        "token": "OGCmbcYq3CY",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_EFF1G_G破壊",
        "world": 60,
        "area": 3,
        "route": "1-A-C-E-F-F1-G",
        "token": "xPld0rhclbo",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_IJKK2",
        "world": 60,
        "area": 3,
        "route": "2-H-I-J-K-K2",
        "token": "zmteGsB1wgr",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2PR_R削り",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-P-O1-R",
        "token": "GWxOoRTAhqX",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中$e阻塞気球: ボス"
    },
    {
        "title": "60-3_KLM2PR_R破壊",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-P-O1-R",
        "token": "IMQgVEHwXkQ",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中$e阻塞気球: ボス"
    },
    {
        "title": "60-3_KLM2TU_Uギミック",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S1-T-U",
        "token": "s0hbtLAvODk",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊U集中$e阻塞気球: U"
    },
    {
        "title": "60-3_KLM2VX_X削り",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "token": "tsf17ZvjWCo",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2VX_X破壊_破砕無",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "token": "MHBQULypXer",
        "memo": "陣形: 長門陸奥系想定$e煙幕: L$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2VX_X破壊_破砕有",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "token": "JWXTU7Y61h3",
        "memo": "陣形: 長門陸奥系想定$e煙幕: L$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-4_DG1IL_L削り", // 4-1
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-G1-I-L",
        "token": "vd9a78Zezfe",
        "memo": "$e煙幕: I$e基地: 2部隊ボス集中$eゲージ: 2400"
    },
    {
        "title": "60-4_DG1IL_L破壊",
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-G1-I-L",
        "token": "yrirVleDaBD",
        "memo": "$e煙幕: I$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-4_DHMOR_R輸送", // 4-2
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-H-M-O-P-R",
        "token": "cK87AVs-EyW",
        "memo": "$e煙幕: M$e基地: 2部隊ボス集中$eゲージ: 750TP"
    },
    {
        "title": "60-4_BCW_W削り_高速+", // 4-3
        "world": 60,
        "area": 4,
        "route": "1-A-B-C-W",
        "token": "qKNi9s9VsYW",
        "memo": "陣形: 長門陸奥系想定$e煙幕: C$e基地: 2部隊ボス集中$eゲージ: 3450(暫定)"
    },
    {
        "title": "60-4_BCW_W破壊_破砕無_高速+", // 4-3
        "world": 60,
        "area": 4,
        "route": "1-A-B-C-W",
        "token": "kMxzF_epKQw",
        "memo": "陣形: 長門陸奥系想定$e煙幕: C$e基地: 2部隊ボス集中$eゲージ: 3450(暫定)"
    },
    {
        "title": "60-4_BTCW_W削り", // 4-3
        "world": 60,
        "area": 4,
        "route": "1-A-B-T-C-W",
        "token": "W7kwP3RHrbf",
        "memo": "陣形: 長門陸奥系想定$e煙幕: T$e基地: 2部隊ボス集中$eゲージ: 3450(暫定)"
    },
    {
        "title": "60-4_BTCW_W破壊_破砕無",
        "world": 60,
        "area": 4,
        "route": "1-A-B-T-C-W",
        "token": "6PIBDrXXAdg",
        "memo": "陣形: 長門陸奥系想定$e煙幕: T$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-5_EE2FF2",
        "world": 60,
        "area": 5,
        "route": "1-C-D-E-E2-F-F2",
        "token": "iv7P7jIl-6h",
        "memo": "煙幕: E2$e基地: 1部隊F2集中"
    },
    {
        "title": "60-5_B1HIK_K輸送", // 5-1
        "world": 60,
        "area": 5,
        "route": "1-A-B-B1-H-I-J1-J-K",
        "token": "Nwg1HC1NcLZ",
        "memo": "陣形: 大和武蔵想定$e煙幕: i$e基地: 1部隊ボス集中"
    },
    {
        "title": "60-5_MNPRT_T削り", // 5-2
        "world": 60,
        "area": 5,
        "route": "2-L-M-N-P-P2-R-T",
        "token": "DElPsM9Cu63",
        "memo": "陣形: 長門陸奥系想定$e煙幕: N$e基地: ボス集中"
    },
    {
        "title": "60-5_MNPRT_T破壊",
        "world": 60,
        "area": 5,
        "route": "2-L-M-N-P-P2-R-T",
        "token": "qTWLquIM_gt",
        "memo": "陣形: 長門陸奥系想定$e煙幕: N$e基地: ボス集中"
    },
    {
        "title": "60-5_MU1U2U3XRZ_Z削り", // 5-3
        "world": 60,
        "area": 5,
        "route": "2-L-M-U1-U2-U3-X-P2-R-Z",
        "token": "c7TJZ6-mwpr",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: M$e基地: [R, X, U2]集中$e阻塞気球: ボス"
    },
    {
        "title": "60-5_MU1U2U3XRZ_Z破壊_破砕無",
        "world": 60,
        "area": 5,
        "route": "2-L-M-U1-U2-U3-X-P2-R-Z",
        "token": "3zjmwibW4Sg",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: M$e基地: [R, X, U2]集中$e阻塞気球: ボス"
    },
    {
        "title": "60-6_ACDF",
        "world": 60,
        "area": 6,
        "route": "1-A-C-D-F",
        "token": "am25Vd8Z0s5",
        "memo": "陣形: 長門陸奥想定$e煙幕: D$e基地: (F, F, C)集中"
    },
    {
        "title": "60-6_HEDC2I",
        "world": 60,
        "area": 6,
        "route": "2-G-H-E-D-C2-I",
        "token": "JLBptclmXAY",
        "memo": "基地: (I, I, E)集中"
    },
    {
        "title": "60-6_JJ2L",
        "world": 60,
        "area": 6,
        "route": "2-G-J-J2-K-L",
        "token": "u3J1VuHETOV",
        "memo": "基地: (L, J2, J)集中"
    },
    {
        "title": "60-6_JJ3MNO_O削り", // 6-1
        "world": 60,
        "area": 6,
        "route": "2-G-J-J3-M-N-O",
        "token": "797KOB6cyaO",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: (ボス, ボス, J)集中"
    },
    {
        "title": "60-6_JJ3MNO_O破壊",
        "world": 60,
        "area": 6,
        "route": "2-G-J-J3-M-N-O",
        "token": "Y4cDcMGar6P",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: 3部隊ボス集中"
    },
    {
        "title": "60-6_JJ2PTV_V削り", // 6-2
        "world": 60,
        "area": 6,
        "route": "2-G-J-J2-P-R-T-V",
        "token": "upoc9Zg5Ea9",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ2PTV_V破壊",
        "world": 60,
        "area": 6,
        "route": "2-G-J-J2-P-R-T-V",
        "token": "3XHtZUJnPfv",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ1PRSXZ_Z削り", // 6-3
        "world": 60,
        "area": 6,
        "route": "3-J-J1-P-R-S-X-Z",
        "token": "u7Udxf8ckzL",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ1PRSXZ_Z破壊_破砕有",
        "world": 60,
        "area": 6,
        "route": "3-J-J1-P-R-S-X-Z",
        "token": "DJ5mTyVAGJa",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: J$e基地: ボス集中"
    },

    {
        "title": "61-1_JMO_O削り",
        "world": 61,
        "area": 1,
        "route": "1-A-F-J-L-M-O",
        "token": "1WqwqOqCLqG",
        "memo": "基地: ボス集中"
    },
    {
        "title": "61-1_JMO_O破壊",
        "world": 61,
        "area": 1,
        "route": "1-A-F-J-L-M-O",
        "token": "vwaofu0iPhU",
        "memo": "基地: ボス集中"
    },
    {
        "title": "61-1_JKQSTV_V削り",
        "world": 61,
        "area": 1,
        "route": "1-A-F-J-K-Q-S-T-V",
        "token": "yOjCxLfFKq9",
        "memo": "基地: ボス集中"
    },
    {
        "title": "61-1_JKQSTV_V破壊_破砕無",
        "world": 61,
        "area": 1,
        "route": "1-A-F-J-K-Q-S-T-V",
        "token": "-iIGY12hVpl",
        "memo": "基地: ボス集中"
    },
    {
        "title": "61-2_BDKLM_M削り",
        "world": 61,
        "area": 2,
        "route": "1-A-B-D-K-L-M",
        "token": "tJhx21O7K64",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "61-2_BDKLM_M破壊",
        "world": 61,
        "area": 2,
        "route": "1-A-B-D-K-L-M",
        "token": "vDlAKUNS3LH",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "61-2_KQTVX_X輸送",
        "world": 61,
        "area": 2,
        "route": "2-K-P-Q-T-V-W-X",
        "token": "-eGdwaeOOje",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "61-2_KOQTVY_Y削り",
        "world": 61,
        "area": 2,
        "route": "2-K-O-P-Q-T-V-Y",
        "token": "8DP-0URMwcK",
        "memo": "基地: 2部隊ボス集中$e第二警戒タッチ想定"
    },
    {
        "title": "61-2_KOQTVY_Y破壊_破砕なし",
        "world": 61,
        "area": 2,
        "route": "2-K-O-P-Q-T-V-Y",
        "token": "nOrajB5FBjQ",
        "memo": "基地: 2部隊ボス集中$e第二警戒タッチ想定"
    },
]; // @expansion
/*
{
    "title": "",
    "world": ,
    "area": ,
    "route": "",
    "token": "",
    "memo": ""
},

*/

export default templates;