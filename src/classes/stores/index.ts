import { atom } from 'jotai'
import type { Mode, Ttemplate } from '../types';

// TODO: 初期値をユーザー操作に依存させたい
export const modeAtom = atom('nomal' as Mode);

export const areaAtom = atom(0 as number);

export const targetAtom = atom(null as HTMLSpanElement | null);

export const templateAtom = atom(null as Ttemplate | null);