import Big from 'big.js';
import CustomError from '@/errors/CustomError';
import { PreSailNull } from '@/models/types/brand';

/**
 * 走査子の状態を表す型
 */
export interface Scanner {
  route: (string | PreSailNull)[];
  currentNode: string | PreSailNull;
  rate: Big;
  is_fin: boolean;
  progress_count: number;
}

/**
 * Scannerあたりの許容する進行の回数(無限ループ防止)
 */
export const MAX_PROGRESS_COUNT = 30;

/**
 * 新規のScannerを返す
 * @returns 新規Scanner
 */
export function createDefaultScanner(): Scanner {
  return {
    route: [null as PreSailNull],
    currentNode: null as PreSailNull,
    rate: new Big(1),
    is_fin: false,
    progress_count: 0,
  };
}

/**
 * Scannerのコピーを返す
 * @param scanner コピー元
 * @returns Scannerのコピー
 */
export function cloneScanner(scanner: Scanner): Scanner {
  return {
    route: [...scanner.route],
    currentNode: scanner.currentNode,
    rate: new Big(scanner.rate),
    is_fin: scanner.is_fin,
    progress_count: scanner.progress_count,
  };
}

/**
 * nextNode に進む
 * @param scanner 進行元Scanner
 * @param nextNode 進行するnode
 * @param rate 乗算する確率
 * @returns 進行後のScanner
 * @throws CustomError 無限ループ検知時
 */
export function progressScanner(scanner: Scanner, nextNode: string, rate: number): Scanner {
  const newRoute = [...scanner.route, nextNode];
  const newRate = scanner.rate.times(rate);
  const newProgressCount = scanner.progress_count + 1;
  if (newProgressCount >= MAX_PROGRESS_COUNT) {
    console.group('Debug');
    console.log('経路: ', newRoute);
    console.groupEnd();
    throw new CustomError('あー！無限ループ！');
  }
  return {
    ...scanner,
    route: newRoute,
    currentNode: nextNode,
    rate: newRate,
    progress_count: newProgressCount,
  };
}