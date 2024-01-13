import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { StyledDeleteButton } from "@/atoms/StyledDeleteButton";
import { StyledWhiteButton } from "@/atoms/StyledWhiteButton";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};

/**
 * 削除確認ダイアログ
 * @param open ダイアログの表示状態
 * @param handleClose ダイアログを閉じるハンドラー
 * @param handleDelete 削除ボタンのクリックハンドラー
 * @constructor
 */
export const DeleteDialog: React.FC<Props> = ({
  open,
  handleClose,
  handleDelete,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>削除確認</DialogTitle>
      <DialogContent>
        <DialogContentText>本当に削除してもよろしいですか？</DialogContentText>
      </DialogContent>
      <DialogActions>
        <StyledWhiteButton onClick={handleClose}>キャンセル</StyledWhiteButton>
        <StyledDeleteButton
          onClick={() => {
            handleDelete();
            handleClose();
          }}
        >
          削除
        </StyledDeleteButton>
      </DialogActions>
    </Dialog>
  );
};
