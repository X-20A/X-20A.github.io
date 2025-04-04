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
        "url": "27ffz8ba+",
        "memo": null
    },
    {
        "title": "1-4_BHL",
        "world": 1,
        "area": 4,
        "route": "1-B-C-F-E-H-L",
        "url": "2d3n34oe+",
        "memo": null
    },
    {
        "title": "1-5_ADFJ_破壊後",
        "world": 1,
        "area": 5,
        "route": "1-A-D-F-G-J",
        "url": "2b3dphsj+",
        "memo": "ボスマス通常消費"
    },
    {
        "title": "1-6_EFB",
        "world": 1,
        "area": 6,
        "route": "1-A-E-G-F-B-N",
        "url": "255m4npx+",
        "memo": null
    },
    {
        "title": "1-6_EKJD",
        "world": 1,
        "area": 6,
        "route": "1-A-E-G-K-M-J-D-N",
        "url": "2xurzrzs+",
        "memo": null
    },
    // @2
    {
        "title": "2-1_CH",
        "world": 2,
        "area": 1,
        "route": "1-C-E-H",
        "url": "2cwk4rbz+",
        "memo": null
    },
    {
        "title": "2-1_CDH",
        "world": 2,
        "area": 1,
        "route": "1-C-D-H",
        "url": "2akvpfvo+",
        "memo": null
    },
    {
        "title": "2-3_EFJN",
        "world": 2,
        "area": 3,
        "route": "1-B-E-F-J-N",
        "url": "23292uy5+",
        "memo": null
    },
    {
        "title": "2-4_BLP",
        "world": 2,
        "area": 4,
        "route": "1-B-G-H-L-P",
        "url": "2d94xpje+",
        "memo": "道中単縦陣"
    },
    {
        "title": "2-5_上_BFJO",
        "world": 2,
        "area": 5,
        "route": "1-B-F-J-O",
        "url": "24j2q4dg+",
        "memo": null
    },
    {
        "title": "2-5_BFEO",
        "world": 2,
        "area": 5,
        "route": "1-B-F-E-I-O",
        "url": "23e35zje+",
        "memo": null
    },
    {
        "title": "2-5_CEO",
        "world": 2,
        "area": 5,
        "route": "1-C-E-I-O",
        "url": "2xrxba6u+",
        "memo": null
    },
    // @3
    {
        "title": "3-1_CFG",
        "world": 3,
        "area": 1,
        "route": "1-C-F-G",
        "url": "29ffx6lz+",
        "memo": null
    },
    {
        "title": "3-2_CL",
        "world": 3,
        "area": 2,
        "route": "1-C-E-F-L",
        "url": "25jx7qrw+",
        "memo": "渦潮による喪失は未入力$eB未満夜戦"
    },
    {
        "title": "3-2_CJK",
        "world": 3,
        "area": 2,
        "route": "1-C-G-J-K",
        "url": "2yedf8be+",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-3_上_AGM",
        "world": 3,
        "area": 3,
        "route": "1-A-C-G-M",
        "url": "2yavuen7+",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-3_下_ABM",
        "world": 3,
        "area": 3,
        "route": "1-A-B-F-J-M",
        "url": "24faxgjk+",
        "memo": "渦潮による喪失は未入力"
    },
    {
        "title": "3-4_ACGP",
        "world": 3,
        "area": 4,
        "route": "1-A-C-E-G-J-P",
        "url": "228gew48+",
        "memo": "B未満夜戦"
    },
    {
        "title": "3-4_HP",
        "world": 3,
        "area": 4,
        "route": "1-D-H-L-J-P",
        "url": "23xmc5aw+",
        "memo": "B未満夜戦"
    },
    {
        "title": "3-5_BDHK_削り",
        "world": 3,
        "area": 5,
        "route": "1-B-D-H-K",
        "url": "2boy94t6+",
        "memo": "ほっぽマス気球有効$e旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BDHK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-B-D-H-K",
        "url": "27sb7w6p+",
        "memo": "ほっぽマス気球有効$e旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BFGK_削り",
        "world": 3,
        "area": 5,
        "route": "1-B-C-F-G-K",
        "url": "29vfg9zz+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_BFGK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-B-C-F-G-K",
        "url": "28bfzsgk+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_FGK_削り",
        "world": 3,
        "area": 5,
        "route": "1-F-G-K",
        "url": "2djmroqh+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "3-5_FGK_破壊",
        "world": 3,
        "area": 5,
        "route": "1-F-G-K",
        "url": "29acpoem+",
        "memo": "旗艦健在なら夜戦"
    },
    // @4
    {
        "title": "4-1_CDGJ",
        "world": 4,
        "area": 1,
        "route": "1-C-F-D-G-J",
        "url": "2b7dn4zx+",
        "memo": "Dマス通常消費"
    },
    {
        "title": "4-2_ACL",
        "world": 4,
        "area": 2,
        "route": "1-A-C-L",
        "url": "25avnd4u+",
        "memo": null
    },
    {
        "title": "4-2_BDCL",
        "world": 4,
        "area": 2,
        "route": "1-B-D-C-L",
        "url": "27umx2k3+",
        "memo": null
    },
    {
        "title": "4-3_DHN",
        "world": 4,
        "area": 3,
        "route": "1-D-H-N",
        "url": "22oy9yb4+",
        "memo": "ボスマス気球有効$eボス前10%逸れ"
    },
    {
        "title": "4-4_AEIK",
        "world": 4,
        "area": 4,
        "route": "1-A-E-I-K",
        "url": "2c8qwg9d+",
        "memo": "B未満夜戦"
    },
    {
        "title": "4-5_DHT_削り",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-T",
        "url": "24xoweax+",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHT_破壊",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-T",
        "url": "25u97n37+",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHKT_削り",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-K-T",
        "url": "23t9p8rf+",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "4-5_DHKT_破壊",
        "world": 4,
        "area": 5,
        "route": "1-C-D-H-K-T",
        "url": "25kc2pkx+",
        "memo": "ボスマス気球有効"
    },
    // @5
    {
        "title": "5-1_BFJ",
        "world": 5,
        "area": 1,
        "route": "1-B-C-F-J",
        "url": "25fp2uw7+",
        "memo": null
    },
    {
        "title": "5-1_BEGJ",
        "world": 5,
        "area": 1,
        "route": "1-B-E-G-J",
        "url": "2xkewumu+",
        "memo": null
    },
    {
        "title": "5-2_CDFO",
        "world": 5,
        "area": 2,
        "route": "1-B-C-D-F-O",
        "url": "2c7sg9zq+",
        "memo": null
    },
    {
        "title": "5-3_IP",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-P",
        "url": "2yx66s92+",
        "memo": "1戦目梯形陣"
    },
    {
        "title": "5-3_IPKQ",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-P-K-E-Q",
        "url": "2xhm7knr+",
        "memo": "1,3戦目梯形陣"
    },
    {
        "title": "5-3_IKQ",
        "world": 5,
        "area": 3,
        "route": "1-D-G-I-O-K-E-Q",
        "url": "26bnamwc+",
        "memo": "道中梯形陣"
    },
    {
        "title": "5-4_EHJP",
        "world": 5,
        "area": 4,
        "route": "1-A-D-E-H-I-J-M-P",
        "url": "27rppvgh+",
        "memo": "渦潮による喪失は未入力$eHマス梯形陣"
    },
    {
        "title": "5-5_BHNS_破壊前",
        "world": 5,
        "area": 5,
        "route": "1-B-F-D-H-N-O-S",
        "url": "25g7st9m+",
        "memo": "渦潮による喪失は未入力$e旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BHNS_破壊後",
        "world": 5,
        "area": 5,
        "route": "1-B-F-D-H-N-O-S",
        "url": "23mn6wjb+",
        "memo": "渦潮による喪失は未入力$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BKPS_破壊前",
        "world": 5,
        "area": 5,
        "route": "1-B-K-P-S",
        "url": "2ymnlwhw+",
        "memo": "旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    {
        "title": "5-5_BKPS_破壊後",
        "world": 5,
        "area": 5,
        "route": "1-B-K-P-S",
        "url": "28ldj5zx+",
        "memo": "旗艦健在なら夜戦$eタッチ使用時陣形注意"
    },
    // @6
    {
        "title": "6-1_FHK",
        "world": 6,
        "area": 1,
        "route": "1-A-F-G-H-K",
        "url": "2dcshnpu+",
        "memo": null
    },
    {
        "title": "6-1_CFHK",
        "world": 6,
        "area": 1,
        "route": "1-C-F-G-H-K",
        "url": "2avaerm2+",
        "memo": null
    },
    {
        "title": "6-2_CJK",
        "world": 6,
        "area": 2,
        "route": "1-C-E-J-K",
        "url": "25pprd5g+",
        "memo": null
    },
    {
        "title": "6-3_CEJ",
        "world": 6,
        "area": 3,
        "route": "1-A-C-E-G-H-J",
        "url": "2y7jvodl+",
        "memo": "B未満夜戦"
    },
    {
        "title": "6-3_CEFJ",
        "world": 6,
        "area": 3,
        "route": "1-A-C-E-F-H-J",
        "url": "2bralm5k+",
        "memo": "B未満夜戦"
    },
    {
        "title": "6-4_左_ADCFN",
        "world": 6,
        "area": 4,
        "route": "1-A-D-C-F-N",
        "url": "24kqq9p6+",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "6-4_右_MKJIN",
        "world": 6,
        "area": 4,
        "route": "2-M-K-J-I-N",
        "url": "22gktc32+",
        "memo": "ボスマス気球有効"
    },
    {
        "title": "6-5_ACDGM_上_削り",
        "world": 6,
        "area": 5,
        "route": "1-A-C-D-G-M",
        "url": "2atft4dg+",
        "memo": "基地2中隊ボス集中"
    },
    {
        "title": "6-5_ACDGM_上_破壊",
        "world": 6,
        "area": 5,
        "route": "1-A-C-D-G-M",
        "url": "28b9pac9+",
        "memo": "基地2中隊ボス集中"
    },
    {
        "title": "6-5_BFIJM_下_削り",
        "world": 6,
        "area": 5,
        "route": "2-B-F-I-J-M",
        "url": "2dke38j7+",
        "memo": "夜戦マス梯形陣$e基地2中隊ボス集中"
    },
    {
        "title": "6-5_BFIJM_下_破壊",
        "world": 6,
        "area": 5,
        "route": "2-B-F-I-J-M",
        "url": "24shsusd+",
        "memo": "夜戦マス梯形陣$e基地2中隊ボス集中"
    },
    {
        "title": "7-1_DGHK",
        "world": 7,
        "area": 1,
        "route": "1-D-E-G-H-K",
        "url": "2b35n9je+",
        "memo": "ボスマス通常消費"
    },
    {
        "title": "7-2-1_CEG",
        "world": 7,
        "area": 2,
        "route": "1-C-E-G",
        "url": "22sjf6zs+",
        "memo": "ゲージ指定無し$eボス梯形陣"
    },
    {
        "title": "7-2-2_BCIM",
        "world": 7,
        "area": 2,
        "route": "1-B-C-D-I-M",
        "url": "22ukw2bj+",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-3-1_CE",
        "world": 7,
        "area": 3,
        "route": "1-A-C-E",
        "url": "2bn4k7jx+",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-3-2_CDP",
        "world": 7,
        "area": 3,
        "route": "1-A-C-D-G-P",
        "url": "24d6ffkb+",
        "memo": "ゲージ指定無し"
    },
    {
        "title": "7-4_CEJLP_削り",
        "world": 7,
        "area": 4,
        "route": "1-C-E-J-L-P",
        "url": "2948hmow+",
        "memo": "ボスマス梯形陣"
    },
    {
        "title": "7-4_CEJLP_破壊",
        "world": 7,
        "area": 4,
        "route": "1-C-E-J-L-P",
        "url": "29qnfwvc+",
        "memo": "ボスマス梯形陣"
    },
    {
        "title": "7-4_CDJKM_クルージング",
        "world": 7,
        "area": 4,
        "route": "1-C-D-F-J-K-M-O",
        "url": "ytjvbb79+",
        "memo": "潜水マスに基地分散$eゲージ破壊時は3戦目駆逐入り編成確定"
    },
    {
        "title": "7-5-1_ABDGK_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-G-H-K",
        "url": "2xvkvo9y+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "7-5-2_ABDJQ_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-J-O-Q",
        "url": "228td59z+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "7-5-3_ABDJQ_破壊",
        "world": 7,
        "area": 5,
        "route": "1-A-B-D-F-J-O-P-T",
        "url": "26ygrj2d+",
        "memo": "旗艦健在なら夜戦"
    },
    {
        "title": "59-4_大廻り_破壊",
        "world": 59,
        "area": 4,
        "route": "2-T-T2-U-U1-U2-V-W-X-Y-Z",
        "url": "2dls5y6z+",
        "memo": "基地未設定"
    },


    {
        "title": "60-1_CGMO_O削り",
        "world": 60,
        "area": 1,
        "route": "2-F-C-G-M-O",
        "url": "23pdfan6+",
        "memo": "煙幕: ボス前M$e阻塞気球: ボス$e基地: 1部隊ボス集中"
    },
    {
        "title": "60-1_CGMO_O破壊",
        "world": 60,
        "area": 1,
        "route": "2-F-C-G-M-O",
        "url": "2ypwabjq+",
        "memo": "煙幕: ボス前M$e阻塞気球: ボス$e基地: 1部隊ボス集中"
    },
    {
        "title": "60-2_A2CHIK",
        "world": 60,
        "area": 2,
        "route": "1-A-A2-B-C-H-I-K",
        "url": "29hawldm+",
        "memo": "ギミック2想定$e基地: K, H それぞれ集中"
    },
    {
        "title": "60-2_MPRU_U輸送",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-P-R-T-U",
        "url": "2ddjt972+",
        "memo": "煙幕: P潜水$e基地: ボス、R それぞれ集中"
    },
    {
        "title": "60-2_MOQVW_W削り",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "url": "2xpph9oo+",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-2_MOQVW_W破壊_破砕無",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "url": "26a6vfm2+",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-2_MOQVW_W破壊_破砕有",
        "world": 60,
        "area": 2,
        "route": "2-L-M-N-O-Q-V-V1-W",
        "url": "22vnzmp3+",
        "memo": "煙幕: ボス前V$e阻塞気球: ボス$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_EFF1G_G削り",
        "world": 60,
        "area": 3,
        "route": "1-A-C-E-F-F1-G",
        "url": "26lmv5u9+",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_EFF1G_G破壊",
        "world": 60,
        "area": 3,
        "route": "1-A-C-E-F-F1-G",
        "url": "28fwuays+",
        "memo": "基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2PR_R削り",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-P-O1-R",
        "url": "275oohtz+",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中$e阻塞気球: ボス"
    },
    {
        "title": "60-3_KLM2PR_R破壊",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-P-O1-R",
        "url": "2cyhopxd+",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中$e阻塞気球: ボス"
    },
    {
        "title": "60-3_KLM2TU_Uギミック",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S1-T-U",
        "url": "2xtwa3lt+",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊U集中$e阻塞気球: U"
    },
    {
        "title": "60-3_KLM2VX_X削り",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "url": "23bdvmgv+",
        "memo": "陣形: 長門陸奥系想定$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2VX_X破壊_破砕無",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "url": "26yemdaq+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: L$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-3_KLM2VX_X破壊_破砕有",
        "world": 60,
        "area": 3,
        "route": "3-K-L-M-M2-S-S2-V-X",
        "url": "2cktofxo+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: L$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-4_DG1IL_L削り", // 4-1
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-G1-I-L",
        "url": "24mwcgoh+",
        "memo": "$e煙幕: M$e基地: 2部隊ボス集中$eゲージ: 3000"
    },
    {
        "title": "60-4_DG1IL_L破壊",
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-G1-I-L",
        "url": "28xvhagd+",
        "memo": "$e煙幕: M$e基地: 2部隊ボス集中$eゲージ: 750TP"
    },
    {
        "title": "60-4_DHMOR_R輸送", // 4-2
        "world": 60,
        "area": 4,
        "route": "1-A-D-F-G-H-M-O-P-R",
        "url": "24bjjnyz+",
        "memo": "$e煙幕: M$e基地: 2部隊ボス集中$eゲージ: 750TP"
    },
    {
        "title": "60-4_BTCW_W削り", // 4-3
        "world": 60,
        "area": 4,
        "route": "1-A-B-T-C-W",
        "url": "2ajvv7o5+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: T$e基地: 2部隊ボス集中$eゲージ: 3450(暫定)"
    },
    {
        "title": "60-4_BTCW_W破壊_破砕無",
        "world": 60,
        "area": 4,
        "route": "1-A-B-T-C-W",
        "url": "2cyn88ml+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: T$e基地: 2部隊ボス集中"
    },
    {
        "title": "60-5_EE2FF2",
        "world": 60,
        "area": 5,
        "route": "1-C-D-E-E2-F-F2",
        "url": "2ykjthbu+",
        "memo": "煙幕: E2$e基地: 1部隊F2集中"
    },
    {
        "title": "60-5_B1HIK_K輸送", // 5-1
        "world": 60,
        "area": 5,
        "route": "1-A-B-B1-H-I-J1-J-K",
        "url": "24m7zg3p+",
        "memo": "陣形: 大和武蔵想定$e煙幕: i$e基地: 1部隊ボス集中"
    },
    {
        "title": "60-5_MNPRT_T削り", // 5-2
        "world": 60,
        "area": 5,
        "route": "2-L-M-N-P-P2-R-T",
        "url": "25b6solw+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: N$e基地: ボス集中"
    },
    {
        "title": "60-5_MNPRT_T破壊",
        "world": 60,
        "area": 5,
        "route": "2-L-M-N-P-P2-R-T",
        "url": "2avl3jcv+",
        "memo": "陣形: 長門陸奥系想定$e煙幕: N$e基地: ボス集中"
    },
    {
        "title": "60-5_MU1U2U3XRZ_Z削り", // 5-3
        "world": 60,
        "area": 5,
        "route": "2-L-M-U1-U2-U3-X-P2-R-Z",
        "url": "282j9g72+",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: M$e基地: [R, X, U2]集中$e阻塞気球: ボス"
    },
    {
        "title": "60-5_MU1U2U3XRZ_Z破壊_破砕無",
        "world": 60,
        "area": 5,
        "route": "2-L-M-U1-U2-U3-X-P2-R-Z",
        "url": "28m7hlg4+",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: M$e基地: [R, X, U2]集中$e阻塞気球: ボス"
    },
    {
        "title": "60-6_JJ3MNO_O削り", // 6-1
        "world": 60,
        "area": 6,
        "route": "2-G-J-J3-M-N-O",
        "url": "292srgpk+",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: (ボス, ボス, J)集中"
    },
    {
        "title": "60-6_JJ3MNO_O破壊",
        "world": 60,
        "area": 6,
        "route": "2-G-J-J3-M-N-O",
        "url": "29f8t2xx+",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: 3部隊ボス集中"
    },
    {
        "title": "60-6_JJ2PTV_V削り", // 6-2
        "world": 60,
        "area": 6,
        "route": "2-G-J-J2-P-R-T-V",
        "url": "26r2z4qc+",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ2PTV_V破壊",
        "world": 60,
        "area": 6,
        "route": "2-G-J-J2-P-R-T-V",
        "url": "22c7p5zq+",
        "memo": "陣形: タッチなし想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ1PRSXZ_Z削り", // 6-3
        "world": 60,
        "area": 6,
        "route": "3-J-J1-P-R-S-X-Z",
        "url": "2aetng7s+",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: J$e基地: ボス集中"
    },
    {
        "title": "60-6_JJ1PRSXZ_Z破壊_破砕有",
        "world": 60,
        "area": 6,
        "route": "3-J-J1-P-R-S-X-Z",
        "url": "2ym6wo73+",
        "memo": "陣形: ネルソンタッチ想定$e煙幕: J$e基地: ボス集中"
    },
]; // @expansion
/*
{
    "title": "",
    "world": ,
    "area": ,
    "route": "",
    "url": "",
    "memo": ""
},

*/

export default templates;