$(function () {
    const cdn = 'https://cdn.jsdelivr.net/gh/X-20A/X-20A.github.io@main';
    const fuel_icon = `${cdn}/media/items/fuel.png`;
    const steel_icon = `${cdn}/media/items/steel.png`;

    $('#import').on('input', function () {
        let text = $(this).val();
        let deck = null;
        try {
            deck = JSON.parse(text);
        } catch (e) {
            return; // 何もしない
        }
        
        let html = '';
        for(let i = 1;i < 5;i++) { // 艦隊単位
            if(deck['f' + i]) {
                const fleet = deck['f' + i];
                for (let q = 1; q < 12; q++) { // 艦単位
                    if (fleet['s' + q]) {
                        const ship = fleet['s' + q];

                        const id = Number(ship.id); // 制空シミュ以外からだと文字列だったりする
                        const lv = Number(ship.lv);

                        const ship_data = s_data.filter(item => item.id === id)[0]; // s_dataはship.jsより
                        if(!ship_data) {
                            alert('未対応の艦が含まれるかも？');
                            return;
                        }
                        const name = ship_data.name;
                        const type = ship_data.type;
                        const fuel = ship_data.fuel;
                        const mag = getMag(type);

                        // 制空シミュのデッキビルダーにはhpがあるが他からは分からない
                        let hp = ship_data.hp;
                        if (lv > 99) {
                            hp = ship_data.hp2;
                        }
                        if (ship.hp) {
                            hp = ship.hp;
                        }

                        const min_time = calcTime(lv, mag, 1);
                        const max_time = calcTime(lv, mag, hp - 1);

                        const min_cost = calcCost(fuel, 1, true);
                        const max_cost = calcCost(fuel, hp - 1, false);

                        const num = q - 1;

                        html += `
                            <div class="list-items">
                                <span style="flex: 1;" class="ship-names">${name}</span>
                                <span style="flex: 1;">${lv}</span>
                                <div style="flex: 2;">
                                    <p>${min_time}</p>
                                    <div class="cost-box">
                                        <img src="${fuel_icon}" class="resource-icons"><span>${min_cost.fuel}</span>
                                        <img src="${steel_icon}" class="resource-icons"><span>${min_cost.steel}</span>
                                    </div>
                                </div>
                                <div style="flex: 2;">
                                    <p>x${hp - 1}</p>
                                    <p>${max_time}</p>
                                    <div class="cost-box">
                                        <img src="${fuel_icon}" class="resource-icons"><span>${max_cost.fuel}</span>
                                        <img src="${steel_icon}" class="resource-icons"><span>${max_cost.steel}</span>
                                    </div>
                                </div>
                                <div style="flex: 2;">
                                    <div>
                                        x<input type="number" min="1" max="${hp - 1}" value="1" data-info='{"num": ${num}, "lv": ${lv}, "mag": ${mag}, "fuel": ${fuel}}' class="custom-damage">
                                    </div>
                                    <div>
                                        <p class="custom-damage-time" data-num="${num}">${min_time}</p>
                                        <div class="cost-box">
                                            <img src="${fuel_icon}" class="resource-icons"><span class="custom-damage-fuel" data-num="${num}">${min_cost.fuel}</span>
                                            <img src="${steel_icon}" class="resource-icons"><span class="custom-damage-steel" data-num="${num}">${min_cost.steel}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `; // .cost-boxのとこは関数化してもよかったかも
                    } else {
                        break;
                    }
                }
            }
        }
        $('#result-list').empty();
        $('#result-list').prepend(html);
        $(this).val(''); // 空欄化
    });

    // 任意値
    $('#result-list').on('input', '.custom-damage', function () {
        let info = escapeHTML(JSON.stringify($(this).data('info'))); // 手動で編集できるので一応エスケープ
        try {
            info = JSON.parse(info);
        } catch (e) {
            console.log(e);
            return;
        }
        const num = info.num;
        const lv = info.lv;
        const mag = info.mag;
        const fuel = info.fuel;
        const damage = escapeHTML($(this).val());

        const time = calcTime(lv, mag, damage);
        const cost = calcCost(fuel, damage, false);

        $(`.custom-damage-time[data-num=${num}]`).text(time);
        $(`.custom-damage-fuel[data-num=${num}]`).text(cost.fuel);
        $(`.custom-damage-steel[data-num=${num}]`).text(cost.steel);
    });

    // htmlエスケープ
    function escapeHTML(str) {
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/'/g, "&#039;");
    }

    // 修理コスト取得
    function calcCost(fuel, damage, is_need_detail) {
        if (is_need_detail) {
            return {
                steel: Math.floor(fuel * damage * 0.06 * 100) / 100,
                fuel: Math.floor(fuel * damage * 0.032 * 100) / 100
            };
        } else {
            return {
                steel: Math.floor(fuel * damage * 0.06),
                fuel: Math.floor(fuel * damage * 0.032)
            };
        }
    }

    // 修理時間取得
    function calcTime(lv, mag, damage) {
        let time = (lv * 5 + (Math.floor(Math.sqrt(lv - 11)) * 10 + 50)) * mag * damage + 30;
        if (lv < 12) {
            time = lv * 10 * mag * damage + 30;
        }
        return secondsToHMS(Math.floor(time));
    }

    // 秒 → hh:mm:ss
    function secondsToHMS(seconds) {
        seconds = Number(seconds);
        let hours = Math.floor(seconds / 3600);
        let minutes = Math.floor((seconds % 3600) / 60);
        let secs = seconds % 60;

        // 0埋め
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        secs = String(secs).padStart(2, '0');

        return `${hours}:${minutes}:${secs}`;
    }

    // 修理係数を取得
    function getMag(type) {
        let mag = 1; // 駆逐艦・軽巡洋艦・重雷装巡洋艦・練習巡洋艦・水上機母艦・潜水空母・揚陸艦・補給艦 はデフォにしてさぼる
        switch (type) {
            case '潜水艦':
            case '海防艦':
                mag = 0.5;
                break;
            case '重巡洋艦':
            case '航空巡洋艦':
            case '巡洋戦艦':
            case '軽空母':
            case '潜水母艦':
                mag = 1.5;
                break;
            case '戦艦':
            case '航空戦艦':
            case '正規空母':
            case '装甲空母':
            case '工作艦':
                mag = 2;
                break;
        }
        return mag;
    }

    if (true) {
        // setup系
        $('#import').focus();
    }
});
