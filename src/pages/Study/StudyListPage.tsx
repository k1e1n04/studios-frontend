import { useEffect, useState } from "react";
import { useStudy } from "../../hooks/useStudy";
import { StudyResponseDto } from "../../types/StudyResponseDto";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
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
import { Layout } from "../../components/layouts/Layout/Layout";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledContainer } from "../../components/containers/StyledContrainer";
import { SearchTextField } from "../../components/inputs/SerachTextFiled";

const StyledTableCell = styled(TableCell)`
  overflow: hidden;
  textoverflow: ellipsis;
  whitespace: nowrap;

  @media (max-width: 768px) {
    max-width: 100px;
    font-size: 0.8rem;
  }
`;

export const StudyListPage: React.FC = () => {
  const { fetchStudies } = useStudy();
  const [studyResponseDtos, setStudyResponseDtos] =
    useState<StudyResponseDto[]>();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const queryTags = queryParams.get("tags");
  const queryTitle = queryParams.get("title");
  const [searchTitle, setSearchTitle] = useState(queryTitle || "");
  const [searchTags, setSearchTags] = useState(queryTags || "");
  // 現在のページ番号
  const [pageNumber, setPageNumber] = useState<number>(1);
  // ページの総数
  const [totalPages, setTotalPages] = useState<number>();
  // 学習の総数
  const [totalStudies, setTotalStudies] = useState<number>();
  // ページ内の表示件数
  const [pageElements, setPageElements] = useState<number>();

  const limit = 10;

  const handleSearch = () => {
    navigate(`/?tags=${searchTags}&title=${searchTitle}`);
  };

  // 次へボタンのクリックハンドラー
  const handleNext = async () => {
    const studiesResponseDto = await fetchStudies(
      queryTags === null ? "" : queryTags,
      queryTitle === null ? "" : queryTitle,
      pageNumber + 1,
      limit,
    );

    setStudyResponseDtos(studiesResponseDto.studies);
    setTotalPages(studiesResponseDto.page.totalPages);
    setTotalStudies(studiesResponseDto.page.totalElements);
    setPageElements(studiesResponseDto.page.pageElements);
    setPageNumber(studiesResponseDto.page.pageNumber);
  };

  // 前へボタンのクリックハンドラー
  const handlePrevious = async () => {
    const studiesResponseDto = await fetchStudies(
      queryTags || "",
      queryTitle || "",
      pageNumber - 1,
      limit,
    );

    setStudyResponseDtos(studiesResponseDto.studies);
    setTotalPages(studiesResponseDto.page.totalPages);
    setTotalStudies(studiesResponseDto.page.totalElements);
    setPageElements(studiesResponseDto.page.pageElements);
    setPageNumber(studiesResponseDto.page.pageNumber);
  };

  useEffect(() => {
    (async () => {
      const studiesResponseDto = await fetchStudies(
        queryTags === null ? "" : queryTags,
        queryTitle === null ? "" : queryTitle,
        pageNumber,
        limit,
      );
      setStudyResponseDtos(studiesResponseDto.studies);
      setTotalPages(studiesResponseDto.page.totalPages);
      setTotalStudies(studiesResponseDto.page.totalElements);
      setPageElements(studiesResponseDto.page.pageElements);
      setPageNumber(studiesResponseDto.page.pageNumber);
    })();
  }, [fetchStudies, queryTags, queryTitle]);

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
          学び一覧
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={12} md={5}>
            <SearchTextField
              label="タイトルで検索"
              searchTarget={searchTitle}
              setSearchTarget={setSearchTitle}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <SearchTextField
              label="タグで検索"
              searchTarget={searchTags}
              setSearchTarget={setSearchTags}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ width: "100%", color: theme.palette.secondary.main }}
            >
              検索
            </Button>
          </Grid>
        </Grid>
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
