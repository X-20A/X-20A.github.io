import type { Mode } from '@/classes/types';

// 型やデータはかなり歪
// パチッときまるようなのは浮かばなかった
interface TworldInfo {
    mode_id: Mode;
    label: string;
    worlds: number[];
};

export default class Const {
    private static _worldInfos: TworldInfo[] = [
        {
            mode_id: 'nomal',
            label: '通常海域',
            worlds: [1,2,3,4,5,6,7],
        },
        {
            mode_id: 'vanguard',
            label: '警戒陣',
            worlds: [2,4,5,6],
        },
        {
            mode_id: 60,
            label: '2025春',
            worlds: [1, 2, 3, 4, 5, 6],
        },
        {
            mode_id: 59,
            label: '2024夏',
            worlds: [4],
        },
    ]; // @expansion イベントは新しいのが上に来るように
    public static get worldInfos(): TworldInfo[] {
        return structuredClone(Const._worldInfos);
    }
}