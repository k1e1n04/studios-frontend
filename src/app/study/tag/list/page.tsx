"use client"
import { useEffect, useState } from "react";
import { CircularProgress, Grid, Stack } from "@mui/material";
import { Layout } from "@/templates/Layout";
import { useTheme } from "@mui/material/styles";
import { TagListResponseDto } from "@/types/TagListResponseDto";
import { useTag } from "@/hooks/useTag";
import { TagButton } from "@/molecules/Study/Tag/TagButton";
import { StyledContainer } from "@/atoms/StyledContrainer";
import { SeachButton } from "@/atoms/SearchButton";
import { SearchTextField } from "@/molecules/SerachTextFiled";
import { FlexContainer } from "@/atoms/FlexContainer";

/**
 * タグ一覧ページ
 * @constructor
 */
export default function Page() {
  const theme = useTheme();
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
            <SeachButton handleSearch={handleSearch} theme={theme} />
          </Grid>
        </Grid>
        {!tagListResponseDto && (
          <Stack alignItems={"center"}>
            <CircularProgress disableShrink />
          </Stack>
        )}
        <FlexContainer>
          {tagListResponseDto?.tags.map((tag) => <TagButton tag={tag.name} />)}
        </FlexContainer>
      </StyledContainer>
    </Layout>
  );
};
