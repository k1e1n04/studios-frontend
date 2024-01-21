import { hasCookie } from "cookies-next";
import { useEffect } from "react";
import { atom, DefaultValue, useSetRecoilState } from "recoil";

/**
 * ログイン状態を管理するRecoilのAtom
 */
export const isLoggedInAtom = atom<boolean | DefaultValue>({
  key: "isLoggedIn",
  default: new DefaultValue(),
});

export function useInitializeLoggedIn() {
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  useEffect(() => {
    const initialize = async () => {
      const isLoggedIn = hasCookie("accessToken");

      setIsLoggedIn(isLoggedIn);
    };

    void initialize();
  }, [setIsLoggedIn]);
}
