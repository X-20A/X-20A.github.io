$(function() {
    var input = null;
    //分母に応じて分子の最大値&value設定
    $('.parent-hp').on('input', function() {
        var val = $(this).val();
        var prev = $(this).prev();
        prev.attr('max', val);
        //最大値を超えてたら修正
        var childVal = prev.val();
        if(val < childVal) {
            prev.val(val);
        }
        if(prev.prev().prop('tagName') === 'INPUT') {
            prev = prev.prev();
            //最大値を超えてたら修正
            childVal = prev.val();
            if(val < childVal) {
                prev.val(val);
            }
        }
    });
    
    //撃沈
    $('.ko').on('click', function() {
        var prev = $(this).prev().prev();
        prev.val(0);
        prev.trigger('input');
    });
    
    //マウスオーバーで影
    $('.shadow').on('mouseover', function() {
        $(this).css('background', 'rgb(173 211 229)');
    });
    $('.shadow').on('mouseleave', function() {
        $(this).css('background', '');
    });
    
    //リロード
    $('#reload').on('click', function() {
        //中破以下は全回復
        //小破以上は持越
        for(let i = 0;i < 6;i++) {
            let end = $('.ware-end-hp').eq(i);
            let end_v = end.val();
            let start = $('.ware-start-hp').eq(i);
            let start_v = start.val();
            let max_v = $('.ware-max-hp').eq(i).val();
            if(max_v / 2 > end_v) {
                end.val(max_v);
                end.trigger('input');
                start.val(max_v);
                start.trigger('input');
            } else if(end_v < start_v) {
                start.val(end_v);
                start.trigger('input');
            }
        }
        kurukuru();
    });
    
    //自艦隊読み込み
    $('#import').on('input', function() {
        var text = $(this).val();
        try {
            var json = JSON.parse(text);
            j_length = Object.keys(json['f1']).length;
            console.log(json);
            json = json['f1'];
            for(let i = 0;i < j_length;i++) {
                if(i < 6) {
                    var hp = json['s' + (i + 1)]['hp'];
                    $('.ware-max-hp').eq(i).val(hp);
                    let e = new Event('input');
                    document.getElementsByClassName('ware-max-hp')[i].dispatchEvent(e);
                    $('.ware-start-hp').eq(i).val(hp);
                    e = new Event('input');
                    document.getElementsByClassName('ware-start-hp')[i].dispatchEvent(e);
                    $('.ware-end-hp').eq(i).val(hp);
                    e = new Event('input');
                    document.getElementsByClassName('ware-end-hp')[i].dispatchEvent(e);
                }
            }
        } catch(e) {
            alert('入力値不正');
            console.log(e);
        }
        $(this).val('');
    });
    
    //敵プリセット適用
    $('#hp3').on('change', function() {
        var elem = $(this).val();
        var hps = elem.split('_');
        for(let i = 0; i < 6; i++) {
            $('.teki-start-hp').eq(i).val(hps[i]);
            let e = new Event('input');
            document.getElementsByClassName('teki-start-hp')[i].dispatchEvent(e);
            $('.teki-end-hp').eq(i).val(hps[i]);
            e = new Event('input');
            document.getElementsByClassName('teki-end-hp')[i].dispatchEvent(e);
        }
    });
    
    //累計表示
    $('input').on('input', function() {
        var ws_total = sumHp('.ware-start-hp');
        var we_total = sumHp('.ware-end-hp');
        var ts_total = sumHp('.teki-start-hp');
        var te_total = sumHp('.teki-end-hp');
        $('#ware-total-hp-start').text(ws_total);
        $('#ware-total-hp-end').text(we_total);
        $('#teki-total-hp-start').text(ts_total);
        $('#teki-total-hp-end').text(te_total);
        let e = new Event('input');
        document.getElementsByClassName('total-hp')[0].dispatchEvent(e);
    });
    
    function sumHp(selector) {
        var res = 0;
        for(let i = 0; i < 6; i++) {
            res += Number($(selector).eq(i).val());
        }
        return res;
    }
    
    //ホイール関連
    $('input').on("mouseover", function (event) {
        // マウスオーバー時にマウスホイールのイベントを監視
        input = $(this);
        $(this).on("wheel", handleMouseWheel);
    });
    $('input').on("mouseout", function () {
        // マウスオーバーが外れたらマウスホイールの監視を解除
        $(this).off("wheel", handleMouseWheel);
    });
    function handleMouseWheel(event) {
        // マウスホイールイベントから値を増減させる
        event.preventDefault();
        const currentValue = parseFloat(this.value) || 0;
        var step = event.originalEvent.deltaY / 100;
        const newValue = currentValue + (event.deltaY > 0 ? step : -step); // スクロール方向に応じて加算または減算

        // 最小値と最大値の制約を適用
        const min = parseFloat(this.min);
        const max = parseFloat(this.max) || null;
        if ((min === null || newValue >= min) && (max === null || newValue <= max)) {
            this.value = newValue;
            let e = new Event('input');
            input[0].dispatchEvent(e);
        }
    }
    //ホイール関連終
    
    //ゲージ比計算
    $('.total-hp').on('input', function() {
        var ware_hp_start = Number($('#ware-total-hp-start').text());
        var ware_hp_end = Number($('#ware-total-hp-end').text());
        var teki_hp_start = Number($('#teki-total-hp-start').text());
        var teki_hp_end = Number($('#teki-total-hp-end').text());
        if(ware_hp_end > 0 && ware_hp_start > 0 && teki_hp_end > 0 && teki_hp_start > 0) {
            var rate = ((teki_hp_start - teki_hp_end) / teki_hp_start) / ((ware_hp_start - ware_hp_end) / ware_hp_start);
            var text = '';
            if(rate === Infinity) {
                text = '確定B';
            } else if(isNaN(rate)) {
                text = '計算待機';
            } else {
                text = rate;
            }
            $('#result').text(text);
        }
    });
    //データ保存
    $('.ware-max-hp').on('input', function() {
        var num = [];
        for(let i = 0; i < 6; i++) {
            num.push($('.ware-max-hp').eq(i).val());
        }
        JSON.stringify(num);
        localStorage.setItem('preset', num);
    });
    //読み込み時に展開
    var preset = localStorage.getItem('preset');
    console.log(preset);
    if(preset) {
        var arr = preset.split(',');
        for(let i = 0; i < 6; i++) {
            $('.ware-max-hp').eq(i).val(arr[i]);
            let e = new Event('input');
            document.getElementsByClassName('ware-max-hp')[i].dispatchEvent(e);
            $('.ware-start-hp').eq(i).val(arr[i]);
            e = new Event('input');
            document.getElementsByClassName('ware-start-hp')[i].dispatchEvent(e);
            $('.ware-end-hp').eq(i).val(arr[i]);
            e = new Event('input');
            document.getElementsByClassName('ware-end-hp')[i].dispatchEvent(e);
        }
    }
    function kurukuru() {
        $('body').css('cursor', 'progress');
        $('#reload').css('cursor', 'progress');
        setTimeout(function(){
            $('body').css('cursor', 'default');
            $('#reload').css('cursor', 'pointer');
        },100);
    }
});