import { StudyDetailHeader } from "../../molecules/Study/StudyDetailHeader.tsx";
import { Theme } from "@mui/material";
import { StudyResponseDto } from "../../types/StudyResponseDto.ts";
import { TagButton } from "../../molecules/Study/Tag/TagButton.tsx";
import { StudyDetailBody } from "../../molecules/Study/StudyDetailBody.tsx";
import { StudyDetailFooter } from "../../molecules/Study/StudyDetailFooter.tsx";
import { StyledContainer } from "../../atoms/StyledContrainer.tsx";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
  convertedContent: string;
  handleOpenReviewCompleteModal: () => void;
  theme: Theme;
};

/**
 * 学習詳細
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @param convertedContent マークダウンをHTMLに変換した内容
 * @param handleOpenReviewCompleteModal 復習完了モーダルを開くハンドラー
 * @param theme テーマ
 * @constructor
 */
export const StudyDetail: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
  convertedContent,
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
        <TagButton tag={tag.name} />
      ))}
      <StudyDetailBody convertedContent={convertedContent} />
      <StudyDetailFooter
        handleOpenReviewCompleteModal={handleOpenReviewCompleteModal}
        theme={theme}
      />
    </StyledContainer>
  );
};
