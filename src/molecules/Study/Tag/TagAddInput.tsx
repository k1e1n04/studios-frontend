import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SuggestedTagList } from "@/molecules/Study/Tag/SuggestedTagList";
import { useState } from "react";
import { StyledPrimaryButton } from "@/atoms/StyledPrimaryButton";

type Props = {
  newTag: string;
  onAdd: (newTag: string) => void;
  handleChange: (newTag: string) => void;
  suggestedTags: string[];
  setSuggestedTags: (tag: string[]) => void;
};

/**
 * タグ追加入力コンポーネント
 * @param newTag 新規タグ
 * @param onAdd タグ追加ボタンのクリックハンドラー
 * @param handleChange タグ入力欄の変更ハンドラー
 * @param suggestedTags サジェッションタグリスト
 * @param setSuggestedTags サジェッションタグリストのセッター
 * @constructor
 */
export const TagAddInput: React.FC<Props> = ({
  newTag,
  onAdd,
  handleChange,
  suggestedTags,
  setSuggestedTags,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleClickSuggestedTag = (tag: string) => {
    onAdd(tag);
    handleClose();
  };
  return (
    <>
      <Button onClick={() => setOpen(true)} sx={{ width: "100px" }}>
        タグを追加
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>タグを入力してください。</DialogTitle>
        <DialogContent>
          <TextField
            variant={"standard"}
            placeholder={"タグを追加"}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAdd(newTag);
                handleClose();
                e.preventDefault();
              }
            }}
          />
          <SuggestedTagList
            suggestedTags={suggestedTags}
            handleAddTag={handleClickSuggestedTag}
            setSuggestedTags={setSuggestedTags}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <StyledPrimaryButton
            onClick={() => {
              onAdd(newTag);
              handleClose();
            }}
          >
            追加
          </StyledPrimaryButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
