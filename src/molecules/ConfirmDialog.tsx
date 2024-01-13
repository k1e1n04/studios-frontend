import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";

type Props = {
  title: string;
  content: string;
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => Promise<void>;
};

/**
 * 確認ダイアログ
 * @param title タイトル
 * @param content 内容
 * @param open ダイアログの表示状態
 * @param handleClose ダイアログを閉じるハンドラー
 * @param handleConfirm OKボタンのクリックハンドラー
 * @constructor
 */
export const ConfirmDialog: React.FC<Props> = ({
  title,
  content,
  open,
  handleClose,
  handleConfirm,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          キャンセル
        </Button>
        <StyledPrimaryButton
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          OK
        </StyledPrimaryButton>
      </DialogActions>
    </Dialog>
  );
};
