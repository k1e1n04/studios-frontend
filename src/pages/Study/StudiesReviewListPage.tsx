import { useEffect, useState } from "react";
import { useStudy } from "../../hooks/useStudy";
import { StudyResponseDto } from "../../types/StudyResponseDto";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "../../templates/Layout.tsx";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { StyledContainer } from "../../atoms/StyledContrainer.tsx";

const StyledTableCell = styled(TableCell)`
  overflow: hidden;
  textoverflow: ellipsis;
  whitespace: nowrap;

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 0.8rem;
  }
`;

export const StudiesReviewListPage: React.FC = () => {
  const { fetchReviewStudies } = useStudy();
  const [studyResponseDtos, setStudyResponseDtos] =
    useState<StudyResponseDto[]>();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  // 現在のページ番号
  const [pageNumber, setPageNumber] = useState<number>(1);
  // ページの総数
  const [totalPages, setTotalPages] = useState<number>();
  // 学習の総数
  const [totalStudies, setTotalStudies] = useState<number>();
  // ページ内の表示件数
  const [pageElements, setPageElements] = useState<number>();

  const limit = 10;

  // 次へボタンのクリックハンドラー
  const handleNext = async () => {
    const studiesResponseDto = await fetchReviewStudies(pageNumber + 1, limit);

    setStudyResponseDtos(studiesResponseDto.studies);
    setTotalPages(studiesResponseDto.page.totalPages);
    setTotalStudies(studiesResponseDto.page.totalElements);
    setPageElements(studiesResponseDto.page.pageElements);
    setPageNumber(studiesResponseDto.page.pageNumber);
  };

  // 前へボタンのクリックハンドラー
  const handlePrevious = async () => {
    const studiesResponseDto = await fetchReviewStudies(pageNumber - 1, limit);

    setStudyResponseDtos(studiesResponseDto.studies);
    setTotalPages(studiesResponseDto.page.totalPages);
    setTotalStudies(studiesResponseDto.page.totalElements);
    setPageElements(studiesResponseDto.page.pageElements);
    setPageNumber(studiesResponseDto.page.pageNumber);
  };

  useEffect(() => {
    (async () => {
      const studiesResponseDto = await fetchReviewStudies(pageNumber, limit);
      setStudyResponseDtos(studiesResponseDto.studies);
      setTotalPages(studiesResponseDto.page.totalPages);
      setTotalStudies(studiesResponseDto.page.totalElements);
      setPageElements(studiesResponseDto.page.pageElements);
      setPageNumber(studiesResponseDto.page.pageNumber);
    })();
  }, [fetchReviewStudies, pageNumber]);

  return (
    <Layout>
      <StyledContainer>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
          }}
        >
          復習一覧
        </Typography>
        <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
          {pageElements}/{totalStudies}件
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
              <TableRow>
                <StyledTableCell
                  sx={{ color: theme.palette.secondary.main, width: "60px" }}
                ></StyledTableCell>
                <StyledTableCell sx={{ color: theme.palette.secondary.main }}>
                  タイトル
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.secondary.main, width: "150px" }}
                >
                  タグ
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.secondary.main, width: "100px" }}
                >
                  復習回数
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.secondary.main, width: "120px" }}
                  align="right"
                >
                  作成日
                </StyledTableCell>
                <StyledTableCell
                  sx={{ color: theme.palette.secondary.main, width: "120px" }}
                  align="right"
                >
                  更新日
                </StyledTableCell>
              </TableRow>
            </TableHead>
            {studyResponseDtos && (
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
            )}
          </Table>
        </TableContainer>
        {!studyResponseDtos && (
          <Stack alignItems={"center"} sx={{ mt: "20px" }}>
            <CircularProgress disableShrink />
          </Stack>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            disabled={pageNumber === 1}
            onClick={handlePrevious}
          >
            前へ
          </Button>
          <Button
            variant="outlined"
            disabled={pageNumber === totalPages}
            onClick={handleNext}
          >
            次へ
          </Button>
        </Box>
      </StyledContainer>
    </Layout>
  );
};
