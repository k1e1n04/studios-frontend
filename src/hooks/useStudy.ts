import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { StudyErrorResponseDto } from "@/types/Study/StudyErrorResponseDto";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { StudiesResponseDto } from "@/types/Study/StudiesResponseDto";
import { useRouter } from "next/navigation";

export const useStudy = () => {
  const router = useRouter();

  const studyApi = useMemo((): AxiosInstance => {
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
      (error: AxiosError<StudyErrorResponseDto>) => {
        if (!error.response) {
          router.push("/error/internal_server_error");
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
              router.push("/error/not_found");
              break;
            case axios.HttpStatusCode.InternalServerError:
              router.push("/error/internal_server_error");
              break;
            default:
              router.push("/error/internal_server_error");
          }
        }
        return Promise.reject(error);
      },
    );
    return axiosInstance;
  }, []);

  const fetchStudies = useCallback(
    async (
      tag: string | null = null,
      title: string | null = null,
      page: number | null = null,
      limit: number = 10,
    ): Promise<StudiesResponseDto> => {
      return await studyApi
        .get("/study/list", {
          params: { tag, title, page, limit },
        })
        .then((response: AxiosResponse): StudiesResponseDto => response.data);
    },
    [studyApi],
  );

  const fetchStudy = useCallback(
    async (id: string | undefined): Promise<StudyResponseDto> => {
      return await studyApi
        .get(`/study/${id}`)
        .then((response: AxiosResponse): StudyResponseDto => response.data);
    },
    [studyApi],
  );

  const createStudy = async (
    title: string,
    tags: string[],
    content: string,
  ) => {
    // <pre><code>にclassが指定されていない場合、highlight.jsが動作しないため、"language-plaintext"を指定する
    const contentWithLanguage = content.replace(
      /<pre><code>/g,
      '<pre><code class="language-plaintext">',
    );
    return await studyApi
      .post("/study/register", {
        title: title,
        tags: tags,
        content: contentWithLanguage,
      })
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
  };

  const deleteStudy = async (id: string) => {
    return await studyApi
      .delete(`/study/delete/${id}`)
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
  };

  const updateStudy = async (
    id: string,
    title: string,
    tags: string[],
    content: string,
  ) => {
    // <pre><code>にclassが指定されていない場合、highlight.jsが動作しないため、"language-plaintext"を指定する
    const contentWithLanguage = content.replace(
      /<pre><code>/g,
      '<pre><code class="language-plaintext">',
    );
    return await studyApi
      .put(`/study/update/${id}`, {
        title: title,
        tags: tags,
        content: contentWithLanguage,
      })
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
  };

  const fetchReviewStudies = useCallback(
    async (
      page: number | null = null,
      limit: number = 10,
    ): Promise<StudiesResponseDto> => {
      return await studyApi
        .get("/study/review/list", {
          params: { page, limit },
        })
        .then((response: AxiosResponse): StudiesResponseDto => response.data);
    },
    [studyApi],
  );

  const completeStudyReview = async (id: string) => {
    return await studyApi
      .put(`/study/review/complete/${id}`)
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
  };

  return {
    fetchStudies,
    createStudy,
    fetchStudy,
    deleteStudy,
    fetchReviewStudies,
    completeStudyReview,
    updateStudy,
  } as const;
};
