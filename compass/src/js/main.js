import $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import Decimal from 'decimal.js';
import cytoscape from 'cytoscape';
import { generate } from "gkcoi";
$(function() {
    /*
    s_dataはship.js
    e_dataはitem.jsより
    idがs_dataは文字列
    e_dataは数字であることに注意
    
    制空シミュを基準にしたときの本家デッキビルダー差異・注意点
    艦ID'のみ'文字列
    改修値が0のとき、キーがそもそもない
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
    //艦隊諸元 分岐演算に使う
    let f_length = 0; //構成艦数
    let f_ids = null;
    let f_names = null; //構成艦艦名
    let f2_names = null; //随伴艦隊構成艦名 表示の為だけ
    let f2_length = 0;
    let speed = null; //速度
    let f_search = null; //索敵値
    //ドラム缶、大発系、電探搭載艦数
    let f_drum = 0;
    let f_radar = 0;
    let f_craft = 0;
    let f_kanko = 0;
    /*
        読込モード
        1:第一艦隊
        2:第二艦隊
        3:第三艦隊
        4:第四艦隊
        5:水上打撃部隊
        6:空母機動部隊
        7:輸送護衛部隊
        判定も少しはするけど殆ど自己申告
    */
    let f_united = null;
    
    //読込時の計算に使うあれこれ
    let c_lengths = [];
    let c_ids = [];
    let c_names = [];
    let c_types = [];
    let c_searchs = [];
    let c_speeds = [];
    let c_drums = [];
    let c_radars = [];
    let c_crafts = [];
    let c_kanko = [];
    
    let selected_type = null; //艦隊種別選択したやつをひかえる
    
    //受け付ける海域
    const areas = ['1-1','1-2','1-3','1-4','1-5','1-6','2-1','2-2','2-3','2-4','2-5','3-1','3-2','3-3','3-4','3-5','4-1','4-2','4-3','4-4','4-5','5-1','5-2','5-3','5-4','5-5','6-1','6-2','6-3','6-4','6-5','7-1','7-2','7-3','7-3-1','7-4','7-5','57-7','58-1','58-2','58-3','58-4'];
    const op_areas = ['4-5','5-3','5-5','6-3','7-3','7-4','7-5','57-7','58-1','58-2','58-3','58-4'];
    
    //1がキーの値はPhase
    let active = {'4-5':{'A':'D','C':'F','I':'J'},'5-3':{'O':'K'}, '5-5':{'F':'D'}, '6-3':{'A':'B'},'7-3':{'1':'0'},'7-4':{'F':'H'},'7-5':{'F':'G','H':'I','O':'P'},'57-7':{'1':'1','A2':'A3','B2':'B3','C':'A3','J':'K'}, '57-7':{'1':'1','A2':'A3','B':'B1','B2':'B3','C':'A3','J':'K'},'58-1':{'1':'1','A':'D','I':'N1','F':'G'},'58-2':{'1':'1','2':'1','B':'E'},'58-3':{'1':'1','2':'1','M':'P'},'58-4':{'1':'1','2':'1','B':'D'}};
    
    let area = null; //入力で切り替えるの
    let drew_area = null; //表示中の海域
    
    //オプション表示の為のz-index
    let z_value = 10;
    
    //演算開始の為のフラグ
    let a_flag = false;
    let f_flag = false;
    
    let rate = {}; //これにルート情報を詰め込んでいく
    let track = []; //最後の軌跡
    
    let cy = null;

    //海域が入力されたら適正かチェックしてフラグ切替
    $('.areas').on('click', function() {
        setArea($(this).val());
    });
    //海域入力で発火 オプション表示したり
    function setArea(text) {
        console.log(`area : ${text}`);
        if(areas.includes(text)) {
            a_flag = true;
            localStorage.setItem('area', text);
            if(op_areas.includes(text)) {
                //オプションが必要な海域は入力を表示
                $('#option-box').css('display','block');
                $('#option-box .options').each(function () {
                    var child = $(this);
                    if (child.attr("id") === text) {
                        child.css("display", "block");
                    } else {
                        // 子要素が存在しない場合はdisplayをnoneに設定
                        child.css("display", "none");
                    }
                });
            } else {
                $('#option-box').css('display','none');
            }
            $('#area-container').click();
            $('#area-display').text(`海域 : ${text}`);
        } else {
            a_flag = false;
            $('#option-box').css('display','none');
        }
        startSim();
    }
    //オプションドラッグ
    $('#draggable-list').draggable({ containment: 'window', scroll: false });
    //オプションが変更されたら取得してlocalstorageへ保存
    $('.option-value').on('input', function() {
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        const namePattern = /^([\dA-Z]+-[\dA-Z]+)-([\dA-Z]+)$/i;
        const match = name.match(namePattern);
        var key = match[1];
        var char = match[2];
        let value = $(this).val();
        if($(this).attr('type') === 'radio') {
            updateActive(key, char, value);
        }
        startSim();
    });
    //デッキビルダー読み込み
    $('#fleet-import').on('input', function() {
        var text = $(this).val();
        try {
            i_json = JSON.parse(text);
        } catch(e) {
            console.log(e);
            f_flag = false;
            alert('処理中断: 形式不正');
            //空欄化
            $(this).val('');
            $(this).blur();
            return;
        }
        /*
            処理の流れ
            貼り付けられた時点で第四艦隊まで読み込んで計算まで済ます
            一艦隊しか情報が無ければそのまま演算開始
            それ以外は艦隊形式の選択を待つ
        */
        //cシリーズ初期化
        inCs();
        //艦隊の構成艦数
        let zeroCount = 0;
        let tar = null;
        for(let i = 1;i < 5;i++) {
            let count = countShips(i);
            c_lengths.push(count);
            if(count === 0) {
                zeroCount++;
            } else {
                tar = i;
            }
            if(count) {
                c_ids.push(getIdsFromFleet(i));
                console.log(c_ids);
                c_names.push(getShipName(i));
                c_types.push(getType(i));
                c_searchs.push(calcSeek(i));
                c_speeds.push(calcSpeed(i));
                countUnits(i);
            } else {
                //第一・第二艦隊が空で第三艦隊だけあるみたいな場合
                //空を入れてやる
                c_ids.push([]);
                c_names.push([]);
                c_types.push([]);
                c_searchs.push([]);
                c_speeds.push([]);
                c_drums.push(0);
                c_radars.push(0);
                c_crafts.push(0);
                c_kanko.push(0);
            }
        }
        console.log(`c_lengths : ${c_lengths}`);
        console.log(`c_ids : ${c_ids}`);
        console.log(`c_searchs : ${c_searchs}`);
        console.log(`c_speeds : ${c_speeds}`);
        console.log(`c_drums : ${c_drums}, c_radars : ${c_radars}, c_crafts : ${c_crafts}, c_kanko : ${c_kanko}`);
        if(zeroCount === 3) {
            //情報の有る艦隊が一つだけの場合はそのまま読み込み
            setFleetInfo(tar);
            $('#type-select').css('display', 'none');
            //空欄化
            $(this).val('');
            $(this).blur();
            return;
        } else if(zeroCount === 4) {
            alert('処理中断: 艦隊が空かも？');
            //空欄化
            $(this).val('');
            $(this).blur();
            return;
        }
        $('#type-select').css('display', 'block');
        $('#type-select').text('艦隊種別');
        //空欄化
        $(this).val('');
        $(this).blur();
    });
    //
    $('#type-select').on('mouseover', function() {
        console.log('発火');
        $('#fleet-option-box').css('display', 'block');
    });
    $('#fleet-option-box').on('mouseleave', function() {
        $('#fleet-option-box').css('display', 'none');
    });
    //艦隊形式が選択されたら該当する計算データを変数反映して演算開始
    $('.fleet-type').on('click', function() {
        $('#type-select').text($(this).text());
        $('#fleet-option-box').css('display', 'none');
        let type = $(this).data('type');
        setFleetInfo(type);
    });
    //セレクトの値を一つ前に戻す
    //読込がまずったときに
    function setBackSelect() {
        console.log('setBackSelect');
        let options = $('.fleet-type');
        if(selected_type) {
            for (let option of options) {
                if(option.dataset.type === selected_type + '') { //文字列化してから比較
                    $('#type-select').text(option.textContent);
                }
            }
        } else {
            $('#type-select').text('艦隊種別');
        }
    }
    //計算結果から抜き出して変数セット
    //引数:艦隊種別
    function setFleetInfo(f) {
        console.log(`f : ${f}`);
        f--; //配列指定の為
        //初期化してから
        for (var key in com) {
            com[key] = 0;
        }
        try {
            if(f < 4) {
                //通常艦隊
                f_length = c_lengths[f];
                console.log(`f_length : ${f_length}`);
                if(!f_length) {
                    alert('処理中断: 艦隊が空かも？');
                    //空欄化
                    $('#fleet-import').val('');
                    $('#fleet-import').blur();
                    setBackSelect();
                    return;
                }
                //構成艦のid
                f_ids = c_ids[f];
                console.log(`f_ids : ${f_ids}`);
                //構成艦の名前
                f_names = c_names[f];
                console.log(`f_names : ${f_names}`);
                let types = c_types[f];
                console.log(`types : ${types}`);
                //変数反映
                reflectionCom(types);
                //索敵値
                f_search = c_searchs[f];
                console.log(`f_search : ${f_search}`);
                //速度
                speed = c_speeds[f];
                console.log(`speed : ${speed}`);
                //ドラム缶、大発、電探搭載艦数カウント 変数にセット
                f_drum = c_drums[f];
                f_radar = c_radars[f];
                f_craft = c_crafts[f];
                f_kanko = c_kanko[f];
                console.log(`ドラム缶 : ${f_drum}`);
                console.log(`電探 : ${f_radar}`);
                console.log(`大発系 : ${f_craft}`);
                console.log(`寒甲 : ${f_kanko}`);
                if(f_length === 7) {
                    f_united = '遊撃部隊';
                } else {
                    f_united = '通常艦隊';
                }
                console.log(`f_united : ${f_united}`);
            } else {
                //連合艦隊
                //第一艦隊と第二艦隊を足したり
                f_length = c_lengths[0] + c_lengths[1];
                f2_length = c_lengths[1];
                console.log(`f_length : ${f_length}`);
                if(!c_lengths[0] || !c_lengths[1]) {
                    alert('処理中断: 艦隊が空かも？');
                    //空欄化
                    $('#fleet-import').val('');
                    $('#fleet-import').blur();
                    return;
                }
                //構成艦のid
                f_ids = c_ids[0].concat(c_ids[1]);
                console.log(`f_ids : ${f_ids}`);
                //構成艦の名前
                f_names = c_names[0].concat(c_names[1]);
                f2_names = c_names[1];
                console.log(`f_names : ${f_names}`);
                let types = c_types[0].concat(c_types[1]);
                console.log(`types : ${types}`);
                //変数反映
                reflectionCom(types);
                //索敵値 各項足し合わせ
                f_search = [];
                for (var i = 0; i < 4; i++) {
                    f_search.push(new Decimal(c_searchs[0][i]).plus(new Decimal(c_searchs[1][i])));
                }
                console.log(`f_search : ${f_search}`);
                //速度
                //低い方から適用
                if(c_speeds[0] === '低速艦隊' || c_speeds[1] === '低速艦隊') {
                    speed = '低速艦隊';
                } else if(c_speeds[0] === '高速艦隊' || c_speeds[1] === '高速艦隊') {
                    speed = '高速艦隊';
                } else if(c_speeds[0] === '高速艦隊+' || c_speeds[1] === '高速艦隊+') {
                    speed = '高速艦隊+';
                } else {
                    speed = '最速艦隊';
                }
                console.log(`speed : ${speed}`);
                //ドラム缶、大発、電探搭載艦数カウント 変数にセット
                f_drum = c_drums[0] + c_drums[1];
                f_radar = c_radars[0] + c_radars[1];
                f_craft = c_crafts[0] + c_crafts[1];
                f_kanko = c_kanko[0] + c_kanko[1];
                console.log(`ドラム缶 : ${f_drum}`);
                console.log(`電探 : ${f_radar}`);
                console.log(`大発系 : ${f_craft}`);
                //艦隊種別
                if(f === 4) {
                    f_united = '空母機動部隊';
                } else if(f === 5) {
                    f_united = '水上打撃部隊';
                } else if(f === 6) {
                    f_united = '輸送護衛部隊';
                }
                console.log(`f_united : ${f_united}`);
            }
        } catch(e) {
            console.log(`error : ${e}`);
            alert('処理中断: 艦隊情報の取得に失敗しました');
            //空欄化
            $('#fleet-import').val('');
            $('#fleet-import').blur();
            setBackSelect();
            return;
        }
        //気休めだけども保存前にチェック
        if(f_length && f_ids && f_names && f_search && f_search[0] && speed) {
            //丸ごとlocalstorageへ
            localStorage.setItem('fleet', JSON.stringify(i_json));
            f_flag = true;
            selected_type = f + 1;
            //表示
            reloadImportDisplay();
            startSim();
        } else {
            alert('処理中断: 入力値に不備があるかも？');
            //空欄化
            $('#fleet-import').val('');
            $('#fleet-import').blur();
            setBackSelect();
        }
    }
    // cシリーズ初期化
    function inCs() {
        c_lengths = [];
        c_ids = [];
        c_names = [];
        c_types = [];
        c_searchs = [];
        c_speeds = [];
        c_drums = [];
        c_radars = [];
        c_crafts = [];
        c_kanko = [];
    }
    //ドラム缶、大発、電探搭載艦数, 寒甲カウント
    function countUnits(num) {
        //先ず初期化
        let drum = 0;
        let radar = 0;
        let craft = 0;
        let kanko = 0;
        for(let i = 0;i < c_lengths[num - 1];i++) {
            let e_ids = getEqIds(c_ids[num - 1][i], num);
            //一隻につき1回だけカウント
            let d = true;
            let r = true;
            let c = true;
            let k = true;
            for(let e_id of e_ids) {
                if(e_id === 75) { //ドラム缶
                    if(d) {
                        drum++;
                        d = false;
                    }
                }
                //typeを取得
                let t_id = getEqType(e_id);
                if(t_id === 5812 || t_id === 5813) {
                    if(r) {
                        //小型電探
                        //大型電探
                        radar++;
                        r = false;
                    }
                } else if(t_id === 81424 || t_id === 84724|| t_id === 203746) {
                    //特大発動艇＋戦車第11連隊及びM4A1のみ除外 M4A1はtype:84524で含まれない
                    if(e_id !== 230) {//特大発動艇＋戦車第11連隊及びM4A1のみ除外 M4A1はtype:84524で含まれない
                        if(c) {
                            craft++;
                            c = false;
                        }
                    }
                } else if(e_id === 402) { //寒甲
                    if(k) {
                        kanko++;
                        k = false;
                    }
                }
            }
        }
        c_drums.push(drum);
        c_radars.push(radar);
        c_crafts.push(craft);
        c_kanko.push(kanko);
    }
    //typeの先頭3つを連結してidとして返す(数値型)
    function getEqType(e_id) {
        let entry = e_data.find(entry => entry.id === e_id);
        return Number(entry.type.slice(0, 3).join(''));
    }
    //速度を取得 高速+艦隊etc
    function calcSpeed(num) {
        let arr = [];
        for(let i = 0;i < c_lengths[num - 1];i++) {
            let e_ids = getEqIds(c_ids[num - 1][i], num);
            let rf = getEqRfs(c_ids[num - 1][i], num);
            /*
            33:タービン
            34:強化缶
            87:新型缶
            */
            let tur = 0; //タービン
            let kan = 0; //強化缶
            let n_kan = 0; //新型缶
            let pow = 0; //新型缶☆7↑
            console.log(`e_ids : ${e_ids}`);
            for(let q = 0;q < e_ids.length;q++) {
                if(e_ids[q] === 33) {
                    tur++;
                } else if(e_ids[q] === 34) {
                    kan++;
                } else if(e_ids[q] === 87) {
                    n_kan++;
                    if(rf[q] > 6) {
                        pow++;
                    }
                }
            }
            let kans = kan + n_kan;
            let ship = s_data.find(entry => entry.id === c_ids[num - 1][i]);
            let sg = ship.sg;
            let val = 0;
            console.log(`sg : ${sg}`);
            console.log(`tur : ${tur}, n_kan : ${n_kan}, pow : ${pow}`);
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
        } else if(arr.every(elem => elem > 1)) {
            res = '高速+艦隊';
        } else if(arr.every(elem => elem > 0)) {
            res = '高速艦隊';
        } else {
            res = '低速艦隊';
        }
        return res;
    }
    //構成艦のidを取得 配列で返す
    function getIdsFromFleet(num) {
        const ids = [];
        const f = `f${num}`;
        for (let i = 1; i <= c_lengths[num - 1]; i++) {
            const key = "s" + i;
            if (i_json[f][key] && i_json[f][key].hasOwnProperty("id")) {
                ids.push('' + i_json[f][key].id); //文字列化
            }
        }
        return ids;
    }
    //構成艦数カウント
    function countShips(num) {
        // f1内のsキーの配下にあるオブジェクト数をカウント
        try {
            const count = Object.keys(i_json[`f${num}`]).filter(key => /^s\d+$/.test(key)).length;
            return count;
        } catch(e) {
            console.log('多分艦隊が空');
            return 0;
        }
    }
    //索敵計算
    function calcSeek(num) {
        let res = [];
        let sum_base = new Decimal(0); //艦娘索敵値によるスコア
        let f_length_correct = new Decimal(2 * (6 - c_lengths[num - 1])); //隻数補正
        let sum_eq = new Decimal(0); //装備によるスコア
        let command = 120;
        if(i_json.hqlv) { //オリジナルのデッキビルダーには司令レベルが無いみたい
            command = i_json.hqlv;
        }
        command = new Decimal(command).times(0.4); //司令部補正
        for (let i = 0; i < c_lengths[num - 1]; i++) {
            //素の索敵値計算
            const key = 's' + (i + 1);
            let lv = i_json[`f${num}`][key]['lv'];
            //索敵値の最大値と最小値を取得
            let ship = s_data.find(entry => entry.id === c_ids[num - 1][i]);
            let min_seek = new Decimal(ship.seek);
            let max_seek = new Decimal(ship.max_seek);
            let cur_seek = new Decimal(max_seek).minus(min_seek).times(lv).div(99).floor().plus(min_seek);
            console.log(`艦名 : ${c_names[num - 1][i]}, 素索敵値 : ${cur_seek}`);
            //装備id取得
            let i_ids = getEqIds(c_ids[num - 1][i], num);
            console.log(`装備id : ${i_ids}`);
            //装備ボーナス
            let bonus = getSeekBonus(ship, i_ids, num);
            console.log(`seek_bonus : ${bonus}`);
            //素の索敵値の平方根を加算
            sum_base = sum_base.plus(Decimal.sqrt(cur_seek.plus(bonus)));
            //改修値取得
            let rfs = getEqRfs(c_ids[num - 1][i], num);
            for(let q = 0;q < i_ids.length;q++) {
                //装備の索敵値が1以上だったらあれこれ
                let eq = e_data.find(entry => entry.id === i_ids[q]);
                let seek = new Decimal(eq.seek);
                if(seek > 0) {
                    //係数
                    let coefficient = getEqCo(i_ids[q]);
                    let eq_co = new Decimal(coefficient[0]); //装備係数
                    let rf_co = new Decimal(coefficient[1]); //改修係数
                    let rf = new Decimal(rfs[q]);
                    console.log(`装備係数 : ${coefficient[0]}, 改修係数 : ${coefficient[1]}`);
                    sum_eq = sum_eq.plus(eq_co.times(seek.plus(rf_co.times(Decimal.sqrt(rf)))));
                }
            }
        }
        let material = sum_base.plus(f_length_correct).minus(command);
        //係数 四捨五入で小数第二位まで
        res.push((material.plus(sum_eq)).toDecimalPlaces(2, Decimal.ROUND_DOWN));
        res.push((material.plus(sum_eq.times(2))).toDecimalPlaces(2, Decimal.ROUND_DOWN));
        res.push((material.plus(sum_eq.times(3))).toDecimalPlaces(2, Decimal.ROUND_DOWN));
        res.push((material.plus(sum_eq.times(4))).toDecimalPlaces(2, Decimal.ROUND_DOWN));
        return res;
    }
    //装備ボーナス取得 艦のjson, 装備id(配列)
    function getSeekBonus(ship, e_ids, num) {
        console.log(ship);
        let res = 0;
        let id = ship.id;
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
                        let rf = getEqRfs(id, num)[i];
                        if(rf === 10) { // 改修maxで更に+1
                            res += 1;
                        }
                    }
                    break;
                case 414: // SOC seagull
                    if(na === 1) {
                        if(type === '軽巡洋艦' || type === '重巡洋艦') {
                            let rf = getEqRfs(id, num)[i];
                            if(!dup.includes(e_id)) {
                                res += 2;
                                //改修でさらにボーナス
                                if(rf > 3) {
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
                    break;
                case 115: // Ar196改
                    if(name.includes('Bismarck') || name.includes('Prinz Eugen')) {
                        res += 2;
                    }
                    break;
                case 371: //Fairey Seafox改
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
                case 412: //熟練見張員
                    if(na === 0) {
                        if(type === '駆逐艦') {
                            res += 1;
                        } else if(type='軽巡洋艦') {
                            res += 3;
                        } else if(type === '重巡洋艦') {
                            res += 1;
                        }
                    }
                    break;
                case 129: //見張員
                    if(na === 0) {
                        if(type === '駆逐艦') {
                            res += 1;
                        } else if(type='軽巡洋艦') {
                            res += 3;
                        } else if(type === '重巡洋艦') {
                            res += 3;
                        }
                    }
                    break;
                case 521: //紫雲(熟練)
                    if(name.includes('大淀改')) {
                        let rf = getEqRfs(id, num)[i];
                        if(rf > 0) { // 改修1以上で+5
                            res += 5;
                        }
                        if(rf > 3) { //☆4以上で更に+1
                            res += 1;
                        }
                    } else if(name.includes('三隈改二特')) {
                        let rf = getEqRfs(id, num)[i];
                        if(rf > 0) { // 改修1以上で+4
                            res += 4;
                        }
                    }
                    break;
                case 522: //零式小型水上機
                    if(type === '潜水艦' || type === '潜水空母') {
                        res += 3;
                    }
                    break;
                case 523: //零式小型水上機(熟練)
                    if(type === '潜水艦' || type === '潜水空母') {
                        res += 4;
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
        let e_id = getEqType(id);
        //やや無駄になるが2回に分けた方が見やすくて良いと思う
        switch(e_id) {
            //装備係数
            case 356: //艦戦
            case 357: //艦爆
            case 53645: //水戦
            case 173341: //大型飛行艇
            case 31626: //対潜哨戒機
            case 31525: //回転翼機
            case 34425: //S51J & S51J改
            case 34057: //噴式戦闘爆撃機
            case 111: //小口径主砲
            case 112: //中口径主砲
            case 5812: //小型電探
            case 5813: //大型電探
            case 244251: //潜水電探
            case 2332: //潜水魚雷
            case 71014: //ソナー
            case 71040: //大型ソナー
            case 81829: //探照灯
            case 81842: //大型探照灯
            case 132335: //航空要員
            case 162739: //見張員
            case 122234: //司令部
            case 2422: //甲標的
            case 84724: //AB艇
                res.push(0.6);
                break;
            case 358: //艦攻
                res.push(0.8);
                break;
            case 579: //艦偵
                res.push(1);
                break;
            case 54311: //水爆
                res.push(1.1);
                break;
            case 5710: //水偵
                res.push(1.2);
                break;
        }
        switch(e_id) {
            //改修係数
            case 31525: //回転翼機
            case 34425: //S51J & S51J改
            case 162739: //見張員
                res.push(0);
                break;
            case 54311: //水爆
                res.push(1.15);
                break;
            case 579: //艦偵
            case 173341: //大型飛行艇
            case 5710: //水偵
                res.push(1.2);
                break;
            case 5812: //小型電探
                res.push(1.25);
                break;
            case 5813: //大型電探
                res.push(1.4);
                break;
            default:
                res.push(0);
                break;
        }
        return res;
    }
    //艦idと艦隊番号から装備idを配列で得る
    function getEqIds(s_id, num) {
        const ids = [];
        for (const s_key in i_json[`f${num}`]) {
            let ship = i_json[`f${num}`][s_key];
            if (Number(ship.id) && Number(ship.id) === Number(s_id)) { //本家デッキビルダーへの対応で艦IDは数値化
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
    //艦idから装備改修値を配列で得る
    function getEqRfs(s_id, num) {
        const rfs = [];
        for (const s_key in i_json[`f${num}`]) {
            let ship = i_json[`f${num}`][s_key];
            if (Number(ship.id) && Number(ship.id) === Number(s_id)) { //本家デッキビルダーへの対応で艦IDは数値化
                let items = ship.items;
                for(const i_key in items) {
                    if(items[i_key].rf) {
                        rfs.push(items[i_key].rf);
                    } else { //デッキビルダー本家は改修値ゼロはキーがない
                        rfs.push(0);
                    }
                }
            }
        }
        return rfs;
    }
    //艦種を変数に反映
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
    //引数:随伴であるか否か
    function getShipName(num) {
        let names = [];
        for (let id of c_ids[num - 1]) {
            let ship = s_data.find((item) => item.id === id);
            if (ship) {
                names.push(ship.name);
            }
        }
        return names;
    }
    //idから艦種取得 配列で渡す
    function getType(num) {
        let types = [];
        for (let id of c_ids[num - 1]) {
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
        let part = '';
        if(f_united && f_united !== '遊撃部隊' && f_united !== '通常艦隊') {
            //連合艦隊
            part += `<strong>主力: </strong>${f_names[0]}`;
            for(let i = 1;i < f_length - f2_length;i++) {
                part += ` | ${f_names[i]}`;
            }
            part += `<br><strong>随伴: </strong>${f2_names[0]}`;
            for(let i = 1;i < f2_length;i++) {
                part += ` | ${f2_names[i]}`;
            }
        } else {
            //通常艦隊
            part += `${f_names[0]}`;
            for(let i = 1;i < f_length;i++) {
                part += ` | ${f_names[i]}`;
            }
        }
        let u = '';
        if(f_united !== '通常艦隊') {
            u += `<p>${f_united}</p>`;
        }
        if(f_names && speed && f_search) {
            $('#import-display').append(`${u}<p>${speed} | 搭載艦数[ドラム缶:${f_drum},大発系:${f_craft},電探:${f_radar}]</p><p>${part}</p><p id="seek-info"><span id="asterisk">*</span><span id="seek-message">一致しない場合は制空シミュを信用してください</span>索敵値: <strong>1: </strong>${f_search[0]} <strong>2: </strong>${f_search[1]} <strong>3: </strong>${f_search[2]} <strong>4: </strong>${f_search[3]}</p>`);
        }
    }
    
    //以下分岐判定に必要な関数

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
    //大和型カウント
    function countYamato() {
        var yamatos = ['大和', '武蔵'];
        var count = 0;
        for (const element of f_names) {
            for (const name of yamatos) {
                if (element.startsWith(name)) {
                    count++;
                    break; // 一致した場合、内側のループを抜けます
                }
            }
        }
        return count;
    }
    //艦隊が連合艦隊であるか
    function isCom() {
        if(f_united === '空母機動部隊' || f_united === '水上打撃部隊' || f_united === '輸送護衛部隊') {
            return true;
        } else {
            return false;
        }
    }
    //ルートカウント
    function sum(route) {
        //無ければ追加、あれば加算
        rate[route] ? rate[route] += 1:rate[route] = 1;
        //追跡
        if(track.length) {
            track.push(route.split('to')[1]);
        } else {
            track.push(route.split('to')[0]);
            track.push(route.split('to')[1]);
        }
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
    //分岐関数
    //マップをworld-map,マスをアルファベットで、スタート地点ならnull
    //再帰にするとスタックする
    //纏められそうなのもあるが実装優先で愚直に書く
    //但し条件から漏れると即無限ループなので必ずelse等で拾うこと
    function branch(world, map, edge) {
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
        const Ss = SS + SSV; //潜水艦 + 潜水空母
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
                                } else if(Ss > 0) {
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
                                    if(sai(60)) {
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
                    case 5: //@1-5
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
                                    if(Ss > 0) {
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
                                if(BB + CV + Ss > 0 || CVL > 1 || CL > 2) {
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
                    case 6: //@1-6
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
                    case 1: //@2-1
                        switch(edge) {
                            case null:
                                sum('1toC');
                                return 'C';
                                break;
                            case 'C':
                                if(CVs > 2 || BBV > 1 || (AO > 0 && Ss === 0)) {
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
                    case 2: //@2-2
                            switch(edge) {
                                case null:
                                    sum('1toC');
                                    return 'C';
                                    break;
                                case 'C':
                                    if(CVs > 2 || BBV > 1 || (AO > 0 && Ss === 0)) {
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
                                    } else if(Ss > 0) {
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
                                if(Ss + AS === f_length) {
                                    sum('1toC');
                                    return 'C';
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
                                if(AV + AO > 0 && Ds > 1 || (Ss > 1 && AS > 0)) {
                                    sum('DtoG');
                                    return 'G';
                                } else if(Ss === f_length) {
                                    if(sai(65)) {
                                        sum('DtoG');
                                        return 'G';
                                    } else {
                                        sum('DtoF');
                                        return 'F';
                                    }
                                } else if(Ss > 0 && BBCVs > 0) {
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
                                } else if(Ss > 1 && AS > 0) {
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
                                if(Ss > 1 && AS > 0){
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
                                } else if(Ss === f_length) {
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
                                } else if(Ss === f_length) {
                                    if(sai(65)) {
                                        sum('JtoN');
                                        return null;
                                    } else {
                                        sum('JtoM');
                                         return null;
                                    }
                                } else if(Ss > 0) {
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
                                    } else if(Ss > 0) {
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
                                        } else if(num <= 0.8) {
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
                                        } else if(num <= 0.6) {
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
                                    sum('LtoP');
                                    return null;
                                } else {
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
                                if(Ss > 3) {
                                    sum('1toB');
                                    return 'B';
                                } else if(Ss > 0 && BBs < 4 && (CVs > 0 || AV > 1)) {
                                    if(sai(50)) {
                                        sum('1toB');
                                        return 'B';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                } else if(CVs > 0 || AV > 1) {
                                    sum('1toC');
                                    return 'C';
                                } else if(f_drum > 1 || Ds > 3 || (CL > 0 && Ds > 2)) {
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
                                if(Ss > 2) {
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
                                } else if(f_search[0] < 41 && f_search[0] >= 37) {
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
                                } else if(Ss > 2) {
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
                                if(BBCVs > 4 || Ss === 6) {
                                    sum('DtoE');
                                    return null;
                                } else if(AS === 1 && Ss === 5) {
                                    sum('DtoG');
                                    return null;
                                } else {
                                    sum('DtoF');
                                    sum('FtoG');
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
                                } else if(speed === '低速艦隊' || f_radar === 0 || CL + DD + AO < 6) {
                                    sum('CtoG');
                                    return 'G';
                                } else if(speed === '最速艦隊' && f_radar > 3) {
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
                                if(Ss > 0 || CV > 0 || BBs + CVL === 2) {
                                    sum('GtoJ');
                                    sum('JtoK');
                                    return null;
                                } else if(speed === '低速艦隊' || f_radar === 0 || CL + DD + AO < 6) {
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
                                if(Ss > 0) {
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
                                } else if(Ss > 0) {
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
                                if(Ss > 0) {
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
                                if(Ss > 0) {
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
                                } else if(BBCVs === 2 || Ss > 0) {
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
                                if(Ss > 2 || BBs > 1 || BBs + CAs > 2 || CVs + CLT > 0) {
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
                                if(Ss > 3 || CVs > 3 || BBCVs > 4) {
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
                                } else if(Ss < 0) {
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
                                if(Ss === 1) {
                                    if(sai(50)) {
                                        sum('HtoI');
                                        return null;
                                    } else {
                                        sum('HtoJ');
                                        return null;
                                    }
                                } else if(Ss > 1) {
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
                                } else if(Ss > 0) {
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
                                } else if(Ss > 0) { //@
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
                                        return null;
                                    }
                                } else if(BBCVs > 4) {
                                    if(sai(80)) {
                                        sum('HtoK');
                                        return null;
                                    } else {
                                        sum('HtoG');
                                        return 'G';
                                    }
                                } else {
                                    if(sai(50)) {
                                        sum('HtoK');
                                        return null;
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
                                    sum('AtoB');
                                    return 'B';
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
                                } else if(Ss === 0 && CL === 1 && Ds > 1) {
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
                                if(Ss > 0 || DD === 0 || CVs === 0) {
                                    sum('FtoK');
                                    return 'K';
                                } else if(speed !== '低速艦隊' && BBCVs < 3 && DD > 1) {
                                    sum('FtoH');
                                    return 'H';
                                } else {
                                    if(sai(70)) { //@
                                        sum('FtoK');
                                        return 'K';
                                    } else {
                                        sum('FtoH');
                                        return 'H';
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
                                if(Ss > 0 || (CVs > 2 || CVs === 0) || Ds < 2) {
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
                                } else if(Ss > 0) {
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
                                    sum('AtoE');
                                    return 'E';
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
                                } else if(Ss > 3) {
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
                                    if(Ss > 0) {
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
                                } else if(Ss > 0) {
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
                                    return null;
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
                                } else if(Ss > 0) {
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
                                if(BBCVs > 4 || BBs > 3 || CV > 2 || Ss > 0) {
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
                                } else if(BBs + CV > 0) {
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
                                } else if(Ss > 0) {
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
                                if(Ss > 0 || (BBCVs > 0 && DD < 2)) {
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
                                if(BBV + CV + Ss > 0) {
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
                                if(Ss > 0) {
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
                                    sum('OtoK');
                                    return 'K';
                                } else {
                                    sum('OtoP');
                                    sum('PtoK');
                                    return 'K';
                                }
                                break;
                            case 'K':
                                if(DD > 3 || (DD === 3 && CL === 1)) {
                                    sum('KtoH');
                                    sum('HtoE');
                                    return 'E';
                                } else if(DD === 2 && (isFaster() || BBV + AO + AS > 0 || f_drum > 1 || f_craft > 1)) {
                                    sum('KtoH');
                                    sum('HtoE');
                                    return 'E';
                                } else {
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
                                } else if(f_drum + f_craft > 4 || DD > 3 || (CL === 1 && DD > 2)) {
                                    sum('1toB');
                                    return 'B';
                                } else {
                                    sum('1toA');
                                    return 'A';
                                }
                                break;
                            case 'A':
                                if(Ss > 0 || BBs > 4 || DD > 1 || CAs > 2) {
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
                                if(CVs + Ss > 0) {
                                    sum('BtoC');
                                    sum('CtoG');
                                    return 'G';
                                } else if(slowBB() > 0 || BBV + slowBB() > 1) {
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
                                if(Ss > 0 || slowBB() > 1 || BBs > 2) {
                                    sum('DtoF');
                                    sum('FtoH');
                                    sum('HtoI');
                                    sum('ItoJ');
                                    sum('JtoM');
                                    return 'M';
                                } else if(DD > 1) {
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
                                if(Ss > 0 || BBs > 3) {
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
                                } else if((f_search[1] < 45 && f_search[1] >= 41)) {
                                    if(sai(50)) {
                                        sum('MtoP');
                                        return null;
                                    } else {
                                        sum('MtoO');
                                        return null;
                                    }
                                } else if(f_search[1] >= 45) {
                                    if(Ss > 0) {
                                        if(sai(66.6)) {
                                            sum('MtoP');
                                            return null;
                                        } else {
                                            sum('MtoO');
                                            return null;
                                        }
                                    } else {
                                        sum('MtoP');
                                        return null;
                                    }
                                } //LoSより例外なし
                                break;
                        }
                        break;
                    case 5: //@5-5
                        switch(edge) {
                            case null:
                                if(DD > 3 || f_drum > 3 || f_craft > 3) {
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
                                } else if((f_search[1] < 66 & f_search[1] >= 63) || Ss > 0) {
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
                                    if(Ss > 0) {
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
                                } else if((f_search[1] < 80 && f_search[1] >= 73) || Ss > 0 || BBCVs > 4) {
                                    if(sai(66.6)) {
                                        sum('PtoS');
                                        return null;
                                    } else {
                                        sum('PtoQ');
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
                                } else if((Ss > 2 && Ss === f_length) || (AS === 1 && Ss > 2 && AS + Ss === f_length) || (AS === 1 && Ss === 3 && DD === 2) || (AS === 1 && Ss === 4 && CL + DD === 1)) {
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
                                if(Ss < 3 || BBCVs + CAs === 2 || f_search[3] < 12) {
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
                                } else if(BBV + CAV + AV + LHA < 2 && Ss < 5) {
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
                                if(Ss === 6 || BBCVs > 4 || BBCVs + CAs === 6 || BBCVs + Ss === 6) {
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
                                if(Ss > 3 || f_search[2] < 35) {
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
                                } else if(speed !== '低速艦隊' && ((isFCL() && DD === 3) || DD > 3)) {
                                    sum('1toB');
                                    sum('BtoD');
                                    sum('DtoC');
                                    sum('CtoF');
                                    sum('FtoN');
                                    return null;
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
                                if(Ss > 0) {
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
                                        sum('GtoH');
                                        return 'H';
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
                                if(Ds < 2 || Ss > 0) {
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
                                if(AO + Ss > 0) {
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
                        if(active['7-3']['1'] === '0') {
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
                                    } else if(AO === 1 && BBs > 2) {
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
                                    if(CA === 0 && Ds > 1 && (AO > 0 || AV > 1)) {
                                        sum('GtoH');
                                        return null;
                                    } else if(Ss > 0) {
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
                                    } else { //wikiに記載なし
                                        sum('JtoM');
                                        return 'M';
                                    }
                                    break;
                                case 'M':
                                    if(CV > 0 || BBCVs > 1 || Ss > 3) {
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
                                if(BB + CV + Ss > 0 || CAs > 1 || CL + CT + CLT > 1) {
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
                                if(BB + CV + Ss > 0 || BBV > 2 || (CVL > 2 || (CVL === 2 && isInclude('あきつ丸')))) {
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
                                } else if(CV > 1 || slowBB() > 1 || Ss > 0 || CL === 0 || Ds < 2) {
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
                                } else if(CV > 1 || CVs > 2 || BBs + CAs > 2 || BBs + CV + CAs > 2 || Ss > 0 || CL + DD === 0) {
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
            case 57:
                switch(map) {
                    case 7:
                        if(active['57-7']['1'] === '1') {
                            switch(edge) {
                                case null:
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('1toA');
                                        return 'A';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2':
                                    if(CV < 3) {
                                        sum('C2toD'); 
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break;
                            }
                        } else if(active['57-7']['1'] === '2') {
                            switch(edge) {
                                case null:
                                    if(f_united === '空母機動部隊') {
                                        sum('2toI');
                                        sum('ItoJ');
                                        return 'J';
                                    } else {
                                        sum('1toC');
                                        return 'C';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2':
                                    if(CV < 3) {
                                        sum('C2toD'); 
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break; //ここまで同じ
                                case 'J':
                                    if(active['57-7']['J'] === 'K') {
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                    break;
                                case 'K':
                                    if(BBs > 2) {
                                        sum('KtoM');
                                        sum('MtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    } else {
                                        sum('KtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                            }
                        } else if(active['57-7']['1'] === '3') {
                            switch(edge) {
                                case null:
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('1toA');
                                        return 'A';
                                    } else if(f_united === '水上打撃部隊' && BBs > 3) {
                                        sum('1toC');
                                        return 'C';
                                    } else if(f_united === '輸送護衛部隊') {
                                        sum('3toQ');
                                        return 'Q';
                                    } else {
                                        sum('2toI');
                                        sum('ItoJ');
                                        return 'J';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2':
                                    if(CV < 3) {
                                        sum('C2toD'); 
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break; //ここまで同じ
                                case 'J':
                                    if(active['57-7']['J'] === 'K') {
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                    break;
                                case 'K':
                                    if(BBs > 2) {
                                        sum('KtoM');
                                        sum('MtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    } else {
                                        sum('KtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'Q':
                                    if(speed === '低速艦隊' && BBV + CAs > 2) {
                                        sum('QtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('QtoO');
                                        return 'O';
                                    }
                                    break;
                                case 'O':
                                    if(f_united === '輸送護衛部隊') {
                                        sum('OtoR');
                                        sum('RtoS');
                                        sum('StoP');
                                        return null;
                                    } else {
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                            }
                        } else if(active['57-7']['1'] === '4') {
                            switch(edge) {
                                case null:
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('1toA');
                                        return 'A';
                                    } else if(f_united === '水上打撃部隊' && BBs > 3) {
                                        sum('1toC');
                                        return 'C';
                                    } else if(f_united === '輸送護衛部隊') {
                                        sum('3toQ');
                                        return 'Q';
                                    } else {
                                        sum('2toI');
                                        sum('ItoJ');
                                        return 'J';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2': //更新部分
                                    if(f_united === '空母機動部隊' && speed !== '低速艦隊' && (AR + AO > 0 || isInclude('秋津洲'))) {
                                        sum('C2toL');
                                        return 'L';
                                    } else if(CV < 3) {
                                        sum('C2toD');
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break;
                                case 'J':
                                    if(active['57-7']['J'] === 'K') {
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('JtoL');
                                        return null;
                                    }
                                    break;
                                case 'L': //追加
                                    if(BBCVs < 6) {
                                        sum('LtoT');
                                        sum('TtoU');
                                        return 'U';
                                    } else {
                                        sum('LtoN');
                                        return 'N';
                                    }
                                    break;
                                case 'K':
                                    if(BBs > 2) {
                                        sum('KtoM');
                                        sum('MtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    } else {
                                        sum('KtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'Q':
                                    if(speed === '低速艦隊' && BBV + CAs > 2) {
                                        sum('QtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('QtoO');
                                        return 'O';
                                    }
                                    break;
                                case 'N':
                                    if(track.includes('K')) {
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('NtoT');
                                        sum('TtoU');
                                        return 'U';
                                    }
                                    break;
                                case 'O':
                                    if(f_united === '輸送護衛部隊') {
                                        sum('OtoR');
                                        sum('RtoS');
                                        sum('StoP');
                                        return null;
                                    } else {
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'U':
                                    if(BBs > 4) {
                                        sum('UtoV');
                                        sum('VtoX');
                                        return null;
                                    } else {
                                        sum('UtoX');
                                        return null;
                                    }
                                    break;
                            }
                        } else if(active['57-7']['1'] === '5') {
                            switch(edge) {
                                case null:
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('1toA');
                                        return 'A';
                                    } else if(f_united === '水上打撃部隊' && BBs > 3) {
                                        sum('1toC');
                                        return 'C';
                                    } else if(f_united === '輸送護衛部隊') {
                                        sum('3toQ');
                                        return 'Q';
                                    } else {
                                        sum('2toI');
                                        sum('ItoJ');
                                        return 'J';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2': //更新部分
                                    if(f_united === '空母機動部隊' && speed !== '低速艦隊' && (AR + AO > 0 || isInclude('秋津洲'))) {
                                        sum('C2toL');
                                        return 'L';
                                    } else if(CV < 3) {
                                        sum('C2toD');
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break;
                                case 'J':
                                    if(active['57-7']['J'] === 'K') {
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('JtoL');
                                        return 'L';
                                    }
                                    break;
                                case 'L': //追加
                                    if(BBCVs < 6) {
                                        sum('LtoT');
                                        sum('TtoU');
                                        return 'U';
                                    } else {
                                        sum('LtoN');
                                        return 'N';
                                    }
                                    break;
                                case 'K':
                                    if(BBs > 2) {
                                        sum('KtoM');
                                        sum('MtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    } else {
                                        sum('KtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'Q':
                                    if(speed === '低速艦隊' && BBV + CAs > 2) {
                                        sum('QtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('QtoO');
                                        return 'O';
                                    }
                                    break;
                                case 'N':
                                    if(track.includes('K')) {
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('NtoT');
                                        sum('TtoU');
                                        return 'U';
                                    }
                                    break;
                                case 'O':
                                    if(f_united === '輸送護衛部隊') {
                                        sum('OtoR');
                                        sum('RtoS');
                                        sum('StoP');
                                        return null;
                                    } else {
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'U':
                                    if(BBs > 4) {
                                        sum('UtoV');
                                        sum('VtoX');
                                        return 'X';
                                    } else {
                                        sum('UtoX');
                                        return 'X';
                                    }
                                    break;
                                case 'X':
                                    if(AR + AO > 0 || isInclude('秋津洲')) {
                                        sum('XtoY');
                                        sum('YtoZ');
                                        return null;
                                    } else {
                                        sum('XtoZ');
                                        return null;
                                    }
                                    break;
                            }
                        } else if(active['57-7']['1'] === '6') {
                            switch(edge) {
                                case null:
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('1toA');
                                        return 'A';
                                    } else if(f_united === '水上打撃部隊' && BBs > 3) {
                                        sum('1toC');
                                        return 'C';
                                    } else if(f_united === '輸送護衛部隊') {
                                        sum('3toQ');
                                        return 'Q';
                                    } else {
                                        sum('2toI');
                                        sum('ItoJ');
                                        return 'J';
                                    }
                                    break;
                                case 'A':
                                    if(CV > 0 || CL === 0) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else if(speed === '低速艦隊' && Ds < 4) {
                                        sum('AtoA1');
                                        return 'A1';
                                    } else {
                                        sum('AtoA2');
                                        return 'A2';
                                    }
                                    break;
                                case 'A1':
                                    if((BBs < 3 || (CV > 0 && Ds > 3)) && CL > 0 && Ds > 2) {
                                        sum('A1toA2');
                                        return 'A2';
                                    } else {
                                        sum('A1toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A2':
                                    if(active['57-7']['A2'] === 'A3') {
                                        sum('A2toA3');
                                        return 'A3';
                                    } else {
                                        sum('A2toB');
                                        return 'B';
                                    }
                                    break;
                                case 'A3':
                                    if(f_united === '通常艦隊' || f_united === '遊撃部隊') {
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('A3toA5');
                                        return null;
                                    }
                                    break;
                                case 'B':
                                    if(f_search[3] < 86) {
                                        sum('BtoB1');
                                        return null;
                                    } else {
                                        sum('BtoB2');
                                        return 'B2';
                                    }
                                    break;
                                case 'B2':
                                    if(active['57-7']['B2'] === 'B3') {
                                        sum('B2toB3');
                                        return null;
                                    } else {
                                        sum('B2toB4');
                                        return null;
                                    }
                                    break;
                                case 'C':
                                    if(active['57-7']['C'] === 'A3') {
                                        sum('CtoA3');
                                        sum('A3toA4');
                                        return null;
                                    } else {
                                        sum('CtoC1');
                                        sum('C1toC2');
                                        return 'C2';
                                    }
                                    break;
                                case 'C2': //更新部分
                                    if(f_united === '空母機動部隊' && speed !== '低速艦隊' && (AR + AO > 0 || isInclude('秋津洲'))) {
                                        sum('C2toL');
                                        return 'L';
                                    } else if(CV < 3) {
                                        sum('C2toD');
                                        return 'D';
                                    } else {
                                        sum('C2toC3');
                                        return null;
                                    }
                                    break;
                                case 'D':
                                    if(speed !== '低速艦隊') {
                                        sum('DtoF');
                                        return 'F';
                                    } else if(BBCVs > 5) {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    } else if(DD > 3) {
                                        sum('DtoF');
                                        return 'F';
                                    } else {
                                        sum('DtoE');
                                        sum('EtoF');
                                        return 'F';
                                    }
                                    break;
                                case 'F':
                                    if(speed === '低速艦隊') {
                                        sum('FtoG');
                                        sum('GtoH');
                                        return null;
                                    } else {
                                        sum('FtoH');
                                        return null;
                                    }
                                    break;
                                case 'J':
                                    if(active['57-7']['J'] === 'K') {
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('JtoL');
                                        return 'L';
                                    }
                                    break;
                                case 'L': //更新
                                    if(BBCVs > 6 || (BBCVs === 6 && speed === '低速艦隊')) {
                                        sum('LtoN');
                                        return 'N';
                                    } else if(DD < 4 && speed === '低速艦隊') {
                                        sum('LtoT');
                                        sum('TtoU');
                                        return 'U';
                                    } else if(speed === '最速艦隊' || (DD > 7 && speed !== '低速艦隊')) {
                                        sum('LtoX');
                                        return 'X';
                                    } else if((countYamato() < 2 && isFaster()) || (countYamato() < 2 && CV < 3 && CL + DD > 4 && speed !== '低速艦隊')) {
                                        sum('LtoV');
                                        sum('VtoX');
                                        return 'X';
                                    } else {
                                        sum('LtoU');
                                        return 'U';
                                    }
                                    break;
                                case 'K':
                                    if(BBs > 2) {
                                        sum('KtoM');
                                        sum('MtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    } else {
                                        sum('KtoN');
                                        sum('NtoO');
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'Q':
                                    if(speed === '低速艦隊' && BBV + CAs > 2) {
                                        sum('QtoN');
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('QtoO');
                                        return 'O';
                                    }
                                    break;
                                case 'N':
                                    if(track.includes('K')) {
                                        sum('NtoO');
                                        return 'O';
                                    } else {
                                        sum('NtoT');
                                        sum('TtoU');
                                        return 'U';
                                    }
                                    break;
                                case 'O':
                                    if(f_united === '輸送護衛部隊') {
                                        sum('OtoR');
                                        sum('RtoS');
                                        sum('StoP');
                                        return null;
                                    } else {
                                        sum('OtoP');
                                        return null;
                                    }
                                    break;
                                case 'U':
                                    if(BBs > 4) {
                                        sum('UtoV');
                                        sum('VtoX');
                                        return 'X';
                                    } else {
                                        sum('UtoX');
                                        return 'X';
                                    }
                                    break;
                                case 'X':
                                    if(AR + AO > 0 || isInclude('秋津洲')) {
                                        sum('XtoY');
                                        sum('YtoZ');
                                        return null;
                                    } else {
                                        sum('XtoZ');
                                        return null;
                                    }
                                    break;
                            }
                        }
                        break;
                }
                break;
            case 58:
                switch(map) {
                    case 1: //@58-1
                        var phase = Number(active['58-1']['1']);
                        var kanko_carrier = CVs + f_names.filter(v => v.includes('あきつ丸')).length;
                        switch(edge) {
                            case null:
                                if(kanko_carrier === 0 && Ds > 3) {
                                    return '2';
                                } else if(kanko_carrier > f_kanko) {
                                    return '2';
                                } else if(AO + LHA > 0 && Ds > 2) {
                                    return '2';
                                } else if(AV > 1 && Ds > 2) {
                                    return '2';
                                } else if(phase === 3 && kanko_carrier > 0) {
                                    sum('3toV');
                                    sum('VtoW');
                                    return 'W';
                                } else if(kanko_carrier > 2) {
                                    sum('1toA');
                                    return 'A';
                                } else if(BBs > 0) {
                                    sum('1toA');
                                    return 'A';
                                } else if(Ss > 0 && AS === 0) {
                                    return '2';
                                } else if(AS > 1) {
                                    return '2';
                                } else if(phase === 3 && CA > 1 && Ds > 1 && CL + CT > 0) {
                                    sum('3toV');
                                    sum('VtoW');
                                    return 'W';
                                } else if(kanko_carrier > 0 && Ds > 2) {
                                    return '2';
                                } else {
                                    sum('1toA');
                                    return 'A';
                                }
                                break;
                            case '2':
                                if(AV > 0) {
                                    sum('2toI');
                                    return 'I';
                                } else if(isFaster()) {
                                    sum('2toN');
                                    sum('NtoO');
                                    sum('OtoP');
                                    sum('PtoQ');
                                    return null;
                                } else if(AO + LHA === 2 && AO + LHA + Ds === 6) {
                                    sum('2toN');
                                    sum('NtoO');
                                    sum('OtoP');
                                    sum('PtoQ');
                                    return null;
                                } else if(AO + LHA === 1 && AO + LHA + Ds === f_length && f_length < 6) {
                                    sum('2toN');
                                    sum('NtoO');
                                    sum('OtoP');
                                    sum('PtoQ');
                                    return null;
                                } else {
                                    sum('2toI');
                                    return 'I';
                                }
                                break;
                            case 'B':
                                if(phase === 2) {
                                    sum('BtoC');
                                    sum('CtoR');
                                    return 'R';
                                } else if(CL > 0 && DD > 2 && speed === '高速艦隊') {
                                    sum('BtoW');
                                    return 'W';
                                } else {
                                    sum('BtoC');
                                    sum('CtoR');
                                    return 'R';
                                }
                                break;
                            case 'D':
                                if(track.includes('A')) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(track.includes('I')) {
                                    if(CV > 2) {
                                        sum('DtoJ');
                                        sum('JtoK');
                                        return 'K';
                                    } else if(DD < 2) {
                                        sum('DtoJ');
                                        sum('JtoK');
                                        return 'K';
                                    } else if(speed === '低速艦隊') {
                                        sum('DtoJ');
                                        sum('JtoK');
                                        return 'K';
                                    } else {
                                        sum('DtoK');
                                        return 'K';
                                    }
                                }
                                break;
                            case 'K':
                                if(f_search[3] >= 68) {
                                    sum('KtoM');
                                    return null;
                                } else {
                                    sum('KtoL');
                                    return null;
                                }
                                break;
                            case 'R':
                                if(BBs > 1 && CL + AV === 1 && DD > 1 && speed === '高速艦隊') {
                                    sum('RtoR2');
                                    return 'R2';
                                } else {
                                    sum('RtoR1');
                                    sum('R1toR2');
                                    return 'R2';
                                }
                                break;
                            case 'R2':
                                if(DD === 5) {
                                    sum('R2toT');
                                    sum('TtoX');
                                    return null;
                                } else if(CL > 0 && DD > 3 && speed === '高速艦隊') {
                                    sum('R2toT');
                                    sum('TtoX');
                                    return null;
                                } else {
                                    sum('R2toS');
                                    return 'S';
                                }
                                break;
                            case 'S':
                                if(f_search[3] >= 80) {
                                    sum('StoT');
                                    sum('TtoX');
                                    return null;
                                } else {
                                    sum('StoU');
                                    return null;
                                }
                                break;
                            case 'W':
                                if(CA > 1 && DD > 1) {
                                    sum('WtoR2');
                                    return 'R2';
                                } else if(speed === '低速艦隊') {
                                    sum('WtoR');
                                    return 'R';
                                } else if(BBs > 0 && CV + CVB > 1) {
                                    sum('WtoR');
                                    return 'R';
                                } else if(DD > 2) {
                                    sum('WtoR2');
                                    return 'R2';
                                } else if(DD < 2) {
                                    sum('WtoR');
                                    return 'R';
                                } else if(CL === 0) {
                                    sum('WtoR');
                                    return 'R';
                                } else if(CV + CVB < 2) {
                                    sum('WtoR2');
                                    return 'R2';
                                } else if(BBs === 0) {
                                    sum('WtoR2');
                                    return 'R2';
                                } else if(f_search[3] >= 100) {
                                    sum('WtoR2');
                                    return 'R2';
                                } else {
                                    sum('WtoR');
                                    return 'R';
                                }
                                break;
                            case 'A':
                                if(active['58-1']['A'] === 'B') {
                                    sum('AtoB');
                                    return 'B';
                                } else {
                                    sum('AtoD');
                                    return 'D';
                                }
                                break;
                            case 'I':
                                if(active['58-1']['I'] === 'D') {
                                    sum('ItoD');
                                    return 'D';
                                } else {
                                    sum('ItoN1');
                                    sum('N1toN2');
                                    sum('N2toO');
                                    sum('OtoP');
                                    sum('PtoQ');
                                    return null;
                                }
                                break;
                            case 'F':
                                if(active['58-1']['F'] === 'G') {
                                    sum('FtoG');
                                    return null;
                                } else {
                                    sum('FtoH');
                                    return null;
                                }
                        }
                        break;
                    case 2: //@58-2
                        var phase = Number(active['58-2']['1']);
                        var difficulty = Number(active['58-2']['2']);
                        var kanko_carrier = CVs + f_names.filter(v => v.includes('あきつ丸')).length;
                        switch(edge) {
                            case null:
                                if(phase === 1) {
                                    sum('1toA');
                                    sum('AtoB');
                                    return 'B';
                                } else if(phase === 2) {
                                    if(isCom()) {
                                        sum('2toL');
                                        return 'L';
                                    } else {
                                        sum('1toA');
                                        sum('AtoB');
                                        return 'B';
                                    }
                                } else if(phase === 3) {
                                    if(isCom()) {
                                        sum('2toL');
                                        return 'L';
                                    } else {
                                        if(BBs > 0) {
                                            sum('1toA');
                                            sum('AtoB');
                                            return 'B';
                                        } else if(kanko_carrier > 0) {
                                            sum('1toA');
                                            sum('AtoB');
                                            return 'B';
                                        } else if(difficulty === 1 && Ss < 3) {
                                            sum('1toA');
                                            sum('AtoB');
                                            return 'B';
                                        } else if(difficulty === 2 && Ss < 2) {
                                            sum('1toA');
                                            sum('AtoB');
                                            return 'B';
                                        } else if(difficulty > 2 && Ss === 0) {
                                            sum('1toA');
                                            sum('AtoB');
                                            return 'B';
                                        } else {
                                            sum('3toS');
                                            sum('StoT');
                                            return 'T';
                                        }
                                    }
                                }
                                break;
                            case 'C':
                                if(track.includes('A')) {
                                    if(speed === '低速艦隊') {
                                        sum('CtoF');
                                        return null;
                                    } else if(CV + CVB > 0) {
                                        sum('CtoF');
                                        return null;
                                    } else {
                                        sum('CtoD');
                                        return 'D';
                                    }
                                } else if(track.includes('S')) {
                                    sum('CtoI');
                                    return 'I';
                                }
                                break;
                            case 'D':
                                if(isCom()) {
                                    sum('DtoN');
                                    return 'N';
                                } else {
                                    if(f_search[3] >= 98) {
                                        sum('DtoD2');
                                        return null;
                                    } else {
                                        sum('DtoD1');
                                        return null;
                                    }
                                }
                                break;
                            case 'E':
                                if(CV + CVB > 0) {
                                    sum('EtoF');
                                    return null;
                                } else if(speed === '高速艦隊') {
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else if(BBs > 1) {
                                    sum('EtoF');
                                    return null;
                                } else if(CL > 0 && Ds > 1) {
                                    sum('EtoG');
                                    sum('GtoH');
                                    return 'H';
                                } else {
                                    sum('EtoF');
                                    return null;
                                }
                                break;
                            case 'H':
                                if(track.includes('A')) {
                                    if(f_search[3] < 80) {
                                        sum('HtoK');
                                        return null;
                                    } else if(speed === '低速艦隊') {
                                        sum('HtoJ');
                                        return 'J';
                                    } else if(BBs > 1) {
                                        sum('HtoJ');
                                        return 'J';
                                    } else if(CVL + f_names.filter(v => v.includes('あきつ丸')).length > 1) {
                                        sum('HtoJ');
                                        return 'J';
                                    } else {
                                        sum('HtoI');
                                        return 'I';
                                    }
                                }
                                break;
                            case 'I':
                                if(phase < 3) {
                                    return null;
                                } else if(Ss > 0) {
                                    sum('ItoU');
                                    return 'U';
                                } else {
                                    sum('ItoD3');
                                    return null;
                                }
                                break;
                            case 'J':
                                if(!isCom()) {
                                    sum('JtoP');
                                    return 'P';
                                } else if(speed === '低速艦隊') {
                                    sum('JtoN');
                                    return 'N';
                                } else if(BBs > 2) {
                                    sum('JtoN');
                                    return 'N';
                                } else if(CVs > 2) {
                                    sum('JtoN');
                                    return 'N';
                                } else if(CL > 1 && DD > 4) {
                                    sum('JtoP');
                                    return 'P';
                                } else {
                                    sum('JtoN');
                                    return 'N';
                                }
                                break;
                            case 'L':
                                if(f_united === '空母機動部隊') {
                                    sum('LtoM');
                                    sum('MtoJ');
                                    return 'J';
                                } else if(f_united === '水上打撃部隊') {
                                    sum('LtoD');
                                    return 'D';
                                }
                                break;
                            case 'N':
                                if(CV + CVB > 0) {
                                    sum('NtoO');
                                    sum('OtoP');
                                    return 'P';
                                } else if(speed === '高速艦隊') {
                                    sum('NtoP');
                                    return 'P';
                                } else if(CL > 1 && DD > 2) {
                                    sum('NtoP');
                                    return 'P';
                                } else {
                                    sum('NtoO');
                                    sum('OtoP');
                                    return 'P';
                                }
                                break;
                            case 'P':
                                if(f_search[1] >= 62) {
                                    sum('PtoR');
                                    return null;
                                } else {
                                    sum('PtoQ');
                                    return null;
                                }
                                break;
                            case 'T':
                                if(CAs > 1) {
                                    sum('TtoC');
                                    return 'C';
                                } else if(CL > 1) {
                                    sum('TtoC');
                                    return 'C';
                                } else {
                                    sum('TtoU');
                                    return 'U';
                                }
                                break;
                            case 'U':
                                if(CAs > 0) {
                                    sum('UtoH');
                                    return 'H';
                                } else if(AV > 0) {
                                    sum('UtoH');
                                    return 'H';
                                } else if(AS > 0) {
                                    sum('UtoV');
                                    return 'V';
                                } else {
                                    sum('UtoH');
                                    return 'H';
                                }
                                break;
                            case 'V':
                                if(difficulty === 1 && Ss > 3) {
                                    sum('VtoX');
                                    sum('XtoY');
                                    return null;
                                } else if(difficulty === 2 && Ss > 2) {
                                    sum('VtoX');
                                    sum('XtoY');
                                    return null;
                                } else if(difficulty === 3 && Ss > 1) {
                                    sum('VtoX');
                                    sum('XtoY');
                                    return null;
                                } else if(difficulty === 4) {
                                    sum('VtoX');
                                    sum('XtoY');
                                    return null;
                                } else {
                                    sum('VtoW');
                                    sum('WtoX');
                                    sum('XtoY');
                                    return null;
                                }
                                break;
                            case 'B':
                                if(active['58-2']['B'] === 'C') {
                                    sum('BtoC');
                                    return 'C';
                                } else {
                                    sum('BtoE');
                                    return 'E';
                                }
                                break;
                        }
                        break;
                    case 3: //@58-3
                        var phase = Number(active['58-3']['1']);
                        var difficulty = Number(active['58-3']['2']);
                        var kanko_carrier = CVs + f_names.filter(v => v.includes('あきつ丸')).length;
                        switch(edge) {
                            case null:
                                if(isCom()) {
                                    sum('1toA');
                                    sum('AtoB');
                                    return 'B';
                                } else {
                                    if(phase < 3) {
                                        sum('2toH');
                                        return 'H';
                                    } else {
                                        if(AO > 0) {
                                            sum('3toI');
                                            return 'I';
                                        } else if(CL > 0 && DD > 2 && speed !== '低速艦隊') {
                                            sum('3toI');
                                            return 'I';
                                        } else if(kanko_carrier > 0) {
                                            sum('2toH');
                                            return 'H';
                                        } else if(BBs > 0) {
                                            sum('2toH');
                                            return 'H';
                                        } else if(AO + LHA + AV > 1) {
                                            sum('2toH');
                                            return 'H';   
                                        } else if(phase < 4) {
                                            sum('3toI');
                                            return 'I';
                                        } else {
                                            if(difficulty === 1 && AS > 0 && Ss > 2) {
                                                sum('4toV');
                                                sum('VtoW');
                                                return 'W';
                                            } if(difficulty === 2 && Ss > 2) {
                                                sum('4toV');
                                                sum('VtoW');
                                                return 'W';
                                            } if(difficulty === 3 && Ss > 1) {
                                                sum('4toV');
                                                sum('VtoW');
                                                return 'W';
                                            } if(difficulty === 4 && Ss > 0) {
                                                sum('4toV');
                                                sum('VtoW');
                                                return 'W';
                                            } if(difficulty === 4 && Ds > 2) {
                                                sum('4toV');
                                                sum('VtoW');
                                                return 'W';
                                            } else {
                                                sum('2toH');
                                                return 'H';
                                            }
                                        }
                                    }
                                }
                                break;
                            case 'B':
                                if(BBCVs > 5) {
                                    sum('BtoC');
                                    sum('CtoD');
                                    return 'D';
                                } else if(speed !== '低速艦隊') {
                                    sum('BtoD');
                                    return 'D';
                                } else if(CL > 1 && DD > 3) {
                                    sum('BtoD');
                                    return 'D';
                                } else {
                                    sum('BtoC');
                                    sum('CtoD');
                                    return 'D';
                                }
                                break;
                            case 'D':
                                if(BBCVs > 6) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(BBs > 3) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else if(CV + CVB > 2) {
                                    sum('DtoE');
                                    sum('EtoF');
                                    return 'F';
                                } else {
                                    sum('DtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(f_search[1] >= 70) {
                                    sum('FtoO');
                                    return 'O';
                                } else {
                                    sum('FtoG');
                                    return null;
                                }
                                break;
                            case 'H':
                                if(CL > 0 && DD > 3 && speed !== '低速艦隊') {
                                    sum('HtoJ');
                                    return 'J';
                                } else {
                                    sum('HtoI');
                                    return 'I';
                                }
                                break;
                            case 'I':
                                if(BBCVs > 4) {
                                    sum('ItoL');
                                    return 'L';
                                } else if(Ds < 2) {
                                    sum('ItoL');
                                    return 'L';
                                } else if(speed !== '低速艦隊') {
                                    sum('ItoM');
                                    return 'M';
                                } else if(BBs > 1) {
                                    sum('ItoL');
                                    return 'L';
                                } else if(Ds > 1) {
                                    sum('ItoL');
                                    return 'L';
                                } else {
                                    sum('ItoM');
                                    return 'M';
                                }
                                break;
                            case 'J':
                                if(f_search[1] >= 45) {
                                    sum('JtoN');
                                    return null;
                                } else {
                                    sum('JtoK');
                                    return null;
                                }
                                break;
                            case 'L':
                                if(f_search[1] >= 58) {
                                    sum('LtoM');
                                    return 'M';
                                } else {
                                    sum('LtoG');
                                    return null;
                                }
                                break;
                            case 'O':
                                if(f_search[1] < 69) {
                                    sum('OtoO1');
                                    return null;
                                } else if(BBs < 3) {
                                    sum('OtoO3');
                                    return null;
                                } else if(CL > 1) {
                                    sum('OtoO3');
                                    return null;
                                } else {
                                    sum('OtoO2');
                                    sum('O2toO3');
                                    return null;
                                }
                                break;
                            case 'P':
                                if(f_search[3] >= 98) {
                                    sum('PtoR');
                                    return 'R';
                                } else {
                                    sum('PtoQ');
                                    return null;
                                }
                                break;
                            case 'R':
                                if(isFaster()) {
                                    sum('RtoU');
                                    return null;
                                } else {
                                    sum('RtoS');
                                    return 'S';
                                }
                                break;
                            case 'S':
                                if(speed === '低速艦隊') {
                                    sum('StoT');
                                    sum('TtoU');
                                    return null;
                                } else {
                                    sum('StoU');
                                    return null;
                                }
                                break;
                            case 'W':
                                if(AV + LHA > 0) {
                                    sum('WtoX');
                                    sum('XtoY');
                                    return 'Y';
                                } else if(difficulty === 1 && AS + Ss > 4) {
                                    sum('WtoY');
                                    return 'Y';
                                } else if(difficulty === 1 && DD > 1) {
                                    sum('WtoY');
                                    return 'Y';
                                } else if(difficulty > 1) {
                                    sum('WtoY');
                                    return 'Y';
                                } else {
                                    sum('WtoX');
                                    sum('XtoY');
                                    return 'Y';
                                }
                                break;
                            case 'Y':
                                if(CAs + CL + CT + CLT  + AV + LHA > 2) {
                                    sum('YtoY1');
                                    sum('Y1toY2');
                                    sum('Y2toZ');
                                    return null;
                                } else if(DD > 0) {
                                    sum('YtoY2');
                                    sum('Y2toZ');
                                    return null;
                                } else if(Ss > 4) {
                                    sum('YtoY2');
                                    sum('Y2toZ');
                                    return null;
                                } else if(CAs + CL + CT + CLT  + AV + LHA > 1) {
                                    sum('YtoY1');
                                    sum('Y1toY2');
                                    sum('Y2toZ');
                                    return null;
                                } else if(Ss < 4) {
                                    sum('YtoY1');
                                    sum('Y1toY2');
                                    sum('Y2toZ');
                                    return null;
                                } else {
                                    sum('YtoY2');
                                    sum('Y2toZ');
                                    return null;
                                }
                                break;
                            case 'M':
                                if(active['58-3']['M'] === 'P') {
                                    sum('MtoP');
                                    return 'P';
                                } else {
                                    sum('MtoN');
                                    return null;
                                }
                                break;
                        }
                        break;
                    case 4:
                        var phase = Number(active['58-4']['1']);
                        var difficulty = Number(active['58-4']['2']);
                        switch(edge) {
                            case null:
                                if(phase < 4) {
                                    return '1';
                                } else if(phase > 3) {
                                    if(!isCom()) {
                                        return '1';
                                    } else if(f_united === '輸送護衛部隊') {
                                        sum('2toH');
                                        return 'H';
                                    } else if(f_united === '水上打撃部隊') {
                                        if(BBV + CAV === 2 && CL === 1 && BBV + CL + Ds + AO + AS + LHA === 12) {
                                            sum('2toH');
                                            return 'H';
                                        } else if(((BBV + CAV === 1) || (BBV + CAV === 2)) && CL + CT === 2 && BBV + CAV + CL + CT + Ds + AO + AS + LHA === 12) {
                                            sum('2toH');
                                            return 'H';
                                        } else if(phase < 6) {
                                            return '1';
                                        } else if(phase === 6) {
                                            return '3';
                                        }
                                    } else if(f_united === '空母機動部隊') {
                                        return '1';
                                    }
                                }
                                break;
                            case '1':
                                if(phase > 4 && Ss > 3) {
                                    sum('1toP');
                                    sum('PtoJ');
                                    return 'J';
                                } else if(CV + CVB > 3) {
                                    sum('1toA');
                                    return 'A';
                                } else if(speed === '高速艦隊') {
                                    sum('1toA1');
                                    return 'A1';
                                } else if(isCom()) {
                                    if(countYamato() > 1) {
                                        sum('1toA');
                                        return 'A';
                                    } else {
                                        sum('1toA1');
                                        return 'A1';
                                    }
                                } else if(!isCom()) {
                                    if(AS + Ss > 0) {
                                        sum('1toA1');
                                        return 'A1';
                                    } else {
                                        sum('1toA');
                                        return 'A';
                                    }
                                }
                                break;
                            case '3':
                                if(speed === '高速艦隊') {
                                    sum('3toT');
                                    sum('TtoU');
                                    return 'U';
                                } else if(CL + CT  + Ds > 6) {
                                    sum('3toT');
                                    sum('TtoU');
                                    return 'U';
                                } else if(Ds > 4) {
                                    sum('3toT');
                                    sum('TtoU');
                                    return 'U';
                                } else {
                                    sum('3toF');
                                    return 'F';
                                }
                                break;
                            case 'A':
                                if(!isCom()) {
                                    sum('AtoA1');
                                    return 'A1';
                                } else if(CV + CVB > 3) {
                                    sum('AtoA1');
                                    return 'A1';
                                } else if(Ds > 3) {
                                    sum('AtoB');
                                    return 'B';
                                } else {
                                    sum('AtoA1');
                                    return 'A1';
                                }
                                break;
                            case 'A1':
                                if(!isCom()) {
                                    sum('A1toA2');
                                    sum('A2toA3');
                                    return null;
                                } else {
                                    sum('A1toB');
                                    return 'B';
                                }
                                break;
                            case 'C':
                                if(AV > 1) {
                                    sum('CtoC2');
                                    return null;
                                } else if(speed === '高速艦隊') {
                                    sum('CtoC1');
                                    sum('C1toE');
                                    return 'E';
                                } else if(CVs > 3) {
                                    sum('CtoC2');
                                    return null;
                                } else if(CAs > 2) {
                                    sum('CtoC2');
                                    return null;
                                } else {
                                    sum('CtoC1');
                                    sum('C1toE');
                                    return 'E';
                                }
                                break;
                            case 'D':
                                if(BB > 0) {
                                    if (isOnce) return 1;
                                    sum('DtoD2');
                                    return null;
                                } else if(CL + CT > 2) {
                                    if (isOnce) return 2;
                                    sum('DtoD1');
                                    return null;
                                } else if(CVL > 0 && Ds > 3) {
                                    if (isOnce) return 3;
                                    sum('DtoD1');
                                    return null;
                                } else if(CVL === 0 && BBV === 0 && CL + CT > 1) {
                                    if (isOnce) return 4;
                                    sum('DtoD1');
                                    return null;
                                } else if(CVL === 0 && CL + CT > 1 && Ds > 3) {
                                    if (isOnce) return 5;
                                    sum('DtoD1');
                                    return null;
                                } else {
                                    if (isOnce) return 6;
                                    sum('DtoD2');
                                    return null;
                                }
                                break;
                            case 'E':
                                if(countYamato() === 2 && DD < 5) {
                                    sum('EtoF');
                                    return 'F';
                                } else if(countYamato() === 1 && DD < 4) {
                                    sum('EtoF');
                                    return 'F';
                                } else if(countYamato() === 0 && DD < 3) {
                                    sum('EtoF');
                                    return 'F';
                                } else if(BBCVs < 5) {
                                    sum('EtoF1');
                                    return 'F1';
                                } else if(speed === '低速艦隊') {
                                    sum('EtoF');
                                    return 'F';
                                } else if(BBCVs === 5) {
                                    sum('EtoF1');
                                    return 'F1';
                                } else if(BBs + CV + CVB) {
                                    sum('EtoF1');
                                    return 'F1';
                                } else {
                                    sum('EtoF');
                                    return 'F';
                                }
                                break;
                            case 'F':
                                if(!isCom()) {
                                    sum('FtoJ1');
                                    return 'J1';
                                } else if(f_united === '輸送護衛部隊') {
                                    sum('FtoJ1');
                                    return 'J1';
                                } else if(track.includes('1')) {
                                    sum('FtoF1');
                                    return 'F1';
                                } else if(track.includes('3')) {
                                    sum('FtoU');
                                    return 'U';
                                }
                                break;
                            case 'F1':
                                if(f_search[1] >= 98) {
                                    sum('F1toG');
                                    return null;
                                } else {
                                    sum('F1toF2');
                                    return null;
                                }
                                break;
                            case 'H':
                                if(speed === '低速艦隊') {
                                    sum('HtoI');
                                    sum('ItoI1');
                                    return 'I1';
                                } else {
                                    sum('HtoJ');
                                    return 'J';
                                }
                                break;
                            case 'I1':
                                if(DD > 7) {
                                    sum('ItoI3');
                                    sum('I3toL');
                                    return 'L';
                                } else {
                                    sum('I1toI2');
                                    sum('I2toK');
                                    sum('KtoL');
                                    return 'L';
                                }
                                break;
                            case 'J':
                                if(phase < 5) {
                                    sum('JtoJ1');
                                    return 'J1';
                                } else if(CVs > 0) {
                                    sum('JtoF');
                                    return 'F';
                                } else if(difficulty === 1 && Ss > 3) {
                                    sum('JtoJ1');
                                    return 'J1';
                                } else if(difficulty !== 1 && Ss > 2) {
                                    sum('JtoJ1');
                                    return 'J1'; 
                                } else {
                                    sum('JtoF');
                                    return 'F';
                                }
                                break;
                            case 'J1':
                                if(isCom()) {
                                    sum('J1toJ2');
                                    return 'J2';
                                } else if(f_length < 6) {
                                    sum('J1toJ2');
                                    return 'J2';
                                } else if(AS === 0 && speed === '低速艦隊') {
                                    sum('J1toQ');
                                    sum('QtoR');
                                    sum('RtoS');
                                    return null;
                                } else if(AV > 1) {
                                    sum('J1toQ');
                                    sum('QtoR');
                                    sum('RtoS');
                                    return null;
                                } else if(DD > 1) {
                                    sum('J1toR');
                                    sum('RtoS');
                                    return null;
                                } else if(CAs + CL > 0) {
                                    sum('J1toQ');
                                    sum('QtoR');
                                    sum('RtoS');
                                    return null;
                                } else if(Ss > 3) {
                                    sum('J1toR');
                                    sum('RtoS');
                                    return null;
                                } else {
                                    sum('J1toQ');
                                    sum('QtoR');
                                    sum('RtoS');
                                    return null;
                                }
                                break;
                            case 'J2':
                                if(track.includes('2')) {
                                    if(DD > 7) {
                                        sum('J2toM');
                                        return 'M';
                                    } else {
                                        sum('J2toL');
                                        return 'L';
                                    }
                                } else if(track.includes('3')) {
                                    sum('J2toV');
                                    return 'V';
                                }
                                break;
                            case 'L':
                                if(track.includes('2')) {
                                    sum('LtoM');
                                    return 'M';
                                } else if(track.includes('3')) {
                                    sum('LtoV');
                                    return 'V';
                                }
                                break;
                            case 'M':
                                if(f_search[1] >= 52) {
                                    sum('MtoO');
                                    return null;
                                } else {
                                    sum('MtoN');
                                    return null;
                                }
                                break;
                            case 'U':
                                if(countYamato() > 1) {
                                    sum('UtoJ2');
                                    return 'J2';
                                } else if(CL < 2) {
                                    sum('UtoJ2');
                                    return 'J2';
                                } else if(speed === '高速艦隊') {
                                    sum('UtoJ2');
                                    return 'J2';
                                } else if(CV + CVB > 0) {
                                    sum('UtoJ2');
                                    return 'J2';
                                } else if(Ds > 5) {
                                    sum('UtoV');
                                    return 'V';
                                } else if(CVL > 1) {
                                    sum('UtoJ2');
                                    return 'J2';
                                } else if(Ds > 3) {
                                    sum('UtoV');
                                    return 'V';
                                } else {
                                    sum('UtoJ2');
                                    return 'J2';
                                }
                                break;
                            case 'V':
                                if(f_names.includes('明石改') || f_names.includes('朝日改') || f_names.includes('秋津洲改') || f_names.includes('速吸改') || f_names.includes('神威改母') || f_names.includes('山汐丸改') || f_names.includes('宗谷')) {
                                    sum('VtoW');
                                    sum('WtoX');
                                    return 'X';
                                } else {
                                    sum('VtoX');
                                    return 'X';
                                }
                                break;
                            case 'X':
                                if(f_search[1] >= 84) {
                                    sum('XtoZ');
                                    return null;
                                } else {
                                    sum('XtoY');
                                    return null;
                                }
                                break;
                            case 'B':
                                if(active['58-4']['B'] === 'C') {
                                    sum('BtoC');
                                    return 'C';
                                } else {
                                    sum('BtoD');
                                    return 'D';
                                }
                                break;
                        }
                }
                break;
        }
    }

    //演算開始
    function startSim() {
        if(a_flag && f_flag) {
            area = localStorage.getItem('area');
            var elem = area.split('-');
            var world = Number(elem[0]);
            var map = Number(elem[1]);
            var edge = null;
            //無限ループ防止
            var safety = 0;
            var count = 0;
            while(count < 10000) {
                edge = branch(world, map, edge);
                if(edge === null) {
                    count++;
                    track = [];
                }
                safety++;
                if(safety > 150000) {
                    alert('無限ループ防止 バグった');
                    console.log('無限ループ');
                    console.log('以下諸元');
                    console.log(`海域 : ${world}-${map}`);
                    console.log('直後艦種');
                    console.log(com);
                    console.log('軌跡' + track);
                    console.log(`safety : ${safety}`);
                    console.log(`count : ${count}`);
                    console.log(`ドラム缶 : ${f_drum}`);
                    console.log(`電探 : ${f_radar}`);
                    console.log(`大発系 : ${f_craft}`);
                    console.log(`寒甲 : ${f_kanko}`);
                    console.log(`speed : ${speed}`);
                    console.log(rate);
                    console.log('終わり');
                    return;
                }
            }
            console.log('軌跡' + track);
            console.log(countYamato());
            drawMap();
            rate = {};
        }
    }

    //マップ描画
    function drawMap() {
        removePopupInfo();
        let map = map_info; //map.jsより
        var spots = map['spots'][area];
        var routes = map['route'][area];
        var elements = {
            nodes: [],
            edges: []
        };
        //nodes流し込み
        for (let key in spots) {
            if (spots.hasOwnProperty(key)) {
                //座標,マスの種類
                const [x, y, label] = spots[key];
                elements.nodes.push({
                    data: {id:key, name:key, label:label},
                    position: {x, y}
                });
            }
        }
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
                    'color': 'rgb(250,250,250)',
                    'font-weight': '100',
                    'text-outline-color': 'rgba(20,20,20)',
                    'text-outline-opacity': '.85',
                    'text-outline-width': '1.5px',
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'padding': '0pt',
                    'font-size': '15px',
                    'background-clip': 'none',//z-indexでedgesの下に潜り込ませるは上手くいかなかった
                }
            }, //マスの分類ごとに表示分岐
            { selector: 'node[label = "st"]', 
                 style: {
                     'background-image': '/media/nodes/start.png',
                     'font-weight': '600',
                     'text-outline-width': '2px',
                     'font-size': '20px',
                     'width': '48px',
                     'height': '48px',
                     'background-opacity': 0,
                     'background-position-x': '1px', //位置微調整
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "po"]', 
                 style: {
                     'background-image': '/media/nodes/port.png',
                     'width': '48px',
                     'height': '48px',
                     'background-opacity': 0,
                     'background-position-x': '2px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "bo"]', 
                 style: {
                     'background-image': '/media/nodes/boss.png',
                     'width': '48px',
                     'height': '48px',
                     'background-opacity': 0,
                     'background-position-x': '5px',
                     'background-position-y': '1px'
                 }
            },
            { selector: 'node[label = "ab"]', 
                 style: {
                     'background-image': '/media/nodes/air-b.png',
                     'width': '48px',
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '1px' //位置微調整
                 }
            },
            { selector: 'node[label = "ad"]', 
                 style: {
                     'background-image': '/media/nodes/air-d.png',
                     'width': '44px',
                     'height': '25px',
                     'background-opacity': 0,
                 }
            },
            { selector: 'node[label = "ac"]', 
                 style: {
                     'background-image': '/media/nodes/calm.png',
                     'border-width': 3, // ボーダーの太さ
                     'border-color': '#904A64',
                     'width': '27px',
                     'height': '27px',
                     'background-position-x': '0px',
                     'background-position-y': '-1px',
                 }
            },
            { selector: 'node[label = "en"]', //基本設定
                 style: {
                     'background-image': '/media/nodes/enemy.png',  //サイズ27px x 27px
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "ca"]', 
                 style: {
                     'background-image': '/media/nodes/calm.png',
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "wh"]', 
                 style: {
                     'background-image': '/media/nodes/whirl.png',
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "re"]', 
                 style: {
                     'background-image': '/media/nodes/resource.png',
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "ni"]', 
                 style: {
                     'background-image': '/media/nodes/night.png',
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
                 }
            },
            { selector: 'node[label = "sc"]', 
                 style: {
                     'background-image': '/media/nodes/scout.png',
                     'width': '27px', //enemy系
                     'height': '27px',
                     'background-opacity': 0,
                     'background-position-x': '-0.5px',
                     'background-position-y': '-1px'
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
                    'line-color': 'rgb(220,20,60)',
                    'target-arrow-color': 'rgb(220,20,60)',
                }
            },
            { selector: 'edge[ratio < 100][ratio >= 80]', 
                style: {
                    'line-color': 'rgb(255,99,71)',
                    'target-arrow-color': 'rgb(255,99,71)',
                }
            },
            { selector: 'edge[ratio < 80][ratio >= 60]', 
                style: {
                    'line-color': 'rgb(255,165,0)',
                    'target-arrow-color': 'rgb(255,165,0)',
                }
            },
            { selector: 'edge[ratio < 60][ratio >= 40]', 
                style: {
                    'line-color': 'rgb(255,215,0)',
                    'target-arrow-color': 'rgb(255,215,0)',
                }
            },
            { selector: 'edge[ratio < 40][ratio >= 20]', 
                style: {
                    'line-color': 'rgb(255,215,0)',
                    'target-arrow-color': 'rgb(255,215,0)',
                }
            },
            { selector: 'edge[ratio < 20][ratio > 0]', 
                 style: {
                     'line-color': 'rgb(240,230,140)',
                     'target-arrow-color': 'rgb(240,230,140)',
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
        cy = cytoscape({ 
            // #cyに生成
            container: document.getElementById('cy'),
            elements: elements,
            style: style,
            layout:layout,
            autoungrabify: true, //nodeのドラッグ不可
            userZoomingEnabled: false
        });
        //更新
        drew_area = area;
        console.log(`drew_area : ${drew_area}`);
        let node = null;
        cy.on('mousedown', function (e) {
            let tar = e.target;
            if(tar.data('name')) {
                let node = tar.data('name');
                let nodeData = map['spots'][drew_area][node];
                let n_length = nodeData.length;
                //Phase
                //2023夏はフェイズごとに記述したが以降は分からない
                let b_area = null;
                if(active.hasOwnProperty(drew_area)) {
                    if(active[drew_area].hasOwnProperty('1') && drew_area.includes('57')) {
                        console.log('check1');
                        b_area = branch_info[`${drew_area}-${active[drew_area]['1']}`];
                    } else {
                        b_area = branch_info[drew_area];
                    }
                } else {
                    b_area = branch_info[drew_area];
                }
                if(b_area.hasOwnProperty(node)) {
                    if($('#popup-info')) {
                        $('#popup-info').remove();
                    }
                    //クリックした座標(cy基準)
                    let position = tar.renderedPosition();
                    // cy領域の左上の座標を取得
                    var cyContainer = cy.container().getBoundingClientRect();

                    let text = b_area[node];
                    //改行、赤字置換
                    text = text.replaceAll('$e', '<br>');
                    text = text.replaceAll('$co', '<span style="color:red;">');
                    text = text.replaceAll('$oc', '</span>');
                    text = text.replaceAll('$bo', '<span style="font-weight:bold;">');
                    text = text.replaceAll('$ob', '</span>');
                    text = text.replaceAll('$sw', `<button class="design-button remote-active" value="${drew_area}-${node}" style="padding:3px 15px;margin-left:5px;">切替</button>`);
                    text = text.replaceAll('$or', `<a href="https://x-20a.github.io/reference/?topic=${drew_area}-${node}" style="color:blue;" target="_blank" rel="noopener noreferrer">`);
                    text = text.replaceAll('$ro', '</a>');
                    text = `<p>${text}</p>`;
                    let popup = $('<div>').html(text).attr('id', 'popup-info');
                    let top = position.y + cyContainer.top - 10;
                    let left = position.x + cyContainer.left + 20;
                    if(position.x >= 650) {
                        left = position.x + cyContainer.left - 240;
                    }
                    // レイアウト
                    popup.css({
                        fontSize:'13px',
                        width:'210px',
                        position: 'absolute',
                        top: top + 'px',
                        left: left + 'px',
                        background: '#fff',
                        padding: '6px',
                        border: '1px solid #000',
                        borderRadius: '4px',
                        boxShadow: '0 0 4px rgba(0, 0, 0, 0.5)',
                        zIndex:1000
                    });
                    // 表示
                    $('body').append(popup);
                } else {
                    removePopupInfo();
                }
            } else {
                removePopupInfo();
            }
        });
        //図上スクロールをページスクロールに変換
        $('#cy').on('wheel', function(e){
            e.preventDefault();
            e.stopPropagation();
            var delta = e.originalEvent.deltaY;
            //がくつくけどsmoothにすると連続スクロール時にもたる
            window.scrollBy(0, delta);
        });
    }
    //popup-infoが存在すれば削除
    function removePopupInfo() {
        if($('#popup-info')) {
            $('#popup-info').remove();
        }
    }
    //読み込み時にlocalstorageから諸々の設定を読込、反映
    //上に置くとtrigger()が不発する 謎
    setup();
    
    //以下ストレージ関連
    function setup() {
        var a = localStorage.getItem('active');
        var f = localStorage.getItem('fleet');
        //var ks = localStorage.getItem('ks');
        //能動分岐セット
        if(!a) {
            a = active;
            localStorage.setItem('active', JSON.stringify(a));
        } else {
            try {
                a = JSON.parse(a);
                //全てのキーが存在するかチェック
                //無いのがあればそこだけ初期値を設定
                for (const key in active) {
                    if (!a.hasOwnProperty(key)) {
                        a[key] = active[key];
                    }
                }
                localStorage.setItem('active', JSON.stringify(a));
            } catch(e) {
                alert('データ異常:当該データを初期化します');
                a = active;
                localStorage.setItem('active', JSON.stringify(a));
            }
        }
        //html反映
        for(const key in a) {
            for(const key2 in a[key]) {
                var val = a[key][key2];
                var name = key + '-' + key2;
                $('input[name="' + name + '"][value="' + val + '"]').prop('checked', true);
                active = a;
            }
        }
        //html反映
        var ar = localStorage.getItem('area');
        if(ar) {
            $('#area-display').text(`海域 : ${ar}`);
            setArea(ar);
        }
        //艦隊セット
        if(f) {
            //艦隊は文字列のまま貼る
            $('#fleet-import').val(f);
            $('#fleet-import').trigger('input');
        }
        /*キーボードショートカットON/OFF
        if(ks) {
            if(ks === '1') {
                $('#ks').toggleClass('checked');
            }
        } */
    }

    /*
        key:海域
        char:node
        value:値
        変数、ストレージ双方更新
    */
    function updateActive(key, char, value) {
        var elem = localStorage.getItem('active');
        if(elem) {
            elem = JSON.parse(elem);
            elem[key][char] = value;
        } else {
            elem = active;
            elem[key][char] = value;
        }
        active = elem;
        localStorage.setItem('active', JSON.stringify(elem));
    }
    //localStorageのデータをキーを指定して削除
    function removeData(key) {
        localStorage.removeItem(key);
    }
    //localStorage内を全削除
    function allClear() {
        let res = confirm('本当に?\n特に問題はありませんが');
        if(res) {
            //ローカルストレージ全削除
            localStorage.clear();
            //リロード
            location.reload();
        }
    }
    //popupから能動分岐切り替え
    $('body').on('click', '.remote-active', function() {
        let name = $(this).val();
        let inputs = $(`input[name="${name}"]`);
        if(inputs.eq(0).prop('checked')) {
            inputs.eq(1).prop('checked', true);
            inputs.eq(1).trigger('input');
        } else {
            inputs.eq(0).prop('checked', true);
            inputs.eq(0).trigger('input');
        }
    });
    //海域入力画面表示
    $('#area-display').on('click', function() {
        $('#area-mask').css('display', 'block');
        $('#area-container').css('display', 'flex');
        $('#area-box').css('display', 'block');
    });
    //設定画面非表示
    $('#area-container').on('click', function() {
        $('#area-mask').css('display', 'none');
        $('#area-container').css('display', 'none');
    });
    //バブリング阻止
    $('#area-box').on('click', function(e) {
        e.stopPropagation();
    });
    //設定画面表示
    $('#conf-icon-box').on('click', function() {
        $('#conf-mask').css('display', 'block');
        $('#conf-container').css('display', 'flex');
        $('#conf-box').css('display', 'block');
    });
    //設定画面非表示
    $('#conf-container').on('click', function() {
        $('#conf-mask').css('display', 'none');
        $('#conf-container').css('display', 'none');
    });
    //バブリング阻止
    $('#conf-box').on('click', function(e) {
        e.stopPropagation();
    });
    // マウスオーバー時に索敵注意書きを表示
    $('body').on('mouseover', '#asterisk', function() {
        $('#seek-message').show();
    });
    // マウスリーブ時にメッセージを非表示
    $('body').on('mouseleave', '#asterisk', function() {
        $('#seek-message').hide();
    });
    //localstorage全削除
    $('#all-clear').on('click', function() {
        allClear();
    });
    //オプションリスト折り畳み/展開
    $('#fold').on('click', function() {
        let isFolding = $(this).children('#option-up').css('display') === 'none';
        var listContainer = $('#option-box > .options:visible');
        if (isFolding) {
            $(this).children('#option-down').css('display', 'none');
            $(this).children('#option-up').css('display', 'block');
            listContainer.css('height', '');
        } else {
            $(this).children('#option-up').css('display', 'none');
            $(this).children('#option-down').css('display', 'block');
            listContainer.css('height', '23px');
        }
    });
    //スクショ
    $('#screen-shot').on('click', function() {
        if(drew_area) {
            var now = new Date();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            // 二桁の形式に変換
            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            var time = `${hours}${minutes}`;
            let fileName = `${drew_area}_${time}`;
            const deck = generateDeck();
            console.log(deck);
            //gkcoi出力
            let g_speed = getFleetSpeedWithNum(speed);
            generate(deck, g_speed, f_search).then((canvas) => {
                let g_blob = getGkcoiBlob(canvas);
                let cy_blob = getCyBlob();
                combineAndDownloadBlobs(cy_blob, g_blob, fileName);
            }).catch((error) => {
                console.error(error);
            });
        }
    });
    //gkcoiに渡すデッキビルダー生成
    function generateDeck() {
        let res = {
            lang: "jp",
            theme: "dark",
            hqlv: i_json.hqlv
        };
        if(selected_type < 5) {
            desF(selected_type);
        } else {
            desF(1);
            desF(2);
        }
        function desF(num) {
            let n = 1; //deckに設定するf
            if(num === 2) {
                n = 2;
            }
            let s_length = f_length - f2_length;
            if(num === 2) {
                s_length =  f2_length;
            }
            let f = {};
            for(let i = 0;i < s_length;i++) {
                let s_id = i_json[`f${num}`][`s${i + 1}`]['id'];
                let i_ship = i_json[`f${num}`][`s${i + 1}`];
                let s_ship = s_data.find((item) => item.id === s_id + '');
                let hp = s_ship.hp;
                let lv = i_ship.lv;
                let asw = getLFparam(s_ship, lv, 'ass');
                let los = getLFparam(s_ship, lv, 'seek');
                let luck = i_ship.luck;
                let ship = {
                    id: s_id,
                    lv: lv,
                    hp: hp,
                    fp: 0,
                    tp: 0,
                    aa: 0,
                    ar: 0,
                    asw: asw,
                    ev: 0,
                    los: los,
                    luck: luck
                };
                let i_length = Object.keys(i_ship.items).length;
                let items = {};
                let j = 1;
                for(let key in i_ship.items) {
                    let name = `i${j}`;
                    if(key === 'ix') {
                        name = 'ix';
                    }
                    items[name] = {
                        id: i_ship.items[key].id,
                        rf: i_ship.items[key].rf,
                        mas: 7
                    }
                    j++;
                }
                ship.items = items;
                f[`s${i + 1}`] = ship;
            }
            res[`f${n}`] = f;
        }
        return res;
    }
    //一次関数的に上昇するパラメータを計算して返す
    //引数s_dataのjson,パラメータ名
    function getLFparam(ship, lv, param) {
        let max = ship[`max_${param}`];
        let min = ship[param];
        let res = new Decimal(max).minus(min).times(lv).div(99).floor().plus(min);
        return parseInt(res);
    }
    // cytoscapeのblob取得
    function getCyBlob() {
        let blob = cy.jpg({
            maxWidth:1293,
            quality:1,
            output: 'blob',
            full: true,
            bg:'#212121'
        });
        return blob;
    }
    // Canvasをblobで取得
    function getGkcoiBlob(canvas) {
        // CanvasからBase64形式の画像データを取得
        const dataUrl = canvas.toDataURL('image/jpeg');
        // Base64形式のデータからBlobオブジェクトを作成
        return dataURItoBlob(dataUrl);
    }
    // Data URIをBlobオブジェクトに変換
    function dataURItoBlob(dataURI) {
        const byteString = atob(dataURI.split(',')[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: 'image/jpeg' });
    }
    //blobから画像を生成して上限に連結(img1が上)幅はimg1に合わせる
    function combineAndDownloadBlobs(blob1, blob2, fileName) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        // 入力Blobの高さを取得
        var b1_height, b2_height;
        // BlobのためのImage要素を作成
        var img1 = new Image();
        var img2 = new Image();
        // 1つ目の画像の読み込みが完了したときの処理
        img1.onload = function() {
            b1_height = img1.height;
            // 2つ目の画像の読み込みが完了したときの処理
            img2.onload = function() {
                b2_height = img2.height;
                // 2つの画像の幅を比較し、大きい方に合わせる
                var max_width = Math.max(img1.width, img2.width);
                canvas.width = max_width;
                canvas.height = b1_height + b2_height;
                // 画像を描画
                context.drawImage(img1, 0, 0, max_width, b1_height);
                context.drawImage(img2, 0, b1_height, max_width, b2_height);
                var combinedImage = canvas.toDataURL(); // 画像をDataURLに変換
                var a = document.createElement('a');
                a.href = combinedImage;
                a.download = `${fileName}.jpg`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // BlobのURLを解放
                URL.revokeObjectURL(img1.src);
                URL.revokeObjectURL(img2.src);
            };
            // 2つ目の画像を読み込む
            img2.src = URL.createObjectURL(blob2);
        };
        // 1つ目の画像を読み込む
        img1.src = URL.createObjectURL(blob1);
    }
    //数値から艦隊速度を文字列で取得
    function getFleetSpeedWithNum(text) {
        let res = 0;
        switch(text) {
            case '低速艦隊':
                res = 5;
                break;
            case '高速艦隊':
                res = 10;
                break;
            case '高速+艦隊':
                res = 15
                break;
            case '最速艦隊':
                res = 20;
                break;
        }
        return res;
    }
});
