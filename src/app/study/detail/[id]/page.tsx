"use client";
import { useEffect, useState } from "react";
import { Layout } from "@/templates/Layout";
import { useStudy } from "@/hooks/useStudy";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { CircularProgress, Stack } from "@mui/material";
import { StudyDetail } from "@/organisms/Study/StudyDetail";
import { DeleteDialog } from "@/molecules/DeleteDialog";
import { ConfirmDialog } from "@/molecules/ConfirmDialog";
import { useRouter } from "next/navigation";

/**
 * 学習詳細ページ
 * @constructor
 */
export default function Page({ params }: { params: { id: string } }) {
  const { fetchStudy, deleteStudy, completeStudyReview } = useStudy();
  const [studyResponseDto, setStudyResponseDto] = useState<StudyResponseDto>();
  const [openReviewCompleteModal, setOpenReviewCompleteModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const study = await fetchStudy(params.id);
      setStudyResponseDto(study);
    })();
  }, [fetchStudy, params.id]);

  /**
   * 学習削除ハンドラー
   */
  const studyDeleteHandler = async () => {
    await deleteStudy(params.id);
    router.push("/study/list");
  };

  /**
   * 復習完了ハンドラー
   */
  const reviewCompleteHandler = async () => {
    await completeStudyReview(params.id);
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
          handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
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
}
