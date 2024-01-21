import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { StudiesTableHead } from "@/molecules/Study/StudiesTableHead";
import { StudiesTableBody } from "@/molecules/Study/StudiesTableBody";
import { Table } from "@mantine/core";
import {css} from "@emotion/react";
import styled from "@emotion/styled";

type Props = {
  studyResponseDtos: StudyResponseDto[];
};

/**
 * 学習一覧テーブル
 * @param studyResponseDtos 学習レスポンスDTOリスト
 * @param
 */
export const StudiesTable: React.FC<Props> = ({ studyResponseDtos }) => {
    const StyledTableContainer = styled(Table.ScrollContainer)`
        border-radius: 10px;
        overflow: hidden;
        .scrollbar {
          .corner {
            background-color: light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6));
            opacity: 1;
          }
        }
    `;
  return (
    <StyledTableContainer minWidth="900px">
      <Table withTableBorder >
        <StudiesTableHead />
        {studyResponseDtos && (
          <StudiesTableBody studyResponseDtos={studyResponseDtos} />
        )}
      </Table>
    </StyledTableContainer>
  );
};
