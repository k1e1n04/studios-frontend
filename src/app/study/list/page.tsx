"use client";
import React, { useEffect, useState } from "react";
import { useStudy } from "@/hooks/CSR/useStudy";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { Box, Grid, Typography } from "@mui/material";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { SearchTextField } from "@/molecules/SerachTextFiled";
import { StudiesTable } from "@/organisms/Study/StudiesTable";
import { SearchButton } from "@/atoms/SearchButton";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";
import { Loader, Stack } from "@mantine/core";
import { views } from "@/constants/views";
import { AuthRequiredLayout } from "@/templates/AuthRequiredLayout";

/**
 * 学習一覧ページ
 * @constructor
 */
export default function Page() {
  const { fetchStudies } = useStudy();
  const [studyResponseDtos, setStudyResponseDtos] =
    useState<StudyResponseDto[]>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryTags = searchParams?.get("tags");
  const queryTitle = searchParams?.get("title");
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
    router.push(
      `${views.STUDY_LIST.path}?tags=${searchTags}&title=${searchTitle}`,
    );
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
    <AuthRequiredLayout>
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
            <SearchButton handleSearch={handleSearch} />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" align="right" sx={{ mt: 2 }}>
          {pageElements}/{totalStudies}件
        </Typography>
        {studyResponseDtos ? (
          <StudiesTable studyResponseDtos={studyResponseDtos} />
        ) : (
          <Stack
            align="center"
            style={{
              marginTop: "20px",
            }}
          >
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
        <div className="text-right mt-2 text-base">
          {pageNumber}/{totalPages} ページ
        </div>
      </StyledContainer>
    </AuthRequiredLayout>
  );
}
