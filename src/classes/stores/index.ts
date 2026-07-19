import { atom } from 'jotai'
import type { Mode, Ttemplate } from '../types';
import Const from '@/classes/const';

// localStorage はドメイン内の他ツールと共有なので "terminal" キーの中に集約する
const STORAGE_KEY = 'terminal';
const MODE_KEY = 'last-mode';

const readStorage = (): Record<string, unknown> => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw === null) return {};
        const parsed: unknown = JSON.parse(raw);
        return parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
            ? parsed as Record<string, unknown>
            : {};
    } catch {
        return {};
    }
};

const writeStorage = (key: string, value: unknown): void => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...readStorage(), [key]: value }));
    } catch {
        // localStorage が使えない環境では保存だけ諦める
    }
};

// 保存値が現存するモードでない場合は null(古いイベントIDなどが残っている可能性がある)
const readStoredMode = (): Mode | null => {
    const stored = readStorage()[MODE_KEY];
    return Const.worldInfos.some(info => info.mode_id === stored)
        ? stored as Mode
        : null;
};

const baseModeAtom = atom<Mode>(readStoredMode() ?? 62);

export const modeAtom = atom(
    (get) => get(baseModeAtom),
    (_get, set, next: Mode) => {
        set(baseModeAtom, next);
        writeStorage(MODE_KEY, next);
    }
);

export const areaAtom = atom(0 as number);

export const targetAtom = atom(null as HTMLSpanElement | null);

export const templateAtom = atom(null as Ttemplate | null);
