import { AxiosResponse } from "axios";
import { useCallback, useMemo } from "react";
import { TagListResponseDto } from "@/types/Study/TagListResponseDto";
import {useApi} from "@/hooks/useApi";

export const useTag = () => {
  const { authRequiredApi } = useApi();

  const fetchTags = useCallback(
    async (tag: string | null = null): Promise<TagListResponseDto> => {
      return await authRequiredApi
        .get("/tag/list", {
          params: { tag },
        })
        .then((response: AxiosResponse): TagListResponseDto => response.data);
    },
    [authRequiredApi],
  );

  return { fetchTags } as const;
};
