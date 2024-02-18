import { useApi } from "@/hooks/SSR/useApi";
import { useCallback } from "react";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { AxiosResponse } from "axios";
import {StudiesResponseDto} from "@/types/Study/StudiesResponseDto";

/**
 * Studyのカスタムフック(SSR用)
 */
export const useStudy = () => {
  const { authRequiredApi } = useApi();

  /**
   * 学習を取得する
   * @param id - ID
   * @returns StudyResponseDto - 学習レスポンスDTO
   */
  const fetchStudy = useCallback(
    async (id: string | undefined): Promise<StudyResponseDto> => {
      return await authRequiredApi
        .get(`/study/${id}`)
        .then((response: AxiosResponse): StudyResponseDto => response.data);
    },
    [authRequiredApi],
  );

  /**
   * 学習一覧を取得する
   * @param tag - タグ
   * @param title - タイトル
   * @param page - ページ
   * @param limit - 件数
   * @returns StudiesResponseDto - 学習一覧レスポンスDTO
   */
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

  return { fetchStudy, fetchStudies } as const;
};
