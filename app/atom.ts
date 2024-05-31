import { atom } from 'jotai';

export const btcAmountAtom = atom<number>(0);
export const minMaxBoundsAtom = atom<[number, number]>([0, 100]);
export const sbtcBorrowAtom = atom<number>(0);
export const sbtcPayBackAtom = atom<number>(0);