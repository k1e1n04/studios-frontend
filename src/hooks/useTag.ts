import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { TagErrorResponseDto } from "@/types/Study/TagErrorResponseDto";
import { TagListResponseDto } from "@/types/Study/TagListResponseDto";
import { useRouter } from "next/navigation";
import { views } from "@/constants/views";
import { getCookie } from "cookies-next";
import {useSetRecoilState} from "recoil";
import {isLoggedInAtom} from "@/states/isLoggedInAtom";

export const useTag = () => {
  const router = useRouter();
  const setIsLoggedIn = useSetRecoilState(isLoggedInAtom);

  const tagApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${getCookie("accessToken")}`,
        "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<TagErrorResponseDto>) => {
        if (!error.response) {
          router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
        } else {
          switch (error.response.status) {
            case axios.HttpStatusCode.BadRequest:
              break;
            case axios.HttpStatusCode.NotFound:
              router.push(views.ERROR_NOT_FOUND.path);
              break;
            case axios.HttpStatusCode.Unauthorized:
              setIsLoggedIn(false)
              router.push(views.AUTH_LOGIN.path);
              break;
            case axios.HttpStatusCode.InternalServerError:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
            default:
              router.push(views.ERROR_INTERNAL_SERVER_ERROR.path);
              break;
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, [router]);

  const fetchTags = useCallback(
    async (tag: string | null = null): Promise<TagListResponseDto> => {
      return await tagApi
        .get("/tag/list", {
          params: { tag },
        })
        .then((response: AxiosResponse): TagListResponseDto => response.data);
    },
    [tagApi],
  );

  return { fetchTags } as const;
};
