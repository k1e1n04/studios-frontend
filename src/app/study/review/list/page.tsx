"use client";
import { useEffect, useState } from "react";
import { useStudy } from "@/hooks/useStudy";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { Box, Typography } from "@mui/material";
import { Layout } from "@/templates/Layout";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { StudiesTable } from "@/organisms/Study/StudiesTable";
import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";
import { Loader, Stack } from "@mantine/core";

/**
 * 復習一覧ページ
 * @constructor
 */
export default function Page() {
  const { fetchReviewStudies } = useStudy();
  const [studyResponseDtos, setStudyResponseDtos] =
    useState<StudyResponseDto[]>();
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
          <StudiesTable studyResponseDtos={studyResponseDtos} />
        ) : (
          <Stack align="center" style={{ marginTop: "20px" }}>
            <Loader color="primary.0" />
          </Stack>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <StyledWhiteButton
            disabled={pageNumber === 1}
            onClick={handlePrevious}
          >
            前へ
          </StyledWhiteButton>
          <StyledWhiteButton
            disabled={pageNumber === totalPages}
            onClick={handleNext}
          >
            次へ
          </StyledWhiteButton>
        </Box>
      </StyledContainer>
    </Layout>
  );
}
