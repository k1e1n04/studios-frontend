"use client";
import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { SearchTextField } from "@/molecules/SerachTextFiled";
import { StudiesTable } from "@/organisms/Study/StudiesTable";
import { SearchButton } from "@/atoms/SearchButton";
import { useRouter } from "next/navigation";
import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";
import {StudiesResponseDto} from "@/types/Study/StudiesResponseDto";
import {views} from "@/constants/views";
import {AuthRequiredLayout} from "@/templates/AuthRequiredLayout";

type Props = {
    data: StudiesResponseDto;
    queryTags?: string | null;
    queryTitle?: string | null;
};
/**
 * 学習一覧ページコンポーネント
 * @constructor
 */
export const StudyListPage: React.FC<Props> = ({data, queryTitle, queryTags}) => {
    const router = useRouter();
    const [searchTitle, setSearchTitle] = useState(queryTitle || "");
    const [searchTags, setSearchTags] = useState(queryTags || "");

    // 検索ボタンのクリックハンドラー
    const handleSearch = () => {
        router.push(
            `${views.STUDY_LIST.path}?tags=${searchTags}&title=${searchTitle}`,
        );
    };

    // 次へボタンのクリックハンドラー
    const handleNext = async () => {
        const pageNumber = data.page?.pageNumber === undefined ? 1 : data.page?.pageNumber;
        router.push(`${views.STUDY_LIST.path}?tags=${queryTags}&title=${queryTitle}&page=${pageNumber + 1}`);
    };

    // 前へボタンのクリックハンドラー
    const handlePrevious = async () => {
        // pageはundefinedの場合があるため、undefinedの場合は1にする
        const pageNumber = data.page?.pageNumber === undefined ? 1 : data.page?.pageNumber;
        router.push(`${views.STUDY_LIST.path}?tags=${queryTags}&title=${queryTitle}&page=${pageNumber - 1}`);
    };


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
                    {data.page?.pageElements}/{data.page?.totalElements}件
                </Typography>
                <StudiesTable studyResponseDtos={data.studies} />
                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                    <StyledWhiteButton
                        disabled={data.page?.pageNumber === 1}
                        onClick={handlePrevious}
                    >
                        前へ
                    </StyledWhiteButton>
                    <StyledWhiteButton
                        disabled={data.page?.pageNumber === data.page?.totalPages}
                        onClick={handleNext}
                    >
                        次へ
                    </StyledWhiteButton>
                </Box>
                <div className="text-right mt-2 text-base">
                    {data.page?.pageNumber}/{data.page?.totalPages} ページ
                </div>
            </StyledContainer>
        </AuthRequiredLayout>
    );
}
