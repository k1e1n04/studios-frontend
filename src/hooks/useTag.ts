import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TagErrorResponseDto } from "@/types/TagErrorResponseDto";
import { TagListResponseDto } from "@/types/TagListResponseDto";

export const useTag = () => {
  const navigate = useNavigate();
  const tagApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        "x-api-key": import.meta.env.VITE_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<TagErrorResponseDto>) => {
        if (axios.isCancel(error)) {
          navigate("/internal_server_error");
        }
        if (!error.response) {
            navigate("/internal_server_error");
          return Promise.reject(error);
        }
        switch (error.response.status) {
          case axios.HttpStatusCode.BadRequest:
            break;
          case axios.HttpStatusCode.NotFound:
            navigate("/not_found");
            break;
          case axios.HttpStatusCode.InternalServerError:
            navigate("/internal_server_error");
            break;
          default:
            navigate("/internal_server_error");
            break;
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, [navigate]);

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
