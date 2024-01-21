import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { StyledTableRow } from "@/atoms/StyledTableRow";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";
import { Table } from '@mantine/core';
import Link from "next/link";

type Props = {
  studyResponseDtos: StudyResponseDto[];
};

/**
 * 学習一覧テーブルのボディ
 * @param studyResponseDtos 学習一覧
 */
export const StudiesTableBody: React.FC<Props> = ({ studyResponseDtos }) => {
  return (
    <Table.Tbody>
      {studyResponseDtos.map((studyResponseDto: StudyResponseDto) => (
        <Table.Tr
          key={studyResponseDto.id}
        >
          <StyledTableRow>
            <Link href={`/study/detail/${studyResponseDto.id}`}>
              <StyledPrimaryButton>詳細</StyledPrimaryButton>
            </Link>
          </StyledTableRow>
          <StyledTableRow>{studyResponseDto.title}</StyledTableRow>
          <StyledTableRow>
            {studyResponseDto.tags.map((tag) => tag.name).join(", ")}
          </StyledTableRow>
          <StyledTableRow>
            {studyResponseDto.number_of_review} 回
          </StyledTableRow>
          <StyledTableRow>
            {studyResponseDto.created_date}
          </StyledTableRow>
          <StyledTableRow>
            {studyResponseDto.updated_date}
          </StyledTableRow>
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};
