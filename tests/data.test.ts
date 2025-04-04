import { AreaId } from '@/classes/types';
import { edge_datas } from '@/data/map';
import templates from '@/data/template';
import vangards from '@/data/vangard';
import { test, expect } from 'vitest';

test('data: templateのデータに不備がないか確認', () => {
    const datas = templates.concat(vangards);

    const urlSet = new Set<string>();

    for (const data of datas) {
        const { title, url } = data;

        // title の空文字チェック
        if (title === '') throw new Error(`titleが空文字: ${url}`);

        // url の空文字チェック
        if (url === '') throw new Error(`urlが空文字: ${title}`);

        // url の重複チェック
        if (urlSet.has(url)) throw new Error(`urlが重複: "${url}" ${title}`);

        urlSet.add(url);

        const area_id = data.world + '-' + data.area as AreaId;
        const edges = edge_datas[area_id];

        // route の空文字チェック
        if (data.route === '') throw new Error(`routeが空文字: ${title}`);

        const route = data.route.split('-');
        for (let i = 0;i < route.length - 1;i++) {
            // console.log([route[i], route[i + 1]]);
            if (!edges.find(v => JSON.stringify(v) === JSON.stringify([route[i], route[i + 1]]))) {
                throw new Error(`ルート不連続: ${title}`);
            }
        }
    }

    // 最後にサイズチェック
    expect(urlSet.size).toBe(datas.length);
});
