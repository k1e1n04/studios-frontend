import { Button } from "@mui/material";

type Props = {
  suggestedTags: string[];
  handleAddTag: (tag: string) => void;
  setSuggestedTags: (tags: string[]) => void;
};

/**
 * サジェッションタグリスト
 * @param suggestedTags サジェッションタグリスト
 * @param handleAddTag タグ追加ボタンのクリックハンドラー
 * @param setSuggestedTags サジェッションタグリストのセッター
 * @constructor
 */
export const SuggestedTagList: React.FC<Props> = ({
  suggestedTags,
  handleAddTag,
  setSuggestedTags,
}) => {
  return (
    <div>
      {suggestedTags.map((tag, index) => (
        <Button
          key={index}
          onClick={() => {
            handleAddTag(tag);
            setSuggestedTags([]);
          }}
          sx={{
            cursor: "pointer",
            border: (theme) => `1px solid ${theme.palette.primary.main}`,
            margin: "2px",
          }}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
};
