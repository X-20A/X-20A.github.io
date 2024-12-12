map_info = null;
//Use these variables to assemble the branch conditions
//The initial value is assigned, but the information of the fleet is actually reflected sequentially.
let f1_length = 0;
let f2_length = 0;
let f_length = 0; //f1_length + f2_length
let f1_names = [];
let f2_names = [];
let f_names = []; //f1_names concat f2_names
let f_type = ''; //通常艦隊 || 遊撃部隊 || 空母機動部隊 || 水上打撃部隊 || 輸送護衛部隊
let f_speed = ''; //低速艦隊 || 高速艦隊 || 高速+艦隊 || 最速艦隊
let los = []; //specify in 0-3
let radars = 0;
let radar_carriers = 0;
let los5radars = 0;
let los5radar_carriers = 0;
let sortied_fleet = 0;

let DD = 0;
let DE = 0;
let CL = 0;
let CLT = 0;
let CA = 0;
let CAV = 0;
let CVL = 0;
let FBB = 0;
let SBB = 0;
let BBV = 0;
let CV = 0;
let SS = 0;
let SSV = 0;
let AV = 0;
let LHA = 0;
let CVB = 0;
let AR = 0;
let AS = 0;
let CT = 0;
let AO = 0;

let BB = 0; //FBB + SBB
let BBs = 0; //BB + BBV
let CVs  = 0; //CV + CVB + CVL
let BBCVs = 0; //BBs + CVs
let CAs = 0; //CA + CAV
let Ds = 0; //DD + DE
let Ss = 0 //SS + SSV


//start of manual section
let check_point = 'D'; //Input if you want to ignore earlier nodes.※Not a sortie point.
let end_points = ['F']; //List of the end points that can be reached
function branch(node) {
    switch(node) {
        case null:
            if (f_speed === '最速艦隊') {
                return 'F';
            }
            if (CV + CVB >= 2) {
                return ['E', 'F'];
            }
            if (CVL >= 3) {
                return ['E', 'F'];
            }
            if (BBs + CAs >= 3) {
                return ['E', 'F'];
            }
            if (BBs + CV + CVB + CAs >= 3) {
                return ['E', 'F'];
            }
            if (CL + DD === 0) {
                return ['E', 'F'];
            }
            if (f_speed === '高速+艦隊') {
                return 'F';
            }
            if (DD + DE >= 3) {
                return 'F';
            }
            if (BBs <= 1) {
                return 'F';
            }
            if (DD + DE <= 1) {
                return ['E', 'F'];
            }
            if (f_speed === '低速艦隊') {
                return ['E', 'F'];
            }
            if (BBs + CVL >= 3) {
                return 'F';
            }

            return 'F';

            break;
    }
}
//end of manual section


//反例を enriesのindex配列、sim_route配列をリストで返す [[index],[sim_route]]
async function startSim(sortie_data, map_data) {
    map_info = map_data;
    let res = [];
    console.log(sortie_data);
    let fleet_list = sortie_data.result.entries;
    let list_length = fleet_list.length;
    let index = [];
    let route_list = [];
    for(let i = 0;i < list_length;i++) {
        let fleet = fleet_list[i];
        //変数セット
        setData(fleet);
        //data側の航路
        let db_route = getRoute(fleet);
        let node = null;
        let sim_route = [];
        let safe_count = 0;
        while(safe_count < 25) {
            try {
                sim_route = sim_route.concat(branch(node)); 
            } catch(e) {
                console.error(e);
                alert('An error occurred with the branch function');
                debugFleet(i);
                return;
            }
            //sim_routeの最後の要素をnodeに指定
            node = sim_route[sim_route.length - 1];
            //設定した終着マスがあればbreak
            if(sim_route.some(value => end_points.includes(value))) {
                break;
            }
            //無限ループ防止
            safe_count++;
            if(safe_count > 20) {
                sim_route.concat('∞');
                break;
            }
        }
        //反例を見つけたらindexとsim_routeをそれぞれの配列に追加
        //check_point以前とend_points以後を切り落とし
        db_route = cutOffCheckPoint(db_route);
        db_route = cutOffEndPoints(db_route);
        if(JSON.stringify(db_route) !== JSON.stringify(sim_route)) {
            let elem = [i, sim_route];
            res.push(elem);
        }
        iniG();
    }
    return res;
}
//グローバル変数に必要なデータをセット
function setData(fleet) {
    f1_length = fleet.fleet1.length;
    f2_length = fleet.fleet2.length;
    f_length = f1_length + f2_length;
    let fleet1 = fleet.fleet1;
    let fleet2 = fleet.fleet2;
    for(var i = 0;i < f1_length;i++) {
        f1_names.push(fleet1[i].name);
    }
    for(let i = 0;i < f2_length;i++) {
        f2_names.push(fleet2[i].name);
    }
    f_names = f1_names.concat(f2_names);
    los = getLos(fleet);
    f_speed = getFleetSpeed(fleet);
    f_type = getFleetType(fleet);
    setShipType(fleet.fleetOneTypes);
    if(fleet.fleetType) {
        setShipType(fleet.fleetTwoTypes);
    }
    if(fleet.radars) {
        radars = fleet.radars;
        radar_carriers = fleet.radarShips;
        los5radars = fleet.radars5los;
        los5radar_carriers = fleet.radarShips5los;
    }
    sortied_fleet = fleet.sortiedFleet;
}
//グローバル変数初期化
function iniG() {
    f1_length = 0;
    f2_length = 0;
    f_length = 0;
    f1_names = [];
    f2_names = [];
    f_names = [];
    f_type = '';
    f_speed = '';
    los = [];
    radars = 0;
    radar_carriers = 0;
    los5radars = 0;
    los5radar_carriers = 0;
    sortied_fleet = 0;

    DD = 0;
    DE = 0;
    CL = 0;
    CLT = 0;
    CA = 0;
    CAV = 0;
    CVL = 0;
    FBB = 0;
    SBB = 0;
    BBV = 0;
    CV = 0;
    SS = 0;
    SSV = 0;
    AV = 0;
    LHA = 0;
    CVB = 0;
    AR = 0;
    AS = 0;
    CT = 0;
    AO = 0;

    BB = 0;
    BBs = 0;
    CVs  = 0;
    BBCVs = 0;
    CAs = 0;
    Ds = 0;
    Ss = 0;
}
//グローバル変数に艦種を反映
function setShipType(types) {
    for(type of types) {
        switch(type) {
            case 1:
                DE++;
                break;
            case 2:
                DD++;
                break;
            case 3:
                CL++;
                break;
            case 4:
                CLT++;
                break;
            case 5:
                CA++;
                break;
            case 6:
                CAV++;
                break;
            case 7:
                CVL++;
                break;
            case 8:
                FBB++;
                break;
            case 9:
                SBB++;
                break;
            case 10:
                BBV++;
                break;
            case 11:
                CV++;
                break;
            case 12: //超弩級戦艦
                break;
            case 13:
                SS++;
                break;
            case 14:
                SSV++;
                break;
            case 15: //輸送艦 まみいら
                break;
            case 16:
                AV++;
                break;
            case 17:
                LHA++;
                break;
            case 18:
                CVB++;
                break;
            case 19:
                AR++;
                break;
            case 20:
                AS++;
                break;
            case 21:
                CT++;
                break;
            case 22:
                AO++;
                break;
        }
    }
    BB = FBB + SBB;
    BBs = BB + BBV;
    CVs  = CV + CVB + CVL;
    BBCVs = BBs + CVs;
    CAs = CA + CAV;
    Ds = DD + DE;
    Ss = SS + SSV;
}
//艦隊種別取得
function getFleetType(fleet) {
    let elem = '通常艦隊';
    if(fleet.fleet1.length === 7) {
        elem = '遊撃部隊';
    } else {
        if(fleet.fleetType) {
            let type = fleet.fleetType;
            if(type === 1) {
                elem = '空母機動部隊';
            } else if(type === 2) {
                elem = '水上打撃部隊';
            } else if(type === 3) {
                elem = '輸送護衛部隊';
            }
        } else {
            elem = '通常艦隊';
        }
    }
    return elem;
}
//艦隊速度取得
function getFleetSpeed(fleet) {
    let res = '';
    let s_elem = fleet.fleetSpeed;
    if(s_elem === 5) {
        res = '低速艦隊';
    } else if(s_elem === 10) {
        res = '高速艦隊';
    } else if(s_elem === 15) {
        res = '高速+艦隊';
    } else {
        res = '最速艦隊';
    }
    return res;
}
//edgeIdをmap_infoと突き合わせて航路を取得
function getRoute(fleet) {
    let arr = [];
    let edgeId = fleet.edgeId;
    //突っ込んでから重複削除
    for(id of edgeId) {
        arr.push(map_info[id][0]);
        arr.push(map_info[id][1]);
    }
    return [...new Set(arr)];
}
function getLos(fleet) {
    let res = [];
    for(var i = 0;i < 4;i++) {
        res.push(Math.floor(fleet.los[i] * 10) / 10);
    }
    return res;
}
//check_point以前のdb_routeを削除
function cutOffCheckPoint(arr) {
    const index = arr.indexOf(check_point);
    // 指定された文字列が見つかった場合
    if (index !== -1) {
        // 指定された文字列以前の要素を削除
        arr.splice(0, index + 1);
    }
    return arr;
}
function cutOffEndPoints(arr) {
    for(point of end_points) {
        const index = arr.indexOf(point);
        // 指定された文字列が見つかった場合
        if (index !== -1) {
            // 指定された文字列以前の要素を削除
            arr.splice(index + 1);;
        }
    }
    return arr;
}
//艦隊情報出力
function debugFleet(num) {
    num++;
    console.log(`fleet ${num} start of info`);
    console.log(`f1_length : ${f1_length}`);
    console.log(`f2_length : ${f2_length}`);
    console.log(`f_length : ${f_length}`);
    console.log(`f1_names : ${f1_names}`);
    console.log(`f2_names : ${f2_names}`);
    console.log(`f_names : ${f_names}`);
    console.log(`f_type : ${f_type}`);
    console.log(`f_speed : ${f_speed}`);
    console.log(`los : ${los}`);
    console.log(`radars : ${radars}`);
    console.log(`radar_carriers : ${radar_carriers}`);
    console.log(`los5radars : ${los5radar_carriers}`);
    console.log(`sortied_fleet : ${sortied_fleet}`);
    console.log(`DD : ${DD}`);
    console.log(`DE : ${DE}`);
    console.log(`CL : ${CL}`);
    console.log(`CLT : ${CLT}`);
    console.log(`CA : ${CA}`);
    console.log(`CAV : ${CAV}`);
    console.log(`CVL : ${CVL}`);
    console.log(`FBB : ${FBB}`);
    console.log(`SBB : ${SBB}`);
    console.log(`BBV : ${BBV}`);
    console.log(`CV : ${CV}`);
    console.log(`SS : ${SS}`);
    console.log(`SSV : ${SSV}`);
    console.log(`AV : ${AV}`);
    console.log(`LHA : ${LHA}`);
    console.log(`CVB : ${CVB}`);
    console.log(`AR : ${AR}`);
    console.log(`AS : ${AS}`);
    console.log(`CT : ${CT}`);
    console.log(`AO : ${AO}`);
    console.log(`BB : ${BB}`);
    console.log(`BBs : ${BBs}`);
    console.log(`CVs : ${CVs}`);
    console.log(`BBCVs : ${BBCVs}`);
    console.log(`CAs : ${CAs}`);
    console.log(`Ds : ${Ds}`);
    console.log(`Ss : ${Ss}`);
    console.log(`fleet ${num} end of info`);
}