"use client";
import { useEffect, useState } from "react";
import { useStudy } from "@/hooks/useStudy";
import { StudyResponseDto } from "@/types/StudyResponseDto";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "@/templates/Layout";
import { useTheme } from "@mui/material/styles";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { StudiesTable } from "@/organisms/Study/StudiesTable";

/**
 * 復習一覧ページ
 * @constructor
 */
export default function Page() {
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
      </StyledContainer>
    </Layout>
  );
}
