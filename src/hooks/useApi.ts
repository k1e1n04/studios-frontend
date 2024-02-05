import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { isLoggedInAtom } from "@/states/isLoggedInAtom";
import { useMemo } from "react";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { ErrorResponseDto } from "@/types/ErrorResponseDto";
import { views } from "@/constants/views";
import {isThrottledAtom} from "@/states/isThrottledAtom";

/**
 * APIを利用するためのカスタムフック
 */
export const useApi = () => {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);
  const setIsThrottled = useSetRecoilState(isThrottledAtom);

  /**
   * 認証が必要なAPI
   */
  const authRequiredApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 15000,
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
        "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponseDto>) => {
        if (!error.response) {
          router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
        }
        if (
          error.code === "ECONNABORTED" ||
          error.message.includes("timeout")
        ) {
          return Promise.reject(error);
        }
        if (error.response) {
          switch (error.response.status) {
            case axios.HttpStatusCode.BadRequest:
              break;
            case axios.HttpStatusCode.NotFound:
              router.push(views.ERROR_NOT_FOUND.path);
              break;
            case axios.HttpStatusCode.Unauthorized:
              setIsLoggedIn(false);
              router.push(views.AUTH_LOGIN.path);
              break;
            case axios.HttpStatusCode.TooManyRequests:
              setIsThrottled(true);
              break;
            case axios.HttpStatusCode.InternalServerError:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
            default:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, [router]);

  /**
   * 認証が不要なAPI
   */
  const noAuthRequiredApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 15000,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponseDto>) => {
        if (!error.response) {
          router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
        }
        if (
          error.code === "ECONNABORTED" ||
          error.message.includes("timeout")
        ) {
          return Promise.reject(error);
        }
        if (error.response) {
          switch (error.response.status) {
            case axios.HttpStatusCode.BadRequest:
              break;
            case axios.HttpStatusCode.NotFound:
              router.push(views.ERROR_NOT_FOUND.path);
              break;
            case axios.HttpStatusCode.TooManyRequests:
              setIsThrottled(true);
              break;
            case axios.HttpStatusCode.Unauthorized:
              break;
            case axios.HttpStatusCode.InternalServerError:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
            default:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, []);

  return { authRequiredApi, noAuthRequiredApi } as const;
};
