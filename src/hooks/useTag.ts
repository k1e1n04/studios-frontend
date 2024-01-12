import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { TagErrorResponseDto } from "@/types/TagErrorResponseDto";
import { TagListResponseDto } from "@/types/TagListResponseDto";
import { redirect } from "next/navigation";

export const useTag = () => {
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
          redirect("/error/internal_server_error");
        }
        switch (error.response.status) {
          case axios.HttpStatusCode.BadRequest:
            break;
          case axios.HttpStatusCode.NotFound:
            redirect("/error/not_found");
            break;
          case axios.HttpStatusCode.InternalServerError:
            redirect("/error/internal_server_error");
            break;
          default:
            redirect("/error/internal_server_error");
            break;
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
