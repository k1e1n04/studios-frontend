import { StudyDetailHeader } from "@/molecules/Study/StudyDetailHeader";
import { Theme } from "@mui/material";
import { StudyResponseDto } from "@/types/StudyResponseDto";
import { TagButton } from "@/molecules/Study/Tag/TagButton";
import { StudyDetailBody } from "@/molecules/Study/StudyDetailBody";
import { StudyDetailFooter } from "@/molecules/Study/StudyDetailFooter";
import { StyledContainer } from "@/atoms/StyledContrainer";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
  handleOpenReviewCompleteModal: () => void;
  theme: Theme;
};

/**
 * 学習詳細
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @param handleOpenReviewCompleteModal 復習完了モーダルを開くハンドラー
 * @param theme テーマ
 * @constructor
 */
export const StudyDetail: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
  handleOpenReviewCompleteModal,
  theme,
}) => {
  return (
    <StyledContainer>
      <StudyDetailHeader
        studyResponseDto={studyResponseDto}
        handleOpenDeleteModal={handleOpenDeleteModal}
        theme={theme}
      />
      {studyResponseDto.tags.map((tag) => (
        <TagButton key={tag.id} tag={tag.name} />
      ))}
      <StudyDetailBody content={studyResponseDto.content} />
      <StudyDetailFooter
        handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
        theme={theme}
      />
    </StyledContainer>
  );
};
