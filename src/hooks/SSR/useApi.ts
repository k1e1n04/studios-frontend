
import { useMemo } from "react";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { ErrorResponseDto } from "@/types/ErrorResponseDto";
import { views } from "@/constants/views";
import {redirect} from "next/navigation";
import { cookies } from 'next/headers'

/**
 * APIを利用するためのカスタムフック(SSR用)
 */
export const useApi = () => {

  /**
   * 認証が必要なAPI
   */
  const authRequiredApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 15000,
      headers: {
        Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<ErrorResponseDto>) => {
        if (!error.response) {
          redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
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
              redirect(views.ERROR_NOT_FOUND.path);
              break;
            case axios.HttpStatusCode.Unauthorized:
              redirect(views.AUTH_LOGIN.path);
              break;
            case axios.HttpStatusCode.TooManyRequests:
              break;
            case axios.HttpStatusCode.InternalServerError:
              redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
            default:
              redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, []);

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
          redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
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
              redirect(views.ERROR_NOT_FOUND.path);
              break;
            case axios.HttpStatusCode.TooManyRequests:
              break;
            case axios.HttpStatusCode.Unauthorized:
              break;
            case axios.HttpStatusCode.InternalServerError:
              redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
            default:
              redirect(views.ERROR_INTERNAL_SERVER_ERROR.path);
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, []);

  return { authRequiredApi, noAuthRequiredApi } as const;
};
