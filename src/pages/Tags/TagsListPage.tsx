import { useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "../../templates/Layout.tsx";
import { useTheme } from "@mui/material/styles";
import { TagListResponseDto } from "../../types/TagListResponseDto";
import { useTag } from "../../hooks/useTag";
import { TagButton } from "../../molecules/Study/Tag/TagButton.tsx";
import { StyledContainer } from "../../atoms/StyledContrainer.tsx";
import { SeachButton } from "../../atoms/SearchButton.tsx";
import { SearchTextField } from "../../molecules/SerachTextFiled.tsx";
import { FlexContainer } from "../../atoms/FlexContainer.tsx";

/**
 * タグ一覧ページ
 * @constructor
 */
export const TagListPage: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
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
