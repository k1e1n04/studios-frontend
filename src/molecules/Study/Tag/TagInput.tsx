import { Button, TextField } from "@mui/material";

type Props = {
  newTag: string;
  onAdd: (newTag: string) => void;
  handleChange: (newTag: string) => void;
};

/**
 * タグ追加入力コンポーネント
 * @param newTag 新規タグ
 * @param onAdd タグ追加ボタンのクリックハンドラー
 * @param handleChange タグ入力欄の変更ハンドラー
 * @constructor
 */
export const TagInput: React.FC<Props> = ({ newTag, onAdd, handleChange }) => (
  <>
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
    <Button onClick={() => onAdd(newTag)}>追加</Button>
  </>
);
