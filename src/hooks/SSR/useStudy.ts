import { useApi } from "@/hooks/SSR/useApi";
import { useCallback } from "react";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { AxiosResponse } from "axios";

/**
 * Studyのカスタムフック(SSR用)
 */
export const useStudy = () => {
  const { authRequiredApi } = useApi();

  const fetchStudy = useCallback(
    async (id: string | undefined): Promise<StudyResponseDto> => {
      return await authRequiredApi
        .get(`/study/${id}`)
        .then((response: AxiosResponse): StudyResponseDto => response.data);
    },
    [authRequiredApi],
  );

  return { fetchStudy } as const;
};
