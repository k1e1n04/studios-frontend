import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { TableBody, TableRow } from "@mui/material";
import { StyledTableCell } from "@/atoms/StyledTableCell";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";
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
    <TableBody>
      {studyResponseDtos.map((studyResponseDto: StudyResponseDto) => (
        <TableRow
          key={studyResponseDto.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell scope="row">
            <Link href={`/study/detail/${studyResponseDto.id}`}>
              <StyledPrimaryButton>詳細</StyledPrimaryButton>
            </Link>
          </StyledTableCell>
          <StyledTableCell>{studyResponseDto.title}</StyledTableCell>
          <StyledTableCell>
            {studyResponseDto.tags.map((tag) => tag.name).join(", ")}
          </StyledTableCell>
          <StyledTableCell align="right">
            {studyResponseDto.number_of_review} 回
          </StyledTableCell>
          <StyledTableCell align="right">
            {studyResponseDto.created_date}
          </StyledTableCell>
          <StyledTableCell align="right">
            {studyResponseDto.updated_date}
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
