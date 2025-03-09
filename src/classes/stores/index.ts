import { atom } from 'jotai'
import type { Mode, Ttemplate } from '../types';

export const modeAtom = atom('nomal' as Mode);

export const areaAtom = atom(0 as number);

export const targetAtom = atom(null as HTMLSpanElement | null);

export const templateAtom = atom(null as Ttemplate | null);