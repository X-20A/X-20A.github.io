import Big from 'big.js';
import CustomError from './CustomError';
import { PreSailNull } from './types/brand';

/**
 * シミュに使用する走査子
 */
export default class Scanner {
    /** 経由したnode */
    public route: (string | PreSailNull)[] = [];

    /** 現在のnode */
    public currentNode: string | PreSailNull;

    /** this.routeの割合 0 - 1.0 */
    public rate: Big;

    /** 走査か完了したか */
    public is_fin = false;

    /** 進行した回数 */
    public progress_count = 0;

    /** Scannerあたりの許容する進行の回数(無限ループ防止) */
    private readonly MAX_PROGRESS_COUNT: number = 30; 

    private constructor(
        route: (string | PreSailNull)[],
        startNode: string | PreSailNull,
        rate: number | Big
    ) {
        this.route = route;
        this.currentNode = startNode;
        this.rate = typeof rate === 'number' // ここから表示までBigで一貫する
            ? new Big(rate)
            : rate;
    }

    /** 新規のScannerを返す */
    static createDefault(): Scanner {
        return new Scanner(
            [null as PreSailNull],
            null as PreSailNull,
            1,
        );
    }

    /**
     * Scannerのコピーを返す
     * @returns - Scannerのコピー
     */
    public clone(): Scanner {
        return new Scanner([...this.route], this.currentNode, this.rate);
    }
    /**
     * nextNode に進む
     * @param nextNode - 進行するnode
     * @param rate - 乗算する確率
     */
    public progress(nextNode: string, rate: number): void {
        this.route.push(nextNode);
        this.currentNode = nextNode;

        this.rate = this.rate.times(rate); // 不動点小数回避

        this.progress_count++;
        if (this.progress_count >= this.MAX_PROGRESS_COUNT) {
            console.group('Debug');
            console.log('経路: ', this.route);
            console.groupEnd();
            throw new CustomError('あー！無限ループ！');
        }
    }
}