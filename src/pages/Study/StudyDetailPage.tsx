import { useEffect, useState } from "react";
import { Layout } from "../../components/layouts/Layout/Layout";
import { useStudy } from "../../hooks/useStudy";
import { StudyResponseDto } from "../../types/StudyResponseDto";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import styled from "styled-components";
import Prism from "prismjs";
import { StyledContainer } from "../../components/containers/StyledContrainer";
import { marked } from 'marked';

const DateAndDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px; // ボタン間の隙間
`;

const DeleteButton = styled(Button)`
  background-color: #f06060;
  color: white;

  &:hover {
    background-color: #fabebb;
  }
`;

const UpdateButton = styled(Button)`
  background-color: #659cba;
  color: white;

  &:hover {
    background-color: #74a6c1;
    color: white;
  }
`;

const TagsButton = styled(Button)`
  background-color: ${grey[500]};
  color: white;
  margin: 2px;

  &:hover {
    background-color: ${grey[300]};
    color: white;
  }
`;

export const StudyDetailPage: React.FC = () => {
  const { fetchStudy, deleteStudy } = useStudy();
  const navigate = useNavigate();
  const [studyResponseDto, setStudyResponseDto] = useState<StudyResponseDto>();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const theme = useTheme();
  // パスパラメーターからidを取得
  const { id } = useParams();
  const [convertedContent, setConvertedContent] = useState<string>("");

  useEffect(() => {
    if (id === undefined) {
      navigate("/not_found");
      return;
    }
    (async () => {
      const study = await fetchStudy(id);
      setStudyResponseDto(study);
      // マークダウンをHTMLに変換
      const html = marked(study.content);
      setConvertedContent(html);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchStudy, id, navigate]);

  // DOMが更新された後にハイライトを再適用
  useEffect(() => {
    Prism.highlightAll();
  }, [convertedContent]); // 依存配列に変換結果を追加

  const studyDeleteHandler = async () => {
    if (id === undefined) {
      navigate("/not_found");
      return;
    }
    await deleteStudy(id);
    navigate("/");
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <Layout>
      {studyResponseDto ? (
        <StyledContainer>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              mb: 3,
              borderBottom: "1px rgb(0 0 0 / 12%) solid",
            }}
          >
            {studyResponseDto.title}
          </Typography>
          <DateAndDeleteContainer>
            <div>
              <Typography align="left">
                投稿日 {studyResponseDto.created_date}
              </Typography>
              <Typography align="left">
                更新日 {studyResponseDto.updated_date}
              </Typography>
            </div>
            <ButtonsContainer>
              <UpdateButton
                variant="contained"
                sx={{ color: theme.palette.secondary.main }}
                href={`/study/update/${id}`}
              >
                更新
              </UpdateButton>
              <DeleteButton onClick={handleOpenDeleteModal} variant="contained">
                削除
              </DeleteButton>
            </ButtonsContainer>
          </DateAndDeleteContainer>
          <TagsButton
            variant="contained"
            sx={{
              backgroundColor: grey[500],
              color: theme.palette.secondary.main,
              mt: 2,
            }}
            href={`/?tags=${studyResponseDto.tags}`}
          >
            {studyResponseDto.tags}
          </TagsButton>

          <div className="markdown" style={{ marginTop: "20px" }}
            dangerouslySetInnerHTML={{
              __html:convertedContent,
            }}
          />
        </StyledContainer>
      ) : (
        <Stack alignItems={"center"}>
          <CircularProgress disableShrink />
        </Stack>
      )}
      <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>削除確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            本当に削除してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteModal} color="primary">
            キャンセル
          </Button>
          <DeleteButton
            onClick={() => {
              studyDeleteHandler();
              handleCloseDeleteModal();
            }}
            variant="contained"
          >
            削除
          </DeleteButton>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
