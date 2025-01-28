import Decimal from 'decimal.js';
import CustomError from './CustomError';

/**
 * シミュに使用する走査子
 */
export default class Scanner {
    public route: (string | null)[] = [];
    public currentNode: string | null;
    public rate: number;
    public is_fin: boolean = false;

    public progress_count: number = 0;

    constructor(
        route: (string | null)[],
        startNode: string | null,
        rate: number
    ) {
        this.route = route;
        this.currentNode = startNode;
        this.rate = rate;
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

        // 不動点小数回避
        this.rate = new Decimal(this.rate).times(rate).toNumber();

        this.progress_count++;
        if (this.progress_count >= 30) {
            console.group('Debug');
            console.log('経路: ', this.route);
            console.groupEnd();
            throw new CustomError('あー！無限ループ');
        }
    }

}