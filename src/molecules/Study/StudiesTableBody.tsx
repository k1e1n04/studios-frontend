import { StudyResponseDto } from "@/types/StudyResponseDto";
import { Button, TableBody, TableRow } from "@mui/material";
import { StyledTableCell } from "@/atoms/StyledTableCell";
import { useTheme } from "@mui/material/styles";

type Props = {
  studyResponseDtos: StudyResponseDto[];
  isSmallScreen: boolean;
};

/**
 * 学習一覧テーブルのボディ
 * @param studyResponseDtos 学習一覧
 * @param isSmallScreen スクリーンサイズが小さいかどうか
 */
export const StudiesTableBody: React.FC<Props> = ({
  studyResponseDtos,
  isSmallScreen,
}) => {
  const theme = useTheme();
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
              href={`/study/detail/${studyResponseDto.id}`}
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
