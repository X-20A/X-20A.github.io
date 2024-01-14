$(function() {
    /*
    s_dataはship.js
    e_dataはitem.jsより
    idがs_dataは文字列
    e_dataは数字であることに注意
    */
    //艦隊諸元
    let com = {
        BB:0, //戦艦
        BBV:0, //航空戦艦&改装航空戦艦
        CV:0, //正規空母
        CVB:0, //装甲空母
        CVL:0, //軽空母
        CA:0, //重巡
        CAV:0, //航巡
        CL:0, //軽巡
        CLT:0, //雷巡
        ATU:0, //練習特務艦 欠番
        CT:0, //練習巡洋艦
        DD:0, //駆逐艦
        DE:0, //海防艦
        SS:0, //潜水艦
        SSV:0, //潜水空母
        AV:0, //水母
        AO:0, //補給艦
        ASU:0, //特務艦 欠番
        LHT:0, //灯台補給船 欠番
        CVE:0, //特設護衛空母 欠番
        LHA:0, //揚陸艦
        LST:0, //戦車揚陸艦 欠番
        AS:0, //潜水母艦
        AR:0 //工作艦
    };
    let i_json = null; //インポートしたjsonを格納
    let f_ids = null; //艦隊のid
    let f_length = 0; //構成艦数
    let f_names = null; //構成艦艦名
    let speed = null;
    let f_search = null;
    
    //値は初期値で実際にはlocalstorageから取得する
    var units = {'2-5':{'D':'0'},'3-2':{'R':'0'},'5-3':{'D':'0','C':'0'},'5-4':{'D':'0','C':'0'},'5-5':{'D':'0','C':'0'}};
    var active = {'4-5':{'A':'D','C':'F','I':'J'},'5-3':{'O':'K'}, '5-5':{'F':'D'}, '6-3':{'A':'B'},'7-3':{'0':'0'},'7-4':{'F':'H'},'7-5':{'F':'G','H':'I','O':'P'}};
    
    //入力
    var area = null;
    
    //オプション表示の為のz-index
    var z_value = 10;
    
    //演算開始の為のフラグ
    var a_flag = false;
    var f_flag = false;
    
    var rate = {};
    //軌跡
    var track = [];

    $('#area').on('input', function() {
        var text = $('#area').val();
        const areas = ['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5','3-1','3-2','3-3','3-4','3-5','4-1','4-2','4-3','4-4','4-5','5-1','5-2','5-3','5-4','5-5','6-1','6-2','6-3','6-4','6-5','7-1','7-2','7-3','7-3-1','7-4','7-5'];
        const op_areas = ['2-5','3-2','4-5','5-3','5-4','5-5','6-3','7-3','7-4','7-5'];
        if(areas.includes(text)) {
            a_flag = true;
            localStorage.setItem('area', text);
            if(op_areas.includes(text)) {
                //オプション必要が海域は入力を表示
                $('#option-box').css('display','block');
                $('#' + text).css('zIndex', z_value);
                z_value += 10;
            } else {
                $('#option-box').css('display','none');
            }
        } else {
            a_flag = false;
            $('#option-box').css('display','none');
        }
        checkFlag();
    });
    //オプションが変更されたら取得してlocalstorageへ保存
    $('.options > input').on('input', function() {
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        var key = name.slice(0,3);
        var char = name.slice(-1);
        console.log(`key : ${key}, char : ${char}`);
        if($(this).attr('type') === 'radio') {
            //能動分岐&7-3解放如何
            var elem = localStorage.getItem('active');
            if(elem) {
                elem = JSON.parse(elem);
                elem[key][char] = $(this).val();
            } else {
                elem = active;
                elem[key][char] = $(this).val();
            }
            active = elem;
            localStorage.setItem('active', JSON.stringify(elem));
        } else if($(this).attr('type') === 'number'){
            //ドラム缶 or 大発 or 電探
            var elem = localStorage.getItem('units');
            if(elem) {
                elem = JSON.parse(elem);
                elem[key][char] = $(this).val();
            } else {
                elem = units;
                elem[key][char] = $(this).val();
            }
            localStorage.setItem('units', JSON.stringify(elem));
        }
    });
    //自艦隊読み込み
    $('#fleet-import').on('input', function() {
        var text = $(this).val();
        try {
            i_json = JSON.parse(text);
        } catch(e) {
            f_flag = false;
            alert('入力値不正');
            return;
        }
        //空欄化
        $(this).val('');
        //初期化してから
        for (var key in com) {
            com[key] = 0;
        }
        //艦隊の構成艦数
        f_length = countShips();
        console.log(`f_length : ${f_length}`);
        //構成艦のid
        f_ids = getIdsFromFleet();
        console.log(`f_ids : ${f_ids}`);
        //構成艦の名前
        f_names = getShipName();
        console.log(`f_names : ${f_names}`);
        let types = getType();
        console.log(`types : ${types}`);
        //変数反映
        reflectionCom(types);
        //索敵値
        f_search = calcSeek();
        console.log(`f_search : ${f_search}`);
        //速度
        speed = calcSpeed();
        console.log(`speed : ${speed}`);
        //丸ごとlocalstorageへ
        localStorage.setItem('fleet', JSON.stringify(i_json));
        //ひとまずjsonが正常に読まれればフラグは立てる
        f_flag = true;
        checkFlag();
        //表示
        reloadImportDisplay();
    });
    
    //速度を取得 高速+艦隊etc
    function calcSpeed() {
        let arr = [];
        for(let i = 0;i < f_length;i++) {
            let e_ids = getEqIds(f_ids[i]);
            let rf = getEqIds(f_ids[i]);
            /*
            33:タービン
            34:強化缶
            87:新型缶
            */
            let tur = e_ids.includes(33); //タービン
            let kan = 0; //強化缶
            let n_kan = 0; //新型缶
            let pow = 0; //新型缶☆7↑
            for(let q = 0;q < e_ids.length;q++) {
                if(e_ids[q] === 34) {
                    kan++;
                } else if(e_ids[q] === 87) {
                    n_kan++;
                    if(rf[q] > 6) {
                        pow++;
                    }
                }
            }
            let kans = kan + n_kan;
            let ship = s_data.find(entry => entry.id === f_ids[i]);
            let sg = ship.sg;
            let val = 0;
            switch(sg) { //thanks to Aerial Combat Simulator 無駄がなく美しい
                case 0: //高速A
                    val = 1;
                    if(tur && n_kan || pow > 1) {
                        val = 3;
                    } else if(tur && kans || pow) {
                        val = 2;
                    }
                    arr.push(val);
                    break;
                case 1: //高速B1
                    val = 1;
                    if(tur && n_kan && kans > 1) {
                        val = 3;
                    } else if(tur && kans) {
                        val = 2;
                    }
                    arr.push(val);
                    break;
                case 2://高速B2
                    val = 1;
                    if(tur &&(n_kan > 1 || kans > 2)) {
                        val = 3;
                    } else if(tur && kans) {
                        val = 2;
                    }
                    arr.push(val);
                    break;
                case 3: //高速C
                    val = 1;
                    if(tur && kans) {
                        val = 2;
                    }
                    arr.push(val);
                    break;
                case 4: //低速A群
                    val = 0;
                    if(tur && n_kan && kans > 2) {
                        val = 3;
                    } else if(tur && pow > 1) {
                        val = 3;
                    } else if(tur && n_kan && kans > 1) {
                        val = 2;
                    } else if(tur && pow) {
                        val = 2;
                    } else if(tur && kans) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
                case 5: //低速B
                    val = 0;
                    if(tur && (n_kan > 1 || kans > 2)) {
                        val = 2;
                    } else if(tur && kans) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
                case 6: //低速C
                    val = 0;
                    if(tur && kans) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
                case 7: //低速D
                    val = 0;
                    if(tur && n_kan) {
                        val = 2;
                    } else if(n_kan || tur && kans) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
                case 8: //低速E
                    val = 0;
                    if(tur && n_kan && kans > 1) {
                        val = 3;
                    } else if(tur && n_kan) {
                        val = 2;
                    } else if(tur && kans) {
                        val = 1;
                    } else if(n_kan) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
                case 9: //サミュ/改&夕張改二特
                    val = 0;
                    if(tur && (n_kan > 1 || kans > 2)) {
                        val = 2;
                    } else if(tur) {
                        val = 1;
                    }
                    arr.push(val);
                    break;
            }
        }
        console.log(`艦隊各速度 : ${arr}`);
        let res = '';
        if(arr.every(elem => elem === 3)) {
            res = '最速艦隊';
        } else if(arr.every(elem => elem === 2)) {
            res = '高速+艦隊';
        } else if(arr.every(elem => elem === 1)) {
            res = '高速艦隊';
        } else {
            res = '低速艦隊';
        }
        return res;
    }
    
    //構成艦のidを取得 配列で返す
    function getIdsFromFleet() {
        const ids = [];
        for (let i = 1; i <= f_length; i++) {
            const key = "s" + i;
            if (i_json.f1[key] && i_json.f1[key].hasOwnProperty("id")) {
                ids.push('' + i_json.f1[key].id); //文字列化
            }
        }
        return ids;
    }
    
    //構成艦数カウント
    function countShips() {
        // f1内のsキーの配下にあるオブジェクト数をカウント
        const count = Object.keys(i_json.f1).filter(key => /^s\d+$/.test(key)).length;
        return count;
    }
    
    // 索敵計算
    function calcSeek() {
        let res = [];
        let sum_base = 0; //艦娘索敵値によるスコア
        let f_length_correct = 2 * (6 - f_length); //隻数補正
        let sum_eq = 0; //装備によるスコア
        let command = i_json.hqlv * 0.4 //司令部補正
        for (let i = 0; i < f_length; i++) {
            //素の索敵値計算
            const key = "s" + (i + 1);
            let lv = i_json['f1'][key]['lv'];
            //索敵値の最大値と最小値を取得
            let ship = s_data.find(entry => entry.id === f_ids[i]);
            let min_seek = ship.seek;
            let max_seek = ship.max_seek;
            let cur_seek = 0;
            if(lv > 98) {
                cur_seek = max_seek;
            } else {
                cur_seek = Math.floor((max_seek - min_seek) / 98 * lv + min_seek); //多分不完全
            }
            console.log(`艦名 : ${f_names[i]}, 素索敵値 : ${cur_seek}`);
            //素の索敵値の平方根を加算
            sum_base += Math.sqrt(cur_seek);
            
            //装備id取得
            let i_ids = getEqIds(f_ids[i]);
            console.log(`装備id : ${i_ids}`);
            let bonus = getSeekBonus(ship, i_ids);
            console.log(`seek_bonus : ${bonus}`);
            //素の索敵値に加算してみる 要検証
            sum_base += bonus;
            //改修値取得
            let rf = getEqRfs(f_ids[i]);
            for(let q = 0;q < i_ids.length;q++) {
                //装備の索敵値が1以上だったらあれこれ
                let eq = e_data.find(entry => entry.id === i_ids[q]);
                let seek = eq.seek;
                if(seek > 0) {
                    //係数
                    let coefficient = getEqCo(i_ids[q]);
                    sum_eq += coefficient[0] * (seek + coefficient[1] * Math.sqrt(rf[q]));
                }
            }
        }
        let material = sum_base + f_length_correct - command;
        //係数 四捨五入で小数第二位まで
        res.push((material + sum_eq).toFixed(2));
        res.push((material + sum_eq * 2).toFixed(2));
        res.push((material + sum_eq * 3).toFixed(2));
        res.push((material + sum_eq * 4).toFixed(2));
        return res;
    }
    
    //装備ボーナス取得 艦のjson, 装備id(配列)
    function getSeekBonus(ship, e_ids) {
        let res = 0;
        let name = ship.name;
        let na = ship.na;
        let type = ship.type;
        let dup = []; // 重複不可のがきたらこれに追加
        let e_length = e_ids.length;
        for(let i = 0;i < e_length;i++) {
            let e_id = e_ids[i];
            let eq = e_data.find(entry => entry.id === e_id);
            switch(e_id) {
                case 315: //SG初期
                    if(name === '丹陽' || name === '雪風改二') {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(na === 1) {
                        res += 4;
                    }
                    break;
                case 456: //SG後期
                    if(name === '丹陽' || name === '雪風改二') {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(na === 1) {
                        res += 4;
                    } else if(na === 3) {
                        res += 2;
                    }
                    break;
                case 278: // SK
                    if(na === 1) {
                        if(!dup.includes(e_id)) {
                            res += 1;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 279: //SK+SG
                    if(na === 1) {
                        if(!dup.includes(e_id)) {
                            res += 2;
                            dup.push(e_id);
                        }
                    } else if(na === 3) {
                        if(!dup.includes(e_id)) {
                            res += 1;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 517: // 清霜逆探
                    var gifted = ['朝霜改二','清霜改二','初霜改二','潮改二','Верный','霞改二','時雨改三','雪風改二'];
                    if(name === '清霜改二丁') {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(gifted.includes(name)) {
                        if(!dup.includes(e_id)) {
                            res += 2;
                            dup.push(e_id);
                        }
                    } else if(na === 0 && type === '駆逐艦') {
                        if(!dup.includes(e_id)) {
                            res += 1;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 30: // 21号対空電探
                case 410: // 21号対空電探改二
                    let akizuki = ['秋月','照月','初月','涼月','冬月'];
                    let mogami = ['最上改','最上改二','最上改二特'];
                    if(akizuki.some(item => item.includes(name)) || mogami.includes(name)) {
                        if(!dup.includes(e_id)) {
                            res += 2;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 118: // 紫雲
                    if(name.includes('大淀')) {
                        res += 2;
                        let eq = e_data.find(entry => entry.id === e_id);
                        if(eq.rf === 10) { // 改修maxで更に+1
                            res += 1;
                        }
                    }
                    break;
                case 414: // SOC seagull
                    if(na === 1) {
                        if(type === '軽巡洋艦' || type === '重巡洋艦') {
                            if(!dup.includes(e_id)) {
                                res += 2;
                                //改修でさらにボーナス
                                if(eq.rf > 3) {
                                    res += 1;
                                }
                                dup.push(e_id);
                            }
                        } else if(type === '戦艦' || type === '巡洋戦艦') {
                            if(!dup.includes(e_id)) {
                                res += 1;
                                dup.push(e_id);
                            }
                        }
                    }
                    break; //Fairey Seafox改
                case 115:
                    if(name.includes('Bismarck') || name.includes('Prinz Eugen')) {
                        res += 2;
                    }
                    break;
                case 371:
                    if(name.includes('Gotland')) {
                        if(!dup.includes(e_id)) {
                            res += 6;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Nelson')) {
                        if(!dup.includes(e_id)) {
                            res += 5;
                            dup.push(e_id);
                        }   
                    } else if(name.includes('Commandant Teste')) {
                        if(!dup.includes(e_id)) {
                            res += 4;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Warspite') || name.includes('Richelieu') || name.includes('Jean Bart')) {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 370: //Swordfish Mk.II改(水偵型)
                    if(name.includes('Warspite')) {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Nelson') || name.includes('Sheffield') || name.includes('Gotland')) {
                        if(!dup.includes(e_id)) {
                            res += 2;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Commandant Teste') || name.includes('瑞穂') || name.includes('神威')) {
                        if(!dup.includes(e_id)) {
                            res += 1;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 194: //Laté 298B
                    var gifted = ['Commandant Teste','Richelieu','Jean Bart','瑞穂','神威'];
                    if(gifted.some(item => item.includes(name))) {
                        res += 2;
                        dup.push(e_id);
                    }
                    break;
                case 415: //SO3C Seamew改
                    if(na === 1) {
                        if(type === '軽巡洋艦' || type === '重巡洋艦') {
                            if(!dup.includes(e_id)) {
                                res += 2;
                                dup.push(e_id);
                            }
                        } else if(type === '戦艦' || type === '巡洋戦艦') {
                            if(!dup.includes(e_id)) {
                                res += 1;
                                dup.push(e_id);
                            }
                        }
                    }
                    break;
                case 369: //Swordfish Mk.III改(水上機型/熟練)
                    if(name === 'Gotland andra') {
                        if(dup.filter(item => item === e_id).length === 0) {
                            res += 4;
                            dup.push(e_id);
                        } else if(dup.filter(item => item === e_id).length === 1) {
                            res += 1;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Gotland') || name.includes('Commandant Teste')) {
                        if(!dup.includes(e_id)) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(name.includes('瑞穂') || name.includes('神威')) {
                        if(!dup.includes(e_id)) {
                            res += 2;
                            dup.push(e_id);
                        }
                    }
                    break;
                case 368: //Swordfish Mk.III改(水上機型)
                    if(name === 'Gotland andra') {
                        if(dup.filter(item => item === e_id).length === 0) {
                            res += 4;
                            dup.push(e_id);
                        } else if(dup.filter(item => item === e_id).length < 5) {
                            res += 3;
                            dup.push(e_id);
                        }
                    } else if(name.includes('Gotland')) {
                        res += 3;
                    } else if(name.includes('Commandant Teste') || name.includes('瑞穂') || name.includes('神威')) {
                        res += 2;
                    }
                    break;
                case 367: //Swordfish(水上機型)
                    if(name.includes('Gotland') || name.includes('Commandant Teste') || name.includes('瑞穂') || name.includes('神威')) {
                        res += 1;
                    }
                    break;
                case 408: //装甲艇(AB艇)
                    if(name.includes('神州丸')) {
                        res += 2;
                    } else if(name.includes('あきつ丸') || type === '駆逐艦') {//本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
                        res += 1;
                    }
                    break;
                case 409: //武装大発
                    if(name.includes('神州丸')) {
                        res += 2;
                    } else if(name.includes('あきつ丸')) {//本来大発の乗る駆逐艦だが、駆逐に乗ってる時点でボーナスつけちゃう
                        res += 1;
                    }
                    break;
            }
        }
        return res;
    }
    
    //装備係数&改修係数取得 配列[装備係数, 改修係数]を返す
    function getEqCo(id) {
        let res = [];
        //typeを取得
        let entry = e_data.find(entry => entry.id === id);
        //typeの先頭3つを連結してidとして扱う
        let e_id = entry.type.slice(0, 3).join('');
        //やや無駄になるが2回に分けた方が見やすくて良いと思う
        switch(e_id) {
            //装備係数
            case '356': //艦戦
            case '357': //艦爆
            case '53645': //水戦
            case '173341': //大型飛行艇
            case '31626': //対潜哨戒機
            case '31525': //回転翼機
            case '34057': //噴式戦闘爆撃機
            case '111': //小口径主砲
            case '112': //中口径主砲
            case '5812': //小型電探
            case '5813': //大型電探
            case '244251': //潜水電探
            case '2332': //潜水魚雷
            case '71014': //ソナー
            case '71040': //大型ソナー
            case '81829': //探照灯
            case '81842': //大型探照灯
            case '132335': //航空要員
            case '162739': //見張員
            case '122234': //司令部
            case '2422': //甲標的
            case '84724': //AB艇
                res.push(0.6);
                break;
            case '358': //艦攻
                res.push(0.8);
                break;
            case '579': //艦偵
                res.push(1);
                break;
            case '54311': //水爆
                res.push(1.1);
                break;
            case '5710': //水偵
                res.push(1.2);
                break;
        }
        switch(e_id) {
            //改修係数
            case '31525': //回転翼機
                res.push(0);
                break;
            case '54311': //水爆
                res.push(1.15);
                break;
            case '579': //艦偵
            case '173341': //大型飛行艇
            case '5710': //水偵
                res.push(1.2);
                break;
            case '5812': //小型電探
                res.push(1.25);
                break;
            case '5813': //大型電探
                res.push(1.4);
                break;
            default:
                res.push(0);
                break;
        }
        return res;
    }
    
    // 艦idから装備idを配列で得る
    function getEqIds(s_id) {
        const ids = [];
        // f1 下の各要素を調べる
        for (const s_key in i_json.f1) {
            let ship = i_json.f1[s_key];
            if (ship.id && ship.id === Number(s_id)) {
                let items = ship.items;
                for(const i_key in items) {
                    if(items[i_key].id) {
                        ids.push(items[i_key].id);
                    }
                }
            }
        }
        return ids;
    }
    
    // 艦idから装備改修値を配列で得る
    function getEqRfs(s_id) {
        const rfs = [];
        // f1 下の各要素を調べる
        for (const s_key in i_json.f1) {
            let ship = i_json.f1[s_key];
            if (ship.id && ship.id === Number(s_id)) {
                let items = ship.items;
                for(const i_key in items) {
                    if(items[i_key].id) {
                        rfs.push(items[i_key].rf);
                    }
                }
            }
        }
        console.log(`改修値 : ${rfs}`);
        return rfs;
    }
    
    //変数に反映
    function reflectionCom(types) {
        let res = [];
        for(let i = 0;i < types.length;i++) {
            switch(types[i]) {
                case '戦艦':
                case '巡洋戦艦':
                    com['BB']++;
                    break;
                case '航空戦艦':
                    com['BBV']++;
                    break;
                case '正規空母':
                    com['CV']++;
                    break;
                case '装甲空母':
                    com['CVB']++;
                    break;
                case '軽空母':
                    com['CVL']++;
                    break;
                case '重巡洋艦':
                    com['CA']++;
                    break;
                case '航空巡洋艦':
                    com['CAV']++;
                    break;
                case '軽巡洋艦':
                    com['CL']++;
                    break;
                case '重雷装巡洋艦':
                    com['CLT']++;
                    break;
                case '練習巡洋艦':
                    com['CT']++;
                    break;
                case '駆逐艦':
                    com['DD']++;
                    break;
                case '海防艦':
                    com['DE']++;
                    break;
                case '潜水艦':
                    com['SS']++;
                    break;
                case '潜水空母':
                    com['SSV']++;
                    break;
                case '水上機母艦':
                    com['AV']++;
                    break;
                case '補給艦':
                    com['AO']++;
                    break;
                case '揚陸艦':
                    com['LHA']++;
                    break;
                case '潜水母艦':
                    com['AS']++;
                    break;
                case '工作艦':
                    com['AR']++;
                    break;
            }
        }
    }
    
    //構成艦の名前を配列で返す
    function getShipName() {
        let names = [];
        for (let id of f_ids) {
            let ship = s_data.find((item) => item.id === id);
            if (ship) {
                names.push(ship.name);
            }
        }
        return names;
    }
    
    //idから艦種取得 配列で渡す
    function getType() {
        let types = [];
        for (let id of f_ids) {
            let entry = s_data.find(entry => entry.id === id);
            if (entry) {
                types.push(entry.type);
            }
        }
        return types;
    }
    
    //艦隊情報表示
    function reloadImportDisplay() {
        $('#import-display').empty();
        let part = `${f_names[0]}`;
        for(let i = 1;i < f_length;i++) {
            part += ` | ${f_names[i]}`;
        }
        if(f_names && speed && f_search) {
            $('#import-display').append(`<p>${speed}</p><p>${part}</p><p>索敵値: <strong>1: </strong>${f_search[0]} <strong>2: </strong>${f_search[1]} <strong>3: </strong>${f_search[2]} <strong>4: </strong>${f_search[3]}</p>`);
        }
    }
    
    //フラグをチェックして開始ボタン無効 or 有効
    function checkFlag() {
        if(a_flag && f_flag) {
            $('#go').prop('disabled', false);
        } else {
            $('#go').prop('disabled', true);
        }
    }
    
    //以下分岐条件及び必要な関数
    
    //指定した海域におけるドラム缶搭載艦数
    function getDrum(world, map) {
        return Number(JSON.parse(localStorage.getItem('units'))[world + '-' + map]['D']);
    }
    //同上 大発
    function getCraft(world, map) {
        return Number(JSON.parse(localStorage.getItem('units'))[world + '-' + map]['C']);
    }
    //同上 電探
    function getRadar(world, map) {
        return Number(JSON.parse(localStorage.getItem('units'))[world + '-' + map]['R']);
    }
    //特定の艦が含まれるかチェック
    //改、改二等後に続く文字列は許容するが名前が変わる場合は都度呼び出すこと
    function isInclude(name) {
        // 配列をループして各要素を調べる
        for (let i = 0; i < f_length; i++) {
            const element = f_names[i];
            // 要素内でワードが存在するかチェック
            if (element.includes(name)) {
                return true; // ワードが見つかった場合、trueを返す
            }
        }
        // ループを抜けても見つからなかった場合、falseを返す
        return false;
    }
    //高速+艦隊か最速艦隊であればtrue
    function isFaster() {
        if(speed === '高速+艦隊' || speed === '最速艦隊') {
            return true;
        } else {
            return false;
        }
    }
    //旗艦が軽巡であればtrue
    function isFCL () {
        var name = f_names[0];
        //先頭一致
        var clsName = ['矢矧','能代','Helena','Brooklyn','Honolulu','神通','Sheffield','L.d.S.D.d.Abruzzi','G.Garibaldi','Perth','大淀','球磨','De Ruyter','長良','名取','川内','那珂','阿賀野','酒匂','天龍','Atlanta','五十鈴','多摩','Gotland','鬼怒','由良','阿武隈','夕張','龍田'];
        //こちらは完全一致
        var exCL = ['北上','大井','木曾','木曾改'];
        if(clsName.some(item => item.startsWith(name))) {
            return true;
        } else if(exCL.includes(name)) {
            return true;
        }
        return false;
    }
    //低速戦艦をカウント
    function slowBB() {
        var slowBBs = ['扶桑','山城','伊勢','日向','長門','長門改','長門改二','陸奥','陸奥改','陸奥改二','大和','大和改','武蔵','武蔵改','武蔵改二','Conte di Cavour','Nevada','Nevada改','Nevada改 Mod.2','Colorado','Colorado改','Maryland','Marylan改','Warspite','Warspite改','Nelson','Nelson改','Rodney','Rodney改','Гангут','Октябрьская революция','Гангут два'];
        // 配列arr1の要素をセットに変換
        const set = new Set(f_names);
        // 配列arr2の要素を1つずつ調べて、重複があるか確認
        var count = 0;
        for (const element of slowBBs) {
            if (set.has(element)) {
                count++;
            }
        }
        return count;
    }
    //大鷹型カウント
    function countTaiyo() {
        var taiyos = ['春日丸', '大鷹', '八幡丸', '雲鷹', '神鷹'];
        var count = 0;
        for (const element of f_names) {
            for (const name of taiyos) {
                if (element.startsWith(name)) {
                    count++;
                    break; // 一致した場合、内側のループを抜けます
                }
            }
        }
        return count;
    }
    //ルートカウント
    function sum(route) {
        //無ければ追加、あれば加算
        rate[route] ? rate[route] += 1:rate[route] = 1;
        //追跡
        track.push(route.split('to')[1]);
    }
    //百分率で指定 小数第一位まで可
    //指定した確率でtrue
    function sai(num) {
        // 0から100までの乱数を生成
        const randomValue = Math.random() * 100;
        // 引数で指定された小数以下第一位までの値に変換
        const roundedNum = Math.round(num * 10) / 10;
        // 1から100の間で指定された値以下であればtrueを返す
        return randomValue <= roundedNum;
    }
    //マップをworld-map,マスをアルファベットで、スタート地点ならnull
    //再帰にするとスタックする
    //纏められそうなのもあるが実装優先で愚直に書く
    //但し条件から漏れると即無限ループなので必ずelse等で拾うこと
    function judge(world, map, edge) {
        const BB = com['BB']; //戦艦
        const BBV = com['BBV'];//航空戦艦&改装航空戦艦
        const CV = com['CV']; //正規空母
        const CVB = com['CVB']; //装甲空母
        const CVL = com['CVL']; //軽空母
        const CA = com['CA']; //重巡
        const CAV = com['CAV']; //航巡
        const CL = com['CL']; //軽巡
        const CLT = com['CLT']; //雷巡
        const ATU = com['ATU']; //練習特務艦
        const CT = com['CT']; //練習巡洋艦
        const DD = com['DD']; //駆逐艦 ※テスト
        const DE = com['DE']; //海防艦
        const SS = com['SS']; //潜水艦
        const SSV = com['SSV']; //潜水空母
        const AV = com['AV']; //水母
        const AO = com['AO']; //補給艦
        const ASU = com['ASU']; //特務艦
        const LHT = com['LHT']; //灯台補給船
        const CVE = com['CVE']; //特設護衛空母
        const LHA = com['LHA']; //揚陸艦
        const LST = com['LST']; //戦車揚陸艦
        const AS = com['AS']; //潜水母艦
        const AR = com['AR']; //工作艦
        
        const BBs = BB + BBV; //戦艦級
        const CVs = CV + CVL + CVB; //空母系
        const BBCVs = BBs + CVs; //戦艦級+空母系
        const CAs = CA + CAV; //重巡級
        const Ds = DD + DE; //駆逐艦 + 海防艦
        switch(world) {
            case 1:
                switch(map) {
                    case 1: //@1-1
                        switch(edge) {
                            case null:
                                sum('1toA');
                                return 'A';
                                break;
                            case 'A':
                                switch(f_length) {
                                    case 1:
                                        sai(80)?sum('AtoC'):sum('AtoB');
                                        break;
                                    case 2:
                                        sai(75)?sum('AtoC'):sum('AtoB');
                                        break;
                                    case 3:
                                        sai(70)?sum('AtoC'):sum('AtoB');
                                        break;
                                    case 4:
                                        sai(65)?sum('AtoC'):sum('AtoB');
                                        break;
                                    case 5:
                                        sai(60)?sum('AtoC'):sum('AtoB');
                                        break;
                                    case 6:
                                        sai(55)?sum('AtoC'):sum('AtoB');
                                        break;
                                }
                                return null;
                                break;
                        }
                        break;
                    case 2: //@1-2
                        switch(edge) {
                            case null:
                                if(Ds === 4 && f_length < 6) {
                                    sum('1toA');
                                    return 'A';
                                } else {
                                    switch(f_length) {
                                        case 6:
                                            if(sai(40)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoC');
                                                return null;
                                            }
                                            break;
                                        case 5:
                                            if(sai(50)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoC');
                                                return null;
                                            }
                                            break;
                                        case 4:
                                            if(sai(60)) {
                                               sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoC');
                                                return null;
                                            }
                                            break;
                                        default:
                                            if(sai(70)) {
                                               sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoC');
                                                return null;
                                            }
                                    }
                                    break;
                                }
                                break;
                            case 'A':
                                if(speed !== '低速艦隊') {
                                    sum('AtoE');
                                } else if(Ds < 4) {
                                    sum('AtoD');
                                    sum('DtoE');
                                } else if(Ds === 6) {
                                    sum('AtoE');
                                } else if(CL + CT === 1 && Ds === 5) {
                                    sum('AtoE');
                                } else if(CL === 1 && Ds > 3) {
                                    sum('AtoE');
                                } else {
                                    if(sai(65)) {
                                        sum('AtoE');
                                    } else {
                                        sum('AtoD');
                                        sum('DtoE');
                                    }
                                }
                                return null;
                            }
                        break;
                    case 3: //@1-3
                        switch(edge) {
                            case null:
                                if(AO + AV > 0) {
                                    sum('1toA');
                                    return 'A';
                                } else if(CVs > 0) {
                                    sum('1toC');
                                    sum('CtoF');
                                    return 'F';
                                } else {
                                    if(sai(50)) {
                                        sum('1toA');
                                        return 'A';
                                    } else {
                                        sum('1toC');
                                        sum('CtoF');
                                        return 'F';
                                    }
                                }
                                break;
                            case 'A':
                                if(AO > 0 || DE > 3) {
                                    sum('AtoD');
                                    sum('DtoB');
                                    sum('BtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(AV > 0 || Ds > 3) {
                                    if(sai(80)) {
                                        sum('AtoD');
                                        sum('DtoB');
                                        sum('BtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                } else if(SS > 0) {
                                    sum('AtoE');
                                    sum['EtoF'];
                                    return 'F';
                                } else {
                                    if(sai(50)) {
                                        sum('AtoD');
                                        sum('DtoB');
                                        sum('BtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                }
                                break;
                            case 'F':
                                if(CV > 0 || slowBB() > 0) {
                                    sum('FtoH');
                                    return 'H';
                                } else if((CAV > 0 && DD > 1) || DD > 3 || ((CL + CT > 0) && Ds > 3)) {
                                    sum('FtoJ');
                                    return null;
                                } else if(speed !== '低速艦隊') {
                                    if(speed(60)) {
                                        sum('FtoJ');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return 'H';
                                    }
                                } else {
                                    if(sai(60)) {
                                        sum('FtoH');
                                        return 'H';
                                    } else {
                                        sum('FtoJ');
                                        return null;
                                    }
                                }
                                break;
                            case 'H':
                                if(AO > 0) {
                                    sum('HtoG');
                                    return null;
                                } else if(AV + CAV > 0 || (CL+ CT > 0 && DD > 1)) {
                                    sum('HtoJ');
                                    return null;
                                } else if(DD > 1) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.4) {
                                        sum('HtoG');
                                    } else if(num <= 0.8) {
                                        sum('HtoJ');
                                    } else {
                                        sum['HtoI'];
                                    }
                                    return null;
                                } else {
                                    if(sai(60)) {
                                        sum('HtoI');
                                    } else {
                                        sum('HtoJ');
                                    }
                                }
                                return null;
                                break;
                        }
                        break;
                    case 4: //@1-4
                        switch(edge) {
                            case null:
                                if(sai(50)) {
                                    sum('1toA');
                                    sum('AtoD');
                                    return 'D';
                                } else {
                                    sum('1toB');
                                    sum('BtoC');
                                    sum('CtoF');
                                    return 'F';
                                }
                                break;
                            case 'B':
                                if((CVs > 2) || BBs > 2 || Ds === 0) {
                                    sum('BtoD');
                                    return 'D';
                                } else if(Ds > 2) {
                                    sum('BtoC');
                                    return 'C';
                                }else if(CL > 0) {
                                    if(sai(80)) {
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('BtoD');
                                        return 'D';
                                    }
                                } else if(sai(60)) {
                                    sum('BtoC');
                                    return 'C';
                                } else {
                                    sum('BtoD');
                                    return 'D';
                                }
                                break;
                            case 'D':
                                if(AS > 0) {
                                    sum('DtoE');
                                    sum('EtoH');
                                    sum('HtoL');
                                    return null;
                                } else if(AV > 0) {
                                    sum('DtoG');
                                    sum('GtoJ');
                                    return 'J';
                                }else if(sai(50)) {
                                    sum('DtoE');
                                    sum('EtoH');
                                    sum('HtoL');
                                    return null;
                                } else {
                                    sum('DtoG');
                                    sum('GtoJ');
                                    return 'J';
                                }
                                break;
                            case 'F':
                                if(Ds > 3) {
                                    sum('FtoE');
                                    sum('EtoH');
                                    sum('HtoL');
                                    return null;
                                } else if(Ds > 1) {
                                    if(AV + AS + AO > 0 || BBV === 2) {
                                        sum('FtoE');
                                        sum('EtoH');
                                        sum('HtoL');
                                        return null;
                                    } else if(Ds === 3) {
                                        if(sai(80)) {
                                            sum('FtoE');
                                            sum('EtoH');
                                            sum('HtoL');
                                            return null;
                                        } else {
                                            sum('FtoH');
                                            sum('HtoL');
                                            return null;
                                        }
                                    } else if(Ds === 2) {
                                        if(sai(60)) {
                                            sum('FtoE');
                                            sum('EtoH');
                                            sum('HtoL');
                                            return null;
                                        } else {
                                            sum('FtoH');
                                            sum('HtoL');
                                            return null;
                                        }
                                    } else  {
                                        if(sai(50)) {
                                            sum('FtoE');
                                            sum('EtoH');
                                            sum('HtoL');
                                            return null;
                                        } else {
                                            sum('FtoH');
                                            sum('HtoL');
                                            return null;
                                        }
                                    }
                                }
                                if(sai(50)) {
                                    sum('FtoE');
                                    sum('EtoH');
                                    sum('HtoL');
                                    return null;
                                } else {
                                    sum('FtoH');
                                    sum('HtoL');
                                    return null;
                                }
                                break;
                            case 'J':
                                if((CL > 0 && AV > 0 && Ds > 1) || DD > 3) {
                                    sum('JtoL');
                                    return null;
                                } else if(DD > 1) {
                                    if(sai(75)) {
                                        sum('JtoL');
                                        return null;
                                    } else {
                                        sum('JtoK');
                                        return null;
                                    }
                                } else {
                                    if(sai(65)) {
                                        sum('JtoL');
                                        return null;
                                    } else {
                                        sum('JtoK');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 5:
                        switch(edge) {
                            case null:
                                sum('1toA');
                                sum('AtoD');
                                return 'D';
                                break;
                            case 'D':
                                if(f_length === 1 || f_length === DE || AO > 0) {
                                    sum('DtoE');
                                    return 'E';
                                } else if(f_length > 4) {
                                    if(SS > 0) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        if(sai(50)) {
                                            sum('DtoE');
                                            return 'E';
                                        } else {
                                            sum('DtoF');
                                            return 'F';
                                        }
                                    }
                                } else {
                                    sum('DtoF');
                                    return 'F';
                                }
                                break;
                            case 'E':
                                if(f_length > 4) {
                                    sum('EtoC');
                                    return 'C';
                                } else if(f_length === DE) {
                                    sum('EtoJ');
                                    return null;
                                } else {
                                    sum('EtoC');
                                    return 'C';
                                }
                                break;
                            case 'C':
                                if(f_length === DE || (CL > 0 && DE === 4)) {
                                    sum('CtoJ');
                                    return null;
                                } else if(f_length < 5 && AO > 0) {
                                    if(sai(50)) {
                                        sum('CtoJ');
                                        return null;
                                    } else {
                                        sum('CtoB');
                                        return null;
                                    }
                                } else {
                                    sum('CtoB');
                                    return null;
                                }
                                break;
                            case 'F':
                                if(BB + CV + SS > 0 || CVL > 1 || CL > 2) {
                                    sum('FtoI');
                                    return null;
                                } else {
                                    sum('FtoG');
                                    return 'G';
                                }
                                break;
                            case 'G':
                                if(f_length > 4) {
                                    sum('GtoH');
                                    return null;
                                } else {
                                    sum('GtoJ');
                                    return null;
                                }
                                break;
                        }
                        break;
                    case 6:
                        //ゴールはNマスとして扱う
                        switch(edge) {
                            case null:
                                if(BBV + CVL + CA > 0 || CAV > 1 || Ds < 4) {
                                    sum('1toC');
                                    sum('CtoH');
                                    sum('HtoK');
                                    sum('KtoM');
                                    return 'M';
                                } else {
                                    sum('1toA');
                                    sum('AtoE');
                                    sum('EtoG');
                                    return ('G');
                                }
                                break;
                            case 'G':
                                if(CL > 0 && Ds === 5) {
                                    sum('GtoF');
                                    sum('FtoB');
                                    sum('BtoN');
                                    return null;
                                } else {
                                    if(sai(75)) {
                                        sum('GtoF');
                                        sum('FtoB');
                                        sum('BtoN');
                                        return null;
                                    } else {
                                        sum('GtoK');
                                        sum('KtoM');
                                        return 'M';
                                    }
                                }
                                break;
                            case 'M':
                                if(BBV + CA + CVL > 2 || BBV + CAs > 2 || Ds < 3 || f_search[2] < 28) {
                                    sum('MtoL');
                                    sum('LtoI');
                                    sum('ItoD');
                                    sum('DtoN');
                                    return null;
                                } else if(f_search[2] < 30) {
                                    if(sai(50)) {
                                        sum('MtoL');
                                        sum('LtoI');
                                        sum('ItoD');
                                        sum('DtoN');
                                        return null;
                                    } else {
                                        sum('MtoJ');
                                        sum('JtoD');
                                        sum('DtoN');
                                        return null;
                                    }
                                } else {
                                    sum('MtoJ');
                                    sum('JtoD');
                                    sum('DtoN');
                                    return null;
                                }
                        }
                        break;
                }
                break;
            case 2:
                switch(map) {
                    case 1:
                        switch(edge) {
                            case null:
                                sum('1toC');
                                return 'C';
                                break;
                            case 'C':
                                if(CVs > 2 || BBV > 1 || (AO > 0 && SS === 0)) {
                                    sum('CtoB');
                                    sum('BtoA');
                                    return null;
                                } else if(BBV > 0 && CV + AS > 0) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.7) {
                                        sum('CtoB');
                                        sum('BtoA');
                                        return null;
                                    } else if(num <= 0.85) {
                                        sum('CtoD');
                                        sum('DtoH');
                                        return null;
                                    } else {
                                        sum('CtoE');
                                        return 'E';
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('CtoD');
                                        sum('DtoH');
                                        return null;
                                    } else {
                                        sum('CtoE');
                                        return 'E';
                                    }
                                }
                                break;
                            case 'E':
                                if(BBCVs > 4) {
                                    sum('EtoF');
                                    return 'F';
                                } else if(f_length === 6) {
                                    if(BBCVs > 0) {
                                        sum('EtoD');
                                        sum('DtoH');
                                        return null;
                                    } else if(DD +DE === 6 || (CL === 1 && Ds === 5) || (speed !== '低速艦隊' && CL === 1 && DD === 4)) {
                                        sum('EtoH');
                                        return null;
                                    } else {
                                        sum('EtoD');
                                        sum('DtoH');
                                        return null;
                                    }
                                } else {
                                    if(Ds === 5 || (CL === 1 && Ds === 4) || speed !== '低速艦隊' && CL === 1 && DD === 3) {
                                        sum('EtoH');
                                        return null;
                                    } else {
                                        if(sai(60)) {
                                            sum('EtoD');
                                            sum('DtoH');
                                            return null;
                                        } else {
                                            sum('EtoF');
                                            return 'F';
                                        }
                                    }
                                }
                                break;
                            case 'F':
                                if(BBCVs > 4) {
                                    sum('FtoG');
                                    return null;
                                } else if(DD > 2 || (CL === 1 && DD > 1)) {
                                    sum('FtoH');
                                    return null;
                                } else {
                                    if(sai(60)) {
                                        sum('FtoH');
                                        return null;
                                    } else {
                                        sum('FtoG');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 2:
                            switch(edge) {
                                case null:
                                    sum('1toC');
                                    return 'C';
                                    break;
                                case 'C':
                                    if(CVs > 2 || BBV > 1 || (AO > 0 && SS === 0)) {
                                        sum('CtoB');
                                        sum('BtoA');
                                        return null;
                                    } else if(BBV > 0) {
                                        if(AV + AS > 0) {
                                            if(sai(70)) {
                                                sum('CtoB');
                                                sum('BtoA');
                                                return null;
                                            } else {
                                                sum('CtoE');
                                                return 'E';
                                            }
                                        } else {
                                            if(sai(50)) {
                                                sum('CtoB');
                                                sum('BtoA');
                                                return null;
                                            } else {
                                                sum('CtoD');
                                                return null;
                                            }
                                        }
                                    } else if(AV +AS > 0) {
                                        sum('CtoE');
                                        return 'E';
                                    } else {
                                        if(sai(50)) {
                                            sum('CtoD');
                                            return null;
                                        } else {
                                            sum('CtoE');
                                            return 'E';
                                        }
                                    }
                                    break;
                                case 'E':
                                    if(BBCVs > 3) {
                                        sum('EtoG');
                                        return 'G';
                                    } else if(DE > 1) {
                                        sum('EtoF');
                                        sum('FtoH');
                                        return 'H';
                                    } else if(BBCVs === 3) {
                                        if(sai(70)) {
                                            sum('EtoG');
                                            return 'G';
                                        } else {
                                            sum('EtoK');
                                            return null;
                                        }
                                    } else if(BBCVs === 2) {
                                        if(sai(50)) {
                                            sum('EtoG');
                                            return 'G';
                                        } else {
                                            sum('EtoK');
                                            return null;
                                        }
                                    } else if(BBCVs === 1) {
                                        if(sai(70)) {
                                            sum('EtoK');
                                            return null;
                                        } else {
                                            sum('EtoG');
                                            return 'G';
                                        }
                                    } else if(Ds > 2 && AS > 0) {
                                        sum('EtoF');
                                        sum('FtoH');
                                        return 'H';
                                    } else if(Ds > 1) {
                                        if(CL > 0 && speed !== '低速艦隊') {
                                            sum('EtoK');
                                            return null;
                                        } else {
                                            if(sai(70)) {
                                                sum('EtoK');
                                                return null;
                                            } else {
                                                sum('EtoF');
                                                sum('FtoH');
                                                return 'H';
                                            }
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('EtoG');
                                            return 'G';
                                        } else {
                                            sum('EtoK');
                                            return null;
                                        }
                                    }
                                    break;
                                case 'G':
                                    if(CVs > 0 || DD === 0) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        if(sai(50)) {
                                            sum('GtoH');
                                            return 'H';
                                        } else {
                                            sum('GtoK');
                                            return null;
                                        }
                                    }
                                    break;
                                case 'H':
                                    if(BBCVs > 3) {
                                        if(sai(70)) {
                                            sum('HtoI');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    } else if(CVs + CAV + AV > 0) {
                                        sum('HtoK');
                                        return null;
                                    } else if(SS > 0) {
                                        if(sai(70)) {
                                            sum('HtoI');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    } else if(Ds > 1) {
                                        if(sai(50)) {
                                            sum('HtoJ');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    } else if(Ds === 1) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.33) {
                                            sum('HtoI');
                                            return null;
                                        } else if(num <= 0.66) {
                                            sum('HtoJ');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('HtoI');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    }
                                    break;
                            }
                        break;
                    case 3: //@2-3
                        switch(edge) {
                            case null:
                                if(SS + AS === f_length) {
                                    sum('1toC');
                                } else {
                                    if(sai(50)) {
                                        sum('1toB');
                                        sum('BtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else {
                                        sum('1toA');
                                        sum('AtoD');
                                        return 'D';
                                    }
                                }
                                break;
                            case 'C':
                                if(sai(60)) {
                                    sum('CtoD');
                                    return 'D';
                                } else {
                                    sum('CtoF');
                                    return 'F';
                                }
                                break;
                            case 'D':
                                if(AV + AO > 0 && Ds > 1 || (SS > 1 && AS > 0)) {
                                    sum('DtoG');
                                    return 'G';
                                } else if(SS === f_length) {
                                    if(sai(65)) {
                                        sum('DtoG');
                                        return 'G';
                                    } else {
                                        sum('DtoF');
                                        return 'F';
                                    }
                                } else if(SS > 0 && BBCVs > 0) {
                                    if(sai(65)) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoG');
                                        return 'G';
                                    }
                                } else {
                                    if(Ds > 3) {
                                        if(sai(75)) {
                                            sum('DtoG');
                                            return 'G';
                                        } else {
                                            sum('DtoF');
                                            return 'F';
                                        }
                                    } else if(Ds > 2) {
                                        if(sai(65)) {
                                            sum('DtoG');
                                            return 'G';
                                        } else {
                                            sum('DtoF');
                                            return 'F';
                                        }
                                    } else if(Ds > 1) {
                                        if(sai(50)) {
                                            sum('DtoG');
                                            return 'G';
                                        } else {
                                            sum('DtoF');
                                            return 'F';
                                        }
                                    } else {
                                        if(sai(35)) {
                                            sum('DtoG');
                                            return 'G';
                                        } else {
                                            sum('DtoF');
                                            return 'F';
                                        }
                                    }
                                }
                                break;
                            case 'F':
                                if(CVs + CL + AV > 0) {
                                    if(sai(90)) {
                                        sum('FtoJ');
                                        return 'J';
                                    } else {
                                        sum('FtoG');
                                        return  'G';
                                    }
                                } else if(SS > 1 && AS > 0) {
                                    if(sai(80)) {
                                        sum('FtoG');
                                        return 'G';
                                    } else {
                                        sum('FtoJ');
                                        return 'J';
                                    }
                                } else {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 25) {
                                        sum('FtoG');
                                        return 'G';
                                    } else if(num <= 60) {
                                        sum('FtoH');
                                        return null;
                                    } else {
                                        sum('FtoJ');
                                        return 'J';
                                    }
                                }
                                break;
                            case 'G':
                                if(SS > 1 && AS > 0){
                                    if(sai(60)) {
                                        sum('GtoI');
                                        sum('ItoK');
                                        sum('KtoN');
                                        return null;
                                    } else {
                                        sum('GtoK');
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(SS === f_length) {
                                    if(sai(55)) {
                                        sum('GtoI');
                                        sum('ItoK');
                                        sum('KtoN');
                                        return null;
                                    } else {
                                        sum('GtoK');
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(CL + Ds < 2) {
                                    sum('GtoK');
                                    sum('KtoN');
                                    return null;
                                } else if(AV + AO > 0 && Ds > 1) {
                                    if(sai(65)) {
                                        sum('GtoI');
                                        sum('ItoK');
                                        sum('KtoN');
                                        return null;
                                    } else {
                                        sum('GtoK');
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(Ds > 2) {
                                    if(sai(55)) {
                                        sum('GtoK');
                                        sum('KtoN');
                                        return null;
                                    } else {
                                        sum('GtoI');
                                        sum('ItoK');
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(Ds > 0) {
                                    if(sai(65)) {
                                        sum('GtoK');
                                        sum('KtoN');
                                        return null;
                                    } else {
                                        sum('GtoI');
                                        sum('ItoK');
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(Ds === 0) {
                                    sum('GtoK');
                                    sum('KtoN');
                                    return null;
                                }
                                break;
                            case 'J':
                                if(CL > 0 && DD > 3 || (CL > 0 && CA === 5)) {
                                    sum('JtoN');
                                    return null;
                                } else if(SS === f_length) {
                                    if(sai(65)) {
                                        sum('JtoN');
                                        return null;
                                    } else {
                                        sum('JtoM');
                                         return null;
                                    }
                                } else if(SS > 0) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 10) {
                                        sum('JtoM');
                                        return null;
                                    } else if(num <= 55) {
                                        sum('JtoL');
                                        return null;
                                    } else {
                                        sum('JtoN');
                                        return null;
                                    }
                                } else if(BBCVs === 6) {
                                    sum('JtoL');
                                    return null;
                                } else if(BBCVs === 5) {
                                    if(sai(85)) {
                                        sum('JtoL');
                                        return null;
                                    } else {
                                        sum('JtoN');
                                        return null;
                                    }
                                } else if(BBCVs === 4) {
                                    if(sai(75)) {
                                        sum('JtoN');
                                        return null;
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                } else if(BBCVs === 3) {
                                    if(sai(80)) {
                                        sum('JtoN');
                                        return null;
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                } else if(BBCVs < 3) {
                                    if(sai(90)) {
                                        sum('JtoN');
                                        return null;
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 4: //@2-4
                        switch(edge) {
                            case null:
                                sum('1toB');
                                return 'B';
                                break;
                            case 'B':
                                if(DD === f_length) {
                                    sum('BtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else if(CL + CT > 0 && DD === 4 && (CA > 0 || DD === 5 || DE > 0)) {
                                    sum('BtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else if(Ds < 3) {
                                    if(CVs > 2) {
                                        sum('BtoC');
                                        return 'C';
                                    } else if(BBCVs === 2) {
                                        if(sai(80)) {
                                            sum('BtoC');
                                            return 'C';
                                        } else {
                                            sum('BtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    } else if(CV + CVL > 0) {
                                        if(sai(60)) {
                                            sum('BtoC');
                                            return 'C';
                                        } else {
                                            sum('BtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    } else if(SS > 0) {
                                        if(sai(60)) {
                                            sum('BtoC');
                                            return 'C';
                                        } else {
                                            sum('BtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    } else {
                                        if(sai(60)) {
                                            sum('BtoG');
                                            sum('GtoH');
                                            return 'H';
                                        } else {
                                            sum('BtoC');
                                            return 'C';
                                        }
                                    }
                                } else {
                                    if(sai(60)) {
                                        sum('BtoG');
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('BtoC');
                                        return 'C';
                                    }
                                }
                                break;
                            case 'C':
                                if(AS + AO > 0) {
                                    sum('CtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else {
                                    if(sai(50)) {
                                        sum('CtoG');
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('CtoF');
                                        return 'F';
                                    }
                                }
                                break;
                            case 'F':
                                if(CVL > 0 && Ds > 1) {
                                    if(sai(92.5)) {
                                        sum('FtoJ');
                                        return 'J';
                                    } else {
                                        sum('FtoA');
                                        return null;
                                    }
                                } else if(CVL > 0) {
                                    if(sai(82.5)) {
                                        sum('FtoJ');
                                        return 'J';
                                    } else {
                                        sum('FtoA');
                                        return null;
                                    }
                                } else if(DD > 1) {
                                    if(sai(75)) {
                                        sum('FtoJ');
                                        return 'J';
                                    } else {
                                        sum('FtoA');
                                        return null;
                                    }
                                } else if(DD < 2) {
                                    sum('FtoA');
                                    return null;
                                } //DDで例外なし確認
                                break;
                            case 'H':
                                if(CL + CT > 0 && DD === 4 && (CA + CL + CT > 0 || DD === 5)) {
                                    sum('HtoL');
                                    return 'L';
                                } else {
                                    sum('HtoI');
                                    return 'I';
                                }
                                break;
                            case 'I':
                                if(CVL > 0 && CL > 0) {
                                    if(sai(92.5)) {
                                        sum('ItoK');
                                        return 'K';
                                    } else {
                                        sum('ItoE');
                                        sum('EtoD');
                                        return null;
                                    }
                                } else if(CVL > 0) {
                                    if(sai(82.5)) {
                                        sum('ItoK');
                                        return 'K';
                                    } else {
                                        sum('ItoE');
                                        sum('EtoD');
                                        return null;
                                    }
                                } else if(CL > 0) {
                                    if(sai(75)) {
                                        sum('ItoK');
                                        return 'K';
                                    } else {
                                        sum('ItoE');
                                        sum('EtoD');
                                        return null;
                                    }
                                } else {
                                    if(sai(70)) {
                                        sum('ItoE');
                                        sum('EtoD');
                                        return null;
                                    } else {
                                        sum('ItoK');
                                        return 'K';
                                    }
                                }
                                break;
                            case 'J':
                                if(BBCVs > 3) {
                                    sum('JtoL');
                                    return 'L';
                                } else if(BBCVs === 3 || CV === 2) {
                                    sum('JtoM');
                                    sum('MtoP');
                                    return null;
                                } else if(CV === 0) {
                                    sum('JtoL');
                                    return 'L';
                                } else {
                                    if(sai(65)) {
                                        sum('JtoM');
                                        sum('MtoP');
                                        return null;
                                    } else {
                                        sum('JtoL');
                                        return 'L';
                                    }
                                }
                                break;
                            case 'K':
                                if(AS + AO > 1) {
                                    sum('KtoN');
                                    return null;
                                } else if(AV + AS + AO > 0) {
                                    if(Ds > 1) {
                                        if(sai(70)) {
                                            sum('KtoL');
                                            return 'L';
                                        } else {
                                            sum('KtoN');
                                            return null;
                                        }
                                    } else if(Ds === 1) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.4) {
                                            sum('KtoL');
                                            return 'L';
                                        } else if(nym <= 0.8) {
                                            sum('KtoN');
                                            return null;
                                        } else {
                                            sum('KtoO');
                                            return null;
                                        }
                                    } else if(Ds === 0) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.25) {
                                            sum('KtoL');
                                            return 'L';
                                        } else if(nym <= 0.6) {
                                            sum('KtoN');
                                            return null;
                                        } else {
                                            sum('KtoO');
                                            return null;
                                        }
                                    }
                                } else if(Ds > 1) {
                                    sum('KtoL');
                                    return 'L';
                                } else if(Ds === 1) {
                                    if(sai(65)) {
                                        sum('KtoL');
                                        return 'L';
                                    } else {
                                        sum('KtoO');
                                        return null;
                                    }
                                } else if(CAV > 0) {
                                    if(BB > 0) {
                                        if(sai(65)) {
                                            sum('KtoO');
                                            return null;
                                        } else {
                                            sum('KtoL');
                                            return 'L';
                                        }
                                    } else {
                                        if(sai(65)) {
                                            sum('KtoL');
                                            return 'L';
                                        } else {
                                            sum('KtoO');
                                            return null;
                                        }
                                    }
                                } else if(BB > 1) {
                                    if(sai(77)) {
                                        sum('KtoO');
                                        return null;
                                    } else {
                                        sum('KtoL');
                                        return 'L';
                                    }
                                } else {
                                    if(sai(65)) {
                                        sum('KtoL');
                                        return 'L';
                                    } else {
                                        sum('KtoO');
                                        return null;
                                    }
                                }
                                break;
                            case 'L':
                                if(BBCVs === 4) {
                                    sum('LtoM');
                                    sum('MtoP');
                                    return null;
                                } else if(CL > 0 && DD > 1) {
                                    sum('LtoP');
                                    return null;
                                } else if(BBs + CV < 3) {
                                    if(sai(60)) {
                                        sum('LtoM');
                                        sum('MtoP');
                                        return null;
                                    } else {
                                        sum('LtoP');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 5: //@2-5
                        switch(edge) {
                            case null:
                                if(SS > 3) {
                                    sum('1toB');
                                    return 'B';
                                } else if(SS > 0 && BBs < 4) {
                                    if(CVs > 0 || AV > 1) {
                                        if(sai(50)) {
                                            sum('1toB');
                                            return 'B';
                                        } else {
                                            sum('1toC');
                                            return 'C';
                                        }
                                    }
                                } else if(CVs > 0 || AV > 1) {
                                    sum('1toC');
                                    return 'C';
                                } else if(getDrum(world, map) > 1 || Ds > 3 || (CL > 0 && Ds > 2)) {
                                    sum('1toB');
                                    return 'B';
                                } else if(BBs > 0 || (CL + CLT > 0 && CAV > 0 && CA + CL + CLT > 4)) {
                                    sum('1toC');
                                    return 'C';
                                } else if(f_length === 6) {
                                    if(sai(80)) {
                                        sum('1toB');
                                        return 'B';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                } else {
                                    if(sai(95)) {
                                        sum('1toC');
                                        return 'C';
                                    } else {
                                        sum('1toB');
                                        return 'B';
                                    }
                                }
                                break;
                            case 'B':
                                if(SS > 2) {
                                    sum('BtoA');
                                    return null;
                                } else {
                                    sum('BtoF');
                                    return 'F';
                                }
                                break;
                            case 'C':
                                if(CVs > 2 || BBs > 2) {
                                    sum('CtoD');
                                    return null;
                                } else if(CL > 0 && DD > 1 || CAV > 1 && DD > 1) {
                                    sum('CtoE');
                                    return 'E';
                                } else {
                                    if(sai(70)) {
                                        sum('CtoE');
                                        return 'E';
                                    } else {
                                        sum('CtoD');
                                        return null;
                                    }
                                }
                                break;
                            case 'E':
                                if(BB > 0) {
                                    sum('EtoG');
                                    return 'G';
                                } else if(CL > 0 && Ds > 3) {
                                    sum('EtoI');
                                    return 'I';
                                } else if(slowBB() > 0 || CV + CAs > 1) {
                                    sum('EtoG');
                                    return 'G';
                                } else if(CL > 0 && DD > 2) {
                                    sum('EtoI');
                                    return 'I';
                                } else {
                                    sum('EtoG');
                                    return 'G';
                                }
                                break;
                            case 'F':
                                if(speed === '低速艦隊') {
                                    sum('FtoJ');
                                    return 'J';
                                } else if(DD > 2 || (CL > 0 && DD > 1)) {
                                    sum('FtoE');
                                    return 'E';
                                } else {
                                    if(sai(65)) {
                                        sum('FtoJ');
                                        return 'J';
                                    } else {
                                        sum('FtoE');
                                        return 'E';
                                    }
                                }
                                break;
                            case 'G':
                                if((BBCVs < 2 && Ds > 3) || (BBCVs === 0 && CL > 0 && DD > 2)) {
                                    sum('GtoI');
                                    return 'I';
                                } else if(f_search[0] < 37) {
                                    sum('GtoK');
                                    return null;
                                } else if(search[0] < 41 && f_search[0] >= 37) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return 'I';
                                    } else {
                                        sum('GtoK');
                                        return null;
                                    }
                                } else {
                                    sum('GtoL');
                                    return 'L';
                                }
                                break;
                            case 'I':
                                if(f_search[0] < 31) {
                                    sum('ItoH');
                                    return null;
                                } else if(f_search[0] < 34 && f_search[0] >= 31) {
                                    if(sai(50)) {
                                        sum('ItoH');
                                        return null;
                                    } else {
                                        sum('ItoO');
                                        return null;
                                    }
                                } else {
                                    sum('ItoO');
                                    return null;
                                }
                                break;
                            case 'J':
                                if(f_search[0] < 42) {
                                    sum('JtoH');
                                    return null;
                                } else if(f_search[0] < 49 && f_search[0] >= 42) {
                                    if(BBCVs > 3) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 33.3) {
                                            sum('JtoH');
                                            return null;
                                        } else if(num <= 66.6) {
                                            sum('JtoM');
                                            return null;
                                        } else {
                                            sum('JtoO');
                                            return null;
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('JtoH');
                                            return null;
                                        } else {
                                            sum('JtoO');
                                            return null;
                                        }
                                    } 
                                } else if(BBCVs > 3) {
                                    if(sai(50)) {
                                        sum('JtoM');
                                        return null;
                                    } else {
                                        sum('JtoO');
                                        return null;
                                    }
                                } else if(f_search[0] >= 49) {
                                    sum('JtoO');
                                    return null;
                                }
                                break;
                            case 'L':
                                if(CL > 0 && DD > 1) {
                                    sum('LtoO');
                                    return null;
                                } else if(BBCVs === 0) {
                                    if(sai(60)) {
                                        sum('LtoO');
                                        return null;
                                    } else {
                                        sum('LtoN');
                                        return null;
                                    }
                                } else {
                                    if(sai(60)) {
                                        sum('LtoN');
                                        return null;
                                    } else {
                                        sum('LtoO');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                }
                break;
            case 3:
                switch(map) {
                    case 1: //@3-1
                        switch(edge) {
                            case null:
                                sum('1toC');
                                return 'C';
                                break;
                            case 'C':
                                if(Ds < 2) {
                                    sum('CtoD');
                                    return 'D';
                                } else if(BBV + CL + AV + AO > 2) {
                                    if(BBCVs > 2) {
                                        if(sai(50)) {
                                            sum('CtoB');
                                            sum('BtoA');
                                            return null;
                                        } else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('CtoB');
                                            sum('BtoA');
                                            return null;
                                        } else {
                                            sum('CtoF');
                                            sum('FtoG');
                                            return null;
                                        }
                                    }
                                } else if(AV + AO > 0 && Ds > 2) {
                                    if(sai(50)) {
                                        sum('CtoB');
                                        sum('BtoA');
                                        return null;
                                    } else {
                                        sum('CtoF');
                                        sum('FtoG');
                                        return null;
                                    }
                                } else if(SS > 2) {
                                    if(sai(50)) {
                                        sum('CtoD');
                                        return 'D';
                                    } else {
                                        sum('CtoF');
                                        sum('FtoG');
                                        return null;
                                    }
                                } else {
                                    sum('CtoF');
                                    sum('FtoG');
                                    return null;
                                }
                                break;
                            case 'D':
                                if(BBCVs > 4 || SS === 6) {
                                    sum('DtoE');
                                    return null;
                                } else if(AS === 1 && SS === 5) {
                                    sum('DtoG');
                                    return null;
                                }
                                break;
                        }
                        break;
                    case 2: //@3-2
                        switch(edge) {
                            case null:
                                if(BBCVs > 0 || (CL === 1 && DD > 3) || DD === 6) {
                                    sum('1toC');
                                    return 'C';
                                } else {
                                    sum('1toA');
                                    sum('AtoB');
                                    return null;
                                }
                                break;
                            case 'C':
                                if(DD < 4 || BBCVs > 1) {
                                    sum('CtoA');
                                    sum('AtoB');
                                    return null;
                                } else if(BB > 0) {
                                    if(sai(50)) {
                                        sum('CtoA');
                                        sum('AtoB');
                                        return null;
                                    } else {
                                        sum('CtoG');
                                        return 'G';
                                    }
                                } else if(speed === '低速艦隊' || getRadar(world, map) === 0 || CL + DD + AO < 6) {
                                    sum('CtoG');
                                    return 'G';
                                } else if(speed === '最速艦隊' && getRadar(world, map) > 3) {
                                    sum('CtoE');
                                    return 'E';
                                } else if(speed === '高速+艦隊' || AO > 0) {
                                    if(sai(60)) {
                                        sum('CtoG');
                                        return 'G';
                                    } else {
                                        sum('CtoE');
                                        return 'E';
                                    }
                                } else {
                                    sum('CtoG');
                                    return 'G';
                                }
                                break;
                            case 'E':
                                if(speed === '高速+艦隊') {
                                    sum('EtoF');
                                    sum('FtoL');
                                    return null;
                                } else {
                                    if(sai(80)) {
                                        sum('EtoF');
                                        sum('FtoL');
                                        return null;
                                    } else {
                                        sum('EtoD');
                                        return null;
                                    }
                                }
                                break;
                            case 'G':
                                if(SS > 0 || CV > 0 || BBs + CVL === 2) {
                                    sum('GtoJ');
                                    sum('JtoK');
                                    return null;
                                } else if(speed === '低速艦隊' || getRadar(world, map) === 0 || CL + DD + AO < 6) {
                                    sum('GtoH');
                                    return 'H';
                                } else if(speed === '高速+艦隊') {
                                    sum('GtoF');
                                    sum('FtoL');
                                    return null;
                                } else if(AO > 0) {
                                    if(sai(55)) {
                                        sum('GtoF');
                                        sum('FtoL');
                                        return null;
                                    } else {
                                        sum('GtoH');
                                        return 'H';
                                    }
                                } else {
                                    if(sai(65)) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('GtoF');
                                        sum('FtoL');
                                        return null;
                                    }
                                }
                                break;
                            case 'H':
                                if(CL + DD + AO === 6) {
                                    sum('HtoF');
                                    sum('FtoL');
                                    return null;
                                } else {
                                    sum('HtoI');
                                    return null;
                                }
                                break;
                        }
                        break;
                    case 3: //@3-3
                        switch(edge) {
                            case null:
                                sum('1toA');
                                return 'A';
                                break;
                            case 'A':
                                if(CV > 0 || BBs + CVL > 3 || BBs + CVL === 1 && CL === 1 && DD === 4) {
                                    sum('AtoC');
                                    return 'C';
                                } else {
                                    sum('AtoB');
                                    return 'B';
                                }
                                break;
                            case 'B':
                                if(SS > 0) {
                                    if(sai(50)) {
                                        sum('BtoD');
                                        return null;
                                    } else {
                                        sum('BtoF');
                                        return 'F';
                                    }
                                } else if(BBs + CVL < 2 || (BBs + CVL < 3 && DD > 1)) {
                                    sum('BtoF');
                                    return 'F';
                                } else {
                                    if(sai(50)) {
                                        sum('BtoD');
                                        return null;
                                    } else {
                                        sum('BtoF');
                                        return 'F';
                                    }
                                }
                                break;
                            case 'C':
                                if(Ds < 2 || CV > 1 || BBCVs > 2) {
                                    sum('CtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if(BBCVs === 2 || (BBCVs === 1 && CL === 1 && DD === 4)) {
                                    sum('CtoG');
                                    return 'G';
                                } else {
                                    sum('CtoE');
                                    sum('EtoG');
                                    return 'G';
                                }
                                break;
                            case 'F':
                                if(DD < 2 || BBs > 2) {
                                    sum('FtoG');
                                    return 'G';
                                } else if(SS > 0) {
                                    if(sai(50)) {
                                        sum('FtoH');
                                        return null;
                                    } else {
                                        sum('FtoJ');
                                        return 'J';
                                    }
                                } else if(CL + CAV + AV > 0) {
                                    sum('FtoJ');
                                    return 'J';
                                } else {
                                    if(sai(50)) {
                                        sum('FtoH');
                                        return null;
                                    } else {
                                        sum('FtoJ');
                                        return 'J';
                                    }
                                }
                                break;
                            case 'G':
                                if(SS > 0) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoM');
                                        return null;
                                    }
                                } else if(BBCVs < 4) {
                                    sum('GtoM');
                                    return null;
                                } else if(BBCVs === 4) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoM');
                                        return null;
                                    }
                                } else if(BBCVs === 5) {
                                    if(sai(65)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoM');
                                        return null;
                                    }
                                } else if(BBCVs === 6) {
                                    if(sai(85)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoM');
                                        return null;
                                    }
                                }
                                break;
                            case 'J':
                                if(DD > 4 || (CL === 1 && DD > 3)) {
                                    sum('JtoM');
                                    return null;
                                } else {
                                    sum('JtoK');
                                    return 'K';
                                }
                                break;
                            case 'K':
                                if(SS > 0) {
                                    if(sai(50)) {
                                        sum('KtoL');
                                        return null;
                                    } else {
                                        sum('KtoM');
                                        return null;
                                    }
                                } else if(BBs + CVL < 2) {
                                    sum('KtoM');
                                    return null;
                                } else if(BBs + CVL === 2) {
                                    if(sai(75)) {
                                        sum('KtoM');
                                        return null;
                                    } else {
                                        sum('KtoL');
                                        return null;
                                    }
                                } else if(BBs + CVL === 3) {
                                    if(sai(50)) {
                                        sum('KtoM');
                                        return null;
                                    } else {
                                        sum('KtoL');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 4: //@3-4
                        switch(edge) {
                            case null:
                                if(CL + Ds === 0 || BBCVs > 2) {
                                    sum('1toA');
                                    sum('AtoC');
                                    return 'C';
                                } else if(BBCVs === 2 || SS > 0) {
                                    if(sai(65)) {
                                        sum('1toB');
                                        sum('BtoH');
                                        return 'H';
                                    } else {
                                        sum('1toA');
                                        sum('AtoC');
                                        return 'C';
                                    }
                                } else if(BBCVs === 1) {
                                    sum('1toB');
                                    sum('BtoH');
                                    return 'H';
                                } else if(BBCVs === 0) {
                                    if(DD < 3) {
                                        if(sai(65)) {
                                            sum('1toB');
                                            sum('BtoH');
                                            return 'H';
                                        } else {
                                            sum('1toD');
                                            sum('DtoH');
                                            return 'H';
                                        }
                                    } else {
                                        sum('1toD');
                                        sum('DtoH');
                                        return 'H';
                                    }
                                } //航空戦艦により例外なし
                                break;
                            case 'C':
                                if(CV > 2 || CL + Ds === 0 || BBCVs > 4) {
                                    sum('CtoB');
                                    sum('BtoH');
                                    return 'H';
                                } else if(BBCVs === 2) {
                                    sum('CtoF');
                                    return 'F';
                                } else if(AV + AO > 0) {
                                    sum('CtoE');
                                    sum('EtoG');
                                    sum('GtoJ');
                                    sum('JtoP');
                                    return null;
                                } else if(AS > 0) {
                                    if(sai(50)) {
                                        sum('CtoE');
                                        sum('EtoG');
                                        sum('GtoJ');
                                        sum('JtoP');
                                        return null;
                                    } else {
                                        sum('CtoF');
                                        return 'F';
                                    }
                                } else {
                                    sum('CtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(BBCVs + CA > 4) {
                                    sum('FtoG');
                                    sum('GtoJ');
                                    sum('JtoP');
                                    return null;
                                } else if(BBs + CV < 3 && CL > 0 && Ds > 1) {
                                    if(isFaster()) {
                                        sum('FtoJ');
                                        sum('JtoP');
                                        return null;
                                    } else {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.1) {
                                            sum('FtoG');
                                            sum('GtoJ');
                                            sum('JtoP');
                                            return null;
                                        } else if(num <= 0.55) {
                                            sum('FtoJ');
                                            sum('JtoP');
                                            return null;
                                        } else {
                                            sum('FtoM');
                                            return 'M';
                                        }
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('FtoG');
                                        sum('GtoJ');
                                        sum('JtoP');
                                        return null;
                                    } else {
                                        sum('FtoM');
                                        return 'M';
                                    }
                                }
                                break;
                            case 'H':
                                if(DD < 3 || CL + DD < 4 || CV > 0 || BBs + CVL > 1) {
                                    sum('HtoG');
                                    sum('GtoJ');
                                    sum('JtoP');
                                    return null;
                                } else if(CL + DD > 4) {
                                    sum('HtoL');
                                    return 'L';
                                } else if(CL === 0) {
                                    sum('HtoG');
                                    sum('GtoJ');
                                    sum('JtoP');
                                    return null;
                                } else {
                                    if(sai(65)) {
                                        sum('HtoL');
                                        return 'L';
                                    } else {
                                        sum('HtoG');
                                        sum('GtoJ');
                                        sum('JtoP');
                                        return null;
                                    }
                                }
                                break;
                            case 'L':
                                if(CAs + CL + DD === 6) {
                                    sum('LtoJ');
                                    sum('JtoP');
                                    return null;
                                } else if(BBs + CVL === 0) {
                                    sum('LtoN');
                                    sum('NtoP');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('LtoN');
                                        sum('NtoP');
                                        return null;
                                    } else {
                                        sum('LtoO');
                                        return null;
                                    }
                                }
                                break;
                            case 'M':
                                if(CL > 0 && DD > 0) {
                                    sum('MtoP');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('MtoP');
                                        return null;
                                    } else {
                                        sum('MtoK');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 5: //@3-5
                        switch(edge) {
                            case null:
                                if(SS > 2 || BBs > 1 || BBs + CAs > 2 || CVs + CLT > 0) {
                                    sum('1toB');
                                    return 'B';
                                } else if(DD > 4) {
                                    sum('1toF');
                                    return 'F';
                                } else if(DD === 4) {
                                    if(sai(75)) {
                                        sum('1toF');
                                        return 'F';
                                    } else {
                                        sum('1toB');
                                        return 'B';
                                    }
                                } else if(DD < 4) {
                                    if(sai(50)) {
                                        sum('1toF');
                                        return 'F';
                                    } else {
                                        sum('1toB');
                                        return 'B';
                                    }
                                } //DDより例外なし
                                break;
                            case 'B':
                                if(SS > 3 || CVs > 3 || BBCVs > 4) {
                                    sum('BtoA');
                                    return null;
                                } else if(CLT > 1 || CVs > 1 ||  BBs > 2 || BBCVs + CAs > 4) {
                                    sum('BtoD');
                                    sum('DtoH');
                                    return 'H';
                                } else if(CVs === 0 && CL === 1 && DD > 1) {
                                    sum('BtoE');
                                    sum('EtoH');
                                    return 'H';
                                } else {
                                    sum('BtoC');
                                    sum('CtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(BBCVs + LHA > 0 || CL + CLT > 3 || CAs > 1) {
                                    sum('FtoE');
                                    sum('EtoH');
                                    return 'H';
                                } else if(CAs === 1) {
                                    if(sai(75)) {
                                        sum('FtoG');
                                        return 'G';
                                    } else {
                                        sum('FtoE');
                                        sum('EtoH');
                                        return 'H';
                                    }
                                } else if(CAs === 0) {
                                    if(CL === 3) {
                                        if(sai(85)) {
                                            sum('FtoG');
                                            return 'G';
                                        } else {
                                            sum('FtoE');
                                            sum('EtoH');
                                            return 'H';
                                        }
                                    } else if(CL < 3) {
                                        sum('FtoG');
                                        return 'G';
                                    }
                                } //CAsより例外なし
                                break;
                            case 'G':
                                if(f_search[3] < 23) {
                                    sum('GtoI');
                                    return null;
                                } else if(f_search[3] < 28 && f_search[3] >= 23) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoK');
                                        return null;
                                    }
                                } else if(f_search[3] >= 28) {
                                    sum('GtoK');
                                    return null;
                                } //例外なし
                                break;
                            case 'H':
                                if(BBCVs > 3 || (BBCVs > 1 && LHA > 0)) {
                                    sum('HtoJ');
                                    return null;
                                } else if(f_search[3] < 35) {
                                    sum('HtoJ');
                                    return null;
                                } else if(f_search[3] < 40 && f_search[3] >= 35) {
                                    if(sai(50)) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                } else if(f_search[3] >= 40) {
                                    sum('HtoK');
                                    return null;
                                } //例外なし
                                break;
                        }
                        break;
                }
                break;
            case 4:
                switch(map) {
                    case 1: //@4-1
                        switch(edge) {
                            case null:
                                if(sai(50)) {
                                    sum('1toA');
                                    sum('AtoB');
                                    sum('BtoD');
                                    return 'D';
                                } else {
                                    sum('1toC');
                                    return 'C';
                                }
                                break;
                            case 'C':
                                if(BBCVs > 4) {
                                    sum('CtoE');
                                    return null;
                                } else if(BBCVs === 4) {
                                    if(sai(70)) {
                                        sum('CtoE');
                                        return null;
                                    } else {
                                        sum('CtoF');
                                        return 'F';
                                    }
                                } else if(BBCVs === 3) {
                                    if(sai(50)) {
                                        sum('CtoE');
                                        return null;
                                    } else {
                                        sum('CtoF');
                                        return 'F';
                                    }
                                } else if(BBCVs < 3) {
                                    sum('CtoF');
                                    return 'F';
                                } //BBCVsより例外なし
                                break;
                            case 'D':
                                if(BBCVs > 4) {
                                    sum('DtoH');
                                    return 'H';
                                } else if(SS < 0) {
                                    if(sai(70)) {
                                        sum('DtoH');
                                        return 'H';
                                    } else {
                                        sum('DtoG');
                                        sum('GtoJ');
                                        return null;
                                    }
                                } else if(BBCVs === 4 || Ds < 2) {
                                    sum('DtoG');
                                    sum('GtoJ');
                                    return null;
                                } else if(BBCVs === 0 || Ds > 3) {
                                    sum('DtoH');
                                    return 'H';
                                } else if(Ds === 3 || CL === 0) {
                                    sum('DtoG');
                                    sum('GtoJ');
                                    return null;
                                } else if(CAs > 0 && CAs + CL + CT === 3) {
                                    sum('DtoH');
                                    return 'H';
                                } else {
                                    if(sai(50)) {
                                        sum('DtoH');
                                        return 'H';
                                    } else {
                                        sum('DtoG');
                                        sum('GtoJ');
                                        return null;
                                    }
                                }
                                break;
                            case 'F':
                                if(BBCVs > 0 || Ds < 4) {
                                    sum('FtoD');
                                    return 'D';
                                } else if(CL + CT > 0 || CAs === 0) {
                                    sum('FtoH');
                                    return 'H';
                                } else {
                                    sum('FtoD');
                                    return 'D';
                                }
                                break;
                            case 'H':
                                if(SS === 1) {
                                    if(sai(50)) {
                                        sum('HtoI');
                                        return null;
                                    } else {
                                        sum('HtoJ');
                                        return null;
                                    }
                                } else if(SS > 1) {
                                    sum('HtoI');
                                    return null;
                                } else if(BBCVs > 4) {
                                    sum('HtoI');
                                    return null;
                                } else if(BBCVs < 2) {
                                    sum('HtoJ');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('HtoI');
                                        return null;
                                    } else {
                                        sum('HtoJ');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 2: //@4-2
                        switch(edge) {
                            case null:
                                switch(Ds) {
                                    case 0:
                                        if(sai(90)) {
                                            sum('1toB');
                                            sum('BtoD');
                                            return 'D';
                                        } else {
                                            sum('1toA');
                                            return 'A';
                                        }
                                        break;
                                    case 1:
                                        if(sai(80)) {
                                            sum('1toB');
                                            sum('BtoD');
                                            return 'D';
                                        } else {
                                            sum('1toA');
                                            return 'A';
                                        }
                                        break;
                                    case 2:
                                        if(CV > 1) {
                                            if(sai(55)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } else if(CVs > 1) {
                                            if(sai(60)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } else if(CVs === 1) {
                                            if(sai(65)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } else if(CVs === 0) {
                                            if(sai(72.5)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } //CVsより例外なし
                                        break;
                                    case 3:
                                        if(CVs > 1) {
                                            if(sai(72.5)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } else if(CVs < 2) {
                                            if(sai(77.5)) {
                                                sum('1toA');
                                                return 'A';
                                            } else {
                                                sum('1toB');
                                                sum('BtoD');
                                                return 'D';
                                            }
                                        } //CVsより例外なし
                                        break;
                                    case 4:
                                        if(sai(85)) {
                                            sum('1toA');
                                            return 'A';
                                        } else {
                                            sum('1toB');
                                            sum('BtoD');
                                            return 'D';
                                        }
                                        break;
                                    case 5:
                                        if(sai(90)) {
                                            sum('1toA');
                                            return 'A';
                                        } else {
                                            sum('1toB');
                                            sum('BtoD');
                                            return 'D';
                                        }
                                        break;
                                }
                                break;
                            case 'A':
                                if(Ds < 2) {
                                    sum('AtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if(SS > 0) {
                                    if(sai(50)) {
                                        sum('AtoC');
                                        return 'C';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                } else if(Ds > 3 || (CL > 0 && Ds > 2)) {
                                    sum('AtoC');
                                    return 'C';
                                } else if(Ds === 3) {
                                    if(sai(85)) {
                                        sum('AtoC');
                                        return 'C';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                } else if(CL > 0 && Ds === 2) {
                                    if(sai(85)) {
                                        sum('AtoC');
                                        return 'C';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                } else {
                                    if(sai(55)) {
                                        sum('AtoC');
                                        return 'C';
                                    } else {
                                        sum('AtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                }
                                break;
                            case 'C':
                                if(Ds < 2 || BBCVs > 3) {
                                    sum('CtoG');
                                    return 'G';
                                } else if(BBCVs === 3) {
                                    if(CL === 0) {
                                        if(sai(85)) {
                                            sum('CtoG');
                                            return 'G';
                                        } else {
                                            sum('CtoL');
                                            return null;
                                        }
                                    } else {
                                        if(sai(65)) {
                                            sum('CtoG');
                                            return 'G';
                                        } else {
                                            sum('CtoL');
                                            return null;
                                        }
                                    }
                                } else if(CL > 0 || Ds > 3) {
                                    sum('CtoL');
                                    return null;
                                } else {
                                    if(sai(65)) {
                                        sum('CtoG');
                                        return 'G';
                                    } else {
                                        sum('CtoL');
                                        return null;
                                    }
                                }
                                break;
                            case 'D':
                                if(BBCVs === 6) {
                                    sum('DtoH');
                                    return 'H';
                                } else if(BBCVs < 3) {
                                    if(Ds > 1) {
                                        sum('DtoC');
                                        return 'C';
                                    } else {
                                        if(sai(60)) {
                                            sum('DtoH');
                                            return 'H';
                                        } else {
                                            sum('DtoC');
                                            return 'C';
                                        }
                                    }
                                } else if(Ds < 2) {
                                    if(sai(85)) {
                                        sum('DtoH');
                                        return 'H';
                                    } else {
                                        sum('DtoC');
                                        return 'C';
                                    }
                                } else if(BBs === 4) {
                                    if(sai(70)) {
                                        sum('DtoH');
                                        return 'H';
                                    } else {
                                        sum('DtoC');
                                        return 'C';
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('DtoH');
                                        return 'H';
                                    } else {
                                        sum('DtoC');
                                        return 'C';
                                    }
                                }
                                break;
                            case 'G':
                                if(Ds > 2) {
                                    sum('GtoL');
                                    return null;
                                } else if(Ds < 3) {
                                    if(CL + CAV + AV > 0) {
                                        sum('GtoL');
                                        return null;
                                    } else {
                                        if(sai(65)) {
                                            sum('GtoL');
                                            return null;
                                        } else {
                                            sum('GtoF');
                                            sum('FtoJ');
                                            return null;
                                        }
                                    }
                                } else if(SS > 0) { //@
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.5) {
                                        sum('GtoF');
                                        sum('FtoJ');
                                        return null;
                                    } else if(num <= 0.75) {
                                        sum('GtoL');
                                        return null;
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                } else if(BBCVs > 4) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.5) {
                                        sum('GtoI');
                                        return null;
                                    } else if(num <= 0.75) {
                                        sum('GtoL');
                                        return null;
                                    } else {
                                        sum('GtoF');
                                        sum('FtoJ');
                                        return null;
                                    }
                                } else if(BBCVs < 2) {
                                    if(sai(85)) {
                                        sum('GtoL');
                                        return null;
                                    } else {
                                        sum('GtoF');
                                        sum('FtoJ');
                                        return null;
                                    }
                                } else {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('GtoF');
                                        sum('FtoJ');
                                        return null;
                                    } else if(num <= 0.66) {
                                        sum('GtoL');
                                        return null;
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                }
                                break;
                            case 'H':
                                if(DD > 1) {
                                    sum('HtoG');
                                    return 'G';
                                } else if(Ds > 1) {
                                    if(sai(80)) {
                                        sum('HtoG');
                                        return 'G';
                                    } else {
                                        sum('HtoK');
                                        return 'K';
                                    }
                                } else if(BBCVs > 4) {
                                    if(sai(80)) {
                                        sum('HtoK');
                                        return 'K';
                                    } else {
                                        sum('HtoG');
                                        return 'G';
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('HtoK');
                                        return 'K';
                                    } else {
                                        sum('HtoG');
                                        return 'G';
                                    }
                                }
                                break;
                        }
                        break;
                    case 3: //@4-3 nullがヤな感じ 多分こういうことだろうという
                        switch (edge) {
                            case null:
                                if(CV > 0) {
                                    sum('1toC');
                                    return 'C';
                                } else if(Ds > 3 && (speed !== '低速艦隊' || BBs + CVL === 0)) {
                                    sum('1toD');
                                    sum('DtoH');
                                    return 'H';
                                } else if(Ds > 2 && CL > 0) {
                                    sum('1toD');
                                    sum('DtoH');
                                    return 'H';
                                } else if(Ds > 1 && CL + AO > 0) {
                                    sum('1toA');
                                    return 'A';
                                } else {
                                    if(sai(50)) {
                                        sum('1toA');
                                        return 'A';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                }
                                break;
                            case 'A':
                                if(AV + AO + BBV > 0) {
                                    sum('AtoB');
                                    return 'B';
                                } else if(AO > 1 && Ds > 1){
                                    sum('AtoD');
                                    sum('DtoH');
                                    return 'H';
                                } else if(CVL > 0) {
                                    sum('AtoG');
                                    return 'G';
                                } else {
                                    if(sai(50)) {
                                        sum('AtoB');
                                        return 'B';
                                    } else {
                                        sum('AtoD');
                                        sum('DtoH');
                                        return 'H';
                                    }
                                }
                                break;
                            case 'B':
                                if(Ds < 2 || BBs + CVL > 2) {
                                    sum('BtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if(speed !== '低速艦隊') {
                                    sum('BtoG');
                                    return 'G';
                                } else {
                                    if(sai(65)) {
                                        sum('BtoE');
                                        sum('EtoG');
                                        return 'G';
                                    } else {
                                        sum('BtoG');
                                        return 'G';
                                    }
                                }
                                break;
                            case 'C':
                                if(BBCVs > 3) {
                                    sum('CtoF');
                                    return 'F';
                                } else if(SS === 0 && CL === 1 && Ds > 1) {
                                    sum('CtoD');
                                    sum('DtoH');
                                    return 'H';
                                } else {
                                    if(sai(80)) {
                                        sum('CtoF');
                                        return 'F';
                                    } else {
                                        sum('CtoD');
                                        sum('DtoH');
                                        return 'H';
                                    }
                                }
                                break;
                            case 'F':
                                if(SS > 0 || DD === 0 || CVs === 0) {
                                    sum('FtoK');
                                    return 'K';
                                } else if(speed !== '低速艦隊' && BBCVs < 3 && DD > 1) {
                                    sum('FtoH');
                                    return 'H';
                                } else {
                                    if(sai(70)) { //@
                                        sum('FtoH');
                                        return 'H';
                                    } else {
                                        sum('FtoK');
                                        return 'K';
                                    }
                                }
                                break;
                            case 'G':
                                if(CVL  === 0) {
                                    sum('GtoJ');
                                    return null;
                                } else {
                                    if(sai(65)) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                }
                                break;
                            case 'H':
                                if(CVs === 2) {
                                    if(sai(90)) {
                                        sum('HtoN');
                                        return null;
                                    } else {
                                        sum('HtoI');
                                        return null;
                                    }
                                } else if(CVs === 0 && CA === 2) {
                                        if(sai(80)) { //@
                                            sum('HtoN');
                                            return null;
                                        } else {
                                            sum('HtoI');
                                            return null;
                                        }
                                } else {
                                    if(sai(70)) {
                                        sum('HtoN');
                                        return null;
                                    } else {
                                        sum('HtoI');
                                        return null;
                                    }
                                }
                                break;
                            case 'K':
                                if(SS > 0 || (CVs > 2 || CVs === 0) || Ds < 2) {
                                    sum('KtoL');
                                    return 'L';
                                } else if(CV === 1 && AV + CVL === 1) {
                                    if(sai(55)) {
                                        sum('KtoL');
                                        return 'L';
                                    } else {
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(CVs === 2) {
                                    if(sai(67.5)) {
                                        sum('KtoL');
                                        return 'L';
                                    } else {
                                        sum('KtoN');
                                        return null;
                                    }
                                } else if(CVs === 1) {
                                    if(sai(85)) {
                                        sum('KtoL');
                                        return 'L';
                                    } else {
                                        sum('KtoN');
                                        return null;
                                    }
                                }
                                break;
                            case 'L':
                                if(CL + Ds === 0 || BBCVs > 4 || CVs === 0) {
                                    sum('LtoM');
                                    return null;
                                } else if(CA === 2) {
                                    sum('LtoN');
                                    return null;
                                } else if(SS > 0) {
                                    if(sai(50)) {
                                        sum('LtoM');
                                        return null;
                                    } else {
                                        sum('LtoN');
                                        return null;
                                    }
                                } else if(BBCVs < 3) {
                                    sum('LtoN');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('LtoM');
                                        return null;
                                    } else {
                                        sum('LtoN');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 4: //@4-4
                        switch(edge) {
                            case null:
                                if(Ds > 1) {
                                    sum('1toA');
                                    sum('AtoE');
                                    return 'E';
                                } else {
                                    if(sai(50)) {
                                        sum('1toA');
                                        sum('AtoE');
                                        return 'E';
                                    } else {
                                        sum('1toB');
                                        return 'B';
                                    }
                                }
                                break;
                            case 'B':
                                if(BBCVs > 3) {
                                    sum('BtoA');
                                    return 'A';
                                } else if(CA > 0) {
                                    if(sai(70)) {
                                        sum('BtoD');
                                        sum('DtoE');
                                        return 'E';
                                    } else {
                                        sum('BtoF');
                                        return 'F';
                                    }
                                } else {
                                    sum('BtoD');
                                    sum('DtoE');
                                    return 'E';
                                }
                                break;
                            case 'E':
                                if(BBs + CV > 3) {
                                    sum('EtoG');
                                    return 'G';
                                } else if(CAs + CL > 0 && Ds > 1) {
                                    sum('EtoI');
                                    return 'I';
                                } else if(DE > 2 || (DE > 1 && AO + AS > 0)) {
                                    sum('EtoC');
                                    return null;
                                } else if(Ds > 1) {
                                    if(BBCVs > 3) {
                                        if(sai(80)) {
                                            sum('EtoG');
                                            return 'G';
                                        } else {
                                            sum('EtoI');
                                            return 'I';
                                        }
                                    } else if(BBCVs < 4) {
                                        if(sai(65)) {
                                            sum('EtoI');
                                            return 'I';
                                        } else {
                                            sum('EtoG');
                                            return 'G';
                                            
                                        }
                                    } //BBCVsより例外なし
                                } else if(SS > 3) {
                                    sum('EtoG');
                                    return 'G';
                                } else {
                                    if(sai(50)) {
                                        sum('EtoG');
                                        return 'G';
                                    } else {
                                        sum('EtoI');
                                        return 'I';
                                    }
                                }
                                break;
                            case 'F':
                                if(BBCVs > 2) {
                                    sum('FtoH');
                                    return null;
                                } else {
                                    sum('FtoI');
                                    return 'I';
                                }
                                break;
                            case 'G':
                                const num = Math.random().toFixed(2);
                                if(num <= 0.25) {
                                    sum('GtoC');
                                    return null;
                                } else if(num <= 0.75) {
                                    sum('GtoI');
                                    return 'I';
                                } else {
                                    sum('GtoJ');
                                    return null;
                                }
                                break;
                            case 'I':
                                if(Ds > 1) {
                                    if(CV === 2 || CAs === 2 || (CV === 0 && CL > 0)) {
                                        sum('ItoK');
                                        return null;
                                    } else {
                                        if(sai(75)) {
                                            sum('ItoK');
                                            return null;
                                        } else {
                                            sum('ItoH');
                                            return null;
                                        }
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('ItoK');
                                        return null;
                                    } else {
                                        sum('ItoH');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 5: //@4-5
                        switch(edge) {
                            case null:
                                if(sai(50)) {
                                    sum('1toA');
                                    return 'A';
                                } else {
                                    sum('1toC');
                                    return 'C';
                                }
                                break;
                            case 'A':
                                if(active['4-5']['A'] === 'B') {
                                    sum('AtoB');
                                    sum('BtoE');
                                    return 'E';
                                } else {
                                    sum('AtoD');
                                    sum('DtoH');
                                    return 'H';
                                }
                                break;
                            case 'C':
                                console.log(active['4-5']['C']);
                                if(active['4-5']['C'] === 'F') {
                                    sum('CtoF');
                                    sum('FtoI');
                                    return 'I';
                                } else {
                                    sum('CtoD');
                                    sum('DtoH');
                                    return 'H';
                                }
                                break;
                            case 'E':
                                if(isFaster() || AO > 0 || BBCVs > 2 || (CL > 0 && Ds > 1)) {
                                    sum('EtoM');
                                    return 'M';
                                } else {
                                    sum('EtoK');
                                    return 'K';
                                }
                                break;
                            case 'G':
                                if(CL > 0 && Ds > 1) {
                                    sum('GtoH');
                                    return 'H';
                                } else {
                                    if(sai(50)) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('GtoD');
                                        sum('DtoH');
                                        return 'H';
                                    }
                                }
                                break;
                            case 'H':
                                if((isFaster() && BBCVs < 5) || (CL === 1 && Ds > 2) || (!track.includes('D') && CL === 1 && Ds > 1)) {
                                    sum('HtoT');
                                    return null;
                                } else {
                                    sum('HtoK');
                                    return 'K';
                                }
                                break;
                            case 'I':
                                if(active['4-5']['I'] === 'G') {
                                    sum('ItoG');
                                    return 'G';
                                } else {
                                    sum('ItoJ');
                                    sum('JtoH');
                                    return 'H';
                                }
                                break;
                            case 'K':
                                if(track.includes('E') || BBs + CV > 3 || BBCVs > 4 || AO > 0) {
                                    sum('KtoM');
                                    return 'M';
                                } else if(f_search[1] < 63) {
                                    sum('KtoL');
                                    return null;
                                } else if(f_search[1] < 70 && f_search[1] >= 63) {
                                    if(SS > 0) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.33) {
                                            sum('KtoM');
                                            return 'M';
                                        } else if(num <= 0.66) {
                                            sum('KtoL');
                                            return null;
                                        } else {
                                            sum('KtoT');
                                            return null;
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('KtoL');
                                            return null;
                                        } else {
                                            sum('KtoT');
                                            return null;
                                        }
                                    }
                                } else if(SS > 0) {
                                    if(sai(50)) {
                                        sum('KtoM');
                                        return null;
                                    } else {
                                        sum('KtoT');
                                        return null;
                                    }
                                } else if(f_search[1] >= 70) {
                                    sum('KtoT');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'M':
                                if(speed === '最速艦隊') {
                                    sum('MtoN');
                                    sum('NtoT');
                                    return null;
                                } else if(DD < 2) {
                                    sum('MtoR');
                                    return 'R';
                                } else if(speed === '高速+艦隊') {
                                    sum('MtoN');
                                    sum('NtoT');
                                    return null;
                                } else if(speed === '低速艦隊') {
                                    sum('MtoR');
                                    return 'R';
                                } else if(BBs + CV < 2) {
                                    sum('MtoN');
                                    sum('NtoT');
                                    return null;
                                } else {
                                    sum('MtoR');
                                    return 'R';
                                }
                                break;
                            case 'O':
                                if(BBCVs > 4) {
                                    sum('OtoN');
                                    sum('NtoT');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('OtoN');
                                        sum('NtoT');
                                        return null;
                                    } else {
                                        sum('OtoT');
                                        return null;
                                    }
                                }
                                break;
                            case 'Q':
                                if(f_search[1] < 55) {
                                    sum('QtoP');
                                } else if(f_search[1] < 59 && f_search[1] >= 55) {
                                    if(BBCVs > 4) {
                                        if(sai(50)) {
                                            sum('QtoO');
                                            return 'O';
                                        } else {
                                            sum('QtoP');
                                            return null;
                                        }
                                    } else if(DD === 0) {
                                        if(sai(50)) {
                                            sum('QtoO');
                                            return 'O';
                                        } else {
                                            sum('QtoP');
                                            return null;
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('QtoN');
                                            sum('NtoT');
                                            return null;
                                        } else {
                                            sum('QtoP');
                                            return null;
                                        }
                                    }
                                } else if(BBCVs > 4 || DD === 0) {
                                    sum('QtoO');
                                    return 'O';
                                } else if(f_search[1] >= 59) {
                                    sum('QtoN');
                                    sum('NtoT');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'R':
                                if(speed === '高速+艦隊' || (speed !== '低速艦隊' && CL + CAV > 0 && DD > 1)) {
                                    sum('RtoN');
                                    sum('NtoT');
                                    return null;
                                } else {
                                    sum('RtoS');
                                    sum('StoQ');
                                    return 'Q';
                                }
                                break;
                        }
                        break;
                }
                break;
            case 5:
                switch(map) {
                    case 1: //@5-1 Fが怪しげではある
                        switch(edge) {
                            case null:
                                if(BBCVs > 4) {
                                    sum('1toA');
                                    sum('AtoD');
                                    sum('DtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if((BBCVs < 3 && DD > 1) || (CAs > 3 && CL > 0) || (CAs > 1 && CL === 1)) {
                                    sum('1toB');
                                    return 'B';
                                } else if(BBs === 3 && CL === 1 && DD === 2) {
                                    if(sai(75)) {
                                        sum('1toB');
                                        return 'B';
                                    } else {
                                        sum('1toA');
                                        sum('AtoD');
                                        sum('DtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('1toB');
                                        return 'B';
                                    } else {
                                        sum('1toA');
                                        sum('AtoD');
                                        sum('DtoE');
                                        sum('EtoG');
                                        return 'G';
                                    }
                                }
                                break;
                            case 'B':
                                if(CV > 0 || CVL > 1) {
                                    sum('BtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if(BBs < 3) {
                                    sum('BtoC');
                                    sum('CtoF');
                                    return 'F';
                                } else if(CL === 1) {
                                    sum('BtoE');
                                    sum('EtoG');
                                    return 'G';
                                } else if(DD > 1) {
                                    sum('BtoC');
                                    sum('CtoF');
                                    return 'F';
                                } else {
                                    if(sai(50)) {
                                        sum('BtoE');
                                        sum('EtoG');
                                        return 'G';
                                    } else {
                                        sum('BtoC');
                                        sum('CtoF');
                                        return 'F';
                                    }
                                }
                                break;
                            case 'F':
                                if(CL + DD === 0 || BBs + CVL > 3) {
                                    sum('FtoH');
                                    return null;
                                } else if(BBs + CVL === 3) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('FtoG');
                                        return 'G';
                                    } else if(num <= 0.66) {
                                        sum('FtoH');
                                        return null;
                                    } else {
                                        sum('FtoJ');
                                        return null;
                                    }
                                } else if(speed === '最速艦隊') {
                                    sum('FtoJ');
                                    return null;
                                } else if(CL > 0) {
                                    if(DD > 1) {
                                        sum('FtoJ');
                                        return null;
                                    } else {
                                        sum('FtoG');
                                        return 'G';
                                    }
                                } else if(DD > 3) {
                                    sum('FtoJ');
                                    return null;
                                } else if(DD === 3) {
                                    if(sai(70)) {
                                        sum('FtoJ');
                                        return null;
                                    } else {
                                        sum('FtoG');
                                        return 'G';
                                    }
                                } else if(DD === 2) {
                                    if(sai(70)) {
                                        sum('FtoG');
                                        return 'G';
                                    } else {
                                        sum('FtoJ');
                                        return null;
                                    }
                                } else if(DD === 1) {
                                    sum('FtoG');
                                    return 'G';
                                } //DDより例外なし 多分
                                break;
                            case 'G':
                                if(BBCVs > 4) {
                                    sum('GtoI');
                                    return null;
                                } else if(CVs > 0 && BBCVs > 2) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoJ');
                                        return null;
                                    }
                                } else if(SS > 0) {
                                    if(sai(50)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoJ');
                                        return null;
                                    }
                                } else if(speed === '高速+艦隊') {
                                    sum('GtoJ');
                                    return null;
                                } else if(CAs > 3) {
                                    if(BBCVs + CLT === 0) {
                                        sum('GtoJ');
                                        return null;
                                    } else {
                                        if(sai(70)) {
                                            sum('GtoJ');
                                            return null;
                                        } else {
                                            sum('GtoI');
                                            return null;
                                        }
                                    }
                                } else if(CV > 0) {
                                    if(sai(70)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoJ');
                                        return null;
                                    }
                                } else if(DD > 3 || (CAs > 1 && DD > 1) || (CL > 0 && DD > 1)) {
                                    sum('GtoJ');
                                    return null;
                                } else if(BBs === 3 && CL === 1 && CAs === 2) {
                                    if(sai(85)) {
                                        sum('GtoJ');
                                        return null;
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                } else {
                                    if(sai(70)) {
                                        sum('GtoI');
                                        return null;
                                    } else {
                                        sum('GtoJ');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 2: //@5-2
                        switch(edge) {
                            case null:
                                if(BBCVs > 4 || BBs > 3 || CV > 2 || SS > 0) {
                                    if(sai(50)) {
                                        sum('1toA');
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('1toB');
                                        sum('BtoC');
                                        return 'C';
                                    }
                                } else {
                                    sum('1toB');
                                    sum('BtoC');
                                    return 'C';
                                }
                                break;
                            case 'C':
                                if((CVs === 2 && CAs === 2 && DD === 2) || (isInclude('夕張') && CVL + CAs + DD + AO === 5) || (isInclude('祥鳳') && CAs + CL + CT + DD + AO === 5)) {
                                    sum('CtoD');
                                    return 'D';
                                } else if(speed === '低速艦隊') {
                                    sum('CtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(isInclude('翔鶴') && isInclude('瑞鶴') && DD > 1) {
                                    sum('CtoD');
                                    return 'D';
                                } else if(BBS + CV > 0) {
                                    sum('CtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if((CVL === 2 && DD > 1) || (CVL === 1 && CAs > 0 && DD > 1)) {
                                    sum('CtoD');
                                    return 'D';
                                } else {
                                    sum('CtoE');
                                    sum('EtoF');
                                    return 'F';
                                }
                                break;
                            case 'D':
                                if(isInclude('祥鳳') && (((CA === 1 && (CL === 1 || AO === 1)) || AO === 2))) {
                                    sum('DtoG');
                                    return 'G';
                                } else if(isInclude('夕張')) {
                                    if(DD === 3 || (AO === 1 && (DD === 2 || CA === 2)) || (AO == 2 && (DD === 1 || CA === 2)) || (isInclude('祥鳳') && (CA === 2 || AO === 2))) {
                                        sum('DtoG');
                                        return 'G';
                                    }
                                } else {
                                    sum('DtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(f_search[1] < 63) {
                                    sum('FtoH');
                                    return null;
                                } else if(f_search[1] < 70 && f_search >= 63) {
                                    if(BBs + CV > 4) {
                                        if(sai(50)) {
                                            sum('FtoH');
                                            return null;
                                        } else {
                                            sum('FtoI');
                                            sum('ItoO');
                                            return null;
                                        }
                                    } else if(BBs > 2 || CVs > 2) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.33) {
                                            sum('FtoH');
                                            return null;
                                        } else if(num <= 0.66) {
                                            sum('FtoI');
                                            sum('ItoO');
                                            return null;
                                        } else {
                                            sum('FtoO');
                                            return null;
                                        }
                                    } else {
                                        if(sai(50)) {
                                            sum('FtoH');
                                            return null;
                                        } else {
                                            sum('FtoO');
                                            return null;
                                        }
                                    }
                                } else if(BBs + CV > 4) {
                                    sum('FtoI');
                                    sum('ItoO');
                                    return null;
                                } else if(BBs > 2 || CVs > 2) {
                                    if(70) {
                                        sum('FtoI');
                                        sum('ItoO');
                                        return null;
                                    } else {
                                        sum('FtoO');
                                        return null;
                                    }
                                } else if(f_search[1] >= 70) {
                                    sum('FtoO');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'G':
                                if(isInclude('祥鳳') && isInclude('夕張')) {
                                    if(sai(55)) {
                                        sum('GtoJ');
                                        sum('JtoL');
                                        return 'L';
                                    } else {
                                        sum('GtoL');
                                        return 'L';
                                    }
                                } else {
                                    if(sai(85)) {
                                        sum('GtoJ');
                                        sum('JtoL');
                                        return 'L';
                                    } else {
                                        sum('GtoL');
                                        return 'L';
                                    }
                                }
                                break;
                            case 'L':
                                if(!isInclude('祥鳳') && !is('夕張')) {
                                    if(isFaster()) {
                                        if(sai(50)) {
                                            sum('LtoK');
                                            sum('KtoO');
                                            return null;
                                        } else {
                                            sum('LtoN');
                                            return null;
                                        }
                                    } else if(f_search[1] < 60) {
                                        if(sai(50)) {
                                            sum('LtoM');
                                            sum('MtoK');
                                            sum('KtoO');
                                            return null;
                                        } else {
                                            sum('LtoN');
                                            return null;
                                        }
                                    } else if(f_search[1] < 62 && f_search[1] >= 60) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.33) {
                                            sum('LtoK');
                                            sum('KtoO');
                                            return null;
                                        } else if(num <= 0.66) {
                                            sum('LtoM');
                                            sum('MtoK');
                                            sum('KtoO');
                                            return null;
                                        } else {
                                            sum('LtoN');
                                            return null;
                                        }
                                    } else if(f_search[1] >= 62) {
                                        if(sai(50)) {
                                            sum('LtoK');
                                            sum('KtoO');
                                            return null;
                                        } else {
                                            sum('LtoN');
                                            return null;
                                        }
                                    } //LoSより例外なし
                                } if(isFaster()) {
                                    sum('LtoK');
                                    sum('KtoO');
                                    return null;
                                } else if(f_search[1] < 62 && f_search[1] >= 60) {
                                    if(sai(50)) {
                                        sum('LtoK');
                                        sum('KtoO');
                                        return null;
                                    } else {
                                        sum('LtoM');
                                        sum('MtoK');
                                        sum('KtoO');
                                        return null;
                                    }
                                } else if(f_search[1] >= 62) {
                                    sum('LtoK');
                                    sum('KtoO');
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 3: //5-3@
                        switch(edge) {
                            case null:
                                if(isFaster()) {
                                    sum('1toD');
                                    sum('DtoG');
                                    return 'G';
                                } else if(BBCVs > 2 || (BBCVs === 2 && speed === '低速艦隊')) {
                                    sum('1toC');
                                    sum('CtoD');
                                    sum('DtoG');
                                    return 'G';
                                } else if(SS > 0) {
                                    if(sai(60)) {
                                        sum('1toD');
                                        sum('DtoG');
                                        return 'G';
                                    } else {
                                        sum('1toC');
                                        sum('CtoD');
                                        sum('DtoG');
                                        return 'G';
                                    }
                                } else {
                                    sum('1toD');
                                    sum('DtoG');
                                    return 'G';
                                }
                                break;
                            case 'B':
                                if(sai(65)) {
                                    sum('BtoA');
                                    return null;
                                } else {
                                    sum('BtoF');
                                    return null;
                                }
                                break;
                            case 'E':
                                if(SS > 0 || (BBCVs > 0 && DD < 2)) {
                                    if(sai(50)) {
                                        sum('EtoB');
                                        return 'B';
                                    } else {
                                        sum('EtoQ');
                                        return null;
                                    }
                                } else if(CL > 0 || CAs > 3 || DD > 3) {
                                    sum('EtoQ');
                                    return null;
                                } else {
                                    if(sai(50)) {
                                        sum('EtoB');
                                        return 'B';
                                    } else {
                                        sum('EtoQ');
                                        return null;
                                    }
                                }
                                break;
                            case 'G':
                                if(BBV + CV + SS > 0) {
                                    sum('GtoJ');
                                    return 'J';
                                } else if(DD === 0 || CVL > 1) {
                                    sum('GtoI');
                                    return 'I';
                                } else if(CVL === 1) {
                                    sum('GtoJ');
                                    return 'J';
                                } else if(DD === 1) {
                                    sum('GtoI');
                                    return 'I';
                                } else if(slowBB() > 1) {
                                    sum('GtoJ');
                                    return 'J';
                                } else {
                                    sum('GtoI');
                                    return 'I';
                                }
                                break;
                            case 'I':
                                if(CVL > 0 || BBs > 2) {
                                    sum('ItoJ');
                                    return 'J';
                                } else if(DD > 2 || (CL > 0 && DD > 1)) {
                                    sum('ItoO');
                                    return 'O';
                                } else if(BBs > 1) {
                                    sum('ItoJ');
                                    return 'J';
                                } else if(DD > 1) {
                                    sum('ItoO');
                                    return 'O';
                                } else if(CL > 0 && CAs > 3 && CAs + CL + DD === 6) {
                                    sum('ItoO');
                                    return 'O';
                                } else {
                                    if(sai(50)) {
                                        sum('ItoJ');
                                        return 'J';
                                    } else {
                                        sum('ItoO');
                                        return 'O';
                                    }
                                }
                                break;
                            case 'J':
                                if(SS > 0) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('JtoL');
                                        sum('LtoO');
                                        return 'O';
                                    } else if(num <= 0.66) {
                                        sum('JtoM');
                                        return null;
                                    } else {
                                        sum('JtoN');
                                        sum('NtoO');
                                        return 'O';
                                    }
                                } else if(BBCVs > 3 || CV > 0 ||CVL > 1) {
                                    sum('JtoM');
                                    return null;
                                } else if(CVL === 1) {
                                    if(slowBB() > 1) {
                                        sum('JtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else if(BBV > 0) {
                                        if(sai(50)) {
                                            sum('JtoN');
                                            sum('NtoO');
                                            return 'O';
                                        } else {
                                            sum('JtoL');
                                            sum('LtoO');
                                            return 'O';
                                        }
                                    } else if(DD > 2|| (CL > 0 && DD > 1) || (CAs === 3 && DD === 2)) {
                                        sum('JtoL');
                                        sum('LtoO');
                                        return 'O';
                                    } else {
                                        if(sai(50)) {
                                            sum('JtoN');
                                            sum('NtoO');
                                            return 'O';
                                        } else {
                                            sum('JtoL');
                                            sum('LtoO');
                                            return 'O';
                                        }
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('JtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('JtoL');
                                        sum('LtoO');
                                        return 'O';
                                    }
                                }
                                break;
                            case 'O':
                                if(active['5-3']['O'] === 'K') {
                                    console.log('check:O1');
                                    sum('OtoK');
                                    return 'K';
                                } else {
                                    sum('OtoP');
                                    sum('PtoK');
                                    return 'K';
                                }
                                break;
                            case 'K':
                                console.log('check:K0');
                                if(DD > 3 || (DD === 3 && CL === 1)) {
                                    console.log('check:K1');
                                    sum('KtoH');
                                    sum('HtoE');
                                    return 'E';
                                } else if(DD === 2 && (isFaster() || BBV + AO + AS > 0 || getDrum(world, map) > 1 || getCraft(world, map) > 1)) {
                                    console.log('check:K2');
                                    sum('KtoH');
                                    sum('HtoE');
                                    return 'E';
                                } else {
                                    console.log('check:K3');
                                    sum('KtoE');
                                    return 'E';
                                }
                                break;
                        }
                        break;
                    case 4: //@5-4
                        switch(edge) {
                            case null:
                                if(CVs > 0) {
                                    sum('1toB');
                                    return 'B';
                                } else if(BBs > 2 || CAs > 4) {
                                    sum('1toA');
                                    return 'A';
                                } else if(getDrum(world, map) + getCraft(world, map) > 4 || DD > 3 || (CL === 1 && DD > 2)) {
                                    sum('1toB');
                                    return 'B';
                                } else {
                                    sum('1toA');
                                    return 'A';
                                }
                                break;
                            case 'A':
                                if(SS > 0 || BBs > 4 || DD > 1 || CAs > 2) {
                                    sum('AtoD');
                                    return 'D';
                                } else {
                                    sum('AtoF');
                                    sum('FtoH');
                                    sum('HtoI');
                                    sum('ItoJ');
                                    sum('JtoM');
                                    return 'M';
                                }
                                break;
                            case 'B':
                                if(CVs + SS > 0) {
                                    sum('BtoC');
                                    sum('CtoG');
                                    return 'G';
                                } else if(slowBB() > 0 || BBV + SlowBB() > 1) {
                                    sum('BtoD');
                                    return 'D';
                                } else if(isFaster() || (CL === 1 && DD > 2) || DD > 3) {
                                    sum('BtoE');
                                    sum('EtoH');
                                    sum('HtoI');
                                    sum('ItoJ');
                                    sum('JtoM');
                                    return 'M';
                                } else if(DD === 0) {
                                    sum('BtoD');
                                    return 'D';
                                } else {
                                    if(sai(50)) {
                                        sum('BtoD');
                                        return 'D';
                                    } else {
                                        sum('BtoE');
                                        sum('EtoH');
                                        sum('HtoI');
                                        sum('ItoJ');
                                        sum('JtoM');
                                        return 'M';
                                    }
                                }
                                break;
                            case 'D':
                                if(SS > 0 || slowBB() > 1 || BBs > 2 || DD > 1) {
                                    sum('DtoE');
                                    sum('EtoH');
                                    sum('HtoI');
                                    sum('ItoJ');
                                    sum('JtoM');
                                    return 'M';
                                } else {
                                    sum('DtoF');
                                    sum('FtoH');
                                    sum('HtoI');
                                    sum('ItoJ');
                                    sum('JtoM');
                                    return 'M';
                                }
                                break;
                            case 'G':
                                if(SS > 0 || BBs > 3) {
                                    sum('GtoK');
                                    sum('KtoL');
                                    return 'L';
                                } else if(CV < 3) {
                                    sum('GtoL');
                                    return 'L';
                                } else {
                                    if(sai(70)) {
                                        sum('GtoL');
                                        return 'L';
                                    } else {
                                        sum('GtoK');
                                        sum('KtoL');
                                        return 'L';
                                    }
                                }
                                break;
                            case 'L':
                                if(isFaster()) {
                                    sum('LtoP');
                                    return null;
                                } else if(f_search[1] < 56) {
                                    sum('LtoN');
                                    return null;
                                } else if((f_search[1] < 60 && f_search[1] >= 56) || BBs + CV > 4) {
                                    if(sai(50)) {
                                        sum('LtoP');
                                        return null;
                                    } else {
                                        sum('LtoN');
                                        return null;
                                    }
                                } else if(f_search[1] >= 60) {
                                    sum('LtoP');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'M':
                                if(isFaster()) {
                                    sum('MtoP');
                                    return null;
                                } else if(f_search[1] < 41) {
                                    sum('MtoO');
                                    return null;
                                } else if((f_search[1] < 45 && f_search[1] >= 41) || SS > 0) {
                                    if(sai(50)) {
                                        sum('MtoP');
                                        return null;
                                    } else {
                                        sum('MtoO');
                                        return null;
                                    }
                                } else if(f_search[1] >= 45) {
                                    sum('MtoP');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 5: //@5-5
                        switch(edge) {
                            case null:
                                if(DD > 3 || getDrum(world, map) > 3 || getCraft(world, map) > 3) {
                                    sum('1toA');
                                    sum('AtoC');
                                    sum('CtoE');
                                    return 'E';
                                } else {
                                     sum('1toB');
                                    return 'B';
                                }
                                break;
                            case 'B':
                                if(CV > 2 || BBs + CLT > 3 || CLT > 2 || DD < 2) {
                                    sum('BtoK');
                                    sum('KtoP');
                                    return 'P';
                                } else {
                                    sum('BtoF');
                                    return 'F';
                                }
                                break;
                            case 'E':
                                if(speed === '最速艦隊' || (DD > 1 && speed === '高速+艦隊')) {
                                    sum('EtoH');
                                    return 'H';
                                } else {
                                    sum('EtoG');
                                    sum('GtoI');
                                    return 'I';
                                }
                                break;
                            case 'F':
                                if(active['5-5']['F'] === 'D') {
                                    sum('FtoD');
                                    sum('DtoH');
                                    return 'H';
                                } else {
                                    sum('FtoJ');
                                    sum('JtoP');
                                    return 'P';
                                }
                                break;
                            case 'H':
                                if(speed === '最速艦隊') {
                                    sum('HtoN');
                                    return 'N';
                                } else if(BBCVs > 3) {
                                    sum('HtoP');
                                    return 'P';
                                } else if(DD < 2) {
                                    sum('HtoL');
                                    sum('LtoN');
                                    return 'N';
                                } else {
                                    sum('HtoN');
                                    return 'N';
                                }
                                break;
                            case 'I':
                                if(BBCVs === 3 && DD > 1) {
                                    sum('ItoL');
                                    sum('LtoN');
                                    return 'N';
                                } else {
                                    sum('ItoM');
                                    return 'M';
                                }
                                break;
                            case 'M':
                                if(track.includes('N')) {
                                    sum('MtoO');
                                    return 'O';
                                } else if(BBCVs > 3 || DD < 2) {
                                    sum('MtoL');
                                    sum('LtoN');
                                    return 'N';
                                } else {
                                    sum('MtoO');
                                    return 'O';
                                }
                                break;
                            case 'N':
                                if(track.includes('M') || isFaster() || AO > 0) {
                                    sum('NtoO');
                                    return 'O';
                                } else if(CV > 0 || BBs + CVL > 2 || DD < 2) {
                                    sum('NtoM');
                                    return 'M';
                                } else {
                                    sum('NtoO');
                                    return 'O';
                                }
                                break;
                            case 'O':
                                if(isFaster()) {
                                    sum('OtoS');
                                    return null;
                                } else if(f_search[1] < 63) {
                                    sum('OtoR');
                                    return null;
                                } else if((f_search[1] < 66 & f_search[1] >= 63) || SS > 0) {
                                    if(sai(50)) {
                                        sum('OtoS');
                                        return null;
                                    } else {
                                        sum('OtoR');
                                        return null;
                                    }
                                } else if(f_search[1] >= 66) {
                                    sum('OtoS');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'P':
                                if(speed === '最速艦隊') {
                                    sum('PtoS');
                                    return null;
                                } else if(speed === '高速+艦隊') {
                                    if(SS > 0) {
                                        if(sai(50)) {
                                            sum('PtoQ');
                                            return null;
                                        } else {
                                            sum('PtoS');
                                            return null;
                                        }
                                    } else if(BBCVs < 6) {
                                        sum('PtoS');
                                        return null;
                                    } else {
                                        if(sai(50)) {
                                            sum('PtoQ');
                                            return null;
                                        } else {
                                            sum('PtoS');
                                            return null;
                                        }
                                    }
                                } else if(f_search[1] < 73) {
                                    sum('PtoQ');
                                    return null;
                                } else if((f_search[1] < 80 && f_search[1] >= 73) || SS > 0 || BBCVs > 4) {
                                    if(sai(66)) {
                                        sum('PtoQ');
                                        return null;
                                    } else {
                                        sum('PtoS');
                                        return null;
                                    }
                                } else if(f_search[1] >= 80) {
                                    sum('PtoS');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                }
                break;
            case 6:
                switch(map) {
                    case 1: //@6-1
                        switch(edge) {
                            case null:
                                if(BBCVs + CAs > 2 || BBs > 1) {
                                    sum('1toB');
                                    return null;
                                } else if((SS > 2 && SS === f_length) || (AS === 1 && SS > 2 && AS + SS === f_length) || (AS === 1 && SS === 3 && DD === 2) || (AS === 1 && SS === 4 && CL + DD === 1)) {
                                    sum('1toA');
                                    return 'A';
                                } else if(CL + DD === 0) {
                                    sum('1toB');
                                    return null;
                                } else {
                                    sum('1toC');
                                    sum('CtoF');
                                    sum('FtoG');
                                    return 'G';
                                }
                                break;
                            case 'A':
                                if(AS > 0) {
                                    sum('AtoF');
                                    sum('FtoG');
                                    return 'G';
                                } else {
                                    sum('AtoD');
                                    sum('DtoF');
                                    sum('FtoG');
                                    return 'G';
                                }
                                break;
                            case 'G':
                                if(SS < 3 || BBCVs + CAs === 2 || f_search[3] < 12) {
                                    sum('GtoI');
                                    return null;
                                } else if(AS > 0 && f_search[3] >= 16) {
                                    sum('GtoH');
                                    return 'H';
                                } else if(AS === 0 && f_search[3] >= 16) {
                                    if(sai(85)) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('GtoH');
                                        return 'H';
                                    } else {
                                        sum('GtoI');
                                        return null;
                                    }
                                }
                                break;
                            case 'H':
                                if(f_search[3] < 20) {
                                    sum('HtoE');
                                    return null;
                                } else if(AS > 0) {
                                    if(f_search[3] < 25 && f_search[3] >= 20) {
                                        if(sai(50)) {
                                            sum('HtoE');
                                            return null;
                                        } else {
                                            sum('HtoK');
                                            return null;
                                        }
                                    } else if(f_search[3] >= 25) {
                                        sum('HtoK');
                                        return null;
                                    } //LoSより例外なし
                                } else if(f_search[3] < 25 && f_search[3] >= 20) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('HtoE');
                                        return null;
                                    } else if(num <= 0.66) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                } else if(f_search[3] < 36 && f_search[3] >= 25) {
                                    if(sai(50)) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                } else if(f_search[3] >= 36) {
                                    sum('HtoK');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 2: //@6-2
                        switch(edge) {
                            case null:
                                if(CL + DD > 3) {
                                    sum('1toB');
                                    return 'B';
                                } else if(BBV + CAV + AV + LHA < 2 && SS < 5) {
                                    if(BBCVs > 4) {
                                        sum('1toB');
                                        return 'B';
                                    } else if(BBCVs > 3) {
                                        if(sai(65)) {
                                            sum('1toB');
                                            return 'B';
                                        } else {
                                            sum('1toC');
                                            return 'C';
                                        }
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                } else {
                                    sum('1toC');
                                    return 'C';
                                }
                                break;
                            case 'B':
                                if(CL + DD > 4) {
                                    sum('BtoD');
                                    return 'D';
                                } else if(CVs < 3 && BBs === 0) {
                                    if(sai(70)) {
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('BtoD');
                                        return 'D';
                                    }
                                } else {
                                    sum('BtoC');
                                    return 'C';
                                }
                                break;
                            case 'C':
                                if(SS === 6 || BBCVs > 4 || BBCVs + CAs === 6 || BBCVs + SS === 6) {
                                    sum('CtoA');
                                    return null;
                                } else if(BBCVs < 3) {
                                    sum('CtoE');
                                    return 'E';
                                } else {
                                    sum('CtoD');
                                    return 'D';
                                }
                                break;
                            case 'D':
                                if(DD < 3 || BBCVs > 0 || CL + DD < 5) {
                                    sum('DtoF');
                                    sum('FtoI');
                                    return 'I';
                                } else {
                                    sum('DtoH');
                                    return 'H';
                                }
                                break;
                            case 'E':
                                if(BBs > 1 || CVs > 1 || DD < 2) {
                                    sum('EtoF');
                                    sum('FtoI');
                                    return 'I';
                                } else if(f_search[2] < 43) {
                                    sum('EtoI');
                                    return 'I';
                                } else if(f_search[2] < 50 && f_search[2] >= 43) {
                                    if(sai(50)) {
                                        sum('EtoI');
                                        return 'I';
                                    } else {
                                        sum('EtoJ');
                                        sum('JtoK');
                                        return null;
                                    }
                                } else if(f_search[2] >= 50) {
                                    sum('EtoJ');
                                    sum('JtoK');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'H':
                                if(f_search[2] < 32) {
                                    sum('HtoG');
                                    return null;
                                } else {
                                    sum('HtoK');
                                    return null;
                                }
                                break;
                            case 'I':
                                if(SS > 3 || f_search[2] < 35) {
                                    sum('ItoG');
                                    return null;
                                } else if(f_search[2] < 40 && f_search[2] >= 35) {
                                    if(sai(50)) {
                                        sum('ItoG');
                                        return null;
                                    } else {
                                        sum('ItoK');
                                        return null;
                                    }
                                } else if(f_search[2] >= 40) {
                                    sum('ItoK');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 3: //@6-3
                        switch(edge) {
                            case null:
                                sum('1toA');
                                return 'A';
                                break;
                            case 'A':
                                if(active['6-3']['A'] === 'B') {
                                    sum('AtoB');
                                    sum('BtoD');
                                    sum('DtoE');
                                    return 'E';
                                } else {
                                    sum('AtoC');
                                    sum('CtoE');
                                    return 'E';
                                }
                                break;
                            case 'E':
                                if(AV < 2) {
                                    if(CL < 2 && DD > 2) {
                                        sum('EtoG');
                                        sum('GtoH');
                                        return 'H';
                                    } else if(CL < 3) {
                                        if(sai(60)) {
                                            sum('EtoF');
                                            sum('FtoH');
                                            return 'H';
                                        } else {
                                            sum('EtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    } else {
                                        sum('EtoF');
                                        sum('FtoH');
                                        return 'H';
                                    }
                                } else {
                                    sum('EtoF');
                                    sum('FtoH');
                                    return 'H';
                                }
                                break;
                            case 'H':
                                if(f_search[2] < 36) {
                                    sum('HtoI');
                                    return null;
                                } else if(f_search[2] < 38 && f_search[2] >= 36) {
                                    if(sai(50)) {
                                        sum('HtoI');
                                        return null;
                                    } else {
                                        sum('HtoJ');
                                        return null;
                                    }
                                } else if(f_search[2] >= 38) {
                                    sum('HtoJ');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 4: //@6-4
                        switch(edge) {
                            case null:
                                if(LHA + CVs > 0 || ((!isInclude('長門改二') && !isInclude('陸奥改二')) && BBs === 2) || CAV > 2) {
                                    sum('2toM');
                                    sum('MtoK');
                                    return 'K';
                                } else if(speed !== '低速艦隊') {
                                    if((isFCL() && DD === 3) || DD > 3) {
                                        sum('1toB');
                                        sum('BtoD');
                                        sum('DtoC');
                                        sum('CtoF');
                                        sum('FtoN');
                                        return null;
                                    }
                                } else if(DD > 1) {
                                    sum('1toA');
                                    return 'A';
                                } else {
                                    sum('2toM');
                                    sum('MtoK');
                                    return 'K';
                                }
                                break;
                            case 'A':
                                if(isInclude('秋津洲') && (CAV === 1 || CL > 0 || DD > 2)) {
                                    sum('AtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
                                } else if(BBs > 0 || speed === '低速艦隊') {
                                    sum('AtoE');
                                    return 'E';
                                } else if(isFCL() || DD > 2) {
                                    sum('AtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
                                } else {
                                    sum('AtoE');
                                    return 'E';
                                }
                                break;
                            case 'E':
                                if(isInclude('秋津洲') || isInclude('如月')) {
                                    sum('EtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
                                } else if(CAs < 2 && CL > 0 && speed !== '低速艦隊') {
                                    sum('EtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
                                } else {
                                    sum('EtoG');
                                    sum('GtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
                                }
                                break;
                            case 'J':
                                if(isInclude('長門改二') && isInclude('陸奥改二') && CVs === 2) {
                                    sum('JtoL');
                                    sum('LtoI');
                                    sum('ItoN');
                                    return null;
                                } else if(!isInclude('長門改二') && !isInclude('陸奥改二') && (BBCVs > 2 || BBs === 2)) {
                                    sum('JtoL');
                                    sum('LtoI');
                                    sum('ItoN');
                                    return null;
                                } else if(CL === 0) {
                                    sum('JtoL');
                                    sum('LtoI');
                                    sum('ItoN');
                                    return null;
                                } else if(LHA > 0 && DD > 1) {
                                    sum('JtoN');
                                    return null;
                                } else if(CVs > 1 && speed === '低速艦隊') {
                                    sum('JtoL');
                                    sum('LtoI');
                                    sum('ItoN');
                                    return null;
                                } else {
                                    sum('JtoI');
                                    sum('ItoN');
                                    return null;
                                }
                                break;
                            case 'K':
                                if(BBs === 2 || BBs + CAs > 2) {
                                    sum('KtoH');
                                    sum('HtoJ');
                                    return 'J';
                                } else if(DD > 1) {
                                    sum('KtoJ');
                                    return 'J';
                                } else {
                                    sum('KtoH');
                                    sum('HtoJ');
                                    return 'J';
                                }
                                break;
                        }
                        break;
                    case 5: //@6-5
                        switch(edge) {
                            case null:
                                if(CL === 0 || CVs + CLT > 0 || BBs > 3) {
                                    sum('1toA');
                                    sum('AtoC');
                                    return 'C';
                                } else {
                                    sum('2toB');
                                    return 'B';
                                }
                                break;
                            case 'B':
                                if(BBs === 3 || DD < 2) {
                                    sum('BtoC');
                                    return 'C';
                                } else {
                                    sum('BtoF');
                                    sum('FtoI');
                                    return 'I';
                                }
                                break;
                            case 'C':
                                if(DD === 0 || CLT > 1 || BBCVs > 3 || BBCVs + CAs > 4) {
                                    sum('CtoE');
                                    return 'E';
                                } else {
                                    sum('CtoD');
                                    sum('DtoG');
                                    return 'G';
                                }
                                break;
                            case 'E':
                                if(CVs > 0 && CL > 0 && DD > 0) {
                                    sum('EtoH');
                                    sum('HtoG');
                                    return 'G';
                                } else {
                                    sum('EtoI');
                                    return 'I';
                                }
                                break;
                            case 'G':
                                if(f_search[2] < 50) {
                                    sum('GtoK');
                                    return null;
                                } else {
                                    sum('GtoM');
                                    return null;
                                }
                                break;
                            case 'I':
                                if(CL === 0) {
                                    sum('ItoH');
                                    sum('HtoG');
                                    return 'G';
                                } else if(DD > 1 || (BBs === 0 && CVs + CAs < 5 && CVs < 3)) {
                                    sum('ItoJ');
                                    return 'J';
                                } else {
                                    sum('ItoH');
                                    sum('HtoG');
                                    return 'G';
                                }
                                break;
                            case 'J':
                                if(f_search[2] < 35) {
                                    sum('JtoL');
                                    return null;
                                } else {
                                    sum('JtoM');
                                    return null;
                                }
                                break;
                        }
                        break;
                }
                break;
            case 7:
                switch(map) {
                    case 1: //@7-1
                        switch(edge) {
                            case null:
                                if(SS > 0) {
                                    if(BBCVs > 0 || f_length > 4) {
                                        if(sai(50)) {
                                            sum('1toB');
                                            return 'B';
                                        } else {
                                            sum('1toD');
                                            return 'D';
                                        }
                                    } else if(f_length < 5) {
                                        const num = Math.random().toFixed(2);
                                        if(num <= 0.33) {
                                            sum('1toB');
                                            return 'B';
                                        } else if(num <= 0.66) {
                                            sum('1toD');
                                            return 'D';
                                        } else {
                                            sum('1toF');
                                            sum('FtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    }
                                } else if(BBCVs  > 0 || f_length === 6) {
                                    sum('1toB');
                                    return 'B';
                                } else if(f_length === 5 || AO > 0) {
                                    sum('1toD');
                                    return 'D';
                                } else if(f_length < 5) {
                                    sum('1toF');
                                    sum('FtoG');
                                    sum('GtoH');
                                    return 'H';
                                } //f_lengthより例外なし
                                break;
                            case 'B':
                                if(BBs + CV > 0 || CVL > 1 || CAs > 2) {
                                    sum('BtoA');
                                    sum('AtoC');
                                    sum('CtoE');
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else if(DD + DE > 1) {
                                    sum('BtoC');
                                    sum('CtoE');
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else {
                                    if(sai(50)) {
                                        sum('BtoA');
                                        sum('AtoC');
                                        sum('CtoE');
                                        sum('EtoG');
                                        return 'G';
                                    } else {
                                        sum('BtoC');
                                        sum('CtoE');
                                        sum('EtoG');
                                        sum('GtoH');
                                        return 'H';
                                    }
                                }
                                break;
                            case 'D':
                                if((CL === 1 && DD === 4) || (DD > 0 && DE > 2) || (AO > 0 && DE > 2) || Ds === 5) {
                                    sum('DtoE');
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else if(Ds === 4) {
                                    if(CT + AO > 0) {
                                        sum('DtoE');
                                        sum('EtoG');
                                        sum('GtoH');
                                        return 'H';
                                    } else if(AV > 0) {
                                        if(sai(50)) {
                                            sum('DtoC');
                                            sum('CtoE');
                                            sum('EtoG');
                                            sum('GtoH');
                                            return 'H';
                                        } else {
                                            sum('DtoE');
                                            sum('EtoG');
                                            sum('GtoH');
                                            return 'H';
                                        }
                                    } else {
                                        sum('DtoC');
                                        sum('CtoE');
                                        sum('EtoG');
                                        sum('GtoH');
                                        return 'H';
                                    }
                                } else {
                                    sum('DtoC');
                                    sum('CtoE');
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                }
                                break;
                            case 'H':
                                if((CL > 0 && DD > 3) || (CL > 0 && DE > 2)) {
                                    sum('HtoK');
                                    return null;
                                } else if(AO > 0) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('HtoI');
                                        return null;
                                    } else if(num <= 0.66) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                } else if(BBCVs > 1) {
                                    sum('HtoJ');
                                    return null;
                                } else if(BBCVs === 1) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('HtoI');
                                        return null;
                                    } else if(num <= 0.66) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                } else {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.225) {
                                        sum('HtoI');
                                        return null;
                                    } else if(num <= 0.30) {
                                        sum('HtoJ');
                                        return null;
                                    } else {
                                        sum('HtoK');
                                        return null;
                                    }
                                }
                                break;
                        }
                        break;
                    case 2: //@7-2
                        switch(edge) {
                            case null:
                                if(Ds < 2 || SS > 0) {
                                    sum('1toA');
                                    sum('AtoB');
                                    sum('BtoC');
                                    return 'C';
                                } else if(f_length === 6) {
                                    if(CV > 1 || BBs + CV > 3 || CL + CT > 2) {
                                        sum('1toA');
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('1toB');
                                        sum('BtoC');
                                        return 'C';
                                    }
                                } else if(f_length === 5) {
                                    if(CV > 2) {
                                        sum('1toA');
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else if(BBs + CV > 0 || CL + CT > 1 || DE < 3) {
                                        sum('1toB');
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                } else if(f_length < 5) {
                                    if(BBs + CV > 0 || Ds < 3) {
                                        sum('1toB');
                                        sum('BtoC');
                                        return 'C';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                } //f_lengthより例外なし
                                break;
                            case 'C':
                                if(AO + SS > 0) {
                                    sum('CtoD');
                                    return 'D';
                                } else if(f_length === 6) {
                                    if(BBs + CV > 0) {
                                        sum('CtoD');
                                        return 'D';
                                    } else if(Ds > 3) {
                                        sum('CtoE');
                                        return 'E';
                                    } else {
                                        sum('CtoD');
                                        return 'D';
                                    }
                                } else if(f_length === 5) {
                                    if(BBs + CV > 1) {
                                        sum('CtoD');
                                        return 'D';
                                    } else if(Ds > 3 || DE > 2) {
                                        sum('CtoE');
                                        return 'E';
                                    } else {
                                        sum('CtoD');
                                        return 'D';
                                    }
                                } else if(f_length < 5) {
                                    if(BBs + CV > 1) {
                                        sum('CtoD');
                                        return 'D';
                                    } else if(Ds > 2 || DE > 1) {
                                        sum('CtoE');
                                        return 'E';
                                    } else {
                                        sum('CtoD');
                                        return 'D';
                                    }
                                } //f_lengthより例外なし
                                break;
                            case 'D':
                                if(isFaster()) {
                                    sum('DtoI');
                                    return 'I';
                                } else if(BBCVs > 3) {
                                    sum('DtoH');
                                    sum('HtoI');
                                    return 'I';
                                } else if(speed !== '低速艦隊') {
                                    sum('DtoI');
                                    return 'I';
                                } else if(BBCVs === 3) {
                                    sum('DtoH');
                                    sum('HtoI');
                                    return 'I';
                                } else if(BBCVs === 2) {
                                    if(sai(65)) {
                                        sum('DtoI');
                                        return 'I';
                                    } else {
                                        sum('DtoH');
                                        sum('HtoI');
                                        return 'I';
                                    }
                                } else if(BBCVs < 2) {
                                    sum('DtoI');
                                    return 'I';
                                } //BBCVsより例外なし
                                break;
                            case 'E':
                                if(f_length < 6 || Ds > 4 || (DD > 0 && DE > 2)) {
                                    sum('EtoG');
                                    return null;
                                } else if(f_search[3] < 46) {
                                    sum('EtoF');
                                    return null;
                                } else {
                                    sum('EtoG');
                                    return null;
                                }
                                break;
                            case 'I':
                                if(AO > 0 || (AV > 0 && Ds > 2)) {
                                    sum('ItoJ');
                                    sum('JtoK');
                                    return null;
                                } else if(f_search[3] < 63) {
                                    sum('ItoJ');
                                    sum('JtoK');
                                    return null;
                                } else if(f_search[3] < 69 && f_search[3] >= 63) {
                                    const num = Math.random().toFixed(2);
                                    if(num <= 0.33) {
                                        sum('ItoJ');
                                        sum('JtoK');
                                        return null;
                                    } else if(num <= 0.66) {
                                        sum('ItoL');
                                        return null;
                                    } else {
                                        sum('ItoM');
                                        return null;
                                    }
                                } else if(f_search[3] >= 69) {
                                    sum('ItoM');
                                    return null;
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 3: //@7-3
                        if(active['7-3']['0'] === 0) {
                            //解放前
                            switch(edge) {
                                case null:
                                    sum('1toA');
                                    return 'A';
                                    break;
                                case 'A':
                                    if(f_length === 1) {
                                        sum('AtoC');
                                        return 'C';
                                    } else if(CA === 0 || CVs > 0 || Ds === 0 || f_length > 4) {
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else if(isInclude('羽黒') && isInclude('神風')) {
                                        sum('AtoC');
                                        return 'C';
                                    } else if(f_length === 4) {
                                        if(CA > 1 || Ds < 2) {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        } else if(CA + CL + Ds === f_length) {
                                            sum('AtoC');
                                            return 'C';
                                        } else {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        }
                                    } else if(f_length < 4) {
                                        if(CA + CL + Ds === f_length) {
                                            sum('AtoC');
                                            return 'C';
                                        } else {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        }
                                    } //f_lengthより例外なし
                                    break;
                                case 'C':
                                    if(BBCVs > 0 || Ds === 0 || f_length > 4) {
                                        sum('CtoD');
                                        return 'D';
                                    } else if(isInclude('羽黒') && isInclude('神風')) {
                                        if(CAs > 2) {
                                            sum('CtoD');
                                            return 'D';
                                        } else if(isInclude('足柄') || isInclude('妙高')) {
                                            sum('CtoE');
                                            return null;
                                        } else if(Ds < 2) {
                                            sum('CtoD');
                                            return 'D';
                                        } else {
                                            sum('CtoE');
                                            return null;
                                        }
                                    } else if(f_length === 4) {
                                        if(isInclude('羽黒') && Ds === 3) {
                                            sum('CtoE');
                                            return null;
                                        } else if(isInclude('神風') && Ds === 4) {
                                            sum('CtoE');
                                            return null;
                                        } else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else if(f_length === 3) {
                                        if(CAs > 1 || Ds < 2) {
                                            sum('CtoD');
                                            return 'D';
                                        } else if(CA + Ds === f_length) {
                                            sum('CtoE');
                                            return null;
                                        } else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else if(f_length < 3) {
                                        sum('CtoE');
                                        return null;
                                    } //f_lengthより例外なし
                                    break;
                                case 'D':
                                    if(BBCVs > 0 || f_length === 6 || CAs > 3 || CAV > 1) {
                                        sum('DtoF');
                                        return null;
                                    } else {
                                        sum('DtoE');
                                        return null;
                                    }
                                    break;
                            }
                        } else {
                            //解放後
                            switch(edge) {
                                case null:
                                    sum('1toA');
                                    return 'A';
                                    break;
                                case 'A':
                                    if(f_length === 1) {
                                        sum('AtoC');
                                        return 'C';
                                    } else if(CVs > 0) {
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else if(AO === 1 && Bs > 2) {
                                        sum('AtoC');
                                        return 'C';
                                    } else if(CA === 0 || Ds === 0 || (BBs > 0 && !isInclude('羽黒'))) {
                                        sum('AtoB');
                                        sum('BtoC');
                                        return 'C';
                                    } else if(isInclude('羽黒') && isInclude('神風')) {
                                        sum('AtoC');
                                        return 'C';
                                    } else if(f_length > 4) {
                                        if(!isInclude('羽黒') && speed === '低速艦隊') {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        } else if(Ds < 3) {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        } else {
                                            sum('AtoC');
                                            return 'C';
                                        }
                                    } else if(f_length === 4) {
                                        if(CA > 1 || Ds < 2) {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        } else if(CA + CL + Ds === f_length) {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        } else {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        }
                                    } else if(f_length < 4) {
                                        if(CA + CL + Ds === f_length) {
                                            sum('AtoC');
                                            return 'C';
                                        } else {
                                            sum('AtoB');
                                            sum('BtoC');
                                            return 'C';
                                        }
                                    }
                                    break;
                                case 'C':
                                    if(BBCVs > 0 || Ds === 0) {
                                        sum('CtoD');
                                        return 'D';
                                    } else if(speed === '最速艦隊') {
                                        sum('CtoI');
                                        return 'I';
                                    } else if(f_length > 4) {
                                        if(isFaster() && Ds > 3) {
                                            sum('CtoI');
                                            return 'I';
                                        } else if(f_length === 6) {
                                            sum('CtoD');
                                            return 'D';
                                        } else if(isInclude('羽黒') || isInclude('神風')) {
                                            if(Ds < 2) {
                                                sum('CtoD');
                                                return 'D';
                                            } else if(CL > 0 || isInclude('足柄')) {
                                                sum('CtoE');
                                                return null;
                                            } else {
                                                sum('CtoD');
                                                return 'D';
                                            }
                                        } else if(speed !== '低速艦隊' && CA === 1 && CL === 1 && DD === 3) {
                                            sum('CtoI');
                                            return 'I';
                                        } else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else if(f_length === 4) {
                                        if(isInclude('羽黒') && isInclude('神風')) {
                                            if(CAs > 2) {
                                                sum('CtoD');
                                                return 'D';
                                            } else if(isInclude('足柄') || isInclude('妙高')) {
                                                sum('CtoE');
                                                return null;
                                            } else if(Ds < 2) {
                                                sum('CtoD');
                                                return 'D';
                                            } else {
                                                sum('CtoE');
                                                return null;
                                            }
                                        } else if((isInclude('羽黒') && Ds === 3) || (isInclude('神風') && Ds === 4)) {
                                            sum('CtoE');
                                            return null;
                                        }  else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else if(f_length < 4) {
                                        if(CAs > 1 || Ds < 2) {
                                            sum('CtoD');
                                            return 'D';
                                        } else if(CA + Ds === f_length) {
                                            sum('CtoE');
                                            return null;
                                        } else {
                                            sum('CtoD');
                                            return 'D';
                                        }
                                    } else if(f_length < 3) {
                                        sum('CtoE');
                                        return null;
                                    } //f_lengthより例外なし
                                    break;
                                case 'D':
                                    if(BBs > 2 || CVs > 2 || CAV > 2) {
                                        sum('DtoF');
                                        return null;
                                    } else {
                                        sum('DtoG');
                                        return 'G';
                                    }
                                    break;
                                case 'G':
                                    if(CA === 0 && Ds > 1) {
                                        if(AO > 0 || AV > 1) {
                                            sum('GtoH');
                                            return null;
                                        }
                                    } else if(SS > 0) {
                                        sum('GtoI');
                                        return 'I';
                                    } else if(BBCVs > 0) {
                                        sum('GtoJ');
                                        return 'J';
                                    } else if(isInclude('羽黒') && isInclude('神風')) {
                                        if(f_length < 5) {
                                            sum('GtoP');
                                            return null;
                                        } else if(DD < 3) {
                                            sum('GtoJ');
                                            return 'J';
                                        } else if(isFaster) {
                                            sum('GtoP');
                                            return null;
                                        } else if(CAs > 2 || speed === '低速艦隊') {
                                            sum('GtoJ');
                                            return 'J';
                                        } else if(isInclude('足柄')) {
                                            sum('GtoP');
                                            return null;
                                        } else {
                                            sum('GtoK');
                                            sum('KtoP');
                                            return null;
                                        }
                                    } else if(Ds < 3 || CAs > 2) {
                                        sum('GtoJ');
                                        return 'J';
                                    } else {
                                        sum('GtoI');
                                        return 'I';
                                    }
                                    break;
                                case 'I':
                                    if(BBCVs > 0 || CAs > 2 || Ds === 0) {
                                        sum('ItoJ');
                                        return 'J';
                                    } else if(isInclude('羽黒') && isInclude('神風')) {
                                        if(Ds > 2) {
                                            if(isFaster()) {
                                                sum('ItoJ');
                                                return 'J';
                                            } else {
                                                sum('ItoM');
                                                return 'M';
                                            }
                                        } else if(Ds === 2) {
                                            if(speed === '最速艦隊') {
                                                sum('ItoM');
                                                return 'M';
                                            } else {
                                                sum('ItoL');
                                                sum('LtoM');
                                                return 'M';
                                            }
                                        } else if(Ds === 1) {
                                            sum('ItoL');
                                            sum('LtoM');
                                            return 'M';
                                        } //Dsより例外なし
                                    } else if(speed === '最速艦隊' && DD > 2) {
                                        sum('ItoJ');
                                        return 'J';
                                    } else if((isInclude('羽黒') || isInclude('神風')) && isInclude('足柄') && Ds > 2) {
                                        sum('ItoM');
                                        return 'M';
                                    } else {
                                        sum('ItoL');
                                        sum('LtoM');
                                        return 'M';
                                    }
                                    break;
                                case 'J':
                                    if(BBCVs > 0 || speed === '低速艦隊' || CAs > 3) {
                                        sum('JtoM');
                                        return 'M';
                                    } else if(DD > 2) {
                                        if((isInclude('羽黒') && isInclude('足柄')) || (isInclude('羽黒') && isInclude('神風'))) {
                                            sum('JtoP');
                                            return null;
                                        } else {
                                            sum('JtoM');
                                            return 'M';
                                        }
                                    } else if(DD === 2) {
                                        if(isInclude('羽黒') && isInclude('神風') && isInclude('足柄')) {
                                            sum('JtoP');
                                            return null;
                                        } else {
                                            sum('JtoM');
                                            return 'M';
                                        }
                                    } else if(DD === 1) {
                                        sum('JtoM');
                                        return 'M';
                                    } //DDより例外なし
                                    break;
                                case 'M':
                                    if(CV > 0 || BBCVs > 1 || SS > 3) {
                                        sum('MtoN');
                                        return null;
                                    } else if(slowBB() > 0 || AO > 0 || AV > 1) {
                                        sum('MtoO');
                                        return null;
                                    } else {
                                        sum('MtoP');
                                        return null;
                                    }
                                    break;
                            }
                        }
                        break;
                    case 4: //@7-4
                        switch(edge) {
                            case null:
                                if(BB + CV + SS > 0 || CAs > 1 || CL + CT + CLT) {
                                    sum('1toC');
                                    return 'C';
                                } else if(isInclude('あきつ丸') && DE === 2 && (DD === 1 || DE === 1)) {
                                    sum('1toA');
                                    sum('AtoB');
                                    sum('BtoE');
                                    return 'E';
                                } else if((BBV + CVL === 2 && isInclude('あきつ丸')) || BBV + CVL > 2) {
                                    sum('1toC');
                                    return 'C';
                                } else if(Ds > 2 || DE > 1) {
                                    sum('1toA');
                                    sum('AtoB');
                                    sum('BtoE');
                                    return 'E';
                                } else {
                                    sum('1toC');
                                    return 'C';
                                }
                                break;
                            case 'C':
                                if(BB + CV + SS > 0 || BBV > 2 || (CVL > 2 || (CVL === 2 && isInclude('あきつ丸')))) {
                                    sum('CtoD');
                                    sum('DtoF');
                                    return 'F';
                                } else if(Ds > 3 || (CL > 0 && Ds > 2) || DE > 2 || (isFaster() && DD > 1)) {
                                    sum('CtoE');
                                    return 'E';
                                } else {
                                    sum('CtoD');
                                    sum('DtoF');
                                    return 'F';
                                }
                                break;
                            case 'E':
                                if(AO + LHA > 0 && DE > 3 && countTaiyo() + AO + LHA + DD + DE === 6) {
                                    sum('EtoG');
                                    sum('GtoL');
                                    sum('LtoP');
                                    return null;
                                } else {
                                    sum('EtoJ');
                                    return 'J';
                                }
                                break;
                            case 'F':
                                if(active['7-4']['F'] === 'H') {
                                    sum('FtoH');
                                    sum('HtoK');
                                    sum('KtoM');
                                    return 'M';
                                } else {
                                    sum('FtoJ');
                                    return 'J';
                                }
                                break;
                            case 'G':
                                //索敵で分岐するようだが不明 とりあえず素通りで実装
                                break;
                            case 'J'://日本語wiki正直わからん
                                if(track.includes('D')) {
                                    sum('JtoK');
                                    sum('KtoM');
                                    return 'M';
                                } else if(track.includes('E')) {
                                    if(f_search[3] < 33) {
                                        sum('JtoK');
                                        sum('KtoM');
                                        return 'M';
                                    } else if(f_search[3] < 37 && f_search[3] >= 33) {
                                        if(sai(50)) {
                                            if(CT > 0 && DE > 2 && countTaiyo() + CT + Ds === 5 && f_length === 5) {
                                                sum('JtoP');
                                                return null;
                                            } else {
                                                sum('JtoL');
                                                sum('LtoP');
                                                return null;
                                            }
                                        } else {
                                            sum('JtoK');
                                            sum('KtoM');
                                            return 'M';
                                        }
                                    } else if(f_search[3] >= 37) {
                                        if(CT > 0 && DE > 2 && countTaiyo() + CT + Ds === 5 && f_length === 5) {
                                            sum('JtoP');
                                            return null;
                                        } else {
                                            sum('JtoL');
                                            sum('LtoP');
                                            return null;
                                        }
                                    } //LoSより例外なし
                                } //DかEどっちかは通る
                                break;
                            case 'K':
                                //KtoPは見つかってないらしい 全てMへ
                                break;
                            case 'M':
                                if(f_search[3] < 45) {
                                    sum('MtoN');
                                    return null;
                                } else if((slowBB() > 0 && CV > 0) || (BBs - slowBB() > 1) || BBV > 1 || (CVL > 1 || (CVL === 1 && isInclude('あきつ丸'))) || (BBs - slowBB() + BBV + CVL > 2 || (BBs - slowBB() + BBV + CVL === 2 && isInclude('あきつ丸'))) || Ds < 2) {
                                    if(f_search[3] < 47 && f_search[3] >= 45) {
                                        if(sai(50)) {
                                            sum('MtoN');
                                            return null;
                                        } else {
                                            sum('MtoO');
                                            return null;
                                        }
                                    } else if(f_search[3] >= 47){
                                        sum('MtoO');
                                        return null;
                                    } //LoSより例外なし
                                } else {
                                    sum('MtoP');
                                    return null;
                                }
                                break;
                        }
                        break;
                    case 5: //@7-5
                        switch(edge) {
                            case null:
                                sum('1toA');
                                sum('AtoB');
                                return 'B';
                                break;
                            case 'B':
                                if(isFaster()) {
                                    sum('BtoD');
                                    return 'D';
                                } else if(CV > 1 || slowBB() > 1 || SS > 0 || CL === 0 || Ds < 2) {
                                    sum('BtoC');
                                    sum('CtoD');
                                    return 'D';
                                } else if(Ds > 2) {
                                    sum('BtoD');
                                    return 'D';
                                } else if(CV > 0 || CVL > 1 || BBs > 2 || CAs > 2) {
                                    sum('BtoC');
                                    sum('CtoD');
                                    return 'D';
                                } else {
                                    sum('BtoD');
                                    return 'D';
                                }
                                break;
                            case 'D':
                                if(speed === '最速艦隊') {
                                    sum('DtoF');
                                    return 'F';
                                } else if(CV > 1 || CVs > 2 || BBs + CAs > 2 || BBs + CV + CAs > 2 || SS > 0 || CL + DD === 0) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(speed === '高速+艦隊') {
                                    sum('DtoF');
                                    return 'F';
                                } else if(Ds < 2) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(Ds > 2 || speed !== '低速艦隊') {
                                    sum('DtoF');
                                    return 'F';
                                } else if((CAV === 1 && BBV === 1 && CL === 1 && DD === 3 && speed === '低速艦隊') || (CAV === 2 && CVL === 1 && CL === 1 && DD === 2 && speed === '低速艦隊')) { //例外的にFへ
                                    sum('DtoF');
                                    return 'F';
                                } else {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(active['7-5']['F'] === 'G') {
                                    sum('FtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else {
                                    sum('FtoJ');
                                    return 'J';
                                }
                                break;
                            case 'H':
                                if(active['7-5']['H'] === 'I') {
                                    sum('HtoI');
                                    return 'I';
                                } else {
                                    sum('HtoK');
                                    return null;
                                }
                                break;
                            case 'I':
                                if(f_search[3] < 53) {
                                    sum('ItoL');
                                    sum('LtoM');
                                    return null;
                                } else if(f_search[3] < 59 && f_search[3] >= 53) {
                                    if(sai(50)) {
                                        sum('ItoL');
                                        sum('LtoM');
                                        return null;
                                    } else {
                                        sum('ItoM');
                                        return null;
                                    }
                                } else if(f_search[3] >= 59) {
                                    sum('ItoM');
                                    return null;
                                } //LoSより例外なし
                                break;
                            case 'J':
                                if((CVL === 1 && CAs === 2 && CL === 1 && Ds === 2) || isFaster()) {
                                    sum('JtoO');
                                    return 'O';
                                } else if(CV > 0 || CVL > 2 || slowBB() > 1 || BBs + CAs > 2 || Ds < 2) {
                                    sum('JtoN');
                                    sum('NtoO');
                                    return 'O';
                                } else if(Ds > 2 || speed !== '低速艦隊') {
                                    sum('JtoO');
                                    return 'O';
                                } else {
                                    sum('JtoN');
                                    sum('NtoO');
                                    return 'O';
                                }
                                break;
                            case 'O':
                                if(active['7-5']['O'] === 'P') {
                                    sum('OtoP');
                                    return 'P';
                                } else {
                                    sum('OtoQ');
                                    return null;
                                }
                                break;
                            case 'P':
                                if(f_search[3] < 58) {
                                    sum('PtoS');
                                    return null;
                                } else if(f_search[3] < 63 && f_search[3] >= 58) {
                                    if(sai(33.3)) {
                                        sum('PtoR');
                                        sum('RtoT');
                                        return null;
                                    } else {
                                        if(speed === '最速艦隊') {
                                            sum('PtoT');
                                            return null;
                                        } else if(CV > 0 || BBs + CVL > 1 || BBs + CAs > 2 || CL === 0) {
                                            sum('PtoR');
                                            sum('RtoT');
                                            return null;
                                        } else {
                                            sum('PtoT');
                                            return null;
                                        }
                                    }
                                } else if(f_search[3] >= 63) {
                                    if(speed === '最速艦隊') {
                                        sum('PtoT');
                                        return null;
                                    } else if(CV > 0 || BBs + CVL > 1 || BBs + CAs > 2 || CL === 0) {
                                        sum('PtoR');
                                        sum('RtoT');
                                        return null;
                                    } else {
                                        sum('PtoT');
                                        return null;
                                    }
                                } //LoSより例外なし
                                break;
                        }
                        break;
                }
                break;
        }
    }

    $('#go').on('click', function() {
        area = localStorage.getItem('area');
        var elem = area.split('-');
        console.log(elem[0] + elem[1]);
        var world = Number(elem[0]);
        var map = Number(elem[1]);
        var edge = null;
        //無限ループ防止
        var safety = 0;
        var count = 0;
        console.log(`諸元 : ${world}-${map}`);
        console.log('艦種 : ' + com);
        while(count < 10000) {
            edge = judge(world, map, edge);
            if(edge === null) {
                count++;
                track = [];
            }
            safety++;
            if(safety > 150000) {
                alert('無限ループ防止 バグった');
                console.log('以下諸元');
                console.log('艦種 : ' + com);
                console.log('軌跡' + track);
                console.log(`safety : ${safety}`);
                console.log(`count : ${count}`);
                console.log('drum : ' + getDrum(5, 3));
                console.log('craft : ' + getCraft(5, 3));
                console.log(`speed : ${speed}`);
                console.log('終わり');
                break;
            }
        }
        console.log(rate);
        drawMap();
        rate = {};
    });

    //マップ描画
    function drawMap() {
        var map = map_info; //map.jsより
        var spots = map['spots'][area];
        var routes = map['route'][area];
        var elements = {
            nodes: [],
            edges: []
        };
        //nodes流し込み
        for (let key in spots) {
            if (spots.hasOwnProperty(key)) {
                const [x, y, label] = spots[key];
                elements.nodes.push({
                    data: {id:key, name:key, label:label},
                    position: {x, y}
                });
            }
        }
        console.log(elements);
        console.log(routes);
        console.log(rate);
        //esges流し込み
        for (let key in routes) {
            if (routes.hasOwnProperty(key)) {
                const [source, target] = routes[key];
                //通っていないルートはrateに無いので0に置き換え
                var ratio = ((rate[source + 'to' + target] / 10000) * 100).toFixed(1);
                ratio = isNaN(ratio) ? 0 : parseFloat(ratio);
                elements.edges.push({
                    data: {
                        source,
                        target,
                        ratio:  ratio//小数第二位以下四捨五入
                    }
                });
            }
        }

        //スタイルシート
        var style = [
            { selector: 'node', 
                style: {
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'width': '1.5em',
                    'height': '1.5em',
                    'padding': '0pt',
                    'font-size': '14pt',
                    'font-weight': 'bold',
                    'color': 'rgb(50,50,50)',
                    'background-color': 'rgb(230,230,230)',
                }
            },
            { selector: 'edge', 
                style: {
                    'color': 'rgb(250,250,250)',
                    'font-weight': '100',
                    'text-outline-color': 'rgba(20,20,20)',
                    'text-outline-opacity': '.85',
                    'text-outline-width': '1.5px',
                    'width': '4px',
                    'curve-style': 'bezier', //こいつが無いと矢印にならないっぽい
                    'target-arrow-shape': 'triangle',
                    'content':'data(ratio)'
                }
            }, //割合によって色分け
            { selector: 'edge[ratio = 100]', 
                style: {
                    'line-color': 'rgb(220,20,60)'
                }
            },
            { selector: 'edge[ratio < 100][ratio >= 80]', 
                style: {
                    'line-color': 'rgb(255,99,71)'
                }
            },
            { selector: 'edge[ratio < 80][ratio >= 60]', 
                style: {
                    'line-color': 'rgb(255,165,0)'
                }
            },
            { selector: 'edge[ratio < 60][ratio >= 40]', 
                style: {
                    'line-color': 'rgb(255,215,0)'
                }
            },
            { selector: 'edge[ratio < 40][ratio >= 20]', 
                style: {
                    'line-color': 'rgb(255,215,0)'
                }
            },
            { selector: 'edge[ratio < 20][ratio > 0]', 
                 style: {
                     'line-color': 'rgb(240,230,140)'
                 }
            },
            { selector: 'edge[ratio = 0]', 
                 style: {
                     'line-color': 'rgb(169,169,169)',
                     'content':'' //0の場合表示なし
                 }
            }
        ];

        var layout = {
            name:'preset'
        };

        // 出力
        var cy = cytoscape({ 
            // #cyに生成
            container: document.getElementById('cy'),
            elements: elements,
            style: style,
            layout:layout,
            autoungrabify: true, //nodeのドラッグ不可
            maxZoom: 2.0,
            minZoom: 1.0
        });
    }
    //読み込み時にlocalstorageから諸々の設定を読込、反映
    //上に置くとtrigger()が不発する 謎
    setup();
    function setup() {
        var a = localStorage.getItem('active');
        var u = localStorage.getItem('units');
        var f = localStorage.getItem('fleet');
        //能動分岐セット
        if(!a) {
            a = active;
        } else {
            a = JSON.parse(a);
        }
        for(const key in a) {
            for(const key2 in a[key]) {
                var val = a[key][key2];
                var name = key + '-' + key2;
                $('input[name="' + name + '"][value="' + val + '"]').prop('checked', true);
                active = a;
            }
        }
        //ドラム・大発セット
        if(!u) {
            u = units;
        } else {
            u = JSON.parse(u);
        }
        for(const key in u) {
            for(const key2 in u[key]) {
                var val = u[key][key2];
                var name = key + '-' + key2;
                $('input[name="' + name + '"]').val(val);
            }
        }
        var ar = localStorage.getItem('area');
        if(ar) {
            $('#area').val(ar);
            $('#area').trigger('input');
        }
        //艦隊セット
        if(f) {
            //艦隊は文字列のまま貼る
            $('#fleet-import').val(f);
            $('#fleet-import').trigger('input');
        }
    }
});
