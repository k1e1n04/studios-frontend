import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { TagErrorResponseDto } from "@/types/Study/TagErrorResponseDto";
import { TagListResponseDto } from "@/types/Study/TagListResponseDto";
import { useRouter } from "next/navigation";

export const useTag = () => {
  const router = useRouter();

  const tagApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        "x-api-key": process.env.NEXT_PUBLIC_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<TagErrorResponseDto>) => {
        if (!error.response) {
          router.push("/error/internal_server_error");
        } else {
          switch (error.response.status) {
            case axios.HttpStatusCode.BadRequest:
              break;
            case axios.HttpStatusCode.NotFound:
              router.push("/error/not_found");
              break;
            case axios.HttpStatusCode.InternalServerError:
              router.push("/error/internal_server_error");
              break;
            default:
              router.push("/error/internal_server_error");
              break;
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, []);

  const fetchTags = useCallback(
    async (tag: string | null = null): Promise<TagListResponseDto> => {
      const tagsList = await tagApi
        .get("/tag/list", {
          params: { tag },
        })
        .then((response: AxiosResponse): TagListResponseDto => response.data);
      return tagsList;
    },
    [tagApi],
  );

  return { fetchTags } as const;
};
