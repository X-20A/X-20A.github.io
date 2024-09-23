import $ from 'jquery';
import cytoscape from 'cytoscape';

$(function() {
    const list = $('#select-menu');
    const cdn = 'https://cdn.jsdelivr.net/gh/X-20A/X-20A.github.io@main';
    let cy = null;
    
    $('.worlds').on('mouseover', function() {
        hideList();
        emptyList();
        
        const world_num = $(this).data('world');
        const matches = templates.filter(template => template.world === world_num);
        const matches_length = matches.length;
        for(let i = 0;i < matches_length;i++) {
            const match = matches[i];
            
            const title = match.title;
            const area = match.area;
            const route = match.route;
            const url = `https://tinyurl.com/${match.url}`;
            const memo = match.memo;
            
            pushList(title, world_num, area, route, url, memo);
        }
        displayList($(this));
    });
    
    $('#select-menu').on('click', '.list-items', function() {
        const title = $(this).data('title');
        const world = $(this).data('world');
        const area = $(this).data('area');
        const route = $(this).data('route');
        const url = $(this).data('url');
        const memo = $(this).data('memo');
        
        applyInfo(title, url, memo);
        
        $('#message').remove();
        $('#cy').css('display', 'block');
        $('#cy').css('background-image', `url(${cdn}/media/background/${world}-${area}.png)`);
        drawMap(`${world}-${area}`, route, false);
    });
    $('#select-menu').on('dblclick', '.list-items', function() {
        const url = $(this).data('url');
        window.open(url);
    });
    
    function emptyList() {
        list.empty();
    }
    
    function pushList(title, world, area, route, url, memo) {
        list.append(
            `<p class="list-items" data-title="${title}" data-world="${world}" data-area="${area}" data-route="${route}" data-memo="${memo}" data-url="${url}">${title}</p>`
        );
    }
    
    function hideList() {
        list.css('display', 'none');
    }
    
    function displayList(element) {
        const offset = element.offset(); // 要素の位置（左上）の取得
        const width = element.outerWidth(); // 要素の幅
        const height = element.outerHeight(); // 要素の高さ

        const leftBottomX = offset.left; // 左端のX座標
        const leftBottomY = offset.top + height; // 下端のY座標
        
        // console.log(leftBottomX);
        // console.log(leftBottomY);
        
        list.css('top', leftBottomY);
        list.css('left', leftBottomX);
        list.css('display', 'block');
    }
    
    function applyInfo(title, url, memo) {
        document.getElementById('title').textContent = title;
        document.getElementById('url').href = url;
        document.getElementById('url').textContent = url;
        
        let html = '<p>備考:<p>';
        const arr = memo.split('$e');
        for(let i = 0;i < arr.length;i++) {
            html += `<p>${arr[i]}</p>`
        }
        $('#memo').empty();
        $('#memo').prepend(html);
    }
    
    function drawMap(area, route, is_omake) {
        const parts = route.split('-');
        const pairs = parts.slice(0, -1).map((item, index) => [item, parts[index + 1]]);
        
        const map = map_info; // map.jsより
        const spots = map['spots'][area];
        const routes = map['route'][area];
        let elements = {
            nodes: [],
            edges: []
        };
        // nodes流し込み
        for (const key in spots) {
            if (spots.hasOwnProperty(key)) {
                // 座標,マスの種類
                const [x, y, label] = spots[key];
                elements.nodes.push({
                    data: {id:key, name:key, label:label},
                    position: {x, y}
                });
            }
        }
        // edges流し込み
        for (const key in routes) {
            if (routes.hasOwnProperty(key)) {
                const [source, target] = routes[key];
                let highlight = 0;
                if(pairs.some(pair => pair[0] === routes[key][0] && pair[1] === routes[key][1])) {
                    highlight = 1;
                }
                elements.edges.push({
                    data: {
                        source,
                        target,
                        highlight:  highlight// 小数第二位以下四捨五入
                    }
                });
            }
        }

        // スタイルシート
        const style = [
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
                 'background-clip': 'none',// z-indexでedgesの下に潜り込ませるは上手くいかなかった
             }
            }, // マスの分類ごとに表示分岐
            { selector: 'node[label = "st"]', // 出撃
             style: {
                 'background-image': `${cdn}/media/nodes/start.png`,
                 'font-weight': '600',
                 'text-outline-width': '2px',
                 'font-size': '20px',
                 'width': '48px',
                 'height': '48px',
                 'background-opacity': 0,
                 'background-position-x': '1px', // 位置微調整
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "po"]',  // 港湾
             style: {
                 'background-image': `../media/nodes/port.png`,
                 'width': '48px',
                 'height': '48px',
                 'background-opacity': 0,
                 'background-position-x': '5.7px',
                 'background-position-y': '5px'
             }
            },
            { selector: 'node[label = "bo"]', // ボス
             style: {
                 'background-image': `${cdn}/media/nodes/boss.png`,
                 'width': '48px',
                 'height': '48px',
                 'background-opacity': 0,
                 'background-position-x': '5px',
                 'background-position-y': '1px'
             }
            },
            { selector: 'node[label = "ab"]',  // 航空戦
             style: {
                 'background-image': `${cdn}/media/nodes/air-b.png`,
                 'width': '48px',
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '1px' // 位置微調整
             }
            },
            { selector: 'node[label = "ad"]',  // 空襲
             style: {
                 'background-image': `${cdn}/media/nodes/air-d.png`,
                 'width': '44px',
                 'height': '25px',
                 'background-opacity': 0,
             }
            },
            { selector: 'node[label = "ac"]',  // 能動分岐
             style: {
                 'background-image': `${cdn}/media/nodes/calm.png`,
                 'border-width': 3, // ボーダーの太さ
                 'border-color': '#2c4dff',  // #ff3f87
                 'width': '27px',
                 'height': '27px',
                 'background-position-x': '0px',
                 'background-position-y': '-1px',
             }
            },
            { selector: 'node[label = "en"]', // 通常戦 基本設定
             style: {
                 'background-image': `${cdn}/media/nodes/enemy.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "su"]', // 対潜
             style: {
                 'background-image': `${cdn}/media/nodes/enemy.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "ca"]', // 気のせい
             style: {
                 'background-image': `${cdn}/media/nodes/calm.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "wh"]',  // 渦潮
             style: {
                 'background-image': `${cdn}/media/nodes/whirl.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "re"]',  // 資源
             style: {
                 'background-image': `${cdn}/media/nodes/resource.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "ni"]',  // 夜戦
             style: {
                 'background-image': `${cdn}/media/nodes/night.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "sc"]',  // 航空偵察
             style: {
                 'background-image': `${cdn}/media/nodes/scout.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "un"]', // 不明
             style: {
                 'background-image': `../media/nodes/unknown.png`,
                 'width': '27px', // enemy系
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "as"]', // 対潜空襲
             style: {
                 'background-image': `../media/nodes/airstrike_supported.png`,
                 'width': '48px',
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '-0.5px',
                 'background-position-y': '-1px'
             }
            },
            { selector: 'node[label = "tl"]', // 揚陸地点
             style: {
                 'background-image': `../media/nodes/transport_loadout.png`,
                 'width': '48px',
                 'height': '27px',
                 'background-opacity': 0,
                 'background-position-x': '12px',
                 'background-position-y': '1px'
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
                 'curve-style': 'bezier', // こいつが無いと矢印にならないっぽい
                 'target-arrow-shape': 'triangle',
                 'events': 'no'
             }
            }, // 指定ルートを赤
            { selector: 'edge[highlight = 1]',
             style: {
                 'line-color': 'rgb(220,20,60)',
                 'target-arrow-color': 'rgb(220,20,60)',
                 'width': '6px',
             }
            }
        ];

        const layout = {
            name:'preset'
        };
        
        const container = is_omake ? document.getElementById('omake-cy') : document.getElementById('cy');

        // 出力
        cy = cytoscape({
            // #cyに生成
            container: container,
            elements: elements,
            style: style,
            layout: layout,
            autoungrabify: true, // nodeのドラッグ不可
            userZoomingEnabled: false
        });
    }
    
    function omake(area, route) {
        document.getElementById('omake-cy').style.display = 'block';
        
        drawMap(area, route, true);
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Cytoscapeの描画完了を待つ
        // 1回だけ発火
        cy.once('render', function() {

            // 背景画像
            const bgImg = new Image();
            bgImg.src = `../media/background/${area}.png`;

            bgImg.onload = function() {
                canvas.width = cy.width();
                canvas.height = cy.height();
                
                // まず、黒の背景を描画
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // 次に、背景画像を描画
                ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

                // CytoscapeのグラフをPNG形式でエクスポートし、canvasに合成
                const cyPng = cy.png();  // ここでグラフが描画済みか確認
                if (!cyPng) {
                    console.error('Cytoscape PNG export failed');
                    return;
                }

                const graphImg = new Image();
                graphImg.src = cyPng;

                graphImg.onload = function() {
                    ctx.drawImage(graphImg, 0, 0);

                    const link = document.createElement('a');
                    link.href = canvas.toDataURL();
                    link.download = `${area}_${route}.png`;
                    link.click();
                    document.body.removeChild(link);
                    
                    document.getElementById('omake-cy').style.display = 'none';
                };

                graphImg.onerror = function() {
                    console.error('Graph Image failed to load.');
                };
            };

            bgImg.onerror = function() {
                console.error('Background image failed to load.');
            };
        });
    }

    
    window.omake = omake;
});