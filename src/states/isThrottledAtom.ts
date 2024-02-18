import { atom } from "recoil";

/**
 * スロットリングにかかったかを保持するAtom
 */
export const isThrottledAtom = atom<boolean>({
  key: "isThrottled",
  default: false,
});
