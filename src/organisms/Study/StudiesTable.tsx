import { StudyResponseDto } from "../../types/StudyResponseDto.ts";
import { Paper, Table, TableContainer } from "@mui/material";
import { StudiesTableHead } from "../../molecules/Study/StudiesTableHead.tsx";
import { StudiesTableBody } from "../../molecules/Study/StudiesTableBody.tsx";

type Props = {
  studyResponseDtos: StudyResponseDto[];
};

/**
 * 学習一覧テーブル
 * @param studyResponseDtos 学習一覧
 */
export const StudiesTable: React.FC<Props> = ({ studyResponseDtos }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <StudiesTableHead />
        {studyResponseDtos && (
          <StudiesTableBody studyResponseDtos={studyResponseDtos} />
        )}
      </Table>
    </TableContainer>
  );
};