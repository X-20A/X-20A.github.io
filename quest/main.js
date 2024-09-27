$(function() {
    const app_state = {
        quests: [],
        settings: {
            foldCache: true,
        }
    };
    // 右クリック時に更新
    let selected_id = '';
    
    // checkbox
    $('.checks').on('click', function() {
        updateData();
    });
    // 「開閉状態を記憶」切替
    $('#switch-cache').on('click', function() {
        updateData();
    });
    // 全閉じ
    $('#all-fold').on('click', function() {
        // リロード法は没
        const blocks = $('.quest-block');
        const blocks_length = blocks.length;
        for(let i = 0;i < blocks_length;i++) {
            const block = blocks.eq(i);
            if(block.css('height') !== '21px') {
                block.find('.quest-info').first().mousedown();
            }
        }
    });
    // 初期化
    $('#all-clear').on('click', function() {
        localStorage.removeItem('quest');
        if(confirm('初期化しますか？')) {
            location.reload();
        }
    });
    // 共有
    $('#share').on('click', function() {
        $('#qrcode-box').empty();
        
        const compress_state = LZString.compressToEncodedURIComponent(JSON.stringify(app_state));
        const url = `${location.origin}${location.pathname}?import=${compress_state}`;
        new QRCode(document.getElementById("qrcode-box"), url);
        $('#created-url').val(url);
        
        $('#share-mask').css('display', 'block');
        $('#share-container').css('display', 'flex');
    });
    $('#share-container').on('click', function() {
        $('#share-mask').css('display', 'none');
        $('#share-container').css('display', 'none');
    });
    $('#share-inner').on('click', function(e) {
        e.stopPropagation();
    });
    $('.copy-url').on('click', function() {
        const text = $('#created-url').val();
        navigator.clipboard.writeText(text);
        $('#created-url').select();
    });
    // 折り畳み
    $('.quest-info').on('mousedown', function(e) {
        // 右クリックなら中断
        if (e.button === 2) return;
        
        const block = $(this).closest('.quest-block');
        switchFold(block);

        updateData();
    });
    // マウスオーバで遠征名オーバーラップ
    $('.indicate').on('mouseover', function() {
        const ol = $('#ex-overlap');
        let id = $(this).text();
        if(!id.includes('-')) { // 行儀が悪い！
            const ex = exs.filter(entry => entry.id === id)[0];
            const name = ex.name;
            const time = ex.time;
            const area = ex.area;

            $('#ex-info').text(`${area}: ${name}(${time})`);

            const targetPosition = $(this).offset();
            window.targetPosition = targetPosition;

            const overlayWidth = ol.outerWidth();

            ol.css({
                top: targetPosition.top - $(window).scrollTop() - 30 + 'px',
                left: targetPosition.left + ($(this).outerWidth() / 2) - (overlayWidth / 2) + 'px'
            });

            ol.show();

        }
    });
    $('.indicate').on('mouseleave', function() {
        $('#ex-overlap').hide();
    });
    // 任務名を右クリックであれこれ
    $('.quest-info').on('contextmenu', function(e) {
        e.preventDefault();
        
        selected_id = $(this).parent().data('id');
        
        const menuHeight = 120; // メニューの高さ
        const windowHeight = $(window).height(); // ウィンドウの高さ
        const pageY = e.pageY - $(window).scrollTop(); // マウスのY座標
        $('#custom-menu').css({
            top: pageY + (windowHeight - e.pageY < menuHeight + 70 ? -menuHeight : 0) + 'px',
            left: e.pageX - 5 + 'px',
            display: 'block'
        });
    });
    $('.ctxs').on('click', function() {
        const type = $(this).data('type');
        const quest = quest_json.filter(entry => entry.id === selected_id)[0];
        let url = '';
        switch(type) {
            case 'copy':
                navigator.clipboard.writeText(quest.name);
                break;
            case 'google':
                url = `https://www.google.com/search?q=${encodeURIComponent(quest.name)}`;
                break;
            case 'zekamashi':
                url = `https://zekamashi.net/kancolle-kouryaku/${quest.zekamashi}/`;
                break;
            case 'kiton':
                url = `https://kitongame.com/%E3%80%90%E8%89%A6%E3%81%93%E3%82%8C%E3%80%91${encodeURIComponent(quest.kiton)}/`;
                break;
        }
        if(url) {
            window.open(url, '_blank');
        }
    });
    $('body').on('click', function() {
        $('#custom-menu').css('display', 'none');
    });
    $(window).on('scroll', function() {
        $('#custom-menu').css('display', 'none');
    });
    
    // 開閉状態記憶の可否と、全ての任務のチェック状態を収集してlocalStorageにほりこむ
    function updateData() {
        const quests = $('.quest-block');
        const quests_length = quests.length;
        app_state.quests = [];
        for(let i = 0;i < quests_length;i++) {
            const quest = quests.eq(i);
            const id = quest.data('id');
            const state = quest.find('input[type="checkbox"]').map((_, checkbox) => checkbox.checked ? 1 : 0).get();
            const is_fold = quest.css('height') === '21px' ? 0 : 1;
            
            let data = {};
            data.id = id;
            data.state = state;
            data.is_fold = is_fold;
            app_state.quests.push(data);
            
            toggleBackground(quest.find('.columns'), state);
        }
        
        app_state.settings.foldCache = $('#switch-cache').prop('checked');
        
        localStorage.setItem('quest', JSON.stringify(app_state));
    }
    
    // 折り畳み切替
    function switchFold(elem) {
        if(elem.css('height') === '21px') {
            elem.css('height', 'auto');
        } else {
            elem.css('height', '21px');
        }
    }
    
    // URLから任意のパラメータを取得
    function getParam(name, url) {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    
    function toggleBackground(columns, state) {
        if(state.every(item => item === 1)) {
            columns.css('backgroundColor', '#caffc4');
        } else {
            columns.css('backgroundColor', '#EEF5FF');
        }
    }
    
    // 読込時処理
    if(true) {
        // import
        let import_param = getParam('import');
        if(import_param) {
            let quest_state = LZString.decompressFromEncodedURIComponent(import_param);
            
            if(confirm('現在のデータに上書きしますか？')) {
                localStorage.setItem('quest', quest_state);
                
                location.href = `${location.origin}${location.pathname}`;
            }
        }
        
        // setup
        let states = localStorage.getItem('quest');
        if(states) {
            Object.assign(app_state, JSON.parse(states));
        } else {
            localStorage.setItem('quest', JSON.stringify(app_state));
        }
        
        // 開閉状態
        if(app_state.settings.foldCache) {
            $('#switch-cache').prop('checked', true);
        } else {
            $('#switch-cache').prop('checked', false);
        }

        datas = app_state.quests;
        const data_length = datas.length;

        for(let i = 0;i < data_length;i++) {
            const data = datas[i];
            const id = data.id;
            const state = data.state;
            const block = $(`.quest-block[data-id="${id}"]`);
            const checks = block.find('.checks');
            const checks_length = checks.length;
            for(let q = 0;q < checks_length;q++) {
                const check = checks.eq(q);
                if(state[q] && state[q] !== 0) {
                    check.prop('checked', true);
                }
            }

            if(app_state.settings.foldCache) {
                if(data.is_fold && data.is_fold !== 0) {
                    switchFold(block);
                }
            }
            
            toggleBackground(block.find('.columns'), state);
        }
    }
    
    window.app_state = app_state;
});