"use client";
import React, { useState } from "react";
import { StudyDetail } from "@/organisms/Study/StudyDetail";
import { Loader, Stack } from "@mantine/core";
import { DeleteDialog } from "@/molecules/DeleteDialog";
import { ConfirmDialog } from "@/molecules/ConfirmDialog";
import { useStudy } from "@/hooks/CSR/useStudy";
import { StudyResponseDto } from "@/types/Study/StudyResponseDto";
import { useRouter } from "next/navigation";
import { views } from "@/constants/views";
import {AuthRequiredLayout} from "@/templates/AuthRequiredLayout";

type Props = {
  data: StudyResponseDto;
};

/**
 * 学習詳細ページコンポーネント
 * @param data - 学習レスポンスDTO
 * @constructor
 */
export const StudyDetailPage: React.FC<Props> = ({ data }) => {
  const { deleteStudy, completeStudyReview } = useStudy();
  const [studyResponseDto, setStudyResponseDto] =
    useState<StudyResponseDto>(data);
  const [openReviewCompleteModal, setOpenReviewCompleteModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();

  /**
   * 学習削除ハンドラー
   */
  const studyDeleteHandler = async () => {
    await deleteStudy(data.id);
    router.push(views.STUDY_LIST.path);
  };

  /**
   * 復習完了ハンドラー
   */
  const reviewCompleteHandler = async () => {
    await completeStudyReview(data.id);
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
    <AuthRequiredLayout>
      {studyResponseDto ? (
        <StudyDetail
          studyResponseDto={studyResponseDto}
          handleOpenDeleteModal={handleOpenDeleteModal}
          handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
        />
      ) : (
        <Stack align="center">
          <Loader color="primary.0" />
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
    </AuthRequiredLayout>
  );
}
