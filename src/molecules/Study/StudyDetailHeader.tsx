import { StyledDetailHeaderContainer } from "../../atoms/StyledDetailHeaderContainer.tsx";
import { Theme, Typography } from "@mui/material";
import { StyledUpdateButton } from "../../atoms/StyledUpdateButton.tsx";
import { StyledDeleteButton } from "../../atoms/StyledDeleteButton.tsx";
import { StudyResponseDto } from "../../types/StudyResponseDto.ts";
import { ButtonsVerticalContainer } from "../../atoms/ButtonsVerticalContainer.tsx";

type Props = {
  studyResponseDto: StudyResponseDto;
  handleOpenDeleteModal: () => void;
  theme: Theme;
};

/**
 * 学習詳細のヘッダー
 * @param studyResponseDto 学習レスポンスDTO
 * @param handleOpenDeleteModal 削除モーダルを開くハンドラー
 * @param theme テーマ
 * @constructor
 */
export const StudyDetailHeader: React.FC<Props> = ({
  studyResponseDto,
  handleOpenDeleteModal,
  theme,
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
          <StyledUpdateButton
            variant="contained"
            sx={{ color: theme.palette.secondary.main }}
            href={`/study/update/${studyResponseDto.id}`}
          >
            更新
          </StyledUpdateButton>
          <StyledDeleteButton
            onClick={handleOpenDeleteModal}
            variant="contained"
          >
            削除
          </StyledDeleteButton>
        </ButtonsVerticalContainer>
      </StyledDetailHeaderContainer>
    </>
  );
};
