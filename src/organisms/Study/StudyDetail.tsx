import { StudyDetailHeader } from "@/molecules/Study/StudyDetailHeader";
import { StudyResponseDto } from "@/types/StudyResponseDto";
import { TagButton } from "@/molecules/Study/Tag/TagButton";
import { StudyDetailBody } from "@/molecules/Study/StudyDetailBody";
import { StudyDetailFooter } from "@/molecules/Study/StudyDetailFooter";
import { StyledContainer } from "@/atoms/StyledContrainer";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
  handleOpenReviewCompleteModal: () => void;
};

/**
 * 学習詳細
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @param handleOpenReviewCompleteModal 復習完了モーダルを開くハンドラー
 * @constructor
 */
export const StudyDetail: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
  handleOpenReviewCompleteModal,
}) => {
  return (
    <StyledContainer>
      <StudyDetailHeader
        studyResponseDto={studyResponseDto}
        handleOpenDeleteModal={handleOpenDeleteModal}
      />
      {studyResponseDto.tags.map((tag) => (
        <TagButton key={tag.id} tag={tag.name} />
      ))}
      <StudyDetailBody content={studyResponseDto.content} />
      <StudyDetailFooter
        handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
      />
    </StyledContainer>
  );
};
