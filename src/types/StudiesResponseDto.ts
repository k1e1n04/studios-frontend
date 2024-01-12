import { StudyResponseDto } from "./StudyResponseDto";
import { PageResponseDto } from "@/types/PageResponseDto";

export type StudiesResponseDto = {
  studies: StudyResponseDto[];
  page: PageResponseDto;
};
