import { AxiosResponse } from "axios";
import { useCallback } from "react";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { StudiesResponseDto } from "@/types/Study/StudiesResponseDto";
import { useApi } from "@/hooks/CSR/useApi";

/**
 * Studyに関するカスタムフック(CSR用)
 */
export const useStudy = () => {
  const { authRequiredApi } = useApi();

  const fetchStudies = useCallback(
    async (
      tag: string | null = null,
      title: string | null = null,
      page: number | null = null,
      limit: number = 10,
    ): Promise<StudiesResponseDto> => {
      return await authRequiredApi
        .get("/study/list", {
          params: { tag, title, page, limit },
        })
        .then((response: AxiosResponse): StudiesResponseDto => response.data);
    },
    [authRequiredApi],
  );

  const fetchStudy = useCallback(
    async (id: string | undefined): Promise<StudyResponseDto> => {
      return await authRequiredApi
        .get(`/study/${id}`)
        .then((response: AxiosResponse): StudyResponseDto => response.data);
    },
    [authRequiredApi],
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
    return await authRequiredApi
      .post("/study/register", {
        title: title,
        tags: tags,
        content: contentWithLanguage,
      })
      .then((response) => [response.status, response.data])
      .catch((error) => [error.response.status, error.response.data]);
  };

  const deleteStudy = async (id: string) => {
    return await authRequiredApi
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
    return await authRequiredApi
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
      return await authRequiredApi
        .get("/study/review/list", {
          params: { page, limit },
        })
        .then((response: AxiosResponse): StudiesResponseDto => response.data);
    },
    [authRequiredApi],
  );

  const completeStudyReview = async (id: string) => {
    return await authRequiredApi
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
