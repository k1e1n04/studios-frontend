import { StyledUpdateButton } from "@/atoms/StyledUpdateButton";
import { Theme } from "@mui/material";

type Props = {
  handleOpenReviewCompleteModal: () => void;
  theme: Theme;
};

/**
 * 学習詳細のフッター
 *
 * @param handleOpenReviewCompleteModal 復習完了モーダルを開くハンドラー
 * @param theme テーマ
 */
export const StudyDetailFooter: React.FC<Props> = ({
  handleOpenReviewCompleteModal,
  theme,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <StyledUpdateButton
        variant="contained"
        sx={{ color: theme.palette.secondary.main }}
        onClick={handleOpenReviewCompleteModal}
      >
        復習完了
      </StyledUpdateButton>
    </div>
  );
};
