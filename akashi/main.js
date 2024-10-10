$(function() {
    const imp_length = imp_json.length;
    const form = $('#search-text');
    const list = $('#hits-container');
    const bookmark_path = '../media/bookmark-outline.png';
    const bookmark_check_path = '../media/bookmark-check.png';
    
    // フォーム入力
    form.on('input', function() {
        let hits = [];
        
        let text = $(this).val();
        if(!text) {
            hits = getFavs();
        } else {
            text = escapeHtml(text);
            text = convertToHalfWidth(text);
            let num = Number(text);
            if(num > 0 && !text.includes('.')) {
                hits = searchWithID(num);
                if(!hits.length) {
                    hits = searchWithName(text);
                }
            } else {
                hits = searchWithName(text);
            }
        }
        iniHits();
        if(hits.length) {
            displaySearchResult(hits);
        } else {
            // 該当なし
            // 何もしなくていいかな
        }
    });
    // 検索結果が選択されたら計算して表示
    $('#hits-container').on('click', '.hits', function() {
        iniHits();
        
        const id = $(this).data('id');
        const item = imp_json.filter(entry => entry.id === id)[0];
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
        $('#id').text(`No.${id}`);
        $('#name').text(name);
        
        if(isFav(id)) {
            $('#switch-fav').prop('src', bookmark_check_path);
        } else {
            $('#switch-fav').prop('src', bookmark_path);
        }
        $('#switch-fav').data('id', id);
        
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
    // フォームがフォーカスされたら検索結果再表示
    $('#search-text').on('focus', function() {
        $(this).trigger('input');
    });
    $('#switch-fav').on('click', function() {
        const id = $(this).data('id');
        const is_invalid = switchFav(id);
        if(is_invalid) {
            $(this).prop('src', bookmark_check_path);
        } else {
            $(this).prop('src', bookmark_path);
        }
    });
    // url書き換え阻止
    document.getElementById('search-container').addEventListener('submit', function(event) {
        event.preventDefault(); // フォームの送信を防ぐ
    });
    
    function isFav(id) {
        let res = false;
        let favs = localStorage.getItem('imp_favs');
        if(favs) {
            favs = JSON.parse(favs);
            if(favs.includes(id)) {
                res = true;
            }
        }
        return res;
    }
    function switchFav(id) {
        id = Number(id);
        let is_invalid = false;
        let favs = localStorage.getItem('imp_favs');
        let new_val = null;
        if(favs) {
            favs = JSON.parse(favs);
            if(favs.includes(id)) {
                new_val = favs.filter(entry => entry !== id);
            } else {
                new_val = favs.concat(id);
                is_invalid = true;
            }
        } else {
            new_val = [id];
            is_invalid = true;
        }
        localStorage.setItem('imp_favs', JSON.stringify(new_val));
        
        return is_invalid;
    }
    //検索結果空欄化
    function iniHits() {
        list.css('display', 'none');
        list.empty();
    }
    // 検索結果表示
    function displaySearchResult(hits) {
        const hits_length = hits.length;
        let html = '';
        for(let i = 0;i < hits_length;i++) {
            const hit = hits[i];
            const id = hit.id
            const name = hit.name;
            
            html += `<div class="hits" data-id="${id}">No: ${id} ${name}</div>`;
        }
        $('#hits-container').prepend(html);
        
        const offset = form.offset(); // 要素の位置（左上）の取得
        const width = form.outerWidth(); // 要素の幅
        const height = form.outerHeight(); // 要素の高さ

        const leftBottomX = offset.left; // 左端のX座標
        const leftBottomY = offset.top + height; // 下端のY座標

        list.css('top', leftBottomY);
        list.css('left', leftBottomX);
        list.css('display', 'block');
    }
    function getFavs() {
        let res = [];
        let ids = localStorage.getItem('imp_favs');
        if(ids) {
            ids = JSON.parse(ids);
            if(ids.length) {
                res = imp_json
                    .filter(entry => ids.includes(entry.id))
                    .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id)); // idsの順番でソート
            }
        }
        return res;
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
    // 名前検索(部分一致) 大文字小文字を区別しない
    function searchWithName(target_text) {
        const filteredEntries = imp_json.filter(entry => {
            return entry.name.toLowerCase().includes(target_text.toLowerCase()) && entry.canImprovement;
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
    
    if(true) {
        $('#search-text').focus();
    }
});