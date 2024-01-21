import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { TableHead } from "@/molecules/TableHead";
import { StudiesTableBody } from "@/molecules/Study/StudiesTableBody";
import { Table } from "@mantine/core";
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
        background-color: light-dark(
          var(--mantine-color-gray-0),
          var(--mantine-color-dark-6)
        );
        opacity: 1;
      }
    }
  `;
  const studyTableHeadList = [
    {
      headName: "",
      width: "60px",
    },
    {
      headName: "タイトル",
      width: "300px",
    },
    {
      headName: "タグ",
      width: "150px",
    },
    {
      headName: "復習回数",
      width: "100px",
    },
    {
      headName: "作成日",
      width: "120px",
    },
    {
      headName: "更新日",
      width: "120px",
    },
  ];
  return (
    <StyledTableContainer minWidth="900px">
      <Table withTableBorder>
        <TableHead headList={studyTableHeadList} />
        {studyResponseDtos && (
          <StudiesTableBody studyResponseDtos={studyResponseDtos} />
        )}
      </Table>
    </StyledTableContainer>
  );
};
