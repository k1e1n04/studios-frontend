"use client";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { Layout } from "@/templates/Layout";
import { TagListResponseDto } from "@/types/Study/TagListResponseDto";
import { useTag } from "@/hooks/useTag";
import { TagButton } from "@/molecules/Study/Tag/TagButton";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { SearchButton } from "@/atoms/SearchButton";
import { SearchTextField } from "@/molecules/SerachTextFiled";
import { FlexContainer } from "@/atoms/FlexContainer";
import {Loader, Stack} from "@mantine/core";

/**
 * タグ一覧ページ
 * @constructor
 */
export default function Page() {
  const [tagListResponseDto, setTagListResponseDto] =
    useState<TagListResponseDto>();
  const { fetchTags } = useTag();
  const [searchTag, setSearchTag] = useState<string>("");

  const handleSearch = async () => {
    const tagListResponseDto = await fetchTags(searchTag);
    setTagListResponseDto(tagListResponseDto);
  };

  useEffect(() => {
    (async () => {
      const tagListResponseDto = await fetchTags();
      setTagListResponseDto(tagListResponseDto);
    })();
  }, [fetchTags]);

  return (
    <Layout>
      <StyledContainer>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6} md={3}>
            <SearchTextField
              label={"タグで検索"}
              searchTarget={searchTag}
              setSearchTarget={setSearchTag}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <SearchButton handleSearch={handleSearch} />
          </Grid>
        </Grid>
        {!tagListResponseDto && (
          <Stack align="center">
            <Loader color="primary.0" />
          </Stack>
        )}
        <FlexContainer>
          {tagListResponseDto?.tags.map((tag) => (
            <TagButton key={tag.name} tag={tag.name} />
          ))}
        </FlexContainer>
      </StyledContainer>
    </Layout>
  );
}
