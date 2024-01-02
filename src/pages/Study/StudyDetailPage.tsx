import { useEffect, useState } from "react";
import { Layout } from "../../templates/Layout.tsx";
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
} from "@mui/material";
import Prism from "prismjs";
import { marked } from "marked";
import { StyledDeleteButton } from "../../atoms/StyledDeleteButton.tsx";
import { StyledUpdateButton } from "../../atoms/StyledUpdateButton.tsx";
import { StudyDetail } from "../../organisms/Study/StudyDetail.tsx";

/**
 * 学習詳細ページ
 * @constructor
 */
export const StudyDetailPage: React.FC = () => {
  const { fetchStudy, deleteStudy, completeStudyReview } = useStudy();
  const navigate = useNavigate();
  const [studyResponseDto, setStudyResponseDto] = useState<StudyResponseDto>();
  const [openReviewCompleteModal, setOpenReviewCompleteModal] = useState(false);
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

  const reviewCompleteHandler = async () => {
    if (id === undefined) {
      navigate("/not_found");
      return;
    }
    await completeStudyReview(id);
    updateStudyAfterReview();
  };

  const updateStudyAfterReview = () => {
    if (studyResponseDto === undefined) {
      return;
    }
    setStudyResponseDto({
      ...studyResponseDto,
      number_of_review: studyResponseDto.number_of_review + 1,
    });
  };

  const handleOpenReviewCompleteModal = () => {
    setOpenReviewCompleteModal(true);
  };

  const handleCloseReviewCompleteModal = () => {
    setOpenReviewCompleteModal(false);
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
        <StudyDetail
          studyResponseDto={studyResponseDto}
          handleOpenDeleteModal={handleOpenDeleteModal}
          convertedContent={convertedContent}
          handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
          theme={theme}
        />
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
          <StyledDeleteButton
            onClick={() => {
              studyDeleteHandler();
              handleCloseDeleteModal();
            }}
            variant="contained"
          >
            削除
          </StyledDeleteButton>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openReviewCompleteModal}
        onClose={handleCloseReviewCompleteModal}
      >
        <DialogTitle>復習完了確認</DialogTitle>
        <DialogContent>
          <DialogContentText>
            復習を完了してもよろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReviewCompleteModal} color="primary">
            もう少し復習
          </Button>
          <StyledUpdateButton
            onClick={() => {
              reviewCompleteHandler();
              handleCloseReviewCompleteModal();
            }}
            variant="contained"
          >
            完了
          </StyledUpdateButton>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};
