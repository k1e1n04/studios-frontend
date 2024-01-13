import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";

type Props = {
  handleOpenReviewCompleteModal: () => void;
};

/**
 * 学習詳細のフッター
 *
 * @param handleOpenReviewCompleteModal 復習完了モーダルを開くハンドラー
 */
export const StudyDetailFooter: React.FC<Props> = ({
  handleOpenReviewCompleteModal,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <StyledPrimaryButton onClick={handleOpenReviewCompleteModal}>
        復習完了
      </StyledPrimaryButton>
    </div>
  );
};
