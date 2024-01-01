import { StudyResponseDto } from "../../types/StudyResponseDto.ts";
import { Button, TableBody, TableRow, useMediaQuery } from "@mui/material";
import { StyledTableCell } from "../../atoms/StyledTableCell.tsx";
import { useTheme } from "@mui/material/styles";

type Props = {
  studyResponseDtos: StudyResponseDto[];
};

/**
 * 学習一覧テーブルのボディ
 * @param studyResponseDtos 学習一覧
 */
export const StudiesTableBody: React.FC<Props> = ({ studyResponseDtos }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <TableBody>
      {studyResponseDtos.map((studyResponseDto: StudyResponseDto) => (
        <TableRow
          key={studyResponseDto.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <StyledTableCell scope="row">
            <Button
              variant="contained"
              color="primary"
              href={`/study/${studyResponseDto.id}`}
              sx={{
                color: theme.palette.secondary.main,
                fontSize: isSmallScreen ? "0.7rem" : "0.8rem",
              }}
            >
              詳細
            </Button>
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