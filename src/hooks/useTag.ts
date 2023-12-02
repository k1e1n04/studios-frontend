import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TagErrorResponseDto } from "../types/TagErrorResponseDto";
import { TagListResponseDto } from "../types/TagListResponseDto";

export const useTag = () => {
    const navigate = useNavigate();
    const tagApi = useMemo((): AxiosInstance => {
      const axiosInstance = axios.create({
        baseURL:
        import.meta.env.VITE_API_BASE_URL,
        timeout: 30000,
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      });
      axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error: AxiosError<TagErrorResponseDto>) => {
          if (!error.response) {
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
        }
      );
      return axiosInstance;
    }, [navigate]);

    const fetchTags = useCallback(
      async (name: string | null = null): Promise<TagListResponseDto> => {
        const tagsList = await tagApi
          .get("/tags", {
            params: { name },
          })
          .then(
            (response: AxiosResponse): TagListResponseDto => response.data.tags
          );
        return tagsList;
      },
      [tagApi]
    );

    const deleteTag = async (name: string): Promise<void> => {
      await tagApi.delete(`/tag/${name}`);
      
    };

    return { fetchTags, deleteTag } as const;
  };
