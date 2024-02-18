import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { AxiosResponse } from "axios";
import { LoginResponseDto } from "@/types/Auth/LoginResponseDto";
import { setCookie, deleteCookie } from "cookies-next";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "@/states/isLoggedInAtom";
import { SignupResponseDto } from "@/types/Auth/SignupResponseDto";
import { views } from "@/constants/views";
import { useApi } from "@/hooks/CSR/useApi";

/**
 * 認証に関するカスタムフック
 */
export const useAuth = () => {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const { noAuthRequiredApi } = useApi();

  /**
   * ログイン
   *
   * @param email メールアドレス
   * @param password パスワード
   */
  const login = useCallback(
    async (email: string, password: string) => {
      return await noAuthRequiredApi
        .post("/auth/login", {
          email,
          password,
        })
        .then(
          async (
            response: AxiosResponse<LoginResponseDto>,
          ): Promise<(number | LoginResponseDto)[]> => {
            setCookie("accessToken", response.data.access_token, {
              secure: true,
            });
            setCookie("refreshToken", response.data.refresh_token, {
              secure: true,
            });
            setIsLoggedIn(true);
            router.push(views.STUDY_LIST.path);
            return [response.status, response.data];
          },
        )
        .catch((error) => [error.response.status, error.response.data]);
    },
    [noAuthRequiredApi],
  );

  /**
   * サインアップ
   *
   * @param username ユーザー名
   * @param email メールアドレス
   * @param agreeToTerms 利用規約に同意するか
   * @param password パスワード
   * @param passwordConfirm パスワード（確認）
   */
  const signup = useCallback(
    async (
      username: string,
      email: string,
      agreeToTerms: boolean,
      password: string,
      passwordConfirm: string,
    ) => {
      return await noAuthRequiredApi
        .post("/auth/signup", {
          username,
          email,
          agree_to_terms: agreeToTerms,
          password,
          password_confirm: passwordConfirm,
        })
        .then(
          async (
            response: AxiosResponse<SignupResponseDto>,
          ): Promise<(number | SignupResponseDto)[]> => {
            router.push(views.AUTH_SIGNUP_SUCCESS.path);
            return [response.status, response.data];
          },
        )
        .catch((error) => [error.response.status, error.response.data]);
    },
    [noAuthRequiredApi],
  );

  /**
   * ログアウト
   */
  const logout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setIsLoggedIn(false);
    router.push(views.AUTH_LOGIN.path);
  };
  return {
    login,
    signup,
    logout,
  } as const;
};
