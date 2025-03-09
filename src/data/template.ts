// タイトルがkeyも兼ねる

import { Ttemplate } from "@/classes/types";

/*
    e: 改行
*/
const templates: Ttemplate[] = [
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
    // @1
    {
        "title": "1-3_CFJ",
        "world": 1,
        "area": 3,
        "route": "1-C-F-J",
        "url": "27ffz8ba+",
        "memo": "none"
    },
    {
        "title": "1-4_BHL",
        "world": 1,
        "area": 4,
        "route": "1-B-C-F-E-H-L",
        "url": "2d3n34oe+",
        "memo": "none"
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
        "memo": "none"
    },
    {
        "title": "1-6_EKJD",
        "world": 1,
        "area": 6,
        "route": "1-A-E-G-K-M-J-D-N",
        "url": "2xurzrzs+",
        "memo": "none"
    },
    // @2
    {
        "title": "2-1_CH",
        "world": 2,
        "area": 1,
        "route": "1-C-E-H",
        "url": "2cwk4rbz+",
        "memo": "none"
    },
    {
        "title": "2-1_CDH",
        "world": 2,
        "area": 1,
        "route": "1-C-D-H",
        "url": "2akvpfvo+",
        "memo": "none"
    },
    {
        "title": "2-3_EFJN",
        "world": 2,
        "area": 3,
        "route": "1-B-E-F-J-N",
        "url": "23292uy5+",
        "memo": "none"
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
        "memo": "none"
    },
    {
        "title": "2-5_BFEO",
        "world": 2,
        "area": 5,
        "route": "1-B-F-E-I-O",
        "url": "23e35zje+",
        "memo": "none"
    },
    {
        "title": "2-5_CEO",
        "world": 2,
        "area": 5,
        "route": "1-C-E-I-O",
        "url": "2xrxba6u+",
        "memo": "none"
    },
    // @3
    {
        "title": "3-1_CFG",
        "world": 3,
        "area": 1,
        "route": "1-C-F-G",
        "url": "29ffx6lz+",
        "memo": "none"
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
        "memo": "none"
    },
    {
        "title": "4-2_BDCL",
        "world": 4,
        "area": 2,
        "route": "1-B-D-C-L",
        "url": "27umx2k3+",
        "memo": "none"
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
        "memo": "none"
    },
    {
        "title": "5-1_BEGJ",
        "world": 5,
        "area": 1,
        "route": "1-B-E-G-J",
        "url": "2xkewumu+",
        "memo": "none"
    },
    {
        "title": "5-2_CDFO",
        "world": 5,
        "area": 2,
        "route": "1-B-C-D-F-O",
        "url": "2c7sg9zq+",
        "memo": "none"
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
        "memo": "none"
    },
    {
        "title": "6-1_CFHK",
        "world": 6,
        "area": 1,
        "route": "1-C-F-G-H-K",
        "url": "2avaerm2+",
        "memo": "none"
    },
    {
        "title": "6-2_CJK",
        "world": 6,
        "area": 2,
        "route": "1-C-E-J-K",
        "url": "25pprd5g+",
        "memo": "none"
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
];

export default templates;