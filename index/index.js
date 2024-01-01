$(function() {
    let tags = JSON.parse($('#tag-data').text()) || [];
    let t_length = tags.length;
    let content = JSON.parse($('#content-data').text()) || [];
    let c_length = content.length;
    let content_keys = Object.keys(content);
    let ck_length = content_keys.length;
    let clicked_tag = null;
    //先ずタグを表示
    displayTags();
    //タグが選択されたらリスト表示
    $(document).on('click', '.tags', function() {
        $('#main-list').empty();
        let html = '';
        let tag = $(this).text();
        let keys = null;
        if(tag === 'ランダム') {
            keys = shuffleArray(getRandomKeys(5));
        } else {
            keys = searchByTag(tag);
        }
        //表示
        let k_length = keys.length;
        for(let i = 0;i < k_length;i++) {
            html += createHtml(keys[i]);
        }
        $('#main-list').append(html);
        //ボタンの表示を切り替え
        $(this).css({
            'color': '#27acd9',
            'backgroundColor': '#ffffff'
        });
        if(clicked_tag && clicked_tag.text() !== tag) {
            clicked_tag.css({
                'color': '#ffffff',
                'backgroundColor': '#27acd9'
            });
        }
        clicked_tag = $(this);
    });
    //初めにランダム選択
    $(".tags:contains('ランダム')").click();
    //配列の順番をシャッフル
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    //キーを任意の個数ランダムに取得
    function getRandomKeys(count) {
        const result = [];
        for (let i = 0; i < count && i < ck_length; i++) {
            const randomKey = content_keys[Math.floor(Math.random() * ck_length)];
            result.push(randomKey);
        }
        return result;
    }
    //メインリストの為のhtml生成
    function createHtml(key) {
        let data = content[key];
        let tag_arr = data['tag'];
        let des = data['description'];
        des = des.replaceAll('%%', '<br>');
        let link = data['link'];
        let tag_html = '';
        for(let i = 0;i < tag_arr.length;i++) {
            tag_html += `<span class="min-tags">${tag_arr[i]}</span>`;
        }
        return `<li class="list-item"><p class="site-name"><a href="${link}" target="_blank">${key}</a></p><p>${tag_html}</p><p class="description">${des}</p></li>`;
    }
    //指定のタグが含まれる項のキーを配列で返す
    function searchByTag(tag) {
        var results = [];
        content_keys.forEach(function (key) {
            if (content[key]["tag"] && content[key]["tag"].indexOf(tag) !== -1) {
                results.push(key);
            }
        });
        return results;
    }
    //タグをボタンで列挙
    function displayTags() {
        let html = '';
        for(let i = 0;i < t_length;i++) {
            html += createButtonHtml(tags[i]);
        }
        $('#tag-list').append(html);
    }
    //タグリストの為のhtml生成
    function createButtonHtml(tag) {
        return `<button class="tags">${tag}</button>`;
    }
    // HTMLエスケープ関数
    function escapeHtml(str) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }
});