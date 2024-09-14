$(function() {
    const imp_length = imp_json.length;
    const form = $('#search-text');
    const list = $('#hits-container');
    form.on('input', function() {
        let text = $(this).val();
        if(!text) return;
        text = escapeHtml(text);
        text = convertToHalfWidth(text);
        console.log(text);
        let num = Number(text);
        let hits = [];
        if(num > 0) {
            hits = searchWithID(num);
            if(!hits.length) {
                hits = searchWithName(text);
            }
        } else {
            hits = searchWithName(text);
        }
        
        iniHits();
        if(hits.length) {
            displaySearchResult(hits);
        } else {
            // 該当なし
            // 何もしなくていいかな
        }
    });
    $('#hits-container').on('click', '.hits', function() {
        iniHits();
        
        const id = $(this).data('id');
        const item = imp_json.filter(entry => entry.id === id)[0];
        console.log('item', item);
        console.log(imp_json);
        const name = item.name;
        const step1 = item.step1;
        const step2 = item.step2;
        const step3 = item.step3;
        
        let expects = [];
        expects.push(Math.floor(step1[0] / 1 * 100) / 100);
        expects.push(Math.floor(step1[0] / 0.9405 * 100) / 100);
        expects.push(Math.floor(step2[0] / 0.8882 * 100) / 100);
        expects.push(Math.floor(step2[0] / 0.8191 * 100) / 100);
        expects.push(Math.floor(step2[0] / 0.7891 * 100) / 100);
        expects.push(Math.floor(step2[0] / 0.7023 * 100) / 100);
        expects.push(Math.floor(step3[0] / 0.5857 * 100) / 100);
        
        let witches = [];
        witches.push(expects[0] > step1[1]? '〇': '');
        witches.push(expects[1] > step1[1]? '〇': '');
        witches.push(expects[2] > step2[1]? '〇': '');
        witches.push(expects[3] > step2[1]? '〇': '');
        witches.push(expects[4] > step2[1]? '〇': '');
        witches.push(expects[5] > step2[1]? '〇': '');
        witches.push(expects[6] > step3[1]? '〇': '');
        
        // こっちは流し込む感じで いんだよvueとか
        $('#id').text(`id: ${id}`);
        $('#name').text(name);
        
        $('#step1-nez').text(`${step1[0]} / ${step1[1]}`);
        $('#step2-nez').text(`${step2[0]} / ${step2[1]}`);
        
        $('#1to5-expect').text(expects[0]);
        $('#1to5-witch').text(witches[0]);
        $('#5to6-expect').text(expects[1]);
        $('#5to6-witch').text(witches[1]);
        $('#6to7-expect').text(expects[2]);
        $('#6to7-witch').text(witches[2]);
        $('#7to8-expect').text(expects[3]);
        $('#7to8-witch').text(witches[3]);
        $('#8to9-expect').text(expects[4]);
        $('#8to9-witch').text(witches[4]);
        $('#9to10-expect').text(expects[5]);
        $('#9to10-witch').text(witches[5]);
        
        if(step3[0]) {
            $('#step3-nez').text(`${step3[0]} / ${step3[1]}`);
            $('#step3-expect').text(expects[6]);
            $('#step3-witch').text(witches[6]);
        } else {
            $('#step3-nez').text('-');
            $('#step3-expect').text('-');
            $('#step3-witch').text('-');
        }
        
        
    });
    // フォーム以外がクリックされたらリスト非表示
    $('body').on('click', function() {
        const active = document.activeElement;
        if(active.id !== 'search-text') {
            iniHits();
            return;
        }
    });
    $('#search-text').on('focus', function() {
        $(this).trigger('input');
    });
    // url書き換え阻止
    document.getElementById('search-container').addEventListener('submit', function(event) {
        event.preventDefault(); // フォームの送信を防ぐ
    });
    //検索結果空欄化
    function iniHits() {
        list.css('display', 'none');
        list.empty();
    }
    // 検索結果表示
    function displaySearchResult(hits) {
        console.log('hits', hits);
        const hits_length = hits.length;
        let html = '';
        for(let i = 0;i < hits_length;i++) {
            const hit = hits[i];
            const id = hit.id
            const name = hit.name;
            
            html += `<div class="hits" data-id="${id}">id: ${id} ${name}</div>`;
        }
        $('#hits-container').prepend(html);
        
        const offset = form.offset(); // 要素の位置（左上）の取得
        const width = form.outerWidth(); // 要素の幅
        const height = form.outerHeight(); // 要素の高さ

        const leftBottomX = offset.left; // 左端のX座標
        const leftBottomY = offset.top + height; // 下端のY座標

        // console.log(leftBottomX);
        // console.log(leftBottomY);

        list.css('top', leftBottomY);
        list.css('left', leftBottomX);
        list.css('display', 'block');
    }
    // ID検索(前方一致)
    function searchWithID(target_num) {
        const startString = target_num.toString();
        const filteredEntries = imp_json.filter(entry => {
            return entry.id.toString().startsWith(startString) && entry.canImprovement;
        });

        // 'id' の値でソート（降順）
        const sortedEntries = filteredEntries.sort((a, b) => b.id - a.id);

        // 初めの10件を取得
        const top10Entries = sortedEntries.slice(0, 20);

        return top10Entries;
    }
    // 名前検索(部分一致)
    function searchWithName(target_text) {
        const filteredEntries = imp_json.filter(entry => {
            return entry.name.includes(target_text) && entry.canImprovement;
        });

        // 'id' の値でソート（降順）
        const sortedEntries = filteredEntries.sort((a, b) => b.id - a.id);

        // 初めの10件を取得
        const top10Entries = sortedEntries.slice(0, 20);

        return top10Entries;
    }
    // 全角数字許容
    function convertToHalfWidth(str) {
        return str.replace(/[０-９]/g, function(s) {
            return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        });
    }
    // XSS的なアレの対策
    function escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (char) => map[char]);
    }
});