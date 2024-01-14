import { TagResponseDto } from "@/types/Study/TagResponseDto";

/**
 * タグ一覧レスポンスDTO
 *
 * @property tags タグ一覧
 */
export type TagListResponseDto = {
  tags: TagResponseDto[];
};
