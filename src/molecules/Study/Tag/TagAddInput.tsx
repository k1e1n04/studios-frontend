import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { SuggestedTagList } from "./SuggestedTagList.tsx";
import { useState } from "react";
import { StyledUpdateButton } from "../../../atoms/StyledUpdateButton.tsx";

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
                e.preventDefault();
              }
            }}
          />
          <SuggestedTagList
            suggestedTags={suggestedTags}
            handleAddTag={onAdd}
            setSuggestedTags={setSuggestedTags}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
          <StyledUpdateButton
            onClick={() => {
              onAdd(newTag);
              handleClose();
            }}
            variant="contained"
          >
            追加
          </StyledUpdateButton>
        </DialogActions>
      </Dialog>
    </>
  );
};
