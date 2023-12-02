import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { StudyErrorResponseDto } from "../types/StudyErrorResponseDto";
import { StudyResponseDto } from "../types/StudyResponseDto";
import { StudiesResponseDto } from "../types/StudiesResponseDto";

export const useStudy = () => {
  const navigate = useNavigate();
  const studyApi = useMemo((): AxiosInstance => {
    const axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 30000,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        'x-api-key': import.meta.env.VITE_APIGATEWAY_API_KEY,
      },
    });
    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<StudyErrorResponseDto>) => {
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
      },
    );
    return axiosInstance;
  }, [navigate]);

  const fetchStudies = useCallback(
    async (
      tags: string | null = null,
      title: string | null = null,
      page: number | null = null,
      limit: number = 10,
    ): Promise<StudiesResponseDto> => {
      const studiesResponseDto = await studyApi
        .get("/study/list", {
          params: { tags, title, page, limit },
        })
        .then((response: AxiosResponse): StudiesResponseDto => response.data);
      return studiesResponseDto;
    },
    [studyApi],
  );

  const fetchStudy = useCallback(
    async (id: string | undefined): Promise<StudyResponseDto> => {
      const studyResponseDto = await studyApi
        .get(`/study/${id}`)
        .then((response: AxiosResponse): StudyResponseDto => response.data);
      return studyResponseDto;
    },
    [studyApi],
  );

  const createStudy = async (
    title: string,
    tags: string[],
    content: string,
  ) => {
    const response = await studyApi
      .post("/study/register", {
        title: title,
        tags: tags,
        content: content,
      })
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
    return response;
  };

  const deleteStudy = async (id: string) => {
    const response = await studyApi
      .delete(`/study/delete/${id}`)
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
    return response;
  };

  const updateStudy = async (
    id: string,
    title: string,
    tags: string[],
    content: string,
  ) => {
    const response = await studyApi
      .put(`/study/update/${id}`, {
        title: title,
        tags: tags,
        content: content,
      })
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
    return response;
  };

  return {
    fetchStudies,
    createStudy,
    fetchStudy,
    deleteStudy,
    updateStudy,
  } as const;
};
