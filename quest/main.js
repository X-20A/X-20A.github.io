$(function() {
    // checkbox
    $('.checks').on('click', function() {
        updateData();
    });
    // 「開閉状態を記憶」切替
    $('#switch-cache').on('click', function() {
        updateSetting('is_fold');
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
    // check状態破棄(settingsは保持)
    $('#all-clear').on('click', function() {
        localStorage.removeItem('quest');
        if(confirm('初期化しますか？')) {
            location.reload();
        }
    });
    $('#share').on('click', function() {
        $('#qrcode-box').empty();
        
        const compress_state = LZString.compressToEncodedURIComponent(localStorage.quest);
        const setting = localStorage.quest_setting;
        const url = `${location.origin}${location.pathname}?import=${compress_state}&setting=${setting}`;
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
    // 全ての任務のチェック状態を収集してlocalStorageにほりこむ
    function updateData() {
        const quests = $('.quest-block');
        const quests_length = quests.length;
        let new_data = [];
        for(let i = 0;i < quests_length;i++) {
            const quest = quests.eq(i);
            const id = quest.data('id');
            const state = quest.find('input[type="checkbox"]').map((_, checkbox) => checkbox.checked ? 1 : 0).get();
            const is_fold = quest.css('height') === '21px' ? 0 : 1;
            
            let data = {};
            data.id = id;
            data.state = state;
            data.is_fold = is_fold;
            new_data.push(data);
        }
        localStorage.setItem('quest', JSON.stringify(new_data));
    }
    // settings更新
    function updateSetting(type) {
        if(type === 'is_fold') {
            const fold_cache = $('#switch-cache').prop('checked');
            setting = {
                fold_cache: fold_cache
            };
            localStorage.setItem('quest_setting', JSON.stringify(setting));
        }
    }
    // 折り畳み
    $('.quest-info').on('mousedown', function() {
        const block = $(this).closest('.quest-block');
        switchFold(block);
        
        updateData();
    });
    // 折り畳み切替
    function switchFold(elem) {
        if(elem.css('height') === '21px') {
            elem.css('height', 'auto');
        } else {
            elem.css('height', '21px');
        }
    }
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
    
    if(true) {
        // import
        let import_param = getParam('import');
        if(import_param) {
            let quest_state = LZString.decompressFromEncodedURIComponent(import_param);
            
            let import_setting = getParam('setting');
            
            if(confirm('現在のデータに上書きしますか？')) {
                localStorage.setItem('quest', quest_state);
                localStorage.setItem('quest_setting', import_setting);
                
                location.href = `${location.origin}${location.pathname}`;
            }
        }
        
        // setup
        let settings = localStorage.getItem('quest_setting');
        let fold_cache = false;
        if(settings) {
            settings = JSON.parse(settings);
            fold_cache = settings.fold_cache;
            if(fold_cache) {
                $('#switch-cache').prop('checked', true);
            } else {
                $('#switch-cache').prop('checked', false);
            }
        } else {
            fold_cache = true;
            $('#switch-cache').prop('checked', true);
        }
        
        let datas = localStorage.getItem('quest');
        if(datas) {
            datas = JSON.parse(datas);
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
                
                if(fold_cache) {
                    if(data.is_fold && data.is_fold !== 0) {
                        switchFold(block);
                    }
                }
            }
        }
    }
});