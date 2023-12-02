import { TagResponseDto } from "./TagResponseDto.ts";

export type StudyResponseDto = {
  id: string;
  title: string;
  tags: TagResponseDto[];
  content: string;
  created_date: string;
  updated_date: string;
};
