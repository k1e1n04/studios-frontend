import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "../../templates/Layout.tsx";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { TagListResponseDto } from "../../types/TagListResponseDto";
import { useTag } from "../../hooks/useTag";
import {TagButton} from "../../molecules/Study/Tag/TagButton.tsx";

const StyledContainer = styled(Container)`
  width: 100%;
  max-width: 90vw;
  margin: 0 auto;
  padding: 5%;
  background-color: #fff;
  border-radius: 10px;

  @media (min-width: 768px) and (max-width: 1024px) {
    padding: 4%;
  }

  @media (max-width: 767px) {
    padding: 3%;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

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
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            fontSize: isSmallScreen ? "1.2rem" : "1.5rem",
          }}
        >
          タグ一覧
        </Typography>
        <Grid container spacing={2} sx={{ marginBottom: 2 }}>
          <Grid item xs={6} md={3}>
            <TextField
              label="タグで検索"
              variant="outlined"
              value={searchTag}
              onChange={(e) => setSearchTag(e.target.value)}
              sx={{ width: "100%", backgroundColor: "#fff" }}
              InputProps={{
                sx: {
                  height: "40px",
                },
              }}
              InputLabelProps={{
                sx: {
                  fontSize: "0.6rem",
                },
              }}
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
        {!tagListResponseDto && (
          <Stack alignItems={"center"}>
            <CircularProgress disableShrink />
          </Stack>
        )}
        <TagsContainer>
          {tagListResponseDto?.tags.map((tag) => (
            <TagButton tag={tag.name} />
          ))}
        </TagsContainer>
      </StyledContainer>
    </Layout>
  );
};
