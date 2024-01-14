import { StyledDetailHeaderContainer } from "@/atoms/StyledDetailHeaderContainer";
import { Typography } from "@mui/material";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";
import { StyledDeleteButton } from "@/atoms/StyledDeleteButton";
import { StudyResponseDto } from "@/types/StudyResponseDto";
import { ButtonsVerticalContainer } from "@/atoms/ButtonsVerticalContainer";
import Link from "next/link";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
};

/**
 * 学習詳細のヘッダー
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @constructor
 */
export const StudyDetailHeader: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
}) => {
  return (
    <>
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
      <StyledDetailHeaderContainer>
        <div>
          <Typography align="left">
            復習回数 {studyResponseDto.number_of_review}
          </Typography>
          <Typography align="left">
            投稿日 {studyResponseDto.created_date}
          </Typography>
          <Typography align="left">
            更新日 {studyResponseDto.updated_date}
          </Typography>
        </div>
        <ButtonsVerticalContainer>
            <Link href={`/study/update/${studyResponseDto.id}`}>
              <StyledPrimaryButton>
                更新
              </StyledPrimaryButton>
            </Link>
          <StyledDeleteButton onClick={handleOpenDeleteModal}>
            削除
          </StyledDeleteButton>
        </ButtonsVerticalContainer>
      </StyledDetailHeaderContainer>
    </>
  );
};
