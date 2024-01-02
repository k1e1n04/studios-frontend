import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { StyledDeleteButton } from "../atoms/StyledDeleteButton.tsx";

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
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <StyledDeleteButton
          onClick={() => {
            handleDelete();
            handleClose();
          }}
          variant="contained"
        >
          削除
        </StyledDeleteButton>
      </DialogActions>
    </Dialog>
  );
};
