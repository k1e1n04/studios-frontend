import { useEffect, useState } from "react";
import { useStudy } from "@/hooks/useStudy";
import { StudyResponseDto } from "@/types/StudyResponseDto";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "@/templates/Layout";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { SearchTextField } from "@/molecules/SerachTextFiled";
import { StudiesTable } from "@/organisms/Study/StudiesTable";
import { SeachButton } from "@/atoms/SearchButton";

/**
 * 学習一覧ページ
 * @constructor
 */
export const List: React.FC = () => {
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
  }, [fetchStudies, pageNumber, queryTags, queryTitle]);

  return (
    <Layout>
      <StyledContainer>
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
            <SeachButton handleSearch={handleSearch} theme={theme} />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
          {pageElements}/{totalStudies}件
        </Typography>
        {studyResponseDtos ? (
          <StudiesTable
            studyResponseDtos={studyResponseDtos}
            isSmallScreen={isSmallScreen}
          />
        ) : (
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
        <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
          {pageNumber}/{totalPages}ページ
        </Typography>
      </StyledContainer>
    </Layout>
  );
};
