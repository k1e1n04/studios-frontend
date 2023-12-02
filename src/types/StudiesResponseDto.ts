import { StudyResponseDto } from "./StudyResponseDto";
import { PageResponseDto } from "./PageResponseDto.ts";

export type StudiesResponseDto = {
  studies: StudyResponseDto[];
  page: PageResponseDto;
};
