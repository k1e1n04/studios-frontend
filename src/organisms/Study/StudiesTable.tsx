import { StudyResponseDto } from "@/types/StudyResponseDto";
import { Paper, Table, TableContainer } from "@mui/material";
import { StudiesTableHead } from "@/molecules/Study/StudiesTableHead";
import { StudiesTableBody } from "@/molecules/Study/StudiesTableBody";

type Props = {
  studyResponseDtos: StudyResponseDto[];
};

/**
 * 学習一覧テーブル
 * @param studyResponseDtos 学習レスポンスDTOリスト
 * @param
 */
export const StudiesTable: React.FC<Props> = ({
  studyResponseDtos,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <StudiesTableHead />
        {studyResponseDtos && (
          <StudiesTableBody
            studyResponseDtos={studyResponseDtos}
          />
        )}
      </Table>
    </TableContainer>
  );
};
