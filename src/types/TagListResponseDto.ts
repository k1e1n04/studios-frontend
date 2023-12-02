import { TagResponseDto } from "./TagResponseDto.ts";

/**
 * タグ一覧レスポンスDTO
 *
 * @property tags タグ一覧
 */
export type TagListResponseDto = {
  tags: TagResponseDto[];
};
