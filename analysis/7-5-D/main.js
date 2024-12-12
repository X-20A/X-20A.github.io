$(function() {
    let sortie_data = null;
    let map_info = null;
    let area = '';
    let node = '';
    let e_arr = [];
    let completed = false;

    node = extractCodeFromUrl();
    console.log(`node : ${node}`);

    if(node) {
        area = node.match(/^(\d+-\d+)/)[1];
        loadDataSequentially();
    }

    async function loadData(i) {
        var path = `https://firebasestorage.googleapis.com/v0/b/sortie-storage.appspot.com/o/${node}%2Fentries_${i}.json?alt=media`;
        try {
            const json = await $.getJSON(path);
            if (i === 1) {
                sortie_data = json;
                e_arr = await e_arr.concat(json.result.entries);
                area = sortie_data.result.entries[0].map;
                const map_json = await $.getJSON(`https://firebasestorage.googleapis.com/v0/b/sortie-storage.appspot.com/o/${node}%2F${area}.json?alt=media`);
                map_info = map_json.result.route;
            } else {
                e_arr = await e_arr.concat(json.result.entries);
            }
        } catch (error) {
            console.log('許容エラー:', error);
            console.log('読込終了');
            if (sortie_data && map_info) {
                sortie_data.result.entries = e_arr;
            }
            completed = true; // ループを抜けるフラグを設定
        }
    }
    async function loadDataSequentially() {
        for (let i = 1; i < 50; i++) {
            await loadData(i);
            if (completed) {
                break;
            }
        }
        startProcess();
    }

    function displayInfo(e_length, c_length, first, last) {
        $('#info-container').css('display', 'block');
        $('#wait-message').css('display', 'none');
        $('#node').text(`node : ${node}`);
        $('#total').text(`Total sortie : ${e_length}`);
        $('#date-span').text(`${convertDateTime(first)} ～ ${convertDateTime(last)}`);
        let color = 'red';
        if (!c_length) {
            color = '#4ae325';
        }
        $('#count').html(`<span style="color:${color};">${c_length}</span> / ${e_length}`);
    }
    async function startProcess() {
        let entries = sortie_data.result.entries;
        let e_length = entries.length;
        let ces = await startSim(sortie_data, map_info);
        //反例を表示
        let c_length = ces.length;
        if (c_length) {
            let unmatch = openList(entries, ces, 40, true);
            $('#counterexample-list').append(unmatch);
            let matchList = excludeElements(e_length, ces.map(subArray => subArray[0]));
            let match = openList(entries, matchList, 10, false);
            $('#match-list').append(match);
        }
        let last = entries[0].datetime;
        let first = entries[e_length - 1].datetime;
        displayInfo(e_length, c_length, first, last);
    }

    function openList(entries, list, max, isCe) {
        let html = '';
        let iterations = 0;
        for (let i = 0; i < list.length && iterations < max; i++) {
            html += '<div class="list-item">';
            let fleet = null;
            if (isCe) {
                fleet = entries[list[i][0]];
            } else {
                fleet = entries[list[i]];
            }
            let f1_length = fleet.fleet1.length;
            let f2_length = fleet.fleet2.length;
            let fleet1 = fleet.fleet1;
            let fleet2 = fleet.fleet2;
            let f1_names = [];
            let f2_names = [];
            for (var q = 0; q < f1_length; q++) {
                f1_names.push(fleet1[q].name);
            }
            for (var q = 0; q < f2_length; q++) {
                f2_names.push(fleet2[q].name);
            }
            if (isCe) {
                html += createRouteHtml(list[i][1], getRoute(fleet));
            } else {
                html += createRouteHtml(null, getRoute(fleet));
            }
            html += `<p>${getFleetType(fleet)} | ${getFleetSpeed(fleet)}</p>`;
            let los = getLos(fleet);
            for (let i = 0; i < 4; i++) {
                html += `<span style="font-weight:600;">${i + 1}</span><span>:${los[i]} </span>`;
            }
            if (fleet.radars) {
                html += `<p>radars:${fleet.radars} | radarShips:${fleet.radarShips} | radars5los:${fleet.radars5los} | radarShips5los:${fleet.radarShips5los}</p>`;
            } else {
                html += `<p>radars:0 | radarShips:0 | radars5los:0 | radarShips5los:0</p>`;
            }
            html += createListHtml(f1_names);
            if (f2_length) {
                html += createListHtml(f2_names);
            }
            html += getShipTypes(fleet, 1);
            if (f2_length) {
                html += getShipTypes(fleet, 2);
            }
            html += '</div><hr>';
            iterations++;
        }
        html += '</div>';
        return html;
    }

    function createRouteHtml(sim_route, db_route) {
        db_route = cutOffCheckPoint(db_route);
        db_route = cutOffEndPoints(db_route);
        let res = '';
        if (sim_route) {
            res += `<p>sim : ${sim_route} | db : ${db_route}</p>`;
        } else {
            res += `<p>db : ${db_route}</p>`;
        }

        return res;
    }
    function createListHtml(names) {
        let res = '<p>';
        for (name of names) {
            res += name + ' ';
        }
        res += '</p>';
        return res;
    }
    function getShipTypes(fleet, num) {
        let res = '<p>';
        let types = null;
        if (num === 1) {
            types = fleet.fleetOneTypes;
        } else {
            types = fleet.fleetTwoTypes;
        }
        let elem = [];
        for (type of types) {
            switch (type) {
                case 1:
                    elem.push('DE');
                    break;
                case 2:
                    elem.push('DD');
                    break;
                case 3:
                    elem.push('CL');
                    break;
                case 4:
                    elem.push('CLT');
                    break;
                case 5:
                    elem.push('CA');
                    break;
                case 6:
                    elem.push('CAV');
                    break;
                case 7:
                    elem.push('CVL');
                    break;
                case 8:
                    elem.push('FBB');
                    break;
                case 9:
                    elem.push('SBB');
                    break;
                case 10:
                    elem.push('BBV');
                    break;
                case 11:
                    elem.push('CV');
                    break;
                case 13:
                    elem.push('SS');
                    break;
                case 14:
                    elem.push('SSV');
                    break;
                case 16:
                    elem.push('AV');
                    break;
                case 17:
                    elem.push('LHA');
                    break;
                case 18:
                    elem.push('CVB');
                    break;
                case 19:
                    elem.push('AR');
                    break;
                case 20:
                    elem.push('AS');
                    break;
                case 21:
                    elem.push('CT');
                    break;
                case 22:
                    elem.push('AO');
                    break;
            }
        }
        for (type of elem) {
            res += `<span class="types">${type}</span>`;
        }
        res += '</p>';
        return res;
    }
    //反例以外のを配列で取得
    function excludeElements(maxNumber, excludeArray) {
        // 0からmaxNumberまでの連続する整数の配列を生成
        const allNumbers = Array.from({ length: maxNumber }, (_, index) => index);

        // excludeArrayに含まれない要素だけを残す
        const resultArray = allNumbers.filter(number => !excludeArray.includes(number));

        return resultArray;
    }
    //urlパラメータから任意の値を取得
    function getParam(name) {
        // URLからクエリ文字列を取得
        var queryString = window.location.search.substring(1);
        // クエリ文字列をパラメータごとに分割
        var parameters = queryString.split("&");
        // 各パラメータを走査して目的のパラメータを見つける
        for (var i = 0; i < parameters.length; i++) {
            var parameter = parameters[i].split("=");
            // パラメータが見つかった場合はその値を返す
            if (parameter[0] === name) {
                return decodeURIComponent(parameter[1]);
            }
        }
        return null;
    }
    //urlから最後のディレクトリを取得
    function extractCodeFromUrl() {
        // URLをスラッシュで分割
        var parts = location.href.split('/');

        // 配列の最後の要素を取得
        var lastPart = parts[parts.length - 2];
        return lastPart;
    }

    // テスト用例
    var url = 'https://x-20a.github.io/analysis/7-5-D/';
    var code = extractCodeFromUrl(url);
    console.log(code); // 出力: 7-5-D


    //2023-10-11T02:10:37.344968 を 2023-10-11 11:10
    function convertDateTime(dateTimeString) {
        const dateTime = new Date(dateTimeString);
        const formattedDateTime = dateTime.toISOString().slice(0, 16).replace("T", " ");
        return formattedDateTime;
    }
});
