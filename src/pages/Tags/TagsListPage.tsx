import { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Layout } from "../../components/layouts/Layout/Layout";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TagListResponseDto } from "../../types/TagListResponseDto";
import { useTag } from "../../hooks/useTag";

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

const DeleteButton = styled(Button)`
  background-color: #f06060;
  color: white;

  &:hover {
    background-color: #fabebb;
  }
`;

export const TagListPage: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [tagListResponseDto, setTagListResponseDto] =
    useState<TagListResponseDto>();
  const { fetchTags, deleteTag } = useTag();
  const [openActionModal, setOpenActionModal] = useState(false);
  const [selectedTagName, setSelectedTagName] = useState<string>("");
  const [searchTag, setSearchTag] = useState<string>("");

  const handleSearch = async () => {
    const tagListResponseDto = await fetchTags(searchTag);
    setTagListResponseDto(tagListResponseDto);
  };

  const handleCloseActionModal = () => {
    setOpenActionModal(false);
    setSelectedTagName("");
  };

  const handleOpenActionModal = (tagName: string) => {
    setOpenActionModal(true);
    setSelectedTagName(tagName);
  };

  const tagDeleteHandler = async (name: string) => {
    await deleteTag(name);
    // tagListResponseDtoから削除したタグを除外する
    const newTagListResponseDto = tagListResponseDto?.filter(
      (tag) => tag !== name
    );
    setTagListResponseDto(newTagListResponseDto);
  };

  const tagShowRelatedItemsHandler = () => {
    navigate(`/?tags=${selectedTagName}`);
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
          {tagListResponseDto?.map((tag) => (
            <Button
              key={tag}
              variant="outlined"
              sx={{
                m: 1,
              }}
              onClick={() => handleOpenActionModal(tag)}
            >
              {tag}
            </Button>
          ))}
        </TagsContainer>
        <Dialog open={openActionModal} onClose={handleCloseActionModal}>
          <DialogTitle>アクション</DialogTitle>
          <DialogContent>
            <DialogContentText>
              「{selectedTagName}」タグに
              <br />
              どのアクションを実行しますか？
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseActionModal} color="primary">
              キャンセル
            </Button>
            <DeleteButton
              onClick={() => {
                tagDeleteHandler(selectedTagName);
                handleCloseActionModal();
              }}
              variant="contained"
            >
              削除
            </DeleteButton>
            <Button
              onClick={tagShowRelatedItemsHandler}
              variant="contained"
              sx={{ color: "white" }}
            >
              関連する投稿を表示
            </Button>
          </DialogActions>
        </Dialog>
      </StyledContainer>
    </Layout>
  );
};
