import { TagResponseDto } from "@/types/TagResponseDto";

export type StudyResponseDto = {
  id: string;
  title: string;
  tags: TagResponseDto[];
  content: string;
  number_of_review: number;
  created_date: string;
  updated_date: string;
};
