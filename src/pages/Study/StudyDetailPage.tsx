import { useEffect, useState } from "react";
import { Layout } from "../../templates/Layout.tsx";
import { useStudy } from "../../hooks/useStudy";
import { StudyResponseDto } from "../../types/StudyResponseDto";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import {
  CircularProgress,
  Stack,
} from "@mui/material";
import Prism from "prismjs";
import { marked } from "marked";
import { StudyDetail } from "../../organisms/Study/StudyDetail.tsx";
import { DeleteDialog } from "../../molecules/DeleteDialog.tsx";
import { ConfirmDialog } from "../../molecules/ConfirmDialog.tsx";

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

  /**
   * 学習削除ハンドラー
   */
  const studyDeleteHandler = async () => {
    if (id === undefined) {
      navigate("/not_found");
      return;
    }
    await deleteStudy(id);
    navigate("/");
  };

  /**
   * 復習完了ハンドラー
   */
  const reviewCompleteHandler = async () => {
    if (id === undefined) {
      navigate("/not_found");
      return;
    }
    await completeStudyReview(id);
    updateStudyAfterReview();
  };

  /**
   * 復習完了後の学習情報を更新
   */
  const updateStudyAfterReview = () => {
    if (studyResponseDto === undefined) {
      return;
    }
    setStudyResponseDto({
      ...studyResponseDto,
      number_of_review: studyResponseDto.number_of_review + 1,
    });
  };

  /**
   * 復習完了モーダルを開くハンドラー
   */
  const handleOpenReviewCompleteModal = () => {
    setOpenReviewCompleteModal(true);
  };

  /**
   * 復習完了モーダルを閉じるハンドラー
   */
  const handleCloseReviewCompleteModal = () => {
    setOpenReviewCompleteModal(false);
  };

  /**
   * 削除モーダルを開くハンドラー
   */
  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  /**
   * 削除モーダルを閉じるハンドラー
   */
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
      <DeleteDialog
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={studyDeleteHandler}
      />
      <ConfirmDialog
        title={"復習完了確認"}
        content={"復習を完了してもよろしいですか？"}
        open={openReviewCompleteModal}
        handleClose={handleCloseReviewCompleteModal}
        handleConfirm={reviewCompleteHandler}
      />
    </Layout>
  );
};
