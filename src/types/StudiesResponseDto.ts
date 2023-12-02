import { StudyResponseDto } from "./StudyResponseDto";

export type StudiesResponseDto = {
  studies: StudyResponseDto[];
  lastEvaluatedKey: string | null;
  totalCount: number;
};
